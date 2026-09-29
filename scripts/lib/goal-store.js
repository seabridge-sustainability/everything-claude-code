'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const yaml = require('js-yaml');

function ensureParent(filePath) {
  fs.mkdirSync(path.dirname(path.resolve(filePath)), { recursive: true });
}

function atomicWrite(filePath, content) {
  const absolute = path.resolve(filePath);
  ensureParent(absolute);
  const temporary = path.join(
    path.dirname(absolute),
    `.${path.basename(absolute)}.${process.pid}.${crypto.randomBytes(6).toString('hex')}.tmp`,
  );
  try {
    fs.writeFileSync(temporary, content, { encoding: 'utf8', flag: 'wx' });
    fs.renameSync(temporary, absolute);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
}

function withFileLock(lockPath, action) {
  const absolute = path.resolve(lockPath);
  ensureParent(absolute);
  let descriptor;
  try {
    descriptor = fs.openSync(absolute, 'wx');
    fs.writeFileSync(descriptor, `${process.pid}\n`, 'utf8');
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error(`goal state is locked: ${absolute}`);
    }
    throw error;
  }
  try {
    return action();
  } finally {
    fs.closeSync(descriptor);
    fs.unlinkSync(absolute);
  }
}

function writeYaml(filePath, value) {
  atomicWrite(filePath, yaml.dump(value, { noRefs: true, lineWidth: 120 }));
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function appendJsonLine(filePath, value, idField = 'receipt_id') {
  const absolute = path.resolve(filePath);
  return withFileLock(`${absolute}.lock`, () => {
    const lines = fs.existsSync(absolute)
      ? fs.readFileSync(absolute, 'utf8').split(/\r?\n/).filter(Boolean)
      : [];
    const documents = lines.map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`invalid JSONL at ${absolute}:${index + 1}: ${error.message}`);
      }
    });
    const existing = documents.find(document => document[idField] === value[idField]);
    if (existing) {
      if (canonicalJson(existing) === canonicalJson(value)) return { appended: false, idempotent: true };
      throw new Error(`${idField} already exists with different content: ${value[idField]}`);
    }
    const body = [...lines, JSON.stringify(value)].join('\n');
    atomicWrite(absolute, `${body}\n`);
    return { appended: true, idempotent: false };
  });
}

function sha256Buffer(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function sha256File(filePath) {
  const absolute = path.resolve(filePath);
  if (!fs.existsSync(absolute)) throw new Error(`evidence file does not exist: ${filePath}`);
  const stat = fs.statSync(absolute);
  if (!stat.isFile()) throw new Error(`evidence reference is not a file: ${filePath}`);
  if (stat.size === 0) throw new Error(`evidence file is empty: ${filePath}`);
  return sha256Buffer(fs.readFileSync(absolute));
}

function git(repo, args, fallback = null, options = {}) {
  try {
    const output = execFileSync('git', ['-C', repo, ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return options.trim === false ? output : output.trim();
  } catch (error) {
    if (fallback !== null) return fallback;
    const detail = error.stderr ? String(error.stderr).trim() : error.message;
    throw new Error(`git ${args.join(' ')} failed for ${repo}: ${detail}`);
  }
}

function sanitizeRemote(remote) {
  if (!remote) return null;
  return remote.replace(/:\/\/[^/@\s]+@/, '://<redacted>@');
}

function captureRepositoryState(repoPath = process.cwd()) {
  const root = git(repoPath, ['rev-parse', '--show-toplevel']);
  const status = git(root, ['status', '--porcelain=v1', '-z'], '', { trim: false });
  const dirtyPaths = status
    ? status.split('\0').filter(Boolean).map(entry => entry.slice(3)).filter(Boolean)
    : [];
  return {
    repo_root: path.resolve(root),
    head: git(root, ['rev-parse', 'HEAD']),
    branch: git(root, ['branch', '--show-current'], '') || null,
    worktree: path.resolve(root),
    dirty_paths: [...new Set(dirtyPaths)].sort(),
    origin: sanitizeRemote(git(root, ['remote', 'get-url', 'origin'], '')),
  };
}

function relativeEvidenceRef(filePath, cwd = process.cwd()) {
  const absolute = path.resolve(cwd, filePath);
  const relative = path.relative(cwd, absolute);
  if (relative && !relative.startsWith('..') && !path.isAbsolute(relative)) {
    return relative.split(path.sep).join('/');
  }
  return absolute.split(path.sep).join('/');
}

function makeReceiptId(prefix, observedAt = new Date().toISOString()) {
  const stamp = observedAt.replace(/[^0-9]/g, '').slice(0, 17);
  return `${prefix}-${stamp}-${crypto.randomBytes(4).toString('hex')}`;
}

module.exports = {
  appendJsonLine,
  atomicWrite,
  canonicalJson,
  captureRepositoryState,
  makeReceiptId,
  relativeEvidenceRef,
  sha256Buffer,
  sha256File,
  withFileLock,
  writeYaml,
};
