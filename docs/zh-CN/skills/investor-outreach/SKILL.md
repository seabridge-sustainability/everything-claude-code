---
name: investor-outreach
description: 草拟冷邮件、热情介绍简介、跟进邮件、更新邮件和投资者沟通以筹集资金。当用户需要向天使投资人、风险投资公司、战略投资者或加速器进行推广，并需要简洁、个性化的面向投资者的消息时使用。
origin: ECC
---

# 投资者接洽

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


撰写简短、个性化且易于采取行动的投资者沟通内容。

## 何时激活

* 向投资者发送冷邮件时
* 起草熟人介绍请求时
* 在会议后或无回复时发送跟进邮件时
* 在融资过程中撰写投资者更新时
* 根据基金投资主题或合伙人契合度定制接洽内容时

## 核心规则

1. 个性化每一条外发信息。
2. 保持请求低门槛。
3. 使用证据，而非形容词。
4. 保持简洁。
5. 绝不发送可发给任何投资者的通用文案。

## 冷邮件结构

1. 主题行：简短且具体
2. 开头：说明为何选择这位特定投资者
3. 推介：公司做什么，为何是现在，什么证据重要
4. 请求：一个具体的下一步行动
5. 签名：姓名、职位，如需可加上一个可信度锚点

## 个性化来源

参考以下一项或多项：

* 相关的投资组合公司
* 公开的投资主题、演讲、帖子或文章
* 共同的联系人
* 与投资者关注点明确匹配的市场或产品契合度

如果缺少相关背景信息，请询问或说明草稿是等待个性化的模板。

## 跟进节奏

默认节奏：

* 第 0 天：初次外发
* 第 4-5 天：简短跟进，附带一个新数据点
* 第 10-12 天：最终跟进，干净利落地收尾

之后除非用户要求更长的跟进序列，否则不再继续提醒。

## 熟人介绍请求

为介绍人提供便利：

* 解释为何这次介绍是合适的
* 包含可转发的简介
* 将可转发的简介控制在 100 字以内

## 会后更新

包含：

* 讨论的具体事项
* 承诺的答复或更新
* 如有可能，提供一个新证据点
* 下一步行动

## 质量关卡

在交付前检查：

* 信息已个性化
* 请求明确
* 没有废话或乞求性语言
* 证据点具体
* 字数保持紧凑
