/**
 * Tests for scripts/lib/knowledge-sources.js and config/knowledge-sources.json
 *
 * Run with: node tests/lib/knowledge-sources.test.js
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  DEFAULT_REGISTRY_PATH,
  TENANT_FORBIDDEN_STORE_KINDS,
  validateRegistry,
  loadRegistry,
  routeInformationType,
} = require('../../scripts/lib/knowledge-sources');

const { test, banner, section, summary } = require('./helpers/mini-test-runner');

const REAL = JSON.parse(fs.readFileSync(DEFAULT_REGISTRY_PATH, 'utf8'));

function clone() {
  return JSON.parse(JSON.stringify(REAL));
}

function sourceOf(registry, id) {
  const source = registry.sources.find(s => s.id === id);
  if (!source) throw new Error(`fixture registry has no source '${id}'`);
  return source;
}

// Apply `mutate` to a copy of the real registry and return the validation errors.
function errorsAfter(mutate) {
  const registry = clone();
  mutate(registry);
  const result = validateRegistry(registry);
  assert.strictEqual(result.valid, false, 'expected the mutated registry to be rejected');
  return result.errors;
}

function assertError(errors, code, fragment) {
  const hit = errors.find(e => e.code === code && `${e.path} ${e.message}`.includes(fragment));
  assert.ok(hit, `expected ${code} mentioning '${fragment}', got:\n${JSON.stringify(errors, null, 2)}`);
}

let passed = 0;
let failed = 0;
const run = (name, fn) => { if (test(name, fn)) passed++; else failed++; };

banner('Testing knowledge-source registry');

section('real registry:');

run('config/knowledge-sources.json is valid', () => {
  const result = validateRegistry(REAL);
  assert.deepStrictEqual(result.errors, []);
  assert.strictEqual(result.valid, true);
});

run('loadRegistry returns the parsed registry', () => {
  assert.strictEqual(loadRegistry().sources.length, REAL.sources.length);
});

run('every agent, personal, and code-graph store forbids tenant data', () => {
  const protectedKinds = ['ecc-memory-vault', 'gbrain', 'obsidian-vault', 'graphify-files', 'falkordb'];
  for (const kind of protectedKinds) {
    const sources = REAL.sources.filter(s => s.canonicalStore.kind === kind);
    assert.ok(sources.length > 0, `registry has no '${kind}' source`);
    for (const s of sources) assert.strictEqual(s.tenantData, 'forbidden', s.id);
  }
});

run('agents only read the code graphs', () => {
  for (const id of ['graphify-code-graph', 'falkordb-code-graph']) {
    assert.strictEqual(sourceOf(REAL, id).agentAccess, 'read-only', id);
  }
});

run('no tenant-data source is readable by coding agents', () => {
  for (const s of REAL.sources.filter(x => x.tenantData === 'required')) {
    assert.strictEqual(s.agentAccess, 'none', s.id);
    assert.ok(!s.readers.includes('coding-agents'), s.id);
  }
});

run('rejects a registry file that fails validation', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-knowledge-sources-'));
  try {
    const bad = clone();
    delete bad.sources[0].owner;
    const file = path.join(dir, 'knowledge-sources.json');
    fs.writeFileSync(file, JSON.stringify(bad));
    assert.throws(() => loadRegistry(file), /missing required field 'owner'/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

section('required fields:');

for (const field of ['scope', 'owner', 'canonicalStore', 'sensitivity']) {
  run(`rejects a source without ${field}`, () => {
    const errors = errorsAfter(r => { delete sourceOf(r, 'operator-wiki')[field]; });
    assertError(errors, 'MISSING_FIELD', field);
  });
}

run('rejects an empty scope', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'operator-wiki').scope.levels = []; });
  assertError(errors, 'SCHEMA', 'scope/levels');
});

run('rejects a canonical store without a kind', () => {
  const errors = errorsAfter(r => { delete sourceOf(r, 'operator-wiki').canonicalStore.kind; });
  assertError(errors, 'MISSING_FIELD', 'kind');
});

run('rejects an unknown sensitivity', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'operator-wiki').sensitivity = 'secret'; });
  assertError(errors, 'SCHEMA', 'sensitivity');
});

run('rejects a blank owner', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'operator-wiki').owner = '   '; });
  assertError(errors, 'SCHEMA', 'owner');
});

run('rejects a changed set of trust states', () => {
  const errors = errorsAfter(r => { r.trustStates = ['unreviewed', 'governed']; });
  assertError(errors, 'SCHEMA', 'trustStates');
});

section('tenant boundary:');

for (const id of ['operator-wiki', 'obsidian-knowledge-workspace', 'ecc-memory-vault', 'falkordb-code-graph', 'graphify-code-graph']) {
  run(`rejects tenant data in ${id}`, () => {
    const errors = errorsAfter(r => {
      const s = sourceOf(r, id);
      s.tenantData = 'required';
      s.sensitivity = 'tenant-confidential';
      s.scope = { levels: ['tenant'], isolationKey: 'tenant_id' };
    });
    assertError(errors, 'TENANT_BOUNDARY', 'can only live in platform stores');
  });
}

run('rejects tenant-confidential sensitivity on agent memory even if tenantData says forbidden', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'ecc-memory-vault').sensitivity = 'tenant-confidential'; });
  assertError(errors, 'TENANT_BOUNDARY', 'ecc-memory-vault');
});

run('rejects tenant users writing to a personal store', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'operator-wiki').writers.push('tenant-users'); });
  assertError(errors, 'TENANT_BOUNDARY', 'operator-wiki');
});

run('rejects projecting tenant documents into the code graph', () => {
  const errors = errorsAfter(r => {
    sourceOf(r, 'platform-knowledge-documents').derivedProjections.push('falkordb-code-graph');
    sourceOf(r, 'falkordb-code-graph').derivedFrom.push('platform-knowledge-documents');
  });
  assertError(errors, 'TENANT_BOUNDARY', "projected into 'falkordb-code-graph'");
});

run('rejects tenant data declared without an isolation key', () => {
  const errors = errorsAfter(r => { delete sourceOf(r, 'platform-agent-memory').scope.isolationKey; });
  assertError(errors, 'TENANT_SCOPE', 'isolationKey');
});

run('rejects tenant data without tenant scope', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'platform-knowledge-documents').scope.levels = ['project']; });
  assertError(errors, 'TENANT_SCOPE', "scope level 'tenant'");
});

run('the boundary is keyed on store kind in code, covering every protected kind', () => {
  for (const kind of ['ecc-memory-vault', 'gbrain', 'obsidian-vault', 'graphify-files', 'falkordb', 'harness-memory', 'mcp-memory']) {
    assert.ok(TENANT_FORBIDDEN_STORE_KINDS.has(kind), kind);
  }
  assert.ok(!TENANT_FORBIDDEN_STORE_KINDS.has('mongodb'));
});

section('trust, authority, and lifecycle:');

run('rejects verified or governed entries in the ECC Memory Vault', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'ecc-memory-vault').trustStates = ['unreviewed', 'verified']; });
  assertError(errors, 'TRUST_STATE', "'verified'");
});

run('rejects governed trust outside version-controlled repositories', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'obsidian-knowledge-workspace').trustStates.push('governed'); });
  assertError(errors, 'TRUST_STATE', 'obsidian-knowledge-workspace');
});

run('rejects a projection agents can write to', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'falkordb-code-graph').agentAccess = 'read-write'; });
  assertError(errors, 'PROJECTION', 'read-only');
});

run('rejects a projection with no origin', () => {
  const errors = errorsAfter(r => {
    sourceOf(r, 'graphify-code-graph').derivedProjections = [];
    const f = sourceOf(r, 'falkordb-code-graph');
    f.derivedFrom = [];
  });
  assertError(errors, 'PROJECTION', 'falkordb-code-graph');
});

run('rejects a canonical source that claims to be derived', () => {
  const errors = errorsAfter(r => {
    sourceOf(r, 'operator-wiki').derivedFrom.push('repo-source-code');
    sourceOf(r, 'repo-source-code').derivedProjections.push('operator-wiki');
  });
  assertError(errors, 'PROJECTION', "authority is 'canonical'");
});

run('rejects one-sided projection links', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'falkordb-code-graph').derivedFrom = ['repo-source-code', 'graphify-code-graph']; });
  assertError(errors, 'PROJECTION', "'repo-source-code' does not list 'falkordb-code-graph'");
});

run('rejects links to unknown sources', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'repo-source-code').derivedProjections.push('no-such-source'); });
  assertError(errors, 'UNKNOWN_REF', 'no-such-source');
});

run('rejects writers on a deprecated source', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'ecc-knowledge-vault').writers = ['coding-agents']; });
  assertError(errors, 'LIFECYCLE', 'ecc-knowledge-vault');
});

run('rejects an interface that owns information types', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'obsidian-knowledge-workspace').informationTypes = ['meetings-notes']; });
  assertError(errors, 'ROUTING', 'obsidian-knowledge-workspace');
});

run('rejects two sources owning one information type', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'harness-memory').informationTypes = []; sourceOf(r, 'operator-wiki').informationTypes.push('agent-handoffs'); });
  assertError(errors, 'ROUTING', "'agent-handoffs' is already owned");
});

run('rejects duplicate source ids', () => {
  const errors = errorsAfter(r => { r.sources.push({ ...sourceOf(r, 'issue-tracker'), informationTypes: [] }); });
  assertError(errors, 'DUPLICATE_ID', 'issue-tracker');
});

run('rejects absolute machine paths in locations', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'operator-wiki').canonicalStore.location = 'C:\\Users\\someone\\.gbrain\\brain.pglite'; });
  assertError(errors, 'MACHINE_PATH', 'operator-wiki');
});

section('routing:');

const ROUTES = [
  ['agent-working-preferences', 'ecc-memory-vault', 'a formatting preference goes to coding-agent memory'],
  ['business-relationships', 'operator-wiki', 'a company relationship goes to the operator wiki'],
  ['tenant-documents', 'platform-knowledge-documents', 'a tenant document goes to platform knowledge'],
  ['coding-standards', 'governed-repo-docs', 'a coding standard goes to governed repository docs'],
  ['tenant-user-preferences', 'platform-agent-memory', 'a product user preference goes to platform agent memory'],
  ['code-relationships', 'graphify-code-graph', 'code relationships come from the graphify projection'],
];

for (const [type, expected, label] of ROUTES) {
  run(label, () => {
    assert.strictEqual(routeInformationType(REAL, type).id, expected);
  });
}

run('refuses to route customer information into agent memory', () => {
  assert.throws(
    () => routeInformationType(REAL, 'agent-handoffs', { containsTenantData: true }),
    err => err.code === 'TENANT_BOUNDARY'
  );
});

run('refuses to route customer information into the operator wiki', () => {
  assert.throws(
    () => routeInformationType(REAL, 'organizations', { containsTenantData: true }),
    err => err.code === 'TENANT_BOUNDARY'
  );
});

run('routes customer information to a tenant-scoped store', () => {
  assert.strictEqual(routeInformationType(REAL, 'tenant-documents', { containsTenantData: true }).tenantData, 'required');
});

run('an unknown information type is an error, not a fallback', () => {
  assert.throws(() => routeInformationType(REAL, 'random-notes'), err => err.code === 'UNKNOWN_TYPE');
});

run('an active source needs at least one reader', () => {
  const errors = errorsAfter(r => { sourceOf(r, 'operator-wiki').readers = []; });
  assertError(errors, 'LIFECYCLE', 'at least one reader');
});

run('GBrain is retired: no readers, writers, agent access, or routes', () => {
  const gbrain = sourceOf(REAL, 'gbrain');
  assert.strictEqual(gbrain.lifecycle, 'deprecated');
  assert.deepStrictEqual([gbrain.readers, gbrain.writers, gbrain.informationTypes], [[], [], []]);
  assert.strictEqual(gbrain.agentAccess, 'none');
});

run('deprecated sources receive no routes', () => {
  for (const s of REAL.sources.filter(x => x.lifecycle === 'deprecated')) {
    assert.deepStrictEqual(s.writers, [], s.id);
  }
});

summary(passed, failed);
