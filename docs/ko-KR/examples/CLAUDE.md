# Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ CLAUDE.md Ã¬ËœË†Ã¬Â Å“

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


Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã¬Ë†ËœÃ¬Â¤â‚¬Ã¬ÂËœ CLAUDE.md Ã­Å’Å’Ã¬ÂÂ¼ Ã¬ËœË†Ã¬Â Å“Ã¬Å¾â€¦Ã«â€¹Ë†Ã«â€¹Â¤. Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã«Â£Â¨Ã­Å Â¸Ã¬â€”Â Ã«Â°Â°Ã¬Â¹ËœÃ­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€.

## Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ ÃªÂ°Å“Ã¬Å¡â€

[Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ ÃªÂ°â€žÃ«â€¹Â¨Ã­â€¢Å“ Ã¬â€žÂ¤Ã«Âªâ€¦ - ÃªÂ¸Â°Ã«Å Â¥, ÃªÂ¸Â°Ã¬Ë†Â  Ã¬Å Â¤Ã­Æ’Â]

## Ã­â€¢ÂµÃ¬â€¹Â¬ ÃªÂ·Å“Ã¬Â¹â„¢

### 1. Ã¬Â½â€Ã«â€œÅ“ ÃªÂµÂ¬Ã¬â€žÂ±

- Ã­ÂÂ° Ã­Å’Å’Ã¬ÂÂ¼ Ã¬â€ Å’Ã¬Ë†ËœÃ«Â³Â´Ã«â€¹Â¤ Ã¬Å¾â€˜Ã¬Ââ‚¬ Ã­Å’Å’Ã¬ÂÂ¼ Ã«â€¹Â¤Ã¬Ë†ËœÃ«Â¥Â¼ Ã¬â€žÂ Ã­ËœÂ¸
- Ã«â€ â€™Ã¬Ââ‚¬ Ã¬Ââ€˜Ã¬Â§â€˜Ã«Ââ€ž, Ã«â€šÂ®Ã¬Ââ‚¬ ÃªÂ²Â°Ã­â€¢Â©Ã«Ââ€ž
- Ã¬ÂÂ¼Ã«Â°ËœÃ¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ 200-400Ã¬Â¤â€ž, Ã­Å’Å’Ã¬ÂÂ¼Ã«â€¹Â¹ Ã¬ÂµÅ“Ã«Å’â‚¬ 800Ã¬Â¤â€ž
- Ã­Æ’â‚¬Ã¬Å¾â€¦Ã«Â³â€žÃ¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’ ÃªÂ¸Â°Ã«Å Â¥/Ã«Ââ€žÃ«Â©â€Ã¬ÂÂ¸Ã«Â³â€žÃ«Â¡Å“ ÃªÂµÂ¬Ã¬â€žÂ±

### 2. Ã¬Â½â€Ã«â€œÅ“ Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼

- Ã¬Â½â€Ã«â€œÅ“, Ã¬Â£Â¼Ã¬â€žÂ, Ã«Â¬Â¸Ã¬â€žÅ“Ã¬â€”Â Ã¬ÂÂ´Ã«ÂªÂ¨Ã¬Â§â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬
- Ã­â€¢Â­Ã¬Æ’Â Ã«Â¶Ë†Ã«Â³â‚¬Ã¬â€žÂ± Ã¬Å“Â Ã¬Â§â‚¬ - ÃªÂ°ÂÃ¬Â²Â´Ã«â€šËœ Ã«Â°Â°Ã¬â€”Â´Ã¬Ââ€ž Ã¬Â§ÂÃ¬Â â€˜ Ã«Â³â‚¬ÃªÂ²Â½Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã¬ÂÅ’
- Ã­â€â€žÃ«Â¡Å“Ã«Ââ€¢Ã¬â€¦Ëœ Ã¬Â½â€Ã«â€œÅ“Ã¬â€”Â console.log Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬
- try/catchÃ«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Å“ Ã¬Â ÂÃ¬Â Ë†Ã­â€¢Å“ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â²ËœÃ«Â¦Â¬
- Zod Ã«ËœÂÃ«Å â€ Ã¬Å“Â Ã¬â€šÂ¬ Ã«ÂÂ¼Ã¬ÂÂ´Ã«Â¸Å’Ã«Å¸Â¬Ã«Â¦Â¬Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Å“ Ã¬Å¾â€¦Ã«Â Â¥ Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬â€šÂ¬

### 3. Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸

