---
description: Corrija erros de build em Go, avisos de go vet e problemas de lint incrementalmente. Invoca o agente go-build-resolver para correÃƒÂ§ÃƒÂµes mÃƒÂ­nimas e cirÃƒÂºrgicas.
---

# Build e CorreÃƒÂ§ÃƒÂ£o Go

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
