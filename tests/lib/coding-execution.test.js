'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync, spawn } = require('node:child_process');
const engine = require('../../scripts/lib/coding-execution');
// Explicit fixture identity verifier; this is NOT a live-model identity claim.
const c = { ...engine, apply:(state,event,options={}) => engine.apply(state,event,{
  verifyCritic:(review,plan)=>review.actor===plan.critic && review.actor!==plan.parent && !plan.workers.some(w=>w.agent===review.actor),
  // Synthetic comparator only: does not certify a live UI or vendor behavior.
  verifyPreservation:({result})=>result.status==='pass',
  ...options,
}) };
const coord = require('../../scripts/lib/session-coordination');
const store = require('../../scripts/lib/goal-store');
const operational = require('../../scripts/lib/coding-execution-runner');
const concrete = require('../../scripts/lib/coding-execution-host');
function fixture(t, runtimes = ['claude','gemini']) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-execution-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true })); // Own synthetic fixtures only.
  function repo(name) {
    const root = path.join(directory, name); fs.mkdirSync(root);
    const git = args => execFileSync('git', args, { cwd: root, stdio: 'pipe', windowsHide: true });
    git(['init','-q']); git(['config','user.name','Offline fixture']); git(['config','user.email','fixture@example.invalid']);
    fs.writeFileSync(path.join(root,'.gitignore'), '.ecc/goal/\n'); fs.writeFileSync(path.join(root,'code.txt'),'baseline\n');
    git(['add','.']); git(['-c','core.hooksPath=','commit','-qm','synthetic baseline']);
    fs.mkdirSync(path.join(root,'.ecc/goal'), { recursive: true }); return root;
  }
  const root = repo('parent'), goal = path.join(root,'.ecc/goal/active-goal.json');
  const goalDocument = {
    schema:'ecc.active-goal.v1',goal_id:'execution',mode:'controlled',proof_profile:'security',
    objective:'demonstrate controller, not product completion',current_priority:'required output',non_goals:['unrequested refactors'],
    user_visible_proofs:[{id:'required-output',description:'controller evidence',lane_id:'controller',required_stage:'calculation_implemented',
      required_evidence_kinds:['test','runtime'],required_repositories:['ecc'],allowed_result_classes:['other'],
      acceptance_predicate:'code.txt exists with hash',requires_authentic:false,requires_user_visible:false,subject_scope:null,required:true}],
    lanes:[{id:'controller',description:'controller evidence',status:'active',blocker:null,next_action:'required output'}],owner_corrections:[],
    forecast:{state:'not_set',confidence:'none',basis:null,critical_path:['required-output'],likely_hours:null,next_checkpoint_at:null,
      checkpoint_started_at:null,checkpoint_proof_id:null,updated_at:new Date().toISOString()},status:'active',updated_at:new Date().toISOString(),
  };
  fs.writeFileSync(goal, JSON.stringify(goalDocument));
  // This operational controller binds guards/queues; goal-only metadata cannot grant that authority.
  coord.execute('register', { cwd: root, sessionId: 'parent', scopes: ['code.txt', '.ecc/goal'], objective: 'controller', doneWhen: 'checks', ttl:120 });
  const workers = runtimes.map((runtime, index) => {
    const id = `worker-${index}`, workerRepo = repo(id);
    fs.writeFileSync(path.join(workerRepo,'.ecc/goal/baseline.json'),JSON.stringify({design:'approved',data:42}));
    coord.execute('register', { cwd: workerRepo, sessionId: id, scopes: ['code.txt'], objective: 'owned output', doneWhen: 'receipt', ttl:120 });
    return { id, runtime, agent: id, repo: workerRepo, session: id, scopes: ['code.txt'], requirement: 'required output', acceptance: 'code.txt exists with hash', expires_at: new Date(Date.now()+3600000).toISOString(), max_attempts:3,
      assignment_id:id,assignment_sha256:'0'.repeat(64) };
  });
  const assignmentsFile = path.join(root,'.ecc/goal/assignments.jsonl');
  const assignments = workers.map(worker => ({schema:'ecc.assignment.v1',assignment_id:worker.id,goal_id:goalDocument.goal_id,
    description:worker.requirement,acceptance_ids:['required-output'],owner_runtime:worker.runtime,owner_agent:worker.agent,scope_paths:worker.scopes,
    issued_at:new Date(Date.now()-1000).toISOString(),lease_expires_at:worker.expires_at,
    budget:{max_tool_calls:10,max_retries:2,max_ci_runs:0,max_cost_usd:0},source_harness:'offline-fixture',
    change_contract:{version:1,requested_delta:worker.requirement,preserved_invariants:[{id:'preserve',description:'preserve unrelated behavior',category:'behavior',
      baseline:{path:'.ecc/goal/baseline.json',sha256:store.sha256File(path.join(worker.repo,'.ecc/goal/baseline.json')),kind:'local-check'}}]}}));
  const writeAssignments = () => {
    fs.writeFileSync(assignmentsFile,assignments.map(item=>JSON.stringify(item)).join('\n')+'\n');
    workers.forEach((worker,index)=>{worker.assignment_sha256=c.digest(assignments[index]);});
  };
  writeAssignments();
  const plan = { version:3, id:'execution', parent:'parent', session:'parent', repo:root, goal_file:goal, assignments_file:assignmentsFile,
    goal_sha256:store.sha256File(goal), revision:c.digest('owner revision'), environment:'offline-fixture', critic:'independent-critic', workers,
    limits:{ dispatches:workers.length*3, repairs:2, lease_ms:60000, usd:0 } };
  const file = path.join(root,'.ecc/goal/execution.json');
  function result(state, id = workers[0].id) {
    const w = workers.find(w => w.id === id), snapshot = store.captureRepositoryState(w.repo, { excludePaths:[path.join(w.repo,'.ecc/goal')] });
    return { version:1, worker:id, agent:w.agent, runtime:w.runtime, token:state.nodes[id].token, revision:plan.revision, environment:plan.environment,
      status:'pass', head:snapshot.head, tree_fingerprint:snapshot.tree_fingerprint, changed_paths:snapshot.dirty_paths,
      evidence:[{path:'code.txt',sha256:store.sha256File(path.join(w.repo,'code.txt')),kind:'local-check'}],citations:[],usd:0,
      preservation:{contract_sha256:c.digest(assignments.find(item=>item.assignment_id===id).change_contract),
        checks:[{id:'preserve',evidence:{path:'code.txt',sha256:store.sha256File(path.join(w.repo,'code.txt')),kind:'local-check'}}]},
      usage:{tool_calls:1,retries:0,ci_runs:0,cost_usd:0} };
  }
  function joined() {
    let s=c.apply(c.initialize(plan),{type:'dispatch',actor:'parent'});
    for(const w of workers) s=c.apply(s,{type:'result',actor:w.agent,result:result(s,w.id)}); return s;
  }
  function approvedCritic() {
    const s=joined(); return c.apply(s,{type:'critic',actor:plan.critic,report:{agent:plan.critic,join_sha256:s.join_sha256,accepted:true,rejections:[]}});
  }
  function synthesized() {
    const s=approvedCritic(); return c.apply(s,{type:'synthesis',actor:'parent',output:{version:1,join_sha256:s.join_sha256,claim:'locally-verified',outputs:workers.map(w=>w.id)}});
  }
  const effect = {id:'publish',kind:'push',target:'origin/seabridge_development',payload_sha256:c.digest('exact proposed payload'),candidate:'a'.repeat(40),environment:plan.environment,expected_usd:0};
  return { plan,file,result,joined,approvedCritic,synthesized,effect,goalDocument,assignments,writeAssignments };
}
test('concrete reviewed processes reject, repair and pause for externally signed exact approval', async t => {
  const f=fixture(t,['opencode']);
  f.plan.limits.usd=1; // synthetic reserve required by release contract; actual bare-Git cost is zero
  const crypto=require('node:crypto'),trust=path.join(f.plan.repo,'.ecc/goal/trust');fs.mkdirSync(trust);
  const script=(name,text)=>{const file=path.join(trust,name+'.js');fs.writeFileSync(file,text);return {path:file,sha256:store.sha256File(file)};};
  const launch=script('launch',`const fs=require('node:fs');const w=JSON.parse(fs.readFileSync(0,'utf8'));const file='.ecc/goal/attempt';const n=fs.existsSync(file)?2:1;fs.writeFileSync(file,String(n));fs.writeFileSync('code.txt',JSON.stringify({design:'approved',data:42,delta:n===2?'delivered':'missing'}));console.log(JSON.stringify({agent:w.agent,runtime:w.runtime,token:w.token,native_protection:true,usage:{tool_calls:1,retries:0,ci_runs:0,cost_usd:0}}));`);
  const check=script('check',`const fs=require('node:fs'),crypto=require('node:crypto');const v=JSON.parse(fs.readFileSync('code.txt'));const h=crypto.createHash('sha256').update(fs.readFileSync('code.txt')).digest('hex');const evidence={path:'code.txt',sha256:h,kind:'local-check'};console.log(JSON.stringify({passed:v.design==='approved'&&v.data===42&&v.delta==='delivered',evidence:[evidence],preservation:[{id:'preserve',evidence}],citations:[]}));`);
  const critic=script('critic',`const fs=require('node:fs');const {state:s}=JSON.parse(fs.readFileSync(0,'utf8'));const rejected=Object.values(s.nodes).filter(n=>n.result.status!=='pass').map(n=>({worker:n.result.worker,reason:'failed-acceptance'}));console.log(JSON.stringify({agent:s.plan.critic,join_sha256:s.join_sha256,accepted:!rejected.length,rejections:rejected}));`);
  const keys=crypto.generateKeyPairSync('ed25519'),key=path.join(trust,'owner.pub');fs.writeFileSync(key,keys.publicKey.export({type:'spki',format:'pem'}));
  const approval=path.join(trust,'owner-approval.json');fs.writeFileSync(approval,'{}');
  const effect={...f.effect,expected_usd:1,candidate:execFileSync('git',['rev-parse','HEAD'],{cwd:f.plan.repo,encoding:'utf8'}).trim(),target:'origin/approved-batch'};
  const spec={version:1,plan_sha256:engine.digest(f.plan),timeout_ms:10000,receipts:path.join(f.plan.repo,'.ecc/goal/processes'),
    workers:{'worker-0':{launch,check}},critic,approval_key:{path:key,sha256:store.sha256File(key)},approval_file:approval,effects:[{proposal:effect,remote:'origin',branch:'approved-batch'}]};
  c.create(f.file,f.plan);
  const host=concrete.createBoundHost(spec,{stateFile:f.file,plan:f.plan});
  const paused=await operational.run(f.file,host);
  assert.equal(paused.stopped,'owner-approval-required');assert.equal(paused.state.repairs,1);assert.equal(paused.state.dispatches,2);
  const entry=paused.state.effects.publish,payload={binding:entry.binding,proposal_sha256:engine.digest(entry.proposal),plan_sha256:engine.digest(f.plan),expires_at:new Date(Date.now()+60000).toISOString()};
  fs.writeFileSync(approval,JSON.stringify({payload,signature:crypto.sign(null,Buffer.from(store.canonicalJson(payload)),keys.privateKey).toString('base64')}));
  const event=host.readApproval(entry);assert.equal(host.authorizeApproval({...event,proposal:entry.proposal}),true);
  assert.equal(host.authorizeApproval({...event,binding:'0'.repeat(64),proposal:entry.proposal}),false);
  assert.equal(host.authorizeCitation({chunk_id:'0'.repeat(64)}),false);
  // Local coordination is not permission to execute a publication side effect.
  coord.execute('release-acquire',{cwd:f.plan.repo,sessionId:f.plan.session,branch:'approved-batch',candidate:effect.candidate,
    actionsBudgetStatus:'known',actionsBudgetUsed:0,actionsBudgetLimit:400,actionsBudgetCheckedAt:new Date().toISOString(),actionsBudgetSource:'owner-screenshot',actionsStopUsage:'yes',expectedActionsUsd:1,expectedWorkflows:'Local bare fixture'});
  assert.throws(()=>host.executeEffect(entry.proposal,entry.binding),/reviewed origin publication receipt required/);
  coord.execute('release-end',{cwd:f.plan.repo,sessionId:f.plan.session,outcome:'aborted-before-push',evidence:'Local-only receipt denied effect before a Git push; own fixture only'});
  // Exercise the actual Git effect against our own bare fixture, never GitHub.
  const bare=path.join(trust,'remote.git');execFileSync('git',['init','--bare','-q',bare],{stdio:'pipe'});
  execFileSync('git',['remote','add','origin',bare],{cwd:f.plan.repo,stdio:'pipe'});
  coord.execute('release-acquire',{cwd:f.plan.repo,sessionId:f.plan.session,branch:'approved-batch',candidate:effect.candidate,
    newBranchBase:effect.candidate,publicationEvidence:'Fixture owner signed exact proposal approving this synthetic baseline history for the new local bare target',
    actionsBudgetStatus:'known',actionsBudgetUsed:0,actionsBudgetLimit:400,actionsBudgetCheckedAt:new Date().toISOString(),actionsBudgetSource:'owner-screenshot',actionsStopUsage:'yes',expectedActionsUsd:1,expectedWorkflows:'Local bare fixture'});
  const done=await operational.run(f.file,host);assert.equal(done.state.phase,'completed');
  assert.equal(host.verifyEffect(effect,done.state.effects.publish.receipt),true);
  assert.equal((await operational.run(f.file,host)).state.sequence,done.state.sequence+1); // recovery checkpoint only, no second push
  coord.execute('release-end',{cwd:f.plan.repo,sessionId:f.plan.session,outcome:'completed',evidence:'exact local bare remote SHA verified'});
  const impostor=crypto.generateKeyPairSync('ed25519');fs.writeFileSync(approval,JSON.stringify({payload,signature:crypto.sign(null,Buffer.from(store.canonicalJson(payload)),impostor.privateKey).toString('base64')}));
  assert.equal(host.readApproval(entry),null);
  fs.appendFileSync(check.path,'\n// unapproved edit');assert.throws(()=>concrete.createBoundHost(spec,{stateFile:f.file,plan:f.plan}),/source changed/);
});

