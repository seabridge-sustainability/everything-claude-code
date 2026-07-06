# Atualizar DocumentaÃƒÂ§ÃƒÂ£o

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


Sincronize a documentaÃƒÂ§ÃƒÂ£o com o codebase, gerando a partir de arquivos fonte da verdade.

## Passo 1: Identificar Fontes da Verdade

| Source | Generates |
|--------|-----------|
| `package.json` scripts | Available commands reference |
| `.env.example` | Environment variable documentation |
| `openapi.yaml` / route files | API endpoint reference |
| Source code exports | Public API documentation |
| `Dockerfile` / `docker-compose.yml` | Infrastructure setup docs |

## Passo 2: Gerar ReferÃƒÂªncia de Scripts

1. Leia `package.json` (ou `Makefile`, `Cargo.toml`, `pyproject.toml`)
2. Extraia todos os scripts/comandos com suas descriÃƒÂ§ÃƒÂµes
3. Gere uma tabela de referÃƒÂªncia:

```markdown
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Production build with type checking |
| `npm test` | Run test suite with coverage |
```

## Passo 3: Gerar DocumentaÃƒÂ§ÃƒÂ£o de Ambiente

1. Leia `.env.example` (ou `.env.template`, `.env.sample`)
2. Extraia todas as variÃƒÂ¡veis e seus propÃƒÂ³sitos
3. Categorize como required vs optional
4. Documente formato esperado e valores vÃƒÂ¡lidos

```markdown
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |
| `LOG_LEVEL` | No | Logging verbosity (default: info) | `debug`, `info`, `warn`, `error` |
```

## Passo 4: Atualizar Guia de ContribuiÃƒÂ§ÃƒÂ£o

Gere ou atualize `docs/CONTRIBUTING.md` com:
- Setup do ambiente de desenvolvimento (prÃƒÂ©-requisitos, passos de instalaÃƒÂ§ÃƒÂ£o)
- Scripts disponÃƒÂ­veis e seus propÃƒÂ³sitos
- Procedimentos de teste (como rodar, como escrever novos testes)
- Enforcement de estilo de cÃƒÂ³digo (linter, formatter, hooks pre-commit)
- Checklist de submissÃƒÂ£o de PR

## Passo 5: Atualizar Runbook

Gere ou atualize `docs/RUNBOOK.md` com:
- Procedimentos de deploy (passo a passo)
- Endpoints de health check e monitoramento
- Problemas comuns e suas correÃƒÂ§ÃƒÂµes
- Procedimentos de rollback
- Caminhos de alerta e escalonamento

## Passo 6: Checagem de ObsolescÃƒÂªncia

1. Encontre arquivos de documentaÃƒÂ§ÃƒÂ£o sem modificaÃƒÂ§ÃƒÂ£o hÃƒÂ¡ 90+ dias
2. Cruze com mudanÃƒÂ§as recentes no cÃƒÂ³digo-fonte
3. Sinalize docs potencialmente desatualizadas para revisÃƒÂ£o manual

## Passo 7: Mostrar Resumo

```
Documentation Update
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
Updated:  docs/CONTRIBUTING.md (scripts table)
Updated:  docs/ENV.md (3 new variables)
Flagged:  docs/DEPLOY.md (142 days stale)
Skipped:  docs/API.md (no changes detected)
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
```

## Regras

- **Fonte ÃƒÂºnica da verdade**: Sempre gere a partir do cÃƒÂ³digo, nunca edite manualmente seÃƒÂ§ÃƒÂµes geradas
- **Preserve seÃƒÂ§ÃƒÂµes manuais**: Atualize apenas seÃƒÂ§ÃƒÂµes geradas; mantenha prosa escrita manualmente intacta
- **Marque conteÃƒÂºdo gerado**: Use marcadores `<!-- AUTO-GENERATED -->` ao redor das seÃƒÂ§ÃƒÂµes geradas
- **NÃƒÂ£o crie docs sem solicitaÃƒÂ§ÃƒÂ£o**: SÃƒÂ³ crie novos arquivos de docs se o comando solicitar explicitamente
