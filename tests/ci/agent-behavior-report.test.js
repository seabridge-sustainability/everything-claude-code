'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  aggregateGroup,
  buildReport,
  confinedWritePath,
  loadRuns,
  renderMarkdown
} = require('../../scripts/agent-behavior-report');

const rows = [
  { harness: 'codex', pass: true, elapsedMs: 1000, toolCalls: 1, retries: 0, inputTokens: 10, outputTokens: 5, costUsd: 0.02, source: 'a.json' },
  { harness: 'codex', pass: false, elapsedMs: 3000, toolCalls: 2, retries: 1, inputTokens: 20, outputTokens: 10, costUsd: 0.03, source: 'a.json' },
  { harness: 'gemini', pass: true, elapsedMs: 2000, toolCalls: 0, retries: 0, inputTokens: 8, outputTokens: 4, costUsd: null, source: 'b.json' }
];

const codex = aggregateGroup(rows.slice(0, 2));
assert.strictEqual(codex.passRate, 0.5);
assert.strictEqual(codex.elapsedPerSuccessMs, 4000);
assert.strictEqual(codex.costPerSuccessUsd, 0.02);

const report = buildReport(rows);
assert.deepStrictEqual(Object.keys(report.byHarness), ['codex', 'gemini']);
assert.strictEqual(report.byHarness.gemini.costPerSuccessUsd, null);
assert.match(renderMarkdown(report), /Cost \/ success/);
assert.match(renderMarkdown(report), /unknown/);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-agent-roi-'));
try {
  fs.writeFileSync(path.join(temp, 'run.json'), JSON.stringify({ results: rows.slice(0, 2) }));
  fs.writeFileSync(path.join(temp, 'not-a-run.json'), JSON.stringify({ schemaVersion: 1 }));
  assert.strictEqual(loadRuns(temp).length, 2);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

assert.throws(() => confinedWritePath(path.resolve('outside-roi.md')), /must stay under/);

console.log('agent behavior ROI report: 9 checks passed');
