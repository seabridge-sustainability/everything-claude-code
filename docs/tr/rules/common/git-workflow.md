# Git İş Akışı

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

## Commit Mesaj Formatı
```
<type>: <description>

<optional body>
```

Types: feat, fix, refactor, docs, test, chore, perf, ci

Not: ECC tarafından yönetilen kurulumlar `~/.claude/settings.json` içinde `"includeCoAuthoredBy": false` ayarlar, bu nedenle commitler varsayılan olarak `Co-Authored-By` içermez. Claude atfını korumak için `"includeCoAuthoredBy": true` veya `attribution` ayarlayın; ECC açık bir tercihin üzerine asla yazmaz.

## Pull Request İş Akışı

PR oluştururken:
1. Tam commit geçmişini analiz et (sadece son commit değil)
2. Tüm değişiklikleri görmek için `git diff [base-branch]...HEAD` kullan
3. Kapsamlı PR özeti taslağı hazırla
4. TODO'ları içeren test planı ekle
5. Yeni branch ise `-u` flag'i ile push et

> Git işlemlerinden önce tam geliştirme süreci (planlama, TDD, kod incelemesi) için
> [development-workflow.md](./development-workflow.md) dosyasına bakın.
