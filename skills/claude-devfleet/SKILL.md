---
name: claude-devfleet
description: Orchestrate multi-agent coding tasks via Claude DevFleet Ã¢â‚¬â€ plan projects, dispatch parallel agents in isolated worktrees, monitor progress, and read structured reports.
origin: community
---

# Claude DevFleet Multi-Agent Orchestration

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## When to Use

Use this skill when you need to dispatch multiple Claude Code agents to work on coding tasks in parallel. Each agent runs in an isolated git worktree with full tooling.

Requires a running Claude DevFleet instance connected via MCP:
```bash
claude mcp add devfleet --transport http http://localhost:18801/mcp
```

## How It Works

```
User Ã¢â€ â€™ "Build a REST API with auth and tests"
  Ã¢â€ â€œ
plan_project(prompt) Ã¢â€ â€™ project_id + mission DAG
  Ã¢â€ â€œ
Show plan to user Ã¢â€ â€™ get approval
  Ã¢â€ â€œ
dispatch_mission(M1) Ã¢â€ â€™ Agent 1 spawns in worktree
  Ã¢â€ â€œ
M1 completes Ã¢â€ â€™ auto-merge Ã¢â€ â€™ auto-dispatch M2 (depends_on M1)
  Ã¢â€ â€œ
M2 completes Ã¢â€ â€™ auto-merge
  Ã¢â€ â€œ
get_report(M2) Ã¢â€ â€™ files_changed, what_done, errors, next_steps
  Ã¢â€ â€œ
Report back to user
```

### Tools

| Tool | Purpose |
|------|---------|
| `plan_project(prompt)` | AI breaks a description into a project with chained missions |
| `create_project(name, path?, description?)` | Create a project manually, returns `project_id` |
| `create_mission(project_id, title, prompt, depends_on?, auto_dispatch?)` | Add a mission. `depends_on` is a list of mission ID strings (e.g., `["abc-123"]`). Set `auto_dispatch=true` to auto-start when deps are met. |
| `dispatch_mission(mission_id, model?, max_turns?)` | Start an agent on a mission |
| `cancel_mission(mission_id)` | Stop a running agent |
| `wait_for_mission(mission_id, timeout_seconds?)` | Block until a mission completes (see note below) |
| `get_mission_status(mission_id)` | Check mission progress without blocking |
| `get_report(mission_id)` | Read structured report (files changed, tested, errors, next steps) |
| `get_dashboard()` | System overview: running agents, stats, recent activity |
| `list_projects()` | Browse all projects |
| `list_missions(project_id, status?)` | List missions in a project |

> **Note on `wait_for_mission`:** This blocks the conversation for up to `timeout_seconds` (default 600). For long-running missions, prefer polling with `get_mission_status` every 30Ã¢â‚¬â€œ60 seconds instead, so the user sees progress updates.

### Workflow: Plan Ã¢â€ â€™ Dispatch Ã¢â€ â€™ Monitor Ã¢â€ â€™ Report

1. **Plan**: Call `plan_project(prompt="...")` Ã¢â€ â€™ returns `project_id` + list of missions with `depends_on` chains and `auto_dispatch=true`.
2. **Show plan**: Present mission titles, types, and dependency chain to the user.
3. **Dispatch**: Call `dispatch_mission(mission_id=<first_mission_id>)` on the root mission (empty `depends_on`). Remaining missions auto-dispatch as their dependencies complete (because `plan_project` sets `auto_dispatch=true` on them).
4. **Monitor**: Call `get_mission_status(mission_id=...)` or `get_dashboard()` to check progress.
5. **Report**: Call `get_report(mission_id=...)` when missions complete. Share highlights with the user.

### Concurrency

DevFleet runs up to 3 concurrent agents by default (configurable via `DEVFLEET_MAX_AGENTS`). When all slots are full, missions with `auto_dispatch=true` queue in the mission watcher and dispatch automatically as slots free up. Check `get_dashboard()` for current slot usage.

## Examples

### Full auto: plan and launch

1. `plan_project(prompt="...")` Ã¢â€ â€™ shows plan with missions and dependencies.
2. Dispatch the first mission (the one with empty `depends_on`).
3. Remaining missions auto-dispatch as dependencies resolve (they have `auto_dispatch=true`).
4. Report back with project ID and mission count so the user knows what was launched.
5. Poll with `get_mission_status` or `get_dashboard()` periodically until all missions reach a terminal state (`completed`, `failed`, or `cancelled`).
6. `get_report(mission_id=...)` for each terminal mission Ã¢â‚¬â€ summarize successes and call out failures with errors and next steps.

### Manual: step-by-step control

1. `create_project(name="My Project")` Ã¢â€ â€™ returns `project_id`.
2. `create_mission(project_id=project_id, title="...", prompt="...", auto_dispatch=true)` for the first (root) mission Ã¢â€ â€™ capture `root_mission_id`.
   `create_mission(project_id=project_id, title="...", prompt="...", auto_dispatch=true, depends_on=["<root_mission_id>"])` for each subsequent task.
3. `dispatch_mission(mission_id=...)` on the first mission to start the chain.
4. `get_report(mission_id=...)` when done.

### Sequential with review

1. `create_project(name="...")` Ã¢â€ â€™ get `project_id`.
2. `create_mission(project_id=project_id, title="Implement feature", prompt="...")` Ã¢â€ â€™ get `impl_mission_id`.
3. `dispatch_mission(mission_id=impl_mission_id)`, then poll with `get_mission_status` until complete.
4. `get_report(mission_id=impl_mission_id)` to review results.
5. `create_mission(project_id=project_id, title="Review", prompt="...", depends_on=[impl_mission_id], auto_dispatch=true)` Ã¢â‚¬â€ auto-starts since the dependency is already met.

## Guidelines

- Always confirm the plan with the user before dispatching, unless they said to go ahead.
- Include mission titles and IDs when reporting status.
- If a mission fails, read its report before retrying.
- Check `get_dashboard()` for agent slot availability before bulk dispatching.
- Mission dependencies form a DAG Ã¢â‚¬â€ do not create circular dependencies.
- Each agent runs in an isolated git worktree and auto-merges on completion. If a merge conflict occurs, the changes remain on the agent's worktree branch for manual resolution.
- When manually creating missions, always set `auto_dispatch=true` if you want them to trigger automatically when dependencies complete. Without this flag, missions stay in `draft` status.
