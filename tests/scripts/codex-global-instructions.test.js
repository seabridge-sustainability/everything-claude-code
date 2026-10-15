'use strict';
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { render, check } = require('../../scripts/codex/global-agent-instructions');

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-global-loader-'));
try {
  const root = path.join(scratch, 'workspace', 'everything-claude-code');
  const central = path.join(scratch, 'workspace', 'manageesg-backend');
  const home = path.join(scratch, 'unrelated-home');
  fs.mkdirSync(path.join(root, '.codex'), { recursive: true });
  fs.mkdirSync(central, { recursive: true });
  fs.mkdirSync(home);
  const rootLoader = '<!-- SEABRIDGE_CORE_ENTRY: ../manageesg-backend/AGENTS.md -->';
  const supplement = '<!-- SEABRIDGE_CORE_ENTRY: ../../manageesg-backend/AGENTS.md -->';
  fs.writeFileSync(path.join(root, 'AGENTS.md'), rootLoader);
  fs.writeFileSync(path.join(root, '.codex/AGENTS.md'), supplement);
  fs.writeFileSync(path.join(central, 'AGENTS.md'), '@AGENTS_SYSTEM.md\n');
  const realPolicy = fs.readFileSync(path.resolve(__dirname, '../../../manageesg-backend/AGENTS_SYSTEM.md'), 'utf8');
  fs.writeFileSync(path.join(central, 'AGENTS_SYSTEM.md'), realPolicy);
  const installed = path.join(home, 'AGENTS.md');
  const output = render(root);
  assert.ok(output.includes(path.join(central, 'AGENTS.md').replaceAll('\\', '/')));
  assert.ok(output.includes('Only when working under'));
  assert.ok(output.includes('adds no policy outside that workspace'));
  assert.ok(!output.includes('SEABRIDGE_CORE_ENTRY:'));
  fs.writeFileSync(installed, `User instructions\n${output}`);
  assert.strictEqual(check(root, installed), true);
  fs.writeFileSync(installed, `${rootLoader}\n${supplement}`);
  assert.strictEqual(check(root, installed), false, 'Copied relative loaders are not global adoption');
  fs.writeFileSync(path.join(central, 'AGENTS_SYSTEM.md'), 'SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1');
  assert.throws(() => render(root), /incomplete/);
  fs.unlinkSync(path.join(central, 'AGENTS_SYSTEM.md'));
  assert.throws(() => render(root), /missing or incomplete/);
  fs.writeFileSync(path.join(root, 'AGENTS.md'), '# Generic ECC guidance');
  assert.throws(() => render(root), /Inconsistent/);
  fs.writeFileSync(path.join(root, '.codex/AGENTS.md'), '# Generic Codex guidance');
  assert.ok(render(root).includes('# Generic ECC guidance'));
  assert.ok(render(root).includes('# Generic Codex guidance'));
  console.log('Global loader: absolute source, workspace boundary, relative-copy/missing-policy negatives and generic compatibility passed (10 assertions).');
} finally {
  fs.rmSync(scratch, { recursive: true });
}
