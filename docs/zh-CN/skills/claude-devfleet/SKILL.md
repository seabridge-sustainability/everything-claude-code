---
name: claude-devfleet
description: 通过Claude DevFleet协调多智能体编码任务——规划项目、在隔离的工作树中并行调度智能体、监控进度并读取结构化报告。
origin: community
---

# Claude DevFleet 多智能体编排

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


## 使用时机

当需要调度多个 Claude Code 智能体并行处理编码任务时使用此技能。每个智能体在独立的 git worktree 中运行，并配备全套工具。

需要连接一个通过 MCP 运行的 Claude DevFleet 实例：

```bash
claude mcp add devfleet --transport http http://localhost:18801/mcp
```

## 工作原理

```
用户 → "构建一个带有身份验证和测试的 REST API"
  ↓
plan_project(prompt) → 项目ID + 任务DAG
  ↓
向用户展示计划 → 获取批准
  ↓
dispatch_mission(M1) → 代理1在工作树中生成
  ↓
M1完成 → 自动合并 → 自动分发M2 (依赖于M1)
  ↓
M2完成 → 自动合并
  ↓
get_report(M2) → 更改的文件、完成的工作、错误、后续步骤
  ↓
向用户报告
```

### 工具

| 工具 | 用途 |
|------|---------|
| `plan_project(prompt)` | AI 将描述分解为包含链式任务的项目 |
| `create_project(name, path?, description?)` | 手动创建项目，返回 `project_id` |
| `create_mission(project_id, title, prompt, depends_on?, auto_dispatch?)` | 添加任务。`depends_on` 是任务 ID 字符串列表（例如 `["abc-123"]`）。设置 `auto_dispatch=true` 可在依赖满足时自动启动。 |
| `dispatch_mission(mission_id, model?, max_turns?)` | 启动智能体执行任务 |
| `cancel_mission(mission_id)` | 停止正在运行的智能体 |
| `wait_for_mission(mission_id, timeout_seconds?)` | 阻塞直到任务完成（见下方说明） |
| `get_mission_status(mission_id)` | 检查任务进度而不阻塞 |
| `get_report(mission_id)` | 读取结构化报告（更改的文件、测试情况、错误、后续步骤） |
| `get_dashboard()` | 系统概览：运行中的智能体、统计信息、近期活动 |
| `list_projects()` | 浏览所有项目 |
| `list_missions(project_id, status?)` | 列出项目中的任务 |

> **关于 `wait_for_mission` 的说明：** 此操作会阻塞对话，最长 `timeout_seconds` 秒（默认 600 秒）。对于长时间运行的任务，建议改为每 30-60 秒使用 `get_mission_status` 轮询，以便用户能看到进度更新。

### 工作流：规划 → 调度 → 监控 → 报告

1. **规划**：调用 `plan_project(prompt="...")` → 返回 `project_id` 以及带有 `depends_on` 链和 `auto_dispatch=true` 的任务列表。
2. **展示计划**：向用户呈现任务标题、类型和依赖链。
3. **调度**：对根任务（`depends_on` 为空）调用 `dispatch_mission(mission_id=<first_mission_id>)`。剩余任务在其依赖项完成时自动调度（因为 `plan_project` 为它们设置了 `auto_dispatch=true`）。
4. **监控**：调用 `get_mission_status(mission_id=...)` 或 `get_dashboard()` 检查进度。
5. **报告**：任务完成后调用 `get_report(mission_id=...)`。与用户分享亮点。

### 并发性

DevFleet 默认最多同时运行 3 个智能体（可通过 `DEVFLEET_MAX_AGENTS` 配置）。当所有槽位都占满时，设置了 `auto_dispatch=true` 的任务会在任务监视器中排队，并在槽位空闲时自动调度。检查 `get_dashboard()` 了解当前槽位使用情况。

## 示例

### 全自动：规划并启动

1. `plan_project(prompt="...")` → 显示包含任务和依赖关系的计划。
2. 调度第一个任务（`depends_on` 为空的那个）。
3. 剩余任务在依赖关系解决时自动调度（它们具有 `auto_dispatch=true`）。
4. 报告项目 ID 和任务数量，让用户知道启动了哪些内容。
5. 定期使用 `get_mission_status` 或 `get_dashboard()` 轮询，直到所有任务达到终止状态（`completed`、`failed` 或 `cancelled`）。
6. 对每个终止任务执行 `get_report(mission_id=...)`——总结成功之处，并指出失败任务及其错误和后续步骤。

### 手动：逐步控制

1. `create_project(name="My Project")` → 返回 `project_id`。
2. 为第一个（根）任务执行 `create_mission(project_id=project_id, title="...", prompt="...", auto_dispatch=true)` → 捕获 `root_mission_id`。
   为每个后续任务执行 `create_mission(project_id=project_id, title="...", prompt="...", auto_dispatch=true, depends_on=["<root_mission_id>"])`。
3. 在第一个任务上执行 `dispatch_mission(mission_id=...)` 以启动链。
4. 完成后执行 `get_report(mission_id=...)`。

### 带审查的串行执行

1. `create_project(name="...")` → 获取 `project_id`。
2. `create_mission(project_id=project_id, title="Implement feature", prompt="...")` → 获取 `impl_mission_id`。
3. `dispatch_mission(mission_id=impl_mission_id)`，然后使用 `get_mission_status` 轮询直到完成。
4. `get_report(mission_id=impl_mission_id)` 以审查结果。
5. `create_mission(project_id=project_id, title="Review", prompt="...", depends_on=[impl_mission_id], auto_dispatch=true)` —— 由于依赖已满足，自动启动。

## 指南

* 在调度前始终与用户确认计划，除非用户已明确指示继续。
* 报告状态时包含任务标题和 ID。
* 如果任务失败，在重试前读取其报告。
* 批量调度前检查 `get_dashboard()` 了解智能体槽位可用性。
* 任务依赖关系构成一个有向无环图（DAG）——不要创建循环依赖。
* 每个智能体在独立的 git worktree 中运行，并在完成时自动合并。如果发生合并冲突，更改将保留在智能体的 worktree 分支上，以便手动解决。
* 手动创建任务时，如果希望它们在依赖项完成时自动触发，请始终设置 `auto_dispatch=true`。没有此标志，任务将保持 `draft` 状态。
