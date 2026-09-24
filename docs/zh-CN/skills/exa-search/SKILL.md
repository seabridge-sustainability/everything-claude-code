---
name: exa-search
description: Ã©â‚¬Å¡Ã¨Â¿â€¡Exa MCPÃ¨Â¿â€ºÃ¨Â¡Å’Ã§Â¥Å¾Ã§Â»ÂÃ¦ÂÅ“Ã§Â´Â¢Ã¯Â¼Å’Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã§Â½â€˜Ã§Â»Å“Ã£â‚¬ÂÃ¤Â»Â£Ã§Â ÂÃ¥â€™Å’Ã¥â€¦Â¬Ã¥ÂÂ¸Ã§Â â€Ã§Â©Â¶Ã£â‚¬â€šÃ¥Â½â€œÃ§â€Â¨Ã¦Ë†Â·Ã©Å“â‚¬Ã¨Â¦ÂÃ§Â½â€˜Ã§Â»Å“Ã¦ÂÅ“Ã§Â´Â¢Ã£â‚¬ÂÃ¤Â»Â£Ã§Â ÂÃ§Â¤ÂºÃ¤Â¾â€¹Ã£â‚¬ÂÃ¥â€¦Â¬Ã¥ÂÂ¸Ã¦Æ’â€¦Ã¦Å Â¥Ã£â‚¬ÂÃ¤ÂºÂºÃ¥â€˜ËœÃ¦Å¸Â¥Ã¦â€°Â¾Ã¯Â¼Å’Ã¦Ë†â€“Ã¤Â½Â¿Ã§â€Â¨ExaÃ§Â¥Å¾Ã§Â»ÂÃ¦ÂÅ“Ã§Â´Â¢Ã¥Â¼â€¢Ã¦â€œÅ½Ã¨Â¿â€ºÃ¨Â¡Å’AIÃ©Â©Â±Ã¥Å Â¨Ã§Å¡â€žÃ¦Â·Â±Ã¥ÂºÂ¦Ã§Â â€Ã§Â©Â¶Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€š
origin: ECC
---

# Exa Ã¦ÂÅ“Ã§Â´Â¢

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


Ã©â‚¬Å¡Ã¨Â¿â€¡ Exa MCP Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¥Â®Å¾Ã§Å½Â°Ã§Â½â€˜Ã©Â¡ÂµÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬ÂÃ¤Â»Â£Ã§Â ÂÃ£â‚¬ÂÃ¥â€¦Â¬Ã¥ÂÂ¸Ã¥â€™Å’Ã¤ÂºÂºÃ§â€°Â©Ã§Å¡â€žÃ§Â¥Å¾Ã§Â»ÂÃ¦ÂÅ“Ã§Â´Â¢Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* Ã§â€Â¨Ã¦Ë†Â·Ã©Å“â‚¬Ã¨Â¦ÂÃ¥Â½â€œÃ¥â€°ÂÃ§Â½â€˜Ã©Â¡ÂµÃ¤Â¿Â¡Ã¦ÂÂ¯Ã¦Ë†â€“Ã¦â€“Â°Ã©â€”Â»
* Ã¦ÂÅ“Ã§Â´Â¢Ã¤Â»Â£Ã§Â ÂÃ§Â¤ÂºÃ¤Â¾â€¹Ã£â‚¬ÂAPI Ã¦â€“â€¡Ã¦Â¡Â£Ã¦Ë†â€“Ã¦Å â‚¬Ã¦Å“Â¯Ã¥Ââ€šÃ¨â‚¬Æ’Ã¨Âµâ€žÃ¦â€“â„¢
* Ã§Â â€Ã§Â©Â¶Ã¥â€¦Â¬Ã¥ÂÂ¸Ã£â‚¬ÂÃ§Â«Å¾Ã¤Âºâ€°Ã¥Â¯Â¹Ã¦â€°â€¹Ã¦Ë†â€“Ã¥Â¸â€šÃ¥Å“ÂºÃ¥Ââ€šÃ¤Â¸Å½Ã¨â‚¬â€¦
* Ã¦Å¸Â¥Ã¦â€°Â¾Ã§â€°Â¹Ã¥Â®Å¡Ã©Â¢â€ Ã¥Å¸Å¸Ã§Å¡â€žÃ¤Â¸â€œÃ¤Â¸Å¡Ã¨Âµâ€žÃ¦â€“â„¢Ã¦Ë†â€“Ã¤ÂºÂºÃ§â€°Â©
* Ã¤Â¸ÂºÃ¤Â»Â»Ã¤Â½â€¢Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¤Â»Â»Ã¥Å Â¡Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Æ’Å’Ã¦â„¢Â¯Ã¨Â°Æ’Ã§Â â€
* Ã§â€Â¨Ã¦Ë†Â·Ã¦ÂÂÃ¥Ë†Â°Ã¢â‚¬Å“Ã¦ÂÅ“Ã§Â´Â¢Ã¢â‚¬ÂÃ£â‚¬ÂÃ¢â‚¬Å“Ã¦Å¸Â¥Ã¦â€°Â¾Ã¢â‚¬ÂÃ£â‚¬ÂÃ¢â‚¬Å“Ã¥Â¯Â»Ã¦â€°Â¾Ã¢â‚¬ÂÃ¦Ë†â€“Ã¢â‚¬Å“Ã¥â€¦Â³Ã¤ÂºÅ½Ã¢â‚¬Â¦Ã¢â‚¬Â¦Ã§Å¡â€žÃ¦Å“â‚¬Ã¦â€“Â°Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¦ËœÂ¯Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¢â‚¬Â

