# PadrÃƒÂµes Comuns

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


## Projetos Skeleton

Ao implementar novas funcionalidades:
1. Buscar projetos skeleton bem testados
2. Usar agentes paralelos para avaliar opÃƒÂ§ÃƒÂµes:
   - AvaliaÃƒÂ§ÃƒÂ£o de seguranÃƒÂ§a
   - AnÃƒÂ¡lise de extensibilidade
   - PontuaÃƒÂ§ÃƒÂ£o de relevÃƒÂ¢ncia
   - Planejamento de implementaÃƒÂ§ÃƒÂ£o
3. Clonar a melhor opÃƒÂ§ÃƒÂ£o como fundaÃƒÂ§ÃƒÂ£o
4. Iterar dentro da estrutura comprovada

## PadrÃƒÂµes de Design

### PadrÃƒÂ£o Repository

Encapsular acesso a dados atrÃƒÂ¡s de uma interface consistente:
- Definir operaÃƒÂ§ÃƒÂµes padrÃƒÂ£o: findAll, findById, create, update, delete
- ImplementaÃƒÂ§ÃƒÂµes concretas lidam com detalhes de armazenamento (banco de dados, API, arquivo, etc.)
- A lÃƒÂ³gica de negÃƒÂ³cios depende da interface abstrata, nÃƒÂ£o do mecanismo de armazenamento
- Habilita troca fÃƒÂ¡cil de fontes de dados e simplifica testes com mocks

### Formato de Resposta da API

Use um envelope consistente para todas as respostas de API:
- Incluir indicador de sucesso/status
- Incluir o payload de dados (nullable em caso de erro)
- Incluir campo de mensagem de erro (nullable em caso de sucesso)
- Incluir metadados para respostas paginadas (total, pÃƒÂ¡gina, limite)
