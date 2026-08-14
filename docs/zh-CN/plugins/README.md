# 插件与市场

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
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
