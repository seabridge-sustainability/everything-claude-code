---
description: Ã©â‚¬Å¡Ã¨Â¿â€¡ Context7 Ã¦Å¸Â¥Ã¦â€°Â¾Ã¥Âºâ€œÃ¦Ë†â€“Ã¤Â¸Â»Ã©Â¢ËœÃ§Å¡â€žÃ¥Â½â€œÃ¥â€°ÂÃ¦â€“â€¡Ã¦Â¡Â£Ã£â‚¬â€š
---

# /docs

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã§â€ºÂ®Ã§Å¡â€ž

Ã¦Å¸Â¥Ã¦â€°Â¾Ã¥Âºâ€œÃ£â‚¬ÂÃ¦Â¡â€ Ã¦Å¾Â¶Ã¦Ë†â€“ API Ã§Å¡â€žÃ¦Å“â‚¬Ã¦â€“Â°Ã¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼Å’Ã¥Â¹Â¶Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥Å’â€¦Ã¥ÂÂ«Ã§â€ºÂ¸Ã¥â€¦Â³Ã¤Â»Â£Ã§Â ÂÃ§â€°â€¡Ã¦Â®ÂµÃ§Å¡â€žÃ¦â€˜ËœÃ¨Â¦ÂÃ§Â­â€Ã¦Â¡Ë†Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨ Context7 MCPÃ¯Â¼Ë†resolve-library-id Ã¥â€™Å’ query-docsÃ¯Â¼â€°Ã¯Â¼Å’Ã¥â€ºÂ Ã¦Â­Â¤Ã§Â­â€Ã¦Â¡Ë†Ã¥ÂÂÃ¦ËœÂ Ã§Å¡â€žÃ¦ËœÂ¯Ã¥Â½â€œÃ¥â€°ÂÃ¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¨Â®Â­Ã§Â»Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã£â‚¬â€š

## Ã§â€Â¨Ã¦Â³â€¢

```
/docs [library name] [question]
```

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¤Å¡Ã¥Ââ€¢Ã¨Â¯ÂÃ¥Ââ€šÃ¦â€¢Â°Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¼â€¢Ã¥ÂÂ·Ã¤Â»Â¥Ã¤Â¾Â¿Ã¥Â®Æ’Ã¤Â»Â¬Ã¨Â¢Â«Ã¨Â§Â£Ã¦Å¾ÂÃ¤Â¸ÂºÃ¥Ââ€¢Ã¤Â¸ÂªÃ¦Â â€¡Ã¨Â®Â°Ã£â‚¬â€šÃ§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Å¡`/docs "Next.js" "How do I configure middleware?"`

Ã¥Â¦â€šÃ¦Å¾Å“Ã§Å“ÂÃ§â€¢Â¥Ã¤Âºâ€ Ã¥Âºâ€œÃ¦Ë†â€“Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¥Ë†â„¢Ã¦ÂÂÃ§Â¤ÂºÃ§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¯Â¼Å¡

1. Ã¥Âºâ€œÃ¦Ë†â€“Ã¤ÂºÂ§Ã¥â€œÂÃ¥ÂÂÃ§Â§Â°Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€š Next.jsÃ£â‚¬ÂPrismaÃ£â‚¬ÂSupabaseÃ¯Â¼â€°Ã£â‚¬â€š
2. Ã¥â€¦Â·Ã¤Â½â€œÃ©â€”Â®Ã©Â¢ËœÃ¦Ë†â€“Ã¤Â»Â»Ã¥Å Â¡Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€šÃ¢â‚¬Å“Ã¥Â¦â€šÃ¤Â½â€¢Ã¨Â®Â¾Ã§Â½Â®Ã¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã¯Â¼Å¸Ã¢â‚¬ÂÃ£â‚¬ÂÃ¢â‚¬Å“Ã¨Â®Â¤Ã¨Â¯ÂÃ¦â€“Â¹Ã¦Â³â€¢Ã¢â‚¬ÂÃ¯Â¼â€°Ã£â‚¬â€š

## Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

