'use strict';
// Concrete opt-in host for reviewed process adapters. No implicit provider,
// generated approval, arbitrary shell, tenant retrieval, or automatic IDE takeover.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {spawn,spawnSync}=require('node:child_process');
const engine=require('./coding-execution'),store=require('./goal-store');
const coord=require('./session-coordination');
const {writeFileAtomic}=require('./atomic-write');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function demand(value,message){if(!value)throw Error(message);}
function regular(file){
  demand(path.isAbsolute(file),'absolute trusted path required');
  const real=fs.realpathSync(file);
  const comparable=p=>process.platform==='win32'?p.toLowerCase():p;
  demand(comparable(real)===comparable(path.resolve(file))&&!fs.lstatSync(file).isSymbolicLink(),'linked trusted path');
  return real;
}
function pin(entry){demand(entry&&/^[a-f0-9]{64}$/.test(entry.sha256),'reviewed adapter pin required');regular(entry.path);demand(hash(entry.path)===entry.sha256,'trusted adapter source changed');return entry.path;}
function outsideWorkers(file,plan){
  for(const w of plan.workers){let rel=path.relative(w.repo,file).split(path.sep).join('/');
    if(rel.startsWith('../')||path.isAbsolute(rel))continue;
    rel=coord.scope(rel);
    demand(!w.scopes.some(s=>coord.overlaps(rel,coord.scope(s))),'trust input overlaps worker write scope');}
}
function json(output){
  demand(Buffer.byteLength(output)<1024*1024,'host output too large');
  try{return JSON.parse(output);}catch{throw Error('invalid reviewed host JSON');}
}
// Opt-in cooperative journal for reviewed adapters that have no descendants.
// This is not a sandbox or a claim that killing a PID stops a process tree.
const JOURNAL='direct-child-v1';
function journalJson(file){
  regular(file);demand(fs.statSync(file).size<1024*1024,'journal file too large');
  return json(fs.readFileSync(file,'utf8'));
}
function journalPaths(requestFile){
  demand(path.isAbsolute(requestFile)&&requestFile.endsWith('.request.json'),'invalid journal request path');
  const base=requestFile.slice(0,-'.request.json'.length);
  return {request:requestFile,claim:base+'.claim',receipt:base+'.json'};
}
function criticRemaining(budget,state){
  engine.assert('usage',budget);
  const used={tool_calls:0,retries:0,ci_runs:0,cost_usd:0};
  for(const record of Object.values(state.critic_usage||{})){
    engine.assert('usage',record.usage);for(const key of Object.keys(used))used[key]+=record.usage[key];
  }
  demand(Object.keys(used).every(key=>used[key]<=budget[key]),'critic admission budget already exhausted');
  return Object.fromEntries(Object.keys(used).map(key=>[key,budget[key]-used[key]]));
}
function journalAuthority(requestFile,request){
  const files=journalPaths(requestFile),plan=request.plan;
  demand(request.version===1&&request.plan_sha256===engine.digest(plan),'journal plan mismatch');
  demand(request.wrapper_sha256===hash(__filename),'journal wrapper changed');
  demand(request.input_sha256===engine.digest(request.input),'journal input changed');
  demand(/^[a-f0-9-]{36}$/.test(request.call_id),'invalid journal call ID');
  demand(path.basename(requestFile)===request.call_id+'.request.json','journal call/path mismatch');
  demand(request.entry.failure_journal===JOURNAL,'reviewed direct-child adapter required');
  const critic=request.operation==='critic';
  if(critic){
    demand(request.cwd===plan.repo&&request.input.state?.phase==='critic'
      &&engine.digest(request.input.state.plan)===engine.digest(plan)
      &&/^[a-f0-9]{64}$/.test(request.input.state.join_sha256),'journal critic join mismatch');
    engine.assert('usage',request.entry.budget); // Explicit reviewed caps for all four usage counters.
    demand(engine.digest(request.input.remaining_budget)===engine.digest(criticRemaining(request.entry.budget,request.input.state)),'critic remaining budget mismatch');
    demand(hash(plan.goal_file)===plan.goal_sha256,'journal critic goal changed');
  }else{
  const worker=plan.workers.find(w=>w.id===request.input.id);
  demand(worker&&worker.agent===request.input.agent&&worker.runtime===request.input.runtime
    &&worker.session===request.input.session&&worker.repo===request.cwd,'journal worker identity mismatch');
  demand(Object.keys(worker).every(key=>Object.hasOwn(request.input,key)
    &&engine.digest(request.input[key])===engine.digest(worker[key])),'journal worker contract changed');
  demand(request.input.revision===plan.revision&&request.input.goal_sha256===plan.goal_sha256
    &&request.input.environment===plan.environment,'journal revision mismatch');
  demand(hash(plan.goal_file)===plan.goal_sha256&&engine.digest(request.input.assignment)===worker.assignment_sha256,'journal goal or assignment changed');
  }
  demand(path.isAbsolute(request.state_file),'absolute journal state path required');
  coord.scope(path.relative(plan.repo,request.state_file).split(path.sep).join('/'));
  outsideWorkers(request.state_file,plan);regular(request.state_file);
  if(!critic)demand(/^[a-f0-9]{64}$/.test(request.input.token),'journal worker token required');
  // One canonical claim per plan/worker/token, independent of call ID,
  // receipt-directory choice or a second checkpoint copy of the same plan.
  const attemptKey=critic?engine.digest({plan_sha256:request.plan_sha256,critic:plan.critic,join_sha256:request.input.state.join_sha256})
    :engine.digest({plan_sha256:request.plan_sha256,worker_id:request.input.id,token:request.input.token});
  files.attempt=path.join(plan.repo,'.ecc','goal','journal-attempt-'+attemptKey+'.claim');
  demand(Number.isSafeInteger(request.deadline)&&Number.isSafeInteger(request.started_at)
    &&request.deadline>request.started_at&&request.deadline-request.started_at<=300000,'bounded journal deadline required');
  for(const file of Object.values(files)){
    const relative=path.relative(plan.repo,file);
    coord.scope(relative.split(path.sep).join('/'));
    outsideWorkers(file,plan);
    regular(path.dirname(file));
    if(fs.existsSync(file))regular(file);
  }
  outsideWorkers(request.entry.path,plan);pin(request.entry);
  const checked=coord.execute('check-write',{cwd:plan.repo,sessionId:plan.session,
    paths:Object.values(files).map(file=>path.relative(plan.repo,file).split(path.sep).join('/'))});
  demand(checked.allowed===true&&checked.session===plan.session,'journal parent ownership unavailable');
  return files;
}
function journalAttempt(request){
  if(request.operation==='critic')return {version:1,plan_sha256:request.plan_sha256,critic:request.plan.critic,
    join_sha256:request.input.state.join_sha256,call_id:request.call_id,request_sha256:engine.digest(request)};
  return {version:1,plan_sha256:request.plan_sha256,worker_id:request.input.id,
    token:request.input.token,call_id:request.call_id,request_sha256:engine.digest(request)};
}
function verifyJournalAttempt(file,request,wrapperPid){
  const claim=journalJson(file),expected=journalAttempt(request);
  demand(Object.entries(expected).every(([key,value])=>claim[key]===value)
    &&Number.isInteger(claim.wrapper_pid)&&claim.wrapper_pid>0
    &&(wrapperPid===undefined||claim.wrapper_pid===wrapperPid),'journal attempt winner mismatch');
  return claim;
}
function journalRead(requestFile,plan,entry){
  const request=journalJson(requestFile);
  demand(engine.digest(request.plan)===engine.digest(plan)&&engine.digest(request.entry)===engine.digest(entry),'journal current binding mismatch');
  const files=journalAuthority(requestFile,request);
  const attempt=verifyJournalAttempt(files.attempt,request);
  if(!fs.existsSync(files.receipt))return null;
  const claim=journalJson(files.claim),receipt=journalJson(files.receipt);
  demand(attempt.wrapper_pid===receipt.wrapper_pid,'journal receipt is not from attempt winner');
  demand(claim.request_sha256===engine.digest(request)&&claim.wrapper_pid===receipt.wrapper_pid,'journal exclusive claim mismatch');
  demand(receipt.version===1&&receipt.request_sha256===engine.digest(request)
    &&receipt.call_id===request.call_id&&receipt.phase==='exited'
    &&receipt.direct_child_closed===true&&Number.isInteger(receipt.wrapper_pid)&&receipt.wrapper_pid>0
    &&Number.isInteger(receipt.adapter_pid)&&receipt.adapter_pid>0
    &&Number.isSafeInteger(receipt.closed_at)&&receipt.closed_at>=request.started_at
    &&receipt.closed_at<=Date.now()&&(receipt.exit===null||Number.isInteger(receipt.exit))
    &&(receipt.signal===null||typeof receipt.signal==='string'),'journal closure not verified');
  demand(receipt.value_sha256===engine.digest(receipt.value),'journal result changed');
  if(receipt.usage!==null){engine.assert('usage',receipt.usage);demand(receipt.value&&engine.digest(receipt.value.usage)===engine.digest(receipt.usage),'journal usage mismatch');}
  if(Object.hasOwn(receipt,'closure_snapshot')){
    demand(receipt.closure_snapshot_sha256===engine.digest(receipt.closure_snapshot),'journal closure snapshot changed');
    if(receipt.closure_snapshot!==null)demand(/^[a-f0-9]{40}$/.test(receipt.closure_snapshot.head)
      &&/^[a-f0-9]{64}$/.test(receipt.closure_snapshot.tree_fingerprint)
      &&Number.isSafeInteger(receipt.snapshot_at)&&receipt.snapshot_at>=receipt.closed_at
      &&receipt.snapshot_at<=Date.now(),'invalid journal closure snapshot');
  }
  return {request,receipt};
}
async function runJournalChild(requestFile){
  const request=journalJson(requestFile);
  const files=journalAuthority(requestFile,request);
  demand(Date.now()<request.deadline,'journal request expired');
  const state=engine.load(request.state_file),node=state.nodes[request.input.id];
  const critic=request.operation==='critic';
  if(critic){
    demand(state.phase==='critic'&&engine.digest(state)===engine.digest(request.input.state),'critic launch snapshot changed');
    demand(request.input.remaining_budget.tool_calls>0,'critic tool-call admission budget exhausted');
    demand(state.spent_usd+request.input.remaining_budget.cost_usd<=state.plan.limits.usd,'critic cost reserve unavailable');
  }else{
  demand(state.plan_sha256===request.plan_sha256&&node?.status==='running'
    &&node.token===request.input.token&&node.lease_until>Date.now(),'journal dispatch no longer current');
  const remaining=Object.fromEntries(Object.entries(node.usage).map(([key,value])=>
    [key,Math.max(0,request.input.assignment.budget[`max_${key}`]-value)]));
  demand(engine.digest(remaining)===engine.digest(request.input.remaining_budget),'journal remaining budget changed');
  const worker=state.plan.workers.find(w=>w.id===request.input.id);
  demand(Date.parse(worker.expires_at)>Date.now(),'journal assignment expired before launch');
  coord.checkSession({cwd:worker.repo,sessionId:worker.session});
  }
  // Reuse current goal/assignment validation without saving a transition.
  engine.apply(state,{type:'recover',actor:state.plan.parent});
  // Acquire BEFORE the per-call claim or adapter spawn. Different call IDs
  // competing for this same dispatch token cannot both launch. Never reclaim
  // this file on lease expiry, missing receipts, PID loss or a partial write.
  const attemptFd=fs.openSync(files.attempt,'wx',0o600);
  try{
    fs.writeFileSync(attemptFd,JSON.stringify({...journalAttempt(request),wrapper_pid:process.pid}));
    fs.fsyncSync(attemptFd);
  }finally{fs.closeSync(attemptFd);}
  // Exclusive durable claim precedes launch. A wrapper crash leaves this claim
  // unresolved, never permission to launch the same call twice.
  const fd=fs.openSync(files.claim,'wx',0o600);
  try{fs.writeFileSync(fd,JSON.stringify({request_sha256:engine.digest(request),wrapper_pid:process.pid}));fs.fsyncSync(fd);}finally{fs.closeSync(fd);}
  verifyJournalAttempt(files.attempt,request,process.pid);
  const child=spawn(process.execPath,[pin(request.entry)],{cwd:request.cwd,windowsHide:true,stdio:['pipe','pipe','pipe']});
  let output='',overflow=false,launchError=false;
  child.stdout.on('data',chunk=>{if(overflow)return;output+=chunk;if(Buffer.byteLength(output)>=1024*1024){overflow=true;output='';child.kill();}});
  child.stderr.resume();child.stdin.on('error',()=>{});
  child.once('error',()=>{launchError=true;});
  const timer=setTimeout(()=>child.kill(),Math.max(1,request.deadline-Date.now()));
  const completion=new Promise(resolve=>child.once('close',(code,signal)=>resolve({code,signal,closed_at:Date.now()})));
  child.stdin.end(JSON.stringify(request.input));
  const closed=await completion;
  clearTimeout(timer);
  // Spawn failure, uncertain PID or unclosed streams cannot certify cessation.
  demand(!launchError&&Number.isInteger(child.pid),'journal child identity unavailable');
  let value=null,usage=null;
  if(!overflow){try{
    const parsed=json(output);engine.assert('usage',parsed.usage);
    if(critic){
      // Preserve known usage even when the report is absent or malformed.
      usage=parsed.usage;let report=null;
      try{engine.assert('critique',parsed.report);demand(parsed.report.agent===request.plan.critic
        &&parsed.report.join_sha256===request.input.state.join_sha256,'critic output identity mismatch');report=parsed.report;}catch{/* Preserve known usage while leaving an invalid critique report absent. */}
      value={report,usage};
    }else{
    demand(parsed.agent===request.input.agent&&parsed.runtime===request.input.runtime
      &&parsed.token===request.input.token,'journal output identity mismatch');
    usage=parsed.usage;
    // Retain only the launch contract, never arbitrary adapter diagnostics.
    value={agent:parsed.agent,runtime:parsed.runtime,token:parsed.token,
      native_protection:parsed.native_protection===true,usage};
    }
  }catch{value=null;usage=null;}}
  let closure_snapshot=null,snapshot_at=null;
  if(closed.code===0&&closed.signal===null){try{
    const state=store.captureRepositoryState(request.cwd,{excludePaths:[path.join(request.cwd,'.ecc/goal')]});
    closure_snapshot={head:state.head,tree_fingerprint:state.tree_fingerprint};
    snapshot_at=Date.now();
  }catch{/* Missing projection preserves closure/usage, but never permits success adoption. */}}
  journalAuthority(requestFile,request);
  verifyJournalAttempt(files.attempt,request,process.pid);
  writeFileAtomic(files.receipt,JSON.stringify({version:1,request_sha256:engine.digest(request),call_id:request.call_id,
    wrapper_pid:process.pid,adapter_pid:child.pid,phase:'exited',direct_child_closed:true,
    exit:closed.code,signal:closed.signal,closed_at:closed.closed_at,usage,value,value_sha256:engine.digest(value),
    // This is a cooperative post-exit projection, not an atomic filesystem
    // snapshot at the close event or an OS fence against external actors.
    closure_snapshot,snapshot_at,closure_snapshot_sha256:engine.digest(closure_snapshot)}));
}
function createBoundHost(spec,{stateFile,plan}){
  // Retain the reviewed binding, not mutable references held by the caller.
  spec=structuredClone(spec);plan=structuredClone(plan);
  demand(spec?.version===1&&spec.plan_sha256===engine.digest(plan),'host config not bound to plan');
  demand(spec.timeout_ms>0&&spec.timeout_ms<=300000,'bounded process timeout required');
  const protectedEntries=[spec.critic,...Object.values(spec.workers).flatMap(w=>[w.launch,w.check]),spec.approval_key];
  for(const entry of protectedEntries){pin(entry);outsideWorkers(entry.path,plan);}
  regular(spec.approval_file);outsideWorkers(spec.approval_file,plan);
  demand(path.resolve(spec.receipts).startsWith(path.resolve(plan.repo)+path.sep),'receipt directory outside parent');
  const relative=path.relative(plan.repo,spec.receipts).split(path.sep).join('/');
  coord.execute('check-write',{cwd:plan.repo,sessionId:plan.session,paths:[relative]});
  let ancestor=path.resolve(spec.receipts);
  while(ancestor!==path.resolve(plan.repo)){if(fs.existsSync(ancestor))demand(!fs.lstatSync(ancestor).isSymbolicLink(),'linked receipt path');ancestor=path.dirname(ancestor);}
  fs.mkdirSync(spec.receipts,{recursive:true});
  const running=new Map(),checks=new Map(),reviews=new Map();
  const ledger=id=>path.join(spec.receipts,id+'.json');
  function persist(id,value){coord.execute('check-write',{cwd:plan.repo,sessionId:plan.session,paths:[path.relative(plan.repo,ledger(id)).split(path.sep).join('/')]});writeFileAtomic(ledger(id),JSON.stringify(value));}
  function check(w,{fresh=false}={}){
    const binding=spec.workers[w.id];demand(binding,'worker has no reviewed process adapter');
    pin(binding.check);
    const state=store.captureRepositoryState(w.repo,{excludePaths:[path.join(w.repo,'.ecc/goal')]});
    const key=engine.digest({worker:w.id,head:state.head,tree:state.tree_fingerprint,check:binding.check.sha256});
    if(fresh||!checks.has(key)){
      const child=spawnSync(process.execPath,[binding.check.path],{cwd:w.repo,input:JSON.stringify({worker:w,plan_revision:plan.revision,environment:plan.environment}),encoding:'utf8',windowsHide:true,timeout:spec.timeout_ms,maxBuffer:1024*1024});
      demand(child.status===0,'protected independent acceptance check failed');
      const result=json(child.stdout);demand(typeof result.passed==='boolean'&&Array.isArray(result.evidence)&&Array.isArray(result.preservation),'invalid protected check output');
      if(w.data_policy){
        demand(Object.keys(result).every(key=>['passed','evidence','preservation','citations'].includes(key))
          &&(!result.citations||result.citations.length===0),'synthetic checker envelope rejected');
        engine.verifySyntheticArtifacts(w,[...result.evidence,...result.preservation.map(value=>value.evidence)]);
      }
      checks.set(key,result);
    }
    return checks.get(key);
  }
  async function processCall(entry,input,cwd,{signal,callId}){
    const script=pin(entry);outsideWorkers(script,plan);
    if(entry.failure_journal===JOURNAL){
      const critic=input.state?.phase==='critic'&&entry===spec.critic;
      demand(critic||(input.id&&input.token),'journal operation identity unavailable');
      const requestFile=path.join(spec.receipts,callId+'.request.json');
      const started_at=Date.now(),request={version:1,...(critic?{operation:'critic'}:{}),call_id:callId,plan,plan_sha256:engine.digest(plan),
        wrapper_sha256:hash(__filename),state_file:path.resolve(stateFile),entry,input,input_sha256:engine.digest(input),
        cwd,started_at,deadline:started_at+spec.timeout_ms};
      journalAuthority(requestFile,request);
      const fd=fs.openSync(requestFile,'wx',0o600);
      try{fs.writeFileSync(fd,JSON.stringify(request));fs.fsyncSync(fd);}finally{fs.closeSync(fd);}
      // The wrapper owns the timeout and child pipes. Aborting this supervisor
      // must not kill the only writer of the child's eventual exit receipt.
      const wrapper=spawn(process.execPath,[__filename,'--failure-journal-child',requestFile],
        {cwd:plan.repo,windowsHide:true,detached:true,stdio:'ignore'});
      await new Promise((resolve,reject)=>{wrapper.once('error',reject);wrapper.once('close',resolve);});
      const found=journalRead(requestFile,plan,entry);
      demand(found,'journal closure unavailable; retain reconciliation');
      const {receipt}=found;
      if(critic)return receipt.value; // Usage/report are consumed independently below.
      if(receipt.exit!==0||!receipt.value){
        const error=Error('reviewed journal worker failed; missing usage remains unknown');
        if(Number.isInteger(receipt.exit)&&receipt.exit!==0&&receipt.usage)error.usage=receipt.usage;
        throw error;
      }
      return receipt.value;
    }
    // The reviewed adapter owns its native sandbox/usage accounting. This
    // process boundary alone is NOT an operating-system filesystem sandbox.
    const child=spawn(process.execPath,[script],{cwd,windowsHide:true,stdio:['pipe','pipe','pipe']});
    const identity={worker:input.id??null,token:input.token??null};
    running.set(callId,child);persist(callId,{pid:child.pid,phase:'running',method:entry.path,...identity});
    let output='',overflow=false,inputError=false;
    child.stdin.on('error',()=>{inputError=true;}); // Early child exit must not crash the parent on EPIPE.
    const abort=()=>child.kill();signal?.addEventListener('abort',abort,{once:true});
    const timer=setTimeout(abort,spec.timeout_ms);
    const result=await new Promise((resolve,reject)=>{
      child.stdout.on('data',v=>{output+=v;if(Buffer.byteLength(output)>1024*1024){overflow=true;abort();}});
      child.stderr.resume(); // Never persist credential-bearing client diagnostics.
      child.once('error',reject);child.once('close',code=>resolve({code,output}));
      child.stdin.end(JSON.stringify(input));
    }).finally(()=>{clearTimeout(timer);signal?.removeEventListener('abort',abort);running.delete(callId);});
    if(result.code!==0||overflow||inputError){persist(callId,{pid:child.pid,phase:'exited',exit:result.code,usage:null,...identity});throw Error('reviewed host process failed; usage reconciliation required');}
    let value,usage=null;
    try{
      value=json(result.output);
      // Legacy component critics may return only their typed report. Missing
      // usage remains unknown; production factories still require metered journals.
      if(value?.usage!==undefined){engine.assert('usage',value.usage);usage=value.usage;}
    }catch{
      persist(callId,{pid:child.pid,phase:'exited',exit:0,usage:null,...identity});
      throw Error('reviewed host output invalid; usage reconciliation required');
    }
    persist(callId,{pid:child.pid,phase:'exited',exit:0,usage,...identity});return value;
  }
  function approved(entry){
    pin(spec.approval_key);
    const record=JSON.parse(fs.readFileSync(spec.approval_file,'utf8'));
    const payload=record.payload;
    return payload?.binding===entry.binding&&payload?.proposal_sha256===engine.digest(entry.proposal)
      &&payload.plan_sha256===engine.digest(plan)&&Date.parse(payload.expires_at)>Date.now()
      &&crypto.verify(null,Buffer.from(store.canonicalJson(payload)),fs.readFileSync(spec.approval_key.path),Buffer.from(record.signature||'','base64')) ? payload : null;
  }
  function remote(effect){
    demand(effect.kind==='push'&&spec.effects.length===1,'only one explicitly configured push is supported');
    const binding=spec.effects[0];demand(engine.digest(binding.proposal)===engine.digest(effect),'unconfigured effect');
    demand(binding.remote==='origin'&&effect.target===`origin/${binding.branch}`,'exact normal remote/branch binding required');
    const result=spawnSync('git',['ls-remote','--exit-code',binding.remote,'refs/heads/'+binding.branch],{cwd:plan.repo,encoding:'utf8',windowsHide:true,timeout:30000,maxBuffer:4096});
    return result.status===0&&result.stdout.split(/\s/)[0]===effect.candidate?{candidate:effect.candidate,target:effect.target,payload_sha256:effect.payload_sha256}:null;
  }
  const project=worker=>{
    const snapshot=store.captureRepositoryState(worker.repo,{excludePaths:[path.join(worker.repo,'.ecc/goal')]});
    return {head:snapshot.head,tree_fingerprint:snapshot.tree_fingerprint};
  };
  function buildResult(worker,launched,expectedSnapshot,{fresh=false}={}){
    if(worker.data_policy)demand(Object.keys(launched).every(key=>
      ['agent','runtime','token','native_protection','usage'].includes(key)),'synthetic launch envelope rejected');
    engine.assert('usage',launched.usage);
    demand(launched.agent===worker.agent&&launched.runtime===worker.runtime&&launched.token===worker.token,'native adapter identity mismatch');
    demand(launched.native_protection===true,'reviewed adapter did not attest activated native protection');
    const before=project(worker);
    if(expectedSnapshot)demand(engine.digest(before)===engine.digest(expectedSnapshot),'checkout changed since worker closure');
    const accepted=check(worker,{fresh}),snapshot=project(worker);
    demand(engine.digest(before)===engine.digest(snapshot),'independent check changed worker source');
    const changes=coord.execute('check-changes',{cwd:worker.repo,sessionId:worker.session});
    demand(changes.allowed===true&&changes.session===worker.session,'verified worker change check required');
    return {version:1,worker:worker.id,agent:worker.agent,runtime:worker.runtime,token:worker.token,revision:plan.revision,environment:plan.environment,
      status:accepted.passed?'pass':'fail',head:snapshot.head,tree_fingerprint:snapshot.tree_fingerprint,changed_paths:changes.paths,evidence:accepted.evidence,
      citations:accepted.citations||[],usd:launched.usage.cost_usd,usage:launched.usage,
      preservation:{contract_sha256:engine.digest(worker.assignment.change_contract),checks:accepted.preservation}};
  }
  function winningJournal(worker,node){
    const planSha=engine.digest(plan),attemptKey=engine.digest({plan_sha256:planSha,worker_id:worker.id,token:node.token});
    const claim=journalJson(path.join(plan.repo,'.ecc/goal','journal-attempt-'+attemptKey+'.claim'));
    demand(claim.plan_sha256===planSha&&claim.worker_id===worker.id&&claim.token===node.token
      &&/^[a-f0-9-]{36}$/.test(claim.call_id),'journal attempt binding unavailable');
    return journalRead(path.join(spec.receipts,claim.call_id+'.request.json'),plan,spec.workers[worker.id].launch);
  }
  function recoveryProof(found){
    return {call_id:found.receipt.call_id,closed_at:found.receipt.closed_at,snapshot_at:found.receipt.snapshot_at,
      journal_sha256:engine.digest(found.receipt),request_sha256:engine.digest(found.request)};
  }
  function successfulAttempt(worker,node,found){
    demand(found?.receipt.exit===0&&found.receipt.signal===null&&found.receipt.usage
      &&found.receipt.value?.native_protection===true&&found.receipt.closure_snapshot,'successful native closure evidence unavailable');
    const state=engine.load(stateFile),current=state.nodes[worker.id];
    engine.initialize(plan); // Current owner goal/assignment/source contracts, no writes.
    demand(state.plan_sha256===engine.digest(plan)&&current?.status==='running'&&current.token===node.token
      &&current.lease_until===node.lease_until&&found.request.input.token===node.token,'recovered dispatch binding changed');
    demand(found.receipt.closed_at<=node.lease_until&&found.receipt.snapshot_at<=node.lease_until
      &&Date.parse(worker.expires_at)>Date.now(),'worker closure or assignment expired');
    const checked=coord.execute('check-write',{cwd:worker.repo,sessionId:worker.session,paths:worker.scopes});
    demand(checked.allowed===true&&checked.session===worker.session,'current worker ownership required');
    return {...worker,token:node.token,assignment:found.request.input.assignment};
  }
  function createQueueCapabilities(context){
    // Explicit opt-in. This factory launches no worker, browser, service or effect.
    const q=spec.queue;
    demand(q&&typeof q==='object','reviewed queue configuration required');
    demand(engine.digest(context.plan)===engine.digest(plan)
      &&path.isAbsolute(q.file)&&context.queueFile===q.file,'exact queue plan/file required');
    demand(Number.isInteger(q.timeout_ms)&&q.timeout_ms>0&&q.timeout_ms<=1000,'bounded synchronous queue gate required');
    const queueFile=path.resolve(q.file),directory=path.dirname(queueFile),queueLock=queueFile+'.queue.lock';
    const relative=path.relative(plan.repo,queueFile).split(path.sep).join('/');
    demand(coord.scope(relative).startsWith('.ecc/'),'task-local parent queue required');
    regular(directory);outsideWorkers(directory,plan);
    const root=path.resolve(__dirname,'../..'),required=[
      'scripts/lib/coding-execution-host.js','scripts/lib/coding-execution.js',
      'scripts/lib/coding-execution-runner.js',
      'scripts/lib/session-coordination.js','scripts/lib/goal-store.js',
      'scripts/lib/goal-control.js','scripts/lib/atomic-write.js',
      'scripts/lib/workspace-queue.js','scripts/lib/workspace-queue-store.js','scripts/lib/workspace-live-facts.js',
      'schemas/coding-execution.schema.json','schemas/goal-control.schema.json',
      'manifests/goal-proof-profiles.json'];
    const queueConfigSha=engine.digest(q);
    function authority(){
      demand(engine.digest(q)===queueConfigSha,'reviewed queue configuration changed');
      for(const file of required){
        demand(typeof q.source_pins?.[file]==='string','required transitive queue source pin unavailable');
        pin({path:path.join(root,file),sha256:q.source_pins[file]});
        outsideWorkers(path.join(root,file),plan);
      }
      pin(q.gate);pin(q.cessation);outsideWorkers(q.gate.path,plan);outsideWorkers(q.cessation.path,plan);
      // Reviewed scripts must themselves pin their dependencies; arbitrary scripts
      // are not a sandbox, approval source, ownership registry or process-tree fence.
      // Fresh parent/path/source checks remain on every file operation. Full
      // worker/assignment admission runs around gates and before publication.
      demand(hash(plan.goal_file)===plan.goal_sha256,'queue goal changed');
      regular(directory);
      const current=coord.checkSession({cwd:plan.repo,sessionId:plan.session});
      demand(current.id===plan.session,'fresh parent queue ownership required');
      const checked=coord.execute('check-write',{cwd:plan.repo,sessionId:plan.session,
        paths:[path.relative(plan.repo,directory).split(path.sep).join('/')]});
      demand(checked.allowed===true&&checked.session===plan.session,'parent must own queue staging directory');
    }
    function assertWrite(paths){
      authority();
      demand(Array.isArray(paths)&&paths.length>0,'exact queue write paths required');
      for(const file of paths){
        const resolved=path.resolve(file);
        const name=path.basename(resolved),prefix='.'+path.basename(queueFile)+'.';
        const staging=path.dirname(resolved)===directory&&name.startsWith(prefix)&&name.endsWith('.tmp')
          &&/^[0-9]+\.[a-f0-9]{16}$/.test(name.slice(prefix.length,-4));
        demand(resolved===queueFile||resolved===queueLock||staging,'outside queue-owned paths');
        outsideWorkers(resolved,plan);if(fs.existsSync(resolved))regular(resolved);
      }
      const checked=coord.execute('check-write',{cwd:plan.repo,sessionId:plan.session,
        paths:paths.map(file=>path.relative(plan.repo,path.resolve(file)).split(path.sep).join('/'))});
      demand(checked.allowed===true&&checked.session===plan.session,'parent queue write denied');
      return true;
    }
    function ownedEntry(entry,operation=entry.operation){
      authority();
      engine.initialize(plan);
      const goal=require('./goal-control').readStructuredFile(plan.goal_file);
      demand(entry.goalId===goal.goal_id,'queue goal identity changed');
      const worker=plan.workers.find(w=>w.session===entry.owner);
      const owner=entry.owner===plan.session?{repo:plan.repo,session:plan.session}:worker;
      demand(owner,'queue owner outside current parent/worker plan');
      coord.checkSession({cwd:owner.repo,sessionId:owner.session});
      if(worker&&['enqueue','acquire','recover'].includes(operation))demand(Date.parse(worker.expires_at)>Date.now(),'queue worker assignment expired');
      return owner;
    }
    function reviewedCall(adapter,entry,operation){
      demand(['invocation','enqueue','acquire','recover','release','cessation'].includes(operation),'unknown queue gate operation');
      ownedEntry(entry,operation);
      const resource=require('./workspace-queue').resourceKey(entry),nonce=crypto.randomBytes(32).toString('hex');
      const request={version:1,nonce,plan_sha256:engine.digest(plan),parent_session:plan.session,
        operation,entry:structuredClone(entry),resource,token:entry.token??null};
      const child=spawnSync(process.execPath,[pin(adapter)],{cwd:plan.repo,input:JSON.stringify(request),
        encoding:'utf8',windowsHide:true,timeout:q.timeout_ms,maxBuffer:65536});
      demand(!child.error&&child.status===0,'reviewed queue gate unavailable');
      const response=json(child.stdout);
      demand(response.version===1&&response.nonce===nonce&&response.plan_sha256===request.plan_sha256
        &&response.operation===operation&&response.id===entry.id&&response.owner===entry.owner
        &&response.resource===resource&&response.token===request.token,'queue gate identity mismatch');
      ownedEntry(entry,operation); // Recheck source/goal/session after the synchronous verifier.
      return response;
    }
    engine.initialize(plan);authority();assertWrite([queueFile,queueLock]);
    // One installed ECC Git-common directory across linked worktrees/goals.
    // This private host index is not a goal-owned writer lease or global agent
    // configuration; workers cannot obtain .git scopes. Existing IDE sessions
    // are not hot-adopted. Only this explicitly pinned opt-in host participates.
    const machineDirectory=coord.repository(root).directory;
    fs.mkdirSync(machineDirectory,{recursive:true});regular(machineDirectory);
    const machineFile=path.join(machineDirectory,'machine-queues.json');
    const machine=require('./workspace-queue-store').createMachineQueueGuard({
      file:machineFile,withFileLock:store.withFileLock,atomicWrite:writeFileAtomic,
      assertWrite(targets){
        authority();regular(machineDirectory);outsideWorkers(machineDirectory,plan);
        demand(targets.every(target=>target===machineFile||target===machineFile+'.lock'),
          'outside private machine index');
        return true;
      },
    });
    return {
      machine,
      assertWrite,
      describeInvocation(){
        const descriptor=structuredClone(q.config),entry=descriptor?.entry;
        demand(descriptor?.file===q.file&&entry?.owner===plan.session&&entry.state==='waiting'
          &&entry.token===undefined&&entry.leaseUntil===undefined&&entry.invocation===undefined,
          'fresh parent invocation descriptor required');
        demand(Number.isInteger(descriptor.lease_ms)&&descriptor.lease_ms>0&&descriptor.lease_ms<=300000,
          'bounded invocation lease required');
        const checkpoint=engine.digest(engine.load(stateFile));
        // The pinned gate returns a fingerprint of its actual dependency
        // evidence (approval/cessation/resource receipt), never a random nonce,
        // polling timestamp or unverified caller request. No approval is issued.
        const decision=reviewedCall(q.gate,{...entry,checkpoint_sha256:checkpoint},'invocation');
        demand(decision.checkpoint_sha256===checkpoint
          &&/^[a-f0-9]{64}$/.test(decision.dependency_sha256),'bound dependency evidence required');
        demand(engine.digest(engine.load(stateFile))===checkpoint,'invocation checkpoint changed');
        return {...descriptor,checkpoint_sha256:checkpoint,dependency_sha256:decision.dependency_sha256,
          config_sha256:queueConfigSha,ready:decision.allowed===true};
      },
      withFileLock(file,action){
        demand(path.resolve(file)===queueLock&&typeof action==='function','exact queue lock/action required');
        assertWrite([file]);return store.withFileLock(file,()=>{assertWrite([file]);return action();});
      },
      atomicWrite(file,content,options={}){
        demand(path.resolve(file)===queueFile,'exact queue state required');
        assertWrite([file]);
        return writeFileAtomic(file,content,{...options,validateParent(){
          assertWrite([file]);if(options.validateParent)options.validateParent();
        },beforeRename(){
          if(options.beforeRename)options.beforeRename();
          // Recheck after caller callbacks too: they may change goal/authority.
          // Final lease check is a scalar: no caller callback after validation.
          engine.initialize(plan);assertWrite([file]);
          if(options.publicationDeadline!==undefined)demand(
            Number.isFinite(options.publicationDeadline)&&options.publicationDeadline>Date.now(),
            'queue lease expired before publication');
        }});
      },
      readTelemetry(){
        authority();return require('./workspace-live-facts').collectMemoryWindow();
      },
      checkGate(entry){
        try{
          if(entry.invocation){
            demand(entry.invocation.binding?.queue_config_sha256===queueConfigSha
              &&entry.invocation.binding.plan_sha256===engine.digest(plan)
              &&entry.invocation.binding.session===plan.session
              &&entry.invocation.binding.actor===plan.parent
              &&entry.invocation.binding.state_file===regular(stateFile)
              &&engine.digest(entry.invocation.binding)===entry.invocation.binding_sha256,
              'exact original invocation binding required');
            if(entry.operation==='acquire')demand(engine.digest(engine.load(stateFile))===entry.invocation.checkpoint_sha256,
              'invocation checkpoint changed before claim');
            if(entry.operation==='recover'){
              demand(engine.digest(engine.load(stateFile))===entry.invocation.resume_checkpoint_sha256,
                'recovery checkpoint changed');
              const supervisor=entry.invocation.supervisor;
              const next=entry.invocation.next_supervisor;
              demand(next?.pid===process.pid&&next.host===require('node:os').hostname()
                &&/^[a-f0-9]{32}$/.test(next.nonce),'exact current recovery supervisor required');
              demand(supervisor?.host===require('node:os').hostname()
                &&Number.isSafeInteger(supervisor.pid)&&supervisor.pid>0,'same-machine original supervisor required');
              let dead=false;try{process.kill(supervisor.pid,0);}catch(error){dead=error.code==='ESRCH';}
              demand(dead,'supervisor alive or inaccessible; retain claim');
            }
          }
          const owner=ownedEntry(entry),decision=reviewedCall(q.gate,entry,entry.operation);
          if(decision.allowed!==true)return null;
          if(entry.invocation&&['acquire','recover'].includes(entry.operation))
            demand(decision.dependency_sha256===entry.invocation.admitted_dependency_sha256,
              'current dependency admission changed');
          if(entry.kind==='writer'){
            demand(regular(entry.resource)===regular(owner.repo),'queue writer repository mismatch');
            const scopes=owner.session===plan.session?coord.checkSession({cwd:owner.repo,sessionId:owner.session}).scopes:owner.scopes;
            const checked=coord.execute('check-write',{cwd:owner.repo,sessionId:owner.session,paths:scopes});
            demand(checked.allowed===true&&checked.session===owner.session,'canonical writer gate denied');
          }
          if(entry.kind==='release'){
            demand(entry.owner===plan.session&&regular(entry.resource)===regular(plan.repo),'parent-only release queue');
          }
          if(entry.kind==='release'&&['acquire','recover'].includes(entry.operation)){
            demand(q.release&&typeof q.release.branch==='string'&&typeof q.release.candidate==='string','reviewed exact release binding required');
            const checked=coord.execute('check-release',{cwd:plan.repo,sessionId:plan.session,
              branch:q.release.branch,candidate:q.release.candidate});
            demand(checked.allowed===true,'canonical release queue gate denied');
          }
          if(entry.kind==='release'&&entry.operation==='release'){
            demand(coord.execute('status',{cwd:plan.repo}).release===null,'canonical release must end before queue release');
          }
          return decision; // Readiness only; existing effect/approval gates remain required.
        }catch{return null;}
      },
      confirmStopped(entry){
        try{
          demand(typeof entry.token==='string'&&/^[a-f0-9]{48}$/.test(entry.token),'exact running queue token required');
          const evidence=reviewedCall(q.cessation,entry,'cessation');
          return evidence.stopped===true&&(!entry.invocation||evidence.spend_known===true);
        }catch{return false;}
      },
    };
  }
  const criticKey=state=>engine.digest({plan_sha256:engine.digest(plan),critic:plan.critic,join_sha256:state.join_sha256});
  const criticClaim=state=>path.join(plan.repo,'.ecc/goal','journal-attempt-'+criticKey(state)+'.claim');
  function readCritic(state){
    demand(state.phase==='critic'&&engine.digest(state.plan)===engine.digest(plan),'current critic state required');
    const claim=journalJson(criticClaim(state));
    demand(claim.critic===plan.critic&&claim.join_sha256===state.join_sha256
      &&claim.plan_sha256===engine.digest(plan)&&/^[a-f0-9-]{36}$/.test(claim.call_id),'critic winning claim mismatch');
    const found=journalRead(path.join(spec.receipts,claim.call_id+'.request.json'),plan,spec.critic);
    if(!found||!found.receipt.usage)return null;
    demand(found.request.operation==='critic','critic journal operation mismatch');
    const report=found.receipt.exit===0&&found.receipt.signal===null?found.receipt.value?.report:null;
    return {journal_review:true,report:report??null,usage:found.receipt.usage,receipt:{
      attempt_sha256:criticKey(state),join_sha256:state.join_sha256,call_id:claim.call_id,
      request_sha256:engine.digest(found.request),journal_sha256:engine.digest(found.receipt),
      budget:found.request.entry.budget}};
  }
  return {
    async launchWorker(worker,control){
      const binding=spec.workers[worker.id];demand(binding,'worker adapter absent');
      const launched=await processCall(binding.launch,worker,worker.repo,control);
      return buildResult(worker,launched);
    },
    inspectWorker(worker,node){
      const binding=spec.workers[worker.id];
      if(binding?.launch.failure_journal===JOURNAL){
        try{
          // The canonical winning claim selects one request. A losing call's
          // retained descriptor must not hide an already verified winner.
          const found=winningJournal(worker,node);
          if(!found||!Number.isInteger(found.receipt.exit)||!found.receipt.usage)return null;
          if(found.receipt.exit===0){
            const completed=successfulAttempt(worker,node,found);
            return {status:'completed',result:buildResult(completed,found.receipt.value,found.receipt.closure_snapshot,{fresh:true}),receipt:recoveryProof(found)};
          }
          return {status:'failed',usage:found.receipt.usage};
        }catch{return null;}
      }
      // Unknown exit/usage never becomes zero-cost retry permission.
      const values=fs.readdirSync(spec.receipts).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(path.join(spec.receipts,f),'utf8')));
      const found=values.find(v=>v.worker===worker.id&&v.token===node.token&&v.phase==='exited'
        &&Number.isInteger(v.exit)&&v.exit!==0&&v.usage);
      // A successful completed call is not a failed attempt. Until successful
      // result adoption is wired, keep it unresolved rather than replay work.
      if(!found)return null;
      try{engine.assert('usage',found.usage);}catch{return null;}
      return {status:'failed',usage:found.usage};
    },
    verifyRecoveredResult(event,currentPlan){
      try{
        demand(engine.digest(currentPlan)===engine.digest(plan),'recovered plan changed');
        const found=winningJournal(event.worker,event.node),worker=successfulAttempt(event.worker,event.node,found);
        demand(event.revision===plan.revision&&event.environment===plan.environment
          &&engine.digest(event.receipt)===engine.digest(recoveryProof(found)),'recovery proof changed');
        return engine.digest(buildResult(worker,found.receipt.value,found.receipt.closure_snapshot,{fresh:true}))===engine.digest(event.result);
      }catch{return false;}
    },
    confirmStopped({callId}){
      const requestFile=path.join(spec.receipts,callId+'.request.json');
      if(fs.existsSync(requestFile)){
        try{
          const request=journalJson(requestFile);
          const entry=request.operation==='critic'?spec.critic:spec.workers[request.input?.id]?.launch;
          return entry?.failure_journal===JOURNAL&&!!journalRead(requestFile,plan,entry);
        }catch{return false;}
      }
      const p=running.get(callId);if(p)return p.exitCode!==null||p.signalCode!==null;
      const file=ledger(callId);return fs.existsSync(file)&&JSON.parse(fs.readFileSync(file,'utf8')).phase==='exited';
    },
    async review(state,control){
      if(spec.critic.failure_journal===JOURNAL){
        // An existing attempt is never launched again, including failed,
        // incomplete, unmetered and supervisor-interrupted attempts.
        if(!fs.existsSync(criticClaim(state))){
          let remaining_budget;
          // This bounded branch precedes any process call/attempt claim. Return
          // a typed no-launch result instead of retaining an ambiguous call lock.
          try{
            remaining_budget=criticRemaining(spec.critic.budget,state);
            demand(remaining_budget.tool_calls>0,'critic tool-call admission budget exhausted');
            demand(state.spent_usd+remaining_budget.cost_usd<=plan.limits.usd,'critic cost reserve unavailable');
          }catch{return {journal_review:true,admission_blocked:true,report:null,usage:null,receipt:null};}
          await processCall(spec.critic,{state,remaining_budget},plan.repo,control);
        }
        try{return readCritic(state)??{journal_review:true,report:null,usage:null,receipt:null};}
        catch{return {journal_review:true,report:null,usage:null,receipt:null};}
      }
      const report=await processCall(spec.critic,{state},plan.repo,control);engine.assert('critique',report);
      demand(report.agent===plan.critic,'critic identity mismatch');reviews.set(engine.digest(report),state.join_sha256);return report;
    },
    verifyCriticUsage(event,currentPlan){
      try{
        demand(spec.critic.failure_journal===JOURNAL&&engine.digest(currentPlan)===engine.digest(plan),'journal critic binding unavailable');
        const found=readCritic(engine.load(stateFile));
        return !!found&&engine.digest(found.usage)===engine.digest(event.usage)&&engine.digest(found.receipt)===engine.digest(event.receipt);
      }catch{return false;}
    },
    verifyCritic({report,actor,receipt},currentPlan){
      if(spec.critic.failure_journal===JOURNAL){try{
        const found=readCritic(engine.load(stateFile));
        return actor===plan.critic&&engine.digest(currentPlan)===engine.digest(plan)&&!!found?.report
          &&engine.digest(found.report)===engine.digest(report)&&receipt!=null&&engine.digest(found.receipt)===engine.digest(receipt);
      }catch{return false;}}
      return actor===currentPlan.critic&&reviews.get(engine.digest(report))===report.join_sha256;
    },
    verifyPreservation({worker,result,contract}){
      const value=check(worker);return value.passed&&result.preservation.contract_sha256===engine.digest(contract)
        &&engine.digest(value.preservation)===engine.digest(result.preservation.checks)&&engine.digest(value.evidence)===engine.digest(result.evidence);
    },
    authorizeCitation(ref){
      // A current four-tool proxy checker is mandatory whenever citations exist.
      if(!spec.memory_check)return false;
      const script=pin(spec.memory_check);outsideWorkers(script,plan);
      const value=spawnSync(process.execPath,[script],{input:JSON.stringify(ref),cwd:plan.repo,encoding:'utf8',windowsHide:true,timeout:30000,maxBuffer:4096});
      if(value.status!==0)return false;
      try{const response=json(value.stdout),age=Date.now()-Date.parse(response.observed_at);return response.authorized===true&&response.citation_sha256===engine.digest(ref)&&age>=0&&age<5000;}catch{return false;}
    },
    proposeEffects(){return spec.effects.map(value=>value.proposal);},
    readApproval(entry){const value=approved(entry);return value?{binding:entry.binding,receipt:hash(spec.approval_file),expires_at:value.expires_at}:null;},
    authorizeApproval(event){const value=approved({binding:event.binding,proposal:event.proposal});return !!value&&event.receipt===hash(spec.approval_file)&&value.expires_at===event.expires_at;},
    executeEffect(effect,approvalBinding){
      demand(approved({binding:approvalBinding,proposal:effect}),'owner approval changed or expired before execution');
      const binding=spec.effects.find(e=>engine.digest(e.proposal)===engine.digest(effect));demand(binding,'unknown effect');
      const lease=coord.execute('check-release',{cwd:plan.repo,sessionId:plan.session,branch:binding.branch,candidate:effect.candidate});
        demand(binding.remote==='origin'&&lease.publication?.publishable===true,'reviewed origin publication receipt required');
      demand(lease.actionsBudget&&Date.now()-Date.parse(lease.actionsBudget.checkedAt)<3600000,'fresh Actions budget required');
      demand(effect.expected_usd===lease.actionsBudget.expectedUsd,'approved effect/Actions exposure mismatch');
      const result=spawnSync('git',['push',binding.remote,`HEAD:refs/heads/${binding.branch}`],{cwd:plan.repo,encoding:'utf8',windowsHide:true,timeout:300000,maxBuffer:16384});
      demand(result.status===0,'push outcome ambiguous; inspect remote, never replay');return remote(effect);
    },
    inspectEffect(effect){return remote(effect);},
    verifyEffect(effect,receipt){const observed=remote(effect);return !!observed&&engine.digest(observed)===engine.digest(receipt);},
    queueDescriptor(context){
      if(spec.queue===undefined)return null;
      return createQueueCapabilities({...context,queueFile:spec.queue.file}).describeInvocation();
    },
    createQueueCapabilities,
  };
}
function createHost(context){
  const file=process.env.ECC_EXECUTION_HOST_CONFIG,expected=process.env.ECC_EXECUTION_HOST_CONFIG_SHA256;
  demand(file&&expected,'explicit reviewed production host config and hash required');pin({path:file,sha256:expected});outsideWorkers(file,context.plan);
  const spec=JSON.parse(fs.readFileSync(file,'utf8'));
  // Production invocation must never silently select the legacy, unmetered
  // path. Direct createBoundHost remains an explicit compatibility/test API.
  demand(spec.critic?.failure_journal===JOURNAL,'production critic requires durable metered journal');
  engine.assert('usage',spec.critic.budget);
  demand(spec.critic.budget.tool_calls>0,'production critic needs a positive tool-call cap');
  demand(Object.keys(spec.workers||{}).sort().join()===context.plan.workers.map(w=>w.id).sort().join(),'production worker adapters must match exact plan');
  for(const worker of context.plan.workers)demand(spec.workers[worker.id].launch?.failure_journal===JOURNAL,
    'production workers require durable journal');
  return createBoundHost(spec,context);
}
module.exports={createHost,createBoundHost,pin};
if(require.main===module){
  if(process.argv.length!==4||process.argv[2]!=='--failure-journal-child')process.exitCode=2;
  else runJournalChild(process.argv[3]).catch(()=>{process.exitCode=2;});
}
