# Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã£ÂÂ¨Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã£ÂÂ¯Ã¦â€“Â°Ã£Ââ€”Ã£Ââ€žÃ£Æ’â€žÃ£Æ’Â¼Ã£Æ’Â«Ã£ÂÂ¨Ã¦Â©Å¸Ã¨Æ’Â½Ã£ÂÂ§Claude CodeÃ£â€šâ€™Ã¦â€¹Â¡Ã¥Â¼ÂµÃ£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€šÃ£Ââ€œÃ£ÂÂ®Ã£â€šÂ¬Ã£â€šÂ¤Ã£Æ’â€°Ã£ÂÂ§Ã£ÂÂ¯Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¼Ã£Æ’Â«Ã£ÂÂ®Ã£ÂÂ¿Ã£â€šâ€™Ã£â€šÂ«Ã£Æ’ÂÃ£Æ’Â¼Ã£Ââ€”Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢ - Ã£Ââ€žÃ£ÂÂ¤Ã£â‚¬ÂÃ£ÂÂªÃ£ÂÅ“Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã£Ââ€¹Ã£ÂÂ«Ã£ÂÂ¤Ã£Ââ€žÃ£ÂÂ¦Ã£ÂÂ¯[Ã¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªÃ¨Â¨ËœÃ¤Âºâ€¹](https://x.com/affaanmustafa/status/2012378465664745795)Ã£â€šâ€™Ã¥Ââ€šÃ§â€¦Â§Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€žÃ£â‚¬â€š

---

## Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹

Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹Ã£ÂÂ¯Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¼Ã£Æ’Â«Ã¥ÂÂ¯Ã¨Æ’Â½Ã£ÂÂªÃ£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã£ÂÂ®Ã£Æ’ÂªÃ£Æ’ÂÃ£â€šÂ¸Ã£Æ’Ë†Ã£Æ’ÂªÃ£ÂÂ§Ã£Ââ„¢Ã£â‚¬â€š

### Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹Ã£ÂÂ®Ã¨Â¿Â½Ã¥Å Â 

```bash
# Ã¥â€¦Â¬Ã¥Â¼Â Anthropic Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official

# Ã£â€šÂ³Ã£Æ’Å¸Ã£Æ’Â¥Ã£Æ’â€¹Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 
# mgrep plugin by @mixedbread-ai
claud plugin marketplace add https://github.com/mixedbread-ai/mgrep
```

### Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹

| Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹ | Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹ |
|-------------|--------|
| claude-plugins-official | `anthropics/claude-plugins-official` |
| claude-code-plugins | `anthropics/claude-code` |
| Mixedbread-Grep | `mixedbread-ai/mgrep` |

---

## Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã£ÂÂ®Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¼Ã£Æ’Â«

```bash
# Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€“Ã£Æ’Â©Ã£â€šÂ¦Ã£â€šÂ¶Ã£â€šâ€™Ã©â€“â€¹Ã£ÂÂ
/plugins

# Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã§â€ºÂ´Ã¦Å½Â¥Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¼Ã£Æ’Â«
claude plugin install typescript-lsp@claude-plugins-official
```

### Ã¦Å½Â¨Ã¥Â¥Â¨Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³

**Ã©â€“â€¹Ã§â„¢Âº:**
- `typescript-lsp` - TypeScript Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’ÂªÃ£â€šÂ¸Ã£â€šÂ§Ã£Æ’Â³Ã£â€šÂ¹
- `pyright-lsp` - Python Ã¥Å¾â€¹Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯
- `hookify` - Ã¤Â¼Å¡Ã¨Â©Â±Ã¥Â½Â¢Ã¥Â¼ÂÃ£ÂÂ§Ã£Æ’â€¢Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šâ€™Ã¤Â½Å“Ã¦Ë†Â
- `code-simplifier` - Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ®Ã£Æ’ÂªÃ£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¯Ã£â€šÂ¿Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°

**Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã¥â€œÂÃ¨Â³Âª:**
- `code-review` - Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼
- `pr-review-toolkit` - PRÃ¨â€¡ÂªÃ¥â€¹â€¢Ã¥Å’â€“
- `security-guidance` - Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯

**Ã¦Â¤Å“Ã§Â´Â¢:**
- `mgrep` - Ã¦â€¹Â¡Ã¥Â¼ÂµÃ¦Â¤Å“Ã§Â´Â¢Ã¯Â¼Ë†ripgrepÃ£â€šË†Ã£â€šÅ Ã¥â€žÂªÃ£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂ¾Ã£Ââ„¢Ã¯Â¼â€°
- `context7` - Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“Ã£Æ’â€°Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã¦Â¤Å“Ã§Â´Â¢

**Ã£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼:**
- `commit-commands` - GitÃ£Æ’Â¯Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’â€¢Ã£Æ’Â­Ã£Æ’Â¼
- `frontend-design` - UIÃ£Æ’â€˜Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Â³
- `feature-dev` - Ã¦Â©Å¸Ã¨Æ’Â½Ã©â€“â€¹Ã§â„¢Âº

---

## Ã£â€šÂ¯Ã£â€šÂ¤Ã£Æ’Æ’Ã£â€šÂ¯Ã£â€šÂ»Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”

```bash
# Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹Ã£â€šâ€™Ã¨Â¿Â½Ã¥Å Â 
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official
# mgrep plugin by @mixedbread-ai
claud plugin marketplace add https://github.com/mixedbread-ai/mgrep

# /pluginsÃ£â€šâ€™Ã©â€“â€¹Ã£ÂÂÃ£â‚¬ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ£â€šâ€šÃ£ÂÂ®Ã£â€šâ€™Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¼Ã£Æ’Â«
```

---

## Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£ÂÂ®Ã¥Â Â´Ã¦â€°â‚¬

```
~/.claude/plugins/
|-- cache/                    # Ã£Æ’â‚¬Ã£â€šÂ¦Ã£Æ’Â³Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’â€”Ã£Æ’Â©Ã£â€šÂ°Ã£â€šÂ¤Ã£Æ’Â³
|-- installed_plugins.json    # Ã£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¹Ã£Æ’Ë†Ã£Æ’Â¼Ã£Æ’Â«Ã¦Â¸Ë†Ã£ÂÂ¿Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†
|-- known_marketplaces.json   # Ã¨Â¿Â½Ã¥Å Â Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹
|-- marketplaces/             # Ã£Æ’Å¾Ã£Æ’Â¼Ã£â€šÂ±Ã£Æ’Æ’Ã£Æ’Ë†Ã£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤Ã£â€šÂ¹Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿
```
