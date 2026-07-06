# Go Ã¥Â¾Â®Ã¦Å“ÂÃ¥Å Â¡ Ã¢â‚¬â€ Ã©Â¡Â¹Ã§â€ºÂ® CLAUDE.md

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


> Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¤Â½Â¿Ã§â€Â¨ PostgreSQLÃ£â‚¬ÂgRPC Ã¥â€™Å’ Docker Ã§Å¡â€ž Go Ã¥Â¾Â®Ã¦Å“ÂÃ¥Å Â¡Ã§Å“Å¸Ã¥Â®Å¾Ã§Â¤ÂºÃ¤Â¾â€¹Ã£â‚¬â€š
> Ã¥Â°â€ Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Â¤ÂÃ¥Ë†Â¶Ã¥Ë†Â°Ã¦â€šÂ¨Ã§Å¡â€žÃ©Â¡Â¹Ã§â€ºÂ®Ã¦Â Â¹Ã§â€ºÂ®Ã¥Â½â€¢Ã¯Â¼Å’Ã¥Â¹Â¶Ã¦Â Â¹Ã¦ÂÂ®Ã¦â€šÂ¨Ã§Å¡â€žÃ¦Å“ÂÃ¥Å Â¡Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã£â‚¬â€š

## Ã©Â¡Â¹Ã§â€ºÂ®Ã¦Â¦â€šÃ¨Â¿Â°

**Ã¦Å â‚¬Ã¦Å“Â¯Ã¦Â Ë†:** Go 1.22+, PostgreSQL, gRPC + REST (grpc-gateway), Docker, sqlc (Ã§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€ž SQL), Wire (Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥)

**Ã¦Å¾Â¶Ã¦Å¾â€ž:** Ã©â€¡â€¡Ã§â€Â¨Ã©Â¢â€ Ã¥Å¸Å¸Ã£â‚¬ÂÃ¤Â»â€œÃ¥Âºâ€œÃ£â‚¬ÂÃ¦Å“ÂÃ¥Å Â¡Ã¥â€™Å’Ã¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã¥Â±â€šÃ§Å¡â€žÃ¦Â¸â€¦Ã¦â„¢Â°Ã¦Å¾Â¶Ã¦Å¾â€žÃ£â‚¬â€šgRPC Ã¤Â½Å“Ã¤Â¸ÂºÃ¤Â¸Â»Ã¨Â¦ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¦â€“Â¹Ã¥Â¼ÂÃ¯Â¼Å’REST Ã§Â½â€˜Ã¥â€¦Â³Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¤â€“Ã©Æ’Â¨Ã¥Â®Â¢Ã¦Ë†Â·Ã§Â«Â¯Ã£â‚¬â€š

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â§â€žÃ¥Ë†â„¢

### Go Ã¨Â§â€žÃ¨Å’Æ’

* Ã©ÂÂµÃ¥Â¾Âª Effective Go Ã¥â€™Å’ Go Code Review Comments Ã¦Å’â€¡Ã¥Ââ€”
* Ã¤Â½Â¿Ã§â€Â¨ `errors.New` / `fmt.Errorf` Ã©â€¦ÂÃ¥ÂË† `%w` Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å’â€¦Ã¨Â£â€¦ Ã¢â‚¬â€ Ã§Â»ÂÃ¤Â¸ÂÃ¥Â¯Â¹Ã©â€â„¢Ã¨Â¯Â¯Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¥Å’Â¹Ã©â€¦Â
* Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ `init()` Ã¥â€¡Â½Ã¦â€¢Â° Ã¢â‚¬â€ Ã¥Å“Â¨ `main()` Ã¦Ë†â€“Ã¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¤Â¸Â­Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦ËœÂ¾Ã¥Â¼ÂÃ¥Ë†ÂÃ¥Â§â€¹Ã¥Å’â€“
* Ã¦Â²Â¡Ã¦Å“â€°Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬Â Ã¢â‚¬â€ Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¦Å¾â€žÃ©â‚¬Â Ã¥â€¡Â½Ã¦â€¢Â°Ã¤Â¼Â Ã©â‚¬â€™Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹
* Context Ã¥Â¿â€¦Ã©Â¡Â»Ã¦ËœÂ¯Ã§Â¬Â¬Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Ââ€šÃ¦â€¢Â°Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Å“Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â±â€šÃ¤Â¸Â­Ã¤Â¼Â Ã¦â€™Â­

### Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ

* `queries/` Ã¤Â¸Â­Ã§Å¡â€žÃ¦â€°â‚¬Ã¦Å“â€°Ã¦Å¸Â¥Ã¨Â¯Â¢Ã©Æ’Â½Ã¤Â½Â¿Ã§â€Â¨Ã§ÂºÂ¯ SQL Ã¢â‚¬â€ sqlc Ã§â€Å¸Ã¦Ë†ÂÃ§Â±Â»Ã¥Å¾â€¹Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€ž Go Ã¤Â»Â£Ã§Â Â
* Ã¥Å“Â¨ `migrations/` Ã¤Â¸Â­Ã¤Â½Â¿Ã§â€Â¨ golang-migrate Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¿ÂÃ§Â§Â» Ã¢â‚¬â€ Ã§Â»ÂÃ¤Â¸ÂÃ§â€ºÂ´Ã¦Å½Â¥Ã¦â€ºÂ´Ã¦â€Â¹Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ
* Ã©â‚¬Å¡Ã¨Â¿â€¡ `pgx.Tx` Ã¤Â¸ÂºÃ¥Â¤Å¡Ã¦Â­Â¥Ã©ÂªÂ¤Ã¦â€œÂÃ¤Â½Å“Ã¤Â½Â¿Ã§â€Â¨Ã¤Âºâ€¹Ã¥Å Â¡
* Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥Â¿â€¦Ã©Â¡Â»Ã¤Â½Â¿Ã§â€Â¨Ã¥Ââ€šÃ¦â€¢Â°Ã¥Å’â€“Ã¥ÂÂ Ã¤Â½ÂÃ§Â¬Â¦ (`$1`, `$2`) Ã¢â‚¬â€ Ã§Â»ÂÃ¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

### Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

* Ã¨Â¿â€Ã¥â€ºÅ¾Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å’Ã¤Â¸ÂÃ¨Â¦Â panic Ã¢â‚¬â€ panic Ã¤Â»â€¦Ã§â€Â¨Ã¤ÂºÅ½Ã§Å“Å¸Ã¦Â­Â£Ã¦â€”Â Ã¦Â³â€¢Ã¦ÂÂ¢Ã¥Â¤ÂÃ§Å¡â€žÃ¦Æ’â€¦Ã¥â€ Âµ
* Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã¥Å’â€¦Ã¨Â£â€¦Ã©â€â„¢Ã¨Â¯Â¯Ã¯Â¼Å¡`fmt.Errorf("creating user: %w", err)`
* Ã¥Å“Â¨ `domain/errors.go` Ã¤Â¸Â­Ã¥Â®Å¡Ã¤Â¹â€°Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜Ã§Å¡â€žÃ¥â€œÂ¨Ã¥â€¦ÂµÃ©â€â„¢Ã¨Â¯Â¯
* Ã¥Å“Â¨Ã¥Â¤â€žÃ§Ââ€ Ã¥â„¢Â¨Ã¥Â±â€šÃ¥Â°â€ Ã©Â¢â€ Ã¥Å¸Å¸Ã©â€â„¢Ã¨Â¯Â¯Ã¦ËœÂ Ã¥Â°â€žÃ¥Ë†Â° gRPC Ã§Å Â¶Ã¦â‚¬ÂÃ§Â Â

