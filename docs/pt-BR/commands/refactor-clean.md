# Refactor Clean

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


Identifique e remova cÃƒÂ³digo morto com seguranÃƒÂ§a, com verificaÃƒÂ§ÃƒÂ£o de testes em cada passo.

## Passo 1: Detectar CÃƒÂ³digo Morto

Rode ferramentas de anÃƒÂ¡lise com base no tipo do projeto:

| Tool | What It Finds | Command |
|------|--------------|---------|
| knip | Unused exports, files, dependencies | `npx knip` |
| depcheck | Unused npm dependencies | `npx depcheck` |
| ts-prune | Unused TypeScript exports | `npx ts-prune` |
| vulture | Unused Python code | `vulture src/` |
| deadcode | Unused Go code | `deadcode ./...` |
| cargo-udeps | Unused Rust dependencies | `cargo +nightly udeps` |

Se nenhuma ferramenta estiver disponÃƒÂ­vel, use Grep para encontrar exports com zero imports:
```
# Find exports, then check if they're imported anywhere
```

## Passo 2: Categorizar Achados

Classifique os achados em nÃƒÂ­veis de seguranÃƒÂ§a:

| Tier | Examples | Action |
|------|----------|--------|
| **SAFE** | Unused utilities, test helpers, internal functions | Delete with confidence |
| **CAUTION** | Components, API routes, middleware | Verify no dynamic imports or external consumers |
| **DANGER** | Config files, entry points, type definitions | Investigate before touching |

## Passo 3: Loop de RemoÃƒÂ§ÃƒÂ£o Segura

Para cada item SAFE:

1. **Rode a suÃƒÂ­te completa de testes** Ã¢â‚¬â€ EstabeleÃƒÂ§a baseline (tudo verde)
2. **Delete o cÃƒÂ³digo morto** Ã¢â‚¬â€ Use a ferramenta Edit para remoÃƒÂ§ÃƒÂ£o cirÃƒÂºrgica
3. **Rode a suÃƒÂ­te de testes novamente** Ã¢â‚¬â€ Verifique se nada quebrou
4. **Se testes falharem** Ã¢â‚¬â€ Reverta imediatamente com `git checkout -- <file>` e pule este item
5. **Se testes passarem** Ã¢â‚¬â€ VÃƒÂ¡ para o prÃƒÂ³ximo item

## Passo 4: Tratar Itens CAUTION

Antes de deletar itens CAUTION:
- Procure imports dinÃƒÂ¢micos: `import()`, `require()`, `__import__`
- Procure referÃƒÂªncias em string: nomes de rota, nomes de componente em configs
- Verifique se ÃƒÂ© exportado por API pÃƒÂºblica de pacote
- Verifique ausÃƒÂªncia de consumidores externos (dependents, se publicado)

## Passo 5: Consolidar Duplicatas

Depois de remover cÃƒÂ³digo morto, procure:
- FunÃƒÂ§ÃƒÂµes quase duplicadas (>80% similares) Ã¢â‚¬â€ mesclar em uma
- DefiniÃƒÂ§ÃƒÂµes de tipo redundantes Ã¢â‚¬â€ consolidar
- FunÃƒÂ§ÃƒÂµes wrapper sem valor Ã¢â‚¬â€ inline
- Re-exports sem propÃƒÂ³sito Ã¢â‚¬â€ remover indireÃƒÂ§ÃƒÂ£o

## Passo 6: Resumo

Reporte resultados:

```
Dead Code Cleanup
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
Deleted:   12 unused functions
           3 unused files
           5 unused dependencies
Skipped:   2 items (tests failed)
Saved:     ~450 lines removed
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
All tests passing PASS:
```

## Regras

- **Nunca delete sem rodar testes antes**
- **Uma remoÃƒÂ§ÃƒÂ£o por vez** Ã¢â‚¬â€ MudanÃƒÂ§as atÃƒÂ´micas facilitam rollback
- **Se houver dÃƒÂºvida, pule** Ã¢â‚¬â€ Melhor manter cÃƒÂ³digo morto do que quebrar produÃƒÂ§ÃƒÂ£o
- **NÃƒÂ£o refatore durante limpeza** Ã¢â‚¬â€ Separe responsabilidades (limpar primeiro, refatorar depois)
