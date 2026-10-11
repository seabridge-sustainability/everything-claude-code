'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const engine = require('../../scripts/lib/coding-execution');
// Explicit fixture identity verifier; this is NOT a live-model identity claim.
const c = { ...engine, apply:(state,event,options={}) => engine.apply(state,event,{
  verifyCritic:(review,plan)=>review.actor===plan.critic && review.actor!==plan.parent && !plan.workers.some(w=>w.agent===review.actor),
  ...options,
}) };
const coord = require('../../scripts/lib/session-coordination');
const store = require('../../scripts/lib/goal-store');
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
  coord.execute('register', { cwd: root, sessionId: 'parent', scopes: ['.ecc/goal'], objective: 'controller', doneWhen: 'checks', ttl:120 });
  const workers = runtimes.map((runtime, index) => {
    const id = `worker-${index}`, workerRepo = repo(id);
    coord.execute('register', { cwd: workerRepo, sessionId: id, scopes: ['code.txt'], objective: 'owned output', doneWhen: 'receipt', ttl:120 });
    return { id, runtime, agent: id, repo: workerRepo, session: id, scopes: ['code.txt'], requirement: 'required output', acceptance: 'code.txt exists with hash', expires_at: new Date(Date.now()+3600000).toISOString(), max_attempts:3,
      assignment_id:id,assignment_sha256:'0'.repeat(64) };
  });
  const assignmentsFile = path.join(root,'.ecc/goal/assignments.jsonl');
  const assignments = workers.map(worker => ({schema:'ecc.assignment.v1',assignment_id:worker.id,goal_id:goalDocument.goal_id,
    description:worker.requirement,acceptance_ids:['required-output'],owner_runtime:worker.runtime,owner_agent:worker.agent,scope_paths:worker.scopes,
    issued_at:new Date(Date.now()-1000).toISOString(),lease_expires_at:worker.expires_at,
    budget:{max_tool_calls:10,max_retries:2,max_ci_runs:0,max_cost_usd:0},source_harness:'offline-fixture'}));
  const writeAssignments = () => {
    fs.writeFileSync(assignmentsFile,assignments.map(item=>JSON.stringify(item)).join('\n')+'\n');
    workers.forEach((worker,index)=>{worker.assignment_sha256=c.digest(assignments[index]);});
  };
  writeAssignments();
  const plan = { version:2, id:'execution', parent:'parent', session:'parent', repo:root, goal_file:goal, assignments_file:assignmentsFile,
    goal_sha256:store.sha256File(goal), revision:c.digest('owner revision'), environment:'offline-fixture', critic:'independent-critic', workers,
    limits:{ dispatches:workers.length*3, repairs:2, lease_ms:60000, usd:0 } };
  const file = path.join(root,'.ecc/goal/execution.json');
  function result(state, id = workers[0].id) {
    const w = workers.find(w => w.id === id), snapshot = store.captureRepositoryState(w.repo, { excludePaths:[path.join(w.repo,'.ecc/goal')] });
    return { version:1, worker:id, agent:w.agent, runtime:w.runtime, token:state.nodes[id].token, revision:plan.revision, environment:plan.environment,
      status:'pass', head:snapshot.head, tree_fingerprint:snapshot.tree_fingerprint, changed_paths:snapshot.dirty_paths,
      evidence:[{path:'code.txt',sha256:store.sha256File(path.join(w.repo,'code.txt')),kind:'local-check'}],citations:[],usd:0,
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
