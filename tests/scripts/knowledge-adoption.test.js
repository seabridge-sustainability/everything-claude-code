'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { inspect, inspectHook, inspectMemory, within } = require('../../scripts/knowledge-adoption');
const { test, summary } = require('../lib/helpers/mini-test-runner');

let passed = 0; let failed = 0;
const check = (name, fn) => { if (test(name, fn)) passed++; else failed++; };
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-knowledge-adoption-'));
const repos = [path.join(fixture, 'repo-a'), path.join(fixture, 'repo-b')];
for (const repo of repos) {
  fs.mkdirSync(repo);
  execFileSync('git', ['-C', repo, 'init', '-q'], { stdio: 'ignore' });
}

try {
  check('path containment distinguishes a source repo from a private sibling', () => {
    assert.equal(within(repos[0], path.join(repos[0], '.ecc', 'memory')), true);
    assert.equal(within(repos[0], path.join(fixture, 'private-memory')), false);
  });

  check('path containment resolves a symlinked repository root', () => {
    const alias = path.join(fixture, 'repo-alias');
    try { fs.symlinkSync(repos[0], alias, process.platform === 'win32' ? 'junction' : 'dir'); }
    catch (error) {
      if (process.platform === 'win32' && error.code === 'EPERM') return;
      throw error;
    }
    assert.equal(within(alias, path.join(repos[0], '.ecc', 'memory')), true);
  });

  check('an absent override is reported as unconfigured, not adopted', () => {
    assert.deepEqual(inspectMemory(repos, {}), { status: 'unconfigured' });
  });

  check('a private override gives distinct project scopes and one team scope', () => {
    const env = { ECC_MEMORY_PROJECT_ROOT: path.join(fixture, 'private-memory') };
    assert.deepEqual(inspectMemory(repos, env), { status: 'configured-and-isolated' });
  });

  check('relative or source-contained memory roots cannot count as adoption', () => {
    assert.equal(inspectMemory(repos, { ECC_MEMORY_PROJECT_ROOT: 'memory' }).status, 'relative-root');
    assert.equal(inspectMemory(repos, { ECC_MEMORY_PROJECT_ROOT: path.join(repos[0], 'memory') }).status,
      'inside-source-repo');
    assert.equal(inspectMemory(repos, {
      ECC_MEMORY_PROJECT_ROOT: path.join(fixture, 'private-memory'),
      ECC_MEMORY_USER_ROOT: path.join(repos[0], '.ecc', 'user-memory'),
    }).status, 'user-memory-inside-source-repo');
    assert.equal(inspectMemory(repos, {
      ECC_MEMORY_PROJECT_ROOT: path.join(fixture, 'private-memory'),
      ECC_MEMORY_USER_ROOT: 'relative-user-memory',
    }).status, 'relative-user-root');
  });

  check('two different Git repos sharing one project scope fail closed', () => {
    const env = { ECC_MEMORY_PROJECT_ROOT: path.join(fixture, 'private-memory') };
    const fakeRoots = () => ({
      team: 'shared-team', project: 'colliding-project', user: path.join(fixture, 'private-user-memory'),
    });
    assert.equal(inspectMemory(repos, env, fakeRoots).status, 'project-scope-collision');
  });

  check('active hook identity is exact; a marker-only old hook is drifted', () => {
    const hook = path.join(fixture, 'post-commit');
    const current = Buffer.from('# graphify-hook-start\nnew\n# graphify-hook-end\n');
    const old = Buffer.from('# graphify-hook-start\nold\n# graphify-hook-end\n');
    const hash = require('node:crypto').createHash('sha256').update(current).digest('hex');
    const gitRun = (_repo, args) => args[0] === 'config' ? '' : hook;
    fs.writeFileSync(hook, current);
    if (process.platform !== 'win32') fs.chmodSync(hook, 0o755);
    assert.equal(inspectHook(repos[0], 'post-commit', hash, { gitRun }).status, 'current');
    if (process.platform !== 'win32') {
      fs.chmodSync(hook, 0o644);
      assert.equal(inspectHook(repos[0], 'post-commit', hash, { gitRun }).status, 'non-executable');
      fs.chmodSync(hook, 0o755);
    }
    fs.writeFileSync(hook, old);
    assert.equal(inspectHook(repos[0], 'post-commit', hash, { gitRun }).status, 'drifted');
    fs.writeFileSync(hook, 'unrelated hook');
    assert.equal(inspectHook(repos[0], 'post-commit', hash, { gitRun }).status, 'other-hook');
  });

  check('an intentionally disabled hook is distinguished from a missing hook', () => {
    const gitRun = (_repo, args) => args[0] === 'config'
      ? '.git/disabled-hooks' : path.join(fixture, 'absent-post-commit');
    assert.equal(inspectHook(repos[0], 'post-commit', 'abc', { gitRun }).status, 'disabled');
    const defaultGit = (_repo, args) => args[0] === 'config'
      ? '' : path.join(fixture, 'absent-post-commit');
    assert.equal(inspectHook(repos[0], 'post-commit', 'abc', { gitRun: defaultGit }).status, 'missing');
  });

  check('the real read-only audit requires both exact hooks and isolated memory', () => {
    const template = path.join(fixture, 'template.sh');
    const content = '#!/bin/bash\n# graphify-hook-start\nnew\n# graphify-hook-end\n';
    fs.writeFileSync(template, content);
    for (const repo of repos) {
      for (const name of ['post-commit', 'post-checkout']) {
        const raw = execFileSync('git', ['-C', repo, 'rev-parse', '--git-path', `hooks/${name}`],
          { encoding: 'utf8' }).trim();
        fs.writeFileSync(path.resolve(repo, raw), content);
        if (process.platform !== 'win32') fs.chmodSync(path.resolve(repo, raw), 0o755);
      }
    }
    const options = {
      template,
      boundary: () => ({ safe: true }),
      env: { ECC_MEMORY_PROJECT_ROOT: path.join(fixture, 'private-memory') },
    };
    assert.equal(inspect(repos, options).status, 'configured');
    assert.equal(inspect([repos[0]], options).status, 'incomplete-scope');
    assert.equal(inspect([repos[0], repos[0]], options).status, 'incomplete-scope');
    const raw = execFileSync('git', ['-C', repos[1], 'rev-parse', '--git-path', 'hooks/post-commit'],
      { encoding: 'utf8' }).trim();
    fs.writeFileSync(path.resolve(repos[1], raw), content.replace('new', 'old'));
    assert.equal(inspect(repos, options).status, 'not-configured');
  });
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}

summary(passed, failed);
