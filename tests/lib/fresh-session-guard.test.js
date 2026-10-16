'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const { test, after } = require('node:test');
const testedRoot = process.env.ECC_PREFLIGHT_TEST_ROOT || path.resolve(__dirname,'../..');
const { prepare, configuration, launch } = require(path.join(testedRoot,'scripts/fresh-agent-session.js'));
const { run } = require(path.join(testedRoot,'scripts/hooks/fresh-session-guard.js'));
const { preflight, SUPPORTED, execute, workspaceBoundary, repository, goalReference } = require(path.join(testedRoot,'scripts/lib/fresh-session-guard.js'));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-fresh-preflight-'));
let count = 0;
after(() => fs.rmSync(temp, { recursive: true, force: true }));
function fixture(runtime, centralLayout = false, goalFile = null, toolProfile = undefined) {
  const box = path.join(temp, String(count++));
  const cwd = centralLayout ? path.join(box,'manageesg-backend') : box; fs.mkdirSync(cwd,{recursive:true});
  for (const args of [['init','--initial-branch='+(centralLayout?'seabridge_development':'fixture')],['config','user.name','ECC Test'],['config','user.email','test@example.invalid']]) {
    const r = spawnSync('git', args, { cwd, encoding: 'utf8', windowsHide: true }); assert.equal(r.status, 0, r.stderr);
  }
  fs.writeFileSync(path.join(cwd, 'check.json'), '{"protected":true}\n');
  spawnSync('git', ['add','check.json'], { cwd, windowsHide: true });
  const commit = spawnSync('git', ['-c','core.hooksPath=','commit','-m','fixture'], { cwd, encoding: 'utf8', windowsHide: true }); assert.equal(commit.status, 0, commit.stderr);
  const now = new Date().toISOString();
  const goal = { schema:'ecc.active-goal.v1', goal_id:'fresh', mode:'controlled', proof_profile:'security', objective:'Verify fresh preflight', current_priority:'Allowed/blocked check', non_goals:[],
    user_visible_proofs:[{id:'guard',description:'Guard',lane_id:'guard',required_stage:'authentic_input_processed',required_evidence_kinds:['test','runtime'],required_repositories:['fixture'],allowed_result_classes:['other'],acceptance_predicate:'Allowed write and outside rejection',requires_authentic:false,requires_user_visible:false,subject_scope:null,required:true}],
    lanes:[{id:'guard',description:'Guard',status:'active',blocker:null,next_action:'Preflight'}],owner_corrections:[],
    forecast:{state:'not_set',confidence:'none',basis:null,critical_path:[],likely_hours:null,next_checkpoint_at:null,checkpoint_started_at:null,checkpoint_proof_id:null,updated_at:now},status:'active',updated_at:now };
  const selectedGoal = goalFile === null ? path.join(cwd,'.ecc/goal/active-goal.yaml')
    : path.join(centralLayout ? box : cwd, goalFile);
  fs.mkdirSync(path.dirname(selectedGoal), { recursive: true });
  fs.writeFileSync(selectedGoal,JSON.stringify(goal));
  const policyRoot = path.join(cwd,'policy'); fs.mkdirSync(policyRoot);
  for (const name of ['AGENTS.md','AGENTS_SYSTEM.md','CLAUDE.md']) fs.writeFileSync(path.join(policyRoot,name),'SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n');
  if(centralLayout) fs.appendFileSync(path.join(policyRoot,'AGENTS_SYSTEM.md'),`Code: ${box} only; one active checkout/repo. E: Docker only.\n`);
  fs.writeFileSync(path.join(cwd,'.gitignore'),'.ecc/\n');
  const addPolicy=spawnSync('git',['add','.gitignore','policy'],{cwd,encoding:'utf8',windowsHide:true});assert.equal(addPolicy.status,0,addPolicy.stderr);
  const commitPolicy=spawnSync('git',['commit','-m','fixture policy baseline'],{cwd,encoding:'utf8',windowsHide:true});assert.equal(commitPolicy.status,0,commitPolicy.stderr);
  const session = 'fresh-' + count;
  execute('register',{cwd,sessionId:session,scopes:['owned','.ecc/fresh-session','.agents/hooks.json',...(goalFile !== null && !centralLayout ? [goalFile] : [])],objective:'Preflight',doneWhen:'Checked',ttl:30});
  const plan = prepare({runtime,session,cwd,policyRoot,executable:process.execPath,args:['--help'],toolLimit:40,turnLimit:10,toolProfile,peakRamGiB:0.1,
    ...(goalFile === null ? {} : {goalFile:selectedGoal})});
  return {cwd,session,policyRoot,plan,selectedGoal,options:{cwd,sessionId:session,policyRoot,configFile:plan.environment.ECC_FRESH_SESSION_CONFIG}};
}
function payload(runtime,cwd,file='owned/ok.txt',nativeId='fresh-native') {
  if (runtime==='antigravity') return {conversationId:nativeId,workspacePaths:[cwd],toolCall:{name:'write_to_file',args:{TargetFile:file}}};
  return {session_id:nativeId,cwd,tool_name:runtime==='opencode'?'write':runtime==='gemini'?'write_file':'Write',
    tool_input:runtime==='opencode'?{filePath:file,content:'LOCAL_ALLOWED'}:{file_path:file,content:'LOCAL_ALLOWED'}};
}
function allowed(result,runtime) {
  return runtime==='antigravity' ? result.output?.decision==='allow' : result.exit===0 && !result.output;
}
function workerFixture(cap = 24, reserve = 3, extraScope = null, centralLayout = false) {
  const f = fixture('claude',centralLayout); execute('close',{cwd:f.cwd,sessionId:f.session});
  const session = f.session + '-worker';
  execute('register',{cwd:f.cwd,sessionId:session,scopes:['owned','.ecc/fresh-session/'+session,...(extraScope ? [extraScope] : [])],objective:'Fresh bounded worker',doneWhen:'Exact cap',ttl:30});
  const assignment = {schema:'ecc.assignment.v1',assignment_id:'worker-'+count,goal_id:'fresh',description:'Verify exact tool cap',acceptance_ids:['guard'],
    owner_runtime:'claude',owner_agent:'worker-owner',scope_paths:['owned'],issued_at:new Date().toISOString(),lease_expires_at:new Date(Date.now()+600000).toISOString(),
    budget:{max_tool_calls:cap,max_retries:0,max_ci_runs:0,max_cost_usd:0},source_harness:'fixture',
    managed_execution:{repository_root:repository(f.cwd).root,session_id:session,closure_reserve:reserve}};
  const ledger = path.join(path.dirname(f.selectedGoal),'assignments.jsonl'), integrations = path.join(path.dirname(f.selectedGoal),'integrations.jsonl');
  fs.writeFileSync(ledger,JSON.stringify(assignment)+'\n'); fs.writeFileSync(integrations,'');
  if (!extraScope && cap-reserve>=10) execute('assignment-bind',{cwd:f.cwd,sessionId:session,assignment,goalReference:goalReference(repository(f.cwd),f.selectedGoal)});
  const manifest = {...f.plan.manifest,session,toolLimit:undefined,workerAssignment:{id:assignment.assignment_id,ownerAgent:assignment.owner_agent}};
  return {...f,session,assignment,ledger,integrations,manifest};
}
function prepareWorker(f) {
  const plan = prepare(f.manifest);
  return {...f,plan,options:{...f.options,sessionId:f.session,configFile:plan.environment.ECC_FRESH_SESSION_CONFIG}};
}
test('fresh launch pins its incremental RAM envelope before any native discovery', () => {
  const f = fixture('claude');
  const binding = JSON.parse(fs.readFileSync(f.plan.environment.ECC_FRESH_SESSION_CONFIG, 'utf8'));
  assert.equal(binding.peakRamGiB, 0.1);
    for (const file of ['workspace-queue', 'workspace-queue-store', 'workspace-live-facts', 'goal-store', 'atomic-write', 'session-coordination']) {
      assert.equal(binding.implementation['scripts/lib/' + file + '.js'], crypto.createHash('sha256').update(fs.readFileSync(path.join(testedRoot, 'scripts/lib/' + file + '.js'))).digest('hex'));
    }
  const changed = structuredClone(f.plan); changed.manifest.peakRamGiB = 0.01;
  assert.throws(() => launch(changed), /RAM envelope changed/);
  const removed = structuredClone(f.plan); delete removed.manifest.peakRamGiB;
  assert.throws(() => launch(removed), /RAM envelope changed/);
    binding.implementation['scripts/lib/workspace-queue-store.js'] = '0'.repeat(64);
    fs.writeFileSync(f.plan.environment.ECC_FRESH_SESSION_CONFIG, JSON.stringify(binding));
    assert.throws(() => launch(f.plan), /implementation changed/);
});

