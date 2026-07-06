# Ã¦Ââ€™Ã¤Â»Â¶Ã¤Â¸Å½Ã¥Â¸â€šÃ¥Å“Âº

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


Ã¦Ââ€™Ã¤Â»Â¶Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Claude Code Ã§Å¡â€žÃ¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å’Ã¤Â¸ÂºÃ¥â€¦Â¶Ã¦Â·Â»Ã¥Å Â Ã¦â€“Â°Ã¥Â·Â¥Ã¥â€¦Â·Ã¥â€™Å’Ã¨Æ’Â½Ã¥Å â€ºÃ£â‚¬â€šÃ¦Å“Â¬Ã¦Å’â€¡Ã¥Ââ€”Ã¤Â»â€¦Ã¦Â¶ÂµÃ§â€ºâ€“Ã¥Â®â€°Ã¨Â£â€¦Ã©Æ’Â¨Ã¥Ë†â€  - Ã¥â€¦Â³Ã¤ÂºÅ½Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â»Â¥Ã¥ÂÅ Ã¤Â¸ÂºÃ¤Â½â€¢Ã¤Â½Â¿Ã§â€Â¨Ã¦Ââ€™Ã¤Â»Â¶Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦[Ã¥Â®Å’Ã¦â€¢Â´Ã¦â€“â€¡Ã§Â«Â ](https://x.com/affaanmustafa/status/2012378465664745795)Ã£â‚¬â€š

***

## Ã¥Â¸â€šÃ¥Å“Âº

Ã¥Â¸â€šÃ¥Å“ÂºÃ¦ËœÂ¯Ã¥ÂÂ¯Ã¥Â®â€°Ã¨Â£â€¦Ã¦Ââ€™Ã¤Â»Â¶Ã§Å¡â€žÃ¥Â­ËœÃ¥â€šÂ¨Ã¥Âºâ€œÃ£â‚¬â€š

### Ã¦Â·Â»Ã¥Å Â Ã¥Â¸â€šÃ¥Å“Âº

```bash
# Add official Anthropic marketplace
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official

# Add community marketplaces (mgrep by @mixedbread-ai)
claude plugin marketplace add https://github.com/mixedbread-ai/mgrep
```

### Ã¦Å½Â¨Ã¨ÂÂÃ¥Â¸â€šÃ¥Å“Âº

| Ã¥Â¸â€šÃ¥Å“Âº | Ã¦ÂÂ¥Ã¦ÂºÂ |
|-------------|--------|
| claude-plugins-official | `anthropics/claude-plugins-official` |
| claude-code-plugins | `anthropics/claude-code` |
| Mixedbread-Grep (@mixedbread-ai) | `mixedbread-ai/mgrep` |

***

## Ã¥Â®â€°Ã¨Â£â€¦Ã¦Ââ€™Ã¤Â»Â¶

```bash
# Open plugins browser
/plugins

# Or install directly
claude plugin install typescript-lsp@claude-plugins-official
```

### Ã¦Å½Â¨Ã¨ÂÂÃ¦Ââ€™Ã¤Â»Â¶

**Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¯Â¼Å¡**

* `typescript-lsp` - TypeScript Ã¦â„¢ÂºÃ¨Æ’Â½Ã¦â€Â¯Ã¦Å’Â
* `pyright-lsp` - Python Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â£â‚¬Ã¦Å¸Â¥
* `hookify` - Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥Â¯Â¹Ã¨Â¯ÂÃ¥Ë†â€ºÃ¥Â»ÂºÃ©â€™Â©Ã¥Â­Â
* `code-simplifier` - Ã¤Â»Â£Ã§Â ÂÃ©â€¡ÂÃ¦Å¾â€ž

**Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ¯Â¼Å¡**

* `code-review` - Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥
* `pr-review-toolkit` - PR Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“
* `security-guidance` - Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥

**Ã¦ÂÅ“Ã§Â´Â¢Ã¯Â¼Å¡**

* `mgrep` - Ã¥Â¢Å¾Ã¥Â¼ÂºÃ¦ÂÅ“Ã§Â´Â¢Ã¯Â¼Ë†Ã¤Â¼ËœÃ¤ÂºÅ½ ripgrepÃ¯Â¼â€°
* `context7` - Ã¥Â®Å¾Ã¦â€”Â¶Ã¦â€“â€¡Ã¦Â¡Â£Ã¦Å¸Â¥Ã¦â€°Â¾

**Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ¯Â¼Å¡**

* `commit-commands` - Git Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ
* `frontend-design` - UI Ã¦Â¨Â¡Ã¥Â¼Â
* `feature-dev` - Ã¥Å Å¸Ã¨Æ’Â½Ã¥Â¼â‚¬Ã¥Ââ€˜

***

## Ã¥Â¿Â«Ã©â‚¬Å¸Ã¨Â®Â¾Ã§Â½Â®

```bash
# Add marketplaces
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official
claude plugin marketplace add https://github.com/mixedbread-ai/mgrep

# Open /plugins and install what you need
```

***

## Ã¦Ââ€™Ã¤Â»Â¶Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â½ÂÃ§Â½Â®

```
~/.claude/plugins/
|-- cache/                    # Ã¥Â·Â²Ã¤Â¸â€¹Ã¨Â½Â½Ã§Å¡â€žÃ¦Ââ€™Ã¤Â»Â¶
|-- installed_plugins.json    # Ã¥Â·Â²Ã¥Â®â€°Ã¨Â£â€¦Ã¥Ë†â€”Ã¨Â¡Â¨
|-- known_marketplaces.json   # Ã¥Â·Â²Ã¦Â·Â»Ã¥Å Â Ã§Å¡â€žÃ¥Â¸â€šÃ¥Å“Âº
|-- marketplaces/             # Ã¥Â¸â€šÃ¥Å“ÂºÃ¦â€¢Â°Ã¦ÂÂ®
```
