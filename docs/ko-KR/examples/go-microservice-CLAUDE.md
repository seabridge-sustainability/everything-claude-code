# Go Microservice Ã¢â‚¬â€ Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ CLAUDE.md

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


> PostgreSQL, gRPC, DockerÃ«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ«Å â€ Go Ã«Â§Ë†Ã¬ÂÂ´Ã­ÂÂ¬Ã«Â¡Å“Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤Ã¬ÂËœ Ã¬â€¹Â¤Ã¬Â â€ž Ã¬ËœË†Ã¬â€¹Å“Ã¬Å¾â€¦Ã«â€¹Ë†Ã«â€¹Â¤.
> Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ Ã«Â£Â¨Ã­Å Â¸Ã¬â€”Â Ã«Â³ÂµÃ¬â€šÂ¬Ã­â€¢ËœÃ¬â€”Â¬ Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤Ã¬â€”Â Ã«Â§Å¾ÃªÂ²Å’ Ã¬Â»Â¤Ã¬Å Â¤Ã­â€žÂ°Ã«Â§Ë†Ã¬ÂÂ´Ã¬Â¦Ë†Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€.

## Ã­â€â€žÃ«Â¡Å“Ã¬Â ÂÃ­Å Â¸ ÃªÂ°Å“Ã¬Å¡â€

**ÃªÂ¸Â°Ã¬Ë†Â  Ã¬Å Â¤Ã­Æ’Â:** Go 1.22+, PostgreSQL, gRPC + REST (grpc-gateway), Docker, sqlc (Ã­Æ’â‚¬Ã¬Å¾â€¦ Ã¬â€¢Ë†Ã¬Â â€ž SQL), Wire (Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ± Ã¬Â£Â¼Ã¬Å¾â€¦)

**Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ:** domain, repository, service, handler Ã«Â Ë†Ã¬ÂÂ´Ã¬â€“Â´Ã«Â¡Å“ ÃªÂµÂ¬Ã¬â€žÂ±Ã«ÂÅ“ Ã­ÂÂ´Ã«Â¦Â° Ã¬â€¢â€žÃ­â€šÂ¤Ã­â€¦ÂÃ¬Â²Ëœ. gRPCÃ«Â¥Â¼ ÃªÂ¸Â°Ã«Â³Â¸ Ã¬Â â€žÃ¬â€ Â¡ Ã­â€â€žÃ«Â¡Å“Ã­â€ Â Ã¬Â½Å“Ã«Â¡Å“ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃªÂ³Â , Ã¬â„¢Â¸Ã«Â¶â‚¬ Ã­ÂÂ´Ã«ÂÂ¼Ã¬ÂÂ´Ã¬â€“Â¸Ã­Å Â¸Ã«Â¥Â¼ Ã¬Å“â€žÃ­â€¢Å“ REST gateway Ã¬Â Å“ÃªÂ³Âµ.

## Ã­â€¢â€žÃ¬Ë†Ëœ ÃªÂ·Å“Ã¬Â¹â„¢

### Go ÃªÂ·Å“Ã¬Â¹â„¢

