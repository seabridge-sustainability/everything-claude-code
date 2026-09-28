---
name: crosspost
description: 跨X、LinkedIn、Threads和Bluesky的多平台内容分发。使用内容引擎模式根据平台适配内容。从不跨平台发布相同内容。当用户希望跨社交平台分发内容时使用。
origin: ECC
---

# 跨平台发布

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


将内容分发到多个社交平台，并适配各平台原生风格。

## 何时激活

* 用户希望将内容发布到多个平台
* 在社交媒体上发布公告、产品发布或更新
* 将某个平台的内容改编后发布到其他平台
* 用户提及“跨平台发布”、“到处发帖”、“分享到所有平台”或“分发这个”

## 核心规则

1. **切勿在不同平台发布相同内容。** 每个平台都应获得原生适配版本。
2. **主平台优先。** 先发布到主平台，再为其他平台适配。
3. **遵循平台惯例。** 各平台的字符限制、格式、链接处理方式均不同。
4. **每条帖子一个核心思想。** 如果源内容包含多个想法，请拆分成多条帖子。
5. **注明出处很重要。** 如果转发他人的内容，请注明来源。

## 平台规范

| 平台 | 最大长度 | 链接处理 | 话题标签 | 媒体 |
|----------|-----------|---------------|----------|-------|
| X | 280 字符 (Premium 用户为 4000) | 计入长度 | 少量 (最多 1-2 个) | 图片、视频、GIF |
| LinkedIn | 3000 字符 | 不计入长度 | 3-5 个相关标签 | 图片、视频、文档、轮播 |
| Threads | 500 字符 | 独立的链接附件 | 通常不使用 | 图片、视频 |
| Bluesky | 300 字符 | 通过 Facets (富文本) | 无 (使用 Feeds) | 图片 |

## 工作流程

### 步骤 1：创建源内容

从核心想法开始。使用 `content-engine` 技能来生成高质量草稿：

* 识别单一核心信息
* 确定主平台 (受众最大的平台)
* 首先为主平台撰写草稿

### 步骤 2：确定目标平台

询问用户或根据上下文确定：

* 要发布到哪些平台
* 优先级顺序 (主平台获得最佳版本)
* 任何平台特定要求 (例如，LinkedIn 需要专业语气)

### 步骤 3：按平台适配

针对每个目标平台，转换内容：

**X 平台适配：**

* 用吸引人的开头，而非总结
* 快速切入核心见解
* 尽可能将链接放在正文之外
* 对于较长内容，使用 Thread 格式

**LinkedIn 平台适配：**

* 强有力的首行 (在“查看更多”前可见)
* 使用换行符的短段落
* 围绕经验教训、结果或专业收获来构建内容
* 比 X 提供更明确的背景信息 (LinkedIn 受众需要背景框架)

**Threads 平台适配：**

* 对话式、随意的语气
* 比 LinkedIn 短，但比 X 压缩感弱
* 如果可能，优先考虑视觉效果

**Bluesky 平台适配：**

* 直接简洁 (300 字符限制)
* 社区导向的语气
* 使用 Feeds/列表进行主题定位，而非话题标签

### 步骤 4：发布到主平台

首先发布到主平台：

* 使用 `x-api` 技能处理 X
* 使用平台特定的 API 或工具处理其他平台
* 捕获帖子 URL 以便交叉引用

### 步骤 5：发布到次级平台

将适配后的版本发布到其余平台：

* 错开发布时间 (不要同时发布 — 间隔 30-60 分钟)
* 在适当的地方包含跨平台引用 (例如，“在 X 上有更长的 Thread”等)

## 内容适配示例

### 源内容：产品发布

**X 版本：**

```
我们刚刚发布了 [feature]。

[它所实现的某个具体且令人印象深刻的功能]

[链接]
```

**LinkedIn 版本：**

```
激动地宣布：我们刚刚在[Company]推出了[feature]。

以下是其重要意义：

[2-3段简短背景说明]

[对受众的核心启示]

[链接]
```

**Threads 版本：**

```
刚发布了一个很酷的东西 —— [feature]

[对这个功能是什么的随意解释]

链接在简介里
```

### 源内容：技术见解

**X 版本：**

```
今天学到：[具体技术见解]

[一句话说明其重要性]
```

**LinkedIn 版本：**

```
我一直在使用的一种模式，它带来了真正的改变：

[技术见解与专业框架]

[它如何适用于团队/组织]

#相关标签
```

## API 集成

### 批量跨平台发布服务 (示例模式)

如果使用跨平台发布服务 (例如 Postbridge、Buffer 或自定义 API)，模式如下：

```python
import os
import requests

resp = requests.post(
    "https://your-crosspost-service.example/api/posts",
    headers={"Authorization": f"Bearer {os.environ['POSTBRIDGE_API_KEY']}"},
    json={
        "platforms": ["twitter", "linkedin", "threads"],
        "content": {
            "twitter": {"text": x_version},
            "linkedin": {"text": linkedin_version},
            "threads": {"text": threads_version}
        }
    },
    timeout=30,
)
resp.raise_for_status()
```

### 手动发布

没有 Postbridge 时，使用各平台原生 API 发布：

* X: 使用 `x-api` 技能模式
* LinkedIn: 使用 OAuth 2.0 的 LinkedIn API v2
* Threads: Threads API (Meta)
* Bluesky: AT Protocol API

## 质量检查

发布前：

* \[ ] 每个平台的版本读起来都符合该平台的自然风格
* \[ ] 各平台内容不完全相同
* \[ ] 遵守字符限制
* \[ ] 链接有效且放置位置恰当
* \[ ] 语气符合平台惯例
* \[ ] 媒体文件尺寸适合各平台

## 相关技能

* `content-engine` — 生成平台原生内容
* `x-api` — X/Twitter API 集成
