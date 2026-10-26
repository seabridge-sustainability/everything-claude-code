'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { test } = require('node:test');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const coord = require('../../scripts/lib/session-coordination');
const { createHostMachineQueueGuard } = require('../../scripts/lib/machine-queue-capability');

function fixture(t) {
  const created = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-machine-cap-'));
  const root = process.platform === 'win32' ? created.toLowerCase() : created;
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  execFileSync('git', ['init', '-q', root]);
  fs.writeFileSync(path.join(root, '.gitignore'), '.ecc/\n');
  const repo = coord.repository(root), directory = path.join(root, '.ecc/goal/owned');
  fs.mkdirSync(directory, { recursive: true }); fs.mkdirSync(repo.directory, { recursive: true });
  const registry = path.join(repo.directory, 'registry.json');
  const session = { id: 'owner', state: 'active', worktree: root, scopes: ['.ecc/goal/owned'],
    metadataOnly: true, base: 'a'.repeat(40), registeredAt: Date.now(), updatedAt: Date.now(),
    expiresAt: Date.now() + 60000 };
  const save = () => fs.writeFileSync(registry, JSON.stringify({ version: 1, sessions: [session], release: null, releases: [] }));
  save();
  const queueFile = path.join(directory, 'target-queue.json');
  const file = path.join(repo.directory, 'machine-queues.json');
  const machine = () => createHostMachineQueueGuard({ repositoryPath: root, sessionId: session.id, queueFile });
  const initialize = () => fs.writeFileSync(queueFile, JSON.stringify({ version: 1, sequence: 0, entries: [] }));
  return { root, repo, session, save, directory, queueFile, file, machine, initialize };
}

function caseVariantAdapter(platform) {
  const filename = require.resolve('../../scripts/lib/machine-queue-capability');
  const localRequire = createRequire(filename);
  const context = {
    module: { exports: {} }, process: { platform, pid: process.pid },
    require(name) {
      return name === 'node:fs'
        ? { ...fs, realpathSync: target => fs.realpathSync(target).toUpperCase() }
        : localRequire(name);
    },
  };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context, { filename });
  return context.module.exports.createHostMachineQueueGuard;
}

test('Windows realpath casing agrees with the existing coordination contract', t => {
  const f = fixture(t), create = caseVariantAdapter('win32');
  const guard = create({ repositoryPath: f.root, sessionId: 'owner', queueFile: f.queueFile });
  assert.equal(guard.run(f.queueFile, f.initialize, () => 'ok'), 'ok');
  assert.equal(fs.existsSync(f.file + '.lock'), false);
});

test('POSIX paths still reject a different realpath casing', t => {
  const f = fixture(t), create = caseVariantAdapter('linux');
  assert.throws(() => create({ repositoryPath: f.root, sessionId: 'owner', queueFile: f.queueFile }),
    /canonical machine queue path required/);
  assert.equal(fs.existsSync(f.file), false);
});

test('host owns complete index/lock/staging lifecycle without granting Git scopes', t => {
  const f = fixture(t), mutations = [], open = fs.openSync, rename = fs.renameSync, unlink = fs.unlinkSync;
  fs.openSync = function(p, ...args) { if (String(p).includes('machine-queues')) mutations.push(['open', String(p), args[0]]); return open.call(this, p, ...args); };
  fs.renameSync = function(a, b) { if (String(b).includes('machine-queues')) mutations.push(['rename', a, b]); return rename.call(this, a, b); };
  fs.unlinkSync = function(p) { if (String(p).includes('machine-queues')) mutations.push(['unlink', p]); return unlink.call(this, p); };
  try {
    assert.throws(() => coord.execute('check-write', { cwd: f.root, sessionId: 'owner', paths: ['.git/ecc-coordination/machine-queues.json'] }), /\.git is not a write scope/);
    assert.equal(f.machine().run(f.queueFile, f.initialize, () => 'ok'), 'ok');
  } finally { fs.openSync = open; fs.renameSync = rename; fs.unlinkSync = unlink; }
  assert.deepEqual(JSON.parse(fs.readFileSync(f.file)), { version: 1, queues: [] });
  assert.equal(fs.existsSync(f.file + '.lock'), false);
  assert.equal(fs.readdirSync(f.repo.directory).some(p => p.endsWith('.tmp')), false);
  assert(mutations.some(m => m[0] === 'open' && m[1] === f.file + '.lock'));
  assert(mutations.some(m => m[0] === 'unlink' && m[1] === f.file + '.lock'));
  const replacements = mutations.filter(m => m[0] === 'rename');
  assert.equal(replacements.length, 2);
  for (const [, source, destination] of replacements) {
    assert.equal(destination, f.file); assert.equal(path.dirname(source), f.repo.directory);
    assert.match(path.basename(source), /^\.machine-queues\.json\.\d+\.[a-f0-9]{16}\.tmp$/);
  }
});

test('active actor without exact task queue scope cannot mutate the shared index', t => {
  const f = fixture(t); f.session.scopes = ['.ecc/goal/other']; f.save();
  assert.throws(() => f.machine().run(f.queueFile, f.initialize, () => {}), /outside owned write scope/);
  assert.equal(fs.existsSync(f.file), false); assert.equal(fs.existsSync(f.file + '.lock'), false);
});

test('another queue cannot borrow a bound host capability', t => {
  const f = fixture(t);
  assert.throws(() => f.machine().run(path.join(f.directory, 'other.json'), f.initialize, () => {}), /bound to another/);
  assert.equal(fs.existsSync(f.file), false);
});

