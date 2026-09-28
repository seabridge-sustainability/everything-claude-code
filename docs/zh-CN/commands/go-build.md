---
description: Ã©â‚¬ÂÃ¦Â­Â¥Ã¤Â¿Â®Ã¥Â¤ÂGoÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬Âgo vetÃ¨Â­Â¦Ã¥â€˜Å Ã¥â€™Å’linterÃ©â€”Â®Ã©Â¢ËœÃ£â‚¬â€šÃ¨Â°Æ’Ã§â€Â¨go-build-resolverÃ¤Â»Â£Ã§Ââ€ Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã£â‚¬ÂÃ§Â²Â¾Ã§Â¡Â®Ã§Å¡â€žÃ¤Â¿Â®Ã¥Â¤ÂÃ£â‚¬â€š
---

# Go Ã¦Å¾â€žÃ¥Â»ÂºÃ¤Â¸Å½Ã¤Â¿Â®Ã¥Â¤Â

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


Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã¨Â°Æ’Ã§â€Â¨ **go-build-resolver** Ã¤Â»Â£Ã§Ââ€ Ã¯Â¼Å’Ã¤Â»Â¥Ã¦Å“â‚¬Ã¥Â°ÂÃ§Å¡â€žÃ¦â€ºÂ´Ã¦â€Â¹Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¤Â Go Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€š

## Ã¦Â­Â¤Ã¥â€˜Â½Ã¤Â»Â¤Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨

1. **Ã¨Â¿ÂÃ¨Â¡Å’Ã¨Â¯Å Ã¦â€“Â­**Ã¯Â¼Å¡Ã¦â€°Â§Ã¨Â¡Å’ `go build`Ã£â‚¬Â`go vet`Ã£â‚¬Â`staticcheck`
2. **Ã¨Â§Â£Ã¦Å¾ÂÃ©â€â„¢Ã¨Â¯Â¯**Ã¯Â¼Å¡Ã¦Å’â€°Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Ë†â€ Ã§Â»â€žÃ¥Â¹Â¶Ã¦Å’â€°Ã¤Â¸Â¥Ã©â€¡ÂÃ¦â‚¬Â§Ã¦Å½â€™Ã¥ÂºÂ
3. **Ã¥Â¢Å¾Ã©â€¡ÂÃ¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€â„¢Ã¨Â¯Â¯
4. **Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤Â**Ã¯Â¼Å¡Ã¦Â¯ÂÃ¦Â¬Â¡Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã©â€¡ÂÃ¦â€“Â°Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Å¾â€žÃ¥Â»Âº
5. **Ã¦Å Â¥Ã¥â€˜Å Ã¦â€˜ËœÃ¨Â¦Â**Ã¯Â¼Å¡Ã¦ËœÂ¾Ã§Â¤ÂºÃ¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã¥â€™Å’Ã¥â€°Â©Ã¤Â½â„¢Ã©â€”Â®Ã©Â¢Ëœ

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â½Â¿Ã§â€Â¨ `/go-build`Ã¯Â¼Å¡

* `go build ./...` Ã¥â€ºÂ Ã©â€â„¢Ã¨Â¯Â¯Ã¨â‚¬Å’Ã¥Â¤Â±Ã¨Â´Â¥
* `go vet ./...` Ã¦Å Â¥Ã¥â€˜Å Ã©â€”Â®Ã©Â¢Ëœ
* `golangci-lint run` Ã¦ËœÂ¾Ã§Â¤ÂºÃ¨Â­Â¦Ã¥â€˜Å 
* Ã¦Â¨Â¡Ã¥Ââ€”Ã¤Â¾ÂÃ¨Âµâ€“Ã¥â€¦Â³Ã§Â³Â»Ã¦ÂÅ¸Ã¥ÂÂ
* Ã¦â€¹â€°Ã¥Ââ€“Ã¦â€ºÂ´Ã¦â€Â¹Ã¥ÂÅ½Ã¥Â¯Â¼Ã¨â€¡Â´Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤Â±Ã¨Â´Â¥

## Ã¨Â¿ÂÃ¨Â¡Å’Ã§Å¡â€žÃ¨Â¯Å Ã¦â€“Â­Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Primary build check
go build ./...

# Static analysis
go vet ./...

# Extended linting (if available)
staticcheck ./...
golangci-lint run

# Module issues
go mod verify
go mod tidy -v
```

## Ã§Â¤ÂºÃ¤Â¾â€¹Ã¤Â¼Å¡Ã¨Â¯Â

````text
# Go Build Ã¨Â§Â£Ã¦Å¾Â

## Ã¥Ë†ÂÃ¥Â§â€¹Ã¨Â¯Å Ã¦â€“Â­

```bash
$ go build ./...
internal/service/user.go:25:15: undefined: UserRepository
internal/handler/api.go:42:9: cannot use x (type string) as type int
internal/handler/api.go:58:2: missing return at end of function

