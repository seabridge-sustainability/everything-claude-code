---
description: Generate and run end-to-end tests with Playwright. Creates test journeys, runs tests, captures screenshots/videos/traces, and uploads artifacts.
---

# E2E Ã¦Å’â€¡Ã¤Â»Â¤

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


Ã¦Â­Â¤Ã¦Å’â€¡Ã¤Â»Â¤Ã¥â€˜Â¼Ã¥ÂÂ« **e2e-runner** Agent Ã¤Â¾â€ Ã§â€Â¢Ã§â€Å¸Ã£â‚¬ÂÃ§Â¶Â­Ã¨Â­Â·Ã¥â€™Å’Ã¥Å¸Â·Ã¨Â¡Å’Ã¤Â½Â¿Ã§â€Â¨ Playwright Ã§Å¡â€žÃ§Â«Â¯Ã¥Â°ÂÃ§Â«Â¯Ã¦Â¸Â¬Ã¨Â©Â¦Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¦Å’â€¡Ã¤Â»Â¤Ã§Å¡â€žÃ¥Å Å¸Ã¨Æ’Â½

1. **Ã§â€Â¢Ã§â€Å¸Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦â€”â€¦Ã§Â¨â€¹** - Ã§â€šÂºÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂµÂÃ§Â¨â€¹Ã¥Â»ÂºÃ§Â«â€¹ Playwright Ã¦Â¸Â¬Ã¨Â©Â¦
2. **Ã¥Å¸Â·Ã¨Â¡Å’ E2E Ã¦Â¸Â¬Ã¨Â©Â¦** - Ã¨Â·Â¨Ã§â‚¬ÂÃ¨Â¦Â½Ã¥â„¢Â¨Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
3. **Ã¦â€œÂ·Ã¥Ââ€“Ã§â€Â¢Ã¥â€¡ÂºÃ§â€°Â©** - Ã¥Â¤Â±Ã¦â€¢â€”Ã¦â„¢â€šÃ§Å¡â€žÃ¦Ë†ÂªÃ¥Å“â€“Ã£â‚¬ÂÃ¥Â½Â±Ã§â€°â€¡Ã£â‚¬ÂÃ¨Â¿Â½Ã¨Â¹Â¤
4. **Ã¤Â¸Å Ã¥â€šÂ³Ã§ÂµÂÃ¦Å¾Å“** - HTML Ã¥Â Â±Ã¥â€˜Å Ã¥â€™Å’ JUnit XML
5. **Ã¨Â­ËœÃ¥Ë†Â¥Ã¤Â¸ÂÃ§Â©Â©Ã¥Â®Å¡Ã¦Â¸Â¬Ã¨Â©Â¦** - Ã©Å¡â€Ã©â€ºÂ¢Ã¤Â¸ÂÃ§Â©Â©Ã¥Â®Å¡Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¦Â³ÂÃ¤Â½Â¿Ã§â€Â¨ `/e2e`Ã¯Â¼Å¡
- Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â€”Å“Ã©ÂÂµÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€”â€¦Ã§Â¨â€¹Ã¯Â¼Ë†Ã§â„¢Â»Ã¥â€¦Â¥Ã£â‚¬ÂÃ¤ÂºÂ¤Ã¦Ëœâ€œÃ£â‚¬ÂÃ¦â€Â¯Ã¤Â»ËœÃ¯Â¼â€°
- Ã©Â©â€”Ã¨Â­â€°Ã¥Â¤Å¡Ã¦Â­Â¥Ã©Â©Å¸Ã¦ÂµÂÃ§Â¨â€¹Ã§Â«Â¯Ã¥Â°ÂÃ§Â«Â¯Ã©Ââ€¹Ã¤Â½Å“
- Ã¦Â¸Â¬Ã¨Â©Â¦ UI Ã¤Âºâ€™Ã¥â€¹â€¢Ã¥â€™Å’Ã¥Â°Å½Ã¨Ë†Âª
- Ã©Â©â€”Ã¨Â­â€°Ã¥â€°ÂÃ§Â«Â¯Ã¥â€™Å’Ã¥Â¾Å’Ã§Â«Â¯Ã§Å¡â€žÃ¦â€¢Â´Ã¥ÂË†
- Ã§â€šÂºÃ§â€Å¸Ã§â€Â¢Ã§â€™Â°Ã¥Â¢Æ’Ã©Æ’Â¨Ã§Â½Â²Ã¥ÂÅ¡Ã¦Âºâ€“Ã¥â€šâ„¢

