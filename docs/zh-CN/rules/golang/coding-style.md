---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---

# Go Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Å“Â¨ [common/coding-style.md](../common/coding-style.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¯Â¼Å’Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Go Ã¨Â¯Â­Ã¨Â¨â‚¬Ã§Å¡â€žÃ§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* **gofmt** Ã¥â€™Å’ **goimports** Ã¦ËœÂ¯Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â‚¬Â§Ã§Å¡â€ž Ã¢â‚¬â€Ã¢â‚¬â€ Ã¦â€”Â Ã©Å“â‚¬Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Â£Å½Ã¦Â Â¼Ã¨Â¾Â©Ã¨Â®Âº

## Ã¨Â®Â¾Ã¨Â®Â¡Ã¥Å½Å¸Ã¥Ë†â„¢

* Ã¦Å½Â¥Ã¥Ââ€”Ã¦Å½Â¥Ã¥ÂÂ£Ã¯Â¼Å’Ã¨Â¿â€Ã¥â€ºÅ¾Ã§Â»â€œÃ¦Å¾â€žÃ¤Â½â€œ
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å½Â¥Ã¥ÂÂ£Ã¥Â°ÂÃ¥Â·Â§Ã¯Â¼Ë†1-3 Ã¤Â¸ÂªÃ¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼â€°

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

Ã¥Â§â€¹Ã§Â»Ë†Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¥Å’â€¦Ã¨Â£â€¦Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡

```go
if err != nil {
    return fmt.Errorf("failed to create user: %w", err)
}
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`golang-patterns` Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Go Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã¥â€™Å’Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š
