# OrquestraÃƒÂ§ÃƒÂ£o de Agentes

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


## Agentes DisponÃƒÂ­veis

Localizados em `~/.claude/agents/`:

| Agente | PropÃƒÂ³sito | Quando Usar |
|--------|-----------|-------------|
| planner | Planejamento de implementaÃƒÂ§ÃƒÂ£o | Recursos complexos, refatoraÃƒÂ§ÃƒÂ£o |
| architect | Design de sistema | DecisÃƒÂµes arquiteturais |
| tdd-guide | Desenvolvimento orientado a testes | Novos recursos, correÃƒÂ§ÃƒÂ£o de bugs |
| code-reviewer | RevisÃƒÂ£o de cÃƒÂ³digo | ApÃƒÂ³s escrever cÃƒÂ³digo |
| security-reviewer | AnÃƒÂ¡lise de seguranÃƒÂ§a | Antes de commits |
| build-error-resolver | Corrigir erros de build | Quando o build falha |
| e2e-runner | Testes E2E | Fluxos crÃƒÂ­ticos do usuÃƒÂ¡rio |
| refactor-cleaner | Limpeza de cÃƒÂ³digo morto | ManutenÃƒÂ§ÃƒÂ£o de cÃƒÂ³digo |
| doc-updater | DocumentaÃƒÂ§ÃƒÂ£o | AtualizaÃƒÂ§ÃƒÂ£o de docs |
| rust-reviewer | RevisÃƒÂ£o de cÃƒÂ³digo Rust | Projetos Rust |

## Uso Imediato de Agentes

Sem necessidade de prompt do usuÃƒÂ¡rio:
1. SolicitaÃƒÂ§ÃƒÂµes de recursos complexos - Use o agente **planner**
2. CÃƒÂ³digo acabado de escrever/modificar - Use o agente **code-reviewer**
3. CorreÃƒÂ§ÃƒÂ£o de bug ou novo recurso - Use o agente **tdd-guide**
4. DecisÃƒÂ£o arquitetural - Use o agente **architect**

## ExecuÃƒÂ§ÃƒÂ£o Paralela de Tarefas

SEMPRE use execuÃƒÂ§ÃƒÂ£o paralela de Task para operaÃƒÂ§ÃƒÂµes independentes:

```markdown
# BOM: ExecuÃƒÂ§ÃƒÂ£o paralela
Iniciar 3 agentes em paralelo:
1. Agente 1: AnÃƒÂ¡lise de seguranÃƒÂ§a do mÃƒÂ³dulo de autenticaÃƒÂ§ÃƒÂ£o
2. Agente 2: RevisÃƒÂ£o de desempenho do sistema de cache
3. Agente 3: VerificaÃƒÂ§ÃƒÂ£o de tipos dos utilitÃƒÂ¡rios

# RUIM: Sequencial quando desnecessÃƒÂ¡rio
Primeiro agente 1, depois agente 2, depois agente 3
```

## AnÃƒÂ¡lise Multi-Perspectiva

Para problemas complexos, use subagentes com papÃƒÂ©is divididos:
- Revisor factual
- Engenheiro sÃƒÂªnior
- Especialista em seguranÃƒÂ§a
- Revisor de consistÃƒÂªncia
- Verificador de redundÃƒÂ¢ncia
