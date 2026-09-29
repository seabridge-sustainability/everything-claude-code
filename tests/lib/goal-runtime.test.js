'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  admissionDecision,
  classifyTaskText,
  inferClaim,
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
  assert.strictEqual(inferClaim('Everything is complete and verified.'), 'complete');
  assert.strictEqual(inferClaim('The goal is blocked as a whole.'), 'blocked');
  assert.strictEqual(inferClaim('The work remains on track.'), 'on-track');
  assert.strictEqual(inferClaim('This is not complete; two proofs remain.'), null);
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
