# Git Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Commit Mesaj FormatÃ„Â±
```
<type>: <description>

<optional body>
```

Types: feat, fix, refactor, docs, test, chore, perf, ci

Not: Attribution ~/.claude/settings.json aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla global olarak devre dÃ„Â±Ã…Å¸Ã„Â± bÃ„Â±rakÃ„Â±ldÃ„Â±.

## Pull Request Ã„Â°Ã…Å¸ AkÃ„Â±Ã…Å¸Ã„Â±

PR oluÃ…Å¸tururken:
1. Tam commit geÃƒÂ§miÃ…Å¸ini analiz et (sadece son commit deÃ„Å¸il)
2. TÃƒÂ¼m deÃ„Å¸iÃ…Å¸iklikleri gÃƒÂ¶rmek iÃƒÂ§in `git diff [base-branch]...HEAD` kullan
3. KapsamlÃ„Â± PR ÃƒÂ¶zeti taslaÃ„Å¸Ã„Â± hazÃ„Â±rla
4. TODO'larÃ„Â± iÃƒÂ§eren test planÃ„Â± ekle
5. Yeni branch ise `-u` flag'i ile push et

> Git iÃ…Å¸lemlerinden ÃƒÂ¶nce tam geliÃ…Å¸tirme sÃƒÂ¼reci (planlama, TDD, kod incelemesi) iÃƒÂ§in
> [development-workflow.md](./development-workflow.md) dosyasÃ„Â±na bakÃ„Â±n.
