'use strict';
// Live primary-source research and explicit server-side answers. Manual demo stays separate.
const pullState={records:{},results:{},loading:{},queryTickets:{},conversations:{},lastHistories:{},busy:null,error:'',questionBusy:false};
let pullTimer;
function renderPullInvestigate() {
  const ticker=ui.company,record=pullState.records[ticker],result=pullState.results[ticker];
  if(result){result.documents.forEach(d=>data.documents[d.id]=d);result.passages.forEach(p=>data.evidence[p.id]=p);}
  if(!pullState.loading[ticker]&&!record)hydratePull(ticker);
  const busy=pullState.busy?.status==='running';
  $('#main').innerHTML=`<button class="back-link" id="return-view">← Back to previous view</button><span class="eyebrow">COMPANY INVESTIGATION</span>
    <h1>Start with the source.</h1><p class="subhead">Ask about an NSE company using its annual report and actual earnings call.</p>
    <form id="pull-load" class="pull-form"><label for="pull-ticker">NSE ticker · portfolio or another listed company</label><div class="pull-load-row"><input id="pull-ticker" name="ticker" value="${escapeHTML(ticker)}" placeholder="e.g. TITAN" maxlength="25" autocapitalize="characters" autocomplete="off" required><button class="primary" ${busy?'disabled':''}>${busy?'Loading…':'Load sources'}</button></div></form>
    <p class="brief-note">Discovery checks NSE’s official equities list, annual-report index and up to 360 days of announcements. A call notice is not treated as a transcript. Stored results are reused for 24 hours.</p>
    ${pullState.error?`<div class="state-label" role="alert">${escapeHTML(pullState.error)}</div>`:''}
    ${busy?`<div class="coverage-note" role="status" aria-live="polite"><span aria-hidden="true">◷</span><div><strong>${escapeHTML(pullState.busy.ticker)} · retrieving real documents</strong><p>${escapeHTML(pullState.busy.progress)}</p><small>Bounded discovery; partial results and failures are retained.</small></div></div>`:''}
    ${record?`<div class="company-identity"><span class="monogram" aria-hidden="true">${escapeHTML(ticker.slice(0,2))}</span><div><h2>${escapeHTML(record.company?.name||ticker)}</h2><small>NSE: ${escapeHTML(ticker)}${record.company?.isin?' · '+escapeHTML(record.company.isin):''}</small></div></div>
      <div class="state-label"><strong>Coverage: ${escapeHTML(record.status)}.</strong> ${record.documents.length} usable document(s). Checked ${escapeHTML(istTime(record.checked_at))}.${record.error?' '+escapeHTML(record.error):''}${record.warnings.map(w=>'<p>'+escapeHTML(w)+'</p>').join('')}</div>
      ${(record.documents.length)?`<form id="pull-query" class="pull-form"><label for="pull-question">Question about these documents</label><textarea id="pull-question" maxlength="500" rows="3" required>${escapeHTML(ui.pullQuestion||'What are the business segments and management outlook?')}</textarea><button class="primary" ${pullState.questionBusy?'disabled':''}>${pullState.questionBusy?'Working…':data.model.available?'Ask with evidence':'Find cited passages'}</button><button type="button" class="text-button" id="pull-passages-only" ${pullState.questionBusy?'disabled':''}>Search passages only</button></form><div class="question-grid"><button data-pull-question="What does management say about demand and growth outlook?" ${pullState.questionBusy?'disabled':''}>Management outlook</button><button data-pull-question="What do operating cash flow and receivables show?" ${pullState.questionBusy?'disabled':''}>Cash and receivables</button></div>`:''}
      <div class="coverage-note"><span aria-hidden="true">◌</span><div><strong>${data.model.available?'Answers grounded in retrieved sources.':'Synthesis unavailable.'}</strong> ${data.model.available?'Gemini uses only the passages below. Every claim links to a supporting quote. Opening a company or searching passages does not call the model.':'Original passage search remains available. No generated answer is substituted.'}</div></div>
      ${renderGeminiAnswer(result)}
      ${result?`<div class="section-heading"><h2>Retrieved passages</h2><small>${result.passages.length} matches</small></div><p class="brief-note">${escapeHTML(result.question)}<br>${escapeHTML(result.notice)}</p>${result.passages.length?result.passages.map(p=>`<article class="card pull-passage"><span class="eyebrow">${escapeHTML(p.ticker)} · PDF PAGE ${p.page}</span><h3>${escapeHTML(data.documents[p.doc]?.kind||'Primary document')}</h3><p class="brief-note">${escapeHTML(p.period)} · ${escapeHTML(p.freshness||'Date unverified')}<br>Basis: ${escapeHTML(p.basis)}<br>Units: ${escapeHTML(p.units)}</p><p class="pull-excerpt">${escapeHTML(p.passage.slice(0,360))}${p.passage.length>360?'…':''}</p><button class="cite" data-evidence="${escapeHTML(p.id)}">Read evidence · PDF p. ${p.page} ↗</button></article>`).join(''):'<div class="empty"><h2>No matching passages.</h2><p>The indexed sources did not match this question. Nothing has been invented to fill the gap.</p></div>'}`:''}
      ${result?`<details class="coverage-details"><summary>Indexed documents and coverage</summary>${result.documents.map(d=>`<div class="pull-source"><strong>${escapeHTML(d.title)}</strong><p>${escapeHTML(d.period)} · ${escapeHTML(d.call_date||d.date||'Date unverified')} · ${escapeHTML(d.freshness||'Date unverified')}<br>${d.indexed_pages.length} of ${d.pageCount} PDF pages indexed; ${d.pages.length?d.pageCount:'0'} extracted. ${escapeHTML(d.note)}</p><a href="${escapeHTML(d.url)}" target="_blank" rel="noopener noreferrer">Original document ↗</a></div>`).join('')}</details>`:''}
      <details class="coverage-details"><summary>Discovery candidates and source failures</summary>${(record.candidates||[]).map(c=>`<div class="pull-source"><strong>${escapeHTML(c.kind)} · ${escapeHTML(c.state)}</strong><p>${escapeHTML(c.label)}${c.error?'<br>'+escapeHTML(c.error):''}</p><a href="${escapeHTML(c.url)}" target="_blank" rel="noopener noreferrer">Original candidate ↗</a></div>`).join('')||'<p>Candidate history is loading.</p>'}${(record.errors||[]).map(e=>'<p class="source-error">'+escapeHTML(e)+'</p>').join('')}</details>`:
      !busy?'<div class="empty"><h2>Choose a company.</h2><p>Load sources above. Available annual reports and actual call transcripts will be validated before their text can appear here.</p></div>':''}`;
}
function renderGeminiAnswer(result) {
  const a=result?.answer;if(!a)return '';
  if(a.status==='unavailable')return `<article id="gemini-answer" class="state-label" tabindex="-1"><strong>Answer unavailable.</strong> ${escapeHTML(a.error)} Original passages remain below.</article>`;
  const content=a.content;
  return `<article id="gemini-answer" class="card answer-card" tabindex="-1"><span class="eyebrow">SOURCE-GROUNDED ANSWER · ${escapeHTML(content.status)}</span><h2>${content.status==='insufficient'?'Evidence is insufficient':'What the sources support'}</h2><p class="brief-note">${escapeHTML(result.question)}<br>${a.model_called===false?'No model call: no matching evidence.':escapeHTML(a.model)+' · '+(a.cached?'cached answer':'generated '+escapeHTML(istTime(a.generated_at)))}</p>${content.claims.map(c=>`<section class="answer-claim"><p>${escapeHTML(c.text)}</p><div class="answer-citations">${c.citations.map(cite=>{const p=result.passages.find(p=>p.id===cite.evidence_id);return `<button class="cite" data-answer-evidence="${escapeHTML(cite.evidence_id)}" data-quote="${escapeHTML(cite.quote)}">${escapeHTML(p.ticker)} · ${escapeHTML(p.period)} · p. ${p.page} ↗</button>`;}).join('')}</div></section>`).join('')}${content.gaps.length?`<div class="state-label"><strong>Gaps in supplied evidence</strong>${content.gaps.map(g=>'<p>'+escapeHTML(g)+'</p>').join('')}</div>`:''}${content.follow_up_questions.length?`<div class="small-label">FOLLOW UP</div><div class="answer-followups">${content.follow_up_questions.map(q=>`<button class="secondary" data-answer-followup="${escapeHTML(q)}">${escapeHTML(q)}</button>`).join('')}</div>`:''}<p class="small-print">Citation IDs, supporting quotes and reported figures are checked against supplied evidence. This does not guarantee every interpretation is correct; inspect the original.</p></article>`;
}
async function pullRequest(path,body) {
  const response=await fetch(path,body?{method:'POST',headers:{'Content-Type':'application/json','X-FINN-Token':data.refreshToken},body:JSON.stringify(body)}:{});
  const result=await response.json();if(!response.ok)throw new Error(result.error||'Research request failed');return result;
}
async function hydratePull(ticker) {
  pullState.loading[ticker]=true;
  try {
    const response=await fetch('/api/research/'+encodeURIComponent(ticker));
    if(response.ok){pullState.records[ticker]=await response.json();if(pullState.records[ticker].documents.length)await queryPull(ticker,false);}
  }catch(error){pullState.error=error.message;}
  if(ui.route==='investigate'&&ui.company===ticker)renderPullInvestigate();
}
async function loadPull(ticker) {
  pullState.error='';
  try {
    const result=await pullRequest('/api/research',{ticker});
    const job=result.job;
    if(job.status==='running') {pullState.busy=job;pollPull(job.id);}
    else {pullState.records[ticker]=job;pullState.loading[ticker]=true;await queryPull(ticker,false);}
  }catch(error){pullState.error=error.message;}
  if(ui.route==='investigate')renderPullInvestigate();
}
async function pollPull(id) {
  clearTimeout(pullTimer);
  try {
    const job=await pullRequest('/api/research/jobs/'+id);pullState.busy=job;
    if(job.status==='running')pullTimer=setTimeout(()=>pollPull(id),1500);
    else {pullState.records[job.ticker]=job;pullState.loading[job.ticker]=true;pullState.busy=null;await queryPull(job.ticker,false);announce('Source discovery '+job.status);}
    if(ui.route==='investigate')renderPullInvestigate();
  }catch(error){pullState.busy=null;pullState.error=error.message;if(ui.route==='investigate')renderPullInvestigate();}
}
async function queryPull(ticker,redraw=true,generate=false) {
  if(!pullState.records[ticker]?.documents.length){delete pullState.results[ticker];return;}
  const ticket=(pullState.queryTickets[ticker]||0)+1;pullState.queryTickets[ticker]=ticket;
  delete pullState.results[ticker];
  pullState.questionBusy=true;pullState.error='';if(redraw)renderPullInvestigate();
  try {
    const question=ui.pullQuestion||'What are the business segments and management outlook?';
    const previous=pullState.conversations[ticker]||[];
    const history=previous.at(-1)===question?(pullState.lastHistories[ticker]||[]):previous.slice(-3);
    const result=await pullRequest(generate&&data.model.available?'/api/research/answer':'/api/research/query',{ticker,question,...(generate?{history}:{})});
    if(pullState.queryTickets[ticker]!==ticket)return;
    pullState.results[ticker]=result;
    if(result.answer?.status==='ready'){if(previous.at(-1)!==question)pullState.conversations[ticker]=[...previous,question].slice(-3);pullState.lastHistories[ticker]=history;}
    result.documents.forEach(d=>data.documents[d.id]=d);result.passages.forEach(p=>data.evidence[p.id]=p);
  }catch(error){if(pullState.queryTickets[ticker]!==ticket)return;pullState.error=error.message;}
  pullState.questionBusy=false;if(redraw&&ui.route==='investigate'&&ui.company===ticker){renderPullInvestigate();if(generate)requestAnimationFrame(()=>{const panel=$('#gemini-answer');panel?.focus({preventScroll:true});panel?.scrollIntoView({block:'start'});});}
}
document.addEventListener('submit',event=>{
  if(!IS_LIVE)return;
  if(event.target.id==='pull-load') {
    event.preventDefault();const ticker=$('#pull-ticker').value.trim().toUpperCase();
    if(!/^[A-Z0-9][A-Z0-9&-]{0,24}$/.test(ticker)){pullState.error='Enter an NSE symbol without .NS or spaces';renderPullInvestigate();return;}
    navigate('investigate',ticker,true);loadPull(ticker);
  }else if(event.target.id==='pull-query'){event.preventDefault();ui.pullQuestion=$('#pull-question').value;persist();queryPull(ui.company,true,true);}
});
document.addEventListener('click',event=>{
  const button=event.target.closest('button[data-pull-question]');
  if(IS_LIVE&&button){ui.pullQuestion=button.dataset.pullQuestion;persist();queryPull(ui.company,true,true);}
  const citation=event.target.closest('button[data-answer-evidence]');
  if(IS_LIVE&&citation)showEvidence({evidenceId:citation.dataset.answerEvidence,quote:citation.dataset.quote});
  const follow=event.target.closest('button[data-answer-followup]');
  if(IS_LIVE&&follow){ui.pullQuestion=follow.dataset.answerFollowup;persist();queryPull(ui.company,true,true);}
  if(IS_LIVE&&event.target.closest('#pull-passages-only')){ui.pullQuestion=$('#pull-question').value;persist();queryPull(ui.company);}
});
