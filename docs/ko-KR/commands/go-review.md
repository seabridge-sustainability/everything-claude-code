---
description: ÃªÂ´â‚¬Ã¬Å¡Â©Ã¬Â Â Ã­Å’Â¨Ã­â€žÂ´, Ã«Ââ„¢Ã¬â€¹Å“Ã¬â€žÂ± Ã¬â€¢Ë†Ã¬Â â€žÃ¬â€žÂ±, Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â²ËœÃ«Â¦Â¬, Ã«Â³Â´Ã¬â€¢Ë†Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â ÂÃ¬ÂÂ¸ Go Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â°. go-reviewer Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¥Â¼ Ã­ËœÂ¸Ã¬Â¶Å“Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.
---

# Go Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â°

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


Ã¬ÂÂ´ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“Ã«Å â€ **go-reviewer** Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸Ã«Â¥Â¼ Ã­ËœÂ¸Ã¬Â¶Å“Ã­â€¢ËœÃ¬â€”Â¬ Go Ã¬Â â€žÃ¬Å¡Â© Ã­ÂÂ¬ÃªÂ´â€žÃ¬Â Â Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â°Ã«Â¥Â¼ Ã¬Ë†ËœÃ­â€“â€°Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã¬ÂÂ´ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“ÃªÂ°â‚¬ Ã­â€¢ËœÃ«Å â€ ÃªÂ²Æ’

1. **Go Ã«Â³â‚¬ÃªÂ²Â½Ã¬â€šÂ¬Ã­â€¢Â­ Ã¬â€¹ÂÃ«Â³â€ž**: `git diff`Ã«Â¡Å“ Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÅ“ `.go` Ã­Å’Å’Ã¬ÂÂ¼ Ã¬Â°Â¾ÃªÂ¸Â°
2. **Ã¬Â â€¢Ã¬Â Â Ã«Â¶â€žÃ¬â€žÂ Ã¬â€¹Â¤Ã­â€“â€°**: `go vet`, `staticcheck`, `golangci-lint` Ã¬â€¹Â¤Ã­â€“â€°
3. **Ã«Â³Â´Ã¬â€¢Ë† Ã¬Å Â¤Ã¬Âºâ€**: SQL Ã¬ÂÂ¸Ã¬Â ÂÃ¬â€¦Ëœ, Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“ Ã¬ÂÂ¸Ã¬Â ÂÃ¬â€¦Ëœ, Ã«Â Ë†Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Â»Â¨Ã«â€â€Ã¬â€¦Ëœ ÃªÂ²â‚¬Ã¬â€šÂ¬
4. **Ã«Ââ„¢Ã¬â€¹Å“Ã¬â€žÂ± Ã«Â¦Â¬Ã«Â·Â°**: ÃªÂ³Â Ã«Â£Â¨Ã­â€¹Â´ Ã¬â€¢Ë†Ã¬Â â€žÃ¬â€žÂ±, Ã¬Â±â€žÃ«â€žÂ Ã¬â€šÂ¬Ã¬Å¡Â©, Ã«Â®Â¤Ã­â€¦ÂÃ¬Å Â¤ Ã­Å’Â¨Ã­â€žÂ´ Ã«Â¶â€žÃ¬â€žÂ
5. **ÃªÂ´â‚¬Ã¬Å¡Â©Ã¬Â Â Go ÃªÂ²â‚¬Ã¬â€šÂ¬**: Go Ã¬Â»Â¨Ã«Â²Â¤Ã¬â€¦ËœÃªÂ³Â¼ Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬ Ã¬Â¤â‚¬Ã¬Ë†Ëœ Ã¬â€”Â¬Ã«Â¶â‚¬ Ã­â„¢â€¢Ã¬ÂÂ¸
6. **Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“ Ã¬Æ’ÂÃ¬â€žÂ±**: Ã¬â€¹Â¬ÃªÂ°ÂÃ«Ââ€žÃ«Â³â€ž Ã¬ÂÂ´Ã¬Å Ë† Ã«Â¶â€žÃ«Â¥Ëœ

## Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€¹Å“Ã¬Â Â

