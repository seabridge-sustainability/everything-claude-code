---
paths:
  - "**/*.cs"
  - "**/*.csx"
---

# C# Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/coding-style.md](../common/coding-style.md) Ã¤Â¸Â­Ã¥â€¦Â³Ã¤ÂºÅ½ C# Ã§Å¡â€žÃ§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â â€¡Ã¥â€¡â€ 

* Ã©ÂÂµÃ¥Â¾ÂªÃ¥Â½â€œÃ¥â€°ÂÃ§Å¡â€ž .NET Ã§ÂºÂ¦Ã¥Â®Å¡Ã¥Â¹Â¶Ã¥ÂÂ¯Ã§â€Â¨Ã¥ÂÂ¯Ã¤Â¸ÂºÃ§Â©ÂºÃ¥Â¼â€¢Ã§â€Â¨Ã§Â±Â»Ã¥Å¾â€¹
* Ã¥Å“Â¨Ã¥â€¦Â¬Ã¥â€¦Â±Ã¥â€™Å’Ã¥â€ â€¦Ã©Æ’Â¨ API Ã¤Â¸Å Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¦ËœÂ¾Ã¥Â¼ÂÃ¨Â®Â¿Ã©â€”Â®Ã¤Â¿Â®Ã©Â¥Â°Ã§Â¬Â¦
* Ã¤Â¿ÂÃ¦Å’ÂÃ¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Å½Ã¥â€¦Â¶Ã¥Â®Å¡Ã¤Â¹â€°Ã§Å¡â€žÃ¤Â¸Â»Ã¨Â¦ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â¯Â¹Ã©Â½Â

## Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â¸Å½Ã¦Â¨Â¡Ã¥Å¾â€¹

* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ§Å¡â€žÃ¥â‚¬Â¼Ã§Â±Â»Ã¥Å¾â€¹Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `record` Ã¦Ë†â€“ `record struct`
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥â€¦Â·Ã¦Å“â€°Ã¦Â â€¡Ã¨Â¯â€ Ã¥â€™Å’Ã§â€Å¸Ã¥â€˜Â½Ã¥â€˜Â¨Ã¦Å“Å¸Ã§Å¡â€žÃ¥Â®Å¾Ã¤Â½â€œÃ¦Ë†â€“Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `class`
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Å“ÂÃ¥Å Â¡Ã¨Â¾Â¹Ã§â€¢Å’Ã¥â€™Å’Ã¦Å Â½Ã¨Â±Â¡Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `interface`
* Ã©ÂÂ¿Ã¥â€¦ÂÃ¥Å“Â¨Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ `dynamic`Ã¯Â¼â€ºÃ¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¦Â³â€ºÃ¥Å¾â€¹Ã¦Ë†â€“Ã¦ËœÂ¾Ã¥Â¼ÂÃ¦Â¨Â¡Ã¥Å¾â€¹

```csharp
public sealed record UserDto(Guid Id, string Email);

public interface IUserRepository
{
    Task<UserDto?> FindByIdAsync(Guid id, CancellationToken cancellationToken);
}
```

## Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ¦â‚¬Â§

* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥â€¦Â±Ã¤ÂºÂ«Ã§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `init` Ã¨Â®Â¾Ã§Â½Â®Ã¥â„¢Â¨Ã£â‚¬ÂÃ¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¥Ââ€šÃ¦â€¢Â°Ã¥â€™Å’Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥ÂËœÃ©â€ºâ€ Ã¥ÂË†
* Ã¥Å“Â¨Ã§â€Å¸Ã¦Ë†ÂÃ¦â€ºÂ´Ã¦â€“Â°Ã§Å Â¶Ã¦â‚¬ÂÃ¦â€”Â¶Ã¯Â¼Å’Ã¤Â¸ÂÃ¨Â¦ÂÃ¥Å½Å¸Ã¥Å“Â°Ã¤Â¿Â®Ã¦â€Â¹Ã¨Â¾â€œÃ¥â€¦Â¥Ã¦Â¨Â¡Ã¥Å¾â€¹

```csharp
public sealed record UserProfile(string Name, string Email);

public static UserProfile Rename(UserProfile profile, string name) =>
    profile with { Name = name };
```

## Ã¥Â¼â€šÃ¦Â­Â¥Ã¤Â¸Å½Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `async`/`await`Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã©ËœÂ»Ã¥Â¡Å¾Ã¨Â°Æ’Ã§â€Â¨Ã¥Â¦â€š `.Result` Ã¦Ë†â€“ `.Wait()`
* Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥â€¦Â¬Ã¥â€¦Â±Ã¥Â¼â€šÃ¦Â­Â¥ API Ã¤Â¼Â Ã©â‚¬â€™ `CancellationToken`
* Ã¦Å â€ºÃ¥â€¡ÂºÃ§â€°Â¹Ã¥Â®Å¡Ã¥Â¼â€šÃ¥Â¸Â¸Ã¥Â¹Â¶Ã¤Â½Â¿Ã§â€Â¨Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¥Â±Å¾Ã¦â‚¬Â§Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢

```csharp
public async Task<Order> LoadOrderAsync(
    Guid orderId,
    CancellationToken cancellationToken)
{
    try
    {
        return await repository.FindAsync(orderId, cancellationToken)
            ?? throw new InvalidOperationException($"Order {orderId} was not found.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to load order {OrderId}", orderId);
        throw;
    }
}
```

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* Ã¤Â½Â¿Ã§â€Â¨ `dotnet format` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¥â€™Å’Ã¥Ë†â€ Ã¦Å¾ÂÃ¥â„¢Â¨Ã¤Â¿Â®Ã¥Â¤Â
* Ã¤Â¿ÂÃ¦Å’Â `using` Ã¦Å’â€¡Ã¤Â»Â¤Ã¦Å“â€°Ã¥ÂºÂÃ¯Â¼Å’Ã¥Â¹Â¶Ã§Â§Â»Ã©â„¢Â¤Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ¥Â¯Â¼Ã¥â€¦Â¥
* Ã¤Â»â€¦Ã¥Â½â€œÃ¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¤Â½â€œÃ¦Ë†ÂÃ¥â€˜ËœÃ¤Â¿ÂÃ¦Å’ÂÃ¥ÂÂ¯Ã¨Â¯Â»Ã¦â‚¬Â§Ã¦â€”Â¶Ã¦â€°ÂÃ¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨
