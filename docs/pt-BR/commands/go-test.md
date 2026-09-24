---
description: ImpÃƒÂµe fluxo de TDD para Go. Escreva table-driven tests primeiro e depois implemente. Verifique cobertura de 80%+ com go test -cover.
---

# Comando TDD Go

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
