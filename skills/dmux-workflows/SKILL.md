---
name: dmux-workflows
description: Multi-agent orchestration using dmux (tmux pane manager for AI agents). Patterns for parallel agent workflows across Claude Code, Codex, OpenCode, and other harnesses. Use when running multiple agent sessions in parallel or coordinating multi-agent development workflows.
metadata:
  origin: ECC
---

# dmux Workflows

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Orchestrate parallel AI agent sessions using dmux, a tmux pane manager for agent harnesses.

## When to Activate

- Running multiple agent sessions in parallel
- Coordinating work across Claude Code, Codex, and other harnesses
- Complex tasks that benefit from divide-and-conquer parallelism
- User says "run in parallel", "split this work", "use dmux", or "multi-agent"

## What is dmux

dmux is a tmux-based orchestration tool that manages AI agent panes:
- Press `n` to create a new pane with a prompt
- Press `m` to merge pane output back to the main session
- Supports: Claude Code, Codex, OpenCode, Cline, Gemini, Qwen

**Install:** Install dmux from its repository after reviewing the package. See [github.com/standardagents/dmux](https://github.com/standardagents/dmux)

## Quick Start

```bash
# Start dmux session
dmux

# Create agent panes (press 'n' in dmux, then type prompt)
# Pane 1: "Implement the auth middleware in src/auth/"
# Pane 2: "Write tests for the user service"
# Pane 3: "Update API documentation"

# Each pane runs its own agent session
# Press 'm' to merge results back
```

## Workflow Patterns

### Pattern 1: Research + Implement

Split research and implementation into parallel tracks:

```
Pane 1 (Research): "Research best practices for rate limiting in Node.js.
  Check current libraries, compare approaches, and write findings to
  /tmp/rate-limit-research.md"

Pane 2 (Implement): "Implement rate limiting middleware for our Express API.
  Start with a basic token bucket, we'll refine after research completes."

# After Pane 1 completes, merge findings into Pane 2's context
```

### Pattern 2: Multi-File Feature

Parallelize work across independent files:

```
Pane 1: "Create the database schema and migrations for the billing feature"
Pane 2: "Build the billing API endpoints in src/api/billing/"
Pane 3: "Create the billing dashboard UI components"

# Merge all, then do integration in main pane
```

### Pattern 3: Test + Fix Loop

Run tests in one pane, fix in another:

```
Pane 1 (Watcher): "Run the test suite in watch mode. When tests fail,
  summarize the failures."

Pane 2 (Fixer): "Fix failing tests based on the error output from pane 1"
```

### Pattern 4: Cross-Harness

Use different AI tools for different tasks:

```
Pane 1 (Claude Code): "Review the security of the auth module"
Pane 2 (Codex): "Refactor the utility functions for performance"
Pane 3 (Claude Code): "Write E2E tests for the checkout flow"
```

### Pattern 5: Code Review Pipeline

Parallel review perspectives:

```
Pane 1: "Review src/api/ for security vulnerabilities"
Pane 2: "Review src/api/ for performance issues"
Pane 3: "Review src/api/ for test coverage gaps"

# Merge all reviews into a single report
```

## Best Practices

1. **Independent tasks only.** Don't parallelize tasks that depend on each other's output.
2. **Clear boundaries.** Each pane should work on distinct files or concerns.
3. **Merge strategically.** Review pane output before merging to avoid conflicts.
4. **Use git worktrees.** For file-conflict-prone work, use separate worktrees per pane.
5. **Resource awareness.** Each pane uses API tokens Ã¢â‚¬â€ keep total panes under 5-6.

## Git Worktree Integration

For tasks that touch overlapping files:

```bash
# Create worktrees for isolation
git worktree add -b feat/auth ../feature-auth HEAD
git worktree add -b feat/billing ../feature-billing HEAD

# Run agents in separate worktrees
# Pane 1: cd ../feature-auth && claude
# Pane 2: cd ../feature-billing && claude

# Merge branches when done
git merge feat/auth
git merge feat/billing
```

## Complementary Tools

| Tool | What It Does | When to Use |
|------|-------------|-------------|
| **dmux** | tmux pane management for agents | Parallel agent sessions |
| **Superset** | Terminal IDE for 10+ parallel agents | Large-scale orchestration |
| **Claude Code Task tool** | In-process subagent spawning | Programmatic parallelism within a session |
| **Codex multi-agent** | Built-in agent roles | Codex-specific parallel work |

## ECC Helper

ECC now includes a helper for external tmux-pane orchestration with separate git worktrees:

```bash
node scripts/orchestrate-worktrees.js plan.json --execute
```

Example `plan.json`:

```json
{
  "sessionName": "skill-audit",
  "baseRef": "HEAD",
  "launcherCommand": "codex exec --cwd {worktree_path} --task-file {task_file}",
  "workers": [
    { "name": "docs-a", "task": "Fix skills 1-4 and write handoff notes." },
    { "name": "docs-b", "task": "Fix skills 5-8 and write handoff notes." }
  ]
}
```

The helper:
- Creates one branch-backed git worktree per worker
- Optionally overlays selected `seedPaths` from the main checkout into each worker worktree
- Writes per-worker `task.md`, `handoff.md`, and `status.md` files under `.orchestration/<session>/`
- Starts a tmux session with one pane per worker
- Launches each worker command in its own pane
- Leaves the main pane free for the orchestrator

Use `seedPaths` when workers need access to dirty or untracked local files that are not yet part of `HEAD`, such as local orchestration scripts, draft plans, or docs:

```json
{
  "sessionName": "workflow-e2e",
  "seedPaths": [
    "scripts/orchestrate-worktrees.js",
    "scripts/lib/tmux-worktree-orchestrator.js",
    ".claude/plan/workflow-e2e-test.json"
  ],
  "launcherCommand": "bash {repo_root}/scripts/orchestrate-codex-worker.sh {task_file} {handoff_file} {status_file}",
  "workers": [
    { "name": "seed-check", "task": "Verify seeded files are present before starting work." }
  ]
}
```

## Troubleshooting

- **Pane not responding:** Switch to the pane directly or inspect it with `tmux capture-pane -pt <session>:0.<pane-index>`.
- **Merge conflicts:** Use git worktrees to isolate file changes per pane.
- **High token usage:** Reduce number of parallel panes. Each pane is a full agent session.
- **tmux not found:** Install with `brew install tmux` (macOS) or `apt install tmux` (Linux).
