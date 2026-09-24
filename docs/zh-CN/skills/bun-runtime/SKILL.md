---
name: bun-runtime
description: Bun Ã¤Â½Å“Ã¤Â¸ÂºÃ¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã£â‚¬ÂÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã£â‚¬ÂÃ¦â€°â€œÃ¥Å’â€¦Ã¥â„¢Â¨Ã¥â€™Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¥â„¢Â¨Ã£â‚¬â€šÃ¤Â½â€¢Ã¦â€”Â¶Ã©â‚¬â€°Ã¦â€¹Â© Bun Ã¨â‚¬Å’Ã©ÂÅ¾ NodeÃ£â‚¬ÂÃ¨Â¿ÂÃ§Â§Â»Ã¦Â³Â¨Ã¦â€žÂÃ¤Âºâ€¹Ã©Â¡Â¹Ã¤Â»Â¥Ã¥ÂÅ  Vercel Ã¦â€Â¯Ã¦Å’ÂÃ£â‚¬â€š
origin: ECC
---

# Bun Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶

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


Bun Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â¿Â«Ã©â‚¬Å¸Ã§Å¡â€žÃ¥â€¦Â¨Ã¨Æ’Â½ JavaScript Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¥â€™Å’Ã¥Â·Â¥Ã¥â€¦Â·Ã©â€ºâ€ Ã¯Â¼Å¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã£â‚¬ÂÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã£â‚¬ÂÃ¦â€°â€œÃ¥Å’â€¦Ã¥â„¢Â¨Ã¥â€™Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¥â„¢Â¨Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* **Ã¤Â¼ËœÃ¥â€¦Ë†Ã©â‚¬â€°Ã¦â€¹Â© Bun** Ã§â€Â¨Ã¤ÂºÅ½Ã¯Â¼Å¡Ã¦â€“Â°Ã§Å¡â€ž JS/TS Ã©Â¡Â¹Ã§â€ºÂ®Ã£â‚¬ÂÃ¥Â®â€°Ã¨Â£â€¦/Ã¨Â¿ÂÃ¨Â¡Å’Ã©â‚¬Å¸Ã¥ÂºÂ¦Ã¥Â¾Ë†Ã©â€¡ÂÃ¨Â¦ÂÃ§Å¡â€žÃ¨â€žÅ¡Ã¦Å“Â¬Ã£â‚¬ÂÃ¤Â½Â¿Ã§â€Â¨ Bun Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã§Å¡â€ž Vercel Ã©Æ’Â¨Ã§Â½Â²Ã¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÅ Ã¥Â½â€œÃ¦â€šÂ¨Ã¦Æ’Â³Ã¨Â¦ÂÃ¥Ââ€¢Ã¤Â¸â‚¬Ã¥Â·Â¥Ã¥â€¦Â·Ã©â€œÂ¾Ã¯Â¼Ë†Ã¨Â¿ÂÃ¨Â¡Å’ + Ã¥Â®â€°Ã¨Â£â€¦ + Ã¦Âµâ€¹Ã¨Â¯â€¢ + Ã¦Å¾â€žÃ¥Â»ÂºÃ¯Â¼â€°Ã¦â€”Â¶Ã£â‚¬â€š
* **Ã¤Â¼ËœÃ¥â€¦Ë†Ã©â‚¬â€°Ã¦â€¹Â© Node** Ã§â€Â¨Ã¤ÂºÅ½Ã¯Â¼Å¡Ã¦Å“â‚¬Ã¥Â¤Â§Ã§Å¡â€žÃ§â€Å¸Ã¦â‚¬ÂÃ§Â³Â»Ã§Â»Å¸Ã¥â€¦Â¼Ã¥Â®Â¹Ã¦â‚¬Â§Ã£â‚¬ÂÃ¥Ââ€¡Ã¥Â®Å¡Ã¤Â½Â¿Ã§â€Â¨ Node Ã§Å¡â€žÃ©Ââ€”Ã§â€¢â„¢Ã¥Â·Â¥Ã¥â€¦Â·Ã¯Â¼Å’Ã¦Ë†â€“Ã¨â‚¬â€¦Ã¥Â½â€œÃ¦Å¸ÂÃ¤Â¸ÂªÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¥Â­ËœÃ¥Å“Â¨Ã¥Â·Â²Ã§Å¸Â¥Ã§Å¡â€ž Bun Ã©â€”Â®Ã©Â¢ËœÃ¦â€”Â¶Ã£â‚¬â€š

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡Ã©â€¡â€¡Ã§â€Â¨ BunÃ£â‚¬ÂÃ¤Â»Å½ Node Ã¨Â¿ÂÃ§Â§Â»Ã£â‚¬ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¦Ë†â€“Ã¨Â°Æ’Ã¨Â¯â€¢ Bun Ã¨â€žÅ¡Ã¦Å“Â¬/Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¦Ë†â€“Ã¥Å“Â¨ Vercel Ã¦Ë†â€“Ã¥â€¦Â¶Ã¤Â»â€“Ã¥Â¹Â³Ã¥ÂÂ°Ã¤Â¸Å Ã©â€¦ÂÃ§Â½Â® BunÃ£â‚¬â€š

