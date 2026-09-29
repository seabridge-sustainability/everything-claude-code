/**
 * Tests for scripts/git-hooks/graphify-rebuild.sh
 *
 * Run with: node tests/scripts/graphify-git-hook.test.js
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const { test, banner, section, summary } = require('../lib/helpers/mini-test-runner');

let passed = 0;
let failed = 0;
const run = (name, fn) => { if (test(name, fn)) passed++; else failed++; };

const HOOK = path.resolve(__dirname, '../../scripts/git-hooks/graphify-rebuild.sh');
const BOUNDARY = '# SeaBridgeAI knowledge boundary (test)\ndocs/reports/\n';

banner('graphify git hook');

if (spawnSync('bash', ['--version']).status !== 0) {
  console.log('  (bash not available; skipped)');
  summary(passed, failed);
  process.exit(0);
}

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'graphify-hook-'));
const bin = path.join(temp, 'bin');
const marker = path.join(temp, 'calls.log');
const posix = file => file.replace(/\\/g, '/');
fs.mkdirSync(bin);

// Fake CLI: records `graphify <args>` as "cli <args>".
fs.writeFileSync(path.join(bin, 'graphify'), `#!/bin/bash\necho "cli $@" >> "${posix(marker)}"\n`, { mode: 0o755 });

// Fake interpreter: passes the import probe and records the rebuild call as
// "incremental <root> <changed files...>".
const fakePython = path.join(bin, 'fake-python');
fs.writeFileSync(fakePython, [
  '#!/bin/bash',
  'if [ "$2" = "import graphify.watch" ]; then exit 0; fi',
  'shift 2',
  `echo "incremental $@" >> "${posix(marker)}"`,
  '',
].join('\n'), { mode: 0o755 });

const env = {
  ...process.env,
  PATH: `${bin}${path.delimiter}${process.env.PATH}`,
  HOME: temp,
  GRAPHIFY_SKIP_HOOK: '',
  GRAPHIFY_PYTHON: posix(fakePython),
};

const git = (repo, args, extraEnv = {}) =>
  execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', env: { ...env, ...extraEnv } }).trim();

function makeRepo(name, ignore = BOUNDARY) {
  const repo = path.join(temp, name);
  fs.mkdirSync(repo, { recursive: true });
  git(repo, ['init', '-q', '-b', 'main']);
  for (const [key, value] of [['user.email', 't@example.com'], ['user.name', 'T'], ['commit.gpgsign', 'false'], ['core.autocrlf', 'false']]) {
    git(repo, ['config', key, value]);
  }
  fs.writeFileSync(path.join(repo, '.graphifyignore'), ignore);
  fs.writeFileSync(path.join(repo, 'README.md'), '# r\n');
  git(repo, ['add', '-A']);
  git(repo, ['commit', '-q', '-m', 'init']);
  for (const hook of ['post-commit', 'post-checkout']) {
    fs.copyFileSync(HOOK, path.join(repo, '.git', 'hooks', hook));
    fs.chmodSync(path.join(repo, '.git', 'hooks', hook), 0o755);
  }
  return repo;
}

function commitFile(repo, file, extraEnv) {
  fs.mkdirSync(path.dirname(path.join(repo, file)), { recursive: true });
  fs.appendFileSync(path.join(repo, file), `line ${Date.now()}\n`);
  git(repo, ['add', file], extraEnv);
  git(repo, ['commit', '-q', '-m', `edit ${file}`], extraEnv);
}

function calls(waitMs) {
  const until = Date.now() + waitMs;
  while (Date.now() < until) {
    if (fs.existsSync(marker) && fs.readFileSync(marker, 'utf8').trim()) break;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }
  const text = fs.existsSync(marker) ? fs.readFileSync(marker, 'utf8').trim() : '';
  fs.rmSync(marker, { force: true });
  return text ? text.split('\n') : [];
}

try {
  section('post-commit:');
  const repo = makeRepo('main');

  run('a code commit in the main checkout rebuilds only the changed files', () => {
    commitFile(repo, 'src/app.py');
    const got = calls(8000);
    assert.strictEqual(got.length, 1, `expected one call, got ${JSON.stringify(got)}`);
    assert.match(got[0], /^incremental \S+ src\/app\.py$/);
  });

  run('without the graphify interpreter it falls back to graphify update', () => {
    commitFile(repo, 'src/app.py', { GRAPHIFY_PYTHON: posix(path.join(temp, 'missing-python')) });
    const got = calls(8000);
    assert.strictEqual(got.length, 1, `expected one call, got ${JSON.stringify(got)}`);
    assert.match(got[0], /^cli update /);
  });

  run('a docs-only commit does not rebuild', () => {
    commitFile(repo, 'docs/note.md');
    assert.deepStrictEqual(calls(1500), []);
  });

  run('GRAPHIFY_SKIP_HOOK=1 skips the rebuild', () => {
    commitFile(repo, 'src/app.py', { GRAPHIFY_SKIP_HOOK: '1' });
    assert.deepStrictEqual(calls(1500), []);
  });

  run('a commit in a linked worktree never rebuilds', () => {
    const worktree = path.join(temp, 'linked');
    git(repo, ['worktree', 'add', '-q', '--detach', worktree]);
    calls(1500);
    commitFile(worktree, 'src/other.ts');
    assert.deepStrictEqual(calls(1500), []);
  });

  run('fails closed when .graphifyignore lacks the knowledge boundary', () => {
    const leaky = makeRepo('leaky', 'node_modules/\n');
    commitFile(leaky, 'src/app.py');
    assert.deepStrictEqual(calls(1500), []);
  });

  section('post-checkout:');

  run('a branch switch that moves HEAD rebuilds everything; a file checkout does not', () => {
    git(repo, ['branch', '-q', 'feature', 'HEAD~3']);
    calls(500);
    git(repo, ['checkout', '-q', 'feature']);
    const got = calls(8000);
    assert.strictEqual(got.length, 1, `expected one call, got ${JSON.stringify(got)}`);
    assert.match(got[0], /^incremental \S+$/, 'a branch switch passes no file list');
    git(repo, ['checkout', '-q', 'main', '--', 'src/app.py']);
    assert.deepStrictEqual(calls(1500), []);
  });
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

summary(passed, failed);
