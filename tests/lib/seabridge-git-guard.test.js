'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { decide, run } = require('../../scripts/hooks/seabridge-git-guard');
const cwd = process.cwd();
const ecc = () => ({ ecc: true, product: false, branch: 'main' });
const product = () => ({ ecc: false, product: true, branch: 'main' });
const development = () => ({ ecc: false, product: true, branch: 'development' });
test('ECC normal release does not gain an allow or redundant main ask', () => {
  for (const command of ['git commit -m fix', 'git merge origin/main', 'git push origin HEAD:main', 'git push origin', 'git push origin refs/heads/main']) assert.equal(decide(command, cwd, ecc), null, command);
});
test('product main remains separately protected, including implicit pushes', () => {
  for (const command of ['git commit -m fix', 'git push origin main', 'git push origin HEAD:refs/heads/main', 'git push origin', 'git push origin HEAD']) assert.equal(decide(command, cwd, product)[0], 'ask', command);
  assert.equal(decide('git push --all origin', cwd, development)[0], 'ask');
  assert.equal(decide('git commit -m fix', cwd, () => ({ ecc: true, product: true, branch: 'main' }))[0], 'ask', 'product identity wins over a substituted remote');
  assert.equal(decide('git push origin HEAD:development', cwd, development), null);
});
test('hard safety denials apply even to ECC', () => {
  for (const command of ['git commit --no-verify', 'git push --force', 'git push --force-with-lease', 'git push -f origin main', 'git push origin +HEAD:main', 'git -c core.hooksPath=none commit']) assert.equal(decide(command, cwd, ecc)[0], 'deny', command);
});
test('shared destructive operations cannot be approved accidentally', () => {
  assert.equal(decide('git reset --hard HEAD', cwd, product)[0], 'deny');
  assert.equal(decide('git clean -fd', cwd, product)[0], 'deny');
});
test('git -C is resolved; inspection failure and opaque writes are not allowed silently', () => {
  let received;
  assert.equal(decide('git -C "../ecc space" commit -m fix', cwd, dir => { received = dir; return ecc(); }), null);
  assert.equal(received, path.resolve(cwd, '../ecc space'));
  assert.equal(decide('git commit -m fix', cwd, () => { throw Error('missing'); })[0], 'ask');
  for (const command of ['cd $OTHER; git commit -m fix', '(cd $D && git commit -m fix)', '(cd a && git commit -m fix', 'popd; git commit -m fix', 'git -c alias.publish=push publish', 'git --git-dir elsewhere commit', 'GIT_DIR=x git commit -m fix', 'git -C $TARGET push']) assert.equal(decide(command, cwd, ecc)[0], 'ask', command);
  assert.equal(decide('git commit -m fix && git push', cwd, product)[0], 'ask');
});
test('read-only and unrelated tools remain unaffected; malformed events deny', () => {
  assert.equal(decide('git status --short', cwd, product), null);
  assert.equal(decide('node check.js', cwd), null);
  assert.equal(run('{bad').hookSpecificOutput.permissionDecision, 'deny');
  assert.equal(run('{}').hookSpecificOutput.permissionDecision, 'deny');
});
test('read-only compound and inspection commands do not ask', () => {
  for (const command of [
    'cd /c/repo; git branch --show-current', 'git -C repo log --oneline -3; git -C repo status --short | head -20',
    'git diff -- app/core/config.py | head', 'git --no-pager log -1', 'git -C repo --no-pager show HEAD', 'git grep -n add',
    'git remote -v', 'git stash list', 'git worktree list', 'git tag --list', 'git config --get user.name', 'git branch -a',
    'git apply --check --stat fix.patch', 'cd x; git apply --check --stat fix.patch', 'node "C:/x/git-guard.js" && echo config',
    '$b = git branch --show-current; Write-Output $b', 'git -C repo log -1 2>&1',
  ]) assert.equal(decide(command, cwd, product), null, command);
});
test('mutating compound commands on protected or unresolved targets still ask', () => {
  for (const command of [
    'cd x; git add .', 'git status && git commit -m fix', 'cd x; git apply fix.patch', 'git -C $T --no-pager push',
    'cd x; git -c core.pager=x commit', 'cd x; git remote add up url', 'git log -1 && git push origin main',
    'op=commit; git $op -m fix', '$c = "push"; git $c origin', 'git `echo commit` -m fix', 'git push origin $BRANCH; echo ok',
  ]) assert.equal(decide(command, cwd, product)[0], 'ask', command);
  for (const command of ['git checkout main && git commit -m fix', 'git fetch; git reset $MODE'])
    assert.equal(decide(command, cwd, development)[0], 'ask', command);
  assert.equal(decide('cd x; git reset --hard HEAD', cwd, product)[0], 'deny');
});
test('compound mutations with a literal target resolve like direct invocations', () => {
  const heredoc = "A=src/x; git add -- $A/a.test.tsx && git diff --cached --name-only && timeout 500 git commit -m \"$(cat <<'EOF'\nfix: msg\n\nbody\nEOF\n)\"";
  for (const command of [heredoc, "gh run view 1; git fetch origin development 2>&1 | tail -1; git log --oneline HEAD..origin/development | head",
    'node ecc.js session register --scope a; git apply a.patch b.patch && echo APPLIED; git status --short | grep -v x',
    'git add -A && git commit -m fix && git push origin development', 'git log -1; git branch new-feature', 'cd x; git stash', 'cd x; git tag v1'])
    assert.equal(decide(command, cwd, development), null, command);
  let received;
  assert.equal(decide('cd ../fe && git add . && git -C sub commit -m x', cwd, dir => { received = dir; return { ecc: false, product: true, branch: 'development' }; }), null);
  assert.equal(received, path.resolve(cwd, '../fe', 'sub'));
  assert.equal(decide('cd ../ecc; git commit -m fix && git push origin main', cwd, ecc), null, 'ECC main stays its normal release branch');
  const seen = [];
  const record = dir => { seen.push(dir); return { ecc: false, product: true, branch: 'development' }; };
  const ps = "$E='C:\\x\\ecc.js'; cd ../fe; node $E session register --scope a 2>&1 | Select-String state; git apply --check fix.diff 2>&1; if ($LASTEXITCODE -eq 0) { git apply fix.diff; 'applied' }";
  assert.equal(decide(ps, cwd, record), null);
  assert.equal(decide('echo x; cd ../a && git add . ; cd b; git commit -m x', cwd, record), null);
  assert.deepEqual(seen, [path.resolve(cwd, '../fe'), path.resolve(cwd, '../a'), path.resolve(cwd, '../a', 'b')]);
  assert.equal(decide('git --no-pager commit -m fix', cwd, product)[0], 'ask');
});
test('real agent commands with literal variables, location stacks and safe -c resolve (2026-10-13 regressions)', () => {
  const seen = [];
  const at = dir => { seen.push(dir); return { ecc: false, product: dir.includes('fe'), branch: 'development' }; };
  for (const command of [
    '$O="../ov"; $P="../patches"; Copy-Item a b; Push-Location $O; git apply --whitespace=nowarn "$P\\b5.diff" 2>&1 | Select-Object -First 6; "exit $LASTEXITCODE"; Pop-Location',
    '$I="../integ"; cd "$I/ov"; git rev-parse --is-inside-work-tree 2>&1; foreach ($f in $L) { git apply --whitespace=nowarn "$P\\$f" 2>&1 }',
    'S="../stack"; cd ../fe && rm -rf "$S"; mkdir -p "$S"; cd "$S"; git init -q && git add -A && git -c user.email=x@y -c user.name=x commit -q -m base && for f in $L; do git apply --check "$P/$f" && git apply "$P/$f"; done',
    'W=../fe-release; C=$(git rev-parse HEAD); cd "$W"; git fetch -q origin development; git checkout -q --detach 15a52c98 && git log --oneline -1; git push origin "$C:development" 2>&1 | tail -3',
    'git -c user.name=x -c user.email=x@y commit -m fix',
  ]) assert.equal(decide(command, cwd, at), null, command);
  assert.ok(seen.includes(path.resolve(cwd, '../ov')) && seen.includes(path.resolve(cwd, '../integ', 'ov')) && seen.includes(path.resolve(cwd, '../stack')) && seen.includes(path.resolve(cwd, '../fe-release')));
});
test('variables, location stacks and -c stay protected when unresolved or unsafe', () => {
  const main = () => ({ ecc: false, product: true, branch: 'main' });
  for (const command of [
    'W=$(mktemp -d); cd "$W"; git commit -m x', 'for d in a b; do cd "$d"; git commit -m x; done', 'X=a; X=b; cd "$X"; git commit -m x',
    'cd "$HOME"; git commit -m x', 'cd "$Y"; Y=a; git commit -m x', 'Pop-Location; git commit -m x', 'try { Push-Location a; git add . } finally { Pop-Location }',
    'cd x; git -c core.pager=less commit -m x', 'cd x; git -c alias.ci=commit ci', 'git status; git push origin "$C"', 'git status; git push origin "$C:main"',
    'git status; git push $R development', 'git checkout feature && git commit -m x',
  ]) assert.equal(decide(command, cwd, main)[0], 'ask', command);
  assert.equal(decide('D=../p; cd "$D"; git commit -m x', cwd, main)[0], 'ask', 'resolved product main still asks');
  assert.equal(decide('D=../p; Push-Location $D; git reset --hard; Pop-Location', cwd, main)[0], 'deny');
  assert.equal(decide('git -c user.name=x commit --no-verify', cwd, main)[0], 'deny');
});
test('Git Bash /c/ paths resolve to the drive for direct and compound -C', () => {
  const seen = [];
  const at = dir => { seen.push(dir); return { ecc: true, product: false, branch: 'main' }; };
  assert.equal(decide('git -C /c/Users/x/ecc commit -F "C:/tmp/msg.txt"', cwd, at), null);
  assert.equal(decide('git -C /c/Users/x/ecc add a && git -C /c/Users/x/ecc commit -m x', cwd, at), null);
  const expected = process.platform === 'win32' ? path.resolve('C:/Users/x/ecc') : '/c/Users/x/ecc';
  assert.deepEqual([...new Set(seen)], [expected]);
});
test('a plain directory outside any repository, or one not created yet, is not a protected target', () => {
  const fs = require('node:fs');
  const os = require('node:os');
  const plain = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-plain-'));
  try {
    assert.equal(decide(`$O="${plain}"; Push-Location $O; git apply --whitespace=nowarn fix.diff 2>&1; Pop-Location`, cwd), null);
    assert.equal(decide(`cd "${path.join(plain, 'missing')}"; git apply fix.diff`, cwd), null);
  } finally { fs.rmSync(plain, { recursive: true, force: true }); }
});
test('redirections are not git arguments (2026-10-13 release push)', () => {
  const dev = () => ({ ecc: false, product: true, branch: '' });
  const push = 'cd ../be-release && S="../scratch"; timeout 900 git push origin 463ed18:refs/heads/seabridge_development > "$S/push.out" 2>&1; echo push=$?';
  assert.equal(decide(push, cwd, dev), null);
  assert.equal(decide('git status; git push origin "$C" > out.txt', cwd, dev)[0], 'ask', 'variable destination still asks');
  assert.equal(decide('git status; git push origin 463ed18:main > "$S/o" 2>&1', cwd, dev)[0], 'ask', 'main destination still asks');
  assert.equal(decide('cd x; git reset --hard HEAD > /dev/null', cwd, () => ({ ecc: false, product: true, branch: 'development' }))[0], 'deny');
});
test('scratch repositories created inside the command are not protected targets (2026-10-13 subagents)', () => {
  const fs = require('node:fs');
  const os = require('node:os');
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-new-'));
  try {
    for (const command of [
      `cd "${base}" && rm -rf mk && mkdir mk && cd mk && git init -q . && git config user.email a@b && git add -A && git commit -qm base && git apply ../p.diff`,
      `$T="${base}\\stack"; New-Item -ItemType Directory $T | Out-Null; Push-Location $T; git init -q; git apply --whitespace=nowarn a.diff; Pop-Location`,
    ]) assert.equal(decide(command, cwd), null, command);
    for (const command of [
      `cd "${base}" && git clone https://example.invalid/manageesg-backend.git be && cd be && git commit -m x`,
      `cd "${base}" && git worktree add -q --detach w origin/main && cd w && git commit -m x`,
    ]) assert.equal(decide(command, cwd)[0], 'ask', command);
  } finally { fs.rmSync(base, { recursive: true, force: true }); }
});
test('a cd inside ( ... ) moves only the commands inside it', () => {
  const seen = [];
  const at = dir => { seen.push(dir); return { ecc: false, product: true, branch: 'development' }; };
  assert.equal(decide('(cd ../a && git apply x.patch && git add -A); git commit -m y', cwd, at), null);
  assert.equal(decide('cd ../b && git apply p.diff; diff <(cd ../w && cat f) f', cwd, at), null);
  assert.equal(decide('diff <(cd ../w && cat f) f; git commit -m x', cwd, at)[0], 'ask', 'a subshell cd before an outer mutation stays ambiguous');
  assert.deepEqual(seen, [path.resolve(cwd, '../a'), path.resolve(cwd, '../a'), cwd, path.resolve(cwd, '../b')]);
  const main = () => ({ ecc: false, product: true, branch: 'main' });
  assert.equal(decide('(cd ../dev && git apply p.diff); git commit -m x', cwd, main)[0], 'ask', 'outer commit stays on the protected cwd');
});
test('heredoc data bodies are not commands; shell-fed bodies and continuations still count', () => {
  const main = () => ({ ecc: false, product: true, branch: 'main' });
  const notes = "S=../p; cat > $S/NOTES.md <<'EOF'\n# notes\nApply from root: `git apply s.patch`\ncd ../other; git commit -m x\nEOF\necho done";
  const py = "cd ../p && python - <<'PYEOF'\nimport subprocess\n# git push origin main\nPYEOF";
  const ps = '$n = @"\ngit commit -m "x"\n"@; Add-Content notes.md $n';
  for (const command of [notes, py, ps]) assert.equal(decide(command, cwd, main), null, command);
  assert.equal(decide("bash <<'EOF'\ngit commit -m x\nEOF", cwd, main)[0], 'ask', 'shell-fed heredoc still runs git');
  assert.equal(decide('cd ../p && \\\n git commit -m x', cwd, main)[0], 'ask', 'continuation joins and resolves to main');
  assert.equal(decide("cat <<'EOF' | sh\ngit push origin main\nEOF", cwd, main)[0], 'ask', 'pipe-to-shell body still runs git');
});
test('core.longpaths is a safe -c setting (2026-10-14 subagent patch check)', () => {
  const dev = () => ({ ecc: false, product: true, branch: 'development' });
  const main = () => ({ ecc: false, product: true, branch: 'main' });
  const cmd = 'FE=../fe; for f in a b; do git -c core.longpaths=true -c core.autocrlf=false diff --no-index orig/$f mirror/$f; done; git -C $FE -c core.longpaths=true apply --check p.patch && echo ok';
  assert.equal(decide(cmd, cwd, dev), null);
  assert.equal(decide('git status; git -c core.longpaths=true commit -m x', cwd, main)[0], 'ask', 'main stays protected');
  assert.equal(decide('cd x; git -c core.sshCommand=evil fetch', cwd, dev)[0], 'ask', 'other core keys stay unresolved');
});
test('actual stdin runner emits native denial protocol', () => {
  const file = path.resolve(__dirname, '../../scripts/hooks/seabridge-git-guard.js');
  const result = spawnSync(process.execPath, [file], { input: JSON.stringify({ cwd, tool_input: { command: 'git push --force' } }), encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.equal(JSON.parse(result.stdout).hookSpecificOutput.permissionDecision, 'deny');
});


test('conditional directory changes cannot silently substitute a product target', () => {
  for (const command of ['if ($false) { cd ../dev }; git commit -m x', '(cd ../dev); git commit -m x']) {
    assert.equal(decide(command, cwd, development)[0], 'ask', command);
  }
});
