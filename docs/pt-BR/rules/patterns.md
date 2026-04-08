# PadrÃƒÂµes Comuns

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Projetos Skeleton

Ao implementar novas funcionalidades:
1. Buscar projetos skeleton bem testados
2. Usar agentes paralelos para avaliar opÃƒÂ§ÃƒÂµes:
   - AvaliaÃƒÂ§ÃƒÂ£o de seguranÃƒÂ§a
   - AnÃƒÂ¡lise de extensibilidade
   - PontuaÃƒÂ§ÃƒÂ£o de relevÃƒÂ¢ncia
   - Planejamento de implementaÃƒÂ§ÃƒÂ£o
3. Clonar a melhor opÃƒÂ§ÃƒÂ£o como fundaÃƒÂ§ÃƒÂ£o
4. Iterar dentro da estrutura comprovada

## PadrÃƒÂµes de Design

### PadrÃƒÂ£o Repository

Encapsular acesso a dados atrÃƒÂ¡s de uma interface consistente:
- Definir operaÃƒÂ§ÃƒÂµes padrÃƒÂ£o: findAll, findById, create, update, delete
- ImplementaÃƒÂ§ÃƒÂµes concretas lidam com detalhes de armazenamento (banco de dados, API, arquivo, etc.)
- A lÃƒÂ³gica de negÃƒÂ³cios depende da interface abstrata, nÃƒÂ£o do mecanismo de armazenamento
- Habilita troca fÃƒÂ¡cil de fontes de dados e simplifica testes com mocks

### Formato de Resposta da API

Use um envelope consistente para todas as respostas de API:
- Incluir indicador de sucesso/status
- Incluir o payload de dados (nullable em caso de erro)
- Incluir campo de mensagem de erro (nullable em caso de sucesso)
- Incluir metadados para respostas paginadas (total, pÃƒÂ¡gina, limite)
