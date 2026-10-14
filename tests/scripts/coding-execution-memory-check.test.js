'use strict';
const assert = require('node:assert/strict');
const { matches, authorize } = require('../../scripts/coding-execution-memory-check');
const ref = { source_id: 'ecc-source', version: '1', citation: 'source:1', source_revision: 'abc',
  line_start: 1, line_end: 2, chunk_id: 'a'.repeat(64), policy_epoch: 1, scope: 'engineering:seabridge-code' };
let passed = 0;
function test(name, action) { action(); passed++; console.log('PASS ' + name); }
async function main() {
  test('null and incomplete references fail closed', () => {
    for (const value of [null, {}, { scope: ref.scope }, { ...ref, chunk_id: undefined }]) assert.equal(matches(value, { chunk: null }), false);
  });
  test('valid exact reference matches', () => assert.equal(matches(ref, { chunk: { ...ref } }), true));
  test('absent fetched chunk is never evidence', () => assert.equal(matches(ref, { chunk: null }), false));
  test('changed source/version/revision/epoch fails', () => {
    for (const key of ['source_id', 'version', 'source_revision', 'policy_epoch']) assert.equal(matches(ref, { chunk: { ...ref, [key]: 'changed' } }), false);
  });
  test('scope and line schema are required', () => {
    assert.equal(matches({ ...ref, scope: 'other' }, { chunk: ref }), false);
    assert.equal(matches({ ...ref, line_start: '1' }, { chunk: ref }), false);
  });
  assert.equal(await authorize(null, {}), false); passed++;
  assert.equal(await authorize(ref, undefined), false); passed++;
  console.log(JSON.stringify({ passed, failed: 0, proxyProcesses: 0, providerCalls: 0 }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
