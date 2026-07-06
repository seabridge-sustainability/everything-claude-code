# Ã¨ÂµÅ¾Ã¥Å Â© ECC

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


ECC Ã¤Â½Å“Ã¤Â¸ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â¼â‚¬Ã¦ÂºÂÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œÃ¦â‚¬Â§Ã¨Æ’Â½Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â³Â»Ã§Â»Å¸Ã¯Â¼Å’Ã¥Å“Â¨ Claude CodeÃ£â‚¬ÂCursorÃ£â‚¬ÂOpenCode Ã¥â€™Å’ Codex Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂ/CLI Ã¤Â¸Â­Ã¥Â¾â€”Ã¥Ë†Â°Ã§Â»Â´Ã¦Å Â¤Ã£â‚¬â€š

## Ã¤Â¸ÂºÃ¤Â½â€¢Ã¨ÂµÅ¾Ã¥Å Â©

Ã¨ÂµÅ¾Ã¥Å Â©Ã§â€ºÂ´Ã¦Å½Â¥Ã¨Âµâ€žÃ¥Å Â©Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦â€“Â¹Ã©ÂÂ¢Ã¯Â¼Å¡

* Ã¦â€ºÂ´Ã¥Â¿Â«Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â®Ã¥Â¤ÂÃ¥â€™Å’Ã¥Ââ€˜Ã¥Â¸Æ’Ã¥â€˜Â¨Ã¦Å“Å¸
* Ã¨Â·Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¹Â³Ã¥ÂÂ°Ã§Å¡â€žÃ¥Â¹Â³Ã¥ÂÂ°Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§Ã¥Â·Â¥Ã¤Â½Å“
* Ã¤Â¸ÂºÃ§Â¤Â¾Ã¥Å’ÂºÃ¥â€¦ÂÃ¨Â´Â¹Ã¦ÂÂÃ¤Â¾â€ºÃ§Å¡â€žÃ¥â€¦Â¬Ã¥â€¦Â±Ã¦â€“â€¡Ã¦Â¡Â£Ã£â‚¬ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã¥â€™Å’Ã¥ÂÂ¯Ã©ÂÂ Ã¦â‚¬Â§Ã¥Â·Â¥Ã¥â€¦Â·

## Ã¨ÂµÅ¾Ã¥Å Â©Ã¥Â±â€šÃ§ÂºÂ§

Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¦ËœÂ¯Ã¥Â®Å¾Ã§â€Â¨Ã§Å¡â€žÃ¨ÂµÂ·Ã§â€šÂ¹Ã¯Â¼Å’Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦Â Â¹Ã¦ÂÂ®Ã¥ÂË†Ã¤Â½Å“Ã¨Å’Æ’Ã¥â€ºÂ´Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â°Æ’Ã¦â€¢Â´Ã£â‚¬â€š

| Ã¥Â±â€šÃ§ÂºÂ§ | Ã¤Â»Â·Ã¦Â Â¼ | Ã¦Å“â‚¬Ã©â‚¬â€šÃ¥ÂË† | Ã¥Å’â€¦Ã¥ÂÂ«Ã¥â€ â€¦Ã¥Â®Â¹ |
|------|-------|----------|----------|
| Ã¨Â¯â€¢Ã§â€šÂ¹Ã¥ÂË†Ã¤Â½Å“Ã¤Â¼â„¢Ã¤Â¼Â´ | $200/Ã¦Å“Ë† | Ã©Â¦â€“Ã¦Â¬Â¡Ã¨ÂµÅ¾Ã¥Å Â©Ã¥ÂË†Ã¤Â½Å“ | Ã¦Å“Ë†Ã¥ÂºÂ¦Ã¦Å’â€¡Ã¦Â â€¡Ã¦â€ºÂ´Ã¦â€“Â°Ã£â‚¬ÂÃ¨Â·Â¯Ã§ÂºÂ¿Ã¥â€ºÂ¾Ã©Â¢â€žÃ¨Â§Ë†Ã£â‚¬ÂÃ¤Â¼ËœÃ¥â€¦Ë†Ã§Â»Â´Ã¦Å Â¤Ã¨â‚¬â€¦Ã¥ÂÂÃ©Â¦Ë† |
| Ã¦Ë†ÂÃ©â€¢Â¿Ã¥ÂË†Ã¤Â½Å“Ã¤Â¼â„¢Ã¤Â¼Â´ | $500/Ã¦Å“Ë† | Ã§Â§Â¯Ã¦Å¾ÂÃ©â€¡â€¡Ã§â€Â¨ ECC Ã§Å¡â€žÃ¥â€ºÂ¢Ã©ËœÅ¸ | Ã¨Â¯â€¢Ã§â€šÂ¹Ã¦ÂÆ’Ã§â€ºÅ  + Ã¦Å“Ë†Ã¥ÂºÂ¦Ã¥Å Å¾Ã¥â€¦Â¬Ã¦â€”Â¶Ã©â€”Â´Ã¥ÂÅ’Ã¦Â­Â¥ + Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Å’â€¡Ã¥Â¯Â¼ |
| Ã¦Ë†ËœÃ§â€¢Â¥Ã¥ÂË†Ã¤Â½Å“Ã¤Â¼â„¢Ã¤Â¼Â´ | $1,000+/Ã¦Å“Ë† | Ã¥Â¹Â³Ã¥ÂÂ°/Ã§â€Å¸Ã¦â‚¬ÂÃ§Â³Â»Ã§Â»Å¸Ã¥ÂË†Ã¤Â½Å“Ã¤Â¼â„¢Ã¤Â¼Â´ | Ã¦Ë†ÂÃ©â€¢Â¿Ã¦ÂÆ’Ã§â€ºÅ  + Ã¥ÂÂÃ¨Â°Æ’Ã¥Ââ€˜Ã¥Â¸Æ’Ã¦â€Â¯Ã¦Å’Â + Ã¦â€ºÂ´Ã¦Â·Â±Ã¥â€¦Â¥Ã§Å¡â€žÃ§Â»Â´Ã¦Å Â¤Ã¨â‚¬â€¦Ã¥ÂÂÃ¤Â½Å“ |

