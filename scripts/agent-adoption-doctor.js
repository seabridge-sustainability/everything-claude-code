#!/usr/bin/env node
'use strict';

// Read-only check of the files a selected project could load. It deliberately
// does not infer live runtime activation from packaged hooks or instructions.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

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

function readFile(file) {
  try { return fs.readFileSync(file, 'utf8'); } catch { return ''; }
}

function normalized(value) {
  return String(value || '').replace(/^file:\/\/\//i, '').replace(/\\/g, '/').toLowerCase();
}

function pointsToRuntime(content, adapterRoot) {
  return normalized(content).includes(normalized(adapterRoot));
}

function configuredClaudeHooks(homeDir, projectRoot) {
  const settings = [path.join(homeDir, '.claude', 'settings.json'),
    path.join(projectRoot, '.claude', 'settings.json'),
    path.join(projectRoot, '.claude', 'settings.local.json')];
  const events = { UserPromptSubmit: false, Stop: false };
  for (const file of settings) {
    let parsed;
    try { parsed = JSON.parse(readFile(file)); } catch { continue; }
    for (const [event, phase] of [['UserPromptSubmit', 'admit'], ['Stop', 'final']]) {
      const entries = parsed?.hooks?.[event] || [];
      if (Array.isArray(entries) && entries.some(entry => Array.isArray(entry.hooks)
        && entry.hooks.some(hook => typeof hook.command === 'string'
          && /(?:goal-runtime-gate|ecc-goal-gate)\.js/i.test(hook.command)
          && new RegExp(`\\bclaude\\s+${phase}\\b`, 'i').test(hook.command)))) events[event] = true;
    }
  }
  return events;
}

function localProbe(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8', timeout: 10000, windowsHide: true });
  return result.status === 0 ? result.stdout : null;
}

// Optional, read-only installation check. A configured pointer or hook is not
// evidence that a live conversation executed it.
function inspectInstallation({ adapterRoot, projectRoot, homeDir = os.homedir(), probe = localProbe }) {
  const pointer = (relative) => pointsToRuntime(readFile(path.join(homeDir, relative)), adapterRoot);
  const codexPointer = pointer(path.join('.codex', 'AGENTS.md'));
  const claudePointer = pointer(path.join('.claude', 'CLAUDE.md'));
  const geminiPointer = pointer(path.join('.gemini', 'GEMINI.md'));
  const openCodePointer = pointer(path.join('.config', 'opencode', 'AGENTS.md'));
  const hooks = configuredClaudeHooks(homeDir, projectRoot);
  const pluginList = probe('claude', ['plugin', 'list']);
  const eccPlugin = typeof pluginList === 'string' && pluginList.split(/(?=^\s*>)/m).some(block =>
    /^\s*>\s*(?:ecc|everything-claude-code)(?:@|\s)/i.test(block)
      && /^\s*Status:\s*.*loaded\s*$/im.test(block)
      && pointsToRuntime(block, adapterRoot));
  // `opencode debug config` can rewrite a project's package manifest while
  // resolving plugins. Inspect the declarative config instead: it is evidence
  // of configuration, never evidence that a runtime loaded the plugin.
  const openCodeConfig = readFile(path.join(homeDir, '.config', 'opencode', 'opencode.jsonc'));
  const openCodeConfigured = pointsToRuntime(openCodeConfig, adapterRoot)
    && /\.opencode\/dist\/plugins/i.test(normalized(openCodeConfig))
    && fs.existsSync(path.join(adapterRoot, '.opencode', 'dist', 'plugins', 'index.js'));
  const rows = [
    { id: 'codex', pointerCurrent: codexPointer, gateConfigured: false, status: codexPointer ? 'instructions-configured-wrapper-required' : 'not-configured' },
    { id: 'claude', pointerCurrent: claudePointer, gateConfigured: Boolean(eccPlugin || (hooks.UserPromptSubmit && hooks.Stop)),
      status: claudePointer && (eccPlugin || (hooks.UserPromptSubmit && hooks.Stop)) ? 'hook-configured-not-observed' : 'not-configured',
      hookEventsConfigured: hooks, pluginLoaded: Boolean(eccPlugin) },
    { id: 'gemini', pointerCurrent: geminiPointer, gateConfigured: false, status: geminiPointer ? 'instructions-configured-wrapper-required' : 'not-configured' },
    { id: 'opencode', pointerCurrent: openCodePointer, gateConfigured: openCodeConfigured,
      status: openCodePointer && openCodeConfigured ? 'plugin-configured-not-observed' : 'not-configured' },
  ];
  return { status: rows.every(row => row.status !== 'not-configured') ? 'configured-not-observed' : 'incomplete',
    activation: 'not-observed', providerCalls: 0, runtimes: rows };
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

function inspect({ adapterRoot = ROOT, projectRoot = adapterRoot, runtime = null,
  installation = false, homeDir, probe } = {}) {
  const adapters = readJson(adapterRoot, 'manifests/instruction-adapters.json').adapters;
  const capabilities = readJson(adapterRoot, 'manifests/goal-runtime-capabilities.json').runtimes;
  if (!Array.isArray(adapters) || !Array.isArray(capabilities)) throw new Error('invalid runtime registries');
  const capabilityById = new Map(capabilities.map(item => [item.id, item]));
  const selected = runtime ? adapters.filter(adapter => adapter.id === runtime) : adapters;
  if (!selected.length) throw new Error(`unknown runtime: ${runtime}`);
  const rows = selected.map(adapter => inspectRuntime(adapterRoot, projectRoot, adapter, capabilityById.get(adapter.id)));
  const extraCapabilities = capabilities.filter(item => !adapters.some(adapter => adapter.id === item.id));
  const result = {
    schema: 'seabridge.agent-adoption-doctor.v1',
    adapterCount: adapters.length,
    checkedCount: rows.length,
    ready: rows.every(row => row.ready) && extraCapabilities.length === 0,
    activation: 'not-tested',
    registryIssues: extraCapabilities.map(item => `capability without instruction adapter: ${item.id}`),
    runtimes: rows,
  };
  if (installation) result.installation = inspectInstallation({ adapterRoot, projectRoot, homeDir, probe });
  return result;
}

function main(args = process.argv.slice(2)) {
  function option(name) {
    const index = args.indexOf(name);
    return index < 0 ? null : args[index + 1];
  }
  const allowed = new Set(['--adapter-root', '--project', '--runtime', '--json', '--installation']);
  if (args.some(arg => arg.startsWith('--') && !allowed.has(arg))) throw new Error('unknown option');
  for (const name of ['--adapter-root', '--project', '--runtime']) {
    if (args.includes(name) && (!option(name) || option(name).startsWith('--'))) throw new Error(`${name} needs a value`);
  }
  const result = inspect({
    adapterRoot: option('--adapter-root') ? path.resolve(option('--adapter-root')) : ROOT,
    projectRoot: option('--project') ? path.resolve(option('--project')) : undefined,
    runtime: option('--runtime'),
    installation: args.includes('--installation'),
  });
  process.stdout.write(`${JSON.stringify(result, null, args.includes('--json') ? 2 : 0)}\n`);
  return result.ready ? 0 : 1;
}

if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { process.stderr.write(`agent adoption doctor: ${error.message}\n`); process.exitCode = 2; }
}

module.exports = { inspect, inspectInstallation, inspectRuntime, main, source };
