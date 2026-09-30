#!/usr/bin/env node
'use strict';

const { execute } = require('./lib/session-coordination');
function main(args = process.argv.slice(2)) {
  if (!args.length || args.includes('--help')) {
    console.log('ecc session <register|status|renew|check-write|check-changes|close|release-acquire|check-release|release-renew|release-end>');
    console.log('Options: --session ID --scope relative/path (repeatable) --objective TEXT --done-when TEXT --ttl-minutes 120');
    console.log('Checks: --path relative/path (repeatable), --upstream refs/remotes/origin/BRANCH after integration. Release: --branch NAME --candidate FULL_SHA; end: --outcome completed|failed|superseded|aborted-before-push --evidence TEXT');
    return 0;
  }
  const options = { sessionId: process.env.ECC_SESSION_ID, scopes: [], paths: [] };
  const fields = { '--session': 'sessionId', '--objective': 'objective', '--done-when': 'doneWhen',
    '--ttl-minutes': 'ttl', '--branch': 'branch', '--candidate': 'candidate', '--outcome': 'outcome', '--evidence': 'evidence', '--upstream': 'upstream' };
  for (let i = 1; i < args.length; i += 2) {
    const key = args[i], value = args[i + 1];
    if (!value || value.startsWith('--')) throw new Error(`value required for ${key}`);
    if (key === '--scope') options.scopes.push(value);
    else if (key === '--path') options.paths.push(value);
    else if (fields[key]) options[fields[key]] = value;
    else throw new Error(`unknown option ${key}`);
  }
  console.log(JSON.stringify(execute(args[0], options), null, 2));
  return 0;
}
if (require.main === module) {
  try { process.exitCode = main(); }
  catch (error) { console.error(`session coordination: ${error.message}`); process.exitCode = 2; }
}
module.exports = { main };
