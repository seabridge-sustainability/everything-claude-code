'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const adapter = require('../../scripts/hooks/hermes-scope-guard');
const coordination = require('../../scripts/lib/session-coordination');
const entry = path.resolve(__dirname, '../../scripts/hooks/hermes-scope-guard.js');

function fixture(t, { toolLimit = 8 } = {}) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-hermes-guard-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  const git = (...args) => {
    const result = spawnSync('git', args, { cwd, encoding: 'utf8', windowsHide: true });
    assert.equal(result.status, 0, result.stderr);
  };
  git('init', '--initial-branch=fixture');
  git('config', 'user.name', 'ECC Fixture'); git('config', 'user.email', 'fixture@example.invalid');
  fs.writeFileSync(path.join(cwd, '.gitignore'), '.ecc/\nartifacts/\n');
  fs.writeFileSync(path.join(cwd, 'README.md'), 'protected fixture\n');
  git('add', '.gitignore', 'README.md');
  git('-c', 'core.hooksPath=', 'commit', '-m', 'fixture');
  const now = new Date().toISOString(), goalFile = path.join(cwd, '.ecc/goal/active-goal.yaml');
  const goal = { schema: 'ecc.active-goal.v1', goal_id: 'hermes-fixture', mode: 'controlled', proof_profile: 'security',
    objective: 'Verify native Hermes boundary', current_priority: 'Owned output', non_goals: [],
    user_visible_proofs: [{id:'required',description:'Guard proof',lane_id:'guard',required_stage:'authentic_input_processed',
      required_evidence_kinds:['test','runtime'],required_repositories:['fixture'],allowed_result_classes:['other'],
      acceptance_predicate:'Boundary rejects unauthorized calls',requires_authentic:false,requires_user_visible:false,subject_scope:null,required:true}],
    lanes:[{id:'guard',description:'Guard',status:'active',blocker:null,next_action:'Probe'}], owner_corrections:[],
    forecast:{state:'not_set',confidence:'none',basis:null,critical_path:[],likely_hours:null,next_checkpoint_at:null,
      checkpoint_started_at:null,checkpoint_proof_id:null,updated_at:now},status:'active',updated_at:now};
  fs.mkdirSync(path.dirname(goalFile), { recursive:true }); fs.writeFileSync(goalFile, JSON.stringify(goal));
  coordination.execute('register', {cwd, sessionId:'hermes-owner', scopes:['owned','artifacts/agent-runs/scope-guard'],
    objective:'Own one output',doneWhen:'Boundary verified',ttl:30});
  coordination.execute('guard-bind', {cwd,sessionId:'hermes-owner',nativeSessionId:'native-hermes-one',guardMode:'block',
    goalReference:coordination.goalReference(coordination.repository(cwd),goalFile),
    deadline:new Date(Date.now()+600000).toISOString(),toolLimit,turnLimit:4,protectedPaths:['README.md']});
  const options = {cwd,sessionId:'hermes-owner',goalFile,sourceSha256:adapter.sourceHash()};
  const payload = {hook_event_name:'pre_tool_call',session_id:'native-hermes-one',cwd,tool_name:'write_file',
    tool_input:{path:'owned/result.txt',content:'fixture output'}};
  return {cwd,goalFile,goal,payload,options,tools:()=>coordination.checkSession({cwd,sessionId:'hermes-owner'}).guard.tools};
}

test('Hermes maps exact native file tools and keeps ambiguous or execution calls opaque', () => {
  const packet = {hook_event_name:'pre_tool_call',session_id:'native',cwd:path.resolve('.'),tool_name:'patch',
    tool_input:{mode:'replace',path:'owned.txt',old_string:'before',new_string:'after'}};
  assert.equal(adapter.normalize(packet).tool_name, 'Edit');
  assert.equal(adapter.normalize({...packet,tool_name:'read_file'}).tool_name, 'Read');
  for (const delta of [
    {tool_name:'terminal',tool_input:{command:'PRIVATE-COMMAND'}},
    {tool_name:'Write'}, {tool_name:'apply_patch'},
    {tool_input:{...packet.tool_input,mode:'patch',patch:'PRIVATE-PATCH'}},
    {tool_input:{...packet.tool_input,file_path:'other.txt'}},
    {tool_input:{...packet.tool_input,paths:['other.txt']}},
    {tool_input:null},
  ]) assert.equal(adapter.normalize({...packet,...delta}).tool_name, 'HermesUnreviewedTool');
  assert.throws(()=>adapter.normalize({...packet,hook_event_name:'pre_verify'}),/pre-tool/);
});

test('actual controller allows owned native output, charges denied calls and exhausts cumulative budget', t => {
  const f = fixture(t,{toolLimit:3});
  assert.deepEqual(adapter.run(f.payload,f.options),{output:{},exit:0});
  assert.equal(f.tools(),1);
  const opaque = adapter.run({...f.payload,tool_name:'terminal',tool_input:{command:'PRIVATE-COMMAND'}},f.options);
  assert.equal(opaque.exit,2);assert.equal(opaque.output.action,'block');assert.equal(f.tools(),2);
  assert.ok(!JSON.stringify(opaque).includes('PRIVATE-COMMAND'));
  assert.equal(adapter.run({...f.payload,tool_input:{path:'../outside.txt',content:'private'}},f.options).exit,2);
  assert.equal(f.tools(),3);
  assert.equal(adapter.run(f.payload,f.options).exit,2);
  assert.equal(fs.existsSync(path.join(f.cwd,'owned/result.txt')),false); // Checks execute no requested writes.
});

test('native wrong identity, changed goal, protected path and missing source pins fail closed', t => {
  const f = fixture(t);
  for (const [packet,options] of [
    [{...f.payload,session_id:'wrong'},f.options],
    [f.payload,{...f.options,sourceSha256:'0'.repeat(64)}],
    [f.payload,{...f.options,goalFile:path.join(f.cwd,'README.md')}],
    [{...f.payload,tool_input:{path:'README.md',content:'changed'}},f.options],
  ]) assert.equal(adapter.run(packet,options).exit,2);
  fs.writeFileSync(f.goalFile,JSON.stringify({...f.goal,objective:'corrected goal'}));
  assert.equal(adapter.run(f.payload,f.options).exit,2);
});

test('native CLI emits exit-2 block on missing bindings, malformed input and unsupported final event', () => {
  const env={...process.env};for(const key of ['ECC_OWNED_WORKTREE','ECC_SESSION_ID','ECC_HERMES_GOAL_FILE','ECC_HERMES_GUARD_SHA256'])delete env[key];
  for (const [args,input] of [[['pre'],'{'],[['final'],'{}'],[['pre'],JSON.stringify({hook_event_name:'pre_tool_call',private:'PRIVATE-CANARY'})]]) {
    const child=spawnSync(process.execPath,[entry,...args],{env,input,encoding:'utf8',windowsHide:true,timeout:10000});
    assert.equal(child.status,2);assert.equal(JSON.parse(child.stdout).action,'block');
    assert.ok(!child.stdout.includes('PRIVATE-CANARY'));assert.equal(child.stderr,'');
  }
});

test('a closed parent session never becomes an implicitly rebound native worker', t => {
  const f=fixture(t);
  coordination.execute('close',{cwd:f.cwd,sessionId:'hermes-owner'});
  assert.equal(adapter.run(f.payload,f.options).exit,2);
});
