'use strict';

const assert = require('assert');
const { classify, gitChangedFiles, normalize } = require('../../scripts/ci/detect-ci-scope');

assert.strictEqual(normalize('.\\scripts\\hooks\\runner.js'), 'scripts/hooks/runner.js');

assert.deepStrictEqual(
  (({ compatibility, platform, packed }) => ({ compatibility, platform, packed }))(classify(['docs/guide.md'])),
  { compatibility: false, platform: false, packed: false }
);

const hooks = classify(['scripts/hooks/plugin-hook-bootstrap.js']);
assert.strictEqual(hooks.platform, true);
assert.strictEqual(hooks.compatibility, false);

const manifest = classify(['manifests/install-modules.json']);
assert.strictEqual(manifest.compatibility, true);
assert.strictEqual(manifest.packed, true);

const packageChange = classify(['package-lock.json']);
assert.strictEqual(packageChange.compatibility, true);
assert.strictEqual(packageChange.packed, true);

const workflowChange = classify(['.github/workflows/ci.yml']);
assert.strictEqual(workflowChange.compatibility, true);
assert.strictEqual(workflowChange.platform, true);
assert.strictEqual(workflowChange.packed, true);

const failSafe = classify([], true);
assert.strictEqual(failSafe.compatibility, true);
assert.strictEqual(failSafe.platform, true);
assert.strictEqual(failSafe.packed, true);

assert.strictEqual(gitChangedFiles('', 'abc1234').failSafe, true);
assert.strictEqual(gitChangedFiles('0000000', 'abc1234').failSafe, true);

console.log('CI scope detection: 16 checks passed');
