---
name: ai-regression-testing
description: AIÃ¨Â¾â€¦Ã¥Å Â©Ã¥Â¼â‚¬Ã¥Ââ€˜Ã§Å¡â€žÃ¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â­â€“Ã§â€¢Â¥Ã£â‚¬â€šÃ¦Â²â„¢Ã§â€ºâ€™Ã¦Â¨Â¡Ã¥Â¼ÂAPIÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¦â€”Â Ã©Å“â‚¬Ã¤Â¾ÂÃ¨Âµâ€“Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¯Â¼Å’Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã§Å¡â€žÃ§Â¼ÂºÃ©â„¢Â·Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÅ Ã¦Ââ€¢Ã¦Ââ€°AIÃ§â€ºÂ²Ã§â€šÂ¹Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¥â€¦Â¶Ã¤Â¸Â­Ã¥ÂÅ’Ã¤Â¸â‚¬Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§Â¼â€“Ã¥â€ â„¢Ã¥â€™Å’Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â ÂÃ£â‚¬â€š
origin: ECC
---

# AI Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢

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


Ã¤Â¸â€œÃ¤Â¸Âº AI Ã¨Â¾â€¦Ã¥Å Â©Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¨Â®Â¾Ã¨Â®Â¡Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¥â€¦Â¶Ã¤Â¸Â­Ã¥ÂÅ’Ã¤Â¸â‚¬Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â£Ã§Â ÂÃ¥Â¹Â¶Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â ÂÃ¢â‚¬â€Ã¢â‚¬â€Ã¨Â¿â„¢Ã¤Â¼Å¡Ã¥Â½Â¢Ã¦Ë†ÂÃ§Â³Â»Ã§Â»Å¸Ã¦â‚¬Â§Ã§Å¡â€žÃ§â€ºÂ²Ã§â€šÂ¹Ã¯Â¼Å’Ã¥ÂÂªÃ¦Å“â€°Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€°ÂÃ¨Æ’Â½Ã¥Ââ€˜Ã§Å½Â°Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* AI Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Ë†Claude CodeÃ£â‚¬ÂCursorÃ£â‚¬ÂCodexÃ¯Â¼â€°Ã¥Â·Â²Ã¤Â¿Â®Ã¦â€Â¹ API Ã¨Â·Â¯Ã§â€Â±Ã¦Ë†â€“Ã¥ÂÅ½Ã§Â«Â¯Ã©â‚¬Â»Ã¨Â¾â€˜
* Ã¥Ââ€˜Ã§Å½Â°Ã¥Â¹Â¶Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Âºâ€ Ã¤Â¸â‚¬Ã¤Â¸Âª bugÃ¢â‚¬â€Ã¢â‚¬â€Ã©Å“â‚¬Ã¨Â¦ÂÃ©ËœÂ²Ã¦Â­Â¢Ã©â€¡ÂÃ¦â€“Â°Ã¥Â¼â€¢Ã¥â€¦Â¥
* Ã©Â¡Â¹Ã§â€ºÂ®Ã¥â€¦Â·Ã¦Å“â€°Ã¦Â²â„¢Ã§â€ºâ€™/Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å’Ã¥ÂÂ¯Ã§â€Â¨Ã¤ÂºÅ½Ã¦â€”Â Ã©Å“â‚¬Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
* Ã¥Å“Â¨Ã¤Â»Â£Ã§Â ÂÃ¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’ `/bug-check` Ã¦Ë†â€“Ã§Â±Â»Ã¤Â¼Â¼Ã§Å¡â€žÃ¥Â®Â¡Ã¦Å¸Â¥Ã¥â€˜Â½Ã¤Â»Â¤
* Ã¥Â­ËœÃ¥Å“Â¨Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¤Â»Â£Ã§Â ÂÃ¨Â·Â¯Ã¥Â¾â€žÃ¯Â¼Ë†Ã¦Â²â„¢Ã§â€ºâ€™Ã¤Â¸Å½Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã£â‚¬ÂÃ¥Å Å¸Ã¨Æ’Â½Ã¥Â¼â‚¬Ã¥â€¦Â³Ã§Â­â€°Ã¯Â¼â€°

## Ã¦Â Â¸Ã¥Â¿Æ’Ã©â€”Â®Ã©Â¢Ëœ