`/go-review`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Â´Ã¬â€¢Â¼ Ã­â€¢Â  Ã«â€¢Å’:
- Go Ã¬Â½â€Ã«â€œÅ“Ã«Â¥Â¼ Ã¬Å¾â€˜Ã¬â€žÂ±Ã­â€¢ËœÃªÂ±Â°Ã«â€šËœ Ã¬Ë†ËœÃ¬Â â€¢Ã­â€¢Å“ Ã­â€ºâ€ž
- Go Ã«Â³â‚¬ÃªÂ²Â½Ã¬â€šÂ¬Ã­â€¢Â­Ã¬Ââ€ž Ã¬Â»Â¤Ã«Â°â€¹Ã­â€¢ËœÃªÂ¸Â° Ã¬Â â€ž
- Go Ã¬Â½â€Ã«â€œÅ“ÃªÂ°â‚¬ Ã­ÂÂ¬Ã­â€¢Â¨Ã«ÂÅ“ PR Ã«Â¦Â¬Ã«Â·Â° Ã¬â€¹Å“
- Ã¬Æ’Ë† Go Ã¬Â½â€Ã«â€œÅ“Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤Ã¬â€”Â Ã¬ËœÂ¨Ã«Â³Â´Ã«â€Â©Ã­â€¢Â  Ã«â€¢Å’
- ÃªÂ´â‚¬Ã¬Å¡Â©Ã¬Â Â Go Ã­Å’Â¨Ã­â€žÂ´ Ã­â€¢â„¢Ã¬Å Âµ Ã¬â€¹Å“

## Ã«Â¦Â¬Ã«Â·Â° Ã¬Â¹Â´Ã­â€¦Å’ÃªÂ³Â Ã«Â¦Â¬

### CRITICAL (Ã«Â°ËœÃ«â€œÅ“Ã¬â€¹Å“ Ã¬Ë†ËœÃ¬Â â€¢)
- SQL/Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“ Ã¬ÂÂ¸Ã¬Â ÂÃ¬â€¦Ëœ Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â Â
- Ã«Ââ„¢ÃªÂ¸Â°Ã­â„¢â€ Ã¬â€”â€ Ã«Å â€ Ã«Â Ë†Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Â»Â¨Ã«â€â€Ã¬â€¦Ëœ
- ÃªÂ³Â Ã«Â£Â¨Ã­â€¹Â´ Ã«Ë†â€žÃ¬Ë†Ëœ
- Ã­â€¢ËœÃ«â€œÅ“Ã¬Â½â€Ã«â€Â©Ã«ÂÅ“ Ã¬ÂÂ¸Ã¬Â¦Â Ã¬Â â€¢Ã«Â³Â´
- unsafe Ã­ÂÂ¬Ã¬ÂÂ¸Ã­â€žÂ° Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã­â€¢ÂµÃ¬â€¹Â¬ ÃªÂ²Â½Ã«Â¡Å“Ã¬â€”ÂÃ¬â€žÅ“ Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â¬Â´Ã¬â€¹Å“

### HIGH (Ã¬Ë†ËœÃ¬Â â€¢ ÃªÂ¶Å’Ã¬Å¾Â¥)
- Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸ Ã¬â€”â€ Ã«Å â€ Ã¬â€”ÂÃ«Å¸Â¬ Ã«Å¾ËœÃ­â€¢â€˜ Ã«Ë†â€žÃ«ÂÂ½
- Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â°ËœÃ­â„¢Ëœ Ã«Å’â‚¬Ã¬â€¹Â  panic Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸ Ã¬Â â€žÃ­Å’Å’ Ã«Ë†â€žÃ«ÂÂ½
- Ã«ÂÂ°Ã«â€œÅ“Ã«ÂÂ½Ã¬Ââ€ž Ã¬Å“Â Ã«Â°Å“Ã­â€¢ËœÃ«Å â€ Ã«Â²â€žÃ­ÂÂ¼ Ã¬â€”â€ Ã«Å â€ Ã¬Â±â€žÃ«â€žÂ
- Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤ Ã«Â¯Â¸Ã¬Â¶Â©Ã¬Â¡Â± Ã¬â€”ÂÃ«Å¸Â¬
- Ã«Â®Â¤Ã­â€¦ÂÃ¬Å Â¤ Ã«Â³Â´Ã­ËœÂ¸ Ã«Ë†â€žÃ«ÂÂ½

