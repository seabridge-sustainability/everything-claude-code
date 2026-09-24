---
name: verification-loop
description: A comprehensive verification system for Claude Code sessions.
metadata:
  origin: ECC
---

# 検証ループスキル

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

Claude Codeセッション向けの包括的な検証システム。

## 使用タイミング

このスキルを呼び出す:
- 機能または重要なコード変更を完了した後
- PRを作成する前
- 品質ゲートが通過することを確認したい場合
- リファクタリング後

## 検証フェーズ

### フェーズ1: ビルド検証
```bash
# プロジェクトがビルドできるか確認
npm run build 2>&1 | tail -20
# または
pnpm build 2>&1 | tail -20
```

ビルドが失敗した場合、停止して続行前に修正。

### フェーズ2: 型チェック
```bash
# TypeScriptプロジェクト
npx tsc --noEmit 2>&1 | head -30

# Pythonプロジェクト
pyright . 2>&1 | head -30
```

すべての型エラーを報告。続行前に重要なものを修正。

### フェーズ3: Lintチェック
```bash
# JavaScript/TypeScript
npm run lint 2>&1 | head -30

# Python
ruff check . 2>&1 | head -30
```

### フェーズ4: テストスイート
```bash
# カバレッジ付きでテストを実行
npm run test -- --coverage 2>&1 | tail -50

# カバレッジ閾値を確認
# 目標: 最低80%
```

報告:
- 合計テスト数: X
- 成功: X
- 失敗: X
- カバレッジ: X%

### フェーズ5: セキュリティスキャン
```bash
# シークレットを確認
grep -rn "sk-" --include="*.ts" --include="*.js" . 2>/dev/null | head -10
grep -rn "api_key" --include="*.ts" --include="*.js" . 2>/dev/null | head -10

# console.logを確認
grep -rn "console.log" --include="*.ts" --include="*.tsx" src/ 2>/dev/null | head -10
```

### フェーズ6: 差分レビュー
```bash
# 変更内容を表示
git diff --stat
git diff HEAD~1 --name-only
```

各変更ファイルをレビュー:
- 意図しない変更
- 不足しているエラー処理
- 潜在的なエッジケース

## 出力フォーマット

すべてのフェーズを実行後、検証レポートを作成:

```
検証レポート
==================

ビルド:     [成功/失敗]
型:         [成功/失敗] (Xエラー)
Lint:       [成功/失敗] (X警告)
テスト:     [成功/失敗] (X/Y成功、Z%カバレッジ)
セキュリティ: [成功/失敗] (X問題)
差分:       [Xファイル変更]

総合:       PRの準備[完了/未完了]

修正すべき問題:
1. ...
2. ...
```

## 継続モード

長いセッションの場合、15分ごとまたは主要な変更後に検証を実行:

```markdown
メンタルチェックポイントを設定:
- 各関数を完了した後
- コンポーネントを完了した後
- 次のタスクに移る前

実行: /verify
```

## フックとの統合

このスキルはPostToolUseフックを補完しますが、より深い検証を提供します。
フックは問題を即座に捕捉; このスキルは包括的なレビューを提供。