Ã¥Â½â€œ AI Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â»Â£Ã§Â ÂÃ§â€žÂ¶Ã¥ÂÅ½Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥â€¦Â¶Ã¨â€¡ÂªÃ¨ÂºÂ«Ã¥Â·Â¥Ã¤Â½Å“Ã¦â€”Â¶Ã¯Â¼Å’Ã¥Â®Æ’Ã¤Â¼Å¡Ã¥Â°â€ Ã§â€ºÂ¸Ã¥ÂÅ’Ã§Å¡â€žÃ¥Ââ€¡Ã¨Â®Â¾Ã¥Â¸Â¦Ã¥â€¦Â¥Ã¨Â¿â„¢Ã¤Â¸Â¤Ã¤Â¸ÂªÃ¦Â­Â¥Ã©ÂªÂ¤Ã£â‚¬â€šÃ¨Â¿â„¢Ã¤Â¼Å¡Ã¥Â½Â¢Ã¦Ë†ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¥ÂÂ¯Ã©Â¢â€žÃ¦Âµâ€¹Ã§Å¡â€žÃ¥Â¤Â±Ã¨Â´Â¥Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡

```
AI Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â¿Â®Ã¥Â¤Â Ã¢â€ â€™ AI Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â¿Â®Ã¥Â¤Â Ã¢â€ â€™ AI Ã¨Â¡Â¨Ã§Â¤ÂºÃ¢â‚¬Å“Ã§Å“â€¹Ã¨ÂµÂ·Ã¦ÂÂ¥Ã¦Â­Â£Ã§Â¡Â®Ã¢â‚¬Â Ã¢â€ â€™ Ã¦Â¼ÂÃ¦Â´Å¾Ã¤Â¾ÂÃ§â€žÂ¶Ã¥Â­ËœÃ¥Å“Â¨
```

**Ã¥Â®Å¾Ã©â„¢â€¦Ã§Â¤ÂºÃ¤Â¾â€¹**Ã¯Â¼Ë†Ã¥Å“Â¨Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¨Â§â€šÃ¥Â¯Å¸Ã¥Ë†Â°Ã¯Â¼â€°Ã¯Â¼Å¡

```
Ã¤Â¿Â®Ã¥Â¤Â 1Ã¯Â¼Å¡Ã¥Ââ€˜ API Ã¥â€œÂÃ¥Âºâ€Ã¦Â·Â»Ã¥Å Â Ã¤Âºâ€  notification_settings
  Ã¢â€ â€™ Ã¥Â¿ËœÃ¨Â®Â°Ã¥Â°â€ Ã¥â€¦Â¶Ã¦Â·Â»Ã¥Å Â Ã¥Ë†Â° SELECT Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â¸Â­
  Ã¢â€ â€™ AI Ã¥Â®Â¡Ã¦Â Â¸Ã¦â€”Â¶Ã©Ââ€”Ã¦Â¼ÂÃ¤Âºâ€ Ã¯Â¼Ë†Ã§â€ºÂ¸Ã¥ÂÅ’Ã§Å¡â€žÃ§â€ºÂ²Ã§â€šÂ¹Ã¯Â¼â€°

Ã¤Â¿Â®Ã¥Â¤Â 2Ã¯Â¼Å¡Ã¥Â°â€ Ã¥â€¦Â¶Ã¦Â·Â»Ã¥Å Â Ã¥Ë†Â° SELECT Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â¸Â­
  Ã¢â€ â€™ TypeScript Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Ë†Ã¥Ë†â€”Ã¤Â¸ÂÃ¥Å“Â¨Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¤Â¸Â­Ã¯Â¼â€°
  Ã¢â€ â€™ AI Ã¥Â®Â¡Ã¦Â Â¸Ã¤Âºâ€ Ã¤Â¿Â®Ã¥Â¤Â 1Ã¯Â¼Å’Ã¤Â½â€ Ã¦Å“ÂªÃ¥Ââ€˜Ã§Å½Â° SELECT Ã©â€”Â®Ã©Â¢Ëœ

Ã¤Â¿Â®Ã¥Â¤Â 3Ã¯Â¼Å¡Ã¦â€Â¹Ã¤Â¸Âº SELECT *
  Ã¢â€ â€™ Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Âºâ€ Ã§â€Å¸Ã¤ÂºÂ§Ã¨Â·Â¯Ã¥Â¾â€žÃ¯Â¼Å’Ã¥Â¿ËœÃ¨Â®Â°Ã¤Âºâ€ Ã¦Â²â„¢Ã§Â®Â±Ã¨Â·Â¯Ã¥Â¾â€ž
  Ã¢â€ â€™ AI Ã¥Â®Â¡Ã¦Â Â¸Ã¦â€”Â¶Ã¥â€ ÂÃ¦Â¬Â¡Ã©Ââ€”Ã¦Â¼ÂÃ¯Â¼Ë†Ã§Â¬Â¬ 4 Ã¦Â¬Â¡Ã¥â€¡ÂºÃ§Å½Â°Ã¯Â¼â€°

Ã¤Â¿Â®Ã¥Â¤Â 4Ã¯Â¼Å¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Å“Â¨Ã©Â¦â€“Ã¦Â¬Â¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã§Â«â€¹Ã¥ÂÂ³Ã¦Ââ€¢Ã¨Å½Â·Ã¤Âºâ€ Ã©â€”Â®Ã©Â¢Ëœ PASS:
```

Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡**Ã¦Â²â„¢Ã§â€ºâ€™/Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â·Â¯Ã¥Â¾â€žÃ¤Â¸ÂÃ¤Â¸â‚¬Ã¨â€¡Â´**Ã¦ËœÂ¯ AI Ã¥Â¼â€¢Ã¥â€¦Â¥Ã§Å¡â€ž #1 Ã¥â€ºÅ¾Ã¥Â½â€™Ã©â€”Â®Ã©Â¢ËœÃ£â‚¬â€š

