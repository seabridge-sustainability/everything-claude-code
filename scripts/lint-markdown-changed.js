#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function gitFiles(cwd, args) {
  const result = spawnSync('git', args, {
    cwd,
    encoding: 'buffer',
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.status !== 0) return null;
  return result.stdout.toString('utf8').split('\0').filter(Boolean);
}

function existingMarkdown(cwd, files) {
  return files
    .filter((file) => /\.md$/i.test(file))
    .filter((file) => fs.existsSync(path.join(cwd, file)));
}

function collectMarkdownFiles(cwd, env = process.env) {
  const files = new Set();
  const add = (items) => existingMarkdown(cwd, items || []).forEach((file) => files.add(file));

  if (env.GITHUB_ACTIONS === 'true') {
    const committed = gitFiles(cwd, [
      'diff-tree', '--no-commit-id', '--name-only', '-r', '-z',
      '--diff-filter=ACMR', 'HEAD^', 'HEAD', '--', '*.md',
    ]);
    if (committed === null) {
      throw new Error('Unable to compare HEAD with its parent; CI checkout must use fetch-depth: 2 or greater.');
    }
    add(committed);
  } else {
    add(gitFiles(cwd, ['diff', '--name-only', '-z', '--diff-filter=ACMR', '--', '*.md']));
    add(gitFiles(cwd, ['diff', '--cached', '--name-only', '-z', '--diff-filter=ACMR', '--', '*.md']));
    add(gitFiles(cwd, ['ls-files', '--others', '--exclude-standard', '-z', '--', '*.md']));
    if (files.size === 0) {
      add(gitFiles(cwd, [
        'diff-tree', '--no-commit-id', '--name-only', '-r', '-z',
        '--diff-filter=ACMR', 'HEAD^', 'HEAD', '--', '*.md',
      ]));
    }
  }

  return [...files].sort();
}

function main() {
  const cwd = process.cwd();
  let files;
  try {
    files = collectMarkdownFiles(cwd);
  } catch (error) {
    console.error(`[markdownlint] ${error.message}`);
    return 1;
  }

  if (files.length === 0) {
    console.log('[markdownlint] No changed Markdown files.');
    return 0;
  }

  console.log(`[markdownlint] Checking ${files.length} changed Markdown file(s).`);
  const cli = require.resolve('markdownlint-cli/markdownlint.js');
  const result = spawnSync(process.execPath, [cli, '--', ...files], {
    cwd,
    env: process.env,
    stdio: 'inherit',
  });
  return result.status === null ? 1 : result.status;
}

if (require.main === module) process.exitCode = main();

module.exports = { collectMarkdownFiles, existingMarkdown, gitFiles, main };
