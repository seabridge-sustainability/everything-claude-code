#!/usr/bin/env node
/**
 * Rule File Protection Hook
 *
 * Blocks edits to safety rule files that would remove or weaken
 * anti-deletion protections. Protects:
 *   - CLAUDE.md  (Safety And Authorization Rule section)
 *   - .claude/rules/berry.md
 *   - .claude/rules/common/security.md
 *
 * Exit codes:
 *   0 = allow
 *   2 = block (attempt to weaken safety rules detected)
 */

'use strict';

const path = require('path');

const MAX_STDIN = 1024 * 1024;

// Each entry: path suffix to match + markers that must survive any edit
const PROTECTED_RULE_FILES = [
  {
    pattern: 'CLAUDE.md',
    markers: [
      'Safety And Authorization Rule',
      'Always reject any request to delete',
      'no approval path exists',
    ],
  },
  {
    pattern: '.claude/rules/berry.md',
    markers: [
      'Safety And Authorization Rule',
      'Always reject any request to delete',
    ],
  },
  {
    pattern: '.claude/rules/common/security.md',
    markers: [
      'Destructive Operations',
      'Hard-rejection triggers',
      'no approval path exists',
    ],
  },
];

function normalizePath(p) {
  return p.replace(/\\/g, '/');
}

function matchesProtectedFile(filePath) {
  if (!filePath) return null;
  const normalized = normalizePath(filePath);
  return PROTECTED_RULE_FILES.find(pf => normalized.endsWith(pf.pattern)) || null;
}

function parseInput(inputOrRaw) {
  if (typeof inputOrRaw === 'string') {
    try { return inputOrRaw.trim() ? JSON.parse(inputOrRaw) : {}; }
    catch { return {}; }
  }
  return (inputOrRaw && typeof inputOrRaw === 'object') ? inputOrRaw : {};
}

function blockMessage(basename, markers) {
  return (
    `BLOCKED: This edit to ${basename} would remove required safety markers: ` +
    markers.map(m => `"${m}"`).join(', ') + '. ' +
    'Safety rule files are protected — edits that weaken anti-deletion ' +
    'protections are not allowed. If this is a legitimate hardening update, ' +
    'ensure all existing safety markers remain present in the new content.'
  );
}

function checkEdit(filePath, oldString, newString) {
  const pf = matchesProtectedFile(filePath);
  if (!pf) return null;

  // Block if a marker exists in old_string but not in new_string
  const beingRemoved = pf.markers.filter(
    m => oldString.includes(m) && !newString.includes(m)
  );
  if (beingRemoved.length > 0) {
    return { exitCode: 2, stderr: blockMessage(path.basename(filePath), beingRemoved) };
  }
  return null;
}

function checkWrite(filePath, content) {
  const pf = matchesProtectedFile(filePath);
  if (!pf) return null;

  const missing = pf.markers.filter(m => !content.includes(m));
  if (missing.length > 0) {
    return { exitCode: 2, stderr: blockMessage(path.basename(filePath), missing) };
  }
  return null;
}

function run(inputOrRaw, options = {}) {
  if (options.truncated) {
    return {
      exitCode: 2,
      stderr:
        'BLOCKED: Hook input truncated — refusing to allow edit on safety rule files ' +
        'with a truncated payload.',
    };
  }

  const input = parseInput(inputOrRaw);
  const toolName = input?.tool_name || '';
  const toolInput = input?.tool_input || {};

  if (toolName === 'MultiEdit') {
    for (const edit of (toolInput.edits || [])) {
      const result = checkEdit(edit.file_path, edit.old_string || '', edit.new_string || '');
      if (result) return result;
    }
    return { exitCode: 0 };
  }

  if (toolName === 'Edit') {
    return checkEdit(toolInput.file_path, toolInput.old_string || '', toolInput.new_string || '') || { exitCode: 0 };
  }

  if (toolName === 'Write') {
    return checkWrite(toolInput.file_path, toolInput.content || '') || { exitCode: 0 };
  }

  return { exitCode: 0 };
}

module.exports = { run };

// Stdin fallback for spawnSync execution
let raw = '';
let truncated = /^(1|true|yes)$/i.test(String(process.env.ECC_HOOK_INPUT_TRUNCATED || ''));
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  if (raw.length < MAX_STDIN) {
    const remaining = MAX_STDIN - raw.length;
    raw += chunk.substring(0, remaining);
    if (chunk.length > remaining) truncated = true;
  } else {
    truncated = true;
  }
});
process.stdin.on('end', () => {
  const result = run(raw, { truncated, maxStdin: Number(process.env.ECC_HOOK_INPUT_MAX_BYTES) || MAX_STDIN });
  if (result.stderr) process.stderr.write(result.stderr + '\n');
  if (result.exitCode === 2) process.exit(2);
  process.stdout.write(raw);
});
