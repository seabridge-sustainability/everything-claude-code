---
name: exa-search
description: 通过Exa MCP进行神经搜索，适用于网络、代码和公司研究。当用户需要网络搜索、代码示例、公司情报、人员查找，或使用Exa神经搜索引擎进行AI驱动的深度研究时使用。
origin: ECC
---

# Exa 搜索

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


通过 Exa MCP 服务器实现网页内容、代码、公司和人物的神经搜索。

## 何时激活

* 用户需要当前网页信息或新闻
* 搜索代码示例、API 文档或技术参考资料
* 研究公司、竞争对手或市场参与者
* 查找特定领域的专业资料或人物
* 为任何开发任务进行背景调研
* 用户提到“搜索”、“查找”、“寻找”或“关于……的最新消息是什么”

## MCP 要求

必须配置 Exa MCP 服务器。添加到 `~/.claude.json`：

```json
"exa-web-search": {
  "command": "npx",
  "args": ["-y", "exa-mcp-server"],
  "env": { "EXA_API_KEY": "YOUR_EXA_API_KEY_HERE" }
}
```

在 [exa.ai](https://exa.ai) 获取 API 密钥。
此仓库当前的 Exa 设置记录了此处公开的工具接口：`web_search_exa` 和 `get_code_context_exa`。
如果你的 Exa 服务器公开了其他工具，请在文档或提示中依赖它们之前，先核实其确切名称。

## 核心工具

### web\_search\_exa

用于当前信息、新闻或事实的通用网页搜索。

```
web_search_exa(query: "2026年最新人工智能发展", numResults: 5)
```

**参数：**

| 参数 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------|
| `query` | 字符串 | 必填 | 搜索查询 |
| `numResults` | 数字 | 8 | 结果数量 |
| `type` | 字符串 | `auto` | 搜索模式 |
| `livecrawl` | 字符串 | `fallback` | 需要时优先使用实时爬取 |
| `category` | 字符串 | 无 | 可选焦点，例如 `company` 或 `research paper` |

### get\_code\_context\_exa

从 GitHub、Stack Overflow 和文档站点查找代码示例和文档。

```
get_code_context_exa(query: "Python asyncio patterns", tokensNum: 3000)
```

**参数：**

| 参数 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------|
| `query` | string | 必需 | 代码或 API 搜索查询 |
| `tokensNum` | number | 5000 | 内容令牌数（1000-50000） |

## 使用模式

### 快速查找

```
web_search_exa(query: "Node.js 22 新功能", numResults: 3)
```

### 代码研究

```
get_code_context_exa(query: "Rust错误处理模式Result类型", tokensNum: 3000)
```

### 公司或人物研究

```
web_search_exa(query: "Vercel 2026年融资估值", numResults: 3, category: "company")
web_search_exa(query: "site:linkedin.com/in Anthropic AI安全研究员", numResults: 5)
```

### 技术深度研究

```
web_search_exa(query: "WebAssembly 组件模型状态与采用情况", numResults: 5)
get_code_context_exa(query: "WebAssembly 组件模型示例", tokensNum: 4000)
```

## 提示

* 使用 `web_search_exa` 获取最新信息、公司查询和广泛发现
* 使用 `site:`、引号内的短语和 `intitle:` 等搜索运算符来缩小结果范围
* 对于聚焦的代码片段，使用较低的 `tokensNum` (1000-2000)；对于全面的上下文，使用较高的值 (5000+)
* 当你需要 API 用法或代码示例而非通用网页时，使用 `get_code_context_exa`

## 相关技能

* `deep-research` — 使用 firecrawl + exa 的完整研究工作流
* `market-research` — 带有决策框架的业务导向研究
