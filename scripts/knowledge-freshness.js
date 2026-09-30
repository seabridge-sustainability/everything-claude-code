#!/usr/bin/env node
'use strict';

/**
 * Freshness for generated knowledge: Graphify code graphs and the operator wiki.
 *
 *   node scripts/knowledge-freshness.js build <repo>            graphify update + BUILD_INFO.json
 *   node scripts/knowledge-freshness.js graphs <repo>... [--json] [--strict]
 *   node scripts/knowledge-freshness.js wiki <workspace> [--json] [--strict]
 *
 * Freshness binds an AST graph digest to a verified source/config fingerprint.
 * Stale output is reported, never silently used. `build` runs
 * only Graphify's local AST pass (`graphify update`), which makes no LLM calls.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const BUILD_INFO_SCHEMA = 'seabridge.graph-build.v3';
const TAIL_BYTES = 4096;
const KNOWLEDGE_BOUNDARY_MARKER = 'SeaBridgeAI knowledge boundary';
const REQUIRED_GRAPHIFY_IGNORES = Object.freeze([
  'docs/reports/',
  'reports/',
  'artifacts/',
  'logs/',
  '/data/',
  '**/site-packages/',
  'references/',
  'vendor/',
  'third_party/',
  '_upstream/',
  '*.env',
  '.env.*',
]);

function git(repo, args) {
  return execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).replace(/\r?\n$/, '');
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

/** Fail closed unless a repo excludes every sensitive/generated graph source. */
function graphBoundaryStatus(repo) {
  const file = path.join(path.resolve(repo), '.graphifyignore');
  if (!fs.existsSync(file)) {
    return { safe: false, file, problems: ['missing .graphifyignore'] };
  }
  if (!fs.lstatSync(file).isFile()) return { safe: false, file, problems: ['boundary must be a regular file, not a symlink'] };
  const lines = new Set(fs.readFileSync(file, 'utf8').split(/\r?\n/).map(line => line.trim()));
  const problems = [];
  // A deliberately conservative policy: exclusions may be added, never
  // negated. Presence-only validation permits later rules to reopen reports.
  if ([...lines].some(line => line.startsWith('!'))) {
    problems.push('ignore negations are not permitted in the knowledge boundary');
  }
  if (![...lines].some(line => line.includes(KNOWLEDGE_BOUNDARY_MARKER))) {
    problems.push(`missing '${KNOWLEDGE_BOUNDARY_MARKER}' marker`);
  }
  for (const pattern of REQUIRED_GRAPHIFY_IGNORES) {
    if (!lines.has(pattern)) problems.push(`missing required exclusion '${pattern}'`);
  }
  return { safe: problems.length === 0, file, problems };
}

function graphArtifactBoundary(repo) {
  const boundary = graphBoundaryStatus(repo);
  if (!boundary.safe) return boundary;
  const raw = JSON.parse(fs.readFileSync(path.join(repo, 'graphify-out', 'graph.json'), 'utf8'));
  if (!Array.isArray(raw.nodes) || !raw.nodes.length) return { safe: false, problems: ['graph has no nodes'] };
  // Graphify can preserve either representation across an AST-only update.
  const hyperedges = [raw.hyperedges, raw.graph && raw.graph.hyperedges];
  if (hyperedges.some(value => value && (Array.isArray(value) ? value.length : Object.keys(value).length))) {
    return { safe: false, problems: ['hyperedges require separate provenance review'] };
  }
  if (Array.isArray(raw.links) && raw.links.length && Array.isArray(raw.edges) && raw.edges.length) {
    return { safe: false, problems: ['dual link representations require completeness review'] };
  }
  const edges = [...(Array.isArray(raw.links) ? raw.links : []), ...(Array.isArray(raw.edges) ? raw.edges : [])];
  const excluded = [...raw.nodes, ...edges].filter(item => {
    const source = item.source_file;
    // Graphify emits source-less AST references and external imports. They
    // carry no repository file content. Other unbound nodes remain unsafe.
    if (source === '') return !((item._origin === 'ast' && item.file_type === 'code') ||
      (item.external === true && item.type === 'external' && item.file_type === 'concept'));
    if (typeof source !== 'string') return true;
    const file = source.replace(/\\/g, '/').replace(/^(\.\/)+/, '');
    return /^(?:\/|[A-Za-z]:)|(^|\/)\.\.(\/|$)/.test(file) ||
      /(^|\/)(\.ecc|\.git|\.obsidian|reports|artifacts|logs|vendor|references|third_party|_upstream|site-packages)(\/|$)/i.test(file) ||
      /^data\//i.test(file) || /(^|\/)\.env(?:\.|$)|\.env$/i.test(file);
  }).length;
  return { safe: excluded === 0, problems: excluded ? [`${excluded} graph elements have excluded or unbound source paths`] : [] };
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
  // NUL-separated names handle whitespace and renames without porcelain parsing.
  const files = new Set([
    ...git(repo, ['diff', '--name-only', '-z', fromCommit, 'HEAD']).split('\0'),
    ...git(repo, ['diff', '--name-only', '-z', 'HEAD']).split('\0'),
    ...git(repo, ['ls-files', '--others', '--exclude-standard', '-z']).split('\0'),
  ]);
  return [...files].filter(snapshotInput);
}

