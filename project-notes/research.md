# Research and source evidence

Updated 2026-10-30 (Asia/Kolkata). Product comparison, focused feedback and bounded local source experiments completed. No paid accounts, logged-in AI queries, real notification delivery, or hands-on phone tests were performed. Data retrieval/extraction evidence and failures are in verification.md; deployment and full-portfolio checks remain pending. The assignment-document review is in requirements.md.

## Problem hypothesis

An investor needs to decide which portfolio developments deserve attention and investigate them without reading every disclosure. This is grounded in M p. 1. Whether particular interaction patterns help users must be investigated; no user interviews or usability results exist yet.

## Method and stopping boundary

The user expanded the comparison to around five products. Selected Screener, Tijori, Trendlyne, StockEdge, and stockinsights.ai because together they cover Indian-company fundamentals, exchange filings, portfolio monitoring, and AI document research. This is a relevance sample, not a ranking of the whole market. No sixth product or exhaustive pricing comparison is needed before building. Stop this phase here and move next to the separate source-verification stage, initially budgeted at 90-120 minutes.

Evidence labels: **Observed** = public page/interface or image actually inspected; **Documented** = vendor describes the behavior, not independently tested; **Feedback** = a user's report, not a verified defect; **Inference** = our interpretation or proposed design. URLs below were accessed on October 30, 2026; old publication dates remain relevant limitations.

The interactive browser host was unavailable. Public HTML, help articles, API schemas, app listings, and downloaded official visuals were inspected instead. Videos were located but playback was not verified. No claim of testing native apps, responsive layouts at phone width, AI-answer accuracy, latency, or notification delivery is made. Some media returned cache misses/403; these are research-access outcomes, not proof that a product is broken.

## Five-product comparison

### Bounded comparison: conclusions to use during product design

Rechecked official pages on October 30, 2026 for this request. The five products remain a sufficient relevance sample; no further competitor expansion is proposed before November 1. Detailed evidence and technical boundaries follow in R-001 through R-006. These are product-design recommendations, not extra assignment requirements.

| Product / assignment relevance | Attention and evidence pattern | Mobile evidence and limits | Adopt / leave out of our submission |
| --- | --- | --- | --- |
| Screener: company research and document discovery | Company page has Recent/Important/Search controls, dated reports/calls and original links. AI demo still groups source documents above the answer; selection algorithm unknown. | Official Android listing and search/bottom-navigation screenshot inspected. No live phone test. | Clear document identity and reusable questions / broad stock screening and valuation tools. |
| Tijori: portfolio monitoring and exchange updates | Personalised timeline, filing summaries, company/type preferences; official Console walkthrough links summaries to full exchange PDFs. Chronology is documented; materiality ranking is not. | WhatsApp delivery documented. Console demo is desktop and cannot establish Tijori mobile-web quality. | Portfolio-specific short updates and immediate original access / brokerage sync and multiple delivery integrations. |
| Trendlyne: watchlist/portfolio alert configuration | Filing alerts have hourly/daily schedules; stock/portfolio rules and scores are separate mechanisms. Analyst estimates must not be treated as management guidance. Claim-level original-document navigation was not established. | Official Indian onboarding documents app notifications. Inspected Play screenshot/listing uses US examples; it proves a presentation pattern, not Indian-market coverage quality. | A few understandable filters / proprietary scores, analyst targets, backtests and options tools. |
| StockEdge: mobile organisation and contextual AI | My StockEdge brings portfolio changes/watchlists/filings together. Stock AI separates horizon and existing-holder/new-entry context. No page citations visible in the inspected desktop crop; presence elsewhere is unknown. | Official guide documents app/web navigation into Stock AI. Actual phone layout and evidence return behavior untested. | Clear company/task context / trading verdicts, scan library and social/education breadth. |
| stockinsights.ai: primary-document AI and announcement filtering | Documented company/date/type filters, follow-ups, source links beneath answers, content categories and noise filtering. Filtering effectiveness is a vendor claim. | Public chat demo inspected; it uses US examples. Native availability and phone citation journey remain unknown. | Constrained source context and source metadata / enterprise APIs, MCP, webhooks and broad multi-company research. |

**Opportunity hypothesis:** make one journey particularly good: important portfolio item -> why it matters -> exact source passage with date/page -> original document -> return without losing filters or reading position. Keep routine filings accessible and show partial/stale coverage. Competitors already have summaries, sources and filters; this review does not establish that they lack this journey or prove demand for our version.

**Implementation lesson:** the strongest public account is stockinsights' June 2026 extraction article: separate table-preserving extraction, period/unit/basis identification, schema mapping, deterministic reconciliation and flagged failures. Its embeddings API also exposes source metadata with returned chunks. Borrow these principles selectively; this does not justify recreating its commercial architecture or adopting an unneeded vector database.

