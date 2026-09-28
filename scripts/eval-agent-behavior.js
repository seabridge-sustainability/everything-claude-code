#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_CONFIG = path.join(ROOT, 'evals', 'agent-behavior', 'scenarios.json');
const DEFAULT_OUTPUT_DIR = path.join(ROOT, 'artifacts', 'agent-runs', 'behavior-evals');
const APPROVAL_ENV = 'SEABRIDGE_AGENT_EVAL_APPROVED';

function optionValue(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

function positiveNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) throw new Error(`${label} must be greater than zero`);
  return number;
}

function positiveInteger(value, label) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${label} must be a positive integer`);
  return number;
}

function loadConfig(file = DEFAULT_CONFIG) {
  const config = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(config.harnesses) || !Array.isArray(config.scenarios)) {
    throw new Error('behavior eval config requires harnesses and scenarios arrays');
  }
  return config;
}

function select(config, requestedHarness, requestedScenario) {
  const harnesses = requestedHarness && requestedHarness !== 'all'
    ? requestedHarness.split(',').map(value => value.trim()).filter(Boolean)
    : config.harnesses;
  const unknown = harnesses.filter(harness => !config.harnesses.includes(harness));
  if (unknown.length) throw new Error(`unknown harness: ${unknown.join(', ')}`);

  const scenarios = requestedScenario && requestedScenario !== 'all'
    ? config.scenarios.filter(scenario => scenario.id === requestedScenario)
    : config.scenarios;
  if (!scenarios.length) throw new Error(`unknown scenario: ${requestedScenario}`);
  return { harnesses, scenarios };
}

function validateExecutionGate({ approved, budgetUsd, totalRuns, maxRuns }) {
  if (!approved) {
    throw new Error(`live agent evals require current-session approval and ${APPROVAL_ENV}=1`);
  }
  positiveNumber(budgetUsd, '--budget-usd');
  if (totalRuns > maxRuns) {
    throw new Error(`requested ${totalRuns} runs exceeds configured batch limit ${maxRuns}`);
  }
}

function buildCommand(harness, prompt, perRunBudgetUsd) {
  if (harness === 'codex') {
    return {
      command: 'codex',
      args: ['exec', '--ephemeral', '--sandbox', 'read-only', '--json', '-'],
      input: prompt,
      hardCostCap: false
    };
  }
  if (harness === 'claude') {
    return {
      command: 'claude',
      args: [
        '--print',
        '--output-format', 'stream-json',
        '--permission-mode', 'plan',
        '--max-budget-usd', perRunBudgetUsd.toFixed(4),
        prompt
      ],
      input: '',
      hardCostCap: true
    };
  }
  if (harness === 'gemini') {
    return {
      command: 'gemini',
      args: ['--prompt', prompt, '--output-format', 'stream-json', '--approval-mode', 'plan'],
      input: '',
      hardCostCap: false
    };
  }
  throw new Error(`unsupported harness: ${harness}`);
}

function contentText(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content
    .filter(item => item && (item.type === 'text' || typeof item.text === 'string'))
    .map(item => item.text || '')
    .join('\n');
}

function extractAssistantText(event) {
  if (!event || typeof event !== 'object') return '';
  if (event.item && event.item.type === 'agent_message') return String(event.item.text || '');
  if (event.type === 'result' && typeof event.result === 'string') return event.result;
  if (event.role === 'assistant') return contentText(event.content || event.text);
  if (event.message && event.message.role === 'assistant') {
    return contentText(event.message.content || event.message.text);
  }
  if (event.type === 'assistant') return contentText(event.content || event.message?.content || event.text);
  return '';
}

function numericValues(object, keys, out = []) {
  if (!object || typeof object !== 'object') return out;
  for (const [key, value] of Object.entries(object)) {
    if (keys.has(key) && Number.isFinite(Number(value))) out.push(Number(value));
    else if (value && typeof value === 'object') numericValues(value, keys, out);
  }
  return out;
}

function parseStream(stdout) {
  const events = [];
  for (const line of String(stdout || '').split(/\r?\n/)) {
    if (!line.trim()) continue;
    try { events.push(JSON.parse(line)); } catch { /* diagnostic text is ignored */ }
  }
  const text = events.map(extractAssistantText).filter(Boolean).join('\n').trim();
  const inputValues = numericValues(events, new Set(['input_tokens', 'inputTokens']));
  const outputValues = numericValues(events, new Set(['output_tokens', 'outputTokens']));
  // Each probe is a single turn. Harnesses may repeat cumulative usage on
  // multiple stream events, so use the maximum instead of double-counting it.
  const inputTokens = inputValues.length ? Math.max(...inputValues) : 0;
  const outputTokens = outputValues.length ? Math.max(...outputValues) : 0;
  const costs = numericValues(events, new Set(['total_cost_usd', 'cost_usd', 'totalCostUsd']));
  const toolCalls = events.filter(event => {
    const type = String(event.type || event.item?.type || '').toLowerCase();
    return /tool_use|tool_call|command_execution|mcp_tool/.test(type);
  }).length;
  const retries = events.filter(event => /retry/i.test(String(event.type || event.subtype || ''))).length;
  return {
    events: events.length,
    text,
    inputTokens,
    outputTokens,
    costUsd: costs.length ? Math.max(...costs) : null,
    toolCalls,
    retries
  };
}

function scoreText(text, scenario) {
  const missing = (scenario.must || []).filter(pattern => !new RegExp(pattern, 'i').test(text));
  const harmful = (scenario.mustNot || []).filter(pattern => new RegExp(pattern, 'i').test(text));
  return { pass: missing.length === 0 && harmful.length === 0, missing, harmful };
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function summarize(results) {
  const passed = results.filter(result => result.pass).length;
  return {
    runs: results.length,
    passed,
    passRate: results.length ? passed / results.length : 0,
    medianElapsedMs: median(results.map(result => result.elapsedMs)),
    toolCalls: results.reduce((total, result) => total + result.toolCalls, 0),
    retries: results.reduce((total, result) => total + result.retries, 0),
    inputTokens: results.reduce((total, result) => total + result.inputTokens, 0),
    outputTokens: results.reduce((total, result) => total + result.outputTokens, 0),
    observedCostUsd: results.reduce((total, result) => total + (result.costUsd || 0), 0),
    missingCostReports: results.filter(result => result.costUsd === null).length
  };
}

function confinedOutputPath(requested) {
  const candidate = path.resolve(requested || path.join(DEFAULT_OUTPUT_DIR, `run-${Date.now()}.json`));
  const root = path.resolve(DEFAULT_OUTPUT_DIR);
  if (candidate !== root && !candidate.startsWith(root + path.sep)) {
    throw new Error(`output must stay under ${path.relative(ROOT, root)}`);
  }
  return candidate;
}

function renderPlan(config, selected, runs, budgetUsd) {
  const totalRuns = selected.harnesses.length * selected.scenarios.length * runs;
  const perRun = budgetUsd ? budgetUsd / totalRuns : null;
  return {
    mode: 'plan-only',
    cadenceDays: config.cadenceDays,
    harnesses: selected.harnesses,
    scenarios: selected.scenarios.map(scenario => scenario.id),
    runsPerCombination: runs,
    totalRuns,
    budgetUsd: budgetUsd || null,
    perRunBudgetUsd: perRun,
    note: 'No model was called. Codex and Gemini do not expose a hard CLI cost cap; the batch limit and approved total budget are operational guards.'
  };
}

function runBatch({ config, configPath, selected, runs, budgetUsd, outputPath }) {
  const totalRuns = selected.harnesses.length * selected.scenarios.length * runs;
  const perRunBudgetUsd = budgetUsd / totalRuns;
  const results = [];

  for (const harness of selected.harnesses) {
    for (const scenario of selected.scenarios) {
      for (let run = 1; run <= runs; run += 1) {
        const spec = buildCommand(harness, scenario.prompt, perRunBudgetUsd);
        const started = Date.now();
        const child = spawnSync(spec.command, spec.args, {
          cwd: ROOT,
          input: spec.input,
          encoding: 'utf8',
          windowsHide: true,
          timeout: 10 * 60 * 1000,
          maxBuffer: 16 * 1024 * 1024,
          env: process.env
        });
        const parsed = parseStream(child.stdout);
        const score = scoreText(parsed.text, scenario);
        results.push({
          harness,
          scenario: scenario.id,
          run,
          exitCode: child.status,
          signal: child.signal || null,
          elapsedMs: Date.now() - started,
          ...parsed,
          ...score,
          pass: child.status === 0 && score.pass,
          error: child.error ? child.error.message : null,
          hardCostCap: spec.hardCostCap
        });
        const observed = summarize(results).observedCostUsd;
        if (observed > budgetUsd) throw new Error(`observed cost $${observed.toFixed(4)} exceeded approved budget`);
      }
    }
  }

  const report = {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    config: path.relative(ROOT, configPath).replace(/\\/g, '/'),
    approvedBudgetUsd: budgetUsd,
    summary: summarize(results),
    results
  };
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 });
  return report;
}

function main(args = process.argv.slice(2)) {
  const configPath = path.resolve(optionValue(args, '--config') || DEFAULT_CONFIG);
  const config = loadConfig(configPath);
  const selected = select(config, optionValue(args, '--harness'), optionValue(args, '--scenario'));
  const runs = positiveInteger(optionValue(args, '--runs') || '1', '--runs');
  const budgetRaw = optionValue(args, '--budget-usd');
  const budgetUsd = budgetRaw === null ? null : positiveNumber(budgetRaw, '--budget-usd');
  const plan = renderPlan(config, selected, runs, budgetUsd);

  if (!args.includes('--run')) {
    process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
    return 0;
  }

  validateExecutionGate({
    approved: process.env[APPROVAL_ENV] === '1',
    budgetUsd,
    totalRuns: plan.totalRuns,
    maxRuns: config.maxRunsPerBatch
  });
  const outputPath = confinedOutputPath(optionValue(args, '--output'));
  const report = runBatch({ config, configPath, selected, runs, budgetUsd, outputPath });
  process.stdout.write(`${JSON.stringify({ output: path.relative(ROOT, outputPath), summary: report.summary }, null, 2)}\n`);
  return report.summary.passed === report.summary.runs ? 0 : 1;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    process.stderr.write(`agent behavior eval: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = {
  buildCommand,
  confinedOutputPath,
  extractAssistantText,
  loadConfig,
  main,
  parseStream,
  renderPlan,
  scoreText,
  select,
  summarize,
  validateExecutionGate
};
