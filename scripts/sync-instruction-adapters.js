#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');
const STARTS = [
  ['<!-- SEABRIDGE_SAFETY_RULE_START -->', '<!-- SEABRIDGE_SAFETY_RULE_END -->'],
  ['<!-- SEABRIDGE_GOAL_PROTOCOL_START -->', '<!-- SEABRIDGE_GOAL_PROTOCOL_END -->'],
];

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8').replace(/\r\n/g, '\n');
}

function block(text, start, end) {
  const from = text.indexOf(start);
  const to = text.indexOf(end, from);
  if (from < 0 || to < 0) throw new Error(`Missing canonical block ${start}`);
  return text.slice(from, to + end.length);
}

const canonical = read('AGENTS.md');
const contract = STARTS.map(([start, end]) => block(canonical, start, end)).join('\n\n');
const compact = [
  'Load task-specific skills and large references only when their trigger fits.',
  'Use focused local checks first and broaden validation only for changed contracts, failures, or material risk.',
  'Repository rules and configured thresholds override generic examples.',
].join('\n');

const outputs = {
  '.github/copilot-instructions.md': `# SeaBridgeAI GitHub Copilot Instructions\n\nSYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n\n${contract}\n\n${compact}\n`,
  '.agents/rules/seabridge-agent-baseline.md': `---\ndescription: SeaBridgeAI canonical safety, goal, and verification contract\n---\n# SeaBridgeAI Agent Baseline\n\nSYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n\n${contract}\n\n${compact}\n`,
  '.clinerules': `# SeaBridgeAI Agent Baseline\n\nSYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1\n\n${contract}\n\n${compact}\n`,
};

let drift = false;
for (const [relativePath, expected] of Object.entries(outputs)) {
  const absolutePath = path.join(ROOT, relativePath);
  const actual = fs.existsSync(absolutePath) ? read(relativePath) : null;
  if (actual === expected) continue;
  drift = true;
  if (WRITE) {
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, expected, 'utf8');
    console.log(`WRITE ${relativePath}`);
  } else {
    console.error(`DRIFT ${relativePath}`);
  }
}

if (!WRITE && drift) process.exit(1);
if (!drift) console.log('instruction adapters: synchronized');

module.exports = { outputs, contract };
