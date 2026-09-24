# Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¦Å’â€¡Ã¥Ââ€”

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


## Ã¥Â¼Â·Ã¥Ë†Â¶Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¦ÂªÂ¢Ã¦Å¸Â¥

Ã¤Â»Â»Ã¤Â½â€¢Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¯Â¼Å¡
- [ ] Ã¦Â²â€™Ã¦Å“â€°Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€žÃ¥Â¯â€ Ã©â€˜Â°Ã¯Â¼Ë†API Ã©â€¡â€˜Ã©â€˜Â°Ã£â‚¬ÂÃ¥Â¯â€ Ã§Â¢Â¼Ã£â‚¬ÂTokenÃ¯Â¼â€°
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¨Â¼Â¸Ã¥â€¦Â¥Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°
- [ ] SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã©ËœÂ²Ã¨Â­Â·Ã¯Â¼Ë†Ã¥ÂÆ’Ã¦â€¢Â¸Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â©Â¢Ã¯Â¼â€°
- [ ] XSS Ã©ËœÂ²Ã¨Â­Â·Ã¯Â¼Ë†Ã¦Â¸â€¦Ã§Ââ€ Ã©ÂÅ½Ã§Å¡â€ž HTMLÃ¯Â¼â€°
- [ ] Ã¥Â·Â²Ã¥â€¢Å¸Ã§â€Â¨ CSRF Ã¤Â¿ÂÃ¨Â­Â·
- [ ] Ã¥Â·Â²Ã©Â©â€”Ã¨Â­â€°Ã©Â©â€”Ã¨Â­â€°/Ã¦Å½Ë†Ã¦Â¬Å 
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã§Â«Â¯Ã©Â»Å¾Ã©Æ’Â½Ã¦Å“â€°Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
- [ ] Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¨Å Ã¦ÂÂ¯Ã¤Â¸ÂÃ¦Å“Æ’Ã¦Â´Â©Ã¦Â¼ÂÃ¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¦â€“â„¢

## Ã¥Â¯â€ Ã©â€˜Â°Ã§Â®Â¡Ã§Ââ€ 

```typescript
// Ã§Âµâ€¢Ã¤Â¸ÂÃ¯Â¼Å¡Ã¥Â¯Â«Ã¦Â­Â»Ã§Å¡â€žÃ¥Â¯â€ Ã©â€˜Â°
const apiKey = "sk-proj-xxxxx"

// Ã§Â¸Â½Ã¦ËœÂ¯Ã¯Â¼Å¡Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€ºÅ¾Ã¦â€¡â€°Ã¥Ââ€Ã¥Â®Å¡

Ã¥Â¦â€šÃ¦Å¾Å“Ã§â„¢Â¼Ã§ÂÂ¾Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¥â€¢ÂÃ©Â¡Å’Ã¯Â¼Å¡
1. Ã§Â«â€¹Ã¥ÂÂ³Ã¥ÂÅ“Ã¦Â­Â¢
2. Ã¤Â½Â¿Ã§â€Â¨ **security-reviewer** Agent
3. Ã¥Å“Â¨Ã§Â¹Â¼Ã§ÂºÅ’Ã¥â€°ÂÃ¤Â¿Â®Ã¥Â¾Â©Ã©â€”Å“Ã©ÂÂµÃ¥â€¢ÂÃ©Â¡Å’
4. Ã¨Â¼ÂªÃ¦Ââ€ºÃ¤Â»Â»Ã¤Â½â€¢Ã¦Å¡Â´Ã©Å“Â²Ã§Å¡â€žÃ¥Â¯â€ Ã©â€˜Â°
5. Ã¥Â¯Â©Ã¦Å¸Â¥Ã¦â€¢Â´Ã¥â‚¬â€¹Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥ÂºÂ«Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Å“â€°Ã©Â¡Å¾Ã¤Â¼Â¼Ã¥â€¢ÂÃ©Â¡Å’
