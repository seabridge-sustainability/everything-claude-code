# Exemplo de CLAUDE.md no NÃƒÂ­vel de UsuÃƒÂ¡rio

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


Este ÃƒÂ© um exemplo de arquivo CLAUDE.md no nÃƒÂ­vel de usuÃƒÂ¡rio. Coloque em `~/.claude/CLAUDE.md`.

ConfiguraÃƒÂ§ÃƒÂµes de nÃƒÂ­vel de usuÃƒÂ¡rio se aplicam globalmente em todos os projetos. Use para:
- PreferÃƒÂªncias pessoais de cÃƒÂ³digo
- Regras universais que vocÃƒÂª sempre quer aplicar
- Links para suas regras modulares

---

## Filosofia Central

VocÃƒÂª ÃƒÂ© Claude Code. Eu uso agentes e skills especializados para tarefas complexas.

**PrincÃƒÂ­pios-Chave:**
1. **Agent-First**: Delegue trabalho complexo para agentes especializados
2. **ExecuÃƒÂ§ÃƒÂ£o Paralela**: Use ferramenta Task com mÃƒÂºltiplos agentes quando possÃƒÂ­vel
3. **Planejar Antes de Executar**: Use Plan Mode para operaÃƒÂ§ÃƒÂµes complexas
4. **Test-Driven**: Escreva testes antes da implementaÃƒÂ§ÃƒÂ£o
5. **Security-First**: Nunca comprometa seguranÃƒÂ§a

---

## Regras Modulares

Diretrizes detalhadas em `~/.claude/rules/`:

| Rule File | Contents |
|-----------|----------|
| security.md | Security checks, secret management |
| coding-style.md | Immutability, file organization, error handling |
| testing.md | TDD workflow, 80% coverage requirement |
| git-workflow.md | Commit format, PR workflow |
| agents.md | Agent orchestration, when to use which agent |
| patterns.md | API response, repository patterns |
| performance.md | Model selection, context management |
| hooks.md | Hooks System |

---

## Agentes DisponÃƒÂ­veis

Localizados em `~/.claude/agents/`:

| Agent | Purpose |
|-------|---------|
| planner | Feature implementation planning |
| architect | System design and architecture |
| tdd-guide | Test-driven development |
| code-reviewer | Code review for quality/security |
| security-reviewer | Security vulnerability analysis |
| build-error-resolver | Build error resolution |
| e2e-runner | Playwright E2E testing |
| refactor-cleaner | Dead code cleanup |
| doc-updater | Documentation updates |

---

## PreferÃƒÂªncias Pessoais

### Privacidade
- Sempre anonimizar logs; nunca colar segredos (API keys/tokens/passwords/JWTs)
- Revise a saÃƒÂ­da antes de compartilhar - remova qualquer dado sensÃƒÂ­vel

### Estilo de CÃƒÂ³digo
- Sem emojis em cÃƒÂ³digo, comentÃƒÂ¡rios ou documentaÃƒÂ§ÃƒÂ£o
- Prefira imutabilidade - nunca mutar objetos ou arrays
- Muitos arquivos pequenos em vez de poucos arquivos grandes
- 200-400 linhas tÃƒÂ­pico, 800 mÃƒÂ¡ximo por arquivo

### Git
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- Sempre testar localmente antes de commitar
- Commits pequenos e focados

### Testes
- TDD: escreva testes primeiro
- Cobertura mÃƒÂ­nima de 80%
- Unit + integration + E2E para fluxos crÃƒÂ­ticos

### Captura de Conhecimento
- Notas pessoais de debug, preferÃƒÂªncias e contexto temporÃƒÂ¡rio Ã¢â€ â€™ auto memory
- Conhecimento de time/projeto (decisÃƒÂµes de arquitetura, mudanÃƒÂ§as de API, runbooks de implementaÃƒÂ§ÃƒÂ£o) Ã¢â€ â€™ seguir estrutura de docs jÃƒÂ¡ existente no projeto
- Se a tarefa atual jÃƒÂ¡ produzir docs/comentÃƒÂ¡rios/exemplos relevantes, nÃƒÂ£o duplique o mesmo conhecimento em outro lugar
- Se nÃƒÂ£o houver local ÃƒÂ³bvio de docs no projeto, pergunte antes de criar um novo doc de topo

---

## IntegraÃƒÂ§ÃƒÂ£o com Editor

Eu uso Zed como editor principal:
- Agent Panel para rastreamento de arquivos
- CMD+Shift+R para command palette
- Vim mode habilitado

---

## MÃƒÂ©tricas de Sucesso

VocÃƒÂª tem sucesso quando:
- Todos os testes passam (80%+ de cobertura)
- NÃƒÂ£o hÃƒÂ¡ vulnerabilidades de seguranÃƒÂ§a
- O cÃƒÂ³digo ÃƒÂ© legÃƒÂ­vel e manutenÃƒÂ­vel
- Os requisitos do usuÃƒÂ¡rio sÃƒÂ£o atendidos

---

**Filosofia**: Design agent-first, execuÃƒÂ§ÃƒÂ£o paralela, planejar antes de agir, testar antes de codar, seguranÃƒÂ§a sempre.
