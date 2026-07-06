---
name: data-scraper-agent
description: Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¥â€¦Â¨Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã§Å¡â€žAIÃ©Â©Â±Ã¥Å Â¨Ã¦â€¢Â°Ã¦ÂÂ®Ã¦â€Â¶Ã©â€ºâ€ Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å’Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¤Â»Â»Ã¤Â½â€¢Ã¥â€¦Â¬Ã¥â€¦Â±Ã¦ÂÂ¥Ã¦ÂºÂÃ¢â‚¬â€Ã¢â‚¬â€Ã¦â€¹â€ºÃ¨ÂËœÃ§Â½â€˜Ã§Â«â„¢Ã£â‚¬ÂÃ¤Â»Â·Ã¦Â Â¼Ã¤Â¿Â¡Ã¦ÂÂ¯Ã£â‚¬ÂÃ¦â€“Â°Ã©â€”Â»Ã£â‚¬ÂGitHubÃ£â‚¬ÂÃ¤Â½â€œÃ¨â€šÂ²Ã¨Âµâ€ºÃ¤Âºâ€¹Ã§Â­â€°Ã¤Â»Â»Ã¤Â½â€¢Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€šÃ¦Å’â€°Ã¨Â®Â¡Ã¥Ë†â€™Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å â€œÃ¥Ââ€“Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¥â€¦ÂÃ¨Â´Â¹LLMÃ¯Â¼Ë†Gemini FlashÃ¯Â¼â€°Ã¤Â¸Â°Ã¥Â¯Å’Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Å’Ã¥Â°â€ Ã§Â»â€œÃ¦Å¾Å“Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Å“Â¨Notion/Sheets/SupabaseÃ¤Â¸Â­Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â»Å½Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂÃ©Â¦Ë†Ã¤Â¸Â­Ã¥Â­Â¦Ã¤Â¹Â Ã£â‚¬â€šÃ¥Â®Å’Ã¥â€¦Â¨Ã¥â€¦ÂÃ¨Â´Â¹Ã¥Å“Â¨GitHub ActionsÃ¤Â¸Å Ã¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€šÃ©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã§â€Â¨Ã¦Ë†Â·Ã¥Â¸Å’Ã¦Å“â€ºÃ¨â€¡ÂªÃ¥Å Â¨Ã§â€ºâ€˜Ã¦Å½Â§Ã£â‚¬ÂÃ¦â€Â¶Ã©â€ºâ€ Ã¦Ë†â€“Ã¨Â·Å¸Ã¨Â¸ÂªÃ¤Â»Â»Ã¤Â½â€¢Ã¥â€¦Â¬Ã¥â€¦Â±Ã¦â€¢Â°Ã¦ÂÂ®Ã§Å¡â€žÃ¥Å“ÂºÃ¦â„¢Â¯Ã£â‚¬â€š
origin: community
---

# Ã¦â€¢Â°Ã¦ÂÂ®Ã¦Å â€œÃ¥Ââ€“Ã¤Â»Â£Ã§Ââ€ 

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


Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ§â€Å¸Ã¤ÂºÂ§Ã¥Â°Â±Ã§Â»ÂªÃ£â‚¬ÂAIÃ©Â©Â±Ã¥Å Â¨Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã¦â€Â¶Ã©â€ºâ€ Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å’Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¤Â»Â»Ã¤Â½â€¢Ã¥â€¦Â¬Ã¥â€¦Â±Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂºÂÃ£â‚¬â€š
Ã¦Å’â€°Ã¨Â®Â¡Ã¥Ë†â€™Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¥â€¦ÂÃ¨Â´Â¹LLMÃ¤Â¸Â°Ã¥Â¯Å’Ã§Â»â€œÃ¦Å¾Å“Ã¯Â¼Å’Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Ë†Â°Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¯Â¼Å’Ã¥Â¹Â¶Ã©Å¡ÂÃ¦â€”Â¶Ã©â€”Â´Ã¦Å½Â¨Ã§Â§Â»Ã¤Â¸ÂÃ¦â€“Â­Ã¦â€Â¹Ã¨Â¿â€ºÃ£â‚¬â€š

**Ã¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†Ã¯Â¼Å¡Python Ã‚Â· Gemini Flash (Ã¥â€¦ÂÃ¨Â´Â¹) Ã‚Â· GitHub Actions (Ã¥â€¦ÂÃ¨Â´Â¹) Ã‚Â· Notion / Sheets / Supabase**

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* Ã§â€Â¨Ã¦Ë†Â·Ã¦Æ’Â³Ã¨Â¦ÂÃ¦Å â€œÃ¥Ââ€“Ã¦Ë†â€“Ã§â€ºâ€˜Ã¦Å½Â§Ã¤Â»Â»Ã¤Â½â€¢Ã¥â€¦Â¬Ã¥â€¦Â±Ã§Â½â€˜Ã§Â«â„¢Ã¦Ë†â€“API
* Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¯Â´"Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Â£â‚¬Ã¦Å¸Â¥...Ã§Å¡â€žÃ¦Å“ÂºÃ¥â„¢Â¨Ã¤ÂºÂº"Ã£â‚¬Â"Ã¤Â¸ÂºÃ¦Ë†â€˜Ã§â€ºâ€˜Ã¦Å½Â§X"Ã£â‚¬Â"Ã¤Â»Å½...Ã¦â€Â¶Ã©â€ºâ€ Ã¦â€¢Â°Ã¦ÂÂ®"
* Ã§â€Â¨Ã¦Ë†Â·Ã¦Æ’Â³Ã¨Â¦ÂÃ¨Â·Å¸Ã¨Â¸ÂªÃ¥Â·Â¥Ã¤Â½Å“Ã£â‚¬ÂÃ¤Â»Â·Ã¦Â Â¼Ã£â‚¬ÂÃ¦â€“Â°Ã©â€”Â»Ã£â‚¬ÂÃ¤Â»â€œÃ¥Âºâ€œÃ£â‚¬ÂÃ¤Â½â€œÃ¨â€šÂ²Ã¦Â¯â€Ã¥Ë†â€ Ã£â‚¬ÂÃ¤Âºâ€¹Ã¤Â»Â¶Ã£â‚¬ÂÃ¥Ë†â€”Ã¨Â¡Â¨
* Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¯Â¢Ã©â€”Â®Ã¥Â¦â€šÃ¤Â½â€¢Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦â€¢Â°Ã¦ÂÂ®Ã¦â€Â¶Ã©â€ºâ€ Ã¨â‚¬Å’Ã¦â€”Â Ã©Å“â‚¬Ã¦â€Â¯Ã¤Â»ËœÃ¦â€°ËœÃ§Â®Â¡Ã¨Â´Â¹Ã§â€Â¨
* Ã§â€Â¨Ã¦Ë†Â·Ã¦Æ’Â³Ã¨Â¦ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¨Æ’Â½Ã¦Â Â¹Ã¦ÂÂ®Ã¤Â»â€“Ã¤Â»Â¬Ã§Å¡â€žÃ¥â€ Â³Ã§Â­â€“Ã©Å¡ÂÃ¦â€”Â¶Ã©â€”Â´Ã¦Å½Â¨Ã§Â§Â»Ã¥ÂËœÃ¥Â¾â€”Ã¦â€ºÂ´Ã¦â„¢ÂºÃ¨Æ’Â½Ã§Å¡â€žÃ¤Â»Â£Ã§Ââ€ 

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¦â€šÃ¥Â¿Âµ