```go
// Domain layer Ã¢â‚¬â€ sentinel errors
var (
    ErrUserNotFound  = errors.New("user not found")
    ErrEmailTaken    = errors.New("email already registered")
)

// Handler layer Ã¢â‚¬â€ map to gRPC status
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

### Ã¤Â»Â£Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

* Ã¤Â»Â£Ã§Â ÂÃ¦Ë†â€“Ã¦Â³Â¨Ã©â€¡Å Ã¤Â¸Â­Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¥ÂÂ·
* Ã¥Â¯Â¼Ã¥â€¡ÂºÃ§Å¡â€žÃ§Â±Â»Ã¥Å¾â€¹Ã¥â€™Å’Ã¥â€¡Â½Ã¦â€¢Â°Ã¥Â¿â€¦Ã©Â¡Â»Ã¦Å“â€°Ã¦â€“â€¡Ã¦Â¡Â£Ã¦Â³Â¨Ã©â€¡Å 
* Ã¥â€¡Â½Ã¦â€¢Â°Ã¤Â¿ÂÃ¦Å’ÂÃ¥Å“Â¨ 50 Ã¨Â¡Å’Ã¤Â»Â¥Ã¥â€ â€¦ Ã¢â‚¬â€ Ã¦ÂÂÃ¥Ââ€“Ã¨Â¾â€¦Ã¥Å Â©Ã¥â€¡Â½Ã¦â€¢Â°
* Ã¥Â¯Â¹Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€¦Â·Ã¦Å“â€°Ã¥Â¤Å¡Ã¤Â¸ÂªÃ§â€Â¨Ã¤Â¾â€¹Ã§Å¡â€žÃ©â‚¬Â»Ã¨Â¾â€˜Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¤Â¿Â¡Ã¥ÂÂ·Ã©â‚¬Å¡Ã©Ââ€œÃ¯Â¼Å’Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `struct{}`Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯ `bool`

## Ã¦â€“â€¡Ã¤Â»Â¶Ã§Â»â€œÃ¦Å¾â€ž

```
cmd/
  server/
    main.go              # Ã¥â€¦Â¥Ã¥ÂÂ£Ã§â€šÂ¹Ã¯Â¼Å’WireÃ¦Â³Â¨Ã¥â€¦Â¥Ã¯Â¼Å’Ã¤Â¼ËœÃ©â€ºâ€¦Ã¥â€¦Â³Ã©â€”Â­
internal/
  domain/                # Ã¤Â¸Å¡Ã¥Å Â¡Ã§Â±Â»Ã¥Å¾â€¹Ã¥â€™Å’Ã¦Å½Â¥Ã¥ÂÂ£
    user.go              # Ã§â€Â¨Ã¦Ë†Â·Ã¥Â®Å¾Ã¤Â½â€œÃ¥â€™Å’Ã¤Â»â€œÃ¥Âºâ€œÃ¦Å½Â¥Ã¥ÂÂ£
    errors.go            # Ã¥â€œÂ¨Ã¥â€¦ÂµÃ©â€â„¢Ã¨Â¯Â¯
  service/               # Ã¤Â¸Å¡Ã¥Å Â¡Ã©â‚¬Â»Ã¨Â¾â€˜
    user_service.go
    user_service_test.go
  repository/            # Ã¦â€¢Â°Ã¦ÂÂ®Ã¨Â®Â¿Ã©â€”Â®Ã¯Â¼Ë†sqlcÃ§â€Å¸Ã¦Ë†Â + Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¯Â¼â€°
    postgres/
      user_repo.go
      user_repo_test.go  # Ã¤Â½Â¿Ã§â€Â¨testcontainersÃ§Å¡â€žÃ©â€ºâ€ Ã¦Ë†ÂÃ¦Âµâ€¹Ã¨Â¯â€¢
  handler/               # gRPC + RESTÃ¥Â¤â€žÃ§Ââ€ Ã§Â¨â€¹Ã¥ÂºÂ
    grpc/
      user_handler.go
    rest/
      user_handler.go
  config/                # Ã©â€¦ÂÃ§Â½Â®Ã¥Å Â Ã¨Â½Â½
    config.go
proto/                   # ProtobufÃ¥Â®Å¡Ã¤Â¹â€°
  user/v1/
    user.proto
