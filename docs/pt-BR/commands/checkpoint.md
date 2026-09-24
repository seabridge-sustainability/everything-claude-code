# Comando Checkpoint

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


Crie ou verifique um checkpoint no seu fluxo.

## Uso

`/checkpoint [create|verify|list] [name]`

## Criar Checkpoint

Ao criar um checkpoint:

1. Rode `/verify quick` para garantir que o estado atual estÃƒÂ¡ limpo
2. Crie um git stash ou commit com o nome do checkpoint
3. Registre o checkpoint em `.claude/checkpoints.log`:

```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD)" >> .claude/checkpoints.log
```

4. Informe que o checkpoint foi criado

## Verificar Checkpoint

Ao verificar contra um checkpoint:

1. Leia o checkpoint no log
2. Compare o estado atual com o checkpoint:
   - Arquivos adicionados desde o checkpoint
   - Arquivos modificados desde o checkpoint
   - Taxa de testes passando agora vs antes
   - Cobertura agora vs antes

3. Reporte:
```
CHECKPOINT COMPARISON: $NAME
============================
Files changed: X
Tests: +Y passed / -Z failed
Coverage: +X% / -Y%
Build: [PASS/FAIL]
```

## Listar Checkpoints

Mostre todos os checkpoints com:
- Nome
- Timestamp
- Git SHA
- Status (current, behind, ahead)

## Fluxo

Fluxo tÃƒÂ­pico de checkpoint:

```
[Start] --> /checkpoint create "feature-start"
   |
[Implement] --> /checkpoint create "core-done"
   |
[Test] --> /checkpoint verify "core-done"
   |
[Refactor] --> /checkpoint create "refactor-done"
   |
[PR] --> /checkpoint verify "feature-start"
```

## Argumentos

$ARGUMENTS:
- `create <name>` - Criar checkpoint nomeado
- `verify <name>` - Verificar contra checkpoint nomeado
- `list` - Mostrar todos os checkpoints
- `clear` - Remover checkpoints antigos (mantÃƒÂ©m os ÃƒÂºltimos 5)
