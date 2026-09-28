---
description: "从会话中提取可重用模式，在保存前自我评估质量，并确定正确的保存位置（全局与项目）。"
---

# /learn-eval - 提取、评估、然后保存

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

扩展 `/learn`，在编写任何技能文件之前，加入质量门控、保存位置决策和知识放置意识。

## 提取内容

寻找：

1. **错误解决模式** — 根本原因 + 修复方法 + 可重用性
2. **调试技术** — 非显而易见的步骤、工具组合
3. **变通方法** — 库的怪癖、API 限制、特定版本的修复
4. **项目特定模式** — 约定、架构决策、集成模式

## 流程

1. 回顾会话，寻找可提取的模式

2. 识别最有价值/可重用的见解

3. **确定保存位置：**
   * 提问："这个模式在其他项目中会有用吗？"
   * **全局** (`~/.claude/skills/learned/`)：可在 2 个以上项目中使用的通用模式（bash 兼容性、LLM API 行为、调试技术等）
   * **项目** (当前项目中的 `.claude/skills/learned/`)：项目特定的知识（特定配置文件的怪癖、项目特定的架构决策等）
   * 不确定时，选择全局（将全局 → 项目移动比反向操作更容易）

4. 使用此格式起草技能文件：

```markdown
---
name: pattern-name
description: "Under 130 characters"
user-invocable: false
origin: auto-extracted
---

# [描述性模式名称]

**提取日期：** [日期]
**上下文：** [简要描述此模式适用的场景]

## 问题
[此模式解决的具体问题 - 请详细说明]

## 解决方案
[模式/技术/变通方案 - 附带代码示例]

## 何时使用
[触发条件]
```

5. **质量门控 — 清单 + 整体裁决**

   ### 5a. 必需清单（通过实际阅读文件进行验证）

   在评估草案**之前**，执行以下所有操作：

   * \[ ] 使用关键字在 `~/.claude/skills/` 和相关项目的 `.claude/skills/` 文件中进行 grep 搜索，检查内容重叠
   * \[ ] 检查 MEMORY.md（项目级和全局级）以查找重叠内容
   * \[ ] 考虑是否追加到现有技能即可满足需求
   * \[ ] 确认这是一个可复用的模式，而非一次性修复

   ### 5b. 整体裁决

   综合清单结果和草案质量，然后选择**以下一项**：

   | 裁决 | 含义 | 下一步行动 |
   |---------|---------|-------------|
   | **保存** | 独特、具体、范围明确 | 进行到步骤 6 |
   | **改进后保存** | 有价值但需要改进 | 列出改进项 → 修订 → 重新评估（一次） |
   | **吸收到 \[X]** | 应追加到现有技能 | 显示目标技能和添加内容 → 步骤 6 |
   | **放弃** | 琐碎、冗余或过于抽象 | 解释原因并停止 |

**指导维度**（用于告知裁决，不进行评分）：

* **具体性和可操作性**：包含可立即使用的代码示例或命令
* **范围契合度**：名称、触发条件和内容保持一致，并专注于单一模式
* **独特性**：提供现有技能未涵盖的价值（基于清单结果）
* **可复用性**：在未来的会话中存在现实的触发场景

6. **裁决特定的确认流程**

   * **改进后保存**：呈现必需的改进项 + 修订后的草案 + 一次重新评估后的更新清单/裁决；如果修订后的裁决是**保存**，则在用户确认后保存，否则遵循新的裁决
   * **保存**：呈现保存路径 + 清单结果 + 1行裁决理由 + 完整草案 → 在用户确认后保存
   * **吸收到 \[X]**：呈现目标路径 + 添加内容（diff格式） + 清单结果 + 裁决理由 → 在用户确认后追加
   * **放弃**：仅显示清单结果 + 推理（无需确认）

7. 保存 / 吸收到确定的位置

## 步骤 5 的输出格式

```
### 检查清单
- [x] skills/ grep: 无重叠 (或: 发现重叠 → 详情)
- [x] MEMORY.md: 无重叠 (或: 发现重叠 → 详情)
- [x] 现有技能追加: 新文件合适 (或: 应追加到 [X])
- [x] 可复用性: 已确认 (或: 一次性 → 丢弃)

### 裁决: 保存 / 改进后保存 / 吸收到 [X] / 丢弃

**理由:** (用 1-2 句话解释裁决)
```

## 设计原理

此版本用基于清单的整体裁决系统取代了之前的 5 维度数字评分标准（具体性、可操作性、范围契合度、非冗余性、覆盖度，评分 1-5）。现代前沿模型（Opus 4.6+，包括 Claude 5 系列）具有强大的情境判断能力 —— 将丰富的定性信号强行压缩为数字评分会丢失细微差别，并可能产生误导性的总分。整体方法让模型自然地权衡所有因素，产生更准确的保存/放弃决策，同时明确的清单确保不会跳过任何关键检查。

## 注意事项

* 不要提取琐碎的修复（拼写错误、简单的语法错误）
* 不要提取一次性问题（特定的 API 中断等）
* 专注于那些将在未来会话中节省时间的模式
* 保持技能聚焦 —— 每个技能一个模式
* 当裁决为“吸收”时，追加到现有技能，而不是创建新文件