test('authority revoked during initialization prevents publication and cleans owned lock', t => {
  const f = fixture(t);
  assert.throws(() => f.machine().run(f.queueFile, () => {
    f.initialize(); f.session.state = 'closed'; f.save();
  }, () => {}), /session missing, closed, or expired/);
  assert.equal(fs.existsSync(f.file), false); assert.equal(fs.existsSync(f.file + '.lock'), false);
});

test('closed and expired actors fail before shared mutations', t => {
  const f = fixture(t);
  for (const change of [{ state: 'closed' }, { state: 'active', expiresAt: 1 }]) {
    Object.assign(f.session, change); f.save();
    assert.throws(() => f.machine().run(f.queueFile, f.initialize, () => {}), /session missing, closed, or expired/);
    assert.equal(fs.existsSync(f.file), false); assert.equal(fs.existsSync(f.file + '.lock'), false);
  }
});

test('existing lock is retained and cannot be taken over', t => {
  const f = fixture(t); fs.writeFileSync(f.file + '.lock', 'foreign');
  assert.throws(() => f.machine().run(f.queueFile, f.initialize, () => {}), /EEXIST/);
  assert.equal(fs.readFileSync(f.file + '.lock', 'utf8'), 'foreign');
});

test('replacement lock is retained on transaction cleanup', t => {
  const f = fixture(t);
  assert.throws(() => f.machine().run(f.queueFile, f.initialize, () => {
    fs.renameSync(f.file + '.lock', f.file + '.held'); fs.writeFileSync(f.file + '.lock', 'foreign');
  }), /machine lock replaced/);
  assert.equal(fs.readFileSync(f.file + '.lock', 'utf8'), 'foreign');
});

test('linked or hardlinked machine index is refused', t => {
  const f = fixture(t), foreign = path.join(f.root, 'foreign'); fs.writeFileSync(foreign, '{}');
  fs.symlinkSync(foreign, f.file);
  assert.throws(() => f.machine().run(f.queueFile, f.initialize, () => {}), /linked machine queue state forbidden/);
  fs.unlinkSync(f.file); fs.linkSync(foreign, f.file);
  assert.throws(() => f.machine().run(f.queueFile, f.initialize, () => {}), /canonical machine queue/);
  assert.equal(fs.readFileSync(foreign, 'utf8'), '{}');
});

test('machine directory replacement invalidates an already minted capability', t => {
  const f = fixture(t), machine = f.machine();
  fs.renameSync(f.repo.directory, f.repo.directory + '-old'); fs.mkdirSync(f.repo.directory);
  assert.throws(() => machine.run(f.queueFile, f.initialize, () => {}), /machine directory replaced/);
  assert.equal(fs.existsSync(f.file), false);
});

test('revocation after staging preserves old index and cleans only owned staging inode', t => {
  const f = fixture(t), before = JSON.stringify({ version: 1, queues: [] });
  fs.writeFileSync(f.file, before);
  const open = fs.openSync, sync = fs.fsyncSync; let stagingFd;
  fs.openSync = function(p, ...args) { const fd = open.call(this, p, ...args); if (path.basename(String(p)).startsWith('.machine-queues.json.')) stagingFd = fd; return fd; };
  fs.fsyncSync = function(fd) { const result = sync.call(this, fd); if (fd === stagingFd) { f.session.state = 'closed'; f.save(); } return result; };
  try { assert.throws(() => f.machine().run(f.queueFile, f.initialize, () => {}), /session missing, closed, or expired/); }
  finally { fs.openSync = open; fs.fsyncSync = sync; }
  assert.equal(fs.readFileSync(f.file, 'utf8'), before);
  assert.equal(fs.existsSync(f.file + '.lock'), false);
  assert.equal(fs.readdirSync(f.repo.directory).some(p => p.endsWith('.tmp')), false);
});

test('replacement staging inode is neither published nor removed', t => {
  const f = fixture(t), before = JSON.stringify({ version: 1, queues: [] });
  fs.writeFileSync(f.file, before);
  const open = fs.openSync, sync = fs.fsyncSync; let stagingFd, stagingPath;
  fs.openSync = function(p, ...args) { const fd = open.call(this, p, ...args); if (path.basename(String(p)).startsWith('.machine-queues.json.')) { stagingFd = fd; stagingPath = p; } return fd; };
  fs.fsyncSync = function(fd) { const result = sync.call(this, fd); if (fd === stagingFd) { fs.renameSync(stagingPath, stagingPath + '.owned'); fs.writeFileSync(stagingPath, 'foreign'); } return result; };
  try { assert.throws(() => f.machine().run(f.queueFile, f.initialize, () => {}), /machine staging file replaced/); }
  finally { fs.openSync = open; fs.fsyncSync = sync; }
  assert.equal(fs.readFileSync(f.file, 'utf8'), before);
  assert.equal(fs.readFileSync(stagingPath, 'utf8'), 'foreign');
});

test('expiry occurring inside normal check-write is refused before shared mutation', t => {
  const f = fixture(t), execute = coord.execute, now = Date.now;
  let after = false;
  coord.execute = function(command, options) { const result = execute(command, options); if (command === 'check-write') after = true; return result; };
  Date.now = () => after ? f.session.expiresAt + 1 : now();
  try { assert.throws(() => f.machine().run(f.queueFile, f.initialize, () => {}), /task queue session expired during check/); }
  finally { coord.execute = execute; Date.now = now; }
  assert.equal(fs.existsSync(f.file), false); assert.equal(fs.existsSync(f.file + '.lock'), false);
});
