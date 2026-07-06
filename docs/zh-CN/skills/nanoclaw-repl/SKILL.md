---
name: nanoclaw-repl
description: Ã¦â€œÂÃ¤Â½Å“Ã¥Â¹Â¶Ã¦â€°Â©Ã¥Â±â€¢NanoClaw v2Ã¯Â¼Å’Ã¨Â¿â„¢Ã¦ËœÂ¯ECCÃ¥Å¸ÂºÃ¤ÂºÅ½claude -pÃ¦Å¾â€žÃ¥Â»ÂºÃ§Å¡â€žÃ©â€ºÂ¶Ã¤Â¾ÂÃ¨Âµâ€“Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦â€žÅ¸Ã§Å¸Â¥REPLÃ£â‚¬â€š
origin: ECC
---

# NanoClaw REPL

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


Ã¥Å“Â¨Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Ë†â€“Ã¦â€°Â©Ã¥Â±â€¢ `scripts/claw.js` Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬â€š

## Ã¨Æ’Â½Ã¥Å â€º

* Ã¦Å’ÂÃ¤Â¹â€¦Ã§Å¡â€žÃ£â‚¬ÂÃ¥Å¸ÂºÃ¤ÂºÅ½ Markdown Ã§Å¡â€žÃ¤Â¼Å¡Ã¨Â¯Â
* Ã¤Â½Â¿Ã§â€Â¨ `/model` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Ë†â€¡Ã¦ÂÂ¢
* Ã¤Â½Â¿Ã§â€Â¨ `/load` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å Â¨Ã¦â‚¬ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¥Å Â Ã¨Â½Â½
* Ã¤Â½Â¿Ã§â€Â¨ `/branch` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥Ë†â€ Ã¦â€Â¯
* Ã¤Â½Â¿Ã§â€Â¨ `/search` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â·Â¨Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦ÂÅ“Ã§Â´Â¢
* Ã¤Â½Â¿Ã§â€Â¨ `/compact` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å½â€ Ã¥ÂÂ²Ã¥Å½â€¹Ã§Â¼Â©
* Ã¤Â½Â¿Ã§â€Â¨ `/export` Ã¥Â¯Â¼Ã¥â€¡ÂºÃ¤Â¸Âº md/json/txt Ã¦Â Â¼Ã¥Â¼Â
* Ã¤Â½Â¿Ã§â€Â¨ `/metrics` Ã¦Å¸Â¥Ã§Å“â€¹Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦Å’â€¡Ã¦Â â€¡

## Ã¦â€œÂÃ¤Â½Å“Ã¦Å’â€¡Ã¥Ââ€”

1. Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â¼Å¡Ã¨Â¯ÂÃ¨ÂÅ¡Ã§â€žÂ¦Ã¤ÂºÅ½Ã¤Â»Â»Ã¥Å Â¡Ã£â‚¬â€š
2. Ã¥Å“Â¨Ã¨Â¿â€ºÃ¨Â¡Å’Ã©Â«ËœÃ©Â£Å½Ã©â„¢Â©Ã¦â€ºÂ´Ã¦â€Â¹Ã¥â€°ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Ë†â€ Ã¦â€Â¯Ã£â‚¬â€š
3. Ã¥Å“Â¨Ã¥Â®Å’Ã¦Ë†ÂÃ¤Â¸Â»Ã¨Â¦ÂÃ©â€¡Å’Ã§Â¨â€¹Ã§Â¢â€˜Ã¥ÂÅ½Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å½â€¹Ã§Â¼Â©Ã£â‚¬â€š
4. Ã¥Å“Â¨Ã¥Ë†â€ Ã¤ÂºÂ«Ã¦Ë†â€“Ã¥Â­ËœÃ¦Â¡Â£Ã¥â€°ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¯Â¼Ã¥â€¡ÂºÃ£â‚¬â€š

## Ã¦â€°Â©Ã¥Â±â€¢Ã¨Â§â€žÃ¥Ë†â„¢

* Ã¤Â¿ÂÃ¦Å’ÂÃ©â€ºÂ¶Ã¥Â¤â€“Ã©Æ’Â¨Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¤Â¾ÂÃ¨Âµâ€“
* Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â»Â¥ Markdown Ã¤Â½Å“Ã¤Â¸ÂºÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ§Å¡â€žÃ¥â€¦Â¼Ã¥Â®Â¹Ã¦â‚¬Â§
* Ã¤Â¿ÂÃ¦Å’ÂÃ¥â€˜Â½Ã¤Â»Â¤Ã¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã§Å¡â€žÃ§Â¡Â®Ã¥Â®Å¡Ã¦â‚¬Â§Ã¥â€™Å’Ã¦Å“Â¬Ã¥Å“Â°Ã¦â‚¬Â§
