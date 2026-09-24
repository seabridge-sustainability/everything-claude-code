# Estilo de CÃƒÂ³digo

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


## Imutabilidade (CRÃƒÂTICO)

SEMPRE crie novos objetos, NUNCA modifique os existentes:

```
// PseudocÃƒÂ³digo
ERRADO:  modificar(original, campo, valor) Ã¢â€ â€™ altera o original in-place
CORRETO: atualizar(original, campo, valor) Ã¢â€ â€™ retorna nova cÃƒÂ³pia com a alteraÃƒÂ§ÃƒÂ£o
```

Justificativa: Dados imutÃƒÂ¡veis previnem efeitos colaterais ocultos, facilita a depuraÃƒÂ§ÃƒÂ£o e permite concorrÃƒÂªncia segura.

## OrganizaÃƒÂ§ÃƒÂ£o de Arquivos

MUITOS ARQUIVOS PEQUENOS > POUCOS ARQUIVOS GRANDES:
- Alta coesÃƒÂ£o, baixo acoplamento
- 200-400 linhas tÃƒÂ­pico, 800 mÃƒÂ¡ximo
- Extrair utilitÃƒÂ¡rios de mÃƒÂ³dulos grandes
- Organizar por recurso/domÃƒÂ­nio, nÃƒÂ£o por tipo

## Tratamento de Erros

SEMPRE trate erros de forma abrangente:
- Trate erros explicitamente em cada nÃƒÂ­vel
- ForneÃƒÂ§a mensagens de erro amigÃƒÂ¡veis no cÃƒÂ³digo voltado para UI
- Registre contexto detalhado de erro no lado do servidor
- Nunca engula erros silenciosamente

## ValidaÃƒÂ§ÃƒÂ£o de Entrada

SEMPRE valide nas fronteiras do sistema:
- Valide toda entrada do usuÃƒÂ¡rio antes de processar
- Use validaÃƒÂ§ÃƒÂ£o baseada em schema onde disponÃƒÂ­vel
- Falhe rapidamente com mensagens de erro claras
- Nunca confie em dados externos (respostas de API, entrada do usuÃƒÂ¡rio, conteÃƒÂºdo de arquivo)

## Checklist de Qualidade de CÃƒÂ³digo

Antes de marcar o trabalho como concluÃƒÂ­do:
- [ ] O cÃƒÂ³digo ÃƒÂ© legÃƒÂ­vel e bem nomeado
- [ ] FunÃƒÂ§ÃƒÂµes sÃƒÂ£o pequenas (< 50 linhas)
- [ ] Arquivos sÃƒÂ£o focados (< 800 linhas)
- [ ] Sem aninhamento profundo (> 4 nÃƒÂ­veis)
- [ ] Tratamento adequado de erros
- [ ] Sem valores hardcoded (use constantes ou config)
- [ ] Sem mutaÃƒÂ§ÃƒÂ£o (padrÃƒÂµes imutÃƒÂ¡veis usados)