````

Ã¥Ââ€˜Ã§Å½Â°Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡3

## Ã¤Â¿Â®Ã¥Â¤Â 1Ã¯Â¼Å¡Ã¦Å“ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã§Å¡â€žÃ¦Â â€¡Ã¨Â¯â€ Ã§Â¬Â¦

Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡internal/service/user.go:25
Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡undefined: UserRepository
Ã¥Å½Å¸Ã¥â€ºÂ Ã¯Â¼Å¡Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¯Â¼Ã¥â€¦Â¥

```go
// Added import
import "project/internal/repository"

// Changed
var repo UserRepository
// To
var repo repository.UserRepository
```

```bash
$ go build ./...
# 2 errors remaining
```

## Ã¤Â¿Â®Ã¥Â¤Â 2Ã¯Â¼Å¡Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â¸ÂÃ¥Å’Â¹Ã©â€¦Â

Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡internal/handler/api.go:42
Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡cannot use x (type string) as type int

```go
// Changed
count := params.Get("count")
// To
countStr := params.Get("count")
count, _ := strconv.Atoi(countStr)
```

```bash
$ go build ./...
# 1 error remaining
```

## Ã¤Â¿Â®Ã¥Â¤Â 3Ã¯Â¼Å¡Ã§Â¼ÂºÃ¥Â°â€˜Ã¨Â¿â€Ã¥â€ºÅ¾

Ã¦â€“â€¡Ã¤Â»Â¶Ã¯Â¼Å¡internal/handler/api.go:58
Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡missing return at end of function

```go
func GetUser(id string) (*User, error) {
    if id == "" {
        return nil, ErrInvalidID
    }
    user := findUser(id)
    // Added missing return
    return user, nil
}
```

```bash
$ go build ./...
# Build successful!
```

## Ã¦Å“â‚¬Ã§Â»Ë†Ã©ÂªÅ’Ã¨Â¯Â

```bash
$ go vet ./...
# No issues

$ go test ./...
ok      project/internal/service   0.015s
ok      project/internal/handler   0.023s
```

## Ã¦â€˜ËœÃ¨Â¦Â

| Ã¦Å’â€¡Ã¦Â â€¡ | Ã¦â€¢Â°Ã©â€¡Â |
|--------|-------|
| Ã¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€žÃ¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯ | 3 |
| Ã¥Â·Â²Ã¤Â¿Â®Ã¥Â¤ÂÃ§Å¡â€ž Vet Ã¨Â­Â¦Ã¥â€˜Å  | 0 |
| Ã¥Â·Â²Ã¤Â¿Â®Ã¦â€Â¹Ã§Å¡â€žÃ¦â€“â€¡Ã¤Â»Â¶ | 2 |
| Ã¥â€°Â©Ã¤Â½â„¢Ã©â€”Â®Ã©Â¢Ëœ | 0 |

Ã¦Å¾â€žÃ¥Â»ÂºÃ§Å Â¶Ã¦â‚¬ÂÃ¯Â¼Å¡PASS: Ã¦Ë†ÂÃ¥Å Å¸

