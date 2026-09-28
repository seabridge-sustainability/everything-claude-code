'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function lineCount(relativePath) {
  return read(relativePath).split(/\r?\n/).length;
}

const karpathy = read('.claude/skills/karpathy-guidelines/SKILL.md');
assert.match(karpathy, /Use only when the user asks/i);
assert.doesNotMatch(karpathy, /before any non-trivial|always applied/i);
assert.ok(lineCount('.claude/skills/karpathy-guidelines/SKILL.md') < 80);

const cursorKarpathy = read('.cursor/rules/karpathy-guidelines.mdc');
assert.match(cursorKarpathy, /alwaysApply:\s*false/);
assert.doesNotMatch(cursorKarpathy, /name what's unclear and stop|No .* error handling beyond/i);

for (const relativePath of [
  'skills/security-review/SKILL.md',
  '.agents/skills/security-review/SKILL.md'
]) {
  const security = read(relativePath);
  assert.match(security, /material auth, tenant-isolation, secrets/i);
  assert.doesNotMatch(security, /adding authentication, handling user input, working with secrets, creating API endpoints/i);
}
assert.ok(lineCount('skills/security-review/SKILL.md') < 110);
assert.ok(lineCount('.agents/skills/security-review/SKILL.md') < 25);

const agentEval = read('skills/agent-eval/SKILL.md');
assert.match(agentEval, /not ordinary code verification/i);
assert.match(agentEval, /requires current-session approval/i);
assert.ok(lineCount('skills/agent-eval/SKILL.md') < 100);

const pythonTesting = read('skills/python-testing/SKILL.md');
assert.ok(lineCount('skills/python-testing/SKILL.md') < 60);
assert.match(pythonTesting, /Load details only when needed/);
assert.ok(fs.existsSync(path.join(root, 'skills', 'python-testing', 'references', 'pytest-patterns.md')));

const btw = read('.agents/skills/btw/SKILL.md');
assert.ok(lineCount('.agents/skills/btw/SKILL.md') < 30);
assert.doesNotMatch(btw, /SEABRIDGE_SAFETY_RULE_START/);
assert.doesNotMatch(btw, /[\u0080-\u024f]/u);

assert.ok(!fs.existsSync(path.join(root, 'skills', 'frontend-design', 'SKILL.md')));
assert.ok(!fs.existsSync(path.join(root, '.agents', 'skills', 'frontend-design', 'SKILL.md')));

console.log('skill routing hygiene: 22 checks passed');
