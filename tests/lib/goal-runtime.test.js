'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const {
  admissionDecision,
  citedCommits,
  classifyTaskText,
  inferClaim,
  completionIntent,
  requireSupervisedIntent,
  loadCapabilities,
  validateCapabilities,
} = require('../../scripts/lib/goal-runtime');

const tests = [];
function test(name, fn) { tests.push([name, fn]); }

test('runtime registry covers every instruction adapter', () => {
  const capabilities = loadCapabilities();
  assert.deepStrictEqual(validateCapabilities(capabilities), []);
  assert.strictEqual(capabilities.runtimes.length, 18);
});

test('native runtime wiring has a negative control', () => {
  const capabilities = loadCapabilities();
  const evidenceText = {};
  for (const runtime of capabilities.runtimes) {
    for (const source of runtime.evidence || []) {
      evidenceText[source] = fs.readFileSync(path.join(__dirname, '..', '..', source), 'utf8');
    }
  }
  evidenceText['hooks/hooks.json'] = evidenceText['hooks/hooks.json'].replaceAll('goal-runtime-gate', 'disabled-goal-gate');
  const errors = validateCapabilities(capabilities, { evidenceText });
  assert.ok(errors.includes('native runtime claude does not invoke the canonical goal runtime gate'));
});

test('controlled admission decision is identical across runtimes and models', () => {
  const capabilities = loadCapabilities();
  for (const runtime of capabilities.runtimes) {
    const first = admissionDecision({
      runtimeId: runtime.id,
      mode: 'controlled',
      goalExists: false,
      model: 'provider/model-a',
    }, capabilities);
    const second = admissionDecision({
      runtimeId: runtime.id,
      mode: 'controlled',
      goalExists: false,
      model: 'provider/model-b',
    }, capabilities);
    assert.strictEqual(first.admitted, false, runtime.id);
    assert.strictEqual(second.admitted, false, runtime.id);
    assert.strictEqual(first.reason, second.reason, runtime.id);
    assert.strictEqual(first.next_action, second.next_action, runtime.id);
  }
});

test('task classification is risk-scaled and deterministic', () => {
  assert.strictEqual(classifyTaskText('Explain this function without changing files.').mode, 'lightweight');
  assert.strictEqual(classifyTaskText('Fix the parser and run its tests.').mode, 'standard');
  assert.strictEqual(classifyTaskText('/goal Resume this cross-repo migration with parallel agents.').mode, 'controlled');
});

test('final claim inference avoids explicit negative claims', () => {
  assert.strictEqual(inferClaim('Do not claim "goal achieved" until the proof passes.'), null);
  assert.strictEqual(inferClaim('Everything is complete and verified.'), 'complete');
  assert.strictEqual(inferClaim('The goal is blocked as a whole.'), 'blocked');
  assert.strictEqual(inferClaim('The work remains on track.'), 'on-track');
  assert.strictEqual(inferClaim('This is not complete; two proofs remain.'), null);
  assert.strictEqual(inferClaim('Two bounded source-only reviews completed: Astra 32/35 operations. They produced review receipts, not new features.'), null);
  assert.strictEqual(inferClaim('Handoff complete; whole-building MVP remains incomplete.'), null);
  assert.strictEqual(inferClaim('The whole-building MVP is complete and accepted.'), 'complete');
  assert.strictEqual(inferClaim('My work is finished.'), 'complete');
  assert.strictEqual(inferClaim('I have completed the task.'), 'complete');
  assert.strictEqual(inferClaim('The work is not on track.'), null);
  assert.strictEqual(inferClaim('The goal is not blocked as a whole.'), null);
  assert.strictEqual(inferClaim('The old prototype is not complete; the goal is complete.'), 'complete');
  assert.strictEqual(inferClaim('Done.'), 'complete');
});

test('supervised final turns require intent while progress remains unaccepted', () => {
  assert.throws(() => requireSupervisedIntent({mode:'supervised'}, null), /explicit structured completion intent/);
  for (const intent of ['progress','incomplete','complete']) {
    assert.doesNotThrow(() => requireSupervisedIntent({mode:'supervised'}, {intent}));
  }
  assert.doesNotThrow(() => requireSupervisedIntent({mode:'single-agent'}, null));
  assert.doesNotThrow(() => requireSupervisedIntent(null, null));
});

test('structured lifecycle intent is explicit and bound, independently of prose', () => {
  const bound = { version: 1, intent: 'complete', goal_id: 'g', session_id: 'parent', contract_sha256: 'a'.repeat(64) };
  assert.deepStrictEqual(completionIntent({ ecc_completion: bound, text: 'All requested deliverables are implemented.' }), bound);
  assert.strictEqual(completionIntent({ text: 'The full integration is complete.' }), null);
  for (const intent of ['progress', 'incomplete']) assert.strictEqual(completionIntent({ ecc_completion: { ...bound, intent } }).intent, intent);
  for (const invalid of [{}, { ...bound, intent: 'accepted' }, { ...bound, session_id: '' }, { ...bound, contract_sha256: 'changed' }]) {
    assert.throws(() => completionIntent({ ecc_completion: invalid }), /invalid structured completion intent/);
  }
});