## Ã¦Â²â„¢Ã§â€ºâ€™Ã¦Â¨Â¡Ã¥Â¼Â API Ã¦Âµâ€¹Ã¨Â¯â€¢

Ã¥Â¤Â§Ã¥Â¤Å¡Ã¦â€¢Â°Ã¥â€¦Â·Ã¦Å“â€° AI Ã¥Ââ€¹Ã¥Â¥Â½Ã¦Å¾Â¶Ã¦Å¾â€žÃ§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã©Æ’Â½Ã¦Å“â€°Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Â²â„¢Ã§â€ºâ€™/Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€šÃ¨Â¿â„¢Ã¦ËœÂ¯Ã¥Â®Å¾Ã§Å½Â°Ã¥Â¿Â«Ã©â‚¬Å¸Ã£â‚¬ÂÃ¦â€”Â Ã©Å“â‚¬Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ§Å¡â€ž API Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¥â€¦Â³Ã©â€Â®Ã£â‚¬â€š

### Ã¨Â®Â¾Ã§Â½Â®Ã¯Â¼Ë†Vitest + Next.js App RouterÃ¯Â¼â€°

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["__tests__/**/*.test.ts"],
    setupFiles: ["__tests__/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

```typescript
// __tests__/setup.ts
// Force sandbox mode Ã¢â‚¬â€ no database needed
process.env.SANDBOX_MODE = "true";
process.env.NEXT_PUBLIC_SUPABASE_URL = "";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "";
```

### Next.js API Ã¨Â·Â¯Ã§â€Â±Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¾â€¦Ã¥Å Â©Ã¥Â·Â¥Ã¥â€¦Â·

```typescript
// __tests__/helpers.ts
import { NextRequest } from "next/server";

export function createTestRequest(
  url: string,
  options?: {
    method?: string;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
    sandboxUserId?: string;
  },
): NextRequest {
  const { method = "GET", body, headers = {}, sandboxUserId } = options || {};
  const fullUrl = url.startsWith("http") ? url : `http://localhost:3000${url}`;
  const reqHeaders: Record<string, string> = { ...headers };

  if (sandboxUserId) {
    reqHeaders["x-sandbox-user-id"] = sandboxUserId;
  }

  const init: { method: string; headers: Record<string, string>; body?: string } = {
    method,
    headers: reqHeaders,
  };

  if (body) {
    init.body = JSON.stringify(body);
    reqHeaders["content-type"] = "application/json";
  }

  return new NextRequest(fullUrl, init);
}

export async function parseResponse(response: Response) {
  const json = await response.json();
  return { status: response.status, json };
}
```

### Ã§Â¼â€“Ã¥â€ â„¢Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢

Ã¥â€¦Â³Ã©â€Â®Ã¥Å½Å¸Ã¥Ë†â„¢Ã¯Â¼Å¡**Ã¤Â¸ÂºÃ¥Â·Â²Ã¥Ââ€˜Ã§Å½Â°Ã§Å¡â€ž bug Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¤Â¸ÂºÃ¦Â­Â£Ã¥Â¸Â¸Ã¥Â·Â¥Ã¤Â½Å“Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢**Ã£â‚¬â€š

```typescript
// __tests__/api/user/profile.test.ts
import { describe, it, expect } from "vitest";
import { createTestRequest, parseResponse } from "../../helpers";
import { GET, PATCH } from "@/app/api/user/profile/route";

// Define the contract Ã¢â‚¬â€ what fields MUST be in the response
const REQUIRED_FIELDS = [
  "id",
  "email",
  "full_name",
  "phone",
  "role",
  "created_at",
  "avatar_url",
  "notification_settings",  // Ã¢â€ Â Added after bug found it missing
];

