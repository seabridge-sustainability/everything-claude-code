# Ã¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã¦Å’â€°Ã©Å“â‚¬Ã¥Â¯Â¹Ã¦â€“â€¡Ã¤Â»Â¶Ã¦Ë†â€“Ã©Â¡Â¹Ã§â€ºÂ®Ã¨Å’Æ’Ã¥â€ºÂ´Ã¨Â¿ÂÃ¨Â¡Å’ ECC Ã¨Â´Â¨Ã©â€¡ÂÃ§Â®Â¡Ã©Ââ€œÃ£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/quality-gate [path|.] [--fix] [--strict]`

* Ã©Â»ËœÃ¨Â®Â¤Ã§â€ºÂ®Ã¦Â â€¡Ã¯Â¼Å¡Ã¥Â½â€œÃ¥â€°ÂÃ§â€ºÂ®Ã¥Â½â€¢ (`.`)
* `--fix`Ã¯Â¼Å¡Ã¥Å“Â¨Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®Ã§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¥â€¦ÂÃ¨Â®Â¸Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“/Ã¤Â¿Â®Ã¥Â¤Â
* `--strict`Ã¯Â¼Å¡Ã¥Å“Â¨Ã¦â€Â¯Ã¦Å’ÂÃ§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¨Â­Â¦Ã¥â€˜Å Ã¥ÂÂ³Ã¥Â¤Â±Ã¨Â´Â¥

## Ã§Â®Â¡Ã©Ââ€œ

1. Ã¦Â£â‚¬Ã¦Âµâ€¹Ã§â€ºÂ®Ã¦Â â€¡Ã§Å¡â€žÃ¨Â¯Â­Ã¨Â¨â‚¬/Ã¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬â€š
2. Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€š
3. Ã¥Å“Â¨Ã¥ÂÂ¯Ã§â€Â¨Ã¦â€”Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥/Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€š
4. Ã§â€Å¸Ã¦Ë†ÂÃ§Â®â‚¬Ã¦Â´ÂÃ§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ¥Ë†â€”Ã¨Â¡Â¨Ã£â‚¬â€š

## Ã¥Â¤â€¡Ã¦Â³Â¨

Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã©â€¢Å“Ã¥Æ’ÂÃ¤Âºâ€ Ã©â€™Â©Ã¥Â­ÂÃ¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼Å’Ã¤Â½â€ Ã§â€Â±Ã¦â€œÂÃ¤Â½Å“Ã¥â€˜ËœÃ¨Â°Æ’Ã§â€Â¨Ã£â‚¬â€š

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `[path|.]` Ã¥ÂÂ¯Ã©â‚¬â€°Ã§Å¡â€žÃ§â€ºÂ®Ã¦Â â€¡Ã¨Â·Â¯Ã¥Â¾â€ž
* `--fix` Ã¥ÂÂ¯Ã©â‚¬â€°
* `--strict` Ã¥ÂÂ¯Ã©â‚¬â€°