## Ã©Ââ€¹Ã¤Â½Å“Ã¦â€“Â¹Ã¥Â¼Â

e2e-runner Agent Ã¦Å“Æ’Ã¯Â¼Å¡

1. **Ã¥Ë†â€ Ã¦Å¾ÂÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦ÂµÂÃ§Â¨â€¹**Ã¤Â¸Â¦Ã¨Â­ËœÃ¥Ë†Â¥Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Æ’â€¦Ã¥Â¢Æ’
2. **Ã§â€Â¢Ã§â€Å¸ Playwright Ã¦Â¸Â¬Ã¨Â©Â¦**Ã¤Â½Â¿Ã§â€Â¨ Page Object Model Ã¦Â¨Â¡Ã¥Â¼Â
3. **Ã¨Â·Â¨Ã¥Â¤Å¡Ã¥â‚¬â€¹Ã§â‚¬ÂÃ¨Â¦Â½Ã¥â„¢Â¨Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦**Ã¯Â¼Ë†ChromeÃ£â‚¬ÂFirefoxÃ£â‚¬ÂSafariÃ¯Â¼â€°
4. **Ã¦â€œÂ·Ã¥Ââ€“Ã¥Â¤Â±Ã¦â€¢â€”**Ã§Å¡â€žÃ¦Ë†ÂªÃ¥Å“â€“Ã£â‚¬ÂÃ¥Â½Â±Ã§â€°â€¡Ã¥â€™Å’Ã¨Â¿Â½Ã¨Â¹Â¤
5. **Ã§â€Â¢Ã§â€Å¸Ã¥Â Â±Ã¥â€˜Å **Ã¥Å’â€¦Ã¥ÂÂ«Ã§ÂµÂÃ¦Å¾Å“Ã¥â€™Å’Ã§â€Â¢Ã¥â€¡ÂºÃ§â€°Â©
6. **Ã¨Â­ËœÃ¥Ë†Â¥Ã¤Â¸ÂÃ§Â©Â©Ã¥Â®Å¡Ã¦Â¸Â¬Ã¨Â©Â¦**Ã¤Â¸Â¦Ã¥Â»ÂºÃ¨Â­Â°Ã¤Â¿Â®Ã¥Â¾Â©

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã§â€Â¢Ã¥â€¡ÂºÃ§â€°Â©

Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Å¸Â·Ã¨Â¡Å’Ã¦â„¢â€šÃ¯Â¼Å’Ã¦Å“Æ’Ã¦â€œÂ·Ã¥Ââ€“Ã¤Â»Â¥Ã¤Â¸â€¹Ã§â€Â¢Ã¥â€¡ÂºÃ§â€°Â©Ã¯Â¼Å¡

**Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Å¡**
- HTML Ã¥Â Â±Ã¥â€˜Å Ã¥Å’â€¦Ã¥ÂÂ«Ã¦â„¢â€šÃ©â€“â€œÃ§Â·Å¡Ã¥â€™Å’Ã§ÂµÂÃ¦Å¾Å“
- JUnit XML Ã§â€Â¨Ã¦â€“Â¼ CI Ã¦â€¢Â´Ã¥ÂË†

**Ã¥Æ’â€¦Ã¥Å“Â¨Ã¥Â¤Â±Ã¦â€¢â€”Ã¦â„¢â€šÃ¯Â¼Å¡**
- Ã¥Â¤Â±Ã¦â€¢â€”Ã§â€¹â‚¬Ã¦â€¦â€¹Ã§Å¡â€žÃ¦Ë†ÂªÃ¥Å“â€“
- Ã¦Â¸Â¬Ã¨Â©Â¦Ã§Å¡â€žÃ¥Â½Â±Ã§â€°â€¡Ã©Å’â€žÃ¨Â£Â½
- Ã¨Â¿Â½Ã¨Â¹Â¤Ã¦Âªâ€Ã¦Â¡Ë†Ã§â€Â¨Ã¦â€“Â¼Ã©â„¢Â¤Ã©Å’Â¯Ã¯Â¼Ë†Ã©â‚¬ÂÃ¦Â­Â¥Ã©â€¡ÂÃ¦â€™Â­Ã¯Â¼â€°
- Ã§Â¶Â²Ã¨Â·Â¯Ã¦â€”Â¥Ã¨ÂªÅ’
- Console Ã¦â€”Â¥Ã¨ÂªÅ’

