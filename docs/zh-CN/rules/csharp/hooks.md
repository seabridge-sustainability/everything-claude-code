---
paths:
  - "**/*.cs"
  - "**/*.csx"
  - "**/*.csproj"
  - "**/*.sln"
  - "**/Directory.Build.props"
  - "**/Directory.Build.targets"
---

# C# Ã©â€™Â©Ã¥Â­Â

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å¸ÂºÃ¤ÂºÅ½ [common/hooks.md](../common/hooks.md) Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  C# Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€¦Â·Ã¤Â½â€œÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## PostToolUse Ã©â€™Â©Ã¥Â­Â

Ã¥Å“Â¨ `~/.claude/settings.json` Ã¤Â¸Â­Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼Å¡

* **dotnet format**Ã¯Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã§Â¼â€“Ã¨Â¾â€˜Ã¨Â¿â€¡Ã§Å¡â€ž C# Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â¹Â¶Ã¥Âºâ€Ã§â€Â¨Ã¥Ë†â€ Ã¦Å¾ÂÃ¥â„¢Â¨Ã¤Â¿Â®Ã¥Â¤Â
* **dotnet build**Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ§Â¼â€“Ã¨Â¾â€˜Ã¥ÂÅ½Ã¨Â§Â£Ã¥â€ Â³Ã¦â€“Â¹Ã¦Â¡Ë†Ã¦Ë†â€“Ã©Â¡Â¹Ã§â€ºÂ®Ã¦ËœÂ¯Ã¥ÂÂ¦Ã¤Â»ÂÃ¨Æ’Â½Ã§Â¼â€“Ã¨Â¯â€˜
* **dotnet test --no-build**Ã¯Â¼Å¡Ã¥Å“Â¨Ã¨Â¡Å’Ã¤Â¸ÂºÃ¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å“â‚¬Ã¨Â¿â€˜Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©Â¡Â¹Ã§â€ºÂ®

## Stop Ã©â€™Â©Ã¥Â­Â

* Ã¥Å“Â¨Ã§Â»â€œÃ¦ÂÅ¸Ã¦Â¶â€°Ã¥ÂÅ Ã¥Â¹Â¿Ã¦Â³â€º C# Ã¦â€ºÂ´Ã¦â€Â¹Ã§Å¡â€žÃ¤Â¼Å¡Ã¨Â¯ÂÃ¥â€°ÂÃ¯Â¼Å’Ã¨Â¿ÂÃ¨Â¡Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¦Å“â‚¬Ã§Â»Ë†Ã§Å¡â€ž `dotnet build`
* Ã¥Â½â€œ `appsettings*.json` Ã¦â€“â€¡Ã¤Â»Â¶Ã¨Â¢Â«Ã¤Â¿Â®Ã¦â€Â¹Ã¦â€”Â¶Ã¥Ââ€˜Ã¥â€¡ÂºÃ¨Â­Â¦Ã¥â€˜Å Ã¯Â¼Å’Ã¤Â»Â¥Ã©ËœÂ²Ã¦â€¢ÂÃ¦â€žÅ¸Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¨Â¢Â«Ã¦ÂÂÃ¤ÂºÂ¤