test('concrete recovery never relabels a successful or unmetered process as retryable failure', t => {
  const f=fixture(t,['opencode']),trust=path.join(f.plan.repo,'.ecc/goal/trust');fs.mkdirSync(trust);
  const adapter=path.join(trust,'adapter.js');fs.writeFileSync(adapter,'// Not executed by this receipt-validation test.\n');
  const pin={path:adapter,sha256:store.sha256File(adapter)},approval=path.join(trust,'approval.json');fs.writeFileSync(approval,'{}');
  const spec={version:1,plan_sha256:engine.digest(f.plan),timeout_ms:1000,receipts:path.join(f.plan.repo,'.ecc/goal/processes'),
    workers:{'worker-0':{launch:pin,check:pin}},critic:pin,approval_key:pin,approval_file:approval,effects:[]};
  const host=concrete.createBoundHost(spec,{stateFile:f.file,plan:f.plan}),worker=f.plan.workers[0],node={token:'fixture-token'};
  const receipt=path.join(spec.receipts,'receipt.json'),usage={tool_calls:1,retries:0,ci_runs:0,cost_usd:0};
  for(const value of [{exit:0,usage},{exit:null,usage},{exit:1,usage:null},{exit:1,usage:{}}]){
    fs.writeFileSync(receipt,JSON.stringify({worker:worker.id,token:node.token,phase:'exited',...value}));
    assert.equal(host.inspectWorker(worker,node),null);
  }
  fs.writeFileSync(receipt,JSON.stringify({worker:worker.id,token:node.token,phase:'exited',exit:1,usage}));
  assert.deepEqual(host.inspectWorker(worker,node),{status:'failed',usage});
});

function journalFixture(t, leaseMs=5000, successful=false) {
  const f=fixture(t,['opencode']);f.plan.limits.lease_ms=leaseMs;f.plan.workers[0].max_attempts=2;
  const trust=path.join(f.plan.repo,'.ecc/goal/trust');fs.mkdirSync(trust);
  const workerScript=path.join(trust,'local-failing-adapter.js');
  // Deterministic local process only; does not claim model/native protection.
  fs.writeFileSync(workerScript,`const fs=require('node:fs');const w=JSON.parse(fs.readFileSync(0,'utf8'));const log=event=>fs.appendFileSync('code.txt','\\n'+JSON.stringify({event,pid:process.pid,at:Date.now()}));log('start');setTimeout(()=>{log('close');console.log(JSON.stringify({agent:w.agent,runtime:w.runtime,token:w.token,native_protection:false,usage:{tool_calls:1,retries:0,ci_runs:0,cost_usd:0}}));process.exit(1);},1500);`);
  const dummy=path.join(trust,'unused-verifier.js');fs.writeFileSync(dummy,'throw Error("This failed-attempt fixture must not reach a critic/effect");\n');
  const pinned=file=>({path:file,sha256:store.sha256File(file)}),approval=path.join(trust,'approval.json');fs.writeFileSync(approval,'{}');
  let check=pinned(dummy),critic=pinned(dummy);
  if(successful){
    // Synthetic native attestation exercises the contract only, not a vendor CLI.
    fs.writeFileSync(workerScript,`const fs=require('node:fs');const w=JSON.parse(fs.readFileSync(0,'utf8'));const v={design:'approved',data:42,delta:'delivered',launches:1,events:[{event:'start',pid:process.pid,at:Date.now()}]};fs.writeFileSync('code.txt',JSON.stringify(v));setTimeout(()=>{v.events.push({event:'close',pid:process.pid,at:Date.now()});fs.writeFileSync('code.txt',JSON.stringify(v));console.log(JSON.stringify({agent:w.agent,runtime:w.runtime,token:w.token,native_protection:true,usage:{tool_calls:1,retries:0,ci_runs:0,cost_usd:0}}));},1500);`);
    const checkFile=path.join(trust,'independent-check.js'),criticFile=path.join(trust,'independent-critic.js');
    fs.writeFileSync(checkFile,`const fs=require('node:fs'),crypto=require('node:crypto');const v=JSON.parse(fs.readFileSync('code.txt','utf8'));const evidence={path:'code.txt',sha256:crypto.createHash('sha256').update(fs.readFileSync('code.txt')).digest('hex'),kind:'local-check'};console.log(JSON.stringify({passed:v.design==='approved'&&v.data===42&&v.delta==='delivered',evidence:[evidence],preservation:[{id:'preserve',evidence}],citations:[]}));`);
    fs.writeFileSync(criticFile,`const fs=require('node:fs'),{state:s}=JSON.parse(fs.readFileSync(0,'utf8'));const accepted=Object.values(s.nodes).every(n=>n.result.status==='pass');console.log(JSON.stringify({report:{agent:s.plan.critic,join_sha256:s.join_sha256,accepted,rejections:accepted?[]:[{worker:'worker-0',reason:'failed-acceptance'}]},usage:{tool_calls:1,retries:0,ci_runs:0,cost_usd:0}}));`);
    check=pinned(checkFile);critic=pinned(criticFile);
  }
  const spec={version:1,plan_sha256:engine.digest(f.plan),timeout_ms:10000,receipts:path.join(f.plan.repo,'.ecc/goal/processes'),
    workers:{'worker-0':{launch:{...pinned(workerScript),failure_journal:'direct-child-v1'},check}},
    critic:{...critic,failure_journal:'direct-child-v1',budget:{tool_calls:3,retries:0,ci_runs:0,cost_usd:0}},approval_key:pinned(dummy),approval_file:approval,effects:[]};
  const config=path.join(trust,'host-config.json');fs.writeFileSync(config,JSON.stringify(spec));c.create(f.file,f.plan);
  const hostFile=path.resolve(__dirname,'../../scripts/lib/coding-execution-host.js');
  const supervisor=path.join(trust,'supervisor.js');
  fs.writeFileSync(supervisor,`const c=require(${JSON.stringify(path.resolve(__dirname,'../../scripts/lib/coding-execution.js'))}),r=require(${JSON.stringify(path.resolve(__dirname,'../../scripts/lib/coding-execution-runner.js'))});const file=process.argv[2],host=r.pinnedHost(${JSON.stringify(hostFile)},${JSON.stringify(store.sha256File(hostFile))},{stateFile:file,plan:c.load(file).plan});r.run(file,host,{maxIterations:1,maxMilliseconds:20000}).then(v=>console.log(JSON.stringify({pid:process.pid,state:v.state,stopped:v.stopped}))).catch(e=>{console.error(e.message);process.exitCode=2;});`);
  const env={...process.env,ECC_EXECUTION_HOST_CONFIG:config,ECC_EXECUTION_HOST_CONFIG_SHA256:store.sha256File(config)};
  return {...f,spec,hostFile,supervisor,env};
}
async function waitFixture(predicate,timeout=15000) {
  const end=Date.now()+timeout;
  while(Date.now()<end){if(predicate())return;await new Promise(r=>setTimeout(r,30));}
  throw Error('bounded own-fixture checkpoint timed out');
}
function journalHeadroom(t) {
  if(os.freemem()<2.5*1024**3){t.skip('Actual 2 GiB reserve plus bounded supervisor/child headroom unavailable');return false;}
  return true;
}

test('local journal race launches exactly once per token and recovers the winning call', async t => {
  if(!journalHeadroom(t))return;
  const f=journalFixture(t,30000),state=engine.transaction(f.file,s=>c.apply(s,{type:'dispatch',actor:'parent'}));
  const worker=f.plan.workers[0],node=state.nodes[worker.id],input={...worker,assignment:f.assignments[0],
    remaining_budget:{tool_calls:10,retries:2,ci_runs:0,cost_usd:0},goal_sha256:f.plan.goal_sha256,
    token:node.token,revision:f.plan.revision,environment:f.plan.environment};
  const host=concrete.createBoundHost(f.spec,{stateFile:f.file,plan:f.plan}),crypto=require('node:crypto');
  const statuses=await Promise.all([0,1].map(()=>{
    const call_id=crypto.randomUUID(),requestFile=path.join(f.spec.receipts,call_id+'.request.json'),started_at=Date.now();
    fs.writeFileSync(requestFile,JSON.stringify({version:1,call_id,plan:f.plan,plan_sha256:engine.digest(f.plan),
      wrapper_sha256:store.sha256File(f.hostFile),state_file:f.file,entry:f.spec.workers[worker.id].launch,input,
      input_sha256:engine.digest(input),cwd:worker.repo,started_at,deadline:started_at+10000}));
    return new Promise((resolve,reject)=>{const p=spawn(process.execPath,['--max-old-space-size=64',f.hostFile,'--failure-journal-child',requestFile],{stdio:'ignore',windowsHide:true});p.once('error',reject);p.once('close',resolve);});
  }));
  assert.deepEqual(statuses.sort(),[0,2]);
  const events=fs.readFileSync(path.join(worker.repo,'code.txt'),'utf8').split('\n').filter(x=>x.startsWith('{')).map(JSON.parse);
  assert.equal(events.filter(e=>e.event==='start').length,1);
  assert.deepEqual(host.inspectWorker(worker,node),{status:'failed',usage:{tool_calls:1,retries:0,ci_runs:0,cost_usd:0}});
});

test('local child journal survives test-owned supervisor death and charges failed usage once', async t => {
  if(!journalHeadroom(t))return;
  const f=journalFixture(t),worker=f.plan.workers[0],code=path.join(worker.repo,'code.txt');
  const first=spawn(process.execPath,['--max-old-space-size=64',f.supervisor,f.file],{env:f.env,stdio:'ignore',windowsHide:true});
  const closed=new Promise((resolve,reject)=>{first.once('error',reject);first.once('close',resolve);});
  await waitFixture(()=>fs.readFileSync(code,'utf8').includes('"event":"start"'));
  const before=engine.load(f.file),token=before.nodes[worker.id].token;
  first.kill();await closed; // Only the process created by this test is stopped.
  const request=JSON.parse(fs.readFileSync(path.join(f.file+'.runner-lock'),'utf8')).pendingCalls.find(p=>p.method==='launchWorker');
  const receiptFile=path.join(f.spec.receipts,request.callId+'.json');
  await waitFixture(()=>fs.existsSync(receiptFile));const receipt=JSON.parse(fs.readFileSync(receiptFile,'utf8'));
  assert.equal(receipt.direct_child_closed,true);assert.equal(receipt.exit,1);
  await waitFixture(()=>Date.now()>before.nodes[worker.id].lease_until);
  const next=()=>{const r=spawnSync(process.execPath,['--max-old-space-size=64',f.supervisor,f.file],{env:f.env,encoding:'utf8',windowsHide:true,timeout:20000,maxBuffer:1024*1024});assert.equal(r.status,0,r.stderr);return JSON.parse(r.stdout);};
  const second=next();assert.notEqual(second.pid,first.pid);
  assert.equal(second.state.nodes[worker.id].attempts,2);assert.equal(second.state.nodes[worker.id].usage.tool_calls,2);
  assert.equal(second.state.spent_usd,0);assert.deepEqual(second.state.effects,{});
  const events=fs.readFileSync(code,'utf8').split('\n').filter(x=>x.startsWith('{')).map(JSON.parse),starts=events.filter(e=>e.event==='start');
  assert.equal(starts.length,2);assert.ok(starts[1].at>=receipt.closed_at,'replacement must follow verified direct-child closure');
  const third=next();assert.equal(third.state.phase,'budget-exhausted');assert.equal(third.state.nodes[worker.id].usage.tool_calls,2);
  assert.equal(fs.readFileSync(code,'utf8').split('"event":"start"').length-1,2);
  assert.equal(concrete.createBoundHost(f.spec,{stateFile:f.file,plan:f.plan}).inspectWorker(worker,{token}).usage.tool_calls,1);
});

test('recovered results require stopped timely evidence and parent identity, then consume usage once', t => {
  const f=fixture(t,['opencode']),s=c.apply(c.initialize(f.plan),{type:'dispatch',actor:'parent'}),node=s.nodes['worker-0'];
  const result=f.result(s),receipt={closed_at:node.lease_until-1,snapshot_at:node.lease_until},event={type:'recover-result',actor:'parent',result,receipt};
  const now=node.lease_until+1,verified={now,verifyRecoveredResult:()=>true};
  assert.throws(()=>c.apply(s,event,{now}),/trusted stopped-worker/);
  assert.throws(()=>c.apply(s,event,{now,verifyRecoveredResult:()=>Promise.resolve(true)}),/trusted stopped-worker/);
  assert.throws(()=>c.apply(s,{...event,actor:'worker-0'},verified),/parent\/root/);
  assert.throws(()=>c.apply(s,{...event,receipt:{closed_at:node.lease_until+1}},verified),/original lease/);
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-0',result},verified),/stale or duplicate/);
  assert.throws(()=>c.apply(s,event,{...verified,verifyPreservation:()=>false}),/semantic preservation/);
  const recovered=c.apply(s,event,verified);
  assert.equal(recovered.phase,'critic');assert.equal(recovered.dispatches,1);
  assert.equal(recovered.nodes['worker-0'].status,'done');assert.equal(recovered.nodes['worker-0'].usage.tool_calls,1);
  assert.throws(()=>c.apply(recovered,event,verified),/active worker reconciliation|stale or duplicate/);
  const exhausted=c.apply(s,{...event,result:{...result,usage:{...result.usage,tool_calls:11}}},verified);
  assert.equal(exhausted.phase,'budget-exhausted');assert.equal(exhausted.nodes['worker-0'].status,'done');
  assert.equal(exhausted.nodes['worker-0'].usage.tool_calls,11);
  assert.throws(()=>c.apply(exhausted,event,verified),/active worker reconciliation/);
});

test('recovered results still reject expired assignments, ownership and changed source', t => {
  const f=fixture(t,['opencode']),s=c.apply(c.initialize(f.plan),{type:'dispatch',actor:'parent'}),node=s.nodes['worker-0'];
  const event={type:'recover-result',actor:'parent',result:f.result(s),receipt:{closed_at:node.lease_until-1,snapshot_at:node.lease_until}};
  const options={now:node.lease_until+1,verifyRecoveredResult:()=>true};
  assert.throws(()=>c.apply(s,event,{...options,now:Date.parse(f.plan.workers[0].expires_at)+1}),/expired assignment/);
  fs.appendFileSync(path.join(f.plan.workers[0].repo,'code.txt'),'changed');
  assert.throws(()=>c.apply(s,event,options),/unreported worker mutations|stale/);
  coord.execute('close',{cwd:f.plan.workers[0].repo,sessionId:'worker-0'});
  assert.throws(()=>c.apply(s,event,options),/closed/);
});

