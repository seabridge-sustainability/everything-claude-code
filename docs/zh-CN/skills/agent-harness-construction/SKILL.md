---
name: agent-harness-construction
description: 设计和优化AI代理的动作空间、工具定义和观察格式，以提高完成率。
origin: ECC
---

# 智能体框架构建

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


当你在改进智能体的规划、调用工具、从错误中恢复以及收敛到完成状态的方式时，使用此技能。

## 核心模型

智能体输出质量受限于：

1. 行动空间质量
2. 观察质量
3. 恢复质量
4. 上下文预算质量

## 行动空间设计

1. 使用稳定、明确的工具名称。
2. 保持输入模式优先且范围狭窄。
3. 返回确定性的输出形状。
4. 除非无法隔离，否则避免使用全能型工具。

## 粒度规则

* 对高风险操作（部署、迁移、权限）使用微工具。
* 对常见的编辑/读取/搜索循环使用中等工具。
* 仅当往返开销是主要成本时使用宏工具。

## 观察设计

每个工具响应都应包括：

* `status`: success|warning|error
* `summary`: 一行结果
* `next_actions`: 可执行的后续步骤
* `artifacts`: 文件路径 / ID

## 错误恢复契约

对于每个错误路径，应包括：

* 根本原因提示
* 安全重试指令
* 明确的停止条件

## 上下文预算管理

1. 保持系统提示词最少且不变。
2. 将大量指导信息移至按需加载的技能中。
3. 优先引用文件，而不是内联长文档。
4. 在阶段边界处进行压缩，而不是任意的令牌阈值。

## 架构模式指导

* ReAct：最适合路径不确定的探索性任务。
* 函数调用：最适合结构化的确定性流程。
* 混合模式（推荐）：ReAct 规划 + 类型化工具执行。

## 基准测试

跟踪：

* 完成率
* 每项任务的重试次数
* pass@1 和 pass@3
* 每个成功任务的成本

## 反模式

* 太多语义重叠的工具。
* 不透明的工具输出，没有恢复提示。
* 仅输出错误而没有后续步骤。
* 上下文过载，包含不相关的引用。
