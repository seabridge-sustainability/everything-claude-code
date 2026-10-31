'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const { captureRepositoryState } = require('../../scripts/lib/goal-store');
const { readStructuredFile, validateBundle } = require('../../scripts/lib/goal-control');

const CLI = path.resolve(__dirname, '../../scripts/goal-control.js');
const AT = '2026-10-25T12:00:00Z';
const NEXT = 'Implement the admitted remaining output.';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-metadata-refresh-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const repos = ['backend', 'frontend'].map(id => {
    const dir = path.join(root, id);
    fs.mkdirSync(dir);
    for (const args of [['init'], ['config', 'user.email', 'fixture@example.invalid'],
      ['config', 'user.name', 'Metadata Test']]) {
      const result = spawnSync('git', args, { cwd: dir, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
    }
    fs.writeFileSync(path.join(dir, 'source.txt'), 'original\n');
    for (const args of [['add', '.'], ['commit', '-m', 'fixture']]) {
      const result = spawnSync('git', args, { cwd: dir, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
    }
    return captureRepositoryState(dir, { repoId: `explicit-${id}` });
  });
  const dir = path.join(root, 'goal');
  fs.mkdirSync(dir);
  const proof = {
    id: 'output', description: 'Visible output', lane_id: 'delivery', required_stage: 'ui_displayed',
    required_evidence_kinds: ['browser'], required_repositories: repos.map(repo => repo.repo_id),
    allowed_result_classes: ['user_visible_result'], acceptance_predicate: 'Visible authentic output',
    requires_authentic: true, requires_user_visible: true, subject_scope: 'fixture', required: true,
  };
  const goal = {
    schema: 'ecc.active-goal.v1', goal_id: 'preserved-goal', mode: 'controlled', proof_profile: 'frontend',
    objective: 'Preserve the whole existing objective.', current_priority: 'Deliver the remaining output.',
    non_goals: [], user_visible_proofs: [proof],
    lanes: ['delivery', 'science'].map(id => ({ id, description: id, status: 'blocked', blocker: 'External input', next_action: null })),
    owner_corrections: [{ id: 'latest-owner', recorded_at: AT, instruction: 'Continue the same goal.',
      priority: 'Deliver the remaining output.', checkpoint_proof_id: 'output', next_action: NEXT, source_harness: 'codex', replaces: [] }],
    forecast: { state: 'off_track', confidence: 'none', basis: null, critical_path: ['output'], likely_hours: null,
      next_checkpoint_at: null, checkpoint_started_at: null, checkpoint_proof_id: 'output', updated_at: AT },
    status: 'active', updated_at: AT,
  };
  const previous = {
    schema: 'ecc.resume-receipt.v1', receipt_id: 'previous', goal_id: goal.goal_id, observed_at: AT,
    repository_state: repos[1], repository_states: repos,
    inherited_claims: [{ claim: 'Prior API evidence', status: 'unverified', evidence: 'retained://api' },
      { claim: 'Prior export evidence', status: 'verified_current', evidence: 'retained://export' }],
    last_user_visible_result: 'Retained visible result.', next_action: NEXT,
    blocked_lanes: ['delivery', 'science'], independent_work_remaining: ['Owned local repair'],
    spending: { observed_usd: 0, approved_ceiling_usd: 100, ci_runs: 2, verified_at: AT }, source_harness: 'codex',
  };
  const files = {
    goal: path.join(dir, 'active-goal.yaml'), resume: path.join(dir, 'resume-receipt.yaml'),
    history: path.join(dir, 'resume-history.jsonl'), outcomes: path.join(dir, 'outcomes.jsonl'),
  };
  validateBundle({ goal, resume: previous });
  // JSON is valid YAML and keeps the fixture easy to inspect.
  fs.writeFileSync(files.goal, JSON.stringify(goal));
  fs.writeFileSync(files.resume, JSON.stringify(previous));
  fs.writeFileSync(files.history, `${JSON.stringify(previous)}\n`);
  fs.writeFileSync(files.outcomes, '');
  const invoke = (...args) => spawnSync(process.execPath, [CLI, 'resume', '--dir', dir,
    ...args.includes('--next-action') ? [] : ['--next-action', NEXT],
    '--observed-at', '2026-10-25T13:00:00Z', '--receipt-id', 'refreshed', ...args],
  { cwd: repos[0].repo_root, encoding: 'utf8' });
  return { root, repos, dir, goal, previous, files, invoke };
}

test('metadata refresh preserves multi-repo metadata, primary selection and immutable history while recapturing live source', t => {
  const f = fixture(t);
  const before = Object.fromEntries(Object.entries(f.files).map(([key, file]) => [key, fs.readFileSync(file)]));
  for (const repo of f.repos) fs.writeFileSync(path.join(repo.repo_root, 'source.txt'), 'changed\n');
  const result = f.invoke('--refresh-metadata');
  assert.equal(result.status, 0, result.stderr);
  const receipt = JSON.parse(result.stdout).receipt;
  for (const key of ['goal_id', 'inherited_claims', 'last_user_visible_result', 'blocked_lanes',
    'independent_work_remaining', 'spending', 'source_harness', 'next_action']) {
    assert.deepEqual(receipt[key], f.previous[key], key);
  }
  assert.equal(receipt.repository_state.repo_id, 'explicit-frontend');
  receipt.repository_states.forEach((state, index) => {
    for (const key of ['repo_id', 'repo_root', 'worktree']) assert.equal(state[key], f.repos[index][key]);
    assert.notEqual(state.tree_fingerprint, f.repos[index].tree_fingerprint);
    assert.deepEqual(state, captureRepositoryState(state.repo_root, { repoId: state.repo_id }));
  });
  assert.deepEqual(fs.readFileSync(f.files.goal), before.goal);
  assert.deepEqual(fs.readFileSync(f.files.outcomes), before.outcomes);
  const history = fs.readFileSync(f.files.history, 'utf8');
  assert.ok(history.startsWith(before.history.toString()));
  assert.deepEqual(history.trim().split('\n').map(JSON.parse), [f.previous, receipt]);
});

test('explicit refresh overrides only named metadata and never drops omitted repositories or other inherited claims', t => {
  const f = fixture(t);
  const result = f.invoke('--refresh-metadata', '--repo', `explicit-backend=${f.repos[0].repo_root}`,
    '--blocked-lane', 'science', '--independent-work', 'New independent output', '--observed-usd', '3',
    '--last-result', 'New visible result', '--inherited-claim', 'Updated API claim', '--claim-status', 'contradicted');
  assert.equal(result.status, 0, result.stderr);
  const receipt = JSON.parse(result.stdout).receipt;
  assert.equal(receipt.repository_states.length, 2);
  assert.deepEqual(receipt.blocked_lanes, ['science']);
  assert.deepEqual(receipt.independent_work_remaining, ['New independent output']);
  assert.deepEqual(receipt.spending, { ...f.previous.spending, observed_usd: 3 });
  assert.equal(receipt.last_user_visible_result, 'New visible result');
  assert.deepEqual(receipt.inherited_claims, [{ ...f.previous.inherited_claims[0], claim: 'Updated API claim', status: 'contradicted' },
    f.previous.inherited_claims[1]]);
});

test('ordinary resume retains its original empty defaults and cwd repository behavior', t => {
  const f = fixture(t);
  const result = f.invoke();
  assert.equal(result.status, 0, result.stderr);
  const receipt = JSON.parse(result.stdout).receipt;
  assert.equal(receipt.repository_states.length, 1);
  assert.equal(receipt.repository_state.repo_id, 'backend');
  assert.equal(receipt.last_user_visible_result, null);
  assert.deepEqual(receipt.blocked_lanes, []);
  assert.deepEqual(receipt.independent_work_remaining, []);
  assert.deepEqual(receipt.spending, { observed_usd: null, approved_ceiling_usd: null, ci_runs: null, verified_at: null });
  assert.deepEqual(receipt.inherited_claims, [{ claim: 'No predecessor progress claim was supplied.', status: 'unverified', evidence: null }]);
});

for (const [name, change, error] of [
  ['missing receipt', f => fs.unlinkSync(f.files.resume), /requires an existing resume receipt/],
  ['malformed receipt', f => fs.writeFileSync(f.files.resume, '{}'), /invalid previous resume receipt/],
  ['invalid YAML receipt', f => fs.writeFileSync(f.files.resume, 'a: [broken'), /unexpected end|flow collection/],
  ['foreign goal receipt', f => { f.previous.goal_id = 'foreign'; fs.writeFileSync(f.files.resume, JSON.stringify(f.previous)); }, /belongs to another goal/],
]) {
  test(`refresh refuses ${name} without changing goal, receipt or history`, t => {
    const f = fixture(t);
    change(f);
    const before = Object.values(f.files).map(file => fs.existsSync(file) ? fs.readFileSync(file) : null);
    const result = f.invoke('--refresh-metadata');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, error);
    Object.values(f.files).forEach((file, index) => assert.deepEqual(fs.existsSync(file) ? fs.readFileSync(file) : null, before[index]));
  });
}

test('refresh refuses repository rebinding and still enforces the latest owner correction and normal metadata semantics', t => {
  const f = fixture(t);
  const before = fs.readFileSync(f.files.resume);
  const history = fs.readFileSync(f.files.history);
  for (const [args, reason] of [
    [['--repo', `explicit-backend=${f.repos[1].repo_root}`], /cannot change repository IDs or root bindings/],
    [['--repo', `new-id=${f.repos[0].repo_root}`], /cannot change repository IDs or root bindings/],
    [['--next-action', 'Ignore the latest owner correction.'], /does not match latest owner correction/],
    [['--blocked-lane', 'nonexistent-lane'], /missing blocked lane/],
    [['--observed-usd', '-1'], /must be a non-negative number/],
  ]) {
    const result = f.invoke('--refresh-metadata', ...args);
    assert.notEqual(result.status, 0, result.stdout);
    assert.match(result.stderr, reason);
    assert.deepEqual(fs.readFileSync(f.files.resume), before);
    assert.deepEqual(fs.readFileSync(f.files.history), history);
  }
  assert.equal(readStructuredFile(f.files.goal).owner_corrections[0].next_action, NEXT);
});

test('refresh retains a predecessor missing from history and refuses malformed history before replacement', t => {
  const f = fixture(t);
  fs.writeFileSync(f.files.history, '{broken-history\n');
  const before = fs.readFileSync(f.files.resume);
  const denied = f.invoke('--refresh-metadata');
  assert.notEqual(denied.status, 0);
  assert.match(denied.stderr, /invalid JSONL/);
  assert.deepEqual(fs.readFileSync(f.files.resume), before);
  fs.unlinkSync(f.files.history);
  const result = f.invoke('--refresh-metadata');
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(fs.readFileSync(f.files.history, 'utf8').trim().split('\n').map(JSON.parse),
    [f.previous, JSON.parse(result.stdout).receipt]);
});
