# Real-source push and extractive company research

The mobile UI is shared with the verified preview. Normal mode reads SQLite and makes real official-source requests; `/?demo=1` opens the clearly labelled, manually authored October interaction demo. No hand-selected demo record is used by the live adapters or database.

Investigate now accepts a general NSE ticker, discovers annual reports and actual earnings-call transcripts, extracts the complete usable PDFs and searches original passages with physical-page citations. **Synthesis stays unavailable; no model/key is required or called.**

## Run locally

From the repository root:

```powershell
python -m pip install -r app/requirements.txt
python -m app.cli refresh --tickers INFY --start 2026-10-23 --end 2026-10-30 --asof 2026-10-29 --documents 1
python -m app.server --port 8766
```

Open **http://127.0.0.1:8766**. In this original workspace the existing PyMuPDF installation under `tmp/pdf-render-tools` is also supported; a clean checkout needs the listed dependency. Python standard library provides the remaining backend. Stop the server with Ctrl+C.

To inspect the already fetched dataset without repeating upstream requests, use `python -m app.server --port 8766 --no-auto-refresh`. This is the running delivery configuration; **Refresh sources** still makes a real request when explicitly used. Source timestamps remain visible. `python -m app.verify_live` checks the saved full dataset/local HTTP and rebuilds the recovery snapshot without a portfolio refresh.

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
- Priority is versioned `push-v2` metadata rules. Results, transcripts, relevant leadership/auditor changes and selected transaction/regulatory terms are flagged for review. Scheduled decisions are not labelled as delivered results; proposed capital/listing developments can still merit review. Publication copies and scheduling/compliance have lower priority; unmatched records remain unreviewed. Classification is not proof of materiality. `python -m app.cli rerank` reapplies rules to stored metadata, preserving retrieval times and making no source requests.
- A small generic set of highest-priority attachments is fetched during refresh; other attachments are retrieved on first open. Validation checks official attachment host/redirects, 25 MB PDF limit, declared response length, PDF signature/EOF, unrepaired structure, configured company identity and usable text. Up to 60 pages are extracted. Original text/page/provenance is displayed. Scans, invalid PDFs, failures and unverified periods remain explicit. Financial tables are not automatically normalised or summarised.
- Native drawer/history, source tabs and browser-session state preserve the mobile evidence-return journey. Model research is explicitly unavailable; no SDK/provider request is called even if a key exists.

## Storage, refresh and boundaries

`runtime/finn.sqlite3` and content-addressed raw responses are ignored by Git. Sources store URL/final URL, UTC timestamp, HTTP status, byte length, SHA-256, transfer duration and validation result. Immutable raw bytes are not overwritten. Repeated records update their source/last-seen association without duplicating the event. Document versions retain their own source hash. A single SQLite refresh lease and process lock prevent duplicate jobs; each company has independent outcomes. Existing good rows remain visible with their old timestamps after a failure.