queries/                 # sqlcÃ§Å¡â€žSQLÃ¦Å¸Â¥Ã¨Â¯Â¢
  user.sql
migrations/              # Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¨Â¿ÂÃ§Â§Â»
  001_create_users.up.sql
  001_create_users.down.sql
```

## Ã¥â€¦Â³Ã©â€Â®Ã¦Â¨Â¡Ã¥Â¼Â

### Ã¤Â»â€œÃ¥Âºâ€œÃ¦Å½Â¥Ã¥ÂÂ£

```go
type UserRepository interface {
    Create(ctx context.Context, user *User) error
    FindByID(ctx context.Context, id uuid.UUID) (*User, error)
    FindByEmail(ctx context.Context, email string) (*User, error)
    Update(ctx context.Context, user *User) error
    Delete(ctx context.Context, id uuid.UUID) error
}
```

### Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¾ÂÃ¨Âµâ€“Ã¦Â³Â¨Ã¥â€¦Â¥Ã§Å¡â€žÃ¦Å“ÂÃ¥Å Â¡

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

### Ã¨Â¡Â¨Ã¦Â Â¼Ã©Â©Â±Ã¥Å Â¨Ã¦Âµâ€¹Ã¨Â¯â€¢

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

## Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡Â

```bash
# Database
DATABASE_URL=postgres://user:pass@localhost:5432/myservice?sslmode=disable

# gRPC
GRPC_PORT=50051
REST_PORT=8080

# Auth
JWT_SECRET=           # Load from vault in production
TOKEN_EXPIRY=24h

# Observability
LOG_LEVEL=info        # debug, info, warn, error
OTEL_ENDPOINT=        # OpenTelemetry collector
```

## Ã¦Âµâ€¹Ã¨Â¯â€¢Ã§Â­â€“Ã§â€¢Â¥

```bash
/go-test             # TDD workflow for Go
/go-review           # Go-specific code review
/go-build            # Fix build errors
```

### Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¥â€˜Â½Ã¤Â»Â¤

```bash
# Unit tests (fast, no external deps)
go test ./internal/... -short -count=1

# Integration tests (requires Docker for testcontainers)
go test ./internal/repository/... -count=1 -timeout 120s

# All tests with coverage
go test ./... -coverprofile=coverage.out -count=1
go tool cover -func=coverage.out  # summary
go tool cover -html=coverage.out  # browser

# Race detector
go test ./... -race -count=1
```

## ECC Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

```bash
# Planning
/plan "Add rate limiting to user endpoints"

# Development
/go-test                  # TDD with Go-specific patterns

# Review
/go-review                # Go idioms, error handling, concurrency
/security-scan            # Secrets and vulnerabilities

# Before merge
go vet ./...
staticcheck ./...
```

## Git Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂ

* `feat:` Ã¦â€“Â°Ã¥Å Å¸Ã¨Æ’Â½Ã¯Â¼Å’`fix:` Ã©â€â„¢Ã¨Â¯Â¯Ã¤Â¿Â®Ã¥Â¤ÂÃ¯Â¼Å’`refactor:` Ã¤Â»Â£Ã§Â ÂÃ¦â€ºÂ´Ã¦â€Â¹
* Ã¤Â»Å½ `main` Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Å Å¸Ã¨Æ’Â½Ã¥Ë†â€ Ã¦â€Â¯Ã¯Â¼Å’Ã©Å“â‚¬Ã¨Â¦Â PR
* CI: `go vet`, `staticcheck`, `go test -race`, `golangci-lint`
* Ã©Æ’Â¨Ã§Â½Â²: Ã¥Å“Â¨ CI Ã¤Â¸Â­Ã¦Å¾â€žÃ¥Â»Âº Docker Ã©â€¢Å“Ã¥Æ’ÂÃ¯Â¼Å’Ã©Æ’Â¨Ã§Â½Â²Ã¥Ë†Â° Kubernetes