- Effective GoÃ¬â„¢â‚¬ Go Code Review Comments ÃªÂ°â‚¬Ã¬ÂÂ´Ã«â€œÅ“Ã«Â¥Â¼ Ã«â€Â°Ã«Â¥Â¼ ÃªÂ²Æ’
- Ã¬ËœÂ¤Ã«Â¥Ëœ Ã«Å¾ËœÃ­â€¢â€˜Ã¬â€”Â `errors.New` / `fmt.Errorf`Ã¬â„¢â‚¬ `%w` Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ Ã¬ËœÂ¤Ã«Â¥ËœÃ«Â¥Â¼ Ã«Â¬Â¸Ã¬Å¾ÂÃ¬â€”Â´ Ã«Â§Â¤Ã¬Â¹Â­Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- `init()` Ã­â€¢Â¨Ã¬Ë†Ëœ Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬ Ã¢â‚¬â€ `main()`Ã¬ÂÂ´Ã«â€šËœ Ã¬Æ’ÂÃ¬â€žÂ±Ã¬Å¾ÂÃ¬â€”ÂÃ¬â€žÅ“ Ã«Âªâ€¦Ã¬â€¹Å“Ã¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬Â´Ë†ÃªÂ¸Â°Ã­â„¢â€
- Ã¬Â â€žÃ¬â€”Â­ ÃªÂ°â‚¬Ã«Â³â‚¬ Ã¬Æ’ÂÃ­Æ’Å“ ÃªÂ¸Ë†Ã¬Â§â‚¬ Ã¢â‚¬â€ Ã¬Æ’ÂÃ¬â€žÂ±Ã¬Å¾ÂÃ«Â¥Â¼ Ã­â€ ÂµÃ­â€¢Â´ Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ± Ã¬Â â€žÃ«â€¹Â¬
- ContextÃ«Å â€ Ã«Â°ËœÃ«â€œÅ“Ã¬â€¹Å“ Ã¬Â²Â« Ã«Â²Ë†Ã¬Â§Â¸ Ã«Â§Â¤ÃªÂ°Å“Ã«Â³â‚¬Ã¬Ë†ËœÃ¬ÂÂ´Ã«Â©Â° Ã«ÂªÂ¨Ã«â€œÂ  Ã«Â Ë†Ã¬ÂÂ´Ã¬â€“Â´Ã«Â¥Â¼ Ã­â€ ÂµÃ­â€¢Â´ Ã¬Â â€žÃ­Å’Å’

### Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤

- Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Â¿Â¼Ã«Â¦Â¬Ã«Å â€ `queries/`Ã¬â€”Â Ã¬Ë†Å“Ã¬Ë†Ëœ SQLÃ«Â¡Å“ Ã¬Å¾â€˜Ã¬â€žÂ± Ã¢â‚¬â€ sqlcÃªÂ°â‚¬ Ã­Æ’â‚¬Ã¬Å¾â€¦ Ã¬â€¢Ë†Ã¬Â â€žÃ­â€¢Å“ Go Ã¬Â½â€Ã«â€œÅ“Ã«Â¥Â¼ Ã¬Æ’ÂÃ¬â€žÂ±
- Ã«Â§Ë†Ã¬ÂÂ´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦ËœÃ¬Ââ‚¬ `migrations/`Ã¬â€”Â golang-migrate Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤Ã«Â¥Â¼ Ã¬Â§ÂÃ¬Â â€˜ Ã«Â³â‚¬ÃªÂ²Â½Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â°
- Ã«â€¹Â¤Ã¬Â¤â€˜ Ã«â€¹Â¨ÃªÂ³â€ž Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬â€”ÂÃ«Å â€ `pgx.Tx`Ã«Â¥Â¼ Ã­â€ ÂµÃ­â€¢Å“ Ã­Å Â¸Ã«Å¾Å“Ã¬Å¾Â­Ã¬â€¦Ëœ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã«ÂªÂ¨Ã«â€œÂ  Ã¬Â¿Â¼Ã«Â¦Â¬Ã¬â€”Â parameterized placeholder (`$1`, `$2`) Ã¬â€šÂ¬Ã¬Å¡Â© Ã¢â‚¬â€ Ã«Â¬Â¸Ã¬Å¾ÂÃ¬â€”Â´ Ã­ÂÂ¬Ã«Â§Â¤Ã­Å’â€¦ Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬

### Ã¬ËœÂ¤Ã«Â¥Ëœ Ã¬Â²ËœÃ«Â¦Â¬

