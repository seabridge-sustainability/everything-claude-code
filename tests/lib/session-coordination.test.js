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
function budget(now = Date.now()) {
  return { actionsBudgetStatus: 'known', actionsBudgetUsed: 10, actionsBudgetLimit: 100,
    actionsBudgetCheckedAt: new Date(now).toISOString(), actionsBudgetSource: 'github-org-budget-ui',
    actionsStopUsage: 'yes', expectedActionsUsd: 1, expectedWorkflows: 'security-scan' };
}
function budgetArgs(now = Date.now()) {
  return ['--actions-budget-status', 'known', '--actions-budget-used', '10', '--actions-budget-limit', '100',
    '--actions-budget-checked-at', new Date(now).toISOString(), '--actions-budget-source', 'github-org-budget-ui',
    '--actions-stop-usage', 'yes', '--expected-actions-usd', '1', '--expected-workflows', 'security-scan'];
}

after(() => fs.rmSync(workspace, { recursive: true, force: true }));

function guardFixture(mode = 'block', overrides = {}) {
  const f = fixture();
  const now = Date.now();
  const goal = { schema: 'ecc.active-goal.v1', goal_id: 'fence', mode: 'controlled', proof_profile: 'security', objective: 'Typed write fence', current_priority: 'Run negative controls', non_goals: [],
    user_visible_proofs: [{ id: 'fence', description: 'Fence behavior', lane_id: 'guard', required_stage: 'authentic_input_processed', required_evidence_kinds: ['test','runtime'], required_repositories: ['fixture'], allowed_result_classes: ['other'], acceptance_predicate: 'Negative controls fail closed', requires_authentic: false, requires_user_visible: false, subject_scope: null, required: true }],
    lanes: [{ id: 'guard', description: 'Guard', status: 'active', blocker: null, next_action: 'Probe' }], owner_corrections: [],
    forecast: { state: 'not_set', confidence: 'none', basis: null, critical_path: [], likely_hours: null, next_checkpoint_at: null, checkpoint_started_at: null, checkpoint_proof_id: null, updated_at: new Date(now).toISOString() }, status: 'active', updated_at: new Date(now).toISOString() };
  fs.mkdirSync(path.join(f.root, '.ecc/goal'), { recursive: true });
  fs.writeFileSync(path.join(f.root, '.ecc/goal/active-goal.yaml'), JSON.stringify(goal));
  register(f.root, 'fence', ['README.md', 'owned', '.ecc/goal', 'artifacts/agent-runs/scope-guard']);
  execute('guard-bind', { cwd: f.root, sessionId: 'fence', guardMode: mode, deadline: new Date(now + 600000).toISOString(), toolLimit: 40, turnLimit: 20, protectedPaths: ['README.md'], ...overrides });
  function event(tool, input, eventName = 'pre', extra = {}) {
    return execute('guard-event', { cwd: f.root, sessionId: 'fence', guardMode: mode, event: eventName,
      payload: { session_id: 'fence', cwd: f.root, tool_name: tool, tool_input: input, ...extra } });
  }
  return { ...f, goal, event };
}

test('guard a/d/e: direct fence, protected checks and useful cross-module reads', () => {
  const { event } = guardFixture();
  assert.equal(event('Write', { file_path: 'owned/new.js', content: 'safe' }).allowed, true);
  assert.equal(event('Read', { file_path: 'outside/module.js' }).allowed, true);
  assert.equal(event('Write', { file_path: 'outside/module.js' }).allowed, false);
  assert.equal(event('Edit', { file_path: 'package.json' }).allowed, false);
  assert.equal(event('Edit', { file_path: 'README.md' }).allowed, false);
  assert.equal(event('Write', { path: 'owned/unknown.js' }).allowed, false);
  assert.equal(event('MultiEdit', { edits: [{ file_path: 'owned/a.js' }, { file_path: 'outside/b.js' }] }).allowed, false);
});

test('guard b/c: interpreters, stdin, MCP/cloud and configuration mutation are opaque', () => {
  const { event } = guardFixture();
  for (const tool of ['Bash', 'exec_command', 'write_stdin', 'mcp__cloud__write', 'functions.exec', 'unknown_write']) {
    const decision = event(tool, { command: 'python -c "mutate()"', chars: 'secret-example-never-log' });
    assert.equal(decision.allowed, false, tool);
  }
  for (const file of ['.codex/hooks.json', '.ecc/goal/active-goal.yaml', '.claude/settings.json', '.github/hooks/check.json']) {
    assert.equal(event('Write', { file_path: file }).allowed, false, file);
  }
});

