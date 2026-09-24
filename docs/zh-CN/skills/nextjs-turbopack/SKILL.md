---
name: nextjs-turbopack
description: Next.js 16+ Ã¥â€™Å’ Turbopack Ã¢â‚¬â€ Ã¥Â¢Å¾Ã©â€¡ÂÃ¦â€°â€œÃ¥Å’â€¦Ã£â‚¬ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã§Â¼â€œÃ¥Â­ËœÃ£â‚¬ÂÃ¥Â¼â‚¬Ã¥Ââ€˜Ã©â‚¬Å¸Ã¥ÂºÂ¦Ã¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÅ Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ Turbopack Ã¤Â¸Å½ webpackÃ£â‚¬â€š
origin: ECC
---

# Next.js Ã¤Â¸Å½ Turbopack

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


Next.js 16+ Ã¥Å“Â¨Ã¦Å“Â¬Ã¥Å“Â°Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¤Â¸Â­Ã©Â»ËœÃ¨Â®Â¤Ã¤Â½Â¿Ã§â€Â¨ TurbopackÃ¯Â¼Å¡Ã¨Â¿â„¢Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ§â€Â¨ Rust Ã§Â¼â€“Ã¥â€ â„¢Ã§Å¡â€žÃ¥Â¢Å¾Ã©â€¡ÂÃ¦Ââ€ Ã§Â»â€˜Ã¥â„¢Â¨Ã¯Â¼Å’Ã¨Æ’Â½Ã¦ËœÂ¾Ã¨â€˜â€”Ã¥Å Â Ã¥Â¿Â«Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¥ÂÂ¯Ã¥Å Â¨Ã¥â€™Å’Ã§Æ’Â­Ã¦â€ºÂ´Ã¦â€“Â°Ã§Å¡â€žÃ©â‚¬Å¸Ã¥ÂºÂ¦Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* **Turbopack (Ã©Â»ËœÃ¨Â®Â¤Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦Â¨Â¡Ã¥Â¼Â)**Ã¯Â¼Å¡Ã§â€Â¨Ã¤ÂºÅ½Ã¦â€”Â¥Ã¥Â¸Â¸Ã¥Â¼â‚¬Ã¥Ââ€˜Ã£â‚¬â€šÃ¥â€ Â·Ã¥ÂÂ¯Ã¥Å Â¨Ã¥â€™Å’Ã§Æ’Â­Ã¦Â¨Â¡Ã¥Ââ€”Ã¦â€ºÂ¿Ã¦ÂÂ¢Ã©â‚¬Å¸Ã¥ÂºÂ¦Ã¦â€ºÂ´Ã¥Â¿Â«Ã¯Â¼Å’Ã¥Â°Â¤Ã¥â€¦Â¶Ã¦ËœÂ¯Ã¥Å“Â¨Ã¥Â¤Â§Ã¥Å¾â€¹Ã¥Âºâ€Ã§â€Â¨Ã¤Â¸Â­Ã£â‚¬â€š
* **Webpack (Ã¦â€”Â§Ã§â€°Ë†Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦Â¨Â¡Ã¥Â¼Â)**Ã¯Â¼Å¡Ã¤Â»â€¦Ã¥Â½â€œÃ©Ââ€¡Ã¥Ë†Â° Turbopack Ã©â€â„¢Ã¨Â¯Â¯Ã¦Ë†â€“Ã¤Â¾ÂÃ¨Âµâ€“Ã¤Â»â€¦Ã¥Å“Â¨Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¤Â¸Â­Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€ž webpack Ã¦Ââ€™Ã¤Â»Â¶Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€šÃ¥ÂÂ¯Ã©â‚¬Å¡Ã¨Â¿â€¡ `--webpack`Ã¯Â¼Ë†Ã¦Ë†â€“ `--no-turbopack`Ã¯Â¼Å’Ã¥â€¦Â·Ã¤Â½â€œÃ¥Ââ€“Ã¥â€ Â³Ã¤ÂºÅ½Ã¤Â½Â Ã§Å¡â€ž Next.js Ã§â€°Ë†Ã¦Å“Â¬Ã¯Â¼â€ºÃ¨Â¯Â·Ã¦Å¸Â¥Ã©Ëœâ€¦Ã¤Â½Â Ã¦â€°â‚¬Ã§â€Â¨Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼â€°Ã¦ÂÂ¥Ã§Â¦ÂÃ§â€Â¨Ã£â‚¬â€š
* **Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’**Ã¯Â¼Å¡Ã§â€Å¸Ã¤ÂºÂ§Ã¦Å¾â€žÃ¥Â»ÂºÃ¨Â¡Å’Ã¤Â¸Âº (`next build`) Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â½Â¿Ã§â€Â¨ Turbopack Ã¦Ë†â€“ webpackÃ¯Â¼Å’Ã¨Â¿â„¢Ã¥Ââ€“Ã¥â€ Â³Ã¤ÂºÅ½ Next.js Ã§â€°Ë†Ã¦Å“Â¬Ã¯Â¼â€ºÃ¨Â¯Â·Ã¦Å¸Â¥Ã©Ëœâ€¦Ã¤Â½Â Ã¦â€°â‚¬Ã§â€Â¨Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¥Â®ËœÃ¦â€“Â¹ Next.js Ã¦â€“â€¡Ã¦Â¡Â£Ã£â‚¬â€š

