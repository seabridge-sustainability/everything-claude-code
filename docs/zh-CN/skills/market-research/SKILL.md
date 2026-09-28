---
name: market-research
description: 进行市场研究、竞争分析、投资者尽职调查和行业情报，附带来源归属和决策导向的摘要。适用于用户需要市场规模、竞争对手比较、基金研究、技术扫描或为商业决策提供信息的研究时。
origin: ECC
---

# 市场研究

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


产出支持决策的研究，而非研究表演。

## 何时激活

* 研究市场、品类、公司、投资者或技术趋势时
* 构建 TAM/SAM/SOM 估算时
* 比较竞争对手或相邻产品时
* 在接触前准备投资者档案时
* 在构建、投资或进入市场前对论点进行压力测试时

## 研究标准

1. 每个重要主张都需要有来源。
2. 优先使用近期数据，并明确指出陈旧数据。
3. 包含反面证据和不利情况。
4. 将发现转化为决策，而不仅仅是总结。
5. 清晰区分事实、推论和建议。

## 常见研究模式

### 投资者 / 基金尽职调查

收集：

* 基金规模、阶段和典型投资额度
* 相关的投资组合公司
* 公开的投资理念和近期动态
* 该基金适合或不适合的理由
* 任何明显的危险信号或不匹配之处

### 竞争分析

收集：

* 产品现实情况，而非营销文案
* 公开的融资和投资者历史
* 公开的吸引力指标
* 分销和定价线索
* 优势、劣势和定位差距

### 市场规模估算

使用：

* 来自报告或公共数据集的"自上而下"估算
* 基于现实的客户获取假设进行的"自下而上"合理性检查
* 对每个逻辑跳跃的明确假设

### 技术 / 供应商研究

收集：

* 其工作原理
* 权衡取舍和采用信号
* 集成复杂度
* 锁定、安全、合规和运营风险

## 输出格式

默认结构：

1. 执行摘要
2. 关键发现
3. 影响
4. 风险和注意事项
5. 建议
6. 来源

## 质量门

在交付前检查：

* 所有数字均已注明来源或标记为估算
* 陈旧数据已标注
* 建议源自证据
* 风险和反对论点已包含在内
* 输出使决策更容易