- Ã¬ËœÂ¤Ã«Â¥ËœÃ«Â¥Â¼ Ã«Â°ËœÃ­â„¢ËœÃ­â€¢ËœÃªÂ³Â , panicÃ­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å ÃªÂ¸Â° Ã¢â‚¬â€ panicÃ¬Ââ‚¬ Ã¬Â§â€žÃ¬Â â€¢Ã¬Å“Â¼Ã«Â¡Å“ Ã«Â³ÂµÃªÂµÂ¬ Ã«Â¶Ë†ÃªÂ°â‚¬Ã«Å Â¥Ã­â€¢Å“ Ã¬Æ’ÂÃ­â„¢Â©Ã¬â€”ÂÃ«Â§Å’ Ã¬â€šÂ¬Ã¬Å¡Â©
- Ã¬Â»Â¨Ã­â€¦ÂÃ¬Å Â¤Ã­Å Â¸Ã¬â„¢â‚¬ Ã­â€¢Â¨ÃªÂ»Ëœ Ã¬ËœÂ¤Ã«Â¥Ëœ Ã«Å¾ËœÃ­â€¢â€˜: `fmt.Errorf("creating user: %w", err)`
- Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§ÂÃ¬Ââ€ž Ã¬Å“â€žÃ­â€¢Å“ sentinel Ã¬ËœÂ¤Ã«Â¥ËœÃ«Å â€ `domain/errors.go`Ã¬â€”Â Ã¬Â â€¢Ã¬ÂËœ
- handler Ã«Â Ë†Ã¬ÂÂ´Ã¬â€“Â´Ã¬â€”ÂÃ¬â€žÅ“ Ã«Ââ€žÃ«Â©â€Ã¬ÂÂ¸ Ã¬ËœÂ¤Ã«Â¥ËœÃ«Â¥Â¼ gRPC status Ã¬Â½â€Ã«â€œÅ“Ã«Â¡Å“ Ã«Â§Â¤Ã­â€¢â€˜

```go
// Ã«Ââ€žÃ«Â©â€Ã¬ÂÂ¸ Ã«Â Ë†Ã¬ÂÂ´Ã¬â€“Â´ Ã¢â‚¬â€ sentinel Ã¬ËœÂ¤Ã«Â¥Ëœ
var (
    ErrUserNotFound  = errors.New("user not found")
    ErrEmailTaken    = errors.New("email already registered")
)

// Handler Ã«Â Ë†Ã¬ÂÂ´Ã¬â€“Â´ Ã¢â‚¬â€ gRPC statusÃ«Â¡Å“ Ã«Â§Â¤Ã­â€¢â€˜
func toGRPCError(err error) error {
    switch {
    case errors.Is(err, domain.ErrUserNotFound):
        return status.Error(codes.NotFound, err.Error())
    case errors.Is(err, domain.ErrEmailTaken):
        return status.Error(codes.AlreadyExists, err.Error())
    default:
        return status.Error(codes.Internal, "internal error")
    }
}
```

### Ã¬Â½â€Ã«â€œÅ“ Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼

- Ã¬Â½â€Ã«â€œÅ“Ã«â€šËœ Ã¬Â£Â¼Ã¬â€žÂÃ¬â€”Â Ã¬ÂÂ´Ã«ÂªÂ¨Ã¬Â§â‚¬ Ã¬â€šÂ¬Ã¬Å¡Â© ÃªÂ¸Ë†Ã¬Â§â‚¬
- Ã¬â„¢Â¸Ã«Â¶â‚¬Ã«Â¡Å“ ÃªÂ³ÂµÃªÂ°Å“Ã«ÂËœÃ«Å â€ Ã­Æ’â‚¬Ã¬Å¾â€¦ÃªÂ³Â¼ Ã­â€¢Â¨Ã¬Ë†ËœÃ¬â€”ÂÃ«Å â€ Ã«Â°ËœÃ«â€œÅ“Ã¬â€¹Å“ doc Ã¬Â£Â¼Ã¬â€žÂ Ã¬Å¾â€˜Ã¬â€žÂ±
- Ã­â€¢Â¨Ã¬Ë†ËœÃ«Å â€ 50Ã¬Â¤â€ž Ã¬ÂÂ´Ã­â€¢ËœÃ«Â¡Å“ Ã¬Å“Â Ã¬Â§â‚¬ Ã¢â‚¬â€ Ã­â€”Â¬Ã­ÂÂ¼ Ã­â€¢Â¨Ã¬Ë†ËœÃ«Â¡Å“ Ã«Â¶â€žÃ«Â¦Â¬
- Ã¬â€”Â¬Ã«Å¸Â¬ Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬Å Â¤ÃªÂ°â‚¬ Ã¬Å¾Ë†Ã«Å â€ Ã«ÂªÂ¨Ã«â€œÂ  Ã«Â¡Å“Ã¬Â§ÂÃ¬â€”Â table-driven Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬â€šÂ¬Ã¬Å¡Â©
- signal Ã¬Â±â€žÃ«â€žÂÃ¬â€”ÂÃ«Å â€ `bool`Ã¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’ `struct{}` Ã¬â€šÂ¬Ã¬Å¡Â©

