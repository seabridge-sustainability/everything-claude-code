# Go Microservice Ã¢â‚¬â€ CLAUDE.md de Projeto

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


> Exemplo real para um microserviÃƒÂ§o Go com PostgreSQL, gRPC e Docker.
> Copie para a raiz do seu projeto e customize para seu serviÃƒÂ§o.

## VisÃƒÂ£o Geral do Projeto

**Stack:** Go 1.22+, PostgreSQL, gRPC + REST (grpc-gateway), Docker, sqlc (SQL type-safe), Wire (injeÃƒÂ§ÃƒÂ£o de dependÃƒÂªncia)

**Arquitetura:** Clean architecture com camadas domain, repository, service e handler. gRPC como transporte principal com gateway REST para clientes externos.

## Regras CrÃƒÂ­ticas

### ConvenÃƒÂ§ÃƒÂµes Go

- Siga Effective Go e o guia Go Code Review Comments
- Use `errors.New` / `fmt.Errorf` com `%w` para wrapping Ã¢â‚¬â€ nunca string matching em erros
- Sem funÃƒÂ§ÃƒÂµes `init()` Ã¢â‚¬â€ inicializaÃƒÂ§ÃƒÂ£o explÃƒÂ­cita em `main()` ou construtores
- Sem estado global mutÃƒÂ¡vel Ã¢â‚¬â€ passe dependÃƒÂªncias via construtores
- Context deve ser o primeiro parÃƒÂ¢metro e propagado por todas as camadas

### Banco de Dados

- Todas as queries em `queries/` como SQL puro Ã¢â‚¬â€ sqlc gera cÃƒÂ³digo Go type-safe
- Migrations em `migrations/` com golang-migrate Ã¢â‚¬â€ nunca alterar banco diretamente
- Use transaÃƒÂ§ÃƒÂµes para operaÃƒÂ§ÃƒÂµes multi-etapa via `pgx.Tx`
- Todas as queries devem usar placeholders parametrizados (`$1`, `$2`) Ã¢â‚¬â€ nunca string formatting

### Tratamento de Erro

- Retorne erros, nÃƒÂ£o use panic Ã¢â‚¬â€ panic sÃƒÂ³ para casos realmente irrecuperÃƒÂ¡veis
- FaÃƒÂ§a wrap de erros com contexto: `fmt.Errorf("creating user: %w", err)`
- Defina sentinel errors em `domain/errors.go` para lÃƒÂ³gica de negÃƒÂ³cio
- Mapeie erros de domÃƒÂ­nio para gRPC status codes na camada de handler

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

### Estilo de CÃƒÂ³digo

- Sem emojis em cÃƒÂ³digo ou comentÃƒÂ¡rios
- Tipos e funÃƒÂ§ÃƒÂµes exportados devem ter doc comments
- Mantenha funÃƒÂ§ÃƒÂµes abaixo de 50 linhas Ã¢â‚¬â€ extraia helpers
- Use table-driven tests para toda lÃƒÂ³gica com mÃƒÂºltiplos casos
- Prefira `struct{}` para canais de sinal, nÃƒÂ£o `bool`

## Estrutura de Arquivos

```
cmd/
  server/
    main.go              # Entrypoint, Wire injection, graceful shutdown
internal/
  domain/                # Business types and interfaces
    user.go              # User entity and repository interface
    errors.go            # Sentinel errors
  service/               # Business logic
    user_service.go
    user_service_test.go
  repository/            # Data access (sqlc-generated + custom)
    postgres/
      user_repo.go
      user_repo_test.go  # Integration tests with testcontainers
  handler/               # gRPC + REST handlers
    grpc/
      user_handler.go
    rest/
      user_handler.go
  config/                # Configuration loading
    config.go
proto/                   # Protobuf definitions
  user/v1/
    user.proto
queries/                 # SQL queries for sqlc
  user.sql
migrations/              # Database migrations
  001_create_users.up.sql
  001_create_users.down.sql
```

## PadrÃƒÂµes-Chave

### Interface de RepositÃƒÂ³rio

```go
type UserRepository interface {
    Create(ctx context.Context, user *User) error
    FindByID(ctx context.Context, id uuid.UUID) (*User, error)
    FindByEmail(ctx context.Context, email string) (*User, error)
    Update(ctx context.Context, user *User) error
    Delete(ctx context.Context, id uuid.UUID) error
}
```

### ServiÃƒÂ§o com InjeÃƒÂ§ÃƒÂ£o de DependÃƒÂªncia

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

### Table-Driven Tests

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

## VariÃƒÂ¡veis de Ambiente

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

## EstratÃƒÂ©gia de Teste

```bash
/go-test             # TDD workflow for Go
/go-review           # Go-specific code review
/go-build            # Fix build errors
```

### Comandos de Teste

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

## Workflow ECC

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

## Fluxo Git

- `feat:` novas features, `fix:` correÃƒÂ§ÃƒÂµes de bug, `refactor:` mudanÃƒÂ§as de cÃƒÂ³digo
- Branches de feature a partir da `main`, PRs obrigatÃƒÂ³rios
- CI: `go vet`, `staticcheck`, `go test -race`, `golangci-lint`
- Deploy: imagem Docker gerada no CI e publicada em Kubernetes
