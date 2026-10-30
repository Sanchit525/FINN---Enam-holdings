# FINN · Indian-company monitoring

Recruitment build in progress. Requirements, decisions, source evidence and actual verification live in `project-notes/`.

The real-source push workflow is implemented in `app/`, sharing the existing mobile interface. See `app/README.md` for commands and limits. Run `python -m app.server --port 8766 --no-auto-refresh` to inspect the recorded real dataset at **http://127.0.0.1:8766**. The manual Refresh action performs actual NSE requests. The clearly dated interaction demo remains separate at `/?demo=1`; its manual briefs are not live AI research.

Verified dataset: fifteen official EOD rows dated 29 October 2026 and 61 returned filings for 23–30 October. Local HTTP/source/recovery checks and browser evidence are under `app/verification/`; full recruitment acceptance, hosted retrieval and generalised pull remain pending.

Only free-tier hosting is authorised. No chargeable model calls are enabled. Do not commit credentials, raw runtime stores or the local feasibility archive.

Original assignment PDFs and large experiment archives remain local and are intentionally excluded from Git. Source URLs and provenance remain in the project notes and prepared demo data.
