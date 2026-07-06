# Ã§Â¤ÂºÃ¤Â¾â€¹Ã©Â¡Â¹Ã§â€ºÂ® CLAUDE.md

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


Ã¨Â¿â„¢Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ§Â¤ÂºÃ¤Â¾â€¹Ã©Â¡Â¹Ã§â€ºÂ®Ã§ÂºÂ§Ã¥Ë†Â«Ã§Å¡â€ž CLAUDE.md Ã¦â€“â€¡Ã¤Â»Â¶Ã£â‚¬â€šÃ¨Â¯Â·Ã¥Â°â€ Ã¥â€¦Â¶Ã¦â€Â¾Ã§Â½Â®Ã¥Å“Â¨Ã¦â€šÂ¨Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¤Â¸â€¹Ã£â‚¬â€š

## Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â¦â€šÃ¨Â¿Â°

\[Ã©Â¡Â¹Ã§â€ºÂ®Ã§Â®â‚¬Ã¨Â¦ÂÃ¦ÂÂÃ¨Â¿Â° - Ã¥Å Å¸Ã¨Æ’Â½Ã£â‚¬ÂÃ¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†]

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â§â€žÃ¥Ë†â„¢

### 1. Ã¤Â»Â£Ã§Â ÂÃ§Â»â€žÃ§Â»â€¡

* Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¥Â°ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â¼ËœÃ¤ÂºÅ½Ã¥Â°â€˜Ã©â€¡ÂÃ¥Â¤Â§Ã¦â€“â€¡Ã¤Â»Â¶
* Ã©Â«ËœÃ¥â€ â€¦Ã¨ÂÅ¡Ã¯Â¼Å’Ã¤Â½Å½Ã¨â‚¬Â¦Ã¥ÂË†
* Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶Ã¥â€¦Â¸Ã¥Å¾â€¹ 200-400 Ã¨Â¡Å’Ã¯Â¼Å’Ã¦Å“â‚¬Ã¥Â¤Å¡ 800 Ã¨Â¡Å’
* Ã¦Å’â€°Ã¥Å Å¸Ã¨Æ’Â½/Ã©Â¢â€ Ã¥Å¸Å¸Ã§Â»â€žÃ§Â»â€¡Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦Å’â€°Ã§Â±Â»Ã¥Å¾â€¹

### 2. Ã¤Â»Â£Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

* Ã¤Â»Â£Ã§Â ÂÃ£â‚¬ÂÃ¦Â³Â¨Ã©â€¡Å Ã¦Ë†â€“Ã¦â€“â€¡Ã¦Â¡Â£Ã¤Â¸Â­Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¥ÂÂ·
* Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§ - Ã¦Â°Â¸Ã¤Â¸ÂÃ¦â€Â¹Ã¥ÂËœÃ¥Â¯Â¹Ã¨Â±Â¡Ã¦Ë†â€“Ã¦â€¢Â°Ã§Â»â€ž
* Ã§â€Å¸Ã¤ÂºÂ§Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ console.log
* Ã¤Â½Â¿Ã§â€Â¨ try/catch Ã¨Â¿â€ºÃ¨Â¡Å’Ã©â‚¬â€šÃ¥Â½â€œÃ§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
* Ã¤Â½Â¿Ã§â€Â¨ Zod Ã¦Ë†â€“Ã§Â±Â»Ã¤Â¼Â¼Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â

### 3. Ã¦Âµâ€¹Ã¨Â¯â€¢

* TDDÃ¯Â¼Å¡Ã¥â€¦Ë†Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¦Å“â‚¬Ã¤Â½Å½ 80% Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡
* Ã¥Â·Â¥Ã¥â€¦Â·Ã¥â€¡Â½Ã¦â€¢Â°Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢
* API Ã¨Â¿â€ºÃ¨Â¡Å’Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢
* Ã¥â€¦Â³Ã©â€Â®Ã¦ÂµÂÃ§Â¨â€¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢

### 4. Ã¥Â®â€°Ã¥â€¦Â¨

* Ã¤Â¸ÂÃ§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥Â¯â€ Ã©â€™Â¥
* Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€¢Â°Ã¦ÂÂ®Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â
* Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥
* Ã¤Â»â€¦Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢
* Ã¥ÂÂ¯Ã§â€Â¨ CSRF Ã¤Â¿ÂÃ¦Å Â¤

## Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€ž

```
src/
|-- app/              # Next.js Ã¥Âºâ€Ã§â€Â¨Ã¨Â·Â¯Ã§â€Â±
|-- components/       # Ã¥ÂÂ¯Ã¥Â¤ÂÃ§â€Â¨Ã§Å¡â€ž UI Ã§Â»â€žÃ¤Â»Â¶
|-- hooks/            # Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€° React Ã©â€™Â©Ã¥Â­Â
|-- lib/              # Ã¥Â·Â¥Ã¥â€¦Â·Ã¥Âºâ€œ
|-- types/            # TypeScript Ã¥Â®Å¡Ã¤Â¹â€°
```

## Ã¥â€¦Â³Ã©â€Â®Ã¦Â¨Â¡Ã¥Â¼Â

### API Ã¥â€œÂÃ¥Âºâ€Ã¦Â Â¼Ã¥Â¼Â

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

### Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

```typescript
try {
  const result = await operation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  return { success: false, error: 'User-friendly message' }
}
```

## Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â

```bash
# Required
DATABASE_URL=
API_KEY=

# Optional
DEBUG=false
```

## Ã¥ÂÂ¯Ã§â€Â¨Ã¥â€˜Â½Ã¤Â»Â¤

* `/tdd` - Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©Â©Â±Ã¥Å Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ
* `/plan` - Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â®Å¾Ã§Å½Â°Ã¨Â®Â¡Ã¥Ë†â€™
* `/code-review` - Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡Â
* `/build-fix` - Ã¤Â¿Â®Ã¥Â¤ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯

## Git Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

* Ã§ÂºÂ¦Ã¥Â®Å¡Ã¥Â¼ÂÃ¦ÂÂÃ¤ÂºÂ¤Ã¯Â¼Å¡`feat:`, `fix:`, `refactor:`, `docs:`, `test:`
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã§â€ºÂ´Ã¦Å½Â¥Ã¦ÂÂÃ¤ÂºÂ¤Ã¥Ë†Â°Ã¤Â¸Â»Ã¥Ë†â€ Ã¦â€Â¯
* Ã¥ÂË†Ã¥Â¹Â¶Ã¨Â¯Â·Ã¦Â±â€šÃ©Å“â‚¬Ã¨Â¦ÂÃ¥Â®Â¡Ã¦Â Â¸
* Ã¥ÂË†Ã¥Â¹Â¶Ã¥â€°ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¿â€¦Ã©Â¡Â»Ã©â‚¬Å¡Ã¨Â¿â€¡
