# Fluxo de Trabalho Git

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
