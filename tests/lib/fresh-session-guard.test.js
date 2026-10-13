'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const { test, after } = require('node:test');
const testedRoot = process.env.ECC_PREFLIGHT_TEST_ROOT || path.resolve(__dirname,'../..');
const { prepare, configuration, launch } = require(path.join(testedRoot,'scripts/fresh-agent-session.js'));
const { run } = require(path.join(testedRoot,'scripts/hooks/fresh-session-guard.js'));
const { preflight, SUPPORTED, execute, workspaceBoundary } = require(path.join(testedRoot,'scripts/lib/fresh-session-guard.js'));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-fresh-preflight-'));
let count = 0;
after(() => fs.rmSync(temp, { recursive: true, force: true }));
function fixture(runtime, centralLayout = false) {
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
  fs.mkdirSync(path.join(cwd,'.ecc/goal'), { recursive: true });
  fs.writeFileSync(path.join(cwd,'.ecc/goal/active-goal.yaml'),JSON.stringify(goal));
  const policyRoot = path.join(cwd,'policy'); fs.mkdirSync(policyRoot);
  for (const name of ['AGENTS.md','AGENTS_SYSTEM.md','CLAUDE.md']) fs.writeFileSync(path.join(policyRoot,name),'SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n');
  if(centralLayout) fs.appendFileSync(path.join(policyRoot,'AGENTS_SYSTEM.md'),`Code: ${box} only; one active checkout/repo. E: Docker only.\n`);
  fs.writeFileSync(path.join(cwd,'.gitignore'),'.ecc/\n');
  const addPolicy=spawnSync('git',['add','.gitignore','policy'],{cwd,encoding:'utf8',windowsHide:true});assert.equal(addPolicy.status,0,addPolicy.stderr);
  const commitPolicy=spawnSync('git',['commit','-m','fixture policy baseline'],{cwd,encoding:'utf8',windowsHide:true});assert.equal(commitPolicy.status,0,commitPolicy.stderr);
  const session = 'fresh-' + count;
  execute('register',{cwd,sessionId:session,scopes:['owned','.ecc/fresh-session','.agents/hooks.json'],objective:'Preflight',doneWhen:'Checked',ttl:30});
  const plan = prepare({runtime,session,cwd,policyRoot,executable:process.execPath,args:['--help'],toolLimit:40,turnLimit:10});
  return {cwd,session,policyRoot,plan,options:{cwd,sessionId:session,policyRoot,configFile:plan.environment.ECC_FRESH_SESSION_CONFIG}};
}
function payload(runtime,cwd,file='owned/ok.txt',nativeId='fresh-native') {
  if (runtime==='antigravity') return {conversationId:nativeId,workspacePaths:[cwd],toolCall:{name:'write_to_file',args:{TargetFile:file}}};
  return {session_id:nativeId,cwd,tool_name:runtime==='opencode'?'write':runtime==='gemini'?'write_file':'Write',
    tool_input:runtime==='opencode'?{filePath:file,content:'LOCAL_ALLOWED'}:{file_path:file,content:'LOCAL_ALLOWED'}};
}
function allowed(result,runtime) {
  return runtime==='antigravity' ? result.output?.decision==='allow' : result.exit===0 && !result.output;
}
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
test('managed admission retains the inherited foreign-change refusal',()=>{
  const f=fixture('claude');execute('close',{cwd:f.cwd,sessionId:f.session});
  fs.writeFileSync(path.join(f.cwd,'foreign.txt'),'OTHER_OWNER_DRAFT');
  const session=f.session+'-foreign';execute('register',{cwd:f.cwd,sessionId:session,scopes:['owned','.ecc/fresh-session'],objective:'Guard inherited draft',doneWhen:'Refused',ttl:30});
  const plan=prepare({...f.plan.manifest,session});const options={...f.options,sessionId:session,configFile:plan.environment.ECC_FRESH_SESSION_CONFIG};
  assert.throws(()=>preflight({...options,runtime:'claude',payload:payload('claude',f.cwd)}),/inherited foreign/);
  assert.equal(fs.readFileSync(path.join(f.cwd,'foreign.txt'),'utf8'),'OTHER_OWNER_DRAFT');
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
  assert.throws(()=>launch({...f.plan,args:['--dangerously-skip-permissions']}),/arguments changed/);
  assert.throws(()=>launch({...f.plan,environment:{...f.plan.environment,ECC_FRESH_SESSION_REQUIRED:'0'}}),/binding mismatch/);
  assert.equal(run('claude','startup',{session_id:'fresh-native',cwd:f.cwd},f.options).exit,0);
  assert.throws(()=>prepare(f.plan.manifest),/existing bindings/);
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
