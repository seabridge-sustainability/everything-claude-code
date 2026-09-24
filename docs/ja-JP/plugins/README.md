# プラグインとマーケットプレイス

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

プラグインは新しいツールと機能でClaude Codeを拡張します。このガイドではインストールのみをカバーしています - いつ、なぜ使用するかについては[完全な記事](https://x.com/affaanmustafa/status/2012378465664745795)を参照してください。

---

## マーケットプレイス

マーケットプレイスはインストール可能なプラグインのリポジトリです。

### マーケットプレイスの追加

```bash
# 公式 Anthropic マーケットプレイスを追加
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official

# コミュニティマーケットプレイスを追加
# mgrep plugin by @mixedbread-ai
claud plugin marketplace add https://github.com/mixedbread-ai/mgrep
```

### 推奨マーケットプレイス

| マーケットプレイス | ソース |
|-------------|--------|
| claude-plugins-official | `anthropics/claude-plugins-official` |
| claude-code-plugins | `anthropics/claude-code` |
| Mixedbread-Grep | `mixedbread-ai/mgrep` |

---

## プラグインのインストール

```bash
# プラグインブラウザを開く
/plugins

# または直接インストール
claude plugin install typescript-lsp@claude-plugins-official
```

### 推奨プラグイン

**開発:**
- `typescript-lsp` - TypeScript インテリジェンス
- `pyright-lsp` - Python 型チェック
- `hookify` - 会話形式でフックを作成
- `code-simplifier` - コードのリファクタリング

**コード品質:**
- `code-review` - コードレビュー
- `pr-review-toolkit` - PR自動化
- `security-guidance` - セキュリティチェック

**検索:**
- `mgrep` - 拡張検索（ripgrepより優れています）
- `context7` - ライブドキュメント検索

**ワークフロー:**
- `commit-commands` - Gitワークフロー
- `frontend-patterns` - UIパターン
- `feature-dev` - 機能開発

---

## クイックセットアップ

```bash
# マーケットプレイスを追加
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official
# mgrep plugin by @mixedbread-ai
claud plugin marketplace add https://github.com/mixedbread-ai/mgrep

# /pluginsを開き、必要なものをインストール
```

---

## プラグインファイルの場所

```
~/.claude/plugins/
|-- cache/                    # ダウンロードされたプラグイン
|-- installed_plugins.json    # インストール済みリスト
|-- known_marketplaces.json   # 追加されたマーケットプレイス
|-- marketplaces/             # マーケットプレイスデータ
```
