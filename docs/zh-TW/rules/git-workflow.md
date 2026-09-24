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

## Commit 訊息格式

```
<type>: <description>

<optional body>
```

類型：feat、fix、refactor、docs、test、chore、perf、ci

注意：ECC 管理的安裝會在 `~/.claude/settings.json` 中設定 `"includeCoAuthoredBy": false`，因此提交預設不會附帶 `Co-Authored-By`。若要保留 Claude 的歸屬，請設定 `"includeCoAuthoredBy": true` 或設定 `attribution`；ECC 不會覆寫使用者的明確選擇。

## Pull Request 工作流程

建立 PR 時：
1. 分析完整 commit 歷史（不只是最新 commit）
2. 使用 `git diff [base-branch]...HEAD` 查看所有變更
3. 起草全面的 PR 摘要
4. 包含帶 TODO 的測試計畫
5. 如果是新分支，使用 `-u` flag 推送

## 功能實作工作流程

1. **先規劃**
   - 使用 **planner** Agent 建立實作計畫
   - 識別相依性和風險
   - 拆解為階段

2. **TDD 方法**
   - 使用 **tdd-guide** Agent
   - 先撰寫測試（RED）
   - 實作使測試通過（GREEN）
   - 重構（IMPROVE）
   - 驗證 80%+ 覆蓋率

3. **程式碼審查**
   - 撰寫程式碼後立即使用 **code-reviewer** Agent
   - 處理關鍵和高優先問題
   - 盡可能修復中優先問題

4. **Commit 與推送**
   - 詳細的 commit 訊息
   - 遵循 conventional commits 格式
