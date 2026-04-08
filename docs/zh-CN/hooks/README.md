# Ã©â€™Â©Ã¥Â­Â

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã©â€™Â©Ã¥Â­ÂÃ¦ËœÂ¯Ã¤Âºâ€¹Ã¤Â»Â¶Ã©Â©Â±Ã¥Å Â¨Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã§Â¨â€¹Ã¥ÂºÂÃ¯Â¼Å’Ã¥Å“Â¨ Claude Code Ã¥Â·Â¥Ã¥â€¦Â·Ã¦â€°Â§Ã¨Â¡Å’Ã¥â€°ÂÃ¥ÂÅ½Ã¨Â§Â¦Ã¥Ââ€˜Ã£â‚¬â€šÃ¥Â®Æ’Ã¤Â»Â¬Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡ÂÃ£â‚¬ÂÃ¥ÂÅ Ã¦â€”Â©Ã¥Ââ€˜Ã§Å½Â°Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â»Â¥Ã¥ÂÅ Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã©â€¡ÂÃ¥Â¤ÂÃ¦â‚¬Â§Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€š

## Ã©â€™Â©Ã¥Â­ÂÃ¥Â¦â€šÃ¤Â½â€¢Ã¥Â·Â¥Ã¤Â½Å“

```
Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¯Â·Ã¦Â±â€š Ã¢â€ â€™ Claude Ã©â‚¬â€°Ã¦â€¹Â©Ã¥Â·Â¥Ã¥â€¦Â· Ã¢â€ â€™ PreToolUse Ã©â€™Â©Ã¥Â­ÂÃ¨Â¿ÂÃ¨Â¡Å’ Ã¢â€ â€™ Ã¥Â·Â¥Ã¥â€¦Â·Ã¦â€°Â§Ã¨Â¡Å’ Ã¢â€ â€™ PostToolUse Ã©â€™Â©Ã¥Â­ÂÃ¨Â¿ÂÃ¨Â¡Å’
```

* **PreToolUse** Ã©â€™Â©Ã¥Â­ÂÃ¥Å“Â¨Ã¥Â·Â¥Ã¥â€¦Â·Ã¦â€°Â§Ã¨Â¡Å’Ã¥â€°ÂÃ¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€šÃ¥Â®Æ’Ã¤Â»Â¬Ã¥ÂÂ¯Ã¤Â»Â¥**Ã©ËœÂ»Ã¦Â­Â¢**Ã¯Â¼Ë†Ã©â‚¬â‚¬Ã¥â€¡ÂºÃ§Â Â 2Ã¯Â¼â€°Ã¦Ë†â€“**Ã¨Â­Â¦Ã¥â€˜Å **Ã¯Â¼Ë†stderr Ã¨Â¾â€œÃ¥â€¡ÂºÃ¤Â½â€ Ã¤Â¸ÂÃ©ËœÂ»Ã¦Â­Â¢Ã¯Â¼â€°Ã£â‚¬â€š
* **PostToolUse** Ã©â€™Â©Ã¥Â­ÂÃ¥Å“Â¨Ã¥Â·Â¥Ã¥â€¦Â·Ã¥Â®Å’Ã¦Ë†ÂÃ¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€šÃ¥Â®Æ’Ã¤Â»Â¬Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥Ë†â€ Ã¦Å¾ÂÃ¨Â¾â€œÃ¥â€¡ÂºÃ¤Â½â€ Ã¤Â¸ÂÃ¨Æ’Â½Ã©ËœÂ»Ã¦Â­Â¢Ã¦â€°Â§Ã¨Â¡Å’Ã£â‚¬â€š
* **Stop** Ã©â€™Â©Ã¥Â­ÂÃ¥Å“Â¨Ã¦Â¯ÂÃ¦Â¬Â¡ Claude Ã¥â€œÂÃ¥Âºâ€Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€š
* **SessionStart/SessionEnd** Ã©â€™Â©Ã¥Â­ÂÃ¥Å“Â¨Ã¤Â¼Å¡Ã¨Â¯ÂÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã§Å¡â€žÃ¨Â¾Â¹Ã§â€¢Å’Ã¥Â¤â€žÃ¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€š
* **PreCompact** Ã©â€™Â©Ã¥Â­ÂÃ¥Å“Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¥Å½â€¹Ã§Â¼Â©Ã¥â€°ÂÃ¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å’Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¤Â¿ÂÃ¥Â­ËœÃ§Å Â¶Ã¦â‚¬ÂÃ£â‚¬â€š

