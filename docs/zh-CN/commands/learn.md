# /learn - Ã¦ÂÂÃ¥Ââ€“Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã¦Â¨Â¡Ã¥Â¼Â

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


Ã¥Ë†â€ Ã¦Å¾ÂÃ¥Â½â€œÃ¥â€°ÂÃ¤Â¼Å¡Ã¨Â¯ÂÃ¯Â¼Å’Ã¦ÂÂÃ¥Ââ€“Ã¥â‚¬Â¼Ã¥Â¾â€”Ã¤Â¿ÂÃ¥Â­ËœÃ¤Â¸ÂºÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€š

## Ã¨Â§Â¦Ã¥Ââ€˜Ã¦â€”Â¶Ã¦Å“Âº

Ã¥Å“Â¨Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦Å“Å¸Ã©â€”Â´Ã§Å¡â€žÃ¤Â»Â»Ã¤Â½â€¢Ã¦â€”Â¶Ã¥Ë†Â»Ã¯Â¼Å’Ã¥Â½â€œÃ¤Â½Â Ã¨Â§Â£Ã¥â€ Â³Ã¤Âºâ€ Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ©ÂÅ¾Ã¥Â¹Â³Ã¥â€¡Â¡Ã©â€”Â®Ã©Â¢ËœÃ¦â€”Â¶Ã¯Â¼Å’Ã¨Â¿ÂÃ¨Â¡Å’ `/learn`Ã£â‚¬â€š

## Ã¦ÂÂÃ¥Ââ€“Ã¥â€ â€¦Ã¥Â®Â¹

Ã¥Â¯Â»Ã¦â€°Â¾Ã¯Â¼Å¡

1. **Ã©â€â„¢Ã¨Â¯Â¯Ã¨Â§Â£Ã¥â€ Â³Ã¦Â¨Â¡Ã¥Â¼Â**
   * Ã¥â€¡ÂºÃ§Å½Â°Ã¤Âºâ€ Ã¤Â»â‚¬Ã¤Â¹Ë†Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¸
   * Ã¦Â Â¹Ã¦Å“Â¬Ã¥Å½Å¸Ã¥â€ºÂ Ã¦ËœÂ¯Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¯Â¼Å¸
   * Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¦â€“Â¹Ã¦Â³â€¢Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Âºâ€ Ã¥Â®Æ’Ã¯Â¼Å¸
   * Ã¨Â¿â„¢Ã¥Â¯Â¹Ã¨Â§Â£Ã¥â€ Â³Ã§Â±Â»Ã¤Â¼Â¼Ã©â€â„¢Ã¨Â¯Â¯Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã¯Â¼Å¸

2. **Ã¨Â°Æ’Ã¨Â¯â€¢Ã¦Å â‚¬Ã¦Å“Â¯**
   * Ã¤Â¸ÂÃ¦ËœÅ½Ã¦ËœÂ¾Ã§Å¡â€žÃ¨Â°Æ’Ã¨Â¯â€¢Ã¦Â­Â¥Ã©ÂªÂ¤
   * Ã¦Å“â€°Ã¦â€¢Ë†Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã§Â»â€žÃ¥ÂË†
   * Ã¨Â¯Å Ã¦â€“Â­Ã¦Â¨Â¡Ã¥Â¼Â

3. **Ã¥ÂËœÃ©â‚¬Å¡Ã¦â€“Â¹Ã¦Â³â€¢**
   * Ã¥Âºâ€œÃ§Å¡â€žÃ¦â‚¬ÂªÃ§â„¢â€“
   * API Ã©â„¢ÂÃ¥Ë†Â¶
   * Ã§â€°Â¹Ã¥Â®Å¡Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤Â

4. **Ã©Â¡Â¹Ã§â€ºÂ®Ã§â€°Â¹Ã¥Â®Å¡Ã¦Â¨Â¡Ã¥Â¼Â**
   * Ã¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ§ÂºÂ¦Ã¥Â®Å¡
   * Ã¥ÂÅ¡Ã¥â€¡ÂºÃ§Å¡â€žÃ¦Å¾Â¶Ã¦Å¾â€žÃ¥â€ Â³Ã§Â­â€“
   * Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Â¨Â¡Ã¥Â¼Â

## Ã¨Â¾â€œÃ¥â€¡ÂºÃ¦Â Â¼Ã¥Â¼Â

Ã¥Å“Â¨ `~/.claude/skills/learned/[pattern-name].md` Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

```markdown
# [Descriptive Pattern Name]

**Extracted:** [Date]
**Context:** [Brief description of when this applies]

## Problem
[What problem this solves - be specific]

## Solution
[The pattern/technique/workaround]

## Example
[Code example if applicable]

## When to Use
[Trigger conditions - what should activate this skill]
```

## Ã¦ÂµÂÃ§Â¨â€¹

1. Ã¥â€ºÅ¾Ã©Â¡Â¾Ã¤Â¼Å¡Ã¨Â¯ÂÃ¯Â¼Å’Ã¥Â¯Â»Ã¦â€°Â¾Ã¥ÂÂ¯Ã¦ÂÂÃ¥Ââ€“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
2. Ã¨Â¯â€ Ã¥Ë†Â«Ã¦Å“â‚¬Ã¦Å“â€°Ã¤Â»Â·Ã¥â‚¬Â¼/Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã§Å¡â€žÃ¨Â§ÂÃ¨Â§Â£
3. Ã¨ÂµÂ·Ã¨Ââ€°Ã¦Å â‚¬Ã¨Æ’Â½Ã¦â€“â€¡Ã¤Â»Â¶
4. Ã¥Å“Â¨Ã¤Â¿ÂÃ¥Â­ËœÃ¥â€°ÂÃ¨Â¯Â·Ã§â€Â¨Ã¦Ë†Â·Ã§Â¡Â®Ã¨Â®Â¤
5. Ã¤Â¿ÂÃ¥Â­ËœÃ¥Ë†Â° `~/.claude/skills/learned/`

## Ã¦Â³Â¨Ã¦â€žÂÃ¤Âºâ€¹Ã©Â¡Â¹

* Ã¤Â¸ÂÃ¨Â¦ÂÃ¦ÂÂÃ¥Ââ€“Ã§ÂÂÃ§Â¢Å½Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Ë†Ã¦â€¹Â¼Ã¥â€ â„¢Ã©â€â„¢Ã¨Â¯Â¯Ã£â‚¬ÂÃ§Â®â‚¬Ã¥Ââ€¢Ã§Å¡â€žÃ¨Â¯Â­Ã¦Â³â€¢Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼â€°
* Ã¤Â¸ÂÃ¨Â¦ÂÃ¦ÂÂÃ¥Ââ€“Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¦â‚¬Â§Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Ë†Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€ž API Ã¤Â¸Â­Ã¦â€“Â­Ã§Â­â€°Ã¯Â¼â€°
* Ã¤Â¸â€œÃ¦Â³Â¨Ã¤ÂºÅ½Ã©â€šÂ£Ã¤Âºâ€ºÃ¥Â°â€ Ã¥Å“Â¨Ã¦Å“ÂªÃ¦ÂÂ¥Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Â­Ã¨Å â€šÃ§Å“ÂÃ¦â€”Â¶Ã©â€”Â´Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ¤Â¸â€œÃ¦Â³Â¨Ã¦â‚¬Â§ - Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã¥Â¯Â¹Ã¥Âºâ€Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Â¨Â¡Ã¥Â¼Â
