#!/usr/bin/env node
'use strict';

// Read-only check of the files a selected project could load. It deliberately
// does not infer live runtime activation from packaged hooks or instructions.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const MARKERS = ['SEABRIDGE_SAFETY_RULE_START', 'SEABRIDGE_GOAL_PROTOCOL_START'];
const COMMANDS = ['goal-runtime admit', 'goal-runtime final', 'session register'];

function readJson(root, relative) {
  return JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
}

function source(root, relative) {
  const candidate = path.resolve(root, relative);
  if (candidate !== path.resolve(root) && !candidate.startsWith(path.resolve(root) + path.sep)) {
    throw new Error(`entry escapes project root: ${relative}`);
  }
  return fs.existsSync(candidate) && fs.statSync(candidate).isFile()
    ? fs.readFileSync(candidate, 'utf8') : null;
}

function inspectRuntime(adapterRoot, projectRoot, adapter, capability) {
  const issues = [];
  if (!capability) issues.push('missing runtime capability');
  if (capability && capability.instruction_entry !== adapter.entry) {
    issues.push('instruction entry disagrees with capability registry');
  }
  const instruction = source(projectRoot, adapter.entry);
  if (instruction === null) issues.push(`missing project entry ${adapter.entry}`);
  let effective = instruction || '';
  if (adapter.mode === 'import') {
    const imported = adapter.imports;
    const importPattern = new RegExp(`@(?:\\./)?${String(imported).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w./-])`);
    if (!imported || !importPattern.test(effective)) issues.push(`broken import of ${imported || 'canonical policy'}`);
    const canonical = imported ? source(projectRoot, imported) : null;
    if (canonical === null) issues.push(`missing imported policy ${imported}`);
    effective += `\n${canonical || ''}`;
  }
  if (adapter.mode === 'canonical' && adapter.entry !== 'AGENTS.md') {
    issues.push('canonical runtime does not use AGENTS.md');
  }
  for (const marker of MARKERS) if (!effective.includes(marker)) issues.push(`missing ${marker}`);
  for (const command of COMMANDS) if (!effective.includes(command)) issues.push(`missing ${command} instruction`);
  for (const evidence of capability?.evidence || []) {
    if (source(adapterRoot, evidence) === null) issues.push(`missing packaged evidence ${evidence}`);
  }
  const tier = capability?.tier || 'unknown';
  return {
    id: adapter.id,
    tier,
    ready: issues.length === 0,
    status: issues.length ? 'not-ready' : tier === 'instruction' ? 'instruction-only'
      : tier === 'wrapper' ? 'wrapper-ready-not-invoked' : 'hook-package-ready-not-activated',
    liveEnforcementProven: false,
    issues,
  };
}

function inspect({ adapterRoot = ROOT, projectRoot = adapterRoot, runtime = null } = {}) {
  const adapters = readJson(adapterRoot, 'manifests/instruction-adapters.json').adapters;
  const capabilities = readJson(adapterRoot, 'manifests/goal-runtime-capabilities.json').runtimes;
  if (!Array.isArray(adapters) || !Array.isArray(capabilities)) throw new Error('invalid runtime registries');
  const capabilityById = new Map(capabilities.map(item => [item.id, item]));
  const selected = runtime ? adapters.filter(adapter => adapter.id === runtime) : adapters;
  if (!selected.length) throw new Error(`unknown runtime: ${runtime}`);
  const rows = selected.map(adapter => inspectRuntime(adapterRoot, projectRoot, adapter, capabilityById.get(adapter.id)));
  const extraCapabilities = capabilities.filter(item => !adapters.some(adapter => adapter.id === item.id));
  return {
    schema: 'seabridge.agent-adoption-doctor.v1',
    adapterCount: adapters.length,
    checkedCount: rows.length,
    ready: rows.every(row => row.ready) && extraCapabilities.length === 0,
    activation: 'not-tested',
    registryIssues: extraCapabilities.map(item => `capability without instruction adapter: ${item.id}`),
    runtimes: rows,
  };
}

function main(args = process.argv.slice(2)) {
  function option(name) {
    const index = args.indexOf(name);
    return index < 0 ? null : args[index + 1];
  }
  const allowed = new Set(['--adapter-root', '--project', '--runtime', '--json']);
  if (args.some(arg => arg.startsWith('--') && !allowed.has(arg))) throw new Error('unknown option');
  for (const name of ['--adapter-root', '--project', '--runtime']) {
    if (args.includes(name) && (!option(name) || option(name).startsWith('--'))) throw new Error(`${name} needs a value`);
  }
  const result = inspect({
    adapterRoot: option('--adapter-root') ? path.resolve(option('--adapter-root')) : ROOT,
    projectRoot: option('--project') ? path.resolve(option('--project')) : undefined,
    runtime: option('--runtime'),
  });
  process.stdout.write(`${JSON.stringify(result, null, args.includes('--json') ? 2 : 0)}\n`);
  return result.ready ? 0 : 1;
}

if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { process.stderr.write(`agent adoption doctor: ${error.message}\n`); process.exitCode = 2; }
}

module.exports = { inspect, inspectRuntime, main, source };
