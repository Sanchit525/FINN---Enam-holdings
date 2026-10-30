# FINN · Portfolio changes with inspectable evidence

FINN is a mobile-first recruitment prototype for following Indian listed companies: a portfolio digest helps decide what to review, and company investigation answers focused questions from annual reports and actual earnings-call transcripts.

**Repository:** https://github.com/Sanchit525/FINN---Enam-holdings
**Hosted prototype:** deployment verification in progress; see [release record](project-notes/release.md).

## Try the two workflows

1. **Digest:** inspect the 15-company mock portfolio, dated EOD price/volume, review-priority reasons and recoverable routine filings. Open an item, inspect its source and return without losing your place.
2. **Investigate:** enter `INFY`, `CERA` or `TITAN`, load sources and ask a focused question. Try “What constant-currency revenue growth did management report for Q2 FY27?” for INFY. Open the citation for the exact quote, physical PDF page, document period and original URL. Follow-ups use current evidence rather than previous generated claims.
3. **Coverage limits:** `ASIANPAINT` was an unprepared discovery test. `ITC` and `APOLLOHOSP` demonstrate genuine partial/blocked-source outcomes. Unknown or missing evidence stays explicit.

The recorded portfolio dataset is official EOD **29 October 2026** plus **61 returned filings for 23–30 October**. Dates and later refresh outcomes remain visible. It is not an intraday feed. `/?demo=1` is a separate, explicitly manual interaction demo; its briefs never supply live answers.

## Run locally

Python 3.13+ and PyMuPDF are the only runtime dependencies:

```powershell
python -m pip install -r app/requirements.txt
python -m app.server --port 8766 --no-auto-refresh
```

Open http://127.0.0.1:8766. The dated recovery snapshot makes the workspace readable before a refresh. **Refresh sources** performs actual NSE requests. For another device use the hosted HTTPS address; a phone's localhost is not this computer.

For generated answers, set `GEMINI_API_KEY` in the server environment or ignored `.env.local`. Never put it in frontend files or Git. Without a key, passage search still works. The fixed model is **gemini-3.5-flash-lite** using the user's free-tier project, with no alternate provider or paid fallback. Select **Render Free**; no disk, database, cron or upgrade is required. [Operator details](app/README.md).

## Important decisions

- Buildless HTML/CSS/JS, one Python service, SQLite and PyMuPDF keep the prototype small. Generic NSE symbol/document discovery precedes limited issuer-index fallbacks; no company-specific generated answers.
- SQLite FTS retrieves original report/call pages. Gemini receives only bounded pages, source metadata and at most three previous questions. Opening screens or searching passages never calls it.
- Validate source identity/hash/page, citation IDs, exact quotes, reported figures, units and periods. Reject invalid answers; allow one bounded correction against the same evidence. These checks do **not** prove semantic entailment or complete recall.
- Cache by question, context, model/prompt and source hashes/index versions. Local guard: 40 requests/day/runtime, at least 12 seconds apart, including correction calls. Provider quota errors remain unavailable states; these guards are not a promised Google quota.
- Free-host storage is ephemeral. A dated source-only snapshot restores text and rebuilds search indexes. New runtime changes and answer caches are not durable across redeploys. Request-driven catch-up runs while serving traffic; no always-on scheduler is claimed.

## Verification

**40/40 offline tests**, **152/152 push/data checks**, **157/157 document/retrieval checks** locally. All **ten source-reviewed audit cases** have acceptable final outputs: nine real-company questions plus one isolated synthetic document-instruction challenge. Seven outputs were reused; failed cases were selectively rerun. This is a small mixed-prompt audit, not a fresh ten-case benchmark of the final prompt. Initial failures remain recorded.

Run `python -m unittest discover -s tests`. The real-model audit is operator-only and consumes quota; do not rerun it just to open the app. [Detailed evidence](project-notes/verification.md), [model audit](app/verification/gemini-cases.json), [actual hosted checks](project-notes/release.md).

## Deliberate limits

No broker import, trading recommendations, intraday infrastructure, native app, OCR or universal financial-table normalisation. Lexical retrieval has limited paraphrase recall. Discovery is bounded; a missing result does not prove absence. NSE/issuer blocking, free-host sleep, model quota and variable network latency can leave the product partial. A physical-phone test and independent usability study are not claimed.

[Requirements/page references](project-notes/requirements.md) · [Research](project-notes/research.md) · [Decisions](project-notes/decisions-and-plan.md) · [Submission draft/history instructions](project-notes/submission.md).

Assignment PDFs, raw runtime stores, experiment archives and `.env.local` remain local and excluded from Git. Public-source provenance is retained; keys and answer caches are excluded from recovery snapshots.