test('guard paths: absolute, Windows/Git Bash aliases, traversal, ADS, symlink and every patch destination', () => {
  const { root, event } = guardFixture();
  assert.equal(event('Write', { file_path: path.join(root, 'owned/new.js') }).allowed, true);
  for (const file of ['owned/../outside.js', 'owned/alias. ', 'owned/file:stream', '../outside.js']) {
    assert.equal(event('Write', { file_path: file }).allowed, false, file);
  }
  fs.mkdirSync(path.join(root, 'outside'));
  fs.mkdirSync(path.join(root, 'owned'));
  fs.symlinkSync(path.join(root, 'outside'), path.join(root, 'owned/link'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.equal(event('Write', { file_path: 'owned/link/file.js' }).allowed, false);
  if (process.platform === 'win32') {
    const absolute = path.join(root, 'owned/new.js');
    assert.equal(event('Write', { file_path: absolute.toUpperCase() }).allowed, true);
    assert.equal(event('Write', { file_path: absolute.replace(/^([A-Z]):\\/i, (_, d) => '/' + d.toLowerCase() + '/').replace(/\\/g,'/') }).allowed, true);
    assert.equal(event('Write', { file_path: '\\\\server\\share\\outside.js' }).allowed, false);
    assert.equal(event('Write', { file_path: '\\\\?\\' + absolute }).allowed, false);
  }
  const patch = '*** Begin Patch\n*** Add File: owned/a.js\n+safe\n*** Update File: owned/b.js\n*** Move to: outside/c.js\n@@\n-old\n+new\n*** End Patch';
  assert.equal(event('apply_patch', { input: patch }).allowed, false);
  assert.equal(event('apply_patch', { input: patch.replace('outside/c.js', 'owned/c.js') }).allowed, true);
  assert.equal(event('apply_patch', { input: 'garbage\n' + patch }).allowed, false);
});

test('guard f: committed, staged, unstaged, deleted, renamed and untracked changes since frozen base', () => {
  const { root, event } = guardFixture();
  fs.writeFileSync(path.join(root, 'outside.js'), 'foreign');
  assert.equal(event(null, null, 'final').allowed, false);
  git(root, 'add', 'outside.js');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'foreign fixture');
  git(root, 'update-ref', 'refs/remotes/origin/development', 'HEAD');
  assert.equal(event(null, null, 'final').allowed, false);
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'fence', upstream: 'refs/remotes/origin/development' }), /outside owned/);
});

test('completion detects staged content restored in working tree, deletes and both rename paths', () => {
  const { root } = fixture();
  fs.writeFileSync(path.join(root, 'outside.js'), 'baseline');
  git(root, 'add', 'outside.js');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'outside baseline');
  register(root, 'scoped', ['README.md', 'owned']);
  fs.writeFileSync(path.join(root, 'outside.js'), 'staged change');
  git(root, 'add', 'outside.js');
  fs.writeFileSync(path.join(root, 'outside.js'), 'baseline');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'scoped' }), /outside owned/);
  fs.unlinkSync(path.join(root, 'outside.js'));
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'scoped' }), /outside owned/);
  fs.mkdirSync(path.join(root, 'owned'));
  fs.writeFileSync(path.join(root, 'owned/moved.js'), 'baseline');
  git(root, 'add', '--', 'outside.js', 'owned/moved.js');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'scoped' }), /outside owned/);
});

