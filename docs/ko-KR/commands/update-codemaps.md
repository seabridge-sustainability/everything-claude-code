# Ã¬Â½â€Ã«â€œÅ“Ã«Â§Âµ Ã¬â€”â€¦Ã«ÂÂ°Ã¬ÂÂ´Ã­Å Â¸

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


Ã¬Â½â€Ã«â€œÅ“Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ ÃªÂµÂ¬Ã¬Â¡Â°Ã«Â¥Â¼ Ã«Â¶â€žÃ¬â€žÂÃ­â€¢ËœÃªÂ³Â  Ã­â€ Â Ã­ÂÂ° Ã­Å¡Â¨Ã¬Å“Â¨Ã¬Â ÂÃ¬ÂÂ¸ Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ Ã«Â¬Â¸Ã¬â€žÅ“Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## 1Ã«â€¹Â¨ÃªÂ³â€ž: Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ ÃªÂµÂ¬Ã¬Â¡Â° Ã¬Å Â¤Ã¬Âºâ€

1. Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã¬Å“Â Ã­Ëœâ€¢ Ã¬â€¹ÂÃ«Â³â€ž (Ã«ÂªÂ¨Ã«â€¦Â¸Ã«Â Ë†Ã­ÂÂ¬, Ã«â€¹Â¨Ã¬ÂÂ¼ Ã¬â€¢Â±, Ã«ÂÂ¼Ã¬ÂÂ´Ã«Â¸Å’Ã«Å¸Â¬Ã«Â¦Â¬, Ã«Â§Ë†Ã¬ÂÂ´Ã­ÂÂ¬Ã«Â¡Å“Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤)
2. Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€ Å’Ã¬Å Â¤ Ã«â€â€Ã«Â â€°Ã­â€ Â Ã«Â¦Â¬ Ã¬Â°Â¾ÃªÂ¸Â° (src/, lib/, app/, packages/)
3. Ã¬â€”â€Ã­Å Â¸Ã«Â¦Â¬ Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸ Ã«Â§Â¤Ã­â€¢â€˜ (main.ts, index.ts, app.py, main.go Ã«â€œÂ±)

## 2Ã«â€¹Â¨ÃªÂ³â€ž: Ã¬Â½â€Ã«â€œÅ“Ã«Â§Âµ Ã¬Æ’ÂÃ¬â€žÂ±

`docs/CODEMAPS/`Ã¬â€”Â Ã¬Â½â€Ã«â€œÅ“Ã«Â§Âµ Ã¬Æ’ÂÃ¬â€žÂ± Ã«ËœÂÃ«Å â€ Ã¬â€”â€¦Ã«ÂÂ°Ã¬ÂÂ´Ã­Å Â¸:

| Ã­Å’Å’Ã¬ÂÂ¼ | Ã«â€šÂ´Ã¬Å¡Â© |
|------|------|
| `INDEX.md` | Ã¬Â â€žÃ¬Â²Â´ Ã¬Â½â€Ã«â€œÅ“Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ ÃªÂ°Å“Ã¬Å¡â€Ã¬â„¢â‚¬ Ã¬ËœÂÃ¬â€”Â­Ã«Â³â€ž Ã«Â§ÂÃ­ÂÂ¬ |
| `backend.md` | API Ã«ÂÂ¼Ã¬Å¡Â°Ã­Å Â¸, Ã«Â¯Â¸Ã«â€œÂ¤Ã¬â€ºÂ¨Ã¬â€“Â´ Ã¬Â²Â´Ã¬ÂÂ¸, Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤ Ã¢â€ â€™ Ã«Â¦Â¬Ã­ÂÂ¬Ã¬Â§â‚¬Ã­â€ Â Ã«Â¦Â¬ Ã«Â§Â¤Ã­â€¢â€˜ |
| `frontend.md` | Ã­Å½ËœÃ¬ÂÂ´Ã¬Â§â‚¬ Ã­Å Â¸Ã«Â¦Â¬, Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸ ÃªÂ³â€žÃ¬Â¸Âµ, Ã¬Æ’ÂÃ­Æ’Å“ ÃªÂ´â‚¬Ã«Â¦Â¬ Ã­ÂÂÃ«Â¦â€ž |
| `database.md` | Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Å Â¤Ã­â€šÂ¤Ã«Â§Ë†, Ã«Â§Ë†Ã¬ÂÂ´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦Ëœ, Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’ ÃªÂ³â€žÃ¬Â¸Âµ |
| `integrations.md` | Ã¬â„¢Â¸Ã«Â¶â‚¬ Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤, Ã¬â€žÅ“Ã«â€œÅ“Ã­Å’Å’Ã­â€¹Â° Ã­â€ ÂµÃ­â€¢Â©, Ã¬â€“Â´Ã«Å’â€˜Ã­â€žÂ° |
| `workers.md` | Ã«Â°Â±ÃªÂ·Â¸Ã«ÂÂ¼Ã¬Å¡Â´Ã«â€œÅ“ Ã¬Å¾â€˜Ã¬â€”â€¦, Ã­ÂÂ, Ã¬Å Â¤Ã¬Â¼â‚¬Ã¬Â¤â€žÃ«Å¸Â¬ |