function snapshotInput(file) {
  const normalized = file.replace(/\\/g, '/');
  // Hash only repository source/config, never secrets or generated/private stores.
  if (/(^|\/)(graphify-out|\.git|\.ecc|node_modules|venv|\.venv|artifacts|logs|reports|vendor|references|third_party|_upstream|site-packages)(\/|$)/i.test(normalized)) return false;
  if (/^data\//i.test(normalized) || /(^|\/)\.env(?:\.|$)|\.env$/i.test(normalized)) return false;
  // Conservative superset: new extractor extensions cannot silently evade the
  // fingerprint. This may invalidate more often than Graphify's custom filters.
  return Boolean(normalized);
}

function sha256(data) { return crypto.createHash('sha256').update(data).digest('hex'); }

function sourceFingerprint(repo) {
  const files = [...new Set(git(repo, ['ls-files', '--cached', '--others', '--exclude-standard', '-z']).split('\0'))]
    .filter(snapshotInput).sort();
  const manifest = files.map(file => {
    const full = path.join(repo, file);
    if (!fs.existsSync(full)) return [file, 'missing'];
    const stat = fs.lstatSync(full);
    if (stat.isSymbolicLink()) throw new Error('Source snapshot contains a symlink; scoped verification is required');
    if (!stat.isFile()) return [file, 'not-file'];
    return [file, sha256(fs.readFileSync(full))];
  });
  return sha256(JSON.stringify(manifest));
}

function graphStatus(repo) {
  const root = path.resolve(repo);
  const graphPath = path.join(outDir(root), 'graph.json');
  const head = tryGit(root, ['rev-parse', 'HEAD']);
  if (!head) return { repo: root, status: 'error', detail: 'not a git repository' };
  const boundary = graphBoundaryStatus(root);
  if (!boundary.safe) {
    return {
      repo: root,
      head,
      status: 'unsafe',
      detail: boundary.problems.join('; '),
      fix: `repair ${boundary.file} before building or reading a code graph`,
    };
  }
  if (!fs.existsSync(graphPath)) {
    return { repo: root, status: 'missing', detail: 'no graphify-out/graph.json', rebuild: `graphify update "${root}"` };
  }
  // graph.json's own commit is authoritative; BUILD_INFO.json only adds build
  // time and version, and is ignored when it describes a different build.
  const graphCommit = builtAtCommitFromGraph(graphPath);
  const stored = readBuildInfo(root);
  const info = stored && (!graphCommit || stored.sourceCommit === graphCommit) ? stored : null;
  const artifactHash = sha256(fs.readFileSync(graphPath));
  if (!(info && info.boundaryValidated && info.graphSha256 === artifactHash)) {
    const artifact = graphArtifactBoundary(root);
    if (!artifact.safe) return { repo: root, head, status: 'unsafe', detail: artifact.problems.join('; ') };
  }
  const builtCommit = graphCommit || (info && info.sourceCommit);
  const base = {
    repo: root,
    head,
    builtCommit,
    builtAt: info ? info.builtAt : fs.statSync(graphPath).mtime.toISOString(),
    graphifyVersion: info ? info.graphifyVersion : null,
  };
  if (!info || info.schema !== BUILD_INFO_SCHEMA || !info.sourceFingerprint || !info.graphSha256 || !info.boundaryValidated) {
    return { ...base, status: 'unknown', detail: 'missing or mismatched verified build receipt; rebuild required' };
  }
  if (!builtCommit) return { ...base, status: 'unknown', detail: 'graph records no source commit', rebuild: `graphify update "${root}"` };
  if (tryGit(root, ['cat-file', '-t', builtCommit]) !== 'commit') {
    return { ...base, status: 'unknown', detail: `source commit ${builtCommit.slice(0, 9)} is not in this repository`, rebuild: `graphify update "${root}"` };
  }
  const checkedCommit = info.verifiedSourceCommit || builtCommit;
  if (tryGit(root, ['cat-file', '-t', checkedCommit]) !== 'commit') return { ...base, status: 'unknown', detail: 'verified source commit is unavailable' };
  const commitsBehind = Number(tryGit(root, ['rev-list', '--count', `${checkedCommit}..HEAD`]) || 0);
  const changed = changedCodeFiles(root, checkedCommit);
  if (info && info.sourceDirty) return { ...base, status: 'unknown', detail: 'build used dirty source; rebuild from a clean snapshot' };
  if (info && info.graphSha256 && info.graphSha256 !== artifactHash) {
    return { ...base, status: 'unknown', detail: 'graph does not match build receipt' };
  }
  if (info && info.sourceFingerprint && info.sourceFingerprint !== sourceFingerprint(root)) {
    return { ...base, status: 'stale', commitsBehind, changedCodeFiles: changed.length, detail: 'source/config content differs from build snapshot' };
  }
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

function build(repo, { bin = process.env.GRAPHIFY_BIN || 'graphify', binPrefix = [], env = process.env, noViz = false } = {}) {
  const root = path.resolve(repo);
  const python = noViz ? (env.GRAPHIFY_PYTHON || (process.platform === 'win32'
    ? path.join(os.homedir(), 'pipx', 'venvs', 'graphifyy', 'Scripts', 'python.exe') : 'python3')) : null;
  let noVizVersion = null;
  if (noViz) {
    // Fail before touching an existing graph if Python resolves an old editable
    // Graphify lacking v3 provenance or the documented no-HTML switch.
    const probe = "import graphify.watch,graphify.exporters.html,inspect,importlib.metadata as m; s=inspect.getsource(graphify.watch._rebuild_code); assert 'built_at_commit' in s and '_origin' in s and hasattr(graphify.exporters.html,'_viz_node_limit'); print(m.version('graphifyy'))";
    try {
      noVizVersion = execFileSync(python, ['-c', probe], {encoding:'utf8', stdio:['ignore','pipe','ignore'], env}).trim();
    } catch {
      throw new Error('Selected Graphify Python lacks v3 extraction provenance or no-viz support');
    }
  }
  const before = captureSnapshot(root);
  if (noViz) {
    const script = path.join(root, 'scripts', 'graph', 'rebuild_graphify_code.py');
    if (!fs.existsSync(script)) throw new Error('No verified no-visualization Graphify rebuild script in target repo');
    execFileSync(python, [script, root], { stdio: 'inherit', cwd: root,
      env: { ...env, GRAPHIFY_OUT: path.join(root, 'graphify-out'), GRAPHIFY_NO_TIPS: '1', GRAPHIFY_VIZ_NODE_LIMIT: '0' } });
  } else {
    execFileSync(bin, [...binPrefix, 'update', root], { stdio: 'inherit', env: { ...env, GRAPHIFY_OUT: path.join(root, 'graphify-out'), GRAPHIFY_NO_TIPS: '1' } });
  }
  return stampBuild(root, before, noViz ? noVizVersion : graphifyVersion(bin, binPrefix));
}

function captureSnapshot(root) {
  const boundary = graphBoundaryStatus(root);
  if (!boundary.safe) {
    throw new Error(`Unsafe Graphify boundary for ${root}: ${boundary.problems.join('; ')}`);
  }
  const graphPath = path.join(outDir(root), 'graph.json');
  return {
    head: git(root, ['rev-parse', 'HEAD']), dirty: changedCodeFiles(root, 'HEAD').length > 0,
    fingerprint: sourceFingerprint(root),
    existingGraphHash: fs.existsSync(graphPath) ? sha256(fs.readFileSync(graphPath)) : null,
  };
}

function stampBuild(root, before, version) {
  const { head, dirty, fingerprint } = before;
  const after = captureSnapshot(root);
  if (after.fingerprint !== fingerprint || after.head !== head || after.dirty !== dirty) {
    throw new Error('Source changed during graph build; no verified build receipt was written');
  }
  const graphPath = path.join(outDir(root), 'graph.json');
  const artifact = graphArtifactBoundary(root);
  if (!artifact.safe) throw new Error(`Unsafe generated graph: ${artifact.problems.join('; ')}`);
  const raw = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
  if ([...raw.nodes, ...(raw.links || []), ...(raw.edges || [])].some(item =>
    item._origin !== 'ast' && !(item.external === true && item.type === 'external' && item.file_type === 'concept'))) {
    throw new Error('AST-only build cannot verify semantic or unknown-origin graph content; scoped extraction verification required');
  }
  const info = {
    schema: BUILD_INFO_SCHEMA,
    sourceCommit: builtAtCommitFromGraph(graphPath),
    verifiedSourceCommit: head,
    sourceDirty: dirty,
    sourceFingerprint: fingerprint,
    graphSha256: sha256(fs.readFileSync(graphPath)),
    boundaryValidated: true,
    builtAt: new Date().toISOString(),
    graphifyVersion: version,
    mode: 'code-ast (graphify update; no LLM)',
  };
  if (info.sourceCommit !== head) {
    // Graphify can successfully inspect the changed source while preserving an
    // unchanged graph. Preserve the extraction commit; record verification
    // separately, and accept only the exact graph present before the rebuild.
    if (!info.sourceCommit || info.graphSha256 !== before.existingGraphHash) {
      throw new Error('Generated graph is not bound to the captured source commit');
    }
    info.mode = 'code-ast verified no-op; extraction commit preserved';
  }
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

/** Bind a wiki citation to the current, bounded source file. */
function sourceInfo(workspace, source) {
  const [repoName, rel] = source.includes(':') ? source.split(/:(.+)/) : [null, source];
  if ((repoName && !/^[A-Za-z0-9_-]+$/.test(repoName)) || !rel ||
      /(^|[\\/])\.\.([\\/]|$)/.test(rel) || /(^|[\\/])\.env(?:\.|$)/i.test(rel)) {
    return { time: null, exists: false };
  }
  const repo = repoName ? path.join(path.dirname(workspace), repoName) : workspace;
  const full = path.resolve(repo, rel);
  const within = path.relative(repo, full);
  if (within.startsWith('..') || path.isAbsolute(within) || !fs.existsSync(full)) return { time: null, exists: false };
  const realRepo = fs.realpathSync(repo);
  const realFull = fs.realpathSync(full);
  const realWithin = path.relative(realRepo, realFull);
  if (realWithin.startsWith('..') || path.isAbsolute(realWithin)) return { time: null, exists: false };
  const stat = fs.lstatSync(full);
  if (!stat.isFile() || stat.isSymbolicLink()) return { time: null, exists: false };
  const dirty = tryGit(repo, ['status', '--porcelain', '--', rel]);
  if (dirty) return { time: stat.mtime, exists: true, dirty: true };
  const digest = sha256(fs.readFileSync(full));
  const time = tryGit(repo, ['log', '-1', '--format=%cI', '--', rel]);
  if (time) return { time: new Date(time), exists: true, digest };
  return { time: stat.mtime, exists: true, digest };
}

function wikiStatus(workspace) {
  const root = path.resolve(workspace);
  const indexPath = path.join(root, 'index.md');
  const index = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
  return listPages(path.join(root, 'wiki')).map(page => {
    const rel = path.relative(root, page).split(path.sep).join('/');
    const fm = parseFrontmatter(fs.readFileSync(page, 'utf8'));
    const sources = Array.isArray(fm.sources) ? fm.sources : [];
    const sourceHashes = Array.isArray(fm.source_hashes) ? fm.source_hashes : [];
    const updated = fm.updated ? new Date(fm.updated) : null;
    const problems = [];
    if (!index.includes(rel) && !index.includes(path.basename(rel, '.md'))) problems.push('not listed in index.md');
    // Dated records and superseded pages are history, not current guidance.
    if (fm.type === 'record' || fm.status === 'superseded') {
      return { page: rel, status: problems.length ? 'stale' : 'historical', problems };
    }
    if (sources.length === 0) problems.push('cites no sources');
    if (!updated || Number.isNaN(updated.getTime())) problems.push('no valid updated date');
    const hashes = new Map();
    for (const entry of sourceHashes) {
      const match = /^sha256:([a-f0-9]{64})\s+(.+)$/.exec(entry);
      if (!match || hashes.has(match[2])) problems.push('invalid or duplicate source hash');
      else hashes.set(match[2], match[1]);
    }
    if (hashes.size !== sources.length || [...hashes.keys()].some(source => !sources.includes(source))) {
      problems.push('missing or extra source hash');
    }
    for (const source of sources) {
      const { exists, dirty, digest } = sourceInfo(root, source);
      if (!exists) problems.push(`missing source ${source}`);
      else if (dirty) problems.push(`uncommitted source ${source}`);
      else if (hashes.has(source) && hashes.get(source) !== digest) problems.push(`source content changed ${source}`);
    }
    const unverified = problems.length === 1 && problems[0] === 'missing or extra source hash';
    return { page: rel, status: unverified ? 'unknown' : problems.length ? 'stale' : 'fresh', problems };
  });
}

function wikiHashProposals(workspace) {
  const root = path.resolve(workspace);
  return listPages(path.join(root, 'wiki')).flatMap(page => {
    const fm = parseFrontmatter(fs.readFileSync(page, 'utf8'));
    if (fm.type === 'record' || fm.status === 'superseded') return [];
    const sources = Array.isArray(fm.sources) ? fm.sources : [];
    return [{ page: path.relative(root, page).split(path.sep).join('/'),
      reviewed: false,
      source_hashes: sources.map(source => {
        const info = sourceInfo(root, source);
        return { source, value: info.exists && !info.dirty ? `sha256:${info.digest} ${source}` : null,
          reason: !info.exists ? 'missing or unsafe source' : info.dirty ? 'uncommitted source' : null };
      }) }];
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
  if (command === 'snapshot' && targets.length === 1) {
    process.stdout.write(JSON.stringify(captureSnapshot(path.resolve(targets[0]))));
    return 0;
  }
  if (command === 'stamp' && targets.length === 2) {
    const info = stampBuild(path.resolve(targets[0]), JSON.parse(targets[1]), graphifyVersion('graphify', []));
    process.stdout.write(JSON.stringify(info));
    return 0;
  }
  if (command === 'changed-inputs' && targets.length === 2) {
    const files = changedCodeFiles(path.resolve(targets[0]), targets[1]);
    process.stdout.write(files.length ? files.join('\0') + '\0' : '');
    return 0;
  }
  if (command === 'built-commit' && targets.length === 1) {
    const graph = path.join(outDir(path.resolve(targets[0])), 'graph.json');
    if (!fs.existsSync(graph)) return 1;
    const commit = builtAtCommitFromGraph(graph);
    if (commit) process.stdout.write(commit);
    return commit ? 0 : 1;
  }
  if (command === 'boundary' && targets.length === 1) {
    const boundary = graphBoundaryStatus(targets[0]);
    process.stdout.write(`${JSON.stringify(boundary)}\n`);
    return boundary.safe ? 0 : 1;
  }
  if (command === 'artifact-boundary' && targets.length === 1) {
    const boundary = graphArtifactBoundary(targets[0]);
    process.stdout.write(`${JSON.stringify(boundary)}\n`);
    return boundary.safe ? 0 : 1;
  }
  if (command === 'wiki-hashes' && targets.length === 1) {
    print(wikiHashProposals(targets[0]), true);
    return 0;
  }
  if (command === 'build' && targets.length === 1) {
    const info = build(targets[0], {noViz:flags.has('--no-viz')});
    print([{ ...info, ...graphStatus(targets[0]) }], flags.has('--json'));
    return 0;
  }
  let rows;
  if (command === 'graphs' && targets.length > 0) rows = targets.map(graphStatus);
  else if (command === 'wiki' && targets.length === 1) rows = wikiStatus(targets[0]);
  else {
    process.stderr.write('usage: knowledge-freshness.js build <repo> [--no-viz] | graphs <repo>... | wiki <workspace> [--json] [--strict]\n');
    return 2;
  }
  print(rows, flags.has('--json'));
  return flags.has('--strict') && rows.some(row => row.status !== 'fresh' && !(command === 'wiki' && row.status === 'historical')) ? 1 : 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));

module.exports = {
  KNOWLEDGE_BOUNDARY_MARKER,
  REQUIRED_GRAPHIFY_IGNORES,
  builtAtCommitFromGraph,
  graphBoundaryStatus,
  graphStatus,
  build,
  wikiStatus,
  wikiHashProposals,
  parseFrontmatter,
  sourceFingerprint,
  graphArtifactBoundary,
  captureSnapshot,
  stampBuild,
  main,
};