## MCP Ã¨Â¦ÂÃ¦Â±â€š

Ã¥Â¿â€¦Ã©Â¡Â»Ã©â€¦ÂÃ§Â½Â® Exa MCP Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã£â‚¬â€šÃ¦Â·Â»Ã¥Å Â Ã¥Ë†Â° `~/.claude.json`Ã¯Â¼Å¡

```json
"exa-web-search": {
  "command": "npx",
  "args": ["-y", "exa-mcp-server"],
  "env": { "EXA_API_KEY": "YOUR_EXA_API_KEY_HERE" }
}
```

Ã¥Å“Â¨ [exa.ai](https://exa.ai) Ã¨Å½Â·Ã¥Ââ€“ API Ã¥Â¯â€ Ã©â€™Â¥Ã£â‚¬â€š
Ã¦Â­Â¤Ã¤Â»â€œÃ¥Âºâ€œÃ¥Â½â€œÃ¥â€°ÂÃ§Å¡â€ž Exa Ã¨Â®Â¾Ã§Â½Â®Ã¨Â®Â°Ã¥Â½â€¢Ã¤Âºâ€ Ã¦Â­Â¤Ã¥Â¤â€žÃ¥â€¦Â¬Ã¥Â¼â‚¬Ã§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã¦Å½Â¥Ã¥ÂÂ£Ã¯Â¼Å¡`web_search_exa` Ã¥â€™Å’ `get_code_context_exa`Ã£â‚¬â€š
Ã¥Â¦â€šÃ¦Å¾Å“Ã¤Â½Â Ã§Å¡â€ž Exa Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¥â€¦Â¬Ã¥Â¼â‚¬Ã¤Âºâ€ Ã¥â€¦Â¶Ã¤Â»â€“Ã¥Â·Â¥Ã¥â€¦Â·Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Å“Â¨Ã¦â€“â€¡Ã¦Â¡Â£Ã¦Ë†â€“Ã¦ÂÂÃ§Â¤ÂºÃ¤Â¸Â­Ã¤Â¾ÂÃ¨Âµâ€“Ã¥Â®Æ’Ã¤Â»Â¬Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã¥â€¦Ë†Ã¦Â Â¸Ã¥Â®Å¾Ã¥â€¦Â¶Ã§Â¡Â®Ã¥Ë†â€¡Ã¥ÂÂÃ§Â§Â°Ã£â‚¬â€š

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¥Â·Â¥Ã¥â€¦Â·

### web\_search\_exa

Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â½â€œÃ¥â€°ÂÃ¤Â¿Â¡Ã¦ÂÂ¯Ã£â‚¬ÂÃ¦â€“Â°Ã©â€”Â»Ã¦Ë†â€“Ã¤Âºâ€¹Ã¥Â®Å¾Ã§Å¡â€žÃ©â‚¬Å¡Ã§â€Â¨Ã§Â½â€˜Ã©Â¡ÂµÃ¦ÂÅ“Ã§Â´Â¢Ã£â‚¬â€š

```
web_search_exa(query: "2026Ã¥Â¹Â´Ã¦Å“â‚¬Ã¦â€“Â°Ã¤ÂºÂºÃ¥Â·Â¥Ã¦â„¢ÂºÃ¨Æ’Â½Ã¥Ââ€˜Ã¥Â±â€¢", numResults: 5)
```

**Ã¥Ââ€šÃ¦â€¢Â°Ã¯Â¼Å¡**

| Ã¥Ââ€šÃ¦â€¢Â° | Ã§Â±Â»Ã¥Å¾â€¹ | Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼ | Ã¨Â¯Â´Ã¦ËœÅ½ |
|-------|------|---------|-------|
| `query` | Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â² | Ã¥Â¿â€¦Ã¥Â¡Â« | Ã¦ÂÅ“Ã§Â´Â¢Ã¦Å¸Â¥Ã¨Â¯Â¢ |
| `numResults` | Ã¦â€¢Â°Ã¥Â­â€” | 8 | Ã§Â»â€œÃ¦Å¾Å“Ã¦â€¢Â°Ã©â€¡Â |
| `type` | Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â² | `auto` | Ã¦ÂÅ“Ã§Â´Â¢Ã¦Â¨Â¡Ã¥Â¼Â |
| `livecrawl` | Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â² | `fallback` | Ã©Å“â‚¬Ã¨Â¦ÂÃ¦â€”Â¶Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¥Â®Å¾Ã¦â€”Â¶Ã§Ë†Â¬Ã¥Ââ€“ |
| `category` | Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â² | Ã¦â€”Â  | Ã¥ÂÂ¯Ã©â‚¬â€°Ã§â€žÂ¦Ã§â€šÂ¹Ã¯Â¼Å’Ã¤Â¾â€¹Ã¥Â¦â€š `company` Ã¦Ë†â€“ `research paper` |

### get\_code\_context\_exa

Ã¤Â»Å½ GitHubÃ£â‚¬ÂStack Overflow Ã¥â€™Å’Ã¦â€“â€¡Ã¦Â¡Â£Ã§Â«â„¢Ã§â€šÂ¹Ã¦Å¸Â¥Ã¦â€°Â¾Ã¤Â»Â£Ã§Â ÂÃ§Â¤ÂºÃ¤Â¾â€¹Ã¥â€™Å’Ã¦â€“â€¡Ã¦Â¡Â£Ã£â‚¬â€š

```
get_code_context_exa(query: "Python asyncio patterns", tokensNum: 3000)
```

**Ã¥Ââ€šÃ¦â€¢Â°Ã¯Â¼Å¡**

| Ã¥Ââ€šÃ¦â€¢Â° | Ã§Â±Â»Ã¥Å¾â€¹ | Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼ | Ã¨Â¯Â´Ã¦ËœÅ½ |
|-------|------|---------|-------|
| `query` | string | Ã¥Â¿â€¦Ã©Å“â‚¬ | Ã¤Â»Â£Ã§Â ÂÃ¦Ë†â€“ API Ã¦ÂÅ“Ã§Â´Â¢Ã¦Å¸Â¥Ã¨Â¯Â¢ |
| `tokensNum` | number | 5000 | Ã¥â€ â€¦Ã¥Â®Â¹Ã¤Â»Â¤Ã§â€°Å’Ã¦â€¢Â°Ã¯Â¼Ë†1000-50000Ã¯Â¼â€° |

## Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¥Â¿Â«Ã©â‚¬Å¸Ã¦Å¸Â¥Ã¦â€°Â¾

```
web_search_exa(query: "Node.js 22 Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½", numResults: 3)
```

### Ã¤Â»Â£Ã§Â ÂÃ§Â â€Ã§Â©Â¶

```
get_code_context_exa(query: "RustÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã¦Â¨Â¡Ã¥Â¼ÂResultÃ§Â±Â»Ã¥Å¾â€¹", tokensNum: 3000)
```

### Ã¥â€¦Â¬Ã¥ÂÂ¸Ã¦Ë†â€“Ã¤ÂºÂºÃ§â€°Â©Ã§Â â€Ã§Â©Â¶

```
web_search_exa(query: "Vercel 2026Ã¥Â¹Â´Ã¨Å¾ÂÃ¨Âµâ€žÃ¤Â¼Â°Ã¥â‚¬Â¼", numResults: 3, category: "company")
web_search_exa(query: "site:linkedin.com/in Anthropic AIÃ¥Â®â€°Ã¥â€¦Â¨Ã§Â â€Ã§Â©Â¶Ã¥â€˜Ëœ", numResults: 5)
```

### Ã¦Å â‚¬Ã¦Å“Â¯Ã¦Â·Â±Ã¥ÂºÂ¦Ã§Â â€Ã§Â©Â¶

```
web_search_exa(query: "WebAssembly Ã§Â»â€žÃ¤Â»Â¶Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§Å Â¶Ã¦â‚¬ÂÃ¤Â¸Å½Ã©â€¡â€¡Ã§â€Â¨Ã¦Æ’â€¦Ã¥â€ Âµ", numResults: 5)
get_code_context_exa(query: "WebAssembly Ã§Â»â€žÃ¤Â»Â¶Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§Â¤ÂºÃ¤Â¾â€¹", tokensNum: 4000)
```

## Ã¦ÂÂÃ§Â¤Âº

* Ã¤Â½Â¿Ã§â€Â¨ `web_search_exa` Ã¨Å½Â·Ã¥Ââ€“Ã¦Å“â‚¬Ã¦â€“Â°Ã¤Â¿Â¡Ã¦ÂÂ¯Ã£â‚¬ÂÃ¥â€¦Â¬Ã¥ÂÂ¸Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥â€™Å’Ã¥Â¹Â¿Ã¦Â³â€ºÃ¥Ââ€˜Ã§Å½Â°
* Ã¤Â½Â¿Ã§â€Â¨ `site:`Ã£â‚¬ÂÃ¥Â¼â€¢Ã¥ÂÂ·Ã¥â€ â€¦Ã§Å¡â€žÃ§Å¸Â­Ã¨Â¯Â­Ã¥â€™Å’ `intitle:` Ã§Â­â€°Ã¦ÂÅ“Ã§Â´Â¢Ã¨Â¿ÂÃ§Â®â€”Ã§Â¬Â¦Ã¦ÂÂ¥Ã§Â¼Â©Ã¥Â°ÂÃ§Â»â€œÃ¦Å¾Å“Ã¨Å’Æ’Ã¥â€ºÂ´
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¨ÂÅ¡Ã§â€žÂ¦Ã§Å¡â€žÃ¤Â»Â£Ã§Â ÂÃ§â€°â€¡Ã¦Â®ÂµÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¾Æ’Ã¤Â½Å½Ã§Å¡â€ž `tokensNum` (1000-2000)Ã¯Â¼â€ºÃ¥Â¯Â¹Ã¤ÂºÅ½Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¾Æ’Ã©Â«ËœÃ§Å¡â€žÃ¥â‚¬Â¼ (5000+)
* Ã¥Â½â€œÃ¤Â½Â Ã©Å“â‚¬Ã¨Â¦Â API Ã§â€Â¨Ã¦Â³â€¢Ã¦Ë†â€“Ã¤Â»Â£Ã§Â ÂÃ§Â¤ÂºÃ¤Â¾â€¹Ã¨â‚¬Å’Ã©ÂÅ¾Ã©â‚¬Å¡Ã§â€Â¨Ã§Â½â€˜Ã©Â¡ÂµÃ¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `get_code_context_exa`

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦Å â‚¬Ã¨Æ’Â½

* `deep-research` Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ firecrawl + exa Ã§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´Ã§Â â€Ã§Â©Â¶Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ
* `market-research` Ã¢â‚¬â€ Ã¥Â¸Â¦Ã¦Å“â€°Ã¥â€ Â³Ã§Â­â€“Ã¦Â¡â€ Ã¦Å¾Â¶Ã§Å¡â€žÃ¤Â¸Å¡Ã¥Å Â¡Ã¥Â¯Â¼Ã¥Ââ€˜Ã§Â â€Ã§Â©Â¶
