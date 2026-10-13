#!/usr/bin/env node
'use strict';
// Supplementary Claude guard, NOT an approval issuer or a general shell sandbox.
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const READ = new Set(['status', 'diff', 'log', 'show', 'rev-parse', 'rev-list', 'ls-files', 'ls-tree', 'ls-remote', 'check-ref-format', 'help', 'version', '--version',
  'grep', 'blame', 'annotate', 'cat-file', 'describe', 'shortlog', 'for-each-ref', 'show-ref', 'show-branch', 'name-rev', 'merge-base', 'diff-tree', 'diff-index',
  'diff-files', 'range-diff', 'cherry', 'check-ignore', 'check-attr', 'count-objects', 'whatchanged', 'var']);
const MUTATE = /\b(commit|push|merge|cherry-pick|revert|reset|clean|checkout|switch|branch|tag|update-ref|symbolic-ref|read-tree|config|rebase|stash|fetch|pull|worktree|add|restore|rm|mv|apply)\b/;
const BRANCH_LIST = /^(?:--show-current|--list|-l|-a|--all|-r|--remotes|-v|-vv|--verbose|--contains|--no-contains|--merged|--no-merged|--points-at|--color|--no-color|--column|--no-column|--abbrev(?:=\d+)?|--no-abbrev|--omit-empty|--sort=.*|--format=.*)$/;

// Listing/inspection forms of otherwise-mutating subcommands. Anything unlisted keeps its mutation handling.
function readOnly(op, args) {
  if (READ.has(op)) return true;
  const flags = args.filter(a => a.startsWith('-')), plain = args.filter(a => !a.startsWith('-'));
  switch (op) {
    case 'branch': return flags.every(f => BRANCH_LIST.test(f)) && (!plain.length || flags.some(f => /^(?:--list|-l|--contains|--no-contains|--merged|--no-merged|--points-at)$/.test(f)));
    case 'tag': return flags.every(f => /^(?:-l|--list|-n\d*|--contains|--no-contains|--merged|--no-merged|--points-at|--sort=.*|--format=.*)$/.test(f)) && (!plain.length || flags.some(f => f === '-l' || f === '--list'));
    case 'remote': return flags.every(f => f === '-v' || f === '--verbose') && (!plain.length || ['get-url', 'show'].includes(plain[0]));
    case 'stash': return ['list', 'show'].includes(plain[0]);
    case 'worktree': return plain[0] === 'list';
    case 'reflog': return !plain.length || plain[0] === 'show';
    case 'config': return (['get', 'list'].includes(plain[0]) || flags.some(f => /^(?:--get|--get-all|--get-regexp|--list|-l)$/.test(f)))
      && !flags.some(f => /^(?:--add|--unset|--unset-all|--replace-all|--rename-section|--remove-section|--edit|-e)$/.test(f));
    case 'apply': return flags.some(f => /^(?:--check|--stat|--numstat|--summary)$/.test(f)) && !flags.includes('--apply');
    default: return false;
  }
}

// Skip pager-only global options; any other global option stays unresolved.
function subcommand(tokens, i) {
  while (tokens[i] === '--no-pager' || tokens[i] === '-P') i += 1;
  return i;
}

const AMBIGUOUS = ['ask', 'Git mutation target is ambiguous; use a direct git -C invocation and existing bounded authorization.'];
const INVOCATION = /(?:^|[\s;&|(){}`'"/\\])git(?:\.exe)?["']?(?=\s)([^;&|\r\n)]*)/gi;
const DIR_CHANGE = /(?:^|[;&|\r\n(])\s*(?:cd|pushd|chdir|Set-Location|sl)\s+("[^"\r\n]*"|'[^'\r\n]*'|[^\s;&|)]+)/gi;
const tokenize = text => (text.match(/"[^"\r\n]*"|'[^'\r\n]*'|[^\s]+/g) || []).map(t => /^['"]/.test(t) ? t.slice(1, -1) : t);

function literalDir(base, value) {
  if (!value || value.startsWith('-') || /[$`%~]/.test(value)) return null;
  return path.resolve(base, process.platform === 'win32' ? value.replace(/^\/([a-z])(?=\/|$)/i, '$1:') : value);
}

