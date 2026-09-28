#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cursorDir = path.join(root, '.cursor', 'rules');
const check = process.argv.includes('--check');
const mappings = {
  agents: 'Agent delegation and orchestration; load when coordinating subagents.',
  'coding-style': 'Language-neutral coding style; load when editing source code.',
  'development-workflow': 'Risk-scaled implementation workflow; load for non-trivial code changes.',
  'git-workflow': 'Git and delivery conventions; load for branch, commit, merge, or push work.',
  hooks: 'Hook design and lifecycle guidance; load when editing agent hooks.',
  patterns: 'Local-first architecture patterns; load for a material design decision.',
  performance: 'Evidence-driven performance and context guidance; load for optimization work.',
  security: 'Risk-scoped security guidance; load for security-sensitive boundaries.',
  testing: 'Risk-scaled test selection; load when behavior or test code changes.',
};

function stripSafety(text) {
  return text
    .replace(/<!-- SEABRIDGE_SAFETY_RULE_START -->[\s\S]*?<!-- SEABRIDGE_SAFETY_RULE_END -->\s*/g, '')
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .trim();
}

const expected = new Map();
for (const [name, description] of Object.entries(mappings)) {
  const source = fs.readFileSync(path.join(root, 'rules', 'common', name + '.md'), 'utf8');
  expected.set(
    'common-' + name + '.md',
    '---\ndescription: "' + description + '"\nalwaysApply: false\n---\n' + stripSafety(source) + '\n',
  );
}

let drift = false;
const legacyBase = path.join(cursorDir, 'sea-base.md');
if (fs.existsSync(legacyBase)) {
  drift = true;
  if (!check) fs.unlinkSync(legacyBase);
  else console.error('[cursor-rules] redundant native-AGENTS carrier: ' + path.relative(root, legacyBase));
}
for (const [name, content] of expected) {
  const target = path.join(cursorDir, name);
  const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n') : null;
  if (current === content) continue;
  drift = true;
  if (!check) fs.writeFileSync(target, content, 'utf8');
  else console.error('[cursor-rules] drift: ' + path.relative(root, target));
}

if (check && drift) process.exit(1);
console.log('[cursor-rules] ' + (check ? 'check passed' : 'synchronized') + ' (' + expected.size + ' files)');
