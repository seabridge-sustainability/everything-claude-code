'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { POLICY_FILES, SOURCES, OUTPUT, buildMap, buildMetadata, check, materialize } = require('../../scripts/agent-system-map');
const { test, summary } = require('../lib/helpers/mini-test-runner');

let passed = 0;
let failed = 0;
const run = (name, fn) => { if (test(name, fn)) passed++; else failed++; };
const root = path.resolve(__dirname, '../..');

function fixture() {
  // Keep cross-repository policy copies inside this fixture's own temporary tree.
  const container = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-system-map-'));
  const dir = path.join(container, 'ecc');
  for (const relative of SOURCES) {
    const target = path.join(dir, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, relative), target);
  }
  return dir;
}
function removeFixture(dir) { fs.rmSync(path.dirname(dir), { recursive: true, force: true }); }
function writeMap(dir) {
  const target = path.join(dir, OUTPUT);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify({ ...buildMap(dir), build: buildMetadata(dir) }, null, 2)}\n`);
  return target;
}

run('map covers canonical policy, all adapters, outcome gate, and CI with bounded source scope', () => {
  const map = buildMap(root);
  const ids = new Set(map.nodes.map(node => node.id));
  for (const required of ['file:AGENTS.md', 'file:protocols/GOAL_PROTOCOL.md',
    'file:scripts/goal-control.js', 'file:.github/workflows/ci.yml',
    'file:scripts/agent-adoption-doctor.js', 'file:scripts/knowledge-retrieval-eval.js',
    'file:scripts/lib/memory-vault.js', 'file:scripts/memory-mcp.mjs',
    'file:schemas/memory.schema.json',
    'file:scripts/ci/detect-ci-scope.js', 'file:tests/ci/workflow-cost-contract.test.js',
    'file:integrations/pstack/cli.mjs', 'file:integrations/pstack/mcp.mjs',
    'file:integrations/ponytail/cli.mjs', 'file:integrations/ponytail/mcp.mjs',
    'file:skills/sea-ponytail/SKILL.md',
    'file:manifests/task-skill-routing.json', 'file:scripts/lib/skill-routing.js',
    'file:scripts/fresh-agent-session.js', 'file:scripts/lib/fresh-session-guard.js',
    'file:integrations/engineering-skills/catalog.mjs',
    'file:skills/sea-multi-model-planning/SKILL.md', 'file:skills/sea-verify-seabridge/SKILL.md',
    'runtime:codex', 'runtime:claude', 'runtime:gemini', 'runtime:opencode']) {
    assert.ok(ids.has(required), required);
  }
  assert.strictEqual(map.nodes.filter(node => node.type === 'runtime').length, 18);
  assert.ok(map.edges.some(edge => edge.from === 'file:integrations/pstack/mcp.mjs'
    && edge.to === 'file:integrations/dev-suite/runtime.mjs' && edge.type === 'verified-code-import'));
  assert.ok(map.edges.some(edge => edge.from === 'file:integrations/ponytail/mcp.mjs'
    && edge.to === 'file:integrations/dev-suite/runtime.mjs' && edge.type === 'verified-code-import'));
  assert.ok(map.edges.some(edge => edge.from === 'file:CLAUDE.md' && edge.to === 'file:../manageesg-backend/CLAUDE.md' && edge.type === 'verified-import'));
  assert.ok(map.edges.some(edge => edge.from === 'runtime:claude' && edge.to === 'file:hooks/hooks.json' && edge.type === 'runtime-evidence'));
  assert.ok(map.edges.some(edge => edge.from === 'file:scripts/memory.js'
    && edge.to === 'file:scripts/lib/memory-vault.js' && edge.type === 'verified-code-import'));
  assert.ok(map.sources.every(row => !/^(?:data|artifacts|logs|graphify-out)\//.test(row.path)));
  assert.strictEqual(map.coverage.semanticIndex, 'not-run');
  assert.ok(map.coverage.excludedRoots.includes('data/'));
});

run('a map built from dirty sources cannot be used as release evidence', () => {
  const dir = fixture();
  try {
    const target = writeMap(dir);
    const data = JSON.parse(fs.readFileSync(target, 'utf8'));
    data.build.sourceDirty = true;
    fs.writeFileSync(target, JSON.stringify(data));
    assert.match(check(dir).reason, /dirty source files/);
  } finally { removeFixture(dir); }
});

run('unchanged fixture is fresh but edited policy fails closed', () => {
  const dir = fixture();
  try {
    writeMap(dir);
    assert.strictEqual(check(dir).fresh, true);
    fs.appendFileSync(path.join(dir, 'AGENTS.md'), '\n# changed rule\n');
    assert.strictEqual(check(dir).fresh, false);
  } finally { removeFixture(dir); }
});

run('central backend policy changes make the map stale', () => {
  const dir = fixture();
  try {
    writeMap(dir);
    assert.strictEqual(check(dir).fresh, true);
    fs.appendFileSync(path.join(dir, '../manageesg-backend/AGENTS_SYSTEM.md'), '\nChanged acceptance rule\n');
    assert.strictEqual(check(dir).fresh, false);
  } finally { removeFixture(dir); }
});

run('a dirty central policy receipt cannot certify freshness', () => {
  const dir = fixture();
  try {
    const target = writeMap(dir);
    const stored = JSON.parse(fs.readFileSync(target, 'utf8'));
    stored.build.sourceDirty = false;
    stored.build.policyDirty = true;
    fs.writeFileSync(target, JSON.stringify(stored));
    assert.strictEqual(check(dir).fresh, false);
  } finally { removeFixture(dir); }
});

run('memory control changes make the map stale', () => {
  const dir = fixture();
  try {
    writeMap(dir);
    assert.strictEqual(check(dir).fresh, true);
    fs.appendFileSync(path.join(dir, 'scripts/lib/memory-vault.js'), '\n// changed memory behavior\n');
    assert.strictEqual(check(dir).fresh, false);
  } finally { removeFixture(dir); }
});

run('broken memory import cannot be certified', () => {
  const dir = fixture();
  try {
    const target = path.join(dir, 'scripts/memory.js');
    fs.writeFileSync(target, fs.readFileSync(target, 'utf8')
      .replace("require('./lib/memory-vault')", "require('./lib/missing-vault')"));
    assert.throws(() => buildMap(dir), /declared memory import missing/);
  } finally { removeFixture(dir); }
});

run('Windows and Linux checkout line endings have the same source fingerprint', () => {
  const dir = fixture();
  try {
    writeMap(dir);
    const target = path.join(dir, '.clinerules');
    const source = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');
    fs.writeFileSync(target, source.replace(/\n/g, '\r\n'));
    assert.strictEqual(check(dir).fresh, true);
  } finally { removeFixture(dir); }
});

run('tampered map and missing source fail closed', () => {
  const dir = fixture();
  try {
    const target = writeMap(dir);
    const data = JSON.parse(fs.readFileSync(target, 'utf8'));
    data.edges = [];
    fs.writeFileSync(target, JSON.stringify(data));
    assert.strictEqual(check(dir).fresh, false);
    fs.unlinkSync(path.join(dir, 'CLAUDE.md'));
    assert.strictEqual(check(dir).fresh, false);
  } finally { removeFixture(dir); }
});

run('broken declared adapter target cannot be certified', () => {
  const dir = fixture();
  try {
    const manifestPath = path.join(dir, 'manifests/instruction-adapters.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.adapters.find(adapter => adapter.id === 'claude').entry = 'NONEXISTENT.md';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest));
    assert.throws(() => buildMap(dir), /out-of-scope target/);
  } finally { removeFixture(dir); }
});

run('declared import without the actual adapter import cannot be certified', () => {
  const dir = fixture();
  try {
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '# adapter without an import\n');
    assert.throws(() => buildMap(dir), /declared import missing/);
  } finally { removeFixture(dir); }
});

run('new runtime evidence outside the declared map scope fails closed', () => {
  const dir = fixture();
  try {
    const manifestPath = path.join(dir, 'manifests/goal-runtime-capabilities.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.runtimes.find(runtime => runtime.id === 'claude').evidence.push('hooks/new-control.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest));
    assert.throws(() => buildMap(dir), /out-of-scope target hooks\/new-control\.json/);
  } finally { removeFixture(dir); }
});

run('verification snapshot requires clean provenance and rejects corrupt content or replacement', () => {
  const dir = fixture();
  try {
    const target = writeMap(dir);
    const data = JSON.parse(fs.readFileSync(target, 'utf8'));
    assert.throws(() => materialize(dir), /clean, committed/);
    data.build = { ...data.build, sourceDirty: false, policyDirty: false, policyCommit: 'a'.repeat(40) };
    fs.writeFileSync(target, JSON.stringify(data));
    assert.strictEqual(materialize(dir).files, 4);
    data.policySnapshot[0].text += '\ncorruption';
    fs.writeFileSync(target, JSON.stringify(data));
    assert.throws(() => materialize(dir), /digest mismatch/);
    data.policySnapshot[0].text = data.policySnapshot[0].text.replace(/\ncorruption$/, '');
    fs.writeFileSync(target, JSON.stringify(data));
    fs.appendFileSync(path.join(dir, '..', 'manageesg-backend', 'AGENTS.md'), '\nexisting work');
    assert.throws(() => materialize(dir), /overwrite existing/);
  } finally { removeFixture(dir); }
});

run('verification snapshot creates the four allowed files and missing nested directories', () => {
  const dir = fixture();
  try {
    const target = writeMap(dir);
    const data = JSON.parse(fs.readFileSync(target, 'utf8'));
    data.build = { ...data.build, sourceDirty: false, policyDirty: false, policyCommit: 'b'.repeat(40) };
    fs.writeFileSync(target, JSON.stringify(data));
    const destination = path.join(dir, '..', 'manageesg-backend');
    fs.rmSync(destination, { recursive: true, force: true });
    assert.strictEqual(materialize(dir).files, 4);
    assert.strictEqual(materialize(dir).files, 4);
    assert.strictEqual(check(dir).fresh, true);
  } finally { removeFixture(dir); }
});


run('parallel-agent guide is required, hash-bound, and part of map freshness', () => {
  const dir = fixture();
  try {
    assert.deepStrictEqual([...POLICY_FILES].sort(), [
      'AGENTS.md', 'AGENTS_SYSTEM.md', 'CLAUDE.md', 'docs/ai-tools/PARALLEL_CODING_AGENTS.md',
    ]);
    const target = writeMap(dir), data = JSON.parse(fs.readFileSync(target, 'utf8'));
    data.build = { ...data.build, sourceDirty: false, policyDirty: false, policyCommit: 'c'.repeat(40) };
    const guide = data.policySnapshot.find(row => row.path.endsWith('/PARALLEL_CODING_AGENTS.md'));
    assert(guide);
    guide.text += '\ncorruption';
    fs.writeFileSync(target, JSON.stringify(data));
    assert.throws(() => materialize(dir), /digest mismatch/);
    writeMap(dir);
    const guidePath = path.join(dir, guide.path);
    fs.appendFileSync(guidePath, '\nchanged guide');
    assert.strictEqual(check(dir).fresh, false);
    fs.unlinkSync(guidePath);
    assert.throws(() => buildMap(dir), /missing regular source/);
  } finally { removeFixture(dir); }
});

run('snapshot rejects extra or absent guide entries before creating any files', () => {
  const dir = fixture();
  try {
    const target = writeMap(dir), data = JSON.parse(fs.readFileSync(target, 'utf8'));
    data.build = { ...data.build, sourceDirty: false, policyDirty: false, policyCommit: 'd'.repeat(40) };
    const destination = path.join(dir, '..', 'manageesg-backend');
    fs.rmSync(destination, { recursive: true, force: true });
    const original = data.policySnapshot;
    for (const snapshot of [original.slice(0, -1), [...original, { path: '../manageesg-backend/unapproved.md' }]]) {
      data.policySnapshot = snapshot;
      fs.writeFileSync(target, JSON.stringify(data));
      assert.throws(() => materialize(dir), /exactly the four allowed/);
      assert.strictEqual(fs.existsSync(destination), false);
    }
  } finally { removeFixture(dir); }
});

run('snapshot refuses existing and dangling symlinks before any policy writes', () => {
  for (const relative of ['', 'docs', 'docs/ai-tools', 'docs/ai-tools/PARALLEL_CODING_AGENTS.md']) {
    for (const dangling of [false, true]) {
      const dir = fixture();
      try {
        const target = writeMap(dir), data = JSON.parse(fs.readFileSync(target, 'utf8'));
        data.build = { ...data.build, sourceDirty: false, policyDirty: false, policyCommit: 'e'.repeat(40) };
        fs.writeFileSync(target, JSON.stringify(data));
        const destination = path.join(dir, '..', 'manageesg-backend');
        fs.rmSync(destination, { recursive: true, force: true });
        const outside = path.join(path.dirname(dir), 'outside');
        if (!dangling) fs.mkdirSync(outside);
        const link = path.join(destination, relative);
        fs.mkdirSync(path.dirname(link), { recursive: true });
        fs.symlinkSync(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
        assert.throws(() => materialize(dir), /unsafe policy snapshot parent|overwrite existing central policy/);
        for (const name of ['AGENTS.md', 'AGENTS_SYSTEM.md', 'CLAUDE.md']) {
          assert.strictEqual(fs.existsSync(path.join(destination, name)), false);
        }
        if (!dangling) assert.deepStrictEqual(fs.readdirSync(outside), []);
        else assert.strictEqual(fs.existsSync(outside), false);
      } finally { removeFixture(dir); }
    }
  }
});

run('snapshot refuses a regular file in a required parent before any policy writes', () => {
  const dir = fixture();
  try {
    const target = writeMap(dir), data = JSON.parse(fs.readFileSync(target, 'utf8'));
    data.build = { ...data.build, sourceDirty: false, policyDirty: false, policyCommit: 'f'.repeat(40) };
    fs.writeFileSync(target, JSON.stringify(data));
    const destination = path.join(dir, '..', 'manageesg-backend');
    fs.rmSync(destination, { recursive: true, force: true });
    fs.mkdirSync(destination);
    fs.writeFileSync(path.join(destination, 'docs'), 'owned sentinel');
    assert.throws(() => materialize(dir), /unsafe policy snapshot parent/);
    assert.deepStrictEqual(fs.readdirSync(destination), ['docs']);
    assert.strictEqual(fs.readFileSync(path.join(destination, 'docs'), 'utf8'), 'owned sentinel');
  } finally { removeFixture(dir); }
});

summary(passed, failed);