// Compound commands: classify each visible git invocation instead of matching mutation words anywhere
// (paths like app/core/config.py or a cd prefix are not mutations). A mutation is resolved like a direct
// invocation only when its target is literal: no directory change or one leading literal cd, literal -C,
// no alternate git dir, no branch switch alongside other mutations, and no expanded push/reset/clean args.
function decideCompound(command, cwd, inspector) {
  const mutations = [];
  for (const [, rest] of command.matchAll(INVOCATION)) {
    const tokens = tokenize(rest);
    let i = subcommand(tokens, 0);
    const dirs = [];
    while (tokens[i] === '-C') { dirs.push(tokens[i + 1]); i = subcommand(tokens, i + 2); }
    const op = tokens[i], args = tokens.slice(i + 1);
    if (!op) continue;
    // A subcommand hidden in a variable or substitution cannot be classified; fall back to the whole command.
    if (/[$`]/.test(op) || op.startsWith('-')) { if (MUTATE.test(/[$`]/.test(op) ? command : rest)) return AMBIGUOUS; continue; }
    if (readOnly(op, args) || !MUTATE.test(rest)) continue;
    mutations.push({ op, args, dirs });
  }
  if (!mutations.length) return null;
  if (/--git-dir|--work-tree|\bGIT_(?:DIR|WORK_TREE)\b/i.test(command)) return AMBIGUOUS;
  if (mutations.length > 1 && mutations.some(m => m.op === 'checkout' || m.op === 'switch')) return AMBIGUOUS;
  const changes = [...command.matchAll(DIR_CHANGE)];
  if (changes.length > 1 || (changes.length === 1 && command.slice(0, changes[0].index).trim())) return AMBIGUOUS;
  const base = changes.length ? literalDir(cwd, changes[0][1].replace(/^(['"])(.*)\1$/, '$2')) : cwd;
  if (!base) return AMBIGUOUS;
  let result = null;
  for (const { op, args, dirs } of mutations) {
    let dir = base;
    for (const value of dirs) { dir = literalDir(dir, value); if (!dir) return AMBIGUOUS; }
    if (['push', 'reset', 'clean'].includes(op) && args.some(a => /[$`]/.test(a))) return AMBIGUOUS;
    const decision = decideOperation(op, args, dir, inspector);
    if (decision?.[0] === 'deny') return decision;
    result = result || decision;
  }
  return result;
}

function inspect(dir) {
  const git = args => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 5000 }).trim();
  const common = path.resolve(dir, git(['rev-parse', '--git-common-dir'])).replace(/\\/g, '/');
  let remote = '';
  try { remote = git(['remote', 'get-url', 'origin']); } catch (_) { /* common directory remains authoritative */ }
  const product = /(?:^|[/:])manageesg-(backend|frontend)(?:\.git)?\/?$/i.test(remote) || /\/manageesg-(backend|frontend)\/\.git$/i.test(common);
  const ecc = /(?:^|[/:])everything-claude-code(?:\.git)?\/?$/i.test(remote) || /\/everything-claude-code(?:-runtime)?\/\.git$/i.test(common);
  let branch = '';
  try { branch = git(['symbolic-ref', '--short', 'HEAD']); } catch (_) { /* detached HEAD */ }
  return { product, ecc, branch };
}

function decide(command, cwd, inspector = inspect) {
  if (typeof command !== 'string' || !command.trim() || typeof cwd !== 'string') return ['deny', 'Git guard: malformed tool payload; no execution authorized.'];
  if (!/\bgit(?:\.exe)?\b/i.test(command)) return null;
  if (/--no-verify\b|(?:core\.hooksPath|HUSKY\s*=\s*0|SKIP\s*=)/i.test(command)) return ['deny', 'Never bypass Git hooks.'];
  if (/\bpush\b[^\n;&|]*(?:\s--force\S*|\s-[a-z]*f\b|\s\+\S)/i.test(command)) return ['deny', 'Never force-push.'];
  // Scripts, aliases and opaque shell expansion are never interpreted; see decideCompound.
  if (!/^\s*git(?:\.exe)?\s/i.test(command) || /[;&|\r\n`$><]/.test(command)) return decideCompound(command, cwd, inspector);
  const tokens = tokenize(command);
  let dir = cwd, i = subcommand(tokens, 1);
  while (tokens[i] === '-C') { if (!tokens[i + 1]) return ['deny', 'Missing git -C directory.']; dir = path.resolve(dir, tokens[i + 1]); i = subcommand(tokens, i + 2); }
  return decideOperation(tokens[i], tokens.slice(i + 1), dir, inspector);
}

function decideOperation(op, args, dir, inspector) {
  if (op && readOnly(op, args)) return null;
  if (!op || op.startsWith('-') || !MUTATE.test(op)) return ['ask', 'Unresolved Git options/alias; guard cannot verify its target.'];
  let repo;
  try { repo = inspector(dir); } catch (_) { return ['ask', 'Cannot verify Git repository/branch; no silent approval.']; }
  if ((op === 'reset' && args.includes('--hard')) || (op === 'clean' && args.some(a => /^-[a-z]*f/.test(a)))) {
    return [repo.product ? 'deny' : 'ask', 'Destructive reset/clean is prohibited on shared product work; preserve concurrent changes.'];
  }
  const mutatesCurrent = ['commit', 'merge', 'cherry-pick', 'revert', 'rebase', 'reset', 'add', 'restore', 'rm', 'mv', 'apply', 'read-tree'].includes(op);
  // ECC main is its ordinary release branch, not backend/frontend production.
  // Return no extra opinion, NEVER "allow": normal permissions still apply.
  if (op === 'push') {
    const refs = args.filter(a => !a.startsWith('-'));
    const destinationMain = refs.some(a => /(?:^|:)refs\/heads\/main$|(?:^|:)main$/.test(a));
    const implicitMain = args.includes('--all') || args.includes('--mirror') || (repo.branch === 'main' && (refs.length <= 1 || refs.slice(1).some(a => ['HEAD', 'main', 'refs/heads/main'].includes(a))));
    if ((destinationMain || implicitMain) && (repo.product || !repo.ecc)) return ['ask', 'Push to main requires explicit bounded owner authorization for this repository; reuse it if already granted.'];
  }
  if (mutatesCurrent && repo.branch === 'main' && (repo.product || !repo.ecc)) return ['ask', 'Main-branch mutation requires explicit bounded owner authorization; reuse it if already granted.'];
  return null;
}

function run(raw) {
  let input, decision;
  try { input = JSON.parse(raw); } catch (_) { decision = ['deny', 'Git guard: malformed hook JSON; execution refused.']; }
  if (!decision) decision = decide(input?.tool_input?.command, input?.cwd);
  return decision ? { hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: decision[0], permissionDecisionReason: decision[1] } } : null;
}
if (require.main === module) {
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { raw += chunk; });
  process.stdin.on('end', () => { const result = run(raw); if (result) process.stdout.write(JSON.stringify(result)); });
}
module.exports = { decide, run, inspect };