test('concrete successful recovery rejects missing, changed and unprotected journal bindings', t => {
  if(os.freemem()<1024**3){t.skip('One GiB for bounded metadata/check fixture unavailable');return;}
  const f=journalFixture(t,60000,true),worker=f.plan.workers[0];
  const state=engine.transaction(f.file,s=>c.apply(s,{type:'dispatch',actor:'parent'})),node=state.nodes[worker.id];
  const code=path.join(worker.repo,'code.txt'),originalCode=JSON.stringify({design:'approved',data:42,delta:'delivered',launches:1});
  fs.writeFileSync(code,originalCode);
  const host=concrete.createBoundHost(f.spec,{stateFile:f.file,plan:f.plan}),call_id=require('node:crypto').randomUUID(),started_at=Date.now()-5;
  const input={...worker,assignment:f.assignments[0],remaining_budget:{tool_calls:10,retries:2,ci_runs:0,cost_usd:0},
    token:node.token,revision:f.plan.revision,environment:f.plan.environment,goal_sha256:f.plan.goal_sha256};
  const request={version:1,call_id,plan:f.plan,plan_sha256:engine.digest(f.plan),wrapper_sha256:store.sha256File(f.hostFile),
    state_file:f.file,entry:f.spec.workers[worker.id].launch,input,input_sha256:engine.digest(input),cwd:worker.repo,started_at,deadline:started_at+10000};
  fs.writeFileSync(path.join(f.spec.receipts,call_id+'.request.json'),JSON.stringify(request));
  const request_sha256=engine.digest(request),wrapper_pid=process.pid;
  fs.writeFileSync(path.join(f.spec.receipts,call_id+'.claim'),JSON.stringify({request_sha256,wrapper_pid}));
  const attemptKey=engine.digest({plan_sha256:request.plan_sha256,worker_id:worker.id,token:node.token});
  fs.writeFileSync(path.join(f.plan.repo,'.ecc/goal','journal-attempt-'+attemptKey+'.claim'),JSON.stringify({version:1,
    plan_sha256:request.plan_sha256,worker_id:worker.id,token:node.token,call_id,request_sha256,wrapper_pid}));
  const projection=store.captureRepositoryState(worker.repo,{excludePaths:[path.join(worker.repo,'.ecc/goal')]}),closed_at=Date.now();
  const closure_snapshot={head:projection.head,tree_fingerprint:projection.tree_fingerprint},usage={tool_calls:1,retries:0,ci_runs:0,cost_usd:0};
  const value={agent:worker.agent,runtime:worker.runtime,token:node.token,native_protection:true,usage};
  // Synthetic metadata proves concrete binding denials, not actual child closure.
  const receipt={version:1,request_sha256,call_id,wrapper_pid,adapter_pid:process.pid,phase:'exited',direct_child_closed:true,
    exit:0,signal:null,closed_at,snapshot_at:closed_at,usage,value,value_sha256:engine.digest(value),closure_snapshot,
    closure_snapshot_sha256:engine.digest(closure_snapshot)};
  const file=path.join(f.spec.receipts,call_id+'.json');fs.writeFileSync(file,JSON.stringify(receipt));
  const observed=host.inspectWorker(worker,node);assert.equal(observed.status,'completed');
  const event={worker,node,result:observed.result,receipt:observed.receipt,revision:f.plan.revision,environment:f.plan.environment};
  assert.equal(host.verifyRecoveredResult(event,f.plan),true);
  for(const mutate of [
    r=>{delete r.closure_snapshot;delete r.closure_snapshot_sha256;},
    r=>{r.closure_snapshot=null;r.closure_snapshot_sha256=engine.digest(null);},
    r=>{r.closure_snapshot.tree_fingerprint='f'.repeat(64);r.closure_snapshot_sha256=engine.digest(r.closure_snapshot);},
    r=>{r.usage=null;},
    r=>{r.value.native_protection=false;r.value_sha256=engine.digest(r.value);},
    r=>{r.value.token='f'.repeat(64);r.value_sha256=engine.digest(r.value);},
    r=>{r.closed_at=node.lease_until+1;},
    r=>{r.snapshot_at=node.lease_until+1;},
  ]){
    const changed=structuredClone(receipt);mutate(changed);fs.writeFileSync(file,JSON.stringify(changed));
    assert.equal(host.inspectWorker(worker,node),null);
    assert.equal(host.verifyRecoveredResult(event,f.plan),false);
  }
  fs.writeFileSync(file,JSON.stringify(receipt));
  assert.equal(host.verifyRecoveredResult({...event,receipt:{...event.receipt,journal_sha256:'f'.repeat(64)}},f.plan),false);
  fs.appendFileSync(code,'\nchanged after inspection');assert.equal(host.verifyRecoveredResult(event,f.plan),false);
  fs.writeFileSync(code,originalCode);
  // A mutable private dependency changes the trusted check's output while the
  // source fingerprint stays fixed; transition verification must not reuse cache.
  const checkFile=f.spec.workers[worker.id].check.path,toggle=path.join(worker.repo,'.ecc/goal/check-deny');
  fs.writeFileSync(checkFile,fs.readFileSync(checkFile,'utf8').replace('passed:v.design',"passed:!fs.existsSync('.ecc/goal/check-deny')&&v.design"));
  f.spec.workers[worker.id].check.sha256=store.sha256File(checkFile);
  // Updating the caller's spec does not retroactively authorize changed code
  // in an already-created host. A new reviewed binding is required.
  assert.equal(host.inspectWorker(worker,node),null);
  assert.equal(host.verifyRecoveredResult(event,f.plan),false);
  const freshHost=concrete.createBoundHost(f.spec,{stateFile:f.file,plan:f.plan}),fresh=freshHost.inspectWorker(worker,node);
  assert.equal(fresh.status,'completed');fs.writeFileSync(toggle,'deny');
  assert.equal(freshHost.verifyRecoveredResult({...event,result:fresh.result,receipt:fresh.receipt},f.plan),false);
  fs.unlinkSync(toggle);
  coord.execute('close',{cwd:f.plan.repo,sessionId:f.plan.session});
  assert.equal(freshHost.inspectWorker(worker,node),null);
});

test('critic usage is identity-bound, charged once before decisions and bounded on every counter', t => {
  const f=fixture(t,['local-process-verification']);f.plan.limits.usd=1;
  const s=f.joined(),usage={tool_calls:1,retries:0,ci_runs:0,cost_usd:0.1};
  const receipt={attempt_sha256:c.digest({plan_sha256:c.digest(f.plan),critic:f.plan.critic,join_sha256:s.join_sha256}),
    join_sha256:s.join_sha256,budget:{tool_calls:2,retries:0,ci_runs:0,cost_usd:0.5}};
  const event={type:'critic-usage',actor:f.plan.parent,usage,receipt},options={verifyCriticUsage:()=>true};
  assert.throws(()=>c.apply(s,event),/trusted critic usage/);
  assert.throws(()=>c.apply(s,event,{verifyCriticUsage:()=>Promise.resolve(true)}),/trusted critic usage/);
  assert.throws(()=>c.apply(s,{...event,actor:f.plan.critic},options),/parent/);
  assert.throws(()=>c.apply(s,{...event,receipt:{...receipt,join_sha256:'f'.repeat(64)}},options),/binding/);
  const charged=c.apply(s,event,options);assert.equal(charged.spent_usd,0.1);assert.equal(charged.phase,'critic');
  assert.equal(c.apply(charged,event,options).spent_usd,0.1);
  assert.throws(()=>c.apply(charged,{...event,usage:{...usage,tool_calls:2}},options),/receipt changed/);
  const report={agent:f.plan.critic,join_sha256:s.join_sha256,accepted:true,rejections:[]};
  assert.throws(()=>c.apply(s,{type:'critic',actor:f.plan.critic,report,receipt}),/consumed/);
  const accepted=c.apply(charged,{type:'critic',actor:f.plan.critic,report,receipt});
  assert.equal(accepted.phase,'synthesis');assert.equal(accepted.spent_usd,0.1);
  assert.throws(()=>c.apply(accepted,{type:'critic',actor:f.plan.critic,report,receipt}),/barrier/);
  const rejected=c.apply(charged,{type:'critic',actor:f.plan.critic,receipt,
    report:{...report,accepted:false,rejections:[{worker:'worker-0',reason:'failed-acceptance'}]}});
  assert.equal(rejected.phase,'repair');assert.equal(rejected.spent_usd,0.1);
  for(const [counter,value] of Object.entries({tool_calls:3,retries:1,ci_runs:1,cost_usd:0.6})){
    const exhausted=c.apply(s,{...event,usage:{...usage,[counter]:value}},options);
    assert.equal(exhausted.phase,'budget-exhausted');assert.equal(Object.keys(exhausted.critic_usage).length,1);
    assert.throws(()=>c.apply(exhausted,{type:'dispatch',actor:f.plan.parent}),/planned\/repair/);
  }
  const exhausted=c.apply(s,{...event,usage:{...usage,cost_usd:1.1},receipt:{...receipt,budget:{...receipt.budget,cost_usd:2}}},options);
  assert.equal(exhausted.phase,'budget-exhausted');assert.equal(exhausted.spent_usd,1.1);
});

function criticJournalFixture(t){
  const f=journalFixture(t,60000,true),worker=f.plan.workers[0];
  fs.writeFileSync(path.join(worker.repo,'code.txt'),JSON.stringify({design:'approved',data:42,delta:'delivered',launches:1}));
  f.plan.limits.usd=1;
  const critic=f.spec.critic.path;
  fs.writeFileSync(critic,`const fs=require('node:fs'),{state:s}=JSON.parse(fs.readFileSync(0,'utf8'));fs.appendFileSync('.ecc/goal/critic-launches','start\\n');setTimeout(()=>console.log(JSON.stringify({report:{agent:s.plan.critic,join_sha256:s.join_sha256,accepted:true,rejections:[]},usage:{tool_calls:1,retries:0,ci_runs:0,cost_usd:0.1}})),1500);`);
  f.spec.critic={path:critic,sha256:store.sha256File(critic),failure_journal:'direct-child-v1',budget:{tool_calls:2,retries:0,ci_runs:0,cost_usd:0.5}};
  f.spec.plan_sha256=c.digest(f.plan);
  const state=engine.transaction(f.file,()=>f.joined());
  const config=f.env.ECC_EXECUTION_HOST_CONFIG;fs.writeFileSync(config,JSON.stringify(f.spec));
  f.env.ECC_EXECUTION_HOST_CONFIG_SHA256=store.sha256File(config);
  return {...f,state};
}

test('concrete critic journal reuses metered receipt and denies changed or unknown evidence without launch', async t => {
  if(os.freemem()<1024**3){t.skip('One GiB for bounded metadata fixture unavailable');return;}
  const f=criticJournalFixture(t),state=f.state,host=concrete.createBoundHost(f.spec,{stateFile:f.file,plan:f.plan});
  const call_id=require('node:crypto').randomUUID(),started_at=Date.now()-5;
  const input={state,remaining_budget:f.spec.critic.budget},request={version:1,operation:'critic',call_id,
    plan:f.plan,plan_sha256:c.digest(f.plan),wrapper_sha256:store.sha256File(f.hostFile),state_file:f.file,
    entry:f.spec.critic,input,input_sha256:c.digest(input),cwd:f.plan.repo,started_at,deadline:started_at+10000};
  fs.writeFileSync(path.join(f.spec.receipts,call_id+'.request.json'),JSON.stringify(request));
  const request_sha256=c.digest(request),wrapper_pid=process.pid;
  fs.writeFileSync(path.join(f.spec.receipts,call_id+'.claim'),JSON.stringify({request_sha256,wrapper_pid}));
  const attempt_sha256=c.digest({plan_sha256:request.plan_sha256,critic:f.plan.critic,join_sha256:state.join_sha256});
  fs.writeFileSync(path.join(f.plan.repo,'.ecc/goal','journal-attempt-'+attempt_sha256+'.claim'),JSON.stringify({version:1,
    plan_sha256:request.plan_sha256,critic:f.plan.critic,join_sha256:state.join_sha256,call_id,request_sha256,wrapper_pid}));
  const report={agent:f.plan.critic,join_sha256:state.join_sha256,accepted:true,rejections:[]};
  const usage={tool_calls:1,retries:0,ci_runs:0,cost_usd:0.1},value={report,usage};
  // Synthetic receipt tests bindings only; the process-crash case is separate.
  const receipt={version:1,request_sha256,call_id,wrapper_pid,adapter_pid:process.pid,phase:'exited',direct_child_closed:true,
    exit:0,signal:null,closed_at:Date.now(),usage,value,value_sha256:c.digest(value)};
  const receiptFile=path.join(f.spec.receipts,call_id+'.json');fs.writeFileSync(receiptFile,JSON.stringify(receipt));
  const control={callId:require('node:crypto').randomUUID()},observed=await host.review(state,control);
  assert.deepEqual(observed.report,report);assert.equal(host.verifyCriticUsage(observed,f.plan),true);
  const charged=engine.transaction(f.file,s=>c.apply(s,{type:'critic-usage',actor:f.plan.parent,...observed},{verifyCriticUsage:host.verifyCriticUsage}));
  assert.equal(charged.spent_usd,0.1);
  const resumed=await host.review(charged,control);assert.deepEqual(resumed,observed);
  assert.equal(c.apply(charged,{type:'critic-usage',actor:f.plan.parent,...resumed},{verifyCriticUsage:host.verifyCriticUsage}).spent_usd,0.1);
  assert.equal(host.verifyCritic({actor:f.plan.critic,...resumed},f.plan),true);
  for(const mutate of [r=>{r.usage=null;},r=>{r.request_sha256='f'.repeat(64);},r=>{r.direct_child_closed=false;}]){
    const changed=structuredClone(receipt);mutate(changed);fs.writeFileSync(receiptFile,JSON.stringify(changed));
    const held=await host.review(charged,control);assert.equal(held.usage,null);
    assert.equal(host.verifyCriticUsage(observed,f.plan),false);
  }
  fs.writeFileSync(receiptFile,JSON.stringify({...receipt,exit:1}));
  const failed=await host.review(charged,control);assert.equal(failed.report,null);assert.deepEqual(failed.usage,usage);
  fs.writeFileSync(receiptFile,JSON.stringify(receipt));
  assert.equal(host.verifyCriticUsage({...observed,receipt:{...observed.receipt,journal_sha256:'f'.repeat(64)}},f.plan),false);
  fs.appendFileSync(path.join(f.plan.workers[0].repo,'code.txt'),'changed');
  assert.equal(host.verifyCriticUsage(observed,f.plan),true); // Spend must remain reconciled despite stale acceptance.
  assert.throws(()=>c.apply(charged,{type:'critic',actor:f.plan.critic,...observed},{verifyCritic:host.verifyCritic}),/stale/);
  assert.equal(fs.existsSync(path.join(f.plan.repo,'.ecc/goal/critic-launches')),false);
});

