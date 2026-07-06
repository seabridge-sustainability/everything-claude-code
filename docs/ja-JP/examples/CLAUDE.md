# Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â« CLAUDE.md Ã£ÂÂ®Ã¤Â¾â€¹

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


Ã£Ââ€œÃ£â€šÅ’Ã£ÂÂ¯Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£ÂÂ® CLAUDE.md Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ®Ã¤Â¾â€¹Ã£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€šÃ£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£Æ’Â«Ã£Æ’Â¼Ã£Æ’Ë†Ã£ÂÂ«Ã©â€¦ÂÃ§Â½Â®Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š

## Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã¦Â¦â€šÃ¨Â¦Â

[Ã£Æ’â€”Ã£Æ’Â­Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£ÂÂ®Ã§Â°Â¡Ã¥ÂËœÃ£ÂÂªÃ¨ÂªÂ¬Ã¦ËœÅ½ - Ã¤Â½â€¢Ã£â€šâ€™Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹Ã£â‚¬ÂÃ¦Å â‚¬Ã¨Â¡â€œÃ£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Æ’Ã£â€šÂ¯]

## Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’Â«Ã£Æ’Â¼Ã£Æ’Â«

### 1. Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¦Â§â€¹Ã¦Ë†Â

- Ã¥Â°â€˜Ã¦â€¢Â°Ã£ÂÂ®Ã¥Â¤Â§Ã£ÂÂÃ£ÂÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šË†Ã£â€šÅ Ã£â€šâ€šÃ¥Â¤Å¡Ã¦â€¢Â°Ã£ÂÂ®Ã¥Â°ÂÃ£Ââ€¢Ã£ÂÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«
- Ã©Â«ËœÃ¥â€¡ÂÃ©â€ºâ€ Ã£â‚¬ÂÃ¤Â½Å½Ã§ÂµÂÃ¥ÂË†
- Ã©â‚¬Å¡Ã¥Â¸Â¸200-400Ã¨Â¡Å’Ã£â‚¬ÂÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«Ã¦Å“â‚¬Ã¥Â¤Â§800Ã¨Â¡Å’
- Ã¥Å¾â€¹Ã£ÂÂ§Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ£â‚¬ÂÃ¦Â©Å¸Ã¨Æ’Â½/Ã£Æ’â€°Ã£Æ’Â¡Ã£â€šÂ¤Ã£Æ’Â³Ã£Ââ€Ã£ÂÂ¨Ã£ÂÂ«Ã¦â€¢Â´Ã§Ââ€ 

### 2. Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â«

- Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£â‚¬ÂÃ£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã§ÂµÂµÃ¦â€“â€¡Ã¥Â­â€”Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¥Â¸Â¸Ã£ÂÂ«Ã¤Â¸ÂÃ¥Â¤â€°Ã¦â‚¬Â§Ã£â€šâ€™Ã¤Â¿ÂÃ£ÂÂ¤ - Ã£â€šÂªÃ£Æ’â€“Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£Æ’Ë†Ã£â€šâ€žÃ©â€¦ÂÃ¥Ë†â€”Ã£â€šâ€™Ã¥Â¤â€°Ã¦â€ºÂ´Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¦Å“Â¬Ã§â€¢ÂªÃ£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ« console.log Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- try/catchÃ£ÂÂ§Ã©ÂÂ©Ã¥Ë†â€¡Ã£ÂÂªÃ£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°
- ZodÃ£ÂÂªÃ£ÂÂ©Ã£ÂÂ§Ã¥â€¦Â¥Ã¥Å â€ºÃ¦Â¤Å“Ã¨Â¨Â¼

### 3. Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

- TDD: Ã¦Å“â‚¬Ã¥Ë†ÂÃ£ÂÂ«Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã¦â€ºÂ¸Ã£ÂÂ
- Ã¦Å“â‚¬Ã¤Â½Å½80%Ã£ÂÂ®Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¬Ã£Æ’Æ’Ã£â€šÂ¸
- Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£ÂÂ®Ã£Æ’Â¦Ã£Æ’â€¹Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- APIÃ£ÂÂ®Ã§ÂµÂ±Ã¥ÂË†Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†
- Ã©â€¡ÂÃ¨Â¦ÂÃ£ÂÂªÃ£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼Ã£ÂÂ®E2EÃ£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†

### 4. Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£

- Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’â€°Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã¦Â©Å¸Ã¥Â¯â€ Ã¦Æ’â€¦Ã¥Â Â±Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¦Â©Å¸Ã¥Â¯â€ Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£ÂÂ«Ã£ÂÂ¯Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’Â¦Ã£Æ’Â¼Ã£â€šÂ¶Ã£Æ’Â¼Ã¥â€¦Â¥Ã¥Å â€ºÃ£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
- Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å’â€“Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ®Ã£ÂÂ¿Ã¤Â½Â¿Ã§â€Â¨
- CSRFÃ¤Â¿ÂÃ¨Â­Â·Ã£â€šâ€™Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“

## Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã¦Â§â€¹Ã©â‚¬Â 

```
src/
|-- app/              # Next.js App Router
|-- components/       # Ã¥â€ ÂÃ¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªUIÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’Ë†
|-- hooks/            # Ã£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â ReactÃ£Æ’â€¢Ã£Æ’Æ’Ã£â€šÂ¯
|-- lib/              # Ã£Æ’Â¦Ã£Æ’Â¼Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“Ã£Æ’Â©Ã£Æ’Âª
|-- types/            # TypeScriptÃ¥Â®Å¡Ã§Â¾Â©
```

## Ã¤Â¸Â»Ã¨Â¦ÂÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³

### APIÃ£Æ’Â¬Ã£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â³Ã£â€šÂ¹Ã¥Â½Â¢Ã¥Â¼Â

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

### Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°

```typescript
try {
  const result = await operation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  return { success: false, error: 'User-friendly message' }
}
```

## Ã§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°

```bash
# Ã¥Â¿â€¦Ã©Â Ë†
DATABASE_URL=
API_KEY=

# Ã£â€šÂªÃ£Æ’â€”Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³
DEBUG=false
```

## Ã¥Ë†Â©Ã§â€Â¨Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£â€šÂ³Ã£Æ’Å¾Ã£Æ’Â³Ã£Æ’â€°

- `/tdd` - Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã©Â§â€ Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢ÂºÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- `/plan` - Ã¥Â®Å¸Ã¨Â£â€¦Ã¨Â¨Ë†Ã§â€Â»Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
- `/code-review` - Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥â€œÂÃ¨Â³ÂªÃ£â€šâ€™Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
- `/build-fix` - Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šÂ¨Ã£Æ’Â©Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â¿Â®Ã¦Â­Â£

## GitÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼

- Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- mainÃ£ÂÂ«Ã§â€ºÂ´Ã¦Å½Â¥Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- PRÃ£ÂÂ«Ã£ÂÂ¯Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼Ã£ÂÅ’Ã¥Â¿â€¦Ã¨Â¦Â
- Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ¸Ã¥â€°ÂÃ£ÂÂ«Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã£Æ’â€ Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÅ’Ã¥ÂË†Ã¦Â Â¼Ã£Ââ„¢Ã£â€šâ€¹Ã¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹
