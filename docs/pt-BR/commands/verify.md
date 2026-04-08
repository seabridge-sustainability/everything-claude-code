# Comando Verification

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
