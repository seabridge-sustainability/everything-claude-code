'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test, after } = require('node:test');
const { spawnSync, spawn } = require('node:child_process');
const { execute, checkSession, repository } = require('../../scripts/lib/session-coordination');
const cli = path.resolve(__dirname, '../../scripts/session-coordinate.js');
const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-session-test-'));
let counter = 0;

function git(cwd, ...args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}
function fixture() {
  const root = path.join(workspace, `repo-${counter++}`);
  fs.mkdirSync(root);
  git(root, 'init', '--initial-branch=fixture');
  git(root, 'config', 'user.name', 'ECC Test');
  git(root, 'config', 'user.email', 'test@example.invalid');
  fs.writeFileSync(path.join(root, 'README.md'), 'fixture\n');
  git(root, 'add', 'README.md');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'fixture');
  const other = `${root}-worktree`;
  git(root, 'worktree', 'add', '--detach', other, 'HEAD');
  return { root, other, sha: git(root, 'rev-parse', 'HEAD') };
}
function register(cwd, sessionId, scopes, now = Date.now()) {
  return execute('register', { cwd, sessionId, scopes, objective: 'owned task', doneWhen: 'local proof', now });
}
function invoke(cwd, args) { return spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8', windowsHide: true }); }

after(() => fs.rmSync(workspace, { recursive: true, force: true }));

test('linked worktrees share registry and overlapping directory/file reservations fail', () => {
  const { root, other } = fixture();
  register(root, 'climate', ['app/climate']);
  assert.equal(repository(root).common, repository(other).common);
  assert.throws(() => register(other, 'meter', ['app/climate/model.py']), /overlaps session climate/);
  register(other, 'meter', ['app/meter']);
  assert.equal(execute('status', { cwd: root }).sessions.length, 2);
});

test('same checkout cannot be shared by two live owners even with disjoint paths', () => {
  const { root } = fixture();
  register(root, 'one', ['app/one']);
  assert.throws(() => register(root, 'two', ['app/two']), /worktree already owned/);
});

test('links added after reservation cannot redirect an owned edit outside the worktree', () => {
  const { root, other } = fixture();
  register(root, 'one', ['linked']);
  fs.symlinkSync(other, path.join(root, 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.equal(invoke(root, ['check-write', '--session', 'one', '--path', 'linked/README.md']).status, 2);
  fs.unlinkSync(path.join(root, 'linked'));
});

test('actual CLI rejects another session scope and traversal; owned write passes', () => {
  const { root, other } = fixture();
  register(root, 'climate', ['app/climate']);
  assert.equal(invoke(root, ['check-write', '--session', 'climate', '--path', 'app/climate/score.py']).status, 0);
  for (const file of ['app/meter/optimizer.py', '../other', 'app/climate/../../other', 'app/climate./x', '.git/config']) {
    assert.equal(invoke(root, ['check-write', '--session', 'climate', '--path', file]).status, 2, file);
  }
  assert.equal(invoke(other, ['check-write', '--session', 'climate', '--path', 'app/climate/x.py']).status, 2);
});

test('missing, expired, closed IDs and implicit cwd ownership fail closed', () => {
  const { root } = fixture();
  register(root, 'one', ['README.md'], 100);
  assert.throws(() => checkSession({ cwd: root, sessionId: 'one', now: 8000000 }), /expired/);
  assert.equal(invoke(root, ['check-changes']).status, 2);
  execute('renew', { cwd: root, sessionId: 'one', now: 8000000 });
  execute('close', { cwd: root, sessionId: 'one', now: 8000001 });
  assert.throws(() => checkSession({ cwd: root, sessionId: 'one', now: 8000002 }), /closed/);
});

test('expired write reservation may be reassigned; old owner cannot renew over successor', () => {
  const { root, other } = fixture();
  register(root, 'old', ['app/climate'], 100);
  register(other, 'new', ['app/climate'], 8000000);
  assert.throws(() => execute('renew', { cwd: root, sessionId: 'old', now: 8000001 }), /overlaps/);
});

test('check-changes catches untracked and committed foreign work, not just staged paths', () => {
  const { root } = fixture();
  register(root, 'climate', ['README.md']);
  fs.writeFileSync(path.join(root, 'meter.py'), 'foreign\n');
  assert.equal(invoke(root, ['check-changes', '--session', 'climate']).status, 2);
  git(root, 'add', 'meter.py');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'foreign fixture');
  assert.equal(invoke(root, ['check-changes', '--session', 'climate']).status, 2);
});

test('already published upstream changes are not claimed as owned edits after integration', () => {
  const { root } = fixture();
  register(root, 'climate', ['README.md']);
  fs.writeFileSync(path.join(root, 'meter.py'), 'published by another fixture session\n');
  git(root, 'add', 'meter.py');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'published unrelated fixture');
  git(root, 'update-ref', 'refs/remotes/origin/development', 'HEAD');
  const result = invoke(root, ['check-changes', '--session', 'climate', '--upstream', 'refs/remotes/origin/development']);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).paths, []);
});

