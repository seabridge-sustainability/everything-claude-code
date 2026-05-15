#!/usr/bin/env node
/**
 * Prevent shipping user-specific absolute paths in public docs/skills/commands.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const TARGETS = [
  'README.md',
  'skills',
  'commands',
  'agents',
  'docs',
  '.opencode/commands',
];

const BLOCK_PATTERNS = [
  /\/Users\/[a-zA-Z0-9_-]+\//g,
  /C:\\Users\\[a-zA-Z0-9_-]+\\/gi,
];

const ALLOWED_WORKSPACE_PATTERNS = [
  /C:\\Users\\adelm\\/gi,
  /C:\/Users\/adelm\//gi,
  /\/c\/Users\/adelm\//g,
  /\/Users\/(you|example)\//g,
  /C:\\Users\\\.\.\.\\/gi,
  /C:\\Users\\sugig\\/gi,
  /C:\/Users\/sugig\//gi,
];

function collectFiles(targetPath, out) {
  if (!fs.existsSync(targetPath)) return;
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    out.push(targetPath);
    return;
  }

  for (const entry of fs.readdirSync(targetPath)) {
    if (entry === 'node_modules' || entry === '.git') continue;
    collectFiles(path.join(targetPath, entry), out);
  }
}

const files = [];
for (const target of TARGETS) {
  collectFiles(path.join(ROOT, target), files);
}

let failures = 0;
for (const file of files) {
  if (!/\.(md|json|js|ts|sh|toml|yml|yaml)$/i.test(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  for (const pattern of ALLOWED_WORKSPACE_PATTERNS) {
    content = content.replace(pattern, 'SEABRIDGE_WORKSPACE/');
  }
  for (const pattern of BLOCK_PATTERNS) {
    const match = content.match(pattern);
    if (match) {
      console.error(`ERROR: personal path detected in ${path.relative(ROOT, file)}`);
      failures += match.length;
      break;
    }
  }
}

if (failures > 0) {
  process.exit(1);
}

console.log('Validated: no personal absolute paths in shipped docs/skills/commands');
