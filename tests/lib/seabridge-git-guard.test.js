'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { decide, run } = require('../../scripts/hooks/seabridge-git-guard');
const cwd = process.cwd();
const ecc = () => ({ ecc: true, product: false, branch: 'main' });
const product = () => ({ ecc: false, product: true, branch: 'main' });
const development = () => ({ ecc: false, product: true, branch: 'development' });
test('ECC normal release does not gain an allow or redundant main ask', () => {
  for (const command of ['git commit -m fix', 'git merge origin/main', 'git push origin HEAD:main', 'git push origin', 'git push origin refs/heads/main']) assert.equal(decide(command, cwd, ecc), null, command);
});
test('product main remains separately protected, including implicit pushes', () => {
  for (const command of ['git commit -m fix', 'git push origin main', 'git push origin HEAD:refs/heads/main', 'git push origin', 'git push origin HEAD']) assert.equal(decide(command, cwd, product)[0], 'ask', command);
  assert.equal(decide('git push --all origin', cwd, development)[0], 'ask');
  assert.equal(decide('git commit -m fix', cwd, () => ({ ecc: true, product: true, branch: 'main' }))[0], 'ask', 'product identity wins over a substituted remote');
  assert.equal(decide('git push origin HEAD:development', cwd, development), null);
});
test('hard safety denials apply even to ECC', () => {
  for (const command of ['git commit --no-verify', 'git push --force', 'git push --force-with-lease', 'git push -f origin main', 'git push origin +HEAD:main', 'git -c core.hooksPath=none commit']) assert.equal(decide(command, cwd, ecc)[0], 'deny', command);
});
test('shared destructive operations cannot be approved accidentally', () => {
  assert.equal(decide('git reset --hard HEAD', cwd, product)[0], 'deny');
  assert.equal(decide('git clean -fd', cwd, product)[0], 'deny');
});
test('git -C is resolved; inspection failure and opaque writes are not allowed silently', () => {
  let received;
  assert.equal(decide('git -C "../ecc space" commit -m fix', cwd, dir => { received = dir; return ecc(); }), null);
  assert.equal(received, path.resolve(cwd, '../ecc space'));
  assert.equal(decide('git commit -m fix', cwd, () => { throw Error('missing'); })[0], 'ask');
  for (const command of ['cd other; git commit -m fix', 'git -c alias.publish=push publish', 'git --git-dir elsewhere commit', 'git commit -m fix && git push', 'git -C $TARGET push']) assert.equal(decide(command, cwd, ecc)[0], 'ask', command);
});
test('read-only and unrelated tools remain unaffected; malformed events deny', () => {
  assert.equal(decide('git status --short', cwd, product), null);
  assert.equal(decide('node check.js', cwd), null);
  assert.equal(run('{bad').hookSpecificOutput.permissionDecision, 'deny');
  assert.equal(run('{}').hookSpecificOutput.permissionDecision, 'deny');
});
test('actual stdin runner emits native denial protocol', () => {
  const file = path.resolve(__dirname, '../../scripts/hooks/seabridge-git-guard.js');
  const result = spawnSync(process.execPath, [file], { input: JSON.stringify({ cwd, tool_input: { command: 'git push --force' } }), encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.equal(JSON.parse(result.stdout).hookSpecificOutput.permissionDecision, 'deny');
});
