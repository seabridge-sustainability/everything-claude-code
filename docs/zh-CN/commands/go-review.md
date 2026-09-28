---
description: Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€žGoÃ¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¯Â¼Å’Ã¦Â¶ÂµÃ§â€ºâ€“Ã¦Æ’Â¯Ã§â€Â¨Ã¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬ÂÃ¥Â¹Â¶Ã¥Ââ€˜Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã¥â€™Å’Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨go-reviewerÃ¤Â»Â£Ã§Ââ€ Ã£â‚¬â€š
---

# Go Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥

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


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **go-reviewer** Ã¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Go Ã¨Â¯Â­Ã¨Â¨â‚¬Ã§â€°Â¹Ã¥Â®Å¡Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¨Â¯â€ Ã¥Ë†Â« Go Ã¥ÂËœÃ¦â€ºÂ´**Ã¯Â¼Å¡Ã©â‚¬Å¡Ã¨Â¿â€¡ `git diff` Ã¦Å¸Â¥Ã¦â€°Â¾Ã¤Â¿Â®Ã¦â€Â¹Ã¨Â¿â€¡Ã§Å¡â€ž `.go` Ã¦â€“â€¡Ã¤Â»Â¶
2. **Ã¨Â¿ÂÃ¨Â¡Å’Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾Â**Ã¯Â¼Å¡Ã¦â€°Â§Ã¨Â¡Å’ `go vet`Ã£â‚¬Â`staticcheck` Ã¥â€™Å’ `golangci-lint`
3. **Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€°Â«Ã¦ÂÂ**Ã¯Â¼Å¡Ã¦Â£â‚¬Ã¦Å¸Â¥ SQL Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥Ã£â‚¬ÂÃ§Â«Å¾Ã¦â‚¬ÂÃ¦ÂÂ¡Ã¤Â»Â¶
4. **Ã¥Â¹Â¶Ã¥Ââ€˜Ã¦â‚¬Â§Ã¥Â®Â¡Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã¥Ë†â€ Ã¦Å¾Â goroutine Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã£â‚¬ÂÃ©â‚¬Å¡Ã©Ââ€œÃ¤Â½Â¿Ã§â€Â¨Ã£â‚¬ÂÃ¤Âºâ€™Ã¦â€“Â¥Ã©â€ÂÃ¦Â¨Â¡Ã¥Â¼Â
5. **Ã¦Æ’Â¯Ã§â€Â¨ Go Ã¦Â£â‚¬Ã¦Å¸Â¥**Ã¯Â¼Å¡Ã©ÂªÅ’Ã¨Â¯ÂÃ¤Â»Â£Ã§Â ÂÃ¦ËœÂ¯Ã¥ÂÂ¦Ã©ÂÂµÃ¥Â¾Âª Go Ã§ÂºÂ¦Ã¥Â®Å¡Ã¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ
6. **Ã§â€Å¸Ã¦Ë†ÂÃ¦Å Â¥Ã¥â€˜Å **Ã¯Â¼Å¡Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ§Â¨â€¹Ã¥ÂºÂ¦Ã¥Ë†â€ Ã§Â±Â»Ã©â€”Â®Ã©Â¢Ëœ

## Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¦Å“Âº

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨ `/go-review`Ã¯Â¼Å¡

* Ã§Â¼â€“Ã¥â€ â„¢Ã¦Ë†â€“Ã¤Â¿Â®Ã¦â€Â¹ Go Ã¤Â»Â£Ã§Â ÂÃ¤Â¹â€¹Ã¥ÂÅ½
* Ã¦ÂÂÃ¤ÂºÂ¤ Go Ã¥ÂËœÃ¦â€ºÂ´Ã¤Â¹â€¹Ã¥â€°Â
* Ã¥Â®Â¡Ã¦Å¸Â¥Ã¥Å’â€¦Ã¥ÂÂ« Go Ã¤Â»Â£Ã§Â ÂÃ§Å¡â€žÃ¦â€¹â€°Ã¥Ââ€“Ã¨Â¯Â·Ã¦Â±â€šÃ¦â€”Â¶
* Ã¦Å½Â¥Ã¦â€°â€¹Ã¦â€“Â°Ã§Å¡â€ž Go Ã¤Â»Â£Ã§Â ÂÃ¥Âºâ€œÃ¦â€”Â¶
* Ã¥Â­Â¦Ã¤Â¹Â Ã¦Æ’Â¯Ã§â€Â¨ Go Ã¦Â¨Â¡Ã¥Â¼ÂÃ¦â€”Â¶

## Ã¥Â®Â¡Ã¦Å¸Â¥Ã§Â±Â»Ã¥Ë†Â«

