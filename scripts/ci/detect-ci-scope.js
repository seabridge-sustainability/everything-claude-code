#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const SHA = /^[0-9a-f]{7,40}$/i;
const ZERO_SHA = /^0+$/;
const PACKAGE_FILES = /^(?:package(?:-lock)?\.json|npm-shrinkwrap\.json|\.npmrc|yarn\.lock|\.yarnrc\.ya?ml|pnpm-lock\.yaml|pnpm-workspace\.yaml|bun\.lockb?|bunfig\.toml|\.opencode\/package(?:-lock)?\.json)$/;
const INSTALLER_SCRIPTS = /^scripts\/(?:ecc\.js|setup\.js|install-|build-opencode|lib\/(?:install(?:\/|-)|(?:claude|codex)-plugin-setup))/;
const INSTALLER_TESTS = /^tests\/(?:lib\/(?:install|claude|codex|opencode)|scripts\/(?:install|setup|build-opencode|ecc-universal))/;
// Generated reports and handoffs are evidence, not executable source. Keep a
// lightweight validation job for these changes instead of the full matrix.
const REPORT_ONLY = /^docs\/(?:reports|handoffs|plans)\//;

const patterns = {
  compatibility: [
    /^\.github\/workflows\/ci\.yml$/,
    /^scripts\/ci\/detect-ci-scope\.js$/,
    PACKAGE_FILES,
    /^(install\.(?:ps1|sh)|manifests\/|schemas\/)/,
    INSTALLER_SCRIPTS,
    INSTALLER_TESTS
  ],
  platform: [
    /^\.github\/workflows\/ci\.yml$/,
    /^scripts\/ci\/detect-ci-scope\.js$/,
    /^scripts\/(?:hooks\/|lib\/shell-path\.js|plan-canvas\.js)/,
    /^(?:\.opencode\/|\.pi\/|docker\/plugin-setup\/)/,
    /^tests\/(?:hooks\/|integration\/|opencode|pi\/|lib\/shell-path|scripts\/plan-canvas)/
  ],
  packed: [
    /^\.github\/workflows\/ci\.yml$/,
    /^scripts\/ci\/detect-ci-scope\.js$/,
    PACKAGE_FILES,
    /^(?:\.opencode\/|\.pi\/|install\.(?:ps1|sh)|manifests\/|schemas\/)/,
    INSTALLER_SCRIPTS,
    /^(?:docker\/plugin-setup\/|tests\/ci\/packed-artifact|tests\/scripts\/(?:install|build-opencode|ecc-universal))/
  ]
};

function normalize(file) {
  return String(file || '').replace(/\\/g, '/').replace(/^\.\//, '');
}

function classify(files, failSafe = false) {
  const normalized = files.map(normalize).filter(Boolean);
  const reportOnly = !failSafe && normalized.length > 0 && normalized.every(file => REPORT_ONLY.test(file));
  const result = { core: !reportOnly, reportOnly };
  for (const [scope, matchers] of Object.entries(patterns)) {
    result[scope] = failSafe || normalized.some(file => matchers.some(pattern => pattern.test(file)));
  }
  return { files: normalized, ...result, failSafe };
}

function gitChangedFiles(base, head, cwd = process.cwd()) {
  if (!SHA.test(base || '') || ZERO_SHA.test(base) || !SHA.test(head || '')) {
    return { files: [], failSafe: true, reason: 'missing or non-comparable commit range' };
  }
  const child = spawnSync('git', ['diff', '--name-only', '-z', base, head], {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    timeout: 30000,
    maxBuffer: 4 * 1024 * 1024
  });
  if (child.status !== 0 || child.error) {
    return { files: [], failSafe: true, reason: 'git diff failed' };
  }
  return { files: child.stdout.split('\0').filter(Boolean), failSafe: false, reason: null };
}

function optionValue(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

function main(args = process.argv.slice(2)) {
  const base = optionValue(args, '--base');
  const head = optionValue(args, '--head');
  const detected = gitChangedFiles(base, head);
  const result = { ...classify(detected.files, detected.failSafe), reason: detected.reason };
  const outputPath = optionValue(args, '--github-output');
  if (outputPath) {
    const lines = ['core', 'reportOnly', 'compatibility', 'platform', 'packed']
      .map(key => `${key}=${result[key] ? 'true' : 'false'}`)
      .join('\n');
    fs.appendFileSync(path.resolve(outputPath), `${lines}\n`, 'utf8');
  } else {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  }
  return 0;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    process.stderr.write(`ci scope: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { classify, gitChangedFiles, main, normalize, patterns };
