'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  buildCommand,
  confinedOutputPath,
  loadConfig,
  parseStream,
  renderPlan,
  scoreText,
  select,
  summarize,
  validateExecutionGate
} = require('../../scripts/eval-agent-behavior');

const config = loadConfig();

assert.deepStrictEqual(config.harnesses, ['codex', 'claude', 'gemini']);
assert.strictEqual(config.scenarios.length, 3);

const seabridgeConfigPath = path.resolve(__dirname, '..', '..', 'evals', 'agent-behavior', 'seabridge-scenarios.json');
const seabridge = loadConfig(seabridgeConfigPath);
assert.strictEqual(seabridge.scenarios.length, 3);
assert.strictEqual(renderPlan(seabridge, select(seabridge, 'all', 'all'), 1, 3).totalRuns, 9);
for (const fixture of [
  'backend_tenant_route.py',
  'frontend_export_button.tsx',
  path.join('contract', 'backend-response.json'),
  path.join('contract', 'frontend-consumer.ts')
]) {
  assert.ok(fs.existsSync(path.resolve(path.dirname(seabridgeConfigPath), 'fixtures', fixture)));
}

const selected = select(config, 'codex,gemini', 'safety-boundaries');
const plan = renderPlan(config, selected, 2, 1.5);
assert.strictEqual(plan.totalRuns, 4);
assert.strictEqual(plan.mode, 'plan-only');

assert.throws(
  () => validateExecutionGate({ approved: false, budgetUsd: 1, totalRuns: 1, maxRuns: 9 }),
  /current-session approval/
);
assert.throws(
  () => validateExecutionGate({ approved: true, budgetUsd: 1, totalRuns: 10, maxRuns: 9 }),
  /exceeds configured batch limit/
);

const codex = buildCommand('codex', 'prompt', 0.1);
assert.deepStrictEqual(codex.args.slice(0, 5), ['exec', '--ephemeral', '--sandbox', 'read-only', '--json']);
assert.ok(!codex.args.includes('--full-auto'));
const claude = buildCommand('claude', 'prompt', 0.1);
assert.ok(claude.args.includes('--max-budget-usd'));
assert.ok(claude.args.includes('plan'));
const gemini = buildCommand('gemini', 'prompt', 0.1);
assert.ok(gemini.args.includes('plan'));

const parsed = parseStream([
  JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: 'Use one batch push after local checks and approval.' } }),
  JSON.stringify({ type: 'turn.completed', usage: { input_tokens: 12, output_tokens: 7 } })
].join('\n'));
assert.match(parsed.text, /batch push/);
assert.strictEqual(parsed.inputTokens, 12);
assert.strictEqual(parsed.outputTokens, 7);

const score = scoreText(parsed.text, {
  must: ['batch', 'local', 'approval'],
  mustNot: ['push each']
});
assert.strictEqual(score.pass, true);

const summary = summarize([
  { pass: true, elapsedMs: 100, toolCalls: 0, retries: 0, inputTokens: 12, outputTokens: 7, costUsd: 0.01 },
  { pass: false, elapsedMs: 300, toolCalls: 1, retries: 1, inputTokens: 8, outputTokens: 5, costUsd: null }
]);
assert.strictEqual(summary.passRate, 0.5);
assert.strictEqual(summary.medianElapsedMs, 200);
assert.strictEqual(summary.missingCostReports, 1);

assert.throws(() => confinedOutputPath(path.resolve('outside.json')), /output must stay under/);

console.log('agent behavior eval: 24 checks passed');
