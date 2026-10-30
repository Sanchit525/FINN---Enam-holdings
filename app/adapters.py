"""Refactored from experiments/data_probe.py: ordinary NSE requests, now uncached and validated."""
import csv
import io
import json
import math
import re
import time
from datetime import datetime, timedelta, timezone
from decimal import Decimal, InvalidOperation
from urllib.error import HTTPError
from urllib.parse import urlencode, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

from .store import utcnow

IST=timezone(timedelta(hours=5,minutes=30))
HOSTS={'www.nseindia.com','nsearchives.nseindia.com','archives.nseindia.com'}


class SourceError(Exception):
    def __init__(self,message,request_id=None):
        super().__init__(message);self.request_id=request_id


def allowed_url(url,hosts=None):
    p=urlsplit(url)
    return p.scheme=='https' and p.hostname in (HOSTS if hosts is None else hosts) and p.port in (None,443) and not p.username and not p.password


class CheckedRedirect(HTTPRedirectHandler):
    def __init__(self,hosts=None):
        super().__init__();self.hosts=hosts
    def redirect_request(self,req,fp,code,msg,headers,newurl):
        if not allowed_url(newurl,self.hosts): raise SourceError('Source redirected outside the explicit source allowlist')
        return super().redirect_request(req,fp,code,msg,headers,newurl)


class SourceClient:
    def __init__(self,store,timeout=12,hosts=None):
        self.store=store;self.timeout=timeout;self.hosts=hosts

    def get(self,url,kind,limit=8_000_000):
        if not allowed_url(url,self.hosts):raise SourceError('Unsupported source URL; only explicit official-source HTTPS hosts are fetched')
        started=time.monotonic();body=b'';chunks=[]
        record=dict(url=url,kind=kind,retrieved_at=utcnow(),http_status=None,ok=False,final_url=url,job_id=getattr(self,'job_id',None))
        try:
            request=Request(url,headers={'User-Agent':'FINN-Assignment/0.2','Accept':'*/*'})
            with build_opener(CheckedRedirect(self.hosts)).open(request,timeout=self.timeout) as response:
                record.update(http_status=response.status,final_url=response.url,content_type=response.headers.get('Content-Type',''),
                              content_length=response.headers.get('Content-Length'),content_range=response.headers.get('Content-Range'))
                if not allowed_url(response.url,self.hosts):raise SourceError('Unsupported final source host')
                if response.status!=200:raise SourceError(f'Unexpected HTTP {response.status}; partial responses are not treated as complete sources')
                expected=response.headers.get('Content-Length')
                if expected and int(expected)>limit:raise SourceError(f'Declared source size {int(expected):,} exceeds download limit {limit:,} bytes')
                size=0
                while True:
                    chunk=response.read(min(65536,limit+1-size))
                    if not chunk:break
                    chunks.append(chunk);size+=len(chunk)
                    if size>limit:raise SourceError(f'Source exceeds {limit:,}-byte cap')
                    if time.monotonic()-started>self.timeout:raise SourceError('Source transfer exceeded time budget')
                body=b''.join(chunks)
                expected=response.headers.get('Content-Length')
                if expected and int(expected)!=len(body):raise SourceError('Downloaded bytes do not match declared Content-Length')
                record['ok']=True
        except HTTPError as error:
            body=error.read(2000);record.update(http_status=error.code,error=f'HTTP {error.code}')
        except Exception as error:
            if chunks:body=b''.join(chunks)
            record['error']=f'{type(error).__name__}: {error}'
        record['seconds']=round(time.monotonic()-started,3)
        record=self.store.source(record,body)
        if not record['ok']:
            self.store.validate_source(record['id'],False,record.get('error'))
            raise SourceError(f"{record.get('error','Source request failed')} [request {record['id']}]",request_id=record['id'])
        return record,body


def eod_url(day):
    return 'https://nsearchives.nseindia.com/products/content/sec_bhavdata_full_'+day.strftime('%d%m%Y')+'.csv'


def announcements_url(ticker,start,end):
    return 'https://www.nseindia.com/api/corporate-announcements?'+urlencode(dict(index='equities',symbol=ticker,
                from_date=start.strftime('%d-%m-%Y'),to_date=end.strftime('%d-%m-%Y')))


