---
name: skill-health
description: Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦Å â‚¬Ã¨Æ’Â½Ã§Â»â€žÃ¥ÂË†Ã¥ÂÂ¥Ã¥ÂºÂ·Ã¤Â»ÂªÃ¨Â¡Â¨Ã¦ÂÂ¿Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¥â€ºÂ¾Ã¨Â¡Â¨Ã¥â€™Å’Ã¥Ë†â€ Ã¦Å¾Â
command: true
---

# Ã¦Å â‚¬Ã¨Æ’Â½Ã¥ÂÂ¥Ã¥ÂºÂ·Ã¤Â»ÂªÃ¨Â¡Â¨Ã§â€ºËœ

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


Ã¥Â±â€¢Ã§Â¤ÂºÃ¦Å â€¢Ã¨Âµâ€žÃ§Â»â€žÃ¥ÂË†Ã¤Â¸Â­Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ§Â»Â¼Ã¥ÂË†Ã¥ÂÂ¥Ã¥ÂºÂ·Ã¤Â»ÂªÃ¨Â¡Â¨Ã§â€ºËœÃ¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¦Ë†ÂÃ¥Å Å¸Ã§Å½â€¡Ã¨ÂµÂ°Ã¥Å Â¿Ã¥â€ºÂ¾Ã£â‚¬ÂÃ¦â€¢â€¦Ã©Å¡Å“Ã¦Â¨Â¡Ã¥Â¼ÂÃ¨ÂÅ¡Ã§Â±Â»Ã£â‚¬ÂÃ¥Â¾â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¿Â®Ã¨Â®Â¢Ã¥â€™Å’Ã§â€°Ë†Ã¦Å“Â¬Ã¥Å½â€ Ã¥ÂÂ²Ã£â‚¬â€š

## Ã¥Â®Å¾Ã§Å½Â°

Ã¥Å“Â¨Ã¤Â»ÂªÃ¨Â¡Â¨Ã§â€ºËœÃ¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸â€¹Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å â‚¬Ã¨Æ’Â½Ã¥ÂÂ¥Ã¥ÂºÂ· CLIÃ¯Â¼Å¡

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(!f.existsSync(p.join(d,q))){try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q))){d=c;break}}}catch(x){}}console.log(d)")}"
node "$ECC_ROOT/scripts/skills-health.js" --dashboard
```

Ã¤Â»â€¦Ã©â€™Ë†Ã¥Â¯Â¹Ã§â€°Â¹Ã¥Â®Å¡Ã©ÂÂ¢Ã¦ÂÂ¿Ã¯Â¼Å¡

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(!f.existsSync(p.join(d,q))){try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q))){d=c;break}}}catch(x){}}console.log(d)")}"
node "$ECC_ROOT/scripts/skills-health.js" --dashboard --panel failures
```

