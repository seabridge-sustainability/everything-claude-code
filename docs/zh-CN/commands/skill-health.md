---
name: skill-health
description: Ã¦ËœÂ¾Ã§Â¤ÂºÃ¦Å â‚¬Ã¨Æ’Â½Ã§Â»â€žÃ¥ÂË†Ã¥ÂÂ¥Ã¥ÂºÂ·Ã¤Â»ÂªÃ¨Â¡Â¨Ã¦ÂÂ¿Ã¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¥â€ºÂ¾Ã¨Â¡Â¨Ã¥â€™Å’Ã¥Ë†â€ Ã¦Å¾Â
command: true
---

# Ã¦Å â‚¬Ã¨Æ’Â½Ã¥ÂÂ¥Ã¥ÂºÂ·Ã¤Â»ÂªÃ¨Â¡Â¨Ã§â€ºËœ

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


Ã¥Â±â€¢Ã§Â¤ÂºÃ¦Å â€¢Ã¨Âµâ€žÃ§Â»â€žÃ¥ÂË†Ã¤Â¸Â­Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ§Â»Â¼Ã¥ÂË†Ã¥ÂÂ¥Ã¥ÂºÂ·Ã¤Â»ÂªÃ¨Â¡Â¨Ã§â€ºËœÃ¯Â¼Å’Ã¥Å’â€¦Ã¥ÂÂ«Ã¦Ë†ÂÃ¥Å Å¸Ã§Å½â€¡Ã¨ÂµÂ°Ã¥Å Â¿Ã¥â€ºÂ¾Ã£â‚¬ÂÃ¦â€¢â€¦Ã©Å¡Å“Ã¦Â¨Â¡Ã¥Â¼ÂÃ¨ÂÅ¡Ã§Â±Â»Ã£â‚¬ÂÃ¥Â¾â€¦Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¿Â®Ã¨Â®Â¢Ã¥â€™Å’Ã§â€°Ë†Ã¦Å“Â¬Ã¥Å½â€ Ã¥ÂÂ²Ã£â‚¬â€š

## Ã¥Â®Å¾Ã§Å½Â°

Ã¥Å“Â¨Ã¤Â»ÂªÃ¨Â¡Â¨Ã§â€ºËœÃ¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸â€¹Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å â‚¬Ã¨Æ’Â½Ã¥ÂÂ¥Ã¥ÂºÂ· CLIÃ¯Â¼Å¡

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var r=(function(){var p=require('path'),f=require('fs'),o=require('os');var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var d=p.join(o.homedir(),'.claude');function L(x){try{return require(p.join(x,'scripts','lib','resolve-ecc-root')).resolveEccRoot()}catch(_){return null}}var r=L(d);if(r)return r;var s=['ecc','ecc@ecc','marketplaces/ecc','everything-claude-code','everything-claude-code@everything-claude-code','marketplaces/everything-claude-code'];for(var i=0;i<s.length;i++){r=L(p.join(d,'plugins',s[i]));if(r)return r}try{var g=['ecc','everything-claude-code'];for(var j=0;j<g.length;j++){var c=p.join(d,'plugins','cache',g[j]);var O=f.readdirSync(c);for(var k=0;k<O.length;k++){var q=p.join(c,O[k]);var V=f.readdirSync(q);for(var m=0;m<V.length;m++){r=L(p.join(q,V[m]));if(r)return r}}}}catch(_){}return d})();console.log(r)")}"
node "$ECC_ROOT/scripts/skills-health.js" --dashboard
```

Ã¤Â»â€¦Ã©â€™Ë†Ã¥Â¯Â¹Ã§â€°Â¹Ã¥Â®Å¡Ã©ÂÂ¢Ã¦ÂÂ¿Ã¯Â¼Å¡

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var r=(function(){var p=require('path'),f=require('fs'),o=require('os');var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var d=p.join(o.homedir(),'.claude');function L(x){try{return require(p.join(x,'scripts','lib','resolve-ecc-root')).resolveEccRoot()}catch(_){return null}}var r=L(d);if(r)return r;var s=['ecc','ecc@ecc','marketplaces/ecc','everything-claude-code','everything-claude-code@everything-claude-code','marketplaces/everything-claude-code'];for(var i=0;i<s.length;i++){r=L(p.join(d,'plugins',s[i]));if(r)return r}try{var g=['ecc','everything-claude-code'];for(var j=0;j<g.length;j++){var c=p.join(d,'plugins','cache',g[j]);var O=f.readdirSync(c);for(var k=0;k<O.length;k++){var q=p.join(c,O[k]);var V=f.readdirSync(q);for(var m=0;m<V.length;m++){r=L(p.join(q,V[m]));if(r)return r}}}}catch(_){}return d})();console.log(r)")}"
node "$ECC_ROOT/scripts/skills-health.js" --dashboard --panel failures
```

Ã¨Å½Â·Ã¥Ââ€“Ã¦Å“ÂºÃ¥â„¢Â¨Ã¥ÂÂ¯Ã¨Â¯Â»Ã¨Â¾â€œÃ¥â€¡ÂºÃ¯Â¼Å¡

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var r=(function(){var p=require('path'),f=require('fs'),o=require('os');var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var d=p.join(o.homedir(),'.claude');function L(x){try{return require(p.join(x,'scripts','lib','resolve-ecc-root')).resolveEccRoot()}catch(_){return null}}var r=L(d);if(r)return r;var s=['ecc','ecc@ecc','marketplaces/ecc','everything-claude-code','everything-claude-code@everything-claude-code','marketplaces/everything-claude-code'];for(var i=0;i<s.length;i++){r=L(p.join(d,'plugins',s[i]));if(r)return r}try{var g=['ecc','everything-claude-code'];for(var j=0;j<g.length;j++){var c=p.join(d,'plugins','cache',g[j]);var O=f.readdirSync(c);for(var k=0;k<O.length;k++){var q=p.join(c,O[k]);var V=f.readdirSync(q);for(var m=0;m<V.length;m++){r=L(p.join(q,V[m]));if(r)return r}}}}catch(_){}return d})();console.log(r)")}"
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