test('fresh local-no-mcp profile is invocation-local, pinned and preserves hooks',()=>{
  const f=fixture('claude',false,null,'local-no-mcp');
  assert.ok(f.plan.args.includes('--strict-mcp-config'));
  assert.equal(f.plan.args[f.plan.args.indexOf('--mcp-config')+1],'{"mcpServers":{}}');
  assert.ok(f.plan.args.includes('--settings'));
  const binding=JSON.parse(fs.readFileSync(f.plan.environment.ECC_FRESH_SESSION_CONFIG,'utf8'));
  assert.equal(binding.toolProfile,'local-no-mcp');
  const cfg=JSON.parse(fs.readFileSync(path.join(f.cwd,binding.nativeConfig),'utf8'));
  assert.ok(cfg.hooks.SessionStart&&cfg.hooks.PreToolUse);
  const changed=structuredClone(f.plan);delete changed.manifest.toolProfile;
  assert.throws(()=>launch(changed),/tool profile changed/);
});
test('unreviewed or unsupported light profiles refuse before native launch',()=>{
  assert.throws(()=>fixture('claude',false,null,'anything-else'),/local-no-mcp/);
  assert.throws(()=>fixture('codex',false,null,'local-no-mcp'),/local-no-mcp/);
});
test('managed worker derives exact assignment cap, counts startup and preserves parent reserve', () => {
  const f = prepareWorker(workerFixture());
  assert.equal(f.plan.manifest.toolLimit,21);
  const p = payload('claude',f.cwd);
  preflight({...f.options,runtime:'claude',payload:p});
  const status = () => execute('status',{cwd:f.cwd}).sessions.find(s => s.id === f.session).guard;
  assert.equal(status().tools,5,'five matching-identity startup probes count; wrong-identity probe does not');
  for (let n=0;n<16;n++) assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
  assert.equal(status().tools,21);
  assert.equal(allowed(run('claude','pre',p,f.options),'claude'),false);
  assert.equal(status().tools,21,'exhaustion denied before charge; separate log retains refusal');
  assert.equal(allowed(run('claude','pre',p,f.options),'claude'),false);
  assert.equal(status().tools,21,'repeated refusals cannot spend parent reserve');
  assert.equal(status().workerAssignment.closureReserve,3,'parent settlement reserve is not extra worker tool authority');
});
test('worker default cannot widen cap and explicit over-cap, omitted binding or wrong scope refuses', () => {
  const f = workerFixture();
  assert.throws(()=>prepare({...f.manifest,toolLimit:200}),/cap exceeds exact assignment/);
  assert.throws(()=>prepare({...f.manifest,workerAssignment:undefined}),/registered worker assignment/);
  assert.throws(()=>prepare({...f.manifest,workerAssignment:{...f.manifest.workerAssignment,ownerAgent:'wrong'}}),/registered worker assignment/);
  assert.throws(()=>prepare(workerFixture(12,3).manifest),/must be pinned/);
  assert.throws(()=>prepare(workerFixture(24,3,'outside').manifest),/must be pinned/);
  const otherGoal=path.join(f.cwd,'.ecc/other/active-goal.yaml');fs.mkdirSync(path.dirname(otherGoal),{recursive:true});fs.copyFileSync(f.selectedGoal,otherGoal);
  assert.throws(()=>prepare({...f.manifest,goalFile:otherGoal,workerAssignment:undefined}),/registered worker assignment\/goal/);
  const external=workerFixture(24,3,null,true), externalGoal=path.join(path.dirname(external.cwd),'artifacts/other/active-goal.yaml');
  fs.mkdirSync(path.dirname(externalGoal),{recursive:true});fs.copyFileSync(external.selectedGoal,externalGoal);
  assert.throws(()=>prepare({...external.manifest,goalFile:externalGoal,workerAssignment:undefined}),/registered worker assignment\/goal/);
});
test('worker assignment append remains valid but mutation, expiry and terminal usage fail closed', () => {
  for (const change of ['mutation','expiry','settled','goal']) {
    const f = prepareWorker(workerFixture()), p = payload('claude',f.cwd);
    assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
    fs.appendFileSync(f.ledger,JSON.stringify({...f.assignment,assignment_id:'unrelated',managed_execution:{...f.assignment.managed_execution,session_id:'unrelated'}})+'\n');
    assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true,'unrelated append is not a matching-record revision');
    if (change==='mutation') fs.writeFileSync(f.ledger,JSON.stringify({...f.assignment,budget:{...f.assignment.budget,max_tool_calls:200}})+'\n');
    if (change==='expiry') fs.writeFileSync(f.ledger,JSON.stringify({...f.assignment,lease_expires_at:new Date(Date.now()-1).toISOString()})+'\n');
    if (change==='settled') fs.appendFileSync(f.integrations,JSON.stringify({assignment_id:f.assignment.assignment_id,usage:{tool_calls:29}})+'\n');
    if (change==='goal') {const g=JSON.parse(fs.readFileSync(f.selectedGoal));g.current_priority='Owner correction';fs.writeFileSync(f.selectedGoal,JSON.stringify(g));}
    assert.equal(allowed(run('claude','pre',p,f.options),'claude'),false,change);
  }
  const f = workerFixture(); fs.writeFileSync(f.integrations,JSON.stringify({assignment_id:f.assignment.assignment_id,usage:{tool_calls:1}})+'\n');
  assert.throws(()=>prepare(f.manifest),/already settled/);
});
test('closed historical worker binding cannot reset under a rewritten assignment/session', () => {
  const f = prepareWorker(workerFixture()), p = payload('claude',f.cwd);
  assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
  execute('close',{cwd:f.cwd,sessionId:f.session});
  const replacement = f.session+'-replacement';
  execute('register',{cwd:f.cwd,sessionId:replacement,scopes:['owned','.ecc/fresh-session/'+replacement],objective:'No reset',doneWhen:'Refused',ttl:30});
  fs.writeFileSync(f.ledger,JSON.stringify({...f.assignment,issued_at:new Date().toISOString(),managed_execution:{...f.assignment.managed_execution,session_id:replacement}})+'\n');
  const rewritten=JSON.parse(fs.readFileSync(f.ledger,'utf8'));
  assert.throws(()=>execute('assignment-bind',{cwd:f.cwd,sessionId:replacement,assignment:rewritten,
    goalReference:goalReference(repository(f.cwd),f.selectedGoal)}),/already pinned/);
});
test('two actual hook subprocesses race for one worker slot; at most one is permitted', async () => {
  const f = prepareWorker(workerFixture()), p=payload('claude',f.cwd);
  preflight({...f.options,runtime:'claude',payload:p});
  for (let n=0;n<15;n++) assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
  const invoke = () => new Promise((resolve,reject) => {
    const child = require('node:child_process').spawn(process.execPath,[path.join(testedRoot,'scripts/hooks/fresh-session-guard.js'),'claude','pre'],
      {cwd:f.cwd,env:{...process.env,...f.plan.environment},windowsHide:true,stdio:['pipe','pipe','pipe']});
    let output='',errors='';child.stdout.on('data',part=>output+=part);child.stderr.on('data',part=>errors+=part);
    child.on('error',reject);child.on('close',code=>resolve({exit:code,output:output.trim()?JSON.parse(output):null,errors}));child.stdin.end(JSON.stringify(p));
  });
  const results=await Promise.all([invoke(),invoke()]);
  assert.equal(results.filter(result=>allowed(result,'claude')).length,1);
  assert.ok(results.every(result=>result.exit===0));
});
test('existing assignment CLI emits managed contract and rejects partial or duplicate session bindings', () => {
  const f = workerFixture(24,3,'owned/sub'); fs.writeFileSync(f.ledger,'');
  const {commandAssign} = require(path.join(testedRoot,'scripts/goal-control.js'));
  const args = ['--dir',path.dirname(f.selectedGoal),'--description','Verify exact tool cap','--acceptance','guard','--work-kind','output',
    '--owner-runtime','claude','--owner-agent','worker-owner','--scope','owned','--lease-until',new Date(Date.now()+600000).toISOString(),
    '--max-tool-calls','24','--max-retries','0','--max-ci-runs','0','--max-cost-usd','0','--ram-gib','0.01','--disk-gib','0','--disk-path',f.cwd,
    '--managed-session',f.session,'--managed-repo',f.cwd,'--closure-reserve','3'];
  // Synthetic resource telemetry for this isolated parser/contract fixture only.
  // Production admission still uses current kernel facts.
  const original = os.freemem; os.freemem = () => 8 * 1024 ** 3;
  try {
    assert.throws(()=>commandAssign(args.slice(0,-2)),/managed assignment requires/);
    const result=commandAssign(args); assert.equal(result.assigned,true);
    assert.deepEqual(result.assignment.managed_execution,{repository_root:repository(f.cwd).root,session_id:f.session,closure_reserve:3});
    assert.throws(()=>commandAssign(args),/already has an assignment/);
    const plan=prepare({...f.manifest,workerAssignment:{id:result.assignment.assignment_id,ownerAgent:'worker-owner'}});
    assert.equal(plan.manifest.toolLimit,21);
  } finally {os.freemem=original;}
});
for (const runtime of SUPPORTED) test(runtime + ': automatic once-only preflight and actual allowed/blocked callback decisions', () => {
  const f=fixture(runtime), p=payload(runtime,f.cwd);
  const first=run(runtime,'pre',p,f.options);
  if(!allowed(first,runtime)) preflight({...f.options,runtime,payload:p}); // Surface the refused prerequisite without weakening the allow assertion.
  assert.equal(allowed(first,runtime),true);
  fs.mkdirSync(path.join(f.cwd,'owned')); fs.writeFileSync(path.join(f.cwd,'owned/ok.txt'),'LOCAL_ALLOWED');
  assert.equal(fs.readFileSync(path.join(f.cwd,'owned/ok.txt'),'utf8'),'LOCAL_ALLOWED');
  for(const file of ['outside.txt','.ecc/goal/active-goal.yaml',path.relative(f.cwd,f.options.configFile)]) {
    const denied=run(runtime,'pre',payload(runtime,f.cwd,file),f.options); assert.equal(allowed(denied,runtime),false);
  }
  assert.equal(fs.existsSync(path.join(f.cwd,'outside.txt')),false);
  assert.equal(allowed(run(runtime,'pre',payload(runtime,f.cwd,'owned/wrong.txt','different-id'),f.options),runtime),false);
  const receipt=preflight({...f.options,runtime,payload:p}); assert.equal(receipt.results.length,6);
  const log=path.join(f.cwd,'artifacts/agent-runs/scope-guard',f.session+'.jsonl');
  const entries=fs.readFileSync(log,'utf8').trim().split('\n').map(JSON.parse);
  assert.equal(entries.filter(e=>e.reasonCode==='opaque tool requires a verified restricted execution boundary').length,1);
  assert.equal(allowed(run(runtime,'pre',p,f.options),runtime),true);
  assert.equal(fs.readFileSync(log,'utf8').trim().split('\n').length,entries.length+1,'cached preflight must not repeat probes');
});
test('managed admission preserves inherited drafts but refuses ownership or changed bytes',()=>{
  const f=fixture('claude');execute('close',{cwd:f.cwd,sessionId:f.session});
  fs.writeFileSync(path.join(f.cwd,'foreign.txt'),'OTHER_OWNER_DRAFT');
  const session=f.session+'-foreign';execute('register',{cwd:f.cwd,sessionId:session,scopes:['owned','.ecc/fresh-session'],objective:'Guard inherited draft',doneWhen:'Preserved with scoped denies',ttl:30});
  const plan=prepare({...f.plan.manifest,session});const options={...f.options,sessionId:session,configFile:plan.environment.ECC_FRESH_SESSION_CONFIG};
  const receipt=preflight({...options,runtime:'claude',payload:payload('claude',f.cwd)});
  assert.equal(receipt.results.length,6);
  assert.equal(allowed(run('claude','pre',payload('claude',f.cwd,'owned/ok.txt'),options),'claude'),true);
  assert.equal(allowed(run('claude','pre',payload('claude',f.cwd,'foreign.txt'),options),'claude'),false);
  assert.equal(fs.readFileSync(path.join(f.cwd,'foreign.txt'),'utf8'),'OTHER_OWNER_DRAFT');
  fs.appendFileSync(path.join(f.cwd,'foreign.txt'),'OTHER_OWNER_UPDATE');
  assert.equal(allowed(run('claude','pre',payload('claude',f.cwd,'owned/ok.txt'),options),'claude'),false);
});
test('changed central policy, native config, expired ownership and owner correction invalidate admission', () => {
  for(const mutation of ['policy','config','close','goal']) {
    const f=fixture('claude'),p=payload('claude',f.cwd);
    assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
    if(mutation==='policy') fs.appendFileSync(path.join(f.policyRoot,'AGENTS.md'),'owner correction\n');
    if(mutation==='config') {const b=JSON.parse(fs.readFileSync(f.options.configFile));fs.appendFileSync(path.join(f.cwd,b.nativeConfig),' ');}
    if(mutation==='close') execute('close',{cwd:f.cwd,sessionId:f.session});
    if(mutation==='goal') {const g=path.join(f.cwd,'.ecc/goal/active-goal.yaml');const v=JSON.parse(fs.readFileSync(g));v.current_priority='Corrected';fs.writeFileSync(g,JSON.stringify(v));}
    assert.equal(allowed(run('claude','pre',p,f.options),'claude'),false,mutation);
  }
});
test('unknown/missing bindings and malformed input fail closed without changing global configuration', () => {
  for(const runtime of SUPPORTED) {
    const r=run(runtime,'pre',{}, {cwd:temp,sessionId:'missing'}); assert.equal(allowed(r,runtime),false);
  }
  const ids=require('../../manifests/instruction-adapters.json').adapters.map(x=>x.id);
  for(const id of ids.filter(x=>!SUPPORTED.includes(x))) assert.throws(()=>configuration(id),/No verified native/);
  assert.equal(configuration('gemini').hooks.BeforeTool[0].hooks[0].timeout,10000);
  assert.match(JSON.stringify(configuration('codex')),/SessionStart/);
});
test('new managed sessions pin the selected workflow and expose actual task context; Codex enables hooks per launch only',()=>{
  const f=fixture('codex'),binding=JSON.parse(fs.readFileSync(f.options.configFile));
  assert.ok(f.plan.args.includes('features.hooks=true'));assert.ok(binding.taskRoute.policySha256);assert.ok(binding.catalogSha256);
  const r=run('codex','startup',{session_id:'fresh-native',cwd:f.cwd},f.options);assert.equal(r.exit,0);assert.match(r.output.hookSpecificOutput.additionalContext,/ECC task routing/);
  binding.taskRoute.risk='low';fs.writeFileSync(f.options.configFile,JSON.stringify(binding));
  assert.equal(allowed(run('codex','pre',payload('codex',f.cwd),f.options),'codex'),false);
});
for(const runtime of SUPPORTED) test(runtime+': real hook subprocess denies outside execution without native model inference',()=>{
  const f=fixture(runtime),hook=path.join(testedRoot,'scripts/hooks/fresh-session-guard.js');
  const r=spawnSync(process.execPath,[hook,runtime,'pre'],{cwd:f.cwd,env:{...process.env,...f.plan.environment},input:JSON.stringify(payload(runtime,f.cwd,'outside.txt')),encoding:'utf8',windowsHide:true});
  assert.notEqual(r.status,1);assert.equal(allowed({exit:r.status,output:r.stdout?JSON.parse(r.stdout):null},runtime),false);assert.equal(fs.existsSync(path.join(f.cwd,'outside.txt')),false);
});
test('prepared launch refuses reuse, trust/permission bypass, changed argv and unowned config writes', () => {
  const f=fixture('claude');
  assert.throws(()=>prepare(f.plan.manifest),/must be absent/);
  assert.throws(()=>prepare({...f.plan.manifest,args:['--dangerously-skip-permissions']}),/bypass/);
  assert.throws(()=>prepare({...f.plan.manifest,args:['--bare']}),/bypass/);
  for(const flag of ['--safe-mode','--safe-mode=true']) assert.throws(()=>prepare({...f.plan.manifest,args:[flag]}),/bypass/);
  assert.throws(()=>launch({...f.plan,args:['--dangerously-skip-permissions']}),/arguments changed/);
  assert.throws(()=>launch({...f.plan,environment:{...f.plan.environment,ECC_FRESH_SESSION_REQUIRED:'0'}}),/binding mismatch/);
  assert.throws(()=>launch({...f.plan,environment:{...f.plan.environment,CLAUDE_CODE_SIMPLE:'1'}}),/binding mismatch/);
  const simpleBefore=process.env.CLAUDE_CODE_SIMPLE;
  try { process.env.CLAUDE_CODE_SIMPLE='1';assert.throws(()=>launch(f.plan),/simple mode disables required hooks/); }
  finally { if(simpleBefore===undefined)delete process.env.CLAUDE_CODE_SIMPLE;else process.env.CLAUDE_CODE_SIMPLE=simpleBefore; }
  const safeBefore=process.env.CLAUDE_CODE_SAFE_MODE;
  try {
    for(const value of ['1','true','unexpected']) {
      process.env.CLAUDE_CODE_SAFE_MODE=value;
      assert.throws(()=>launch(f.plan),/safe mode disables required hooks/);
    }
  } finally { if(safeBefore===undefined)delete process.env.CLAUDE_CODE_SAFE_MODE;else process.env.CLAUDE_CODE_SAFE_MODE=safeBefore; }
  assert.equal(run('claude','startup',{session_id:'fresh-native',cwd:f.cwd},f.options).exit,0);
  assert.throws(()=>prepare(f.plan.manifest),/existing bindings/);
});

