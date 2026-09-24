---
description: Corrija erros de build em Go, avisos de go vet e problemas de lint incrementalmente. Invoca o agente go-build-resolver para correÃƒÂ§ÃƒÂµes mÃƒÂ­nimas e cirÃƒÂºrgicas.
---

# Build e CorreÃƒÂ§ÃƒÂ£o Go

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


Este comando invoca o agente **go-build-resolver** para corrigir erros de build Go incrementalmente com mudanÃƒÂ§as mÃƒÂ­nimas.

## O Que Este Comando Faz

1. **Rodar DiagnÃƒÂ³sticos**: Executa `go build`, `go vet`, `staticcheck`
2. **Parsear Erros**: Agrupa por arquivo e ordena por severidade
3. **Corrigir Incrementalmente**: Um erro por vez
4. **Verificar Cada CorreÃƒÂ§ÃƒÂ£o**: Roda build de novo apÃƒÂ³s cada mudanÃƒÂ§a
5. **Reportar Resumo**: Mostra o que foi corrigido e o que resta

## Quando Usar

Use `/go-build` quando:
- `go build ./...` falhar com erros
- `go vet ./...` reportar problemas
- `golangci-lint run` mostrar avisos
- DependÃƒÂªncias do mÃƒÂ³dulo estiverem quebradas
- ApÃƒÂ³s puxar mudanÃƒÂ§as que quebraram o build

## Comandos de DiagnÃƒÂ³stico Executados

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

## Exemplo de SessÃƒÂ£o

```text
User: /go-build

Agent:
# Go Build Resolution

## Initial Diagnostics

```bash
$ go build ./...
internal/service/user.go:25:15: undefined: UserRepository
internal/handler/api.go:42:9: cannot use x (type string) as type int
internal/handler/api.go:58:2: missing return at end of function
```

Errors found: 3

## Fix 1: Undefined Identifier

File: internal/service/user.go:25
Error: undefined: UserRepository
Cause: Missing import

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

## Fix 2: Type Mismatch

File: internal/handler/api.go:42
Error: cannot use x (type string) as type int

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

## Fix 3: Missing Return

File: internal/handler/api.go:58
Error: missing return at end of function

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

## Final Verification

```bash
$ go vet ./...
# No issues

$ go test ./...
ok      project/internal/service   0.015s
ok      project/internal/handler   0.023s
```

## Summary

| Metric | Count |
|--------|-------|
| Build errors fixed | 3 |
| Vet warnings fixed | 0 |
| Files modified | 2 |
| Remaining issues | 0 |

Build Status: PASS: SUCCESS
```

## Erros Comuns Corrigidos

| Error | Typical Fix |
|-------|-------------|
| `undefined: X` | Add import or fix typo |
| `cannot use X as Y` | Type conversion or fix assignment |
| `missing return` | Add return statement |
| `X does not implement Y` | Add missing method |
| `import cycle` | Restructure packages |
| `declared but not used` | Remove or use variable |
| `cannot find package` | `go get` or `go mod tidy` |

## EstratÃƒÂ©gia de CorreÃƒÂ§ÃƒÂ£o

1. **Erros de build primeiro** - O cÃƒÂ³digo precisa compilar
2. **Avisos do vet depois** - Corrigir construÃƒÂ§ÃƒÂµes suspeitas
3. **Avisos de lint por ÃƒÂºltimo** - Estilo e boas prÃƒÂ¡ticas
4. **Uma correÃƒÂ§ÃƒÂ£o por vez** - Verificar cada mudanÃƒÂ§a
5. **MudanÃƒÂ§as mÃƒÂ­nimas** - NÃƒÂ£o refatorar, apenas corrigir

## CondiÃƒÂ§ÃƒÂµes de Parada

O agente vai parar e reportar se:
- O mesmo erro persistir apÃƒÂ³s 3 tentativas
- A correÃƒÂ§ÃƒÂ£o introduzir mais erros
- Exigir mudanÃƒÂ§as arquiteturais
- Faltarem dependÃƒÂªncias externas

## Comandos Relacionados

- `/go-test` - Rode testes apÃƒÂ³s o build passar
- `/go-review` - Revise qualidade do cÃƒÂ³digo
- `/verify` - Loop completo de verificaÃƒÂ§ÃƒÂ£o

## Relacionado

- Agent: `agents/go-build-resolver.md`
- Skill: `skills/golang-patterns/`