test('critic prelaunch budget denial releases supervision without implying missing receipts stopped', async t => {
  const f=criticJournalFixture(t);f.spec.critic.budget.tool_calls=0;
  const host=concrete.createBoundHost(f.spec,{stateFile:f.file,plan:f.plan});
  for(let i=0;i<2;i++){
    const result=await operational.run(f.file,host);
    assert.equal(result.stopped,'critic-admission-blocked');assert.equal(result.state.spent_usd,0);
    assert.equal(fs.existsSync(f.file+'.runner-lock'),false);
    assert.equal(fs.existsSync(path.join(f.plan.repo,'.ecc/goal/critic-launches')),false);
  }
  assert.equal(host.confirmStopped({callId:require('node:crypto').randomUUID()}),false);
});

test('production factory rejects legacy unmetered configuration before creating receipts or launching', t => {
  const f=journalFixture(t),file=f.env.ECC_EXECUTION_HOST_CONFIG;
  const before={config:process.env.ECC_EXECUTION_HOST_CONFIG,hash:process.env.ECC_EXECUTION_HOST_CONFIG_SHA256};
  const write=spec=>{fs.writeFileSync(file,JSON.stringify(spec));process.env.ECC_EXECUTION_HOST_CONFIG=file;
    process.env.ECC_EXECUTION_HOST_CONFIG_SHA256=store.sha256File(file);};
  t.after(()=>{for(const [key,value] of [['ECC_EXECUTION_HOST_CONFIG',before.config],['ECC_EXECUTION_HOST_CONFIG_SHA256',before.hash]]){
    if(value===undefined)delete process.env[key];else process.env[key]=value;}});
  for(const [change,pattern] of [
    [s=>{delete s.critic.failure_journal;},/production critic/],
    [s=>{delete s.critic.budget;},/usage/],
    [s=>{s.critic.budget.tool_calls=0;},/positive tool-call/],
    [s=>{delete s.workers['worker-0'].launch.failure_journal;},/production workers/],
    [s=>{s.workers.extra=s.workers['worker-0'];},/exact plan/],
  ]){
    const spec=structuredClone(f.spec);change(spec);write(spec);
    assert.throws(()=>concrete.createHost({stateFile:f.file,plan:f.plan}),pattern);
    assert.equal(fs.existsSync(spec.receipts),false);
  }
  write(f.spec);const host=concrete.createHost({stateFile:f.file,plan:f.plan});
  assert.equal(typeof host.verifyCriticUsage,'function');assert.equal(typeof host.verifyRecoveredResult,'function');
  assert.equal(fs.readdirSync(f.spec.receipts).length,0);
});

test('controller adoption and later evidence recheck enforce the pinned synthetic artifact policy',t=>{
  const f=fixture(t,['opencode']),w=f.plan.workers[0];
  const input='tests/fixtures/synthetic.json',output='artifacts/agent-runs/proof/result.json';
  fs.mkdirSync(path.dirname(path.join(w.repo,input)),{recursive:true});fs.writeFileSync(path.join(w.repo,input),'{}');
  fs.mkdirSync(path.dirname(path.join(w.repo,output)),{recursive:true});
  w.scopes.push('artifacts/agent-runs/proof');
  coord.execute('close',{cwd:w.repo,sessionId:w.session});
  coord.execute('register',{cwd:w.repo,sessionId:w.session+'-proof',scopes:w.scopes,
    objective:'Synthetic output contract fixture',doneWhen:'receipt checked',ttl:30});
  w.session+='-proof';
  w.data_policy={mode:'synthetic-only',fixture:{path:input,sha256:store.sha256File(path.join(w.repo,input))},
    outputs:[{path:output,checks:['roundtrip']}]};
  f.writeAssignments();
  const receipt={schema:'ecc.synthetic-verification.v1',fixture_sha256:w.data_policy.fixture.sha256,
    checks:[{id:'roundtrip',passed:true,count:1}]};
  fs.writeFileSync(path.join(w.repo,output),store.canonicalJson(receipt));
  let state=c.apply(c.initialize(f.plan),{type:'dispatch',actor:'parent'});
  const result=f.result(state),ref={path:output,kind:'local-check',sha256:store.sha256File(path.join(w.repo,output))};
  result.changed_paths=coord.execute('check-changes',{cwd:w.repo,sessionId:w.session}).paths;
  result.evidence=[ref];result.preservation.checks[0].evidence=ref;
  state=c.apply(state,{type:'result',actor:w.agent,result});assert.equal(state.phase,'critic');
  fs.writeFileSync(path.join(w.repo,output),store.canonicalJson({...receipt,payload:'SYNTHETIC_PRIVATE_CANARY'}));
  const current=store.captureRepositoryState(w.repo,{excludePaths:[path.join(w.repo,'.ecc/goal')]});
  state.nodes[w.id].result.head=current.head;state.nodes[w.id].result.tree_fingerprint=current.tree_fingerprint;
  const changed=store.sha256File(path.join(w.repo,output));state.nodes[w.id].result.evidence[0].sha256=changed;
  state.nodes[w.id].result.preservation.checks[0].evidence.sha256=changed;
  assert.throws(()=>engine.currentEvidence(state),error=>error.message==='synthetic output policy rejected artifact');
});

test('concrete host rejects malformed stdout and raw usage without retaining private canaries',async t=>{
  for(const malformed of [true,false]){
    const f=fixture(t,['opencode']),trust=path.join(f.plan.repo,'.ecc/goal/private-output-test');
    fs.mkdirSync(trust);
    const entry=(name,text)=>{const file=path.join(trust,name+'.js');fs.writeFileSync(file,text);
      return {path:file,sha256:store.sha256File(file)};};
    const canary='SYNTHETIC_PRIVATE_CANARY';
    const readInput="require('node:fs').readFileSync(0,'utf8');";
    const launch=entry('launch',readInput+(malformed?`process.stdout.write('not-json-${canary}');`
      :`console.log(JSON.stringify({usage:{property_analysis:'${canary}'}}));`));
    const inert=entry('inert',"console.log('{}');");
    const spec={version:1,plan_sha256:c.digest(f.plan),timeout_ms:1000,
      workers:{'worker-0':{launch,check:inert}},critic:inert,approval_key:inert,
      approval_file:inert.path,receipts:path.join(trust,'receipts'),effects:[]};
    const host=concrete.createBoundHost(spec,{stateFile:f.file,plan:f.plan});
    await assert.rejects(()=>host.launchWorker(f.plan.workers[0],{callId:require('node:crypto').randomUUID()}),
      error=>!error.message.includes(canary)&&/usage reconciliation/.test(error.message));
    for(const name of fs.readdirSync(spec.receipts)){
      const raw=fs.readFileSync(path.join(spec.receipts,name),'utf8');
      assert.ok(!raw.includes(canary));assert.equal(JSON.parse(raw).usage,null);
    }
  }
});

test('concrete parent queue binds sources, owner, exact response and verified closure', t => {
  if(os.freemem()<1024**3){t.skip('One GiB for bounded metadata fixture unavailable');return;}
  const f=journalFixture(t),directory=path.join(f.plan.repo,'.ecc/goal/queue');fs.mkdirSync(directory);
  const queueFile=path.join(directory,'workspace.json'),trust=path.dirname(f.spec.critic.path),root=path.resolve(__dirname,'../..');
  const checker=path.join(trust,'queue-check.js');
  // Deterministic verifier fixture only: no provider, service or native-model claim.
  fs.writeFileSync(checker,`const fs=require('node:fs'),r=JSON.parse(fs.readFileSync(0,'utf8'));console.log(JSON.stringify({version:1,nonce:fs.existsSync('.ecc/goal/wrong-queue-nonce')?'wrong':r.nonce,plan_sha256:r.plan_sha256,operation:r.operation,id:r.entry.id,owner:r.entry.owner,resource:r.resource,token:r.token,allowed:true,stopped:fs.existsSync('.ecc/goal/closure-verified')}));`);
  const required=['scripts/lib/coding-execution-host.js','scripts/lib/coding-execution.js','scripts/lib/coding-execution-runner.js',
    'scripts/lib/session-coordination.js','scripts/lib/goal-store.js','scripts/lib/goal-control.js','scripts/lib/atomic-write.js',
    'scripts/lib/workspace-queue.js','scripts/lib/workspace-queue-store.js','scripts/lib/workspace-live-facts.js','schemas/coding-execution.schema.json',
    'schemas/goal-control.schema.json','manifests/goal-proof-profiles.json'];
  const entry={path:checker,sha256:store.sha256File(checker)};
  f.spec.queue={file:queueFile,timeout_ms:1000,gate:entry,cessation:entry,
    source_pins:Object.fromEntries(required.map(file=>[file,store.sha256File(path.join(root,file))]))};
  const context={stateFile:f.file,plan:f.plan,queueFile};
  const host=concrete.createBoundHost(f.spec,context),queue=operational.bindQueue;
  assert.throws(()=>queue(host,context),/pinned parent/);
  assert.throws(()=>host.createQueueCapabilities({...context,queueFile:queueFile+'.other'}),/exact queue/);
  // Keep private host bookkeeping inside this test's disposable repository.
  // Production resolves the installed ECC's Git-common directory, not plan.repo.
  const originalRepository=coord.repository;
  let capabilities;
  try{
    coord.repository=cwd=>originalRepository(cwd===root?f.plan.repo:cwd);
    capabilities=host.createQueueCapabilities(context);
  }finally{coord.repository=originalRepository;}
  assert.equal(typeof capabilities.machine.run,'function');
  const create=require('../../scripts/lib/workspace-queue-store').createQueueStore;
  const bound=create({...capabilities,file:queueFile});
  const now=Date.now(),request={id:'writer-one',owner:f.plan.session,goalId:f.goalDocument.goal_id,kind:'writer',resource:f.plan.repo,
    state:'waiting',reason:'scoped local controller check',enqueuedAt:new Date(now).toISOString(),nextCheckpointAt:new Date(now+60000).toISOString(),
    independentAction:'source review',dependsOn:[]};
  bound.enqueue([request]);const claim=bound.acquire({id:request.id,owner:request.owner,leaseMilliseconds:60000});
  assert.equal(claim.acquired,true);assert.equal(claim.authorizationGranted,false);
  const before=fs.readFileSync(queueFile,'utf8');
  assert.throws(()=>bound.release({...claim,outcome:'completed'}),/cessation unverified/);
  assert.equal(fs.readFileSync(queueFile,'utf8'),before);
  fs.writeFileSync(path.join(f.plan.repo,'.ecc/goal/closure-verified'),'own fixture closure');
  assert.equal(bound.release({...claim,outcome:'completed'}).released,true);
  const telemetry=capabilities.readTelemetry();assert.equal(telemetry.reserveRamGiB,2);
  assert.ok(Number.isFinite(telemetry.freeRamGiB)&&telemetry.freeRamGiB>=0);
  assert.equal(telemetry.recentSamples.length,5);
  assert.ok(Date.parse(telemetry.observedAt)-Date.parse(telemetry.recentSamples[0].observedAt)>=1000);
  const oversized={...request,id:'oversized-heavy',kind:'heavy-check',resource:'local-machine',peakRamGiB:os.totalmem()/1024**3+1};
  bound.enqueue([oversized]);
  const held=bound.acquire({id:oversized.id,owner:oversized.owner,leaseMilliseconds:1000});
  assert.equal(held.acquired,false);assert.equal(held.decision.state,'waiting-resource');
  const nonceFile=path.join(f.plan.repo,'.ecc/goal/wrong-queue-nonce');fs.writeFileSync(nonceFile,'wrong');
  assert.equal(capabilities.checkGate({...request,operation:'acquire'}),null);fs.unlinkSync(nonceFile);
  assert.throws(()=>capabilities.assertWrite([path.join(directory,'foreign.json')]),/outside queue/);
  const worker=f.plan.workers[0],workerEntry={...request,id:'worker-two',owner:worker.session,resource:worker.repo,operation:'acquire'};
  assert.equal(capabilities.checkGate(workerEntry).allowed,true);
  const originalNow=Date.now;
  try{
    Date.now=()=>now+3600000+30000;
    assert.equal(capabilities.checkGate(workerEntry),null);
    assert.equal(capabilities.checkGate({...workerEntry,operation:'release'}).allowed,true);
  }finally{Date.now=originalNow;}
  const goalBytes=fs.readFileSync(f.plan.goal_file),queueBytes=fs.readFileSync(queueFile,'utf8');
  assert.throws(()=>capabilities.atomicWrite(queueFile,queueBytes,{beforeRename(){
    const changed=JSON.parse(goalBytes);changed.objective='owner corrected goal';fs.writeFileSync(f.plan.goal_file,JSON.stringify(changed));
  }}),/goal changed/);
  assert.equal(fs.readFileSync(queueFile,'utf8'),queueBytes);fs.writeFileSync(f.plan.goal_file,goalBytes);
  const deadlineNow=Date.now;
  try{
    const publicationDeadline=deadlineNow()+1000;
    assert.throws(()=>capabilities.atomicWrite(queueFile,queueBytes,{publicationDeadline,
      beforeRename(){Date.now=()=>publicationDeadline+1;}}),/queue lease expired before publication/);
    assert.equal(fs.readFileSync(queueFile,'utf8'),queueBytes);
  }finally{Date.now=deadlineNow;}
  fs.appendFileSync(checker,'\n// changed after binding');
  assert.equal(capabilities.checkGate({...request,operation:'acquire'}),null);
  assert.equal(capabilities.confirmStopped({...request,token:claim.token}),false);
  assert.throws(()=>capabilities.readTelemetry(),/source changed/);
});

