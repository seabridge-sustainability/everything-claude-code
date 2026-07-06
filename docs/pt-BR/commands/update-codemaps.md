# Atualizar Codemaps

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
