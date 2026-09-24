# Cobertura de Testes

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
