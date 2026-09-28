---
name: continuous-learning
description: Claude Codeセッションから再利用可能なパターンを自動的に抽出し、将来の使用のために学習済みスキルとして保存します。
---

# 継続学習スキル

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Claude Codeセッションを終了時に自動的に評価し、学習済みスキルとして保存できる再利用可能なパターンを抽出します。

## 動作原理

このスキルは各セッション終了時に**Stopフック**として実行されます:

1. **セッション評価**: セッションに十分なメッセージがあるか確認(デフォルト: 10以上)
2. **パターン検出**: セッションから抽出可能なパターンを識別
3. **スキル抽出**: 有用なパターンを`~/.claude/skills/learned/`に保存

## 設定

`config.json`を編集してカスタマイズ:

```json
{
  "min_session_length": 10,
  "extraction_threshold": "medium",
  "auto_approve": false,
  "learned_skills_path": "~/.claude/skills/learned/",
  "patterns_to_detect": [
    "error_resolution",
    "user_corrections",
    "workarounds",
    "debugging_techniques",
    "project_specific"
  ],
  "ignore_patterns": [
    "simple_typos",
    "one_time_fixes",
    "external_api_issues"
  ]
}
```

## パターンの種類

| パターン | 説明 |
|---------|-------------|
| `error_resolution` | 特定のエラーの解決方法 |
| `user_corrections` | ユーザー修正からのパターン |
| `workarounds` | フレームワーク/ライブラリの癖への解決策 |
| `debugging_techniques` | 効果的なデバッグアプローチ |
| `project_specific` | プロジェクト固有の規約 |

## フック設定

`~/.claude/settings.json`に追加:

```json
{
  "hooks": {
    "Stop": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning/evaluate-session.sh"
      }]
    }]
  }
}
```

## Stopフックを使用する理由

- **軽量**: セッション終了時に1回だけ実行
- **ノンブロッキング**: すべてのメッセージにレイテンシを追加しない
- **完全なコンテキスト**: セッション全体のトランスクリプトにアクセス可能

## 関連項目

- [The Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - 継続学習に関するセクション
- `/learn`コマンド - セッション中の手動パターン抽出

---

## 比較ノート (調査: 2025年1月)

### vs Homunculus

Homunculus v2はより洗練されたアプローチを採用:

| 機能 | このアプローチ | Homunculus v2 |
|---------|--------------|---------------|
| 観察 | Stopフック(セッション終了時) | PreToolUse/PostToolUseフック(100%信頼性) |
| 分析 | メインコンテキスト | バックグラウンドエージェント(Haiku) |
| 粒度 | 完全なスキル | 原子的な「本能」 |
| 信頼度 | なし | 0.3-0.9の重み付け |
| 進化 | 直接スキルへ | 本能 → クラスタ → スキル/コマンド/エージェント |
| 共有 | なし | 本能のエクスポート/インポート |

**homunculusからの重要な洞察:**
> "v1はスキルに観察を依存していました。スキルは確率的で、発火率は約50-80%です。v2は観察にフック(100%信頼性)を使用し、学習された振る舞いの原子単位として本能を使用します。"

### v2の潜在的な改善

1. **本能ベースの学習** - 信頼度スコアリングを持つ、より小さく原子的な振る舞い
2. **バックグラウンド観察者** - 並行して分析するHaikuエージェント
3. **信頼度の減衰** - 矛盾した場合に本能の信頼度が低下
4. **ドメインタグ付け** - コードスタイル、テスト、git、デバッグなど
5. **進化パス** - 関連する本能をスキル/コマンドにクラスタ化

詳細: `docs/continuous-learning-v2-spec.md`を参照。
