---
paths:
  - "**/*.cs"
  - "**/*.csx"
---

# C# Ã¦Â¨Â¡Ã¥Â¼Â

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
