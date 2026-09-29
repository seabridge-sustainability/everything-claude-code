#!/usr/bin/env node
'use strict';

/**
 * Freshness for generated knowledge: Graphify code graphs and the operator wiki.
 *
 *   node scripts/knowledge-freshness.js build <repo>            graphify update + BUILD_INFO.json
 *   node scripts/knowledge-freshness.js graphs <repo>... [--json] [--strict]
 *   node scripts/knowledge-freshness.js wiki <workspace> [--json] [--strict]
 *
 * A graph is fresh when it was built at the repo's HEAD and no code file has
 * changed since. Stale output is reported, never silently used. `build` runs
 * only Graphify's local AST pass (`graphify update`), which makes no LLM calls.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const BUILD_INFO_SCHEMA = 'seabridge.graph-build.v1';
const CODE_FILE = /\.(py|pyi|ts|tsx|js|jsx|mjs|cjs|go|rs|java|kt|kts|cs|cpp|cc|cxx|c|h|hpp|rb|php|swift|scala|lua|sh|ps1)$/i;
const TAIL_BYTES = 4096;

function git(repo, args) {
  return execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

function tryGit(repo, args) {
  try {
    return git(repo, args);
  } catch {
    return null;
  }
}

function outDir(repo) {
  return path.join(repo, 'graphify-out');
}

/** Read built_at_commit from the end of graph.json without parsing the whole file. */
function builtAtCommitFromGraph(graphPath) {
  const size = fs.statSync(graphPath).size;
  const fd = fs.openSync(graphPath, 'r');
  try {
    const length = Math.min(size, TAIL_BYTES);
    const buffer = Buffer.alloc(length);
    fs.readSync(fd, buffer, 0, length, size - length);
    const match = /"built_at_commit"\s*:\s*"([0-9a-f]{7,40})"/.exec(buffer.toString('utf8'));
    return match ? match[1] : null;
  } finally {
    fs.closeSync(fd);
  }
}

