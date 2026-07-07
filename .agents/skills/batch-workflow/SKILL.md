---
name: batch-workflow
description: Use /batch to decompose large tasks and distribute them across multiple parallel Claude Code agents. Covers task decomposition, scope guidelines, and patterns for large-scale changes.
origin: ECC
---

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

# Batch Workflow

`/batch` breaks a task into many smaller sub-tasks and distributes them across multiple Claude Code agents running in parallel Ã¢â‚¬â€ potentially hundreds at once. Use it for large-scale changes that would be slow or risky to run sequentially in a single session.

## When to Activate

- Codebase-wide refactors (rename, reformat, apply a pattern everywhere)
- Mass file updates (update imports after a package rename, add type annotations)
- Running the same operation across many independent targets (e.g., update 50 endpoints)
- Any task where the sub-problems are independent and don't need to share state

---

## Basic Usage

```
/batch <task description>
```

Claude decomposes the task, assigns sub-tasks to agents, and runs them in parallel.

### Examples

```
/batch Add type annotations to all Python files in app/services/

/batch Replace all usages of `get_db()` with `get_async_db()` across the codebase

/batch Write a docstring for every public function in seabridge_ai/src/ that doesn't have one

/batch Run the linter and auto-fix all flake8 warnings in app/api/v1/endpoints/
```

---

## How to Write Good Batch Tasks

### Be specific about scope

```
# GOOD Ã¢â‚¬â€ clear scope and target
/batch Add `@router.get` docstrings to all endpoints in app/api/v1/endpoints/ that lack them

# TOO VAGUE Ã¢â‚¬â€ Claude can't decompose reliably
/batch Improve the code quality
```

### Make sub-problems independent

`/batch` works best when each agent can complete its sub-task without needing output from another agent.

```
# GOOD Ã¢â‚¬â€ independent per file
/batch Add error handling to each file in app/services/

# RISKY Ã¢â‚¬â€ agents need shared state
/batch Refactor the shared database connection and update all callers simultaneously
```

### Specify the output format

```
/batch For each model in app/models/, add a __repr__ method that shows the document's id and key fields. Keep each change to its own file.
```

---

## Combine with `--add-dir` for Cross-Repo Batch Work

```bash
# Start Claude with access to two repos
claude --add-dir ../manageesg-frontend

# Then batch across both
/batch Update all API endpoint URLs from /api/v1/users to /api/v2/users in both the backend and frontend
```

---

## Monitoring Progress

After `/batch` launches agents, Claude will report:
- Number of sub-tasks created
- Progress updates as agents complete
- A summary of changes made and any failures

You can ask for a status update at any point:
```
What's the batch progress?
```

---

## When NOT to Use `/batch`

| Situation | Better Alternative |
|-----------|-------------------|
| Tasks with shared state or dependencies | Sequential single session |
| Exploratory / uncertain scope | `/plan` first, then batch |
| Small changes (< 5 files) | Direct editing in current session |
| Changes requiring human review at each step | Manual with `/loop` |

---

## Safety

- `/batch` agents run with the same permissions as your current session
- Use `/careful` or `/guard` before batching destructive operations
- Always commit or checkpoint before a large batch run so you have a clean rollback point

```
/checkpoint before-batch-run
/batch <task>
```
