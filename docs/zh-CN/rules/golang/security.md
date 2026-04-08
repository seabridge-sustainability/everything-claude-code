---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---

# Go Ã¥Â®â€°Ã¥â€¦Â¨

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Å¸ÂºÃ¤ÂºÅ½ [common/security.md](../common/security.md) Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Go Ã§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ 

```go
apiKey := os.Getenv("OPENAI_API_KEY")
if apiKey == "" {
    log.Fatal("OPENAI_API_KEY not configured")
}
```

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ

* Ã¤Â½Â¿Ã§â€Â¨ **gosec** Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¥Ë†â€ Ã¦Å¾ÂÃ¯Â¼Å¡
  ```bash
  gosec ./...
  ```

## Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¤Â¸Å½Ã¨Â¶â€¦Ã¦â€”Â¶

Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ `context.Context` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¶â€¦Ã¦â€”Â¶Ã¦Å½Â§Ã¥Ë†Â¶Ã¯Â¼Å¡

```go
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
defer cancel()
```