describe("GET /api/user/profile", () => {
  it("returns all required fields", async () => {
    const req = createTestRequest("/api/user/profile");
    const res = await GET(req);
    const { status, json } = await parseResponse(res);

    expect(status).toBe(200);
    for (const field of REQUIRED_FIELDS) {
      expect(json.data).toHaveProperty(field);
    }
  });

  // Regression test Ã¢â‚¬â€ this exact bug was introduced by AI 4 times
  it("notification_settings is not undefined (BUG-R1 regression)", async () => {
    const req = createTestRequest("/api/user/profile");
    const res = await GET(req);
    const { json } = await parseResponse(res);

    expect("notification_settings" in json.data).toBe(true);
    const ns = json.data.notification_settings;
    expect(ns === null || typeof ns === "object").toBe(true);
  });
});
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â²â„¢Ã§â€ºâ€™/Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§

Ã¦Å“â‚¬Ã¥Â¸Â¸Ã¨Â§ÂÃ§Å¡â€ž AI Ã¥â€ºÅ¾Ã¥Â½â€™Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Âºâ€ Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â·Â¯Ã¥Â¾â€žÃ¤Â½â€ Ã¥Â¿ËœÃ¨Â®Â°Ã¤Âºâ€ Ã¦Â²â„¢Ã§â€ºâ€™Ã¨Â·Â¯Ã¥Â¾â€žÃ¯Â¼Ë†Ã¦Ë†â€“Ã¥ÂÂÃ¤Â¹â€¹Ã¯Â¼â€°Ã£â‚¬â€š

```typescript
// Test that sandbox responses match the expected contract
describe("GET /api/user/messages (conversation list)", () => {
  it("includes partner_name in sandbox mode", async () => {
    const req = createTestRequest("/api/user/messages", {
      sandboxUserId: "user-001",
    });
    const res = await GET(req);
    const { json } = await parseResponse(res);

    // This caught a bug where partner_name was added
    // to production path but not sandbox path
    if (json.data.length > 0) {
      for (const conv of json.data) {
        expect("partner_name" in conv).toBe(true);
      }
    }
  });
});
```

## Ã¥Â°â€ Ã¦Âµâ€¹Ã¨Â¯â€¢Ã©â€ºâ€ Ã¦Ë†ÂÃ¥Ë†Â° Bug Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¤Â¸Â­

### Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥â€˜Â½Ã¤Â»Â¤Ã¥Â®Å¡Ã¤Â¹â€°

```markdown
<!-- .claude/commands/bug-check.md -->
# Bug Ã¦Â£â‚¬Ã¦Å¸Â¥

## Ã¦Â­Â¥Ã©ÂªÂ¤ 1Ã¯Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¯Â¼Å’Ã¤Â¸ÂÃ¥ÂÂ¯Ã¨Â·Â³Ã¨Â¿â€¡Ã¯Â¼â€°

Ã¥Å“Â¨Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¥â€°Â**Ã©Â¦â€“Ã¥â€¦Ë†**Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â»Â¥Ã¤Â¸â€¹Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼Å¡

    npm run test       # Vitest Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¥â€”Ã¤Â»Â¶
    npm run build      # TypeScript Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥ + Ã¦Å¾â€žÃ¥Â»Âº

- Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¤Â±Ã¨Â´Â¥ Ã¢â€ â€™ Ã¦Å Â¥Ã¥â€˜Å Ã¤Â¸ÂºÃ¦Å“â‚¬Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§ Bug
- Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤Â±Ã¨Â´Â¥ Ã¢â€ â€™ Ã¥Â°â€ Ã§Â±Â»Ã¥Å¾â€¹Ã©â€â„¢Ã¨Â¯Â¯Ã¦Å Â¥Ã¥â€˜Å Ã¤Â¸ÂºÃ¦Å“â‚¬Ã©Â«ËœÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§
- Ã¥ÂÂªÃ¦Å“â€°Ã¥Å“Â¨Ã¤Â¸Â¤Ã¨â‚¬â€¦Ã©Æ’Â½Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥ÂÅ½Ã¯Â¼Å’Ã¦â€°ÂÃ¨Æ’Â½Ã§Â»Â§Ã§Â»Â­Ã¥Ë†Â°Ã¦Â­Â¥Ã©ÂªÂ¤ 2

## Ã¦Â­Â¥Ã©ÂªÂ¤ 2Ã¯Â¼Å¡Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Ë†AI Ã¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼â€°

1. Ã¦Â²â„¢Ã§â€ºâ€™/Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â·Â¯Ã¥Â¾â€žÃ¤Â¸â‚¬Ã¨â€¡Â´Ã¦â‚¬Â§
2. API Ã¥â€œÂÃ¥Âºâ€Ã§Â»â€œÃ¦Å¾â€žÃ¦ËœÂ¯Ã¥ÂÂ¦Ã§Â¬Â¦Ã¥ÂË†Ã¥â€°ÂÃ§Â«Â¯Ã©Â¢â€žÃ¦Å“Å¸
3. SELECT Ã¥Â­ÂÃ¥ÂÂ¥Ã§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´Ã¦â‚¬Â§
4. Ã¥Å’â€¦Ã¥ÂÂ«Ã¥â€ºÅ¾Ã¦Â»Å¡Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 
5. Ã¤Â¹ÂÃ¨Â§â€šÃ¦â€ºÂ´Ã¦â€“Â°Ã§Å¡â€žÃ§Â«Å¾Ã¦â‚¬ÂÃ¦ÂÂ¡Ã¤Â»Â¶

## Ã¦Â­Â¥Ã©ÂªÂ¤ 3Ã¯Â¼Å¡Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Â¯ÂÃ¤Â¸ÂªÃ¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€ž BugÃ¯Â¼Å’Ã¦ÂÂÃ¥â€¡ÂºÃ¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€“Â¹Ã¦Â¡Ë†
```

### Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

```
User: "Ã£Æ’ÂÃ£â€šÂ°Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Ââ€”Ã£ÂÂ¦" (or "/bug-check")
  Ã¢â€â€š
  Ã¢â€Å“Ã¢â€â‚¬ Step 1: npm run test
  Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬ FAIL Ã¢â€ â€™ Ã¥Ââ€˜Ã§Å½Â°Ã¦Å“ÂºÃ¦Â¢Â°Ã¦â‚¬Â§Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Ë†Ã¦â€”Â Ã©Å“â‚¬AIÃ¥Ë†Â¤Ã¦â€“Â­Ã¯Â¼â€°
  Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬ PASS Ã¢â€ â€™ Ã§Â»Â§Ã§Â»Â­
  Ã¢â€â€š
  Ã¢â€Å“Ã¢â€â‚¬ Step 2: npm run build
  Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬ FAIL Ã¢â€ â€™ Ã¥Ââ€˜Ã§Å½Â°Ã§Â±Â»Ã¥Å¾â€¹Ã©â€â„¢Ã¨Â¯Â¯
  Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬ PASS Ã¢â€ â€™ Ã§Â»Â§Ã§Â»Â­
  Ã¢â€â€š
  Ã¢â€Å“Ã¢â€â‚¬ Step 3: AIÃ¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Ë†Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¥Â·Â²Ã§Å¸Â¥Ã§â€ºÂ²Ã§â€šÂ¹Ã¯Â¼â€°
  Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬ Ã¦Å Â¥Ã¥â€˜Å Ã¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ©â€”Â®Ã©Â¢Ëœ
  Ã¢â€â€š
  Ã¢â€â€Ã¢â€â‚¬ Step 4: Ã¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸ÂªÃ¤Â¿Â®Ã¥Â¤ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Âµâ€¹Ã¨Â¯â€¢
      Ã¢â€â€Ã¢â€â‚¬ Ã¤Â¸â€¹Ã¦Â¬Â¡bug-checkÃ¦â€”Â¶Ã¦Ââ€¢Ã¨Å½Â·Ã¤Â¿Â®Ã¥Â¤ÂÃ¦ËœÂ¯Ã¥ÂÂ¦Ã§Â Â´Ã¥ÂÂÃ¥Å Å¸Ã¨Æ’Â½
```

## Ã¥Â¸Â¸Ã¨Â§ÂÃ§Å¡â€ž AI Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¦Â¨Â¡Ã¥Â¼Â 1Ã¯Â¼Å¡Ã¦Â²â„¢Ã§â€ºâ€™/Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¨Â·Â¯Ã¥Â¾â€žÃ¤Â¸ÂÃ¥Å’Â¹Ã©â€¦Â

**Ã©Â¢â€˜Ã§Å½â€¡**Ã¯Â¼Å¡Ã¦Å“â‚¬Ã¥Â¸Â¸Ã¨Â§ÂÃ¯Â¼Ë†Ã¥Å“Â¨ 4 Ã¤Â¸ÂªÃ¥â€ºÅ¾Ã¥Â½â€™Ã©â€”Â®Ã©Â¢ËœÃ¤Â¸Â­Ã¨Â§â€šÃ¥Â¯Å¸Ã¥Ë†Â° 3 Ã¤Â¸ÂªÃ¯Â¼â€°

