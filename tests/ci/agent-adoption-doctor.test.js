'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { inspect } = require('../../scripts/agent-adoption-doctor');

const root = path.resolve(__dirname, '../..');
const baseline = inspect();
assert.equal(baseline.adapterCount, 18);
assert.equal(baseline.checkedCount, 18);
assert.equal(baseline.registryIssues.length, 0);
assert.equal(baseline.ready, true, JSON.stringify(baseline.runtimes.filter(row => !row.ready)));
assert.ok(baseline.runtimes.every(row => row.liveEnforcementProven === false));
assert.equal(baseline.runtimes.find(row => row.id === 'copilot').status, 'instruction-only');

const project = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-adoption-'));
try {
  for (const relative of ['AGENTS.md', 'CLAUDE.md', 'GEMINI.md', '.clinerules']) {
    const target = path.join(project, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, relative), target);
  }
  assert.equal(inspect({ projectRoot: project, runtime: 'claude' }).ready, true);
  fs.writeFileSync(path.join(project, 'CLAUDE.md'), '# no import\n');
  const brokenImport = inspect({ projectRoot: project, runtime: 'claude' });
  assert.equal(brokenImport.ready, false);
  assert.ok(brokenImport.runtimes[0].issues.some(issue => issue.includes('broken import')));

  fs.writeFileSync(path.join(project, 'CLAUDE.md'), fs.readFileSync(path.join(root, 'CLAUDE.md')));
  fs.writeFileSync(path.join(project, 'AGENTS.md'), '# stale policy\n');
  const stale = inspect({ projectRoot: project, runtime: 'codex' });
  assert.equal(stale.ready, false);
  assert.ok(stale.runtimes[0].issues.some(issue => issue.includes('goal-runtime admit')));
  assert.ok(stale.runtimes[0].issues.some(issue => issue.includes('session register')));

  const embedded = inspect({ projectRoot: project, runtime: 'cline' });
  assert.equal(embedded.ready, true);
  fs.writeFileSync(path.join(project, '.clinerules'), '# stale embedded policy\n');
  assert.equal(inspect({ projectRoot: project, runtime: 'cline' }).ready, false);
  assert.throws(() => inspect({ runtime: 'nonexistent' }), /unknown runtime/);
} finally {
  fs.rmSync(project, { recursive: true, force: true });
}

console.log('agent adoption doctor: 15 checks passed');
