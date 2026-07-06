# Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡

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


Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡Ã¦Â´Â»Ã¨Â·Æ’Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¤Â¸Â­
Ã¥â€¦Â³Ã¦Â³Â¨Ã§â€šÂ¹Ã¯Â¼Å¡Ã¥Â®Å¾Ã§Å½Â°Ã£â‚¬ÂÃ§Â¼â€“Ã§Â ÂÃ£â‚¬ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ¥Å Å¸Ã¨Æ’Â½

## Ã¨Â¡Å’Ã¤Â¸ÂºÃ¥â€¡â€ Ã¥Ë†â„¢

* Ã¥â€¦Ë†Ã¥â€ â„¢Ã¤Â»Â£Ã§Â ÂÃ¯Â¼Å’Ã¥ÂÅ½Ã¥ÂÅ¡Ã¨Â§Â£Ã©â€¡Å 
* Ã¥â‚¬Â¾Ã¥Ââ€˜Ã¤ÂºÅ½Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ¨Â§Â£Ã¥â€ Â³Ã¦â€“Â¹Ã¦Â¡Ë†Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Å’Ã§Â¾Å½Ã§Å¡â€žÃ¨Â§Â£Ã¥â€ Â³Ã¦â€“Â¹Ã¦Â¡Ë†
* Ã¥ÂËœÃ¦â€ºÂ´Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦ÂÂÃ¤ÂºÂ¤Ã§Å¡â€žÃ¥Å½Å¸Ã¥Â­ÂÃ¦â‚¬Â§

## Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§

1. Ã¨Â®Â©Ã¥Â®Æ’Ã¥Â·Â¥Ã¤Â½Å“
2. Ã¨Â®Â©Ã¥Â®Æ’Ã¦Â­Â£Ã§Â¡Â®
3. Ã¨Â®Â©Ã¥Â®Æ’Ã¦â€¢Â´Ã¦Â´Â

## Ã¦Å½Â¨Ã¨ÂÂÃ¥Â·Â¥Ã¥â€¦Â·

* Ã¤Â½Â¿Ã§â€Â¨ EditÃ£â‚¬ÂWrite Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¥ÂËœÃ¦â€ºÂ´
* Ã¤Â½Â¿Ã§â€Â¨ Bash Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢/Ã¦Å¾â€žÃ¥Â»Âº
* Ã¤Â½Â¿Ã§â€Â¨ GrepÃ£â‚¬ÂGlob Ã¦Å¸Â¥Ã¦â€°Â¾Ã¤Â»Â£Ã§Â Â
