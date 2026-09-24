# 安全政策

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
