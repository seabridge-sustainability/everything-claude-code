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
 *   Gemini:      GEMINI.md with @path imports expanded.
 *   Other ECC adapters: manifest-declared canonical, import, or generated
 *                embedded entrypoints for every advertised coding-agent runtime.
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
const ROOT = path.resolve(__dirname, '..');
const ADAPTER_MANIFEST = path.join(ROOT, 'manifests', 'instruction-adapters.json');

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
  { re: /Minimum Test Coverage:\s*80%|Target:\s*80% minimum|Coverage\s*>?=\s*80%/i, why: 'coverage thresholds belong to the repository' },
  { re: /Use immediately after writing or modifying code/i, why: 'reviews are risk-scaled, not mandatory after every edit' },
];

function loadAdapterRegistry(repo = ROOT) {
  const manifestPath = repo === ROOT ? ADAPTER_MANIFEST : path.join(repo, 'manifests', 'instruction-adapters.json');
  const parsed = JSON.parse(readText(manifestPath));
  if (!Array.isArray(parsed.adapters) || !Array.isArray(parsed.installTargets)) {
    throw new Error('Invalid manifests/instruction-adapters.json');
  }
  return parsed;
}

function readText(file) {
  return fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
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

function expandOptionalEntry(entry) {
  if (fs.statSync(entry).isFile()) return expandImports(entry);
  const files = [];
  const missing = [];
  let text = '';
  (function walk(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const absolute = path.join(dir, item.name);
      if (item.isDirectory()) walk(absolute);
      else if (/\.mdc?$/.test(item.name)) {
        const exp = expandImports(absolute);
        files.push(...exp.files); missing.push(...exp.missing); text += '\n' + exp.text;
      }
    }
  })(entry);
  return { files, missing, text };
}

function legacyEffectiveStacks(repo) {
  const stacks = [];
  const agents = path.join(repo, 'AGENTS.md');
  const claude = path.join(repo, 'CLAUDE.md');
  const agentsText = fs.existsSync(agents) ? readText(agents) : '';
  // These runtimes natively discover root AGENTS.md. Keep separate harness
  // results so a product adapter cannot silently disappear from reports.
  for (const harness of ['codex', 'opencode', 'cursor', 'qwen', 'kiro', 'windsurf']) {
    if (fs.existsSync(agents)) stacks.push({ harness, mode: 'canonical', files: [agents], missing: [], text: agentsText });
  }
  const claudeEntry = fs.existsSync(claude) ? claude : (fs.existsSync(agents) ? agents : null);
  if (claudeEntry) {
    const exp = expandImports(claudeEntry);
    for (const r of alwaysLoadedRules(repo)) { exp.files.push(r); exp.text += '\n' + readText(r); }
    stacks.push({ harness: 'claude', files: exp.files, missing: exp.missing, text: exp.text });
  }
  const gemini = path.join(repo, 'GEMINI.md');
  if (fs.existsSync(gemini)) {
    const exp = expandImports(gemini);
    stacks.push({ harness: 'gemini', files: exp.files, missing: exp.missing, text: exp.text });
  }
  const optional = [
    ['copilot', '.github/copilot-instructions.md'],
    ['cline', '.clinerules'],
    ['antigravity', '.agents/rules/seabridge-agent-baseline.md'],
  ];
  for (const [harness, relativePath] of optional) {
    const entry = path.join(repo, relativePath);
    if (!fs.existsSync(entry)) continue;
    const exp = expandOptionalEntry(entry);
    const ownText = exp.text;
    // Compact product adapters may explicitly delegate to the root contract.
    // Model that declared load without requiring another embedded copy.
    if (agentsText && /AGENTS\.md/i.test(ownText) && /read|follow|canonical|authoritative/i.test(ownText)) {
      exp.files.push(agents); exp.text += '\n' + agentsText;
    }
    stacks.push({ harness, mode: 'declared', files: exp.files, missing: exp.missing, text: exp.text, ownText });
  }
  // Native AGENTS runtimes can also load legacy always-on carriers. Include
  // those files in the effective stack so duplicate safety blocks and stale
  // mandates are visible rather than hidden by native discovery.
  const cursorRules = path.join(repo, '.cursor', 'rules');
  if (fs.existsSync(cursorRules)) {
    const cursor = stacks.find(stack => stack.harness === 'cursor');
    for (const name of fs.readdirSync(cursorRules)) {
      if (!/\.mdc?$/.test(name)) continue;
      const file = path.join(cursorRules, name);
      const text = readText(file);
      if (!/alwaysApply:\s*true/.test(text) || !cursor) continue;
      cursor.files.push(file); cursor.text += '\n' + text;
    }
  }
  for (const [harness, relativePath] of [['windsurf', '.windsurfrules']]) {
    const file = path.join(repo, relativePath);
    const stack = stacks.find(candidate => candidate.harness === harness);
    if (stack && fs.existsSync(file)) { stack.files.push(file); stack.text += '\n' + readText(file); }
  }
  const kiroSteering = path.join(repo, '.kiro', 'steering');
  const kiro = stacks.find(stack => stack.harness === 'kiro');
  if (kiro && fs.existsSync(kiroSteering)) {
    for (const name of fs.readdirSync(kiroSteering)) {
      if (!name.endsWith('.md')) continue;
      const file = path.join(kiroSteering, name);
      const text = readText(file);
      if (!/inclusion:\s*(?:auto|always)/.test(text)) continue;
      kiro.files.push(file); kiro.text += '\n' + text;
    }
  }
  return stacks;
}

