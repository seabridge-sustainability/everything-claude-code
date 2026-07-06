# Refactor Clean

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