## Ã¨ÂµÅ¾Ã¥Å Â©Ã¦Å Â¥Ã¥â€˜Å 

Ã¦Â¯ÂÃ¦Å“Ë†Ã¥Ë†â€ Ã¤ÂºÂ«Ã§Å¡â€žÃ¦Å’â€¡Ã¦Â â€¡Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥Å’â€¦Ã¦â€¹Â¬Ã¯Â¼Å¡

* npm Ã¤Â¸â€¹Ã¨Â½Â½Ã©â€¡ÂÃ¯Â¼Ë†`ecc-universal`Ã£â‚¬Â`ecc-agentshield`Ã¯Â¼â€°
* Ã¤Â»â€œÃ¥Âºâ€œÃ©â€¡â€¡Ã§â€Â¨Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Ã¦ËœÅ¸Ã¦Â â€¡Ã£â‚¬ÂÃ¥Ë†â€ Ã¥Ââ€°Ã£â‚¬ÂÃ¨Â´Â¡Ã§Å’Â®Ã¨â‚¬â€¦Ã¯Â¼â€°
* GitHub Ã¥Âºâ€Ã§â€Â¨Ã¥Â®â€°Ã¨Â£â€¦Ã¨Â¶â€¹Ã¥Å Â¿
* Ã¥Ââ€˜Ã¥Â¸Æ’Ã¨Å â€šÃ¥Â¥ÂÃ¥â€™Å’Ã¥ÂÂ¯Ã©ÂÂ Ã¦â‚¬Â§Ã©â€¡Å’Ã§Â¨â€¹Ã§Â¢â€˜

Ã¦Å“â€°Ã¥â€¦Â³Ã§Â¡Â®Ã¥Ë†â€¡Ã§Å¡â€žÃ¥â€˜Â½Ã¤Â»Â¤Ã§â€°â€¡Ã¦Â®ÂµÃ¥â€™Å’Ã¥ÂÂ¯Ã©â€¡ÂÃ¥Â¤ÂÃ§Å¡â€žÃ¦â€¹â€°Ã¥Ââ€“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦ [`docs/business/metrics-and-sponsorship.md`](../business/metrics-and-sponsorship.md)Ã£â‚¬â€š

## Ã¦Å“Å¸Ã¦Å“â€ºÃ¤Â¸Å½Ã¨Å’Æ’Ã¥â€ºÂ´

* Ã¨ÂµÅ¾Ã¥Å Â©Ã¦â€Â¯Ã¦Å’ÂÃ§Â»Â´Ã¦Å Â¤Ã¥â€™Å’Ã¥Å Â Ã©â‚¬Å¸Ã¯Â¼â€ºÃ¤Â¸ÂÃ¤Â¼Å¡Ã¨Â½Â¬Ã§Â§Â»Ã©Â¡Â¹Ã§â€ºÂ®Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÆ’Ã£â‚¬â€š
* Ã¥Å Å¸Ã¨Æ’Â½Ã¨Â¯Â·Ã¦Â±â€šÃ¦Â Â¹Ã¦ÂÂ®Ã¨ÂµÅ¾Ã¥Å Â©Ã¥Â±â€šÃ§ÂºÂ§Ã£â‚¬ÂÃ§â€Å¸Ã¦â‚¬ÂÃ§Â³Â»Ã§Â»Å¸Ã¥Â½Â±Ã¥â€œÂÃ¥â€™Å’Ã§Â»Â´Ã¦Å Â¤Ã©Â£Å½Ã©â„¢Â©Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã¦Å½â€™Ã¥ÂºÂÃ£â‚¬â€š
* Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€™Å’Ã¥ÂÂ¯Ã©ÂÂ Ã¦â‚¬Â§Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¼ËœÃ¥â€¦Ë†Ã¤ÂºÅ½Ã¥â€¦Â¨Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã£â‚¬â€š

## Ã¥Å“Â¨Ã¦Â­Â¤Ã¨ÂµÅ¾Ã¥Å Â©

* GitHub Sponsors: <https://github.com/sponsors/affaan-m>
* Ã©Â¡Â¹Ã§â€ºÂ®Ã§Â½â€˜Ã§Â«â„¢: <https://ecc.tools>
