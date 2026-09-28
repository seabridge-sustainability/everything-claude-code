---
name: content-engine
description: 为X、LinkedIn、TikTok、YouTube、新闻通讯和跨平台重新利用的多平台活动创建平台原生内容系统。适用于当用户需要社交媒体帖子、帖子串、脚本、内容日历，或一个源资产在多个平台上清晰适配时。
origin: ECC
---

# 内容引擎

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


将一个想法转化为强大的、平台原生的内容，而不是到处发布相同的东西。

## 何时激活

* 撰写 X 帖子或主题串时
* 起草 LinkedIn 帖子或发布更新时
* 编写短视频或 YouTube 解说稿时
* 将文章、播客、演示或文档改写成社交内容时
* 围绕发布、里程碑或主题制定轻量级内容计划时

## 首要问题

明确：

* 来源素材：我们从什么内容改编
* 受众：构建者、投资者、客户、运营者，还是普通受众
* 平台：X、LinkedIn、TikTok、YouTube、新闻简报，还是多平台
* 目标：品牌认知、转化、招聘、建立权威、支持发布，还是互动参与

## 核心规则

1. 为平台进行适配。不要交叉发布相同的文案。
2. 开篇钩子比总结更重要。
3. 每篇帖子应承载一个清晰的想法。
4. 使用具体细节而非口号。
5. 保持呼吁行动小而清晰。

## 平台指南

### X

* 开场要快
* 每个帖子或主题串中的每条推文只讲一个想法
* 除非必要，避免在主文中放置链接
* 避免滥用话题标签

### LinkedIn

* 第一行要强有力
* 使用短段落
* 围绕经验教训、结果和要点进行更明确的框架构建

### TikTok / 短视频

* 前 3 秒必须抓住注意力
* 围绕视觉内容编写脚本，而不仅仅是旁白
* 一个演示、一个主张、一个行动号召

### YouTube

* 尽早展示结果
* 按章节构建内容
* 每 20-30 秒刷新一次视觉内容

### 新闻简报

* 提供一个清晰的视角，而不是一堆不相关的内容
* 使章节标题易于浏览
* 让开篇段落真正发挥作用

## 内容再利用流程

默认级联：

1. 锚定素材：文章、视频、演示、备忘录或发布文档
2. 提取 3-7 个原子化想法
3. 撰写平台原生的变体内容
4. 修剪不同输出内容中的重复部分
5. 使行动号召与平台意图保持一致

## 交付物

当被要求进行一项宣传活动时，请返回：

* 核心角度
* 针对特定平台的草稿
* 可选的发布顺序
* 可选的行动号召变体
* 发布前所需的任何缺失信息

## 质量门槛

在交付前检查：

* 每份草稿读起来都符合其平台原生风格
* 开篇钩子强大且具体
* 没有通用的炒作语言
* 除非特别要求，否则各平台间没有重复文案
* 行动号召与内容和受众相匹配