## Ã¦Å“Â¬Ã¦Ââ€™Ã¤Â»Â¶Ã¤Â¸Â­Ã§Å¡â€žÃ©â€™Â©Ã¥Â­Â

### PreToolUse Ã©â€™Â©Ã¥Â­Â

| Ã©â€™Â©Ã¥Â­Â | Ã¥Å’Â¹Ã©â€¦ÂÃ¥â„¢Â¨ | Ã¨Â¡Å’Ã¤Â¸Âº | Ã©â‚¬â‚¬Ã¥â€¡ÂºÃ§Â Â |
|------|---------|----------|-----------|
| **Ã¥Â¼â‚¬Ã¥Ââ€˜Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¦â€¹Â¦Ã¦Ë†ÂªÃ¥â„¢Â¨** | `Bash` | Ã¥Å“Â¨ tmux Ã¥Â¤â€“Ã©ËœÂ»Ã¦Â­Â¢ `npm run dev` Ã§Â­â€°Ã¥â€˜Â½Ã¤Â»Â¤ Ã¢â‚¬â€ Ã§Â¡Â®Ã¤Â¿ÂÃ¦â€”Â¥Ã¥Â¿â€”Ã¥ÂÂ¯Ã¨Â®Â¿Ã©â€”Â® | 2 (Ã¦â€¹Â¦Ã¦Ë†Âª) |
| **Tmux Ã¦ÂÂÃ©â€ â€™Ã¥â„¢Â¨** | `Bash` | Ã¥Â¯Â¹Ã©â€¢Â¿Ã¦â€”Â¶Ã©â€”Â´Ã¨Â¿ÂÃ¨Â¡Å’Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼Ë†npm testÃ£â‚¬Âcargo buildÃ£â‚¬ÂdockerÃ¯Â¼â€°Ã¥Â»ÂºÃ¨Â®Â®Ã¤Â½Â¿Ã§â€Â¨ tmux | 0 (Ã¨Â­Â¦Ã¥â€˜Å ) |
| **Git Ã¦Å½Â¨Ã©â‚¬ÂÃ¦ÂÂÃ©â€ â€™Ã¥â„¢Â¨** | `Bash` | Ã¥Å“Â¨ `git push` Ã¥â€°ÂÃ¦ÂÂÃ©â€ â€™Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¥ÂËœÃ¦â€ºÂ´ | 0 (Ã¨Â­Â¦Ã¥â€˜Å ) |
| **Ã¦â€“â€¡Ã¦Â¡Â£Ã¦â€“â€¡Ã¤Â»Â¶Ã¨Â­Â¦Ã¥â€˜Å Ã¥â„¢Â¨** | `Write` | Ã¥Â¯Â¹Ã©ÂÅ¾Ã¦Â â€¡Ã¥â€¡â€  `.md`/`.txt` Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Ââ€˜Ã¥â€¡ÂºÃ¨Â­Â¦Ã¥â€˜Å Ã¯Â¼Ë†Ã¥â€¦ÂÃ¨Â®Â¸ READMEÃ£â‚¬ÂCLAUDEÃ£â‚¬ÂCONTRIBUTINGÃ£â‚¬ÂCHANGELOGÃ£â‚¬ÂLICENSEÃ£â‚¬ÂSKILLÃ£â‚¬Âdocs/Ã£â‚¬Âskills/Ã¯Â¼â€°Ã¯Â¼â€ºÃ¨Â·Â¨Ã¥Â¹Â³Ã¥ÂÂ°Ã¨Â·Â¯Ã¥Â¾â€žÃ¥Â¤â€žÃ§Ââ€  | 0 (Ã¨Â­Â¦Ã¥â€˜Å ) |
| **Ã§Â­â€“Ã§â€¢Â¥Ã¦â‚¬Â§Ã¥Å½â€¹Ã§Â¼Â©Ã¦ÂÂÃ©â€ â€™Ã¥â„¢Â¨** | `Edit\|Write` | Ã¥Â»ÂºÃ¨Â®Â®Ã¥Å“Â¨Ã©â‚¬Â»Ã¨Â¾â€˜Ã©â€”Â´Ã©Å¡â€Ã¯Â¼Ë†Ã§ÂºÂ¦Ã¦Â¯Â 50 Ã¦Â¬Â¡Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â°Æ’Ã§â€Â¨Ã¯Â¼â€°Ã¦â€°â€¹Ã¥Å Â¨Ã¦â€°Â§Ã¨Â¡Å’ `/compact` | 0 (Ã¨Â­Â¦Ã¥â€˜Å ) |
| **InsAIts Ã¥Â®â€°Ã¥â€¦Â¨Ã§â€ºâ€˜Ã¦Å½Â§Ã¥â„¢Â¨Ã¯Â¼Ë†Ã¥ÂÂ¯Ã©â‚¬â€°Ã¥Å Â Ã¥â€¦Â¥Ã¯Â¼â€°** | `Bash\|Write\|Edit\|MultiEdit` | Ã¥Â¯Â¹Ã©Â«ËœÃ¤Â¿Â¡Ã¥ÂÂ·Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã§Å¡â€žÃ¥ÂÂ¯Ã©â‚¬â€°Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂÃ£â‚¬â€šÃ©â„¢Â¤Ã©ÂÅ¾Ã¨Â®Â¾Ã§Â½Â® `ECC_ENABLE_INSAITS=1`Ã¯Â¼Å’Ã¥ÂÂ¦Ã¥Ë†â„¢Ã§Â¦ÂÃ§â€Â¨Ã£â‚¬â€šÃ¥Â¯Â¹Ã¥â€¦Â³Ã©â€Â®Ã¥Ââ€˜Ã§Å½Â°Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦â€¹Â¦Ã¦Ë†ÂªÃ¯Â¼Å’Ã¥Â¯Â¹Ã©ÂÅ¾Ã¥â€¦Â³Ã©â€Â®Ã¥Ââ€˜Ã§Å½Â°Ã¥Ââ€˜Ã¥â€¡ÂºÃ¨Â­Â¦Ã¥â€˜Å Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Â°â€ Ã¥Â®Â¡Ã¨Â®Â¡Ã¦â€”Â¥Ã¥Â¿â€”Ã¥â€ â„¢Ã¥â€¦Â¥ `.insaits_audit_session.jsonl`Ã£â‚¬â€šÃ©Å“â‚¬Ã¨Â¦Â `pip install insa-its`Ã£â‚¬â€š[Ã¨Â¯Â¦Ã¦Æ’â€¦](../../../scripts/hooks/insaits-security-monitor.py) | 2 (Ã¦â€¹Â¦Ã¦Ë†ÂªÃ¥â€¦Â³Ã©â€Â®) / 0 (Ã¨Â­Â¦Ã¥â€˜Å ) |

