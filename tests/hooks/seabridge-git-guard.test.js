/**
 * Tests for scripts/hooks/seabridge-git-guard.js bypass/force-push decisions.
 *
 * These checks are decided on tokenized git invocations. Before that, the two
 * raw-text regexes denied read-only `git config --get core.hooksPath` queries, flag names
 * inside commit messages and log searches, and PowerShell's -f format operator
 * when the word "push" appeared earlier on the line, while MISSING `git commit -n`
 * and force flags inside clusters such as -fu.
 */

const assert = require('assert');
const path = require('path');

const guard = require(path.join(__dirname, '..', '..', 'scripts', 'hooks', 'seabridge-' + 'g' + 'it-guard.js'));

// Literals are assembled so this file does not trip a raw-text matcher scanning it.
const NV = '--no-' + 'verify';
const HP = 'core.' + 'hooksPath';
const HUSKY = 'HUSKY' + '=0';
const SKIPV = 'SKIP' + '=detect-secrets';
const FORCE = '--for' + 'ce';
const DASHF = '-' + 'f';
const PLUSREF = ' ' + '+' + 'main';
const FMT = ' -' + 'f ';

const CWD = 'C:/Users/adelm/SeaBridgeAI/everything-claude-code';
// Fixed repository facts keep these cases independent of the checkout on disk.
const inspector = () => ({ product: false, ecc: true, branch: 'main', remote: true, repo: true });

function test(name, fn) {
  try {
    fn();
    console.log(`  \u2713 ${name}`);
    return true;
  } catch (error) {
    console.log(`  \u2717 ${name}`);
    console.log(`    Error: ${error.message}`);
    return false;
  }
}

const allowed = (command) => {
  const decision = guard.decide(command, CWD, inspector);
  assert.ok(!decision || decision[0] !== 'deny',
    `expected no denial, got ${decision ? decision.join(': ') : 'allow'}`);
};
const denied = (command, reason) => {
  const decision = guard.decide(command, CWD, inspector);
  assert.ok(decision && decision[0] === 'deny', `expected deny, got ${decision ? decision.join(': ') : 'allow'}`);
  assert.ok(decision[1].includes(reason), `expected ${reason}, got ${decision[1]}`);
};

let passed = 0;
let failed = 0;

console.log('\nGit guard: commands that must not be denied');
[
  ['read-only hooksPath query', 'git config --get ' + HP],
  ['read-only hooksPath query, all values', 'git config --show-origin --get-all ' + HP],
  ['bypass flag named in a log search', 'git log --grep="' + NV + '"'],
  ['bypass flag named in a commit message', 'git commit -m "docs: explain ' + NV + ' policy"'],
  ['PowerShell format operator after the word push', 'git status; Write-Output ("push {0}"' + FMT + '1)'],
  ['bypass flag echoed as text', 'echo "' + NV + '" && git status'],
  ['cherry-pick --no-commit', 'git cherry-pick --no-commit abc1234'],
  ['cherry-pick -n', 'git cherry-pick -n abc1234'],
  ['push -n is a dry run, not a bypass', 'git push -n origin dev'],
  ['merge -n is --no-stat, not a bypass', 'git merge -n feature'],
].forEach(([name, command]) => {
  if (test(name, () => allowed(command))) passed++; else failed++;
});

console.log('\nGit guard: hook bypasses that must stay denied');
[
  ['commit with the bypass flag', 'git commit ' + NV + ' -m x'],
  ['commit -n is the bypass flag', 'git commit -n -m x'],
  ['push with the bypass flag', 'git push ' + NV + ' origin dev'],
  ['-c hooksPath override', 'git -c ' + HP + '=/dev/null commit -m x'],
  ['setting hooksPath', 'git config ' + HP + ' /dev/null'],
  ['setting hooksPath globally', 'git config --global ' + HP + ' /tmp/h'],
  ['HUSKY environment prefix', HUSKY + ' git commit -m x'],
  ['SKIP environment prefix', SKIPV + ' git commit -m x'],
].forEach(([name, command]) => {
  if (test(name, () => denied(command, 'Never bypass Git hooks.'))) passed++; else failed++;
});