test('local critic child survives supervisor death with one review, charge and decision', async t => {
  if(!journalHeadroom(t))return;
  const f=criticJournalFixture(t),log=path.join(f.plan.repo,'.ecc/goal/critic-launches');
  const first=spawn(process.execPath,['--max-old-space-size=64',f.supervisor,f.file],{env:f.env,stdio:'ignore',windowsHide:true});
  const closed=new Promise((resolve,reject)=>{first.once('error',reject);first.once('close',resolve);});
  await waitFixture(()=>fs.existsSync(log));first.kill();await closed;
  await waitFixture(()=>fs.readdirSync(f.spec.receipts).some(name=>/^[a-f0-9-]{36}\.json$/.test(name)));
  const resumed=spawnSync(process.execPath,['--max-old-space-size=64',f.supervisor,f.file],{env:f.env,encoding:'utf8',windowsHide:true,timeout:30000,maxBuffer:1024*1024});
  assert.equal(resumed.status,0,resumed.stderr);const result=JSON.parse(resumed.stdout);
  assert.equal(result.state.phase,'synthesis');assert.equal(result.state.spent_usd,0.1);
  assert.equal(Object.keys(result.state.critic_usage).length,1);
  assert.equal(fs.readFileSync(log,'utf8'),'start\n');assert.deepEqual(result.state.effects,{});
  assert.equal(result.state.audit.filter(e=>e.type==='critic').length,1);
});

test('local successful child is adopted after supervisor death without relaunch or effects', async t => {
  if(!journalHeadroom(t))return;
  const f=journalFixture(t,8000,true),worker=f.plan.workers[0],code=path.join(worker.repo,'code.txt');
  const first=spawn(process.execPath,['--max-old-space-size=64',f.supervisor,f.file],{env:f.env,stdio:'ignore',windowsHide:true});
  const closed=new Promise((resolve,reject)=>{first.once('error',reject);first.once('close',resolve);});
  await waitFixture(()=>fs.readFileSync(code,'utf8').includes('"event":"start"'));
  const before=engine.load(f.file),node=before.nodes[worker.id];first.kill();await closed;
  const pending=JSON.parse(fs.readFileSync(f.file+'.runner-lock','utf8')).pendingCalls.find(p=>p.method==='launchWorker');
  const receiptFile=path.join(f.spec.receipts,pending.callId+'.json');await waitFixture(()=>fs.existsSync(receiptFile));
  const receipt=JSON.parse(fs.readFileSync(receiptFile,'utf8'));assert.equal(receipt.exit,0);
  assert.ok(receipt.closed_at<=node.lease_until);assert.ok(receipt.closure_snapshot);
  await waitFixture(()=>Date.now()>node.lease_until);
  const host=concrete.createBoundHost(f.spec,{stateFile:f.file,plan:f.plan});
  const observed=host.inspectWorker(worker,node);assert.equal(observed.status,'completed');
  const next=()=>{const r=spawnSync(process.execPath,['--max-old-space-size=64',f.supervisor,f.file],{env:f.env,encoding:'utf8',windowsHide:true,timeout:20000,maxBuffer:1024*1024});assert.equal(r.status,0,r.stderr);return JSON.parse(r.stdout);};
  const second=next();assert.notEqual(second.pid,first.pid);
  assert.equal(second.state.dispatches,1);assert.equal(second.state.nodes[worker.id].attempts,1);
  assert.equal(second.state.nodes[worker.id].usage.tool_calls,1);assert.equal(second.state.repairs,0);
  assert.equal(second.state.phase,'synthesis');assert.equal(second.state.critique.accepted,true);
  next();const fourth=next();assert.equal(fourth.stopped,'locally-verified-no-effects');
  assert.equal(fourth.state.phase,'approval');assert.deepEqual(fourth.state.effects,{});
  assert.equal(JSON.parse(fs.readFileSync(code,'utf8')).launches,1);
});

test('same contract supports parallel Codex/Claude/Gemini/OpenCode workers and a durable join', async t => {
  const f=fixture(t,['codex','claude','gemini','opencode']); c.create(f.file,f.plan); let active=0, peak=0;
  const state=await c.dispatchParallel(f.file,async w=>{
    active++; peak=Math.max(peak,active); await new Promise(resolve=>setTimeout(resolve,25));
    const result=f.result(c.load(f.file),w.id); active--; return result;
  });
  assert.equal(peak,4); assert.equal(state.phase,'critic'); assert.equal(state.dispatches,4);
  assert.equal(Object.values(state.nodes).filter(n=>n.status==='done').length,4);
});
test('critic cannot pass the join barrier or review its own work', t => {
  const f=fixture(t); let s=c.initialize(f.plan);
  assert.throws(()=>c.apply(s,{type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:'a'.repeat(64),accepted:true,rejections:[]}}),/join barrier/);
  s=f.joined(); assert.throws(()=>c.apply(s,{type:'critic',actor:'worker-0',report:{agent:'worker-0',join_sha256:s.join_sha256,accepted:true,rejections:[]}}),/independent critic/);
  assert.throws(()=>c.apply(s,{type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:s.join_sha256,accepted:false,rejections:[{worker:'constructor',reason:'missing-required-output'}]}}),/unknown rejected worker/);
  assert.throws(()=>c.initialize({...f.plan,critic:'worker-0'}),/independent/);
});
test('rejection repairs only affected worker, retains others, and requires another critic cycle', t => {
  const f=fixture(t); let s=f.joined(), previous=s.nodes['worker-1'].result;
  s=c.apply(s,{type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:s.join_sha256,accepted:false,rejections:[{worker:'worker-0',reason:'missing-required-output'}]}});
  assert.equal(s.phase,'repair'); assert.equal(s.repairs,1); assert.deepEqual(s.nodes['worker-1'].result,previous);
  s=c.apply(s,{type:'dispatch',actor:'parent'}); assert.equal(s.dispatches,3);
  s=c.apply(s,{type:'result',actor:'worker-0',result:f.result(s)}); assert.equal(s.phase,'critic');
  assert.throws(()=>c.apply(s,{type:'synthesis',actor:'parent',output:{version:1,join_sha256:s.join_sha256,claim:'locally-verified',outputs:f.plan.workers.map(w=>w.id)}}),/accepted critic/);
});
test('stale owner correction, evidence and runtime results fail closed', t => {
  const f=fixture(t); let s=f.joined(); fs.writeFileSync(path.join(f.plan.workers[0].repo,'code.txt'),'regression\n');
  assert.throws(()=>c.apply(s,{type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:s.join_sha256,accepted:true,rejections:[]}}),/stale worker repository/);
  fs.writeFileSync(f.plan.goal_file,'corrected owner priority'); assert.throws(()=>c.apply(s,{type:'recover',actor:'parent'}),/owner goal changed/);
});
test('expired ownership, unauthorized mutations and exhausted dispatch budget are rejected', t => {
  const f=fixture(t,['codex','claude','gemini']); let s=c.apply(c.initialize(f.plan),{type:'dispatch',actor:'parent'});
  coord.execute('close',{cwd:f.plan.workers[0].repo,sessionId:'worker-0'});
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-0',result:f.result(s)}),/closed|expired/);
  fs.writeFileSync(path.join(f.plan.workers[1].repo,'outside.txt'),'bad');
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-1',result:f.result(s,'worker-1')}),/unauthorized mutation/);
  const plan={...f.plan,workers:f.plan.workers.slice(1),limits:{...f.plan.limits,dispatches:1}};
  assert.equal(c.apply(c.initialize(plan),{type:'dispatch',actor:'parent'}).phase,'budget-exhausted');
});
test('typed results do not permit false product-complete synthesis or self approval', t => {
  const f=fixture(t); const s=f.approvedCritic();
  assert.throws(()=>c.apply(s,{type:'synthesis',actor:'parent',output:{version:1,join_sha256:s.join_sha256,claim:'functional-MVP',outputs:f.plan.workers.map(w=>w.id)}}),/synthesis:/);
  let p=c.apply(f.synthesized(),{type:'propose-effect',actor:'parent',effect:f.effect});
  assert.throws(()=>c.apply(p,{type:'approve-effect',actor:'parent',id:'publish',binding:p.effects.publish.binding,receipt:'I approve myself',expires_at:new Date(Date.now()+60000).toISOString()}),/external owner approval/);
});
test('exact approval binding, restart reconciliation and no completed side-effect replay', t => {
  const f=fixture(t); let s=c.apply(f.synthesized(),{type:'propose-effect',actor:'parent',effect:f.effect});
  const approval={type:'approve-effect',actor:'parent',id:'publish',binding:s.effects.publish.binding,receipt:'external owner receipt',expires_at:new Date(Date.now()+60000).toISOString()};
  assert.throws(()=>c.apply(s,{...approval,binding:'b'.repeat(64)},{authorizeApproval:()=>true}),/exact side effect/);
  s=c.apply(s,approval,{authorizeApproval:e=>e.receipt==='external owner receipt'});
  s=c.apply(s,{type:'begin-effect',actor:'parent',id:'publish',binding:s.effects.publish.binding});
  s=c.apply(s,{type:'recover',actor:'parent'}); assert.equal(s.phase,'reconciliation');
  assert.throws(()=>c.apply(s,{type:'begin-effect',actor:'parent',id:'publish',binding:s.effects.publish.binding}),/already started/);
  assert.throws(()=>c.apply(s,{type:'reconcile-effect',actor:'parent',id:'publish',receipt:'unknown'}),/do not replay/);
  s=c.apply(s,{type:'reconcile-effect',actor:'parent',id:'publish',receipt:'verified external transaction'},{verifyEffect:()=>true});
  assert.equal(s.phase,'completed'); assert.throws(()=>c.apply(s,{type:'propose-effect',actor:'parent',effect:f.effect}),/typed synthesis/);
});
test('Second Brain citations require current engineering scope/version/policy authorizer', t => {
  const f=fixture(t,['claude']); let s=c.apply(c.initialize(f.plan),{type:'dispatch',actor:'parent'}), r=f.result(s);
  r.citations=[{source_id:'repo:backend:code.txt',version:'commit:blob',citation:'repo://backend/code.txt',source_revision:'a'.repeat(40),line_start:1,line_end:1,chunk_id:'b'.repeat(64),policy_epoch:1,scope:'engineering:seabridge-code'}];
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-0',result:r}),/current scoped memory authorizer/);
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-0',result:{...r,citations:[{...r.citations[0],scope:'company:private'}]}},{authorizeCitation:()=>true}),/result:/);
  s=c.apply(s,{type:'result',actor:'worker-0',result:r},{authorizeCitation:ref=>ref.policy_epoch===1});
  assert.throws(()=>c.apply(s,{type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:s.join_sha256,accepted:true,rejections:[]}},{authorizeCitation:()=>false}),/current scoped memory/);
});
test('actual CLI resumes interrupted nodes from a new process and rejects early synthesis', t => {
  const f=fixture(t,['gemini']), cli=path.resolve(__dirname,'../../scripts/coding-execution.js');
  function run(command, document, succeeds=true) {
    const input=path.join(f.plan.repo,'.ecc/goal/input.json'); if(document) fs.writeFileSync(input,JSON.stringify(document));
    const r=spawnSync(process.execPath,[cli,command,f.file,...(document?[input]:[])],{encoding:'utf8',windowsHide:true});
    assert.equal(r.status,succeeds?0:2,r.stderr); return succeeds?JSON.parse(r.stdout):r.stderr;
  }
  const plan={...f.plan,limits:{...f.plan.limits,lease_ms:1}};
  run('create',plan); const first=run('event',{type:'dispatch',actor:'parent'});
  run('event',{type:'recover',actor:'parent'}); assert.equal(run('status').phase,'repair');
  run('event',{type:'dispatch',actor:'parent'}); const resumed=run('status');
  assert.notEqual(first.nodes['worker-0'].token,resumed.nodes['worker-0'].token); assert.equal(resumed.nodes['worker-0'].attempts,2);
  assert.match(run('event',{type:'synthesis',actor:'parent',output:{}},false),/accepted critic/);
});
test('outside and unowned checkpoint creation causes no ancillary writes', t => {
  const f=fixture(t,['opencode']); const outside=path.join(path.dirname(f.plan.repo),'not-owned','state.json');
  assert.throws(()=>c.create(outside,f.plan),/scope|traversal/); assert.equal(fs.existsSync(path.dirname(outside)),false);
  const unowned=path.join(f.plan.repo,'.ecc/not-owned/state.json');
  assert.throws(()=>c.create(unowned,f.plan),/outside owned/); assert.equal(fs.existsSync(path.dirname(unowned)),false);
});
test('partial recovery does not dispatch a healthy running worker twice', async t => {
  const f=fixture(t,['claude','gemini']); c.create(f.file,f.plan);
  c.transaction(f.file,s=>c.apply(s,{type:'dispatch',actor:'parent'}));
  const previous=c.load(f.file), later=previous.nodes['worker-0'].lease_until+1;
  c.transaction(f.file,s=>{ s.nodes['worker-1'].lease_until=later+60000; return c.apply(s,{type:'recover',actor:'parent'},{now:later}); });
  const launched=[];
  const next=await c.dispatchParallel(f.file,async w=>{ launched.push(w.id); return f.result(c.load(f.file),w.id); },{now:later});
  assert.deepEqual(launched,['worker-0']); assert.equal(next.nodes['worker-1'].token,previous.nodes['worker-1'].token);
});
test('reconciliation preserves the multiple-effect barrier and exact operations cannot duplicate', t => {
  const f=fixture(t,['codex']); let s=c.apply(f.synthesized(),{type:'propose-effect',actor:'parent',effect:f.effect});
  assert.throws(()=>c.apply(s,{type:'propose-effect',actor:'parent',effect:{...f.effect,id:'alias'}}),/duplicate exact/);
  s=c.apply(s,{type:'propose-effect',actor:'parent',effect:{...f.effect,id:'second',target:'a different approved target'}});
  s=c.apply(s,{type:'approve-effect',actor:'parent',id:'publish',binding:s.effects.publish.binding,receipt:'owner',expires_at:new Date(Date.now()+60000).toISOString()},{authorizeApproval:()=>true});
  s=c.apply(s,{type:'begin-effect',actor:'parent',id:'publish',binding:s.effects.publish.binding}); s=c.apply(s,{type:'recover',actor:'parent'});
  s=c.apply(s,{type:'reconcile-effect',actor:'parent',id:'publish',receipt:'verified'},{verifyEffect:()=>true});
  assert.equal(s.phase,'approval'); assert.equal(s.effects.second.status,'pending');
});
test('committed mutations cannot be omitted and exhausted budgets cannot recover into launches', t => {
  const f=fixture(t,['claude']); let s=c.apply(c.initialize(f.plan),{type:'dispatch',actor:'parent'}), worker=f.plan.workers[0];
  fs.writeFileSync(path.join(worker.repo,'code.txt'),'owned committed change');
  execFileSync('git',['add','code.txt'],{cwd:worker.repo}); execFileSync('git',['-c','core.hooksPath=','commit','-qm','owned synthetic change'],{cwd:worker.repo});
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-0',result:f.result(s)}),/unreported worker mutations/);
  s=c.apply(s,{type:'result',actor:'worker-0',result:{...f.result(s),changed_paths:['code.txt'],usd:1,usage:{tool_calls:1,retries:0,ci_runs:0,cost_usd:1}}});
  assert.equal(s.phase,'budget-exhausted'); s=c.apply(s,{type:'recover',actor:'parent'}); assert.equal(s.phase,'budget-exhausted');
  assert.throws(()=>c.apply(s,{type:'dispatch',actor:'parent'}),/dispatch requires/);
});
test('actual process death leaves recoverable own lock; live locks are never stolen', t => {
  const f=fixture(t,['opencode']); c.create(f.file,f.plan);
  const library=path.resolve(__dirname,'../../scripts/lib/coding-execution.js');
  const child=spawnSync(process.execPath,['-e',`require(${JSON.stringify(library)}).transaction(${JSON.stringify(f.file)},()=>process.exit(9))`],{encoding:'utf8',windowsHide:true});
  assert.equal(child.status,9,child.stderr); assert.equal(fs.existsSync(`${f.file}.lock`),true);
  assert.equal(c.recoverLock(f.file).recovered,true); assert.equal(c.load(f.file).phase,'planned');
  c.transaction(f.file,s=>{ assert.throws(()=>c.recoverLock(f.file),/still alive/); return s; });
});
test('worker errors become bounded retry state immediately without relaunching healthy workers', async t => {
  const f=fixture(t,['claude','gemini']); c.create(f.file,f.plan);
  const state=await c.dispatchParallel(f.file,async w=>{ if(w.id==='worker-0') throw Object.assign(new Error('fixture worker error'),{usage:{tool_calls:1,retries:1,ci_runs:0,cost_usd:0}}); return f.result(c.load(f.file),w.id); });
  assert.equal(state.phase,'repair'); assert.equal(state.nodes['worker-0'].status,'pending'); assert.equal(state.nodes['worker-1'].status,'done');
  assert.equal(state.history[0].error,'worker-launch-or-execution-failed');
});
test('Windows mixed-case declared scopes accept legitimate mutations', {skip:process.platform!=='win32'}, t => {
  const f=fixture(t,['opencode']); f.plan.workers[0].scopes=['Code.txt'];
  let s=c.apply(c.initialize(f.plan),{type:'dispatch',actor:'parent'});
  fs.writeFileSync(path.join(f.plan.workers[0].repo,'code.txt'),'legitimate mutation');
  s=c.apply(s,{type:'result',actor:'worker-0',result:f.result(s)}); assert.equal(s.phase,'critic');
});
test('unverified independent identity fails closed and the existing ECC command exposes the portable CLI', t => {
  const f=fixture(t,['claude']), s=f.joined();
  assert.throws(()=>engine.apply(s,{type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:s.join_sha256,accepted:true,rejections:[]}}),/trusted independent critic identity verifier/);
  const r=spawnSync(process.execPath,[path.resolve(__dirname,'../../scripts/ecc.js'),'coding-execution','--help'],{encoding:'utf8',windowsHide:true});
  assert.equal(r.status,0,r.stderr); assert.match(r.stdout,/recover-lock/);
});
test('in-scope side tasks, optional prerequisites and legacy unbound plans cannot dispatch', t => {
  const f=fixture(t,['codex','claude','gemini','opencode']);
  const original=f.plan.workers[0].requirement;
  f.plan.workers[0].requirement='unrequested refactor inside code.txt';
  assert.throws(()=>c.initialize(f.plan),/task differs from approved goal assignment/);
  f.plan.workers[0].requirement=original;
  assert.throws(()=>c.initialize({...f.plan,version:1}),/plan:/);
  f.goalDocument.user_visible_proofs[0].required=false;
  fs.writeFileSync(f.plan.goal_file,JSON.stringify(f.goalDocument));f.plan.goal_sha256=store.sha256File(f.plan.goal_file);
  assert.throws(()=>c.initialize(f.plan),/active required outcome/);
  f.goalDocument.user_visible_proofs[0].required=true;f.goalDocument.lanes[0].status='deferred';
  fs.writeFileSync(f.plan.goal_file,JSON.stringify(f.goalDocument));f.plan.goal_sha256=store.sha256File(f.plan.goal_file);
  assert.throws(()=>c.initialize(f.plan),/active required outcome/);
});
test('owner corrections require reissued assignments even when a planner refreshes the goal hash', t => {
  const f=fixture(t,['gemini']);const recorded=new Date().toISOString();
  f.goalDocument.owner_corrections=[{id:'correction',recorded_at:recorded,instruction:'deliver required output first',replaces:[],
    priority:'corrected priority',checkpoint_proof_id:'required-output',next_action:'repair observed defect',source_harness:'owner'}];
  f.goalDocument.current_priority='corrected priority';f.goalDocument.forecast.checkpoint_proof_id='required-output';
  fs.writeFileSync(f.plan.goal_file,JSON.stringify(f.goalDocument));f.plan.goal_sha256=store.sha256File(f.plan.goal_file);
  assert.throws(()=>c.initialize(f.plan),/predates current owner correction/);
  f.assignments[0].issued_at=recorded;f.writeAssignments();
  assert.equal(c.initialize(f.plan).phase,'planned');
  f.assignments[0].acceptance_ids=['unrequested-private-documents'];f.writeAssignments();
  assert.throws(()=>c.initialize(f.plan),/missing proofs/);
});
test('assignment usage accumulates across critic repairs and stops repeated checks without another launch', t => {
  const f=fixture(t,['opencode']);f.assignments[0].budget.max_tool_calls=1;f.writeAssignments();
  let s=f.joined();s=c.apply(s,{type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:s.join_sha256,accepted:false,
    rejections:[{worker:'worker-0',reason:'missing-required-output'}]}});
  s=c.apply(s,{type:'dispatch',actor:'parent'});
  assert.equal(s.phase,'budget-exhausted');assert.equal(s.nodes['worker-0'].usage.tool_calls,1);
  assert.throws(()=>c.apply(s,{type:'dispatch',actor:'parent'}),/dispatch requires/);
});
test('failed-attempt spending accumulates and absent error telemetry stops further launches', async t => {
  const f=fixture(t,['codex']);c.create(f.file,f.plan);
  let s=await c.dispatchParallel(f.file,async()=>{throw new Error('unknown failed-attempt spend');});
  assert.equal(s.phase,'budget-exhausted');
  assert.throws(()=>c.apply(s,{type:'dispatch',actor:'parent'}),/dispatch requires/);
  const g=fixture(t,['gemini']);let p=c.apply(c.initialize(g.plan),{type:'dispatch',actor:'parent'});
  p=c.apply(p,{type:'worker-error',actor:'worker-0',worker:'worker-0',token:p.nodes['worker-0'].token,
    usage:{tool_calls:11,retries:1,ci_runs:0,cost_usd:0}});
  assert.equal(p.phase,'budget-exhausted');assert.equal(p.nodes['worker-0'].usage.tool_calls,11);
});

