# Git 工作流程

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

## 提交信息格式

```
<type>: <description>

<optional body>
```

类型：feat, fix, refactor, docs, test, chore, perf, ci

注意：ECC 管理的安装会在 `~/.claude/settings.json` 中设置 `"includeCoAuthoredBy": false`，因此提交默认不带 `Co-Authored-By`。若要保留 Claude 的归因，请设置 `"includeCoAuthoredBy": true` 或配置 `attribution`；ECC 不会覆盖用户的显式选择。

## 拉取请求工作流程

创建 PR 时：

1. 分析完整的提交历史（不仅仅是最近一次提交）
2. 使用 `git diff [base-branch]...HEAD` 查看所有更改
3. 起草全面的 PR 摘要
4. 包含带有 TODO 的测试计划
5. 如果是新分支，使用 `-u` 标志推送

> 有关 git 操作之前的完整开发流程（规划、TDD、代码审查），
> 请参阅 [development-workflow.md](development-workflow.md)。