### Ã¤Â¸â€°Ã¥Â±â€šÃ¦Å¾Â¶Ã¦Å¾â€ž

Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€¢Â°Ã¦ÂÂ®Ã¦Å â€œÃ¥Ââ€“Ã¤Â»Â£Ã§Ââ€ Ã©Æ’Â½Ã¦Å“â€°Ã¤Â¸â€°Ã¥Â±â€šÃ¯Â¼Å¡

```
COLLECT Ã¢â€ â€™ ENRICH Ã¢â€ â€™ STORE
  Ã¢â€â€š           Ã¢â€â€š        Ã¢â€â€š
Scraper    AI (LLM)  Database
runs on    scores/   Notion /
schedule   summarises Sheets /
           & classifies Supabase
```

### Ã¥â€¦ÂÃ¨Â´Â¹Ã¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†

| Ã¥Â±â€šÃ§ÂºÂ§ | Ã¥Â·Â¥Ã¥â€¦Â· | Ã¥Å½Å¸Ã¥â€ºÂ  |
|---|---|---|
| **Ã¦Å â€œÃ¥Ââ€“** | `requests` + `BeautifulSoup` | Ã¦â€”Â Ã¦Ë†ÂÃ¦Å“Â¬Ã¯Â¼Å’Ã¨Â¦â€ Ã§â€ºâ€“80%Ã§Å¡â€žÃ¥â€¦Â¬Ã¥â€¦Â±Ã§Â½â€˜Ã§Â«â„¢ |
| **JSÃ¦Â¸Â²Ã¦Å¸â€œÃ§Å¡â€žÃ§Â½â€˜Ã§Â«â„¢** | `playwright` (Ã¥â€¦ÂÃ¨Â´Â¹) | Ã¥Â½â€œHTMLÃ¦Å â€œÃ¥Ââ€“Ã¥Â¤Â±Ã¨Â´Â¥Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨ |
| **AIÃ¤Â¸Â°Ã¥Â¯Å’** | Ã©â‚¬Å¡Ã¨Â¿â€¡REST APIÃ§Å¡â€žGemini Flash | 500Ã¦Â¬Â¡Ã¨Â¯Â·Ã¦Â±â€š/Ã¥Â¤Â©Ã¯Â¼Å’100Ã¤Â¸â€¡Ã¤Â»Â¤Ã§â€°Å’/Ã¥Â¤Â© Ã¢â‚¬â€ Ã¥â€¦ÂÃ¨Â´Â¹ |
| **Ã¥Â­ËœÃ¥â€šÂ¨** | Notion API | Ã¥â€¦ÂÃ¨Â´Â¹Ã¥Â±â€šÃ§ÂºÂ§Ã¯Â¼Å’Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â®Â¡Ã¦Å¸Â¥Ã§Å¡â€žÃ¤Â¼ËœÃ§Â§â‚¬UI |
| **Ã¨Â°Æ’Ã¥ÂºÂ¦** | GitHub Actions cron | Ã¥Â¯Â¹Ã¥â€¦Â¬Ã¥â€¦Â±Ã¤Â»â€œÃ¥Âºâ€œÃ¥â€¦ÂÃ¨Â´Â¹ |
| **Ã¥Â­Â¦Ã¤Â¹Â ** | Ã¤Â»â€œÃ¥Âºâ€œÃ¤Â¸Â­Ã§Å¡â€žJSONÃ¥ÂÂÃ©Â¦Ë†Ã¦â€“â€¡Ã¤Â»Â¶ | Ã©â€ºÂ¶Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½Ã¯Â¼Å’Ã¥Å“Â¨gitÃ¤Â¸Â­Ã¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“ |

### AIÃ¦Â¨Â¡Ã¥Å¾â€¹Ã¥ÂÅ½Ã¥Â¤â€¡Ã©â€œÂ¾

Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â»Â£Ã§Ââ€ Ã¤Â»Â¥Ã¥Å“Â¨Ã©â€¦ÂÃ©Â¢ÂÃ¨â‚¬â€”Ã¥Â°Â½Ã¦â€”Â¶Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å“Â¨GeminiÃ¦Â¨Â¡Ã¥Å¾â€¹Ã©â€”Â´Ã¥â€ºÅ¾Ã©â‚¬â‚¬Ã¯Â¼Å¡

```
gemini-2.0-flash-lite (30 RPM) Ã¢â€ â€™
gemini-2.0-flash (15 RPM) Ã¢â€ â€™
gemini-2.5-flash (10 RPM) Ã¢â€ â€™
gemini-flash-lite-latest (fallback)
```

### Ã¦â€°Â¹Ã©â€¡ÂAPIÃ¨Â°Æ’Ã§â€Â¨Ã¤Â»Â¥Ã¦ÂÂÃ©Â«ËœÃ¦â€¢Ë†Ã§Å½â€¡

Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â¸ÂºÃ¦Â¯ÂÃ¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¥Ââ€¢Ã§â€¹Â¬Ã¨Â°Æ’Ã§â€Â¨LLMÃ£â‚¬â€šÃ¥Â§â€¹Ã§Â»Ë†Ã¦â€°Â¹Ã©â€¡ÂÃ¥Â¤â€žÃ§Ââ€ Ã¯Â¼Å¡

```python
# BAD: 33 API calls for 33 items
for item in items:
    result = call_ai(item)  # 33 calls Ã¢â€ â€™ hits rate limit

# GOOD: 7 API calls for 33 items (batch size 5)
for batch in chunks(items, size=5):
    results = call_ai(batch)  # 7 calls Ã¢â€ â€™ stays within free tier
```

***

## Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

### Ã¦Â­Â¥Ã©ÂªÂ¤ 1: Ã§Ââ€ Ã¨Â§Â£Ã§â€ºÂ®Ã¦Â â€¡

Ã¨Â¯Â¢Ã©â€”Â®Ã§â€Â¨Ã¦Ë†Â·Ã¯Â¼Å¡

