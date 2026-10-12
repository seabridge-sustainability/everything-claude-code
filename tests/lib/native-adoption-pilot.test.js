'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {settings,prepare,prompt,sourcePins,installController}=require('../../scripts/native-adoption-pilot');
test('native canary is explicit, local-only and cannot overwrite an existing directory',()=>{
  assert.throws(()=>prepare('claude',__dirname,'fixture'),/new empty path/);
  assert.throws(()=>prepare('unknown',__dirname,'fixture'),/unsupported/);
  assert.match(prompt(),/Do not retry denied tools/);
});
test('installation pins controller and guard dependencies and never replaces existing source',()=>{
  assert.throws(()=>installController(require('node:path').resolve(__dirname,'../..')),/existing files are never overwritten/);
  const pins=sourcePins();
  assert.match(pins['scripts/lib/coding-execution.js'],/^[a-f0-9]{64}$/);
  assert.ok(pins['schemas/goal-control.schema.json']);
  assert.ok(pins['.opencode/plugins/ecc-scope-guard.ts']);
});
test('fresh client configs activate guards, not generic external ECC plugins or remote providers',()=>{
  assert.ok(settings('claude').hooks.PreToolUse);
  assert.ok(settings('gemini').hooks.BeforeTool);
  assert.equal(settings('gemini').model.maxSessionTurns,3);
  const open=settings('opencode');
  assert.deepEqual(open.enabled_providers,['ollama']);
  assert.equal(open.plugin.length,1);
  assert.match(open.plugin[0],/ecc-scope-guard.ts$/);
  assert.equal(open.agent.build.steps,3);
});