test('Codex launch denies failed native trust and rechecks owner, goal and configuration after observation', async () => {
  const helper = require(path.join(testedRoot, 'scripts/lib/codex-hook-readiness.js'));
  const resources = require(path.join(testedRoot, 'scripts/lib/fresh-launch-reservation.js'));
  const original = helper.inspectCodexHooks;
  const originalBootstrap = resources.containedBootstrap, originalReservation = resources.createReservation;
  // Exercise the post-Job entrypoint, not a native Windows launch on Linux.
  // Only the OS boundary is synthetic; real owner/goal/config validation remains.
  // A spawn trap proves every negative case stops before any actual process.
  const file = path.join(testedRoot, 'scripts/fresh-agent-session.js');
  const nativeRequire = require('node:module').createRequire(file);
  const childProcess = require('node:child_process');
  const processFixture = { ...process, env: { ...process.env } };
  const isolated = { exports: {} };
  let currentPlan, spawns = 0, discoveries = 0;
  require('node:vm').runInNewContext(fs.readFileSync(file, 'utf8'), {
    require: id => id === 'node:child_process' || id === 'child_process'
      ? { ...childProcess, spawn: () => { spawns++; throw Error('synthetic spawn trap'); } }
      : nativeRequire(id),
    module: isolated, exports: isolated.exports, process: processFixture,
    __dirname: path.dirname(file), __filename: file, console, Buffer,
  }, { filename: file });
  const contained = plan => {
    processFixture.env.ECC_FRESH_LAUNCH_PLAN = JSON.stringify(plan);
    return isolated.exports.main(['contained']);
  };
  try {
    resources.containedBootstrap = plan => { currentPlan = plan; return { claim: {} }; };
    resources.createReservation = ({ authority }) => ({ recheck: () => authority() });
    const denied = fixture('codex');
    if (process.platform !== 'win32') assert.throws(() => launch(denied.plan), /verified Windows Job lifecycle/);
    helper.inspectCodexHooks = async () => { discoveries++; throw Error('Native guard untrusted'); };
    await assert.rejects(() => contained(denied.plan), /untrusted/);
    for (const change of ['owner', 'goal', 'config', 'config-bytes', 'manifest']) {
      const f = fixture('codex');
      // Synthetic successful metadata only; mutation must still prevent spawn.
      helper.inspectCodexHooks = async () => {
        discoveries++;
        if (change === 'owner') execute('close', { cwd:f.cwd, sessionId:f.session });
        if (change === 'goal') { const goal = JSON.parse(fs.readFileSync(f.selectedGoal)); goal.current_priority = 'Owner changed during probe'; fs.writeFileSync(f.selectedGoal, JSON.stringify(goal)); }
        if (change === 'config') { const b = JSON.parse(fs.readFileSync(f.options.configFile)); fs.writeFileSync(path.join(f.cwd,b.nativeConfig), '{}'); }
        if (change === 'config-bytes') { const b = JSON.parse(fs.readFileSync(f.options.configFile)); fs.appendFileSync(path.join(f.cwd,b.nativeConfig), ' '); }
        if (change === 'manifest') { currentPlan.manifest.args = ['--version']; currentPlan.args[currentPlan.args.length-1] = '--version'; }
        return { ready:true };
      };
      await assert.rejects(() => contained(f.plan), /closed|goal reference mismatch|hook config changed|binding changed/);
    }
    assert.equal(discoveries, 6); assert.equal(spawns, 0);
    // Valid metadata reaches the trapped launch; this is not a deny-everything test.
    helper.inspectCodexHooks = async () => ({ ready: true });
    await assert.rejects(() => contained(fixture('codex').plan), /synthetic spawn trap/);
    assert.equal(spawns, 1);
  } finally {
    helper.inspectCodexHooks = original;
    resources.containedBootstrap = originalBootstrap; resources.createReservation = originalReservation;
  }
});

