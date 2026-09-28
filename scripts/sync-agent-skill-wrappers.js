#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { behaviorFailures } = require('./lib/skill-behavior');

const root = path.resolve(__dirname, '..');
const wrappersRoot = path.join(root, '.agents', 'skills');
const check = process.argv.includes('--check');
const forced = new Set(['tdd-workflow', 'verification-loop']);
const personalRoot = 'C:\\Users\\adelm\\SeaBridgeAI\\everything-claude-code\\';

function normalizedCanonicalPointers(name, content) {
  return content
    .replace(
      personalRoot + 'vendor\\superpowers\\skills\\' + name + '\\SKILL.md',
      '[vendor/superpowers/skills/' + name + '/SKILL.md](../../vendor/superpowers/skills/' + name + '/SKILL.md)',
    )
    .replace(
      personalRoot + 'skills\\sea-senior-dev-workflow\\SKILL.md',
      '[skills/sea-senior-dev-workflow/SKILL.md](../sea-senior-dev-workflow/SKILL.md)',
    )
    .replace(
      'This is a local wrapper only. Follow the upstream skill body at the path above, with these SeaBridgeAI overrides:',
      'This is a local wrapper only. Follow the upstream skill body at the relative path above. If the submodule file is unavailable, do not install or fetch it; use the closest maintained SeaBridgeAI/ECC workflow and report that the optional upstream methodology was unavailable. Apply these SeaBridgeAI overrides:',
    );
}

function frontmatter(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error('Canonical skill lacks frontmatter: ' + path.relative(root, file));
  return yaml.load(match[1]);
}

function expectedWrapper(name, canonical) {
  const meta = frontmatter(canonical);
  if (!meta || typeof meta.description !== 'string' || !meta.description.trim()) {
    throw new Error('Canonical skill lacks a usable description: ' + path.relative(root, canonical));
  }
  return [
    '---',
    'name: ' + name,
    'description: ' + JSON.stringify(meta.description.trim()),
    '---',
    '',
    '# ' + name,
    '',
    'Load and follow the canonical skill body at',
    '[skills/' + name + '/SKILL.md](../../../skills/' + name + '/SKILL.md).',
    'Resolve this path relative to this wrapper so worktrees and plugin installs',
    'use their own checked-out version. Do not copy or fork behavior here.',
    '',
  ].join('\n');
}

let checked = 0;
let drift = false;
for (const entry of fs.readdirSync(wrappersRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const wrapper = path.join(wrappersRoot, entry.name, 'SKILL.md');
  const canonical = path.join(root, 'skills', entry.name, 'SKILL.md');
  if (!fs.existsSync(wrapper) || !fs.existsSync(canonical)) continue;
  const canonicalCurrent = fs.readFileSync(canonical, 'utf8');
  const behaviorDrift = behaviorFailures(entry.name, canonicalCurrent);
  if (behaviorDrift.length > 0) {
    drift = true;
    for (const failure of behaviorDrift) {
      console.error('[agent-skill-wrappers] behavior drift: ' + path.relative(root, canonical) + ': ' + failure);
    }
  }
  const canonicalExpected = normalizedCanonicalPointers(entry.name, canonicalCurrent);
  if (canonicalExpected !== canonicalCurrent) {
    drift = true;
    if (!check) fs.writeFileSync(canonical, canonicalExpected, 'utf8');
    else console.error('[agent-skill-wrappers] absolute canonical pointer: ' + path.relative(root, canonical));
  }
  const current = fs.readFileSync(wrapper, 'utf8').replace(/\r\n/g, '\n');
  const isPointer = current.includes('Canonical skill:')
    || current.includes('Use this wrapper only for skill discovery')
    || current.includes('Canonical upstream Superpowers skill:')
    || current.includes('Load and follow the canonical skill body at');
  if (!isPointer && !forced.has(entry.name)) continue;
  checked += 1;
  const expected = expectedWrapper(entry.name, canonical);
  if (current === expected) continue;
  drift = true;
  if (!check) fs.writeFileSync(wrapper, expected, 'utf8');
  else console.error('[agent-skill-wrappers] drift: ' + path.relative(root, wrapper));
}

if (check && drift) process.exit(1);
console.log('[agent-skill-wrappers] ' + (check ? 'check passed' : 'synchronized') + ' (' + checked + ' wrappers)');
