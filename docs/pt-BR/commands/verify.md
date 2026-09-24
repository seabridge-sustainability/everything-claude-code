# Comando Verification

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


Rode verificaÃƒÂ§ÃƒÂ£o abrangente no estado atual do codebase.

## InstruÃƒÂ§ÃƒÂµes

Execute a verificaÃƒÂ§ÃƒÂ£o nesta ordem exata:

1. **Build Check**
   - Rode o comando de build deste projeto
   - Se falhar, reporte erros e PARE

2. **Type Check**
   - Rode o TypeScript/type checker
   - Reporte todos os erros com file:line

3. **Lint Check**
   - Rode o linter
   - Reporte warnings e errors

4. **Test Suite**
   - Rode todos os testes
   - Reporte contagem de pass/fail
   - Reporte percentual de cobertura

5. **Console.log Audit**
   - Procure por console.log em arquivos de cÃƒÂ³digo-fonte
   - Reporte localizaÃƒÂ§ÃƒÂµes

6. **Git Status**
   - Mostre mudanÃƒÂ§as nÃƒÂ£o commitadas
   - Mostre arquivos modificados desde o ÃƒÂºltimo commit

## SaÃƒÂ­da

Produza um relatÃƒÂ³rio conciso de verificaÃƒÂ§ÃƒÂ£o:

```
VERIFICATION: [PASS/FAIL]

Build:    [OK/FAIL]
Types:    [OK/X errors]
Lint:     [OK/X issues]
Tests:    [X/Y passed, Z% coverage]
Secrets:  [OK/X found]
Logs:     [OK/X console.logs]

Ready for PR: [YES/NO]
```

Se houver problemas crÃƒÂ­ticos, liste-os com sugestÃƒÂµes de correÃƒÂ§ÃƒÂ£o.

## Argumentos

$ARGUMENTS podem ser:
- `quick` - Apenas build + types
- `full` - Todas as checagens (padrÃƒÂ£o)
- `pre-commit` - Checagens relevantes para commits
- `pre-pr` - Checagens completas mais security scan
