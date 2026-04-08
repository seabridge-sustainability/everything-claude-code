# Repo & Fork Assessment + Setup Recommendations

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


**Date:** 2026-03-21

---

## What's Available

### Repo: `Infiniteyieldai/everything-claude-code`

This is a **fork of `affaan-m/everything-claude-code`** (the upstream project with 50K+ stars, 6K+ forks).

| Attribute | Value |
|-----------|-------|
| Version | 1.9.0 (current) |
| Status | Clean fork Ã¢â‚¬â€ 1 commit ahead of upstream `main` (the EVALUATION.md doc added in this session) |
| Remote branches | `main`, `claude/evaluate-repo-comparison-ASZ9Y` |
| Upstream sync | Fully synced Ã¢â‚¬â€ last upstream commit merged was the zh-CN docs PR (#728) |
| License | MIT |

**This is the right repo to work from.** It's the latest upstream version with no divergence or merge conflicts.

---

### Current `~/.claude/` Installation

| Component | Installed | Available in Repo |
|-----------|-----------|-------------------|
| Agents | 0 | 28 |
| Skills | 0 | 116 |
| Commands | 0 | 59 |
| Rules | 0 | 60+ files (12 languages) |
| Hooks | 1 (git Stop check) | Full PreToolUse/PostToolUse matrix |
| MCP configs | 0 | 1 (Context7) |

The existing Stop hook (`stop-hook-git-check.sh`) is solid Ã¢â‚¬â€ blocks session end on uncommitted/unpushed work. Keep it.

---

## Install Profile Recommendations

The repo ships 5 install profiles. Choose based on your primary use case:

### Profile: `core` (Minimum viable setup)
> Fastest to install. Gets you commands, core agents, hooks runtime, and quality workflow.

**Best for:** Trying ECC out, minimal footprint, or a constrained environment.

```bash
node scripts/install-plan.js --profile core
node scripts/install-apply.js
```

**Installs:** rules-core, agents-core, commands-core, hooks-runtime, platform-configs, workflow-quality

---

### Profile: `developer` (Recommended for daily dev work)
> The default engineering profile for most ECC users.

**Best for:** General software development across app codebases.

```bash
node scripts/install-plan.js --profile developer
node scripts/install-apply.js
```

**Adds over core:** framework-language skills, database patterns, orchestration commands

---

### Profile: `security`
> Baseline runtime + security-specific agents and rules.

**Best for:** Security-focused workflows, code audits, vulnerability reviews.

---

### Profile: `research`
> Investigation, synthesis, and publishing workflows.

**Best for:** Content creation, investor materials, market research, cross-posting.

---

### Profile: `full`
> Everything Ã¢â‚¬â€ all 18 modules.

**Best for:** Power users who want the complete toolkit.

```bash
node scripts/install-plan.js --profile full
node scripts/install-apply.js
```

---

## Priority Additions (High Value, Low Risk)

Regardless of profile, these components add immediate value:

### 1. Core Agents (highest ROI)

| Agent | Why it matters |
|-------|----------------|
| `planner.md` | Breaks complex tasks into implementation plans |
| `code-reviewer.md` | Quality and maintainability review |
| `tdd-guide.md` | TDD workflow (REDÃ¢â€ â€™GREENÃ¢â€ â€™IMPROVE) |
| `security-reviewer.md` | Vulnerability detection |
| `architect.md` | System design & scalability decisions |

### 2. Key Commands

| Command | Why it matters |
|---------|----------------|
| `/plan` | Implementation planning before coding |
| `/tdd` | Test-driven workflow |
| `/code-review` | On-demand review |
| `/build-fix` | Automated build error resolution |
| `/learn` | Extract patterns from current session |

### 3. Hook Upgrades (from `hooks/hooks.json`)
The repo's hook system adds these over the current single Stop hook:

| Hook | Trigger | Value |
|------|---------|-------|
| `block-no-verify` | PreToolUse: Bash | Blocks `--no-verify` git flag abuse |
| `pre-bash-git-push-reminder` | PreToolUse: Bash | Pre-push review reminder |
| `doc-file-warning` | PreToolUse: Write | Warns on non-standard doc files |
| `suggest-compact` | PreToolUse: Edit/Write | Suggests compaction at logical intervals |
| Continuous learning observer | PreToolUse: * | Captures tool use patterns for skill improvement |

### 4. Rules (Always-on guidelines)
The `rules/common/` directory provides baseline guidelines that fire on every session:
- `security.md` Ã¢â‚¬â€ Security guardrails
- `testing.md` Ã¢â‚¬â€ 80%+ coverage requirement
- `git-workflow.md` Ã¢â‚¬â€ Conventional commits, branch strategy
- `coding-style.md` Ã¢â‚¬â€ Cross-language style standards

---

## What to Do With the Fork

### Option A: Use as upstream tracker (current state)
Keep the fork synced with `affaan-m/everything-claude-code` upstream. Periodically merge upstream changes:
```bash
git fetch upstream
git merge upstream/main
```
Install from the local clone. This is clean and maintainable.

### Option B: Customize the fork
Add personal skills, agents, or commands to the fork. Good for:
- Business-specific domain skills (your vertical)
- Team-specific coding conventions
- Custom hooks for your stack

The fork already has the EVALUATION.md and REPO-ASSESSMENT.md docs Ã¢â‚¬â€ that's fine for a working fork.

### Option C: Install from npm (simplest for fresh machines)
```bash
npx ecc-universal install --profile developer
```
No need to clone the repo. This is the recommended install method for most users.

---

## Recommended Setup Steps

1. **Keep the existing Stop hook** Ã¢â‚¬â€ it's doing its job
2. **Run the developer profile install** from the local fork:
   ```bash
   cd /path/to/everything-claude-code
   node scripts/install-plan.js --profile developer
   node scripts/install-apply.js
   ```
3. **Add language rules** for your primary stack (TypeScript, Python, Go, etc.):
   ```bash
   node scripts/install-plan.js --add rules/typescript
   node scripts/install-apply.js
   ```
4. **Enable MCP Context7** for live documentation lookup:
   - Copy `mcp-configs/mcp-servers.json` into your project's `.claude/` dir
5. **Review hooks** Ã¢â‚¬â€ enable the `hooks/hooks.json` additions selectively, starting with `block-no-verify` and `pre-bash-git-push-reminder`

---

## Summary

| Question | Answer |
|----------|--------|
| Is the fork healthy? | Yes Ã¢â‚¬â€ fully synced with upstream v1.9.0 |
| Other forks to consider? | None visible in this environment; upstream `affaan-m/everything-claude-code` is the source of truth |
| Best install profile? | `developer` for day-to-day dev work |
| Biggest gap in current setup? | 0 agents installed Ã¢â‚¬â€ add at minimum: planner, code-reviewer, tdd-guide, security-reviewer |
| Quickest win? | Run `node scripts/install-plan.js --profile core && node scripts/install-apply.js` |
