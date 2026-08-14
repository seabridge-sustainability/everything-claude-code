# スキル

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