### Ã¬Â½â€Ã«â€œÅ“Ã«Â§Âµ Ã­Ëœâ€¢Ã¬â€¹Â

ÃªÂ°Â Ã¬Â½â€Ã«â€œÅ“Ã«Â§ÂµÃ¬Ââ‚¬ Ã­â€ Â Ã­ÂÂ° Ã­Å¡Â¨Ã¬Å“Â¨Ã¬Â ÂÃ¬ÂÂ´Ã¬â€“Â´Ã¬â€¢Â¼ Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤ Ã¢â‚¬â€ AI Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸ Ã¬â€ Å’Ã«Â¹â€žÃ¬â€”Â Ã¬ÂµÅ“Ã¬Â ÂÃ­â„¢â€:

```markdown
# Backend Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ

## Ã«ÂÂ¼Ã¬Å¡Â°Ã­Å Â¸
POST /api/users Ã¢â€ â€™ UserController.create Ã¢â€ â€™ UserService.create Ã¢â€ â€™ UserRepo.insert
GET  /api/users/:id Ã¢â€ â€™ UserController.get Ã¢â€ â€™ UserService.findById Ã¢â€ â€™ UserRepo.findById

## Ã¬Â£Â¼Ã¬Å¡â€ Ã­Å’Å’Ã¬ÂÂ¼
src/services/user.ts (Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§Â, 120Ã¬Â¤â€ž)
src/repos/user.ts (Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Â â€˜ÃªÂ·Â¼, 80Ã¬Â¤â€ž)

## Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ±
- PostgreSQL (Ã¬Â£Â¼ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’)
- Redis (Ã¬â€žÂ¸Ã¬â€¦Ëœ Ã¬ÂºÂÃ¬â€¹Å“, Ã¬â€ ÂÃ«Ââ€ž Ã¬Â Å“Ã­â€¢Å“)
- Stripe (ÃªÂ²Â°Ã¬Â Å“ Ã¬Â²ËœÃ«Â¦Â¬)
```

## 3Ã«â€¹Â¨ÃªÂ³â€ž: Ã¬ËœÂÃ¬â€”Â­ Ã«Â¶â€žÃ«Â¥Ëœ

Ã¬Æ’ÂÃ¬â€žÂ±ÃªÂ¸Â°Ã«Å â€ Ã­Å’Å’Ã¬ÂÂ¼ ÃªÂ²Â½Ã«Â¡Å“ Ã­Å’Â¨Ã­â€žÂ´Ã¬Ââ€ž ÃªÂ¸Â°Ã«Â°ËœÃ¬Å“Â¼Ã«Â¡Å“ Ã¬ËœÂÃ¬â€”Â­Ã¬Ââ€ž Ã¬Å¾ÂÃ«Ââ„¢ Ã«Â¶â€žÃ«Â¥ËœÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

1. Ã­â€â€žÃ«Â¡Â Ã­Å Â¸Ã¬â€”â€Ã«â€œÅ“: `app/`, `pages/`, `components/`, `hooks/`, `.tsx`, `.jsx`
2. Ã«Â°Â±Ã¬â€”â€Ã«â€œÅ“: `api/`, `routes/`, `controllers/`, `services/`, `.route.ts`
3. Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤: `db/`, `migrations/`, `prisma/`, `repositories/`
4. Ã­â€ ÂµÃ­â€¢Â©: `integrations/`, `adapters/`, `connectors/`, `plugins/`
5. Ã¬â€ºÅ’Ã¬Â»Â¤: `workers/`, `jobs/`, `queues/`, `tasks/`, `cron/`

## 4Ã«â€¹Â¨ÃªÂ³â€ž: Ã«Â©â€Ã­Æ’â‚¬Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Â¶â€ÃªÂ°â‚¬

ÃªÂ°Â Ã¬Â½â€Ã«â€œÅ“Ã«Â§ÂµÃ¬â€”Â Ã¬ÂµÅ“Ã¬â€¹Â  Ã¬Â â€¢Ã«Â³Â´ Ã­â€”Â¤Ã«Ââ€Ã«Â¥Â¼ Ã¬Â¶â€ÃªÂ°â‚¬Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:

```markdown
**Last Updated:** 2026-03-12
**Total Files:** 42
**Total Lines:** 1875
```

