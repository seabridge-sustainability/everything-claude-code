'use strict';

// Cooperative, machine-local coordination, NOT a permission grant or sandbox.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { writeFileAtomic } = require('./atomic-write');
const crypto = require('node:crypto');

function git(cwd, args) {
  const output = execFileSync('git', args, { cwd, encoding: 'utf8', windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'] });
  return args.includes('-z') ? output : output.trim();
}
function canonical(file) {
  const result = fs.realpathSync(file);
  return process.platform === 'win32' ? result.toLowerCase() : result;
}
function repository(cwd = process.cwd()) {
  const root = canonical(git(cwd, ['rev-parse', '--show-toplevel']));
  const common = canonical(path.resolve(root, git(root, ['rev-parse', '--git-common-dir'])));
  return { root, common, directory: path.join(common, 'ecc-coordination') };
}
function scope(value) {
  if (typeof value !== 'string' || !value || /[\\:*?[\]{}]/.test(value)
      || [...value].some(character => character.charCodeAt(0) < 32)
      || value.startsWith('/') || value.split('/').some(p => !p || p === '.' || p === '..' || /[. ]$/.test(p))) {
    throw new Error('scope must be an explicit repository-relative file or directory (no globs/traversal)');
  }
  if (value.split('/').some(p => p.toLowerCase() === '.git')) throw new Error('.git is not a write scope');
  return process.platform === 'win32' ? value.toLowerCase() : value;
}
function safePath(repo, relative) {
  const clean = scope(relative);
  let current = repo.root;
  for (const component of clean.split('/')) {
    current = path.join(current, component);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`linked path is not an owned scope: ${relative}`);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return clean;
}
function overlaps(a, b) { return a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`); }
function checkDigest(repo, relative) {
  const clean = safePath(repo, relative);
  const full = path.join(repo.root, clean);
  if (!fs.lstatSync(full).isFile()) throw new Error('loop target/check must be a regular file');
  return require('node:crypto').createHash('sha256').update(fs.readFileSync(full)).digest('hex');
}
function pinLoop(repo, options, scopes) {
  if (!options.loopTarget && !options.checkFiles?.length) return null;
  if (!options.loopTarget || !options.checkFiles?.length) throw new Error('loop requires one target and protected check files');
  const target = safePath(repo, options.loopTarget);
  checkDigest(repo, target);
  if (scopes.length !== 1 || scopes[0] !== target) throw new Error('loop scope must be exactly its single target file');
  const checks = [...new Set(options.checkFiles.map(file => safePath(repo, file)))].map(file => {
    if (overlaps(target, file)) throw new Error('loop maker cannot own its protected checks');
    git(repo.root, ['ls-files', '--error-unmatch', '--', file]);
    if (git(repo.root, ['diff', '--name-only', 'HEAD', '--', file])) throw new Error('protected checks must match committed baseline');
    return { path: file, sha256: checkDigest(repo, file) };
  });
  return { target, checks, baseline: git(repo.root, ['rev-parse', 'HEAD']),
    limitation: 'cooperative integrity guard, not OS read-only containment' };
}
function verifyLoop(repo, session) {
  if (!session.loop) return;
  const { target, checks, baseline } = session.loop;
  if (!target || !Array.isArray(checks) || !checks.length || !/^[a-f0-9]{40,64}$/.test(baseline)
      || session.scopes.length !== 1 || session.scopes[0] !== target) throw new Error('invalid loop contract');
  for (const check of checks) {
    if (!/^[a-f0-9]{64}$/.test(check.sha256) || overlaps(target, check.path)
        || checkDigest(repo, check.path) !== check.sha256) {
      throw new Error('protected check changed: do not weaken, relax or rewrite assertions to force a pass');
    }
  }
}
function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim() || value.length > 2000) throw new Error(`${label} required (max 2000 characters)`);
  return value;
}
function id(value) {
  if (typeof value !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(value)) throw new Error('unique --session required (letters, digits, dot, dash, underscore)');
  return value;
}
function expiry(minutes, now) {
  const n = Number(minutes === undefined ? 120 : minutes);
  if (!Number.isInteger(n) || n < 1 || n > 1440) throw new Error('ttl-minutes must be 1..1440');
  return now + n * 60000;
}
function usd(value, label, allowZero = false) {
  if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) throw new Error(`${label} required`);
  const amount = Number(value);
  if (!Number.isFinite(amount) || (allowZero ? amount < 0 : amount <= 0)) {
    throw new Error(`${label} must be a finite ${allowZero ? 'non-negative' : 'positive'} USD amount`);
  }
  return amount;
}
function actionsBudgetReceipt(options, now) {
  const status = options.actionsBudgetStatus || 'known';
  if (!['known', 'unknown'].includes(status)) throw new Error('actions-budget-status must be known or unknown');
  const source = requireText(options.actionsBudgetSource, 'actions-budget-source');
  if (!['github-org-budget-ui', 'owner-screenshot', 'github-org-billing-export'].includes(source)) {
    throw new Error('actions-budget-source must identify a current GitHub billing observation');
  }
  const checkedAt = requireText(options.actionsBudgetCheckedAt, 'actions-budget-checked-at');
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(checkedAt)) {
    throw new Error('actions-budget-checked-at must be an ISO UTC timestamp');
  }
  const observed = Date.parse(checkedAt);
  if (!Number.isFinite(observed) || observed > now + 2 * 60000 || now - observed > 60 * 60000) {
    throw new Error('Actions budget observation must be within the last hour (and not in the future)');
  }
  const expectedUsd = usd(options.expectedActionsUsd, 'expected-actions-usd');
  const expectedWorkflows = requireText(options.expectedWorkflows, 'expected-workflows')
    .split(',').map(item => item.trim()).filter(Boolean);
  if (!expectedWorkflows.length || expectedWorkflows.some(item => !/^[a-zA-Z0-9_. -]{1,80}$/.test(item))) {
    throw new Error('expected-workflows must name the anticipated Actions jobs');
  }
  const stopUsage = options.actionsStopUsage;
  if (!['yes', 'no', 'unknown'].includes(stopUsage)) throw new Error('actions-stop-usage must be yes, no, or unknown');
  const usedUsd = status === 'known' ? usd(options.actionsBudgetUsed, 'actions-budget-used', true) : null;
  const limitUsd = status === 'known' ? usd(options.actionsBudgetLimit, 'actions-budget-limit') : null;
  const projectedPercent = status === 'known' ? 100 * (usedUsd + expectedUsd) / limitUsd : null;
  const exceptionNeeded = status === 'unknown' || projectedPercent >= 90 || stopUsage !== 'yes';
  const ownerCostApproval = options.ownerCostApproval
    ? requireText(options.ownerCostApproval, 'owner-cost-approval') : null;
  if (exceptionNeeded && !ownerCostApproval) {
    throw new Error('named current-session owner cost approval required for unknown/90%+ Actions budget or disabled hard stop');
  }
  return { status, source, checkedAt: new Date(observed).toISOString(), usedUsd, limitUsd,
    expectedUsd, expectedWorkflows, stopUsage, projectedPercent, ownerCostApproval,
    limitation: 'self-attested receipt; lease does not authorize or verify a push' };
}
function read(repo) {
  const file = path.join(repo.directory, 'registry.json');
  if (!fs.existsSync(file)) return { version: 1, sessions: [], release: null, releases: [] };
  const state = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (state.version !== 1 || !Array.isArray(state.sessions) || !Array.isArray(state.releases)
      || !Object.hasOwn(state, 'release')) throw new Error('invalid coordination registry; do not replace it');
  const ids = new Set();
  for (const s of state.sessions) {
    id(s.id);
    if (ids.has(s.id) || !Number.isFinite(s.expiresAt) || !Number.isFinite(s.updatedAt)
        || !['active', 'closed'].includes(s.state) || typeof s.worktree !== 'string'
        || !Array.isArray(s.scopes) || !s.scopes.length || !/^[a-f0-9]{40,64}$/.test(s.base)) throw new Error('invalid session record');
    ids.add(s.id);
    s.scopes.forEach(scope);
  }
  if (state.release && (!ids.has(state.release.owner) || !Number.isFinite(state.release.expiresAt)
      || !/^[a-f0-9]{40,64}$/.test(state.release.candidate) || typeof state.release.branch !== 'string')) throw new Error('invalid release record');
  return state;
}
function transaction(repo, action) {
  fs.mkdirSync(repo.directory, { recursive: true });
  const lock = path.join(repo.directory, 'registry.lock');
  let fd;
  try { fd = fs.openSync(lock, 'wx', 0o600); }
  catch (error) {
    if (error.code === 'EEXIST') throw new Error('coordination registry busy; retry once, then report stale lock (never steal it)');
    throw error;
  }
  try {
    fs.writeFileSync(fd, JSON.stringify({ pid: process.pid, createdAt: Date.now() }));
    const state = read(repo);
    const result = action(state);
    writeFileAtomic(path.join(repo.directory, 'registry.json'), `${JSON.stringify(state, null, 2)}\n`);
    return result;
  } finally { fs.closeSync(fd); fs.unlinkSync(lock); }
}
function current(state, repo, sessionId, now) {
  const s = state.sessions.find(item => item.id === id(sessionId));
  if (!s || s.state !== 'active' || s.expiresAt <= now) throw new Error('session missing, closed, or expired; register/renew before work');
  if (s.worktree !== repo.root) throw new Error('session belongs to another worktree');
  return s;
}
function conflicts(state, repo, scopes, sessionId, now) {
  for (const other of state.sessions) {
    if (other.id === sessionId || other.state !== 'active'
        || (other.expiresAt <= now && state.release?.owner !== other.id)) continue;
    if (other.worktree === repo.root) throw new Error(`worktree already owned by ${other.id}; serialize or explicitly hand off this checkout; do not automatically create another worktree`);
    if (scopes.some(a => other.scopes.some(b => overlaps(a, b)))) throw new Error(`write scope overlaps session ${other.id}; no automatic takeover`);
  }
}
function checkSession({ cwd, sessionId, now = Date.now() }) {
  const repo = repository(cwd);
  const state = read(repo);
  const session = current(state, repo, sessionId, now);
  conflicts(state, repo, session.scopes, session.id, now);
  verifyLoop(repo, session);
  if (session.guard) verifyGuard(repo, session, session.guard.mode, now);
  return session;
}
function changedPaths(repo, base, upstream) {
  if (upstream) {
    if (!/^refs\/remotes\/origin\//.test(upstream)) throw new Error('upstream must be a fetched refs/remotes/origin/... reference');
    git(repo.root, ['check-ref-format', upstream]);
    git(repo.root, ['merge-base', '--is-ancestor', upstream, 'HEAD']);
    base = upstream; // Do not misclassify merged, already-published work as this session's edits.
  }
  // Both names of renames are checked (no rename detection); include unstaged/untracked files.
  const outputs = [
    ['diff', '--name-only', '--no-renames', '-z', base, '--'],
    ['diff', '--cached', '--name-only', '--no-renames', '-z', base, '--'],
    ['diff', '--name-only', '--no-renames', '-z', '--'],
    ['ls-files', '--others', '--exclude-standard', '-z'],
  ].map(args => git(repo.root, args));
  return [...new Set(outputs.flatMap(output => output.split('\0').filter(Boolean)))];
}

function fullCommit(repo, value, label) {
  if (typeof value !== 'string' || !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(value)) {
    throw new Error(`${label} must be a full commit SHA`);
  }
  if (git(repo.root, ['rev-parse', '--verify', `${value}^{commit}`]) !== value) {
    throw new Error(`${label} must resolve to the exact full commit SHA`);
  }
  return value;
}
function originDestination(repo) {
  if (!git(repo.root, ['remote']).split('\n').includes('origin')) return null;
  const fetchUrls = git(repo.root, ['remote', 'get-url', '--all', 'origin']).split('\n').filter(Boolean);
  const urls = git(repo.root, ['remote', 'get-url', '--push', '--all', 'origin']).split('\n').filter(Boolean);
  // A lease binds one destination, never credentials or a multi-destination push.
  if (urls.length !== 1) throw new Error('publication requires exactly one origin push destination');
  if (fetchUrls.length !== 1 || fetchUrls[0] !== urls[0]) {
    throw new Error('publication requires one matching origin fetch and push destination');
  }
  return crypto.createHash('sha256').update(urls[0]).digest('hex');
}
function originTarget(repo, targetRef) {
  try { return git(repo.root, ['rev-parse', '--verify', '-q', `${targetRef}^{commit}`]); }
  catch (error) {
    if (error.status === 1) return null;
    throw new Error('origin publication target unavailable');
  }
}
function outgoingPublication(repo, base, candidate) {
  try { git(repo.root, ['merge-base', '--is-ancestor', base, candidate]); }
  catch { throw new Error('publication baseline is not an ancestor of candidate; reconcile owned integration first'); }
  const commits = git(repo.root, ['rev-list', '--reverse', '--topo-order', `${base}..${candidate}`]).split('\n').filter(Boolean);
  if (commits.length > 1000) throw new Error('publication history exceeds bounded review; reconcile the explicit batch');
  // Net tree equality can hide a foreign file introduced and later reverted.
  // Merge differences against all parents are intentionally conservative.
  const paths = [...new Set(commits.flatMap(commit => git(repo.root,
    ['diff-tree', '--no-commit-id', '--root', '-m', '-r', '--name-only', '--no-renames', '-z', commit, '--'])
    .split('\0').filter(Boolean)))].sort();
  return { commits, paths };
}
function publicationReceipt(repo, session, branch, candidate, options) {
  const targetRef = `refs/remotes/origin/${branch}`;
  const destinationSha256 = originDestination(repo);
  const targetSha = destinationSha256 ? originTarget(repo, targetRef) : null;
  let base = targetSha || session.base, mode = destinationSha256 ? 'origin-existing' : 'local-only';
  if (destinationSha256 && !targetSha) {
    base = fullCommit(repo, options.newBranchBase, 'new-branch-base');
    requireText(options.publicationEvidence, 'publication-evidence approving the exact new-branch baseline history');
    mode = 'origin-new';
  } else if (options.newBranchBase) throw new Error('new-branch-base cannot replace an existing origin target or local-only baseline');
  const outgoing = outgoingPublication(repo, base, candidate);
  if (outgoing.paths.length) ownedPaths(repo, session, outgoing.paths);
  const included = options.includeOwnedCommits || [];
  if (!Array.isArray(included) || new Set(included).size !== included.length) throw new Error('include-owned-commit requires unique full commit SHAs');
  included.forEach(commit => fullCommit(repo, commit, 'include-owned-commit'));
  const inherited = destinationSha256 ? outgoing.commits.filter(commit => {
    try { git(repo.root, ['merge-base', '--is-ancestor', commit, session.base]); return true; }
    catch (error) { if (error.status === 1) return false; throw error; }
  }) : [];
  if (included.some(commit => !inherited.includes(commit))) throw new Error('include-owned-commit must identify inherited outgoing commits only');
  if (inherited.some(commit => !included.includes(commit))) throw new Error('inherited unpublished commits require explicit include-owned-commit and publication-evidence');
  const evidence = included.length || mode === 'origin-new'
    ? requireText(options.publicationEvidence, 'publication-evidence') : null;
  return { version: 1, mode, publishable: destinationSha256 !== null, targetRef, targetSha,
    base, destinationSha256, outgoingCommits: outgoing.commits, touchedPaths: outgoing.paths,
    includedInheritedCommits: included, publicationEvidence: evidence,
    limitation: 'fetched-reference and recorded ownership evidence only; not live remote freshness or owner authorization' };
}
function verifyPublication(repo, session, release) {
  const pinned = release.publication;
  if (!pinned || pinned.version !== 1) throw new Error('release lacks publication ownership receipt; end or re-acquire after review');
  let destination;
  try { destination = originDestination(repo); }
  catch { throw new Error('origin publication destination changed or became invalid after acquisition'); }
  if (destination !== pinned.destinationSha256) throw new Error('origin publication destination changed after acquisition');
  const target = destination ? originTarget(repo, `refs/remotes/origin/${release.branch}`) : null;
  if (target !== pinned.targetSha) throw new Error('origin publication target changed after acquisition');
  const current = publicationReceipt(repo, session, release.branch, release.candidate, {
    newBranchBase: pinned.mode === 'origin-new' ? pinned.base : undefined,
    includeOwnedCommits: pinned.includedInheritedCommits, publicationEvidence: pinned.publicationEvidence,
  });
  if (JSON.stringify(current) !== JSON.stringify(pinned)) throw new Error('publication ownership receipt changed after acquisition');
  return current;
}

// Standard shared-checkout sessions can inherit other owners' UNSTAGED drafts.
// Freeze bytes and index entries, never ownership. Native fences bind the exact
// preservation ledger; loops and publication keep whole-checkout requirements.
function owns(session, relative) {
  const clean = scope(relative);
  return session.scopes.some(s => clean === s || clean.startsWith(`${s}/`));
}
// Batch stable index metadata, not stat-cache timestamps. Never cache file bytes
// across events; flags can otherwise hide a dirty tracked file from Git status.
function foreignIndex(repo, paths) {
  const entries = new Map(paths.map(relative => [relative, { index: '', indexFlags: '', indexMonitor: '' }]));
  for (let offset = 0; offset < paths.length;) {
    const batch = []; let length = 0;
    while (offset < paths.length && batch.length < 128 && (!batch.length || length + paths[offset].length < 12000)) {
      length += paths[offset].length; batch.push(paths[offset++]);
    }
    const specs = batch.map(relative => `:(literal)${relative}`);
    for (const record of git(repo.root, ['ls-files', '--stage', '-z', '--', ...specs]).split('\0').filter(Boolean)) {
      const tab = record.indexOf('\t'), relative = record.slice(tab + 1), entry = entries.get(relative);
      if (tab < 0 || !entry || !/^\d+ [a-f0-9]+ 0$/.test(record.slice(0, tab))) {
        throw new Error('foreign baseline has unresolved index entries');
      }
      entry.index += record + '\0';
    }
    for (const record of git(repo.root, ['ls-files', '-v', '-z', '--', ...specs]).split('\0').filter(Boolean)) {
      const entry = entries.get(record.slice(2));
      if (!entry || !/^[A-Za-z] /.test(record)) throw new Error('invalid foreign index flags');
      entry.indexFlags += record + '\0';
    }
    for (const record of git(repo.root, ['ls-files', '-f', '-z', '--', ...specs]).split('\0').filter(Boolean)) {
      const entry = entries.get(record.slice(2));
      if (!entry || !/^[A-Za-z] /.test(record)) throw new Error('invalid foreign index flags');
      entry.indexMonitor += record + '\0';
    }
  }
  return entries;
}
function foreignSnapshot(repo, relative, expected, declaredBytes, metadata) {
  safePath(repo, relative);
  const current = metadata || foreignIndex(repo, [relative]).get(relative);
  const { index, indexFlags, indexMonitor } = current;
  if (expected && index !== expected.index) throw new Error(`foreign baseline changed or staged: ${relative}`);
  if (expected && Object.hasOwn(expected, 'indexFlags') && indexFlags !== expected.indexFlags) {
    throw new Error(`foreign baseline changed or staged: ${relative}`);
  }
  if (expected && Object.hasOwn(expected, 'indexMonitor') && indexMonitor !== expected.indexMonitor) {
    throw new Error(`foreign baseline changed or staged: ${relative}`);
  }
  // Legacy standard-session records remain readable; native conversion requires
  // a freshly registered v2 ledger, never an implicit baseline upgrade.
  const flags = !expected || Object.hasOwn(expected, 'indexFlags') ? { indexFlags, indexMonitor } : {};
  const file = path.join(repo.root, relative);
  let stat;
  try { stat = fs.lstatSync(file); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (!stat) {
    if ((expected && !expected.absent) || (declaredBytes !== undefined && declaredBytes !== null)) {
      throw new Error(`foreign baseline changed: ${relative}`);
    }
    return { path: relative, index, ...flags, absent: true };
  }
  if (declaredBytes !== undefined && declaredBytes !== stat.size) throw new Error('foreign baseline changed after size admission');
  if (expected && (expected.absent || expected.bytes !== stat.size || expected.mode !== stat.mode
      || expected.inode !== stat.ino || expected.device !== stat.dev)) {
    throw new Error(`foreign baseline changed: ${relative}`);
  }
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 1024 * 1024 * 1024) {
    throw new Error('foreign baseline requires bounded regular files');
  }
  const hash = crypto.createHash('sha256'), buffer = Buffer.alloc(1024 * 1024);
  const fd = fs.openSync(file, 'r');
  try {
    const opened = fs.fstatSync(fd);
    if (opened.size !== stat.size || opened.ino !== stat.ino || opened.dev !== stat.dev) {
      throw new Error('foreign baseline changed before read');
    }
    let readBytes = 0;
    while (readBytes < stat.size) {
      const n = fs.readSync(fd, buffer, 0, Math.min(buffer.length, stat.size - readBytes), null);
      if (!n) throw new Error('foreign baseline truncated during read');
      readBytes += n; hash.update(buffer.subarray(0, n));
    }
    if (fs.fstatSync(fd).size !== stat.size) throw new Error('foreign baseline changed during bounded read');
  } finally { fs.closeSync(fd); }
  const after = fs.lstatSync(file);
  if (after.size !== stat.size || after.mtimeMs !== stat.mtimeMs || after.ino !== stat.ino) {
    throw new Error('foreign baseline changed during capture');
  }
  return { path: relative, index, ...flags, absent: false, bytes: stat.size,
    sha256: hash.digest('hex'), mode: stat.mode, inode: stat.ino, device: stat.dev };
}
function captureForeign(repo, session) {
  const paths = changedPaths(repo, session.base).filter(file => !owns(session, file));
  if (paths.length > 2000) throw new Error('foreign baseline exceeds bounded file count');
  const staged = git(repo.root, ['diff', '--cached', '--name-only', '--no-renames', '-z', '--'])
    .split('\0').filter(Boolean);
  if (staged.some(file => !owns(session, file))) throw new Error('foreign staging cannot be inherited');
  // Bound total reads BEFORE hashing, rather than discover an oversized cache
  // only after consuming it. Missing tracked files are preserved deletions.
  let totalBytes = 0;
  const declared = new Map();
  for (const relative of paths) {
    safePath(repo, relative);
    try { const size = fs.lstatSync(path.join(repo.root, relative)).size; declared.set(relative, size); totalBytes += size; }
    catch (error) { if (error.code !== 'ENOENT') throw error; declared.set(relative, null); }
    if (totalBytes > 1024 * 1024 * 1024) throw new Error('foreign baseline exceeds bounded byte count');
  }
  const metadata = foreignIndex(repo, paths);
  const files = paths.map(file => foreignSnapshot(repo, file, undefined, declared.get(file), metadata.get(file)));
  if (JSON.stringify([...foreignIndex(repo, paths)]) !== JSON.stringify([...metadata])) {
    throw new Error('foreign baseline changed during capture');
  }
  const finalStaged = git(repo.root, ['diff', '--cached', '--name-only', '--no-renames', '-z', '--'])
    .split('\0').filter(Boolean);
  if (finalStaged.some(file => !owns(session, file))) throw new Error('foreign staging cannot be inherited');
  return { version: 2, files };
}
function preservedForeign(repo, session) {
  if (!session.preservedForeign || session.loop) return new Set();
  const baseline = session.preservedForeign;
  if (session.guard && baseline.files?.length) {
    const fingerprint = crypto.createHash('sha256').update(JSON.stringify(baseline)).digest('hex');
    if (session.guard.foreignBaselineSha256 !== fingerprint) throw new Error('foreign preservation binding changed');
  }
  if (![1, 2].includes(baseline.version) || !Array.isArray(baseline.files) || baseline.files.length > 2000) {
    throw new Error('invalid foreign preservation baseline');
  }
  let totalBytes = 0;
  for (const file of baseline.files) {
    if (!file || typeof file.absent !== 'boolean' || (baseline.version === 2
        && (typeof file.indexFlags !== 'string' || typeof file.indexMonitor !== 'string')) || (!file.absent
        && (!Number.isSafeInteger(file.bytes) || file.bytes < 0))) throw new Error('invalid foreign byte bound');
    totalBytes += file.bytes || 0;
    if (totalBytes > 1024 * 1024 * 1024) throw new Error('foreign baseline exceeds bounded byte count');
  }
  // A matching current index is insufficient: foreign content must not enter
  // any unpublished commit, even if later reverted or the index is restored.
  if (baseline.files.length) git(repo.root, ['merge-base', '--is-ancestor', session.base, 'HEAD']);
  const committed = baseline.files.length ? new Set(git(repo.root, ['log', '--format=', '--name-only',
    '--no-renames', '--diff-merges=first-parent', '-z', `${session.base}..HEAD`, '--'])
    .split('\0').map(file => file.replace(/^\n+|\n+$/g, '')).filter(Boolean).map(scope)) : new Set();
  const preserved = new Set();
  const metadata = foreignIndex(repo, baseline.files.map(file => file.path));
  for (const file of baseline.files) {
    if (!file || typeof file.path !== 'string' || owns(session, file.path)
        || preserved.has(file.path) || (!file.absent && !/^[a-f0-9]{64}$/.test(file.sha256))) {
      throw new Error('invalid foreign preservation entry');
    }
    if (committed.has(scope(file.path))) throw new Error(`foreign baseline entered committed history: ${file.path}`);
    if (JSON.stringify(foreignSnapshot(repo, file.path, file, undefined, metadata.get(file.path))) !== JSON.stringify(file)) {
      throw new Error(`foreign baseline changed or staged: ${file.path}; preserve its owner and re-register after handoff`);
    }
    preserved.add(file.path);
  }
  if (JSON.stringify([...foreignIndex(repo, baseline.files.map(file => file.path))]) !== JSON.stringify([...metadata])) {
    throw new Error('foreign baseline changed during capture');
  }
  return preserved;
}

// This is a typed-tool fence, not a shell parser or OS sandbox. The session
// registry owns the contract/counters; active-goal owns the owner revision.
// workspaceRoot is a reviewed host capability derived by the fresh wrapper,
// never a manifest root override or native tool payload.
function goalReference(repo, goalFile, workspaceRoot = null) {
  function exactPath(value, regular = false) {
    if (typeof value !== 'string' || !path.isAbsolute(value)) throw Error('absolute goal reference required');
    const input = value.replace(/\\/g, '/');
    if (/^\/\//.test(input) || /[\x00-\x1f]/.test(input)
        || input.split('/').some(part => part === '.' || part === '..' || (part && /[. ]$/.test(part)))) throw Error('ambiguous goal reference');
    const absolute = path.resolve(value), volume = path.parse(absolute).root;
    const normalized = absolute.replace(/\\/g, '/');
    const compare = value => process.platform === 'win32' ? value.toLowerCase() : value;
    if (compare(input) !== compare(normalized)) throw Error('noncanonical goal reference');
    safePath({ root: volume }, path.relative(volume, absolute).replace(/\\/g, '/'));
    const stat = fs.lstatSync(absolute);
    if ((regular && (!stat.isFile() || stat.nlink !== 1 || stat.size > 256 * 1024))
        || (!regular && !stat.isDirectory())) throw Error('bounded regular unlinked goal reference required');
    const real = fs.realpathSync.native(absolute);
    if (compare(real.replace(/\\/g, '/')) !== compare(normalized)) throw Error('aliased goal reference');
    return compare(real);
  }
  const file = exactPath(goalFile ?? path.join(repo.root, '.ecc/goal/active-goal.yaml'), true);
  const local = exactPath(repo.root);
  const inside = (root, file) => {
    const relative = path.relative(root, file);
    return relative !== '' && relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
  };
  let boundary = local;
  if (!inside(local, file)) {
    if (!workspaceRoot) throw Error('goal reference outside repository');
    boundary = exactPath(workspaceRoot);
    if (!inside(boundary, local) || !inside(exactPath(path.join(boundary, 'artifacts')), file)) throw Error('goal reference outside reviewed artifacts');
  }
  const original = fs.lstatSync(file, { bigint: true });
  const sameFile = (first, second) => first.isFile() && second.isFile()
    && first.nlink === 1n && second.nlink === 1n
    && ['dev','ino','size','mtimeNs','ctimeNs'].every(field => first[field] === second[field]);
  const descriptor = fs.openSync(file, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW || 0));
  try {
    const stat = fs.fstatSync(descriptor, { bigint: true });
    if (!sameFile(original, stat) || stat.size > 256n * 1024n) throw Error('goal identity changed before read');
    let raw = Buffer.alloc(256 * 1024 + 1);
    let length = 0, count;
    while (length < raw.length && (count = fs.readSync(descriptor, raw, length, raw.length - length, null)) > 0) length += count;
    if (length > 256 * 1024) throw Error('goal document too large');
    raw = raw.subarray(0, length);
    if (!sameFile(original, fs.fstatSync(descriptor, { bigint: true }))) throw Error('goal identity changed during read');
    const text = raw.toString('utf8').replace(/^\uFEFF/, '');
    const yaml = require('js-yaml');
    const goal = /\.ya?ml$/i.test(file) ? yaml.load(text, { json: true, schema: yaml.JSON_SCHEMA }) : JSON.parse(text);
    const { assertDocument, validateGoalSemantics } = require('./goal-control');
    assertDocument('goal', goal, 'scope guard goal');
    validateGoalSemantics(goal);
    if (exactPath(file, true) !== file
        || !sameFile(original, fs.fstatSync(descriptor, { bigint: true }))
        || !sameFile(original, fs.lstatSync(file, { bigint: true }))) throw Error('goal identity changed during validation');
    const reference = { file, sha256: crypto.createHash('sha256').update(raw).digest('hex'), boundary };
    // The semantic revision and byte digest refer to one stable captured file.
    Object.defineProperty(reference, 'document', { value: goal });
    return reference;
  } finally { fs.closeSync(descriptor); }
}
function goalRevision(repo, reference = null) {
  const { readStructuredFile, assertDocument, validateGoalSemantics } = require('./goal-control');
  let goal;
  if (reference) {
    const current = goalReference(repo, reference.file, reference.boundary === repo.root ? null : reference.boundary);
    if (JSON.stringify(current) !== JSON.stringify(reference)) throw Error('protected goal reference changed');
    goal = current.document;
  } else {
    const file = path.join(repo.root, '.ecc/goal/active-goal.yaml');
    safePath(repo, '.ecc/goal/active-goal.yaml');
    goal = readStructuredFile(file);
  }
  assertDocument('goal', goal, 'scope guard goal');
  validateGoalSemantics(goal);
  const revision = { goal_id: goal.goal_id, objective: goal.objective,
    current_priority: goal.current_priority, non_goals: goal.non_goals,
    owner_corrections: goal.owner_corrections, user_visible_proofs: goal.user_visible_proofs };
  return { id: goal.goal_id, revision: crypto.createHash('sha256').update(JSON.stringify(revision)).digest('hex') };
}
function assignmentReference(repo, reference, request, session, runtime, now = Date.now()) {
  if (session.managedAssignment) {
    const expected = session.managedAssignment;
    if (!request || JSON.stringify(reference) !== JSON.stringify(expected.goalReference)
        || request.id !== expected.assignmentId || request.ownerAgent !== expected.ownerAgent) throw Error('registered worker assignment/goal binding required');
  } else if (request) throw Error('managed assignment must be pinned on registered session');
  if (!request && reference?.boundary !== repo.root) return null;
  if (!reference || reference.boundary !== repo.root || (request && (typeof request.id !== 'string'
      || typeof request.ownerAgent !== 'string'))) throw Error('repository-local managed worker assignment required');
  const selected = goalReference(repo, reference.file);
  if (JSON.stringify(selected) !== JSON.stringify(reference) || (request && selected.document.status !== 'active')) throw Error('worker goal changed or inactive');
  function ledger(name) {
    const file = path.join(path.dirname(selected.file), name);
    safePath(repo, path.relative(repo.root, file).replace(/\\/g, '/'));
    const before = fs.lstatSync(file, { bigint:true });
    if (!before.isFile() || before.nlink !== 1n || before.size > 1024n * 1024n) throw Error('bounded worker ledger required');
    const fd = fs.openSync(file, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW || 0));
    const same = stat => stat.isFile() && ['dev','ino','size','mtimeNs','ctimeNs','nlink'].every(key => stat[key] === before[key]);
    try {
      if (!same(fs.fstatSync(fd,{bigint:true}))) throw Error('worker ledger changed before read');
      const bytes = Buffer.alloc(1024 * 1024 + 1); let length = 0, count;
      while (length < bytes.length && (count = fs.readSync(fd,bytes,length,bytes.length-length,null)) > 0) length += count;
      if (length > 1024 * 1024 || !same(fs.fstatSync(fd,{bigint:true}))) throw Error('worker ledger changed during read');
      const rows = bytes.subarray(0,length).toString('utf8').replace(/^\uFEFF/,'').split(/\r?\n/).filter(line => line.trim() && !line.trim().startsWith('#')).map(JSON.parse);
      safePath(repo,path.relative(repo.root,file).replace(/\\/g,'/'));
      if (!same(fs.lstatSync(file,{bigint:true})) || !same(fs.fstatSync(fd,{bigint:true}))) throw Error('worker ledger changed during validation');
      return {file,rows};
    } finally { fs.closeSync(fd); }
  }
  if (!request) {
    const file = path.join(path.dirname(selected.file),'assignments.jsonl');
    safePath(repo,path.relative(repo.root,file).replace(/\\/g,'/'));
    if (fs.existsSync(file) && ledger('assignments.jsonl').rows.some(row => row.managed_execution?.session_id === session.id)) throw Error('managed worker assignment reference required');
    return null;
  }
  const assignments = ledger('assignments.jsonl'), integrations = ledger('integrations.jsonl');
  const matches = assignments.rows.filter(row => row.assignment_id === request.id);
  if (matches.length !== 1) throw Error('unique worker assignment required');
  if (assignments.rows.filter(row => row.managed_execution?.session_id === session.id).length !== 1) throw Error('one managed assignment per session required');
  const assignment = matches[0], { assertDocument, latestExecutableCorrection } = require('./goal-control');
  assertDocument('assignment', assignment);
  const recordDigest = crypto.createHash('sha256').update(JSON.stringify(assignment)).digest('hex');
  if (recordDigest !== session.managedAssignment.recordSha256) throw Error('registered worker assignment changed');
  const managed = assignment.managed_execution;
  const declaredRoot = typeof managed?.repository_root === 'string' ? managed.repository_root.replace(/\\/g,'/') : '';
  const actualRoot = repo.root.replace(/\\/g,'/');
  if (!managed || managed.session_id !== session.id
      || (process.platform === 'win32' ? declaredRoot.toLowerCase() !== actualRoot.toLowerCase() : declaredRoot !== actualRoot)
      || assignment.goal_id !== selected.document.goal_id || assignment.owner_runtime !== runtime
      || assignment.owner_agent !== request.ownerAgent) throw Error('managed worker identity mismatch');
  const issued = Date.parse(assignment.issued_at), expires = Date.parse(assignment.lease_expires_at);
  if (!Number.isFinite(session.registeredAt) || !Number.isFinite(issued) || !Number.isFinite(expires)
      || issued < session.registeredAt || issued > now || expires <= now || expires <= issued) throw Error('fresh unexpired worker assignment required');
  const correction = latestExecutableCorrection(selected.document);
  if (correction && issued < Date.parse(correction.recorded_at)) throw Error('worker assignment superseded');
  if (integrations.rows.some(row => row.assignment_id === assignment.assignment_id)) throw Error('worker assignment already settled; prior usage cannot reset');
  const scopes = assignment.scope_paths.map(scope);
  if (assignment.acceptance_ids.some(id => !selected.document.user_visible_proofs.some(proof => proof.id === id && proof.required))) throw Error('worker assignment lacks current required output');
  const support = ['.ecc/fresh-session/' + session.id, ...(runtime === 'antigravity' ? ['.agents/hooks.json'] : [])].map(scope);
  for (const owned of session.scopes) {
    if (!support.includes(owned) && !scopes.some(allowed => owned === allowed || owned.startsWith(allowed + '/'))) throw Error('worker scope exceeds assignment');
  }
  if (scopes.some(value => /^(?:\.ecc|\.git|\.agents)(?:\/|$)/i.test(value))) throw Error('worker cannot own assignment/guard metadata');
  const closureReserve = managed.closure_reserve, toolCeiling = assignment.budget.max_tool_calls - closureReserve;
  if (!Number.isSafeInteger(toolCeiling) || toolCeiling < 10) throw Error('worker cap cannot cover preflight and parent reserve');
  return { file:assignments.file, id:assignment.assignment_id,
    sha256:recordDigest,
    ownerAgent:assignment.owner_agent, runtime, repositoryRoot:repo.root, sessionId:session.id, closureReserve, toolCeiling };
}
function pinManagedAssignment(repo,state,session,options,now) {
  if (session.guard || session.managedAssignment) throw Error('managed session already has an assignment or guard');
  const assignment=options.assignment, reference=options.goalReference;
  require('./goal-control').assertDocument('assignment',assignment);
  const selected=goalReference(repo,reference?.file);
  const managed=assignment.managed_execution;
  if (reference?.boundary !== repo.root || JSON.stringify(selected) !== JSON.stringify(reference)
      || selected.document.status !== 'active' || assignment.goal_id !== selected.document.goal_id
      || !managed || managed.session_id !== session.id || managed.repository_root !== repo.root
      || Date.parse(assignment.issued_at) < session.registeredAt || Date.parse(assignment.issued_at) > now
      || Date.parse(assignment.lease_expires_at) <= now) throw Error('fresh repository-local managed assignment required');
  if (state.sessions.some(other => other.managedAssignment?.assignmentId === assignment.assignment_id
      && other.managedAssignment.goalReference.file === reference.file)) throw Error('managed assignment already pinned; no counter reset');
  const scopes=assignment.scope_paths.map(scope), support=['.ecc/fresh-session/'+session.id,
    ...(assignment.owner_runtime==='antigravity'?['.agents/hooks.json']:[])].map(scope);
  if (scopes.some(value=>/^(?:\.ecc|\.git|\.agents)(?:\/|$)/i.test(value))
      || session.scopes.some(value=>!support.includes(value)&&!scopes.some(allowed=>value===allowed||value.startsWith(allowed+'/')))
      || assignment.budget.max_tool_calls-managed.closure_reserve < 10) throw Error('managed scope/cap does not admit execution');
  session.managedAssignment={goalReference:reference,assignmentId:assignment.assignment_id,ownerAgent:assignment.owner_agent,
    recordSha256:crypto.createHash('sha256').update(JSON.stringify(assignment)).digest('hex')};
  return session.managedAssignment;
}
function normalizeToolPath(repo, value, cwd = repo.root) {
  if (typeof value !== 'string' || !value || /[\x00-\x1f]/.test(value)) throw new Error('invalid tool path');
  let input = value.replace(/\\/g, '/');
  if (process.platform === 'win32') input = input.replace(/^\/([a-z])\//i, '$1:/');
  // Reject ambiguous Win32 device/extended paths, ADS, dot/space aliases and
  // traversal even when a lexical resolve would bring them back into scope.
  if (/^\/\/[?.]\//.test(input) || input.split('/').some(p => p === '..' || (p && /[. ]$/.test(p)))) throw new Error('ambiguous tool path');
  const absolute = path.resolve(cwd, input);
  const relative = path.relative(repo.root, absolute).replace(/\\/g, '/');
  safePath(repo, relative); // Reject links before resolving an existing alias.
  let parent = absolute;
  const missing = [];
  while (!fs.existsSync(parent)) {
    missing.unshift(path.basename(parent));
    parent = path.dirname(parent);
  }
  // Expand existing Win32 short-name aliases before protected-path comparisons.
  const resolved = path.join(fs.realpathSync.native(parent), ...missing);
  return safePath(repo, path.relative(repo.root, resolved).replace(/\\/g, '/'));
}
function patchPaths(input) {
  if (typeof input !== 'string' || input.length > 1024 * 1024) throw new Error('invalid patch');
  const lines = input.replace(/\r\n/g, '\n').trimEnd().split('\n');
  if (lines.shift() !== '*** Begin Patch' || lines.pop() !== '*** End Patch') throw new Error('invalid patch');
  const paths = [];
  let inFile = false;
  for (const line of lines) {
    const header = /^\*\*\* (?:Add|Update|Delete) File: (.+)$/.exec(line);
    const move = /^\*\*\* Move to: (.+)$/.exec(line);
    if (header) { paths.push(header[1]); inFile = true; }
    else if (move && inFile) paths.push(move[1]);
    else if (line.startsWith('*** ') && line !== '*** End of File') throw new Error('invalid patch');
    else if (!inFile) throw new Error('invalid patch');
  }
  if (!paths.length) throw new Error('empty patch');
  return paths;
}
function typedAction(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('invalid event');
  const tool = String(payload.tool_name || payload.toolName || '').replace(/^functions\./, '');
  const input = payload.tool_input ?? payload.toolInput;
  if (['Read', 'Glob', 'Grep', 'read_file'].includes(tool)) return { operation: 'read', paths: [] };
  if (['apply_patch', 'ApplyPatch'].includes(tool)) {
    return { operation: 'patch', paths: patchPaths(typeof input === 'string' ? input : input?.patch ?? input?.input) };
  }
  if (['Write', 'Edit', 'write_file', 'edit_file'].includes(tool)) {
    if (!input || typeof input !== 'object' || typeof input.file_path !== 'string') throw new Error('unknown write payload');
    return { operation: 'write', paths: [input.file_path] };
  }
  if (tool === 'MultiEdit') {
    if (!Array.isArray(input?.edits) || !input.edits.length) throw new Error('unknown write payload');
    return { operation: 'write', paths: input.edits.map(item => item.file_path) };
  }
  // Interpreters, external executables, MCP/cloud, transport and delegated
  // execution are opaque. A command allowlist would not contain their effects.
  throw new Error('opaque tool requires a verified restricted execution boundary');
}
let guardValidator;
function implementationDigest() {
  const root = path.resolve(__dirname, '../..');
  const files = ['scripts/lib/session-coordination.js', 'scripts/hooks/goal-runtime-gate.js',
    'scripts/goal-runtime-bridge.js', 'schemas/goal-control.schema.json',
    'scripts/lib/scope-guard-adapters.js', '.opencode/plugins/ecc-scope-guard.ts'];
  return crypto.createHash('sha256').update(files.map(file =>
    crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex')).join('\n')).digest('hex');
}
function validateGuard(guard) {
  const Ajv = require('ajv');
  const schema = require('../../schemas/goal-control.schema.json');
  if (!guardValidator) {
    const ajv = new Ajv({ strict: false });
    ajv.addSchema(schema);
    guardValidator = ajv.compile({ $ref: 'ecc.goal-control.v1#/$defs/scopeGuard' });
  }
  if (!guardValidator(guard) || !Number.isFinite(guard.deadline)) throw new Error('invalid scope guard state');
  guard.scopes.forEach(scope);
  for (const check of guard.protected) {
    if (!check || typeof check.path !== 'string' || !/^[a-f0-9]{64}$/.test(check.sha256)) throw new Error('invalid protected state');
    scope(check.path);
  }
}
function assertNativeVisibleIndex(repo) {
  // Clean tracked files may not appear in the dirty preservation ledger.
  // Concealment flags cannot hide them from native final/change checks.
  for (const record of git(repo.root, ['ls-files', '-v', '-z', '--']).split('\0').filter(Boolean)) {
    if (!/^[A-Za-z] /.test(record)) throw new Error('native index visibility unavailable');
    if (/[a-z]/.test(record[0]) || record[0] === 'S') throw new Error('native index hides tracked paths');
  }
}
function bindGuard(repo, session, options, now, state) {
  if (session.guard) throw new Error('guard already bound; use a new session after a correction or mode change');
  if (session.preservedForeign?.files.length && session.preservedForeign.version !== 2) {
    throw new Error('native guard requires a fresh flag-bound foreign baseline');
  }
  if (session.preservedForeign?.files.length) preservedForeign(repo, session);
  if (!['audit', 'block'].includes(options.guardMode)) throw new Error('guard-mode must be audit or block');
  assertNativeVisibleIndex(repo);
  const reference = options.goalReference;
  const goal = goalRevision(repo, reference);
  const worker = assignmentReference(repo, reference || goalReference(repo), options.workerAssignment, session, options.runtime, now);
  if (worker && (JSON.stringify(worker) !== JSON.stringify(options.workerAssignment)
      || Number(options.toolLimit) > worker.toolCeiling
      || state.sessions.some(other => other.guard?.goalId === goal.id && other.guard?.workerAssignment?.id === worker.id))) {
    throw Error('worker assignment already bound or cap widened');
  }
  const deadline = Date.parse(options.deadline);
  const guard = { mode: options.guardMode, goalId: goal.id, goalRevision: goal.revision,
    ...(reference ? { goalReference: structuredClone(reference) } : {}),
    ...(worker ? { workerAssignment: worker } : {}),
    implementationSha256: implementationDigest(),
    nativeSessionId: options.nativeSessionId || session.id,
    base: session.base, scopes: [...session.scopes], deadline,
    protected: [...new Set(options.protectedPaths || [])].map(file => ({ path: safePath(repo, file), sha256: checkDigest(repo, file) })),
    allowedOperations: options.allowedOperations || ['read', 'write', 'patch'],
    toolLimit: Number(options.toolLimit), turnLimit: Number(options.turnLimit), tools: 0, turnIds: [],
    budgets: { providerUsd: 0, ciRuns: 0, resourceTelemetry: 'unverified' } };
  guard.foreignBaselineSha256 = crypto.createHash('sha256')
    .update(JSON.stringify(session.preservedForeign ?? null)).digest('hex');
  validateGuard(guard);
  if (deadline <= now || deadline > session.expiresAt) throw new Error('guard deadline must be within the active lease');
  session.guard = guard;
  return guard;
}
function verifyGuard(repo, session, mode, now) {
  const guard = session.guard;
  validateGuard(guard);
  if (guard.implementationSha256 !== implementationDigest()) throw new Error('protected guard/check configuration changed');
  if (guard.mode !== mode || guard.base !== session.base || JSON.stringify(guard.scopes) !== JSON.stringify(session.scopes)) throw new Error('scope guard binding mismatch');
  const goal = goalRevision(repo, guard.goalReference);
  if (goal.id !== guard.goalId || goal.revision !== guard.goalRevision) throw new Error('stale owner goal revision');
  const worker = assignmentReference(repo,guard.goalReference || goalReference(repo),guard.workerAssignment,session,guard.workerAssignment?.runtime,now);
  if (guard.workerAssignment) {
    if (JSON.stringify(worker) !== JSON.stringify(guard.workerAssignment) || guard.toolLimit > worker.toolCeiling) throw Error('worker assignment changed or cap widened');
  }
  if (now >= guard.deadline || guard.tools > guard.toolLimit || guard.turnIds.length > guard.turnLimit) throw new Error('scope guard budget exhausted');
  verifyLoop(repo, session);
  // A legacy/empty binding cannot acquire a foreign exception later. Deleting,
  // replacing or editing the frozen ledger is configuration tampering.
  const current = crypto.createHash('sha256').update(JSON.stringify(session.preservedForeign ?? null)).digest('hex');
  if (current !== guard.foreignBaselineSha256) throw new Error('foreign preservation binding changed');
  assertNativeVisibleIndex(repo);
  preservedForeign(repo, session);
  for (const check of guard.protected) if (checkDigest(repo, check.path) !== check.sha256) throw new Error('protected guard/check configuration changed');
  return guard;
}
function guardEvent(repo, state, options, now) {
  const mode = options.guardMode;
  if (!['audit', 'block'].includes(mode)) throw new Error('trusted guard mode required');
  const started = performance.now();
  let session, action, reason = null;
  try {
    session = current(state, repo, options.sessionId, now);
    conflicts(state, repo, session.scopes, session.id, now);
    const guard = verifyGuard(repo, session, mode, now);
    const nativeId = options.payload?.session_id || options.payload?.conversation_id;
    if (nativeId !== guard.nativeSessionId) throw new Error('native session identity mismatch');
    if (options.event === 'turn') {
      const turn = options.payload?.turn_id;
      if (typeof turn !== 'string' || !turn || turn.length > 100) throw new Error('missing native turn identity');
      if (!guard.turnIds.includes(turn)) guard.turnIds.push(turn);
      if (guard.turnIds.length > guard.turnLimit) throw new Error('scope guard budget exhausted');
      action = { operation: 'turn' };
    } else if (options.event === 'final') {
      const preserved = preservedForeign(repo, session);
      const paths = changedPaths(repo, guard.base).filter(file => !preserved.has(file));
      if (paths.length) ownedPaths(repo, session, paths);
      action = { operation: 'final' };
    } else if (options.event === 'pre') {
      // Exhausted managed attempts never execute or consume the parent's reserve.
      // Denial telemetry remains in the append-only event log, not charged tools.
      if (guard.workerAssignment && guard.tools >= guard.toolLimit) throw new Error('scope guard budget exhausted');
      guard.tools += 1;
      if (guard.tools > guard.toolLimit) throw new Error('scope guard budget exhausted');
      const cwd = options.payload?.cwd || repo.root;
      if (canonical(cwd) !== repo.root) throw new Error('native cwd differs from owned worktree');
      action = typedAction(options.payload);
      if (!guard.allowedOperations.includes(action.operation)) throw new Error('operation not admitted');
      const toolCwd = options.payload?.tool_input?.workdir || options.payload?.tool_input?.cwd || cwd;
      for (const value of action.paths) {
        const relative = normalizeToolPath(repo, value, toolCwd);
        if (/^(?:\.git|\.ecc|\.codex|\.claude|\.gemini|\.copilot)(?:\/|$)|^\.github\/hooks(?:\/|$)/i.test(relative)
            || guard.protected.some(check => overlaps(relative, check.path))) throw new Error('protected guard/check configuration write');
        ownedPaths(repo, session, [relative]);
      }
    } else throw new Error('unknown guard event');
  } catch (error) {
    // Never echo parser errors, which can contain source snippets or secrets.
    reason = ['invalid scope guard state', 'invalid protected state', 'scope guard binding mismatch',
      'stale owner goal revision', 'scope guard budget exhausted', 'protected guard/check configuration changed',
      'native session identity mismatch', 'missing native turn identity', 'native cwd differs from owned worktree',
      'operation not admitted', 'protected guard/check configuration write', 'unknown guard event',
      'invalid event', 'invalid patch', 'empty patch', 'unknown write payload',
      'opaque tool requires a verified restricted execution boundary', 'invalid tool path', 'ambiguous tool path',
      'outside owned write scope', 'linked path is not an owned scope',
      'session missing, closed, or expired', 'session belongs to another worktree']
      .concat(['foreign preservation binding changed', 'foreign baseline changed or staged', 'foreign baseline entered committed history',
        'native index hides tracked paths', 'native index visibility unavailable'])
      .find(code => error.message.startsWith(code)) || 'scope guard state/input unavailable or malformed';
  }
  const decision = { allowed: mode === 'audit' || reason === null, wouldDeny: reason !== null,
    mode, event: options.event, operation: action?.operation || 'unknown', reason,
    elapsedMs: Math.round((performance.now() - started) * 100) / 100 };
  // Redacted metadata only. No tool arguments, command text, patch content,
  // paths, prompts or credential-bearing transport are recorded.
  const logDir = 'artifacts/agent-runs/scope-guard';
  safePath(repo, logDir);
  fs.mkdirSync(path.join(repo.root, logDir), { recursive: true });
  const logPath = `${logDir}/${id(options.sessionId)}.jsonl`;
  safePath(repo, logPath);
  fs.appendFileSync(path.join(repo.root, logPath), JSON.stringify({ at: new Date(now).toISOString(), session: options.sessionId,
    mode, event: decision.event, operation: decision.operation, wouldDeny: decision.wouldDeny,
    reasonCode: reason ? reason.split(':')[0].replace(/[^a-zA-Z -]/g, '').slice(0,80) : null, elapsedMs: decision.elapsedMs }) + '\n');
  return decision;
}
function ownedPaths(repo, session, paths) {
  if (!paths.length) throw new Error('at least one --path required');
  for (const relative of paths) {
    const clean = safePath(repo, relative);
    if (!session.scopes.some(allowed => clean === allowed || clean.startsWith(`${allowed}/`))) throw new Error(`outside owned write scope: ${relative}`);
  }
}
function execute(command, options = {}) {
  const repo = repository(options.cwd);
  const now = options.now === undefined ? Date.now() : options.now;
  if (command === 'status') return { ...read(repo), commonDirectory: repo.common, now,
    limitation: 'same Git clone and cooperating wrappers only; no permission grant or proof of CI/deployment' };
  const sessionId = id(options.sessionId);
  return transaction(repo, state => {
    if (command === 'guard-event') return guardEvent(repo, state, options, now);
    if (command === 'register') {
      if (state.sessions.some(s => s.id === sessionId)) throw new Error('session ID already exists; renew or use a new ID');
      const scopes = (options.scopes || []).map(item => safePath(repo, item));
      if (!scopes.length) throw new Error('at least one --scope required');
      conflicts(state, repo, scopes, sessionId, now);
      const session = { id: sessionId, state: 'active', worktree: repo.root, scopes,
        objective: requireText(options.objective, 'objective'), doneWhen: requireText(options.doneWhen, 'done-when'),
        base: git(repo.root, ['rev-parse', 'HEAD']), registeredAt:now, updatedAt: now, expiresAt: expiry(options.ttl, now) };
      const loop = pinLoop(repo, options, scopes);
      if (loop) session.loop = loop;
      else session.preservedForeign = captureForeign(repo, session);
      state.sessions.push(session);
      return session;
    }
    if (command === 'renew') {
      const session = state.sessions.find(s => s.id === sessionId);
      if (!session || session.state !== 'active' || session.worktree !== repo.root) throw new Error('cannot renew another/closed session');
      conflicts(state, repo, session.scopes, sessionId, now);
      session.expiresAt = expiry(options.ttl, now);
      session.updatedAt = now;
      return session;
    }
    const session = current(state, repo, sessionId, now);
    conflicts(state, repo, session.scopes, sessionId, now);
    if (command !== 'close' && command !== 'release-end') verifyLoop(repo, session);
    if (command === 'assignment-bind') return pinManagedAssignment(repo,state,session,options,now);
    if (command === 'guard-bind') return bindGuard(repo, session, options, now, state);
    if (command === 'check-write') {
      ownedPaths(repo, session, options.paths || []);
      return { allowed: true, session: sessionId, paths: options.paths };
    }
    if (command === 'check-changes') {
      if (session.guard) verifyGuard(repo, session, session.guard.mode, now);
      // A moving remote tip must not erase an experiment's original scope fence.
      const paths = changedPaths(repo, session.loop ? session.loop.baseline : session.base,
        session.loop || session.guard ? undefined : options.upstream);
      const preserved = preservedForeign(repo, session);
      const ownPaths = paths.filter(file => !preserved.has(file));
      if (ownPaths.length) ownedPaths(repo, session, ownPaths);
      return { allowed: true, session: sessionId, paths: ownPaths,
        preservedForeign: [...preserved], foreignOwnershipGranted: false };
    }
    if (command === 'handoff-file') {
      if (options.paths?.length !== 1) throw new Error('handoff requires exactly one file');
      const relative = safePath(repo, options.paths[0]);
      if (!session.scopes.includes(relative)) throw new Error('handoff requires an exact owned file scope, not a parent directory');
      if (session.scopes.length < 2) throw new Error('retain another scope or close the session through its normal lifecycle');
      const full = path.join(repo.root, relative);
      if (!fs.lstatSync(full).isFile()) throw new Error('handoff requires a regular file');
      const evidence = requireText(options.evidence, 'handoff evidence');
      const sha256 = require('node:crypto').createHash('sha256').update(fs.readFileSync(full)).digest('hex');
      const receipt = { owner: sessionId, path: relative, sha256, evidence, handedOffAt: now };
      session.scopes = session.scopes.filter(item => item !== relative);
      session.updatedAt = now;
      state.fileHandoffs = [...(state.fileHandoffs || []), receipt];
      return { ...receipt, releaseUnchanged: true, permissionGranted: false };
    }
    if (command === 'close') {
      if (state.release?.owner === sessionId) throw new Error('record release terminal status before closing session');
      session.state = 'closed'; session.updatedAt = now;
      return session;
    }
    if (command === 'release-acquire') {
      if (session.guard) verifyGuard(repo, session, session.guard.mode, now);
      if (state.release) throw new Error(`release owned by ${state.release.owner}; expiry never proves CI/deploy stopped`);
      const branch = requireText(options.branch, 'branch');
      git(repo.root, ['check-ref-format', `refs/heads/${branch}`]);
      const candidate = git(repo.root, ['rev-parse', 'HEAD']);
      if (options.candidate !== candidate) throw new Error('candidate must equal the current full HEAD SHA');
      if (options.upstream && options.upstream !== `refs/remotes/origin/${branch}`) throw new Error('upstream must match the release target branch');
      const candidateHistory = state.releases.filter(item => item.branch === branch && item.candidate === candidate);
      if (candidateHistory.some(item => item.outcome === 'completed')) throw new Error('candidate already released; do not duplicate CI for the same SHA');
      const previous = candidateHistory.filter(item => item.outcome !== 'aborted-before-push').at(-1);
      if (previous) {
        if (previous.outcome !== 'failed') throw new Error('candidate already released; do not duplicate CI for the same SHA');
        requireText(options.retryEvidence, 'retry-evidence for unchanged failed candidate');
      }
      const paths = changedPaths(repo, session.loop ? session.loop.baseline : session.base,
        session.loop || session.guard ? undefined : options.upstream);
      if (paths.length) ownedPaths(repo, session, paths);
      if (git(repo.root, ['status', '--porcelain'])) throw new Error('release requires a clean worktree');
      const publication = publicationReceipt(repo, session, branch, candidate, options);
      const actionsBudget = actionsBudgetReceipt(options, now);
      state.release = { owner: sessionId, branch, candidate, actionsBudget, publication,
        retryEvidence: previous?.outcome === 'failed' ? options.retryEvidence : null,
        expiresAt: expiry(options.ttl, now) };
      return state.release;
    }
    const release = state.release;
    if (!release || release.owner !== sessionId) throw new Error('session does not own the release');
    if (command === 'release-end') {
      if (!['completed', 'failed', 'superseded', 'aborted-before-push'].includes(options.outcome)) throw new Error('terminal --outcome required');
      state.releases.push({ ...release, outcome: options.outcome, evidence: requireText(options.evidence, 'terminal evidence'), endedAt: now });
      state.release = null;
      return state.releases.at(-1);
    }
    if (command === 'release-renew') {
      release.expiresAt = expiry(options.ttl, now);
      return release;
    }
    if (command === 'check-release') {
      if (!release.actionsBudget) throw new Error('release lacks Actions budget receipt; end or re-acquire with a fresh receipt');
      if (release.expiresAt <= now) throw new Error('release lease expired; inspect bound runs before renewal');
      if (options.branch !== release.branch || options.candidate !== release.candidate
          || git(repo.root, ['rev-parse', 'HEAD']) !== release.candidate) throw new Error('release branch/candidate mismatch; never chase the latest shared tip');
      if (git(repo.root, ['status', '--porcelain'])) throw new Error('release worktree changed after acquisition');
      verifyPublication(repo, session, release);
      return { allowed: true, ...release, approvalRequired: true };
    }
    throw new Error(`unknown session command: ${command}`);
  });
}
module.exports = { execute, checkSession, repository, overlaps, scope, normalizeToolPath, patchPaths, typedAction, validateGuard, goalReference, assignmentReference };
