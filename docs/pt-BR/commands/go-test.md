---
description: ImpÃƒÂµe fluxo de TDD para Go. Escreva table-driven tests primeiro e depois implemente. Verifique cobertura de 80%+ com go test -cover.
---

# Comando TDD Go

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


Este comando impÃƒÂµe a metodologia de desenvolvimento orientado a testes para cÃƒÂ³digo Go usando padrÃƒÂµes idiomÃƒÂ¡ticos de teste em Go.

## O Que Este Comando Faz

1. **Definir Tipos/Interfaces**: Estrutura assinaturas de funÃƒÂ§ÃƒÂ£o primeiro
2. **Escrever Table-Driven Tests**: Criar casos de teste abrangentes (RED)
3. **Rodar Testes**: Verificar que os testes falham pelo motivo certo
4. **Implementar CÃƒÂ³digo**: Escrever cÃƒÂ³digo mÃƒÂ­nimo para passar (GREEN)
5. **Refatorar**: Melhorar mantendo testes verdes
6. **Checar Cobertura**: Garantir 80%+ de cobertura

## Quando Usar

Use `/go-test` quando:
- Implementar novas funÃƒÂ§ÃƒÂµes Go
- Adicionar cobertura de testes a cÃƒÂ³digo existente
- Corrigir bugs (escreva primeiro o teste que falha)
- Construir lÃƒÂ³gica de negÃƒÂ³cio crÃƒÂ­tica
- Aprender fluxo TDD em Go

## Ciclo TDD

```
RED     Ã¢â€ â€™ Write failing table-driven test
GREEN   Ã¢â€ â€™ Implement minimal code to pass
REFACTOR Ã¢â€ â€™ Improve code, tests stay green
REPEAT  Ã¢â€ â€™ Next test case
```

## Exemplo de SessÃƒÂ£o

````
User: /go-test I need a function to validate email addresses

Agent:
# TDD Session: Email Validator

## Step 1: Define Interface

```go
// validator/email.go
package validator

// ValidateEmail checks if the given string is a valid email address.
// Returns nil if valid, error describing the issue otherwise.
func ValidateEmail(email string) error {
    panic("not implemented")
}
```

## Step 2: Write Table-Driven Tests (RED)

```go
// validator/email_test.go
package validator

import (
    "testing"
)

func TestValidateEmail(t *testing.T) {
    tests := []struct {
        name    string
        email   string
        wantErr bool
    }{
        // Valid emails
        {"simple email", "user@example.com", false},
        {"with subdomain", "user@mail.example.com", false},
        {"with plus", "user+tag@example.com", false},
        {"with dots", "first.last@example.com", false},

        // Invalid emails
        {"empty string", "", true},
        {"no at sign", "userexample.com", true},
        {"no domain", "user@", true},
        {"no local part", "@example.com", true},
        {"double at", "user@@example.com", true},
        {"spaces", "user @example.com", true},
        {"no tld", "user@example", true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            err := ValidateEmail(tt.email)
            if tt.wantErr && err == nil {
                t.Errorf("ValidateEmail(%q) = nil; want error", tt.email)
            }
            if !tt.wantErr && err != nil {
                t.Errorf("ValidateEmail(%q) = %v; want nil", tt.email, err)
            }
        })
    }
}
```

## Step 3: Run Tests - Verify FAIL

```bash
$ go test ./validator/...

--- FAIL: TestValidateEmail (0.00s)
    --- FAIL: TestValidateEmail/simple_email (0.00s)
        panic: not implemented

FAIL
```

Ã¢Å“â€œ Tests fail as expected (panic).

## Step 4: Implement Minimal Code (GREEN)

```go
// validator/email.go
package validator

import (
    "errors"
    "regexp"
)

var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)

var (
    ErrEmailEmpty   = errors.New("email cannot be empty")
    ErrEmailInvalid = errors.New("email format is invalid")
)

func ValidateEmail(email string) error {
    if email == "" {
        return ErrEmailEmpty
    }
    if !emailRegex.MatchString(email) {
        return ErrEmailInvalid
    }
    return nil
}
```

## Step 5: Run Tests - Verify PASS

```bash
$ go test ./validator/...

PASS
ok      project/validator    0.003s
```

Ã¢Å“â€œ All tests passing!

## Step 6: Check Coverage

```bash
$ go test -cover ./validator/...

PASS
coverage: 100.0% of statements
ok      project/validator    0.003s
```

Ã¢Å“â€œ Coverage: 100%

## TDD Complete!
````

## PadrÃƒÂµes de Teste

### Table-Driven Tests
```go
tests := []struct {
    name     string
    input    InputType
    want     OutputType
    wantErr  bool
}{
    {"case 1", input1, want1, false},
    {"case 2", input2, want2, true},
}

for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
        got, err := Function(tt.input)
        // assertions
    })
}
```

### Testes Paralelos
```go
for _, tt := range tests {
    tt := tt // Capture
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()
        // test body
    })
}
```

### Helpers de Teste
```go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()
    db := createDB()
    t.Cleanup(func() { db.Close() })
    return db
}
```

## Comandos de Cobertura

```bash
# Basic coverage
go test -cover ./...

# Coverage profile
go test -coverprofile=coverage.out ./...

# View in browser
go tool cover -html=coverage.out

# Coverage by function
go tool cover -func=coverage.out

# With race detection
go test -race -cover ./...
```

## Metas de Cobertura

| Code Type | Target |
|-----------|--------|
| Critical business logic | 100% |
| Public APIs | 90%+ |
| General code | 80%+ |
| Generated code | Exclude |

## Boas PrÃƒÂ¡ticas de TDD

**DO:**
- Escreva teste PRIMEIRO, antes de qualquer implementaÃƒÂ§ÃƒÂ£o
- Rode testes apÃƒÂ³s cada mudanÃƒÂ§a
- Use table-driven tests para cobertura abrangente
- Teste comportamento, nÃƒÂ£o detalhes de implementaÃƒÂ§ÃƒÂ£o
- Inclua casos de borda (empty, nil, max values)

**DON'T:**
- Escrever implementaÃƒÂ§ÃƒÂ£o antes dos testes
- Pular a fase RED
- Testar funÃƒÂ§ÃƒÂµes privadas diretamente
- Usar `time.Sleep` em testes
- Ignorar testes flaky

## Comandos Relacionados

- `/go-build` - Corrigir erros de build
- `/go-review` - Revisar cÃƒÂ³digo apÃƒÂ³s implementaÃƒÂ§ÃƒÂ£o
- `/verify` - Rodar loop completo de verificaÃƒÂ§ÃƒÂ£o

## Relacionado

- Skill: `skills/golang-testing/`
- Skill: `skills/tdd-workflow/`
