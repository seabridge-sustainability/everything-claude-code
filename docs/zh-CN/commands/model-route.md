# Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¨Â·Â¯Ã§â€Â±Ã¥â€˜Â½Ã¤Â»Â¤

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


Ã¦Â Â¹Ã¦ÂÂ®Ã¤Â»Â»Ã¥Å Â¡Ã¥Â¤ÂÃ¦Ââ€šÃ¥ÂºÂ¦Ã¥â€™Å’Ã©Â¢â€žÃ§Â®â€”Ã¦Å½Â¨Ã¨ÂÂÃ¦Å“â‚¬Ã¤Â½Â³Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Â±â€šÃ§ÂºÂ§Ã£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

`/model-route [task-description] [--budget low|med|high]`

## Ã¨Â·Â¯Ã§â€Â±Ã¥ÂÂ¯Ã¥Ââ€˜Ã¥Â¼ÂÃ¨Â§â€žÃ¥Ë†â„¢

* `haiku`: Ã§Â¡Â®Ã¥Â®Å¡Ã¦â‚¬Â§Ã£â‚¬ÂÃ¤Â½Å½Ã©Â£Å½Ã©â„¢Â©Ã§Å¡â€žÃ¦Å“ÂºÃ¦Â¢Â°Ã¦â‚¬Â§Ã¥ÂËœÃ¦â€ºÂ´
* `sonnet`: Ã¥Â®Å¾Ã§Å½Â°Ã¥â€™Å’Ã©â€¡ÂÃ¦Å¾â€žÃ§Å¡â€žÃ©Â»ËœÃ¨Â®Â¤Ã©â‚¬â€°Ã¦â€¹Â©
* `opus`: Ã¦Å¾Â¶Ã¦Å¾â€žÃ¨Â®Â¾Ã¨Â®Â¡Ã£â‚¬ÂÃ¦Â·Â±Ã¥ÂºÂ¦Ã¨Â¯â€žÃ¥Â®Â¡Ã£â‚¬ÂÃ¦Â¨Â¡Ã§Â³Å Ã©Å“â‚¬Ã¦Â±â€š

## Ã¥Â¿â€¦Ã©Å“â‚¬Ã¨Â¾â€œÃ¥â€¡Âº

* Ã¦Å½Â¨Ã¨ÂÂÃ§Å¡â€žÃ¦Â¨Â¡Ã¥Å¾â€¹
* Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦
* Ã¨Â¯Â¥Ã¦Â¨Â¡Ã¥Å¾â€¹Ã©â‚¬â€šÃ¥ÂË†Ã§Å¡â€žÃ¥Å½Å¸Ã¥â€ºÂ 
* Ã¥Â¦â€šÃ¦Å¾Å“Ã©Â¦â€“Ã¦Â¬Â¡Ã¥Â°ÂÃ¨Â¯â€¢Ã¥Â¤Â±Ã¨Â´Â¥Ã¯Â¼Å’Ã¥Â¤â€¡Ã§â€Â¨Ã§Å¡â€žÃ¥â€ºÅ¾Ã©â‚¬â‚¬Ã¦Â¨Â¡Ã¥Å¾â€¹

## Ã¥Ââ€šÃ¦â€¢Â°

$ARGUMENTS:

* `[task-description]` Ã¥ÂÂ¯Ã©â‚¬â€°Ã¯Â¼Å’Ã¨â€¡ÂªÃ§â€Â±Ã¦â€“â€¡Ã¦Å“Â¬
* `--budget low|med|high` Ã¥ÂÂ¯Ã©â‚¬â€°