test('v3 requires a specific change contract and protects baseline checks', t => {
  const f=fixture(t,['codex']);
  assert.throws(()=>c.initialize({...f.plan,version:2}),/plan:/);
  const contract=f.assignments[0].change_contract;
  delete f.assignments[0].change_contract;f.writeAssignments();
  assert.throws(()=>c.initialize(f.plan),/missing requested-change/);
  f.assignments[0].change_contract=contract;contract.requested_delta='also redesign';f.writeAssignments();
  assert.throws(()=>c.initialize(f.plan),/requested delta differs/);
  contract.requested_delta=f.plan.workers[0].requirement;
  contract.preserved_invariants.push(structuredClone(contract.preserved_invariants[0]));f.writeAssignments();
  assert.throws(()=>c.initialize(f.plan),/duplicate preserved invariant/);
  contract.preserved_invariants.pop();contract.preserved_invariants[0].baseline.path='code.txt';f.writeAssignments();
  assert.throws(()=>c.initialize(f.plan),/outside worker write scope/);
  contract.preserved_invariants[0].baseline.path='.ecc/goal/baseline.json';f.writeAssignments();
  fs.writeFileSync(path.join(f.plan.workers[0].repo,'.ecc/goal/baseline.json'),'weakened check');
  assert.throws(()=>c.initialize(f.plan),/baseline changed/);
});

test('worker claims, missing invariant receipts and private tests cannot certify design preservation', t => {
  const f=fixture(t,['claude']);let s=c.apply(c.initialize(f.plan),{type:'dispatch',actor:'parent'});
  const r=f.result(s);delete r.preservation;
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-0',result:r}),/missing or stale preservation/);
  const duplicate=f.result(s);duplicate.preservation.checks.push(duplicate.preservation.checks[0]);
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-0',result:duplicate}),/exactly once/);
  const old=f.result(s);old.preservation.contract_sha256='0'.repeat(64);
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-0',result:old}),/stale preservation/);
  const baseline=f.result(s);baseline.preservation.checks[0].evidence=f.assignments[0].change_contract.preserved_invariants[0].baseline;
  assert.throws(()=>c.apply(s,{type:'result',actor:'worker-0',result:baseline}),/not post-change/);
  const joined=f.joined(),review={type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:joined.join_sha256,accepted:true,rejections:[]}};
  assert.throws(()=>c.apply(joined,review,{verifyPreservation:undefined}),/not independently verified/);
  f.assignments[0].change_contract.preserved_invariants[0].category='design';f.writeAssignments();
  assert.throws(()=>c.initialize(f.plan),/browser baseline/);
});

test('in-scope redesign or data changes are rejected across runtime labels; requested edit passes', t => {
  // Synthetic browser-kind artifacts and a deterministic independent comparator.
  // This tests the controller, NOT browser execution or native vendor adoption.
  for(const runtime of ['codex','claude','gemini','opencode']) {
    const f=fixture(t,[runtime]),w=f.plan.workers[0],invariant=f.assignments[0].change_contract.preserved_invariants[0];
    w.requirement='Enable existing Save button';f.assignments[0].description=w.requirement;
    f.assignments[0].change_contract.requested_delta=w.requirement;
    invariant.category='design';invariant.description='Approved design and displayed data unchanged';invariant.baseline.kind='browser';f.writeAssignments();
    const verifyPreservation=({contract,result,worker,revision,environment})=>{
      const before=JSON.parse(fs.readFileSync(path.join(worker.repo,contract.preserved_invariants[0].baseline.path),'utf8'));
      const after=JSON.parse(fs.readFileSync(path.join(worker.repo,result.preservation.checks[0].evidence.path),'utf8'));
      return revision===f.plan.revision && environment===f.plan.environment && after.save===true && after.design===before.design && after.data===before.data;
    };
    let s=c.apply(c.initialize(f.plan),{type:'dispatch',actor:'parent'});
    fs.writeFileSync(path.join(w.repo,'code.txt'),JSON.stringify({save:true,design:'unrequested new form',data:0}));
    const bad=f.result(s);bad.preservation.checks[0].evidence.kind='browser';
    const privateCheck=structuredClone(bad);privateCheck.preservation.checks[0].evidence.kind='local-check';
    assert.throws(()=>c.apply(s,{type:'result',actor:w.agent,result:privateCheck}),/wrong preservation evidence kind/);
    s=c.apply(s,{type:'result',actor:w.agent,result:bad});
    const review=state=>({type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:state.join_sha256,accepted:true,rejections:[]}});
    assert.throws(()=>c.apply(s,review(s),{verifyPreservation}),/not independently verified/);
    s=c.apply(s,{type:'critic',actor:f.plan.critic,report:{agent:f.plan.critic,join_sha256:s.join_sha256,accepted:false,rejections:[{worker:w.id,reason:'unrequested-semantic-change'}]}});
    s=c.apply(s,{type:'dispatch',actor:'parent'});
    fs.writeFileSync(path.join(w.repo,'code.txt'),JSON.stringify({save:true,design:'approved',data:42}));
    const good=f.result(s);good.preservation.checks[0].evidence.kind='browser';
    s=c.apply(s,{type:'result',actor:w.agent,result:good});
    s=c.apply(s,review(s),{verifyPreservation});assert.equal(s.phase,'synthesis');
    assert.throws(()=>c.apply(s,{type:'synthesis',actor:'parent',output:{version:1,join_sha256:s.join_sha256,claim:'locally-verified',outputs:[w.id]}},{verifyPreservation:()=>false}),/not independently verified/);
  }
});

test('actual assignment CLI persists the canonical contract and rejects a widened request', t => {
  const f=fixture(t,['gemini']),cli=path.resolve(__dirname,'../../scripts/goal-control.js');
  f.assignments[0].capacity={ram_gib:0.1,disk_gib:0,volume:path.parse(f.plan.repo).root.toLowerCase()};f.writeAssignments();
  const contractFile=path.join(f.plan.repo,'.ecc/goal/change-contract.json');
  const contract=f.assignments[0].change_contract;fs.writeFileSync(contractFile,JSON.stringify(contract));
  const memoryShim=path.join(f.plan.repo,'.ecc/goal/fixture-memory.js');fs.writeFileSync(memoryShim,"require('os').freemem = () => 8 * 1024 ** 3;\n");
  const args=['--require',memoryShim,cli,'assign','--dir',path.dirname(f.plan.goal_file),'--goal',f.plan.goal_file,'--assignment-id','cli-contract',
    '--description',contract.requested_delta,'--acceptance','required-output','--owner-runtime','gemini','--owner-agent','cli-worker',
    '--scope','code.txt','--lease-until',f.plan.workers[0].expires_at,'--change-contract',contractFile,
    '--work-kind','output','--ram-gib','0.1','--disk-gib','0','--disk-path',f.plan.repo];
  const run=()=>spawnSync(process.execPath,args,{encoding:'utf8',windowsHide:true,cwd:f.plan.repo});
  const good=run();assert.equal(good.status,0,good.stderr);
  const stored=JSON.parse(good.stdout).assignment;assert.deepEqual(stored.change_contract,contract);
  contract.requested_delta='also change the design';fs.writeFileSync(contractFile,JSON.stringify(contract));
  // goal-control CLI uses exit 1; coding-execution CLI uses exit 2.
  const bad=run();assert.equal(bad.status,1,bad.stdout);assert.match(bad.stderr,/requested delta differs/);
});