test('audit records would-deny without payloads; block rejects stale/corrupt/missing state and exhausted budgets', () => {
  const audit = guardFixture('audit');
  const decision = audit.event('Write', { file_path: 'outside.js', content: 'secret-example-never-log' });
  assert.equal(decision.allowed, true);
  assert.equal(decision.wouldDeny, true);
  const log = fs.readFileSync(path.join(audit.root, 'artifacts/agent-runs/scope-guard/fence.jsonl'), 'utf8');
  assert.doesNotMatch(log, /secret-example|outside.js|content|file_path/);
  const blocked = guardFixture('block', { toolLimit: 1, turnLimit: 1 });
  assert.equal(blocked.event('Write', { file_path: 'owned/a' }).allowed, true);
  assert.equal(blocked.event('Write', { file_path: 'owned/b' }).allowed, false);
  const turn = guardFixture('block', { turnLimit: 1 });
  assert.equal(turn.event(null, null, 'turn', { turn_id: 'one' }).allowed, true);
  assert.equal(turn.event(null, null, 'turn', { turn_id: 'one' }).allowed, true);
  assert.equal(turn.event(null, null, 'turn', { turn_id: 'two' }).allowed, false);
  const stale = guardFixture();
  stale.goal.current_priority = 'Owner corrected the requirement';
  fs.writeFileSync(path.join(stale.root, '.ecc/goal/active-goal.yaml'), JSON.stringify(stale.goal));
  assert.equal(stale.event('Read', {}).allowed, false);
  const corrupt = guardFixture();
  const registry = path.join(repository(corrupt.root).directory, 'registry.json');
  const state = JSON.parse(fs.readFileSync(registry));
  state.sessions[0].guard.allowedOperations = ['anything'];
  fs.writeFileSync(registry, JSON.stringify(state));
  assert.equal(corrupt.event('Write', { file_path: 'owned/a' }).allowed, false);
  const missing = guardFixture();
  fs.unlinkSync(path.join(missing.root, '.ecc/goal/active-goal.yaml'));
  assert.equal(missing.event('Read', {}).allowed, false);
});

test('trusted hook process allows owned write, denies protected tampering, wrong native identity, deadline and final drift', () => {
  const f = guardFixture();
  const hook = path.resolve(__dirname, '../../scripts/hooks/goal-runtime-gate.js');
  const run = (tool, input, event = 'pre') => spawnSync(process.execPath, [hook, 'codex', 'guard', 'block', event], {
    cwd: f.root, encoding: 'utf8', env: { ...process.env, ECC_SESSION_ID: 'fence' },
    input: JSON.stringify({ session_id: 'fence', cwd: f.root, tool_name: tool, tool_input: input }), windowsHide: true });
  assert.equal(run('Write', { file_path: 'owned/new.js' }).status, 0);
  const denied = run('Write', { file_path: 'outside.js' });
  assert.equal(denied.status, 0);
  assert.equal(JSON.parse(denied.stdout).hookSpecificOutput.permissionDecision, 'deny');
  assert.equal(f.event('Read', {}, 'pre', { session_id: 'other' }).allowed, false);
  const expired = execute('guard-event', { cwd: f.root, sessionId: 'fence', guardMode: 'block', event: 'pre', now: Date.now() + 700000,
    payload: { session_id: 'fence', cwd: f.root, tool_name: 'Read', tool_input: {} } });
  assert.equal(expired.allowed, false);
  fs.writeFileSync(path.join(f.root, 'README.md'), 'weakened protected configuration');
  assert.equal(f.event('Read', {}).allowed, false);
  fs.writeFileSync(path.join(f.root, 'README.md'), 'fixture\n');
  fs.writeFileSync(path.join(f.root, 'foreign.js'), 'outside');
  const final = run(null, null, 'final');
  assert.equal(final.status, 0);
  assert.equal(JSON.parse(final.stdout).decision, 'block');
});

test('owner CLI can hand off one file without closing product scopes or release lease', () => {
  const { root, other, sha } = fixture();
  register(root, 'owner', ['README.md', 'app/product']);
  const release = execute('release-acquire', { cwd: root, sessionId: 'owner', branch: 'fixture', candidate: sha, ...budget() });
  const result = invoke(root, ['handoff-file', '--session', 'owner', '--path', 'README.md', '--evidence', 'Owner hands reviewed instruction diff to system manager']);
  assert.equal(result.status, 0, result.stderr);
  const state = execute('status', { cwd: root });
  assert.deepEqual(state.release, release);
  assert.equal(state.sessions[0].state, 'active');
  assert.deepEqual(state.sessions[0].scopes, ['app/product']);
  assert.match(state.fileHandoffs[0].sha256, /^[a-f0-9]{64}$/);
  register(other, 'recipient', ['README.md']);
  assert.equal(invoke(root, ['check-write', '--session', 'owner', '--path', 'README.md']).status, 2);
});

