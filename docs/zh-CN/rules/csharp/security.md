---
paths:
  - "**/*.cs"
  - "**/*.csx"
  - "**/*.csproj"
  - "**/appsettings*.json"
---

# C# Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/security.md](../common/security.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¨Â¡Â¥Ã¥â€¦â€¦Ã¤Âºâ€  C# Ã§â€°Â¹Ã¦Å“â€°Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ 

* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã¦ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã§Â¡Â¬Ã§Â¼â€“Ã§Â Â API Ã¥Â¯â€ Ã©â€™Â¥Ã£â‚¬ÂÃ¤Â»Â¤Ã§â€°Å’Ã¦Ë†â€“Ã¨Â¿Å¾Ã¦Å½Â¥Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²
* Ã¥Å“Â¨Ã¦Å“Â¬Ã¥Å“Â°Ã¥Â¼â‚¬Ã¥Ââ€˜Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¦Ë†â€“Ã§â€Â¨Ã¦Ë†Â·Ã¥Â¯â€ Ã©â€™Â¥Ã¯Â¼Å’Ã¥Å“Â¨Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨
* Ã§Â¡Â®Ã¤Â¿Â `appsettings.*.json` Ã¤Â¸Â­Ã¤Â¸ÂÃ¥Å’â€¦Ã¥ÂÂ«Ã§Å“Å¸Ã¥Â®Å¾Ã§Å¡â€žÃ¥â€¡Â­Ã¨Â¯ÂÃ¤Â¿Â¡Ã¦ÂÂ¯

```csharp
// BAD
const string ApiKey = "sk-live-123";

// GOOD
var apiKey = builder.Configuration["OpenAI:ApiKey"]
    ?? throw new InvalidOperationException("OpenAI:ApiKey is not configured.");
```

## SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã©ËœÂ²Ã¨Å’Æ’

* Ã¥Â§â€¹Ã§Â»Ë†Ã¤Â½Â¿Ã§â€Â¨ ADO.NETÃ£â‚¬ÂDapper Ã¦Ë†â€“ EF Core Ã§Å¡â€žÃ¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Â°â€ Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã§â€ºÂ´Ã¦Å½Â¥Ã¦â€¹Â¼Ã¦Å½Â¥Ã¥Ë†Â° SQL Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¤Â¸Â­
* Ã¥Å“Â¨Ã¤Â½Â¿Ã§â€Â¨Ã¥Å Â¨Ã¦â‚¬ÂÃ¦Å¸Â¥Ã¨Â¯Â¢Ã¦Å¾â€žÃ¥Â»ÂºÃ¦â€”Â¶Ã¯Â¼Å’Ã¥â€¦Ë†Ã¥Â¯Â¹Ã¦Å½â€™Ã¥ÂºÂÃ¥Â­â€”Ã¦Â®ÂµÃ¥â€™Å’Ã§Â­â€ºÃ©â‚¬â€°Ã¦â€œÂÃ¤Â½Å“Ã§Â¬Â¦Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯Â

```csharp
const string sql = "SELECT * FROM Orders WHERE CustomerId = @customerId";
await connection.QueryAsync<Order>(sql, new { customerId });
```

## Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â

* Ã¥Å“Â¨Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ¨Â¾Â¹Ã§â€¢Å’Ã¥Â¤â€žÃ©ÂªÅ’Ã¨Â¯Â DTO
* Ã¤Â½Â¿Ã§â€Â¨Ã¦â€¢Â°Ã¦ÂÂ®Ã¦Â³Â¨Ã¨Â§Â£Ã£â‚¬ÂFluentValidation Ã¦Ë†â€“Ã¦ËœÂ¾Ã¥Â¼ÂÃ§Å¡â€žÃ¥Â®Ë†Ã¥ÂÂ«Ã¥Â­ÂÃ¥ÂÂ¥
* Ã¥Å“Â¨Ã¦â€°Â§Ã¨Â¡Å’Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã¤Â¹â€¹Ã¥â€°ÂÃ¦â€¹â€™Ã§Â»ÂÃ¦â€”Â Ã¦â€¢Ë†Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Å¾â€¹Ã§Å Â¶Ã¦â‚¬Â

## Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â¸Å½Ã¦Å½Ë†Ã¦ÂÆ’

* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¦Â¡â€ Ã¦Å¾Â¶Ã¦ÂÂÃ¤Â¾â€ºÃ§Å¡â€žÃ¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã§Å¡â€žÃ¤Â»Â¤Ã§â€°Å’Ã¨Â§Â£Ã¦Å¾ÂÃ©â‚¬Â»Ã¨Â¾â€˜
* Ã¥Å“Â¨Ã§Â«Â¯Ã§â€šÂ¹Ã¦Ë†â€“Ã¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã¨Â¾Â¹Ã§â€¢Å’Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã¦Å½Ë†Ã¦ÂÆ’Ã§Â­â€“Ã§â€¢Â¥
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¨Â®Â°Ã¥Â½â€¢Ã¥Å½Å¸Ã¥Â§â€¹Ã¤Â»Â¤Ã§â€°Å’Ã£â‚¬ÂÃ¥Â¯â€ Ã§Â ÂÃ¦Ë†â€“Ã¤Â¸ÂªÃ¤ÂºÂºÃ¨ÂºÂ«Ã¤Â»Â½Ã¤Â¿Â¡Ã¦ÂÂ¯ (PII)

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¨Â¿â€Ã¥â€ºÅ¾Ã©ÂÂ¢Ã¥Ââ€˜Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã§Å¡â€žÃ£â‚¬ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â¡Ã¦ÂÂ¯
* Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â«Â¯Ã¨Â®Â°Ã¥Â½â€¢Ã¥Å’â€¦Ã¥ÂÂ«Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Å¡â€žÃ¨Â¯Â¦Ã§Â»â€ Ã¥Â¼â€šÃ¥Â¸Â¸Ã¤Â¿Â¡Ã¦ÂÂ¯
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨ API Ã¥â€œÂÃ¥Âºâ€Ã¤Â¸Â­Ã¦Å¡Â´Ã©Å“Â²Ã¥Â â€ Ã¦Â Ë†Ã¨Â·Å¸Ã¨Â¸ÂªÃ£â‚¬ÂSQL Ã¨Â¯Â­Ã¥ÂÂ¥Ã¦Ë†â€“Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â³Â»Ã§Â»Å¸Ã¨Â·Â¯Ã¥Â¾â€ž

## Ã¥Ââ€šÃ¨â‚¬Æ’Ã¨Âµâ€žÃ¦â€“â„¢

Ã¦Å“â€°Ã¥â€¦Â³Ã¦â€ºÂ´Ã¥Â¹Â¿Ã¦Â³â€ºÃ§Å¡â€žÃ¥Âºâ€Ã§â€Â¨Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`security-review`Ã£â‚¬â€š
