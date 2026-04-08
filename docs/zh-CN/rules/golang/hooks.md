---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---

# Go Ã©â€™Â©Ã¥Â­Â

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã©â‚¬Å¡Ã¨Â¿â€¡ Go Ã§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/hooks.md](../common/hooks.md)Ã£â‚¬â€š

## PostToolUse Ã©â€™Â©Ã¥Â­Â

Ã¥Å“Â¨ `~/.claude/settings.json` Ã¤Â¸Â­Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼Å¡

* **gofmt/goimports**Ã¯Â¼Å¡Ã§Â¼â€“Ã¨Â¾â€˜Ã¥ÂÅ½Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“ `.go` Ã¦â€“â€¡Ã¤Â»Â¶
* **go vet**Ã¯Â¼Å¡Ã§Â¼â€“Ã¨Â¾â€˜ `.go` Ã¦â€“â€¡Ã¤Â»Â¶Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â
* **staticcheck**Ã¯Â¼Å¡Ã¥Â¯Â¹Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¥Å’â€¦Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€°Â©Ã¥Â±â€¢Ã©Ââ„¢Ã¦â‚¬ÂÃ¦Â£â‚¬Ã¦Å¸Â¥
