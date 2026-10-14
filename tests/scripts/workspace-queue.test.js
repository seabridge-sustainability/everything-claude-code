'use strict';
const assert = require('node:assert/strict');
const { main } = require('../../scripts/workspace-queue');
let reads = 0, output;
const options = { collect() { reads++; return { authorizationGranted: false, repositories: [] }; }, print(value) { output = value; } };
assert.equal(main(['status'], options), 0);
assert.equal(reads, 1);
assert.equal(JSON.parse(output).authorizationGranted, false);
assert.equal(main(['--help'], options), 0);
assert.equal(reads, 1);
for (const args of [[], ['status', '--approve'], ['acquire'], ['restart'], ['push']]) {
  assert.throws(() => main(args, options), /Only workspace-queue status/);
}
assert.equal(reads, 1);
console.log('PASS read-only status; unsupported mutation commands rejected before collection');