**Demo audit:** re-inspected six saved official visuals under `tmp/research`: Screener AI still and Android screenshot, Tijori-powered Console first GIF frame, StockEdge desktop AI example, stockinsights desktop chat and Trendlyne promotional phone screenshot. Only stills/the first GIF frame were inspected, not full video playback. Zerodha's linked YouTube embed returned a cache miss on this recheck. Tijori release notes initially failed a direct fetch, then succeeded through the official homepage link. Treat these as access limits, not product defects.

**Geography correction:** Trendlyne's `faq.trendlyne.com` analyst-workflow article links to its US service, and the sampled Play content features US stocks. Use the [Indian onboarding guide](https://help.trendlyne.com/support/solutions/articles/84000348363-how-do-i-start-using-trendlyne-) and [Discover filing-alert guide](https://help.trendlyne.com/support/solutions/articles/84000373984-how-can-i-add-alerts-for-the-discover-feature-) for Indian workflow claims. Do not extrapolate US demo examples into verified NSE/BSE functionality.

### R-001 Screener: strong document discovery and company research baseline

**Why relevant:** Indian-listed-company fundamentals and original-document discovery closely match our pull data needs.

**Observed:** The [Infosys company page](https://www.screener.in/company/INFY/consolidated/) groups financial statements, annual reports, announcements and concalls. It exposes Recent/Important/Search announcement controls and links to exchange/company documents. Pros/cons are explicitly labeled machine-generated and checklist-based. This confirms the controls exist, not the quality or algorithm behind Important selection.

**Documented:** [Getting started](https://www.screener.in/docs/guides/getting-started/) describes watchlists and email updates. The [AI page](https://www.screener.in/ai/) describes direct company-document access and automatic document selection. Its official demo still visibly shows a source-document group above a narrative answer. [October release notes](https://www.screener.in/docs/) document reusable research prompts; September notes document annual-report summaries and explainable Outlook badges. These are useful precedents for company context plus reusable questions.

**Mobile:** The [current Android listing](https://play.google.com/store/apps/details?id=com.screener.mobile) is published by Screener.in/Mittal Analytics and links to its website. Its first screenshot shows company search on a small screen, suggested companies, and bottom navigation. The [2020 add-to-home guide](https://www.screener.in/docs/guides/add-to-home/) and [older support article](https://support.screener.in/article/31-do-we-have-a-screener-app-for-mobile-device) say no app; those statements conflict with the current listing. Do not repeat them as current facts. iOS availability and native implementation were not established.

**For FINN (inference):** Keep document type/year/company visible, put evidence within reach of the answer, and offer a few reusable analytical questions. Rebuilding a full screener, 10-year statement UI, Excel automation, or valuation scenario engine is unnecessary for this deadline. Source chips already exist elsewhere; our improvement hypothesis must be more specific than simply adding citations.

### R-002 Tijori: closest portfolio timeline and announcement-alert precedent

**Why relevant:** Personalised portfolio developments, filing summaries, and proactive delivery directly overlap FINN push.

**Observed/documented:** [Tijori's site](https://www.tijorifinance.com/) presents tracking, results, research, and a mixed timeline of filings, business changes, tweets and news. Its [release notes](https://www.tijorifinance.com/whats-new/) describe filing AI summaries and company-specific concall summaries. [Tijori Alerts](https://www.tijorialerts.com/) documents WhatsApp notifications and preferences by company/filing type. These establish selection mechanisms, not a published materiality-scoring formula.

The [official Zerodha integration walkthrough](https://zerodha.com/z-connect/featured/introducing-timeline-and-insights-on-console-powered-by-tijori-finance) describes a chronological portfolio timeline and earnings summaries linked to the full filing PDF. The first frame of its public GIF was inspected: a portfolio dashboard contains a compact company summary and View Document link. Only that frame was inspected; the animation/video was not played end-to-end.

**Mobile:** WhatsApp is a documented phone-delivery channel; the notification/reading experience was not exercised. Broker integration is documented, but FINN does not need brokerage sync. Do not infer the quality of Tijori's own mobile web UI from the Console screenshot.

**For FINN (inference):** Borrow portfolio-specific updates, short summaries, and immediate document access. Prefer a resumable in-app digest over multiple notification integrations in the prototype. A news/social blend is unnecessary and conflicts with the pull-side primary-evidence discipline if reused indiscriminately. Chronology alone need not be our default ordering; expose why an event deserves attention.

### R-003 Trendlyne: configurable alert and filtering precedent

**Why relevant:** Portfolio/watchlist alerts and filtering show how users define what matters instead of receiving every update.

**Documented:** [Analyst workflow help](https://faq.trendlyne.com/support/solutions/articles/84000392167) describes selecting an alert universe, parameter, values, and frequency. [Discover alert help](https://help.trendlyne.com/support/solutions/articles/84000373984-how-can-i-add-alerts-for-the-discover-feature-) documents hourly/daily corporate-filing updates. [Notification preferences](https://help.trendlyne.com/support/solutions/articles/84000379047-how-can-i-manage-notifications-of-my-alerts-) describe enable/disable controls. [DVM methodology](https://us.trendlyne.com/us/score-details/) describes Durability, Valuation, and Momentum scores and their broad inputs. The search-readable official page was available, but opening that methodology URL returned 403; no exact formula was established.

**Sources:** [Subscription documentation](https://help.trendlyne.com/support/solutions/articles/84000352548-what-do-i-get-with-a-trendlyne-subscription-) explicitly describes Forecaster as analyst estimates. Distinguish consensus estimates from management guidance in primary transcripts. This research did not establish claim-level original-document citations in every Trendlyne view; that is unknown, not a confirmed absence.

**Mobile:** The [official app listing](https://play.google.com/store/apps/details?id=com.trendlyne.markets) describes portfolio/watchlists and alerts. The inspected first promotional phone screenshot emphasises DVM metrics and market snapshots. [Mobile onboarding help](https://trendlyne.freshdesk.com/support/solutions/articles/84000348363-how-do-i-start-using-trendlyne-) documents phone notifications. Actual delivery and mobile navigation were not tested.

**For FINN (inference):** Use a small, understandable set of portfolio/event filters and explicit thresholds if alerts enter scope. Do not build proprietary stock scores, technical-strategy backtests, options tools, or analyst target-price aggregation. A stock-quality score is different from an event's importance to today's workflow.

### R-004 StockEdge: mobile organisation and contextual AI precedent

**Why relevant:** Combines watchlists, portfolio changes, exchange updates, and AI within an app/web product.

**Documented:** [My StockEdge walkthrough](https://blog.stockedge.com/exploring-my-stockedge/) organises portfolios, watchlists, company filings, notes and targets. [Watchlist guide](https://blog.stockedge.com/how-to-track-stock/) separates My Stocks, Scans, News, Updates, and Deals; Updates includes NSE/BSE announcements. This prioritises by user list, movement and scan criteria, rather than establishing a universal announcement-importance algorithm.

The [Stock AI walkthrough](https://blog.stockedge.com/stock-ai-stockedge-analysis-tool/) documents short/medium/long horizons and separate views for a new entry versus an existing holding. Its official short-term demo image was inspected: narrative appears in a right-hand panel beside price/volume, with distinct new-entry and holder advice. No filing/page citations are visible in that particular crop. This does not prove they are absent elsewhere. The article says the inputs are technical/financial data and asks users to cross-check charts and financials; this is not evidence of primary-document-only research.

**Mobile:** The walkthrough explicitly supports app and web and provides a short navigation path: open company, tap Stock AI, choose horizon. [Terms](https://stockedge.com/terms) also document mobile-app access. The inspected AI image is desktop, so phone layout and interaction quality remain untested.

**For FINN (inference):** Adopt clear company context and compact task choices; the holding-versus-research distinction is useful. Avoid buy/sell verdicts, horizon-specific trading advice, hundreds of scans, and the social/education suite. FINN's assignment rewards attention and analysis, not trade recommendations.

### R-005 stockinsights.ai: strongest documented technical match

**Why relevant:** Its [official site](https://www.stockinsights.ai/) explicitly covers India and the US, filings/transcripts, monitoring, and AI-assisted research.

**Documented:** [AI Assist](https://docs.stockinsights.ai/features/ai-assist) describes company/date/document filters, follow-up queries, source links under answers, daily source updates, and RAG. [Announcements Tracker](https://docs.stockinsights.ai/features/announcements-tracker) describes predefined content categories, noise filtering, and watchlist/type-based email alerts. These already address much of the assignment; noise filtering is a vendor claim, not an independently measured result.

**Observed demo:** The homepage chat image shows filing-type selectors, a narrative answer, original-document source chips, and follow-up input. It uses US examples, so it demonstrates the presentation pattern, not Indian-company coverage quality. Get Started redirects to [sign-in](https://www.stockinsights.ai/auth?view=sign_in); no answer was generated during this review.

**Mobile:** A web research/chat interface was documented. Native mobile availability, phone layout quality, and citation navigation on a phone were not established. Do not confuse this company with unrelated apps named Stock Insights.

**For FINN (inference):** Borrow constrained source selection, evidence metadata, reusable research actions, and explicit missing-evidence states. Avoid recreating an enterprise API/MCP/webhook product or broad multi-company research engine. The credible opportunity is a particularly usable, concise investor journey; not claiming competitors lack RAG, sources, or filtering.

## Confirmed public implementation details versus unknowns

Here, confirmed means explicitly described or visibly demonstrated in a primary public source, not independently audited production architecture.

| Product | Public evidence establishes | Unknown / must not be asserted |
| --- | --- | --- |
| Screener | [AI description](https://www.screener.in/ai/) says models receive structured access to selected official documents; model-cost modes are offered. [Company page](https://www.screener.in/company/INFY/consolidated/) labels pros/cons checklist-generated. | No verified LLM/version, retrieval algorithm, vector database, backend framework, hosting topology, or queue system. Document-backed answers alone do not prove a particular RAG design. |
| Tijori | [Release notes](https://www.tijorifinance.com/whats-new/) explicitly mention LLM concall summaries; [Alerts](https://www.tijorialerts.com/) documents WhatsApp delivery. The inspected Console demo frame says Powered by OpenAI; this identifies the label in that example widget only. | No established system-wide/current model routing, provider model/version, ingestion scheduler, classifier, database, message transport vendor, or delivery SLA. Zerodha's own infrastructure cannot be attributed to Tijori. |
| Trendlyne | Official help documents rule parameters, universe and frequency. [DVM explanation](https://us.trendlyne.com/us/score-details/) discloses broad input families and three score dimensions. | Exact formulas/weights, internal alert engine/scheduling, AI model, backend stack, and data-vendor contracts were not established. Configurable rules do not prove implementation in any specific rules framework. |
| StockEdge | [Terms section 17.3](https://stockedge.com/terms) says AI/ML supports sentiment analysis, pattern recognition, and proprietary scores. Stock AI's official guide describes technical/financial inputs and contextual outputs. | No verified model/version, RAG system, internal prompts, frontend framework, storage, queues, or extraction pipeline. AI branding is insufficient evidence for any of these. |
| stockinsights.ai | [AI Assist docs](https://docs.stockinsights.ai/features/ai-assist) explicitly identify RAG. [India embeddings API](https://docs.stockinsights.ai/api-reference/india_endpoints/filings-embeddings-search) documents semantic text chunks using OpenAI embeddings, filters and top-k; response schema includes source link/date/type, company identifiers and similarity. [Tagged-feed API](https://docs.stockinsights.ai/api-reference/india_endpoints/announcements-tagged-feed) documents summary/category/sentiment outputs. | OpenAI embedding model/version, current answer model, vector-store vendor, cloud topology, and production retrieval quality are not established. API docs were read, not called with credentials. Top-k prose/schema show inconsistent defaults/limits, so do not rely on exact values without testing. |

The stockinsights co-founder's [June 2026 results-extraction article](https://www.stockinsights.ai/blog/post/how-we-process-quarterly-results-pdfs-before-xbrl-arrives) describes table-aware OCR, a statement index identifying period/unit/accounting basis, narrow extraction, separate standardisation, typed schemas, deterministic reconciliation against filing totals, repair attempts, and flagged failures. This is an attributed production-workflow description, not an independent audit or proof that every chat answer uses those steps. The older [RAG architecture article](https://www.stockinsights.ai/blog/post/architectural-overview-of-rag-based-ai-assist) returned only Loading; no architectural claims are taken from its body.

**Our engineering implication (R-006, inference):** Keep extraction, calculation, and explanation separate. Store document identity/date/page or passage with extracted facts. Calculate comparisons in code and expose ambiguity instead of asking the LLM to invent or validate its own numbers. Use a simple bounded retrieval approach if adequate; no evidence here obliges us to adopt a vector database, agent framework, or enterprise orchestration. Actual stack choice follows source checks.

## Small public-feedback sample

These are qualitative signals from a few selected comments, not representative research or reproduced bugs. No user interviews were conducted.

- **R-007, notification overload:** On [Trading Q&A](https://tradingqna.com/t/tijori-alerts-ai-powered-whatsapp-notifications/184365?page=2), S_Balaji (September 23, 2025) describes losing their place among hundreds of WhatsApp messages and requests category preferences. Tijori's reply says preferences exist. Implication: resumable unread/read state, grouping, and an obvious filter may help; do not claim the service lacks preferences today.
- **R-008, freshness and numeric trust:** In the same thread, a Tijori-branded account in September 2025 discusses calculation mistakes and in December 2025 distinguishes delayed price data from filing notifications. These historical statements justify checking those failure modes in FINN; they do not establish current Tijori latency or current exchange-feed availability.
- **R-009, mobile and calculation consistency:** On the [Trendlyne app listing](https://play.google.com/store/apps/details?id=com.trendlyne.markets), September 16, 2026 feedback praises navigation; October 19 feedback reports watchlist sorting differences with more than ten items; October 4 feedback questions TTM-growth filters. None was reproduced. Implication: test our actual 15-company list, sorting and calculations on mobile; avoid a one-company-only demo test.
- **R-010, conflicting discovery claims:** A [Reddit thread](https://www.reddit.com/r/IndianStockMarket/comments/1q1ux95/stock_screener_services/) contains a no-mobile-app assertion followed by an Android-listing correction. The independently checked official listing resolves Android existence, not app quality. This illustrates why we must verify dates and original sources rather than turn comments into product facts.

## Focused feedback follow-up on October 30

This follow-up builds on R-007 through R-010; it does not repeat the competitor comparison. Stopped within the user's approximately 30-minute ceiling. **No competitor defect was personally reproduced.** All experiences below are user reports; vendor replies are labeled separately. No user interviews, signed-in app tests, or FINN usability tests occurred.

### Sample and access ledger

Working sample: **48 user-authored entries retained for this pass: 24 review entries and 24 discussion entries**, plus vendor replies read for context. This is not 48 unique users or 48 newly discovered items: some were rechecked from the first pass, repeat authors remain, and Apple repeats the same review in expanded markup (counted once). Other visible search hits/comments were skimmed but are not in this count. Sampling was purposive by relevance and accessible page order, not random or exhaustive. No percentages or market-wide agreement can be inferred.

All links were accessed October 30, 2026. Review dates below are publication/display dates, not dates of verified product behavior.

| Source | Retained entries | Identifiers / dates and limits |
| --- | --- | --- |
| [Screener Google Play](https://play.google.com/store/apps/details?hl=en&id=com.screener.mobile) | 3 | John Wilson Aug 26, 2026; Ayush Raj Oct 9, 2026; Yogam Aug 1, 2026. Only displayed reviews, not all 3,000+ reviews. |
| [StockEdge Google Play](https://play.google.com/store/apps/details?id=in.stockedge.app) | 3 | Rahul Sarda Aug 16, 2026; Creator bridge Aug 23, 2026; nata raj Jul 2, 2026. Replies read; one reply disputes the alphabetical-sorting complaint. |
| [Trendlyne Google Play](https://play.google.com/store/apps/details?id=com.trendlyne.markets) | 3 | Vipul Dassani Sep 16, 2026; PANKAJ THANEKAR Oct 19, 2026; sachin karuvane Oct 4, 2026. Rechecked from earlier pass, not three new reports. |
| [Trendlyne India App Store](https://apps.apple.com/in/app/trendlyne-stocks-finance/id1528733628) | 4 | rajivhpcl displayed 11/04/2022; bhattack 12/07/2022; Roopesh80 29/08/2023; Sachin677 displayed 4 Aug without year. Preserve ambiguous display dates. Old entries cannot establish current defects. |
| [StockEdge India App Store](https://apps.apple.com/in/app/stockedge-stock-market-app/id1066284206?platform=ipad) | 4 | nirajju 03/07/2025; Abhishek Kr Tyagi 19/04/2024; sksg2549 08/10/2024; Eskay28 20/02/2021. Mostly historical; allegations not independently verified. |
| [stockinsights.ai Trustpilot](https://www.trustpilot.com/review/stockinsights.ai) | 7 | All seven displayed reviews: shamiya nomani Sep 3, 2025; Arul Charles Feb 25, 2025; Abhishek Murarka Aug 17, 2024; Hari Krishna Aug 11, 2024; Jeevan Reddy Aug 9, 2024; Shanmukh Vadrevu Jul 31, 2024; James May 7, 2024. Display and experience dates sometimes differ. Small, mostly positive, stale sample; authenticity/independence not established. |
| [Tijori Trading Q&A page 1](https://tradingqna.com/t/tijori-alerts-ai-powered-whatsapp-notifications/184365), [page 2](https://tradingqna.com/t/tijori-alerts-ai-powered-whatsapp-notifications/184365?page=2) | 18 non-vendor posts | Page 1 post numbers 2, 5, 7, 8, 11, 12, 13, 14, 16, 18, 19, 20; page 2 numbers 23, 24, 26, 29, 31, 32. July 2025-August 2026. Includes brief acknowledgements/questions; not 18 independent substantive complaints. Vendor launch post/replies excluded from count. |
| [Tijori Reddit discussion](https://www.reddit.com/r/IndianStreetBets/comments/1m69sd3/tijori_alerts_by_zerodha_is_actually_damn_useful/) | 3 selected entries | Original post, Aasmahhaineelakyun unsubscribe report, Hariharan-AR alternative-service endorsement. Relative dates only in accessible extract; last is potentially promotional and given low weight. Profit claims not accepted as evidence of investment performance. |
| [Earnings tracking Reddit discussion](https://www.reddit.com/r/IndianStockMarket/comments/1vbnz69/where_can_i_track_earnings_and_all_other/) | 2 selected entries | Original post and author's follow-up describing difficulty tracking while working full time. Same author, not independent corroboration. Extract displays 2mo ago; no exact date established. |
| [Research tabs Reddit discussion](https://www.reddit.com/r/IndianStreetBets/comments/1rp2c3a/how_many_toolstabs_do_you_have_open_when/) | 1 selected entry | Original author describes seven research tabs. Relative label and search metadata conflict, so no exact date inferred. Treat as a single workflow anecdote. |

India-localised Google Play URLs with hl=en_IN/gl=IN were inaccessible through the web tool. Canonical/English pages above did expose reviews; they are not a guaranteed India-storefront sample. Apple India review pages were accessible. Full review pagination, deleted/collapsed forum content, and private groups were not reviewed. No matched native-app reviews for Tijori or stockinsights.ai were established; do not substitute similarly named apps. Trustpilot is a review site, not an app store. Vendor-hosted testimonials and generic review/affiliate articles were not counted as user evidence.

### Findings with strength and counterevidence

**R-013 Mobile reading and list controls: repeated, moderately supported within this sample.** Two StockEdge Android reviewers report sorting problems; a Trendlyne Android reviewer reports a mobile-only sorting issue above ten items. Screener's John Wilson reports repeated authentication associated with browser handoff. Conversely, Trendlyne's Vipul praises navigation, StockEdge's Creator bridge praises understandable presentation, and older Apple reviews praise UI/product maintenance. StockEdge's reply says alphabetical ordering already exists and asks for details. Conclusion: list behavior, persistence and navigation deserve tests, not a claim that these apps are universally unusable or that browser-based delivery is intrinsically wrong.

**R-014 Less collection work is a repeated benefit; faster understanding is the plausible goal.** Several stockinsights reviewers appreciate concise report/call research; one values portfolio filing tracking. The Reddit Tijori author appreciates avoiding repeated website checks, while the earnings-tracking author finds constant monitoring hard. The separate seven-tab post illustrates fragmentation. These indicate perceived time savings and monitoring value, not measured research speed or demand for every feature in one app. Some posters are traders, unlike ENAM's investment-team setting.

**R-015 Relevance and resumability: promising but narrower evidence.** Tijori forum post 2 asks for holdings/watchlist scope; post 24 describes unread-message overload and category preferences. Vendor reply says preferences already exist. One stockinsights review requests finer announcement grouping. These are a few specific requests, not proof that most alerts are irrelevant or existing category filters are absent. Hundreds-of-messages overload is one person's account. Proposed response: visible portfolio/category scope, recoverable routine items, optional read-state after core delivery works.

**R-016 Trust means verifiable numbers and honest freshness, but AI-distrust prevalence is unproven.** Trendlyne's Oct 4, 2026 review questions TTM calculations; Tijori post 18 requests YoY/QoQ figures to avoid manual work. Historical vendor replies acknowledge multi-calculation limitations and distinguish delayed prices from filing delivery. A StockEdge Apple complaint concerns strategy timing, not filing or AI latency. Avoid combining these into a general AI-hallucination rate or current feed SLA. No repeated, explicit missing-citation complaint was found in this retained sample. Source-linked claims remain justified by the assignment's primary-data rule and our engineering judgment, rather than claimed user consensus.

**R-017 Likes worth preserving.** Users praise readable explanations, information gathered together, useful monitoring, and convenient navigation. Do not reduce overload by making important data harder to reach or discarding the compact overview users value. Old stockinsights praise of accuracy is satisfaction evidence, not validation that its answers are correct.

### Relevant versus peripheral complaints

Directly relevant: sorting a real multi-company list, returning to an unread item, portfolio-specific scope, clear timestamps, understandable summaries, checking computed comparisons, and reducing repeated document/site searching.

Peripheral for FINN now: subscription/refund/support disputes (including contradictory trial-billing assertions), premium pricing, US coverage requests, learning communities, valuation verdicts, broker imports/sync, trading execution, and trading-strategy timing. Repeated broker-import complaints in old Apple reviews are real reports but do not justify adding broker integration to a mock-portfolio assignment. Historical price-delay reports reinforce honest EOD labels; they do not justify intraday infrastructure. General complaints about a company or claimed trading profits are not product-quality measurements.

### Candidate decisions and assumptions still to test

| Proposal, not final scope | Evidence basis | Test before claiming it works |
| --- | --- | --- |
| Start with a concise portfolio digest and clear company/category/period scope | R-014/R-015 plus assignment push requirement | On a manually reviewed filing sample, can the user find consequential items without missing one hidden as routine? Is priority reasoning useful rather than repetitive? |
| Preserve list order/position on return; add explicit read state only if cheap | R-013/R-015 | On 15-20 companies and enough filings to scroll, test sorting, opening a source and returning, and resuming reading on a phone. |
| Evidence beside claims, code-calculated comparisons, explicit as-of/unknown labels | R-016 plus primary-source restriction; missing-source demand remains an assumption | Audit claims/numbers against original documents; test whether users can locate supporting passages. Do not claim citations guarantee truth. |
| Short answer first, optional drill-down and a few focused questions | R-014/R-017 | Time a realistic research task; compare correctness and effort, not just response length. Can a user explain the conclusion after reading? |
| Retain two workflows; avoid accounts/broker/notification-channel expansion for this deadline | Peripheral complaint analysis and assignment scope | Confirm mock portfolio suffices and phone trial is straightforward. Still unknown whether an in-app digest alone fits actual daily habits. |

The strongest evidence supports reliability and reading ergonomics, not a new feature category. Demand for page-level citations, our priority ranking, a specific analytical question, and real habit formation remain untested. Data availability, extraction quality, generalisation and cost/latency require the next experiments. Feedback collection stops here to protect implementation time.

## Opportunities and exclusions for our deadline

**R-011, proposed opportunity, not proven competitive absence:** One short path from portfolio change -> explicit reason for priority -> original passage/number -> focused follow-up. The research shows competitors already provide summaries, sources, filters, and alerts. We should aim to execute this particular path clearly on a phone rather than claim a new feature category.

Proposed first-screen content: company, event time, one-sentence change, one-sentence importance rationale, evidence action, and visible freshness/coverage. Keep routine records recoverable. Consider read/unread or since-last-visit only if inexpensive after core retrieval works. A source drawer could include document title, period, page/passage and direct original link; this is our design proposal, not a confirmed feature gap across the five products.

**R-012, optional analytical depth:** A tightly scoped promise-versus-delivery comparison has assignment relevance (M p. 3), but competitors' existence does not make it compulsory or guarantee feasibility. Try it only if comparable primary-source guidance and delivered figures can be retrieved reliably; absent guidance must be shown explicitly.

**Unnecessary now:** Full screeners and proprietary stock scores, native distribution, WhatsApp/Telegram/broker integrations, intraday infrastructure, buy/sell signals, social/news aggregation, valuation workbenches, US expansion, enterprise APIs/MCP, and a large agent system. Useful commercial features can still be poor choices for a two-day prototype.

**Next evidence gate:** Verify real EOD data, exchange attachments, annual reports and transcripts on representative companies plus an unprepared NSE ticker. Competitor documentation is not proof our sources work, that their data is reusable, or that an entire platform should be a data dependency.

## Data-source verification queue

Source candidates below are suggestions from M p. 2, not verified recommendations. Test access from the intended runtime as well as local retrieval before committing to a provider.

| Data path | Candidate | Evidence needed | Status |
| --- | --- | --- | --- |
| EOD price and volume | Yahoo chart; official NSE completed-day CSV | Real ticker response, date/timezone, adjustment semantics, coverage, runtime reliability | Local PASS for four tickers / one day; CERA Yahoo null filled by official source, not invented. Adjustment/cloud checks pending. |
| Portfolio filings | NSE public metadata + archive | Company mapping, timestamps, filtering, attachment content, duplicates, access | Local metadata and actual attachments obtained. Not a completeness/refresh or cloud guarantee. |
| Annual reports | Company IR + ticker-driven NSE annual index | Company/year, URL, usable pages, accounting basis | Current FY2026 copies for four; Apollo revised copy rejected, original clearly labeled fallback. |
| Concall transcripts | Issuer index + exchange metadata/referenced URLs | Company/quarter, management passage, historical availability | INFY/CERA usable; KPR downloaded older call, recent coverage unestablished; Apollo full call local 403 but readable via web tool. |

Test representative companies from different sectors and sizes before choosing the final portfolio. Include at least one company outside the eventual prepared set. Check whether documents are image-only, links fail, or transcripts are missing. Do not silently replace missing primary evidence with news or model memory.

For each verification, record the exact URL, access date, ticker, data period, method, outcome, and a small reproducible evidence artifact in verification.md. Distinguish document/public access from permission to redistribute it; record applicable source terms when checked. Do not bypass access controls.

## Data feasibility findings on October 30

Full dated evidence, URLs, actual values, page references and failures are in verification.md, with exact reproducible CLI commands in `../experiments/README.md`. These findings supersede the earlier pending source status; no app exists yet.

- **R-018:** Public Yahoo and NSE EOD/announcement requests work locally for initial INFY/KPRMILL/CERA and additional APOLLOHOSP. Official EOD data corrects a Yahoo null without estimating it. Prefer completed-day data with explicit provider/date and missing values. One successful local session is not hosting readiness.
- **R-019:** Ticker-driven NSE annual metadata provides a general discovery route beyond company-specific URLs. IR seeds still require configuration; heuristic filename matching missed current documents until corrected. Must inspect content: Apollo transcript attachment is only a cover letter, revised annual PDF is malformed, and initial older reports remain dated samples.
- **R-020:** Reports contain extractable text and readable financial tables; default automatic table detection failed on the tested KPR pages. Preserve page/word provenance and verify basis/period/units. Do not promise fully automatic financial standardisation for all companies by the deadline.
- **R-021:** Four consecutive Cera transcripts are downloadable; a FY26 revenue-guidance example can be manually matched to the standalone annual figures (7.0418% growth versus 7-8% management expectation). Margin definitions, changed reporting presentation and conditional/future guidance prevent a universal mechanical scorecard. KPR recent-call coverage and Apollo server-side call access are unresolved. Smallest pull scope should be source-backed company investigation with honest document coverage; analytical comparison is optional and evidence-dependent.

## Current model and hosting options for the proposed plan

**R-022 (official documentation checked October 30, 2026):** compare only two primary model candidates and one optional same-provider escalation. These are provider-documented features/prices, not our financial-analysis benchmark. No authenticated API availability/quota or model quality test was performed.

| Option | Standard text USD / million input, output tokens | Proposed use / trade-off |
| --- | --- | --- |
| [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna) | $0.10 / $0.50 | Recommended first candidate: bounded event summaries and source-grounded brief; documented structured outputs and Responses support. Set low reasoning initially; verify quality before committing. |
| [Gemini 3.5 Flash-Lite](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite), [pricing](https://ai.google.dev/gemini-api/docs/pricing) | $0.30 / $2.50 | Alternative with listed free tier; account/project limits untested. Paid/free data-use conditions differ. Keep search grounding off for primary-source-only pull. |
| [GPT-6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol) | $2.00 / $10.00 | Optional analytical escalation if Luna fails factuality cases; not necessary for every filing. Larger model cannot cure missing sources or a malformed table. |

Initial inspection of older Gemini 2.5 Flash pricing looked economical, but its [current model page](https://ai.google.dev/gemini-api/docs/models/gemini-2.5-flash) says access is limited to users with prior active use and directs new projects to newer models. It is therefore not our new-project default. Rates are below long-context thresholds, exclude tools, caching, taxes and extra reasoning tokens. Illustrative bounded call at 12,000 input + 1,000 billed output tokens: Luna $0.0017, Flash-Lite $0.0061, Sol $0.034. Actual usage can be higher, especially reasoning; log provider-reported tokens. A proposal of 500 Luna calls plus 50 Sol calls would be $2.55 in those assumptions, not an invoice forecast or a guarantee. Recommend $5 API allowance and application-level cost controls. Do not buy capacity during planning.

**R-023 (official hosting docs checked October 30):** recommend Railway Hobby for one Python service + SQLite/PDF volume, subject to actual outbound retrieval and memory tests. [Plan docs](https://docs.railway.com/pricing/plans) state $5 monthly minimum including $5 usage, then excess usage; RAM $10/GB-month, CPU $20/vCPU-month, volume $0.15/GB-month and egress $0.05/GB. These are separate metered resources, not a guaranteed $5 total. [Regions](https://docs.railway.com/deployments/regions) include Singapore; [volumes](https://docs.railway.com/volumes) provide persistent storage. Avoid app sleeping for this scheduled design; confirm actual service settings and volume behavior during deployment. Proposed hosting allowance $10, not a billing cap or authorised purchase.

Alternative: Render paid web service + persistent disk. [Compute docs](https://render.com/docs/compute-plans) identify `0.5c-512mb` (legacy Starter) and [disk docs](https://render.com/docs/disks) explain paid persistence, single-instance constraints and deploy downtime. Official indexed [pricing](https://render.com/pricing?trk=public_profile__reactions-text) lists disks at $0.25/GB-month; the canonical pricing page's compute table was not exposed to this fetch, so no exact current compute total is asserted. [Free-service docs](https://render.com/docs/free) describe sleeping and no persistent disk; free Render is a poor fit for our SQLite/scheduled design. Railway's FastAPI guide redirected to an inaccessible page in this tool; that is a documentation-access limit, not proof it cannot host Python. No hosting account, paid plan or deployed runtime was tested.

Architecture/model recommendations and acceptance gates are in decisions-and-plan.md and verification.md. Default normal code handles fetching, dates, identity, deduplication, ranking rules, arithmetic and source-link validation. Use the LLM only for bounded language interpretation/synthesis. This limits cost and makes failures easier to inspect; it is our design rationale, not a proved speed/quality result.

## Future entry convention

### R-025 · Free-host constraint update · October 30

Only Render was revisited; no further hosting comparison. Official [Free-service documentation](https://render.com/docs/free) states 15-minute idle sleep, roughly one-minute wake-up, ephemeral local files/no free disk, 750 shared monthly instance hours, usage quotas and possible suspension for high outbound traffic. Without a payment method, exhausted bandwidth/build allowances suspend service/builds instead of adding those charges. Free outbound SMTP ports are restricted; successful NSE HTTPS access from the chosen runtime is still unverified. [Outbound IP documentation](https://render.com/docs/outbound-ip-addresses) explains region-specific, shared egress ranges: a laptop fetch cannot prove an exchange will accept cloud traffic.

[Cron jobs](https://render.com/docs/cronjobs) have a minimum $1 monthly charge, so none is configured. [.python-version](https://render.com/docs/python-version) supports a minor pin; use `3.13` for the deployment preparation. The free route deliberately uses temporary cache/recovery snapshot and request-driven refresh, not an imaginary free persistent volume. Render dashboard inspection reached sign-in; hosted retrieval is pending account/repository access. No purchase, card entry, provider signup or model request occurred.

### R-024 · Local preview evidence use · October 30

The user authorised implementation of a local interaction preview after planning. `preview/prepare_samples.py` now selects eight real filing metadata examples, eight saved PDFs and nine original passages from existing experiments, with retrieval timestamps and SHA-256 provenance. This was an offline preparation step, not additional competitor research or a new feed/AI verification. Displayed summaries, priorities and research views are manually authored. Eleven of the fifteen companies deliberately remain not loaded; the four available EOD samples remain dated October 29. Preview-specific browser/HTTP checks are in verification.md V-051 onward; they do not alter the competitor-testing limitations above.

Use a short entry: `R-### | observed date | question | URL/source | observation | implication | confidence and limitation`. Link decisions in decisions-and-plan.md to the finding IDs that support them. Record counterevidence and failed source checks as well as successes.
