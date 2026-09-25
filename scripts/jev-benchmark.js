#!/usr/bin/env node
'use strict';

/**
 * Repeated live benchmark for the Jev coding router.
 *
 * All states below are hard-coded synthetic examples. The explicit command-line
 * flag prevents accidental non-ZDR use with arbitrary repository or user data.
 */

const { routeError, routeTask } = require('./jev-route');

const CASES = [
  ['error', 'pytest failed: AssertionError: expected 4, received 3', 'test'],
  ['error', 'mypy: Argument 1 has incompatible type str; expected int', 'type'],
  ['error', 'ESLint: no-unused-vars at src/example.ts:12', 'lint'],
  ['error', "Node.js: Cannot find module 'zod'", 'dependency'],
  ['error', 'getaddrinfo ENOTFOUND synthetic.example.invalid', 'environment'],
  ['error', 'A hard-coded API token was detected in a staged fixture', 'security'],
  ['error', 'The process exited unexpectedly without an error message', 'unknown'],
  ['task', 'List the Markdown filenames under the docs directory', 'fast'],
  ['task', 'Implement one API endpoint and its focused unit tests', 'standard'],
  ['task', 'Redesign authentication and tenant isolation across two repositories', 'security'],
  ['task', 'Compare architecture choices across four repositories and propose a migration', 'deep'],
  ['task', 'Decide whether customers should be allowed to edit supplier annual spend', 'manual'],
];

function percentile(values, fraction) {
  if (!values.length) return null;
  const ordered = [...values].sort((a, b) => a - b);
  return ordered[Math.min(ordered.length - 1, Math.ceil(fraction * ordered.length) - 1)];
}

async function main() {
  if (!process.argv.includes('--allow-non-zdr-synthetic')) {
    process.stderr.write('jev-benchmark: pass --allow-non-zdr-synthetic; only built-in states are sent\n');
    process.exitCode = 2;
    return;
  }
  if (!process.env.AI_GATEWAY_API_KEY) {
    process.stderr.write('jev-benchmark: AI_GATEWAY_API_KEY is missing\n');
    process.exitCode = 2;
    return;
  }

  const repeatsArg = process.argv.find(value => value.startsWith('--repeats='));
  const repeats = Number(repeatsArg?.split('=')[1] || 3);
  if (!Number.isInteger(repeats) || repeats < 1 || repeats > 10) {
    process.stderr.write('jev-benchmark: --repeats must be an integer from 1 to 10\n');
    process.exitCode = 2;
    return;
  }

  const env = {
    ...process.env,
    JEV_ENABLED: 'true',
    JEV_SHADOW_MODE: 'false',
    JEV_REQUIRE_ZDR: 'false',
    JEV_ALLOW_NON_ZDR: 'true',
    JEV_TIMEOUT_MS: process.env.JEV_BENCHMARK_TIMEOUT_MS || '2500',
  };
  const results = [];
  for (let repeat = 1; repeat <= repeats; repeat += 1) {
    for (const [kind, state, expected] of CASES) {
      const handler = kind === 'task' ? routeTask : routeError;
      const output = await handler(state, { sensitive: false, env });
      results.push({
        kind,
        expected,
        predicted: output.decision?.value ?? null,
        confidence: output.decision?.confidence ?? null,
        accepted: output.decision?.applied === true,
        latencyMs: output.result?.latencyMs ?? null,
        costUsd: output.result?.costUsd ?? null,
        fallback: output.result?.skipped ?? null,
        status: output.result?.status ?? null,
      });
    }
  }

  const completed = results.filter(result => result.predicted !== null);
  const correct = completed.filter(result => result.predicted === result.expected);
  const accepted = completed.filter(result => result.accepted);
  const acceptedCorrect = accepted.filter(result => result.predicted === result.expected);
  const latencies = completed.map(result => result.latencyMs).filter(Number.isFinite);
  const totalCostUsd = completed.reduce(
    (total, result) => total + Number(result.costUsd || 0),
    0,
  );
  const summary = {
    model: 'typesafe-ai/jev',
    syntheticOnly: true,
    cases: CASES.length,
    repeats,
    requests: results.length,
    completed: completed.length,
    completionRate: results.length ? completed.length / results.length : null,
    rawAccuracy: completed.length ? correct.length / completed.length : null,
    acceptedCoverage: completed.length ? accepted.length / completed.length : null,
    acceptedAccuracy: accepted.length ? acceptedCorrect.length / accepted.length : null,
    p50LatencyMs: percentile(latencies, 0.5),
    p95LatencyMs: percentile(latencies, 0.95),
    totalReportedCostUsd: totalCostUsd.toFixed(8),
    failures: results.filter(result => result.fallback),
    disagreements: completed.filter(result => result.predicted !== result.expected),
  };
  process.stdout.write(`${JSON.stringify(summary)}\n`);
  if (completed.length !== results.length) process.exitCode = 1;
}

main().catch(error => {
  process.stderr.write(`jev-benchmark: ${error?.name || 'unexpected failure'}\n`);
  process.exitCode = 1;
});