```typescript
// FAIL: AI adds field to production path only
if (isSandboxMode()) {
  return { data: { id, email, name } };  // Missing new field
}
// Production path
return { data: { id, email, name, notification_settings } };

// PASS: Both paths must return the same shape
if (isSandboxMode()) {
  return { data: { id, email, name, notification_settings: null } };
}
return { data: { id, email, name, notification_settings } };
```

**Ã§â€Â¨Ã¤ÂºÅ½Ã¦Ââ€¢Ã¨Å½Â·Ã¥Â®Æ’Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢**Ã¯Â¼Å¡

```typescript
it("sandbox and production return same fields", async () => {
  // In test env, sandbox mode is forced ON
  const res = await GET(createTestRequest("/api/user/profile"));
  const { json } = await parseResponse(res);

  for (const field of REQUIRED_FIELDS) {
    expect(json.data).toHaveProperty(field);
  }
});
```

### Ã¦Â¨Â¡Ã¥Â¼Â 2Ã¯Â¼Å¡SELECT Ã¥Â­ÂÃ¥ÂÂ¥Ã©Ââ€”Ã¦Â¼Â

**Ã©Â¢â€˜Ã§Å½â€¡**Ã¯Â¼Å¡Ã¥Å“Â¨Ã¤Â½Â¿Ã§â€Â¨ Supabase/Prisma Ã¦Â·Â»Ã¥Å Â Ã¦â€“Â°Ã¥Ë†â€”Ã¦â€”Â¶Ã¥Â¸Â¸Ã¨Â§Â

```typescript
// FAIL: New column added to response but not to SELECT
const { data } = await supabase
  .from("users")
  .select("id, email, name")  // notification_settings not here
  .single();

return { data: { ...data, notification_settings: data.notification_settings } };
// Ã¢â€ â€™ notification_settings is always undefined

// PASS: Use SELECT * or explicitly include new columns
const { data } = await supabase
  .from("users")
  .select("*")
  .single();
```

### Ã¦Â¨Â¡Ã¥Â¼Â 3Ã¯Â¼Å¡Ã©â€â„¢Ã¨Â¯Â¯Ã§Å Â¶Ã¦â‚¬ÂÃ¦Â³â€žÃ¦Â¼Â

**Ã©Â¢â€˜Ã§Å½â€¡**Ã¯Â¼Å¡Ã¤Â¸Â­Ã§Â­â€°Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Â½â€œÃ¥Ââ€˜Ã§Å½Â°Ã¦Å“â€°Ã§Â»â€žÃ¤Â»Â¶Ã¦Â·Â»Ã¥Å Â Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã¦â€”Â¶

```typescript
// FAIL: Error state set but old data not cleared
catch (err) {
  setError("Failed to load");
  // reservations still shows data from previous tab!
}

// PASS: Clear related state on error
catch (err) {
  setReservations([]);  // Clear stale data
  setError("Failed to load");
}
```

### Ã¦Â¨Â¡Ã¥Â¼Â 4Ã¯Â¼Å¡Ã¤Â¹ÂÃ¨Â§â€šÃ¦â€ºÂ´Ã¦â€“Â°Ã¦Å“ÂªÃ¦Â­Â£Ã§Â¡Â®Ã¥â€ºÅ¾Ã¦Â»Å¡

```typescript
// FAIL: No rollback on failure
const handleRemove = async (id: string) => {
  setItems(prev => prev.filter(i => i.id !== id));
  await fetch(`/api/items/${id}`, { method: "DELETE" });
  // If API fails, item is gone from UI but still in DB
};

// PASS: Capture previous state and rollback on failure
const handleRemove = async (id: string) => {
  const prevItems = [...items];
  setItems(prev => prev.filter(i => i.id !== id));
  try {
    const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("API error");
  } catch {
    setItems(prevItems);  // Rollback
    alert("Ã¥â€°Å Ã©â„¢Â¤Ã£ÂÂ«Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ€”Ã£ÂÅ¸");
  }
};
```

## Ã§Â­â€“Ã§â€¢Â¥Ã¯Â¼Å¡Ã¥Å“Â¨Ã¥Ââ€˜Ã§Å½Â° Bug Ã§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢

Ã¤Â¸ÂÃ¨Â¦ÂÃ¨Â¿Â½Ã¦Â±â€š 100% Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã£â‚¬â€šÃ§â€ºÂ¸Ã¥ÂÂÃ¯Â¼Å¡

