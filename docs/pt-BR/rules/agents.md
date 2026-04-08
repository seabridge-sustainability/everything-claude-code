# OrquestraÃƒÂ§ÃƒÂ£o de Agentes

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Agentes DisponÃƒÂ­veis

Localizados em `~/.claude/agents/`:

| Agente | PropÃƒÂ³sito | Quando Usar |
|--------|-----------|-------------|
| planner | Planejamento de implementaÃƒÂ§ÃƒÂ£o | Recursos complexos, refatoraÃƒÂ§ÃƒÂ£o |
| architect | Design de sistema | DecisÃƒÂµes arquiteturais |
| tdd-guide | Desenvolvimento orientado a testes | Novos recursos, correÃƒÂ§ÃƒÂ£o de bugs |
| code-reviewer | RevisÃƒÂ£o de cÃƒÂ³digo | ApÃƒÂ³s escrever cÃƒÂ³digo |
| security-reviewer | AnÃƒÂ¡lise de seguranÃƒÂ§a | Antes de commits |
| build-error-resolver | Corrigir erros de build | Quando o build falha |
| e2e-runner | Testes E2E | Fluxos crÃƒÂ­ticos do usuÃƒÂ¡rio |
| refactor-cleaner | Limpeza de cÃƒÂ³digo morto | ManutenÃƒÂ§ÃƒÂ£o de cÃƒÂ³digo |
| doc-updater | DocumentaÃƒÂ§ÃƒÂ£o | AtualizaÃƒÂ§ÃƒÂ£o de docs |
| rust-reviewer | RevisÃƒÂ£o de cÃƒÂ³digo Rust | Projetos Rust |

## Uso Imediato de Agentes

Sem necessidade de prompt do usuÃƒÂ¡rio:
1. SolicitaÃƒÂ§ÃƒÂµes de recursos complexos - Use o agente **planner**
2. CÃƒÂ³digo acabado de escrever/modificar - Use o agente **code-reviewer**
3. CorreÃƒÂ§ÃƒÂ£o de bug ou novo recurso - Use o agente **tdd-guide**
4. DecisÃƒÂ£o arquitetural - Use o agente **architect**

## ExecuÃƒÂ§ÃƒÂ£o Paralela de Tarefas

SEMPRE use execuÃƒÂ§ÃƒÂ£o paralela de Task para operaÃƒÂ§ÃƒÂµes independentes:

```markdown
# BOM: ExecuÃƒÂ§ÃƒÂ£o paralela
Iniciar 3 agentes em paralelo:
1. Agente 1: AnÃƒÂ¡lise de seguranÃƒÂ§a do mÃƒÂ³dulo de autenticaÃƒÂ§ÃƒÂ£o
2. Agente 2: RevisÃƒÂ£o de desempenho do sistema de cache
3. Agente 3: VerificaÃƒÂ§ÃƒÂ£o de tipos dos utilitÃƒÂ¡rios

# RUIM: Sequencial quando desnecessÃƒÂ¡rio
Primeiro agente 1, depois agente 2, depois agente 3
```

## AnÃƒÂ¡lise Multi-Perspectiva

Para problemas complexos, use subagentes com papÃƒÂ©is divididos:
- Revisor factual
- Engenheiro sÃƒÂªnior
- Especialista em seguranÃƒÂ§a
- Revisor de consistÃƒÂªncia
- Verificador de redundÃƒÂ¢ncia
