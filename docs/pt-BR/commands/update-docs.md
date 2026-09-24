# Atualizar DocumentaÃƒÂ§ÃƒÂ£o

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
