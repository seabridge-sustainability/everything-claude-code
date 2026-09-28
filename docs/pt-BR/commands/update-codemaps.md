# Atualizar Codemaps

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
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
