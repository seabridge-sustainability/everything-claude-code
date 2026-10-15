'use strict';
const assert = require('node:assert/strict');
const { collectFacts } = require('../../scripts/lib/workspace-live-facts');
const now = Date.parse('2026-10-14T03:45:00Z');
const root = 'C:/Users/adelm/SeaBridgeAI/everything-claude-code';
const options = { repositories: [{ id: 'ecc', root }], clock: () => now,
  freeRamBytes: () => 4 * 1024 ** 3, totalRamBytes: () => 32 * 1024 ** 3,
  status: () => ({ now, release: null, sessions: [] }) };
let passed = 0;
function test(name, action) { action(); passed++; console.log('PASS ' + name); }
test('kernel telemetry positive case grants no authority', () => {
  const facts = collectFacts(options);
  assert.equal(facts.freeRamGiB, 4); assert.equal(facts.authorizationGranted, false);
  assert.equal(facts.processLivenessVerified, false);
});
test('unknown or impossible memory stays unknown', () => {
  for (const freeRamBytes of [() => NaN, () => -1, () => 64 * 1024 ** 3, () => { throw Error('unavailable'); }]) {
    assert.equal(collectFacts({ ...options, freeRamBytes }).freeRamGiB, null);
  }
});
test('status failure is not an empty ownership list', () => {
  const repository = collectFacts({ ...options, status: () => { throw Error('unavailable'); } }).repositories[0];
  assert.equal(repository.known, false); assert.equal(repository.activePrimaryOwners, null);
});
test('effective primary owners exclude historical and other-checkout records', () => {
  const sessions = [
    { id: 'active', state: 'active', worktree: root.toUpperCase() + '/', expiresAt: now + 1000 },
    { id: 'goal-only', state: 'active', worktree: root, expiresAt: now + 1000, metadataOnly: true },
    { id: 'expired', state: 'active', worktree: root, expiresAt: now - 1 },
    { id: 'closed', state: 'closed', worktree: root, expiresAt: now + 1000 },
    { id: 'other', state: 'active', worktree: 'E:/approved-legacy-release', expiresAt: now + 1000 },
  ];
  const facts = collectFacts({ ...options, status: () => ({ now, sessions, release: null }) });
  assert.deepEqual(facts.repositories[0].activePrimaryOwners, ['active']);
});
test('expired release remains occupied pending reconciliation', () => {
  const facts = collectFacts({ ...options, status: () => ({ now, sessions: [], release: { owner: 'release-owner', expiresAt: now - 1 } }) });
  assert.equal(facts.repositories[0].releaseOwner, 'release-owner');
  assert.equal(facts.repositories[0].releaseNeedsReconciliation, true);
});
test('stale or incomplete status remains unknown', () => {
  for (const status of [() => ({ now: now - 31000, sessions: [], release: null }),
    () => ({ now, sessions: [] }), () => ({ now, sessions: [{ state: 'active' }], release: null })]) {
    assert.equal(collectFacts({ ...options, status }).repositories[0].known, false);
  }
});
test('workspace escapes and duplicate repo identities are rejected', () => {
  assert.throws(() => collectFacts({ ...options, repositories: [{ id: 'x', root: root + '/../../outside' }] }), /approved C/);
  assert.throws(() => collectFacts({ ...options, repositories: [{ id: 'x', root }, { id: 'x', root }] }), /unique/);
});
console.log(JSON.stringify({ passed, failed: 0, scope: 'canonical read-only collector fixtures', writes: 0, paidCalls: 0 }));