HTTP routes: `/api/data`, `/api/refresh` (JSON POST with the page's `X-FINN-Token`), `/api/jobs/<id>`, `/api/filings/<id>/evidence`, `/api/documents/<id>`, `/files/<id>.pdf`, `/health`, plus the research routes below. The API never accepts an arbitrary fetch URL. No workspace directory/file server is exposed. Refresh is rate-limited (one active job, 60 seconds between triggers, 24 triggers/day per runtime); CLI is an operator command. One PDF extraction runs at a time. No account/trading integration is included.

The shared frontend still has a separate dated demonstration mode. Its manual briefs never supply the live investigation's results.

## Company document retrieval

Open **http://127.0.0.1:8766/#investigate/TITAN**, enter an NSE symbol and press **Load sources**. Ask a question or select a focused question; **Find cited passages** returns source excerpts, not a generated answer. Each reference opens its passage, original URL, document period, retrieval date, hash and physical PDF page. The saved-page reader includes pages beyond the push attachment reader's 60-page limit.

```powershell
python -m app.cli research --tickers INFY CERA TITAN
python -m app.cli research --tickers ASIANPAINT ITC
python -m app.cli query --tickers CERA --question "operating cash flow receivables"
python -m app.verify_research
```

`research` reuses successful/partial records for 24 hours. Operator-only `--force` performs new discovery/downloads; the UI does not silently force repeated requests. The server uses one persisted research lease, background progress and up to 30 new discovery jobs/day/runtime. Jobs expire after eight minutes; ordinary discovery has a four-minute budget, with individual transfers bounded to 45 seconds. A final in-flight transfer can extend that discovery budget. Querying indexed sources makes no upstream/model request.

Discovery uses the official NSE equities-list CSV (name/ISIN/series), ticker-specific annual-report index and up to four disjoint 90-day announcement windows. The quote endpoint returned 403 in the actual probe, so it is not an identity dependency. Unknown symbols are reported as not established in that list; SME/delisted coverage is not claimed. Configured issuer **index pages**, not prepared PDF links, are a fallback for INFY/CERA/APOLLOHOSP. The tested TITAN, ASIANPAINT and ITC paths have no issuer/PDF configuration. Printed or annotated PDF links can be followed only within the explicit NSE/issuer host registry; no challenge bypass is attempted.

Research PDFs are capped at 40 MB/800 pages and require signature, EOF, complete declared HTTP length, unrepaired structure, company identity and a usable text layer. Annual years are checked against report-year ranges or explicit year-ended wording. All pages are extracted; text-bearing annual pages are indexed, while only verified actual-call sections are indexed in transcript bundles. Call headings provide quarter/date when parseable. Notices, cover letters, media/press conferences, malformed/encrypted/OCR-required files and blocked downloads do not become call evidence. A parsed call date older than 180 days is labelled stale; unknown dates remain unverified. Earlier annual submissions used after a revision failure carry a warning.

SQLite FTS5 supplies bounded local text matching; document-local lexical ranking and overlapping source chunks preserve stable citations when other tickers are added or the derived index is rebuilt. Report/call results are balanced, with up to three different pages per document. This has limited paraphrase recall, does not resolve contradictory statements, and does not normalise financial tables or calculate investment conclusions. Basis/units are page-level hints with explicit unknowns; read the original table. Source text is displayed as escaped data, never executed as instructions.

Actual local outcomes: current annual report plus actual call for INFY, CERA, TITAN and ASIANPAINT. ITC has a current annual report but no transcript candidate within the four returned windows: **partial**, not proof no transcript exists. Apollo retains an earlier annual submission with a revision warning; exchange call PDFs are cover letters and their published issuer links returned 403. These are genuine retained source outcomes, not simulated product data.

POST `/api/research` starts/reuses a job; GET `/api/research/jobs/<id>` reports progress; GET `/api/research/<ticker>` returns discovery/coverage; POST `/api/research/query` returns citations and document metadata. POST routes use the same token/origin guards. Research records and full extracted text are included in the dated recovery snapshot; FTS indexes rebuild from that text without a source/model request. Raw PDFs remain omitted and missing local PDFs link back to the original source. Hosted recovery/network/memory behaviour and a physical-phone test still require verification.

## Free hosting preparation

`render.yaml` selects only a Free Python web service; no disk, paid cron, database or model credentials are declared. `.python-version` pins the 3.13 series. Render login/repository connection is still required, followed by a real hosted-source check. Do not add a payment method or paid service to make a deployment succeed without new authorisation.

Free-host cache is ephemeral. Export a complete, automatically collected local refresh with:

```powershell
python -m app.cli export --output app/bootstrap.json.gz
```

That tracked recovery snapshot preserves source dates/validation metadata and extracted text, not raw PDFs or credentials. On a fresh runtime it restores into empty SQLite and is visibly labelled as recovery data. A request triggers catch-up when the last job is over an hour old. There is no guaranteed background schedule during sleep, and new runtime changes are not written back to Git automatically. The app remains readable from a dated recovery snapshot if upstream requests fail; such failures stay visible. This is a submission-prototype compromise, not durable production storage.

Provider/source tests, exact commands and actual outcome records live in `../project-notes/verification.md` and `verification/`. A deployment file or API key is not a passed cloud/AI test.

Recorded push outcome: completed EOD **29 Oct 2026**, announcements **23–30 Oct**, all fifteen source outcomes passed, **61 filings**. The Sun Pharma filing initially arrived incomplete; a corrected bounded download validated all **16,048,521 bytes / 34 pages**. Its old 128 KB response and provenance are retained unchanged under `../tests/fixtures/` and tested as an excluded source. `verification/attachment-diagnostic.json` distinguishes the old partial response, diagnostic size-limit stops and the successful revalidation; no source corruption/password protection is inferred. Free model selection/synthesis is a separate later stage; this retrieval slice needs no key.
