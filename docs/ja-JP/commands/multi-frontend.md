# Frontend - フロントエンド中心の開発

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

フロントエンド中心のワークフロー(調査 → アイデア創出 → 計画 → 実装 → 最適化 → レビュー)、Gemini主導。

> **前提条件:** このコマンドは外部の `ccg-workflow` ランタイムを必要とします。これはベースの ECC インストールには**含まれていません**。`npx ccg-workflow` を実行して初期化し、このコマンドが依存する `~/.claude/bin/codeagent-wrapper` と `~/.claude/.ccg/prompts/*` ロールファイルをプロビジョニングしてください。このランタイムがないと、このコマンドは正しく動作しません。

## 使用方法

```bash
/frontend <UIタスクの説明>
```

## コンテキスト

- フロントエンドタスク: $ARGUMENTS
- Gemini主導、Codexは補助的な参照用
- 適用範囲: コンポーネント設計、レスポンシブレイアウト、UIアニメーション、スタイル最適化

## 役割

あなたは**フロントエンドオーケストレーター**として、UI/UXタスクのためのマルチモデル連携を調整します(調査 → アイデア創出 → 計画 → 実装 → 最適化 → レビュー)。

**連携モデル**:
- **Gemini** – フロントエンドUI/UX(**フロントエンドの権威、信頼できる**)
- **Codex** – バックエンドの視点(**フロントエンドの意見は参考のみ**)
- **Claude(自身)** – オーケストレーション、計画、実装、配信

---

## マルチモデル呼び出し仕様

**呼び出し構文**:

```
# 新規セッション呼び出し
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend gemini --gemini-model gemini-3-pro-preview - \"$PWD\" <<'EOF'
ROLE_FILE: <ロールプロンプトパス>
<TASK>
Requirement: <強化された要件(または強化されていない場合は$ARGUMENTS)>
Context: <前のフェーズからのプロジェクトコンテキストと分析>
</TASK>
OUTPUT: 期待される出力形式
EOF",
  run_in_background: false,
  timeout: 3600000,
  description: "簡潔な説明"
})

# セッション再開呼び出し
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend gemini --gemini-model gemini-3-pro-preview resume <SESSION_ID> - \"$PWD\" <<'EOF'
ROLE_FILE: <ロールプロンプトパス>
<TASK>
Requirement: <強化された要件(または強化されていない場合は$ARGUMENTS)>
Context: <前のフェーズからのプロジェクトコンテキストと分析>
</TASK>
OUTPUT: 期待される出力形式
EOF",
  run_in_background: false,
  timeout: 3600000,
  description: "簡潔な説明"
})
```

**ロールプロンプト**:

| フェーズ | Gemini |
|-------|--------|
| 分析 | `~/.claude/.ccg/prompts/gemini/analyzer.md` |
| 計画 | `~/.claude/.ccg/prompts/gemini/architect.md` |
| レビュー | `~/.claude/.ccg/prompts/gemini/reviewer.md` |

**セッション再利用**: 各呼び出しは`SESSION_ID: xxx`を返します。後続のフェーズでは`resume xxx`を使用してください。フェーズ2で`GEMINI_SESSION`を保存し、フェーズ3と5で`resume`を使用します。

---

## コミュニケーションガイドライン

1. レスポンスの開始時にモードラベル`[Mode: X]`を付ける、初期は`[Mode: Research]`
2. 厳格な順序に従う: `Research → Ideation → Plan → Execute → Optimize → Review`
3. 必要に応じて`AskUserQuestion`ツールを使用してユーザーとやり取りする(例: 確認/選択/承認)

---

## コアワークフロー

### フェーズ 0: プロンプト強化(オプション)

`[Mode: Prepare]` - ace-tool MCPが利用可能な場合、`mcp__ace-tool__enhance_prompt`を呼び出し、**後続のGemini呼び出しのために元の$ARGUMENTSを強化結果で置き換える**。利用できない場合は`$ARGUMENTS`をそのまま使用。

### フェーズ 1: 調査

`[Mode: Research]` - 要件の理解とコンテキストの収集

1. **コード取得**(ace-tool MCPが利用可能な場合): `mcp__ace-tool__search_context`を呼び出して既存のコンポーネント、スタイル、デザインシステムを取得。利用できない場合は組み込みツールを使用: `Glob`でファイル検索、`Grep`でコンポーネント/スタイル検索、`Read`でコンテキスト収集、`Task`(Exploreエージェント)でより深い探索。
2. 要件の完全性スコア(0-10): >=7で継続、<7で停止して補足

### フェーズ 2: アイデア創出

`[Mode: Ideation]` - Gemini主導の分析

**Geminiを呼び出す必要があります**(上記の呼び出し仕様に従う):
- ROLE_FILE: `~/.claude/.ccg/prompts/gemini/analyzer.md`
- Requirement: 強化された要件(または強化されていない場合は$ARGUMENTS)
- Context: フェーズ1からのプロジェクトコンテキスト
- OUTPUT: UIの実現可能性分析、推奨ソリューション(少なくとも2つ)、UX評価

**SESSION_ID**(`GEMINI_SESSION`)を保存して後続のフェーズで再利用します。

ソリューション(少なくとも2つ)を出力し、ユーザーの選択を待ちます。

### フェーズ 3: 計画

`[Mode: Plan]` - Gemini主導の計画

**Geminiを呼び出す必要があります**(`resume <GEMINI_SESSION>`を使用してセッションを再利用):
- ROLE_FILE: `~/.claude/.ccg/prompts/gemini/architect.md`
- Requirement: ユーザーが選択したソリューション
- Context: フェーズ2からの分析結果
- OUTPUT: コンポーネント構造、UIフロー、スタイリングアプローチ

Claudeが計画を統合し、ユーザーの承認後に`.claude/plan/task-name.md`に保存します。

### フェーズ 4: 実装

`[Mode: Execute]` - コード開発

- 承認された計画に厳密に従う
- 既存プロジェクトのデザインシステムとコード標準に従う
- レスポンシブ性、アクセシビリティを保証

### フェーズ 5: 最適化

`[Mode: Optimize]` - Gemini主導のレビュー

**Geminiを呼び出す必要があります**(上記の呼び出し仕様に従う):
- ROLE_FILE: `~/.claude/.ccg/prompts/gemini/reviewer.md`
- Requirement: 以下のフロントエンドコード変更をレビュー
- Context: git diffまたはコード内容
- OUTPUT: アクセシビリティ、レスポンシブ性、パフォーマンス、デザインの一貫性の問題リスト

レビューフィードバックを統合し、ユーザー確認後に最適化を実行します。

### フェーズ 6: 品質レビュー

`[Mode: Review]` - 最終評価

- 計画に対する完成度をチェック
- レスポンシブ性とアクセシビリティを検証
- 問題と推奨事項を報告

---

## 重要なルール

1. **Geminiのフロントエンド意見は信頼できる**
2. **Codexのフロントエンド意見は参考のみ**
3. 外部モデルは**ファイルシステムへの書き込みアクセスがゼロ**
4. Claudeがすべてのコード書き込みとファイル操作を処理