1. **Ã¨Â§Â£Ã¦Å¾ÂÃ¥Âºâ€œ ID** Ã¢â‚¬â€ Ã¨Â°Æ’Ã§â€Â¨ Context7 Ã¥Â·Â¥Ã¥â€¦Â· `resolve-library-id`Ã¯Â¼Å’Ã¤Â¼Â Ã¥â€¦Â¥Ã¥Âºâ€œÃ¥ÂÂÃ§Â§Â°Ã¥â€™Å’Ã§â€Â¨Ã¦Ë†Â·Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¤Â»Â¥Ã¨Å½Â·Ã¥Ââ€“ Context7 Ã¥â€¦Â¼Ã¥Â®Â¹Ã§Å¡â€žÃ¥Âºâ€œ IDÃ¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€š `/vercel/next.js`Ã¯Â¼â€°Ã£â‚¬â€š
2. **Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¦â€“â€¡Ã¦Â¡Â£** Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¯Â¥Ã¥Âºâ€œ ID Ã¥â€™Å’Ã§â€Â¨Ã¦Ë†Â·Ã©â€”Â®Ã©Â¢ËœÃ¨Â°Æ’Ã§â€Â¨ `query-docs`Ã£â‚¬â€š
3. **Ã¦â‚¬Â»Ã§Â»â€œ** Ã¢â‚¬â€ Ã¨Â¿â€Ã¥â€ºÅ¾Ã§Â®â‚¬Ã¦Â´ÂÃ§Å¡â€žÃ§Â­â€Ã¦Â¡Ë†Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Å’â€¦Ã¥ÂÂ«Ã¤Â»Å½Ã¨Å½Â·Ã¥Ââ€“Ã§Å¡â€žÃ¦â€“â€¡Ã¦Â¡Â£Ã¤Â¸Â­Ã¦ÂÂÃ¥Ââ€“Ã§Å¡â€žÃ§â€ºÂ¸Ã¥â€¦Â³Ã¤Â»Â£Ã§Â ÂÃ§Â¤ÂºÃ¤Â¾â€¹Ã£â‚¬â€šÃ¦ÂÂÃ¥ÂÅ Ã¥Âºâ€œÃ¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã§â€ºÂ¸Ã¥â€¦Â³Ã¯Â¼Å’Ã¥Å’â€¦Ã¦â€¹Â¬Ã§â€°Ë†Ã¦Å“Â¬Ã¯Â¼â€°Ã£â‚¬â€š

## Ã¨Â¾â€œÃ¥â€¡Âº

Ã§â€Â¨Ã¦Ë†Â·Ã¦â€Â¶Ã¥Ë†Â°Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ§Â®â‚¬Ã§Å¸Â­Ã£â‚¬ÂÃ¥â€¡â€ Ã§Â¡Â®Ã§Å¡â€žÃ§Â­â€Ã¦Â¡Ë†Ã¯Â¼Å’Ã¨Â¯Â¥Ã§Â­â€Ã¦Â¡Ë†Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¥Â½â€œÃ¥â€°ÂÃ¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼Å’Ã¥Â¹Â¶Ã©â„¢â€žÃ¥Â¸Â¦Ã¤Â»Â»Ã¤Â½â€¢Ã¦Å“â€°Ã¥Â¸Â®Ã¥Å Â©Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ§â€°â€¡Ã¦Â®ÂµÃ£â‚¬â€šÃ¥Â¦â€šÃ¦Å¾Å“ Context7 Ã¤Â¸ÂÃ¥ÂÂ¯Ã§â€Â¨Ã¯Â¼Å’Ã¥Ë†â„¢Ã¨Â¯Â´Ã¦ËœÅ½Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Å’Ã¥Â¹Â¶Ã¦Â Â¹Ã¦ÂÂ®Ã¨Â®Â­Ã§Â»Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã¥â€ºÅ¾Ã§Â­â€Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¥Â¹Â¶Ã¦Â³Â¨Ã¦ËœÅ½Ã¦â€“â€¡Ã¦Â¡Â£Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥Â·Â²Ã¨Â¿â€¡Ã¦â€”Â¶Ã£â‚¬â€š
