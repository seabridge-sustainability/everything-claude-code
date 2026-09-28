---
paths:
  - "**/*.cs"
  - "**/*.csx"
  - "**/*.csproj"
---

# C# Ã¦Âµâ€¹Ã¨Â¯â€¢

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
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