### MEDIUM (ÃªÂ³Â Ã«Â Â¤)
- Ã«Â¹â€žÃªÂ´â‚¬Ã¬Å¡Â©Ã¬Â Â Ã¬Â½â€Ã«â€œÅ“ Ã­Å’Â¨Ã­â€žÂ´
- ÃªÂ³ÂµÃªÂ°Å“ Ã­â€¢Â­Ã«ÂªÂ©Ã¬â€”Â godoc Ã¬Â£Â¼Ã¬â€žÂ Ã«Ë†â€žÃ«ÂÂ½
- Ã«Â¹â€žÃ­Å¡Â¨Ã¬Å“Â¨Ã¬Â ÂÃ¬ÂÂ¸ Ã«Â¬Â¸Ã¬Å¾ÂÃ¬â€”Â´ Ã¬â€”Â°ÃªÂ²Â°
- Ã¬Å Â¬Ã«ÂÂ¼Ã¬ÂÂ´Ã¬Å Â¤ Ã¬â€šÂ¬Ã¬Â â€ž Ã­â€¢Â Ã«â€¹Â¹ Ã«Ë†â€žÃ«ÂÂ½
- Ã­â€¦Å’Ã¬ÂÂ´Ã«Â¸â€ ÃªÂ¸Â°Ã«Â°Ëœ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«Â¯Â¸Ã¬â€šÂ¬Ã¬Å¡Â©

## Ã¬â€¹Â¤Ã­â€“â€°Ã«ÂËœÃ«Å â€ Ã¬Å¾ÂÃ«Ââ„¢ ÃªÂ²â‚¬Ã¬â€šÂ¬

```bash
# Ã¬Â â€¢Ã¬Â Â Ã«Â¶â€žÃ¬â€žÂ
go vet ./...

# ÃªÂ³Â ÃªÂ¸â€° ÃªÂ²â‚¬Ã¬â€šÂ¬ (Ã¬â€žÂ¤Ã¬Â¹ËœÃ«ÂÅ“ ÃªÂ²Â½Ã¬Å¡Â°)
staticcheck ./...
golangci-lint run

# Ã«Â Ë†Ã¬ÂÂ´Ã¬Å Â¤ ÃªÂ°ÂÃ¬Â§â‚¬
go build -race ./...

# Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â Â
govulncheck ./...
```

## Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬ËœË†Ã¬â€¹Å“

````text
User: /go-review

Agent:
# Go Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â° Ã«Â³Â´ÃªÂ³Â Ã¬â€žÅ“

## Ã«Â¦Â¬Ã«Â·Â°Ã«ÂÅ“ Ã­Å’Å’Ã¬ÂÂ¼
- internal/handler/user.go (Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÂ¨)
- internal/service/auth.go (Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÂ¨)

## Ã¬Â â€¢Ã¬Â Â Ã«Â¶â€žÃ¬â€žÂ ÃªÂ²Â°ÃªÂ³Â¼
Ã¢Å“â€œ go vet: Ã¬ÂÂ´Ã¬Å Ë† Ã¬â€”â€ Ã¬ÂÅ’
Ã¢Å“â€œ staticcheck: Ã¬ÂÂ´Ã¬Å Ë† Ã¬â€”â€ Ã¬ÂÅ’

## Ã«Â°Å“ÃªÂ²Â¬Ã«ÂÅ“ Ã¬ÂÂ´Ã¬Å Ë†

[CRITICAL] Ã«Â Ë†Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Â»Â¨Ã«â€â€Ã¬â€¦Ëœ
Ã­Å’Å’Ã¬ÂÂ¼: internal/service/auth.go:45
Ã¬ÂÂ´Ã¬Å Ë†: Ã«Ââ„¢ÃªÂ¸Â°Ã­â„¢â€ Ã¬â€”â€ Ã¬ÂÂ´ ÃªÂ³ÂµÃ¬Å“Â  Ã«Â§ÂµÃ¬â€”Â Ã¬Â â€˜ÃªÂ·Â¼
```go
var cache = map[string]*Session{}  // Ã«Ââ„¢Ã¬â€¹Å“ Ã¬Â â€˜ÃªÂ·Â¼!

func GetSession(id string) *Session {
    return cache[id]  // Ã«Â Ë†Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Â»Â¨Ã«â€â€Ã¬â€¦Ëœ
}
```
Ã¬Ë†ËœÃ¬Â â€¢: sync.RWMutex Ã«ËœÂÃ«Å â€ sync.Map Ã¬â€šÂ¬Ã¬Å¡Â©
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

