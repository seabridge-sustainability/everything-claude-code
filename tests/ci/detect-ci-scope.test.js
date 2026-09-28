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

for (const file of [
  'yarn.lock', '.yarnrc.yml', 'pnpm-lock.yaml', 'pnpm-workspace.yaml',
  'bun.lock', 'bun.lockb', 'bunfig.toml', 'npm-shrinkwrap.json', '.npmrc'
]) {
  const lockChange = classify([file]);
  assert.strictEqual(lockChange.compatibility, true, `${file} should trigger compatibility`);
  assert.strictEqual(lockChange.packed, true, `${file} should trigger packed lifecycle`);
}

for (const file of ['scripts/setup.js', 'scripts/lib/install-executor.js', 'scripts/lib/claude-plugin-setup.js']) {
  const installerChange = classify([file]);
  assert.strictEqual(installerChange.compatibility, true, `${file} should trigger compatibility`);
  assert.strictEqual(installerChange.packed, true, `${file} should trigger packed lifecycle`);
}

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

console.log('CI scope detection: 40 checks passed');
