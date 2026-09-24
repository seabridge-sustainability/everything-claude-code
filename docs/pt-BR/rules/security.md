# Diretrizes de SeguranÃƒÂ§a

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


## VerificaÃƒÂ§ÃƒÂµes de SeguranÃƒÂ§a ObrigatÃƒÂ³rias

Antes de QUALQUER commit:
- [ ] Sem segredos hardcoded (chaves de API, senhas, tokens)
- [ ] Todas as entradas do usuÃƒÂ¡rio validadas
- [ ] PrevenÃƒÂ§ÃƒÂ£o de injeÃƒÂ§ÃƒÂ£o SQL (queries parametrizadas)
- [ ] PrevenÃƒÂ§ÃƒÂ£o de XSS (HTML sanitizado)
- [ ] ProteÃƒÂ§ÃƒÂ£o CSRF habilitada
- [ ] AutenticaÃƒÂ§ÃƒÂ£o/autorizaÃƒÂ§ÃƒÂ£o verificada
- [ ] Rate limiting em todos os endpoints
- [ ] Mensagens de erro nÃƒÂ£o vazam dados sensÃƒÂ­veis

## Gerenciamento de Segredos

- NUNCA hardcode segredos no cÃƒÂ³digo-fonte
- SEMPRE use variÃƒÂ¡veis de ambiente ou um gerenciador de segredos
- Valide que os segredos necessÃƒÂ¡rios estÃƒÂ£o presentes na inicializaÃƒÂ§ÃƒÂ£o
- Rotacione quaisquer segredos que possam ter sido expostos

## Protocolo de Resposta a SeguranÃƒÂ§a

Se um problema de seguranÃƒÂ§a for encontrado:
1. PARE imediatamente
2. Use o agente **security-reviewer**
3. Corrija problemas CRÃƒÂTICOS antes de continuar
4. Rotacione quaisquer segredos expostos
5. Revise toda a base de cÃƒÂ³digo por problemas similares
