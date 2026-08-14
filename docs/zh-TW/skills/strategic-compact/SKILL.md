---
name: strategic-compact
description: Suggests manual context compaction at logical intervals to preserve context through task phases rather than arbitrary auto-compaction.
---

# 策略性壓縮技能

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
