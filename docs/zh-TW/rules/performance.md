# 效能優化

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

## 模型選擇策略

**Haiku 4.5**（Sonnet 90% 能力，3 倍成本節省）：
- 頻繁呼叫的輕量 agents
- 配對程式設計和程式碼產生
- 多 agent 系統中的 worker agents

**Sonnet 5**（最佳程式碼模型）：
- 主要開發工作
- 協調多 agent 工作流程
- 複雜程式碼任務

**Opus 5**（最深度推理）：
- 複雜架構決策
- 最大推理需求
- 研究和分析任務

## 上下文視窗管理

避免在上下文視窗的最後 20% 進行：
- 大規模重構
- 跨多個檔案的功能實作
- 除錯複雜互動

較低上下文敏感度任務：
- 單檔案編輯
- 獨立工具建立
- 文件更新
- 簡單 Bug 修復

## Ultrathink + Plan 模式

對於需要深度推理的複雜任務：
1. 使用 `ultrathink` 增強思考
2. 啟用 **Plan 模式** 以結構化方法
3. 用多輪批評「預熱引擎」
4. 使用分角色子 agents 進行多元分析

## 建置疑難排解

如果建置失敗：
1. 使用 **build-error-resolver** Agent
2. 分析錯誤訊息
3. 增量修復
4. 每次修復後驗證
