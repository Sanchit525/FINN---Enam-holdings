# Verification record

Updated 2026-10-30 (Asia/Kolkata). A plan or a named provider is not a passed check. Use PASS / FAIL / NOT RUN / BLOCKED with evidence. Suggested engineering checks below are our quality criteria, not extra assignment deliverables.

## Completed document checks

| ID | Check | Result and evidence |
| --- | --- | --- |
| V-001 | Inventory assignment documents | PASS: folder initially contained exactly two PDFs, matching the main challenge and companion reference. |
| V-002 | Read complete source text | PASS: main 4 pages and reference 3 pages extracted and read in full, with page boundaries preserved. Text copies under tmp/pdfs are review intermediates. |
| V-003 | Inspect all source pages visually | PASS: all seven pages rendered and inspected; headings, taxonomy table, deadline, recipient, and exact subject checked against the PDF images. Main printed page numbers match PDF pages. |
| V-004 | Extraction integrity | PASS with note: pypdf warned of wrongly pointing objects in the reference PDF; independent PyMuPDF opening/rendering succeeded for all pages, and visual review confirmed the readable content. No page was skipped. |
| V-005 | Reference versus requirements | PASS: R p. 1 explicitly makes the categories optional; M pp. 2-3 explicitly frame frontend features as illustrations/menu. |
| V-006 | No-build instruction | PASS at this stage: only project notes and temporary PDF-reading dependencies/extractions/renders were created. No app implementation or scaffolding. |

## Checks to perform before scope commitment

| ID | Check | Status | Expected evidence |
| --- | --- | --- | --- |
| V-010 | Current product capabilities and public feedback | PASS for bounded desk research only | Five official product/documentation comparisons, walkthrough/demo visuals, and feedback from Trading Q&A, Google Play and Reddit recorded in research.md R-001 to R-012. Does not certify product accuracy, complete feature coverage, or mobile usability. |
| V-011 | EOD price/volume retrieval | PASS locally with missing-data case | Four Yahoo responses and official NSE October 29 CSV; three exact close/volume cross-checks within numeric tolerance; CERA Yahoo null resolved by separately labeled official source. No adjustment/history/cloud reliability validation. See experiment evidence below. |
| V-012 | Exchange filings retrieval | PASS locally on bounded windows | October metadata for four tickers; original attachments for initial three and Apollo's earlier-quarter cover letter. Not completeness, deduplication or sustained refresh proof. |
| V-013 | Annual-report retrieval and extraction | PARTIAL/PASS locally | FY2026 documents downloaded for four companies; Apollo revised PDF rejected, original submission extracted as explicit fallback. Table extraction is not universally reliable. |
| V-014 | Concall transcript retrieval and extraction | PARTIAL | Infosys actual earnings-call bundle, Cera four recent calls, KPR old call extracted. Apollo cover letter succeeds; full linked transcript returns local 403 despite successful web lookup. |
| V-015 | Feasibility beyond prepared companies | PARTIAL generalisation evidence | APOLLOHOSP used unchanged ticker-driven prices/NSE metadata/annual-index functions; report fallback works, full transcript blocked. This is not proof all NSE tickers work or that document coverage is complete. |

## Product acceptance checks after implementation

| ID | Check | Status |
| --- | --- | --- |
| V-020 | Reviewer can open the deployed prototype on a phone and complete both workflows | NOT RUN |
| V-021 | 15-20 portfolio companies and a handful of ad-hoc demo companies are configured and usable | NOT RUN |
| V-022 | Digest prioritisation is defensible on a manually reviewed sample; routine records remain accessible and coverage is visible | NOT RUN |
| V-023 | Dates, periods, price/volume values, and any financial comparisons match the source; units and consolidated/standalone basis are consistent | NOT RUN |
| V-024 | Pull claims trace to AR/transcript evidence; missing guidance is not invented; model/company-memory or secondary commentary is not used as evidence | NOT RUN |
| V-025 | Unprepared available NSE ticker works through the same engine; missing documents, invalid symbols, and provider failures produce clear states | NOT RUN |
| V-026 | Loading, empty, error, retry, freshness, and source-access behavior work on mobile; no dead ends in core journeys | NOT RUN |
| V-027 | Model cost/latency and cache behavior observed on representative runs; no secrets in client or repository | NOT RUN |
| V-028 | Repository startup instructions work; prototype/repo/history links are accessible to reviewers; covering email includes required trade-offs/omissions/next steps | NOT RUN |

