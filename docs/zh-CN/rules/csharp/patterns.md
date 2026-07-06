---
paths:
  - "**/*.cs"
  - "**/*.csx"
---

# C# Ã¦Â¨Â¡Ã¥Â¼Â

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/patterns.md](../common/patterns.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  C# Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## API Ã¥â€œÂÃ¥Âºâ€Ã¦Â¨Â¡Ã¥Â¼Â

```csharp
public sealed record ApiResponse<T>(
    bool Success,
    T? Data = default,
    string? Error = null,
    object? Meta = null);
```

## Ã¤Â»â€œÃ¥â€šÂ¨Ã¦Â¨Â¡Ã¥Â¼Â

```csharp
public interface IRepository<T>
{
    Task<IReadOnlyList<T>> FindAllAsync(CancellationToken cancellationToken);
    Task<T?> FindByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<T> CreateAsync(T entity, CancellationToken cancellationToken);
    Task<T> UpdateAsync(T entity, CancellationToken cancellationToken);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken);
}
```

## Ã©â‚¬â€°Ã©Â¡Â¹Ã¦Â¨Â¡Ã¥Â¼Â

Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¼ÂºÃ§Â±Â»Ã¥Å¾â€¹Ã©â‚¬â€°Ã©Â¡Â¹Ã¨Â¿â€ºÃ¨Â¡Å’Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥Å“Â¨Ã¦â€¢Â´Ã¤Â¸ÂªÃ¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¤Â¸Â­Ã¨Â¯Â»Ã¥Ââ€“Ã¥Å½Å¸Ã¥Â§â€¹Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã£â‚¬â€š

```csharp
public sealed class PaymentsOptions
{
    public const string SectionName = "Payments";
    public required string BaseUrl { get; init; }
    public required string ApiKeySecretName { get; init; }
}
```

## Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥

* Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¨Â¾Â¹Ã§â€¢Å’Ã¤Â¸Å Ã¤Â¾ÂÃ¨Âµâ€“Ã¤ÂºÅ½Ã¦Å½Â¥Ã¥ÂÂ£
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¤Â¸â€œÃ¦Â³Â¨Ã¯Â¼â€ºÃ¥Â¦â€šÃ¦Å¾Å“Ã¦Å¸ÂÃ¤Â¸ÂªÃ¦Å“ÂÃ¥Å Â¡Ã©Å“â‚¬Ã¨Â¦ÂÃ¥Â¤ÂªÃ¥Â¤Å¡Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¯Â¼Å’Ã¨Â¯Â·Ã¦â€¹â€ Ã¥Ë†â€ Ã¥â€¦Â¶Ã¨ÂÅ’Ã¨Â´Â£
* Ã¦Å“â€°Ã¦â€žÂÃ¨Â¯â€ Ã¥Å“Â°Ã¦Â³Â¨Ã¥â€ Å’Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã¯Â¼Å¡Ã¦â€”Â Ã§Å Â¶Ã¦â‚¬Â/Ã¥â€¦Â±Ã¤ÂºÂ«Ã¦Å“ÂÃ¥Å Â¡Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€¢Ã¤Â¾â€¹Ã¯Â¼Å’Ã¨Â¯Â·Ã¦Â±â€šÃ¦â€¢Â°Ã¦ÂÂ®Ã¤Â½Â¿Ã§â€Â¨Ã¤Â½Å“Ã§â€Â¨Ã¥Å¸Å¸Ã¯Â¼Å’Ã¨Â½Â»Ã©â€¡ÂÃ§ÂºÂ§Ã§ÂºÂ¯Ã¥Â·Â¥Ã¤Â½Å“Ã¨â‚¬â€¦Ã¤Â½Â¿Ã§â€Â¨Ã§Å¾Â¬Ã¦â€”Â¶
