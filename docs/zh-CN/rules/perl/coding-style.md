---
paths:
  - "**/*.pl"
  - "**/*.pm"
  - "**/*.t"
  - "**/*.psgi"
  - "**/*.cgi"
---

# Perl Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/coding-style.md](../common/coding-style.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¯Â¼Å’Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  Perl Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â â€¡Ã¥â€¡â€ 

* Ã¥Â§â€¹Ã§Â»Ë† `use v5.36`Ã¯Â¼Ë†Ã¥ÂÂ¯Ã§â€Â¨ `strict`Ã£â‚¬Â`warnings`Ã£â‚¬Â`say` Ã¥â€™Å’Ã¥Â­ÂÃ§Â¨â€¹Ã¥ÂºÂÃ§Â­Â¾Ã¥ÂÂÃ¯Â¼â€°
* Ã¤Â½Â¿Ã§â€Â¨Ã¥Â­ÂÃ§Â¨â€¹Ã¥ÂºÂÃ§Â­Â¾Ã¥ÂÂ Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¦â€°â€¹Ã¥Å Â¨Ã¨Â§Â£Ã¥Å’â€¦ `@_`
* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `say` Ã¨â‚¬Å’Ã©ÂÅ¾Ã¦ËœÂ¾Ã¥Â¼ÂÃ¦ÂÂ¢Ã¨Â¡Å’Ã§Å¡â€ž `print`

## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§

* Ã¥Â¯Â¹Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â±Å¾Ã¦â‚¬Â§Ã¤Â½Â¿Ã§â€Â¨ **Moo**Ã¯Â¼Å’Ã¥Â¹Â¶Ã©â€¦ÂÃ¥ÂË† `is => 'ro'` Ã¥â€™Å’ `Types::Standard`
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã§â€ºÂ´Ã¦Å½Â¥Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¢Â«Ã§Â¥ÂÃ§Â¦ÂÃ§Å¡â€žÃ¥â€œË†Ã¥Â¸Å’Ã¥Â¼â€¢Ã§â€Â¨ Ã¢â‚¬â€ Ã¥Â§â€¹Ã§Â»Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡ Moo/Moose Ã¨Â®Â¿Ã©â€”Â®Ã¥â„¢Â¨
* **Ã©ÂÂ¢Ã¥Ââ€˜Ã¥Â¯Â¹Ã¨Â±Â¡Ã¨Â¦â€ Ã§â€ºâ€“Ã¨Â¯Â´Ã¦ËœÅ½**Ã¯Â¼Å¡Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¨Â®Â¡Ã§Â®â€”Ã¥Â¾â€”Ã¥â€¡ÂºÃ§Å¡â€žÃ¥ÂÂªÃ¨Â¯Â»Ã¥â‚¬Â¼Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ Moo `has` Ã¥Â±Å¾Ã¦â‚¬Â§Ã¥Â¹Â¶Ã©â€¦ÂÃ¥ÂË† `builder` Ã¦Ë†â€“ `default` Ã¦ËœÂ¯Ã¥ÂÂ¯Ã¤Â»Â¥Ã¦Å½Â¥Ã¥Ââ€”Ã§Å¡â€ž

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

Ã¤Â½Â¿Ã§â€Â¨ **perltidy** Ã¥Â¹Â¶Ã©â€¡â€¡Ã§â€Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¨Â®Â¾Ã§Â½Â®Ã¯Â¼Å¡

```
-i=4    # 4 Ã§Â©ÂºÃ¦Â Â¼Ã§Â¼Â©Ã¨Â¿â€º
-l=100  # 100 Ã¥Â­â€”Ã§Â¬Â¦Ã¨Â¡Å’Ã¥Â®Â½
-ce     # else Ã§Â´Â§Ã¨Â´Â´Ã¥â€°ÂÃ¦â€¹Â¬Ã¥ÂÂ·
-bar    # Ã¥Â·Â¦Ã¨Å Â±Ã¦â€¹Â¬Ã¥ÂÂ·Ã¥Â§â€¹Ã§Â»Ë†Ã¥Å“Â¨Ã¥ÂÂ³Ã¤Â¾Â§
```

## Ã¤Â»Â£Ã§Â ÂÃ¦Â£â‚¬Ã¦Å¸Â¥

Ã¤Â½Â¿Ã§â€Â¨ **perlcritic**Ã¯Â¼Å’Ã¤Â¸Â¥Ã©â€¡ÂÃ§ÂºÂ§Ã¥Ë†Â«Ã¨Â®Â¾Ã¤Â¸Âº 3Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥ÂÂ¯Ã§â€Â¨Ã¤Â¸Â»Ã©Â¢ËœÃ¯Â¼Å¡`core`Ã£â‚¬Â`pbp`Ã£â‚¬Â`security`Ã£â‚¬â€š

```bash
perlcritic --severity 3 --theme 'core || pbp || security' lib/
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å¸Â¥Ã§Å“â€¹Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`perl-patterns`Ã¯Â¼Å’Ã¤Âºâ€ Ã¨Â§Â£Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žÃ§Å½Â°Ã¤Â»Â£ Perl Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â³â€¢Ã¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ£â‚¬â€š