1. **Ã¦â€Â¶Ã©â€ºâ€ Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¯Â¼Å¡** "Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂºÂÃ¦ËœÂ¯Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¯Â¼Å¸URL / API / RSS / Ã¥â€¦Â¬Ã¥â€¦Â±Ã§Â«Â¯Ã§â€šÂ¹Ã¯Â¼Å¸"
2. **Ã¦ÂÂÃ¥Ââ€“Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¯Â¼Å¡** "Ã¥â€œÂªÃ¤Âºâ€ºÃ¥Â­â€”Ã¦Â®ÂµÃ©â€¡ÂÃ¨Â¦ÂÃ¯Â¼Å¸Ã¦Â â€¡Ã©Â¢ËœÃ£â‚¬ÂÃ¤Â»Â·Ã¦Â Â¼Ã£â‚¬ÂURLÃ£â‚¬ÂÃ¦â€”Â¥Ã¦Å“Å¸Ã£â‚¬ÂÃ¥Ë†â€ Ã¦â€¢Â°Ã¯Â¼Å¸"
3. **Ã¥Â¦â€šÃ¤Â½â€¢Ã¥Â­ËœÃ¥â€šÂ¨Ã¯Â¼Å¡** "Ã§Â»â€œÃ¦Å¾Å“Ã¥Âºâ€Ã¨Â¯Â¥Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Å“Â¨Ã¥â€œÂªÃ©â€¡Å’Ã¯Â¼Å¸NotionÃ£â‚¬ÂGoogle SheetsÃ£â‚¬ÂSupabaseÃ¯Â¼Å’Ã¨Â¿ËœÃ¦ËœÂ¯Ã¦Å“Â¬Ã¥Å“Â°Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¸"
4. **Ã¥Â¦â€šÃ¤Â½â€¢Ã¤Â¸Â°Ã¥Â¯Å’Ã¯Â¼Å¡** "Ã¦â€šÂ¨Ã¥Â¸Å’Ã¦Å“â€ºAIÃ¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¯â€žÃ¥Ë†â€ Ã£â‚¬ÂÃ¦â‚¬Â»Ã§Â»â€œÃ£â‚¬ÂÃ¥Ë†â€ Ã§Â±Â»Ã¦Ë†â€“Ã¥Å’Â¹Ã©â€¦ÂÃ¥Ââ€”Ã¯Â¼Å¸"
5. **Ã©Â¢â€˜Ã§Å½â€¡Ã¯Â¼Å¡** "Ã¥Âºâ€Ã¨Â¯Â¥Ã¥Â¤Å¡Ã¤Â¹â€¦Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¯Â¼Å¸Ã¦Â¯ÂÃ¥Â°ÂÃ¦â€”Â¶Ã£â‚¬ÂÃ¦Â¯ÂÃ¥Â¤Â©Ã£â‚¬ÂÃ¦Â¯ÂÃ¥â€˜Â¨Ã¯Â¼Å¸"

Ã¥Â¸Â¸Ã¨Â§ÂÃ§Å¡â€žÃ¦ÂÂÃ§Â¤ÂºÃ§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Å¡

* Ã¦â€¹â€ºÃ¨ÂËœÃ§Â½â€˜Ã§Â«â„¢ Ã¢â€ â€™ Ã¦Â Â¹Ã¦ÂÂ®Ã§Â®â‚¬Ã¥Å½â€ Ã¨Â¯â€žÃ¥Ë†â€ Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦â‚¬Â§
* Ã¤ÂºÂ§Ã¥â€œÂÃ¤Â»Â·Ã¦Â Â¼ Ã¢â€ â€™ Ã©â„¢ÂÃ¤Â»Â·Ã¦â€”Â¶Ã¥Ââ€˜Ã¥â€¡ÂºÃ¨Â­Â¦Ã¦Å Â¥
* GitHubÃ¤Â»â€œÃ¥Âºâ€œ Ã¢â€ â€™ Ã¦â‚¬Â»Ã§Â»â€œÃ¦â€“Â°Ã§â€°Ë†Ã¦Å“Â¬
* Ã¦â€“Â°Ã©â€”Â»Ã¦ÂºÂ Ã¢â€ â€™ Ã¦Å’â€°Ã¤Â¸Â»Ã©Â¢Ëœ+Ã¦Æ’â€¦Ã¦â€žÅ¸Ã¥Ë†â€ Ã§Â±Â»
* Ã¤Â½â€œÃ¨â€šÂ²Ã§Â»â€œÃ¦Å¾Å“ Ã¢â€ â€™ Ã¦ÂÂÃ¥Ââ€“Ã§Â»Å¸Ã¨Â®Â¡Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Ë†Â°Ã¨Â·Å¸Ã¨Â¸ÂªÃ¥â„¢Â¨
* Ã¦Â´Â»Ã¥Å Â¨Ã¦â€”Â¥Ã¥Å½â€  Ã¢â€ â€™ Ã¦Å’â€°Ã¥â€¦Â´Ã¨Â¶Â£Ã§Â­â€ºÃ©â‚¬â€°

***

### Ã¦Â­Â¥Ã©ÂªÂ¤ 2: Ã¨Â®Â¾Ã¨Â®Â¡Ã¤Â»Â£Ã§Ââ€ Ã¦Å¾Â¶Ã¦Å¾â€ž

Ã¤Â¸ÂºÃ§â€Â¨Ã¦Ë†Â·Ã§â€Å¸Ã¦Ë†ÂÃ¤Â»Â¥Ã¤Â¸â€¹Ã§â€ºÂ®Ã¥Â½â€¢Ã§Â»â€œÃ¦Å¾â€žÃ¯Â¼Å¡

```
my-agent/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ config.yaml              # Ã§â€Â¨Ã¦Ë†Â·Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Ë†Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ£â‚¬ÂÃ¨Â¿â€¡Ã¦Â»Â¤Ã¥â„¢Â¨Ã£â‚¬ÂÃ¥ÂÂÃ¥Â¥Â½Ã¨Â®Â¾Ã§Â½Â®Ã¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ profile/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ context.md           # AI Ã¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ§â€Â¨Ã¦Ë†Â·Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Ë†Ã§Â®â‚¬Ã¥Å½â€ Ã£â‚¬ÂÃ¥â€¦Â´Ã¨Â¶Â£Ã£â‚¬ÂÃ¦Â â€¡Ã¥â€¡â€ Ã¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ scraper/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ main.py              # Ã¥ÂÂÃ¨Â°Æ’Ã¥â„¢Â¨Ã¯Â¼Å¡Ã¦Å â€œÃ¥Ââ€“ Ã¢â€ â€™ Ã¤Â¸Â°Ã¥Â¯Å’ Ã¢â€ â€™ Ã¥Â­ËœÃ¥â€šÂ¨
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ filters.py           # Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¨Â§â€žÃ¥Ë†â„¢Ã§Å¡â€žÃ©Â¢â€žÃ¨Â¿â€¡Ã¦Â»Â¤Ã¥â„¢Â¨Ã¯Â¼Ë†Ã¥Â¿Â«Ã©â‚¬Å¸Ã¯Â¼Å’Ã¥Å“Â¨ AI Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼â€°
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ sources/
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ source_name.py   # Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦â€¢Â°Ã¦ÂÂ®Ã¦ÂºÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦â€“â€¡Ã¤Â»Â¶
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ai/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ client.py            # Gemini REST Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¯Â¼Å’Ã¥Â¸Â¦Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥â€ºÅ¾Ã©â‚¬â‚¬
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pipeline.py          # Ã¦â€°Â¹Ã©â€¡Â AI Ã¥Ë†â€ Ã¦Å¾Â
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ jd_fetcher.py        # Ã¤Â»Å½ URL Ã¨Å½Â·Ã¥Ââ€“Ã¥Â®Å’Ã¦â€¢Â´Ã¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼Ë†Ã¥ÂÂ¯Ã©â‚¬â€°Ã¯Â¼â€°
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ memory.py            # Ã¤Â»Å½Ã§â€Â¨Ã¦Ë†Â·Ã¥ÂÂÃ©Â¦Ë†Ã¤Â¸Â­Ã¥Â­Â¦Ã¤Â¹Â 
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ storage/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ __init__.py
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ notion_sync.py       # Ã¦Ë†â€“ sheets_sync.py / supabase_sync.py
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ data/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ feedback.json        # Ã§â€Â¨Ã¦Ë†Â·Ã¥â€ Â³Ã§Â­â€“Ã¥Å½â€ Ã¥ÂÂ²Ã¯Â¼Ë†Ã¨â€¡ÂªÃ¥Å Â¨Ã¦â€ºÂ´Ã¦â€“Â°Ã¯Â¼â€°
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ .env.example
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ setup.py                 # Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¦â‚¬Â§Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ/Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Ë†â€ºÃ¥Â»Âº
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ enrich_existing.py       # Ã¥Â¯Â¹Ã¦â€”Â§Ã¨Â¡Å’Ã¨Â¿â€ºÃ¨Â¡Å’ AI Ã¥Ë†â€ Ã¦â€¢Â°Ã¥â€ºÅ¾Ã¥Â¡Â«
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ requirements.txt
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ .github/
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ workflows/
        Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ scraper.yml      # GitHub Actions Ã¨Â®Â¡Ã¥Ë†â€™Ã¤Â»Â»Ã¥Å Â¡
```