test('cited commit extraction finds SHA-like tokens and skips IDs, colors and digests', () => {
  // Deterministic synthetic SHA-shaped input, not a credential.
  const syntheticCommit = '0123456789abcdef'.repeat(2) + '01234567';
  assert.deepStrictEqual(citedCommits(`Committed e6126e2a6; pushed e6126e2a6 and ${syntheticCommit}.`),
    ['e6126e2a6', syntheticCommit]);
  assert.deepStrictEqual(citedCommits('Thread 01a18a4b-37a9-7852-a1da-39d6f6e264a4, run_83af29cecbbe, #0f2757aa, '
    + `sha256 ${'ab12'.repeat(16)}, build 20261030, word deadbeef.`), []);
  assert.deepStrictEqual(citedCommits(''), []);
  assert.deepStrictEqual(citedCommits('Committed deadbeef; commit 12345678; SHA ABCDEF12; commit ID `DEADBEEF`.'),
    ['deadbeef', '12345678', 'abcdef12']);
  assert.deepStrictEqual(citedCommits('Commits `DEADBEEF`, ABCDEF12 and 12345678.'), ['deadbeef', 'abcdef12', '12345678']);
  assert.deepStrictEqual(citedCommits('Company ID 507f1f77bcf86cd799439011; MD5 d41d8cd98f00b204e9800998ecf8427e.'), []);
  assert.deepStrictEqual(citedCommits('https://example.invalid/repo/commit/ABCDEF12'), ['abcdef12']);
});

test('commit observation is offline, bounded and unambiguous across repositories', () => {
  const { missingCommits } = require('../../scripts/goal-runtime-bridge');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-commit-observation-'));
  try {
    const other = path.join(dir, 'other'); fs.mkdirSync(other);
    const prefix = 'abc1234', full = prefix + '0'.repeat(33);
    let calls = 0;
    const observe = (command, args, options) => {
      calls++;
      assert.strictEqual(command, 'git');
      assert.deepStrictEqual(args.slice(-2), ['cat-file', '--batch-check']);
      assert.strictEqual(options.input, prefix + '^{commit}\n');
      assert.ok(options.timeout > 0 && options.timeout <= 1000);
      assert.strictEqual(options.shell, false);
      assert.strictEqual(options.env.GIT_NO_LAZY_FETCH, '1');
      assert.strictEqual(options.env.GIT_TERMINAL_PROMPT, '0');
      return { status: 0, stdout: `${full} commit 100\n` };
    };
    assert.deepStrictEqual(missingCommits(`Commit ${prefix}`, [dir, dir, other], observe), []);
    assert.strictEqual(calls, 2);
    assert.deepStrictEqual(missingCommits(`Commit ${prefix}`, [dir, other], (command, args) =>
      ({ status: 0, stdout: `${args[1] === fs.realpathSync(dir) ? full : prefix + '1'.repeat(33)} commit 100\n` })), [prefix]);
    // A branch bearing the claimed prefix is not that commit object.
    assert.deepStrictEqual(missingCommits(`Commit ${prefix}`, [dir], () =>
      ({ status: 0, stdout: `${'f'.repeat(40)} commit 100\n` })), [prefix]);
    assert.deepStrictEqual(missingCommits(`Commit ${prefix}`, [dir], () =>
      ({ status: 0, stdout: `${prefix}^{commit} missing\n` })), [prefix]);
    assert.throws(() => missingCommits(`Commit ${prefix}`, [dir], () => ({ status: null, error: Error('timeout') })), /unavailable/);
    assert.throws(() => missingCommits(`Commit ${prefix}`, [dir], () => ({ status: 0, stdout: '' })), /invalid|incomplete/);
    assert.throws(() => missingCommits(Array.from({length:33}, (_, i) => `commit a${i.toString(16).padStart(6,'0')}`).join('; '), [dir], observe), /bounded scope/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

(async () => {
  let passed = 0;
  let failed = 0;
  console.log('\n=== Testing ECC goal runtime bridge ===\n');
  for (const [name, fn] of tests) {
    try {
      await fn();
      console.log(`  \u2713 ${name}`);
      passed += 1;
    } catch (error) {
      console.log(`  \u2717 ${name}`);
      console.error(`    ${error.stack || error.message}`);
      failed += 1;
    }
  }
  console.log(`\nPassed: ${passed}`);
  console.log(`Failed: ${failed}`);
  process.exitCode = failed ? 1 : 0;
})();
