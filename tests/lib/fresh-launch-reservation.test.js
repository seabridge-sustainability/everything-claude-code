'use strict';
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { createReservation, spawnOwnedJob, containedBootstrap } = require('../../scripts/lib/fresh-launch-reservation');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-native-reservation-'));
after(() => fs.rmSync(root, { recursive: true, force: true }));
let serial = 0;
function fixture(free = 6) {
  const directory = path.join(root, String(serial++)); fs.mkdirSync(directory);
  let now = Date.now(), available = free;
  const readTelemetry = () => ({ observedAt: new Date(now).toISOString(), freeRamGiB: available, reserveRamGiB: 2,
    recentSamples: [4, 3, 2, 1, 0].map(i => ({ observedAt: new Date(now - i * 250).toISOString(), freeRamGiB: available })) });
  const make = (session, peakRamGiB, authority = () => {}) => createReservation({ repo: directory, session, goalId: 'goal-' + session,
    peakRamGiB, binding: 'a'.repeat(64), authority }, { directory, readTelemetry, clock: () => now });
  return { make, directory, free: value => { available = value; }, advance: value => { now += value; } };
}
const closed = { treeClosed: true, activeProcesses: 0, binding: 'a'.repeat(64), exitCode: 0 };
test('different goals cannot overspend native startup RAM', () => {
  const f = fixture(), a = f.make('alpha', 4), b = f.make('beta', 1);
  const claim = a.acquire(); assert.equal(claim.acquired, true);
  assert.throws(() => b.acquire(), /capacity/); a.release(claim, closed);
  assert.equal(b.acquire().acquired, true); // Same waiting work, no approval/reset loop.
});
test('sufficient memory allows independent native clients without monopolizing the heavy slot', () => {
  const f = fixture(), a = f.make('alpha', 1), b = f.make('beta', 1);
  const first = a.acquire(), second = b.acquire(); assert.equal(second.acquired, true);
  a.release(first, closed); b.release(second, closed);
});
test('low RAM, failed authority and delayed discovery cannot start a native client', () => {
  const f = fixture(2.1), a = f.make('alpha', 1);
  assert.throws(() => a.acquire(), /capacity/); f.free(5); const claim = a.acquire();
  f.free(2.1); assert.throws(() => a.recheck(claim), /resources or authority changed/);
  const other = fixture(); assert.throws(() => other.make('beta', 1, () => { throw Error('closed owner'); }).acquire(), /closed owner/);
});
test('expiry, root-only exit, wrong token and missing closure never free live native claims', () => {
  const f = fixture(), a = f.make('alpha', 4), b = f.make('beta', 1), claim = a.acquire();
  f.advance(300001); assert.throws(() => b.acquire(), /capacity/);
  assert.throws(() => a.release(claim, { ...closed, treeClosed: false }), /process-tree/);
  assert.throws(() => a.release({ ...claim, token: '0'.repeat(48) }, closed), /lease token/);
  assert.throws(() => b.acquire(), /capacity/); a.release(claim, closed);
  assert.equal(b.acquire().acquired, true);
});
test('direct contained entrypoint cannot self-attest a native Job bootstrap', () => {
  assert.throws(() => containedBootstrap({ cwd: root }), /bootstrap required/);
});
test('known pre-spawn rejection frees only its own claim, generic errors do not', () => {
  const f = fixture(), reservation = f.make('alpha', 4), claim = reservation.acquire();
  assert.throws(() => reservation.releaseUnstarted(claim, Error('guess')), /trusted pre-spawn/);
  let refusal;
  try { spawnOwnedJob({ executable: process.execPath, args: [], cwd: f.directory, directory: f.directory, id: '../outside', binding: 'a'.repeat(64) }); } catch (error) { refusal = error; }
  assert.ok(refusal); assert.equal(reservation.releaseUnstarted(claim, refusal).released, true);
  assert.equal(f.make('beta', 4).acquire().acquired, true);
});
test('Windows owned Job closes detached descendants and preserves command quoting', { skip: process.platform !== 'win32', timeout: 20000 }, async () => {
  const directory = path.join(root, 'native-job'); fs.mkdirSync(directory);
  const marker = path.join(directory, 'result.json'), sentinel = 'space "quoted" tail\\';
  const script = "const cp=require('node:child_process'),fs=require('node:fs'); const c=cp.spawn(process.execPath,['-e','setInterval(()=>{},1000)'],{detached:true,stdio:'ignore'}); fs.writeFileSync(process.argv[1],JSON.stringify({pid:c.pid,arg:process.argv[2]})); c.unref();setTimeout(()=>process.exit(0),300);";
  const job = spawnOwnedJob({ executable: process.execPath, args: ['-e', script, marker, sentinel], cwd: directory, directory,
    id: 'synthetic-lifecycle', binding: 'a'.repeat(64), stdio: ['ignore', 'pipe', 'pipe'] });
  let errors = ''; job.child.stderr.on('data', value => { if (errors.length < 4096) errors += value; }); job.child.stdout.resume();
  const proof = await job.completion;
  assert.equal(proof.treeClosed, true); assert.equal(proof.activeProcesses, 0); assert.equal(proof.exitCode, 0, errors);
  const result = JSON.parse(fs.readFileSync(marker, 'utf8')); assert.equal(result.arg, sentinel);
  assert.throws(() => process.kill(result.pid, 0), error => error.code === 'ESRCH');
});
test('Windows owned Job closes its tree when its exact supervisor disappears', { skip: process.platform !== 'win32', timeout: 20000 }, async () => {
  const directory = path.join(root, 'supervisor-loss'); fs.mkdirSync(directory);
  const moduleFile = require.resolve('../../scripts/lib/fresh-launch-reservation');
  const start = path.join(directory, 'synthetic-parent-loss.started.json'), end = path.join(directory, 'synthetic-parent-loss.closed.json');
  const descendant = path.join(directory, 'descendant.json');
  const childCode = `const cp=require('node:child_process'),fs=require('node:fs');const c=cp.spawn(process.execPath,['-e','setInterval(()=>{},1000)'],{detached:true,stdio:'ignore'});fs.writeFileSync(${JSON.stringify(descendant)},JSON.stringify({pid:c.pid}));setInterval(()=>{},1000);`;
  const script = `const fs=require('node:fs');require(${JSON.stringify(moduleFile)}).spawnOwnedJob({executable:process.execPath,args:['-e',${JSON.stringify(childCode)}],cwd:${JSON.stringify(directory)},directory:${JSON.stringify(directory)},id:'synthetic-parent-loss',binding:'a'.repeat(64),stdio:'ignore'}).completion.catch(()=>{});setInterval(()=>{if(fs.existsSync(${JSON.stringify(start)})&&fs.existsSync(${JSON.stringify(descendant)}))process.exit(0)},25);setTimeout(()=>process.exit(3),10000);`;
  const parent = require('node:child_process').spawn(process.execPath, ['-e', script], { stdio: 'ignore', windowsHide: true, shell: false });
  const code = await new Promise((resolve, reject) => { parent.once('error', reject); parent.once('exit', resolve); });
  assert.equal(code, 0);
  const started = JSON.parse(fs.readFileSync(start, 'utf8')), leaf = JSON.parse(fs.readFileSync(descendant, 'utf8'));
  const alive = pid => { try { process.kill(pid, 0); return true; } catch (error) { if (error.code === 'ESRCH') return false; throw error; } };
  const deadline = Date.now() + 7000;
  while ((alive(started.rootPid) || alive(leaf.pid)) && Date.now() < deadline) await new Promise(resolve => setTimeout(resolve, 40));
  assert.equal(alive(started.rootPid), false); assert.equal(alive(leaf.pid), false);
  // Abrupt parent loss can close the wrapper's inherited Job before it writes
  // a receipt. That is NOT authority to release the retained machine claim.
  if (fs.existsSync(end)) { const proof = JSON.parse(fs.readFileSync(end, 'utf8')); assert.equal(proof.treeClosed, true); assert.equal(proof.activeProcesses, 0); }
  else { const f = fixture(), reservation = f.make('retained-after-loss', 1), claim = reservation.acquire(); assert.throws(() => reservation.release(claim, null), /process-tree/); }
});