Ã¨Å½Â·Ã¥Ââ€“Ã¦Å“ÂºÃ¥â„¢Â¨Ã¥ÂÂ¯Ã¨Â¯Â»Ã¨Â¾â€œÃ¥â€¡ÂºÃ¯Â¼Å¡

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var p=require('path'),f=require('fs'),h=require('os').homedir(),d=p.join(h,'.claude'),q=p.join('scripts','lib','utils.js');if(!f.existsSync(p.join(d,q))){try{var b=p.join(d,'plugins','cache','everything-claude-code');for(var o of f.readdirSync(b))for(var v of f.readdirSync(p.join(b,o))){var c=p.join(b,o,v);if(f.existsSync(p.join(c,q))){d=c;break}}}catch(x){}}console.log(d)")}"
node "$ECC_ROOT/scripts/skills-health.js" --dashboard --json
```

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€“Â¹Ã¦Â³â€¢

```
/skill-health                    # Ã¥Â®Å’Ã¦â€¢Â´Ã¤Â»ÂªÃ¨Â¡Â¨Ã§â€ºËœÃ¨Â§â€ Ã¥â€ºÂ¾
/skill-health --panel failures   # Ã¤Â»â€¦Ã¦â€¢â€¦Ã©Å¡Å“Ã¨ÂÅ¡Ã§Â±Â»Ã©ÂÂ¢Ã¦ÂÂ¿
/skill-health --json             # Ã¦Å“ÂºÃ¥â„¢Â¨Ã¥ÂÂ¯Ã¨Â¯Â»Ã§Å¡â€ž JSON Ã¨Â¾â€œÃ¥â€¡Âº
```

## Ã¦â€œÂÃ¤Â½Å“Ã¦Â­Â¥Ã©ÂªÂ¤

1. Ã¤Â½Â¿Ã§â€Â¨ --dashboard Ã¦Â â€¡Ã¥Â¿â€”Ã¨Â¿ÂÃ¨Â¡Å’ skills-health.js Ã¨â€žÅ¡Ã¦Å“Â¬
2. Ã¥Ââ€˜Ã§â€Â¨Ã¦Ë†Â·Ã¦ËœÂ¾Ã§Â¤ÂºÃ¨Â¾â€œÃ¥â€¡Âº
3. Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“â€°Ã¤Â»Â»Ã¤Â½â€¢Ã¦Å â‚¬Ã¨Æ’Â½Ã¥â€¡ÂºÃ§Å½Â°Ã¨Â¡Â°Ã©â‚¬â‚¬Ã¯Â¼Å’Ã©Â«ËœÃ¤ÂºÂ®Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥Â¹Â¶Ã¥Â»ÂºÃ¨Â®Â®Ã¨Â¿ÂÃ¨Â¡Å’ /evolve
4. Ã¥Â¦â€šÃ¦Å¾Å“Ã¦Å“â€°Ã¥Â¾â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¿Â®Ã¨Â®Â¢Ã¯Â¼Å’Ã¥Â»ÂºÃ¨Â®Â®Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â®Â¡Ã¦Å¸Â¥

## Ã©ÂÂ¢Ã¦ÂÂ¿

* **Ã¦Ë†ÂÃ¥Å Å¸Ã§Å½â€¡ (30Ã¥Â¤Â©)** Ã¢â‚¬â€ Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦Â¯ÂÃ¤Â¸ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã¦Â¯ÂÃ¦â€”Â¥Ã¦Ë†ÂÃ¥Å Å¸Ã§Å½â€¡Ã§Å¡â€žÃ¨ÂµÂ°Ã¥Å Â¿Ã¥â€ºÂ¾
* **Ã¦â€¢â€¦Ã©Å¡Å“Ã¦Â¨Â¡Ã¥Â¼Â** Ã¢â‚¬â€ Ã¨ÂÅ¡Ã§Â±Â»Ã¦â€¢â€¦Ã©Å¡Å“Ã¥Å½Å¸Ã¥â€ºÂ Ã¥Â¹Â¶Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦Â°Â´Ã¥Â¹Â³Ã¦ÂÂ¡Ã¥Â½Â¢Ã¥â€ºÂ¾
* **Ã¥Â¾â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¿Â®Ã¨Â®Â¢** Ã¢â‚¬â€ Ã§Â­â€°Ã¥Â¾â€¦Ã¥Â®Â¡Ã¦Å¸Â¥Ã§Å¡â€žÃ¤Â¿Â®Ã¨Â®Â¢Ã¦ÂÂÃ¦Â¡Ë†
* **Ã§â€°Ë†Ã¦Å“Â¬Ã¥Å½â€ Ã¥ÂÂ²** Ã¢â‚¬â€ Ã¦Â¯ÂÃ¤Â¸ÂªÃ¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ§â€°Ë†Ã¦Å“Â¬Ã¥Â¿Â«Ã§â€¦Â§Ã¦â€”Â¶Ã©â€”Â´Ã§ÂºÂ¿
