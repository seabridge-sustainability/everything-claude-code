'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { savedConfig, nativeProof, refusalEvidence, browserAssignments, main, read } = require('../../scripts/parallel-agent-preflight');
const now = Date.parse('2026-10-26T05:00:00Z'), seconds = now / 1000;
const root = '11111111-2222-3333-4444-555555555555';
const id = n => 'aaaaaaaa-bbbb-cccc-dddd-' + n.toString(16).padStart(12, '0');
const browser = { hostId: 'fixture-host', bootId: root, pid: 123, startTicks: '456', profileDevice: '29', profileInode: '789' };
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
// Synthetic source inspector only. Production uses the existing adapter's
// retained executable/source-policy verifier; this fixture starts no producer.
const options = { now, inspectOperation: (_a, bytes) => JSON.parse(bytes[0]) };
function proof(count = 25, sequential = false) {
  return { root, at: new Date(now).toISOString(), intervalPeakLowerBound: count,
    agents: Array.from({ length: count }, (_, n) => ({ id: id(n + 1), task: { task: 'Useful fixture contract review ' + n },
      turn: { startedAt: seconds - 100 + (sequential ? n * 2 : 0),
        completedAt: sequential ? seconds - 99 + n * 2 : seconds - 1 } })) };
}
const config = '[agents]\nmax_concurrent_threads_per_session = 1000000\n[features.multi_agent_v2]\nmax_concurrent_threads_per_session = 1000001\n';
function fixture(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-preflight-'));
  try { return fn(dir); } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
function assignment(dir, n = 1, changes = {}) {
  const a = { schema: 'rea.passive-target-assignment.v1', status: 'ISSUED',
    coordinatorThreadId: root, navigatorThreadId: id(n), actor: 'rea-fixture-' + n,
    operation: 'fixture-operation', goalId: 'fixture-goal', nonce: n.toString(16).padStart(32, '0'),
    expiresAt: new Date(now + 60000).toISOString(), peakRamGiB: 1,
    targetId: n.toString(16).padStart(32, '0'), browser: { ...browser }, backgroundOnly: true };
  for (const prefix of ['producer', 'observer', 'scopeReview']) {
    a[prefix + 'Path'] = path.join(dir, prefix + n + '.txt');
    const bytes = Buffer.from('Synthetic reviewed ' + prefix);
    fs.writeFileSync(a[prefix + 'Path'], bytes); a[prefix + 'SHA256'] = hash(bytes);
  }
  const producer = Buffer.from(JSON.stringify({ binding: { actor: a.actor, nonce: a.nonce,
    absoluteStop: a.expiresAt, source: a.observerPath, sourceSHA256: a.observerSHA256 },
    scopePath: a.scopeReviewPath, scopeSHA256: a.scopeReviewSHA256 }));
  fs.writeFileSync(a.producerPath, producer); a.producerSHA256 = hash(producer);
  return { ...a, ...changes };
}
function claim(a, changes = {}) {
  return { id: a.actor + ':' + a.nonce, kind: 'browser-target', owner: a.actor,
    resource: a.targetId, browser: a.browser, backgroundOnly: true,
    state: 'running', leaseUntil: a.expiresAt, ...changes };
}
test('legacy million alone does not configure V2; current plain tables distinguish both values', () => {
  const old = savedConfig('[agents]\nmax_concurrent_threads_per_session=1000000\n', '0.163.0', 25);
  assert.equal(old.status, 'MISSING_V2_CEILING'); assert.equal(old.legacyLimit, 1000000);
  const current = savedConfig(config, '0.163.0', 25);
  assert.equal(current.v2Limit, 1000001); assert.equal(current.appliesToLoadedOnceLock, false);
  assert.equal(savedConfig(config.replace('1000001', '4'), '0.163.0', 4).status, 'V2_CEILING_BELOW_REQUEST');
});
test('unsupported versions, conflicting bool/table and duplicate leaves never get a config pass', () => {
  assert.equal(savedConfig(config, '0.164.0', 25).status, 'UNVERIFIED_CLIENT_VERSION');
  assert.equal(savedConfig('[features]\nmulti_agent_v2=true\n' + config, '0.163.0', 25).status, 'UNVERIFIED_TOML_FORM');
  assert.equal(savedConfig(config + 'max_concurrent_threads_per_session=99\n', '0.163.0', 25).status, 'UNVERIFIED_TOML_FORM');
});
test('table-shaped content in multiline basic and literal strings cannot pass saved configuration', () => {
  for (const delimiter of ['"""', "'''"]) {
    const embedded = 'description = ' + delimiter + '\n' + config + delimiter + '\n';
    const result = savedConfig(embedded, '0.163.0', 25);
    assert.equal(result.status, 'UNVERIFIED_TOML_FORM');
    assert.equal(result.v2Limit, null);
    assert.equal(savedConfig(config + embedded, '0.163.0', 25).status, 'UNVERIFIED_TOML_FORM');
  }
});
test('malformed TOML integer separators cannot report a saved ceiling', () => {
  for (const value of ['1000001_', '1__000_001', '_1000001', '01']) {
    assert.equal(savedConfig(config.replace('1000001', value), '0.163.0', 25).status, 'UNVERIFIED_TOML_FORM');
  }
  assert.equal(savedConfig(config.replace('1000001', '1_000_001'), '0.163.0', 25).status, 'SAVED_V2_CEILING_PRESENT');
});
test('recompute overlapping useful child turns rather than trusting reported peak or admission count', () => {
  assert.equal(nativeProof(proof(), root, now, 300, 25).overlappingChildrenLowerBound, 25);
  const sequential = nativeProof(proof(25, true), root, now, 300, 25);
  assert.equal(sequential.admittedChildren, 25); assert.equal(sequential.overlappingChildrenLowerBound, 1);
  assert.equal(sequential.reportedPeakMatches, false); assert.equal(sequential.status, 'OVERLAP_BELOW_REQUEST');
});
test('one agent cannot inflate overlap with duplicate turns; touching intervals do not overlap', () => {
  const p = proof(2, true); p.intervalPeakLowerBound = 1;
  p.agents[0].turns = [p.agents[0].turn, { ...p.agents[0].turn }];
  p.agents[1].turn.startedAt = p.agents[0].turn.completedAt;
  assert.equal(nativeProof(p, root, now, 300, 2).overlappingChildrenLowerBound, 1);
});
test('wrong root, duplicate IDs, missing useful tasks, future and stale observations are caught', () => {
  assert.throws(() => nativeProof(proof(), id(99), now, 300, 25), /exact requested root/);
  const duplicate = proof(); duplicate.agents[1].id = duplicate.agents[0].id;
  assert.throws(() => nativeProof(duplicate, root, now, 300, 25), /distinct native child/);
  const empty = proof(); empty.agents[0].task.task = '';
  assert.throws(() => nativeProof(empty, root, now, 300, 25), /useful task/);
  assert.throws(() => nativeProof(proof(), root, now - 1, 300, 25), /nonfuture/);
  assert.equal(nativeProof(proof(), root, now + 301000, 300, 25).status, 'HISTORICAL');
});
test('old three-child/four-total refusal remains separate from current loaded capacity', () => {
  const r = refusalEvidence({ exactRefusal: 'collab spawn failed: agent thread limit reached',
    observations: [{ at: new Date(now - 1000).toISOString(), childStates: [1,2,3].map(n => ({ id: id(n) })) }] })[0];
  assert.match(r.pattern, /FOUR_TOTAL/); assert.equal(r.currentLimit, 'UNVERIFIED');
});
test('distinct canonical targets match queue records without granting authority or native liveness', () => fixture(dir => {
  const a = assignment(dir), b = assignment(dir, 2);
  const result = browserAssignments([a,b], [claim(a),claim(b)], options);
  assert.equal(result.length, 2); assert.notEqual(result[0].targetKey, result[1].targetKey);
  assert.equal(result[0].queueRecord, 'MATCHING_RUNNING_RECORD');
  assert.equal(result[0].authorizationGranted, false); assert.equal(result[0].nativeIdentityCurrent, 'UNVERIFIED');
}));
test('same target case aliases and duplicate owners/navigators refuse parallel controllers', () => fixture(dir => {
  const a = assignment(dir, 10), b = assignment(dir, 11, { targetId: a.targetId.toUpperCase() });
  assert.throws(() => browserAssignments([a,b], [], options), /same canonical target/);
  b.targetId = 'b'.repeat(32); b.navigatorThreadId = a.navigatorThreadId;
  assert.throws(() => browserAssignments([a,b], [], options), /distinct parallel/);
}));
test('canonical epochs are complete and altered source bytes cannot pass their issued pins', () => fixture(dir => {
  const a = assignment(dir); a.browser.startTicks = '0456';
  assert.throws(() => browserAssignments([a], [], options), /canonical native browser/);
  a.browser.startTicks = '456'; fs.appendFileSync(a.producerPath, 'changed');
  assert.throws(() => browserAssignments([a], [], options), /source hash mismatch/);
}));
test('UNISSUED is planned only; expired leases never become free targets; wrong queue owner refuses', () => fixture(dir => {
  assert.equal(browserAssignments([{ schema: 'rea.passive-target-assignment.v1', status: 'UNISSUED' }], [], options)[0].status, 'UNISSUED');
  const a = assignment(dir);
  assert.equal(browserAssignments([a], [claim(a, { leaseUntil: new Date(now - 1).toISOString() })], options)[0].queueRecord, 'EXPIRED_RECONCILIATION_REQUIRED');
  assert.throws(() => browserAssignments([a], [claim(a, { owner: 'other-owner' })], options), /another controller/);
  assert.equal(browserAssignments([a], [], { ...options, now: now + 60001 })[0].status, 'EXPIRED_RECONCILIATION_REQUIRED');
}));
test('assignment expiry/source metadata cannot diverge from issued operation; queue cannot outlive it', () => fixture(dir => {
  const a = assignment(dir);
  assert.throws(() => browserAssignments([a], [claim(a, { leaseUntil: new Date(now + 60001).toISOString() })], options), /exceeds assignment/);
  a.expiresAt = new Date(now + 120000).toISOString();
  assert.throws(() => browserAssignments([a], [], options), /original operation source bindings differ/);
}));
test('CLI projects only nonsecret evidence and does not modify supplied files', () => fixture(dir => {
  const file = path.join(dir, 'config.toml'), receipt = path.join(dir, 'proof.json');
  fs.writeFileSync(file, 'api_key="SYNTHETIC_DO_NOT_ECHO"\n' + config); fs.writeFileSync(receipt, JSON.stringify(proof()));
  const before = fs.readFileSync(file); let output;
  assert.equal(main(['--client-version','0.163.0','--saved-config',file,'--root',root,'--proof',receipt,'--min-children','25'], { clock: () => now, print: s => { output = s; } }), 0);
  assert.equal(output.includes('SYNTHETIC_DO_NOT_ECHO'), false); assert.deepEqual(fs.readFileSync(file), before);
  const result = JSON.parse(output); assert.equal(result.browserCalls, 0); assert.equal(result.modelCalls, 0);
  assert.equal(result.authorizationGranted, false); assert.match(result.effectiveLoadedConfiguration, /UNVERIFIED/);
}));
test('bounded regular reads reject symlinks and oversized inputs', () => fixture(dir => {
  const file = path.join(dir, 'source'), link = path.join(dir, 'link'); fs.writeFileSync(file, 'x'.repeat(50));
  fs.symlinkSync(file, link); assert.throws(() => read(link)); assert.throws(() => read(file, 10), /bounded regular/);
}));