## Product-research access and evidence checks

| ID | Check | Result / limits |
| --- | --- | --- |
| V-030 | Public official pages and documentation | PASS: Screener company/AI/docs; Tijori site/release notes/Alerts plus official Zerodha integration; Trendlyne help/app listing; StockEdge guides/terms; stockinsights.ai feature/API docs and June 2026 extraction article. Exact links and evidence boundaries are in research.md. |
| V-031 | Public demo visuals | PASS, limited: inspected Screener AI still and Android screenshot, StockEdge AI desktop screenshot, stockinsights.ai desktop chat image, Trendlyne promotional phone screenshot, and first frame of Tijori-powered Console GIF. Originals under tmp/research; visual content is not a live product test. Stockinsights demo uses US examples, not Indian coverage proof. |
| V-032 | Interactive browser and mobile usability | BLOCKED for hands-on testing: browser access host unavailable. Used official public documents/media instead. No phone-width browser test, app installation, login, notification test or live AI query performed. Video playback not verified. |
| V-033 | Access failures | Recorded: original Tijori filing-summary image returned 403; official Console GIF alternative downloaded successfully. Stockinsights older RAG article rendered only Loading and another engineering post failed retrieval. Some media/support pages returned cache misses; Trendlyne DVM direct opening returned 403 although search-readable official text was available. No inferred architecture from inaccessible bodies. |
| V-034 | Conflicting mobile information | PASS: older Screener help says no app; current Google Play listing identifies Screener.in/Mittal Analytics and official website. Android presence established; iOS availability/framework not established. |
| V-035 | Private-architecture claims | PASS for attribution review: public RAG/embedding/extraction details limited to stockinsights documentation and author account. Other products' model/framework/database/cloud/queue specifics marked unknown. Demo OpenAI label attributed only to the Tijori-powered Console widget example. |
| V-036 | Bounded feedback follow-up | PASS for desk research: retained sample 48 user entries (24 reviews, 24 forum/discussion posts), with source/count/date ledger in research.md. Some earlier entries rechecked; repeat authors and old reviews retained with limitations. Vendor replies excluded from user count; duplicate Apple review markup counted once. Not a representative survey. |
| V-037 | Feedback source access | Partial: canonical Google Play, India Apple listings, Trustpilot and selected public discussions accessible. India-localised Google Play query URLs inaccessible; no exhaustive review pagination/private-group access or matched Tijori/stockinsights native-store sample established. Exact Reddit dates not inferred from conflicting relative labels. |
| V-038 | Reproduce reported problems | NOT RUN: no sorting bug, alert delay, calculation error, authentication issue or AI-answer defect personally reproduced. Vendor response to StockEdge sorting and existing Tijori preferences noted as counterevidence. |
| V-039 | Test feedback-derived product assumptions | NOT RUN: priority usefulness, citation usability, 15-20-company mobile sorting/return-position, reading resumption, and timed research task. These remain proposed acceptance checks, not passed functionality. No app work started. |

If numerical comparisons are included, test them against original figures, including zero or negative comparison bases, different fiscal periods, and unavailable/non-comparable metrics. If alerts are included, test threshold configuration and duplicate alerts. If guidance analysis is included, distinguish an explicit forecast from an aspiration and compare the same metric, period, and accounting basis. These checks are conditional on scope.

## Future verification entry format

`ID | date/time and timezone | build/commit (when applicable) | question | exact command or user steps | source URL + company/period | expected | observed | PASS/FAIL | evidence path | limitation/follow-up`

Keep provider failures and known gaps in this record. Update checklist items only after corresponding evidence exists. Bounded local source checks below are verified; app functionality, full numerical accuracy, user satisfaction, deployment and sustained provider availability remain unverified.

## Dated data experiments on October 30, 2026

