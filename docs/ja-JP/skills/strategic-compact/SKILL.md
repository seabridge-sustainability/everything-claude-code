---
name: strategic-compact
description: 任意の自動コンパクションではなく、タスクフェーズを通じてコンテキストを保持するための論理的な間隔での手動コンパクションを提案します。
---

# Strategic Compactスキル

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
