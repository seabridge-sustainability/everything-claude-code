---
name: enterprise-agent-ops
description: 通过可观测性、安全边界和生命周期管理来操作长期运行的代理工作负载。
origin: ECC
---

# 企业级智能体运维

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


使用此技能用于需要超越单次 CLI 会话操作控制的云托管或持续运行的智能体系统。

## 运维领域

1. 运行时生命周期（启动、暂停、停止、重启）
2. 可观测性（日志、指标、追踪）
3. 安全控制（作用域、权限、紧急停止开关）
4. 变更管理（发布、回滚、审计）

## 基线控制

* 不可变的部署工件
* 最小权限凭证
* 环境级别的密钥注入
* 硬性超时和重试预算
* 高风险操作的审计日志

## 需跟踪的指标

* 成功率
* 每项任务的平均重试次数
* 恢复时间
* 每项成功任务的成本
* 故障类别分布

## 事故处理模式

当故障激增时：

1. 冻结新发布
2. 捕获代表性追踪数据
3. 隔离故障路径
4. 应用最小的安全变更进行修补
5. 运行回归测试 + 安全检查
6. 逐步恢复

## 部署集成

此技能可与以下工具配合使用：

* PM2 工作流
* systemd 服务
* 容器编排器
* CI/CD 门控
