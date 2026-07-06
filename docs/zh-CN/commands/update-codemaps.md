# Ã¦â€ºÂ´Ã¦â€“Â°Ã¤Â»Â£Ã§Â ÂÃ¥Å“Â°Ã¥â€ºÂ¾

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ§Â»â€œÃ¦Å¾â€žÃ¥Â¹Â¶Ã§â€Å¸Ã¦Ë†ÂÃ§Â®â‚¬Ã¦Â´ÂÃ§Å¡â€žÃ¦Å¾Â¶Ã¦Å¾â€žÃ¦â€“â€¡Ã¦Â¡Â£Ã£â‚¬â€š

## Ã¦Â­Â¥Ã©ÂªÂ¤ 1Ã¯Â¼Å¡Ã¦â€°Â«Ã¦ÂÂÃ©Â¡Â¹Ã§â€ºÂ®Ã§Â»â€œÃ¦Å¾â€ž

1. Ã¨Â¯â€ Ã¥Ë†Â«Ã©Â¡Â¹Ã§â€ºÂ®Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Ë†Ã¥Ââ€¢Ã¤Â½â€œÃ¤Â»â€œÃ¥Âºâ€œÃ£â‚¬ÂÃ¥Ââ€¢Ã¥Âºâ€Ã§â€Â¨Ã£â‚¬ÂÃ¥Âºâ€œÃ£â‚¬ÂÃ¥Â¾Â®Ã¦Å“ÂÃ¥Å Â¡Ã¯Â¼â€°
2. Ã¦Å¸Â¥Ã¦â€°Â¾Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂºÂÃ§Â ÂÃ§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Ë†src/, lib/, app/, packages/Ã¯Â¼â€°
3. Ã¦ËœÂ Ã¥Â°â€žÃ¥â€¦Â¥Ã¥ÂÂ£Ã§â€šÂ¹Ã¯Â¼Ë†main.ts, index.ts, app.py, main.go Ã§Â­â€°Ã¯Â¼â€°

## Ã¦Â­Â¥Ã©ÂªÂ¤ 2Ã¯Â¼Å¡Ã§â€Å¸Ã¦Ë†ÂÃ¤Â»Â£Ã§Â ÂÃ¥Å“Â°Ã¥â€ºÂ¾

Ã¥Å“Â¨ `docs/CODEMAPS/`Ã¯Â¼Ë†Ã¦Ë†â€“ `.reports/codemaps/`Ã¯Â¼â€°Ã¤Â¸Â­Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦Ë†â€“Ã¦â€ºÂ´Ã¦â€“Â°Ã¤Â»Â£Ã§Â ÂÃ¥Å“Â°Ã¥â€ºÂ¾Ã¯Â¼Å¡

| Ã¦â€“â€¡Ã¤Â»Â¶ | Ã¥â€ â€¦Ã¥Â®Â¹ |
|------|----------|
| `architecture.md` | Ã©Â«ËœÃ¥Â±â€šÃ§Â³Â»Ã§Â»Å¸Ã¥â€ºÂ¾Ã£â‚¬ÂÃ¦Å“ÂÃ¥Å Â¡Ã¨Â¾Â¹Ã§â€¢Å’Ã£â‚¬ÂÃ¦â€¢Â°Ã¦ÂÂ®Ã¦ÂµÂ |
| `backend.md` | API Ã¨Â·Â¯Ã§â€Â±Ã£â‚¬ÂÃ¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶Ã©â€œÂ¾Ã£â‚¬ÂÃ¦Å“ÂÃ¥Å Â¡ Ã¢â€ â€™ Ã¤Â»â€œÃ¥Âºâ€œÃ¦ËœÂ Ã¥Â°â€ž |
| `frontend.md` | Ã©Â¡ÂµÃ©ÂÂ¢Ã¦Â â€˜Ã£â‚¬ÂÃ§Â»â€žÃ¤Â»Â¶Ã¥Â±â€šÃ§ÂºÂ§Ã£â‚¬ÂÃ§Å Â¶Ã¦â‚¬ÂÃ§Â®Â¡Ã§Ââ€ Ã¦ÂµÂ |
| `data.md` | Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â¡Â¨Ã£â‚¬ÂÃ¥â€¦Â³Ã§Â³Â»Ã£â‚¬ÂÃ¨Â¿ÂÃ§Â§Â»Ã¥Å½â€ Ã¥ÂÂ² |
| `dependencies.md` | Ã¥Â¤â€“Ã©Æ’Â¨Ã¦Å“ÂÃ¥Å Â¡Ã£â‚¬ÂÃ§Â¬Â¬Ã¤Â¸â€°Ã¦â€“Â¹Ã©â€ºâ€ Ã¦Ë†ÂÃ£â‚¬ÂÃ¥â€¦Â±Ã¤ÂºÂ«Ã¥Âºâ€œ |

