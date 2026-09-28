# スキル

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
