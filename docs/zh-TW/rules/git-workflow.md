# Git 工作流程

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
