'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { SOURCES, OUTPUT, buildMap, buildMetadata, check } = require('../../scripts/agent-system-map');
const { test, summary } = require('../lib/helpers/mini-test-runner');

let passed = 0;
let failed = 0;
const run = (name, fn) => { if (test(name, fn)) passed++; else failed++; };
const root = path.resolve(__dirname, '../..');

function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-system-map-'));
  for (const relative of SOURCES) {
    const target = path.join(dir, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, relative), target);
  }
  return dir;
}
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
    'file:scripts/ci/detect-ci-scope.js', 'file:tests/ci/workflow-cost-contract.test.js',
    'runtime:codex', 'runtime:claude', 'runtime:gemini', 'runtime:opencode']) {
    assert.ok(ids.has(required), required);
  }
  assert.strictEqual(map.nodes.filter(node => node.type === 'runtime').length, 18);
  assert.ok(map.edges.some(edge => edge.from === 'file:CLAUDE.md' && edge.to === 'file:AGENTS.md' && edge.type === 'verified-import'));
  assert.ok(map.edges.some(edge => edge.from === 'runtime:claude' && edge.to === 'file:hooks/hooks.json' && edge.type === 'runtime-evidence'));
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
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

run('unchanged fixture is fresh but edited policy fails closed', () => {
  const dir = fixture();
  try {
    writeMap(dir);
    assert.strictEqual(check(dir).fresh, true);
    fs.appendFileSync(path.join(dir, 'AGENTS.md'), '\n# changed rule\n');
    assert.strictEqual(check(dir).fresh, false);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

run('Windows and Linux checkout line endings have the same source fingerprint', () => {
  const dir = fixture();
  try {
    writeMap(dir);
    const target = path.join(dir, '.clinerules');
    const source = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');
    fs.writeFileSync(target, source.replace(/\n/g, '\r\n'));
    assert.strictEqual(check(dir).fresh, true);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
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
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

run('broken declared adapter target cannot be certified', () => {
  const dir = fixture();
  try {
    const manifestPath = path.join(dir, 'manifests/instruction-adapters.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.adapters.find(adapter => adapter.id === 'claude').entry = 'NONEXISTENT.md';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest));
    assert.throws(() => buildMap(dir), /out-of-scope target/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

run('declared import without the actual adapter import cannot be certified', () => {
  const dir = fixture();
  try {
    fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '# adapter without an import\n');
    assert.throws(() => buildMap(dir), /declared import missing/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

run('new runtime evidence outside the declared map scope fails closed', () => {
  const dir = fixture();
  try {
    const manifestPath = path.join(dir, 'manifests/goal-runtime-capabilities.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.runtimes.find(runtime => runtime.id === 'claude').evidence.push('hooks/new-control.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest));
    assert.throws(() => buildMap(dir), /out-of-scope target hooks\/new-control\.json/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

summary(passed, failed);
