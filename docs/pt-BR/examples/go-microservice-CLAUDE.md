# Go Microservice Ã¢â‚¬â€ CLAUDE.md de Projeto

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