## Ã¥Â·Â¥Ã¤Â½Å“Ã¥Å½Å¸Ã§Ââ€ 

* **Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶**Ã¯Â¼Å¡Ã¥Â¼â‚¬Ã§Â®Â±Ã¥ÂÂ³Ã§â€Â¨Ã§Å¡â€ž Node Ã¥â€¦Â¼Ã¥Â®Â¹Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¯Â¼Ë†Ã¥Å¸ÂºÃ¤ÂºÅ½ JavaScriptCoreÃ¯Â¼Å’Ã§â€Â¨ Zig Ã¥Â®Å¾Ã§Å½Â°Ã¯Â¼â€°Ã£â‚¬â€š
* **Ã¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨**Ã¯Â¼Å¡`bun install` Ã¦Â¯â€ npm/yarn Ã¥Â¿Â«Ã¥Â¾â€”Ã¥Â¤Å¡Ã£â‚¬â€šÃ¥Å“Â¨Ã¥Â½â€œÃ¥â€°Â Bun Ã¤Â¸Â­Ã¯Â¼Å’Ã©â€ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã©Â»ËœÃ¨Â®Â¤Ã¤Â¸Âº `bun.lock`Ã¯Â¼Ë†Ã¦â€“â€¡Ã¦Å“Â¬Ã¯Â¼â€°Ã¯Â¼â€ºÃ¦â€”Â§Ã§â€°Ë†Ã¦Å“Â¬Ã¤Â½Â¿Ã§â€Â¨ `bun.lockb`Ã¯Â¼Ë†Ã¤ÂºÅ’Ã¨Â¿â€ºÃ¥Ë†Â¶Ã¯Â¼â€°Ã£â‚¬â€š
* **Ã¦â€°â€œÃ¥Å’â€¦Ã¥â„¢Â¨**Ã¯Â¼Å¡Ã§â€Â¨Ã¤ÂºÅ½Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ¥â€™Å’Ã¥Âºâ€œÃ§Å¡â€žÃ¥â€ â€¦Ã§Â½Â®Ã¦â€°â€œÃ¥Å’â€¦Ã¥â„¢Â¨Ã¥â€™Å’Ã¨Â½Â¬Ã¨Â¯â€˜Ã¥â„¢Â¨Ã£â‚¬â€š
* **Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¥â„¢Â¨**Ã¯Â¼Å¡Ã¥â€ â€¦Ã§Â½Â®Ã§Å¡â€ž `bun test`Ã¯Â¼Å’Ã¥â€¦Â·Ã¦Å“â€°Ã§Â±Â»Ã¤Â¼Â¼ Jest Ã§Å¡â€ž APIÃ£â‚¬â€š

