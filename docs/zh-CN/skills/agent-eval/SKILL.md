---
name: agent-eval
description: 编码代理（Claude Code、Aider、Codex等）在自定义任务上的直接比较，包含通过率、成本、时间和一致性指标
origin: ECC
tools: Read, Write, Edit, Bash, Grep, Glob
---

# Agent Eval 技能

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


一个轻量级 CLI 工具，用于在可复现的任务上对编码代理进行头对头比较。每个“哪个编码代理最好？”的比较都基于感觉——本工具将其系统化。

## 何时使用

* 在你自己的代码库上比较编码代理（Claude Code、Aider、Codex 等）
* 在采用新工具或模型之前衡量代理性能
* 当代理更新其模型或工具时运行回归检查
* 为团队做出数据支持的代理选择决策

## 安装

```bash
# pinned to v0.1.0 — latest stable commit
pip install git+https://github.com/joaquinhuigomez/agent-eval.git@6d062a2f5cda6ea443bf5d458d361892c04e749b
```

## 核心概念

### YAML 任务定义

以声明方式定义任务。每个任务指定要做什么、要修改哪些文件以及如何判断成功：

```yaml
name: add-retry-logic
description: Add exponential backoff retry to the HTTP client
repo: ./my-project
files:
  - src/http_client.py
prompt: |
  Add retry logic with exponential backoff to all HTTP requests.
  Max 3 retries. Initial delay 1s, max delay 30s.
judge:
  - type: pytest
    command: pytest tests/test_http_client.py -v
  - type: grep
    pattern: "exponential_backoff|retry"
    files: src/http_client.py
commit: "abc1234"  # pin to specific commit for reproducibility
```

### Git 工作树隔离

每个代理运行都获得自己的 git 工作树——无需 Docker。这提供了可复现的隔离，使得代理之间不会相互干扰或损坏基础仓库。

### 收集的指标

| 指标 | 衡量内容 |
|--------|-----------------|
| 通过率 | 代理生成的代码是否通过了判断？ |
| 成本 | 每个任务的 API 花费（如果可用） |
| 时间 | 完成所需的挂钟秒数 |
| 一致性 | 跨重复运行的通过率（例如，3/3 = 100%） |

## 工作流程

### 1. 定义任务

创建一个 `tasks/` 目录，其中包含 YAML 文件，每个任务一个文件：

```bash
mkdir tasks
# Write task definitions (see template above)
```

### 2. 运行代理

针对你的任务执行代理：

```bash
agent-eval run --task tasks/add-retry-logic.yaml --agent claude-code --agent aider --runs 3
```

每次运行：

1. 从指定的提交创建一个新的 git 工作树
2. 将提示交给代理
3. 运行判断标准
4. 记录通过/失败、成本和时间

### 3. 比较结果

生成比较报告：

```bash
agent-eval report --format table
```

```
Task: add-retry-logic (3 runs each)
┌──────────────┬───────────┬────────┬────────┬─────────────┐
│ Agent        │ Pass Rate │ Cost   │ Time   │ Consistency │
├──────────────┼───────────┼────────┼────────┼─────────────┤
│ claude-code  │ 3/3       │ $0.12  │ 45s    │ 100%        │
│ aider        │ 2/3       │ $0.08  │ 38s    │  67%        │
└──────────────┴───────────┴────────┴────────┴─────────────┘
```

## 判断类型

### 基于代码（确定性）

```yaml
judge:
  - type: pytest
    command: pytest tests/ -v
  - type: command
    command: npm run build
```

### 基于模式

```yaml
judge:
  - type: grep
    pattern: "class.*Retry"
    files: src/**/*.py
```

### 基于模型（LLM 作为判断器）

```yaml
judge:
  - type: llm
    prompt: |
      Does this implementation correctly handle exponential backoff?
      Check for: max retries, increasing delays, jitter.
```

## 最佳实践

* **从 3-5 个任务开始**，这些任务代表你的真实工作负载，而非玩具示例
* **每个代理至少运行 3 次试验**以捕捉方差——代理是非确定性的
* **在你的任务 YAML 中固定提交**，以便结果在数天/数周内可复现
* **每个任务至少包含一个确定性判断器**（测试、构建）——LLM 判断器会增加噪音
* **跟踪成本与通过率**——一个通过率 95% 但成本高出 10 倍的代理可能不是正确的选择
* **对你的任务定义进行版本控制**——它们是测试夹具，应将其视为代码

## 链接

* 仓库：[github.com/joaquinhuigomez/agent-eval](https://github.com/joaquinhuigomez/agent-eval)
