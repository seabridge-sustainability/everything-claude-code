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
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const {
  REQUIRED_GRAPHIFY_IGNORES,
  builtAtCommitFromGraph,
  graphBoundaryStatus,
  graphArtifactBoundary,
  sourceFingerprint,
  captureSnapshot,
  stampBuild,
  graphStatus,
  build,
  wikiStatus,
  wikiHashProposals,
  parseFrontmatter,
} = require('../../scripts/knowledge-freshness');
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
  fs.writeFileSync(path.join(repo, '.graphifyignore'), [
    '# SeaBridgeAI knowledge boundary (test)',
    ...REQUIRED_GRAPHIFY_IGNORES,
    '',
  ].join('\n'));
  git(repo, 'add', '.graphifyignore');
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
  const graph = { directed: false, nodes: [{ id: 'a', _origin: 'ast', source_file: 'src/a.py', label: 'x'.repeat(6000) }], links: [], built_at_commit: builtAt };
  fs.writeFileSync(path.join(repo, 'graphify-out', 'graph.json'), JSON.stringify(graph, null, 2));
  fs.writeFileSync(path.join(repo, 'graphify-out', 'BUILD_INFO.json'), JSON.stringify({
    schema:'seabridge.graph-build.v3', sourceCommit:builtAt, sourceDirty:false,
    boundaryValidated:true, sourceFingerprint:sourceFingerprint(repo),
    graphSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(repo,'graphify-out/graph.json'))).digest('hex'),
  }));
}

banner('knowledge-freshness');