### Ã¤Â»Â£Ã§Â ÂÃ¥Å“Â°Ã¥â€ºÂ¾Ã¦Â Â¼Ã¥Â¼Â

Ã¦Â¯ÂÃ¤Â¸ÂªÃ¤Â»Â£Ã§Â ÂÃ¥Å“Â°Ã¥â€ºÂ¾Ã¥Âºâ€Ã¤Â¸ÂºÃ§Â®â‚¬Ã¦Â´ÂÃ©Â£Å½Ã¦Â Â¼ Ã¢â‚¬â€Ã¢â‚¬â€ Ã©â€™Ë†Ã¥Â¯Â¹ AI Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¦Â¶Ë†Ã¨Â´Â¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã¤Â¼ËœÃ¥Å’â€“Ã¯Â¼Å¡

```markdown
# Ã¥ÂÅ½Ã§Â«Â¯Ã¦Å¾Â¶Ã¦Å¾â€ž

## Ã¨Â·Â¯Ã§â€Â±
POST /api/users Ã¢â€ â€™ UserController.create Ã¢â€ â€™ UserService.create Ã¢â€ â€™ UserRepo.insert
GET  /api/users/:id Ã¢â€ â€™ UserController.get Ã¢â€ â€™ UserService.findById Ã¢â€ â€™ UserRepo.findById

## Ã¥â€¦Â³Ã©â€Â®Ã¦â€“â€¡Ã¤Â»Â¶
src/services/user.ts (Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¯Â¼Å’120Ã¨Â¡Å’)
src/repos/user.ts (Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â®Â¿Ã©â€”Â®Ã¯Â¼Å’80Ã¨Â¡Å’)

## Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
- PostgreSQL (Ã¤Â¸Â»Ã¨Â¦ÂÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Â­ËœÃ¥â€šÂ¨)
- Redis (Ã¤Â¼Å¡Ã¨Â¯ÂÃ§Â¼â€œÃ¥Â­ËœÃ¯Â¼Å’Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶)
- Stripe (Ã¦â€Â¯Ã¤Â»ËœÃ¥Â¤â€žÃ§Ââ€ )
```

## Ã¦Â­Â¥Ã©ÂªÂ¤ 3Ã¯Â¼Å¡Ã¥Â·Â®Ã¥Â¼â€šÃ¦Â£â‚¬Ã¦Âµâ€¹

1. Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â­ËœÃ¥Å“Â¨Ã¥â€¦Ë†Ã¥â€°ÂÃ§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¥Å“Â°Ã¥â€ºÂ¾Ã¯Â¼Å’Ã¨Â®Â¡Ã§Â®â€”Ã¥Â·Â®Ã¥Â¼â€šÃ§â„¢Â¾Ã¥Ë†â€ Ã¦Â¯â€
2. Ã¥Â¦â€šÃ¦Å¾Å“Ã¥ÂËœÃ¦â€ºÂ´ > 30%Ã¯Â¼Å’Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥Â·Â®Ã¥Â¼â€šÃ¥Â¹Â¶Ã¥Å“Â¨Ã¨Â¦â€ Ã§â€ºâ€“Ã¥â€°ÂÃ¨Â¯Â·Ã¦Â±â€šÃ§â€Â¨Ã¦Ë†Â·Ã¦â€°Â¹Ã¥â€¡â€ 
3. Ã¥Â¦â€šÃ¦Å¾Å“Ã¥ÂËœÃ¦â€ºÂ´ <= 30%Ã¯Â¼Å’Ã¥Ë†â„¢Ã¥Å½Å¸Ã¥Å“Â°Ã¦â€ºÂ´Ã¦â€“Â°

## Ã¦Â­Â¥Ã©ÂªÂ¤ 4Ã¯Â¼Å¡Ã¦Â·Â»Ã¥Å Â Ã¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®

