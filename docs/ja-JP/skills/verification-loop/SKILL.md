---
name: verification-loop
description: A comprehensive verification system for Claude Code sessions.
metadata:
  origin: ECC
---

# 検証ループスキル

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
