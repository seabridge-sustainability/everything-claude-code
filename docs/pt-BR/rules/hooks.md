# Sistema de Hooks

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Tipos de Hook

- **PreToolUse**: Antes da execuÃƒÂ§ÃƒÂ£o da ferramenta (validaÃƒÂ§ÃƒÂ£o, modificaÃƒÂ§ÃƒÂ£o de parÃƒÂ¢metros)
- **PostToolUse**: ApÃƒÂ³s a execuÃƒÂ§ÃƒÂ£o da ferramenta (auto-formataÃƒÂ§ÃƒÂ£o, verificaÃƒÂ§ÃƒÂµes)
- **Stop**: Quando a sessÃƒÂ£o termina (verificaÃƒÂ§ÃƒÂ£o final)

## PermissÃƒÂµes de Auto-Aceite

Use com cautela:
- Habilite para planos confiÃƒÂ¡veis e bem definidos
- Desabilite para trabalho exploratÃƒÂ³rio
- Nunca use a flag dangerously-skip-permissions
- Configure `allowedTools` em `~/.claude.json` em vez disso

## Melhores PrÃƒÂ¡ticas para TodoWrite

Use a ferramenta TodoWrite para:
- Rastrear progresso em tarefas com mÃƒÂºltiplos passos
- Verificar compreensÃƒÂ£o das instruÃƒÂ§ÃƒÂµes
- Habilitar direcionamento em tempo real
- Mostrar etapas de implementaÃƒÂ§ÃƒÂ£o granulares

A lista de tarefas revela:
- Etapas fora de ordem
- Itens faltando
- Itens extras desnecessÃƒÂ¡rios
- Granularidade incorreta
- Requisitos mal interpretados
