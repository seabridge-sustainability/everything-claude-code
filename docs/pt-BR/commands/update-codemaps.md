# Atualizar Codemaps

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


Analise a estrutura do codebase e gere documentaÃƒÂ§ÃƒÂ£o arquitetural enxuta em tokens.

## Passo 1: Escanear Estrutura do Projeto

1. Identifique o tipo de projeto (monorepo, app ÃƒÂºnica, library, microservice)
2. Encontre todos os diretÃƒÂ³rios de cÃƒÂ³digo-fonte (src/, lib/, app/, packages/)
3. Mapeie entry points (main.ts, index.ts, app.py, main.go, etc.)

## Passo 2: Gerar Codemaps

Crie ou atualize codemaps em `docs/CODEMAPS/` (ou `.reports/codemaps/`):

| File | Contents |
|------|----------|
| `architecture.md` | High-level system diagram, service boundaries, data flow |
| `backend.md` | API routes, middleware chain, service Ã¢â€ â€™ repository mapping |
| `frontend.md` | Page tree, component hierarchy, state management flow |
| `data.md` | Database tables, relationships, migration history |
| `dependencies.md` | External services, third-party integrations, shared libraries |

### Formato de Codemap

Cada codemap deve ser enxuto em tokens Ã¢â‚¬â€ otimizado para consumo de contexto por IA:

```markdown
# Backend Architecture

## Routes
POST /api/users Ã¢â€ â€™ UserController.create Ã¢â€ â€™ UserService.create Ã¢â€ â€™ UserRepo.insert
GET  /api/users/:id Ã¢â€ â€™ UserController.get Ã¢â€ â€™ UserService.findById Ã¢â€ â€™ UserRepo.findById

## Key Files
src/services/user.ts (business logic, 120 lines)
src/repos/user.ts (database access, 80 lines)

## Dependencies
- PostgreSQL (primary data store)
- Redis (session cache, rate limiting)
- Stripe (payment processing)
```

## Passo 3: DetecÃƒÂ§ÃƒÂ£o de Diff

1. Se codemaps anteriores existirem, calcule a porcentagem de diff
2. Se mudanÃƒÂ§as > 30%, mostre o diff e solicite aprovaÃƒÂ§ÃƒÂ£o do usuÃƒÂ¡rio antes de sobrescrever
3. Se mudanÃƒÂ§as <= 30%, atualize in-place

## Passo 4: Adicionar Metadados

Adicione um cabeÃƒÂ§alho de freshness em cada codemap:

```markdown
<!-- Generated: 2026-02-11 | Files scanned: 142 | Token estimate: ~800 -->
```

## Passo 5: Salvar RelatÃƒÂ³rio de AnÃƒÂ¡lise

Escreva um resumo em `.reports/codemap-diff.txt`:
- Arquivos adicionados/removidos/modificados desde o ÃƒÂºltimo scan
- Novas dependÃƒÂªncias detectadas
- MudanÃƒÂ§as de arquitetura (novas rotas, novos serviÃƒÂ§os etc.)
- Alertas de obsolescÃƒÂªncia para docs sem atualizaÃƒÂ§ÃƒÂ£o em 90+ dias

## Dicas

- Foque em **estrutura de alto nÃƒÂ­vel**, nÃƒÂ£o em detalhes de implementaÃƒÂ§ÃƒÂ£o
- Prefira **caminhos de arquivo e assinaturas de funÃƒÂ§ÃƒÂ£o** em vez de blocos de cÃƒÂ³digo completos
- Mantenha cada codemap abaixo de **1000 tokens** para carregamento eficiente de contexto
- Use diagramas ASCII para fluxo de dados em vez de descriÃƒÂ§ÃƒÂµes verbosas
- Rode apÃƒÂ³s grandes adiÃƒÂ§ÃƒÂµes de feature ou sessÃƒÂµes de refatoraÃƒÂ§ÃƒÂ£o