**Ã¤Â»Å½ Node Ã¨Â¿ÂÃ§Â§Â»**Ã¯Â¼Å¡Ã¥Â°â€  `node script.js` Ã¦â€ºÂ¿Ã¦ÂÂ¢Ã¤Â¸Âº `bun run script.js` Ã¦Ë†â€“ `bun script.js`Ã£â‚¬â€šÃ¨Â¿ÂÃ¨Â¡Å’ `bun install` Ã¤Â»Â£Ã¦â€ºÂ¿ `npm install`Ã¯Â¼â€ºÃ¥Â¤Â§Ã¥Â¤Å¡Ã¦â€¢Â°Ã¥Å’â€¦Ã©Æ’Â½Ã¨Æ’Â½Ã¥Â·Â¥Ã¤Â½Å“Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨ `bun run` Ã¦ÂÂ¥Ã¦â€°Â§Ã¨Â¡Å’ npm Ã¨â€žÅ¡Ã¦Å“Â¬Ã¯Â¼â€ºÃ¤Â½Â¿Ã§â€Â¨ `bun x` Ã¨Â¿â€ºÃ¨Â¡Å’ npx Ã©Â£Å½Ã¦Â Â¼Ã§Å¡â€žÃ¤Â¸Â´Ã¦â€”Â¶Ã¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€šÃ¦â€Â¯Ã¦Å’Â Node Ã¥â€ â€¦Ã§Â½Â®Ã¦Â¨Â¡Ã¥Ââ€”Ã¯Â¼â€ºÃ¥Å“Â¨Ã¥Â­ËœÃ¥Å“Â¨ Bun API Ã§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Â®Æ’Ã¤Â»Â¬Ã¤Â»Â¥Ã¨Å½Â·Ã¥Â¾â€”Ã¦â€ºÂ´Ã¥Â¥Â½Ã§Å¡â€žÃ¦â‚¬Â§Ã¨Æ’Â½Ã£â‚¬â€š

**Vercel**Ã¯Â¼Å¡Ã¥Å“Â¨Ã©Â¡Â¹Ã§â€ºÂ®Ã¨Â®Â¾Ã§Â½Â®Ã¤Â¸Â­Ã¥Â°â€ Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¨Â®Â¾Ã§Â½Â®Ã¤Â¸Âº BunÃ£â‚¬â€šÃ¦Å¾â€žÃ¥Â»ÂºÃ¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼Å¡`bun run build` Ã¦Ë†â€“ `bun build ./src/index.ts --outdir=dist`Ã£â‚¬â€šÃ¥Â®â€°Ã¨Â£â€¦Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼Å¡`bun install --frozen-lockfile` Ã§â€Â¨Ã¤ÂºÅ½Ã¥ÂÂ¯Ã©â€¡ÂÃ¥Â¤ÂÃ§Å¡â€žÃ©Æ’Â¨Ã§Â½Â²Ã£â‚¬â€š

## Ã§Â¤ÂºÃ¤Â¾â€¹

### Ã¨Â¿ÂÃ¨Â¡Å’Ã¥â€™Å’Ã¥Â®â€°Ã¨Â£â€¦

```bash
# Install dependencies (creates/updates bun.lock or bun.lockb)
bun install

# Run a script or file
bun run dev
bun run src/index.ts
bun src/index.ts
```

### Ã¨â€žÅ¡Ã¦Å“Â¬Ã¥â€™Å’Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â

```bash
bun run --env-file=.env dev
FOO=bar bun run script.ts
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢

```bash
bun test
bun test --watch
```

```typescript
// test/example.test.ts
import { expect, test } from "bun:test";

test("add", () => {
  expect(1 + 2).toBe(3);
});
```

### Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶ API

```typescript
const file = Bun.file("package.json");
const json = await file.json();

Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello");
  },
});
```

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

* Ã¦ÂÂÃ¤ÂºÂ¤Ã©â€ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†`bun.lock` Ã¦Ë†â€“ `bun.lockb`Ã¯Â¼â€°Ã¤Â»Â¥Ã¥Â®Å¾Ã§Å½Â°Ã¥ÂÂ¯Ã©â€¡ÂÃ¥Â¤ÂÃ§Å¡â€žÃ¥Â®â€°Ã¨Â£â€¦Ã£â‚¬â€š
* Ã¥Å“Â¨Ã¨â€žÅ¡Ã¦Å“Â¬Ã¤Â¸Â­Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `bun run`Ã£â‚¬â€šÃ¥Â¯Â¹Ã¤ÂºÅ½ TypeScriptÃ¯Â¼Å’Bun Ã¥Å½Å¸Ã§â€Å¸Ã¨Â¿ÂÃ¨Â¡Å’ `.ts`Ã£â‚¬â€š
* Ã¤Â¿ÂÃ¦Å’ÂÃ¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¦Å“â‚¬Ã¦â€“Â°Ã¯Â¼â€ºBun Ã¥â€™Å’Ã§â€Å¸Ã¦â‚¬ÂÃ§Â³Â»Ã§Â»Å¸Ã¥Ââ€˜Ã¥Â±â€¢Ã¨Â¿â€¦Ã©â‚¬Å¸Ã£â‚¬â€š
