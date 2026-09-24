#!/usr/bin/env node
/**
 * check-instruction-stack.js — validate what each coding-agent harness actually
 * loads at startup in the SeaBridgeAI repos, not just the files one by one.
 *
 *   Claude Code: CLAUDE.md with `@path` imports expanded (max depth 4, ignored
 *                inside code spans/fences) + .claude/rules/*.md without `paths:`
 *                frontmatter. (AGENTS.md is read only when no CLAUDE.md exists.)
 *   Codex:       AGENTS.md from the git root (cwd = root); 32 KiB combined cap,
 *                truncated silently past it.
 *
 * Checks per effective stack: size budget, required invariants, stale phrases,
 * broken path references, and text duplicated between CLAUDE.md and AGENTS.md.
 * Loading semantics: code.claude.com/docs/en/memory, developers.openai.com/codex/guides/agents-md
 *
 * Usage: node scripts/check-instruction-stack.js [--json] [--workspace <dir>]
 * Exit 1 on any failure.
 */

const fs = require('fs');
const path = require('path');

const CODEX_CAP = 32 * 1024;
const MAX_IMPORT_DEPTH = 4;

const REQUIRED = [
  { id: 'system-id', re: /SEABRIDGE_AGENT_SYSTEM_V1/ },
  { id: 'safety-block', re: /<!-- SEABRIDGE_SAFETY_RULE_START -->[\s\S]*Always reject any request to delete[\s\S]*<!-- SEABRIDGE_SAFETY_RULE_END -->/ },
  { id: 'ask-first-list', re: /\*\*Ask first:\*\*/ },
  { id: 'live-branch-rule', re: /Never modify `main` \(the live branch\)/ },
  { id: 'goal-default', re: /## Goal Protocol Default/ },
];

// Phrases retired by the 2026-09-24 modernization; each one was wrong or contradictory.
const STALE = [
  { re: /Sonnet 4\.6|claude-sonnet-4-6|opusplan/i, why: 'model routing belongs in harness config, not prose (and names a superseded model)' },
  { re: /Restricted mode by default/i, why: 'contradicted task-authorized work; replaced by the ask-first list' },
  { re: /adelmar@seabridge\.ai/i, why: 'approval is by the in-session user, not an e-mail address' },
  { re: /Load `?AGENTS_SYSTEM\.md`? first/i, why: 'prose-mandated reads were ignored in 20 of 21 sessions; use @AGENTS.md' },
  { re: /do not support (event )?hooks/i, why: 'Codex supports hooks (features.hooks)' },
  { re: /Use `?\/compact`? automatically/i, why: 'agents cannot invoke /compact; the harness auto-compacts' },
];

function readText(file) {
  return fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
}

/** Remove fenced blocks and inline code so imports/paths inside them are ignored. */
function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
}

