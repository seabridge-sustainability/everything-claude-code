# Comando Eval

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Gerencie o fluxo de desenvolvimento orientado por evals.

## Uso

`/eval [define|check|report|list] [feature-name]`

## Definir Evals

`/eval define feature-name`

Crie uma nova definiÃƒÂ§ÃƒÂ£o de eval:

1. Crie `.claude/evals/feature-name.md` com o template:

```markdown
## EVAL: feature-name
Created: $(date)

### Evals de Capacidade
- [ ] [DescriÃƒÂ§ÃƒÂ£o da capacidade 1]
- [ ] [DescriÃƒÂ§ÃƒÂ£o da capacidade 2]

### Evals de RegressÃƒÂ£o
- [ ] [Comportamento existente 1 ainda funciona]
- [ ] [Comportamento existente 2 ainda funciona]

### CritÃƒÂ©rios de Sucesso
- pass@3 > 90% para evals de capacidade
- pass^3 = 100% para evals de regressÃƒÂ£o

2. PeÃƒÂ§a ao usuÃƒÂ¡rio para preencher os critÃƒÂ©rios especÃƒÂ­ficos

## Verificar Evals

`/eval check feature-name`

Rode evals para uma feature:

1. Leia a definiÃƒÂ§ÃƒÂ£o de eval em `.claude/evals/feature-name.md`
2. Para cada eval de capability:
   - Tente verificar o critÃƒÂ©rio
   - Registre PASS/FAIL
   - Salve tentativa em `.claude/evals/feature-name.log`
3. Para cada eval de regressÃƒÂ£o:
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

## RelatÃƒÂ³rio de Evals

`/eval report feature-name`

Gere relatÃƒÂ³rio completo de eval:

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

Mostre todas as definiÃƒÂ§ÃƒÂµes de eval:

```
EVAL DEFINITIONS
================
feature-auth      [3/5 passing] IN PROGRESS
feature-search    [5/5 passing] READY
feature-export    [0/4 passing] NOT STARTED
```

## Argumentos

$ARGUMENTS:
- `define <name>` - Criar nova definiÃƒÂ§ÃƒÂ£o de eval
- `check <name>` - Rodar e verificar evals
- `report <name>` - Gerar relatÃƒÂ³rio completo
- `list` - Mostrar todos os evals
- `clean` - Remover logs antigos de eval (mantÃƒÂ©m as ÃƒÂºltimas 10 execuÃƒÂ§ÃƒÂµes)
