# Fluxo de Trabalho Git

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Formato de Mensagem de Commit
```
<tipo>: <descriÃƒÂ§ÃƒÂ£o>

<corpo opcional>
```

Tipos: feat, fix, refactor, docs, test, chore, perf, ci

Nota: AtribuiÃƒÂ§ÃƒÂ£o desabilitada globalmente via ~/.claude/settings.json.

## Fluxo de Trabalho de Pull Request

Ao criar PRs:
1. Analisar o histÃƒÂ³rico completo de commits (nÃƒÂ£o apenas o ÃƒÂºltimo commit)
2. Usar `git diff [branch-base]...HEAD` para ver todas as alteraÃƒÂ§ÃƒÂµes
3. Rascunhar resumo abrangente do PR
4. Incluir plano de teste com TODOs
5. Fazer push com a flag `-u` se for uma nova branch

> Para o processo de desenvolvimento completo (planejamento, TDD, revisÃƒÂ£o de cÃƒÂ³digo) antes de operaÃƒÂ§ÃƒÂµes git,
> veja [development-workflow.md](./development-workflow.md).
