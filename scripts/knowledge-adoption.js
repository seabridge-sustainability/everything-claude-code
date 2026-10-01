#!/usr/bin/env node
'use strict';

// Read-only inspection of the *active* local knowledge integration. A source
// template or green CI run does not prove that a checkout loads that template.
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { graphBoundaryStatus } = require('./knowledge-freshness');
const { doctorMemoryVault, resolveVaultRoots } = require('./lib/memory-vault');
const { isWithinRoot, realpathNearestExisting } = require('./lib/path-safety');

const TEMPLATE = path.join(__dirname, 'git-hooks', 'graphify-rebuild.sh');
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

function git(repo, args) {
  return execFileSync('git', ['-C', repo, ...args], {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 5000,
  }).trim();
}

function within(root, candidate) {
  return isWithinRoot(candidate, root);
}

function commonGitRoot(repo) {
  const configured = path.resolve(repo, git(repo, ['rev-parse', '--git-common-dir']));
  const canonical = fs.existsSync(configured) ? fs.realpathSync(configured) : configured;
  return process.platform === 'win32' ? canonical.toLowerCase() : canonical;
}

function inspectHook(repo, name, templateHash, { gitRun = git, fileSystem = fs } = {}) {
  let configuredPath = '';
  try { configuredPath = gitRun(repo, ['config', '--get', 'core.hooksPath']); } catch { /* Git default */ }
  let hookPath;
  try {
    const raw = gitRun(repo, ['rev-parse', '--git-path', `hooks/${name}`]);
    hookPath = path.resolve(repo, raw);
  } catch {
    return { status: 'unavailable' };
  }
  if (!fileSystem.existsSync(hookPath)) {
    return { status: /(^|[/\\])disabled-hooks([/\\]|$)/i.test(configuredPath) ? 'disabled' : 'missing' };
  }
  try {
    const content = fileSystem.readFileSync(hookPath);
    if (!content.includes(Buffer.from('# graphify-hook-start'))
      || !content.includes(Buffer.from('# graphify-hook-end'))) {
      return { status: 'other-hook' };
    }
    if (digest(content) !== templateHash) return { status: 'drifted' };
    if (process.platform !== 'win32' && (fileSystem.statSync(hookPath).mode & 0o111) === 0) {
      return { status: 'non-executable' };
    }
    return { status: 'current' };
  } catch {
    return { status: 'unreadable' };
  }
}

function inspectMemory(repos, env = process.env, resolveRoots = resolveVaultRoots) {
  if (!env.ECC_MEMORY_PROJECT_ROOT) return { status: 'unconfigured' };
  try {
    if (!path.isAbsolute(env.ECC_MEMORY_PROJECT_ROOT)) return { status: 'relative-root' };
    if (env.ECC_MEMORY_USER_ROOT && !path.isAbsolute(env.ECC_MEMORY_USER_ROOT)) {
      return { status: 'relative-user-root' };
    }
    const roots = repos.map(repo => resolveRoots({ cwd: repo, env }));
    const base = realpathNearestExisting(env.ECC_MEMORY_PROJECT_ROOT);
    if (repos.some(repo => within(repo, base))) return { status: 'inside-source-repo' };
    if (roots.some(root => root.team !== roots[0].team)) return { status: 'inconsistent-team-root' };
    if (roots.some(root => repos.some(repo => within(repo, realpathNearestExisting(root.user))))) {
      return { status: 'user-memory-inside-source-repo' };
    }
    for (let i = 0; i < repos.length; i++) {
      for (let j = i + 1; j < repos.length; j++) {
        const sameGitRoot = commonGitRoot(repos[i]) === commonGitRoot(repos[j]);
        if (!sameGitRoot && roots[i].project === roots[j].project) {
          return { status: 'project-scope-collision' };
        }
      }
    }
    return { status: 'configured-and-isolated' };
  } catch {
    return { status: 'invalid-or-unreadable' };
  }
}

function inspectMemoryContent(repos, env = process.env, resolveRoots = resolveVaultRoots, doctor = doctorMemoryVault) {
  if (!env.ECC_MEMORY_PROJECT_ROOT) return { status: 'unconfigured', count: 0 };
  try {
    let count = 0;
    for (const repo of repos) {
      const roots = resolveRoots({ cwd: repo, env });
      const result = doctor({ roots, scopes: ['project'] });
      if (!result.ok) return { status: 'invalid-or-incomplete', count };
      count += result.memoryCount;
    }
    return { status: count > 0 ? 'populated' : 'empty', count };
  } catch {
    return { status: 'invalid-or-incomplete', count: 0 };
  }
}

function inspect(repos, options = {}) {
  try {
    if (repos.length < 2 || new Set(repos.map(repo => commonGitRoot(path.resolve(repo)))).size < 2) {
      return { status: 'incomplete-scope', repos: [], memory: { status: 'not-checked' } };
    }
  } catch {
    return { status: 'invalid-repository', repos: [], memory: { status: 'not-checked' } };
  }
  const templateHash = digest((options.fileSystem || fs).readFileSync(options.template || TEMPLATE));
  const rows = repos.map(input => {
    const repo = path.resolve(input);
    let boundary;
    try { boundary = (options.boundary || graphBoundaryStatus)(repo).safe ? 'safe' : 'unsafe'; }
    catch { boundary = 'unavailable'; }
    return {
      repository: path.basename(repo),
      boundary,
      postCommit: inspectHook(repo, 'post-commit', templateHash, options),
      postCheckout: inspectHook(repo, 'post-checkout', templateHash, options),
    };
  });
  const memory = inspectMemory(repos.map(repo => path.resolve(repo)), options.env || process.env, options.resolveRoots);
  const content = memory.status === 'configured-and-isolated'
    ? inspectMemoryContent(repos.map(repo => path.resolve(repo)), options.env || process.env,
      options.resolveRoots, options.doctor)
    : { status: 'not-checked', count: 0 };
  const wiringReady = rows.every(row => row.boundary === 'safe'
    && row.postCommit.status === 'current' && row.postCheckout.status === 'current')
    && memory.status === 'configured-and-isolated';
  return {
    status: !wiringReady ? 'not-configured'
      : content.status === 'populated' ? 'configured'
        : content.status === 'empty' ? 'configured-but-empty' : 'invalid-or-incomplete',
    repos: rows,
    memory,
    content,
  };
}

function main(args = process.argv.slice(2)) {
  const repos = args.filter(arg => arg !== '--json');
  if (!repos.length || args.some(arg => arg.startsWith('--') && arg !== '--json')) {
    process.stderr.write('usage: knowledge-adoption.js <repo>... [--json]\n');
    return 2;
  }
  const result = inspect(repos);
  process.stdout.write(`${JSON.stringify(result, null, args.includes('--json') ? 2 : 0)}\n`);
  return result.status === 'configured' ? 0 : 1;
}

if (require.main === module) process.exitCode = main();
module.exports = { inspect, inspectHook, inspectMemory, inspectMemoryContent, main, within };
