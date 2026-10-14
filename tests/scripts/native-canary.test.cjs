'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {spec,approvalLimits}=require('../../integrations/software-factory/native-canary.cjs');

test('Claude canary explicitly permits only the three normalized central-policy reads',()=>{
  const launch=spec('claude');
  const value=flag=>launch.args[launch.args.indexOf(flag)+1];
  const allowed=value('--allowedTools').split(',');
  assert.deepEqual(allowed.filter(rule=>rule.startsWith('Read')),['AGENTS.md','AGENTS_SYSTEM.md','CLAUDE.md'].map(name=>'Read(//c/Users/adelm/SeaBridgeAI/manageesg-backend/'+name+')'));
  assert.equal(value('--tools'),'Read');
  assert.ok(!allowed.includes('Read'));
  assert.ok(allowed.every(rule=>!rule.includes('*')));
  for(const name of ['AGENTS.md','AGENTS_SYSTEM.md','CLAUDE.md'])assert.ok(value('-p').includes('C:/Users/adelm/SeaBridgeAI/manageesg-backend/'+name));
  assert.ok(value('-p').includes('Report whether all three central policy reads succeeded'));
  assert.ok(launch.args.includes('--strict-mcp-config'));
  assert.equal(value('--max-budget-usd'),'0.625');
  assert.deepEqual(allowed.filter(rule=>rule.startsWith('mcp__')),['mcp__seabridge-pstack__pstack_find_workflow','mcp__seabridge-pstack__pstack_read_skill','mcp__seabridge-pstack__pstack_factory']);
  assert.ok(!launch.args.includes('--dangerously-skip-permissions'));
  assert.deepEqual(launch.env,{});
});
test('Cursor uses only the pinned installed runtime in fresh read-only ask mode',()=>{
  const launch=spec('cursor');
  assert.ok(launch.exe.replaceAll('\\','/').endsWith('/cursor-agent/versions/2026.10.01-e373342/node.exe'));
  assert.equal(launch.args[launch.args.indexOf('--mode')+1],'ask');
  for(const flag of ['--force','--yolo','--trust','--approve-mcps','--continue','--resume','--worktree'])assert.ok(!launch.args.includes(flag));
});
test('Windows canaries use installed package entrypoints and supported Codex flags',()=>{
  assert.ok(spec('gemini').entry.replaceAll('\\','/').endsWith('/@google/gemini-cli/bundle/gemini.js'));
  assert.ok(spec('opencode').exe.replaceAll('\\','/').endsWith('/opencode-ai/bin/opencode.exe'));
  assert.ok(!spec('codex').args.includes('--no-daemon'));
  const prompt=spec('codex').args.at(-1);
  for(const name of ['AGENTS.md','AGENTS_SYSTEM.md','CLAUDE.md'])assert.ok(prompt.includes('seabridge-policy:///'+name));
  assert.ok(prompt.includes('Do not run shell'));
  const overrides=spec('codex').args.filter((value,index,args)=>args[index-1]==='-c');
  assert.ok(overrides.some(value=>value.startsWith('mcp_servers.seabridge-pstack.args=')&&value.includes('--canary')));
  assert.ok(overrides.includes('mcp_servers.seabridge-pstack.enabled_tools=["pstack_find_workflow","pstack_read_skill","pstack_factory"]'));
  assert.deepEqual(overrides.filter(value=>value.includes('.approval_mode=')),['pstack_find_workflow','pstack_read_skill','pstack_factory'].map(name=>'mcp_servers.seabridge-pstack.tools.'+name+'.approval_mode="approve"'));
  assert.ok(!overrides.some(value=>value.startsWith('approval_policy=')||value.includes('default_tools_approval_mode=')));
});
test('a new smaller batch cannot enlarge exposure, hide retries or omit soft-cap acknowledgement',()=>{
  const approval={id:'reviewed-two-client-batch',authorization:{softCapsAcknowledged:true,maximumNativeCanaryInvocations:2,maximumTotalUsd:1.25,retries:0}};
  assert.deepEqual(approvalLimits(approval),{maximumInvocations:2,maximumExposureUsd:1.25});
  for(const change of [{maximumTotalUsd:6},{maximumNativeCanaryInvocations:9},{retries:1},{softCapsAcknowledged:false}])assert.throws(()=>approvalLimits({...approval,authorization:{...approval.authorization,...change}}));
});