```
Ã¥Å“Â¨ /api/user/profile Ã¥Ââ€˜Ã§Å½Â° bug Ã¢â€ â€™ Ã¤Â¸Âº profile API Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢
Ã¥Å“Â¨ /api/user/messages Ã¥Ââ€˜Ã§Å½Â° bug Ã¢â€ â€™ Ã¤Â¸Âº messages API Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢
Ã¥Å“Â¨ /api/user/favorites Ã¥Ââ€˜Ã§Å½Â° bug Ã¢â€ â€™ Ã¤Â¸Âº favorites API Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢
Ã¥Å“Â¨ /api/user/notifications Ã¦Â²Â¡Ã¦Å“â€°Ã¥Ââ€˜Ã§Å½Â° bug Ã¢â€ â€™ Ã¦Å¡â€šÃ¦â€”Â¶Ã¤Â¸ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢
```

**Ã¤Â¸ÂºÃ¤Â»â‚¬Ã¤Â¹Ë†Ã¨Â¿â„¢Ã¥Å“Â¨ AI Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¤Â¸Â­Ã¦Å“â€°Ã¦â€¢Ë†Ã¯Â¼Å¡**

1. AI Ã¥â‚¬Â¾Ã¥Ââ€˜Ã¤ÂºÅ½Ã©â€¡ÂÃ¥Â¤ÂÃ§Å Â¯**Ã¥ÂÅ’Ã¤Â¸â‚¬Ã§Â±Â»Ã©â€â„¢Ã¨Â¯Â¯**
2. Bug Ã©â€ºâ€ Ã¤Â¸Â­Ã¥Å“Â¨Ã¥Â¤ÂÃ¦Ââ€šÃ¥Å’ÂºÃ¥Å¸Å¸Ã¯Â¼Ë†Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ¥Â¤Å¡Ã¨Â·Â¯Ã¥Â¾â€žÃ©â‚¬Â»Ã¨Â¾â€˜Ã£â‚¬ÂÃ§Å Â¶Ã¦â‚¬ÂÃ§Â®Â¡Ã§Ââ€ Ã¯Â¼â€°
3. Ã¤Â¸â‚¬Ã¦â€”Â¦Ã§Â»ÂÃ¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã¨Â¯Â¥Ã§â€°Â¹Ã¥Â®Å¡Ã¥â€ºÅ¾Ã¥Â½â€™Ã©â€”Â®Ã©Â¢Ëœ**Ã¥Â°Â±Ã¤Â¸ÂÃ¤Â¼Å¡Ã¥â€ ÂÃ¦Â¬Â¡Ã¥Ââ€˜Ã§â€Å¸**
4. Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€¢Â°Ã©â€¡ÂÃ©Å¡ÂÃ§Ââ‚¬ Bug Ã¤Â¿Â®Ã¥Â¤ÂÃ¨â‚¬Å’Ã¦Å“â€°Ã¦Å“ÂºÃ¥Â¢Å¾Ã©â€¢Â¿Ã¢â‚¬â€Ã¢â‚¬â€Ã¦Â²Â¡Ã¦Å“â€°Ã¦ÂµÂªÃ¨Â´Â¹Ã§Â²Â¾Ã¥Å â€º

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¥Ââ€šÃ¨â‚¬Æ’

| AI Ã¥â€ºÅ¾Ã¥Â½â€™Ã¦Â¨Â¡Ã¥Â¼Â | Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â­â€“Ã§â€¢Â¥ | Ã¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§ |
|---|---|---|
| Ã¦Â²â„¢Ã§â€ºâ€™/Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸ÂÃ¥Å’Â¹Ã©â€¦Â | Ã¦â€“Â­Ã¨Â¨â‚¬Ã¦Â²â„¢Ã§â€ºâ€™Ã¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸â€¹Ã¥â€œÂÃ¥Âºâ€Ã§Â»â€œÃ¦Å¾â€žÃ§â€ºÂ¸Ã¥ÂÅ’ |  Ã©Â«Ëœ |
| SELECT Ã¥Â­ÂÃ¥ÂÂ¥Ã©Ââ€”Ã¦Â¼Â | Ã¦â€“Â­Ã¨Â¨â‚¬Ã¥â€œÂÃ¥Âºâ€Ã¤Â¸Â­Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¿â€¦Ã©Å“â‚¬Ã¥Â­â€”Ã¦Â®Âµ |  Ã©Â«Ëœ |
| Ã©â€â„¢Ã¨Â¯Â¯Ã§Å Â¶Ã¦â‚¬ÂÃ¦Â³â€žÃ¦Â¼Â | Ã¦â€“Â­Ã¨Â¨â‚¬Ã¥â€¡ÂºÃ©â€â„¢Ã¦â€”Â¶Ã§Å Â¶Ã¦â‚¬ÂÃ¥Â·Â²Ã¦Â¸â€¦Ã§Ââ€  |  Ã¤Â¸Â­ |
| Ã§Â¼ÂºÃ¥Â°â€˜Ã¥â€ºÅ¾Ã¦Â»Å¡ | Ã¦â€“Â­Ã¨Â¨â‚¬ API Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶Ã§Å Â¶Ã¦â‚¬ÂÃ¥Â·Â²Ã¦ÂÂ¢Ã¥Â¤Â |  Ã¤Â¸Â­ |
| Ã§Â±Â»Ã¥Å¾â€¹Ã¨Â½Â¬Ã¦ÂÂ¢Ã¦Å½Â©Ã§â€ºâ€“ null | Ã¦â€“Â­Ã¨Â¨â‚¬Ã¥Â­â€”Ã¦Â®ÂµÃ¤Â¸ÂÃ¤Â¸Âº undefined |  Ã¤Â¸Â­ |