function effectiveStacks(repo) {
  // Product repositories retain the compact Codex/Claude/Gemini discovery
  // check. ECC itself owns the complete cross-harness registry.
  if (!fs.existsSync(path.join(repo, 'manifests', 'instruction-adapters.json'))) {
    return legacyEffectiveStacks(repo);
  }

  const registry = loadAdapterRegistry(repo);
  return registry.adapters.map(adapter => {
    const entry = path.join(repo, adapter.entry);
    if (!fs.existsSync(entry)) {
      return { harness: adapter.id, mode: adapter.mode, files: [], missing: [adapter.entry], text: '' };
    }
    if (adapter.mode === 'import') {
      const exp = expandImports(entry);
      return { harness: adapter.id, mode: adapter.mode, files: exp.files, missing: exp.missing, text: exp.text };
    }
    return { harness: adapter.id, mode: adapter.mode, files: [entry], missing: [], text: readText(entry), config: adapter.config, installEntry: adapter.installEntry };
  });
}

function markerBlock(text, start, end) {
  const from = text.indexOf(start);
  const to = text.indexOf(end, from);
  return from >= 0 && to >= 0 ? text.slice(from, to + end.length) : null;
}

function canonicalBlocks(repo) {
  const text = readText(path.join(repo, 'AGENTS.md'));
  return [
    ['<!-- SEABRIDGE_SAFETY_RULE_START -->', '<!-- SEABRIDGE_SAFETY_RULE_END -->'],
    ['<!-- SEABRIDGE_GOAL_PROTOCOL_START -->', '<!-- SEABRIDGE_GOAL_PROTOCOL_END -->'],
  ].map(([start, end]) => markerBlock(text, start, end));
}

