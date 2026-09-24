# Sistema de Hooks

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


## Tipos de Hook

- **PreToolUse**: Antes da execuÃƒÂ§ÃƒÂ£o da ferramenta (validaÃƒÂ§ÃƒÂ£o, modificaÃƒÂ§ÃƒÂ£o de parÃƒÂ¢metros)
- **PostToolUse**: ApÃƒÂ³s a execuÃƒÂ§ÃƒÂ£o da ferramenta (auto-formataÃƒÂ§ÃƒÂ£o, verificaÃƒÂ§ÃƒÂµes)
- **Stop**: Quando a sessÃƒÂ£o termina (verificaÃƒÂ§ÃƒÂ£o final)

## PermissÃƒÂµes de Auto-Aceite

Use com cautela:
- Habilite para planos confiÃƒÂ¡veis e bem definidos
- Desabilite para trabalho exploratÃƒÂ³rio
- Nunca use a flag dangerously-skip-permissions
- Configure `allowedTools` em `~/.claude.json` em vez disso

## Melhores PrÃƒÂ¡ticas para TodoWrite

Use a ferramenta TodoWrite para:
- Rastrear progresso em tarefas com mÃƒÂºltiplos passos
- Verificar compreensÃƒÂ£o das instruÃƒÂ§ÃƒÂµes
- Habilitar direcionamento em tempo real
- Mostrar etapas de implementaÃƒÂ§ÃƒÂ£o granulares

A lista de tarefas revela:
- Etapas fora de ordem
- Itens faltando
- Itens extras desnecessÃƒÂ¡rios
- Granularidade incorreta
- Requisitos mal interpretados
