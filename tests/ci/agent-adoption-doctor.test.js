'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { inspect, inspectInstallation } = require('../../scripts/agent-adoption-doctor');

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

  const home = path.join(project, 'home');
  const adapterRoot = path.join(project, 'adapter');
  const plugin = path.join(adapterRoot, '.opencode', 'dist', 'plugins', 'index.js');
  fs.mkdirSync(path.dirname(plugin), { recursive: true });
  fs.writeFileSync(plugin, '// offline plugin fixture\n');
  for (const relative of ['.codex/AGENTS.md', '.claude/CLAUDE.md', '.gemini/GEMINI.md',
    '.config/opencode/AGENTS.md']) {
    const target = path.join(home, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `Use ${adapterRoot} for SeaBridgeAI.\n`);
  }
  fs.writeFileSync(path.join(home, '.config', 'opencode', 'opencode.jsonc'),
    JSON.stringify({ plugin: [`file:///${plugin.replace(/\\/g, '/')}`] }));
  const probe = command => { assert.equal(command, 'claude'); return ''; };
  const inactive = inspectInstallation({ adapterRoot, projectRoot: project, homeDir: home, probe });
  assert.equal(inactive.status, 'incomplete');
  assert.equal(inactive.runtimes.find(row => row.id === 'claude').gateConfigured, false);
  assert.equal(inactive.runtimes.find(row => row.id === 'opencode').status, 'plugin-configured-not-observed');
  fs.mkdirSync(path.join(project, '.claude'), { recursive: true });
  fs.writeFileSync(path.join(project, '.claude', 'settings.json'), JSON.stringify({ hooks: {
    UserPromptSubmit: [{ hooks: [{ command: 'node scripts/hooks/goal-runtime-gate.js claude admit' }] }],
    Stop: [{ hooks: [{ command: 'node scripts/hooks/goal-runtime-gate.js claude final' }] }],
  } }));
  const configured = inspectInstallation({ adapterRoot, projectRoot: project, homeDir: home, probe });
  assert.equal(configured.status, 'configured-not-observed');
  assert.equal(configured.activation, 'not-observed');
  assert.equal(configured.runtimes.find(row => row.id === 'claude').status, 'hook-configured-not-observed');
  fs.writeFileSync(path.join(project, '.claude', 'settings.json'), '{}\n');
  const unrelatedLoaded = () => `> ecc@local\n    Path: ${adapterRoot}\n    Status: disabled\n> other@local\n    Status: loaded\n`;
  assert.equal(inspectInstallation({ adapterRoot, projectRoot: project, homeDir: home,
    probe: unrelatedLoaded }).runtimes.find(row => row.id === 'claude').pluginLoaded, false);
  const eccLoaded = () => `> ecc@local\n    Path: ${adapterRoot}\n    Status: loaded\n`;
  assert.equal(inspectInstallation({ adapterRoot, projectRoot: project, homeDir: home,
    probe: eccLoaded }).runtimes.find(row => row.id === 'claude').pluginLoaded, true);
  fs.writeFileSync(path.join(home, '.codex', 'AGENTS.md'), 'old shared checkout\n');
  assert.equal(inspectInstallation({ adapterRoot, projectRoot: project, homeDir: home, probe }).status, 'incomplete');
} finally {
  fs.rmSync(project, { recursive: true, force: true });
}

console.log('agent adoption doctor: file and installation checks passed');
