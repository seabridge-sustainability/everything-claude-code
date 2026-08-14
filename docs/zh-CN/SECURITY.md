# 安全政策

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

## 支持版本

| 版本     | 支持状态           |
| -------- | ------------------ |
| 1.9.x    | :white\_check\_mark: |
| 1.8.x    | :white\_check\_mark: |
| < 1.8    | :x:                |

## 报告漏洞

如果您在 ECC 中发现安全漏洞，请负责任地报告。

**请勿为安全漏洞创建公开的 GitHub 议题。**

请将信息发送至 **<security@ecc.tools>**，邮件中需包含：

* 漏洞描述
* 复现步骤
* 受影响的版本
* 任何潜在的影响评估

您可以期待：

* **确认通知**：48 小时内
* **状态更新**：7 天内
* **修复或缓解措施**：对于关键问题，30 天内

如果漏洞被采纳，我们将：

* 在发布说明中注明您的贡献（除非您希望匿名）
* 及时修复问题
* 与您协调披露时间

如果漏洞被拒绝，我们将解释原因，并提供是否应向其他地方报告的指导。

## 范围

本政策涵盖：

* ECC 插件及此仓库中的所有脚本
* 在您机器上执行的钩子脚本
* 安装/卸载/修复生命周期脚本
* 随 ECC 分发的 MCP 配置
* AgentShield 安全扫描器 ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## 安全资源

* **AgentShield**：扫描您的代理配置以查找漏洞 — `npx ecc-agentshield scan`
* **安全指南**：[The Shorthand Guide to Everything Agentic Security](the-security-guide.md)
* **OWASP MCP Top 10**：[owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
* **OWASP Agentic Applications Top 10**：[genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
