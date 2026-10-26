'use strict';

// Host-owned adapter, not a worker filesystem grant. A task may participate only
// through its normally owned queue; it never supplies the shared index or its
// write/lock callbacks. Like ECC coordination, this is cooperative containment,
// not protection against arbitrary code running as the same OS user.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const coord = require('./session-coordination');
const { createMachineQueueGuard } = require('./workspace-queue-store');

function need(value, reason) { if (!value) throw Error(reason); }
const canonical = value => process.platform === 'win32' ? value.toLowerCase() : value;
function identity(target, directory = false) {
  const value = fs.lstatSync(target);
  need(!value.isSymbolicLink() && (directory ? value.isDirectory() : value.isFile())
    && (directory || value.nlink === 1)
    && canonical(fs.realpathSync(target)) === canonical(target),
  'canonical machine queue path required');
  return value;
}
function same(a, b) { return a.dev === b.dev && a.ino === b.ino; }

function createHostMachineQueueGuard({ repositoryPath, sessionId, queueFile }) {
  const repo = coord.repository(repositoryPath);
  need(path.isAbsolute(queueFile) && path.resolve(queueFile) === queueFile,
    'canonical absolute task queue required');
  const relative = path.relative(repo.root, queueFile).split(path.sep).join('/');
  need(relative.startsWith('.ecc/goal/') && relative.endsWith('/target-queue.json'),
    'task goal target queue required');
  const taskDirectory = path.dirname(queueFile), taskIdentity = identity(taskDirectory, true);
  // Registration already creates this host directory; never create or relocate it.
  const directory = repo.directory, directoryIdentity = identity(directory, true);
  const file = path.join(directory, 'machine-queues.json'), lock = file + '.lock';
  function parent() {
    need(same(identity(directory, true), directoryIdentity), 'machine directory replaced');
  }
  function authority() {
    parent();
    need(same(identity(taskDirectory, true), taskIdentity), 'task directory replaced');
    const current = coord.repository(repositoryPath);
    need(current.root === repo.root && current.directory === directory, 'repository binding changed');
    const session = coord.checkSession({ cwd: repo.root, sessionId });
    need(coord.execute('check-write', { cwd: repo.root, sessionId,
      paths: [relative, relative + '.queue.lock'] }).allowed === true,
    'task queue ownership unavailable');
    // check-write performs synchronous registry/Git work. Its entry timestamp
    // cannot prove the task still has time left at this publication boundary.
    need(session.expiresAt > Date.now(), 'task queue session expired during check');
  }
  function assertWrite(targets) {
    need(targets.every(target => target === file || target === lock), 'outside host machine index');
    authority();
    for (const target of targets) if (fs.existsSync(target)) identity(target);
    return true;
  }
  function withLock(target, action) {
    need(target === lock, 'outside host machine lock');
    assertWrite([file, lock]);
    const fd = fs.openSync(lock, fs.constants.O_WRONLY | fs.constants.O_CREAT
      | fs.constants.O_EXCL | fs.constants.O_NOFOLLOW, 0o600);
    const held = fs.fstatSync(fd);
    try {
      fs.writeFileSync(fd, `${process.pid}\n`); fs.fsyncSync(fd);
      return action();
    } finally {
      fs.closeSync(fd);
      // Cleanup is part of this acquired transaction, even after task expiry.
      // Never remove a replacement lock or follow a replaced parent.
      parent();
      need(same(identity(lock), held), 'machine lock replaced; retained');
      fs.unlinkSync(lock);
    }
  }
  function atomic(target, content, options) {
    need(target === file, 'outside host machine index');
    const temporary = path.join(directory,
      `.machine-queues.json.${process.pid}.${crypto.randomBytes(8).toString('hex')}.tmp`);
    let fd, held;
    const validate = () => { options?.validateParent?.(); authority(); };
    try {
      validate();
      fd = fs.openSync(temporary, fs.constants.O_WRONLY | fs.constants.O_CREAT
        | fs.constants.O_EXCL | fs.constants.O_NOFOLLOW, 0o600);
      held = fs.fstatSync(fd);
      validate(); fs.writeFileSync(fd, content); fs.fsyncSync(fd);
      fs.closeSync(fd); fd = undefined;
      options?.beforeRename?.(); validate();
      need(same(identity(temporary), held), 'machine staging file replaced');
      fs.renameSync(temporary, file);
      return file;
    } finally {
      if (fd !== undefined) fs.closeSync(fd);
      // Task expiry/revocation forbids publication, not safe cleanup of the
      // staging inode this transaction created. Never unlink a replacement.
      if (held) {
        parent();
        if (fs.existsSync(temporary)) {
          need(same(identity(temporary), held), 'machine staging file replaced; retained');
          fs.unlinkSync(temporary);
        }
      }
    }
  }
  const machine = createMachineQueueGuard({ file, withFileLock: withLock,
    atomicWrite: atomic, assertWrite });
  return Object.freeze({ run(target, initialize, action) {
    need(target === queueFile, 'machine capability bound to another task queue');
    authority();
    return machine.run(target, initialize, action);
  } });
}

module.exports = { createHostMachineQueueGuard };
