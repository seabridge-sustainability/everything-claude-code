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
assert.match(source, /missing central safety markers/);
assert.match(source, /expandImports/);
assert.match(source, /\$eccRoot = Split-Path -Parent \$PSScriptRoot/);
assert.match(source, /Join-Path \$workspaceRoot "manageesg-backend\\AGENTS_SYSTEM\.md"/);
assert.doesNotMatch(source, /WriteAllText|WriteAllBytes|Set-Content|Copy-Item/);

if (process.platform === 'win32') {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-safety-loader-'));
  try {
    const ecc = path.join(fixture, 'ecc-worktree');
    const backend = path.join(fixture, 'manageesg-backend');
    const copiedScript = path.join(ecc, 'scripts', 'sync-safety-rule.ps1');
    fs.mkdirSync(path.dirname(copiedScript), { recursive: true });
    fs.mkdirSync(backend);
    fs.copyFileSync(script, copiedScript);
    fs.copyFileSync(path.join(root, 'scripts', 'check-instruction-stack.js'), path.join(ecc, 'scripts', 'check-instruction-stack.js'));
    const canonical = path.join(backend, 'AGENTS_SYSTEM.md');
    fs.writeFileSync(canonical, require('../../scripts/check-instruction-stack').canonicalBlocks(root)[0]);
    const central = path.join(backend, 'AGENTS.md');
    fs.writeFileSync(central, '@AGENTS_SYSTEM.md\n');
    const entry = path.join(ecc, 'AGENTS.md');
    const loader = '<!-- SEABRIDGE_CORE_ENTRY: ../manageesg-backend/AGENTS.md -->\n';
    fs.writeFileSync(entry, loader);
    function check(roots = ecc) {
      const result = spawnSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', copiedScript, '-Check', '-Roots', roots],
        { encoding: 'utf8', windowsHide: true });
      return { status: result.status, output: String(result.stdout) + '\n' + String(result.stderr) };
    }
    const passed = check();
    assert.strictEqual(passed.status, 0, passed.output);
    assert.strictEqual(fs.readFileSync(entry, 'utf8'), loader, 'validation must not stamp policy into a loader');
    assert.notStrictEqual(check(path.join(fixture, 'missing')).status, 0);
    fs.unlinkSync(entry);
    assert.match(check().output, /missing AGENTS\.md/);
    fs.writeFileSync(entry, '<!-- SEABRIDGE_CORE_ENTRY: ../missing/AGENTS.md -->\n');
    assert.match(check().output, /missing policy import/);
    fs.writeFileSync(entry, loader);
    fs.writeFileSync(central, fs.readFileSync(canonical, 'utf8').replace('**Ask first:**', '**Removed gate:**'));
    assert.match(check().output, /drifted effective safety/);
    fs.writeFileSync(canonical, 'no safety block');
    assert.match(check().output, /missing central safety markers/);
  } finally { fs.rmSync(fixture, { recursive: true, force: true }); }
}
console.log('safety sync coverage: loader/import validation and non-writing checks passed');
