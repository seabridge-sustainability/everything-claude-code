---
name: continuous-learning-v2
description: フックを介してセッションを観察し、信頼度スコアリング付きのアトミックなインスティンクトを作成し、スキル/コマンド/エージェントに進化させるインスティンクトベースの学習システム。
version: 2.0.0
---

# Continuous Learning v2 - インスティンクトベースアーキテクチャ

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Claude Codeセッションを信頼度スコアリング付きの小さな学習済み行動である「インスティンクト」を通じて再利用可能な知識に変える高度な学習システム。

## v2の新機能

| 機能 | v1 | v2 |
|---------|----|----|
| 観察 | Stopフック（セッション終了） | PreToolUse/PostToolUse（100%信頼性） |
| 分析 | メインコンテキスト | バックグラウンドエージェント（Haiku） |
| 粒度 | 完全なスキル | アトミック「インスティンクト」 |
| 信頼度 | なし | 0.3-0.9重み付け |
| 進化 | 直接スキルへ | インスティンクト → クラスター → スキル/コマンド/エージェント |
| 共有 | なし | インスティンクトのエクスポート/インポート |

## インスティンクトモデル

インスティンクトは小さな学習済み行動です：

```yaml
---
id: prefer-functional-style
trigger: "when writing new functions"
confidence: 0.7
domain: "code-style"
source: "session-observation"
---

# 関数型スタイルを優先

## Action
適切な場合はクラスよりも関数型パターンを使用します。

## Evidence
- 関数型パターンの優先が5回観察されました
- ユーザーが2025-01-15にクラスベースのアプローチを関数型に修正しました
```

**プロパティ：**
- **アトミック** — 1つのトリガー、1つのアクション
- **信頼度重み付け** — 0.3 = 暫定的、0.9 = ほぼ確実
- **ドメインタグ付き** — code-style、testing、git、debugging、workflowなど
- **証拠に基づく** — それを作成した観察を追跡

## 仕組み

```
セッションアクティビティ
      │
      │ フックがプロンプト + ツール使用をキャプチャ（100%信頼性）
      ▼
┌─────────────────────────────────────────┐
│         observations.jsonl              │
│   （プロンプト、ツール呼び出し、結果）       │
└─────────────────────────────────────────┘
      │
      │ Observerエージェントが読み取り（バックグラウンド、Haiku）
      ▼
┌─────────────────────────────────────────┐
│          パターン検出                    │
│   • ユーザー修正 → インスティンクト      │
│   • エラー解決 → インスティンクト        │
│   • 繰り返しワークフロー → インスティンクト │
└─────────────────────────────────────────┘
      │
      │ 作成/更新
      ▼
┌─────────────────────────────────────────┐
│         instincts/personal/             │
│   • prefer-functional.md (0.7)          │
│   • always-test-first.md (0.9)          │
│   • use-zod-validation.md (0.6)         │
└─────────────────────────────────────────┘
      │
      │ /evolveクラスター
      ▼
┌─────────────────────────────────────────┐
│              evolved/                   │
│   • commands/new-feature.md             │
│   • skills/testing-workflow.md          │
│   • agents/refactor-specialist.md       │
└─────────────────────────────────────────┘
```

## クイックスタート

### 1. 観察フックを有効化

`~/.claude/settings.json`に追加します。

**プラグインとしてインストールした場合**（推奨）：

```json
プラグインの `hooks/hooks.json` が Claude Code v2.1+ で自動読み込みされるため、`~/.claude/settings.json` に追加の hook 設定は不要です。`observe.sh` はそこで既に登録されています。

以前に `observe.sh` を `~/.claude/settings.json` にコピーした場合は、重複した `PreToolUse` / `PostToolUse` ブロックを削除してください。重複登録は二重実行と `${CLAUDE_PLUGIN_ROOT}` 解決エラーを引き起こします。この変数はプラグイン管理の `hooks/hooks.json` でのみ展開されます。

**`~/.claude/skills`に手動でインストールした場合**：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }],
    "PostToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning-v2/hooks/observe.sh"
      }]
    }]
  }
}
```

### 2. ディレクトリ構造を初期化

Python CLIが自動的に作成しますが、手動で作成することもできます：

```bash
mkdir -p ~/.claude/homunculus/{instincts/{personal,inherited},evolved/{agents,skills,commands}}
touch ~/.claude/homunculus/observations.jsonl
```

### 3. インスティンクトコマンドを使用

