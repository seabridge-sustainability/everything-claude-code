# Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡

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


Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡PR Ã¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å’Ã¤Â»Â£Ã§Â ÂÃ¥Ë†â€ Ã¦Å¾Â
Ã©â€¡ÂÃ§â€šÂ¹Ã¯Â¼Å¡Ã¨Â´Â¨Ã©â€¡ÂÃ£â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬ÂÃ¥ÂÂ¯Ã§Â»Â´Ã¦Å Â¤Ã¦â‚¬Â§

## Ã¨Â¡Å’Ã¤Â¸ÂºÃ¥â€¡â€ Ã¥Ë†â„¢

* Ã¨Â¯â€žÃ¨Â®ÂºÃ¥â€°ÂÃ¤Â»â€Ã§Â»â€ Ã©Ëœâ€¦Ã¨Â¯Â»
* Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¥Â¯Â¹Ã©â€”Â®Ã©Â¢ËœÃ¦Å½â€™Ã¥ÂºÂÃ¯Â¼Ë†Ã¥â€¦Â³Ã©â€Â® > Ã©Â«Ëœ > Ã¤Â¸Â­ > Ã¤Â½Å½Ã¯Â¼â€°
* Ã¥Â»ÂºÃ¨Â®Â®Ã¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¤Â»â€¦Ã¤Â»â€¦Ã¦ËœÂ¯Ã¦Å’â€¡Ã¥â€¡ÂºÃ©â€”Â®Ã©Â¢Ëœ
* Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¼ÂÃ¦Â´Å¾

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢

* \[ ] Ã©â‚¬Â»Ã¨Â¾â€˜Ã©â€â„¢Ã¨Â¯Â¯
* \[ ] Ã¨Â¾Â¹Ã§â€¢Å’Ã¦Æ’â€¦Ã¥â€ Âµ
* \[ ] Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
* \[ ] Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¯Â¼Ë†Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ¥Â¯â€ Ã©â€™Â¥Ã¯Â¼â€°
* \[ ] Ã¦â‚¬Â§Ã¨Æ’Â½
* \[ ] Ã¥ÂÂ¯Ã¨Â¯Â»Ã¦â‚¬Â§
* \[ ] Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¦Å’â€°Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Ë†â€ Ã§Â»â€žÃ¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¤Â¼ËœÃ¥â€¦Ë†
