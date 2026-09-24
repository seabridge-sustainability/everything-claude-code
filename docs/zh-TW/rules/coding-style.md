# Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã©Â¢Â¨Ã¦Â Â¼

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


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
