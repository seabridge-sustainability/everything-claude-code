---
description: Corrija erros de build em Go, avisos de go vet e problemas de lint incrementalmente. Invoca o agente go-build-resolver para correÃƒÂ§ÃƒÂµes mÃƒÂ­nimas e cirÃƒÂºrgicas.
---

# Build e CorreÃƒÂ§ÃƒÂ£o Go

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
