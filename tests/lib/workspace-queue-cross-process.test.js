'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { createQueueStore } = require('../../scripts/lib/workspace-queue-store');
const { resourceKey } = require('../../scripts/lib/workspace-queue');
const { withFileLock } = require('../../scripts/lib/goal-store');
const { writeFileAtomic } = require('../../scripts/lib/atomic-write');
function fixtureStore(file, hold = false) {
  const directory = fs.realpathSync(path.dirname(file)), parent = fs.realpathSync(__dirname);
  assert.ok(directory.startsWith(parent + path.sep + 'queue-cross-process-fixture-'));
  assert.equal(path.basename(file), 'state.json');
  return createQueueStore({ file,
    withFileLock: hold ? (lock, action) => withFileLock(lock, () => {
      console.log(JSON.stringify({ phase: 'lock-held', pid: process.pid }));
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1500);
      return action();
    }) : withFileLock,
    atomicWrite: writeFileAtomic,
    assertWrite: targets => targets.every(target => path.dirname(target) === directory),
    readTelemetry: () => ({ observedAt: new Date().toISOString(), freeRamGiB: 5, reserveRamGiB: 2 }),
    checkGate: entry => ({ allowed: true, owner: entry.owner, resource: resourceKey(entry) }),
    confirmStopped: () => true,
  });
}
if (process.argv[2] === '--fixture-child') {
  try {
    const store = fixtureStore(process.argv[3], process.argv[4] === 'hold');
    const result = store.acquire({ id: 'job', owner: 'fixture-owner', leaseMilliseconds: 10000 });
    console.log(JSON.stringify({ phase: 'claim-result', result }));
  } catch (error) {
    if (!String(error.message).includes('goal state is locked')) throw error;
    console.log(JSON.stringify({ phase: 'blocked-by-live-lock' }));
  }
} else {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
async function main() {
  const root = fs.mkdtempSync(path.join(__dirname, 'queue-cross-process-fixture-'));
  const file = path.join(root, 'state.json'), children = [];
  function start(mode) {
    const child = spawn(process.execPath, ['--max-old-space-size=64', __filename, '--fixture-child', file, mode],
      { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    children.push(child);
    let stdout = '', stderr = '';
    const done = new Promise((resolve, reject) => {
      const timer = setTimeout(() => { child.kill(); reject(Error('owned fixture child deadline exceeded')); }, 6000);
      child.stdout.on('data', bytes => { stdout += bytes; });
      child.stderr.on('data', bytes => { stderr += bytes; });
      child.once('error', error => { clearTimeout(timer); reject(error); });
      child.once('close', code => { clearTimeout(timer); resolve({ code, stdout, stderr }); });
    });
    return { child, done };
  }
  try {
    const store = fixtureStore(file);
    const now = Date.now();
    store.enqueue([{ id: 'job', owner: 'fixture-owner', goalId: 'fixture-goal', kind: 'heavy-check',
      resource: 'fixture-machine', state: 'waiting', reason: 'cross-process atomicity proof',
      enqueuedAt: new Date(now).toISOString(), nextCheckpointAt: new Date(now + 60000).toISOString(),
      independentAction: 'fixture-only independent review', dependsOn: [], peakRamGiB: 1 }]);
    const first = start('hold');
    await new Promise((resolve, reject) => {
      let text = '';
      const timer = setTimeout(() => reject(Error('fixture did not acquire lock')), 4000);
      first.child.stdout.on('data', bytes => {
        text += bytes;
        if (text.includes('"phase":"lock-held"')) { clearTimeout(timer); resolve(); }
      });
      first.child.once('exit', () => { clearTimeout(timer); reject(Error('fixture exited before lock observation')); });
    });
    assert.equal(first.child.exitCode, null); // Actual live handle, not a lock-file inference.
    const before = fs.readFileSync(file, 'utf8');
    const second = start('compete');
    const rejected = await second.done;
    assert.equal(rejected.code, 0, rejected.stderr);
    assert.ok(rejected.stdout.includes('blocked-by-live-lock'));
    assert.equal(fs.readFileSync(file, 'utf8'), before);
    const claimed = await first.done;
    assert.equal(claimed.code, 0, claimed.stderr);
    const receipt = claimed.stdout.trim().split('\n').map(line => JSON.parse(line)).find(line => line.phase === 'claim-result').result;
    assert.equal(receipt.acquired, true);
    assert.equal(receipt.authorizationGranted, false);
    const after = store.snapshot();
    assert.equal(after.sequence, 2); // Enqueue once, exactly one claim.
    assert.equal(after.entries[0].token, receipt.token);
    const later = start('compete');
    const laterResult = await later.done;
    assert.equal(laterResult.code, 0, laterResult.stderr);
    assert.equal(JSON.parse(laterResult.stdout.trim()).result.acquired, false);
    assert.equal(store.snapshot().sequence, 2);
    store.release({ ...receipt, outcome: 'completed' });
    assert.equal(store.snapshot().entries[0].state, 'completed');
    console.log(JSON.stringify({ passed: 1, failed: 0, scope: 'real process contention with fixture authority',
      childProcesses: 3, simultaneousChildrenPeak: 2, productProcesses: 0, paidCalls: 0,
      result: 'Live held lock rejected contender without writes; one claim persisted; subsequent duplicate denied; verified fixture release completed' }));
  } finally {
    for (const child of children) if (child.exitCode === null && child.signalCode === null) child.kill();
    // Exact files created by this fixture, no recursive deletion or outside target.
    const parent = fs.realpathSync(__dirname), resolved = fs.realpathSync(root);
    assert.ok(resolved.startsWith(parent + path.sep));
    for (const name of fs.readdirSync(root)) {
      const target = path.join(root, name);
      assert.equal(path.dirname(target), root); assert.ok(fs.lstatSync(target).isFile()); fs.unlinkSync(target);
    }
    fs.rmdirSync(root);
  }
}
