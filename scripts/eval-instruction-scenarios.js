#!/usr/bin/env node
/**
 * eval-instruction-scenarios.js — score the startup instruction stack each harness
 * loads against representative SeaBridgeAI tasks (evals/agent-instructions/scenarios.json).
 *
 * A scenario passes for a stack when every `must` pattern is present and no
 * `must_not` pattern is. This is a static coverage eval: it proves the guidance is
 * delivered (or that harmful scaffolding is gone), not that a model follows it —
 * pair it with fresh-session probes (see evals/agent-instructions/README.md).
 *
 * Usage: node scripts/eval-instruction-scenarios.js [--ref <git-ref>] [--json]
 *   --ref reads every instruction file at that commit (e.g. HEAD for "before").
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const WORKSPACE = path.resolve(__dirname, '..', '..');
const REPOS = ['manageesg-backend', 'manageesg-frontend', 'autoresearch'];

function reader(repo, ref) {
  return (rel) => {
    rel = rel.replace(/\\/g, '/');
    if (!ref) {
      const p = path.join(repo, rel);
      return fs.existsSync(p) ? fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '') : null;
    }
    try {
      return execFileSync('git', ['-C', repo, 'show', `${ref}:${rel}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    } catch { return null; }
  };
}

function listRules(repo, ref) {
  if (!ref) {
    const d = path.join(repo, '.claude', 'rules');
    return fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.md')).map((f) => `.claude/rules/${f}`) : [];
  }
  try {
    return execFileSync('git', ['-C', repo, 'ls-tree', '--name-only', `${ref}`, '.claude/rules/'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      .split('\n').filter((f) => f.endsWith('.md'));
  } catch { return []; }
}

function expand(read, rel, depth = 0, seen = new Set()) {
  if (seen.has(rel) || depth > 4) return '';
  seen.add(rel);
  const text = read(rel);
  if (text == null) return '';
  let out = text;
  const scan = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  for (const m of scan.matchAll(/(^|\s)@([^\s`]+\.md)\b/g)) {
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(rel), m[2]));
    out += '\n' + expand(read, target, depth + 1, seen);
  }
  return out;
}

function stacks(repoName, ref) {
  const repo = path.join(WORKSPACE, repoName);
  const read = reader(repo, ref);
  const out = {};
  const agents = read('AGENTS.md');
  if (agents != null) out.codex = agents;
  const entry = read('CLAUDE.md') != null ? 'CLAUDE.md' : (agents != null ? 'AGENTS.md' : null);
  if (entry) {
    let t = expand(read, entry);
    for (const r of listRules(repo, ref)) {
      const rt = read(r) || '';
      const fm = rt.match(/^---\n([\s\S]*?)\n---/);
      if (!(fm && /^paths:/m.test(fm[1]))) t += '\n' + rt;
    }
    out.claude = t;
  }
  return out;
}

function main(argv) {
  const refIdx = argv.indexOf('--ref');
  const ref = refIdx >= 0 ? argv[refIdx + 1] : null;
  const { scenarios } = JSON.parse(fs.readFileSync(path.join(WORKSPACE, 'everything-claude-code', 'evals', 'agent-instructions', 'scenarios.json'), 'utf8'));
  const rows = [];
  for (const repo of REPOS) {
    for (const [harness, text] of Object.entries(stacks(repo, ref))) {
      for (const s of scenarios) {
        if (s.repos && !s.repos.includes(repo)) continue;
        const missing = (s.must || []).filter((p) => !new RegExp(p, 'i').test(text));
        const harmful = (s.must_not || []).filter((p) => new RegExp(p, 'i').test(text));
        rows.push({ repo, harness, scenario: s.id, pass: !missing.length && !harmful.length, missing, harmful });
      }
    }
  }
  if (argv.includes('--json')) { process.stdout.write(JSON.stringify(rows, null, 1) + '\n'); return 0; }
  const key = (r) => `${r.repo} / ${r.harness}`;
  const groups = {};
  for (const r of rows) (groups[key(r)] ||= []).push(r);
  console.log(`Instruction scenario eval (${ref ? `ref ${ref}` : 'working tree'})`);
  let pass = 0;
  for (const [k, rs] of Object.entries(groups)) {
    const p = rs.filter((r) => r.pass).length;
    pass += p;
    console.log(`  ${k.padEnd(34)} ${p}/${rs.length}  ${rs.filter((r) => !r.pass).map((r) => r.scenario.slice(0, 3)).join(' ')}`);
  }
  console.log(`  TOTAL ${pass}/${rows.length}`);
  if (argv.includes('--verbose')) for (const r of rows.filter((x) => !x.pass)) console.log(`    ${key(r)} ${r.scenario}: missing=${JSON.stringify(r.missing)} harmful=${JSON.stringify(r.harmful)}`);
  return 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));
