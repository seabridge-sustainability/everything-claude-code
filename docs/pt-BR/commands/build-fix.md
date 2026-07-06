# Build e CorreÃƒÂ§ÃƒÂ£o

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
