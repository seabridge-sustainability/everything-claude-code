---
name: verification-loop
description: A comprehensive verification system for Claude Code sessions.
metadata:
  origin: ECC
---

# 驗證循環技能

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

Claude Code 工作階段的完整驗證系統。

## 何時使用

在以下情況呼叫此技能：
- 完成功能或重大程式碼變更後
- 建立 PR 前
- 想確保品質門檻通過時
- 重構後

## 驗證階段

### 階段 1：建置驗證
```bash
# 檢查專案是否建置
npm run build 2>&1 | tail -20
# 或
pnpm build 2>&1 | tail -20
```

如果建置失敗，停止並在繼續前修復。

### 階段 2：型別檢查
```bash
# TypeScript 專案
npx tsc --noEmit 2>&1 | head -30

# Python 專案
pyright . 2>&1 | head -30
```

報告所有型別錯誤。繼續前修復關鍵錯誤。

### 階段 3：Lint 檢查
```bash
# JavaScript/TypeScript
npm run lint 2>&1 | head -30

# Python
ruff check . 2>&1 | head -30
```

### 階段 4：測試套件
```bash
# 執行帶覆蓋率的測試
npm run test -- --coverage 2>&1 | tail -50

# 檢查覆蓋率門檻
# 目標：最低 80%
```

報告：
- 總測試數：X
- 通過：X
- 失敗：X
- 覆蓋率：X%

### 階段 5：安全掃描
```bash
# 檢查密鑰
grep -rn "sk-" --include="*.ts" --include="*.js" . 2>/dev/null | head -10
grep -rn "api_key" --include="*.ts" --include="*.js" . 2>/dev/null | head -10

# 檢查 console.log
grep -rn "console.log" --include="*.ts" --include="*.tsx" src/ 2>/dev/null | head -10
```

### 階段 6：差異審查
```bash
# 顯示變更內容
git diff --stat
git diff HEAD~1 --name-only
```

審查每個變更的檔案：
- 非預期變更
- 缺少錯誤處理
- 潛在邊界案例

## 輸出格式

執行所有階段後，產生驗證報告：

```
驗證報告
==================

建置：     [PASS/FAIL]
型別：     [PASS/FAIL]（X 個錯誤）
Lint：     [PASS/FAIL]（X 個警告）
測試：     [PASS/FAIL]（X/Y 通過，Z% 覆蓋率）
安全性：   [PASS/FAIL]（X 個問題）
差異：     [X 個檔案變更]

整體：     [READY/NOT READY] for PR

待修復問題：
1. ...
2. ...
```

## 持續模式

對於長時間工作階段，每 15 分鐘或重大變更後執行驗證：

```markdown
設定心理檢查點：
- 完成每個函式後
- 完成元件後
- 移至下一個任務前

執行：/verify
```

## 與 Hooks 整合

此技能補充 PostToolUse hooks 但提供更深入的驗證。
Hooks 立即捕捉問題；此技能提供全面審查。
