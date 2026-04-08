---
description: "Ã¦â€°Â«Ã¦ÂÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¤Â»Â¥Ã¦ÂÂÃ¥Ââ€“Ã¨Â·Â¨Ã©Â¢â€ Ã¥Å¸Å¸Ã¥Å½Å¸Ã¥Ë†â„¢Ã¥Â¹Â¶Ã¥Â°â€ Ã¥â€¦Â¶Ã¦ÂÂÃ§â€šÂ¼Ã¤Â¸ÂºÃ¨Â§â€žÃ¥Ë†â„¢"
---

# /rules-distill Ã¢â‚¬â€ Ã¤Â»Å½Ã¦Å â‚¬Ã¨Æ’Â½Ã¤Â¸Â­Ã¦ÂÂÃ§â€šÂ¼Ã¥Å½Å¸Ã¥Ë†â„¢Ã¤Â¸ÂºÃ¨Â§â€žÃ¥Ë†â„¢

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦â€°Â«Ã¦ÂÂÃ¥Â·Â²Ã¥Â®â€°Ã¨Â£â€¦Ã§Å¡â€žÃ¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å’Ã¦ÂÂÃ¥Ââ€“Ã¨Â·Â¨Ã©Â¢â€ Ã¥Å¸Å¸Ã¥Å½Å¸Ã¥Ë†â„¢Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Â°â€ Ã¥â€¦Â¶Ã¦ÂÂÃ§â€šÂ¼Ã¤Â¸ÂºÃ¨Â§â€žÃ¥Ë†â„¢Ã£â‚¬â€š

## Ã¦ÂµÂÃ§Â¨â€¹

Ã©ÂÂµÃ¥Â¾Âª `rules-distill` Ã¦Å â‚¬Ã¨Æ’Â½Ã¤Â¸Â­Ã¥Â®Å¡Ã¤Â¹â€°Ã§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬â€š
