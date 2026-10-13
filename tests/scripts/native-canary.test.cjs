'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {spec}=require('../../integrations/software-factory/native-canary.cjs');

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
