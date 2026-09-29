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

function gitBuffer(repo, args) {
  try {
    return execFileSync('git', ['-C', repo, ...args], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (error) {
    const detail = error.stderr ? String(error.stderr).trim() : error.message;
    throw new Error(`git ${args.join(' ')} failed for ${repo}: ${detail}`);
  }
}

function sanitizeRemote(remote) {
  if (!remote) return null;
  return remote.replace(/:\/\/[^/@\s]+@/, '://<redacted>@');
}

function normalizeRepoRelative(root, candidate) {
  const absolute = path.resolve(candidate);
  const relative = path.relative(root, absolute).split(path.sep).join('/');
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative) ? relative : null;
}

function captureRepositoryState(repoPath = process.cwd(), options = {}) {
  const root = git(repoPath, ['rev-parse', '--show-toplevel']);
  const excluded = (options.excludePaths || [])
    .map(candidate => normalizeRepoRelative(root, candidate))
    .filter(Boolean);
  const isExcluded = candidate => excluded.some(prefix => (
    candidate === prefix || candidate.startsWith(`${prefix}/`)
  ));
  const status = git(root, ['status', '--porcelain=v1', '-z'], '', { trim: false });
  const dirtyPaths = status
    ? status.split('\0').filter(Boolean).map(entry => entry.slice(3)).filter(Boolean).filter(item => !isExcluded(item))
    : [];
  const pathspec = ['--', '.', ...excluded.map(prefix => `:(exclude)${prefix}/**`)];
  const stagedDiff = gitBuffer(root, ['diff', '--binary', '--no-ext-diff', '--cached', ...pathspec]);
  const unstagedDiff = gitBuffer(root, ['diff', '--binary', '--no-ext-diff', ...pathspec]);
  const untrackedRaw = git(root, ['ls-files', '--others', '--exclude-standard', '-z'], '', { trim: false });
  const untracked = untrackedRaw.split('\0').filter(Boolean).filter(item => !isExcluded(item)).map(file => {
    const absolute = path.join(root, file);
    return {
      path: file.split(path.sep).join('/'),
      sha256: sha256File(absolute),
      size_bytes: fs.statSync(absolute).size,
    };
  }).sort((left, right) => left.path.localeCompare(right.path));
  const lockfileNames = [
    'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lock', 'bun.lockb',
    'uv.lock', 'poetry.lock', 'Pipfile.lock', 'Cargo.lock', 'go.sum',
  ];
  const lockfiles = lockfileNames.filter(file => fs.existsSync(path.join(root, file))).map(file => ({
    path: file,
    sha256: sha256File(path.join(root, file)),
  }));
  const head = git(root, ['rev-parse', 'HEAD']);
  const stagedDiffSha256 = sha256Buffer(stagedDiff);
  const unstagedDiffSha256 = sha256Buffer(unstagedDiff);
  const untrackedSha256 = sha256Buffer(canonicalJson(untracked));
  const lockfilesSha256 = sha256Buffer(canonicalJson(lockfiles));
  const treeFingerprint = sha256Buffer(canonicalJson({
    head,
    staged_diff_sha256: stagedDiffSha256,
    unstaged_diff_sha256: unstagedDiffSha256,
    untracked_sha256: untrackedSha256,
    lockfiles_sha256: lockfilesSha256,
  }));
  return {
    repo_id: options.repoId || path.basename(root),
    repo_root: path.resolve(root),
    head,
    branch: git(root, ['branch', '--show-current'], '') || null,
    worktree: path.resolve(root),
    dirty_paths: [...new Set(dirtyPaths)].sort(),
    origin: sanitizeRemote(git(root, ['remote', 'get-url', 'origin'], '')),
    staged_diff_sha256: stagedDiffSha256,
    unstaged_diff_sha256: unstagedDiffSha256,
    untracked_sha256: untrackedSha256,
    lockfiles_sha256: lockfilesSha256,
    tree_fingerprint: treeFingerprint,
    lockfiles,
  };
}

function repositoryFingerprint(state) {
  return {
    repo_id: state.repo_id,
    repo_root: state.repo_root,
    head: state.head,
    tree_fingerprint: state.tree_fingerprint,
  };
}

function verifyCapturedRepositoryState(recorded, options = {}) {
  const current = captureRepositoryState(recorded.repo_root, {
    repoId: recorded.repo_id,
    excludePaths: options.excludePaths || [],
  });
  const mismatches = [];
  if (current.head !== recorded.head) mismatches.push(`HEAD ${recorded.head} -> ${current.head}`);
  if (current.tree_fingerprint !== recorded.tree_fingerprint) {
    mismatches.push(`tree fingerprint ${recorded.tree_fingerprint} -> ${current.tree_fingerprint}`);
  }
  return { current, matches: mismatches.length === 0, mismatches };
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
  repositoryFingerprint,
  sha256Buffer,
  sha256File,
  withFileLock,
  verifyCapturedRepositoryState,
  writeYaml,
};
