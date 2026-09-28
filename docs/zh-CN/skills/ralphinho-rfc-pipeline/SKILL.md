---
name: ralphinho-rfc-pipeline
description: 基于RFC驱动的多智能体DAG执行模式，包含质量门、合并队列和工作单元编排。
origin: ECC
---

# Ralphinho RFC 管道

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


灵感来源于 [humanplane](https://github.com/humanplane) 风格的 RFC 分解模式和多单元编排工作流。

当一个功能对于单次代理处理来说过于庞大，必须拆分为独立可验证的工作单元时，请使用此技能。

## 管道阶段

1. RFC 接收
2. DAG 分解
3. 单元分配
4. 单元实现
5. 单元验证
6. 合并队列与集成
7. 最终系统验证

## 单元规范模板

每个工作单元应包含：

* `id`
* `depends_on`
* `scope`
* `acceptance_tests`
* `risk_level`
* `rollback_plan`

## 复杂度层级

* 层级 1：独立文件编辑，确定性测试
* 层级 2：多文件行为变更，中等集成风险
* 层级 3：架构/认证/性能/安全性变更

## 每个单元的质量管道

1. 研究
2. 实现计划
3. 实现
4. 测试
5. 审查
6. 合并就绪报告

## 合并队列规则

* 永不合并存在未解决依赖项失败的单元。
* 始终将单元分支变基到最新的集成分支上。
* 每次队列合并后重新运行集成测试。

## 恢复

如果一个单元停滞：

* 从活动队列中移除
* 快照发现结果
* 重新生成范围缩小的单元
* 使用更新的约束条件重试

## 输出

* RFC 执行日志
* 单元记分卡
* 依赖关系图快照
* 集成风险摘要
