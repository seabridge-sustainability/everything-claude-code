---
name: continuous-learning
description: Automatically extract reusable patterns from Claude Code sessions and save them as learned skills for future use.
---

# Ã¦Å’ÂÃ§ÂºÅ’Ã¥Â­Â¸Ã§Â¿â€™Ã¦Å â‚¬Ã¨Æ’Â½

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


Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¨Â©â€¢Ã¤Â¼Â° Claude Code Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§ÂµÂÃ¦ÂÅ¸Ã¦â„¢â€šÃ§Å¡â€žÃ¥â€¦Â§Ã¥Â®Â¹Ã¯Â¼Å’Ã¦ÂÂÃ¥Ââ€“Ã¥ÂÂ¯Ã©â€¡ÂÃ§â€Â¨Ã¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸Â¦Ã¥â€žÂ²Ã¥Â­ËœÃ§â€šÂºÃ¥Â­Â¸Ã§Â¿â€™Ã¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬â€š

## Ã©Ââ€¹Ã¤Â½Å“Ã¦â€“Â¹Ã¥Â¼Â

Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã¤Â½Å“Ã§â€šÂº **Stop hook** Ã¥Å“Â¨Ã¦Â¯ÂÃ¥â‚¬â€¹Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§ÂµÂÃ¦ÂÅ¸Ã¦â„¢â€šÃ¥Å¸Â·Ã¨Â¡Å’Ã¯Â¼Å¡

1. **Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¨Â©â€¢Ã¤Â¼Â°**Ã¯Â¼Å¡Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¦ËœÂ¯Ã¥ÂÂ¦Ã¦Å“â€°Ã¨Â¶Â³Ã¥Â¤Â Ã¨Â¨Å Ã¦ÂÂ¯Ã¯Â¼Ë†Ã©Â ÂÃ¨Â¨Â­Ã¯Â¼Å¡10+ Ã¥â€°â€¡Ã¯Â¼â€°
2. **Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥ÂÂµÃ¦Â¸Â¬**Ã¯Â¼Å¡Ã¥Â¾Å¾Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¨Â­ËœÃ¥Ë†Â¥Ã¥ÂÂ¯Ã¦ÂÂÃ¥Ââ€“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â
3. **Ã¦Å â‚¬Ã¨Æ’Â½Ã¦ÂÂÃ¥Ââ€“**Ã¯Â¼Å¡Ã¥Â°â€¡Ã¦Å“â€°Ã§â€Â¨Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€žÂ²Ã¥Â­ËœÃ¥Ë†Â° `~/.claude/skills/learned/`

## Ã¨Â¨Â­Ã¥Â®Å¡

Ã§Â·Â¨Ã¨Â¼Â¯ `config.json` Ã¤Â»Â¥Ã¨â€¡ÂªÃ¨Â¨â€šÃ¯Â¼Å¡

```json
{
  "min_session_length": 10,
  "extraction_threshold": "medium",
  "auto_approve": false,
  "learned_skills_path": "~/.claude/skills/learned/",
  "patterns_to_detect": [
    "error_resolution",
    "user_corrections",
    "workarounds",
    "debugging_techniques",
    "project_specific"
  ],
  "ignore_patterns": [
    "simple_typos",
    "one_time_fixes",
    "external_api_issues"
  ]
}
```

## Ã¦Â¨Â¡Ã¥Â¼ÂÃ©Â¡Å¾Ã¥Å¾â€¹

| Ã¦Â¨Â¡Ã¥Â¼Â | Ã¦ÂÂÃ¨Â¿Â° |
|------|------|
| `error_resolution` | Ã§â€°Â¹Ã¥Â®Å¡Ã©Å’Â¯Ã¨ÂªÂ¤Ã¥Â¦â€šÃ¤Â½â€¢Ã¨Â¢Â«Ã¨Â§Â£Ã¦Â±Âº |
| `user_corrections` | Ã¤Â¾â€ Ã¨â€¡ÂªÃ¤Â½Â¿Ã§â€Â¨Ã¨â‚¬â€¦Ã¤Â¿Â®Ã¦Â­Â£Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼Â |
| `workarounds` | Ã¦Â¡â€ Ã¦Å¾Â¶/Ã¥â€¡Â½Ã¥Â¼ÂÃ¥ÂºÂ«Ã¦â‚¬ÂªÃ§â€¢Â°Ã¥â€¢ÂÃ©Â¡Å’Ã§Å¡â€žÃ¨Â§Â£Ã¦Â±ÂºÃ¦â€“Â¹Ã¦Â¡Ë† |
| `debugging_techniques` | Ã¦Å“â€°Ã¦â€¢Ë†Ã§Å¡â€žÃ©â„¢Â¤Ã©Å’Â¯Ã¦â€“Â¹Ã¦Â³â€¢ |
| `project_specific` | Ã¥Â°Ë†Ã¦Â¡Ë†Ã§â€°Â¹Ã¥Â®Å¡Ã¦â€¦Â£Ã¤Â¾â€¹ |