***

### Ã¦Â­Â¥Ã©ÂªÂ¤ 3: Ã¦Å¾â€žÃ¥Â»ÂºÃ¦Å â€œÃ¥Ââ€“Ã¥â„¢Â¨Ã¦ÂºÂ

Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¤Â»Â»Ã¤Â½â€¢Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂºÂÃ§Å¡â€žÃ¦Â¨Â¡Ã¦ÂÂ¿Ã¯Â¼Å¡

```python
# scraper/sources/my_source.py
"""
[Source Name] Ã¢â‚¬â€ scrapes [what] from [where].
Method: [REST API / HTML scraping / RSS feed]
"""
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timezone
from scraper.filters import is_relevant

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; research-bot/1.0)",
}


def fetch() -> list[dict]:
    """
    Returns a list of items with consistent schema.
    Each item must have at minimum: name, url, date_found.
    """
    results = []

    # ---- REST API source ----
    resp = requests.get("https://api.example.com/items", headers=HEADERS, timeout=15)
    if resp.status_code == 200:
        for item in resp.json().get("results", []):
            if not is_relevant(item.get("title", "")):
                continue
            results.append(_normalise(item))

    return results


def _normalise(raw: dict) -> dict:
    """Convert raw API/HTML data to the standard schema."""
    return {
        "name": raw.get("title", ""),
        "url": raw.get("link", ""),
        "source": "MySource",
        "date_found": datetime.now(timezone.utc).date().isoformat(),
        # add domain-specific fields here
    }
```

**HTMLÃ¦Å â€œÃ¥Ââ€“Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡**

```python
soup = BeautifulSoup(resp.text, "lxml")
for card in soup.select("[class*='listing']"):
    title = card.select_one("h2, h3").get_text(strip=True)
    link = card.select_one("a")["href"]
    if not link.startswith("http"):
        link = f"https://example.com{link}"
```

**RSSÃ¦ÂºÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Å¡**

```python
import xml.etree.ElementTree as ET
root = ET.fromstring(resp.text)
for item in root.findall(".//item"):
    title = item.findtext("title", "")
    link = item.findtext("link", "")
```

***

### Ã¦Â­Â¥Ã©ÂªÂ¤ 4: Ã¦Å¾â€žÃ¥Â»ÂºGemini AIÃ¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯

````python
# ai/client.py
import os, json, time, requests

_last_call = 0.0

MODEL_FALLBACK = [
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-flash-lite-latest",
]


def generate(prompt: str, model: str = "", rate_limit: float = 7.0) -> dict:
    """Call Gemini with auto-fallback on 429. Returns parsed JSON or {}."""
    global _last_call

    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        return {}

    elapsed = time.time() - _last_call
    if elapsed < rate_limit:
        time.sleep(rate_limit - elapsed)

    models = [model] + [m for m in MODEL_FALLBACK if m != model] if model else MODEL_FALLBACK
    _last_call = time.time()

    for m in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={api_key}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "responseMimeType": "application/json",
                "temperature": 0.3,
                "maxOutputTokens": 2048,
            },
        }
        try:
            resp = requests.post(url, json=payload, timeout=30)
            if resp.status_code == 200:
                return _parse(resp)
            if resp.status_code in (429, 404):
                time.sleep(1)
                continue
            return {}
        except requests.RequestException:
            return {}

    return {}


def _parse(resp) -> dict:
    try:
        text = (
            resp.json()
            .get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
            .strip()
        )
        if text.startswith("```"):
            text = text.split("\n", 1)[-1].rsplit("```", 1)[0]
        return json.loads(text)
    except (json.JSONDecodeError, KeyError):
        return {}
````

***

### Ã¦Â­Â¥Ã©ÂªÂ¤ 5: Ã¦Å¾â€žÃ¥Â»ÂºAIÃ§Â®Â¡Ã©Ââ€œÃ¯Â¼Ë†Ã¦â€°Â¹Ã©â€¡ÂÃ¯Â¼â€°

```python
# ai/pipeline.py
import json
import yaml
from pathlib import Path
from ai.client import generate

def analyse_batch(items: list[dict], context: str = "", preference_prompt: str = "") -> list[dict]:
    """Analyse items in batches. Returns items enriched with AI fields."""
    config = yaml.safe_load((Path(__file__).parent.parent / "config.yaml").read_text())
    model = config.get("ai", {}).get("model", "gemini-2.5-flash")
    rate_limit = config.get("ai", {}).get("rate_limit_seconds", 7.0)
    min_score = config.get("ai", {}).get("min_score", 0)
    batch_size = config.get("ai", {}).get("batch_size", 5)

    batches = [items[i:i + batch_size] for i in range(0, len(items), batch_size)]
    print(f"  [AI] {len(items)} items Ã¢â€ â€™ {len(batches)} API calls")

    enriched = []
    for i, batch in enumerate(batches):
        print(f"  [AI] Batch {i + 1}/{len(batches)}...")
        prompt = _build_prompt(batch, context, preference_prompt, config)
        result = generate(prompt, model=model, rate_limit=rate_limit)

        analyses = result.get("analyses", [])
        for j, item in enumerate(batch):
            ai = analyses[j] if j < len(analyses) else {}
            if ai:
                score = max(0, min(100, int(ai.get("score", 0))))
                if min_score and score < min_score:
                    continue
                enriched.append({**item, "ai_score": score, "ai_summary": ai.get("summary", ""), "ai_notes": ai.get("notes", "")})
            else:
                enriched.append(item)

    return enriched


def _build_prompt(batch, context, preference_prompt, config):
    priorities = config.get("priorities", [])
    items_text = "\n\n".join(
        f"Item {i+1}: {json.dumps({k: v for k, v in item.items() if not k.startswith('_')})}"
        for i, item in enumerate(batch)
    )

    return f"""Analyse these {len(batch)} items and return a JSON object.

# Items
{items_text}

# User Context
{context[:800] if context else "Not provided"}

# User Priorities
{chr(10).join(f"- {p}" for p in priorities)}

{preference_prompt}

# Instructions
Return: {{"analyses": [{{"score": <0-100>, "summary": "<2 sentences>", "notes": "<why this matches or doesn't>"}} for each item in order]}}
Be concise. Score 90+=excellent match, 70-89=good, 50-69=ok, <50=weak."""
```

***

### Ã¦Â­Â¥Ã©ÂªÂ¤ 6: Ã¦Å¾â€žÃ¥Â»ÂºÃ¥ÂÂÃ©Â¦Ë†Ã¥Â­Â¦Ã¤Â¹Â Ã§Â³Â»Ã§Â»Å¸