test('managed Codex arguments reject attached config/workspace overrides, alternate profiles and feature changes', () => {
  const f = fixture('codex');
  for (const flag of ['-cfeatures.hooks=false', '-Coutside', '-rretired', '-woutside', '-y', '-pother', '--profile=other', '--enable=plugins', '--cd=outside']) {
    assert.throws(() => prepare({ ...f.plan.manifest, args:[flag] }), /arguments required/);
  }
  assert.throws(() => launch({ ...f.plan, manifest:{ ...f.plan.manifest, args:['-cfeatures.hooks=false'] } }), /arguments required/);
  assert.throws(() => launch({ ...f.plan, executable:path.resolve(__filename), manifest:{ ...f.plan.manifest, executable:path.resolve(__filename) } }), /executable\/argument binding changed/);
});

test('private fresh-session state and scope-guard logs stay local without hiding code or handoffs', () => {
  for (const file of ['.ecc/fresh-session/fixture/binding.json', '.ecc/fresh-session/fixture/hooks.json', 'artifacts/agent-runs/scope-guard/fixture.jsonl']) {
    const r = spawnSync('git', ['check-ignore', '--no-index', '--', file], { cwd:testedRoot, encoding:'utf8', windowsHide:true });
    assert.equal(r.status, 0, `Runtime metadata must not dirty the release checkout: ${file}`);
  }
  for (const file of ['scripts/hooks/fresh-session-guard.js', '.ecc/source.js', '.ecc/handoff.json', 'artifacts/agent-runs/scope-guard-source.js']) {
    const r = spawnSync('git', ['check-ignore', '--no-index', '--', file], { cwd:testedRoot, encoding:'utf8', windowsHide:true });
    assert.equal(r.status, 1, `Source or handoff must remain visible: ${file}`);
  }
});
test('OpenCode actual plugin callback automatically preflights and throws before outside execution; unmanaged processes unchanged', async () => {
  const plugin=await import(pathToFileURL(path.join(testedRoot,'.opencode/plugins/ecc-fresh-session-guard.mjs')).href);
  const keys=['ECC_FRESH_SESSION_REQUIRED','ECC_FRESH_GUARD_ROOT','ECC_CORE_POLICY_ROOT','ECC_FRESH_SESSION_CONFIG','ECC_SESSION_ID','ECC_OWNED_WORKTREE'];
  const saved=Object.fromEntries(keys.map(k=>[k,process.env[k]]));
  try {
    delete process.env.ECC_FRESH_SESSION_REQUIRED;
    assert.deepEqual(await plugin.ECCFreshSessionGuard({directory:temp}),{});
    const f=fixture('opencode'); Object.assign(process.env,f.plan.environment);
    const hooks=await plugin.ECCFreshSessionGuard({directory:f.cwd});
    await hooks.event({event:{type:'session.created',properties:{info:{id:'fresh-native'}}}});
    const cb=hooks['tool.execute.before'];
    await cb({tool:'write',sessionID:'fresh-native'},{args:{filePath:'owned/ok.txt'}});
    await assert.rejects(cb({tool:'write',sessionID:'fresh-native'},{args:{filePath:'outside.txt'}}),/denied/);
    await assert.rejects(cb({tool:'bash',sessionID:'fresh-native'},{args:{command:'echo unsafe'}}),/denied/);
    assert.equal(fs.existsSync(path.join(f.cwd,'outside.txt')),false);
  } finally {for(const k of keys){if(saved[k]===undefined)delete process.env[k];else process.env[k]=saved[k];}}
});
test('a real hook subprocess preserves native JSON denial and auto-starts without a model call', () => {
  const f=fixture('claude');
  const hook=path.join(testedRoot,'scripts/hooks/fresh-session-guard.js');
  const invoke=file=>spawnSync(process.execPath,[hook,'claude','pre'],{cwd:f.cwd,env:{...process.env,...f.plan.environment},
    input:JSON.stringify(payload('claude',f.cwd,file)),encoding:'utf8',windowsHide:true});
  const good=invoke('owned/ok.txt');assert.equal(good.status,0,good.stderr);assert.equal(good.stdout,'');
  const bad=invoke('outside.txt');assert.equal(bad.status,0,bad.stderr);
  assert.equal(JSON.parse(bad.stdout).hookSpecificOutput.permissionDecision,'deny');
});
test('missing or invalid engine dependencies emit native denials, never a fail-open exit 1', () => {
  const broken=path.join(temp,'broken-engine');
  fs.mkdirSync(path.join(broken,'scripts/hooks'),{recursive:true});
  fs.mkdirSync(path.join(broken,'scripts/lib'),{recursive:true});
  const hook=path.join(broken,'scripts/hooks/fresh-session-guard.js');
  fs.copyFileSync(path.join(testedRoot,'scripts/hooks/fresh-session-guard.js'),hook);
  fs.writeFileSync(path.join(broken,'scripts/lib/fresh-session-guard.js'),"throw Error('unavailable verified engine');\n");
  for(const runtime of ['claude','codex','gemini','antigravity','opencode','unsupported']) {
    const r=spawnSync(process.execPath,[hook,runtime,'pre'],{input:'{}',encoding:'utf8',windowsHide:true});
    assert.notEqual(r.status,1,runtime);
    if(['opencode','unsupported'].includes(runtime)) assert.equal(r.status,2);
    else {assert.equal(r.status,0);const d=JSON.parse(r.stdout);assert.equal(runtime==='claude'||runtime==='codex'?d.hookSpecificOutput.permissionDecision:d.decision,'deny');}
  }
});

