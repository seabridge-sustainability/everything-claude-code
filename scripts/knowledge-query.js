#!/usr/bin/env node
'use strict';

// Local code-graph lookup only. No model calls and no shell interpolation.
const { spawnSync } = require('child_process');
const path = require('path');
const { graphStatus } = require('./knowledge-freshness');

function boundedOutput(text, limit) {
  const notice = '\n[TRUNCATED: output limit reached; result is incomplete. Narrow the symbol/query and verify source.]\n';
  return text.length <= limit ? text : text.slice(0, limit - notice.length) + notice;
}

function query(root, question, { maxChars = 8000, run = spawnSync, status = graphStatus } = {}) {
  if (!Number.isSafeInteger(maxChars) || maxChars < 256 || maxChars > 20000) throw new Error('maxChars must be 256-20000');
  if (typeof question !== 'string' || !question.trim() || question.length > 1000 || question.startsWith('-')) throw new Error('Provide a non-option symbol/question (1-1000 characters)');
  const state = status(root);
  if (state.status !== 'fresh') return { code: 2, output: `Graph unavailable for trusted lookup: ${state.status}. Use source search or rebuild an approved snapshot.\n` };
  const graphPath = path.resolve(root, 'graphify-out', 'graph.json');
  const result = run('graphify', ['query', question, '--graph', graphPath, '--context', 'call', '--budget', '2000'], {
    cwd: root, encoding: 'utf8', shell: false, timeout: 15000,
    maxBuffer: maxChars * 4 + 4096, env: { ...process.env, GRAPHIFY_OUT: path.dirname(graphPath), GRAPHIFY_NO_TIPS: '1' },
  });
  const text = String(result.stdout || '');
  const overflow = result.error && result.error.code === 'ENOBUFS';
  if ((result.error && !overflow) || (!overflow && result.status !== 0)) {
    return { code: 2, output: 'Graph query failed or timed out; no complete answer obtained. Use source search.\n' };
  }
  if (overflow || text.length > maxChars) {
    return { code: 3, output: boundedOutput(text.padEnd(maxChars + 1, ' '), maxChars) };
  }
  return { code: 0, output: text };
}

if (require.main === module) {
  try {
    const [root, question] = process.argv.slice(2);
    if (!root || !question || process.argv.length !== 4) throw new Error('usage: node scripts/knowledge-query.js <repo> <symbol>');
    const result = query(root, question);
    process.stdout.write(result.output);
    process.exitCode = result.code;
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 2;
  }
}
module.exports = { boundedOutput, query };