test('operational runner joins, rejects once, repairs, pauses and resumes exact effects without replay', async t => {
  const f=fixture(t,['codex','claude','gemini','opencode']); c.create(f.file,f.plan);
  let reviews=0, launches=0, executed=0, grant=false;
  const effectFile=path.join(f.plan.repo,'.ecc/goal/effect.txt');
  const host={
    launchWorker: async worker => { launches++; return f.result(c.load(f.file),worker.id); },
    inspectWorker: async () => ({status:'unknown'}),
    confirmStopped: async call => call.method==='executeEffect' && fs.existsSync(effectFile),
    review: async state => ({agent:f.plan.critic,join_sha256:state.join_sha256,accepted:++reviews>1,
      rejections:reviews===1?[{worker:'worker-0',reason:'failed-acceptance'}]:[]}),
    verifyCritic: (event,plan) => event.actor===plan.critic && event.report.agent===plan.critic && event.report.join_sha256===c.load(f.file).join_sha256,
    verifyPreservation: ({worker,result}) => fs.readFileSync(path.join(worker.repo,'code.txt'),'utf8')==='baseline\n' && result.evidence[0].sha256===store.sha256File(path.join(worker.repo,'code.txt')),
    authorizeCitation: () => false, // No memory claims fabricated for this offline fixture.
    proposeEffects: async () => [{...f.effect,kind:'shared-write',target:effectFile,payload_sha256:store.sha256Buffer('EXACT_EFFECT')}],
    readApproval: async entry => grant?{binding:entry.binding,receipt:'fixture-external-owner',expires_at:new Date(Date.now()+60000).toISOString()}:null,
    authorizeApproval: event => grant && event.receipt==='fixture-external-owner' && event.proposal.target===effectFile,
    executeEffect: async _proposal => { executed++; fs.writeFileSync(effectFile,'EXACT_EFFECT',{flag:'wx'}); throw Error('fixture interruption after exact side effect'); },
    inspectEffect: async () => fs.existsSync(effectFile)?{path:effectFile,sha256:store.sha256File(effectFile)}:null,
    verifyEffect: (proposal,receipt) => receipt?.path===effectFile && receipt.sha256===proposal.payload_sha256 && store.sha256File(effectFile)===receipt.sha256,
  };
  const paused=await operational.run(f.file,host);
  assert.equal(paused.stopped,'owner-approval-required'); assert.equal(reviews,2); assert.equal(launches,5); assert.equal(executed,0);
  grant=true; await assert.rejects(operational.run(f.file,host),/fixture interruption/);
  assert.equal(c.load(f.file).phase,'effect');
  const done=await operational.run(f.file,host); assert.equal(done.state.phase,'completed'); assert.equal(executed,1);
  await operational.run(f.file,host); assert.equal(executed,1);
});

test('operational recovery never duplicates a live or unmetered expired worker', async t => {
  const f=fixture(t,['claude']); c.create(f.file,f.plan);
  c.transaction(f.file,s=>{s=c.apply(s,{type:'dispatch',actor:'parent'});s.nodes['worker-0'].lease_until=Date.now()-1;return s;});
  let launches=0;
  const host=Object.fromEntries(operational.REQUIRED.map(key=>[key,()=>false]));
  host.launchWorker=()=>{launches++;throw Error('must not launch');};host.inspectWorker=()=>({status:'running'});
  const held=await operational.run(f.file,host); assert.equal(held.stopped,'worker-reconciliation-required'); assert.equal(launches,0);
  host.inspectWorker=()=>({status:'failed'});assert.equal((await operational.run(f.file,host)).stopped,'worker-reconciliation-required');assert.equal(launches,0);
});

test('controller accepts unchanged preserved drafts but rejects foreign edits and new unowned files', t => {
  const f=fixture(t,['local-process-verification']),w=f.plan.workers[0];
  const draft=path.join(w.repo,'foreign-draft.txt');fs.writeFileSync(draft,'preserved draft');
  coord.execute('close',{cwd:w.repo,sessionId:w.session});w.session='worker-preserved';
  coord.execute('register',{cwd:w.repo,sessionId:w.session,scopes:w.scopes,objective:'owned output only',doneWhen:'draft preserved',ttl:120});
  fs.writeFileSync(path.join(w.repo,'code.txt'),'owned delivered output');
  const started=c.apply(c.initialize(f.plan),{type:'dispatch',actor:f.plan.parent});
  const result=()=>({...f.result(started),changed_paths:coord.execute('check-changes',{cwd:w.repo,sessionId:w.session}).paths});
  const accepted=c.apply(started,{type:'result',actor:w.agent,result:result()});
  assert.equal(accepted.phase,'critic');assert.deepEqual(accepted.nodes[w.id].result.changed_paths,['code.txt']);
  assert.equal(fs.readFileSync(draft,'utf8'),'preserved draft');
  fs.writeFileSync(draft,'unauthorized foreign change');
  assert.throws(()=>c.apply(started,{type:'result',actor:w.agent,result:{...f.result(started),changed_paths:['code.txt']}}),/foreign baseline changed/);
  fs.writeFileSync(draft,'preserved draft');fs.writeFileSync(path.join(w.repo,'new-unowned.txt'),'unauthorized');
  assert.throws(()=>c.apply(started,{type:'result',actor:w.agent,result:{...f.result(started),changed_paths:['code.txt']}}),/outside owned|outside.*scope/);
});

test('successful no-effect synthesis stops locally without approval or completion claims', async t => {
  const f=fixture(t,['local-process-verification']);c.create(f.file,f.plan);
  let effects=0,approvals=0;
  const host=Object.fromEntries(operational.REQUIRED.map(key=>[key,()=>false]));
  host.launchWorker=async worker=>f.result(c.load(f.file),worker.id);
  host.review=async state=>({agent:f.plan.critic,join_sha256:state.join_sha256,accepted:true,rejections:[]});
  host.verifyCritic=event=>event.actor===f.plan.critic&&event.report.join_sha256===c.load(f.file).join_sha256;
  host.verifyPreservation=({result})=>result.status==='pass';
  host.proposeEffects=()=>[];
  host.readApproval=()=>{approvals++;return null;};host.executeEffect=()=>{effects++;throw Error('must not execute');};
  const first=await operational.run(f.file,host);
  assert.equal(first.stopped,'locally-verified-no-effects');assert.equal(first.state.phase,'approval');
  assert.equal(first.state.synthesis.claim,'locally-verified');assert.deepEqual(first.state.effects,{});
  const second=await operational.run(f.file,host);
  assert.equal(second.stopped,'locally-verified-no-effects');assert.equal(second.state.dispatches,1);
  assert.equal(effects,0);assert.equal(approvals,0);assert.notEqual(second.state.phase,'completed');
});

test('optional queue binding requires exact pinned parent, synchronous capabilities and unchanged source', t => {
  const f=fixture(t,['local-process-verification']),hostFile=path.join(f.plan.repo,'.ecc/goal/queue-host.js');
  const context={plan:f.plan,stateFile:f.file,queueFile:path.join(f.plan.repo,'.ecc/goal/queue.json')};
  const keys=operational.REQUIRED.map(key=>JSON.stringify(key)+':()=>false').join(',');
  const write=extra=>fs.writeFileSync(hostFile,'module.exports={createHost:()=>({'+keys+extra+'})};');
  const load=()=>operational.pinnedHost(hostFile,store.sha256File(hostFile),context);
  assert.throws(()=>operational.bindQueue({},context),/pinned parent/);
  write('');assert.throws(()=>operational.bindQueue(load(),context),/capabilities unavailable/);
  write(',createQueueCapabilities:()=>Promise.resolve({})');assert.throws(()=>operational.bindQueue(load(),context),/synchronous/);
  write(',createQueueCapabilities:()=>({})');assert.throws(()=>operational.bindQueue(load(),context),/missing trusted queue/);
  write(',createQueueCapabilities:()=>({withFileLock:()=>{},atomicWrite:()=>{},assertWrite:()=>false,readTelemetry:()=>({}),checkGate:()=>false,confirmStopped:()=>false})');
  const denied=operational.bindQueue(load(),context);assert.throws(()=>denied.snapshot(),/ownership unavailable/);
  const coordFile=path.resolve(__dirname,'../../scripts/lib/session-coordination.js');
  const storeFile=path.resolve(__dirname,'../../scripts/lib/goal-store.js');
  const atomicFile=path.resolve(__dirname,'../../scripts/lib/atomic-write.js');
  write(`,createQueueCapabilities:ctx=>({withFileLock:require(${JSON.stringify(storeFile)}).withFileLock,atomicWrite:require(${JSON.stringify(atomicFile)}).writeFileAtomic,assertWrite:targets=>{const path=require('node:path');const checked=require(${JSON.stringify(coordFile)}).execute('check-write',{cwd:ctx.plan.repo,sessionId:ctx.plan.session,paths:targets.map(file=>path.relative(ctx.plan.repo,file).split(path.sep).join('/'))});return checked.allowed===true&&checked.session===ctx.plan.session;},readTelemetry:()=>({observedAt:new Date().toISOString(),freeRamGiB:require('node:os').freemem()/1024**3,reserveRamGiB:2}),checkGate:()=>false,confirmStopped:()=>false})`);
  const permitted=operational.bindQueue(load(),context);
  assert.deepEqual(permitted.snapshot().entries,[]);assert.equal(fs.existsSync(context.queueFile),false);
  const host=load();fs.appendFileSync(hostFile,'\n// changed after review');
  assert.throws(()=>operational.bindQueue(host,context),/source changed/);
  write('');const refreshed=load();
  assert.throws(()=>operational.bindQueue(refreshed,{...context,plan:{...f.plan,environment:'changed'}}),/exact pinned/);
});

