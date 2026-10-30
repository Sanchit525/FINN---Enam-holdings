import argparse
import json
import os
from pathlib import Path
from .engine import configuration, run_refresh
from .store import BusyRefresh, Store


def main():
    parser=argparse.ArgumentParser(description='Real-source refresh. Never reads the experiment cache or invokes a model.')
    parser.add_argument('command',choices=['refresh','status','export'])
    parser.add_argument('--tickers',nargs='+');parser.add_argument('--start');parser.add_argument('--end');parser.add_argument('--asof')
    parser.add_argument('--data-dir',default=os.environ.get('FINN_DATA_DIR','runtime'))
    parser.add_argument('--documents',type=int,default=2)
    parser.add_argument('--output',default='app/bootstrap.json.gz')
    args=parser.parse_args();store=Store(args.data_dir)
    if args.command=='refresh':
        symbols,start,end,asof=configuration(args.tickers,args.start,args.end,args.asof)
        try:job=store.begin_job(symbols,start.isoformat(),end.isoformat(),asof.isoformat())
        except BusyRefresh as error:print(json.dumps({'active':error.job}));return
        print('STARTED '+json.dumps(job),flush=True)
        print(json.dumps(run_refresh(store,job,document_limit=args.documents),indent=2))
    elif args.command=='export':
        snapshot=store.export_snapshot(args.output)
        print(json.dumps({'snapshot':args.output,'exported_at':snapshot['exported_at'],'counts':{k:len(v) for k,v in snapshot['tables'].items()},'bytes':Path(args.output).stat().st_size}))
    else:
        print(json.dumps({'latest_job':store.latest_job(),'counts':{k:len(store.rows(k)) for k in store.TABLES}},indent=2))


if __name__=='__main__':main()
