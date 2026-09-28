# Cobertura de Testes

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


Analise cobertura de testes, identifique lacunas e gere testes faltantes para alcanÃƒÂ§ar cobertura de 80%+.

## Passo 1: Detectar Framework de Teste

| Indicator | Coverage Command |
|-----------|-----------------|
| `jest.config.*` or `package.json` jest | `npx jest --coverage --coverageReporters=json-summary` |
| `vitest.config.*` | `npx vitest run --coverage` |
| `pytest.ini` / `pyproject.toml` pytest | `pytest --cov=src --cov-report=json` |
| `Cargo.toml` | `cargo llvm-cov --json` |
| `pom.xml` with JaCoCo | `mvn test jacoco:report` |
| `go.mod` | `go test -coverprofile=coverage.out ./...` |

## Passo 2: Analisar RelatÃƒÂ³rio de Cobertura

1. Rode o comando de cobertura
2. Parseie a saÃƒÂ­da (resumo em JSON ou saÃƒÂ­da de terminal)
3. Liste arquivos **abaixo de 80% de cobertura**, ordenados do pior para o melhor
4. Para cada arquivo abaixo da meta, identifique:
   - FunÃƒÂ§ÃƒÂµes ou mÃƒÂ©todos sem teste
   - Cobertura de branch faltante (if/else, switch, caminhos de erro)
   - CÃƒÂ³digo morto que infla o denominador

## Passo 3: Gerar Testes Faltantes

Para cada arquivo abaixo da meta, gere testes seguindo esta prioridade:

1. **Happy path** Ã¢â‚¬â€ Funcionalidade principal com entradas vÃƒÂ¡lidas
2. **Tratamento de erro** Ã¢â‚¬â€ Entradas invÃƒÂ¡lidas, dados ausentes, falhas de rede
3. **Casos de borda** Ã¢â‚¬â€ Arrays vazios, null/undefined, valores de fronteira (0, -1, MAX_INT)
4. **Cobertura de branch** Ã¢â‚¬â€ Cada if/else, caso de switch, ternÃƒÂ¡rio

### Regras para GeraÃƒÂ§ÃƒÂ£o de Testes

- Coloque testes adjacentes ao cÃƒÂ³digo-fonte: `foo.ts` Ã¢â€ â€™ `foo.test.ts` (ou convenÃƒÂ§ÃƒÂ£o do projeto)
- Use padrÃƒÂµes de teste existentes do projeto (estilo de import, biblioteca de asserÃƒÂ§ÃƒÂ£o, abordagem de mocking)
- FaÃƒÂ§a mock de dependÃƒÂªncias externas (banco, APIs, sistema de arquivos)
- Cada teste deve ser independente Ã¢â‚¬â€ sem estado mutÃƒÂ¡vel compartilhado entre testes
- Nomeie testes de forma descritiva: `test_create_user_with_duplicate_email_returns_409`

## Passo 4: Verificar

1. Rode a suÃƒÂ­te completa de testes Ã¢â‚¬â€ todos os testes devem passar
2. Rode cobertura novamente Ã¢â‚¬â€ confirme a melhoria
3. Se ainda estiver abaixo de 80%, repita o Passo 3 para as lacunas restantes

## Passo 5: Reportar

Mostre comparaÃƒÂ§ÃƒÂ£o antes/depois:

```
Coverage Report
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
File                   Before  After
src/services/auth.ts   45%     88%
src/utils/validation.ts 32%    82%
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
Overall:               67%     84%  PASS:
```

## ÃƒÂreas de Foco

- FunÃƒÂ§ÃƒÂµes com branching complexo (alta complexidade ciclomÃƒÂ¡tica)
- Error handlers e blocos catch
- FunÃƒÂ§ÃƒÂµes utilitÃƒÂ¡rias usadas em todo o codebase
- Handlers de endpoint de API (fluxo request Ã¢â€ â€™ response)
- Casos de borda: null, undefined, string vazia, array vazio, zero, nÃƒÂºmeros negativos
