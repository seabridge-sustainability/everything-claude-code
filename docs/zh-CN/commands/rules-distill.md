---
description: "Ã¦â€°Â«Ã¦ÂÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¤Â»Â¥Ã¦ÂÂÃ¥Ââ€“Ã¨Â·Â¨Ã©Â¢â€ Ã¥Å¸Å¸Ã¥Å½Å¸Ã¥Ë†â„¢Ã¥Â¹Â¶Ã¥Â°â€ Ã¥â€¦Â¶Ã¦ÂÂÃ§â€šÂ¼Ã¤Â¸ÂºÃ¨Â§â€žÃ¥Ë†â„¢"
---

# /rules-distill Ã¢â‚¬â€ Ã¤Â»Å½Ã¦Å â‚¬Ã¨Æ’Â½Ã¤Â¸Â­Ã¦ÂÂÃ§â€šÂ¼Ã¥Å½Å¸Ã¥Ë†â„¢Ã¤Â¸ÂºÃ¨Â§â€žÃ¥Ë†â„¢

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


Ã¦â€°Â«Ã¦ÂÂÃ¥Â·Â²Ã¥Â®â€°Ã¨Â£â€¦Ã§Å¡â€žÃ¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å’Ã¦ÂÂÃ¥Ââ€“Ã¨Â·Â¨Ã©Â¢â€ Ã¥Å¸Å¸Ã¥Å½Å¸Ã¥Ë†â„¢Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Â°â€ Ã¥â€¦Â¶Ã¦ÂÂÃ§â€šÂ¼Ã¤Â¸ÂºÃ¨Â§â€žÃ¥Ë†â„¢Ã£â‚¬â€š

## Ã¦ÂµÂÃ§Â¨â€¹

Ã©ÂÂµÃ¥Â¾Âª `rules-distill` Ã¦Å â‚¬Ã¨Æ’Â½Ã¤Â¸Â­Ã¥Â®Å¡Ã¤Â¹â€°Ã§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã£â‚¬â€š