test('file handoff refuses another owner, broad directory, multiple files or empty remainder', () => {
  const { root, other } = fixture();
  register(root, 'owner', ['app', 'README.md']);
  const options = { cwd: root, sessionId: 'owner', evidence: 'reviewed handoff' };
  assert.throws(() => execute('handoff-file', { ...options, cwd: other, paths: ['README.md'] }), /another worktree/);
  assert.throws(() => execute('handoff-file', { ...options, paths: ['app/file.md'] }), /exact owned file/);
  assert.throws(() => execute('handoff-file', { ...options, paths: ['README.md', 'app'] }), /exactly one/);
  assert.throws(() => execute('handoff-file', { ...options, paths: ['README.md'], evidence: '' }), /evidence required/);
  execute('handoff-file', { ...options, paths: ['README.md'] });
  assert.throws(() => execute('handoff-file', { ...options, paths: ['app'] }), /retain another scope/);
});

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

test('standard sessions preserve inherited foreign bytes without owning or staging them', () => {
  const { root } = fixture();
  fs.appendFileSync(path.join(root, 'README.md'), 'another owner draft\n');
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'private draft\n');
  const before = fs.readFileSync(path.join(root, 'README.md'));
  const session = register(root, 'writer', ['owned.txt']);
  assert.equal(session.preservedForeign.files.length, 2);
  fs.writeFileSync(path.join(root, 'owned.txt'), 'own change\n');
  git(root, 'add', 'owned.txt');
  const result = execute('check-changes', { cwd: root, sessionId: 'writer' });
  assert.deepEqual(result.paths, ['owned.txt']);
  assert.deepEqual(result.preservedForeign.sort(), ['README.md', 'foreign.txt'].sort());
  assert.equal(result.foreignOwnershipGranted, false);
  assert.deepEqual(fs.readFileSync(path.join(root, 'README.md')), before);
  assert.equal(git(root, 'diff', '--cached', '--name-only'), 'owned.txt');
});

test('foreign staging at registration is never inherited', () => {
  const { root } = fixture();
  fs.appendFileSync(path.join(root, 'README.md'), 'foreign\n');
  git(root, 'add', 'README.md');
  assert.throws(() => register(root, 'writer', ['owned.txt']), /foreign staging/);
});

test('foreign committed history cannot be hidden by restoring the index or reverting', () => {
  for (const revert of [false, true]) {
    const { root, sha } = fixture();
    const file = path.join(root, 'README.md');
    fs.appendFileSync(file, 'foreign draft\n');
    const draft = fs.readFileSync(file);
    register(root, 'writer', ['owned.txt']);
    git(root, 'add', 'README.md');
    git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'foreign fixture');
    if (revert) {
      git(root, '-c', 'core.hooksPath=', 'revert', '--no-edit', 'HEAD');
      fs.writeFileSync(file, draft);
    } else git(root, 'read-tree', sha);
    assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /foreign baseline entered committed history/);
  }
});

test('changed foreign file size rejects before its payload is opened for hashing', () => {
  const { root } = fixture();
  const file = path.join(root, 'foreign.txt');
  fs.writeFileSync(file, 'draft\n');
  register(root, 'writer', ['owned.txt']);
  fs.appendFileSync(file, 'growth\n');
  const open = fs.openSync;
  let foreignOpens = 0;
  fs.openSync = function(target, ...args) {
    if (String(target).toLowerCase() === file.toLowerCase()) foreignOpens += 1;
    return open.call(this, target, ...args);
  };
  try { assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /foreign baseline changed/); }
  finally { fs.openSync = open; }
  assert.equal(foreignOpens, 0);
});

test('foreign growth during hashing cannot exceed the admitted read size', () => {
  const { root } = fixture();
  const file = path.join(root, 'foreign.txt');
  fs.writeFileSync(file, 'draft\n');
  const original = fs.statSync(file), read = fs.readSync;
  let changed = false, bytesRead = 0;
  fs.readSync = function(fd, ...args) {
    if (fs.fstatSync(fd).ino === original.ino) {
      if (!changed) { fs.appendFileSync(file, 'concurrent growth\n'); changed = true; }
      const bytes = read.call(this, fd, ...args); bytesRead += bytes; return bytes;
    }
    return read.call(this, fd, ...args);
  };
  try { assert.throws(() => register(root, 'writer', ['owned.txt']), /foreign baseline changed/); }
  finally { fs.readSync = read; }
  assert.equal(changed, true);
  assert.equal(bytesRead, original.size);
});