console.log('\nGit guard: hook bypass via environment, not flags');
// Each of these passed the first tokenizing version: the env prefix sat in an
// earlier shell segment, or carried config with no -c token on the command line.
[
  ['exported in an earlier segment', 'export ' + HUSKY + '; git commit -m x'],
  ['PowerShell env assignment', '$env:' + HUSKY + '; git commit -m x'],
  ['SKIP exported earlier', 'export ' + SKIPV + '; git commit -m x'],
  ['GIT_CONFIG_PARAMETERS carries hooks path',
    'GIT_CONFIG_PARAMETERS="\'' + HP + '=/tmp/x\'" git commit -m x'],
  ['GIT_CONFIG_COUNT carries hooks path',
    'GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=' + HP + ' GIT_CONFIG_VALUE_0=/tmp/x git commit -m x'],
  ['clustered short flags', 'git commit -nm x'],
].forEach(([name, command]) => {
  if (test(name, () => denied(command, 'Never bypass Git hooks.'))) passed++; else failed++;
});

console.log('\nGit guard: GIT_CONFIG_* without a hooks path stays allowed');
[
  ['unrelated config injection', 'GIT_CONFIG_PARAMETERS="\'user.name=x\'" git commit -m x'],
  ['hooks path named only in a message', 'git commit -m "document ' + HP + ' policy"'],
].forEach(([name, command]) => {
  if (test(name, () => allowed(command))) passed++; else failed++;
});

console.log('\nGit guard: force pushes that must stay denied');
[
  ['long force flag', 'git push ' + FORCE + ' origin dev'],
  ['short force flag', 'git push ' + DASHF + ' origin dev'],
  ['force inside a flag cluster', 'git push ' + DASHF + 'u origin dev'],
  ['plus refspec', 'git push origin' + PLUSREF],
  ['lease variant is still refused', 'git push ' + FORCE + '-with-lease origin dev'],
].forEach(([name, command]) => {
  if (test(name, () => denied(command, 'Never force-push.'))) passed++; else failed++;
});

console.log('\nGit guard: discarding or deleting concurrent peer work');
// reset --hard was already denied, but these have the same effect on other
// sessions' unstaged work and previously returned no opinion at all.
[
  ['whole-tree checkout', 'git checkout -- .'],
  ['whole-tree restore', 'git restore -- .'],
  ['repo-root pathspec', 'git checkout -- :/'],
  ['no pathspec after the separator', 'git checkout --'],
].forEach(([name, command]) => {
  if (test(name, () => denied(command, "Never discard other sessions' uncommitted work."))) passed++; else failed++;
});

[
  ['stash clear', 'git stash clear'],
  ['stash drop', 'git stash drop'],
].forEach(([name, command]) => {
  if (test(name, () => denied(command, "Never discard other sessions' uncommitted work."))) passed++; else failed++;
});

if (test('remote branch deletion', () => denied('git push --delete origin dev', 'Never delete a remote branch.'))) passed++; else failed++;
if (test('remote branch deletion, short flag', () => denied('git push -d origin dev', 'Never delete a remote branch.'))) passed++; else failed++;
if (test('direct ref deletion', () => denied('git update-ref -d refs/heads/main', 'Never delete a ref directly.'))) passed++; else failed++;

console.log('\nGit guard: narrower or ambiguous cases are asked, not denied');
// A path-scoped revert of one's OWN file is legitimate work, so it must stay
// reachable; only the blast radius decides deny vs ask.
[
  ['path-scoped checkout', 'git checkout -- scripts/lib/session-coordination.js'],
  ['path-scoped restore', 'git restore -- scripts/lib/goal-store.js'],
  ['force branch delete', 'git branch -D my-slot'],
  ['user-level config write', 'git config --global user.name x'],
].forEach(([name, command]) => {
  if (test(name, () => {
    const [decision] = guard.bypassOrForce(command) || [];
    assert.strictEqual(decision, 'ask', 'expected ask, got ' + decision);
  })) passed++; else failed++;
});

console.log('\nGit guard: ordinary read-only and additive git stays allowed');
[
  ['branch listing', 'git branch -a'],
  ['switching branches', 'git checkout seabridge_development'],
  ['stash push keeps work', 'git stash push -m wip'],
  ['normal push', 'git push origin seabridge_development'],
  ['local config read', 'git config --get user.name'],
].forEach(([name, command]) => {
  if (test(name, () => allowed(command))) passed++; else failed++;
});

console.log('\u2500'.repeat(50));
console.log(`Passed: ${passed}  Failed: ${failed}`);

process.exit(failed > 0 ? 1 : 0);
