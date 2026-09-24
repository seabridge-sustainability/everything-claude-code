---
paths:
  - "**/*.cs"
  - "**/*.csx"
  - "**/*.csproj"
---

# C# Ã¦Âµâ€¹Ã¨Â¯â€¢

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/testing.md](../common/testing.md) Ã¤Â¸Â­Ã¥â€¦Â³Ã¤ÂºÅ½ C# Ã§Å¡â€žÃ§â€°Â¹Ã¥Â®Å¡Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦Â¡â€ Ã¦Å¾Â¶

* Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€™Å’Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©Â¦â€“Ã©â‚¬â€° **xUnit**
* Ã¤Â½Â¿Ã§â€Â¨ **FluentAssertions** Ã§Â¼â€“Ã¥â€ â„¢Ã¥ÂÂ¯Ã¨Â¯Â»Ã¦â‚¬Â§Ã¥Â¼ÂºÃ§Å¡â€žÃ¦â€“Â­Ã¨Â¨â‚¬
* Ã¤Â½Â¿Ã§â€Â¨ **Moq** Ã¦Ë†â€“ **NSubstitute** Ã¦ÂÂ¥Ã¦Â¨Â¡Ã¦â€¹Å¸Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
* Ã¥Â½â€œÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©Å“â‚¬Ã¨Â¦ÂÃ§Å“Å¸Ã¥Â®Å¾Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½Ã¦â€”Â¶Ã¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ **Testcontainers**

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â»â€žÃ§Â»â€¡

* Ã¥Å“Â¨ `tests/` Ã¤Â¸â€¹Ã©â€¢Å“Ã¥Æ’Â `src/` Ã§Å¡â€žÃ§Â»â€œÃ¦Å¾â€ž
* Ã¦ËœÅ½Ã§Â¡Â®Ã¥Å’ÂºÃ¥Ë†â€ Ã¥Ââ€¢Ã¥â€¦Æ’Ã¦Âµâ€¹Ã¨Â¯â€¢Ã£â‚¬ÂÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€™Å’Ã§Â«Â¯Ã¥Ë†Â°Ã§Â«Â¯Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Å¡â€žÃ¨Â¦â€ Ã§â€ºâ€“Ã¨Å’Æ’Ã¥â€ºÂ´
* Ã¦Â Â¹Ã¦ÂÂ®Ã¨Â¡Å’Ã¤Â¸ÂºÃ¨â‚¬Å’Ã©ÂÅ¾Ã¥Â®Å¾Ã§Å½Â°Ã§Â»â€ Ã¨Å â€šÃ¦ÂÂ¥Ã¥â€˜Â½Ã¥ÂÂÃ¦Âµâ€¹Ã¨Â¯â€¢

```csharp
public sealed class OrderServiceTests
{
    [Fact]
    public async Task FindByIdAsync_ReturnsOrder_WhenOrderExists()
    {
        // Arrange
        // Act
        // Assert
    }
}
```

## ASP.NET Core Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢

* Ã¤Â½Â¿Ã§â€Â¨ `WebApplicationFactory<TEntryPoint>` Ã¨Â¿â€ºÃ¨Â¡Å’ API Ã©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“
* Ã©â‚¬Å¡Ã¨Â¿â€¡ HTTP Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ¥â€™Å’Ã¥ÂºÂÃ¥Ë†â€”Ã¥Å’â€“Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã§Â»â€¢Ã¨Â¿â€¡Ã¤Â¸Â­Ã©â€”Â´Ã¤Â»Â¶

## Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡

* Ã§â€ºÂ®Ã¦Â â€¡Ã¨Â¡Å’Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ 80% Ã¤Â»Â¥Ã¤Â¸Å 
* Ã¥Â°â€ Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã©â€¡ÂÃ§â€šÂ¹Ã¦â€Â¾Ã¥Å“Â¨Ã©Â¢â€ Ã¥Å¸Å¸Ã©â‚¬Â»Ã¨Â¾â€˜Ã£â‚¬ÂÃ©ÂªÅ’Ã¨Â¯ÂÃ£â‚¬ÂÃ¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â€™Å’Ã¥Â¤Â±Ã¨Â´Â¥Ã¨Â·Â¯Ã¥Â¾â€žÃ¤Â¸Å 
* Ã¥Å“Â¨ CI Ã¤Â¸Â­Ã¨Â¿ÂÃ¨Â¡Å’ `dotnet test` Ã¥Â¹Â¶Ã¥ÂÂ¯Ã§â€Â¨Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡Ã¦â€Â¶Ã©â€ºâ€ Ã¯Â¼Ë†Ã¥Å“Â¨Ã¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¯Â¼â€°
