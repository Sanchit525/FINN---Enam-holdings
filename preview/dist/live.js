'use strict';
// Real-source mode uses the same navigation, list, cards, dialog and return-state machinery.
let livePollTimer, filingTicket=0;
function istTime(value) {
  return value ? new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',dateStyle:'medium',timeStyle:'short'}).format(new Date(value))+' IST' : 'Not retrieved';
}
function liveSourceNote() {
  return `<div class="sample-note"><strong>Fetched from official NSE sources.</strong> Exchange descriptions and transparent rules; no AI summaries. Last refresh: ${escapeHTML(istTime(data.job?.finished_at || data.job?.started_at))}. ${data.autoRefreshEnabled?'':'Manual refresh mode: use Refresh sources for new requests. '}<a href="/?demo=1" target="_blank" rel="noopener">Dated interaction demo ↗</a></div>`;
}
function liveFilteredEvents(ticker) {
  const cutoff = new Date(data.now).getTime()-(ui.period==='day'?86400000:7*86400000);
  return data.events.filter(e=>(!ticker || e.ticker===ticker) && (ticker || ui.digestCompany==='all'||e.ticker===ui.digestCompany) &&
    (ui.period==='window'?e.date>=data.window.start&&e.date<=data.window.end:new Date(e.published_at).getTime()>=cutoff))
    .sort((a,b)=>b.published_at.localeCompare(a.published_at));
}
function liveCoverage() {
  return `<details class="coverage-details"><summary>Coverage & source outcomes · ${data.coverage.checked}/15 checked</summary>
    <p class="brief-note">Per-company last attempt. A successful response with zero records is different from a failed request. Returned records are not independently reconciled for exchange completeness.</p>
    <p class="brief-note">Attachments: ${data.coverage.attachmentsReady} validated; ${data.coverage.attachmentsFailed} unavailable/failed; ${data.coverage.attachmentsNotRequested} not requested yet. Price/feed success does not imply every PDF is readable.</p>
    ${data.companies.map(c=>`<div class="coverage-row"><strong>${c.ticker}</strong><div>${c.check?`<span>EOD: ${c.check.eod_status==='passed'?escapeHTML(c.check.eod_date):'failed'}</span><span>Filings: ${c.check.filings_status==='passed'?c.check.filing_count+' returned':'failed / not checked'}</span><small>${escapeHTML(c.check.start)} → ${escapeHTML(c.check.end)} · ${escapeHTML(istTime(c.check.finished_at))}</small>${c.check.eod_error||c.check.filings_error?`<small class="source-error">${escapeHTML(c.check.eod_error||c.check.filings_error)}</small>`:''}`:'<span>Not refreshed yet</span>'}</div></div>`).join('')}
    ${data.recovery?`<p class="state-label">Recovered snapshot: ${escapeHTML(istTime(data.recovery.snapshot_exported_at))}. Cached provenance remains dated; a recovery is not a fresh retrieval.</p>`:''}
    ${data.storage==='ephemeral'?'<p class="state-label">Free-host storage is temporary. Restart/sleep can reset it to the dated recovery snapshot. Refresh runs on requests, not while the service sleeps.</p>':''}
    </details>`;
}
function renderLiveDigest() {
  const events=liveFilteredEvents(),attention=events.filter(e=>e.priority==='attention'),other=events.filter(e=>e.priority!=='attention');
  const active=data.activeJob;
  $('#main').innerHTML=`<span class="eyebrow">YOUR PORTFOLIO BRIEF</span><h1>Your portfolio,<br>in focus.</h1><p class="subhead">Real exchange filings. A clear reason to review each one.</p>${liveSourceNote()}
    <div class="summary-strip" aria-label="Fetched filing counts"><div><strong>${attention.length}</strong><small>items for review</small></div><div><strong>${other.length}</strong><small>other filings</small></div><div><strong>${data.coverage.passed}<span class="denominator"> / 15</span></strong><small>price/feed checks passed</small></div></div>
    ${data.coverage.failed||data.coverage.notChecked?`<div class="state-label"><strong>Coverage needs attention.</strong> ${data.coverage.failed} failed/partial; ${data.coverage.notChecked} not checked. Cached filings may remain visible. Inspect outcomes below.</div>`:''}
    <details class="filter-panel" id="digest-filters" ${ui.filtersOpen?'open':''}><summary>Filter filings <span>${ui.digestCompany==='all'?'All companies':ui.digestCompany}</span></summary><div class="controls"><label>View period<select id="digest-period" aria-label="Fetched date window"><option value="window" ${ui.period==='window'?'selected':''}>${data.window.start} → ${data.window.end}</option><option value="day" ${ui.period==='day'?'selected':''}>Last 24 hours</option><option value="week" ${ui.period==='week'?'selected':''}>Last 7 days</option></select></label><label>Company<select id="digest-company" aria-label="Digest company">${companyOptions(ui.digestCompany,true)}</select></label></div>
    <div class="segmented" aria-label="Filing category">${[['all','All filings'],['attention','For review'],['other','Other & routine']].map(([v,l])=>`<button data-filter="${v}" aria-pressed="${ui.digestView===v}">${l}</button>`).join('')}</div><p class="brief-note">Refresh fetches the selected company, or all fifteen, for the displayed stored window. Last-24h/7d are view filters. CLI/API also accept a bounded date window.</p></details>
    <div class="refresh-row"><span class="small-label">${active?'REFRESHING '+active.completed+'/'+active.tickers.length:'EXCHANGE TIMES IN IST'}</span><button class="text-button" id="refresh" ${active||loading?'disabled':''}>${active||loading?'Refreshing sources…':'Refresh sources ↻'}</button></div>
    <div id="digest-results" aria-live="polite" aria-busy="${!!active||loading}">${liveDigestResults(events,attention,other)}</div>
    ${liveCoverage()}<p class="small-print">Priority uses exchange metadata and versioned rules, not a guarantee of materiality. No causal price explanation or financial-statement summary is generated.</p>`;
}
function liveDigestResults(events,attention,other) {
  const showAttention=ui.digestView!=='other',showOther=ui.digestView!=='attention';
  if(!(showAttention&&attention.length)&&!(showOther&&other.length))return `<div class="empty"><h2>No stored filings in this view.</h2><p>Check source coverage before interpreting this as a quiet period. Change the view or refresh sources.</p><button class="primary" id="reset-digest">Show fetched window</button></div>`;
  return `${showAttention&&attention.length?`<div class="section-heading"><h2>Worth a closer look</h2><small>${attention.length} filings</small></div>${attention.map(eventCard).join('')}`:''}
    ${showOther&&other.length?`<div class="section-heading"><h2>Other filings</h2><small>${other.length} available</small></div><p class="brief-note">Routine and unreviewed filings remain accessible, with the matching rule explained.</p>${other.map(routineItem).join('')}`:''}`;
}
function renderLiveCompanies() {
  const dates=[...new Set(data.companies.filter(c=>c.quote).map(c=>c.quote.date))].sort();
  $('#main').innerHTML=`<span class="eyebrow">YOUR RESEARCH UNIVERSE</span><h1>Fifteen companies.<br>One place to start.</h1><p class="subhead">A mock portfolio with real source results and explicit failures.</p>${liveSourceNote()}
    <div class="field search-wrap"><span aria-hidden="true">⌕</span><input id="company-search" type="search" aria-label="Search 15 companies" placeholder="Search company or NSE ticker" value="${escapeHTML(ui.search)}" autocomplete="off"></div>
    <div class="list-toolbar"><span id="company-count" class="small-label"></span><label>Sort <select id="company-sort" aria-label="Sort companies">${[['name','Company A–Z'],['move-desc','Day move ↓'],['move-asc','Day move ↑'],['coverage','Fetched coverage first']].map(([v,l])=>`<option value="${v}" ${ui.sort===v?'selected':''}>${l}</option>`).join('')}</select></label></div>
    <div class="coverage-note"><span aria-hidden="true">◷</span><div><strong>EOD ${dates.length?dates.join(', '):'unavailable'}.</strong> ${data.companies.filter(c=>c.quote).length}/15 quotes stored. INR/share; volume in traded shares. Day move calculated in backend code from official close/previous close.</div></div><div id="company-results" class="company-list"></div>${liveCoverage()}`;
  renderCompanyResults();
}
function renderLiveInvestigate() {
  return renderPullInvestigate();
}
async function refreshLive() {
  loading=true;renderLiveDigest();
  try {
    const response=await fetch('/api/refresh',{method:'POST',headers:{'Content-Type':'application/json','X-FINN-Token':data.refreshToken},body:JSON.stringify({tickers:ui.digestCompany==='all'?data.companies.map(c=>c.ticker):[ui.digestCompany],start:data.window.start,end:data.window.end})});
    const result=await response.json();if(!response.ok)throw new Error(result.error);
    data.activeJob=result.job;loading=false;renderLiveDigest();pollLiveJob();
  } catch(error) {loading=false;renderLiveDigest();announce(error.message);}
}
async function pollLiveJob() {
  clearTimeout(livePollTimer);
  try {
    const response=await fetch('/api/data');if(!response.ok)throw new Error('Refresh status unavailable');
    data=await response.json();
    if(!$('#evidence').open){const y=scrollY;render();window.scrollTo(0,y);}
    if(data.activeJob)livePollTimer=setTimeout(pollLiveJob,2000);
    else announce('Refresh '+(data.job?.status||'finished')+' · inspect per-company source outcomes');
  } catch(error) {announce(error.message);}
}
async function openLiveEvent(eventId) {
  const ticket=++filingTicket;
  showEvidence({eventId},true);
  $('.drawer-body').insertAdjacentHTML('afterbegin','<div id="filing-request" class="state-label" role="status">Retrieving and validating the original filing… No model call.</div>');
  try {
    const response=await fetch('/api/filings/'+encodeURIComponent(eventId)+'/evidence');
    const result=await response.json();if(!response.ok)throw new Error(result.error||'Filing unavailable');
    data.documents[result.document.id]=result.document;data.evidence[result.evidence.id]=result.evidence;
    data.events.find(e=>e.id===eventId).evidence=result.evidence.id;
    if($('#evidence').open&&ticket===filingTicket)showEvidence({eventId,evidenceId:result.evidence.id},false,true);
  } catch(error) {
    if($('#evidence').open&&ticket===filingTicket){const status=$('#filing-request');status.textContent='Filing request failed: '+error.message+'. Any previously stored text below has not been refreshed. The original link remains available.';}
  }
}
