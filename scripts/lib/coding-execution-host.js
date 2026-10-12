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
function json(output){demand(Buffer.byteLength(output)<1024*1024,'host output too large');return JSON.parse(output);}
function createBoundHost(spec,{stateFile,plan}){
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
  function check(w){
    const binding=spec.workers[w.id];demand(binding,'worker has no reviewed process adapter');
    pin(binding.check);
    const state=store.captureRepositoryState(w.repo,{excludePaths:[path.join(w.repo,'.ecc/goal')]});
    const key=engine.digest({worker:w.id,head:state.head,tree:state.tree_fingerprint,check:binding.check.sha256});
    if(!checks.has(key)){
      const child=spawnSync(process.execPath,[binding.check.path],{cwd:w.repo,input:JSON.stringify({worker:w,plan_revision:plan.revision,environment:plan.environment}),encoding:'utf8',windowsHide:true,timeout:spec.timeout_ms,maxBuffer:1024*1024});
      demand(child.status===0,'protected independent acceptance check failed');
      const result=json(child.stdout);demand(typeof result.passed==='boolean'&&Array.isArray(result.evidence)&&Array.isArray(result.preservation),'invalid protected check output');
      checks.set(key,result);
    }
    return checks.get(key);
  }
  async function processCall(entry,input,cwd,{signal,callId}){
    const script=pin(entry);outsideWorkers(script,plan);
    // The reviewed adapter owns its native sandbox/usage accounting. This
    // process boundary alone is NOT an operating-system filesystem sandbox.
    const child=spawn(process.execPath,[script],{cwd,windowsHide:true,stdio:['pipe','pipe','pipe']});
    const identity={worker:input.id??null,token:input.token??null};
    running.set(callId,child);persist(callId,{pid:child.pid,phase:'running',method:entry.path,...identity});
    let output='',overflow=false;
    const abort=()=>child.kill();signal?.addEventListener('abort',abort,{once:true});
    const timer=setTimeout(abort,spec.timeout_ms);
    const result=await new Promise((resolve,reject)=>{
      child.stdout.on('data',v=>{output+=v;if(Buffer.byteLength(output)>1024*1024){overflow=true;abort();}});
      child.stderr.resume(); // Never persist credential-bearing client diagnostics.
      child.once('error',reject);child.once('close',code=>resolve({code,output}));
      child.stdin.end(JSON.stringify(input));
    }).finally(()=>{clearTimeout(timer);signal?.removeEventListener('abort',abort);running.delete(callId);});
    if(result.code!==0||overflow){persist(callId,{pid:child.pid,phase:'exited',exit:result.code,usage:null,...identity});throw Error('reviewed host process failed; usage reconciliation required');}
    const value=json(result.output);persist(callId,{pid:child.pid,phase:'exited',exit:0,usage:value.usage??null,...identity});return value;
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
  return {
    async launchWorker(worker,control){
      const binding=spec.workers[worker.id];demand(binding,'worker adapter absent');
      const launched=await processCall(binding.launch,worker,worker.repo,control);
      engine.assert('usage',launched.usage);
      demand(launched.agent===worker.agent&&launched.runtime===worker.runtime&&launched.token===worker.token,'native adapter identity mismatch');
      demand(launched.native_protection===true,'reviewed adapter did not attest activated native protection');
      const accepted=check(worker),snapshot=store.captureRepositoryState(worker.repo,{excludePaths:[path.join(worker.repo,'.ecc/goal')]});
      return {version:1,worker:worker.id,agent:worker.agent,runtime:worker.runtime,token:worker.token,revision:plan.revision,environment:plan.environment,
        status:accepted.passed?'pass':'fail',head:snapshot.head,tree_fingerprint:snapshot.tree_fingerprint,changed_paths:snapshot.dirty_paths,evidence:accepted.evidence,
        citations:accepted.citations||[],usd:launched.usage.cost_usd,usage:launched.usage,
        preservation:{contract_sha256:engine.digest(worker.assignment.change_contract),checks:accepted.preservation}};
    },
    inspectWorker(worker,node){
      // Unknown exit/usage never becomes zero-cost retry permission.
      const values=fs.readdirSync(spec.receipts).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(path.join(spec.receipts,f),'utf8')));
      const found=values.find(v=>v.worker===worker.id&&v.token===node.token&&v.phase==='exited'&&v.usage);
      return found?{status:'failed',usage:found.usage}:null;
    },
    confirmStopped({callId}){const p=running.get(callId);if(p)return p.exitCode!==null||p.signalCode!==null;const file=ledger(callId);return fs.existsSync(file)&&JSON.parse(fs.readFileSync(file,'utf8')).phase==='exited';},
    async review(state,control){const report=await processCall(spec.critic,{state},plan.repo,control);engine.assert('critique',report);demand(report.agent===plan.critic,'critic identity mismatch');reviews.set(engine.digest(report),state.join_sha256);return report;},
    verifyCritic({report,actor},currentPlan){return actor===currentPlan.critic&&reviews.get(engine.digest(report))===report.join_sha256;},
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
      demand(lease.actionsBudget&&Date.now()-Date.parse(lease.actionsBudget.checkedAt)<3600000,'fresh Actions budget required');
      demand(effect.expected_usd===lease.actionsBudget.expectedUsd,'approved effect/Actions exposure mismatch');
      const result=spawnSync('git',['push',binding.remote,`HEAD:refs/heads/${binding.branch}`],{cwd:plan.repo,encoding:'utf8',windowsHide:true,timeout:300000,maxBuffer:16384});
      demand(result.status===0,'push outcome ambiguous; inspect remote, never replay');return remote(effect);
    },
    inspectEffect(effect){return remote(effect);},
    verifyEffect(effect,receipt){const observed=remote(effect);return !!observed&&engine.digest(observed)===engine.digest(receipt);},
  };
}
function createHost(context){
  const file=process.env.ECC_EXECUTION_HOST_CONFIG,expected=process.env.ECC_EXECUTION_HOST_CONFIG_SHA256;
  demand(file&&expected,'explicit reviewed production host config and hash required');pin({path:file,sha256:expected});outsideWorkers(file,context.plan);
  return createBoundHost(JSON.parse(fs.readFileSync(file,'utf8')),context);
}
module.exports={createHost,createBoundHost,pin};