### PostToolUse Ã©â€™Â©Ã¥Â­Â

| Ã©â€™Â©Ã¥Â­Â | Ã¥Å’Â¹Ã©â€¦ÂÃ¥â„¢Â¨ | Ã¥Å Å¸Ã¨Æ’Â½ |
|------|---------|-------------|
| **PR Ã¨Â®Â°Ã¥Â½â€¢Ã¥â„¢Â¨** | `Bash` | Ã¥Å“Â¨ `gh pr create` Ã¥ÂÅ½Ã¨Â®Â°Ã¥Â½â€¢ PR URL Ã¥â€™Å’Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥â€˜Â½Ã¤Â»Â¤ |
| **Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Ë†â€ Ã¦Å¾Â** | `Bash` | Ã¦Å¾â€žÃ¥Â»ÂºÃ¥â€˜Â½Ã¤Â»Â¤Ã¥ÂÅ½Ã§Å¡â€žÃ¥ÂÅ½Ã¥ÂÂ°Ã¥Ë†â€ Ã¦Å¾ÂÃ¯Â¼Ë†Ã¥Â¼â€šÃ¦Â­Â¥Ã¯Â¼Å’Ã©ÂÅ¾Ã©ËœÂ»Ã¥Â¡Å¾Ã¯Â¼â€° |
| **Ã¨Â´Â¨Ã©â€¡ÂÃ©â€”Â¨** | `Edit\|Write\|MultiEdit` | Ã¥Å“Â¨Ã§Â¼â€“Ã¨Â¾â€˜Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¥Â¿Â«Ã©â‚¬Å¸Ã¨Â´Â¨Ã©â€¡ÂÃ¦Â£â‚¬Ã¦Å¸Â¥ |
| **Prettier Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“** | `Edit` | Ã§Â¼â€“Ã¨Â¾â€˜Ã¥ÂÅ½Ã¤Â½Â¿Ã§â€Â¨ Prettier Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“ JS/TS Ã¦â€“â€¡Ã¤Â»Â¶ |
| **TypeScript Ã¦Â£â‚¬Ã¦Å¸Â¥** | `Edit` | Ã¥Å“Â¨Ã§Â¼â€“Ã¨Â¾â€˜ `.ts`/`.tsx` Ã¦â€“â€¡Ã¤Â»Â¶Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’ `tsc --noEmit` |
| **console.log Ã¨Â­Â¦Ã¥â€˜Å ** | `Edit` | Ã¨Â­Â¦Ã¥â€˜Å Ã§Â¼â€“Ã¨Â¾â€˜Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­Ã¥Â­ËœÃ¥Å“Â¨ `console.log` Ã¨Â¯Â­Ã¥ÂÂ¥ |

### Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã©â€™Â©Ã¥Â­Â

| Ã©â€™Â©Ã¥Â­Â | Ã¤Âºâ€¹Ã¤Â»Â¶ | Ã¥Å Å¸Ã¨Æ’Â½ |
|------|-------|-------------|
| **Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥Â¼â‚¬Ã¥Â§â€¹** | `SessionStart` | Ã¥Å Â Ã¨Â½Â½Ã¥â€¦Ë†Ã¥â€°ÂÃ¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¥Â¹Â¶Ã¦Â£â‚¬Ã¦Âµâ€¹Ã¥Å’â€¦Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨ |
| **Ã©Â¢â€žÃ¥Å½â€¹Ã§Â¼Â©** | `PreCompact` | Ã¥Å“Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¥Å½â€¹Ã§Â¼Â©Ã¥â€°ÂÃ¤Â¿ÂÃ¥Â­ËœÃ§Å Â¶Ã¦â‚¬Â |
| **Console.log Ã¥Â®Â¡Ã¨Â®Â¡** | `Stop` | Ã¦Â¯ÂÃ¦Â¬Â¡Ã¥â€œÂÃ¥Âºâ€Ã¥ÂÅ½Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¦Å“â€° `console.log` |
| **Ã¤Â¼Å¡Ã¨Â¯ÂÃ¦â€˜ËœÃ¨Â¦Â** | `Stop` | Ã¥Â½â€œÃ¨Â½Â¬Ã¥Â½â€¢Ã¨Â·Â¯Ã¥Â¾â€žÃ¥ÂÂ¯Ã§â€Â¨Ã¦â€”Â¶Ã¦Å’ÂÃ¤Â¹â€¦Ã¥Å’â€“Ã¤Â¼Å¡Ã¨Â¯ÂÃ§Å Â¶Ã¦â‚¬Â |
| **Ã¦Â¨Â¡Ã¥Â¼ÂÃ¦ÂÂÃ¥Ââ€“** | `Stop` | Ã¨Â¯â€žÃ¤Â¼Â°Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â»Â¥Ã¦ÂÂÃ¥Ââ€“Ã¥ÂÂ¯Ã¦Å Â½Ã¥Ââ€“Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Ã¦Å’ÂÃ§Â»Â­Ã¥Â­Â¦Ã¤Â¹Â Ã¯Â¼â€° |
| **Ã¦Ë†ÂÃ¦Å“Â¬Ã¨Â¿Â½Ã¨Â¸ÂªÃ¥â„¢Â¨** | `Stop` | Ã¥Ââ€˜Ã¥â€¡ÂºÃ¨Â½Â»Ã©â€¡ÂÃ§ÂºÂ§Ã§Å¡â€žÃ¨Â¿ÂÃ¨Â¡Å’Ã¦Ë†ÂÃ¦Å“Â¬Ã©ÂÂ¥Ã¦Âµâ€¹Ã¦Â â€¡Ã¨Â®Â° |
| **Ã¤Â¼Å¡Ã¨Â¯ÂÃ§Â»â€œÃ¦ÂÅ¸Ã¦Â â€¡Ã¨Â®Â°** | `SessionEnd` | Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã¦Â â€¡Ã¨Â®Â°Ã¥â€™Å’Ã¦Â¸â€¦Ã§Ââ€ Ã¦â€”Â¥Ã¥Â¿â€” |

## Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã©â€™Â©Ã¥Â­Â

### Ã§Â¦ÂÃ§â€Â¨Ã©â€™Â©Ã¥Â­Â

Ã¥Å“Â¨ `hooks.json` Ã¤Â¸Â­Ã§Â§Â»Ã©â„¢Â¤Ã¦Ë†â€“Ã¦Â³Â¨Ã©â€¡Å Ã¦Å½â€°Ã©â€™Â©Ã¥Â­ÂÃ¦ÂÂ¡Ã§â€ºÂ®Ã£â‚¬â€šÃ¥Â¦â€šÃ¦Å¾Å“Ã¤Â½Å“Ã¤Â¸ÂºÃ¦Ââ€™Ã¤Â»Â¶Ã¥Â®â€°Ã¨Â£â€¦Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Å“Â¨Ã¦â€šÂ¨Ã§Å¡â€ž `~/.claude/settings.json` Ã¤Â¸Â­Ã¨Â¦â€ Ã§â€ºâ€“Ã¯Â¼Å¡

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [],
        "description": "Override: allow all .md file creation"
      }
    ]
  }
}
```

### Ã¨Â¿ÂÃ¨Â¡Å’Ã¦â€”Â¶Ã©â€™Â©Ã¥Â­ÂÃ¦Å½Â§Ã¥Ë†Â¶Ã¯Â¼Ë†Ã¦Å½Â¨Ã¨ÂÂÃ¯Â¼â€°

Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¦Å½Â§Ã¥Ë†Â¶Ã©â€™Â©Ã¥Â­ÂÃ¨Â¡Å’Ã¤Â¸ÂºÃ¯Â¼Å’Ã¦â€”Â Ã©Å“â‚¬Ã§Â¼â€“Ã¨Â¾â€˜ `hooks.json`Ã¯Â¼Å¡

```bash
# minimal | standard | strict (default: standard)
export ECC_HOOK_PROFILE=standard

