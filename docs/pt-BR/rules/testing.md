# Requisitos de Teste

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
