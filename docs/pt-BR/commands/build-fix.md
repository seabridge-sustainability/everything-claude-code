# Build e CorreÃƒÂ§ÃƒÂ£o

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


Corrija erros de build e de tipos incrementalmente com mudanÃƒÂ§as mÃƒÂ­nimas e seguras.

## Passo 1: Detectar Sistema de Build

Identifique a ferramenta de build do projeto e execute o build:

| Indicator | Build Command |
|-----------|---------------|
| `package.json` with `build` script | `npm run build` or `pnpm build` |
| `tsconfig.json` (TypeScript only) | `npx tsc --noEmit` |
| `Cargo.toml` | `cargo build 2>&1` |
| `pom.xml` | `mvn compile` |
| `build.gradle` | `./gradlew compileJava` |
| `go.mod` | `go build ./...` |
| `pyproject.toml` | `python -m py_compile` or `mypy .` |

## Passo 2: Parsear e Agrupar Erros

1. Execute o comando de build e capture o stderr
2. Agrupe erros por caminho de arquivo
3. Ordene por ordem de dependÃƒÂªncia (corrija imports/tipos antes de erros de lÃƒÂ³gica)
4. Conte o total de erros para acompanhamento de progresso

## Passo 3: Loop de CorreÃƒÂ§ÃƒÂ£o (Um Erro por Vez)

Para cada erro:

1. **Leia o arquivo** Ã¢â‚¬â€ Use a ferramenta Read para ver o contexto do erro (10 linhas ao redor do erro)
2. **Diagnostique** Ã¢â‚¬â€ Identifique a causa raiz (import ausente, tipo errado, erro de sintaxe)
3. **Corrija minimamente** Ã¢â‚¬â€ Use a ferramenta Edit para a menor mudanÃƒÂ§a que resolve o erro
4. **Rode o build novamente** Ã¢â‚¬â€ Verifique que o erro sumiu e que nenhum novo erro foi introduzido
5. **VÃƒÂ¡ para o prÃƒÂ³ximo** Ã¢â‚¬â€ Continue com os erros restantes

## Passo 4: Guardrails

Pare e pergunte ao usuÃƒÂ¡rio se:
- Uma correÃƒÂ§ÃƒÂ£o introduz **mais erros do que resolve**
- O **mesmo erro persiste apÃƒÂ³s 3 tentativas** (provavelmente hÃƒÂ¡ um problema mais profundo)
- A correÃƒÂ§ÃƒÂ£o exige **mudanÃƒÂ§as arquiteturais** (nÃƒÂ£o apenas correÃƒÂ§ÃƒÂ£o de build)
- Os erros de build vÃƒÂªm de **dependÃƒÂªncias ausentes** (precisa de `npm install`, `cargo add`, etc.)

## Passo 5: Resumo

Mostre resultados:
- Erros corrigidos (com caminhos de arquivos)
- Erros restantes (se houver)
- Novos erros introduzidos (deve ser zero)
- PrÃƒÂ³ximos passos sugeridos para problemas nÃƒÂ£o resolvidos

## EstratÃƒÂ©gias de RecuperaÃƒÂ§ÃƒÂ£o

| Situation | Action |
|-----------|--------|
| Missing module/import | Check if package is installed; suggest install command |
| Type mismatch | Read both type definitions; fix the narrower type |
| Circular dependency | Identify cycle with import graph; suggest extraction |
| Version conflict | Check `package.json` / `Cargo.toml` for version constraints |
| Build tool misconfiguration | Read config file; compare with working defaults |

Corrija um erro por vez por seguranÃƒÂ§a. Prefira diffs mÃƒÂ­nimos em vez de refatoraÃƒÂ§ÃƒÂ£o.