test('foreign byte changes, new files, deletion and index changes reject after registration', () => {
  const mutations = [
    root => fs.appendFileSync(path.join(root, 'README.md'), 'changed\n'),
    root => fs.writeFileSync(path.join(root, 'new-foreign.txt'), 'new\n'),
    root => fs.unlinkSync(path.join(root, 'README.md')),
    root => git(root, 'add', 'README.md'),
  ];
  for (const mutate of mutations) {
    const { root } = fixture();
    fs.appendFileSync(path.join(root, 'README.md'), 'inherited foreign\n');
    register(root, 'writer', ['owned.txt']);
    mutate(root);
    assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }),
      /foreign baseline changed|outside owned/);
  }
});

test('staging an inherited untracked draft is denied even when its bytes do not change', () => {
  const { root } = fixture();
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'draft\n');
  register(root, 'writer', ['owned.txt']);
  git(root, 'add', 'foreign.txt');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /foreign baseline changed/);
});

test('inherited deletions remain absent and cannot be silently restored', () => {
  const { root } = fixture();
  fs.unlinkSync(path.join(root, 'README.md'));
  register(root, 'writer', ['owned.txt']);
  assert.deepEqual(execute('check-changes', { cwd: root, sessionId: 'writer' }).preservedForeign, ['README.md']);
  fs.writeFileSync(path.join(root, 'README.md'), 'fixture\n');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /foreign baseline changed/);
});

test('linked inherited paths and native guard conversion do not gain a preservation exception', () => {
  const { root, other } = fixture();
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'draft\n');
  register(root, 'writer', ['owned.txt']);
  assert.throws(() => execute('guard-bind', { cwd: root, sessionId: 'writer', guardMode: 'block' }), /no inherited foreign/);
  const linked = path.join(root, 'linked');
  fs.symlinkSync(other, linked, process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => register(other, 'linked-writer', ['owned.txt']), /already owned|overlaps/);
  assert.throws(() => execute('check-write', { cwd: root, sessionId: 'writer', paths: ['linked/README.md'] }), /linked path/);
});

test('experiment loops never exempt inherited foreign drafts', () => {
  const { root } = fixture();
  fs.writeFileSync(path.join(root, 'owned.txt'), 'target\n');
  fs.writeFileSync(path.join(root, 'check.txt'), 'immutable check\n');
  git(root, 'add', 'owned.txt', 'check.txt');
  git(root, '-c', 'core.hooksPath=', 'commit', '-m', 'loop target fixture');
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'other draft\n');
  execute('register', { cwd: root, sessionId: 'loop', scopes: ['owned.txt'], objective: 'atomic experiment',
    doneWhen: 'protected checks', loopTarget: 'owned.txt', checkFiles: ['check.txt'] });
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'loop' }), /outside owned/);
});

test('publication remains strict even when standard checks preserve foreign drafts', () => {
  const { root, sha } = fixture();
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'draft\n');
  register(root, 'writer', ['README.md']);
  assert.equal(execute('check-changes', { cwd: root, sessionId: 'writer' }).allowed, true);
  assert.throws(() => execute('release-acquire', { cwd: root, sessionId: 'writer', branch: 'development', candidate: sha, ...budget() }),
    /outside owned|clean worktree/);
});

test('legacy records remain strict and cannot retroactively inherit foreign changes', () => {
  const { root } = fixture();
  register(root, 'writer', ['README.md']);
  const file = path.join(repository(root).directory, 'registry.json');
  const state = JSON.parse(fs.readFileSync(file, 'utf8'));
  delete state.sessions[0].preservedForeign;
  fs.writeFileSync(file, JSON.stringify(state));
  fs.writeFileSync(path.join(root, 'foreign.txt'), 'draft\n');
  assert.throws(() => execute('check-changes', { cwd: root, sessionId: 'writer' }), /outside owned/);
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
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ...budget() });
  assert.throws(() => execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha, ...budget() }), /release owned by release/);
  assert.equal(invoke(other, ['check-write', '--session', 'worker', '--path', 'app/meter/x.py']).status, 0);
  assert.equal(invoke(root, ['check-release', '--session', 'release', '--branch', 'development', '--candidate', sha]).status, 0);
  assert.equal(invoke(root, ['check-release', '--session', 'release', '--branch', 'main', '--candidate', sha]).status, 2);
});

