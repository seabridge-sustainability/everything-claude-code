'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { inspect, repairMemoryPath, checkClaudeStatus } = require('../../scripts/agent-session-recovery');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-recovery-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const replacement = path.join(root, 'manageesg-backend/app/services/second_brain/gbrain_proxy.py');
  fs.mkdirSync(path.dirname(replacement), { recursive: true });
  fs.writeFileSync(replacement, '# fixture');
  const oldPath = path.join(root, '.worktrees/second-brain-be-20261011/app/services/second_brain/gbrain_proxy.py');
  const configPath = path.join(root, '.claude.json');
  const text = JSON.stringify({ unrelated: { credential: 'fixture-private-sentinel' }, mcpServers: { seabridge_memory: { args: ['-I', oldPath, '--token-file', '/unchanged/missing.token'] } } }, null, 2) + '\n';
  fs.writeFileSync(configPath, text);
  return { root, replacement, oldPath, configPath, text };
}

test('repairs only the stale proxy argument, preserving every other byte and token reference', t => {
  const f = fixture(t);
  const before = inspect(f.configPath, f.root);
  assert.equal(before.report.memory.repairable, true);
  const result = repairMemoryPath(f.configPath, f.root, before.report.configSha256);
  assert.equal(result.changed, true);
  assert.equal(fs.readFileSync(f.configPath, 'utf8'), f.text.replace(JSON.stringify(f.oldPath), JSON.stringify(f.replacement)));
  assert.equal(result.memory.tokenFileExists, false);
  assert.ok(!fs.readFileSync(result.rollbackReceipt, 'utf8').includes('fixture-private-sentinel'));
  const fresh = inspect(f.configPath, f.root);
  assert.equal(repairMemoryPath(f.configPath, f.root, fresh.report.configSha256).changed, false);
});

test('refuses a stale preimage rather than overwriting native-client changes', t => {
  const f = fixture(t);
  const before = inspect(f.configPath, f.root);
  const concurrent = f.text + ' ';
  fs.writeFileSync(f.configPath, concurrent);
  assert.throws(() => repairMemoryPath(f.configPath, f.root, before.report.configSha256), /changed/);
  assert.equal(fs.readFileSync(f.configPath, 'utf8'), concurrent);
});

test('does not redirect an unrecognized server path or a missing replacement', t => {
  const f = fixture(t);
  fs.unlinkSync(f.replacement);
  assert.equal(inspect(f.configPath, f.root).report.memory.repairable, false);
  fs.writeFileSync(f.replacement, '# fixture');
  fs.writeFileSync(f.configPath, f.text.replace(JSON.stringify(f.oldPath), JSON.stringify('/different/app/services/second_brain/gbrain_proxy.py')));
  const before = inspect(f.configPath, f.root);
  assert.equal(before.report.memory.repairable, false);
  assert.equal(repairMemoryPath(f.configPath, f.root, before.report.configSha256).changed, false);
});

test('refuses ambiguous path substitutions and malformed configuration', t => {
  const f = fixture(t);
  const duplicate = JSON.parse(f.text);
  duplicate.otherPath = f.oldPath;
  fs.writeFileSync(f.configPath, JSON.stringify(duplicate));
  const before = inspect(f.configPath, f.root);
  assert.throws(() => repairMemoryPath(f.configPath, f.root, before.report.configSha256), /uniquely/);
  fs.writeFileSync(f.configPath, '{');
  assert.throws(() => inspect(f.configPath, f.root), SyntaxError);
});

test('status checks retain public status only and do not infer classifier recovery', async t => {
  const f = fixture(t);
  const file = path.join(f.root, 'status.json');
  const request = async url => {
    assert.equal(url, 'https://status.claude.com/api/v2/summary.json');
    return { ok: true, text: async () => JSON.stringify({ status: { indicator: 'minor', description: 'Degraded' }, components: [{ name: 'Sonnet', status: 'degraded_performance' }], incidents: [{ name: 'Active issue', status: 'monitoring', irrelevant: 'omit' }, { name: 'Old issue', status: 'resolved' }] }) };
  };
  const result = await checkClaudeStatus(file, request);
  assert.equal(result.activeIncidents.length, 1);
  assert.equal(result.sonnetComponents[0].status, 'degraded_performance');
  assert.match(result.limitation, /no automatic configuration changes/);
  assert.ok(!fs.readFileSync(file, 'utf8').includes('irrelevant'));
  const original = fs.readFileSync(file, 'utf8');
  await assert.rejects(checkClaudeStatus(file, async () => ({ ok: false, status: 503 })), /503/);
  assert.equal(fs.readFileSync(file, 'utf8'), original);
});
