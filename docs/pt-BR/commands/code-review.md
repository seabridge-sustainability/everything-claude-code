# Code Review

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


RevisÃƒÂ£o completa de seguranÃƒÂ§a e qualidade das mudanÃƒÂ§as nÃƒÂ£o commitadas:

1. Obtenha arquivos alterados: git diff --name-only HEAD

2. Para cada arquivo alterado, verifique:

**Problemas de SeguranÃƒÂ§a (CRITICAL):**
- Credenciais, chaves de API ou tokens hardcoded
- Vulnerabilidades de SQL injection
- Vulnerabilidades de XSS
- Falta de validaÃƒÂ§ÃƒÂ£o de entrada
- DependÃƒÂªncias inseguras
- Riscos de path traversal

**Qualidade de CÃƒÂ³digo (HIGH):**
- FunÃƒÂ§ÃƒÂµes > 50 linhas
- Arquivos > 800 linhas
- Profundidade de aninhamento > 4 nÃƒÂ­veis
- Falta de tratamento de erro
- Statements de console.log
- ComentÃƒÂ¡rios TODO/FIXME
- Falta de JSDoc para APIs pÃƒÂºblicas

**Boas PrÃƒÂ¡ticas (MEDIUM):**
- PadrÃƒÂµes de mutaÃƒÂ§ÃƒÂ£o (usar imutÃƒÂ¡vel no lugar)
- Uso de emoji em cÃƒÂ³digo/comentÃƒÂ¡rios
- Falta de testes para cÃƒÂ³digo novo
- Problemas de acessibilidade (a11y)

3. Gere relatÃƒÂ³rio com:
   - Severidade: CRITICAL, HIGH, MEDIUM, LOW
   - LocalizaÃƒÂ§ÃƒÂ£o no arquivo e nÃƒÂºmeros de linha
   - DescriÃƒÂ§ÃƒÂ£o do problema
   - CorreÃƒÂ§ÃƒÂ£o sugerida

4. Bloqueie commit se houver problemas CRITICAL ou HIGH

Nunca aprove cÃƒÂ³digo com vulnerabilidades de seguranÃƒÂ§a!
