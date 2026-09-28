#!/usr/bin/env node
'use strict';

/**
 * Repair UTF-8 text that was accidentally decoded as Windows-1252 one or more
 * times. The command is limited to localized SKILL.md files and only accepts a
 * conversion when a conservative mojibake score decreases.
 *
 * Usage:
 *   node scripts/repair-localized-skill-encoding.js --check
 *   node scripts/repair-localized-skill-encoding.js --write
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const docsRoot = path.join(root, 'docs');
const mode = process.argv.includes('--write') ? 'write' : 'check';
const utf8 = new TextDecoder('utf-8', { fatal: true });

const cp1252Special = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
  [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
  [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
  [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
  [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f],
]);

function encodeWindows1252(text) {
  const bytes = [];
  for (const char of text) {
    const cp = char.codePointAt(0);
    if (cp <= 0xff) bytes.push(cp);
    else if (cp1252Special.has(cp)) bytes.push(cp1252Special.get(cp));
    else return null;
  }
  return Uint8Array.from(bytes);
}

function score(text) {
  // Correct Japanese, Korean, Chinese and Turkish text will not consist of
  // Latin-1/Latin-Extended byte-glyph runs. Strict UTF-8 decoding below is the
  // second guard: legitimate accented text normally cannot be decoded again.
  const suspicious = text.match(/[\u0080-\u024f]/gu);
  return suspicious ? suspicious.length : 0;
}

function decodeOnePass(text) {
  const bytes = encodeWindows1252(text);
  if (!bytes) return null;
  try {
    return utf8.decode(bytes);
  } catch {
    return null;
  }
}

function repairText(text) {
  let current = text;
  for (let pass = 0; pass < 4; pass += 1) {
    const candidate = decodeOnePass(current);
    if (candidate === null || score(candidate) >= score(current)) break;
    current = candidate;
  }
  return current;
}

function repairLines(text) {
  return text.split(/(\r?\n)/).map((part) => (
    part === '\n' || part === '\r\n' ? part : repairText(part)
  )).join('');
}

function repairFrontmatter(text) {
  const match = text.match(/(^|\r?\n)(---\r?\n[\s\S]*?\r?\n---)(?=\r?\n|$)/);
  if (!match) return text;
  const original = match[2];
  const repaired = repairText(original);
  if (repaired === original) return text;
  return text.slice(0, match.index + match[1].length)
    + repaired
    + text.slice(match.index + match[0].length);
}

function putFrontmatterFirst(text) {
  if (text.startsWith('---\n') || text.startsWith('---\r\n')) return text;
  const match = text.match(/(^|\r?\n)(---\r?\n(?:name|description):[\s\S]*?\r?\n---)(?=\r?\n|$)/);
  if (!match) return text;
  const eol = text.includes('\r\n') ? '\r\n' : '\n';
  const before = text.slice(0, match.index + match[1].length);
  const after = text.slice(match.index + match[0].length).replace(/^\r?\n/, '');
  return `${match[2]}${eol}${eol}${before}${after}`;
}

function skillFiles() {
  const files = [];
  for (const locale of fs.readdirSync(docsRoot, { withFileTypes: true })) {
    const skills = path.join(docsRoot, locale.name, 'skills');
    if (!locale.isDirectory() || !fs.existsSync(skills)) continue;
    for (const entry of fs.readdirSync(skills, { withFileTypes: true })) {
      const file = path.join(skills, entry.name, 'SKILL.md');
      if (entry.isDirectory() && fs.existsSync(file)) files.push(file);
    }
  }
  return files.sort();
}

const changes = [];
for (const file of skillFiles()) {
  const original = fs.readFileSync(file, 'utf8');
  let repaired = repairLines(original);
  if (repaired === original) repaired = repairFrontmatter(original);
  repaired = putFrontmatterFirst(repaired);
  if (repaired === original) continue;
  changes.push(path.relative(root, file).replaceAll('\\', '/'));
  if (mode === 'write') fs.writeFileSync(file, repaired, 'utf8');
}

if (changes.length) {
  console.log(`${mode === 'write' ? 'Repaired' : 'Repair needed for'} ${changes.length} localized skill files:`);
  for (const file of changes) console.log(`- ${file}`);
  if (mode === 'check') process.exitCode = 1;
} else {
  console.log('Localized skill encoding is clean.');
}