Ã©â‚¬â€šÃ§â€Â¨Ã¥Å“ÂºÃ¦â„¢Â¯Ã¯Â¼Å¡Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦Ë†â€“Ã¨Â°Æ’Ã¨Â¯â€¢ Next.js 16+ Ã¥Âºâ€Ã§â€Â¨Ã¯Â¼Å’Ã¨Â¯Å Ã¦â€“Â­Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¥ÂÂ¯Ã¥Å Â¨Ã¦Ë†â€“Ã§Æ’Â­Ã¦Â¨Â¡Ã¥Ââ€”Ã¦â€ºÂ¿Ã¦ÂÂ¢Ã©â‚¬Å¸Ã¥ÂºÂ¦Ã¦â€¦Â¢Ã§Å¡â€žÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¦Ë†â€“Ã¤Â¼ËœÃ¥Å’â€“Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¦Ââ€ Ã§Â»â€˜Ã¥Å’â€¦Ã£â‚¬â€š

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

* **Turbopack**Ã¯Â¼Å¡Ã§â€Â¨Ã¤ÂºÅ½ Next.js Ã¥Â¼â‚¬Ã¥Ââ€˜Ã§Å¡â€žÃ¥Â¢Å¾Ã©â€¡ÂÃ¦Ââ€ Ã§Â»â€˜Ã¥â„¢Â¨Ã£â‚¬â€šÃ¥Ë†Â©Ã§â€Â¨Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã§Â¼â€œÃ¥Â­ËœÃ¯Â¼Å’Ã¥â€ºÂ Ã¦Â­Â¤Ã©â€¡ÂÃ¥ÂÂ¯Ã©â‚¬Å¸Ã¥ÂºÂ¦Ã¨Â¦ÂÃ¥Â¿Â«Ã¥Â¾â€”Ã¥Â¤Å¡Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€šÃ¯Â¼Å’Ã¥Å“Â¨Ã¥Â¤Â§Ã¥Å¾â€¹Ã©Â¡Â¹Ã§â€ºÂ®Ã¤Â¸Â­Ã¥Â¿Â« 5Ã¢â‚¬â€œ14 Ã¥â‚¬ÂÃ¯Â¼â€°Ã£â‚¬â€š
* **Ã¥Â¼â‚¬Ã¥Ââ€˜Ã§Å½Â¯Ã¥Â¢Æ’Ã©Â»ËœÃ¨Â®Â¤Ã¥ÂÂ¯Ã§â€Â¨**Ã¯Â¼Å¡Ã¤Â»Å½ Next.js 16 Ã¥Â¼â‚¬Ã¥Â§â€¹Ã¯Â¼Å’`next dev` Ã©Â»ËœÃ¨Â®Â¤Ã¤Â½Â¿Ã§â€Â¨ TurbopackÃ¯Â¼Å’Ã©â„¢Â¤Ã©ÂÅ¾Ã¨Â¢Â«Ã§Â¦ÂÃ§â€Â¨Ã£â‚¬â€š
* **Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã§Â¼â€œÃ¥Â­Ëœ**Ã¯Â¼Å¡Ã©â€¡ÂÃ¥ÂÂ¯Ã¦â€”Â¶Ã¤Â¼Å¡Ã¥Â¤ÂÃ§â€Â¨Ã¤Â¹â€¹Ã¥â€°ÂÃ§Å¡â€žÃ¥Â·Â¥Ã¤Â½Å“Ã¦Ë†ÂÃ¦Å¾Å“Ã¯Â¼â€ºÃ§Â¼â€œÃ¥Â­ËœÃ©â‚¬Å¡Ã¥Â¸Â¸Ã¤Â½ÂÃ¤ÂºÅ½ `.next` Ã¤Â¸â€¹Ã¯Â¼â€ºÃ¥Å¸ÂºÃ¦Å“Â¬Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â Ã©Å“â‚¬Ã©Â¢ÂÃ¥Â¤â€“Ã©â€¦ÂÃ§Â½Â®Ã£â‚¬â€š
* **Ã¦Ââ€ Ã§Â»â€˜Ã¥Å’â€¦Ã¥Ë†â€ Ã¦Å¾ÂÃ¥â„¢Â¨ (Next.js 16.1+)**Ã¯Â¼Å¡Ã¥Â®Å¾Ã©ÂªÅ’Ã¦â‚¬Â§Ã§Å¡â€žÃ¦Ââ€ Ã§Â»â€˜Ã¥Å’â€¦Ã¥Ë†â€ Ã¦Å¾ÂÃ¥â„¢Â¨Ã¯Â¼Å’Ã§â€Â¨Ã¤ÂºÅ½Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¨Â¾â€œÃ¥â€¡ÂºÃ¥Â¹Â¶Ã¥Ââ€˜Ã§Å½Â°Ã©â€¡ÂÃ¥Å¾â€¹Ã¤Â¾ÂÃ¨Âµâ€“Ã¯Â¼â€ºÃ¥ÂÂ¯Ã©â‚¬Å¡Ã¨Â¿â€¡Ã©â€¦ÂÃ§Â½Â®Ã¦Ë†â€“Ã¥Â®Å¾Ã©ÂªÅ’Ã¦â‚¬Â§Ã¦Â â€¡Ã¥Â¿â€”Ã¥ÂÂ¯Ã§â€Â¨Ã¯Â¼Ë†Ã¨Â¯Â·Ã¦Å¸Â¥Ã©Ëœâ€¦Ã¤Â½Â Ã¦â€°â‚¬Ã§â€Â¨Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€ž Next.js Ã¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼â€°Ã£â‚¬â€š

