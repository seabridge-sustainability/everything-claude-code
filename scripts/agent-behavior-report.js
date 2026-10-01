#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_INPUT = path.join(ROOT, 'artifacts', 'agent-runs', 'behavior-evals');

function optionValue(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

function resultFiles(inputPath) {
  const resolved = path.resolve(inputPath || DEFAULT_INPUT);
  if (!fs.existsSync(resolved)) return [];
  const stat = fs.statSync(resolved);
  if (stat.isFile()) return [resolved];
  if (!stat.isDirectory()) return [];
  return fs.readdirSync(resolved, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.json'))
    .map(entry => path.join(resolved, entry.name))
    .sort();
}

function loadRuns(inputPath) {
  const runs = [];
  for (const file of resultFiles(inputPath)) {
    let report;
    try {
      report = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      throw new Error(`invalid behavior-eval report ${file}: ${error.message}`);
    }
    if (!Array.isArray(report.results)) continue;
    for (const result of report.results) {
      if (!result || typeof result !== 'object' || typeof result.harness !== 'string') continue;
      runs.push({ ...result, source: path.relative(ROOT, file).replace(/\\/g, '/') });
    }
  }
  return runs;
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function aggregateGroup(results) {
  const valid = results.filter(result => result.validRun !== false && !result.infraError);
  const successful = valid.filter(result => result.pass === true);
  const knownCosts = results.filter(result => Number.isFinite(result.costUsd));
  const totalElapsedMs = results.reduce((sum, result) => sum + (Number(result.elapsedMs) || 0), 0);
  const observedCostUsd = knownCosts.reduce((sum, result) => sum + Number(result.costUsd), 0);
  const observedMetric = field => results.every(result => Number.isFinite(result[field]))
    ? results.reduce((sum, result) => sum + result[field], 0) : null;
  return {
    runs: results.length,
    validRuns: valid.length,
    infraFailures: results.length - valid.length,
    successes: successful.length,
    passRate: valid.length ? successful.length / valid.length : 0,
    medianElapsedMs: median(valid.map(result => Number(result.elapsedMs) || 0)),
    elapsedPerSuccessMs: successful.length ? totalElapsedMs / successful.length : null,
    toolCalls: results.reduce((sum, result) => sum + (Number(result.toolCalls) || 0), 0),
    retries: results.reduce((sum, result) => sum + (Number(result.retries) || 0), 0),
    tokens: results.reduce((sum, result) => sum + (Number(result.inputTokens) || 0) + (Number(result.outputTokens) || 0), 0),
    observedCostUsd,
    costCoverage: results.length ? knownCosts.length / results.length : 0,
    costPerSuccessUsd: successful.length > 0 && knownCosts.length === results.length
      ? observedCostUsd / successful.length
      : null,
    ciMinutes: observedMetric('ciMinutes'),
    cancelledCiMinutes: observedMetric('cancelledCiMinutes'),
    deployments: observedMetric('deployments')
  };
}

function buildReport(results) {
  const byHarness = {};
  for (const harness of [...new Set(results.map(result => result.harness))].sort()) {
    byHarness[harness] = aggregateGroup(results.filter(result => result.harness === harness));
  }
  const byModel = {};
  for (const model of [...new Set(results.map(result => result.model || 'unreported'))].sort()) {
    byModel[model] = aggregateGroup(results.filter(result => (result.model || 'unreported') === model));
  }
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    sourceFiles: [...new Set(results.map(result => result.source))].sort(),
    overall: aggregateGroup(results),
    byHarness,
    byModel
  };
}

function formatMoney(value) {
  return value === null ? 'unknown' : `$${value.toFixed(4)}`;
}

function renderMarkdown(report) {
  const lines = [
    '# Agent behavior ROI',
    '',
    '| Harness | Success / valid | Infra | Median time | Time / success | Cost / success | Cost coverage | Tokens | Tools | Retries | CI min | Cancelled CI min | Deploys |',
    '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|'
  ];
  for (const [harness, row] of Object.entries(report.byHarness)) {
    lines.push(`| ${harness} | ${row.successes}/${row.validRuns} (${(row.passRate * 100).toFixed(1)}%) | ${row.infraFailures} | ${(row.medianElapsedMs / 1000).toFixed(2)}s | ${row.elapsedPerSuccessMs === null ? 'n/a' : `${(row.elapsedPerSuccessMs / 1000).toFixed(2)}s`} | ${formatMoney(row.costPerSuccessUsd)} | ${(row.costCoverage * 100).toFixed(0)}% | ${row.tokens} | ${row.toolCalls} | ${row.retries} | ${row.ciMinutes ?? 'unknown'} | ${row.cancelledCiMinutes ?? 'unknown'} | ${row.deployments ?? 'unknown'} |`);
  }
  lines.push('', `Runs: ${report.overall.runs}. Cost per success includes failed-attempt spend and is reported only when every run supplied provider cost telemetry. CI and deployment totals are unknown unless every row supplied them.`);
  return `${lines.join('\n')}\n`;
}

function confinedWritePath(requested) {
  const candidate = path.resolve(requested);
  const root = path.resolve(DEFAULT_INPUT);
  if (candidate !== root && !candidate.startsWith(root + path.sep)) {
    throw new Error(`report output must stay under ${path.relative(ROOT, root)}`);
  }
  return candidate;
}

function main(args = process.argv.slice(2)) {
  const results = loadRuns(optionValue(args, '--input') || DEFAULT_INPUT);
  if (!results.length) throw new Error('no behavior-eval result rows found; run an approved eval batch first');
  const report = buildReport(results);
  const output = args.includes('--json')
    ? `${JSON.stringify(report, null, 2)}\n`
    : renderMarkdown(report);
  const requestedWrite = optionValue(args, '--write');
  if (requestedWrite) {
    const destination = confinedWritePath(requestedWrite);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, output, { encoding: 'utf8', mode: 0o600 });
  } else {
    process.stdout.write(output);
  }
  return 0;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    process.stderr.write(`agent behavior report: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = {
  aggregateGroup,
  buildReport,
  confinedWritePath,
  loadRuns,
  main,
  renderMarkdown,
  resultFiles
};
