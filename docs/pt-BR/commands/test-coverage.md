# Cobertura de Testes

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
