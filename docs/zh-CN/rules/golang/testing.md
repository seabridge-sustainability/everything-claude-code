---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---

# Go Ã¦Âµâ€¹Ã¨Â¯â€¢

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/testing.md](../common/testing.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Go Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â¡â€ Ã¦Å¾Â¶

Ã¤Â½Â¿Ã§â€Â¨Ã¦Â â€¡Ã¥â€¡â€ Ã§Å¡â€ž `go test` Ã¥Â¹Â¶Ã©â€¡â€¡Ã§â€Â¨ **Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã£â‚¬â€š

## Ã§Â«Å¾Ã¦â‚¬ÂÃ¦Â£â‚¬Ã¦Âµâ€¹

Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ `-race` Ã¦Â â€¡Ã¥Â¿â€”Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å¡

```bash
go test -race ./...
```

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

```bash
go test -cover ./...
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`golang-testing` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¨Â¯Â¦Ã§Â»â€ Ã§Å¡â€ž Go Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€™Å’Ã¨Â¾â€¦Ã¥Å Â©Ã¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬â€š