## Ã§Â¤ÂºÃ¤Â¾â€¹

### Ã¥â€˜Â½Ã¤Â»Â¤

```bash
next dev
next build
next start
```

### Ã¤Â½Â¿Ã§â€Â¨

Ã¨Â¿ÂÃ¨Â¡Å’ `next dev` Ã¤Â»Â¥Ã¤Â½Â¿Ã§â€Â¨ Turbopack Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å“Â¬Ã¥Å“Â°Ã¥Â¼â‚¬Ã¥Ââ€˜Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨Ã¦Ââ€ Ã§Â»â€˜Ã¥Å’â€¦Ã¥Ë†â€ Ã¦Å¾ÂÃ¥â„¢Â¨Ã¯Â¼Ë†Ã¥Ââ€šÃ¨Â§Â Next.js Ã¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼â€°Ã¦ÂÂ¥Ã¤Â¼ËœÃ¥Å’â€“Ã¤Â»Â£Ã§Â ÂÃ¥Ë†â€ Ã¥â€°Â²Ã¥Â¹Â¶Ã¥â€°â€Ã©â„¢Â¤Ã¥Â¤Â§Ã¥Å¾â€¹Ã¤Â¾ÂÃ¨Âµâ€“Ã£â‚¬â€šÃ¥Â°Â½Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ App Router Ã¥â€™Å’Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â»â€žÃ¤Â»Â¶Ã£â‚¬â€š

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

* Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â½Â¿Ã§â€Â¨Ã¨Â¾Æ’Ã¦â€“Â°Ã§Å¡â€ž Next.js 16.x Ã§â€°Ë†Ã¦Å“Â¬Ã¯Â¼Å’Ã¤Â»Â¥Ã¨Å½Â·Ã¥Â¾â€”Ã§Â¨Â³Ã¥Â®Å¡Ã§Å¡â€ž Turbopack Ã¥â€™Å’Ã§Â¼â€œÃ¥Â­ËœÃ¨Â¡Å’Ã¤Â¸ÂºÃ£â‚¬â€š
* Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Â¼â‚¬Ã¥Ââ€˜Ã©â‚¬Å¸Ã¥ÂºÂ¦Ã¦â€¦Â¢Ã¯Â¼Å’Ã¨Â¯Â·Ã§Â¡Â®Ã¤Â¿ÂÃ¤Â½Â Ã¦Â­Â£Ã¥Å“Â¨Ã¤Â½Â¿Ã§â€Â¨ TurbopackÃ¯Â¼Ë†Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€°Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â¸â€Ã§Â¼â€œÃ¥Â­ËœÃ¦Â²Â¡Ã¦Å“â€°Ã¨Â¢Â«Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ¥Å“Â°Ã¦Â¸â€¦Ã©â„¢Â¤Ã£â‚¬â€š
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¦Ââ€ Ã§Â»â€˜Ã¥Å’â€¦Ã¥Â¤Â§Ã¥Â°ÂÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨Ã¤Â½Â Ã¦â€°â‚¬Ã§â€Â¨Ã§â€°Ë†Ã¦Å“Â¬Ã§Å¡â€žÃ¥Â®ËœÃ¦â€“Â¹ Next.js Ã¦Ââ€ Ã§Â»â€˜Ã¥Å’â€¦Ã¥Ë†â€ Ã¦Å¾ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã£â‚¬â€š
