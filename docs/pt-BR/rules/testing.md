# Requisitos de Teste

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


## Cobertura MÃƒÂ­nima de Teste: 80%

Tipos de Teste (TODOS obrigatÃƒÂ³rios):
1. **Testes UnitÃƒÂ¡rios** - FunÃƒÂ§ÃƒÂµes individuais, utilitÃƒÂ¡rios, componentes
2. **Testes de IntegraÃƒÂ§ÃƒÂ£o** - Endpoints de API, operaÃƒÂ§ÃƒÂµes de banco de dados
3. **Testes E2E** - Fluxos crÃƒÂ­ticos do usuÃƒÂ¡rio (framework escolhido por linguagem)

## Desenvolvimento Orientado a Testes (TDD)

Fluxo de trabalho OBRIGATÃƒâ€œRIO:
1. Escreva o teste primeiro (VERMELHO)
2. Execute o teste - deve FALHAR
3. Escreva a implementaÃƒÂ§ÃƒÂ£o mÃƒÂ­nima (VERDE)
4. Execute o teste - deve PASSAR
5. Refatore (MELHORE)
6. Verifique cobertura (80%+)

## ResoluÃƒÂ§ÃƒÂ£o de Falhas de Teste

1. Use o agente **tdd-guide**
2. Verifique o isolamento de teste
3. Verifique se os mocks estÃƒÂ£o corretos
4. Corrija a implementaÃƒÂ§ÃƒÂ£o, nÃƒÂ£o os testes (a menos que os testes estejam errados)

## Suporte de Agentes

- **tdd-guide** - Use PROATIVAMENTE para novos recursos, aplica escrever-testes-primeiro