for(const runtime of SUPPORTED) test(runtime+': central primary layout accepted; later wrong branch denied before tool execution',()=>{
  const f=fixture(runtime,true),p=payload(runtime,f.cwd);
  assert.equal(workspaceBoundary(f.cwd,f.policyRoot).branch,'seabridge_development');
  assert.equal(allowed(run(runtime,'pre',p,f.options),runtime),true);
  const changed=spawnSync('git',['branch','-m','unapproved-fixture'],{cwd:f.cwd,encoding:'utf8',windowsHide:true});
  assert.equal(changed.status,0,changed.stderr);
  assert.throws(()=>workspaceBoundary(f.cwd,f.policyRoot),/approved primary branch/);
  assert.equal(allowed(run(runtime,'pre',p,f.options),runtime),false);
  assert.equal(fs.existsSync(path.join(f.cwd,'owned/ok.txt')),false);
});

test('central workspace declaration rejects outside or extra checkouts and malformed declarations without moving files',()=>{
  const f=fixture('claude',true),outside=fixture('claude');
  assert.throws(()=>workspaceBoundary(outside.cwd,f.policyRoot),/approved primary checkout/);
  fs.writeFileSync(path.join(f.policyRoot,'AGENTS_SYSTEM.md'),'SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\nCode: relative only; one active checkout/repo.\n');
  assert.throws(()=>workspaceBoundary(f.cwd,f.policyRoot),/Absolute central code workspace/);
  fs.writeFileSync(path.join(f.policyRoot,'AGENTS_SYSTEM.md'),'SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\nCode: invalid declaration\n');
  assert.throws(()=>workspaceBoundary(f.cwd,f.policyRoot),/Malformed central workspace/);
});