Window: approximately 07:39-08:00 UTC (13:09-13:30 IST), stopped early because the source feasibility and limitations were sufficiently clear. All saved samples are historical evidence, not live app data. No app was scaffolded. Python 3.14, standard-library HTTPS/HTML/CSV/JSON, PyMuPDF 1.26.5; no paid provider/model calls.

Reproduction: `../experiments/README.md`, `data_probe.py`, `companies.json`, `inspect_samples.py`, `validate_samples.py`. Run from workspace root. The README records principal commands, source/config changes, failed initial selection, and extraction revisions. `samples/commands.jsonl` records later CLI calls; `samples/requests.jsonl` is the complete 43-attempt local HTTP ledger with exact URLs, UTC retrieval timestamps, status/error, duration, byte size, SHA256 and saved file. Raw responses, PDFs, per-page text, discovered links and lineage remain under `experiments/samples/`. Successful URL/hash matches are reused on reruns, retaining original retrieval times.

### Price and volume evidence

Yahoo chart endpoint uses `{TICKER}.NS`, range 1mo, interval 1d. Successful initial responses were retrieved 07:41:15-07:41:18 UTC; held-out Apollo at 07:45:30 UTC. October 30 observations were excluded because it was an incomplete trading day. Numeric close below is INR/share; volume is shares, not rupee turnover or delivery quantity. Yahoo `quote.close` is distinguished from `adjclose`; corporate-action adjustment conventions were not independently validated.

