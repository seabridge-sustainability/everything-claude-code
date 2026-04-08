---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
---

# TypeScript/JavaScript Ã¦Âµâ€¹Ã¨Â¯â€¢

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ [common/testing.md](../common/testing.md) Ã¦â€°Â©Ã¥Â±â€¢Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  TypeScript/JavaScript Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## E2E Ã¦Âµâ€¹Ã¨Â¯â€¢

Ã¤Â½Â¿Ã§â€Â¨ **Playwright** Ã¤Â½Å“Ã¤Â¸ÂºÃ¥â€¦Â³Ã©â€Â®Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂµÂÃ§Â¨â€¹Ã§Å¡â€ž E2E Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¡â€ Ã¦Å¾Â¶Ã£â‚¬â€š

## Ã¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¦â€Â¯Ã¦Å’Â

* **e2e-runner** - Playwright E2E Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â¸â€œÃ¥Â®Â¶
