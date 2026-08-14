# 性能优化

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

## 模型选择策略

**Haiku 4.5** (具备 Sonnet 90% 的能力，节省 3 倍成本):

* 频繁调用的轻量级智能体
* 结对编程和代码生成
* 多智能体系统中的工作智能体

**Sonnet 5** (最佳编码模型):

* 主要的开发工作
* 编排多智能体工作流
* 复杂的编码任务

**Opus 5** (最深的推理能力):

* 复杂的架构决策
* 最高级别的推理需求
* 研究和分析任务

## 上下文窗口管理

避免使用上下文窗口的最后 20% 进行:

* 大规模重构
* 跨多个文件的功能实现
* 调试复杂的交互

上下文敏感性较低的任务:

* 单文件编辑
* 创建独立的实用工具
* 文档更新
* 简单的错误修复

## 扩展思考 + 计划模式

扩展思考默认启用，最多保留 31,999 个令牌用于内部推理。

通过以下方式控制扩展思考：

* **切换**：Option+T (macOS) / Alt+T (Windows/Linux)
* **配置**：在 `~/.claude/settings.json` 中设置 `alwaysThinkingEnabled`
* **预算上限**：`export MAX_THINKING_TOKENS=10000`（bash）或 `$env:MAX_THINKING_TOKENS = "10000"`（PowerShell）
* **详细模式**：Ctrl+O 查看思考输出

对于需要深度推理的复杂任务:

1. 确保扩展思考已启用（默认开启）
2. 启用 **计划模式** 以获得结构化方法
3. 使用多轮批判进行彻底分析
4. 使用分割角色子代理以获得多元视角

## 构建故障排除

如果构建失败:

1. 使用 **build-error-resolver** 智能体
2. 分析错误信息
3. 逐步修复
4. 每次修复后进行验证