The official [NSE October 29 EOD CSV](https://nsearchives.nseindia.com/products/content/sec_bhavdata_full_29102026.csv) was retrieved at 07:52:11 UTC (13:22:11 IST). Parsed EQ-series records use `DATE1`, `CLOSE_PRICE`, `TTL_TRD_QNTY`.

| Ticker | Sector / role | Data date | Official close INR | Official traded shares | Yahoo comparison |
| --- | --- | --- | --- | --- | --- |
| INFY | IT services / initial | 2026-10-29 | 1,146.50 | 14,048,472 | Matches both |
| KPRMILL | Textiles / initial | 2026-10-29 | 1,082.70 | 441,531 | Matches both; floating-point close rounded for display |
| CERA | Building products / initial | 2026-10-29 | 4,439.00 | 15,684 | Yahoo close AND volume null on this date; last complete Yahoo row is Oct 28, 4,449.00 / 24,609 |
| APOLLOHOSP | Healthcare / additional ticker | 2026-10-29 | 8,200.00 | 583,531 | Matches both |

The sample deliberately spans very different business scale and sectors; no live market-cap classification was validated. Official CSV is a practical EOD alternative and fills CERA's gap without fabricating or carrying forward a price as today's value. A single day does not establish historical-adjustment accuracy. `samples/official-eod-2026-10-29.json` contains complete original rows; `validation-results.json` records the actual cross-checks. The first sandbox attempt failed DNS; the same ordinary request with permitted outbound-network access succeeded. That sandbox failure is not attributed to Yahoo.

### Exchange metadata and original attachment evidence

Generic endpoint: `https://www.nseindia.com/api/corporate-announcements?index=equities&symbol={TICKER}&from_date=01-10-2026&to_date=30-10-2026`. No browser cookies/challenge/proxy used. Returned counts: INFY 17, KPRMILL 6, CERA 2, APOLLOHOSP 3. Counts describe returned windows, not independently reconciled completeness. Date/time fields are preserved as exchange strings; display timezone should be explicitly IST in the product.

| Ticker | Actual metadata item | Download / content check |
| --- | --- | --- |
| INFY | Oct 28, 2026 transcript; downloaded 07:45:19 UTC | [NSE attachment](https://nsearchives.nseindia.com/corporate/Infosys_28102026173824_SE_filing_Earnings_call_transcript.pdf): 48 pages, includes press conference AND Q2 FY27 earnings call. Actual earnings-call title on PDF p. 24; do not confuse the separate 22-page press-conference PDF with the earnings call. |
| KPRMILL | Financial results Sep 30, 2026; exchange received Oct 28 11:49:27, disseminated 11:49:28; seq_id 106831636 | [NSE attachment](https://nsearchives.nseindia.com/corporate/KPRMILL_28102026114824_BMOUTCOME28102026.pdf), downloaded 07:45:22 UTC; 12-page results/auditor bundle. |
| CERA | Q2/H1 FY27 call notice; received Oct 22 17:09:19, disseminated 17:09:20 | [NSE attachment](https://nsearchives.nseindia.com/corporate/CERA_22102026170832_CERAQ2CALL221026s.pdf), downloaded 07:45:24 UTC; 2-page invitation. This is NOT a Q2 transcript or released Q2 results. |
| APOLLOHOSP | Earlier-window transcript item Aug 19 18:00:36, disseminated 18:00:37 | [NSE attachment](https://nsearchives.nseindia.com/corporate/APOLLOHOSP_19082026180025_transcript_Q1FY27.pdf), downloaded 07:50:51 UTC; one-page cover letter, NOT the actual call transcript. |

### Annual reports and transcripts

Discovery is from fetched index pages and ticker-based NSE metadata, not just a fixed collection of PDF links. `https://www.nseindia.com/api/annual-reports?index=equities&symbol={TICKER}` worked for all four tickers; each record includes from/to years, submission type/date and attachment URL. IR index seeds are configurable but were manually located; fully automatic IR-site discovery for arbitrary companies is not solved.

| Company | Current annual-report evidence | Transcript evidence and limitations |
| --- | --- | --- |
| Infosys | FY2025-26, 383 PDF pages, 381 with >=50 non-whitespace text characters. [Issuer PDF](https://www.infosys.com/investors/reports-filings/annual-report/annual/documents/infosys-ar-26.pdf), downloaded 07:46:04 UTC. | Q2 FY27 call Oct 23, 2026 is in exchange bundle; text on all 48 pages. A separately selected issuer transcript turned out to be the press conference; classification limitation preserved. |
| KPR Mill | FY2025-26, 233 pages / 228 text-bearing. [NSE PDF](https://nsearchives.nseindia.com/annual_reports/AR_29464_KPRMILL_2025_2026_A_4793355_27062026112749.pdf), downloaded 07:52:11 UTC. | [Issuer call PDF](https://bkend.kprmilllimited.com/media/documents/Q1CONCALLTRANSCRIPT.pdf), 24 pages; call Aug 4, 2023, Q1 FY24. It is old and must not be presented as current. Four recent quarters were not established; web search finds other historical documents that the tested index parser did not discover. |
| Cera | FY2025-26, 206 pages / 204 text-bearing. [Issuer PDF](https://www.cera-india.com/sites/default/files/2026-06/CERA%20Annual%20Report%202025-26.pdf), downloaded 07:48:34 UTC. | Four consecutive calls downloaded from issuer Events page: Q2 FY26, Q3 FY26, Q4 FY26, Q1 FY27; 14/13/14/15 PDF pages respectively, all text-bearing. First at 07:46:12 UTC, remaining at 07:51:24-26 UTC. |
| Apollo Hospitals | Revised FY2026 entry returned malformed/partial PDF (14 text-bearing pages / 278; structural parser errors), **rejected**. Original submission downloaded 07:53:46 UTC: [NSE PDF](https://nsearchives.nseindia.com/annual_reports/AR_30122_APOLLOHOSP_2025_2026_A_16882027_01082026125310.pdf), 301 pages / 298 text-bearing, no parser warnings on extraction. Original is an explicit fallback, not verified replacement for revised content. | Cover letter dynamically yielded the [full Q1 FY27 transcript URL](https://www.apollohospitals.com/sites/default/files/2026-08/transcript-of-apollo-hospitals---q1-fy27-earnings-call.pdf); local request at 07:54:43 UTC returned 403. Assistant web lookup read an 18-page Aug 13, 2026 transcript. This is a **web-only lookup success**, not backend ingestion success. |

IR failures/selection issues retained: guessed KPR `/investors/` returned 404; corrected public `/financial-result` and `/financial-result-con-col-invitation-and-transcript` pages worked. Cera's top-level page required financial/events/AGM child pages. An un-decoded `%20` filename initially missed Cera's current report and selected FY2020; fixed URL decoding and NSE year metadata recovered FY2026. KPR initial IR filename match selected FY2024 before current-year NSE discovery. None of these older documents is mislabeled current in the evidence.

### Actual passage and table verification

**Passage:** Cera Q2 FY26 call, November 12, 2025, PDF/printed p. 5, management speaker Deepak Chaudhary: "we should end up at something like 7% to 8% growth for the full year." The following CFO response conditions expectations on end-market demand recovery. [Original transcript](https://www.cera-india.com/sites/default/files/2025-11/Q2%20FY%202025-26%20Earnings%20Call%20Transcript.pdf). Exact extraction saved in `CERA-transcript-3-20261030T075126135029Z.pdf.text.json`; page rendered and visually checked.

Cera annual report FY2026 PDF p. 52 (printed p. 89) and PDF p. 148 (printed p. 185) show **standalone** revenue from operations FY2026 = **205,011.98 lakh INR**, FY2025 = **191,525.12 lakh INR**, PBT FY2026 = **26,911.25 lakh**, PAT = **20,418.56 lakh**. Numeric growth `(205011.98 / 191525.12 - 1) * 100` = **7.0418%** on this reported standalone annual basis. This supports one manually checked revenue-guidance example, not a generic automated verdict. Annual report p. 56 explains divestments and no requirement for consolidated FY2026 results; do not silently mix a consolidated comparator. The annual EBITDA definition includes items different from transcript EBITDA excluding other income; margin comparisons require reconciliation.

**KPR table:** Sep 30, 2026 quarter, unaudited; verified against rendered original PDF pages 3 (standalone) and 9 (consolidated). All figures below are **INR lakh**, not crore. Revenue from operations is sale of products/services plus other operating revenue; total income additionally contains other income.

| Basis / PDF page | Sales/products-services | Other operating revenue | Revenue from operations (sum) | PBT | Profit for period / PAT |
| --- | --- | --- | --- | --- | --- |
| Standalone / 3 | 119,512 | 4,144 | 123,656 | 43,714 | 33,425 |
| Consolidated / 9 | 187,117 | 6,857 | 193,974 | 47,939 | 34,500 |

Consolidated revenue above is 1,939.74 crore after dividing lakh by 100; do not use half-year columns or standalone profit as the quarterly consolidated value. Word boxes and images are saved. Default `find_tables()` returned zero tables; text-strategy detection found a table but split cells/headers incorrectly. Thus financial tables are human-readable and text-bearing, **not yet proven reliably structured by an automatic parser**. No OCR service was run. Unsorted text substantially improved the initial layout-sorted extraction. Some source text has replacement characters; character count is not a correctness metric. Rendered evidence pages were sampled, not every annual-report page audited.

The latest Cera transcript has an apparent comparative-year inconsistency (June 2026 discussion labels a prior Q1 as FY25) and describes a revenue/discount presentation change. Preserve the source wording and reconcile against filings; never silently repair the year or compare inconsistent bases.

### Conclusions and remaining gate

- **V-040 PASS:** 43 request-file SHA256 integrity checks; official date/units and three Yahoo versus official close/volume checks; CERA null case asserted. `python .\experiments\validate_samples.py` passed. One-day evidence only.
- **V-041 PARTIAL:** Index-driven download and text extraction demonstrated; metadata names do not guarantee full document content. PDF quality, chronology, revisions, units and basis checks are needed before analysis.
- **V-042 NOT RUN:** Fetching from a chosen hosting region/runtime, browser CORS, schedules, rate-limit longevity, 15-20-company coverage, source reuse/redistribution rights and cloud cold-start performance. Ordinary public requests without bypass succeeded locally; that is not a production licence or an SLA. NSE/Screener terms URLs attempted via web were inaccessible/404; no rights conclusion was inferred. Screener was not used by the scripts.
- **V-043 SCOPE:** Cera four-call research is feasible as a carefully checked example; universal four-quarter guidance-versus-delivery is not demonstrated. KPR recent calls unestablished; Apollo full call blocked locally; future FY27 guidance is not yet a completed-year outcome. Prefer business/management commentary plus a few source-checked figures, with coverage and unavailable states.

Stop network exploration here. Next implementation gate is a small retrieval check in the chosen actual runtime and full-portfolio coverage selection; not more competitor research or a full application during this stage.

## Acceptance plan for the recommended product

Defined October 30. **Every condition below is NOT RUN for the application.** Existing local source passes do not satisfy these product/runtime checks. These measurable targets are our launch criteria, not requirements invented from the brief. Record actual observations, device/runtime, commit, timing and evidence before marking pass.

| ID | Measurable acceptance condition |
| --- | --- |
| A-01 Hosted retrieval gate | In actual Railway Singapore runtime, obtain an official completed-day EOD file, ticker metadata, one actual exchange PDF, AR and full call for available cases. Record URLs/status/hash/source dates and memory/time; repeat after restart and >=15 minutes, with persisted records unchanged. At least one non-demo ticker uses generic discovery. Each request times out <=25 seconds; normal ingestion job <=3 minutes or returns explicit partial/failure. No spoofing/proxy/challenge bypass. |
| A-02 Full portfolio coverage | All 15 proposed holdings resolve to the intended NSE company. Every EOD row has a correct completed-session date/INR close/share volume, or explicit unavailable/stale state. Reconcile each with the official source; 15/15 accounted for, no nulls rendered as zero. Confirm all 15 filing refresh outcomes, not just four experiment tickers. |
| A-03 Meaningful push | Opening Digest without a research prompt shows the selected period's fetched filings, prioritised with specific reasons. Counts reconcile to stored fetched metadata after documented deduplication; every record remains reachable, including routine and unknown. Zero unreported company/source failures presented as "no events." |
| A-04 Ranking audit | Manually label 20 varied real filings, including results, management change, meeting notice and compliance where available. At least 90% of reviewer-marked material records appear in attention section; no results/management-change test case silently collapsed as routine. Preserve disagreement/uncertainty and record the human assessment, not self-evaluation by LLM. If sample categories are missing, record that test gap. |
| A-05 EOD calculations | Check day-change calculation from close/previous close and source units on all 15 rows. Comparison base zero/missing => unavailable. Any volume ratio uses exactly 20 valid prior sessions excluding current; incomplete baseline => omitted with explanation. No inferred causal price explanation without evidence. |
| A-06 Meaningful pull | INFY and CERA complete ticker -> investigation -> evidence -> follow-up using AR AND actual transcript. TITAN must pass real coverage before becoming the third prepared demo; otherwise disclose failure and choose a replacement through the same process. Brief <=250 words excluding evidence; dates/partial coverage visible before conclusions. No press conference or cover letter mislabeled an actual earnings call. |
| A-07 Factuality | Ten manually audited questions across at least three companies: every substantive company claim has an eligible source reference, citation resolves to correct company/document/PDF page, and all displayed numeric facts match checked period/basis/unit. Zero fabricated numbers, sources or current guidance in this audit. Include unanswerable, contradictory/year-typo and analyst-question-versus-management-answer cases. Passing this sample is not a universal accuracy claim. |
| A-08 Generalisation | After adapters are frozen, two valid symbols outside holdings AND the three research demos, without preloaded IR/PDF config: at least one available-source case retrieves AR + actual call through generic discovery and answers from those documents. Both preserve identity and honest missing/block/failure states. Also test invalid ticker and Apollo known blocked/cover-letter case. No symbol-based canned-answer branches. If no available case passes, requirement remains unresolved. |
| A-09 Evidence usability | A claim's reference reaches its passage/source details within two taps; original document link works or failure is clearly labeled. Return preserves query/filters/scroll position. Test one real phone and 360/390/768 CSS-pixel browser widths: no page-wide horizontal overflow, >=44px main touch targets, readable text and keyboard/focus behavior. Find a material item and inspect evidence in <=30 seconds in an observed task; record user/author-test limitation. |
| A-10 Failure states | Replay saved CERA null, KPR old call/404, INFY press conference, Apollo cover letter/403/malformed revision plus superseded-document fixture. All are correctly labeled; malformed/blocked contents excluded, old commentary not presented as current, original-versus-revision caveat preserved, cached samples dated. No hidden failure triggers fabricated output. |
| A-11 Performance | On actual runtime, cached digest target <=2 seconds and cached investigation <=2 seconds over five warm runs; uncached model answer on already indexed sources target <=30 seconds over five runs. New-company ingestion shows progress immediately and either completes within bounded job time or produces partial/error. Report observed timings rather than claiming these targets are achieved now. |
| A-12 Jobs and persistence | Two overlapping refresh triggers create one effective job; repeated feed ingestion creates no duplicate digest items; failed company doesn't abort all others. Restart resumes/expires leases and catches up overdue jobs once. Database, PDF hashes and source versions survive restart/redeploy on volume. One PDF extraction at a time; measure peak memory. |
| A-13 Model/cache/cost | Repeated identical question/source set invokes no new model call. New source hash/prompt version invalidates affected cache. Malformed model JSON gets at most one bounded repair and then a clear failure; missing citation IDs never reach UI. Model outage leaves prices/filings/evidence usable. Per-client/global request limits, output caps and spend reservations stop runaway calls without exposing provider secrets. |
| A-14 Submission | Reviewer can open phone URL, GitHub repo and actual AI history; startup instructions work from clean environment. Covering email includes built behavior, decisions/trade-offs, omissions, limits and next steps. Use exact address/subject in requirements.md; cutoff hour remains unknown. |

## Planning verification

- **V-044 PASS for documentation review only:** current official OpenAI model pages, Google model/pricing pages, Railway plan/volume/region docs and Render persistence/free/compute docs checked; links/rates and retrieval limits recorded in research.md R-022/R-023. No API/model benchmark or cloud deployment performed. Gemini 2.5 access limitation prevented recommending it for a new project.
- **V-045 PASS for secret-safe presence check:** only booleans for named environment-variable presence and names of root config files were printed. All checked API/hosting/GitHub variables unset, no workspace .env or app config detected. Not proof no credentials exist in other stores; no secret values printed.
- **V-046 NOT RUN:** 11 untested portfolio companies, TITAN demo discovery, two fresh-symbol generalisation cases, actual hosting runtime, proposed model factuality/latency/cost, mobile journey. Portfolio names/size intentions are proposals, not verified current coverage or exact market-cap categories.
- **V-047 PASS for planning boundary:** this stage changed project notes only. No application scaffold, deployment, paid purchase, scheduler activation or model request.

## Bounded competitor recheck for the five-product request

- **V-048 PASS for desk research, October 30, 2026:** re-opened official Screener company/AI/Android pages; Tijori homepage/Alerts/release notes and Zerodha Console walkthrough; Trendlyne filing-alert and Indian onboarding help plus Play listing; StockEdge portfolio/Stock AI walkthroughs and AI/ML terms; stockinsights homepage, AI Assist, Announcements Tracker, India embeddings API and June 2026 results-extraction article. Direct links and attributed findings remain in research.md. No sixth competitor, pricing survey, paid account or app implementation added.
- **V-049 PASS for limited visual inspection:** six existing official demo/promotional stills inspected again with the image viewer. Tijori evidence is only the first GIF frame. Linked YouTube embed returned cache miss; no video playback or interaction was verified. No live AI answer, notification, phone-width layout or native app test was performed in this pass. The earlier browser-host failure remains an access limitation, not a new test result.
- **V-050 PASS for evidence correction:** Trendlyne analyst article/Play promotional examples are global/US-facing; Indian help is now the basis for Indian notification workflow claims. Vendor RAG/embeddings/extraction disclosures remain attributed public descriptions, not an independent production audit. No private architecture inferred from screenshots, cloud logos or AI branding. Opportunity and adoption recommendations remain hypotheses, not confirmed competitor deficiencies.

## Local interactive preview verification · October 30, 2026

This stage is explicitly authorised by the user's newer implementation request. Earlier no-app/planning entries describe their completed stages. The preview is a local interaction artifact, not the integrated final product; **A-01 through A-14 are not collectively passed**. In particular no live AI, ingestion, hosted runtime, arbitrary-ticker generalisation or physical-phone test is implied.

Runtime: Python 3.14 standard-library HTTP server on `127.0.0.1:8765`; buildless HTML/CSS/JS. Data prepared offline from saved experiments. Server initial sandbox process was unreachable from the browser; stopped that process and restarted outside the network sandbox with loopback binding. No firewall/security settings were changed. Local HTTP checks similarly required permitted socket access. The retained server is left running so the user can try the URL; stop with Ctrl+C in its terminal.

| ID | Actual check | Observed result / limitation |
| --- | --- | --- |
| V-051 | Preparation and syntax | PASS: `python preview/prepare_samples.py` prepared 15 companies, 8 filing examples, 8 PDFs and 9 source passages without network. `node --check` passed for both JS files; Python compilation passed for preparation/server/check script. |
| V-052 | Running HTTP and evidence identity | PASS **42/42** via `python preview/check_preview.py`. HTML/JS/CSS/data/source reader routes return 200; eight served PDFs have original signatures and matching saved SHA-256 hashes; nine displayed passages match saved page extraction after whitespace normalisation; four quotes dated Oct 29; unknown documents and unrelated workspace/traversal paths return 404. Original rendered KPR table is served. Results: `preview/check-results.json`. This checks saved evidence, not upstream freshness. |
| V-053 | Digest → passage → source → return | PASS in the in-app Chromium browser. KPR + October selection returned 1 attention and 2 routine examples. Opened consolidated PDF page 9 raw passage/table image; followed saved source-page link, then original NSE link. Actual original PDF viewer showed the 12-page KPR document and dated cover letter. Closed source tabs and drawer; filters/focus remained and scroll restored to 648.7999878 versus stored 648.8 CSS px. Final-code browser-Back repeat with KPR/week/For review restored **540.7999878 versus 540.8 px**, same selected filters, closed modal and evidence-button focus. |
| V-054 | Fifteen-company navigation, sorting and research | PASS at confirmed 390×844 CSS px. A–Z list contains all 15. Descending moves: INFY +2.08%, APOLLO +0.77%, CERA −0.22%, KPR −0.81%, then 11 unavailable quotes; ascending reverses the four priced rows and keeps unavailable values last. CERA search returns 1/15; investigation/back retains search and sort. Exercised all 15 selections through the research dropdown: correct company titles, four saved/limited views, eleven explicit not-loaded states. CERA management view cites the August passage containing 18–20% guidance and INR 85 crore planned spend. |
| V-055 | States and keyboard | PASS for the implemented sample paths: empty Oct 30 window/reset; loading replay changes aria-busy to true with 2 skeletons, then false with 2 saved attention items; other/routine filter exposes 5 records; metadata-only drawer says passage not saved. KPR old call clearly dated Aug 2023/excluded from current outlook; Apollo cover letter/previous 403 clearly partial. Escape closes/restores citation focus. Initial keyboard boundary check found focus could leave the drawer; explicit trap added and retested: Shift+Tab close → Original source, Tab last source → close, both inside modal. This is not a full accessibility audit. |
| V-056 | Layout, targets and browser logs | PASS for confirmed **390×844** main views and drawer: measured document widths 375 CSS px with scrollbar, or 390 for locked drawer, never wider than viewport. No measured visible button below 44 CSS px height in Companies/Investigate after citation-target adjustment. No error/warn console entries on inspected final flow. Source reader verified at desktop 1280×720, PDF page 25/48 and original text. Attempts to change the override to 360×800 were not reflected in measured page dimensions, so **360/768 widths and real-phone behavior remain NOT VERIFIED**. Do not report the attempted override as a passed test. |
| V-057 | Local scope and delivery | PASS for scope: no paid hosting, API credentials, model calls, backend ingestion or new competitor searches. Server serves only preview assets and explicitly mapped saved source files. Date/manual-content labels visible. Server kept running for the user; source and screenshots provided. Broader security/performance/product acceptance remain pending. |

Screenshots: `preview/screenshots/digest-mobile.jpg`, `companies-mobile.jpg`, `investigation-mobile.jpg`, `evidence-mobile.jpg`, `empty-mobile.jpg`, `loading-mobile.jpg`, `partial-coverage-mobile.jpg` are actual browser captures at the confirmed phone-sized viewport. `source-reader-desktop.jpg` is explicitly desktop. Action observations are saved in `preview/browser-results.json`. These are author-operated checks, not independent usability testing or a timed <=30-second investor study. Remote original access was verified for KPR, not every external link; all eight saved PDFs passed local identity/HTTP checks.