## Ã¨Â¦Â / Ã¤Â¸ÂÃ¨Â¦Â

**Ã¨Â¦ÂÃ¯Â¼Å¡**

* Ã¥Ââ€˜Ã§Å½Â° bug Ã¥ÂÅ½Ã§Â«â€¹Ã¥ÂÂ³Ã§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã¥Â¦â€šÃ¦Å¾Å“Ã¥ÂÂ¯Ã¨Æ’Â½Ã¯Â¼Å’Ã¥Å“Â¨Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼â€°
* Ã¦Âµâ€¹Ã¨Â¯â€¢ API Ã¥â€œÂÃ¥Âºâ€Ã§Â»â€œÃ¦Å¾â€žÃ¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥Â®Å¾Ã§Å½Â°Ã§Â»â€ Ã¨Å â€š
* Ã¥Â°â€ Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¤Â½Å“Ã¤Â¸ÂºÃ¦Â¯ÂÃ¦Â¬Â¡ bug Ã¦Â£â‚¬Ã¦Å¸Â¥Ã§Å¡â€žÃ§Â¬Â¬Ã¤Â¸â‚¬Ã¦Â­Â¥
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥Â¿Â«Ã©â‚¬Å¸Ã¯Â¼Ë†Ã¥Å“Â¨Ã¦Â²â„¢Ã§â€ºâ€™Ã¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸â€¹Ã¦â‚¬Â»Ã¨Â®Â¡ < 1 Ã§Â§â€™Ã¯Â¼â€°
* Ã¤Â»Â¥Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€°â‚¬Ã©Â¢â€žÃ©ËœÂ²Ã§Å¡â€ž bug Ã¦ÂÂ¥Ã¥â€˜Â½Ã¥ÂÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€šÃ¯Â¼Å’"BUG-R1 regression"Ã¯Â¼â€°

**Ã¤Â¸ÂÃ¨Â¦ÂÃ¯Â¼Å¡**

* Ã¤Â¸ÂºÃ¤Â»Å½Ã¦Å“ÂªÃ¥â€¡ÂºÃ§Å½Â°Ã¨Â¿â€¡ bug Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã§â€ºÂ¸Ã¤Â¿Â¡ AI Ã¨â€¡ÂªÃ¦Ë†â€˜Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥ÂÂ¯Ã¤Â»Â¥Ã¤Â½Å“Ã¤Â¸ÂºÃ¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¦â€ºÂ¿Ã¤Â»Â£Ã¥â€œÂ
* Ã¥â€ºÂ Ã¤Â¸ÂºÃ¢â‚¬Å“Ã¥ÂÂªÃ¦ËœÂ¯Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¦â€¢Â°Ã¦ÂÂ®Ã¢â‚¬ÂÃ¨â‚¬Å’Ã¨Â·Â³Ã¨Â¿â€¡Ã¦Â²â„¢Ã§â€ºâ€™Ã¨Â·Â¯Ã¥Â¾â€žÃ¦Âµâ€¹Ã¨Â¯â€¢
* Ã¥Å“Â¨Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¶Â³Ã¥Â¤Å¸Ã¦â€”Â¶Ã§Â¼â€“Ã¥â€ â„¢Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢
* Ã¨Â¿Â½Ã¦Â±â€šÃ¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã§â„¢Â¾Ã¥Ë†â€ Ã¦Â¯â€Ã¢â‚¬â€Ã¢â‚¬â€Ã¨Â¿Â½Ã¦Â±â€šÃ¥â€ºÅ¾Ã¥Â½â€™Ã©Â¢â€žÃ©ËœÂ²
