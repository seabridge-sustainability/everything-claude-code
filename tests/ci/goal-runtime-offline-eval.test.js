'use strict';

const assert = require('assert');
const { evaluate } = require('../../scripts/eval-goal-runtime-offline');

const report = evaluate();
assert.strictEqual(report.provider_calls, 0);
assert.strictEqual(report.runtime_count, 18);
assert.deepStrictEqual(report.model_families_covered.sort(), [
  'claude', 'deepseek', 'fable', 'gemini', 'glm', 'gpt', 'nemotron',
]);
assert.strictEqual(report.passed, true);
for (const result of report.results) {
  assert.strictEqual(result.admitted_valid_goal, true, result.runtime);
  assert.strictEqual(result.rejected_unregistered_session, true, result.runtime);
  assert.strictEqual(result.allowed_verified_complete, true, result.runtime);
  assert.strictEqual(result.rejected_all_null_complete, true, result.runtime);
}

console.log('goal runtime offline eval: 18/18 runtimes, 7/7 model families, provider calls 0');