[HIGH] Ã¬â€”ÂÃ«Å¸Â¬ Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸ Ã«Ë†â€žÃ«ÂÂ½
Ã­Å’Å’Ã¬ÂÂ¼: internal/handler/user.go:28
Ã¬ÂÂ´Ã¬Å Ë†: Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸ Ã¬â€”â€ Ã¬ÂÂ´ Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â°ËœÃ­â„¢Ëœ
```go
return err  // Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸ Ã¬â€”â€ Ã¬ÂÅ’
```
Ã¬Ë†ËœÃ¬Â â€¢: Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸Ã¬â„¢â‚¬ Ã­â€¢Â¨ÃªÂ»Ëœ Ã«Å¾ËœÃ­â€¢â€˜
```go
return fmt.Errorf("get user %s: %w", userID, err)
```

## Ã¬Å¡â€Ã¬â€¢Â½
- CRITICAL: 1
- HIGH: 1
- MEDIUM: 0

ÃªÂ¶Å’Ã¬Å¾Â¥: FAIL: CRITICAL Ã¬ÂÂ´Ã¬Å Ë†ÃªÂ°â‚¬ Ã¬Ë†ËœÃ¬Â â€¢Ã«ÂÂ  Ã«â€¢Å’ÃªÂ¹Å’Ã¬Â§â‚¬ merge Ã¬Â°Â¨Ã«â€¹Â¨
````

## Ã¬Å Â¹Ã¬ÂÂ¸ ÃªÂ¸Â°Ã¬Â¤â‚¬

| Ã¬Æ’ÂÃ­Æ’Å“ | Ã¬Â¡Â°ÃªÂ±Â´ |
|------|------|
| PASS: Ã¬Å Â¹Ã¬ÂÂ¸ | CRITICAL Ã«ËœÂÃ«Å â€ HIGH Ã¬ÂÂ´Ã¬Å Ë† Ã¬â€”â€ Ã¬ÂÅ’ |
| WARNING: ÃªÂ²Â½ÃªÂ³Â  | MEDIUM Ã¬ÂÂ´Ã¬Å Ë†Ã«Â§Å’ Ã¬Å¾Ë†Ã¬ÂÅ’ (Ã¬Â£Â¼Ã¬ÂËœÃ­â€¢ËœÃ¬â€”Â¬ merge) |
| FAIL: Ã¬Â°Â¨Ã«â€¹Â¨ | CRITICAL Ã«ËœÂÃ«Å â€ HIGH Ã¬ÂÂ´Ã¬Å Ë† Ã«Â°Å“ÃªÂ²Â¬ |

## Ã«â€¹Â¤Ã«Â¥Â¸ Ã¬Â»Â¤Ã«Â§Â¨Ã«â€œÅ“Ã¬â„¢â‚¬Ã¬ÂËœ Ã¬â€”Â°Ã«Ââ„¢

- `/go-test`Ã«Â¥Â¼ Ã«Â¨Â¼Ã¬Â â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€”Â¬ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã­â€ ÂµÃªÂ³Â¼ Ã­â„¢â€¢Ã¬ÂÂ¸
- `/go-build`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€”Â¬ build Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â°Å“Ã¬Æ’Â Ã¬â€¹Å“ Ã¬Ë†ËœÃ¬Â â€¢
- `/go-review`Ã«Â¥Â¼ Ã¬Â»Â¤Ã«Â°â€¹ Ã¬Â â€žÃ¬â€”Â Ã¬â€šÂ¬Ã¬Å¡Â©
- `/code-review`Ã«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€”Â¬ Go Ã¬â„¢Â¸ Ã¬ÂÂ¼Ã«Â°ËœÃ¬Â ÂÃ¬ÂÂ¸ ÃªÂ´â‚¬Ã¬â€¹Â¬Ã¬â€šÂ¬Ã­â€¢Â­ Ã«Â¦Â¬Ã«Â·Â°

## ÃªÂ´â‚¬Ã«Â Â¨ Ã­â€¢Â­Ã«ÂªÂ©

- Ã¬â€”ÂÃ¬ÂÂ´Ã¬Â â€žÃ­Å Â¸: `agents/go-reviewer.md`
- Ã¬Å Â¤Ã­â€šÂ¬: `skills/golang-patterns/`, `skills/golang-testing/`
