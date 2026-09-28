---
name: investor-materials
description: 创建和更新宣传文稿、一页简介、投资者备忘录、加速器申请、财务模型和融资材料。当用户需要面向投资者的文件、预测、资金用途表、里程碑计划或必须在多个融资资产中保持内部一致性的材料时使用。
origin: ECC
---

# 投资者材料

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


构建面向投资者的材料，要求一致、可信且易于辩护。

## 何时启用

* 创建或修订融资演讲稿
* 撰写投资者备忘录或一页摘要
* 构建财务模型、里程碑计划或资金使用表
* 回答加速器或孵化器申请问题
* 围绕单一事实来源统一多个融资文件

## 黄金法则

所有投资者材料必须彼此一致。

在撰写前创建或确认单一事实来源：

* 增长指标
* 定价和收入假设
* 融资规模和工具
* 资金用途
* 团队简介和头衔
* 里程碑和时间线

如果出现冲突的数字，请停止起草并解决它们。

## 核心工作流程

1. 清点规范事实
2. 识别缺失的假设
3. 选择资产类型
4. 用明确的逻辑起草资产
5. 根据事实来源交叉核对每个数字

## 资产指南

### 融资演讲稿

推荐流程：

1. 公司 + 切入点
2. 问题
3. 解决方案
4. 产品 / 演示
5. 市场
6. 商业模式
7. 增长
8. 团队
9. 竞争 / 差异化
10. 融资需求
11. 资金用途 / 里程碑
12. 附录

如果用户想要一个基于网页的演讲稿，请将此技能与 `frontend-slides` 配对使用。

### 一页摘要 / 备忘录

* 用一句清晰的话说明公司做什么
* 展示为什么是现在
* 尽早包含增长数据和证明点
* 使融资需求精确
* 保持主张易于验证

### 财务模型

包含：

* 明确的假设
* 在有用时包含悲观/基准/乐观情景
* 清晰的逐层收入逻辑
* 与里程碑挂钩的支出
* 在决策依赖于假设的地方进行敏感性分析

### 加速器申请

* 回答被问的确切问题
* 优先考虑增长数据、洞察力和团队优势
* 避免夸大其词
* 保持内部指标与演讲稿和模型一致

## 需避免的危险信号

* 无法验证的主张
* 没有假设的模糊市场规模估算
* 不一致的团队角色或头衔
* 收入计算不清晰
* 在假设脆弱的地方夸大确定性

## 质量关卡

在交付前：

* 每个数字都与当前事实来源匹配
* 资金用途和收入层级计算正确
* 假设可见，而非隐藏
* 故事清晰，没有夸张语言
* 最终资产在合伙人会议上可辩护
