#!/usr/bin/env node
'use strict';

// Portable JSON transport for Claude, Codex, Gemini, OpenCode and other workers.
// Deliberately cannot mint owner approval or run arbitrary shell/provider calls.
const fs = require('node:fs');
const controller = require('./lib/coding-execution');
function main(args = process.argv.slice(2)) {
  const [command, file, input] = args;
  if (!command || command === '--help') {
    console.log('coding-execution <create|event|status|recover-lock> STATE_JSON [PLAN_OR_EVENT_JSON]'); return;
  }
  if (!file) throw new Error('task-local state path required');
  const document = input ? JSON.parse(fs.readFileSync(input, 'utf8')) : null;
  let state;
  if (command === 'create') state = controller.create(file, document);
  else if (command === 'event') state = controller.transaction(file, current => controller.apply(current, document));
  else if (command === 'status') state = controller.load(file);
  else if (command === 'recover-lock') state = controller.recoverLock(file, document);
  else throw new Error('unknown command');
  console.log(JSON.stringify(state, null, 2));
}
if (require.main === module) {
  try { main(); } catch (error) { console.error(`coding execution: ${error.message}`); process.exitCode = 2; }
}
module.exports = { main };
