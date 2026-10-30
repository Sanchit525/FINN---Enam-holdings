# Real-source push slice

The mobile UI is shared with the verified preview. Normal mode reads SQLite and makes real official-source requests; `/?demo=1` opens the clearly labelled, manually authored October interaction demo. No hand-selected demo record is used by the live adapters or database.

## Run locally

From the repository root:

```powershell
python -m pip install -r app/requirements.txt
python -m app.cli refresh --tickers INFY --start 2026-10-23 --end 2026-10-30 --asof 2026-10-29 --documents 1
python -m app.server --port 8766
```

Open **http://127.0.0.1:8766**. In this original workspace the existing PyMuPDF installation under `tmp/pdf-render-tools` is also supported; a clean checkout needs the listed dependency. Python standard library provides the remaining backend. Stop the server with Ctrl+C.

Refresh all fifteen using the same adapters/configuration:

```powershell
python -m app.cli refresh --start 2026-10-23 --end 2026-10-30 --asof 2026-10-29 --documents 2
python -m app.cli status
python -m unittest discover -s tests -v
```

Omit dates for the current IST date / preceding seven-day announcement window and a prior-calendar-day EOD candidate. An actual validated file establishes the session; 404 can fall back up to four earlier dates. Blocked/network failures do not cause challenge bypass or disguised date carry-forward. CLI windows are bounded to 15 calendar dates. `--tickers` selects a subset of the configured portfolio; omission selects all fifteen. Today's partial EOD is deliberately excluded.

## What is real

- One official NSE EOD CSV is requested per refresh, validated for session/columns/EQ series and used for all selected holdings. Exact reported close/previous-close strings and traded shares are stored; percentage moves are calculated with Decimal. Zero/missing comparison bases are unavailable, never fabricated zero moves.
- Each company receives a real NSE announcements request for the configured window. Every returned record is stored/upserted with its exchange ID, published timestamp, provider identity, source request and first/last-seen times. No record is dropped merely for being routine/unknown.
- Priority is versioned `push-v1` metadata rules. Results, transcripts, relevant leadership/auditor changes and selected transaction/regulatory terms are flagged for review. Publication copies and scheduling/compliance have lower priority; unmatched records remain unreviewed. Classification is not proof of materiality.
- A small generic set of highest-priority attachments is fetched during refresh; other attachments are retrieved on first open. Validation checks official attachment host/redirects, size, PDF signature, unrepaired structure, configured company identity and usable text. Original text/page/provenance is displayed. Scans, invalid PDFs, failures and unverified periods remain explicit. Financial tables are not automatically normalised or summarised.
- Native drawer/history, source tabs and browser-session state preserve the mobile evidence-return journey. Model research is explicitly unavailable; no SDK/provider request is called even if a key exists.

## Storage, refresh and boundaries

`runtime/finn.sqlite3` and content-addressed raw responses are ignored by Git. Sources store URL/final URL, UTC timestamp, HTTP status, byte length, SHA-256, transfer duration and validation result. Immutable raw bytes are not overwritten. Repeated records update their source/last-seen association without duplicating the event. Document versions retain their own source hash. A single SQLite refresh lease and process lock prevent duplicate jobs; each company has independent outcomes. Existing good rows remain visible with their old timestamps after a failure.

HTTP routes: `/api/data`, `/api/refresh` (JSON POST with the page's `X-FINN-Token`), `/api/jobs/<id>`, `/api/filings/<id>/evidence`, `/api/documents/<id>`, `/files/<id>.pdf`, `/health`. The API never accepts an arbitrary fetch URL. No workspace directory/file server is exposed. Refresh is rate-limited (one active job, 60 seconds between triggers, 24 triggers/day per runtime); CLI is an operator command. One PDF extraction runs at a time. No account/trading integration is included.

The shared frontend still has a separate dated demonstration mode. Its manual briefs must not be mistaken for live AI research. Generalised annual-report/transcript pull is not implemented by this push slice.

## Free hosting preparation

`render.yaml` selects only a Free Python web service; no disk, paid cron, database or model credentials are declared. `.python-version` pins the 3.13 series. Render login/repository connection is still required, followed by a real hosted-source check. Do not add a payment method or paid service to make a deployment succeed without new authorisation.

Free-host cache is ephemeral. Export a complete, automatically collected local refresh with:

```powershell
python -m app.cli export --output app/bootstrap.json.gz
```

That tracked recovery snapshot preserves source dates/validation metadata and extracted text, not raw PDFs or credentials. On a fresh runtime it restores into empty SQLite and is visibly labelled as recovery data. A request triggers catch-up when the last job is over an hour old. There is no guaranteed background schedule during sleep, and new runtime changes are not written back to Git automatically. The app remains readable from a dated recovery snapshot if upstream requests fail; such failures stay visible. This is a submission-prototype compromise, not durable production storage.

Provider/source tests, exact commands and actual outcome records live in `../project-notes/verification.md` and `verification/`. A deployment file or API key is not a passed cloud/AI test.