```python
# ai/memory.py
"""Learn from user decisions to improve future scoring."""
import json
from pathlib import Path

FEEDBACK_PATH = Path(__file__).parent.parent / "data" / "feedback.json"


def load_feedback() -> dict:
    if FEEDBACK_PATH.exists():
        try:
            return json.loads(FEEDBACK_PATH.read_text())
        except (json.JSONDecodeError, OSError):
            pass
    return {"positive": [], "negative": []}


def save_feedback(fb: dict):
    FEEDBACK_PATH.parent.mkdir(parents=True, exist_ok=True)
    FEEDBACK_PATH.write_text(json.dumps(fb, indent=2))


def build_preference_prompt(feedback: dict, max_examples: int = 15) -> str:
    """Convert feedback history into a prompt bias section."""
    lines = []
    if feedback.get("positive"):
        lines.append("# Items the user LIKED (positive signal):")
        for e in feedback["positive"][-max_examples:]:
            lines.append(f"- {e}")
    if feedback.get("negative"):
        lines.append("\n# Items the user SKIPPED/REJECTED (negative signal):")
        for e in feedback["negative"][-max_examples:]:
            lines.append(f"- {e}")
    if lines:
        lines.append("\nUse these patterns to bias scoring on new items.")
    return "\n".join(lines)
```

**Ã¤Â¸Å½Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Â±â€šÃ©â€ºâ€ Ã¦Ë†ÂÃ¯Â¼Å¡** Ã¦Â¯ÂÃ¦Â¬Â¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¥ÂÅ½Ã¯Â¼Å’Ã¤Â»Å½Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¤Â¸Â­Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥â€¦Â·Ã¦Å“â€°Ã¦Â­Â£Ã©ÂÂ¢/Ã¨Â´Å¸Ã©ÂÂ¢Ã§Å Â¶Ã¦â‚¬ÂÃ§Å¡â€žÃ©Â¡Â¹Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¦ÂÂÃ¥Ââ€“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¨Â°Æ’Ã§â€Â¨ `save_feedback()`Ã£â‚¬â€š

***

### Ã¦Â­Â¥Ã©ÂªÂ¤ 7: Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â­ËœÃ¥â€šÂ¨Ã¯Â¼Ë†NotionÃ§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼â€°

```python
# storage/notion_sync.py
import os
from notion_client import Client
from notion_client.errors import APIResponseError

_client = None

def get_client():
    global _client
    if _client is None:
        _client = Client(auth=os.environ["NOTION_TOKEN"])
    return _client

def get_existing_urls(db_id: str) -> set[str]:
    """Fetch all URLs already stored Ã¢â‚¬â€ used for deduplication."""
    client, seen, cursor = get_client(), set(), None
    while True:
        resp = client.databases.query(database_id=db_id, page_size=100, **{"start_cursor": cursor} if cursor else {})
        for page in resp["results"]:
            url = page["properties"].get("URL", {}).get("url", "")
            if url: seen.add(url)
        if not resp["has_more"]: break
        cursor = resp["next_cursor"]
    return seen

def push_item(db_id: str, item: dict) -> bool:
    """Push one item to Notion. Returns True on success."""
    props = {
        "Name": {"title": [{"text": {"content": item.get("name", "")[:100]}}]},
        "URL": {"url": item.get("url")},
        "Source": {"select": {"name": item.get("source", "Unknown")}},
        "Date Found": {"date": {"start": item.get("date_found")}},
        "Status": {"select": {"name": "New"}},
    }
    # AI fields
    if item.get("ai_score") is not None:
        props["AI Score"] = {"number": item["ai_score"]}
    if item.get("ai_summary"):
        props["Summary"] = {"rich_text": [{"text": {"content": item["ai_summary"][:2000]}}]}
    if item.get("ai_notes"):
        props["Notes"] = {"rich_text": [{"text": {"content": item["ai_notes"][:2000]}}]}

    try:
        get_client().pages.create(parent={"database_id": db_id}, properties=props)
        return True
    except APIResponseError as e:
        print(f"[notion] Push failed: {e}")
        return False

def sync(db_id: str, items: list[dict]) -> tuple[int, int]:
    existing = get_existing_urls(db_id)
    added = skipped = 0
    for item in items:
        if item.get("url") in existing:
            skipped += 1; continue
        if push_item(db_id, item):
            added += 1; existing.add(item["url"])
        else:
            skipped += 1
    return added, skipped
```

***

### Ã¦Â­Â¥Ã©ÂªÂ¤ 8: Ã¥Å“Â¨ main.py Ã¤Â¸Â­Ã§Â¼â€“Ã¦Å½â€™

```python
# scraper/main.py
import os, sys, yaml
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

from scraper.sources import my_source          # add your sources

# NOTE: This example uses Notion. If storage.provider is "sheets" or "supabase",
# replace this import with storage.sheets_sync or storage.supabase_sync and update
# the env var and sync() call accordingly.
from storage.notion_sync import sync

SOURCES = [
    ("My Source", my_source.fetch),
]

def ai_enabled():
    return bool(os.environ.get("GEMINI_API_KEY"))

def main():
    config = yaml.safe_load((Path(__file__).parent.parent / "config.yaml").read_text())
    provider = config.get("storage", {}).get("provider", "notion")

    # Resolve the storage target identifier from env based on provider
    if provider == "notion":
        db_id = os.environ.get("NOTION_DATABASE_ID")
        if not db_id:
            print("ERROR: NOTION_DATABASE_ID not set"); sys.exit(1)
    else:
        # Extend here for sheets (SHEET_ID) or supabase (SUPABASE_TABLE) etc.
        print(f"ERROR: provider '{provider}' not yet wired in main.py"); sys.exit(1)

    config = yaml.safe_load((Path(__file__).parent.parent / "config.yaml").read_text())
    all_items = []

    for name, fetch_fn in SOURCES:
        try:
            items = fetch_fn()
            print(f"[{name}] {len(items)} items")
            all_items.extend(items)
        except Exception as e:
            print(f"[{name}] FAILED: {e}")

    # Deduplicate by URL
    seen, deduped = set(), []
    for item in all_items:
        if (url := item.get("url", "")) and url not in seen:
            seen.add(url); deduped.append(item)

    print(f"Unique items: {len(deduped)}")

    if ai_enabled() and deduped:
        from ai.memory import load_feedback, build_preference_prompt
        from ai.pipeline import analyse_batch

        # load_feedback() reads data/feedback.json written by your feedback sync script.
        # To keep it current, implement a separate feedback_sync.py that queries your
        # storage provider for items with positive/negative statuses and calls save_feedback().
        feedback = load_feedback()
        preference = build_preference_prompt(feedback)
        context_path = Path(__file__).parent.parent / "profile" / "context.md"
        context = context_path.read_text() if context_path.exists() else ""
        deduped = analyse_batch(deduped, context=context, preference_prompt=preference)
    else:
        print("[AI] Skipped Ã¢â‚¬â€ GEMINI_API_KEY not set")

    added, skipped = sync(db_id, deduped)
    print(f"Done Ã¢â‚¬â€ {added} new, {skipped} existing")

if __name__ == "__main__":
    main()
```

***

### Ã¦Â­Â¥Ã©ÂªÂ¤ 9: GitHub ActionsÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