function readBuildInfo(repo) {
  const file = path.join(outDir(repo), 'BUILD_INFO.json');
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function changedCodeFiles(repo, fromCommit) {
  const committed = tryGit(repo, ['diff', '--name-only', `${fromCommit}`, 'HEAD']) || '';
  const working = tryGit(repo, ['status', '--porcelain', '--untracked-files=no']) || '';
  const files = new Set(committed.split('\n').filter(Boolean));
  for (const line of working.split('\n').filter(Boolean)) files.add(line.slice(3).trim());
  return [...files].filter(file => CODE_FILE.test(file));
}

function graphStatus(repo) {
  const root = path.resolve(repo);
  const graphPath = path.join(outDir(root), 'graph.json');
  const head = tryGit(root, ['rev-parse', 'HEAD']);
  if (!head) return { repo: root, status: 'error', detail: 'not a git repository' };
  if (!fs.existsSync(graphPath)) {
    return { repo: root, status: 'missing', detail: 'no graphify-out/graph.json', rebuild: `graphify update "${root}"` };
  }
  // graph.json's own commit is authoritative; BUILD_INFO.json only adds build
  // time and version, and is ignored when it describes a different build.
  const graphCommit = builtAtCommitFromGraph(graphPath);
  const stored = readBuildInfo(root);
  const info = stored && (!graphCommit || stored.sourceCommit === graphCommit) ? stored : null;
  const builtCommit = graphCommit || (info && info.sourceCommit);
  const base = {
    repo: root,
    head,
    builtCommit,
    builtAt: info ? info.builtAt : fs.statSync(graphPath).mtime.toISOString(),
    graphifyVersion: info ? info.graphifyVersion : null,
  };
  if (!builtCommit) return { ...base, status: 'unknown', detail: 'graph records no source commit', rebuild: `graphify update "${root}"` };
  if (tryGit(root, ['cat-file', '-t', builtCommit]) !== 'commit') {
    return { ...base, status: 'unknown', detail: `source commit ${builtCommit.slice(0, 9)} is not in this repository`, rebuild: `graphify update "${root}"` };
  }
  const commitsBehind = Number(tryGit(root, ['rev-list', '--count', `${builtCommit}..HEAD`]) || 0);
  const changed = changedCodeFiles(root, builtCommit);
  if (changed.length === 0) return { ...base, status: 'fresh', commitsBehind, changedCodeFiles: 0 };
  return {
    ...base,
    status: 'stale',
    commitsBehind,
    changedCodeFiles: changed.length,
    detail: `${changed.length} code file(s) changed since ${builtCommit.slice(0, 9)}`,
    rebuild: `graphify update "${root}"`,
  };
}

function graphifyVersion(bin, prefix) {
  try {
    const out = execFileSync(bin, [...prefix, '--version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const match = /(\d+\.\d+\.\d+)/.exec(out);
    return match ? match[1] : out.trim();
  } catch {
    return null;
  }
}

function build(repo, { bin = process.env.GRAPHIFY_BIN || 'graphify', binPrefix = [], env = process.env } = {}) {
  const root = path.resolve(repo);
  const head = git(root, ['rev-parse', 'HEAD']);
  const dirty = changedCodeFiles(root, 'HEAD').length > 0;
  execFileSync(bin, [...binPrefix, 'update', root], { stdio: 'inherit', env: { ...env, GRAPHIFY_NO_TIPS: '1' } });
  const graphPath = path.join(outDir(root), 'graph.json');
  const info = {
    schema: BUILD_INFO_SCHEMA,
    sourceCommit: builtAtCommitFromGraph(graphPath) || head,
    sourceDirty: dirty,
    builtAt: new Date().toISOString(),
    graphifyVersion: graphifyVersion(bin, binPrefix),
    mode: 'code-ast (graphify update; no LLM)',
  };
  fs.writeFileSync(path.join(outDir(root), 'BUILD_INFO.json'), `${JSON.stringify(info, null, 2)}\n`);
  return info;
}

function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) return {};
  const fields = {};
  let listKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    const item = /^\s+-\s+(.+)$/.exec(line);
    if (item && listKey) {
      fields[listKey].push(item[1].trim().replace(/^["']|["']$/g, ''));
      continue;
    }
    const pair = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!pair) continue;
    const [, key, value] = pair;
    if (value === '') {
      fields[key] = [];
      listKey = key;
    } else {
      fields[key] = value.trim().replace(/^["']|["']$/g, '');
      listKey = null;
    }
  }
  return fields;
}

function listPages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listPages(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

/** Last commit time of a cited source: "<repo>:<path>" relative to the workspace parent, or a workspace path. */
function sourceTime(workspace, source) {
  const [repoName, rel] = source.includes(':') ? source.split(/:(.+)/) : [null, source];
  const repo = repoName ? path.join(path.dirname(workspace), repoName) : workspace;
  const time = tryGit(repo, ['log', '-1', '--format=%cI', '--', rel]);
  if (time) return { time: new Date(time), exists: true };
  const full = path.join(repo, rel);
  return fs.existsSync(full) ? { time: fs.statSync(full).mtime, exists: true } : { time: null, exists: false };
}

function wikiStatus(workspace) {
  const root = path.resolve(workspace);
  const indexPath = path.join(root, 'index.md');
  const index = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
  return listPages(path.join(root, 'wiki')).map(page => {
    const rel = path.relative(root, page).split(path.sep).join('/');
    const fm = parseFrontmatter(fs.readFileSync(page, 'utf8'));
    const sources = Array.isArray(fm.sources) ? fm.sources : [];
    const updated = fm.updated ? new Date(fm.updated) : null;
    const problems = [];
    if (!index.includes(rel) && !index.includes(path.basename(rel, '.md'))) problems.push('not listed in index.md');
    // Dated records and superseded pages are history: never rewritten, so never stale.
    if (fm.type === 'record' || fm.status === 'superseded') {
      return { page: rel, status: problems.length ? 'stale' : 'fresh', problems };
    }
    if (sources.length === 0) problems.push('cites no sources');
    if (!updated || Number.isNaN(updated.getTime())) problems.push('no valid updated date');
    const newer = [];
    for (const source of sources) {
      const { time, exists } = sourceTime(root, source);
      if (!exists) problems.push(`missing source ${source}`);
      else if (updated && time && time > new Date(updated.getTime() + 24 * 3600 * 1000)) newer.push(source);
    }
    if (newer.length) problems.push(`sources changed after updated: ${newer.join(', ')}`);
    return { page: rel, status: problems.length ? 'stale' : 'fresh', problems };
  });
}

function print(rows, json) {
  if (json) {
    process.stdout.write(`${JSON.stringify(rows, null, 2)}\n`);
    return;
  }
  for (const row of rows) {
    const name = row.page || path.basename(row.repo);
    const detail = row.problems ? row.problems.join('; ') : row.detail || '';
    const fix = row.rebuild ? ` -> ${row.rebuild}` : '';
    process.stdout.write(`${row.status.toUpperCase().padEnd(8)} ${name}${detail ? `  ${detail}` : ''}${fix}\n`);
  }
}

function main(argv) {
  const [command, ...rest] = argv;
  const flags = new Set(rest.filter(arg => arg.startsWith('--')));
  const targets = rest.filter(arg => !arg.startsWith('--'));
  if (command === 'build' && targets.length === 1) {
    print([{ ...graphStatus(targets[0]), ...build(targets[0]) }], flags.has('--json'));
    return 0;
  }
  let rows;
  if (command === 'graphs' && targets.length > 0) rows = targets.map(graphStatus);
  else if (command === 'wiki' && targets.length === 1) rows = wikiStatus(targets[0]);
  else {
    process.stderr.write('usage: knowledge-freshness.js build <repo> | graphs <repo>... | wiki <workspace>  [--json] [--strict]\n');
    return 2;
  }
  print(rows, flags.has('--json'));
  return flags.has('--strict') && rows.some(row => row.status !== 'fresh') ? 1 : 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));

module.exports = { builtAtCommitFromGraph, graphStatus, build, wikiStatus, parseFrontmatter, main };
