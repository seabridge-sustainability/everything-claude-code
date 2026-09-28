'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..', '..');
const script = path.join(root, 'scripts', 'sync-safety-rule.ps1');
const source = fs.readFileSync(script, 'utf8');

assert.match(source, /missing root/);
assert.match(source, /missing AGENTS\.md/);
assert.match(source, /missing safety markers/);
assert.match(source, /\$eccRoot = Split-Path -Parent \$PSScriptRoot/);
assert.match(source, /Join-Path \$workspaceRoot "manageesg-backend"/);

if (process.platform === 'win32') {
  const missing = path.join(os.tmpdir(), `ecc-missing-safety-root-${process.pid}`);
  const result = spawnSync('powershell', [
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-File', script,
    '-Check',
    '-Roots', missing,
    '-CanonicalFile', path.join(root, 'protocols', 'SAFETY_AUTHORIZATION_RULE.md')
  ], { encoding: 'utf8', windowsHide: true });
  assert.notStrictEqual(result.status, 0, 'missing root must fail closed');
  assert.match(`${result.stdout}\n${result.stderr}`, /PREFLIGHT FAIL/);

  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-safety-worktree-'));
  try {
    const fixtureEcc = path.join(fixture, 'ecc-worktree');
    const fixtureScript = path.join(fixtureEcc, 'scripts', 'sync-safety-rule.ps1');
    const canonical = fs.readFileSync(path.join(root, 'protocols', 'SAFETY_AUTHORIZATION_RULE.md'), 'utf8');
    fs.mkdirSync(path.dirname(fixtureScript), { recursive: true });
    fs.mkdirSync(path.join(fixtureEcc, 'protocols'), { recursive: true });
    fs.copyFileSync(script, fixtureScript);
    fs.writeFileSync(path.join(fixtureEcc, 'protocols', 'SAFETY_AUTHORIZATION_RULE.md'), canonical);

    const repos = ['ecc-worktree', 'manageesg-backend', 'manageesg-frontend', 'openseabri', 'autoresearch', 'climada-stack', '_upstream'];
    for (const repo of repos) {
      const repoRoot = path.join(fixture, repo);
      fs.mkdirSync(repoRoot, { recursive: true });
      fs.writeFileSync(path.join(repoRoot, 'AGENTS.md'), canonical);
    }
    const worktreeAgents = path.join(fixtureEcc, 'AGENTS.md');
    fs.writeFileSync(worktreeAgents, canonical.replace('## Safety And Authorization Rule', '## Safety Rule Drift'));
    const unrelated = path.join(fixture, 'unrelated-main');
    fs.mkdirSync(unrelated);
    fs.writeFileSync(path.join(unrelated, 'AGENTS.md'), 'must not be scanned');

    const isolated = spawnSync('powershell', [
      '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', fixtureScript, '-Check'
    ], { encoding: 'utf8', windowsHide: true });
    const isolatedOutput = `${isolated.stdout}\n${isolated.stderr}`;
    assert.notStrictEqual(isolated.status, 0, 'the copied worktree must be scanned by default');
    assert.match(isolatedOutput, /ecc-worktree[\\/]AGENTS\.md/);
    assert.doesNotMatch(isolatedOutput, /unrelated-main/);
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
}

console.log('safety sync coverage: 9 checks passed');