## 5Ã«â€¹Â¨ÃªÂ³â€ž: Ã¬ÂÂ¸Ã«ÂÂ±Ã¬Å Â¤Ã¬â„¢â‚¬ Ã¬ËœÂÃ¬â€”Â­ Ã«Â¬Â¸Ã¬â€žÅ“ Ã«Ââ„¢ÃªÂ¸Â°Ã­â„¢â€

`INDEX.md`Ã«Å â€ Ã¬Æ’ÂÃ¬â€žÂ±Ã«ÂÅ“ Ã¬ËœÂÃ¬â€”Â­ Ã«Â¬Â¸Ã¬â€žÅ“Ã«Â¥Â¼ Ã«Â§ÂÃ­ÂÂ¬Ã­â€¢ËœÃªÂ³Â  Ã¬Å¡â€Ã¬â€¢Â½Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤:
- ÃªÂ°Â Ã¬ËœÂÃ¬â€”Â­Ã¬ÂËœ Ã­Å’Å’Ã¬ÂÂ¼ Ã¬Ë†ËœÃ¬â„¢â‚¬ Ã¬Â´Â Ã«ÂÂ¼Ã¬ÂÂ¸ Ã¬Ë†Ëœ
- ÃªÂ°ÂÃ¬Â§â‚¬Ã«ÂÅ“ Ã¬â€”â€Ã­Å Â¸Ã«Â¦Â¬ Ã­ÂÂ¬Ã¬ÂÂ¸Ã­Å Â¸
- Ã¬Â â‚¬Ã¬Å¾Â¥Ã¬â€ Å’ Ã­Å Â¸Ã«Â¦Â¬Ã¬ÂËœ ÃªÂ°â€žÃ«â€¹Â¨Ã­â€¢Å“ ASCII ÃªÂ°Å“Ã¬Å¡â€
- Ã¬ËœÂÃ¬â€”Â­Ã«Â³â€ž Ã¬â€žÂ¸Ã«Â¶â‚¬ Ã«Â¬Â¸Ã¬â€žÅ“ Ã«Â§ÂÃ­ÂÂ¬

## Ã­Å’Â

- **ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬â€žÂ¸Ã«Â¶â‚¬Ã¬â€šÂ¬Ã­â€¢Â­Ã¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’ Ã¬Æ’ÂÃ¬Å“â€ž ÃªÂµÂ¬Ã¬Â¡Â°**Ã¬â€”Â Ã¬Â§â€˜Ã¬Â¤â€˜
- Ã¬Â â€žÃ¬Â²Â´ Ã¬Â½â€Ã«â€œÅ“ Ã«Â¸â€Ã«Â¡Â Ã«Å’â‚¬Ã¬â€¹Â  **Ã­Å’Å’Ã¬ÂÂ¼ ÃªÂ²Â½Ã«Â¡Å“Ã¬â„¢â‚¬ Ã­â€¢Â¨Ã¬Ë†Ëœ Ã¬â€¹Å“ÃªÂ·Â¸Ã«â€¹Ë†Ã¬Â²Ëœ** Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã­Å¡Â¨Ã¬Å“Â¨Ã¬Â ÂÃ¬ÂÂ¸ Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸ Ã«Â¡Å“Ã«â€Â©Ã¬Ââ€ž Ã¬Å“â€žÃ­â€¢Â´ ÃªÂ°Â Ã¬Â½â€Ã«â€œÅ“Ã«Â§ÂµÃ¬Ââ€ž **1000 Ã­â€ Â Ã­ÂÂ° Ã«Â¯Â¸Ã«Â§Å’**Ã¬Å“Â¼Ã«Â¡Å“ Ã¬Å“Â Ã¬Â§â‚¬
- Ã¬Å¾Â¥Ã­â„¢Â©Ã­â€¢Å“ Ã¬â€žÂ¤Ã«Âªâ€¦ Ã«Å’â‚¬Ã¬â€¹Â  Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã­ÂÂÃ«Â¦â€žÃ¬â€”Â ASCII Ã«â€¹Â¤Ã¬ÂÂ´Ã¬â€“Â´ÃªÂ·Â¸Ã«Å¾Â¨ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã¬Â£Â¼Ã¬Å¡â€ ÃªÂ¸Â°Ã«Å Â¥ Ã¬Â¶â€ÃªÂ°â‚¬ Ã«ËœÂÃ«Å â€ Ã«Â¦Â¬Ã­Å’Â©Ã­â€ Â Ã«Â§Â Ã¬â€žÂ¸Ã¬â€¦Ëœ Ã­â€ºâ€ž `npx tsx scripts/codemaps/generate.ts` Ã¬â€¹Â¤Ã­â€“â€°