Ã¤Â¸ÂºÃ¦Â¯ÂÃ¤Â¸ÂªÃ¤Â»Â£Ã§Â ÂÃ¥Å“Â°Ã¥â€ºÂ¾Ã¦Â·Â»Ã¥Å Â Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦â€“Â°Ã©Â²Å“Ã¥ÂºÂ¦Ã¥Â¤Â´Ã©Æ’Â¨Ã¯Â¼Å¡

```markdown
<!-- Generated: 2026-02-11 | Files scanned: 142 | Token estimate: ~800 -->
```

## Ã¦Â­Â¥Ã©ÂªÂ¤ 5Ã¯Â¼Å¡Ã¤Â¿ÂÃ¥Â­ËœÃ¥Ë†â€ Ã¦Å¾ÂÃ¦Å Â¥Ã¥â€˜Å 

Ã¥Â°â€ Ã¦â€˜ËœÃ¨Â¦ÂÃ¥â€ â„¢Ã¥â€¦Â¥ `.reports/codemap-diff.txt`Ã¯Â¼Å¡

* Ã¨â€¡ÂªÃ¤Â¸Å Ã¦Â¬Â¡Ã¦â€°Â«Ã¦ÂÂÃ¤Â»Â¥Ã¦ÂÂ¥Ã¦Â·Â»Ã¥Å Â /Ã¥Ë†Â Ã©â„¢Â¤/Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶
* Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¥Ë†Â°Ã§Å¡â€žÃ¦â€“Â°Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
* Ã¦Å¾Â¶Ã¦Å¾â€žÃ¥ÂËœÃ¦â€ºÂ´Ã¯Â¼Ë†Ã¦â€“Â°Ã¨Â·Â¯Ã§â€Â±Ã£â‚¬ÂÃ¦â€“Â°Ã¦Å“ÂÃ¥Å Â¡Ã§Â­â€°Ã¯Â¼â€°
* Ã¨Â¶â€¦Ã¨Â¿â€¡ 90 Ã¥Â¤Â©Ã¦Å“ÂªÃ¦â€ºÂ´Ã¦â€“Â°Ã§Å¡â€žÃ¦â€“â€¡Ã¦Â¡Â£Ã§Å¡â€žÃ©â„¢Ë†Ã¦â€”Â§Ã¨Â­Â¦Ã¥â€˜Å 

## Ã¦ÂÂÃ§Â¤Âº

* Ã¥â€¦Â³Ã¦Â³Â¨**Ã©Â«ËœÃ¥Â±â€šÃ§Â»â€œÃ¦Å¾â€ž**Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Å¾Ã§Å½Â°Ã§Â»â€ Ã¨Å â€š
* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨**Ã¦â€“â€¡Ã¤Â»Â¶Ã¨Â·Â¯Ã¥Â¾â€žÃ¥â€™Å’Ã¥â€¡Â½Ã¦â€¢Â°Ã§Â­Â¾Ã¥ÂÂ**Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Å’Ã¦â€¢Â´Ã¤Â»Â£Ã§Â ÂÃ¥Ââ€”
* Ã¤Â¸ÂºÃ©Â«ËœÃ¦â€¢Ë†Ã¥Å Â Ã¨Â½Â½Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Å’Ã¥Â°â€ Ã¦Â¯ÂÃ¤Â¸ÂªÃ¤Â»Â£Ã§Â ÂÃ¥Å“Â°Ã¥â€ºÂ¾Ã¤Â¿ÂÃ¦Å’ÂÃ¥Å“Â¨ **1000 Ã¤Â¸Âª token Ã¤Â»Â¥Ã¥â€ â€¦**
* Ã¤Â½Â¿Ã§â€Â¨ ASCII Ã¥â€ºÂ¾Ã¨Â¡Â¨Ã¨Â¡Â¨Ã§Â¤ÂºÃ¦â€¢Â°Ã¦ÂÂ®Ã¦ÂµÂÃ¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥â€ â€”Ã©â€¢Â¿Ã§Å¡â€žÃ¦ÂÂÃ¨Â¿Â°
* Ã¥Å“Â¨Ã¤Â¸Â»Ã¨Â¦ÂÃ¥Å Å¸Ã¨Æ’Â½Ã¦Â·Â»Ã¥Å Â Ã¦Ë†â€“Ã©â€¡ÂÃ¦Å¾â€žÃ¤Â¼Å¡Ã¨Â¯ÂÃ¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’