### Ã¤Â¸Â¥Ã©â€¡ÂÃ¯Â¼Ë†Ã¥Â¿â€¦Ã©Â¡Â»Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* SQL/Ã¥â€˜Â½Ã¤Â»Â¤Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦Â¼ÂÃ¦Â´Å¾
* Ã¦â€”Â Ã¥ÂÅ’Ã¦Â­Â¥Ã§Å¡â€žÃ§Â«Å¾Ã¦â‚¬ÂÃ¦ÂÂ¡Ã¤Â»Â¶
* Goroutine Ã¦Â³â€žÃ¦Â¼Â
* Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥â€¡Â­Ã¨Â¯Â
* Ã¤Â¸ÂÃ¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€žÃ¦Å’â€¡Ã©â€™Ë†Ã¤Â½Â¿Ã§â€Â¨
* Ã¥â€¦Â³Ã©â€Â®Ã¨Â·Â¯Ã¥Â¾â€žÃ¤Â¸Â­Ã¥Â¿Â½Ã§â€¢Â¥Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯

### Ã©Â«ËœÃ¯Â¼Ë†Ã¥Âºâ€Ã¨Â¯Â¥Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¸Â¦Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã¥Å’â€¦Ã¨Â£â€¦
* Ã¤Â½Â¿Ã§â€Â¨ panic Ã¨â‚¬Å’Ã©ÂÅ¾Ã¨Â¿â€Ã¥â€ºÅ¾Ã©â€â„¢Ã¨Â¯Â¯
* Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¦Å“ÂªÃ¤Â¼Â Ã¦â€™Â­
* Ã¦â€”Â Ã§Â¼â€œÃ¥â€ Â²Ã©â‚¬Å¡Ã©Ââ€œÃ¥Â¯Â¼Ã¨â€¡Â´Ã¦Â­Â»Ã©â€Â
* Ã¦Å½Â¥Ã¥ÂÂ£Ã¦Å“ÂªÃ¦Â»Â¡Ã¨Â¶Â³Ã©â€â„¢Ã¨Â¯Â¯
* Ã§Â¼ÂºÃ¥Â°â€˜Ã¤Âºâ€™Ã¦â€“Â¥Ã©â€ÂÃ¤Â¿ÂÃ¦Å Â¤

### Ã¤Â¸Â­Ã¯Â¼Ë†Ã¨â‚¬Æ’Ã¨â„¢â€˜Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼â€°

* Ã©ÂÅ¾Ã¦Æ’Â¯Ã§â€Â¨Ã¤Â»Â£Ã§Â ÂÃ¦Â¨Â¡Ã¥Â¼Â
* Ã¥Â¯Â¼Ã¥â€¡ÂºÃ©Â¡Â¹Ã§Â¼ÂºÃ¥Â°â€˜ godoc Ã¦Â³Â¨Ã©â€¡Å 
* Ã¤Â½Å½Ã¦â€¢Ë†Ã§Å¡â€žÃ¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¦â€¹Â¼Ã¦Å½Â¥
* Ã¥Ë†â€¡Ã§â€°â€¡Ã¦Å“ÂªÃ©Â¢â€žÃ¥Ë†â€ Ã©â€¦Â
* Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Â£â‚¬Ã¦Å¸Â¥

```bash
# Static analysis
go vet ./...

# Advanced checks (if installed)
staticcheck ./...
golangci-lint run

# Race detection
go build -race ./...

# Security vulnerabilities
govulncheck ./...
```

## Ã¤Â½Â¿Ã§â€Â¨Ã§Â¤ÂºÃ¤Â¾â€¹

````text
# Go Ã¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥Ã¦Å Â¥Ã¥â€˜Å 

## Ã¥Â·Â²Ã¥Â®Â¡Ã¦Å¸Â¥Ã¦â€“â€¡Ã¤Â»Â¶
- internal/handler/user.goÃ¯Â¼Ë†Ã¥Â·Â²Ã¤Â¿Â®Ã¦â€Â¹Ã¯Â¼â€°
- internal/service/auth.goÃ¯Â¼Ë†Ã¥Â·Â²Ã¤Â¿Â®Ã¦â€Â¹Ã¯Â¼â€°

## Ã©Ââ„¢Ã¦â‚¬ÂÃ¥Ë†â€ Ã¦Å¾ÂÃ§Â»â€œÃ¦Å¾Å“
Ã¢Å“â€œ go vet: Ã¦â€”Â Ã©â€”Â®Ã©Â¢Ëœ
Ã¢Å“â€œ staticcheck: Ã¦â€”Â Ã©â€”Â®Ã©Â¢Ëœ

## Ã¥Ââ€˜Ã§Å½Â°Ã§Å¡â€žÃ©â€”Â®Ã©Â¢Ëœ

