# 安全政策

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
