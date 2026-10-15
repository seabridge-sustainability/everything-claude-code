#!/usr/bin/env node
'use strict';
// Supplementary Claude guard, NOT an approval issuer or a general shell sandbox.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
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

// Skip pager options and identity/display -c settings; any other global option stays unresolved.
// Disabling commit signing is accepted only for local scratch repositories (checked once the target is known).
const SAFE_CONFIG = /^(?:user\.(?:name|email)|core\.(?:autocrlf|safecrlf|quotepath|longpaths)|color\.[\w.]+|advice\.\w+|init\.defaultBranch)=/i;
const SCRATCH_CONFIG = /^commit\.gpgsign=false$/i;
function subcommand(tokens, i, flags = {}) {
  for (;;) {
    if (tokens[i] === '--no-pager' || tokens[i] === '-P') i += 1;
    else if (tokens[i] === '-c' && SAFE_CONFIG.test(tokens[i + 1] || '')) i += 2;
    else if (tokens[i] === '-c' && SCRATCH_CONFIG.test(tokens[i + 1] || '')) { flags.scratchOnly = true; i += 2; }
    else return i;
  }
}

const AMBIGUOUS = ['ask', 'Git mutation target is ambiguous; use a direct git -C invocation and existing bounded authorization.'];
const INVOCATION = /(?:^|[\s;&|(){}`'"/\\])git(?:\.exe)?["']?(?=\s)([^;&|\r\n)]*)/gi;
const DIR_CHANGE = /(?:^|[;&|\r\n({])\s*(cd|pushd|chdir|Set-Location|Push-Location|sl)\s+("[^"\r\n]*"|'[^'\r\n]*'|[^\s;&|)}]+)/gi;
const DIR_POP = /(?:^|[;&|\r\n({])\s*(?:popd|Pop-Location)\b/gi;
const ASSIGN = /(?:^|[;&|\r\n({])\s*(?:\$([A-Za-z_]\w*)\s*=\s*|([A-Za-z_]\w*)=)(\$\([^()\r\n]*\)|"[^"\r\n]*"|'[^'\r\n]*'|[^\s;&|)}]*)/g;
const MKTEMP_DIR = /^\$\(\s*mktemp\s+(?:[^()\r\n]*\s)?-d\b[^()\r\n]*\)$/;
const LITERAL_PUSH_REF = /^[^:\s]*:[\w./-]+$/;
// Unquoted redirections (> out, 2>&1, < in) end the git arguments; their targets are not refs or flags.
const gitArgs = text => {
  const raw = text.match(/"[^"\r\n]*"|'[^'\r\n]*'|[^\s]+/g) || [];
  const end = raw.findIndex(t => /^(?:\d*>|<)/.test(t));
  return (end < 0 ? raw : raw.slice(0, end)).map(t => /^['"]/.test(t) ? t.slice(1, -1) : t);
};
const tokenize = text => (text.match(/"[^"\r\n]*"|'[^'\r\n]*'|[^\s]+/g) || []).map(t => /^['"]/.test(t) ? t.slice(1, -1) : t);

// Variables assigned exactly once in this command to a literal (or to earlier literals) are expanded;
// substitutions, loop variables, environment variables and reassigned names stay unresolved. X=$(mktemp -d)
// names a new empty temporary directory, so it expands to a path that cannot hold an existing repository.
// Unquoted values with parentheses (Python's O=Path(...) inside python -c) are not shell assignments.
function literalVars(command) {
  const vars = new Map();
  for (const m of command.matchAll(ASSIGN)) {
    const name = m[1] || m[2], raw = m[3];
    if (!raw.startsWith('$(') && !/^['"]/.test(raw) && raw.includes('(')) continue;
    const quoted = raw.match(/^(['"])(.*)\1$/);
    const value = MKTEMP_DIR.test(raw) ? path.join(os.tmpdir(), `.seabridge-guard-mktemp-${m.index}`)
      : quoted?.[1] === "'" ? quoted[2] : expand(quoted ? quoted[2] : raw, vars, m.index);
    vars.set(name, vars.has(name) ? { value: null, at: m.index } : { value, at: m.index });
  }
  return vars;
}

function expand(text, vars, at) {
  if (typeof text !== 'string') return null;
  let ok = true;
  const out = text.replace(/\$\{(\w+)\}|\$(\w+)(?!:)/g, (_, braced, bare) => {
    const v = vars.get(braced || bare);
    if (!v || v.value == null || v.at >= at) ok = false;
    return ok ? v.value : '';
  });
  return ok && !/[$`]/.test(out) ? out : null;
}

