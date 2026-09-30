#!/usr/bin/env node
'use strict';

// A small, deterministic map of the agent control plane. This is not a
// Graphify code graph and never reads product, tenant, or private memory data.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { expandImports } = require('./check-instruction-stack');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = 'docs/tools/agent-system-map.json';
const SOURCES = Object.freeze([
  'AGENTS.md', 'CLAUDE.md', 'GEMINI.md', 'CODEX.md', 'OPENCODE.md',
  '.github/copilot-instructions.md', '.agents/rules/seabridge-agent-baseline.md',
  '.clinerules', '.cursor/rules/common-agents.md',
  'protocols/SAFETY_AUTHORIZATION_RULE.md', 'protocols/GOAL_PROTOCOL.md',
  'protocols/GOAL_PROTOCOL_SHORT.md',
  'manifests/instruction-adapters.json', 'manifests/goal-runtime-capabilities.json',
  'manifests/goal-proof-profiles.json',
  'scripts/check-instruction-stack.js', 'scripts/goal-control.js',
  'scripts/goal-runtime-bridge.js', 'scripts/eval-goal-runtime-offline.js',
  'scripts/agent-system-map.js',
  'scripts/agent-behavior-report.js', 'scripts/knowledge-freshness.js',
  'scripts/knowledge-query.js', 'hooks/hooks.json', 'hooks/codex-hooks.json',
  '.cursor/hooks.json', '.cursor/hooks/before-submit-prompt.js',
  '.cursor/hooks/stop.js', '.opencode/plugins/ecc-hooks.ts',
  '.gemini/settings.json', '.github/workflows/ci.yml',
  '.github/workflows/harness.yml', 'tests/ci/instruction-stack.test.js',
  'tests/lib/goal-control.test.js', 'tests/scripts/knowledge-freshness.test.js',
]);