```bash
/instinct-status     # 信頼度スコア付きの学習済みインスティンクトを表示
/evolve              # 関連するインスティンクトをスキル/コマンドにクラスター化
/instinct-export     # 共有のためにインスティンクトをエクスポート
/instinct-import     # 他の人からインスティンクトをインポート
```

## コマンド

| コマンド | 説明 |
|---------|-------------|
| `/instinct-status` | すべての学習済みインスティンクトを信頼度と共に表示 |
| `/evolve` | 関連するインスティンクトをスキル/コマンドにクラスター化 |
| `/instinct-export` | 共有のためにインスティンクトをエクスポート |
| `/instinct-import <file>` | 他の人からインスティンクトをインポート |

## 設定

`config.json`を編集：

```json
{
  "version": "2.0",
  "observation": {
    "enabled": true,
    "store_path": "~/.claude/homunculus/observations.jsonl",
    "max_file_size_mb": 10,
    "archive_after_days": 7
  },
  "instincts": {
    "personal_path": "~/.claude/homunculus/instincts/personal/",
    "inherited_path": "~/.claude/homunculus/instincts/inherited/",
    "min_confidence": 0.3,
    "auto_approve_threshold": 0.7,
    "confidence_decay_rate": 0.05
  },
  "observer": {
    "enabled": true,
    "model": "haiku",
    "run_interval_minutes": 5,
    "patterns_to_detect": [
      "user_corrections",
      "error_resolutions",
      "repeated_workflows",
      "tool_preferences"
    ]
  },
  "evolution": {
    "cluster_threshold": 3,
    "evolved_path": "~/.claude/homunculus/evolved/"
  }
}
```

## ファイル構造

```
~/.claude/homunculus/
├── identity.json           # プロフィール、技術レベル
├── observations.jsonl      # 現在のセッション観察
├── observations.archive/   # 処理済み観察
├── instincts/
│   ├── personal/           # 自動学習されたインスティンクト
│   └── inherited/          # 他の人からインポート
└── evolved/
    ├── agents/             # 生成された専門エージェント
    ├── skills/             # 生成されたスキル
    └── commands/           # 生成されたコマンド
```

## Skill Creatorとの統合

[Skill Creator GitHub App](https://skill-creator.app)を使用すると、**両方**が生成されます：
- 従来のSKILL.mdファイル（後方互換性のため）
- インスティンクトコレクション（v2学習システム用）

リポジトリ分析からのインスティンクトには`source: "repo-analysis"`があり、ソースリポジトリURLが含まれます。

## 信頼度スコアリング

信頼度は時間とともに進化します：

| スコア | 意味 | 動作 |
|-------|---------|----------|
| 0.3 | 暫定的 | 提案されるが強制されない |
| 0.5 | 中程度 | 関連する場合に適用 |
| 0.7 | 強い | 適用が自動承認される |
| 0.9 | ほぼ確実 | コア動作 |

**信頼度が上がる**場合：
- パターンが繰り返し観察される
- ユーザーが提案された動作を修正しない
- 他のソースからの類似インスティンクトが一致する

**信頼度が下がる**場合：
- ユーザーが明示的に動作を修正する
- パターンが長期間観察されない
- 矛盾する証拠が現れる

## 観察にスキルではなくフックを使用する理由は？

> 「v1はスキルに依存して観察していました。スキルは確率的で、Claudeの判断に基づいて約50-80%の確率で発火します。」

フックは**100%の確率で**決定論的に発火します。これは次のことを意味します：
- すべてのツール呼び出しが観察される
- パターンが見逃されない
- 学習が包括的

## 後方互換性

v2はv1と完全に互換性があります：
- 既存の`~/.claude/skills/learned/`スキルは引き続き機能
- Stopフックは引き続き実行される（ただしv2にもフィードされる）
- 段階的な移行パス：両方を並行して実行

## プライバシー

- 観察はマシン上で**ローカル**に保持されます
- **インスティンクト**（パターン）のみをエクスポート可能
- 実際のコードや会話内容は共有されません
- エクスポートする内容を制御できます

## 関連

- [Skill Creator](https://skill-creator.app) - リポジトリ履歴からインスティンクトを生成
- Homunculus - v2アーキテクチャのインスピレーション（アトミック観察、信頼度スコアリング、インスティンクト進化パイプライン）
- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - 継続的学習セクション

---

*インスティンクトベースの学習：一度に1つの観察で、Claudeにあなたのパターンを教える。*
