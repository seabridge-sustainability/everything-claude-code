---
name: dmux-workflows
description: 使用dmux（AI代理的tmux窗格管理器）进行多代理编排。跨Claude Code、Codex、OpenCode及其他工具的并行代理工作流模式。适用于并行运行多个代理会话或协调多代理开发工作流时。
origin: ECC
---

# dmux 工作流

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


使用 dmux（一个用于代理套件的 tmux 窗格管理器）来编排并行的 AI 代理会话。

## 何时激活

* 并行运行多个代理会话时
* 跨 Claude Code、Codex 和其他套件协调工作时
* 需要分而治之并行处理的复杂任务
* 用户提到“并行运行”、“拆分此工作”、“使用 dmux”或“多代理”时

## 什么是 dmux

dmux 是一个基于 tmux 的编排工具，用于管理 AI 代理窗格：

* 按 `n` 创建一个带有提示的新窗格
* 按 `m` 将窗格输出合并回主会话
* 支持：Claude Code、Codex、OpenCode、Cline、Gemini、Qwen

**安装：** `npm install -g dmux` 或参见 [github.com/standardagents/dmux](https://github.com/standardagents/dmux)

## 快速开始

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

## 工作流模式

### 模式 1：研究 + 实现

将研究和实现拆分为并行轨道：

```
Pane 1 (Research): "研究 Node.js 中速率限制的最佳实践。
  检查当前可用的库，比较不同方法，并将研究结果写入
  /tmp/rate-limit-research.md"

Pane 2 (Implement): "为我们的 Express API 实现速率限制中间件。
  先从基本的令牌桶算法开始，研究完成后我们将进一步优化。"

# Pane 1 完成后，将研究结果合并到 Pane 2 的上下文中
```

### 模式 2：多文件功能

在独立文件间并行工作：

```
Pane 1: "创建计费功能的数据库模式和迁移"
Pane 2: "在 src/api/billing/ 中构建计费 API 端点"
Pane 3: "创建计费仪表板 UI 组件"

# 合并所有内容，然后在主面板中进行集成
```

### 模式 3：测试 + 修复循环

在一个窗格中运行测试，在另一个窗格中修复：

```
窗格 1（观察者）：“在监视模式下运行测试套件。当测试失败时，
  总结失败原因。”

窗格 2（修复者）：“根据窗格 1 的错误输出修复失败的测试”
```

### 模式 4：跨套件

为不同任务使用不同的 AI 工具：

```
Pane 1 (Claude Code): "Review the security of the auth module"
Pane 2 (Codex): "Refactor the utility functions for performance"
Pane 3 (Claude Code): "Write E2E tests for the checkout flow"
```

### 模式 5：代码审查流水线

并行审查视角：

```
Pane 1: "审查 src/api/ 中的安全漏洞"
Pane 2: "审查 src/api/ 中的性能问题"
Pane 3: "审查 src/api/ 中的测试覆盖缺口"

# 将所有审查合并为一份报告
```

## 最佳实践

1. **仅限独立任务。** 不要并行化相互依赖输出的任务。
2. **明确边界。** 每个窗格应处理不同的文件或关注点。
3. **策略性合并。** 合并前审查窗格输出以避免冲突。
4. **使用 git worktree。** 对于容易产生文件冲突的工作，为每个窗格使用单独的工作树。
5. **资源意识。** 每个窗格都消耗 API 令牌 —— 将总窗格数控制在 5-6 个以下。

## Git Worktree 集成

对于涉及重叠文件的任务：

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

## 互补工具

| 工具 | 功能 | 使用时机 |
|------|-------------|-------------|
| **dmux** | 用于代理的 tmux 窗格管理 | 并行代理会话 |
| **Superset** | 用于 10+ 并行代理的终端 IDE | 大规模编排 |
| **Claude Code Task 工具** | 进程内子代理生成 | 会话内的程序化并行 |
| **Codex 多代理** | 内置代理角色 | Codex 特定的并行工作 |

## ECC 助手

ECC 现在包含一个助手，用于使用独立的 git worktree 进行外部 tmux 窗格编排：

```bash
node scripts/orchestrate-worktrees.js plan.json --execute
```

示例 `plan.json`：

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

该助手：

* 为每个工作器创建一个基于分支的 git worktree
* 可选择将主检出中的选定 `seedPaths` 覆盖到每个工作器的工作树中
* 在 `.orchestration/<session>/` 下写入每个工作器的 `task.md`、`handoff.md` 和 `status.md` 文件
* 启动一个 tmux 会话，每个工作器一个窗格
* 在每个窗格中启动相应的工作器命令
* 为主协调器保留主窗格空闲

当工作器需要访问尚未纳入 `HEAD` 的脏文件或未跟踪的本地文件（例如本地编排脚本、草案计划或文档）时，使用 `seedPaths`：

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

## 故障排除

* **窗格无响应：** 直接切换到该窗格或使用 `tmux capture-pane -pt <session>:0.<pane-index>` 检查它。
* **合并冲突：** 使用 git worktree 隔离每个窗格的文件更改。
* **令牌使用量高：** 减少并行窗格数量。每个窗格都是一个完整的代理会话。
* **未找到 tmux：** 使用 `brew install tmux` (macOS) 或 `apt install tmux` (Linux) 安装。
