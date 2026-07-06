---
name: bun-runtime
description: Bun Ã¤Â½Å“Ã¤Â¸ÂºÃ¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã£â‚¬ÂÃ¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã£â‚¬ÂÃ¦â€°â€œÃ¥Å’â€¦Ã¥â„¢Â¨Ã¥â€™Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¿ÂÃ¨Â¡Å’Ã¥â„¢Â¨Ã£â‚¬â€šÃ¤Â½â€¢Ã¦â€”Â¶Ã©â‚¬â€°Ã¦â€¹Â© Bun Ã¨â‚¬Å’Ã©ÂÅ¾ NodeÃ£â‚¬ÂÃ¨Â¿ÂÃ§Â§Â»Ã¦Â³Â¨Ã¦â€žÂÃ¤Âºâ€¹Ã©Â¡Â¹Ã¤Â»Â¥Ã¥ÂÅ  Vercel Ã¦â€Â¯Ã¦Å’ÂÃ£â‚¬â€š
origin: ECC
---

# Bun Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶

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