## Ã­Å’Å’Ã¬ÂÂ¼ ÃªÂµÂ¬Ã¬Â¡Â°

```
cmd/
  server/
    main.go              # Ã¬Â§â€žÃ¬Å¾â€¦Ã¬Â Â, Wire Ã¬Â£Â¼Ã¬Å¾â€¦, Ã¬Å¡Â°Ã¬â€¢â€žÃ­â€¢Å“ Ã¬Â¢â€¦Ã«Â£Å’
internal/
  domain/                # Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã­Æ’â‚¬Ã¬Å¾â€¦ÃªÂ³Â¼ Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤
    user.go              # User Ã¬â€”â€Ã­â€¹Â°Ã­â€¹Â°Ã¬â„¢â‚¬ repository Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤
    errors.go            # Sentinel Ã¬ËœÂ¤Ã«Â¥Ëœ
  service/               # Ã«Â¹â€žÃ¬Â¦Ë†Ã«â€¹Ë†Ã¬Å Â¤ Ã«Â¡Å“Ã¬Â§Â
    user_service.go
    user_service_test.go
  repository/            # Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Â â€˜ÃªÂ·Â¼ (sqlc Ã¬Æ’ÂÃ¬â€žÂ± + Ã¬Â»Â¤Ã¬Å Â¤Ã­â€¦â‚¬)
    postgres/
      user_repo.go
      user_repo_test.go  # testcontainersÃ«Â¥Â¼ Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Å“ Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸
  handler/               # gRPC + REST Ã­â€¢Â¸Ã«â€œÂ¤Ã«Å¸Â¬
    grpc/
      user_handler.go
    rest/
      user_handler.go
  config/                # Ã¬â€žÂ¤Ã¬Â â€¢ Ã«Â¡Å“Ã«â€Â©
    config.go
proto/                   # Protobuf Ã¬Â â€¢Ã¬ÂËœ
  user/v1/
    user.proto
queries/                 # sqlcÃ¬Å¡Â© SQL Ã¬Â¿Â¼Ã«Â¦Â¬
  user.sql
migrations/              # Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã«Â§Ë†Ã¬ÂÂ´ÃªÂ·Â¸Ã«Â Ë†Ã¬ÂÂ´Ã¬â€¦Ëœ
  001_create_users.up.sql
  001_create_users.down.sql
```

## Ã¬Â£Â¼Ã¬Å¡â€ Ã­Å’Â¨Ã­â€žÂ´

### Repository Ã¬ÂÂ¸Ã­â€žÂ°Ã­Å½ËœÃ¬ÂÂ´Ã¬Å Â¤

```go
type UserRepository interface {
    Create(ctx context.Context, user *User) error
    FindByID(ctx context.Context, id uuid.UUID) (*User, error)
    FindByEmail(ctx context.Context, email string) (*User, error)
    Update(ctx context.Context, user *User) error
    Delete(ctx context.Context, id uuid.UUID) error
}
```

### Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ± Ã¬Â£Â¼Ã¬Å¾â€¦Ã¬Ââ€ž Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢Å“ Service

```go
type UserService struct {
    repo   domain.UserRepository
    hasher PasswordHasher
    logger *slog.Logger
}

func NewUserService(repo domain.UserRepository, hasher PasswordHasher, logger *slog.Logger) *UserService {
    return &UserService{repo: repo, hasher: hasher, logger: logger}
}

func (s *UserService) Create(ctx context.Context, req CreateUserRequest) (*domain.User, error) {
    existing, err := s.repo.FindByEmail(ctx, req.Email)
    if err != nil && !errors.Is(err, domain.ErrUserNotFound) {
        return nil, fmt.Errorf("checking email: %w", err)
    }
    if existing != nil {
        return nil, domain.ErrEmailTaken
    }

    hashed, err := s.hasher.Hash(req.Password)
    if err != nil {
        return nil, fmt.Errorf("hashing password: %w", err)
    }

    user := &domain.User{
        ID:       uuid.New(),
        Name:     req.Name,
        Email:    req.Email,
        Password: hashed,
    }
    if err := s.repo.Create(ctx, user); err != nil {
        return nil, fmt.Errorf("creating user: %w", err)
    }
    return user, nil
}
```

### Table-Driven Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸

```go
func TestUserService_Create(t *testing.T) {
    tests := []struct {
        name    string
        req     CreateUserRequest
        setup   func(*MockUserRepo)
        wantErr error
    }{
        {
            name: "valid user",
            req:  CreateUserRequest{Name: "Alice", Email: "alice@example.com", Password: "secure123"},
            setup: func(m *MockUserRepo) {
                m.On("FindByEmail", mock.Anything, "alice@example.com").Return(nil, domain.ErrUserNotFound)
                m.On("Create", mock.Anything, mock.Anything).Return(nil)
            },
            wantErr: nil,
        },
        {
            name: "duplicate email",
            req:  CreateUserRequest{Name: "Alice", Email: "taken@example.com", Password: "secure123"},
            setup: func(m *MockUserRepo) {
                m.On("FindByEmail", mock.Anything, "taken@example.com").Return(&domain.User{}, nil)
            },
            wantErr: domain.ErrEmailTaken,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            repo := new(MockUserRepo)
            tt.setup(repo)
            svc := NewUserService(repo, &bcryptHasher{}, slog.Default())

            _, err := svc.Create(context.Background(), tt.req)

            if tt.wantErr != nil {
                assert.ErrorIs(t, err, tt.wantErr)
            } else {
                assert.NoError(t, err)
            }
        })
    }
}
```

## Ã­â„¢ËœÃªÂ²Â½ Ã«Â³â‚¬Ã¬Ë†Ëœ

```bash
# Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤
DATABASE_URL=postgres://user:pass@localhost:5432/myservice?sslmode=disable

# gRPC
GRPC_PORT=50051
REST_PORT=8080

# Ã¬ÂÂ¸Ã¬Â¦Â
JWT_SECRET=           # Ã­â€â€žÃ«Â¡Å“Ã«Ââ€¢Ã¬â€¦ËœÃ¬â€”ÂÃ¬â€žÅ“Ã«Å â€ vaultÃ¬â€”ÂÃ¬â€žÅ“ Ã«Â¡Å“Ã«â€œÅ“
TOKEN_EXPIRY=24h

# ÃªÂ´â‚¬Ã¬Â¸Â¡ ÃªÂ°â‚¬Ã«Å Â¥Ã¬â€žÂ±
LOG_LEVEL=info        # debug, info, warn, error
OTEL_ENDPOINT=        # OpenTelemetry Ã¬Â½Å“Ã«Â â€°Ã­â€žÂ°
```

## Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Â â€žÃ«Å¾Âµ