# Disable specific hook IDs (comma-separated)
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"
```

Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡

* `minimal` Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â»â€¦Ã¤Â¿ÂÃ§â€¢â„¢Ã¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã¥â€™Å’Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€™Â©Ã¥Â­ÂÃ£â‚¬â€š
* `standard` Ã¢â‚¬â€Ã¢â‚¬â€ Ã©Â»ËœÃ¨Â®Â¤Ã¯Â¼â€ºÃ¥Â¹Â³Ã¨Â¡Â¡Ã§Å¡â€žÃ¨Â´Â¨Ã©â€¡Â + Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€š
* `strict` Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥ÂÂ¯Ã§â€Â¨Ã©Â¢ÂÃ¥Â¤â€“Ã§Å¡â€žÃ¦ÂÂÃ©â€ â€™Ã¥â€™Å’Ã¦â€ºÂ´Ã¤Â¸Â¥Ã¦Â Â¼Ã§Å¡â€žÃ©ËœÂ²Ã¦Å Â¤Ã¦Å½ÂªÃ¦â€“Â½Ã£â‚¬â€š

### Ã§Â¼â€“Ã¥â€ â„¢Ã¤Â½Â Ã¨â€¡ÂªÃ¥Â·Â±Ã§Å¡â€žÃ©â€™Â©Ã¥Â­Â

Ã©â€™Â©Ã¥Â­ÂÃ¦ËœÂ¯ shell Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼Å’Ã©â‚¬Å¡Ã¨Â¿â€¡ stdin Ã¦Å½Â¥Ã¦â€Â¶ JSON Ã¦Â Â¼Ã¥Â¼ÂÃ§Å¡â€žÃ¥Â·Â¥Ã¥â€¦Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â¸â€Ã¥Â¿â€¦Ã©Â¡Â»Ã¥Å“Â¨ stdout Ã¤Â¸Å Ã¨Â¾â€œÃ¥â€¡Âº JSONÃ£â‚¬â€š

**Ã¥Å¸ÂºÃ¦Å“Â¬Ã§Â»â€œÃ¦Å¾â€žÃ¯Â¼Å¡**

```javascript
// my-hook.js
let data = '';
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  const input = JSON.parse(data);

  // Access tool info
  const toolName = input.tool_name;        // "Edit", "Bash", "Write", etc.
  const toolInput = input.tool_input;      // Tool-specific parameters
  const toolOutput = input.tool_output;    // Only available in PostToolUse

  // Warn (non-blocking): write to stderr
  console.error('[Hook] Warning message shown to Claude');

  // Block (PreToolUse only): exit with code 2
  // process.exit(2);

  // Always output the original data to stdout
  console.log(data);
});
```

**Ã©â‚¬â‚¬Ã¥â€¡ÂºÃ§Â ÂÃ¯Â¼Å¡**

* `0` Ã¢â‚¬â€Ã¢â‚¬â€ Ã¦Ë†ÂÃ¥Å Å¸Ã¯Â¼Ë†Ã§Â»Â§Ã§Â»Â­Ã¦â€°Â§Ã¨Â¡Å’Ã¯Â¼â€°
* `2` Ã¢â‚¬â€Ã¢â‚¬â€ Ã©ËœÂ»Ã¦Â­Â¢Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â°Æ’Ã§â€Â¨Ã¯Â¼Ë†Ã¤Â»â€¦Ã©â„¢Â PreToolUseÃ¯Â¼â€°
* Ã¥â€¦Â¶Ã¤Â»â€“Ã©ÂÅ¾Ã©â€ºÂ¶Ã¥â‚¬Â¼ Ã¢â‚¬â€Ã¢â‚¬â€ Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Ë†Ã¨Â®Â°Ã¥Â½â€¢Ã¦â€”Â¥Ã¥Â¿â€”Ã¤Â½â€ Ã¤Â¸ÂÃ©ËœÂ»Ã¦Â­Â¢Ã¯Â¼â€°

### Ã©â€™Â©Ã¥Â­ÂÃ¨Â¾â€œÃ¥â€¦Â¥Ã¦Â¨Â¡Ã¥Â¼Â

```typescript
interface HookInput {
  tool_name: string;          // "Bash", "Edit", "Write", "Read", etc.
  tool_input: {
    command?: string;         // Bash: the command being run
    file_path?: string;       // Edit/Write/Read: target file
    old_string?: string;      // Edit: text being replaced
    new_string?: string;      // Edit: replacement text
    content?: string;         // Write: file content
  };
  tool_output?: {             // PostToolUse only
    output?: string;          // Command/tool output
  };
}
```

### Ã¥Â¼â€šÃ¦Â­Â¥Ã©â€™Â©Ã¥Â­Â

Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¤Â¸ÂÃ¥Âºâ€Ã©ËœÂ»Ã¥Â¡Å¾Ã¤Â¸Â»Ã¦ÂµÂÃ§Â¨â€¹Ã§Å¡â€žÃ©â€™Â©Ã¥Â­ÂÃ¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€šÃ¯Â¼Å’Ã¥ÂÅ½Ã¥ÂÂ°Ã¥Ë†â€ Ã¦Å¾ÂÃ¯Â¼â€°Ã¯Â¼Å¡

```json
{
  "type": "command",
  "command": "node my-slow-hook.js",
  "async": true,
  "timeout": 30
}
```

Ã¥Â¼â€šÃ¦Â­Â¥Ã©â€™Â©Ã¥Â­ÂÃ¥Å“Â¨Ã¥ÂÅ½Ã¥ÂÂ°Ã¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€šÃ¥Â®Æ’Ã¤Â»Â¬Ã¤Â¸ÂÃ¨Æ’Â½Ã©ËœÂ»Ã¦Â­Â¢Ã¥Â·Â¥Ã¥â€¦Â·Ã¦â€°Â§Ã¨Â¡Å’Ã£â‚¬â€š

## Ã¥Â¸Â¸Ã§â€Â¨Ã©â€™Â©Ã¥Â­ÂÃ©â€¦ÂÃ¦â€“Â¹

### Ã¨Â­Â¦Ã¥â€˜Å  TODO Ã¦Â³Â¨Ã©â€¡Å 

```json
{
  "matcher": "Edit",
  "hooks": [{
    "type": "command",
    "command": "node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const ns=i.tool_input?.new_string||'';if(/TODO|FIXME|HACK/.test(ns)){console.error('[Hook] New TODO/FIXME added - consider creating an issue')}console.log(d)})\""
  }],
  "description": "Warn when adding TODO/FIXME comments"
}
```

### Ã©ËœÂ»Ã¦Â­Â¢Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â¤Â§Ã¦â€“â€¡Ã¤Â»Â¶

```json
{
  "matcher": "Write",
  "hooks": [{
    "type": "command",
    "command": "node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const c=i.tool_input?.content||'';const lines=c.split('\\n').length;if(lines>800){console.error('[Hook] BLOCKED: File exceeds 800 lines ('+lines+' lines)');console.error('[Hook] Split into smaller, focused modules');process.exit(2)}console.log(d)})\""
  }],
  "description": "Block creation of files larger than 800 lines"
}
```

### Ã¤Â½Â¿Ã§â€Â¨ ruff Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“ Python Ã¦â€“â€¡Ã¤Â»Â¶

```json
{
  "matcher": "Edit",
  "hooks": [{
    "type": "command",
    "command": "node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const p=i.tool_input?.file_path||'';if(/\\.py$/.test(p)){const{execFileSync}=require('child_process');try{execFileSync('ruff',['format',p],{stdio:'pipe'})}catch(e){}}console.log(d)})\""
  }],
  "description": "Auto-format Python files with ruff after edits"
}
```

### Ã¨Â¦ÂÃ¦Â±â€šÃ¦â€“Â°Ã¦ÂºÂÃ¦â€“â€¡Ã¤Â»Â¶Ã©â„¢â€žÃ¥Â¸Â¦Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦â€“â€¡Ã¤Â»Â¶

```json
{
  "matcher": "Write",
  "hooks": [{
    "type": "command",
    "command": "node -e \"const fs=require('fs');let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const p=i.tool_input?.file_path||'';if(/src\\/.*\\.(ts|js)$/.test(p)&&!/\\.test\\.|\\.spec\\./.test(p)){const testPath=p.replace(/\\.(ts|js)$/,'.test.$1');if(!fs.existsSync(testPath)){console.error('[Hook] No test file found for: '+p);console.error('[Hook] Expected: '+testPath);console.error('[Hook] Consider writing tests first (/tdd)')}}console.log(d)})\""
  }],
  "description": "Remind to create tests when adding new source files"
}
```

## Ã¨Â·Â¨Ã¥Â¹Â³Ã¥ÂÂ°Ã¦Â³Â¨Ã¦â€žÂÃ¤Âºâ€¹Ã©Â¡Â¹

Ã©â€™Â©Ã¥Â­ÂÃ©â‚¬Â»Ã¨Â¾â€˜Ã¥Å“Â¨ Node.js Ã¨â€žÅ¡Ã¦Å“Â¬Ã¤Â¸Â­Ã¥Â®Å¾Ã§Å½Â°Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿Ã¥Å“Â¨ WindowsÃ£â‚¬ÂmacOS Ã¥â€™Å’ Linux Ã¤Â¸Å Ã¥â€¦Â·Ã¦Å“â€°Ã¨Â·Â¨Ã¥Â¹Â³Ã¥ÂÂ°Ã¨Â¡Å’Ã¤Â¸ÂºÃ£â‚¬â€šÃ¤Â¿ÂÃ§â€¢â„¢Ã¤Âºâ€ Ã¥Â°â€˜Ã©â€¡Â shell Ã¥Å’â€¦Ã¨Â£â€¦Ã¥â„¢Â¨Ã§â€Â¨Ã¤ÂºÅ½Ã¦Å’ÂÃ§Â»Â­Ã¥Â­Â¦Ã¤Â¹Â Ã§Å¡â€žÃ¨Â§â€šÃ¥Â¯Å¸Ã¨â‚¬â€¦Ã©â€™Â©Ã¥Â­ÂÃ¯Â¼â€ºÃ¨Â¿â„¢Ã¤Âºâ€ºÃ¥Å’â€¦Ã¨Â£â€¦Ã¥â„¢Â¨Ã¥Ââ€”Ã©â€¦ÂÃ§Â½Â®Ã¦â€“â€¡Ã¤Â»Â¶Ã¦Å½Â§Ã¥Ë†Â¶Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥â€¦Â·Ã¦Å“â€° Windows Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¥â€ºÅ¾Ã©â‚¬â‚¬Ã¨Â¡Å’Ã¤Â¸ÂºÃ£â‚¬â€š

## Ã§â€ºÂ¸Ã¥â€¦Â³

* [rules/common/hooks.md](../rules/common/hooks.md) Ã¢â‚¬â€Ã¢â‚¬â€ Ã©â€™Â©Ã¥Â­ÂÃ¦Å¾Â¶Ã¦Å¾â€žÃ¦Å’â€¡Ã¥Ââ€”
* [skills/strategic-compact/](../../../skills/strategic-compact) Ã¢â‚¬â€Ã¢â‚¬â€ Ã§Â­â€“Ã§â€¢Â¥Ã¦â‚¬Â§Ã¥Å½â€¹Ã§Â¼Â©Ã¦Å â‚¬Ã¨Æ’Â½
* [scripts/hooks/](../../../scripts/hooks) Ã¢â‚¬â€Ã¢â‚¬â€ Ã©â€™Â©Ã¥Â­ÂÃ¨â€žÅ¡Ã¦Å“Â¬Ã¥Â®Å¾Ã§Å½Â°