test('release acquisition records a fresh Actions budget receipt and fails closed at the tripwire', () => {
  const { root, sha } = fixture();
  const now = Date.now();
  register(root, 'release', ['README.md'], now);
  const base = { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now };
  assert.throws(() => execute('release-acquire', base), /actions-budget-source/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now - 3600001) }), /within the last hour/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), expectedActionsUsd: -1 }), /positive USD/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsBudgetUsed: ' ' }), /actions-budget-used required/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsBudgetCheckedAt: '2026-10-01' }), /ISO UTC timestamp/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsBudgetUsed: 89 }), /owner cost approval/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsStopUsage: 'no' }), /owner cost approval/);
  assert.throws(() => execute('release-acquire', { ...base, ...budget(now), actionsBudgetStatus: 'unknown' }), /owner cost approval/);
  const result = execute('release-acquire', { ...base, ...budget(now), actionsBudgetUsed: 89,
    ownerCostApproval: 'Alejandro approved this named development security-scan batch' });
  assert.equal(result.actionsBudget.projectedPercent, 90);
  assert.equal(result.actionsBudget.expectedWorkflows[0], 'security-scan');
  assert.equal(result.actionsBudget.source, 'github-org-budget-ui');
});

test('release expiry is not proof a remote job stopped; it prevents takeover', () => {
  const { root, other, sha } = fixture();
  register(root, 'release', ['README.md'], 100);
  register(other, 'worker', ['app/meter'], 100);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ttl: 1, now: 100, ...budget(100) });
  assert.throws(() => execute('check-release', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, now: 60200 }), /lease expired/);
  assert.throws(() => execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha, now: 60200, ...budget(60200) }), /release owned/);
  assert.throws(() => execute('close', { cwd: root, sessionId: 'release', now: 60200 }), /terminal status/);
  execute('release-end', { cwd: root, sessionId: 'release', outcome: 'failed', evidence: 'fixture run terminal failure', now: 60200 });
  assert.throws(() => execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha, now: 60201, ...budget(60201) }), /retry-evidence/);
  execute('release-acquire', { cwd: other, sessionId: 'worker', branch: 'development', candidate: sha,
    retryEvidence: 'Runner outage repaired; one justified retry of unchanged source', now: 60201, ...budget(60201) });
});

test('completed candidate cannot be released twice even with retry prose', () => {
  const { root, sha } = fixture();
  register(root, 'release', ['README.md']);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ...budget() });
  execute('release-end', { cwd: root, sessionId: 'release', outcome: 'completed', evidence: 'fixture completed' });
  assert.throws(() => execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha,
    retryEvidence: 'no new code', ...budget() }), /candidate already released/);
});

test('changed HEAD never silently retargets an acquired candidate', () => {
  const { root, sha } = fixture();
  register(root, 'release', ['README.md']);
  execute('release-acquire', { cwd: root, sessionId: 'release', branch: 'development', candidate: sha, ...budget() });
  git(root, '-c', 'core.hooksPath=', 'commit', '--allow-empty', '-m', 'later unrelated fixture');
  assert.equal(invoke(root, ['check-release', '--session', 'release', '--branch', 'development', '--candidate', sha]).status, 2);
});

test('dirty candidates and mismatched integration baselines cannot acquire publication', () => {
  const { root, sha } = fixture();
  register(root, 'release', ['README.md']);
  fs.appendFileSync(path.join(root, 'README.md'), 'change\n');
  assert.equal(invoke(root, ['release-acquire', '--session', 'release', '--branch', 'development', '--candidate', sha, ...budgetArgs()]).status, 2);
  assert.equal(invoke(root, ['release-acquire', '--session', 'release', '--branch', 'development', '--candidate', sha,
    '--upstream', 'refs/remotes/origin/main', ...budgetArgs()]).status, 2);
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