```
## Ã¥Â¸Â¸Ã¨Â§ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â®Ã¥Â¤Â

| Ã©â€â„¢Ã¨Â¯Â¯ | Ã¥â€¦Â¸Ã¥Å¾â€¹Ã¤Â¿Â®Ã¥Â¤Â |
|-------|-------------|
| `undefined: X` | Ã¦Â·Â»Ã¥Å Â Ã¥Â¯Â¼Ã¥â€¦Â¥Ã¦Ë†â€“Ã¤Â¿Â®Ã¦Â­Â£Ã¦â€¹Â¼Ã¥â€ â„¢Ã©â€â„¢Ã¨Â¯Â¯ |
| `cannot use X as Y` | Ã§Â±Â»Ã¥Å¾â€¹Ã¨Â½Â¬Ã¦ÂÂ¢Ã¦Ë†â€“Ã¤Â¿Â®Ã¦Â­Â£Ã¨Âµâ€¹Ã¥â‚¬Â¼ |
| `missing return` | Ã¦Â·Â»Ã¥Å Â Ã¨Â¿â€Ã¥â€ºÅ¾Ã¨Â¯Â­Ã¥ÂÂ¥ |
| `X does not implement Y` | Ã¦Â·Â»Ã¥Å Â Ã§Â¼ÂºÃ¥Â¤Â±Ã§Å¡â€žÃ¦â€“Â¹Ã¦Â³â€¢ |
| `import cycle` | Ã©â€¡ÂÃ¦Å¾â€žÃ¥Å’â€¦Ã§Â»â€œÃ¦Å¾â€ž |
| `declared but not used` | Ã§Â§Â»Ã©â„¢Â¤Ã¦Ë†â€“Ã¤Â½Â¿Ã§â€Â¨Ã¥ÂËœÃ©â€¡Â |
| `cannot find package` | `go get` Ã¦Ë†â€“ `go mod tidy` |

## Ã¤Â¿Â®Ã¥Â¤ÂÃ§Â­â€“Ã§â€¢Â¥

1. **Ã¤Â¼ËœÃ¥â€¦Ë†Ã¥Â¤â€žÃ§Ââ€ Ã¦Å¾â€žÃ¥Â»ÂºÃ©â€â„¢Ã¨Â¯Â¯** - Ã¤Â»Â£Ã§Â ÂÃ¥Â¿â€¦Ã©Â¡Â»Ã¨Æ’Â½Ã¥Â¤Å¸Ã§Â¼â€“Ã¨Â¯â€˜
2. **Ã¥â€¦Â¶Ã¦Â¬Â¡Ã¥Â¤â€žÃ§Ââ€  vet Ã¨Â­Â¦Ã¥â€˜Å ** - Ã¤Â¿Â®Ã¥Â¤ÂÃ¥ÂÂ¯Ã§â€“â€˜Ã§Â»â€œÃ¦Å¾â€ž
3. **Ã¥â€ ÂÃ¦Â¬Â¡Ã¥Â¤â€žÃ§Ââ€  lint Ã¨Â­Â¦Ã¥â€˜Å ** - Ã©Â£Å½Ã¦Â Â¼Ã¥â€™Å’Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ
4. **Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã¤Â¿Â®Ã¥Â¤ÂÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ©â€”Â®Ã©Â¢Ëœ** - Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â¯ÂÃ¤Â¸ÂªÃ¦â€ºÂ´Ã¦â€Â¹
5. **Ã¦Å“â‚¬Ã¥Â°ÂÃ¥Å’â€“Ã¦â€ºÂ´Ã¦â€Â¹** - Ã¤Â¸ÂÃ¨Â¦ÂÃ©â€¡ÂÃ¦Å¾â€žÃ¯Â¼Å’Ã¥ÂÂªÃ¤Â¿Â®Ã¥Â¤Â

## Ã¥ÂÅ“Ã¦Â­Â¢Ã¦ÂÂ¡Ã¤Â»Â¶

Ã¥Å“Â¨Ã¤Â»Â¥Ã¤Â¸â€¹Ã¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¯Â¼Å’Ã¤Â»Â£Ã§Ââ€ Ã¥Â°â€ Ã¥ÂÅ“Ã¦Â­Â¢Ã¥Â¹Â¶Ã¦Å Â¥Ã¥â€˜Å Ã¯Â¼Å¡
- Ã§â€ºÂ¸Ã¥ÂÅ’Ã©â€â„¢Ã¨Â¯Â¯Ã§Â»ÂÃ¨Â¿â€¡ 3 Ã¦Â¬Â¡Ã¥Â°ÂÃ¨Â¯â€¢Ã¥ÂÅ½Ã¤Â»ÂÃ§â€žÂ¶Ã¥Â­ËœÃ¥Å“Â¨
- Ã¤Â¿Â®Ã¥Â¤ÂÃ¥Â¼â€¢Ã¥â€¦Â¥Ã¤Âºâ€ Ã¦â€ºÂ´Ã¥Â¤Å¡Ã©â€â„¢Ã¨Â¯Â¯
- Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Å¾Â¶Ã¦Å¾â€žÃ¦â‚¬Â§Ã¦â€ºÂ´Ã¦â€Â¹
- Ã§Â¼ÂºÃ¥Â°â€˜Ã¥Â¤â€“Ã©Æ’Â¨Ã¤Â¾ÂÃ¨Âµâ€“

## Ã§â€ºÂ¸Ã¥â€¦Â³Ã¥â€˜Â½Ã¤Â»Â¤

- `/go-test` - Ã¦Å¾â€žÃ¥Â»ÂºÃ¦Ë†ÂÃ¥Å Å¸Ã¥ÂÅ½Ã¨Â¿ÂÃ¨Â¡Å’Ã¦Âµâ€¹Ã¨Â¯â€¢
- `/go-review` - Ã¥Â®Â¡Ã¦Å¸Â¥Ã¤Â»Â£Ã§Â ÂÃ¨Â´Â¨Ã©â€¡Â
- `/verify` - Ã¥Â®Å’Ã¦â€¢Â´Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â¾ÂªÃ§Å½Â¯

## Ã§â€ºÂ¸Ã¥â€¦Â³

- Ã¤Â»Â£Ã§Ââ€ : `agents/go-build-resolver.md`
- Ã¦Å â‚¬Ã¨Æ’Â½: `skills/golang-patterns/`
```
