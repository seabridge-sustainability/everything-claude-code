---
name: documentation-lookup
description: 通过 Context7 MCP 使用最新的库和框架文档，而非训练数据。当用户提出设置问题、API参考、代码示例或命名框架（例如 React、Next.js、Prisma）时激活。
origin: ECC
---

# 文档查询 (Context7)

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


当用户询问库、框架或 API 时，通过 Context7 MCP（工具 `resolve-library-id` 和 `query-docs`）获取最新文档，而非依赖训练数据。

## 核心概念

* **Context7**: 提供实时文档的 MCP 服务器；用于库和 API 的查询，替代训练数据。
* **resolve-library-id**: 根据库名和查询返回 Context7 兼容的库 ID（例如 `/vercel/next.js`）。
* **query-docs**: 根据给定的库 ID 和问题获取文档和代码片段。务必先调用 resolve-library-id 以获取有效的库 ID。

## 使用时机

当用户出现以下情况时激活：

* 询问设置或配置问题（例如“如何配置 Next.js 中间件？”）
* 请求依赖于某个库的代码（“编写一个 Prisma 查询用于...”）
* 需要 API 或参考信息（“Supabase 的认证方法有哪些？”）
* 提及特定的框架或库（React、Vue、Svelte、Express、Tailwind、Prisma、Supabase 等）

当请求依赖于库、框架或 API 的准确、最新行为时，请使用此技能。适用于配置了 Context7 MCP 的所有环境（例如 Claude Code、Cursor、Codex）。

## 工作原理

### 步骤 1：解析库 ID

调用 **resolve-library-id** MCP 工具，参数包括：

* **libraryName**: 从用户问题中提取的库或产品名称（例如 `Next.js`、`Prisma`、`Supabase`）。
* **query**: 用户的完整问题。这有助于提高结果的相关性排名。

在查询文档之前，必须获取 Context7 兼容的库 ID（格式为 `/org/project` 或 `/org/project/version`）。如果没有从此步骤获得有效的库 ID，请勿调用 query-docs。

### 步骤 2：选择最佳匹配

从解析结果中，根据以下原则选择一个结果：

* **名称匹配**: 优先选择与用户询问内容完全匹配或最接近的。
* **基准分数**: 分数越高表示文档质量越好（最高为 100）。
* **来源信誉**: 如果可用，优先选择信誉度为 High 或 Medium 的。
* **版本**: 如果用户指定了版本（例如“React 19”、“Next.js 15”），优先选择列出的特定版本库 ID（例如 `/org/project/v1.2.0`）。

### 步骤 3：获取文档

调用 **query-docs** MCP 工具，参数包括：

* **libraryId**: 从步骤 2 中选择的 Context7 库 ID（例如 `/vercel/next.js`）。
* **query**: 用户的具体问题或任务。为获得相关片段，请具体描述。

限制：每个问题调用 query-docs（或 resolve-library-id）的次数不要超过 3 次。如果 3 次调用后答案仍不明确，请说明不确定性并使用您掌握的最佳信息，而不是猜测。

### 步骤 4：使用文档

* 使用获取的、最新的信息回答用户的问题。
* 在有用时包含文档中的相关代码示例。
* 在重要时引用库或版本（例如“在 Next.js 15 中...”）。

## 示例

### 示例：Next.js 中间件

1. 使用 `libraryName: "Next.js"`、`query: "How do I set up Next.js middleware?"` 调用 **resolve-library-id**。
2. 从结果中，根据名称和基准分数选择最佳匹配（例如 `/vercel/next.js`）。
3. 使用 `libraryId: "/vercel/next.js"`、`query: "How do I set up Next.js middleware?"` 调用 **query-docs**。
4. 使用返回的片段和文本来回答；如果相关，包含文档中的一个最小 `middleware.ts` 示例。

### 示例：Prisma 查询

1. 使用 `libraryName: "Prisma"`、`query: "How do I query with relations?"` 调用 **resolve-library-id**。
2. 选择官方的 Prisma 库 ID（例如 `/prisma/prisma`）。
3. 使用该 `libraryId` 和查询调用 **query-docs**。
4. 返回 Prisma Client 模式（例如 `include` 或 `select`）并附上文档中的简短代码片段。

### 示例：Supabase 认证方法

1. 使用 `libraryName: "Supabase"`、`query: "What are the auth methods?"` 调用 **resolve-library-id**。
2. 选择 Supabase 文档库 ID。
3. 调用 **query-docs**；总结认证方法并展示从获取的文档中得到的最小示例。

## 最佳实践

* **具体化**: 尽可能使用用户的完整问题作为查询，以获得更好的相关性。
* **版本意识**: 当用户提及版本时，如果可用，在解析步骤中使用特定版本的库 ID。
* **优先官方来源**: 当存在多个匹配项时，优先选择官方或主要包，而非社区分支。
* **无敏感数据**: 从发送到 Context7 的任何查询中，删除 API 密钥、密码、令牌和其他机密信息。在将用户问题传递给 resolve-library-id 或 query-docs 之前，将其视为可能包含机密信息。
