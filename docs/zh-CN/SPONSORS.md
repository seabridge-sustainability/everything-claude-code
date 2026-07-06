# Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

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


Ã¦â€žÅ¸Ã¨Â°Â¢Ã¦â€°â‚¬Ã¦Å“â€°Ã¨ÂµÅ¾Ã¥Å Â©Ã¦Å“Â¬Ã©Â¡Â¹Ã§â€ºÂ®Ã§Å¡â€žÃ¥Ââ€žÃ¤Â½ÂÃ¯Â¼ÂÃ¤Â½Â Ã¤Â»Â¬Ã§Å¡â€žÃ¦â€Â¯Ã¦Å’ÂÃ¨Â®Â© ECC Ã§â€Å¸Ã¦â‚¬ÂÃ§Â³Â»Ã§Â»Å¸Ã¦Å’ÂÃ§Â»Â­Ã¦Ë†ÂÃ©â€¢Â¿Ã£â‚¬â€š

## Ã¤Â¼ÂÃ¤Â¸Å¡Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

*Ã¦Ë†ÂÃ¤Â¸Âº [Ã¤Â¼ÂÃ¤Â¸Å¡Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦](https://github.com/sponsors/affaan-m)Ã¯Â¼Å’Ã¥Â°â€ Ã¦â€šÂ¨Ã§Å¡â€žÃ¥ÂÂÃ¥Â­â€”Ã¥Â±â€¢Ã§Â¤ÂºÃ¥Å“Â¨Ã¦Â­Â¤Ã¥Â¤â€ž*

## Ã¥â€¢â€ Ã¤Â¸Å¡Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

*Ã¦Ë†ÂÃ¤Â¸Âº [Ã¥â€¢â€ Ã¤Â¸Å¡Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦](https://github.com/sponsors/affaan-m)Ã¯Â¼Å’Ã¥Â°â€ Ã¦â€šÂ¨Ã§Å¡â€žÃ¥ÂÂÃ¥Â­â€”Ã¥Â±â€¢Ã§Â¤ÂºÃ¥Å“Â¨Ã¦Â­Â¤Ã¥Â¤â€ž*

## Ã¥â€ºÂ¢Ã©ËœÅ¸Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

*Ã¦Ë†ÂÃ¤Â¸Âº [Ã¥â€ºÂ¢Ã©ËœÅ¸Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦](https://github.com/sponsors/affaan-m)Ã¯Â¼Å’Ã¥Â°â€ Ã¦â€šÂ¨Ã§Å¡â€žÃ¥ÂÂÃ¥Â­â€”Ã¥Â±â€¢Ã§Â¤ÂºÃ¥Å“Â¨Ã¦Â­Â¤Ã¥Â¤â€ž*

## Ã¤Â¸ÂªÃ¤ÂºÂºÃ¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦

*Ã¦Ë†ÂÃ¤Â¸Âº [Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦](https://github.com/sponsors/affaan-m)Ã¯Â¼Å’Ã¥Â°â€ Ã¦â€šÂ¨Ã§Å¡â€žÃ¥ÂÂÃ¥Â­â€”Ã¥Ë†â€”Ã¥Å“Â¨Ã¦Â­Â¤Ã¥Â¤â€ž*

***

## Ã¤Â¸ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†Ã¨Â¦ÂÃ¨ÂµÅ¾Ã¥Å Â©Ã¯Â¼Å¸

Ã¦â€šÂ¨Ã§Å¡â€žÃ¨ÂµÅ¾Ã¥Å Â©Ã¥Â°â€ Ã¥Â¸Â®Ã¥Å Â©Ã¦Ë†â€˜Ã¤Â»Â¬Ã¯Â¼Å¡

* **Ã¦â€ºÂ´Ã¥Â¿Â«Ã¥Å“Â°Ã¤ÂºÂ¤Ã¤Â»Ëœ** Ã¢â‚¬â€ Ã¦â€ºÂ´Ã¥Â¤Å¡Ã¦â€”Â¶Ã©â€”Â´Ã¦Å â€¢Ã¥â€¦Â¥Ã¥Ë†Â°Ã¥Â·Â¥Ã¥â€¦Â·Ã¥â€™Å’Ã¥Å Å¸Ã¨Æ’Â½Ã§Å¡â€žÃ¥Â¼â‚¬Ã¥Ââ€˜Ã¤Â¸Å 
* **Ã¤Â¿ÂÃ¦Å’ÂÃ¥â€¦ÂÃ¨Â´Â¹** Ã¢â‚¬â€ Ã©Â«ËœÃ§ÂºÂ§Ã¥Å Å¸Ã¨Æ’Â½Ã¤Â¸ÂºÃ¦â€°â‚¬Ã¦Å“â€°Ã¤ÂºÂºÃ§Å¡â€žÃ¥â€¦ÂÃ¨Â´Â¹Ã¥Â±â€šÃ§ÂºÂ§Ã¦ÂÂÃ¤Â¾â€ºÃ¨Âµâ€žÃ©â€¡â€˜Ã¦â€Â¯Ã¦Å’Â
* **Ã¦â€ºÂ´Ã¥Â¥Â½Ã§Å¡â€žÃ¦â€Â¯Ã¦Å’Â** Ã¢â‚¬â€ Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦Ã¨Å½Â·Ã¥Â¾â€”Ã¤Â¼ËœÃ¥â€¦Ë†Ã¥â€œÂÃ¥Âºâ€
* **Ã¥Â½Â±Ã¥â€œÂÃ¨Â·Â¯Ã§ÂºÂ¿Ã¥â€ºÂ¾** Ã¢â‚¬â€ Pro+ Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥Â¯Â¹Ã¥Å Å¸Ã¨Æ’Â½Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å â€¢Ã§Â¥Â¨

## Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦Ã¥â€¡â€ Ã¥Â¤â€¡Ã¥ÂºÂ¦Ã¤Â¿Â¡Ã¥ÂÂ·

Ã¥Å“Â¨Ã¨ÂµÅ¾Ã¥Å Â©Ã¨â‚¬â€¦Ã¥Â¯Â¹Ã¨Â¯ÂÃ¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¿â„¢Ã¤Âºâ€ºÃ¨Â¯ÂÃ¦ËœÅ½Ã§â€šÂ¹Ã¯Â¼Å¡

* `ecc-universal` Ã¥â€™Å’ `ecc-agentshield` Ã§Å¡â€žÃ¥Â®Å¾Ã¦â€”Â¶ npm Ã¥Â®â€°Ã¨Â£â€¦/Ã¤Â¸â€¹Ã¨Â½Â½Ã¦Å’â€¡Ã¦Â â€¡
* Ã©â‚¬Å¡Ã¨Â¿â€¡ Marketplace Ã¥Â®â€°Ã¨Â£â€¦Ã§Å¡â€ž GitHub App Ã¥Ë†â€ Ã¥Ââ€˜
* Ã¥â€¦Â¬Ã¥Â¼â‚¬Ã©â€¡â€¡Ã§â€Â¨Ã¤Â¿Â¡Ã¥ÂÂ·Ã¯Â¼Å¡Ã¦ËœÅ¸Ã¦Â â€¡Ã£â‚¬ÂÃ¥Ë†â€ Ã¥Ââ€°Ã£â‚¬ÂÃ¨Â´Â¡Ã§Å’Â®Ã¨â‚¬â€¦Ã£â‚¬ÂÃ¥Ââ€˜Ã¥Â¸Æ’Ã¨Å â€šÃ¥Â¥Â
* Ã¨Â·Â¨Ã¥Â¹Â³Ã¥ÂÂ°Ã¦â€Â¯Ã¦Å’ÂÃ¯Â¼Å¡Claude CodeÃ£â‚¬ÂCursorÃ£â‚¬ÂOpenCodeÃ£â‚¬ÂCodex Ã¥Âºâ€Ã§â€Â¨/CLI

Ã¦Å“â€°Ã¥â€¦Â³Ã¥Â¤ÂÃ¥Ë†Â¶/Ã§Â²ËœÃ¨Â´Â´Ã¦Å’â€¡Ã¦Â â€¡Ã¦â€¹â€°Ã¥Ââ€“Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦ [`docs/business/metrics-and-sponsorship.md`](../business/metrics-and-sponsorship.md)Ã£â‚¬â€š

## Ã¨ÂµÅ¾Ã¥Å Â©Ã§Â­â€°Ã§ÂºÂ§

| Ã¥Â±â€šÃ§ÂºÂ§ | Ã¤Â»Â·Ã¦Â Â¼ | Ã¦ÂÆ’Ã§â€ºÅ  |
|------|-------|----------|
| Ã¦â€Â¯Ã¦Å’ÂÃ¨â‚¬â€¦ | Ã¦Â¯ÂÃ¦Å“Ë† $5 | Ã¥ÂÂÃ¥Â­â€”Ã¥â€¡ÂºÃ§Å½Â°Ã¥Å“Â¨ README Ã¤Â¸Â­Ã¯Â¼Å’Ã¦â€”Â©Ã¦Å“Å¸Ã¨Â®Â¿Ã©â€”Â® |
| Ã¦Å¾â€žÃ¥Â»ÂºÃ¨â‚¬â€¦ | Ã¦Â¯ÂÃ¦Å“Ë† $10 | Ã©Â«ËœÃ§ÂºÂ§Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â®Â¿Ã©â€”Â®Ã¦ÂÆ’Ã©â„¢Â |
| Ã¤Â¸â€œÃ¤Â¸Å¡Ã§â€°Ë† | Ã¦Â¯ÂÃ¦Å“Ë† $25 | Ã¤Â¼ËœÃ¥â€¦Ë†Ã¦â€Â¯Ã¦Å’ÂÃ¯Â¼Å’Ã¥Å Å¾Ã¥â€¦Â¬Ã¦â€”Â¶Ã©â€”Â´ |
| Ã¥â€ºÂ¢Ã©ËœÅ¸Ã§â€°Ë† | Ã¦Â¯ÂÃ¦Å“Ë† $100 | 5 Ã¤Â¸ÂªÃ¥Â¸Â­Ã¤Â½ÂÃ¯Â¼Å’Ã¥â€ºÂ¢Ã©ËœÅ¸Ã©â€¦ÂÃ§Â½Â® |
| Ã¥Â¹Â³Ã¥ÂÂ°Ã¥ÂË†Ã¤Â½Å“Ã¤Â¼â„¢Ã¤Â¼Â´ | Ã¦Â¯ÂÃ¦Å“Ë† $200 | Ã¦Å“Ë†Ã¥ÂºÂ¦Ã¨Â·Â¯Ã§ÂºÂ¿Ã¥â€ºÂ¾Ã¥ÂÅ’Ã¦Â­Â¥Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã§Â»Â´Ã¦Å Â¤Ã¨â‚¬â€¦Ã¥ÂÂÃ©Â¦Ë†Ã¯Â¼Å’Ã¥Ââ€˜Ã¥Â¸Æ’Ã¨Â¯Â´Ã¦ËœÅ½Ã¦ÂÂÃ¥ÂÅ  |
| Ã¥â€¢â€ Ã¤Â¸Å¡Ã§â€°Ë† | Ã¦Â¯ÂÃ¦Å“Ë† $500 | 25 Ã¤Â¸ÂªÃ¥Â¸Â­Ã¤Â½ÂÃ¯Â¼Å’Ã¥â€™Â¨Ã¨Â¯Â¢Ã§Â§Â¯Ã¥Ë†â€  |
| Ã¤Â¼ÂÃ¤Â¸Å¡Ã§â€°Ë† | Ã¦Â¯ÂÃ¦Å“Ë† $2K | Ã¦â€”Â Ã©â„¢ÂÃ¥Ë†Â¶Ã¥Â¸Â­Ã¤Â½ÂÃ¯Â¼Å’Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Â·Â¥Ã¥â€¦Â· |

[**Become a Sponsor Ã¢â€ â€™**](https://github.com/sponsors/affaan-m)

***

*Ã¨â€¡ÂªÃ¥Å Â¨Ã¦â€ºÂ´Ã¦â€“Â°Ã£â‚¬â€šÃ¦Å“â‚¬Ã¥ÂÅ½Ã¥ÂÅ’Ã¦Â­Â¥Ã¯Â¼Å¡2026Ã¥Â¹Â´2Ã¦Å“Ë†*