test('queue invocation progression preserves checkpoints, owner pause and original-token recovery gates', async t => {
  const f=fixture(t,['local-process-verification']);c.create(f.file,f.plan);
  engine.transaction(f.file,()=>f.synthesized());
  const directory=path.join(f.plan.repo,'.ecc/goal'),hostFile=path.join(directory,'invocation-host.js');
  const fixturePaths={queue:path.join(directory,'invocation-queue.json'),
    control:path.join(directory,'invocation-control.json'),calls:path.join(directory,'invocation-calls.jsonl')};
  const fixtureModules=Object.fromEntries([
    ['engine','coding-execution'],['coord','session-coordination'],['store','goal-store'],
    ['atomic','atomic-write'],['queue','workspace-queue'],
  ].map(([key,name])=>[key,path.resolve(__dirname,'../../scripts/lib/'+name+'.js')]));
  const now=Date.now(),fixtureEntry={id:'invocation',owner:f.plan.session,goalId:'execution',
    kind:'heavy-check',resource:'synthetic-machine',state:'waiting',reason:'offline invocation progression',
    independentAction:'inspect fixture evidence',enqueuedAt:new Date(now).toISOString(),
    nextCheckpointAt:new Date(now+60000).toISOString(),dependsOn:[],peakRamGiB:1};
  let control={freeRamGiB:2,dependency:'waiting',stopped:true,recoverAllowed:false,expectedToken:null};
  const writeControl=delta=>{control={...control,...delta};fs.writeFileSync(fixturePaths.control,JSON.stringify(control));};
  writeControl({});
  // This reviewed synthetic host uses real controller/store/locks/atomic writes.
  // Telemetry and recovery attestations are explicit fixtures, not native proof.
  function createHost({plan,stateFile}){
    const fs=require('node:fs'),path=require('node:path');
    const engine=require(fixtureModules.engine),coord=require(fixtureModules.coord);
    const store=require(fixtureModules.store),atomic=require(fixtureModules.atomic);
    const {resourceKey}=require(fixtureModules.queue);
    const read=()=>JSON.parse(fs.readFileSync(fixturePaths.control,'utf8'));
    const unexpected=()=>{throw Error('fixture must not launch a worker, critic or effect');};
    return {
      launchWorker:unexpected,inspectWorker:unexpected,review:unexpected,executeEffect:unexpected,inspectEffect:unexpected,
      confirmStopped:()=>true,verifyCritic:()=>false,verifyPreservation:()=>false,
      authorizeCitation:()=>false,readApproval:()=>null,authorizeApproval:()=>false,verifyEffect:()=>false,
      proposeEffects(){
        fs.appendFileSync(fixturePaths.calls,JSON.stringify({sequence:engine.load(stateFile).sequence})+'\n');
        return [];
      },
      queueDescriptor(){
        return {file:fixturePaths.queue,entry:fixtureEntry,lease_ms:60000,ready:true,
          config_sha256:engine.digest({entry:fixtureEntry,lease_ms:60000}),
          checkpoint_sha256:engine.digest(engine.load(stateFile)),dependency_sha256:engine.digest(read().dependency)};
      },
      createQueueCapabilities(){
        return {
          withFileLock:store.withFileLock,
          atomicWrite(file,content,options={}){
            return atomic.writeFileAtomic(file,content,{...options,beforeRename(){
              options.beforeRename?.();
              if(options.publicationDeadline!==undefined&&Date.now()>=options.publicationDeadline)
                throw Error('queue lease expired before publication');
            }});
          },
          assertWrite(paths){
            const checked=coord.execute('check-write',{cwd:plan.repo,sessionId:plan.session,
              paths:paths.map(file=>path.relative(plan.repo,file).split(path.sep).join('/'))});
            return checked.allowed===true&&checked.session===plan.session;
          },
          readTelemetry(){return {observedAt:new Date().toISOString(),freeRamGiB:read().freeRamGiB,reserveRamGiB:2};},
          checkGate(entry){
            const current=read();
            return {allowed:entry.operation!=='recover'||(current.recoverAllowed===true
              &&entry.token===current.expectedToken),owner:entry.owner,resource:resourceKey(entry)};
          },
          confirmStopped:()=>read().stopped===true,
        };
      },
    };
  }
  fs.writeFileSync(hostFile,'const fixtureModules='+JSON.stringify(fixtureModules)+';\n'
    +'const fixturePaths='+JSON.stringify(fixturePaths)+';\n'
    +'const fixtureEntry='+JSON.stringify(fixtureEntry)+';\nmodule.exports.createHost='+createHost.toString()+';\n');
  const context={stateFile:f.file,plan:f.plan};
  const host=operational.pinnedHost(hostFile,store.sha256File(hostFile),context);
  const run=()=>operational.runWithQueue(f.file,host,context);
  const records=()=>JSON.parse(fs.readFileSync(fixturePaths.queue,'utf8')).entries;
  const calls=()=>fs.existsSync(fixturePaths.calls)?fs.readFileSync(fixturePaths.calls,'utf8').trim().split('\n').length:0;

  assert.equal((await run()).stopped,'queue-waiting');
  const waiting=records()[0],initialState=fs.readFileSync(f.file,'utf8');
  assert.equal(waiting.state,'waiting');assert.equal(waiting.token,undefined);assert.equal(calls(),0);
  writeControl({freeRamGiB:8,dependency:'resource-resolved'});
  const first=await run(),firstEntry=records()[0];
  assert.equal(first.stopped,'locally-verified-no-effects');assert.equal(firstEntry.id,waiting.id);
  assert.equal(firstEntry.state,'completed');assert.equal(records().length,1);assert.equal(calls(),1);
  assert.equal(firstEntry.invocation.admitted_dependency_sha256,engine.digest(control.dependency));
  assert.notEqual(fs.readFileSync(f.file,'utf8'),initialState);

  const unchangedQueue=fs.readFileSync(fixturePaths.queue,'utf8'),unchangedState=fs.readFileSync(f.file,'utf8');
  assert.equal((await run()).stopped,'queue-awaiting-checkpoint-or-dependency-change');
  assert.equal(fs.readFileSync(fixturePaths.queue,'utf8'),unchangedQueue);
  assert.equal(fs.readFileSync(f.file,'utf8'),unchangedState);assert.equal(calls(),1);

  writeControl({dependency:'dependency-evidence-changed'});
  assert.equal((await run()).stopped,'locally-verified-no-effects');
  assert.equal(records().length,2);assert.equal(calls(),2);
  assert.notEqual(records()[1].id,firstEntry.id);assert.ok(records()[1].dependsOn.includes(firstEntry.id));
  assert.deepEqual(records()[0],firstEntry);

  engine.transaction(f.file,state=>engine.apply(state,{type:'recover',actor:f.plan.parent},operational.options(host)));
  assert.equal((await run()).stopped,'locally-verified-no-effects');
  assert.equal(records().length,3);assert.equal(calls(),3);
  assert.ok(records()[2].dependsOn.includes(records()[1].id));

  // Retain a real store-minted token when cessation cannot be established.
  // Never simulate supervisor death or claim native recovery from these flags.
  writeControl({dependency:'closure-unknown',stopped:false});
  assert.equal((await run()).stopped,'queue-reconciliation-required');
  const retained=records().at(-1),retainedBytes=fs.readFileSync(fixturePaths.queue,'utf8');
  assert.equal(retained.state,'running');assert.match(retained.token,/^[a-f0-9]{48}$/);
  assert.equal(calls(),4);
  const wrongToken=(retained.token[0]==='0'?'1':'0')+retained.token.slice(1);
  writeControl({recoverAllowed:true,expectedToken:wrongToken});
  await assert.rejects(run(),/invocation recovery authority unavailable/);
  assert.equal(fs.readFileSync(fixturePaths.queue,'utf8'),retainedBytes);assert.equal(calls(),4);
  writeControl({expectedToken:retained.token});
  await assert.rejects(run(),/invocation cessation\/spend unverified/);
  assert.equal(fs.readFileSync(fixturePaths.queue,'utf8'),retainedBytes);assert.equal(calls(),4);
  assert.equal(records().at(-1).token,retained.token);
  assert.deepEqual(records().at(-1).invocation.original_supervisor,retained.invocation.original_supervisor);

  const paused=JSON.parse(retainedBytes);
  paused.entries.at(-1).state='owner-paused';paused.entries.at(-1).explicitOwnerPause=true;
  fs.writeFileSync(fixturePaths.queue,JSON.stringify(paused));
  const pausedBytes=fs.readFileSync(fixturePaths.queue,'utf8');
  writeControl({dependency:'changed-after-owner-pause',stopped:true});
  assert.equal((await run()).stopped,'queue-owner-paused');
  assert.equal(fs.readFileSync(fixturePaths.queue,'utf8'),pausedBytes);assert.equal(calls(),4);
  assert.deepEqual(engine.load(f.file).effects,{});
});


test('absolute queue deadline includes stale supervisor reconciliation before any host launch', async t => {
  const f=fixture(t,['local-process-verification']);c.create(f.file,f.plan);
  let clock=Date.now(),calls=0,confirmed=0;
  const host=Object.fromEntries(operational.REQUIRED.map(key=>[key,()=>{calls++;return false;} ]));
  host.confirmStopped=()=>{confirmed++;clock+=1000;return true;};
  const queue={id:'original-invocation',token:'a'.repeat(48),binding_sha256:'b'.repeat(64)};
  fs.writeFileSync(f.file+'.runner-lock',JSON.stringify({pid:2147483647,host:os.hostname(),
    plan_sha256:engine.digest(f.plan),nonce:'d'.repeat(32),pendingCalls:[{method:'review',callId:'old-call'}],queue}));
  const originalNow=Date.now;
  try{
    Date.now=()=>clock;
    const result=await operational.run(f.file,host,{maxIterations:1,maxMilliseconds:300000,
      invocation:{...queue,leaseUntil:new Date(clock+50).toISOString(),plan_sha256:engine.digest(f.plan),
        checkpoint_sha256:engine.digest(c.load(f.file))}});
    assert.equal(result.stopped,'runner-budget');assert.equal(confirmed,1);assert.equal(calls,0);
    assert.equal(result.state.dispatches,0);assert.deepEqual(result.state.effects,{});
    assert.equal(fs.existsSync(f.file+'.runner-lock'),false);
  }finally{Date.now=originalNow;}
});

test('pinned local processes persist critic rejection and resume in a fresh supervisor without effects', t => {
  // Bound this actual process exercise; never reclaim RAM by killing sessions.
  if(os.freemem()/1024**3<2.5){t.skip('2 GiB preserved RAM plus bounded supervisor/child headroom unavailable');return;}
  const f=fixture(t,['local-process-verification']);c.create(f.file,f.plan);
  const trust=path.join(f.plan.repo,'.ecc/goal/local-process-proof');fs.mkdirSync(trust);
  const engineFile=path.resolve(__dirname,'../../scripts/lib/coding-execution.js');
  const coordFile=path.resolve(__dirname,'../../scripts/lib/session-coordination.js');
  const storeFile=path.resolve(__dirname,'../../scripts/lib/goal-store.js');
  const workerFile=path.join(trust,'worker.js'),criticFile=path.join(trust,'critic.js'),hostFile=path.join(trust,'host.js');
  fs.writeFileSync(workerFile,`const fs=require('node:fs'),path=require('node:path');const c=require(${JSON.stringify(engineFile)}),coord=require(${JSON.stringify(coordFile)}),store=require(${JSON.stringify(storeFile)});const w=JSON.parse(fs.readFileSync(0,'utf8'));const p=path.join(w.repo,'code.txt');const second=fs.readFileSync(p,'utf8').includes('missing');const value={design:'approved',data:42,delta:second?'delivered':'missing'};fs.writeFileSync(p,JSON.stringify(value));const snapshot=store.captureRepositoryState(w.repo,{excludePaths:[path.join(w.repo,'.ecc/goal')]});const evidence={path:'code.txt',sha256:store.sha256File(p),kind:'local-check'};console.log(JSON.stringify({version:1,worker:w.id,agent:w.agent,runtime:w.runtime,token:w.token,revision:w.revision,environment:w.environment,status:second?'pass':'fail',head:snapshot.head,tree_fingerprint:snapshot.tree_fingerprint,changed_paths:coord.execute('check-changes',{cwd:w.repo,sessionId:w.session}).paths,evidence:[evidence],citations:[],usd:0,usage:{tool_calls:1,retries:0,ci_runs:0,cost_usd:0},preservation:{contract_sha256:c.digest(w.assignment.change_contract),checks:[{id:'preserve',evidence}]}}));`);
  fs.writeFileSync(criticFile,`const fs=require('node:fs');const {state:s}=JSON.parse(fs.readFileSync(0,'utf8'));const rejections=Object.values(s.nodes).filter(n=>n.result.status!=='pass').map(n=>({worker:n.result.worker,reason:'failed-acceptance'}));console.log(JSON.stringify({agent:s.plan.critic,join_sha256:s.join_sha256,accepted:rejections.length===0,rejections}));`);
  fs.writeFileSync(hostFile,`const fs=require('node:fs'),cp=require('node:child_process'),c=require(${JSON.stringify(engineFile)}),store=require(${JSON.stringify(storeFile)});module.exports.createHost=({plan,stateFile})=>{const stopped=new Set(),reviews=new Map();function run(file,expected,input,cwd,control){if(store.sha256File(file)!==expected)throw Error('protected local adapter changed');const child=cp.spawnSync(process.execPath,['--max-old-space-size=64',file],{cwd,input:JSON.stringify(input),encoding:'utf8',windowsHide:true,timeout:10000,maxBuffer:1024*1024});if(child.status!==null)stopped.add(control.callId);if(child.status!==0)throw Error('local process failed; usage is not inferred');return JSON.parse(child.stdout);}return{launchWorker:(w,ctl)=>run(${JSON.stringify(workerFile)},${JSON.stringify(store.sha256File(workerFile))},w,w.repo,ctl),inspectWorker:()=>null,confirmStopped:({callId})=>stopped.has(callId),review:(s,ctl)=>{const r=run(${JSON.stringify(criticFile)},${JSON.stringify(store.sha256File(criticFile))},{state:s},plan.repo,ctl);reviews.set(c.digest(r),s.join_sha256);return r;},verifyCritic:e=>e.actor===plan.critic&&reviews.get(c.digest(e.report))===e.report.join_sha256,verifyPreservation:({worker,result})=>{const v=JSON.parse(fs.readFileSync(worker.repo+'/code.txt','utf8'));return v.design==='approved'&&v.data===42&&v.delta==='delivered'&&result.evidence[0].sha256===store.sha256File(worker.repo+'/code.txt');},authorizeCitation:()=>false,proposeEffects:()=>[],readApproval:()=>null,authorizeApproval:()=>false,executeEffect:()=>{throw Error('no effect configured');},inspectEffect:()=>null,verifyEffect:()=>false};};`);
  const runnerFile=path.resolve(__dirname,'../../scripts/lib/coding-execution-runner.js');
  function run(maxIterations){
    const script=`const fs=require('node:fs'),c=require(${JSON.stringify(engineFile)}),r=require(${JSON.stringify(runnerFile)});const file=${JSON.stringify(f.file)};const host=r.pinnedHost(${JSON.stringify(hostFile)},${JSON.stringify(store.sha256File(hostFile))},{stateFile:file,plan:c.load(file).plan});r.run(file,host,{maxIterations:${maxIterations},maxMilliseconds:30000}).then(v=>console.log(JSON.stringify({pid:process.pid,stopped:v.stopped,state:v.state}))).catch(e=>{console.error(e.message);process.exitCode=2;});`;
    const child=spawnSync(process.execPath,['--max-old-space-size=128','-e',script],{encoding:'utf8',windowsHide:true,timeout:40000,maxBuffer:1024*1024});
    assert.equal(child.status,0,child.stderr);return JSON.parse(child.stdout);
  }
  const first=run(2);
  assert.equal(first.stopped,'runner-budget');assert.equal(first.state.phase,'repair');
  assert.equal(first.state.repairs,1);assert.equal(first.state.dispatches,1);
  const second=run(10);
  assert.notEqual(first.pid,second.pid);assert.equal(second.stopped,'locally-verified-no-effects');
  assert.equal(second.state.repairs,1);assert.equal(second.state.dispatches,2);assert.equal(second.state.nodes['worker-0'].attempts,2);
  assert.equal(second.state.nodes['worker-0'].usage.tool_calls,2);assert.equal(second.state.spent_usd,0);
  assert.equal(second.state.phase,'approval');assert.equal(second.state.synthesis.claim,'locally-verified');
  assert.deepEqual(second.state.effects,{});assert.equal(fs.existsSync(f.file+'.runner-lock'),false);
  assert.ok(second.state.audit.some(event=>event.type==='critic'));
});

test('operational CLI requires exact trusted host pin and all verifiers', t => {
  const f=fixture(t,['opencode']); c.create(f.file,f.plan);
  const hostFile=path.join(f.plan.repo,'.ecc/goal/host.js'); fs.writeFileSync(hostFile,'module.exports={createHost:()=>({})};');
  const cli=path.resolve(__dirname,'../../scripts/coding-execution-run.js');
  const bad=spawnSync(process.execPath,[cli,f.file,hostFile,'0'.repeat(64)],{encoding:'utf8',windowsHide:true});
  assert.equal(bad.status,2);assert.match(bad.stderr,/host source changed/);
  const incomplete=spawnSync(process.execPath,[cli,f.file,hostFile,store.sha256File(hostFile)],{encoding:'utf8',windowsHide:true});
  assert.equal(incomplete.status,2);assert.match(incomplete.stderr,/missing trusted host capability/);
});

test('operational timeouts journal all parallel calls and retain supervision until cessation is proven', async t => {
  const f=fixture(t,['claude','opencode']);c.create(f.file,f.plan);
  const host=Object.fromEntries(operational.REQUIRED.map(key=>[key,()=>false]));
  host.launchWorker=()=>new Promise(()=>{});
  await operational.run(f.file,host,{maxMilliseconds:30000});
  const marker=JSON.parse(fs.readFileSync(f.file+'.runner-lock','utf8'));
  assert.equal(marker.pendingCalls.length,2); assert.equal(new Set(marker.pendingCalls.map(call=>call.callId)).size,2);
  await assert.rejects(operational.run(f.file,host),/supervisor is still alive/);
});