def parse_eod(body,day):
    reader=csv.DictReader(io.StringIO(body.decode('utf-8-sig')))
    fields={k.strip() for k in (reader.fieldnames or [])}
    required={'SYMBOL','SERIES','DATE1','CLOSE_PRICE','PREV_CLOSE','TTL_TRD_QNTY'}
    if not required.issubset(fields):raise SourceError('EOD response lacks required CSV columns (possibly an HTML/error response)')
    result={}
    for row in reader:
        row={str(k).strip():str(v or '').strip() for k,v in row.items()}
        if row['SERIES']!='EQ':continue
        try:
            if datetime.strptime(row['DATE1'],'%d-%b-%Y').date()!=day:raise SourceError('EOD date differs from requested session')
            close,previous=Decimal(row['CLOSE_PRICE']),Decimal(row['PREV_CLOSE'])
            if not close.is_finite() or not previous.is_finite() or close<0 or previous<0:raise SourceError('Invalid EOD price')
            volume=int(row['TTL_TRD_QNTY'])
            if volume<0:raise SourceError('Invalid traded-share volume')
            change=(close/previous-1)*100 if previous>0 else None
            value={'ticker':row['SYMBOL'],'date':day.isoformat(),'close_exact':str(close),'previous_exact':str(previous),
                   'close':float(close),'previous':float(previous),'volume':volume,'change_pct':float(change) if change is not None else None,
                   'price_unit':'INR/share','volume_unit':'shares','series':'EQ','raw':row}
            if row['SYMBOL'] in result:raise SourceError('Duplicate EQ symbol in EOD source')
            result[row['SYMBOL']]=value
        except (ValueError,InvalidOperation) as error:raise SourceError(f'Invalid EOD row for {row.get("SYMBOL")}: {error}')
    if not result:raise SourceError('No EQ records in EOD response')
    return result


def priority(category,description):
    text=(category+' '+description).casefold()
    if 'newspaper' in text:return 'routine','publication','Publication copy; retained for inspection. No assumption of new operating information.'
    scheduled=bool(re.search(r'board meeting intimation|meeting.*scheduled|meeting.*to be held',text))
    if scheduled:
        if re.search(r'raising.*funds|fund.?rais|trading in equity shares|listing',text):
            return 'attention','planned-corporate','Listing/capital plans accompany a scheduled meeting. Review the original; this is not evidence that results or approvals have been delivered.'
        return 'routine','scheduled-results','Scheduled meeting/possible results announcement. Results have not been inferred from this notice.'
    if re.search(r'financial results|audited financial|unaudited financial',text):
        return 'attention','results','Results filing: updated statements deserve review. Financial materiality is not inferred from the label.'
    if re.search(r'transcript',text):return 'attention','transcript','New transcript filing: management commentary may warrant review. Content and period must be checked.'
    if re.search(r'resign|appoint|cessation|removal',text) and re.search(r'director|chief|cfo|ceo|kmp|auditor',text):
        return 'attention','management','Leadership/auditor change indicated by exchange metadata; review the original terms and context.'
    if re.search(r'acquisition|fund.?rais|fraud|litigation|default|insolvency|penalty|regulatory action',text):
        return 'attention','corporate-action','Potential capital, transaction or regulatory development; original filing needs review.'
    if re.search(r'schedule|invitation|meeting intimation|board meeting intimation|certificate under|compliance|closure of trading',text):
        return 'routine','notice-compliance','Scheduling/compliance metadata. Kept accessible; not treated as evidence of new results or call commentary.'
    return 'unreviewed','unknown','No matching priority rule. Unreviewed filings remain visible; the content has not been judged immaterial.'


def priority_title(rule,category):
    return {'results':'Financial results filed','transcript':'New transcript filed','management':'Leadership or auditor change',
            'corporate-action':'Corporate development to review','planned-corporate':'Listing or capital plans to review',
            'scheduled-results':'Scheduled meeting · results not yet inferred'}.get(rule,category)


def parse_announcements(body,ticker,start,end):
    try:rows=json.loads(body)
    except (ValueError,UnicodeDecodeError) as error:raise SourceError('Announcements response is not JSON') from error
    if not isinstance(rows,list):raise SourceError('Announcements response is not a list')
    if len(rows)>2000:raise SourceError('Announcements response exceeds bounded record count')
    result=[]
    for raw in rows:
        if not isinstance(raw,dict) or raw.get('symbol')!=ticker:raise SourceError('Announcement company identity differs from requested ticker')
        try:published=datetime.strptime(raw['an_dt'],'%d-%b-%Y %H:%M:%S').replace(tzinfo=IST)
        except (ValueError,KeyError) as error:raise SourceError('Unrecognised announcement timestamp') from error
        if not start<=published.date()<=end:raise SourceError('Announcement outside requested date window')
        url=raw.get('attchmntFile') or ''
        if not allowed_url(url):raise SourceError('Announcement contains an unsupported attachment host')
        category=str(raw.get('desc') or 'Unclassified')
        description=str(raw.get('attchmntText') or category)
        tier,rule,reason=priority(category,description)
        import hashlib
        identity=str(raw.get('seq_id') or hashlib.sha256((ticker+url+published.isoformat()).encode()).hexdigest()[:24])
        title=priority_title(rule,category)
        result.append(dict(id='nse-'+ticker+'-'+identity,ticker=ticker,provider_company=raw.get('sm_name'),
                           title=title,description=description,category=category,priority=tier,rule_id='push-v2:'+rule,reason=reason,
                           url=url,date=published.date().isoformat(),published_at=published.isoformat(),time=raw['an_dt']+' IST',raw=raw,
                           summary='',manual=False,evidence=None))
    return result