## Ã¦ÂªÂ¢Ã¨Â¦â€“Ã§â€Â¢Ã¥â€¡ÂºÃ§â€°Â©

```bash
# Ã¥Å“Â¨Ã§â‚¬ÂÃ¨Â¦Â½Ã¥â„¢Â¨Ã¦ÂªÂ¢Ã¨Â¦â€“ HTML Ã¥Â Â±Ã¥â€˜Å 
npx playwright show-report

# Ã¦ÂªÂ¢Ã¨Â¦â€“Ã§â€°Â¹Ã¥Â®Å¡Ã¨Â¿Â½Ã¨Â¹Â¤Ã¦Âªâ€Ã¦Â¡Ë†
npx playwright show-trace artifacts/trace-abc123.zip

# Ã¦Ë†ÂªÃ¥Å“â€“Ã¥â€žÂ²Ã¥Â­ËœÃ¥Å“Â¨ artifacts/ Ã§â€ºÂ®Ã©Å’â€ž
open artifacts/search-results.png
```

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢

**Ã¦â€¡â€°Ã¨Â©Â²Ã¥ÂÅ¡Ã¯Â¼Å¡**
- PASS: Ã¤Â½Â¿Ã§â€Â¨ Page Object Model Ã¤Â»Â¥Ã¥Ë†Â©Ã§Â¶Â­Ã¨Â­Â·
- PASS: Ã¤Â½Â¿Ã§â€Â¨ data-testid Ã¥Â±Â¬Ã¦â‚¬Â§Ã¤Â½Å“Ã§â€šÂºÃ©ÂÂ¸Ã¦â€œâ€¡Ã¥â„¢Â¨
- PASS: Ã§Â­â€°Ã¥Â¾â€¦ API Ã¥â€ºÅ¾Ã¦â€¡â€°Ã¯Â¼Å’Ã¤Â¸ÂÃ¨Â¦ÂÃ§â€Â¨Ã¤Â»Â»Ã¦â€žÂÃ©â‚¬Â¾Ã¦â„¢â€š
- PASS: Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â€”Å“Ã©ÂÂµÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€”â€¦Ã§Â¨â€¹Ã§Â«Â¯Ã¥Â°ÂÃ§Â«Â¯
- PASS: Ã¥ÂË†Ã¤Â½ÂµÃ¥Ë†Â°Ã¤Â¸Â»Ã¥Ë†â€ Ã¦â€Â¯Ã¥â€°ÂÃ¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
- PASS: Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¤Â±Ã¦â€¢â€”Ã¦â„¢â€šÃ¥Â¯Â©Ã¦Å¸Â¥Ã§â€Â¢Ã¥â€¡ÂºÃ§â€°Â©

**Ã¤Â¸ÂÃ¦â€¡â€°Ã¨Â©Â²Ã¥ÂÅ¡Ã¯Â¼Å¡**
- FAIL: Ã¤Â½Â¿Ã§â€Â¨Ã¨â€žâ€ Ã¥Â¼Â±Ã§Å¡â€žÃ©ÂÂ¸Ã¦â€œâ€¡Ã¥â„¢Â¨Ã¯Â¼Ë†CSS class Ã¥ÂÂ¯Ã¨Æ’Â½Ã¦â€Â¹Ã¨Â®Å Ã¯Â¼â€°
- FAIL: Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¯Â¦Ã¤Â½Å“Ã§Â´Â°Ã§Â¯â‚¬
- FAIL: Ã¥Â°ÂÃ§â€Å¸Ã§â€Â¢Ã§â€™Â°Ã¥Â¢Æ’Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
- FAIL: Ã¥Â¿Â½Ã§â€¢Â¥Ã¤Â¸ÂÃ§Â©Â©Ã¥Â®Å¡Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
- FAIL: Ã¥Â¤Â±Ã¦â€¢â€”Ã¦â„¢â€šÃ¨Â·Â³Ã©ÂÅ½Ã§â€Â¢Ã¥â€¡ÂºÃ§â€°Â©Ã¥Â¯Â©Ã¦Å¸Â¥
- FAIL: Ã§â€Â¨ E2E Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Â¯ÂÃ¥â‚¬â€¹Ã©â€šÅ Ã§â€¢Å’Ã¦Æ’â€¦Ã¦Â³ÂÃ¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼â€°

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¦Å’â€¡Ã¤Â»Â¤