- TDD: Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬Å¾â€˜Ã¬â€žÂ±
- Ã¬ÂµÅ“Ã¬â€ Å’ 80% Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬
- Ã¬Å“Â Ã­â€¹Â¸Ã«Â¦Â¬Ã­â€¹Â°Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã«â€¹Â¨Ã¬Å“â€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸
- APIÃ¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸
- Ã­â€¢ÂµÃ¬â€¹Â¬ Ã­ÂÂÃ«Â¦â€žÃ¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ E2E Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸

### 4. Ã«Â³Â´Ã¬â€¢Ë†

- Ã­â€¢ËœÃ«â€œÅ“Ã¬Â½â€Ã«â€Â©Ã«ÂÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ ÃªÂ¸Ë†Ã¬Â§â‚¬
- Ã«Â¯Â¼ÃªÂ°ÂÃ­â€¢Å“ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Å â€ Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€šÂ¬Ã¬Å¡Â©Ã¬Å¾Â Ã¬Å¾â€¦Ã«Â Â¥ Ã¬Å“Â Ã­Å¡Â¨Ã¬â€žÂ± ÃªÂ²â‚¬Ã¬â€šÂ¬
- Ã«Â§Â¤ÃªÂ°Å“Ã«Â³â‚¬Ã¬Ë†ËœÃ­â„¢â€Ã«ÂÅ“ Ã¬Â¿Â¼Ã«Â¦Â¬Ã«Â§Å’ Ã¬â€šÂ¬Ã¬Å¡Â©
- CSRF Ã«Â³Â´Ã­ËœÂ¸ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€

## Ã­Å’Å’Ã¬ÂÂ¼ ÃªÂµÂ¬Ã¬Â¡Â°

```
src/
|-- app/              # Next.js app router
|-- components/       # Ã¬Å¾Â¬Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ UI Ã¬Â»Â´Ã­ÂÂ¬Ã«â€žÅ’Ã­Å Â¸
|-- hooks/            # Ã¬Â»Â¤Ã¬Å Â¤Ã­â€¦â‚¬ React hooks
|-- lib/              # Ã¬Å“Â Ã­â€¹Â¸Ã«Â¦Â¬Ã­â€¹Â° Ã«ÂÂ¼Ã¬ÂÂ´Ã«Â¸Å’Ã«Å¸Â¬Ã«Â¦Â¬
|-- types/            # TypeScript Ã­Æ’â‚¬Ã¬Å¾â€¦ Ã¬Â â€¢Ã¬ÂËœ
```

## Ã¬Â£Â¼Ã¬Å¡â€ Ã­Å’Â¨Ã­â€žÂ´

### API Ã¬Ââ€˜Ã«â€¹Âµ Ã­Ëœâ€¢Ã¬â€¹Â

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

### Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â²ËœÃ«Â¦Â¬

```typescript
try {
  const result = await operation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  return { success: false, error: 'User-friendly message' }
}
```

## Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ

```bash
# Ã­â€¢â€žÃ¬Ë†Ëœ
DATABASE_URL=
API_KEY=

# Ã¬â€žÂ Ã­Æ’Â
DEBUG=false
```

## Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ Ã«Âªâ€¦Ã«Â Â¹Ã¬â€“Â´

- `/tdd` - Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â£Â¼Ã«Ââ€ž ÃªÂ°Å“Ã«Â°Å“ Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°
- `/plan` - ÃªÂµÂ¬Ã­Ëœâ€ž ÃªÂ³â€žÃ­Å¡Â Ã¬Æ’ÂÃ¬â€žÂ±
- `/code-review` - Ã¬Â½â€Ã«â€œÅ“ Ã­â€™Ë†Ã¬Â§Ë† Ã«Â¦Â¬Ã«Â·Â°
- `/build-fix` - Ã«Â¹Å’Ã«â€œÅ“ Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Ë†ËœÃ¬Â â€¢

## Git Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- main Ã«Â¸Å’Ã«Å¾Å“Ã¬Â¹ËœÃ¬â€”Â Ã¬Â§ÂÃ¬Â â€˜ Ã¬Â»Â¤Ã«Â°â€¹ ÃªÂ¸Ë†Ã¬Â§â‚¬
- PRÃ¬Ââ‚¬ Ã«Â¦Â¬Ã«Â·Â° Ã­â€¢â€žÃ¬Ë†Ëœ
- Ã«Â³â€˜Ã­â€¢Â© Ã¬Â â€ž Ã«ÂªÂ¨Ã«â€œÂ  Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã­â€ ÂµÃªÂ³Â¼ Ã­â€¢â€žÃ¬Ë†Ëœ