// Git Bash spells C:/x as /c/x; path.resolve would read it as <drive>:/c/x and fail inspection.
const shellPath = (base, value) => path.resolve(base, process.platform === 'win32' ? value.replace(/^\/([a-z])(?=\/|$)/i, (_, d) => `${d.toUpperCase()}:`) : value);

// Standing owner approval for release worktrees lives in a file only Alejandro edits: one path pattern per line
// (`*` matches within one path segment). Only `git worktree add --detach <path>` without -b/-B/--orphan/--force
// to a matching path is approved; any other new worktree asks.
const norm = p => p.replace(/\\/g, '/').replace(/\/+$/, '');
function approvedWorktreePatterns() {
  const file = process.env.SEABRIDGE_GUARD_WORKTREE_APPROVALS || path.join(os.homedir(), '.claude', 'approvals', 'worktrees.txt');
  let lines = [];
  try { lines = fs.readFileSync(file, 'utf8').split(/\r?\n/); } catch (_) { return []; }
  return lines.map(l => l.trim()).filter(l => l && !l.startsWith('#')).map(glob => new RegExp(
    `^${norm(shellPath(process.cwd(), glob)).split('*').map(s => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*')}$`,
    process.platform === 'win32' ? 'i' : ''));
}

function worktreeAdd(args, dir) {
  if (args[0] !== 'add') return null;
  const flags = args.slice(1).filter(a => a.startsWith('-'));
  const target = args.slice(1).find(a => !a.startsWith('-'));
  const approved = Boolean(target) && flags.includes('--detach')
    && !flags.some(f => /^(?:-[bB]|--orphan|-f|--force)$/.test(f))
    && approvedWorktreePatterns().some(rx => rx.test(norm(shellPath(dir, target))));
  return { approved, target: target ? norm(shellPath(dir, target)) : null };
}