## Hook Ã¨Â¨Â­Ã¥Â®Å¡

Ã¦â€“Â°Ã¥Â¢Å¾Ã¥Ë†Â°Ã¤Â½Â Ã§Å¡â€ž `~/.claude/settings.json`Ã¯Â¼Å¡

```json
{
  "hooks": {
    "Stop": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "~/.claude/skills/continuous-learning/evaluate-session.sh"
      }]
    }]
  }
}
```

## Ã§â€šÂºÃ¤Â»â‚¬Ã©ÂºÂ¼Ã§â€Â¨ Stop HookÃ¯Â¼Å¸

- **Ã¨Â¼â€¢Ã©â€¡Â**Ã¯Â¼Å¡Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§ÂµÂÃ¦ÂÅ¸Ã¦â„¢â€šÃ¥ÂÂªÃ¥Å¸Â·Ã¨Â¡Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡
- **Ã©ÂÅ¾Ã©ËœÂ»Ã¥Â¡Å¾**Ã¯Â¼Å¡Ã¤Â¸ÂÃ¦Å“Æ’Ã§â€šÂºÃ¦Â¯ÂÃ¥â€°â€¡Ã¨Â¨Å Ã¦ÂÂ¯Ã¥Â¢Å¾Ã¥Å Â Ã¥Â»Â¶Ã©ÂÂ²
- **Ã¥Â®Å’Ã¦â€¢Â´Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡**Ã¯Â¼Å¡Ã¥ÂÂ¯Ã¥Â­ËœÃ¥Ââ€“Ã¥Â®Å’Ã¦â€¢Â´Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¨Â¨ËœÃ©Å’â€ž

## Ã§â€ºÂ¸Ã©â€”Å“

