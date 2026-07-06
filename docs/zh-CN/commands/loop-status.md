# Ã¥Â¾ÂªÃ§Å½Â¯Ã§Å Â¶Ã¦â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤

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


Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â´Â»Ã¥Å Â¨Ã¥Â¾ÂªÃ§Å½Â¯Ã§Å Â¶Ã¦â‚¬ÂÃ£â‚¬ÂÃ¨Â¿â€ºÃ¥ÂºÂ¦Ã¥â€™Å’Ã¦â€¢â€¦Ã©Å¡Å“Ã¤Â¿Â¡Ã¥ÂÂ·Ã£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/loop-status [--watch]`

## Ã¦Å Â¥Ã¥â€˜Å Ã¥â€ â€¦Ã¥Â®Â¹

* Ã¦Â´Â»Ã¥Å Â¨Ã¥Â¾ÂªÃ§Å½Â¯Ã¦Â¨Â¡Ã¥Â¼Â
* Ã¥Â½â€œÃ¥â€°ÂÃ©ËœÂ¶Ã¦Â®ÂµÃ¥â€™Å’Ã¦Å“â‚¬Ã¥ÂÅ½Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Ë†ÂÃ¥Å Å¸Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã§â€šÂ¹
* Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“â€°Ã¯Â¼â€°
* Ã©Â¢â€žÃ¨Â®Â¡Ã§Å¡â€žÃ¦â€”Â¶Ã©â€”Â´/Ã¦Ë†ÂÃ¦Å“Â¬Ã¥ÂÂÃ¥Â·Â®
* Ã¥Â»ÂºÃ¨Â®Â®Ã§Å¡â€žÃ¥Â¹Â²Ã©Â¢â€žÃ¦Å½ÂªÃ¦â€“Â½Ã¯Â¼Ë†Ã§Â»Â§Ã§Â»Â­/Ã¦Å¡â€šÃ¥ÂÅ“/Ã¥ÂÅ“Ã¦Â­Â¢Ã¯Â¼â€°

## Ã§â€ºâ€˜Ã¨Â§â€ Ã¦Â¨Â¡Ã¥Â¼Â

Ã¥Â½â€œ `--watch` Ã¥Â­ËœÃ¥Å“Â¨Ã¦â€”Â¶Ã¯Â¼Å’Ã¥Â®Å¡Ã¦Å“Å¸Ã¥Ë†Â·Ã¦â€“Â°Ã§Å Â¶Ã¦â‚¬ÂÃ¥Â¹Â¶Ã¦ËœÂ¾Ã§Â¤ÂºÃ§Å Â¶Ã¦â‚¬ÂÃ¥ÂËœÃ¥Å’â€“Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `--watch` Ã¥ÂÂ¯Ã©â‚¬â€°