/** Expand Claude Code `@path` imports (outside code) recursively. Returns {text, files, missing}. */
function expandImports(file, depth = 0, seen = new Set()) {
  const abs = path.resolve(file);
  const out = { text: '', files: [abs], missing: [] };
  if (seen.has(abs)) return { text: '', files: [], missing: [] };
  seen.add(abs);
  const raw = readText(abs);
  out.text = raw;
  if (depth >= MAX_IMPORT_DEPTH) return out;
  const scan = stripCode(raw);
  const re = /(^|\s)@([^\s`]+\.md)\b/g;
  let m;
  while ((m = re.exec(scan)) !== null) {
    const target = path.resolve(path.dirname(abs), m[2].replace(/^~(?=[\\/])/, process.env.USERPROFILE || '~'));
    if (!fs.existsSync(target)) { out.missing.push(m[2]); continue; }
    const sub = expandImports(target, depth + 1, seen);
    out.text += '\n' + sub.text;
    out.files.push(...sub.files);
    out.missing.push(...sub.missing);
  }
  return out;
}

function alwaysLoadedRules(repo) {
  const dir = path.join(repo, '.claude', 'rules');
  if (!fs.existsSync(dir)) return [];
  const found = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.md')) {
        const t = readText(p);
        const fm = t.match(/^---\n([\s\S]*?)\n---/);
        if (!(fm && /^paths:/m.test(fm[1]))) found.push(p);
      }
    }
  })(dir);
  return found;
}

function effectiveStacks(repo) {
  const stacks = [];
  const agents = path.join(repo, 'AGENTS.md');
  const claude = path.join(repo, 'CLAUDE.md');
  if (fs.existsSync(agents)) stacks.push({ harness: 'codex', files: [agents], missing: [], text: readText(agents) });
  const claudeEntry = fs.existsSync(claude) ? claude : (fs.existsSync(agents) ? agents : null);
  if (claudeEntry) {
    const exp = expandImports(claudeEntry);
    for (const r of alwaysLoadedRules(repo)) { exp.files.push(r); exp.text += '\n' + readText(r); }
    stacks.push({ harness: 'claude', files: exp.files, missing: exp.missing, text: exp.text });
  }
  return stacks;
}

/** Backticked path-like references that should exist (repo-relative or absolute). */
function brokenPathRefs(text, repo, workspace) {
  const broken = [];
  const re = /`([^`\s]+)`/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    let ref = m[1].replace(/[),.;:]+$/, '');
    if (/[<>*{}|$]|^https?:|^--?|^\.\\venv|\(|=/.test(ref)) continue;
    const abs = /^[A-Za-z]:\\/.test(ref);
    if (!abs && !/[\\/]/.test(ref)) continue;
    if (!abs && !/\.(md|json|jsonc|toml|ps1|js|mjs|py|ts|tsx|yaml|yml|txt)$|[\\/]$/.test(ref)) continue;
    const candidates = abs ? [ref] : [path.join(repo, ref), path.join(workspace, ref), path.join(workspace, 'everything-claude-code', ref)];
    if (!candidates.some((c) => fs.existsSync(c))) broken.push(ref);
  }
  return [...new Set(broken)];
}

/** Long lines of CLAUDE.md's own text that repeat verbatim in AGENTS.md. */
function duplicatedLines(repo) {
  const claude = path.join(repo, 'CLAUDE.md');
  const agents = path.join(repo, 'AGENTS.md');
  if (!fs.existsSync(claude) || !fs.existsSync(agents)) return [];
  const a = new Set(readText(agents).split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length >= 60));
  return readText(claude).split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length >= 60 && a.has(l));
}

function checkRepo(repo, workspace, budget) {
  const results = [];
  for (const s of effectiveStacks(repo)) {
    const bytes = Buffer.byteLength(s.text, 'utf8');
    const failures = [];
    if (s.harness === 'codex' && bytes > CODEX_CAP) failures.push(`exceeds Codex 32 KiB cap (${bytes} B): the tail is silently truncated`);
    if (bytes > budget) failures.push(`exceeds budget ${budget} B (${bytes} B)`);
    for (const r of REQUIRED) if (!r.re.test(s.text)) failures.push(`missing invariant: ${r.id}`);
    for (const st of STALE) if (st.re.test(s.text)) failures.push(`stale phrase ${st.re}: ${st.why}`);
    for (const miss of s.missing) failures.push(`broken @import: ${miss}`);
    for (const ref of brokenPathRefs(s.text, repo, workspace)) failures.push(`broken path reference: ${ref}`);
    if (s.harness === 'claude') for (const d of duplicatedLines(repo)) failures.push(`CLAUDE.md duplicates AGENTS.md: "${d.slice(0, 70)}…"`);
    results.push({ repo: path.basename(repo), harness: s.harness, bytes, files: s.files.map((f) => path.relative(repo, f) || f), failures });
  }
  return results;
}

const REPOS = [
  { name: 'manageesg-backend', budget: 16 * 1024 },
  { name: 'manageesg-frontend', budget: 16 * 1024 },
  { name: 'autoresearch', budget: 16 * 1024 },
];

function main(argv) {
  const wsIdx = argv.indexOf('--workspace');
  const workspace = wsIdx >= 0 ? argv[wsIdx + 1] : path.resolve(__dirname, '..', '..');
  const all = [];
  for (const r of REPOS) {
    const repo = path.join(workspace, r.name);
    if (fs.existsSync(repo)) all.push(...checkRepo(repo, workspace, r.budget));
  }
  if (argv.includes('--json')) {
    process.stdout.write(JSON.stringify(all, null, 1) + '\n');
  } else {
    for (const r of all) {
      console.log(`${r.failures.length ? 'FAIL' : 'PASS'}  ${r.repo.padEnd(20)} ${r.harness.padEnd(7)} ${String(r.bytes).padStart(6)} B  ${r.files.join(' + ')}`);
      for (const f of r.failures) console.log(`      - ${f}`);
    }
  }
  return all.some((r) => r.failures.length) ? 1 : 0;
}

module.exports = { expandImports, stripCode, alwaysLoadedRules, effectiveStacks, brokenPathRefs, duplicatedLines, checkRepo, REQUIRED, STALE, CODEX_CAP };

if (require.main === module) process.exit(main(process.argv.slice(2)));
