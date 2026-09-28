#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { collectMarkdownFiles } = require('../../scripts/lint-markdown-changed');

let passed = 0;
let failed = 0;

function run(cwd, args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  assert.strictEqual(result.status, 0, result.stderr);
}

function write(root, relative, body) {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, body);
}

function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  PASS ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`  FAIL ${name}: ${error.message}`);
  }
}

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'markdown-changed-'));
  run(root, ['init', '-q']);
  run(root, ['config', 'user.name', 'ECC Test']);
  run(root, ['config', 'user.email', 'ecc-test@example.invalid']);
  write(root, 'historical.md', '# Historical\n\nBad  trailing space. \n');
  run(root, ['add', 'historical.md']);
  run(root, ['commit', '-qm', 'historical baseline']);
  write(root, 'current.md', '# Current\n');
  run(root, ['add', 'current.md']);
  run(root, ['commit', '-qm', 'current change']);
  return root;
}

console.log('\n=== Testing incremental Markdown lint scope ===\n');

test('CI checks only Markdown changed by the current commit', () => {
  const root = fixture();
  try {
    assert.deepStrictEqual(collectMarkdownFiles(root, { GITHUB_ACTIONS: 'true' }), ['current.md']);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('local checks include unstaged, staged, and untracked Markdown', () => {
  const root = fixture();
  try {
    write(root, 'current.md', '# Edited\n');
    write(root, 'staged.md', '# Staged\n');
    run(root, ['add', 'staged.md']);
    write(root, 'notes/new.md', '# New\n');
    assert.deepStrictEqual(
      collectMarkdownFiles(root, {}),
      ['current.md', 'notes/new.md', 'staged.md'],
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('deleted Markdown files are not passed to the linter', () => {
  const root = fixture();
  try {
    fs.unlinkSync(path.join(root, 'current.md'));
    assert.deepStrictEqual(collectMarkdownFiles(root, {}), []);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

console.log(`\nResults: Passed: ${passed}, Failed: ${failed}\n`);
process.exitCode = failed === 0 ? 0 : 1;
