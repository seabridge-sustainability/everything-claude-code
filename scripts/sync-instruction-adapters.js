#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const { expandImports } = require('./check-instruction-stack');
const ROOT = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');
// Compatibility adapters carry only a reference. Never generate policy copies.
const outputs = {};
for (const relative of ['.github/copilot-instructions.md', '.agents/rules/seabridge-agent-baseline.md', '.clinerules']) {
  const target = path.relative(path.dirname(path.join(ROOT, relative)), path.join(ROOT, '..', 'manageesg-backend', 'AGENTS.md')).replace(/\\/g, '/');
  outputs[relative] = `# SeaBridgeAI core instruction loader\n\nSYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n\n<!-- SEABRIDGE_CORE_ENTRY: ${target} -->\n\nRead and follow \`${target}\` and its shared system import before working.\nThis existing file is a loading adapter only. It defines no independent policy.\n`;
}
const resolved = expandImports(path.join(ROOT, 'AGENTS.md'));
if (resolved.missing.length) throw new Error('Central policy unavailable: ' + resolved.missing.join(', '));
const contract = resolved.text;
let drift = false;
for (const [relative, expected] of Object.entries(outputs)) {
  const file = path.join(ROOT, relative);
  const actual = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') : null;
  if (actual === expected) continue;
  drift = true;
  if (WRITE) {
    if (!fs.existsSync(file)) throw new Error('Refusing to create another instruction file: ' + relative);
    fs.writeFileSync(file, expected, 'utf8');
    console.log('WRITE loader ' + relative);
  } else console.error('DRIFT loader ' + relative);
}
if (!WRITE && drift) process.exitCode = 1;
if (!drift) console.log('instruction adapters: central references synchronized');
module.exports = { outputs, contract };
