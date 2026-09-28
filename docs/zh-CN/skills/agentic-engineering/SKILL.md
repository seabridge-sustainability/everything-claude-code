---
name: agentic-engineering
description: 作为代理工程师，采用评估优先执行、分解和成本感知模型路由进行操作。
origin: ECC
---

# 智能体工程

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


在 AI 智能体执行大部分实施工作、而人类负责质量与风险控制的工程工作流中使用此技能。

## 操作原则

1. 在执行前定义完成标准。
2. 将工作分解为智能体可处理的单元。
3. 根据任务复杂度路由模型层级。
4. 使用评估和回归检查进行度量。

## 评估优先循环

1. 定义能力评估和回归评估。
2. 运行基线并捕获失败特征。
3. 执行实施。
4. 重新运行评估并比较差异。

## 任务分解

应用 15 分钟单元规则：

* 每个单元应可独立验证
* 每个单元应有一个主要风险
* 每个单元应暴露一个清晰的完成条件

## 模型路由

* Haiku：分类、样板转换、狭窄编辑
* Sonnet：实施和重构
* Opus：架构、根因分析、多文件不变量

## 会话策略

* 对于紧密耦合的单元，继续使用同一会话。
* 在主要阶段转换后，启动新的会话。
* 在里程碑完成后进行压缩，而不是在主动调试期间。

## AI 生成代码的审查重点

优先审查：

* 不变量和边界情况
* 错误边界
* 安全性和身份验证假设
* 隐藏的耦合和上线风险

当自动化格式化/代码检查工具已强制执行代码风格时，不要在仅涉及风格分歧的审查上浪费周期。

## 成本纪律

按任务跟踪：

* 模型
* 令牌估算
* 重试次数
* 实际用时
* 成功/失败

仅当较低层级的模型失败且存在清晰的推理差距时，才升级模型层级。
