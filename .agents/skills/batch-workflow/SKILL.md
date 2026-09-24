---
name: batch-workflow
description: Use /batch to decompose large tasks and distribute them across multiple parallel Claude Code agents. Covers task decomposition, scope guidelines, and patterns for large-scale changes.
origin: ECC
---

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
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
