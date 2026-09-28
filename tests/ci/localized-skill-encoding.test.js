#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..', '..');
const result = spawnSync(process.execPath, [
  path.join(root, 'scripts', 'repair-localized-skill-encoding.js'),
  '--check',
], { cwd: root, encoding: 'utf8' });

assert.strictEqual(result.status, 0, result.stdout + result.stderr);

let checked = 0;
for (const locale of fs.readdirSync(path.join(root, 'docs'), { withFileTypes: true })) {
  const skills = path.join(root, 'docs', locale.name, 'skills');
  if (!locale.isDirectory() || !fs.existsSync(skills)) continue;
  for (const entry of fs.readdirSync(skills, { withFileTypes: true })) {
    const file = path.join(skills, entry.name, 'SKILL.md');
    if (!entry.isDirectory() || !fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    assert.match(text, /^---\r?\n/, `${path.relative(root, file)} must begin with frontmatter`);
    const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(frontmatter, `${path.relative(root, file)} has malformed frontmatter`);
    assert.doesNotMatch(frontmatter[1], /[\u0080-\u009f]/u,
      `${path.relative(root, file)} frontmatter contains C1 controls`);
    checked += 1;
  }
}

assert.ok(checked > 100, 'expected to validate the localized skill catalog');
console.log(`localized skill encoding: ${checked} files passed`);
