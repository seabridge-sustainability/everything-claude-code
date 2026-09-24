# 插件与市场

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->

插件扩展了 Claude Code 的功能，为其添加新工具和能力。本指南仅涵盖安装部分 - 关于何时以及为何使用插件，请参阅[完整文章](https://x.com/affaanmustafa/status/2012378465664745795)。

***

## 市场

市场是可安装插件的存储库。

### 添加市场

```bash
# Add official Anthropic marketplace
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official

# Add community marketplaces (mgrep by @mixedbread-ai)
claude plugin marketplace add https://github.com/mixedbread-ai/mgrep
```

### 推荐市场

| 市场 | 来源 |
|-------------|--------|
| claude-plugins-official | `anthropics/claude-plugins-official` |
| claude-code-plugins | `anthropics/claude-code` |
| Mixedbread-Grep (@mixedbread-ai) | `mixedbread-ai/mgrep` |

***

## 安装插件

```bash
# Open plugins browser
/plugins

# Or install directly
claude plugin install typescript-lsp@claude-plugins-official
```

### 推荐插件

**开发：**

* `typescript-lsp` - TypeScript 智能支持
* `pyright-lsp` - Python 类型检查
* `hookify` - 通过对话创建钩子
* `code-simplifier` - 代码重构

**代码质量：**

* `code-review` - 代码审查
* `pr-review-toolkit` - PR 自动化
* `security-guidance` - 安全检查

**搜索：**

* `mgrep` - 增强搜索（优于 ripgrep）
* `context7` - 实时文档查找

**工作流：**

* `commit-commands` - Git 工作流
* `frontend-patterns` - UI 模式
* `feature-dev` - 功能开发

***

## 快速设置

```bash
# Add marketplaces
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official
claude plugin marketplace add https://github.com/mixedbread-ai/mgrep

# Open /plugins and install what you need
```

***

## 插件文件位置

```
~/.claude/plugins/
|-- cache/                    # 已下载的插件
|-- installed_plugins.json    # 已安装列表
|-- known_marketplaces.json   # 已添加的市场
|-- marketplaces/             # 市场数据
```
