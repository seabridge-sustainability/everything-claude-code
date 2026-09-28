---
name: article-writing
description: 根据提供的示例或品牌指导，以独特的语气撰写文章、指南、博客帖子、教程、新闻简报等长篇内容。当用户需要超过一段的精致书面内容时使用，尤其是当语气一致性、结构和可信度至关重要时。
origin: ECC
---

# 文章写作

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


撰写听起来像真人或真实品牌的长篇内容，而非通用的 AI 输出。

## 何时使用

* 起草博客文章、散文、发布帖、指南、教程或新闻简报时
* 将笔记、转录稿或研究转化为精炼文章时
* 根据示例匹配现有的创始人、运营者或品牌声音时
* 强化已有长篇文稿的结构、节奏和论据时

## 核心规则

1. **以具体事物开头**：示例、输出、轶事、数据、截图描述或代码块。
2. 先展示示例，再解释。
3. 倾向于简短、直接的句子，而非冗长的句子。
4. 尽可能使用具体且有来源的数据。
5. **绝不编造**传记事实、公司指标或客户证据。

## 声音捕捉工作流

如果用户需要特定的声音，请收集以下一项或多项：

* 已发表的文章
* 新闻简报
* X / LinkedIn 帖子
* 文档或备忘录
* 简短的风格指南

然后提取：

* 句子长度和节奏
* 声音是正式、对话式还是犀利的
* 偏好的修辞手法，如括号、列表、断句或设问
* 对幽默、观点和反主流框架的容忍度
* 格式习惯，如标题、项目符号、代码块和引用块

如果未提供声音参考，则默认为直接、运营者风格的声音：具体、实用，且少用夸张宣传。

## 禁止模式

删除并重写以下任何内容：

* 通用开头，如“在当今快速发展的格局中”
* 填充性过渡词，如“此外”和“而且”
* 夸张短语，如“游戏规则改变者”、“尖端”或“革命性的”
* 没有证据支持的模糊主张
* 没有提供上下文支持的传记或可信度声明

## 写作流程

1. 明确受众和目的。
2. 构建一个框架大纲，每个部分一个目的。
3. 每个部分都以证据、示例或场景开头。
4. 只在下一句话有其存在价值的地方展开。
5. 删除任何听起来像模板化或自我祝贺的内容。

## 结构指导

### 技术指南

* 以读者能获得什么开头
* 在每个主要部分使用代码或终端示例
* 以具体的要点结束，而非软性的总结

### 散文 / 观点文章

* 以张力、矛盾或尖锐的观察开头
* 每个部分只保持一个论点线索
* 使用能支撑观点的示例

### 新闻简报

* 保持首屏内容有力
* 将见解与更新结合，而非日记式填充
* 使用清晰的部分标签和易于浏览的结构

## 质量检查

交付前：

* 根据提供的来源核实事实主张
* 删除填充词和企业语言
* 确认声音与提供的示例匹配
* 确保每个部分都添加了新信息
* 检查针对目标平台的格式
