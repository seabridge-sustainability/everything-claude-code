# Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã©Â¢Â¨Ã¦Â Â¼

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¨Â®Å Ã¦â‚¬Â§Ã¯Â¼Ë†Ã©â€”Å“Ã©ÂÂµÃ¯Â¼â€°

Ã§Â¸Â½Ã¦ËœÂ¯Ã¥Â»ÂºÃ§Â«â€¹Ã¦â€“Â°Ã§â€°Â©Ã¤Â»Â¶Ã¯Â¼Å’Ã§Âµâ€¢Ã¤Â¸ÂÃ¨Â®Å Ã§â€¢Â°Ã¯Â¼Å¡

```javascript
// Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã¨Â®Å Ã§â€¢Â°
function updateUser(user, name) {
  user.name = name  // Ã¨Â®Å Ã§â€¢Â°Ã¯Â¼Â
  return user
}

// Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã¤Â¸ÂÃ¥ÂÂ¯Ã¨Â®Å Ã¦â‚¬Â§
function updateUser(user, name) {
  return {
    ...user,
    name
  }
}
```

## Ã¦Âªâ€Ã¦Â¡Ë†Ã§Âµâ€žÃ§Â¹â€

Ã¥Â¤Å¡Ã¥Â°ÂÃ¦Âªâ€Ã¦Â¡Ë† > Ã¥Â°â€˜Ã¥Â¤Â§Ã¦Âªâ€Ã¦Â¡Ë†Ã¯Â¼Å¡
- Ã©Â«ËœÃ¥â€¦Â§Ã¨ÂÅ¡Ã£â‚¬ÂÃ¤Â½Å½Ã¨â‚¬Â¦Ã¥ÂË†
- Ã©â‚¬Å¡Ã¥Â¸Â¸ 200-400 Ã¨Â¡Å’Ã¯Â¼Å’Ã¦Å“â‚¬Ã¥Â¤Å¡ 800 Ã¨Â¡Å’
- Ã¥Â¾Å¾Ã¥Â¤Â§Ã¥Å¾â€¹Ã¥â€¦Æ’Ã¤Â»Â¶Ã¤Â¸Â­Ã¦Å Â½Ã¥Ââ€“Ã¥Â·Â¥Ã¥â€¦Â·
- Ã¤Â¾ÂÃ¥Å Å¸Ã¨Æ’Â½/Ã©Â ËœÃ¥Å¸Å¸Ã§Âµâ€žÃ§Â¹â€Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¤Â¾ÂÃ©Â¡Å¾Ã¥Å¾â€¹

## Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 

Ã§Â¸Â½Ã¦ËœÂ¯Ã¥â€¦Â¨Ã©ÂÂ¢Ã¨â„¢â€¢Ã§Ââ€ Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('Detailed user-friendly message')
}
```

## Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â©â€”Ã¨Â­â€°

Ã§Â¸Â½Ã¦ËœÂ¯Ã©Â©â€”Ã¨Â­â€°Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¼Â¸Ã¥â€¦Â¥Ã¯Â¼Å¡

```typescript
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  age: z.number().int().min(0).max(150)
})

const validated = schema.parse(input)
```

## Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥â€œÂÃ¨Â³ÂªÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥â€“Â®

Ã¥Å“Â¨Ã¦Â¨â„¢Ã¨Â¨ËœÃ¥Â·Â¥Ã¤Â½Å“Ã¥Â®Å’Ã¦Ë†ÂÃ¥â€°ÂÃ¯Â¼Å¡
- [ ] Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂÂ¯Ã¨Â®â‚¬Ã¤Â¸â€Ã¥â€˜Â½Ã¥ÂÂÃ¨â€°Â¯Ã¥Â¥Â½
- [ ] Ã¥â€¡Â½Ã¥Â¼ÂÃ¥Â°ÂÃ¯Â¼Ë†<50 Ã¨Â¡Å’Ã¯Â¼â€°
- [ ] Ã¦Âªâ€Ã¦Â¡Ë†Ã¥Â°Ë†Ã¦Â³Â¨Ã¯Â¼Ë†<800 Ã¨Â¡Å’Ã¯Â¼â€°
- [ ] Ã¦Â²â€™Ã¦Å“â€°Ã¦Â·Â±Ã¥Â±Â¤Ã¥Â·Â¢Ã§â€¹â‚¬Ã¯Â¼Ë†>4 Ã¥Â±Â¤Ã¯Â¼â€°
- [ ] Ã©ÂÂ©Ã§â€¢Â¶Ã§Å¡â€žÃ©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ 
- [ ] Ã¦Â²â€™Ã¦Å“â€° console.log Ã©â„¢Â³Ã¨Â¿Â°Ã¥Â¼Â
- [ ] Ã¦Â²â€™Ã¦Å“â€°Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€žÃ¥â‚¬Â¼
- [ ] Ã¦Â²â€™Ã¦Å“â€°Ã¨Â®Å Ã§â€¢Â°Ã¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÂ¯Ã¨Â®Å Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼â€°