function literalDir(base, value) {
  if (!value || value.startsWith('-') || /[$`%~]/.test(value)) return null;
  return shellPath(base, value);
}

// Compound commands: classify each visible git invocation instead of matching mutation words anywhere
// (paths like app/core/config.py or a cd prefix are not mutations). A mutation is resolved like a direct
// invocation only when its target is literal: literal cd steps before it (none inside a subshell or undone
// by popd), literal -C, no alternate git dir, no branch switch alongside other mutations, and no expanded
// push/reset/clean args.
function closingParen(text, open) {
  let depth = 0, quoted = false;
  for (let i = open; i < text.length; i += 1) {
    if (text[i] === "'") quoted = !quoted;
    else if (!quoted && text[i] === '(') depth += 1;
    else if (!quoted && text[i] === ')' && (depth -= 1) === 0) return i;
  }
  return -1;
}

// Heredoc and here-string bodies fed to a non-shell program (cat > NOTES.md, python -, node -) are data, not
// commands; bodies fed to a shell interpreter stay visible. Backslash-newline continuations are joined.
function stripDataBodies(command) {
  const out = [];
  let end = null;
  for (const line of command.replace(/\\\r?\n/g, ' ').split(/\r?\n/)) {
    if (end) {
      if (end.here ? line.trimStart().startsWith(end.mark) : line.replace(/^\t+/, '').trim() === end.mark) end = null;
      continue;
    }
    out.push(line);
    const shell = /(?:^|[\s;&|(])(?:bash|sh|zsh|pwsh|powershell(?:\.exe)?|cmd|iex|Invoke-Expression|source|\.)\s*(?:-\S+\s*)*<<|\|\s*(?:bash|sh|zsh|pwsh|powershell(?:\.exe)?|cmd|iex|Invoke-Expression)\b/i;
    const doc = line.match(/<<-?\s*(['"]?)([A-Za-z_][\w-]*)\1/);
    if (doc && !shell.test(line)) end = { mark: doc[2], here: false };
    else if (/@(["'])\s*$/.test(line) && !/(?:iex|Invoke-Expression)\b/i.test(line)) end = { mark: `${line.trimEnd().slice(-1)}@`, here: true };
  }
  return out.join('\n');
}

function decideCompound(command, cwd, inspector) {
  command = stripDataBodies(command);
  const mutations = [];
  for (const match of command.matchAll(INVOCATION)) {
    const rest = match[1], tokens = gitArgs(rest), flags = {};
    let i = subcommand(tokens, 0, flags);
    const dirs = [];
    while (tokens[i] === '-C') { dirs.push(tokens[i + 1]); i = subcommand(tokens, i + 2, flags); }
    const op = tokens[i], args = tokens.slice(i + 1);
    if (!op) continue;
    // A subcommand hidden in a variable or substitution cannot be classified; fall back to the whole command.
    if (/[$`]/.test(op) || op.startsWith('-')) { if (MUTATE.test(/[$`]/.test(op) ? command : rest)) return AMBIGUOUS; continue; }
    if (readOnly(op, args) || !MUTATE.test(rest)) continue;
    mutations.push({ op, args, dirs, at: match.index, scratchOnly: Boolean(flags.scratchOnly) });
  }
  if (!mutations.length) return null;
  if (/--git-dir|--work-tree|\bGIT_(?:DIR|WORK_TREE)\b/i.test(command)) return AMBIGUOUS;
  if (mutations.length > 1 && mutations.some(m => (m.op === 'checkout' || m.op === 'switch') && !m.args.includes('--detach'))) return AMBIGUOUS;
  const vars = literalVars(command);
  const steps = [...command.matchAll(DIR_CHANGE), ...command.matchAll(DIR_POP)].sort((a, b) => a.index - b.index);
  // A cd inside ( ... ) only moves the commands inside those parentheses; { ... } blocks stay unresolved.
  for (const step of steps) {
    const lead = step[0].trimStart();
    if (lead.startsWith('{')) return AMBIGUOUS;
    if (lead.startsWith('(')) {
      step.scopeEnd = closingParen(command, step.index + step[0].indexOf('('));
      if (step.scopeEnd < 0) return AMBIGUOUS;
      step.noGit = !mutations.some(m => m.at > step.index && m.at < step.scopeEnd);
    }
  }
  let result = null;
  const approvedRoots = [];
  for (const { op, args: rawArgs, dirs, at, scratchOnly } of mutations) {
    let args = rawArgs;
    let dir = cwd;
    const stack = [];
    // A subshell cd with no git inside reads like a target change for what follows, unless a later cd that
    // applies to this mutation sets the target explicitly.
    let subshellOnly = false;
    for (const step of steps) {
      if (step.index >= at) break;
      if (step.scopeEnd !== undefined && at > step.scopeEnd) { subshellOnly = subshellOnly || step.noGit; continue; }
      subshellOnly = false;
      if (!step[1]) { if (!stack.length) return AMBIGUOUS; dir = stack.pop(); continue; }
      const target = literalDir(dir, expand(step[2].replace(/^(['"])(.*)\1$/, '$2'), vars, step.index));
      if (!target) return AMBIGUOUS;
      if (/^(?:pushd|Push-Location)$/i.test(step[1])) stack.push(dir);
      dir = target;
    }
    if (subshellOnly) return AMBIGUOUS;
    for (const value of dirs) { dir = literalDir(dir, expand(value, vars, at)); if (!dir) return AMBIGUOUS; }
    if (op === 'worktree' && args[0] === 'add') {
      const target = args.slice(1).find(a => !a.startsWith('-'));
      const literal = target && literalDir(dir, expand(target.replace(/^(['"])(.*)\1$/, '$2'), vars, at));
      if (target && !literal) return AMBIGUOUS;
      args = args.map(a => (a === target ? literal : a));
    }
    if (['reset', 'clean'].includes(op) && args.some(a => /[$`]/.test(a))) return AMBIGUOUS;
    // A push may name its source through a variable only when the destination branch is literal.
    if (op === 'push' && args.some(a => /[$`]/.test(a) && !LITERAL_PUSH_REF.test(a))) return AMBIGUOUS;
    // A directory created later in this command (mkdir; git init) holds no existing repository or branch.
    // Clone, worktree and submodule can materialize a protected checkout there, so they stay unresolved.
    const scoped = target => {
      try { return inspector(target); } catch (error) {
        if (fs.existsSync(target)) throw error;
        // A detached worktree this command creates at an approved path: its own checkout on no branch. Pushes to
        // main still ask, and destructive reset/clean there asks instead of being denied as shared product work.
        if (approvedRoots.some(r => norm(target) === r || norm(target).startsWith(`${r}/`))) return { product: false, ecc: false, branch: '', remote: true };
        if (!/\b(?:clone|worktree\s+add|submodule)\b/i.test(command)) return { repo: false };
        throw error;
      }
    };
    const decision = decideOperation(op, args, dir, scoped, scratchOnly);
    if (!decision && op === 'worktree') { const added = worktreeAdd(args, dir); if (added?.approved) approvedRoots.push(added.target); }
    if (decision?.[0] === 'deny') return decision;
    result = result || decision;
  }
  return result;
}

function inspect(dir) {
  const git = args => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 5000 }).trim();
  let commonDir;
  try { commonDir = git(['rev-parse', '--git-common-dir']); } catch (error) {
    // An existing directory outside any repository has no branch to protect (git apply works as a plain patch tool).
    if (/not a git repository/i.test(String(error.stderr || ''))) return { repo: false };
    throw error;
  }
  const common = path.resolve(dir, commonDir).replace(/\\/g, '/');
  let remote = '';
  try { remote = git(['remote', 'get-url', 'origin']); } catch (_) { /* common directory remains authoritative */ }
  const product = /(?:^|[/:])manageesg-(backend|frontend)(?:\.git)?\/?$/i.test(remote) || /\/manageesg-(backend|frontend)\/\.git$/i.test(common);
  const ecc = /(?:^|[/:])everything-claude-code(?:\.git)?\/?$/i.test(remote) || /\/everything-claude-code(?:-runtime)?\/\.git$/i.test(common);
  let branch = '';
  try { branch = git(['symbolic-ref', '--short', 'HEAD']); } catch (_) { /* detached HEAD */ }
  return { product, ecc, branch, remote: Boolean(remote) };
}

function decide(command, cwd, inspector = inspect) {
  if (typeof command !== 'string' || !command.trim() || typeof cwd !== 'string') return ['deny', 'Git guard: malformed tool payload; no execution authorized.'];
  if (!/\bgit(?:\.exe)?\b/i.test(command)) return null;
  if (/--no-verify\b|(?:core\.hooksPath|HUSKY\s*=\s*0|SKIP\s*=)/i.test(command)) return ['deny', 'Never bypass Git hooks.'];
  if (/\bpush\b[^\n;&|]*(?:\s--force\S*|\s-[a-z]*f\b|\s\+\S)/i.test(command)) return ['deny', 'Never force-push.'];
  // Scripts, aliases and opaque shell expansion are never interpreted; see decideCompound.
  if (!/^\s*git(?:\.exe)?\s/i.test(command) || /[;&|\r\n`$><]/.test(command)) return decideCompound(command, cwd, inspector);
  const tokens = tokenize(command), flags = {};
  let dir = cwd, i = subcommand(tokens, 1, flags);
  while (tokens[i] === '-C') { if (!tokens[i + 1]) return ['deny', 'Missing git -C directory.']; dir = shellPath(dir, tokens[i + 1]); i = subcommand(tokens, i + 2, flags); }
  return decideOperation(tokens[i], tokens.slice(i + 1), dir, inspector, Boolean(flags.scratchOnly));
}

function decideOperation(op, args, dir, inspector, scratchOnly = false) {
  if (op && readOnly(op, args)) return null;
  if (op === 'worktree' && args[0] === 'add' && !worktreeAdd(args, dir).approved) {
    return ['ask', 'New worktree outside the standing release-worktree approval (detached, approved path) needs explicit owner approval.'];
  }
  if (!op || op.startsWith('-') || !MUTATE.test(op)) return ['ask', 'Unresolved Git options/alias; guard cannot verify its target.'];
  let repo;
  try { repo = inspector(dir); } catch (_) { return ['ask', 'Cannot verify Git repository/branch; no silent approval.']; }
  if (repo.repo === false) return null;
  if (scratchOnly && (repo.product || repo.ecc || repo.remote !== false)) {
    return ['ask', 'Commit signing may be disabled only in a local scratch repository without a remote.'];
  }
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