[Ã¤Â¸Â¥Ã©â€¡Â] Ã§Â«Å¾Ã¦â‚¬ÂÃ¦ÂÂ¡Ã¤Â»Â¶
Ã¦â€“â€¡Ã¤Â»Â¶: internal/service/auth.go:45
Ã©â€”Â®Ã©Â¢Ëœ: Ã¥â€¦Â±Ã¤ÂºÂ«Ã¦ËœÂ Ã¥Â°â€žÃ¨Â®Â¿Ã©â€”Â®Ã¦Å“ÂªÃ¥ÂÅ’Ã¦Â­Â¥
```go
var cache = map[string]*Session{}  // Ã¥Â¹Â¶Ã¥Ââ€˜Ã¨Â®Â¿Ã©â€”Â®Ã¯Â¼Â

func GetSession(id string) *Session {
    return cache[id]  // Ã§Â«Å¾Ã¦â‚¬ÂÃ¦ÂÂ¡Ã¤Â»Â¶
}
````

Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ sync.RWMutex Ã¦Ë†â€“ sync.Map

```go
var (
    cache   = map[string]*Session{}
    cacheMu sync.RWMutex
)

func GetSession(id string) *Session {
    cacheMu.RLock()
    defer cacheMu.RUnlock()
    return cache[id]
}
```

\[Ã©Â«Ëœ] Ã§Â¼ÂºÃ¥Â°â€˜Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡
Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡internal/handler/user.go:28
Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å¡Ã¨Â¿â€Ã¥â€ºÅ¾Ã§Å¡â€žÃ©â€â„¢Ã¨Â¯Â¯Ã§Â¼ÂºÃ¥Â°â€˜Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡

```go
return err  // No context
```

Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¥Å’â€¦Ã¨Â£â€¦

```go
return fmt.Errorf("get user %s: %w", userID, err)
```

## Ã¦â€˜ËœÃ¨Â¦Â

* Ã¤Â¸Â¥Ã©â€¡ÂÃ¯Â¼Å¡1
* Ã©Â«ËœÃ¯Â¼Å¡1
* Ã¤Â¸Â­Ã¯Â¼Å¡0

Ã¥Â»ÂºÃ¨Â®Â®Ã¯Â¼Å¡FAIL: Ã¥Å“Â¨Ã¤Â¸Â¥Ã©â€¡ÂÃ©â€”Â®Ã©Â¢ËœÃ¤Â¿Â®Ã¥Â¤ÂÃ¥â€°ÂÃ©ËœÂ»Ã¦Â­Â¢Ã¥ÂË†Ã¥Â¹Â¶

```
## Ã¦â€°Â¹Ã¥â€¡â€ Ã¦Â â€¡Ã¥â€¡â€ 

| Ã§Å Â¶Ã¦â‚¬Â | Ã¦ÂÂ¡Ã¤Â»Â¶ |
|--------|-----------|
| PASS: Ã¦â€°Â¹Ã¥â€¡â€  | Ã¦â€”Â  CRITICAL Ã¦Ë†â€“ HIGH Ã§ÂºÂ§Ã¥Ë†Â«Ã©â€”Â®Ã©Â¢Ëœ |
| WARNING: Ã¨Â­Â¦Ã¥â€˜Å  | Ã¤Â»â€¦Ã¦Å“â€° MEDIUM Ã§ÂºÂ§Ã¥Ë†Â«Ã©â€”Â®Ã©Â¢Ëœ (Ã¨Â°Â¨Ã¦â€¦Å½Ã¥ÂË†Ã¥Â¹Â¶) |
| FAIL: Ã©ËœÂ»Ã¦Â­Â¢ | Ã¥Ââ€˜Ã§Å½Â° CRITICAL Ã¦Ë†â€“ HIGH Ã§ÂºÂ§Ã¥Ë†Â«Ã©â€”Â®Ã©Â¢Ëœ |

## Ã¤Â¸Å½Ã¥â€¦Â¶Ã¤Â»â€“Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ©â€ºâ€ Ã¦Ë†Â

- Ã©Â¦â€“Ã¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `/go-test` Ã§Â¡Â®Ã¤Â¿ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã©â‚¬Å¡Ã¨Â¿â€¡
- Ã¥Â¦â€šÃ¦Å¾Å“Ã¥â€¡ÂºÃ§Å½Â°Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨ `/go-build`
- Ã¦ÂÂÃ¤ÂºÂ¤Ã¥â€°ÂÃ¤Â½Â¿Ã§â€Â¨ `/go-review`
- Ã¥Â¯Â¹Ã¤ÂºÅ½Ã©ÂÅ¾ Go Ã¨Â¯Â­Ã¨Â¨â‚¬Ã§â€°Â¹Ã¥Â®Å¡Ã©â€”Â®Ã©Â¢ËœÃ¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨ `/code-review`

## Ã§â€ºÂ¸Ã¥â€¦Â³

- Agent: `agents/go-reviewer.md`
- Skills: `skills/golang-patterns/`, `skills/golang-testing/`
```
