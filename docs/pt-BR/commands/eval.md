# Comando Eval

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

Gerencie o fluxo de desenvolvimento orientado por evals.

## Uso

`/eval [define|check|report|list] [feature-name]`

## Definir Evals

`/eval define feature-name`

Crie uma nova definição de eval:

1. Crie `.claude/evals/feature-name.md` com o template:

```markdown
## EVAL: feature-name
Created: $(date)

### Evals de Capacidade
- [ ] [Descrição da capacidade 1]
- [ ] [Descrição da capacidade 2]

### Evals de Regressão
- [ ] [Comportamento existente 1 ainda funciona]
- [ ] [Comportamento existente 2 ainda funciona]

### Critérios de Sucesso
- pass@3 > 90% para evals de capacidade
- pass^3 = 100% para evals de regressão
```

2. Peça ao usuário para preencher os critérios específicos

## Verificar Evals

`/eval check feature-name`

Rode evals para uma feature:

1. Leia a definição de eval em `.claude/evals/feature-name.md`
2. Para cada eval de capability:
   - Tente verificar o critério
   - Registre PASS/FAIL
   - Salve tentativa em `.claude/evals/feature-name.log`
3. Para cada eval de regressão:
   - Rode os testes relevantes
   - Compare com baseline
   - Registre PASS/FAIL
4. Reporte status atual:

```
EVAL CHECK: feature-name
========================
Capability: X/Y passing
Regression: X/Y passing
Status: IN PROGRESS / READY
```

## Relatório de Evals

`/eval report feature-name`

Gere relatório completo de eval:

```
EVAL REPORT: feature-name
=========================
Generated: $(date)

CAPABILITY EVALS
----------------
[eval-1]: PASS (pass@1)
[eval-2]: PASS (pass@2) - required retry
[eval-3]: FAIL - see notes

REGRESSION EVALS
----------------
[test-1]: PASS
[test-2]: PASS
[test-3]: PASS

METRICS
-------
Capability pass@1: 67%
Capability pass@3: 100%
Regression pass^3: 100%

NOTES
-----
[Any issues, edge cases, or observations]

RECOMMENDATION
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## Listar Evals

`/eval list`

Mostre todas as definições de eval:

```
EVAL DEFINITIONS
================
feature-auth      [3/5 passing] IN PROGRESS
feature-search    [5/5 passing] READY
feature-export    [0/4 passing] NOT STARTED
```

## Argumentos

$ARGUMENTS:
- `define <name>` - Criar nova definição de eval
- `check <name>` - Rodar e verificar evals
- `report <name>` - Gerar relatório completo
- `list` - Mostrar todos os evals
- `clean` - Remover logs antigos de eval (mantém as últimas 10 execuções)