test('release serializes publication but permits disjoint local work', () => {
  const { root, other, sha } = fixture();
  register(root, 'release', ['README.md']);
  register(other, 'worker', ['app/meter']);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha });
  assert.throws(() => execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha }), /release owned by release/);
  assert.equal(invoke(other, ['check-write', '--session', 'worker', '--path', 'app/meter/x.py']).status, 0);
  assert.equal(invoke(root, ['check-release', '--session', 'release', '--branch', 'development', '--candidate', sha]).status, 0);
  assert.equal(invoke(root, ['check-release', '--session', 'release', '--branch', 'main', '--candidate', sha]).status, 2);
});

test('release expiry is not proof a remote job stopped; it prevents takeover', () => {
  const { root, other, sha } = fixture();
  register(root, 'release', ['README.md'], 100);
  register(other, 'worker', ['app/meter'], 100);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ttl: 1, now: 100 });
  assert.throws(() => execute('check-release', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now: 60200 }), /lease expired/);
  assert.throws(() => execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha, now: 60200 }), /release owned/);
  assert.throws(() => execute('close', { cwd: root, sessionId: 'release', now: 60200 }), /terminal status/);
  execute('release-end', { cwd: root, sessionId: 'release', outcome: 'failed', evidence: 'fixture run terminal failure', now: 60200 });
  execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha, now: 60201 });
});

test('changed HEAD never silently retargets an acquired candidate', () => {
  const { root, sha } = fixture();
  register(root, 'release', ['README.md']);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha });
  git(root, '-c', 'core.hooksPath=', 'commit', '--allow-empty', '-m', 'later unrelated fixture');
  assert.equal(invoke(root, ['check-release', '--session', 'release', '--branch', 'development', '--candidate', sha]).status, 2);
});

test('dirty candidates and mismatched integration baselines cannot acquire publication', () => {
  const { root, sha } = fixture();
  register(root, 'release', ['README.md']);
  fs.appendFileSync(path.join(root, 'README.md'), 'change\n');
  assert.equal(invoke(root, ['release-acquire', '--session', 'release', '--branch', 'development', '--candidate', sha]).status, 2);
  assert.equal(invoke(root, ['release-acquire', '--session', 'release', '--branch', 'development', '--candidate', sha,
    '--upstream', 'refs/remotes/origin/main']).status, 2);
});

test('negative control: removing overlap enforcement breaks the denial assertion', () => {
  const { root, other } = fixture();
  const mutant = path.join(workspace, 'mutant');
  fs.mkdirSync(path.join(mutant, 'lib'), { recursive: true });
  fs.copyFileSync(cli, path.join(mutant, 'session-coordinate.js'));
  fs.copyFileSync(path.resolve(__dirname, '../../scripts/lib/atomic-write.js'), path.join(mutant, 'lib/atomic-write.js'));
  const source = fs.readFileSync(path.resolve(__dirname, '../../scripts/lib/session-coordination.js'), 'utf8');
  const weakened = source.replace("return a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`);", 'return false;');
  assert.notEqual(weakened, source, 'mutation must apply');
  fs.writeFileSync(path.join(mutant, 'lib/session-coordination.js'), weakened);
  register(root, 'one', ['app/shared']);
  const result = spawnSync(process.execPath, [path.join(mutant, 'session-coordinate.js'), 'register', '--session', 'two',
    '--scope', 'app/shared', '--objective', 'mutant', '--done-when', 'denial expected'], { cwd: other, encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, 0, result.stderr);
  assert.throws(() => assert.equal(result.status, 2), assert.AssertionError);
});

test('malformed registry and lock contention never overwrite existing coordination', () => {
  const { root } = fixture();
  register(root, 'one', ['README.md']);
  const dir = repository(root).directory;
  const file = path.join(dir, 'registry.json');
  const original = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(path.join(dir, 'registry.lock'), 'fixture lock');
  assert.equal(invoke(root, ['renew', '--session', 'one']).status, 2);
  assert.equal(fs.readFileSync(file, 'utf8'), original);
  fs.unlinkSync(path.join(dir, 'registry.lock'));
  fs.writeFileSync(file, '{invalid');
  assert.equal(invoke(root, ['renew', '--session', 'one']).status, 2);
  assert.equal(fs.readFileSync(file, 'utf8'), '{invalid');
});

test('simultaneous independent processes cannot both reserve the same path', async () => {
  const { root, other } = fixture();
  const run = (cwd, session) => new Promise(resolve => {
    const child = spawn(process.execPath, [cli, 'register', '--session', session, '--scope', 'app/shared',
      '--objective', 'race', '--done-when', 'one owner'], { cwd, stdio: 'ignore', windowsHide: true });
    child.on('close', resolve);
  });
  const statuses = await Promise.all([run(root, 'one'), run(other, 'two')]);
  assert.deepEqual(statuses.sort(), [0, 2]);
  assert.equal(execute('status', { cwd: root }).sessions.length, 1);
});