function hash(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function file(root, relative) { return path.join(root, ...relative.split('/')); }
function sourceRows(root, sources = SOURCES) {
  if (new Set(sources).size !== sources.length) throw new Error('duplicate source path');
  return [...sources].sort().map(relative => {
    const full = file(root, relative);
    if (!fs.existsSync(full) || !fs.lstatSync(full).isFile()) throw new Error(`missing regular source: ${relative}`);
    // Git may check out text with CRLF on Windows and LF in Linux CI.
    // Hash normalized content so the same committed source has one fingerprint.
    const data = fs.readFileSync(full, 'utf8').replace(/\r\n/g, '\n');
    return { path: relative, sha256: hash(data) };
  });
}

function buildMap(root = ROOT, sources = SOURCES) {
  const rows = sourceRows(root, sources);
  const known = new Set(rows.map(row => row.path));
  const adapterManifest = JSON.parse(fs.readFileSync(file(root, 'manifests/instruction-adapters.json'), 'utf8'));
  if (adapterManifest.canonical !== 'AGENTS.md' || !Array.isArray(adapterManifest.adapters)) {
    throw new Error('instruction adapter manifest has no canonical AGENTS.md contract');
  }
  const adapters = adapterManifest.adapters;
  const capabilities = JSON.parse(fs.readFileSync(file(root, 'manifests/goal-runtime-capabilities.json'), 'utf8'));
  const nodes = rows.map(row => ({ id: `file:${row.path}`, type: 'source', ...row }));
  const edges = [];
  function edge(from, to, type, evidence) {
    if (!known.has(to)) throw new Error(`out-of-scope target ${to}; expand the map deliberately`);
    edges.push({ from, to: `file:${to}`, type, evidence });
  }
  const runtimeIds = new Set();
  for (const adapter of adapters) {
    if (runtimeIds.has(adapter.id)) throw new Error(`duplicate runtime ${adapter.id}`);
    runtimeIds.add(adapter.id);
    nodes.push({ id: `runtime:${adapter.id}`, type: 'runtime', mode: adapter.mode });
    edge(`runtime:${adapter.id}`, adapter.entry, 'instruction-entry', 'manifests/instruction-adapters.json');
    if (adapter.imports) {
      const imported = expandImports(file(root, adapter.entry));
      if (!imported.files.includes(file(root, adapter.imports))) {
        throw new Error(`declared import missing from ${adapter.entry}: @${adapter.imports}`);
      }
      edge(`file:${adapter.entry}`, adapter.imports, 'verified-import', adapter.entry);
    }
  }
  for (const runtime of capabilities.runtimes) {
    if (!runtimeIds.has(runtime.id)) throw new Error(`capability without instruction adapter: ${runtime.id}`);
    if (runtime.instruction_entry) {
      edge(`runtime:${runtime.id}`, runtime.instruction_entry, 'runtime-entry', 'manifests/goal-runtime-capabilities.json');
    }
    for (const evidence of runtime.evidence || []) {
      edge(`runtime:${runtime.id}`, evidence, 'runtime-evidence', 'manifests/goal-runtime-capabilities.json');
    }
  }
  // Exact, scoped path mentions are navigation edges, not semantic claims.
  for (const row of rows) {
    const content = fs.readFileSync(file(root, row.path), 'utf8');
    for (const target of rows) {
      if (row.path !== target.path && content.includes(target.path)) {
        edge(`file:${row.path}`, target.path, 'mentions-path', row.path);
      }
    }
  }
  nodes.sort((a, b) => a.id.localeCompare(b.id));
  edges.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  return {
    schema: 'seabridge.agent-system-map.v1',
    scope: 'ECC agent instructions, runtime adapters, outcome control, evaluation, and CI; no product or tenant data',
    extractor: 'scripts/agent-system-map.js (deterministic, no LLM)',
    sourceFingerprint: hash(JSON.stringify(rows)),
    sources: rows, nodes, edges,
  };
}

function buildMetadata(root = ROOT) {
  let sourceCommit = null;
  let sourceDirty = null;
  try {
    sourceCommit = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    sourceDirty = Boolean(execFileSync('git', ['-C', root, 'status', '--porcelain=v1', '--', ...SOURCES],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim());
  } catch { /* Fixture or exported corpus outside Git: content hash remains authoritative. */ }
  return { generatedAt: new Date().toISOString(), sourceCommit, sourceDirty };
}

function check(root = ROOT, destination = OUTPUT) {
  const target = file(root, destination);
  if (!fs.existsSync(target)) return { fresh: false, reason: 'map missing' };
  try {
    const stored = JSON.parse(fs.readFileSync(target, 'utf8'));
    if (!stored.build || !stored.build.generatedAt || !('sourceCommit' in stored.build)) {
      return { fresh: false, reason: 'map lacks build provenance' };
    }
    const current = buildMap(root);
    delete stored.build; // Build time and Git HEAD are provenance, not the freshness predicate.
    return JSON.stringify(stored) === JSON.stringify(current)
      ? { fresh: true, reason: 'source-bound map matches current files' }
      : { fresh: false, reason: 'map stale or modified; use current source files' };
  } catch (error) {
    return { fresh: false, reason: `map unavailable: ${error.message}` };
  }
}

function main(args = process.argv.slice(2), root = ROOT) {
  if (args.length !== 1 || !['build', 'check'].includes(args[0])) {
    throw new Error('usage: node scripts/agent-system-map.js <build|check>');
  }
  if (args[0] === 'build') {
    const map = buildMap(root);
    map.build = buildMetadata(root);
    const target = file(root, OUTPUT);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${JSON.stringify(map, null, 2)}\n`);
    process.stdout.write(`Agent-system map: ${map.nodes.length} nodes, ${map.edges.length} evidence-labelled edges, 0 model calls.\n`);
    return 0;
  }
  const result = check(root);
  process.stdout.write(`Agent-system map ${result.fresh ? 'fresh' : 'STALE'}: ${result.reason}.\n`);
  return result.fresh ? 0 : 1;
}

if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}
module.exports = { SOURCES, OUTPUT, sourceRows, buildMap, buildMetadata, check, main };
