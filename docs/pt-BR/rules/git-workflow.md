# Fluxo de Trabalho Git

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

## Formato de Mensagem de Commit
```
<tipo>: <descrição>

<corpo opcional>
```

Tipos: feat, fix, refactor, docs, test, chore, perf, ci

Nota: As instalações gerenciadas pelo ECC definem `"includeCoAuthoredBy": false` em `~/.claude/settings.json`, portanto os commits não incluem `Co-Authored-By` por padrão. Para manter a atribuição do Claude, defina `"includeCoAuthoredBy": true` ou configure `attribution`; o ECC nunca sobrescreve uma escolha explícita.

## Fluxo de Trabalho de Pull Request

Ao criar PRs:
1. Analisar o histórico completo de commits (não apenas o último commit)
2. Usar `git diff [branch-base]...HEAD` para ver todas as alterações
3. Rascunhar resumo abrangente do PR
4. Incluir plano de teste com TODOs
5. Fazer push com a flag `-u` se for uma nova branch

> Para o processo de desenvolvimento completo (planejamento, TDD, revisão de código) antes de operações git,
> veja [development-workflow.md](./development-workflow.md).
