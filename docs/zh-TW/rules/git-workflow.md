# Git 工作流程

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
