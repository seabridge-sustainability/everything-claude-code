# 效能優化

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
