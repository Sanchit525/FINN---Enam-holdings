"""Offline fault injection and validation tests. Synthetic fixtures never enter the live runtime."""
import csv
import io
import json
import tempfile
import unittest
from datetime import datetime, timedelta
from pathlib import Path
from urllib.parse import parse_qs,urlsplit

from app.adapters import IST,SourceError,parse_announcements,parse_eod,priority
from app.engine import configuration,holdings,run_refresh
from app.store import BusyRefresh,Store,utcnow
from app.views import live_data


class FixtureClient:
    def __init__(self,store,day,fail=None):self.store=store;self.day=day;self.fail=fail
    def get(self,url,kind,limit=None):
        if kind=='eod':
            output=io.StringIO();writer=csv.writer(output)
            writer.writerow(['SYMBOL','SERIES','DATE1','CLOSE_PRICE','PREV_CLOSE','TTL_TRD_QNTY'])
            for company in holdings():writer.writerow([company['ticker'],'EQ',self.day.strftime('%d-%b-%Y'),'105.25','100','12345'])
            body=output.getvalue().encode()
        else:
            ticker=parse_qs(urlsplit(url).query)['symbol'][0]
            if ticker==self.fail:raise SourceError('Synthetic HTTP 503 fault injection; not a real provider outcome')
            body=json.dumps([{'symbol':ticker,'seq_id':'fixture-1','an_dt':self.day.strftime('%d-%b-%Y')+' 12:30:00',
                             'desc':'Financial Results','attchmntText':'Financial results for the quarter',
                             'attchmntFile':'https://nsearchives.nseindia.com/corporate/fixture.pdf','sm_name':ticker}]).encode()
        source=self.store.source({'url':url,'final_url':url,'retrieved_at':utcnow(),'http_status':200,'kind':'synthetic-test:'+kind,'ok':True,'fixture':True},body)
        return source,body


class PushTests(unittest.TestCase):
    def setUp(self):
        self.test_root=Path(__file__).resolve().parents[1]/'runtime'/'test-temporary'
        self.test_root.mkdir(parents=True,exist_ok=True)
        self.temp=tempfile.TemporaryDirectory(dir=self.test_root);self.store=Store(self.temp.name)
        self.day=datetime.now(IST).date()-timedelta(days=1)
    def tearDown(self):
        assert Path(self.temp.name).resolve().is_relative_to(self.test_root.resolve())
        self.temp.cleanup()
    def run_job(self,tickers=None,fail=None):
        symbols,start,end,asof=configuration(tickers,self.day.isoformat(),self.day.isoformat(),self.day.isoformat())
        job=self.store.begin_job(symbols,start.isoformat(),end.isoformat(),asof.isoformat())
        return run_refresh(self.store,job,client=FixtureClient(self.store,self.day,fail),document_limit=0)
    def test_duplicate_refresh_retains_one_event_and_first_seen(self):
        first=self.run_job(['INFY']);event=self.store.rows('filings')[0]
        second=self.run_job(['INFY'])
        self.assertEqual((first['inserted'],second['inserted'],second['updated']),(1,0,1))
        self.assertEqual(len(self.store.rows('filings')),1)
        self.assertEqual(self.store.rows('filings')[0]['first_seen'],event['first_seen'])
        self.assertEqual(len(self.store.rows('quotes')),1)
    def test_one_source_failure_accounts_for_all_fifteen(self):
        job=self.run_job(fail='HDFCBANK')
        self.assertEqual(job['status'],'partial');self.assertEqual(job['completed'],15)
        self.assertEqual(job['companies_passed'],14)
        checks=self.store.rows('checks');self.assertEqual(len(checks),15)
        failed=next(c for c in checks if c['ticker']=='HDFCBANK')
        self.assertEqual(failed['filings_status'],'failed');self.assertIsNone(failed['filing_count'])
        self.assertEqual(len(self.store.rows('quotes')),15)
    def test_global_active_lease_reuses_instead_of_duplicate(self):
        self.store.begin_job(['INFY'],self.day.isoformat(),self.day.isoformat(),self.day.isoformat())
        with self.assertRaises(BusyRefresh):self.store.begin_job(['CERA'],self.day.isoformat(),self.day.isoformat(),self.day.isoformat())
    def test_eod_date_units_calculation_and_zero_base(self):
        body=('SYMBOL,SERIES,DATE1,CLOSE_PRICE,PREV_CLOSE,TTL_TRD_QNTY\nINFY,EQ,'+self.day.strftime('%d-%b-%Y')+',105.25,100,12345\nCERA,EQ,'+self.day.strftime('%d-%b-%Y')+',10,0,0\n').encode()
        values=parse_eod(body,self.day)
        self.assertAlmostEqual(values['INFY']['change_pct'],5.25)
        self.assertEqual(values['INFY']['price_unit'],'INR/share');self.assertEqual(values['INFY']['volume_unit'],'shares')
        self.assertIsNone(values['CERA']['change_pct'])
        with self.assertRaises(SourceError):parse_eod(body,self.day-timedelta(days=1))
        with self.assertRaises(SourceError):parse_eod(b'<html>Blocked</html>',self.day)
        with self.assertRaises(SourceError):parse_eod(body.replace(b'105.25',b'NaN'),self.day)
    def test_wrong_company_and_attachment_host_rejected(self):
        row={'symbol':'CERA','an_dt':self.day.strftime('%d-%b-%Y')+' 12:00:00','attchmntFile':'https://nsearchives.nseindia.com/corporate/a.pdf'}
        with self.assertRaises(SourceError):parse_announcements(json.dumps([row]).encode(),'INFY',self.day,self.day)
        row['symbol']='INFY';row['attchmntFile']='http://127.0.0.1/private'
        with self.assertRaises(SourceError):parse_announcements(json.dumps([row]).encode(),'INFY',self.day,self.day)
    def test_rules_keep_unknowns_visible_and_do_not_hide_management_change(self):
        self.assertEqual(priority('Financial Results','')[0],'attention')
        self.assertEqual(priority('Updates','CFO resignation')[0],'attention')
        self.assertEqual(priority('Updates','Newspaper publication')[0],'routine')
        self.assertEqual(priority('Updates','Unrecognised event')[0],'unreviewed')
    def test_configuration_rejects_today_future_and_unbounded_requests(self):
        today=datetime.now(IST).date()
        with self.assertRaises(ValueError):configuration(['INFY'],asof=today.isoformat())
        with self.assertRaises(ValueError):configuration(['NOT-IN-PORTFOLIO'])
        with self.assertRaises(ValueError):configuration(['INFY'],start=(today-timedelta(days=20)).isoformat(),end=today.isoformat())
    def test_restart_and_snapshot_recovery_preserve_actual_dates(self):
        self.run_job(['INFY'])
        again=Store(self.temp.name);self.assertEqual(len(again.rows('filings')),1)
        snapshot=Path(self.temp.name)/'snapshot.gz';again.export_snapshot(snapshot)
        restored=Store(Path(self.temp.name)/'restored');self.assertTrue(restored.restore_snapshot(snapshot))
        quote=restored.rows('quotes')[0];self.assertEqual(quote['date'],self.day.isoformat())
        self.assertTrue(restored.get('meta','recovery'));self.assertFalse(restored.blob_path(restored.rows('sources')[0]['sha256']).exists())
        self.assertEqual(live_data(restored)['coverage']['checked'],1)


if __name__=='__main__':unittest.main()