```bash
/go-test             # GoÃ¬Å¡Â© TDD Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°
/go-review           # Go Ã¬Â â€žÃ¬Å¡Â© Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â°
/go-build            # Ã«Â¹Å’Ã«â€œÅ“ Ã¬ËœÂ¤Ã«Â¥Ëœ Ã¬Ë†ËœÃ¬Â â€¢
```

### Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã«Âªâ€¦Ã«Â Â¹Ã¬â€“Â´

```bash
# Ã«â€¹Â¨Ã¬Å“â€ž Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ (Ã«Â¹Â Ã«Â¦â€ž, Ã¬â„¢Â¸Ã«Â¶â‚¬ Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ± Ã¬â€”â€ Ã¬ÂÅ’)
go test ./internal/... -short -count=1

# Ã­â€ ÂµÃ­â€¢Â© Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ (testcontainersÃ«Â¥Â¼ Ã¬Å“â€žÃ­â€¢Â´ Docker Ã­â€¢â€žÃ¬Å¡â€)
go test ./internal/repository/... -count=1 -timeout 120s

# Ã¬Â â€žÃ¬Â²Â´ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã¬â„¢â‚¬ Ã¬Â»Â¤Ã«Â²â€žÃ«Â¦Â¬Ã¬Â§â‚¬
go test ./... -coverprofile=coverage.out -count=1
go tool cover -func=coverage.out  # Ã¬Å¡â€Ã¬â€¢Â½
go tool cover -html=coverage.out  # Ã«Â¸Å’Ã«ÂÂ¼Ã¬Å¡Â°Ã¬Â â‚¬

# Race detector
go test ./... -race -count=1
```

## ECC Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

```bash
# ÃªÂ³â€žÃ­Å¡Â Ã¬Ë†ËœÃ«Â¦Â½
/plan "Add rate limiting to user endpoints"

# ÃªÂ°Å“Ã«Â°Å“
/go-test                  # Go Ã¬Â â€žÃ¬Å¡Â© Ã­Å’Â¨Ã­â€žÂ´Ã¬Å“Â¼Ã«Â¡Å“ TDD

# Ã«Â¦Â¬Ã«Â·Â°
/go-review                # Go ÃªÂ´â‚¬Ã¬Å¡Â©ÃªÂµÂ¬, Ã¬ËœÂ¤Ã«Â¥Ëœ Ã¬Â²ËœÃ«Â¦Â¬, Ã«Ââ„¢Ã¬â€¹Å“Ã¬â€žÂ±
/security-scan            # Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã«Â°Â Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â Â Ã¬Â ÂÃªÂ²â‚¬

# Ã«Â¨Â¸Ã¬Â§â‚¬ Ã¬Â â€ž Ã­â„¢â€¢Ã¬ÂÂ¸
go vet ./...
staticcheck ./...
```

## Git Ã¬â€ºÅ’Ã­ÂÂ¬Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â°

- `feat:` Ã¬Æ’Ë† ÃªÂ¸Â°Ã«Å Â¥, `fix:` Ã«Â²â€žÃªÂ·Â¸ Ã¬Ë†ËœÃ¬Â â€¢, `refactor:` Ã¬Â½â€Ã«â€œÅ“ Ã«Â³â‚¬ÃªÂ²Â½
- `main`Ã¬â€”ÂÃ¬â€žÅ“ feature Ã«Â¸Å’Ã«Å¾Å“Ã¬Â¹Ëœ Ã¬Æ’ÂÃ¬â€žÂ±, PR Ã­â€¢â€žÃ¬Ë†Ëœ
- CI: `go vet`, `staticcheck`, `go test -race`, `golangci-lint`
- Ã«Â°Â°Ã­ÂÂ¬: CIÃ¬â€”ÂÃ¬â€žÅ“ Docker Ã¬ÂÂ´Ã«Â¯Â¸Ã¬Â§â‚¬ Ã«Â¹Å’Ã«â€œÅ“, KubernetesÃ¬â€”Â Ã«Â°Â°Ã­ÂÂ¬