test('compacted central workspace declaration keeps the primary checkout fence active',()=>{
  const f=fixture('claude',true),system=path.join(f.policyRoot,'AGENTS_SYSTEM.md');
  const workspace=path.dirname(f.cwd);
  fs.writeFileSync(system,`SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\nCode ${workspace} only, one active checkout/repo; E: Docker only;\n`);
  assert.equal(workspaceBoundary(f.cwd,f.policyRoot).branch,'seabridge_development');
  fs.writeFileSync(system,'SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\nCode malformed compact declaration\n');
  assert.throws(()=>workspaceBoundary(f.cwd,f.policyRoot),/Malformed central workspace/);
});

test('current primary grammar and standing detached slots preserve normal-branch and registered-root fences',()=>{
  const f=fixture('claude',true),system=path.join(f.policyRoot,'AGENTS_SYSTEM.md'),workspace=path.dirname(f.cwd);
  // Snapshot the reviewed standing rule: hosted CI must not read an owner's home.
  // Actual installed-policy loading is checked separately by the local audit.
  const standing="Standing owner approval (2026-10-14): detached release/integration worktrees at `C:/Users/adelm/SeaBridgeAI/.worktrees/<session>-<purpose>-<date>` from the origin normal branch, carrying only session-owned commits; reuse one registered slot/repo, not per worker; no clone/takeover. Once committed and pushed, the work must land in that repo's normal branch above (push/merge, no side branches), then remove the worktree. Remove any unused worktree only when clean, fully published and free of runtime/session bindings. Reuse named commit/push/merge authority; normal release/cost/hooks gates remain. New branches, other worktree locations (E:, home, repo subfolders) and anything else still need Alejandro's explicit path/name/reason; autonomy isn't approval.";
  fs.writeFileSync(system,`SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\nCode ${workspace} only, one primary checkout/repo plus rule 3's slot; E: Docker only;\n${standing}\n`);
  assert.equal(workspaceBoundary(f.cwd,f.policyRoot).branch,'seabridge_development');
  const git=args=>{const r=spawnSync('git',args,{cwd:f.cwd,encoding:'utf8',windowsHide:true});assert.equal(r.status,0,r.stderr);return r.stdout;};
  git(['update-ref','refs/remotes/origin/seabridge_development','HEAD']);
  const slot=path.join(workspace,'.worktrees','fixture-integration-20261015');
  git(['worktree','add','--detach',slot,'HEAD']);
  assert.equal(workspaceBoundary(slot,f.policyRoot).detached,true);
  const branch=spawnSync('git',['switch','-c','fixture-side-branch'],{cwd:slot,encoding:'utf8',windowsHide:true});assert.equal(branch.status,0,branch.stderr);
  assert.throws(()=>workspaceBoundary(slot,f.policyRoot),/stay detached/);
  fs.writeFileSync(system,`SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\nCode ${workspace} only, one primary checkout/repo plus rule 3's slot;\n`);
  assert.throws(()=>workspaceBoundary(slot,f.policyRoot),/approved registered/);
});

test('fresh artifact-only implementation scope passes positive preflight without broadening writes',()=>{
  const f=fixture('claude');execute('close',{cwd:f.cwd,sessionId:f.session});
  const session=f.session+'-artifact',target='artifacts/agent-runs/native-test/allowed.txt';
  execute('register',{cwd:f.cwd,sessionId:session,scopes:['.ecc/fresh-session/'+session,target],objective:'Exact owned artifact output',doneWhen:'Positive and outside negative',ttl:30});
  const plan=prepare({...f.plan.manifest,session});
  const options={...f.options,sessionId:session,configFile:plan.environment.ECC_FRESH_SESSION_CONFIG};
  const p=payload('claude',f.cwd,target);
  assert.equal(preflight({...options,runtime:'claude',payload:p}).status,'passed');
  assert.equal(allowed(run('claude','pre',p,options),'claude'),true);
  assert.equal(allowed(run('claude','pre',payload('claude',f.cwd,'artifacts/agent-runs/native-test/outside.txt'),options),'claude'),false);
  assert.equal(fs.existsSync(path.join(f.cwd,target)),false,'preflight itself executes no write');
});

test('named goal CLI and runtime admission bind sibling ledgers and retain explicit overrides',()=>{
  const f=fixture('claude',false,'.ecc/goal/named/active-goal.yaml');
  const directory=path.dirname(f.selectedGoal),outcomes=path.join(directory,'outcomes.jsonl');
  const bridge=path.join(testedRoot,'scripts/goal-runtime-bridge.js');
  const admit=()=>spawnSync(process.execPath,[bridge,'admit','--runtime','claude','--mode','controlled',
    '--goal',f.selectedGoal,'--session',f.session],{cwd:f.cwd,encoding:'utf8',windowsHide:true});
  fs.writeFileSync(outcomes,'not-json\n');
  const rejected=admit();
  assert.equal(rejected.status,2,'must not validate another folder and silently ignore the selected outcomes');
  assert.equal(JSON.parse(rejected.stdout).admitted,false);
  assert.ok(JSON.parse(rejected.stdout).validation_error);
  fs.writeFileSync(outcomes,'');
  fs.writeFileSync(path.join(f.cwd,'.ecc/goal/outcomes.jsonl'),'unrelated-invalid-json\n');
  const accepted=admit();
  assert.equal(accepted.status,0,accepted.stderr+accepted.stdout);
  assert.equal(JSON.parse(accepted.stdout).admitted,true);
  fs.writeFileSync(path.join(directory,'resume-receipt.yaml'),'schema: wrong-resume\n');
  assert.equal(admit().status,2,'selected resume is checked, not omitted');
  const {pathsFrom}=require(path.join(testedRoot,'scripts/goal-control.js'));
  assert.equal(pathsFrom(['--goal',f.selectedGoal]).directory,directory);
  assert.equal(pathsFrom(['--goal',f.selectedGoal]).outcomes,outcomes);
  assert.equal(pathsFrom(['--goal',f.selectedGoal,'--dir','explicit']).directory,'explicit');
  assert.equal(pathsFrom([]).directory,path.join('.ecc','goal'));
});