```yaml
# .github/workflows/scraper.yml
name: Data Scraper Agent

on:
  schedule:
    - cron: "0 */3 * * *"  # every 3 hours Ã¢â‚¬â€ adjust to your needs
  workflow_dispatch:        # allow manual trigger

permissions:
  contents: write   # required for the feedback-history commit step

jobs:
  scrape:
    runs-on: ubuntu-latest
    timeout-minutes: 20

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: "pip"

      - run: pip install -r requirements.txt

      # Uncomment if Playwright is enabled in requirements.txt
      # - name: Install Playwright browsers
      #   run: python -m playwright install chromium --with-deps

      - name: Run agent
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
        run: python -m scraper.main

      - name: Commit feedback history
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/feedback.json || true
          git diff --cached --quiet || git commit -m "chore: update feedback history"
          git push
```

***

### Ã¦Â­Â¥Ã©ÂªÂ¤ 10: config.yaml Ã¦Â¨Â¡Ã¦ÂÂ¿

```yaml
# Customise this file Ã¢â‚¬â€ no code changes needed

# What to collect (pre-filter before AI)
filters:
  required_keywords: []      # item must contain at least one
  blocked_keywords: []       # item must not contain any

# Your priorities Ã¢â‚¬â€ AI uses these for scoring
priorities:
  - "example priority 1"
  - "example priority 2"

# Storage
storage:
  provider: "notion"         # notion | sheets | supabase | sqlite

# Feedback learning
feedback:
  positive_statuses: ["Saved", "Applied", "Interested"]
  negative_statuses: ["Skip", "Rejected", "Not relevant"]

# AI settings
ai:
  enabled: true
  model: "gemini-2.5-flash"
  min_score: 0               # filter out items below this score
  rate_limit_seconds: 7      # seconds between API calls
  batch_size: 5              # items per API call
```

***

## Ã¥Â¸Â¸Ã¨Â§ÂÃ¦Å â€œÃ¥Ââ€“Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¦Â¨Â¡Ã¥Â¼Â 1: REST APIÃ¯Â¼Ë†Ã¦Å“â‚¬Ã§Â®â‚¬Ã¥Ââ€¢Ã¯Â¼â€°

```python
resp = requests.get(url, params={"q": query}, headers=HEADERS, timeout=15)
items = resp.json().get("results", [])
```

### Ã¦Â¨Â¡Ã¥Â¼Â 2: HTMLÃ¦Å â€œÃ¥Ââ€“

```python
soup = BeautifulSoup(resp.text, "lxml")
for card in soup.select(".listing-card"):
    title = card.select_one("h2").get_text(strip=True)
    href = card.select_one("a")["href"]
```

### Ã¦Â¨Â¡Ã¥Â¼Â 3: RSSÃ¦ÂºÂ

```python
import xml.etree.ElementTree as ET
root = ET.fromstring(resp.text)
for item in root.findall(".//item"):
    title = item.findtext("title", "")
    link = item.findtext("link", "")
    pub_date = item.findtext("pubDate", "")
```

### Ã¦Â¨Â¡Ã¥Â¼Â 4: Ã¥Ë†â€ Ã©Â¡ÂµAPI

```python
page = 1
while True:
    resp = requests.get(url, params={"page": page, "limit": 50}, timeout=15)
    data = resp.json()
    items = data.get("results", [])
    if not items:
        break
    for item in items:
        results.append(_normalise(item))
    if not data.get("has_more"):
        break
    page += 1
```

### Ã¦Â¨Â¡Ã¥Â¼Â 5: JSÃ¦Â¸Â²Ã¦Å¸â€œÃ©Â¡ÂµÃ©ÂÂ¢Ã¯Â¼Ë†PlaywrightÃ¯Â¼â€°

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(url)
    page.wait_for_selector(".listing")
    html = page.content()
    browser.close()

