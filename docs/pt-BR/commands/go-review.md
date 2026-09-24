---
description: RevisÃƒÂ£o completa de cÃƒÂ³digo Go para padrÃƒÂµes idiomÃƒÂ¡ticos, seguranÃƒÂ§a de concorrÃƒÂªncia, tratamento de erro e seguranÃƒÂ§a. Invoca o agente go-reviewer.
---

# Code Review Go

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


Este comando invoca o agente **go-reviewer** para revisÃƒÂ£o abrangente e especÃƒÂ­fica de Go.

## O Que Este Comando Faz

1. **Identificar MudanÃƒÂ§as Go**: Encontra arquivos `.go` modificados via `git diff`
2. **Rodar AnÃƒÂ¡lise EstÃƒÂ¡tica**: Executa `go vet`, `staticcheck` e `golangci-lint`
3. **Varredura de SeguranÃƒÂ§a**: Verifica SQL injection, command injection e race conditions
4. **RevisÃƒÂ£o de ConcorrÃƒÂªncia**: Analisa seguranÃƒÂ§a de goroutines, uso de channels e padrÃƒÂµes com mutex
5. **Checagem de Go IdiomÃƒÂ¡tico**: Verifica se o cÃƒÂ³digo segue convenÃƒÂ§ÃƒÂµes e boas prÃƒÂ¡ticas de Go
6. **Gerar RelatÃƒÂ³rio**: Categoriza problemas por severidade

## Quando Usar

Use `/go-review` quando:
- ApÃƒÂ³s escrever ou modificar cÃƒÂ³digo Go
- Antes de commitar mudanÃƒÂ§as Go
- Ao revisar pull requests com cÃƒÂ³digo Go
- Ao entrar em um novo codebase Go
- Ao aprender padrÃƒÂµes idiomÃƒÂ¡ticos Go

## Categorias de RevisÃƒÂ£o

### CRITICAL (ObrigatÃƒÂ³rio Corrigir)
- Vulnerabilidades de SQL/Command injection
- Race conditions sem sincronizaÃƒÂ§ÃƒÂ£o
- Vazamento de goroutine
- Credenciais hardcoded
- Uso inseguro de ponteiros
- Erros ignorados em caminhos crÃƒÂ­ticos

### HIGH (Deve Corrigir)
- Falta de wrapping de erro com contexto
- Panic em vez de retorno de erro
- Context nÃƒÂ£o propagado
- Canais nÃƒÂ£o bufferizados causando deadlock
- Erros de interface nÃƒÂ£o satisfeita
- Falta de proteÃƒÂ§ÃƒÂ£o com mutex

### MEDIUM (Considere)
- PadrÃƒÂµes nÃƒÂ£o idiomÃƒÂ¡ticos
- Falta de comentÃƒÂ¡rios godoc em exports
- ConcatenaÃƒÂ§ÃƒÂ£o de string ineficiente
- Slice sem prÃƒÂ©-alocaÃƒÂ§ÃƒÂ£o
- Table-driven tests nÃƒÂ£o usados

## Checagens AutomÃƒÂ¡ticas Executadas

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

## Exemplo de Uso

```text
User: /go-review

Agent:
# Go Code Review Report

## Files Reviewed
- internal/handler/user.go (modified)
- internal/service/auth.go (modified)

## Static Analysis Results
Ã¢Å“â€œ go vet: No issues
Ã¢Å“â€œ staticcheck: No issues

## Issues Found

[CRITICAL] Race Condition
File: internal/service/auth.go:45
Issue: Shared map accessed without synchronization
```go
var cache = map[string]*Session{}  // Concurrent access!

func GetSession(id string) *Session {
    return cache[id]  // Race condition
}
```
Fix: Use sync.RWMutex or sync.Map
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

[HIGH] Missing Error Context
File: internal/handler/user.go:28
Issue: Error returned without context
```go
return err  // No context
```
Fix: Wrap with context
```go
return fmt.Errorf("get user %s: %w", userID, err)
```

## Summary
- CRITICAL: 1
- HIGH: 1
- MEDIUM: 0

Recommendation: FAIL: Block merge until CRITICAL issue is fixed
```

## CritÃƒÂ©rios de AprovaÃƒÂ§ÃƒÂ£o

| Status | CondiÃƒÂ§ÃƒÂ£o |
|--------|----------|
| PASS: Aprovado | Sem problemas CRÃƒÂTICO ou ALTO |
| WARNING: Aviso | Apenas problemas MÃƒâ€°DIOS (merge com cautela) |
| FAIL: Bloqueado | Problemas CRÃƒÂTICO ou ALTO encontrados |
## IntegraÃƒÂ§ÃƒÂ£o com Outros Comandos

- Use `/go-test` primeiro para garantir que os testes passam
- Use `/go-build` se houver erros de build
- Use `/go-review` antes de commitar
- Use `/code-review` para preocupaÃƒÂ§ÃƒÂµes nÃƒÂ£o especÃƒÂ­ficas de Go

## Relacionado

- Agent: `agents/go-reviewer.md`
- Skills: `skills/golang-patterns/`, `skills/golang-testing/`
