# Diretrizes de SeguranÃƒÂ§a

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
