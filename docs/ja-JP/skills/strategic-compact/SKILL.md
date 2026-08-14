---
name: strategic-compact
description: 任意の自動コンパクションではなく、タスクフェーズを通じてコンテキストを保持するための論理的な間隔での手動コンパクションを提案します。
---

# Strategic Compactスキル

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

任意の自動コンパクションに依存するのではなく、ワークフローの戦略的なポイントで手動の`/compact`を提案します。

## なぜ戦略的コンパクションか？

自動コンパクションは任意のポイントでトリガーされます：
- 多くの場合タスクの途中で、重要なコンテキストを失う
- タスクの論理的な境界を認識しない
- 複雑な複数ステップの操作を中断する可能性がある

論理的な境界での戦略的コンパクション：
- **探索後、実行前** - 研究コンテキストをコンパクト、実装計画を保持
- **マイルストーン完了後** - 次のフェーズのために新しいスタート
- **主要なコンテキストシフト前** - 異なるタスクの前に探索コンテキストをクリア

## 仕組み

`suggest-compact.js`スクリプトはPreToolUse（Edit/Write）で実行され：

1. **ツール呼び出しを追跡** - セッション内のツール呼び出しをカウント
2. **閾値検出** - 設定可能な閾値で提案（デフォルト：50回）
3. **定期的なリマインダー** - 閾値後25回ごとにリマインド

## フック設定

**プラグインとしてインストール済みの場合**：設定は不要です。プラグインの `hooks/hooks.json` が既に `suggest-compact.js` を登録しています（フック ID `pre:edit-write:suggest-compact`、`standard` と `strict` フックプロファイルで有効）。下のブロックを `~/.claude/settings.json` にコピーしないでください — プラグインインストールでは `~/.claude/scripts/` は存在せず、プラグインフックを重複させると二重実行になります。

**手動インストール**（`./install.sh`）の場合、`~/.claude/settings.json` に追加：

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

環境変数：
- `COMPACT_THRESHOLD` - 最初の提案前のツール呼び出し（デフォルト：50）

## ベストプラクティス

1. **計画後にコンパクト** - 計画が確定したら、コンパクトして新しくスタート
2. **デバッグ後にコンパクト** - 続行前にエラー解決コンテキストをクリア
3. **実装中はコンパクトしない** - 関連する変更のためにコンテキストを保持
4. **提案を読む** - フックは*いつ*を教えてくれますが、*するかどうか*は自分で決める

## 関連

- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - トークン最適化セクション
- メモリ永続化フック - コンパクションを超えて存続する状態用
