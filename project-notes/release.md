# Release record

Updated October 31, 2026. Public repository authorised: https://github.com/Sanchit525/FINN---Enam-holdings . Render Free deployment and actual hosted checks are in progress. A prepared file or signed-in dashboard is not a passed deployment.

Local checks: 40/40 offline tests; 152/152 saved push/HTTP/recovery checks; 157/157 saved research/HTTP/recovery checks. No upstream/model calls in these suites. Final ten-case review is complete in `app/verification/gemini-cases.json`, reusing seven outputs and selectively rerunning A04/A06/A07. The earlier A04 full-capacity assertion was wrong: CERA call p12 says Q1 61% and roughly 80% after resumption. The audit criterion is corrected; no full-capacity claim is accepted.

Secret scan passed for existing Git-history blobs/commits and tracked/pending public files, including gzip contents. `.env.local` is ignored and untracked. Exact configured-key bytes and common credential formats were checked without printing values. Final post-commit scan and remote verification will be added below.

## Minimal Render setup if browser access fails

New **Web Service** → **Public Git Repository** → repository URL above → branch `main`, Python runtime, no root directory → build `pip install -r app/requirements.txt` → start `python -m app.server --host 0.0.0.0` → **Free ($0)** instance → environment `FINN_DATA_DIR=/tmp/finn-runtime`, `FINN_EPHEMERAL=1`, `FINN_AUTO_REFRESH=1`, and secret `GEMINI_API_KEY` from the private local file → deploy. No payment method, disk, database, paid cron or upgrade. Keep the key in the dashboard's secret field. Public-repository services may require manual deployment for later commits.

After deployment: open `/health`, confirm 15 companies and dated recovery coverage, trigger one real INFY source refresh, investigate a company and ask one source-grounded question, inspect its citation and repeat to verify cache reuse. Restart/redeploy once and verify dated source restoration/search; failed source calls must remain visible. Record actual outcomes rather than marking steps complete from local tests.