for (const runtime of ['claude','codex']) test(runtime+': pinned synthetic inputs and schema-only writes denied before any tool side effect',()=>{
  const f=fixture(runtime);execute('close',{cwd:f.cwd,sessionId:f.session});
  const fixturePath='tests/fixtures/privacy/synthetic.json',outputPath='artifacts/agent-runs/privacy/result.json';
  fs.mkdirSync(path.dirname(path.join(f.cwd,fixturePath)),{recursive:true});
  fs.writeFileSync(path.join(f.cwd,fixturePath),'{"synthetic":true}\n');
  fs.writeFileSync(path.join(f.cwd,'private-canary.txt'),'FAKE_PRIVATE_CANARY_NEVER_REAL_CLIENT');
  const sha256=require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(f.cwd,fixturePath))).digest('hex');
  const session=f.session+'-privacy';
  execute('register',{cwd:f.cwd,sessionId:session,scopes:['artifacts/agent-runs/privacy','.ecc/fresh-session/'+session],objective:'Synthetic input fence',doneWhen:'Deny raw reads and writes',ttl:30});
  const dataPolicy={mode:'synthetic-only',fixture:{path:fixturePath,sha256},outputs:[{path:outputPath,checks:['fixture-check']}]};
  const plan=prepare({...f.plan.manifest,session,dataPolicy});
  // No native client or metadata child may see uncontained automatic context,
  // arbitrary prompt arguments or inherited stdin under a tool-only privacy fence.
  const readiness=require(path.join(testedRoot,'scripts/lib/codex-hook-readiness'));
  const original=readiness.inspectCodexHooks;
  let discoveryCalls=0;
  try {
    readiness.inspectCodexHooks=async()=>{discoveryCalls++;return {ready:true};};
    assert.throws(()=>launch(plan),/Native private-input containment is unverified/);
    assert.throws(()=>launch({...plan,privacyVerified:true}),/Native private-input containment is unverified/);
    assert.equal(discoveryCalls,0);
  } finally {readiness.inspectCodexHooks=original;}
  assert.throws(()=>execute('guard-bind',{cwd:f.cwd,sessionId:session,guardMode:'audit',dataPolicy}),/requires block mode/);
  const options={...f.options,sessionId:session,configFile:plan.environment.ECC_FRESH_SESSION_CONFIG};
  const base={session_id:'privacy-native',cwd:f.cwd};
  const event=(tool_name,tool_input)=>run(runtime,'pre',{...base,tool_name,tool_input},options);
  preflight({...options,runtime,payload:{...base,tool_name:'Read',tool_input:{file_path:fixturePath}}});
  assert.equal(allowed(event('Read',{file_path:fixturePath}),runtime),true);
  for(const [tool,args] of [
    ['Read',{file_path:'private-canary.txt'}],['Read',{file_path:fixturePath,path:'private-canary.txt'}],
    ['Glob',{pattern:'**/*'}],['Grep',{pattern:'CANARY',path:'.'}],
    ['Write',{file_path:'artifacts/agent-runs/privacy/scratchpad.txt',content:'FAKE_PRIVATE_CANARY'}],
    ['Write',{file_path:outputPath,content:'FAKE_PRIVATE_CANARY'}],
    ['Bash',{command:'type private-canary.txt'}],['mcp__filesystem__read_file',{path:'private-canary.txt'}]
  ]) assert.equal(allowed(event(tool,args),runtime),false,tool+JSON.stringify(Object.keys(args)));
  const content=require(path.join(testedRoot,'scripts/lib/goal-store')).canonicalJson({schema:'ecc.synthetic-verification.v1',fixture_sha256:sha256,checks:[{id:'fixture-check',passed:true,count:1}]});
  assert.equal(allowed(event('Write',{file_path:outputPath,content}),runtime),true);
  const patch='*** Begin Patch\n*** Add File: '+outputPath+'\n'+content.trimEnd().split('\n').map(line=>'+'+line).join('\n')+'\n*** End Patch';
  assert.equal(allowed(event('apply_patch',runtime==='codex'?{command:patch}:{input:patch}),runtime),true);
  assert.equal(allowed(event('apply_patch',{patch,input:'*** Begin Patch\n*** Add File: private-canary.txt\n+FAKE_PRIVATE_CANARY\n*** End Patch'}),runtime),false);
  fs.appendFileSync(path.join(f.cwd,fixturePath),'changed');
  assert.equal(allowed(event('Read',{file_path:fixturePath}),runtime),false);
  assert.equal(fs.existsSync(path.join(f.cwd,outputPath)),false);
  const logs=path.join(f.cwd,'artifacts/agent-runs/scope-guard');
  for(const file of fs.readdirSync(logs))assert.equal(fs.readFileSync(path.join(logs,file),'utf8').includes('FAKE_PRIVATE_CANARY'),false);
});

test('selected external artifact goal admits without a repository default and stays write protected',()=>{
  const f=fixture('claude',true,'artifacts/owned-task/active-goal.yaml');
  assert.equal(fs.existsSync(path.join(f.cwd,'.ecc/goal/active-goal.yaml')),false);
  const before=fs.readFileSync(f.selectedGoal),p=payload('claude',f.cwd);
  assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
  assert.equal(allowed(run('claude','pre',payload('claude',f.cwd,f.selectedGoal),f.options),'claude'),false);
  const saved=JSON.parse(fs.readFileSync(f.options.configFile));
  assert.deepEqual(saved.goalReference,f.plan.manifest.goalReference);
  assert.equal(saved.goalReference.file,f.plan.manifest.goalFile);
  assert.deepEqual(fs.readFileSync(f.selectedGoal),before);
  assert.equal(fs.existsSync(path.join(f.cwd,'.ecc/goal/active-goal.yaml')),false);
});

test('selected goal changes invalidate cached startup, pre, turn and final',()=>{
  for(const change of ['priority','bytes','missing']){
    const f=fixture('claude',true,'artifacts/owned-task/active-goal.yaml'),p=payload('claude',f.cwd);
    assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
    if(change==='missing')fs.unlinkSync(f.selectedGoal);
    else if(change==='bytes')fs.appendFileSync(f.selectedGoal,'\n');
    else{const goal=JSON.parse(fs.readFileSync(f.selectedGoal));goal.current_priority='Owner correction';fs.writeFileSync(f.selectedGoal,JSON.stringify(goal));}
    assert.equal(run('claude','startup',{session_id:'fresh-native',cwd:f.cwd},f.options).exit,2,change);
    assert.equal(allowed(run('claude','pre',p,f.options),'claude'),false,change);
    for(const event of ['turn','final'])assert.equal(run('claude',event,{...p,turn_id:'fresh-turn'},f.options).output?.decision,'block',change+':'+event);
  }
});

test('registered same-Git checkout reuses canonical primary goal without accepting another repository or path',()=>{
  const f=fixture('claude',true),workspace=path.dirname(f.cwd);
  const slot=path.join(workspace,'.worktrees','canonical-goal-slot');
  fs.mkdirSync(path.dirname(slot),{recursive:true});
  const added=spawnSync('git',['worktree','add','--detach',slot,'HEAD'],{cwd:f.cwd,encoding:'utf8',windowsHide:true});
  assert.equal(added.status,0,added.stderr);
  const reference=goalReference(repository(slot),f.selectedGoal,workspace);
  const expected=fs.realpathSync.native(f.selectedGoal);
  assert.equal(reference.file,process.platform==='win32'?expected.toLowerCase():expected);
  const other=path.join(f.cwd,'not-canonical-goal.yaml');
  fs.copyFileSync(f.selectedGoal,other);
  assert.throws(()=>goalReference(repository(slot),other,workspace));
  const foreign=fixture('claude');
  assert.throws(()=>goalReference(repository(slot),foreign.selectedGoal,workspace));
});