soup = BeautifulSoup(html, "lxml")
```

***

## Ã©Å“â‚¬Ã¨Â¦ÂÃ©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â

| Ã¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â | Ã©â€”Â®Ã©Â¢Ëœ | Ã¤Â¿Â®Ã¥Â¤ÂÃ¦â€“Â¹Ã¦Â³â€¢ |
|---|---|---|
| Ã¦Â¯ÂÃ¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¨Â°Æ’Ã§â€Â¨Ã¤Â¸â‚¬Ã¦Â¬Â¡LLM | Ã§Â«â€¹Ã¥ÂÂ³Ã¨Â¾Â¾Ã¥Ë†Â°Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶ | Ã¦Â¯ÂÃ¦Â¬Â¡Ã¨Â°Æ’Ã§â€Â¨Ã¦â€°Â¹Ã©â€¡ÂÃ¥Â¤â€žÃ§Ââ€ 5Ã¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ® |
| Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥â€¦Â³Ã©â€Â®Ã¥Â­â€” | Ã¤Â¸ÂÃ¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨ | Ã¥Â°â€ Ã¦â€°â‚¬Ã¦Å“â€°Ã©â€¦ÂÃ§Â½Â®Ã§Â§Â»Ã¥Å Â¨Ã¥Ë†Â° `config.yaml` |
| Ã¦Â²Â¡Ã¦Å“â€°Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶Ã§Å¡â€žÃ¦Å â€œÃ¥Ââ€“ | IPÃ¨Â¢Â«Ã§Â¦ÂÃ¦Â­Â¢ | Ã¥Å“Â¨Ã¨Â¯Â·Ã¦Â±â€šÃ¤Â¹â€¹Ã©â€”Â´Ã¦Â·Â»Ã¥Å Â  `time.sleep(1)` |
| Ã¥Å“Â¨Ã¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Â¯â€ Ã©â€™Â¥ | Ã¥Â®â€°Ã¥â€¦Â¨Ã©Â£Å½Ã©â„¢Â© | Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ `.env` + GitHub Secrets |
| Ã¦Â²Â¡Ã¦Å“â€°Ã¥Å½Â»Ã©â€¡Â | Ã©â€¡ÂÃ¥Â¤ÂÃ¨Â¡Å’Ã¥Â â€ Ã§Â§Â¯ | Ã¥Å“Â¨Ã¦Å½Â¨Ã©â‚¬ÂÃ¥â€°ÂÃ¥Â§â€¹Ã§Â»Ë†Ã¦Â£â‚¬Ã¦Å¸Â¥URL |
| Ã¥Â¿Â½Ã§â€¢Â¥ `robots.txt` | Ã¦Â³â€¢Ã¥Â¾â€¹/Ã©Ââ€œÃ¥Â¾Â·Ã©Â£Å½Ã©â„¢Â© | Ã©ÂÂµÃ¥Â®Ë†Ã§Ë†Â¬Ã¨â„¢Â«Ã¨Â§â€žÃ¥Ë†â„¢Ã¯Â¼â€ºÃ¥Â°Â½Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â½Â¿Ã§â€Â¨Ã¥â€¦Â¬Ã¥â€¦Â±API |
| Ã¤Â½Â¿Ã§â€Â¨ `requests` Ã¥Â¤â€žÃ§Ââ€ JSÃ¦Â¸Â²Ã¦Å¸â€œÃ§Å¡â€žÃ§Â½â€˜Ã§Â«â„¢ | Ã§Â©ÂºÃ¥â€œÂÃ¥Âºâ€ | Ã¤Â½Â¿Ã§â€Â¨PlaywrightÃ¦Ë†â€“Ã¦Å¸Â¥Ã¦â€°Â¾Ã¥Âºâ€¢Ã¥Â±â€šAPI |
| `maxOutputTokens` Ã¥Â¤ÂªÃ¤Â½Å½ | JSONÃ¦Ë†ÂªÃ¦â€“Â­Ã¯Â¼Å’Ã¨Â§Â£Ã¦Å¾ÂÃ©â€â„¢Ã¨Â¯Â¯ | Ã¥Â¯Â¹Ã¦â€°Â¹Ã©â€¡ÂÃ¥â€œÂÃ¥Âºâ€Ã¤Â½Â¿Ã§â€Â¨2048+ |

***

## Ã¥â€¦ÂÃ¨Â´Â¹Ã¥Â±â€šÃ§ÂºÂ§Ã©â„¢ÂÃ¥Ë†Â¶Ã¥Ââ€šÃ¨â‚¬Æ’

| Ã¦Å“ÂÃ¥Å Â¡ | Ã¥â€¦ÂÃ¨Â´Â¹Ã©â„¢ÂÃ¥Ë†Â¶ | Ã¥â€¦Â¸Ã¥Å¾â€¹Ã§â€Â¨Ã¦Â³â€¢ |
|---|---|---|
| Gemini Flash Lite | 30 RPM, 1500 RPD | Ã¤Â»Â¥3Ã¥Â°ÂÃ¦â€”Â¶Ã©â€”Â´Ã©Å¡â€Ã§ÂºÂ¦56Ã¦Â¬Â¡Ã¨Â¯Â·Ã¦Â±â€š/Ã¥Â¤Â© |
| Gemini 2.0 Flash | 15 RPM, 1500 RPD | Ã¨â€°Â¯Ã¥Â¥Â½Ã§Å¡â€žÃ¥ÂÅ½Ã¥Â¤â€¡Ã©â‚¬â€°Ã©Â¡Â¹ |
| Gemini 2.5 Flash | 10 RPM, 500 RPD | Ã¨Â°Â¨Ã¦â€¦Å½Ã¤Â½Â¿Ã§â€Â¨ |
| GitHub Actions | Ã¦â€”Â Ã©â„¢ÂÃ¯Â¼Ë†Ã¥â€¦Â¬Ã¥â€¦Â±Ã¤Â»â€œÃ¥Âºâ€œÃ¯Â¼â€° | Ã§ÂºÂ¦20Ã¥Ë†â€ Ã©â€™Å¸/Ã¥Â¤Â© |
| Notion API | Ã¦â€”Â Ã©â„¢Â | Ã§ÂºÂ¦200Ã¦Â¬Â¡Ã¥â€ â„¢Ã¥â€¦Â¥/Ã¥Â¤Â© |
| Supabase | 500MB DB, 2GBÃ¤Â¼Â Ã¨Â¾â€œ | Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¥Â¤Â§Ã¥Â¤Å¡Ã¦â€¢Â°Ã¤Â»Â£Ã§Ââ€  |
| Google Sheets API | 300Ã¦Â¬Â¡Ã¨Â¯Â·Ã¦Â±â€š/Ã¥Ë†â€ Ã©â€™Å¸ | Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¥Â°ÂÃ¥Å¾â€¹Ã¤Â»Â£Ã§Ââ€  |

***

## Ã©Å“â‚¬Ã¦Â±â€šÃ¦Â¨Â¡Ã¦ÂÂ¿

```
requests==2.31.0
beautifulsoup4==4.12.3
lxml==5.1.0
python-dotenv==1.0.1
pyyaml==6.0.2
notion-client==2.2.1   # Ã¥Â¦â€šÃ©Å“â‚¬Ã¤Â½Â¿Ã§â€Â¨ Notion
# playwright==1.40.0   # Ã©â€™Ë†Ã¥Â¯Â¹ JS Ã¦Â¸Â²Ã¦Å¸â€œÃ§Å¡â€žÃ§Â«â„¢Ã§â€šÂ¹Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€“Ã¦Â¶Ë†Ã¦Â³Â¨Ã©â€¡Å 
```

***

## Ã¨Â´Â¨Ã©â€¡ÂÃ¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢

Ã¥Å“Â¨Ã¥Â°â€ Ã¤Â»Â£Ã§Ââ€ Ã¦Â â€¡Ã¨Â®Â°Ã¤Â¸ÂºÃ¥Â®Å’Ã¦Ë†ÂÃ¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å¡

* \[ ] `config.yaml` Ã¦Å½Â§Ã¥Ë†Â¶Ã¦â€°â‚¬Ã¦Å“â€°Ã©ÂÂ¢Ã¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã§Å¡â€žÃ¨Â®Â¾Ã§Â½Â® Ã¢â‚¬â€ Ã¦Â²Â¡Ã¦Å“â€°Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ§Å¡â€žÃ¥â‚¬Â¼
* \[ ] `profile/context.md` Ã¤Â¿ÂÃ¥Â­ËœÃ§â€Â¨Ã¤ÂºÅ½AIÃ¥Å’Â¹Ã©â€¦ÂÃ§Å¡â€žÃ§â€Â¨Ã¦Ë†Â·Ã§â€°Â¹Ã¥Â®Å¡Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
* \[ ] Ã¥Å“Â¨Ã¦Â¯ÂÃ¦Â¬Â¡Ã¥Â­ËœÃ¥â€šÂ¨Ã¦Å½Â¨Ã©â‚¬ÂÃ¥â€°ÂÃ©â‚¬Å¡Ã¨Â¿â€¡URLÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Å½Â»Ã©â€¡Â
* \[ ] GeminiÃ¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã¥â€¦Â·Ã¦Å“â€°Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥ÂÅ½Ã¥Â¤â€¡Ã©â€œÂ¾Ã¯Â¼Ë†4Ã¤Â¸ÂªÃ¦Â¨Â¡Ã¥Å¾â€¹Ã¯Â¼â€°
* \[ ] Ã¦â€°Â¹Ã©â€¡ÂÃ¥Â¤Â§Ã¥Â°Â Ã¢â€°Â¤ Ã¦Â¯ÂÃ¤Â¸ÂªAPIÃ¨Â°Æ’Ã§â€Â¨5Ã¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®
* \[ ] `maxOutputTokens` Ã¢â€°Â¥ 2048
* \[ ] `.env` Ã¥Å“Â¨ `.gitignore` Ã¤Â¸Â­
* \[ ] Ã¦ÂÂÃ¤Â¾â€ºÃ¤Âºâ€ Ã§â€Â¨Ã¤ÂºÅ½Ã¥â€¦Â¥Ã©â€”Â¨Ã§Å¡â€ž `.env.example`
* \[ ] `setup.py` Ã¥Å“Â¨Ã©Â¦â€“Ã¦Â¬Â¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦Â¨Â¡Ã¥Â¼Â
* \[ ] `enrich_existing.py` Ã¥â€ºÅ¾Ã¥Â¡Â«Ã¦â€”Â§Ã¨Â¡Å’Ã§Å¡â€žAIÃ¥Ë†â€ Ã¦â€¢Â°
* \[ ] GitHub ActionsÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¥Å“Â¨Ã¦Â¯ÂÃ¦Â¬Â¡Ã¨Â¿ÂÃ¨Â¡Å’Ã¥ÂÅ½Ã¦ÂÂÃ¤ÂºÂ¤ `feedback.json`
* \[ ] READMEÃ¦Â¶ÂµÃ§â€ºâ€“Ã¯Â¼Å¡Ã¥Å“Â¨<5Ã¥Ë†â€ Ã©â€™Å¸Ã¥â€ â€¦Ã¨Â®Â¾Ã§Â½Â®Ã¯Â¼Å’Ã¦â€°â‚¬Ã©Å“â‚¬Ã§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥Ã¯Â¼Å’Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°

***

## Ã§Å“Å¸Ã¥Â®Å¾Ã¤Â¸â€“Ã§â€¢Å’Ã§Â¤ÂºÃ¤Â¾â€¹

```
"Ã¤Â¸ÂºÃ¦Ë†â€˜Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ§â€ºâ€˜Ã¦Å½Â§ Hacker News Ã¤Â¸Å  AI Ã¥Ë†ÂÃ¥Ë†â€ºÃ¥â€¦Â¬Ã¥ÂÂ¸Ã¨Å¾ÂÃ¨Âµâ€žÃ¦â€“Â°Ã©â€”Â»Ã§Å¡â€žÃ¦â„¢ÂºÃ¨Æ’Â½Ã¤Â½â€œ"
"Ã¤Â»Å½ 3 Ã¥Â®Â¶Ã§â€ÂµÃ¥â€¢â€ Ã§Â½â€˜Ã§Â«â„¢Ã¦Å â€œÃ¥Ââ€“Ã¤ÂºÂ§Ã¥â€œÂÃ¤Â»Â·Ã¦Â Â¼Ã¥Â¹Â¶Ã¥Å“Â¨Ã©â„¢ÂÃ¤Â»Â·Ã¦â€”Â¶Ã¥Ââ€˜Ã¥â€¡ÂºÃ¦ÂÂÃ©â€ â€™"
"Ã¨Â¿Â½Ã¨Â¸ÂªÃ¦Â â€¡Ã¨Â®Â°Ã¦Å“â€° 'llm' Ã¦Ë†â€“ 'agents' Ã§Å¡â€žÃ¦â€“Â° GitHub Ã¤Â»â€œÃ¥Âºâ€œÃ¢â‚¬â€Ã¢â‚¬â€Ã¥Â¹Â¶Ã¤Â¸ÂºÃ¦Â¯ÂÃ¤Â¸ÂªÃ¤Â»â€œÃ¥Âºâ€œÃ§â€Å¸Ã¦Ë†ÂÃ¦â€˜ËœÃ¨Â¦Â"
"Ã¥Â°â€  LinkedIn Ã¥â€™Å’ Cutshort Ã¤Â¸Å Ã§Å¡â€žÃ©Â¦â€“Ã¥Â¸Â­Ã¨Â¿ÂÃ¨ÂÂ¥Ã¥Â®ËœÃ¨ÂÅ’Ã¤Â½ÂÃ¥Ë†â€”Ã¨Â¡Â¨Ã¦â€Â¶Ã©â€ºâ€ Ã¥Ë†Â° Notion Ã¤Â¸Â­"
"Ã§â€ºâ€˜Ã¦Å½Â§Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦ÂÂÃ¥Ë†Â°Ã¦Ë†â€˜Ã¥â€¦Â¬Ã¥ÂÂ¸Ã§Å¡â€ž subreddit Ã¥Â¸â€“Ã¥Â­ÂÃ¢â‚¬â€Ã¢â‚¬â€Ã¥Â¹Â¶Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Æ’â€¦Ã¦â€žÅ¸Ã¥Ë†â€ Ã§Â±Â»"
"Ã¦Â¯ÂÃ¦â€”Â¥Ã¤Â»Å½ arXiv Ã¦Å â€œÃ¥Ââ€“Ã¦Ë†â€˜Ã¥â€¦Â³Ã¦Â³Â¨Ã¤Â¸Â»Ã©Â¢ËœÃ§Å¡â€žÃ¦â€“Â°Ã¥Â­Â¦Ã¦Å“Â¯Ã¨Â®ÂºÃ¦â€“â€¡"
"Ã¨Â¿Â½Ã¨Â¸ÂªÃ¤Â½â€œÃ¨â€šÂ²Ã¨Âµâ€ºÃ¤Âºâ€¹Ã§Â»â€œÃ¦Å¾Å“Ã¥Â¹Â¶Ã¥Å“Â¨ Google Sheets Ã¤Â¸Â­Ã§Â»Â´Ã¦Å Â¤Ã¥Å Â¨Ã¦â‚¬ÂÃ¦â€ºÂ´Ã¦â€“Â°Ã§Å¡â€žÃ¨Â¡Â¨Ã¦Â Â¼"
"Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Ë†Â¿Ã¥Å“Â°Ã¤ÂºÂ§Ã¦Ë†Â¿Ã¦ÂºÂÃ§â€ºâ€˜Ã¦Å½Â§Ã¥â„¢Â¨Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Å“Â¨Ã¦â€“Â°Ã¦Ë†Â¿Ã¦ÂºÂÃ¤Â»Â·Ã¦Â Â¼Ã¤Â½Å½Ã¤ÂºÅ½ 1 Ã¥ÂÆ’Ã¤Â¸â€¡Ã¥ÂÂ¢Ã¦Â¯â€Ã¦â€”Â¶Ã¥Ââ€˜Ã¥â€¡ÂºÃ¦ÂÂÃ©â€ â€™"
```

***

## Ã¥Ââ€šÃ¨â‚¬Æ’Ã¥Â®Å¾Ã§Å½Â°

Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¤Â½Â¿Ã§â€Â¨Ã¦Â­Â¤Ã§Â¡Â®Ã¥Ë†â€¡Ã¦Å¾Â¶Ã¦Å¾â€žÃ¦Å¾â€žÃ¥Â»ÂºÃ§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´Ã¥Â·Â¥Ã¤Â½Å“Ã¤Â»Â£Ã§Ââ€ Ã¥Â°â€ Ã¦Å â€œÃ¥Ââ€“4+Ã¤Â¸ÂªÃ¦â€¢Â°Ã¦ÂÂ®Ã¦ÂºÂÃ¯Â¼Å’
Ã¦â€°Â¹Ã©â€¡ÂÃ¥Â¤â€žÃ§Ââ€ GeminiÃ¨Â°Æ’Ã§â€Â¨Ã¯Â¼Å’Ã¤Â»Å½Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Å“Â¨NotionÃ¤Â¸Â­Ã§Å¡â€ž"Ã¥Â·Â²Ã¥Âºâ€Ã§â€Â¨"/"Ã¥Â·Â²Ã¦â€¹â€™Ã§Â»Â"Ã¥â€ Â³Ã§Â­â€“Ã¤Â¸Â­Ã¥Â­Â¦Ã¤Â¹Â Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â¸â€
Ã¥Å“Â¨GitHub ActionsÃ¤Â¸Å 100%Ã¥â€¦ÂÃ¨Â´Â¹Ã¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€šÃ¦Å’â€°Ã§â€¦Â§Ã¤Â¸Å Ã¨Â¿Â°Ã¦Â­Â¥Ã©ÂªÂ¤1-9Ã¦Å¾â€žÃ¥Â»ÂºÃ¦â€šÂ¨Ã¨â€¡ÂªÃ¥Â·Â±Ã§Å¡â€žÃ¤Â»Â£Ã§Ââ€ Ã£â‚¬â€š