- [Longform Guide](https://x.com/affaanmustafa/status/2014040193557471352) - Ã¦Å’ÂÃ§ÂºÅ’Ã¥Â­Â¸Ã§Â¿â€™Ã§Â«Â Ã§Â¯â‚¬
- `/learn` Ã¦Å’â€¡Ã¤Â»Â¤ - Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ¤Â¸Â­Ã¦â€°â€¹Ã¥â€¹â€¢Ã¦ÂÂÃ¥Ââ€“Ã¦Â¨Â¡Ã¥Â¼Â

---

## Ã¦Â¯â€Ã¨Â¼Æ’Ã§Â­â€ Ã¨Â¨ËœÃ¯Â¼Ë†Ã§Â â€Ã§Â©Â¶Ã¯Â¼Å¡2025 Ã¥Â¹Â´ 1 Ã¦Å“Ë†Ã¯Â¼â€°

### vs Homunculus

Homunculus v2 Ã¦Å½Â¡Ã§â€Â¨Ã¦â€ºÂ´Ã¨Â¤â€¡Ã©â€ºÅ“Ã§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢Ã¯Â¼Å¡

| Ã¥Å Å¸Ã¨Æ’Â½ | Ã¦Ë†â€˜Ã¥â‚¬â€˜Ã§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢ | Homunculus v2 |
|------|----------|---------------|
| Ã¨Â§â‚¬Ã¥Â¯Å¸ | Stop hookÃ¯Â¼Ë†Ã¥Â·Â¥Ã¤Â½Å“Ã©Å¡Å½Ã¦Â®ÂµÃ§ÂµÂÃ¦ÂÅ¸Ã¯Â¼â€° | PreToolUse/PostToolUse hooksÃ¯Â¼Ë†100% Ã¥ÂÂ¯Ã©ÂÂ Ã¯Â¼â€° |
| Ã¥Ë†â€ Ã¦Å¾Â | Ã¤Â¸Â»Ã¨Â¦ÂÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡ | Ã¨Æ’Å’Ã¦â„¢Â¯ agentÃ¯Â¼Ë†HaikuÃ¯Â¼â€° |
| Ã§Â²â€™Ã¥ÂºÂ¦ | Ã¥Â®Å’Ã¦â€¢Â´Ã¦Å â‚¬Ã¨Æ’Â½ | Ã¥Å½Å¸Ã¥Â­ÂÃ£â‚¬Å’Ã¦Å“Â¬Ã¨Æ’Â½Ã£â‚¬Â |
| Ã¤Â¿Â¡Ã¥Â¿Æ’ | Ã§â€žÂ¡ | 0.3-0.9 Ã¥Å Â Ã¦Â¬Å  |
| Ã¦Â¼â€Ã¥Å’â€“ | Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Ë†Â°Ã¦Å â‚¬Ã¨Æ’Â½ | Ã¦Å“Â¬Ã¨Æ’Â½ Ã¢â€ â€™ Ã¨ÂÅ¡Ã©Â¡Å¾ Ã¢â€ â€™ Ã¦Å â‚¬Ã¨Æ’Â½/Ã¦Å’â€¡Ã¤Â»Â¤/agent |
| Ã¥Ë†â€ Ã¤ÂºÂ« | Ã§â€žÂ¡ | Ã¥Å’Â¯Ã¥â€¡Âº/Ã¥Å’Â¯Ã¥â€¦Â¥Ã¦Å“Â¬Ã¨Æ’Â½ |

**Ã¤Â¾â€ Ã¨â€¡Âª homunculus Ã§Å¡â€žÃ©â€”Å“Ã©ÂÂµÃ¨Â¦â€¹Ã¨Â§Â£Ã¯Â¼Å¡**
> "v1 Ã¤Â¾ÂÃ¨Â³Â´Ã¦Å â‚¬Ã¨Æ’Â½Ã©â‚¬Â²Ã¨Â¡Å’Ã¨Â§â‚¬Ã¥Â¯Å¸Ã£â‚¬â€šÃ¦Å â‚¬Ã¨Æ’Â½Ã¦ËœÂ¯Ã¦Â©Å¸Ã§Å½â€¡Ã¦â‚¬Â§Ã§Å¡â€žÃ¢â‚¬â€Ã¢â‚¬â€Ã¥Â®Æ’Ã¥â‚¬â€˜Ã¨Â§Â¸Ã§â„¢Â¼Ã§Â´â€ž 50-80% Ã§Å¡â€žÃ¦â„¢â€šÃ©â€“â€œÃ£â‚¬â€šv2 Ã¤Â½Â¿Ã§â€Â¨ hooks Ã©â‚¬Â²Ã¨Â¡Å’Ã¨Â§â‚¬Ã¥Â¯Å¸Ã¯Â¼Ë†100% Ã¥ÂÂ¯Ã©ÂÂ Ã¯Â¼â€°Ã¯Â¼Å’Ã¤Â¸Â¦Ã¤Â»Â¥Ã¦Å“Â¬Ã¨Æ’Â½Ã¤Â½Å“Ã§â€šÂºÃ¥Â­Â¸Ã§Â¿â€™Ã¨Â¡Å’Ã§â€šÂºÃ§Å¡â€žÃ¥Å½Å¸Ã¥Â­ÂÃ¥â€“Â®Ã¤Â½ÂÃ£â‚¬â€š"

### Ã¦Â½â€ºÃ¥Å“Â¨ v2 Ã¥Â¢Å¾Ã¥Â¼Â·

1. **Ã¥Å¸ÂºÃ¦â€“Â¼Ã¦Å“Â¬Ã¨Æ’Â½Ã§Å¡â€žÃ¥Â­Â¸Ã§Â¿â€™** - Ã¨Â¼Æ’Ã¥Â°ÂÃ§Å¡â€žÃ¥Å½Å¸Ã¥Â­ÂÃ¨Â¡Å’Ã§â€šÂºÃ¯Â¼Å’Ã¥Â¸Â¶Ã¤Â¿Â¡Ã¥Â¿Æ’Ã¨Â©â€¢Ã¥Ë†â€ 
2. **Ã¨Æ’Å’Ã¦â„¢Â¯Ã¨Â§â‚¬Ã¥Â¯Å¸Ã¨â‚¬â€¦** - Haiku agent Ã¤Â¸Â¦Ã¨Â¡Å’Ã¥Ë†â€ Ã¦Å¾Â
3. **Ã¤Â¿Â¡Ã¥Â¿Æ’Ã¨Â¡Â°Ã¦Â¸â€º** - Ã¥Â¦â€šÃ¦Å¾Å“Ã¨Â¢Â«Ã§Å¸â€ºÃ§â€ºÂ¾Ã¥â€°â€¡Ã¦Å“Â¬Ã¨Æ’Â½Ã¥Â¤Â±Ã¥Å½Â»Ã¤Â¿Â¡Ã¥Â¿Æ’
4. **Ã©Â ËœÃ¥Å¸Å¸Ã¦Â¨â„¢Ã¨Â¨Ëœ** - code-styleÃ£â‚¬ÂtestingÃ£â‚¬ÂgitÃ£â‚¬Âdebugging Ã§Â­â€°
5. **Ã¦Â¼â€Ã¥Å’â€“Ã¨Â·Â¯Ã¥Â¾â€˜** - Ã¥Â°â€¡Ã§â€ºÂ¸Ã©â€”Å“Ã¦Å“Â¬Ã¨Æ’Â½Ã¨ÂÅ¡Ã©Â¡Å¾Ã§â€šÂºÃ¦Å â‚¬Ã¨Æ’Â½/Ã¦Å’â€¡Ã¤Â»Â¤

Ã¥ÂÆ’Ã¨Â¦â€¹Ã¯Â¼Å¡`docs/continuous-learning-v2-spec.md` Ã¥Â®Å’Ã¦â€¢Â´Ã¨Â¦ÂÃ¦Â Â¼Ã£â‚¬â€š
