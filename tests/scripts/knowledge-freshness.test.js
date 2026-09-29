/**
 * Tests for scripts/knowledge-freshness.js
 *
 * Run with: node tests/scripts/knowledge-freshness.test.js
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const { builtAtCommitFromGraph, graphStatus, build, wikiStatus, parseFrontmatter } = require('../../scripts/knowledge-freshness');
const { test, banner, section, summary } = require('../lib/helpers/mini-test-runner');

let passed = 0;
let failed = 0;
const run = (name, fn) => { if (test(name, fn)) passed++; else failed++; };

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'knowledge-freshness-'));
const git = (repo, ...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8' }).trim();

function makeRepo(name) {
  const repo = path.join(temp, name);
  fs.mkdirSync(repo, { recursive: true });
  git(repo, 'init', '-q');
  git(repo, 'config', 'user.email', 'test@example.com');
  git(repo, 'config', 'user.name', 'Test');
  git(repo, 'config', 'commit.gpgsign', 'false');
  git(repo, 'config', 'core.autocrlf', 'false');
  return repo;
}

function commit(repo, file, content) {
  fs.mkdirSync(path.dirname(path.join(repo, file)), { recursive: true });
  fs.writeFileSync(path.join(repo, file), content);
  git(repo, 'add', file);
  git(repo, 'commit', '-q', '-m', `edit ${file}`);
  return git(repo, 'rev-parse', 'HEAD');
}

function writeGraph(repo, builtAt) {
  fs.mkdirSync(path.join(repo, 'graphify-out'), { recursive: true });
  const graph = { directed: false, nodes: [{ id: 'a', label: 'x'.repeat(6000) }], links: [], built_at_commit: builtAt };
  fs.writeFileSync(path.join(repo, 'graphify-out', 'graph.json'), JSON.stringify(graph, null, 2));
}

banner('knowledge-freshness');

try {
  section('graphs:');

  run('reads built_at_commit from the end of a large graph.json', () => {
    const repo = makeRepo('tail');
    writeGraph(repo, 'abc1234def');
    assert.strictEqual(builtAtCommitFromGraph(path.join(repo, 'graphify-out', 'graph.json')), 'abc1234def');
  });

  const repo = makeRepo('code');
  const first = commit(repo, 'src/a.py', 'x = 1\n');

  run('a missing graph is reported with its rebuild command', () => {
    const status = graphStatus(repo);
    assert.strictEqual(status.status, 'missing');
    assert.match(status.rebuild, /graphify update/);
  });

  run('a graph built at HEAD is fresh', () => {
    writeGraph(repo, first);
    assert.strictEqual(graphStatus(repo).status, 'fresh');
  });

  run('a docs-only change keeps the code graph fresh', () => {
    commit(repo, 'README.md', '# readme\n');
    const status = graphStatus(repo);
    assert.strictEqual(status.status, 'fresh');
    assert.strictEqual(status.commitsBehind, 1);
  });

  run('a committed code change makes the graph stale', () => {
    commit(repo, 'src/b.ts', 'export const b = 2\n');
    const status = graphStatus(repo);
    assert.strictEqual(status.status, 'stale');
    assert.strictEqual(status.changedCodeFiles, 1);
  });

  run('an uncommitted code change also makes the graph stale', () => {
    writeGraph(repo, git(repo, 'rev-parse', 'HEAD'));
    fs.writeFileSync(path.join(repo, 'src', 'a.py'), 'x = 2\n');
    assert.strictEqual(graphStatus(repo).status, 'stale');
    git(repo, 'checkout', '--', 'src/a.py');
  });

  run('a source commit that is not in the repository is unknown, not fresh', () => {
    writeGraph(repo, '0123456789abcdef0123456789abcdef01234567');
    assert.strictEqual(graphStatus(repo).status, 'unknown');
  });

  run('build records source commit, build time, and graphify version', () => {
    const fake = path.join(temp, 'fake-graphify.js');
    fs.writeFileSync(fake, [
      "const fs = require('fs'); const path = require('path');",
      "const { execFileSync } = require('child_process');",
      "const [cmd, root] = process.argv.slice(2);",
      "if (cmd === '--version') { console.log('graphify 9.9.9'); process.exit(0); }",
      "const head = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();",
      "fs.mkdirSync(path.join(root, 'graphify-out'), { recursive: true });",
      "fs.writeFileSync(path.join(root, 'graphify-out', 'graph.json'), JSON.stringify({ nodes: [], built_at_commit: head }));",
    ].join('\n'));
    const info = build(repo, { bin: process.execPath, binPrefix: [fake] });
    assert.strictEqual(info.sourceCommit, git(repo, 'rev-parse', 'HEAD'));
    assert.strictEqual(info.graphifyVersion, '9.9.9');
    assert.ok(!Number.isNaN(Date.parse(info.builtAt)));
    const saved = JSON.parse(fs.readFileSync(path.join(repo, 'graphify-out', 'BUILD_INFO.json'), 'utf8'));
    assert.strictEqual(saved.schema, 'seabridge.graph-build.v1');
    assert.strictEqual(graphStatus(repo).status, 'fresh');
    assert.strictEqual(graphStatus(repo).graphifyVersion, '9.9.9');
  });

  run('graph.json wins over a BUILD_INFO.json that describes another build', () => {
    const head = git(repo, 'rev-parse', 'HEAD');
    writeGraph(repo, head);
    fs.writeFileSync(path.join(repo, 'graphify-out', 'BUILD_INFO.json'),
      JSON.stringify({ sourceCommit: '0123456789abcdef0123456789abcdef01234567', graphifyVersion: '0.0.1' }));
    const status = graphStatus(repo);
    assert.strictEqual(status.status, 'fresh');
    assert.strictEqual(status.builtCommit, head);
    assert.strictEqual(status.graphifyVersion, null);
  });

  section('wiki:');

  const workspace = makeRepo('workspace');
  commit(workspace, 'raw/source.md', 'original\n');
  fs.writeFileSync(path.join(workspace, 'index.md'), '- [Topic](wiki/topic.md)\n');
  const page = (updated, sources) => [
    '---', 'title: Topic', `updated: ${updated}`, 'sources:', ...sources.map(s => `  - ${s}`), '---', '', 'Body.', '',
  ].join('\n');

  run('parses list-valued frontmatter', () => {
    const fm = parseFrontmatter(page('2026-01-01', ['raw/source.md', 'other:docs/x.md']));
    assert.deepStrictEqual(fm.sources, ['raw/source.md', 'other:docs/x.md']);
    assert.strictEqual(fm.updated, '2026-01-01');
  });

  run('a page updated after its sources is fresh', () => {
    fs.mkdirSync(path.join(workspace, 'wiki'), { recursive: true });
    fs.writeFileSync(path.join(workspace, 'wiki', 'topic.md'), page('2999-01-01', ['raw/source.md']));
    assert.deepStrictEqual(wikiStatus(workspace).map(r => r.status), ['fresh']);
  });

  run('a page older than a cited source is stale', () => {
    fs.writeFileSync(path.join(workspace, 'wiki', 'topic.md'), page('2000-01-01', ['raw/source.md']));
    const [row] = wikiStatus(workspace);
    assert.strictEqual(row.status, 'stale');
    assert.match(row.problems.join(' '), /sources changed after updated/);
  });

  run('a page with no sources, a missing source, or no index entry is flagged', () => {
    fs.writeFileSync(path.join(workspace, 'wiki', 'orphan.md'), page('2999-01-01', ['raw/gone.md']));
    fs.writeFileSync(path.join(workspace, 'wiki', 'bare.md'), '---\ntitle: Bare\nupdated: 2999-01-01\n---\n');
    const rows = Object.fromEntries(wikiStatus(workspace).map(r => [r.page, r.problems.join('; ')]));
    assert.match(rows['wiki/orphan.md'], /missing source raw\/gone\.md/);
    assert.match(rows['wiki/orphan.md'], /not listed in index\.md/);
    assert.match(rows['wiki/bare.md'], /cites no sources/);
  });

  run('dated records and superseded pages are exempt from source staleness but must be indexed', () => {
    fs.writeFileSync(path.join(workspace, 'index.md'), '- [Topic](wiki/topic.md)\n- [Record](wiki/record.md)\n');
    fs.writeFileSync(path.join(workspace, 'wiki', 'record.md'), '---\ntitle: Record\ntype: record\ndate: 2000-01-01\n---\n');
    fs.writeFileSync(path.join(workspace, 'wiki', 'old.md'), '---\ntitle: Old\nstatus: superseded\n---\n');
    const rows = Object.fromEntries(wikiStatus(workspace).map(r => [r.page, r]));
    assert.strictEqual(rows['wiki/record.md'].status, 'fresh');
    assert.deepStrictEqual(rows['wiki/old.md'].problems, ['not listed in index.md']);
  });
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

summary(passed, failed);
