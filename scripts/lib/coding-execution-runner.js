'use strict';
// One explicit operational loop over the existing controller. Native launchers
// and external authorizers remain pinned host capabilities, not agent claims.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const engine = require('./coding-execution');
const coordination = require('./session-coordination');

const REQUIRED = ['launchWorker','inspectWorker','confirmStopped','review','verifyCritic','verifyPreservation','authorizeCitation',
  'proposeEffects','readApproval','authorizeApproval','executeEffect','inspectEffect','verifyEffect'];
const pinnedHosts = new WeakMap();
function demand(condition, message) { if (!condition) throw Error(message); }
function pinnedHost(file, expected, context) {
  demand(path.isAbsolute(file) && /^[a-f0-9]{64}$/.test(expected), 'reviewed absolute host path and SHA256 required');
  const real = fs.realpathSync(file);
  demand(real === path.resolve(file) && !fs.lstatSync(file).isSymbolicLink(), 'linked host forbidden');
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  demand(hash === expected, 'trusted host source changed; reviewed pin required');
  delete require.cache[require.resolve(file)];
  const module = require(file);
  demand(typeof module.createHost === 'function', 'host factory required');
  const host = module.createHost(context);
  for (const key of REQUIRED) demand(typeof host[key] === 'function', `missing trusted host capability: ${key}`);
  pinnedHosts.set(host, { file, expected, planSha256: engine.digest(context.plan) });
  return host;
}
function bindQueue(host, context) {
  const reviewed = pinnedHosts.get(host);
  demand(reviewed && reviewed.planSha256 === engine.digest(context.plan), 'queue requires exact pinned parent host and plan');
  demand(crypto.createHash('sha256').update(fs.readFileSync(reviewed.file)).digest('hex') === reviewed.expected, 'trusted parent source changed before queue binding');
  demand(typeof host.createQueueCapabilities === 'function', 'optional trusted queue capabilities unavailable');
  const capabilities = host.createQueueCapabilities(context);
  demand(capabilities && typeof capabilities === 'object' && typeof capabilities.then !== 'function', 'synchronous reviewed queue capabilities required');
  for (const key of ['withFileLock','atomicWrite','assertWrite','readTelemetry','checkGate','confirmStopped']) {
    demand(typeof capabilities[key] === 'function', `missing trusted queue capability: ${key}`);
  }
  // Explicit opt-in only. The reviewed host must pin transitive capability
  // source, provide synchronous cessation, and recheck canonical gates directly
  // before actual writes/launches/effects; queue admission grants no authority.
  return require('./workspace-queue-store').createQueueStore({ ...capabilities, file: context.queueFile, clock: Date.now });
}
function options(host) {
  const result = {};
  // Verifiers in the transition engine MUST be synchronous; a Promise is not true.
  if(typeof host.verifyCriticUsage==='function')result.verifyCriticUsage=(...args)=>host.verifyCriticUsage(...args)===true;
  for (const key of ['verifyCritic','verifyPreservation','authorizeCitation','authorizeApproval','verifyEffect']) result[key] = (...args) => host[key](...args) === true;
  // Optional capability: legacy hosts cannot adopt successful expired calls.
  // A Promise (including Promise.resolve(true)) never authorizes recovery.
  if(typeof host.verifyRecoveredResult==='function')result.verifyRecoveredResult=(...args)=>host.verifyRecoveredResult(...args)===true;
  return result;
}
async function run(file, host, { maxIterations = 50, maxMilliseconds = 300000, invocation = null } = {}) {
  for (const key of REQUIRED) demand(typeof host[key] === 'function', `missing trusted host capability: ${key}`);
  demand(Number.isSafeInteger(maxIterations) && maxIterations > 0 && maxIterations <= 1000, 'bounded iteration limit required');
  demand(Number.isSafeInteger(maxMilliseconds) && maxMilliseconds > 0 && maxMilliseconds <= 3600000, 'bounded runner time required');
  const queueDeadline=invocation?Date.parse(invocation.leaseUntil):Infinity;
  if(invocation)demand(Number.isFinite(queueDeadline)&&queueDeadline>Date.now(),'queue lease expired before execution');
  const lock = `${file}.runner-lock`;
  const plan = engine.load(file).plan;
  if(invocation)demand(engine.digest(plan)===invocation.plan_sha256,'invocation plan changed before execution');
  const recovery = `${file}.recovery-lock`;
  coordination.execute('check-write', { cwd: plan.repo, sessionId: plan.session,
    paths: [lock,recovery].map(p => path.relative(plan.repo,p).split(path.sep).join('/')) });
  const marker = { pid: process.pid, host: os.hostname(), plan_sha256: engine.digest(plan), nonce: crypto.randomBytes(16).toString('hex'), pendingCalls:[] };
  if(invocation)marker.queue={id:invocation.id,token:invocation.token,binding_sha256:invocation.binding_sha256};
  const confirmed = async value => {
    let timer;
    try { return await Promise.race([Promise.resolve().then(() => host.confirmStopped(value)), new Promise(resolve => { timer=setTimeout(()=>resolve(false),1000); })]) === true; }
    finally { clearTimeout(timer); }
  };
  // Serialize reclamation AND acquisition. A stale recovery lock needs operator
  // reconciliation, never another unsynchronized unlink/check/retry loop.
  const reclaimFd = fs.openSync(recovery, 'wx', 0o600);
  fs.writeFileSync(reclaimFd, JSON.stringify(marker)); fs.fsyncSync(reclaimFd);
  let descriptor;
  try {
    if (fs.existsSync(lock)) {
      const previous = JSON.parse(fs.readFileSync(lock,'utf8'));
      demand(previous.host===os.hostname() && previous.plan_sha256===engine.digest(plan), 'foreign supervisor lock');
      if(invocation)demand(engine.digest(previous.queue??null)===engine.digest(marker.queue),
        'original queue invocation/supervisor mismatch');
      let dead=false; try { process.kill(previous.pid,0); } catch(error) { dead=error.code==='ESRCH'; }
      demand(dead, 'supervisor is still alive or inaccessible');
      demand(Array.isArray(previous.pendingCalls), 'supervisor call journal missing; operator reconciliation required');
      for (const pending of previous.pendingCalls) demand(await confirmed({ ...pending, stateFile:file }), 'interrupted host cessation unverified; retain supervisor lock');
      demand(JSON.stringify(JSON.parse(fs.readFileSync(lock,'utf8')))===JSON.stringify(previous), 'supervisor lock changed');
      fs.unlinkSync(lock);
    }
    if (fs.existsSync(`${file}.lock`)) engine.recoverLock(file);
    engine.transaction(file, state => state);
    descriptor=fs.openSync(lock,'wx',0o600);
    fs.writeFileSync(descriptor,JSON.stringify(marker));fs.fsyncSync(descriptor);
  } finally {
    fs.closeSync(reclaimFd);
    if (JSON.parse(fs.readFileSync(recovery,'utf8')).nonce===marker.nonce) fs.unlinkSync(recovery);
  }
  const verifiedStoppedAttempts = new Set();
  const gates = options(host);
  gates.verifyStoppedAttempt = ({worker,node,cessation}) => cessation?.worker===worker.id
    && cessation.token===node.token && verifiedStoppedAttempts.has(`${worker.id}:${node.token}`);
  const started = Date.now();
  const deadline=Math.min(started+maxMilliseconds,queueDeadline);
  let steps = 0;
  const transition = event => engine.transaction(file, state => engine.apply(state, event, gates));
  const call = async (method, ...args) => {
    const remaining = deadline-Date.now();
    demand(remaining > 0, 'runner time exhausted');
    const abort = new AbortController(); let timer;
    const callId=crypto.randomUUID();
    marker.pendingCalls.push({method,callId});
    fs.writeFileSync(lock,JSON.stringify(marker));
    let invoked=false;
    try {
      const value = await Promise.race([
        Promise.resolve().then(() => {
          demand(!abort.signal.aborted&&deadline>Date.now(),'runner lease/time exhausted before host invocation');
          invoked=true;return host[method](...args, { signal: abort.signal, callId });
        }),
        new Promise((_, reject) => { timer = setTimeout(() => { abort.abort(); reject(Object.assign(Error('host deadline exceeded; execution state retained for reconciliation'),{uncertain:{method,callId}})); }, Math.max(1,deadline-Date.now())); }),
      ]);
      marker.pendingCalls=marker.pendingCalls.filter(pending=>pending.callId!==callId);
      fs.writeFileSync(lock,JSON.stringify(marker));
      return value;
    } catch (error) {
      if (!invoked||await confirmed({method,callId,stateFile:file})) marker.pendingCalls=marker.pendingCalls.filter(pending=>pending.callId!==callId);
      fs.writeFileSync(lock,JSON.stringify(marker));
      throw error;
    } finally { clearTimeout(timer); }
  };
  const recoverWorkers = async state => {
    for (const worker of state.plan.workers) {
      const node = state.nodes[worker.id];
      if (node.status !== 'running' || node.lease_until > Date.now()) continue;
      const observed = await call('inspectWorker', structuredClone(worker), structuredClone(node));
      // Expiry does NOT prove the process stopped or that failed spending was zero.
      if(observed?.status==='completed'){
        if(!observed.result||observed.receipt==null||typeof gates.verifyRecoveredResult!=='function')return false;
        demand(observed.result.worker===worker.id&&observed.result.token===node.token,'inspected completion belongs to another worker attempt');
        // Adopt the original running token; never dispatch a replacement for
        // an already completed adapter. Engine rechecks every current gate.
        state=transition({type:'recover-result',actor:state.plan.parent,result:observed.result,receipt:observed.receipt});
        if(state.phase==='budget-exhausted')return true;
        continue;
      }
      if (observed?.status !== 'failed' || !observed.usage) return false;
      // inspectWorker is trusted, token-bound completion/closure evidence.
      // Bind its failed observation to this exact persisted attempt in apply().
      const key = `${worker.id}:${node.token}`;
      verifiedStoppedAttempts.add(key);
      try {
        state = transition({ type: 'worker-error', actor: worker.agent, worker: worker.id, token: node.token,
          usage: observed.usage, cessation:{worker:worker.id,token:node.token,status:'failed',confirmed_at:Date.now()} });
      } finally { verifiedStoppedAttempts.delete(key); }
      if(state.phase==='budget-exhausted')return true;
    }
    return true;
  };
  try {
    let state = engine.load(file);
    if(invocation)demand(engine.digest(state)===invocation.checkpoint_sha256,
      'invocation checkpoint changed before execution');
    if (!await recoverWorkers(state)) return { state:engine.load(file), stopped: 'worker-reconciliation-required', transitions: steps };
    state = transition({ type: 'recover', actor: plan.parent });
    while (steps++ < maxIterations && Date.now() < deadline) {
      const parent = state.plan.parent;
      if (['completed','budget-exhausted'].includes(state.phase)) return { state, stopped: state.phase, transitions: steps };
      if (['planned','repair'].includes(state.phase)) {
        state = await engine.dispatchParallel(file, worker => call('launchWorker', worker), gates);
      } else if (state.phase === 'workers') {
        if (!await recoverWorkers(state)) return { state: engine.load(file), stopped: 'worker-reconciliation-required', transitions: steps };
        state = transition({ type: 'recover', actor: parent });
        if (state.phase === 'workers') return { state, stopped: 'awaiting-live-worker-leases', transitions: steps };
      } else if (state.phase === 'critic') {
        const reviewed = await call('review', structuredClone(state));
        if(reviewed?.journal_review===true){
          if(reviewed.admission_blocked===true)return {state:engine.load(file),stopped:'critic-admission-blocked',transitions:steps};
          if(!reviewed.usage||!reviewed.receipt||typeof gates.verifyCriticUsage!=='function')
            return {state:engine.load(file),stopped:'critic-reconciliation-required',transitions:steps};
          state=transition({type:'critic-usage',actor:state.plan.parent,usage:reviewed.usage,receipt:reviewed.receipt});
          if(state.phase==='budget-exhausted')continue;
          if(!reviewed.report)return {state,stopped:'critic-reconciliation-required',transitions:steps};
          state=transition({type:'critic',actor:state.plan.critic,report:reviewed.report,receipt:reviewed.receipt});
        }else state = transition({ type: 'critic', actor: state.plan.critic, report:reviewed });
      } else if (state.phase === 'synthesis') {
        state = transition({ type: 'synthesis', actor: parent, output: { version: 1, join_sha256: state.join_sha256,
          claim: 'locally-verified', outputs: state.plan.workers.map(worker => worker.id) } });
      } else if (state.phase === 'approval') {
        if (!Object.keys(state.effects).length) {
          const proposals = await call('proposeEffects', structuredClone(state));
          demand(Array.isArray(proposals), 'explicit effect list required; no invented release');
          if (proposals.length === 0) return { state, stopped: 'locally-verified-no-effects', transitions: steps };
          // Successful local synthesis is not a release. Keep phase approval
          // and the completion/effect barrier intact until exact effects exist.
          for (const effect of proposals) state = transition({ type: 'propose-effect', actor: parent, effect });
        }
        const entry = Object.values(state.effects).find(effect => effect.status !== 'completed');
        if (entry.status === 'pending') {
          const approval = await call('readApproval', structuredClone(entry), structuredClone(state));
          if (!approval) return { state, stopped: 'owner-approval-required', transitions: steps };
          state = transition({ ...approval, type: 'approve-effect', actor: parent, id: entry.proposal.id });
        }
        state = transition({ type: 'begin-effect', actor: parent, id: entry.proposal.id, binding: entry.binding });
        // Persist begin BEFORE the host side effect. Failures leave reconciliation,
        // never an automatic repeated push/deploy/provider call.
        const receipt = await call('executeEffect', structuredClone(entry.proposal), entry.binding);
        state = transition({ type: 'finish-effect', actor: parent, id: entry.proposal.id, receipt });
      } else if (['effect','reconciliation'].includes(state.phase)) {
        if (state.phase === 'effect') state = transition({ type: 'recover', actor: parent });
        const entry = Object.values(state.effects).find(effect => effect.status === 'running');
        demand(entry, 'ambiguous effect not found');
        const receipt = await call('inspectEffect', structuredClone(entry.proposal), entry.binding);
        if (!receipt) return { state, stopped: 'effect-reconciliation-required', transitions: steps };
        state = transition({ type: 'reconcile-effect', actor: parent, id: entry.proposal.id, receipt });
      } else throw Error('unsupported operational phase');
    }
    return { state: engine.load(file), stopped: 'runner-budget', transitions: steps };
  } finally {
    fs.closeSync(descriptor);
    if (!marker.pendingCalls.length && JSON.parse(fs.readFileSync(lock, 'utf8')).nonce === marker.nonce) fs.unlinkSync(lock);
  }
}
async function runWithQueue(file,host,context,limits={}){
  const reviewed=pinnedHosts.get(host);
  demand(reviewed&&reviewed.planSha256===engine.digest(context.plan),
    'invocation requires exact pinned parent/plan');
  demand(path.resolve(context.stateFile)===path.resolve(file)
    &&engine.digest(engine.load(file).plan)===reviewed.planSha256,'invocation state/plan changed');
  demand(crypto.createHash('sha256').update(fs.readFileSync(reviewed.file)).digest('hex')===reviewed.expected,
    'trusted parent changed before invocation');
  const descriptor=typeof host.queueDescriptor==='function'?host.queueDescriptor(context):null;
  demand(!descriptor||typeof descriptor.then!=='function','synchronous queue descriptor required');
  if(descriptor===null)return run(file,host,limits);
  const template=descriptor?.entry;
  demand(path.isAbsolute(file)&&descriptor&&path.isAbsolute(descriptor.file)
    &&template?.owner===context.plan.session&&template.state==='waiting'
    &&template.token===undefined&&template.invocation===undefined,
    'explicit parent invocation descriptor required');
  demand(Number.isInteger(descriptor.lease_ms)&&descriptor.lease_ms>0&&descriptor.lease_ms<=300000,
    'bounded invocation lease required');
  for(const key of ['config_sha256','checkpoint_sha256','dependency_sha256'])
    demand(/^[a-f0-9]{64}$/.test(descriptor[key]),'bound invocation evidence required');
  const stopped=reason=>({state:engine.load(file),stopped:reason,transitions:0,
    queue:{id:template.id,authorizationGranted:false}});
  if(descriptor.ready!==true)return stopped('queue-dependency-not-ready');
  const binding={version:1,actor:context.plan.parent,session:context.plan.session,
    plan_sha256:engine.digest(context.plan),state_file:fs.realpathSync(file),queue_file:descriptor.file,
    host_file:reviewed.file,host_sha256:reviewed.expected,queue_config_sha256:descriptor.config_sha256,
    template_sha256:engine.digest(template)};
  const bindingSha256=engine.digest(binding),queue=bindQueue(host,{...context,queueFile:descriptor.file});
  const snapshot=queue.snapshot();
  if(snapshot.entries.some(e=>e.id===template.id))
    return stopped('queue-legacy-entry-requires-explicit-migration');
  // Preserve history. A changed source/plan/session cannot adopt an old claim,
  // even when the descriptor ID or resource owner happens to match.
  const history=snapshot.entries.filter(e=>e.invocation?.base_id===template.id);
  for(const entry of history)demand(entry.invocation.binding_sha256===bindingSha256
    &&engine.digest(entry.invocation.binding)===bindingSha256,'retained invocation identity changed');
  if(history.some(e=>e.state==='owner-paused'))return stopped('queue-owner-paused');
  const active=history.filter(e=>e.state==='running');
  demand(active.length<=1,'ambiguous invocation history; reconciliation required');
  const supervisor={pid:process.pid,host:os.hostname(),nonce:crypto.randomBytes(16).toString('hex')};
  let entry,claim;
  if(active.length){
    entry=active[0];
    // recover() returns the same durable token only after atomic fresh
    // source/owner/death/cessation/spend checks; no snapshot-token adoption.
    claim=queue.recover({id:entry.id,owner:entry.owner,bindingSha256,supervisor,
      leaseMilliseconds:descriptor.lease_ms,dependencySha256:descriptor.dependency_sha256,
      checkpointSha256:descriptor.checkpoint_sha256});
  }else{
    const previous=history.filter(e=>['completed','cancelled'].includes(e.state)).at(-1);
    if(previous?.state==='cancelled')return stopped('queue-cancelled-requires-owner-checkpoint');
    if(previous?.state==='completed'){
      demand(previous.invocation.closed_checkpoint,'terminal invocation checkpoint missing');
      if(previous.invocation.closed_checkpoint.sha256===descriptor.checkpoint_sha256
        &&previous.invocation.closed_checkpoint.dependency_sha256===descriptor.dependency_sha256)
        return stopped('queue-awaiting-checkpoint-or-dependency-change');
    }
    const identity=engine.digest({bindingSha256,checkpoint:descriptor.checkpoint_sha256,
      dependency:descriptor.dependency_sha256,previous:previous?.state==='completed'?previous.id:null});
    entry={...structuredClone(template),id:template.id+':'+identity,
      dependsOn:[...new Set([...template.dependsOn,...(previous?.state==='completed'?[previous.id]:[])])],
      invocation:{base_id:template.id,binding,binding_sha256:bindingSha256,
        checkpoint_sha256:descriptor.checkpoint_sha256,dependency_sha256:descriptor.dependency_sha256}};
    const waiting=history.filter(e=>e.state==='waiting');
    demand(waiting.length<=1,'ambiguous waiting invocation history');
    if(waiting.length){
      // No token exists yet. Keep the original queued identity and atomically
      // bind fresh resolved dependency evidence when this same claim is admitted.
      demand(waiting[0].invocation.checkpoint_sha256===descriptor.checkpoint_sha256,
        'waiting invocation checkpoint changed; reconcile it first');
      entry=waiting[0];
    }else queue.enqueue([entry]);
    claim=queue.acquire({id:entry.id,owner:entry.owner,supervisor,leaseMilliseconds:descriptor.lease_ms,
      dependencySha256:descriptor.dependency_sha256});
    if(!claim.acquired)return stopped('queue-waiting');
  }
  let result;
  try{
    const remaining=Date.parse(claim.leaseUntil)-Date.now();
    demand(Number.isSafeInteger(remaining)&&remaining>0,'queue lease expired after admission');
    result=await run(file,host,{...limits,maxMilliseconds:Math.min(limits.maxMilliseconds??300000,remaining),
      invocation:{id:entry.id,token:claim.token,binding_sha256:bindingSha256,
        leaseUntil:claim.leaseUntil,plan_sha256:binding.plan_sha256,checkpoint_sha256:descriptor.checkpoint_sha256}});
  }catch(error){
    // Never cancel an uncertain call. The durable original claim is available
    // to a fresh supervisor after verified death, cessation and actual usage.
    return {...stopped('queue-reconciliation-required'),queue:{id:entry.id,claimRetained:true,
      authorizationGranted:false,reason:error.message}};
  }
  try{
    queue.release({id:entry.id,owner:entry.owner,token:claim.token,outcome:'completed',
      checkpoint:{sha256:engine.digest(result.state),stopped:result.stopped,
        dependency_sha256:descriptor.dependency_sha256}});
  }catch(error){return {...result,stopped:'queue-reconciliation-required',queue:{id:entry.id,
    claimRetained:true,authorizationGranted:false,reason:error.message}};}
  return {...result,queue:{id:entry.id,claimRetained:false,authorizationGranted:false}};
}
module.exports = { run, runWithQueue, pinnedHost, bindQueue, options, REQUIRED };