```bash
# Ã¥Å¸Â·Ã¨Â¡Å’Ã¦â€°â‚¬Ã¦Å“â€° E2E Ã¦Â¸Â¬Ã¨Â©Â¦
npx playwright test

# Ã¥Å¸Â·Ã¨Â¡Å’Ã§â€°Â¹Ã¥Â®Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Âªâ€Ã¦Â¡Ë†
npx playwright test tests/e2e/markets/search.spec.ts

# Ã¤Â»Â¥Ã¥ÂÂ¯Ã¨Â¦â€“Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Ë†Ã§Å“â€¹Ã¥Ë†Â°Ã§â‚¬ÂÃ¨Â¦Â½Ã¥â„¢Â¨Ã¯Â¼â€°
npx playwright test --headed

# Ã©â„¢Â¤Ã©Å’Â¯Ã¦Â¸Â¬Ã¨Â©Â¦
npx playwright test --debug

# Ã§â€Â¢Ã§â€Å¸Ã¦Â¸Â¬Ã¨Â©Â¦Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼
npx playwright codegen http://localhost:3000

# Ã¦ÂªÂ¢Ã¨Â¦â€“Ã¥Â Â±Ã¥â€˜Å 
npx playwright show-report
```

## Ã¨Ë†â€¡Ã¥â€¦Â¶Ã¤Â»â€“Ã¦Å’â€¡Ã¤Â»Â¤Ã§Å¡â€žÃ¦â€¢Â´Ã¥ÂË†

- Ã¤Â½Â¿Ã§â€Â¨ `/plan` Ã¨Â­ËœÃ¥Ë†Â¥Ã¨Â¦ÂÃ¦Â¸Â¬Ã¨Â©Â¦Ã§Å¡â€žÃ©â€”Å“Ã©ÂÂµÃ¦â€”â€¦Ã§Â¨â€¹
- Ã¤Â½Â¿Ã§â€Â¨ `/tdd` Ã©â‚¬Â²Ã¨Â¡Å’Ã¥â€“Â®Ã¥â€¦Æ’Ã¦Â¸Â¬Ã¨Â©Â¦Ã¯Â¼Ë†Ã¦â€ºÂ´Ã¥Â¿Â«Ã£â‚¬ÂÃ¦â€ºÂ´Ã§Â´Â°Ã§Â²â€™Ã¥ÂºÂ¦Ã¯Â¼â€°
- Ã¤Â½Â¿Ã§â€Â¨ `/e2e` Ã©â‚¬Â²Ã¨Â¡Å’Ã¦â€¢Â´Ã¥ÂË†Ã¥â€™Å’Ã¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¦â€”â€¦Ã§Â¨â€¹Ã¦Â¸Â¬Ã¨Â©Â¦
- Ã¤Â½Â¿Ã§â€Â¨ `/code-review` Ã©Â©â€”Ã¨Â­â€°Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥â€œÂÃ¨Â³Âª

## Ã§â€ºÂ¸Ã©â€”Å“ Agent

Ã¦Â­Â¤Ã¦Å’â€¡Ã¤Â»Â¤Ã¥â€˜Â¼Ã¥ÂÂ«Ã¤Â½ÂÃ¦â€“Â¼Ã¤Â»Â¥Ã¤Â¸â€¹Ã¤Â½ÂÃ§Â½Â®Ã§Å¡â€ž `e2e-runner` AgentÃ¯Â¼Å¡
`~/.claude/agents/e2e-runner.md`
