# スキル

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

スキルは Claude Code が文脈に基づいて読み込む知識モジュールです。ワークフロー定義とドメイン知識を含みます。

## スキルカテゴリ

### 言語別パターン
- `python-patterns/` - Python 設計パターン
- `golang-patterns/` - Go 設計パターン
- `frontend-patterns/` - React/Next.js パターン
- `backend-patterns/` - API とデータベースパターン

### 言語別テスト
- `python-testing/` - Python テスト戦略
- `golang-testing/` - Go テスト戦略
- `cpp-testing/` - C++ テスト

### フレームワーク
- `django-patterns/` - Django ベストプラクティス
- `django-tdd/` - Django テスト駆動開発
- `django-security/` - Django セキュリティ
- `quarkus-patterns/` - Quarkus アーキテクチャ、Camel、CDI、Panache パターン
- `quarkus-security/` - Quarkus セキュリティ: JWT/OIDC、RBAC、バリデーション
- `quarkus-tdd/` - Quarkus テスト駆動開発
- `quarkus-verification/` - Quarkus 検証ループ
- `springboot-patterns/` - Spring Boot パターン
- `springboot-tdd/` - Spring Boot テスト
- `springboot-security/` - Spring Boot セキュリティ

### データベース
- `postgres-patterns/` - PostgreSQL パターン
- `jpa-patterns/` - JPA/Hibernate パターン

### セキュリティ
- `security-review/` - セキュリティチェックリスト
- `security-scan/` - セキュリティスキャン

### ワークフロー
- `tdd-workflow/` - テスト駆動開発ワークフロー
- `continuous-learning/` - 継続的学習

### ドメイン特定
- `eval-harness/` - 評価ハーネス
- `iterative-retrieval/` - 反復的検索

## スキル構造

各スキルは自分のディレクトリに SKILL.md ファイルを含みます：

```
skills/
├── python-patterns/
│   └── SKILL.md          # 実装パターン、例、ベストプラクティス
├── golang-testing/
│   └── SKILL.md
├── django-patterns/
│   └── SKILL.md
...
```

## スキルを使用します

Claude Code はコンテキストに基づいてスキルを自動的に読み込みます。例：

- Python ファイルを編集している場合 → `python-patterns` と `python-testing` が読み込まれる
- Django プロジェクトの場合 → `django-*` スキルが読み込まれる
- テスト駆動開発をしている場合 → `tdd-workflow` が読み込まれる

## スキルの作成

新しいスキルを作成するには：

1. `skills/your-skill-name/` ディレクトリを作成
2. `SKILL.md` ファイルを追加
3. テンプレート：

```markdown
---
name: your-skill-name
description: Brief description shown in skill list
---

# Your Skill Title

Brief overview.

## Core Concepts

Key patterns and guidelines.

## Code Examples

\`\`\`language
// Practical, tested examples
\`\`\`

## Best Practices

- Actionable guideline 1
- Actionable guideline 2

## When to Use

Describe scenarios where this skill applies.
```

---

**覚えておいてください**：スキルは参照資料です。実装ガイダンスを提供し、ベストプラクティスを示します。スキルとルールを一緒に使用して、高品質なコードを確認してください。
