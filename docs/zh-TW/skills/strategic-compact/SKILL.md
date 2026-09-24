---
name: strategic-compact
description: Suggests manual context compaction at logical intervals to preserve context through task phases rather than arbitrary auto-compaction.
---

# 策略性壓縮技能

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

在工作流程的策略點建議手動 `/compact`，而非依賴任意的自動壓縮。

## 為什麼需要策略性壓縮？

自動壓縮在任意點觸發：
- 經常在任務中途，丟失重要上下文
- 不知道邏輯任務邊界
- 可能中斷複雜的多步驟操作

邏輯邊界的策略性壓縮：
- **探索後、執行前** - 壓縮研究上下文，保留實作計畫
- **完成里程碑後** - 為下一階段重新開始
- **主要上下文轉換前** - 在不同任務前清除探索上下文

## 運作方式

`suggest-compact.js` 腳本在 PreToolUse（Edit/Write）執行並：

1. **追蹤工具呼叫** - 計算工作階段中的工具呼叫次數
2. **門檻偵測** - 在可設定門檻建議（預設：50 次呼叫）
3. **定期提醒** - 門檻後每 25 次呼叫提醒一次

## Hook 設定

**以外掛安裝？** 無需任何設定。外掛的 `hooks/hooks.json` 已經註冊了 `suggest-compact.js`（Hook ID `pre:edit-write:suggest-compact`，在 `standard` 與 `strict` hook 設定檔中生效）。請勿將下方區塊複製到 `~/.claude/settings.json` — 外掛安裝中不存在 `~/.claude/scripts/`，且重複註冊外掛 hook 會導致重複執行。

**如果是手動安裝**（`./install.sh`），新增到你的 `~/.claude/settings.json`：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit",
        "hooks": [{ "type": "command", "command": "node ~/.claude/scripts/hooks/suggest-compact.js" }]
      },
      {
        "matcher": "Write",
        "hooks": [{ "type": "command", "command": "node ~/.claude/scripts/hooks/suggest-compact.js" }]
      }
    ]
  }
}
```

## 設定

環境變數：
- `COMPACT_THRESHOLD` - 第一次建議前的工具呼叫次數（預設：50）

## 最佳實務

1. **規劃後壓縮** - 計畫確定後，壓縮以重新開始
2. **除錯後壓縮** - 繼續前清除錯誤解決上下文
3. **不要在實作中途壓縮** - 為相關變更保留上下文
4. **閱讀建議** - Hook 告訴你*何時*，你決定*是否*

## 相關

- [Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - Token 優化章節
- 記憶持久性 hooks - 用於壓縮後存活的狀態
