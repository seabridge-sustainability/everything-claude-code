---
description: RevisÃƒÂ£o completa de cÃƒÂ³digo Go para padrÃƒÂµes idiomÃƒÂ¡ticos, seguranÃƒÂ§a de concorrÃƒÂªncia, tratamento de erro e seguranÃƒÂ§a. Invoca o agente go-reviewer.
---

# Code Review Go

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
