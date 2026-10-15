#!/usr/bin/env node
'use strict';

// Shared by the opt-in installer and its read-only sanity check. Never install
// repository-relative policy loaders into an unrelated user-level directory.
const fs = require('fs');
const path = require('path');
const { expandImports, REQUIRED } = require('../check-instruction-stack');
const normalize = text => text.replace(/\r\n/g, '\n').trim();

function render(root) {
  root = fs.realpathSync(root);
  const sources = ['AGENTS.md', '.codex/AGENTS.md'].map(relative => {
    const file = path.join(root, relative);
    const text = normalize(fs.readFileSync(file, 'utf8'));
    const marker = text.match(/<!--\s*SEABRIDGE_CORE_ENTRY:\s*([^\s]+\.md)\s*-->/);
    return { file, text, marker };
  });
  if (sources.some(source => source.marker)) {
    if (!sources.every(source => source.marker)) throw new Error('Inconsistent central policy loaders');
    const targets = sources.map(source => fs.realpathSync(path.resolve(path.dirname(source.file), source.marker[1])));
    if (targets[0] !== targets[1]) throw new Error('Central policy loaders disagree');
    const central = expandImports(targets[0]);
    if (central.missing.length || REQUIRED.some(rule => !rule.re.test(central.text))) {
      throw new Error('Central policy import is missing or incomplete');
    }
    const workspace = path.dirname(path.dirname(targets[0])).replaceAll('\\', '/');
    const agents = targets[0].replaceAll('\\', '/');
    return '# SeaBridgeAI scoped instruction loader\n\n'
      + `Only when working under \`${workspace}\`, read and follow \`${agents}\` and its shared system import before working.\n`
      + 'This loader grants no approval and adds no policy outside that workspace.\n\n'
      + '---\n\n# Codex Supplement (From ECC .codex/AGENTS.md)\n\n'
      + `The same scoped central policy applies; its verified source is \`${agents}\`.\n`;
  }
  return `${sources[0].text}\n\n---\n\n# Codex Supplement (From ECC .codex/AGENTS.md)\n\n${sources[1].text}\n`;
}

function check(root, installedFile) {
  const installed = normalize(fs.readFileSync(installedFile, 'utf8'));
  const expected = normalize(render(root));
  return Boolean(expected && installed.includes(expected));
}

if (require.main === module) {
  try {
    const [command, root, installed] = process.argv.slice(2);
    if (command === 'render' && root && !installed) process.stdout.write(render(root));
    else if (command === 'check' && root && installed) process.exitCode = check(root, installed) ? 0 : 1;
    else throw new Error('Use render ROOT or check ROOT INSTALLED_FILE');
  } catch {
    process.stderr.write('Global instruction source/import verification failed\n');
    process.exitCode = 1;
  }
}

module.exports = { render, check };