test('goal references reject invalid paths, documents and generic-project external goals',()=>{
  const f=fixture('claude',true,'artifacts/owned-task/active-goal.yaml');
  const repo=repository(f.cwd),workspace=workspaceBoundary(f.cwd,f.policyRoot).workspace;
  const foreign=fixture('claude');
  const missing=path.join(workspace,'artifacts/missing.yaml');
  for(const file of [missing,path.join(workspace,'artifacts'),f.selectedGoal+'/../active-goal.yaml',
      f.selectedGoal+':stream',f.selectedGoal+'.',f.selectedGoal+' ',foreign.selectedGoal]){
    assert.throws(()=>goalReference(repo,file,workspace),undefined,file);
  }
  assert.throws(()=>goalReference(repository(foreign.cwd),f.selectedGoal),/outside repository/);
  const invalid=path.join(workspace,'artifacts/invalid.yaml');
  fs.writeFileSync(invalid,'{}');
  assert.throws(()=>goalReference(repo,invalid,workspace),/invalid scope guard goal/);
  fs.writeFileSync(invalid,' '.repeat(256*1024+1));
  assert.throws(()=>goalReference(repo,invalid,workspace),/bounded regular/);
  if(process.platform==='win32'){
    assert.throws(()=>goalReference(repo,'\\\\?\\'+f.selectedGoal,workspace));
    assert.throws(()=>goalReference(repo,'\\\\.\\'+f.selectedGoal,workspace));
  }
});

test('selected artifact goal rejects linked ancestors on admission and cached startup',()=>{
  const f=fixture('claude',true,'artifacts/owned-task/active-goal.yaml'),p=payload('claude',f.cwd);
  assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
  const directory=path.dirname(f.selectedGoal),moved=directory+'-retained';
  fs.renameSync(directory,moved);
  fs.symlinkSync(moved,directory,process.platform==='win32'?'junction':'dir');
  assert.throws(()=>goalReference(repository(f.cwd),f.selectedGoal,path.dirname(f.cwd)),/linked path/);
  assert.equal(run('claude','startup',{session_id:'fresh-native',cwd:f.cwd},f.options).exit,2);
});

test('manifest or persisted goal substitution is rejected before launch or cached admission',()=>{
  const f=fixture('claude',true,'artifacts/owned-task/active-goal.yaml'),p=payload('claude',f.cwd);
  assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
  const other=path.join(path.dirname(f.selectedGoal),'other-goal.yaml');
  fs.copyFileSync(f.selectedGoal,other);
  assert.throws(()=>launch({...f.plan,manifest:{...f.plan.manifest,goalFile:other}}),/goal reference mismatch/);
  const binding=JSON.parse(fs.readFileSync(f.options.configFile));
  binding.goalReference=goalReference(repository(f.cwd),other,path.dirname(f.cwd));
  fs.writeFileSync(f.options.configFile,JSON.stringify(binding));
  assert.equal(run('claude','startup',{session_id:'fresh-native',cwd:f.cwd},f.options).exit,2);
});

test('repository-local selected goal remains protected inside registered scopes',()=>{
  const f=fixture('claude',false,'selected-goal.yaml'),p=payload('claude',f.cwd);
  assert.equal(allowed(run('claude','pre',p,f.options),'claude'),true);
  assert.equal(allowed(run('claude','pre',payload('claude',f.cwd,f.selectedGoal),f.options),'claude'),false);
});

test('stripped references and unbound version downgrade cannot replace the selected goal',()=>{
  const f=fixture('claude',true,'artifacts/owned-task/active-goal.yaml');
  const binding=JSON.parse(fs.readFileSync(f.options.configFile));
  const manifest={...f.plan.manifest};delete manifest.goalFile;delete manifest.goalReference;
  delete binding.goalReference;
  fs.writeFileSync(f.options.configFile,JSON.stringify(binding));
  assert.throws(()=>launch({...f.plan,manifest}),/goal reference required/);
  assert.equal(run('claude','startup',{session_id:'fresh-native',cwd:f.cwd},f.options).exit,2);
  binding.version=1;fs.writeFileSync(f.options.configFile,JSON.stringify(binding));
  assert.throws(()=>launch({...f.plan,version:1,manifest}),/version 2/);
  assert.equal(run('claude','startup',{session_id:'fresh-native',cwd:f.cwd},f.options).exit,2);
  assert.equal(execute('status',{cwd:f.cwd}).sessions.find(s=>s.id===f.session).guard,undefined);
});

test('goal identity replacement during open or parse and in-place parse mutation fail closed',()=>{
  for(const stage of ['open-replace','parse-replace','parse-mutate']){
    const f=fixture('claude',true,'artifacts/owned-task/active-goal.yaml');
    const original=fs.readFileSync(f.selectedGoal),repo=repository(f.cwd),workspace=path.dirname(f.cwd);
    const originalOpen=fs.openSync,yaml=require('js-yaml'),originalParse=yaml.load;
    let changed=false;
    const mutate=()=>{
      changed=true;
      if(stage==='parse-mutate')fs.appendFileSync(f.selectedGoal,'\n');
      else{fs.renameSync(f.selectedGoal,f.selectedGoal+'.retained');fs.writeFileSync(f.selectedGoal,original);}
    };
    try{
      if(stage==='open-replace')fs.openSync=function(file,...args){
        if(!changed&&path.resolve(String(file)).toLowerCase()===f.selectedGoal.toLowerCase())mutate();
        return originalOpen.call(this,file,...args);
      };
      else yaml.load=function(...args){const parsed=originalParse.apply(this,args);if(!changed)mutate();return parsed;};
      assert.throws(()=>goalReference(repo,f.selectedGoal,workspace),/goal identity changed/);
      assert.equal(changed,true,stage);
    }finally{fs.openSync=originalOpen;yaml.load=originalParse;}
  }
});

test('serialized primary handoff binds distinct task goals without a shared default or cross-invalidation',()=>{
  const f=fixture('claude',true,'artifacts/first/active-goal.yaml');
  execute('close',{cwd:f.cwd,sessionId:f.session});
  const goalFiles=[f.selectedGoal,path.join(path.dirname(f.cwd),'artifacts/second/active-goal.yaml')];
  const owners=['task-first','task-second'],options=[];
  for(let i=0;i<owners.length;i++){
    if(i>0)execute('close',{cwd:f.cwd,sessionId:owners[i-1]}); // One primary integration writer; no gate relaxation.
    const goal=JSON.parse(fs.readFileSync(f.selectedGoal));goal.goal_id=owners[i];
    fs.mkdirSync(path.dirname(goalFiles[i]),{recursive:true});fs.writeFileSync(goalFiles[i],JSON.stringify(goal));
    execute('register',{cwd:f.cwd,sessionId:owners[i],scopes:['owned/'+owners[i],'.ecc/fresh-session/'+owners[i]],
      objective:'Own task only',doneWhen:'Distinct goal respected',ttl:30});
    const prepared=prepare({...f.plan.manifest,session:owners[i],goalFile:goalFiles[i]});
    const current={cwd:f.cwd,sessionId:owners[i],policyRoot:f.policyRoot,configFile:prepared.environment.ECC_FRESH_SESSION_CONFIG};
    options.push(current);
    assert.equal(allowed(run('claude','pre',payload('claude',f.cwd,'owned/'+owners[i]+'/ok.txt',owners[i]),current),'claude'),true);
  }
  const registry=execute('status',{cwd:f.cwd});
  for(const owner of owners)assert.equal(registry.sessions.find(s=>s.id===owner).guard.goalId,owner);
  const corrected=JSON.parse(fs.readFileSync(goalFiles[0]));corrected.current_priority='First task owner correction';
  fs.writeFileSync(goalFiles[0],JSON.stringify(corrected));
  assert.equal(run('claude','startup',{session_id:owners[0],cwd:f.cwd},options[0]).exit,2);
  assert.equal(allowed(run('claude','pre',payload('claude',f.cwd,'owned/'+owners[1]+'/ok.txt',owners[1]),options[1]),'claude'),true);
  assert.equal(fs.existsSync(path.join(f.cwd,'.ecc/goal/active-goal.yaml')),false);
});