/** Backticked path-like references that should exist (repo-relative or absolute). */
function brokenPathRefs(text, repo, workspace) {
  const broken = [];
  const re = /`([^`\s]+)`/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    let ref = m[1].replace(/[),.;:]+$/, '');
    if (/[<>*{}|$]|^https?:|^--?|^\.\\venv|\(|=/.test(ref)) continue;
    if (/^(?:artifacts|logs|docs\/reports|graphify(?:-out|\/output))[\\/]/.test(ref)) continue;
    const home = /^~[\\/]/.test(ref);
    const abs = /^[A-Za-z]:\\/.test(ref);
    if (!abs && !/[\\/]/.test(ref)) continue;
    // Output directories may be created on demand and need not exist in a
    // detached validation checkout. Validate concrete file references only.
    if (!abs && !/\.(md|json|jsonc|toml|ps1|js|mjs|py|ts|tsx|yaml|yml|txt)$/.test(ref)) continue;
    const portableWindowsRef = abs
      ? ref.match(/\\everything-claude-code(?:\\(.*))?$/i)
      : null;
    const candidates = home ? [path.join(process.env.USERPROFILE || process.env.HOME || '~', ref.slice(2))]
      : portableWindowsRef
        ? [portableWindowsRef[1]
          ? path.join(repo, ...portableWindowsRef[1].split('\\'))
          : repo]
        : abs ? [ref] : [path.join(repo, ref), path.join(workspace, ref), path.join(workspace, 'everything-claude-code', ref), path.join(ROOT, ref)];
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

function checkRepo(repo, workspace, budget, options = {}) {
  const results = [];
  const isEcc = fs.existsSync(path.join(repo, 'manifests', 'instruction-adapters.json'));
  const expectedBlocks = isEcc ? canonicalBlocks(repo) : [];
  const productPolicyFailures = [];
  if (!isEcc && options.enforceCanonicalPolicy) {
    const productAgents = path.join(repo, 'AGENTS.md');
    if (!fs.existsSync(productAgents)) {
      productPolicyFailures.push('missing product AGENTS.md');
    } else {
      const actual = canonicalBlocks(repo);
      const canonical = canonicalBlocks(ROOT);
      actual.forEach((block, index) => {
        if (block !== canonical[index]) productPolicyFailures.push(`product canonical block ${index + 1} drifted from ECC`);
      });
    }
  }
  for (const s of effectiveStacks(repo)) {
    const bytes = Buffer.byteLength(s.text, 'utf8');
    const failures = [...productPolicyFailures];
    if (s.harness === 'codex' && bytes > CODEX_CAP) failures.push(`exceeds Codex 32 KiB cap (${bytes} B): the tail is silently truncated`);
    if (bytes > budget) failures.push(`exceeds budget ${budget} B (${bytes} B)`);
    for (const r of REQUIRED) if (!r.re.test(s.text)) failures.push(`missing invariant: ${r.id}`);
    const blocks = (s.text.match(/<!-- SEABRIDGE_SAFETY_RULE_START -->/g) || []).length;
    if (blocks > 1) failures.push(`safety block loaded ${blocks} times (drop the copies from always-loaded rules files)`);
    for (const st of STALE) if (st.re.test(s.text)) failures.push(`stale phrase ${st.re}: ${st.why}`);
    for (const miss of s.missing) failures.push(`broken @import: ${miss}`);
    if (s.mode === 'embedded') {
      const actualBlocks = [
        markerBlock(s.text, '<!-- SEABRIDGE_SAFETY_RULE_START -->', '<!-- SEABRIDGE_SAFETY_RULE_END -->'),
        markerBlock(s.text, '<!-- SEABRIDGE_GOAL_PROTOCOL_START -->', '<!-- SEABRIDGE_GOAL_PROTOCOL_END -->'),
      ];
      actualBlocks.forEach((actual, index) => {
        if (actual !== expectedBlocks[index]) failures.push(`embedded canonical block ${index + 1} drifted from AGENTS.md`);
      });
    }
    if (s.config) {
      const configPath = path.join(repo, s.config);
      if (!fs.existsSync(configPath)) failures.push(`missing adapter config: ${s.config}`);
      else if (!/"instructions"\s*:\s*\[[\s\S]*?"AGENTS\.md"/.test(readText(configPath))) {
        failures.push(`${s.config} does not load AGENTS.md`);
      }
    }
    if (s.installEntry) {
      const installPath = path.join(repo, s.installEntry);
      if (!fs.existsSync(installPath)) failures.push(`missing install entry: ${s.installEntry}`);
      else if (!/@\.\/AGENTS\.md/.test(readText(installPath))) failures.push(`${s.installEntry} does not import its installed AGENTS.md`);
    }
    if (s.harness === 'copilot' && s.mode === 'declared') {
      for (const [label, pattern] of [
        ['approval boundary', /(?:ask before|approval)/i],
        ['prohibited git operations', /force-push|reset --hard|git clean/i],
        ['risk-scaled testing', /fixed coverage|risk|proportion/i],
        ['Actions cost discipline', /GitHub Actions cost|completed-batch push|batch/i],
      ]) if (!pattern.test(s.ownText || '')) failures.push(`Copilot compact adapter missing ${label}`);
    }
    for (const ref of brokenPathRefs(s.text, repo, workspace)) failures.push(`broken path reference: ${ref}`);
    if (s.harness === 'claude') for (const d of duplicatedLines(repo)) failures.push(`CLAUDE.md duplicates AGENTS.md: "${d.slice(0, 70)}…"`);
    results.push({ repo: path.basename(repo), harness: s.harness, bytes, files: s.files.map((f) => path.relative(repo, f) || f), failures });
  }
  if (isEcc) {
    const registry = loadAdapterRegistry(repo);
    const modules = JSON.parse(readText(path.join(repo, 'manifests', 'install-modules.json'))).modules;
    const agentsCore = modules.find(module => module.id === 'agents-core');
    const failures = [];
    if (!agentsCore || !agentsCore.paths.includes('AGENTS.md')) failures.push('agents-core does not install AGENTS.md');
    for (const target of registry.installTargets) {
      if (!agentsCore || !agentsCore.targets.includes(target)) failures.push(`agents-core missing install target: ${target}`);
    }
    results.push({
      repo: path.basename(repo),
      harness: 'installer',
      bytes: 0,
      files: ['manifests/instruction-adapters.json', 'manifests/install-modules.json'],
      failures,
    });
  }
  return results;
}

const REPOS = [
  { name: 'manageesg-backend', budget: 16 * 1024 },
  { name: 'manageesg-frontend', budget: 16 * 1024 },
  { name: 'autoresearch', budget: 16 * 1024 },
  { name: 'openseabri', budget: 16 * 1024 },
  { name: 'climada-stack', budget: 16 * 1024 },
  { name: '_upstream', budget: 16 * 1024 },
  // ECC itself: always the checkout this script runs from (works in a worktree).
  // Larger budget: the plugin's own dev repo also loads its language rules.
  { name: 'everything-claude-code', self: true, budget: 24 * 1024 },
];

function defaultWorkspace() {
  if (process.env.SEABRIDGE_WORKSPACE) return process.env.SEABRIDGE_WORKSPACE;
  const repo = path.resolve(__dirname, '..');
  const dotGit = path.join(repo, '.git');
  if (fs.existsSync(dotGit) && fs.statSync(dotGit).isFile()) {
    const match = fs.readFileSync(dotGit, 'utf8').match(/^gitdir:\s*(.+)$/m);
    if (match) {
      let cursor = path.resolve(repo, match[1].trim());
      while (path.basename(cursor).toLowerCase() !== '.git') {
        const parent = path.dirname(cursor);
        if (parent === cursor) break;
        cursor = parent;
      }
      if (path.basename(cursor).toLowerCase() === '.git') {
        return path.dirname(path.dirname(cursor));
      }
    }
  }
  return path.dirname(repo);
}

function main(argv) {
  const wsIdx = argv.indexOf('--workspace');
  const workspace = wsIdx >= 0 ? argv[wsIdx + 1] : defaultWorkspace();
  const all = [];
  for (const r of REPOS) {
    const repo = r.self ? path.resolve(__dirname, '..') : path.join(workspace, r.name);
    if (fs.existsSync(repo)) all.push(...checkRepo(repo, workspace, r.budget, { enforceCanonicalPolicy: !r.self }));
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

module.exports = { loadAdapterRegistry, expandImports, stripCode, alwaysLoadedRules, legacyEffectiveStacks, effectiveStacks, markerBlock, canonicalBlocks, brokenPathRefs, duplicatedLines, checkRepo, defaultWorkspace, REQUIRED, STALE, CODEX_CAP };

if (require.main === module) process.exit(main(process.argv.slice(2)));