try {
  section('graphs:');

  run('ECC checkout keeps the required graph boundary', () => {
    assert.strictEqual(graphBoundaryStatus(path.resolve(__dirname,'../..')).safe,true);
  });

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

  run('a marker without the complete privacy boundary is unsafe', () => {
    const unsafe = makeRepo('unsafe');
    commit(unsafe, 'src/a.py', 'x = 1\n');
    fs.writeFileSync(path.join(unsafe, '.graphifyignore'), '# SeaBridgeAI knowledge boundary\ndocs/reports/\n');
    const boundary = graphBoundaryStatus(unsafe);
    assert.strictEqual(boundary.safe, false);
    assert.match(boundary.problems.join(' '), /artifacts\//);
    assert.strictEqual(graphStatus(unsafe).status, 'unsafe');
    assert.throws(() => build(unsafe, { bin: process.execPath }), /Unsafe Graphify boundary/);
  });

  run('a graph built at HEAD is fresh', () => {
    writeGraph(repo, first);
    assert.strictEqual(graphStatus(repo).status, 'fresh');
  });

  run('rejects ignore negations even when required exclusions are present', () => {
    const unsafe = makeRepo('negated');
    fs.appendFileSync(path.join(unsafe, '.graphifyignore'), '!docs/reports/\n!docs/reports/**\n');
    assert.strictEqual(graphBoundaryStatus(unsafe).safe, false);
  });

  run('requires an explicit upstream exclusion', () => {
    const unsafe = makeRepo('upstream');
    const file = path.join(unsafe, '.graphifyignore');
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace(/^_upstream\/\r?\n/m, ''));
    assert.strictEqual(graphBoundaryStatus(unsafe).safe, false);
  });

  run('artifact boundary rejects excluded, escaping and unbound node sources', () => {
    const isolated = makeRepo('artifact');
    commit(isolated, 'src/a.py', 'x=1\n');
    writeGraph(isolated, git(isolated, 'rev-parse', 'HEAD'));
    const file = path.join(isolated, 'graphify-out/graph.json');
    for (const source_file of ['./data/example.json','.ecc/memory/example.md','docs/reports/x.py','nested/vendor/x.js','../outside.py','C:/private.py','.env.json','_upstream/lib.py','']) {
      fs.writeFileSync(file, JSON.stringify({nodes:[{id:'x',source_file}]}));
      assert.strictEqual(graphArtifactBoundary(isolated).safe,false,source_file);
    }
    fs.writeFileSync(file, JSON.stringify({nodes:[{id:'x',source_file:'src/app.py'}]}));
    assert.strictEqual(graphArtifactBoundary(isolated).safe,true);
  });

  run('Graphify AST references and external imports may omit source paths', () => {
    const isolated = makeRepo('external-symbols');
    const head = commit(isolated, 'src/a.py', 'import pathlib\n');
    writeGraph(isolated, head);
    const file = path.join(isolated, 'graphify-out/graph.json');
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    raw.nodes.push({id:'Path',source_file:'',file_type:'code',_origin:'ast'});
    raw.nodes.push({id:'pathlib',source_file:'',file_type:'concept',type:'external',external:true});
    fs.writeFileSync(file,JSON.stringify(raw));
    assert.strictEqual(graphArtifactBoundary(isolated).safe,true);
    assert.doesNotThrow(() => stampBuild(isolated,captureSnapshot(isolated),'0.9.71'));
  });

  run('preserved hyperedges cannot enter an AST-only verified snapshot', () => {
    const isolated = makeRepo('hyperedge');
    const head = commit(isolated,'src/a.py','value=1\n');
    writeGraph(isolated,head);
    const file = path.join(isolated,'graphify-out/graph.json');
    const raw = JSON.parse(fs.readFileSync(file,'utf8'));
    raw.hyperedges = [{id:'semantic',nodes:['a'],_origin:'semantic',source_file:'docs/report.md'}];
    fs.writeFileSync(file,JSON.stringify(raw));
    assert.strictEqual(graphArtifactBoundary(isolated).safe,false);
    assert.throws(() => stampBuild(isolated,captureSnapshot(isolated),'0.9.71'), /hyperedges require/);
    delete raw.hyperedges;
    raw.graph = {hyperedges:[{id:'nested',source_file:'docs/report.md'}]};
    fs.writeFileSync(file,JSON.stringify(raw));
    assert.strictEqual(graphArtifactBoundary(isolated).safe,false);
    assert.throws(() => stampBuild(isolated,captureSnapshot(isolated),'0.9.71'), /hyperedges require/);
  });

  run('both link representations are checked for unsafe sources', () => {
    const isolated = makeRepo('dual-edge');
    const head = commit(isolated,'src/a.py','value=1\n');
    writeGraph(isolated,head);
    const file = path.join(isolated,'graphify-out/graph.json');
    const raw = JSON.parse(fs.readFileSync(file,'utf8'));
    raw.links = [{source:'a',target:'a',source_file:'src/a.py',_origin:'ast'}];
    raw.edges = [{source:'a',target:'a',source_file:'docs/reports/private.md',_origin:'ast'}];
    fs.writeFileSync(file,JSON.stringify(raw));
    assert.strictEqual(graphArtifactBoundary(isolated).safe,false);
    assert.match(graphArtifactBoundary(isolated).problems.join(' '), /dual link representations/);
    assert.throws(() => stampBuild(isolated,captureSnapshot(isolated),'0.9.71'), /Unsafe generated graph/);
    raw.links = [];
    fs.writeFileSync(file,JSON.stringify(raw));
    assert.match(graphArtifactBoundary(isolated).problems.join(' '), /excluded or unbound source paths/);
  });

  run('a documentation change invalidates a graph that may index Markdown', () => {
    commit(repo, 'README.md', '# readme\n');
    const status = graphStatus(repo);
    assert.strictEqual(status.status, 'stale');
    assert.strictEqual(status.commitsBehind, 1);
  });

  run('a committed code change makes the graph stale', () => {
    commit(repo, 'src/b.ts', 'export const b = 2\n');
    const status = graphStatus(repo);
    assert.strictEqual(status.status, 'stale');
    assert.strictEqual(status.changedCodeFiles, 2);
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

  run('untracked code and dirty-build provenance cannot report fresh', () => {
    const isolated = makeRepo('dirty-build');
    const head = commit(isolated, 'source.py', 'x = 1\n');
    writeGraph(isolated, head);
    fs.writeFileSync(path.join(isolated, 'new.py'), 'x = 2\n');
    assert.strictEqual(graphStatus(isolated).status, 'stale');
    fs.unlinkSync(path.join(isolated, 'new.py'));
    fs.writeFileSync(path.join(isolated, 'graphify-out/BUILD_INFO.json'), JSON.stringify({sourceCommit:head, sourceDirty:true}));
    assert.notStrictEqual(graphStatus(isolated).status, 'fresh');
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
      "fs.writeFileSync(path.join(root, 'graphify-out', 'graph.json'), JSON.stringify({ nodes: [{id:'a',_origin:'ast',source_file:'src/a.py'}], built_at_commit: head }));",
    ].join('\n'));
    const info = build(repo, { bin: process.execPath, binPrefix: [fake] });
    assert.strictEqual(info.sourceCommit, git(repo, 'rev-parse', 'HEAD'));
    assert.strictEqual(info.graphifyVersion, '9.9.9');
    assert.ok(!Number.isNaN(Date.parse(info.builtAt)));
    const saved = JSON.parse(fs.readFileSync(path.join(repo, 'graphify-out', 'BUILD_INFO.json'), 'utf8'));
    assert.strictEqual(saved.schema, 'seabridge.graph-build.v3');
    assert.strictEqual(graphStatus(repo).status, 'fresh');
    assert.strictEqual(graphStatus(repo).graphifyVersion, '9.9.9');
  });

  run('no-visualization build refuses an incompatible interpreter before changing graph bytes', () => {
    const isolated = makeRepo('no-viz');
    const head = commit(isolated, 'src/a.py', 'x=1\n');
    writeGraph(isolated,head);
    const graph = path.join(isolated,'graphify-out/graph.json');
    const before = fs.readFileSync(graph);
    assert.throws(() => build(isolated,{noViz:true,env:{...process.env,GRAPHIFY_PYTHON:process.execPath}}),
      /lacks v3 extraction provenance/);
    assert.deepStrictEqual(fs.readFileSync(graph),before);
  });

  if (process.env.GRAPHIFY_TEST_PYTHON && process.env.GRAPHIFY_TEST_HELPER) {
    run('real no-visualization build writes a fresh v3 receipt without HTML', () => {
      const isolated = makeRepo('real-no-viz');
      commit(isolated, 'src/a.py', 'def example():\n    return 1\n');
      const script = path.join(isolated,'scripts/graph/rebuild_graphify_code.py');
      fs.mkdirSync(path.dirname(script),{recursive:true});
      fs.copyFileSync(process.env.GRAPHIFY_TEST_HELPER,script);
      git(isolated,'add','scripts/graph/rebuild_graphify_code.py');
      git(isolated,'commit','-q','-m','add no-viz helper');
      const info = build(isolated,{noViz:true,env:{...process.env,GRAPHIFY_PYTHON:process.env.GRAPHIFY_TEST_PYTHON}});
      assert.strictEqual(info.schema,'seabridge.graph-build.v3');
      assert.strictEqual(info.graphifyVersion,'0.9.71');
      assert.strictEqual(graphStatus(isolated).status,'fresh');
      assert.strictEqual(fs.existsSync(path.join(isolated,'graphify-out/graph.html')),false);
    });
  }

  run('snapshot fingerprints detect content edits and graph receipt tampering', () => {
    const fingerprint = sourceFingerprint(repo);
    const source = path.join(repo, 'src/a.py');
    const original = fs.readFileSync(source, 'utf8');
    fs.writeFileSync(source, 'changed\n');
    assert.notStrictEqual(sourceFingerprint(repo), fingerprint);
    assert.strictEqual(graphStatus(repo).status, 'stale');
    fs.writeFileSync(source, original);
    assert.strictEqual(sourceFingerprint(repo), fingerprint);
    const file = path.join(repo, 'graphify-out/graph.json');
    fs.appendFileSync(file, '\n');
    assert.strictEqual(graphStatus(repo).status, 'unknown');
  });

  run('a mismatched receipt never establishes freshness', () => {
    const head = git(repo, 'rev-parse', 'HEAD');
    writeGraph(repo, head);
    fs.writeFileSync(path.join(repo, 'graphify-out', 'BUILD_INFO.json'),
      JSON.stringify({ sourceCommit: '0123456789abcdef0123456789abcdef01234567', graphifyVersion: '0.0.1' }));
    const status = graphStatus(repo);
    assert.strictEqual(status.status, 'unknown');
    assert.strictEqual(status.builtCommit, head);
    assert.strictEqual(status.graphifyVersion, null);
  });

  run('legacy graphs without verified receipts are unknown, not fresh', () => {
    const isolated = makeRepo('legacy');
    const head = commit(isolated, 'src/App.vue', '<template />');
    writeGraph(isolated,head);
    fs.unlinkSync(path.join(isolated,'graphify-out/BUILD_INFO.json'));
    assert.strictEqual(graphStatus(isolated).status,'unknown');
  });

  run('verified no-op rebuild preserves extraction commit without blocking freshness', () => {
    const isolated = makeRepo('noop');
    const original = commit(isolated,'app.py','value=1\n');
    writeGraph(isolated,original);
    const current = commit(isolated,'app.py','# comment\nvalue=1\n');
    const before = captureSnapshot(isolated);
    const info = stampBuild(isolated,before,'0.9.71');
    assert.strictEqual(info.sourceCommit,original);
    assert.strictEqual(info.verifiedSourceCommit,current);
    assert.match(info.mode,/no-op/);
    assert.strictEqual(graphStatus(isolated).status,'fresh');
    const graph = path.join(isolated,'graphify-out/graph.json');
    fs.appendFileSync(graph,'\n');
    assert.throws(() => stampBuild(isolated,before,'0.9.71'), /captured source commit/);
  });

  run('new extractor formats cannot evade source freshness', () => {
    const isolated = makeRepo('formats');
    const head = commit(isolated, 'src/App.vue', '<template />');
    writeGraph(isolated,head);
    fs.writeFileSync(path.join(isolated,'main.tf'),'resource {}');
    assert.strictEqual(graphStatus(isolated).status,'stale');
  });

  run('AST-only stamp rejects preserved semantic nodes and unknown-origin edges', () => {
    for (const component of ['node', 'edge']) {
      const isolated = makeRepo(`semantic-${component}`);
      const head = commit(isolated, 'src/a.py', 'value=1\n');
      writeGraph(isolated, head);
      const file = path.join(isolated, 'graphify-out/graph.json');
      const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (component === 'node') raw.nodes.push({id:'doc',source_file:'README.md',_origin:'semantic'});
      else raw.links.push({source:'a',target:'a',relation:'mentions',source_file:'src/a.py'});
      fs.writeFileSync(file, JSON.stringify(raw));
      const receipt = fs.readFileSync(path.join(isolated,'graphify-out/BUILD_INFO.json'),'utf8');
      assert.throws(() => stampBuild(isolated,captureSnapshot(isolated),'0.9.71'), /AST-only build cannot verify/);
      assert.strictEqual(fs.readFileSync(path.join(isolated,'graphify-out/BUILD_INFO.json'),'utf8'),receipt);
    }
  });

  section('wiki:');

  const workspace = makeRepo('workspace');
  commit(workspace, 'raw/source.md', 'original\n');
  fs.writeFileSync(path.join(workspace, 'index.md'), '- [Topic](wiki/topic.md)\n');
  const page = (updated, sources) => [
    '---', 'title: Topic', `updated: ${updated}`, 'sources:', ...sources.map(s => `  - ${s}`),
    'source_hashes:', ...sources.flatMap(s => {
      const [repoName, rel] = s.includes(':') ? s.split(/:(.+)/) : [null, s];
      const full = path.join(repoName ? path.join(path.dirname(workspace),repoName) : workspace, rel);
      return fs.existsSync(full) ? [`  - sha256:${crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex')} ${s}`] : [];
    }), '---', '', 'Body.', '',
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

  run('content hashes, not calendar-day tolerance, establish citation identity', () => {
    fs.writeFileSync(path.join(workspace, 'wiki', 'topic.md'), page('2000-01-01', ['raw/source.md']));
    const [row] = wikiStatus(workspace);
    assert.strictEqual(row.status, 'fresh');
  });

  run('missing and changed citation hashes never report current', () => {
    const source = 'raw/source.md';
    fs.writeFileSync(path.join(workspace, 'wiki/topic.md'), [
      '---', 'title: Topic', 'updated: 2999-01-01', 'sources:', `  - ${source}`, '---', '', 'Body.',
    ].join('\n'));
    assert.strictEqual(wikiStatus(workspace)[0].status, 'unknown');
    fs.writeFileSync(path.join(workspace, 'wiki/topic.md'), page('2999-01-01',[source]));
    assert.strictEqual(wikiStatus(workspace)[0].status, 'fresh');
    commit(workspace,source,'updated content\n');
    const result = wikiStatus(workspace)[0];
    assert.strictEqual(result.status,'stale');
    assert.match(result.problems.join(' '),/source content changed/);
  });

  run('hash proposals list clean sources without pretending review occurred', () => {
    fs.writeFileSync(path.join(workspace, 'wiki/topic.md'), page('2999-01-01',['raw/source.md']));
    const proposal = wikiHashProposals(workspace).find(item => item.page === 'wiki/topic.md');
    assert.strictEqual(proposal.reviewed,false);
    assert.match(proposal.source_hashes[0].value,/^sha256:[a-f0-9]{64} raw\/source\.md$/);
  });

  run('deleted or dirty tracked wiki sources cannot be fresh', () => {
    fs.writeFileSync(path.join(workspace, 'wiki/topic.md'), page('2999-01-01', ['raw/source.md']));
    fs.writeFileSync(path.join(workspace, 'raw/source.md'), 'uncommitted edit\n');
    assert.strictEqual(wikiStatus(workspace)[0].status, 'stale');
    fs.unlinkSync(path.join(workspace, 'raw/source.md'));
    assert.match(wikiStatus(workspace)[0].problems.join(' '), /missing source/);
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
    assert.strictEqual(rows['wiki/record.md'].status, 'historical');
    assert.deepStrictEqual(rows['wiki/old.md'].problems, ['not listed in index.md']);
  });
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

summary(passed, failed);
