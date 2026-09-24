---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---

# Go Ã¦Â¨Â¡Ã¥Â¼Â

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¦Â¡Â£Ã¥Å“Â¨ [common/patterns.md](../common/patterns.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Go Ã¨Â¯Â­Ã¨Â¨â‚¬Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥â€¡Â½Ã¦â€¢Â°Ã¥Â¼ÂÃ©â‚¬â€°Ã©Â¡Â¹

```go
type Option func(*Server)

func WithPort(port int) Option {
    return func(s *Server) { s.port = port }
}

func NewServer(opts ...Option) *Server {
    s := &Server{port: 8080}
    for _, opt := range opts {
        opt(s)
    }
    return s
}
```

## Ã¥Â°ÂÃ¦Å½Â¥Ã¥ÂÂ£

Ã¥Å“Â¨Ã¦Å½Â¥Ã¥ÂÂ£Ã¨Â¢Â«Ã¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã¥Â®Å¡Ã¤Â¹â€°Ã¥Â®Æ’Ã¤Â»Â¬Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥Å“Â¨Ã¥Â®Æ’Ã¤Â»Â¬Ã¨Â¢Â«Ã¥Â®Å¾Ã§Å½Â°Ã§Å¡â€žÃ¥Å“Â°Ã¦â€“Â¹Ã£â‚¬â€š

## Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥

Ã¤Â½Â¿Ã§â€Â¨Ã¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¦ÂÂ¥Ã¦Â³Â¨Ã¥â€¦Â¥Ã¤Â¾ÂÃ¨Âµâ€“Ã¯Â¼Å¡

```go
func NewUserService(repo UserRepository, logger Logger) *UserService {
    return &UserService{repo: repo, logger: logger}
}
```

## Ã¥Ââ€šÃ¨â‚¬Æ’

Ã¦Å“â€°Ã¥â€¦Â³Ã¥â€¦Â¨Ã©ÂÂ¢Ã§Å¡â€ž Go Ã¦Â¨Â¡Ã¥Â¼ÂÃ¯Â¼Ë†Ã¥Å’â€¦Ã¦â€¹Â¬Ã¥Â¹Â¶Ã¥Ââ€˜Ã£â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ Ã¥â€™Å’Ã¥Å’â€¦Ã§Â»â€žÃ§Â»â€¡Ã¯Â¼â€°Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Å¡`golang-patterns`Ã£â‚¬â€š
