# Estilo de CÃƒÂ³digo

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## Imutabilidade (CRÃƒÂTICO)

SEMPRE crie novos objetos, NUNCA modifique os existentes:

```
// PseudocÃƒÂ³digo
ERRADO:  modificar(original, campo, valor) Ã¢â€ â€™ altera o original in-place
CORRETO: atualizar(original, campo, valor) Ã¢â€ â€™ retorna nova cÃƒÂ³pia com a alteraÃƒÂ§ÃƒÂ£o
```

Justificativa: Dados imutÃƒÂ¡veis previnem efeitos colaterais ocultos, facilita a depuraÃƒÂ§ÃƒÂ£o e permite concorrÃƒÂªncia segura.

## OrganizaÃƒÂ§ÃƒÂ£o de Arquivos

MUITOS ARQUIVOS PEQUENOS > POUCOS ARQUIVOS GRANDES:
- Alta coesÃƒÂ£o, baixo acoplamento
- 200-400 linhas tÃƒÂ­pico, 800 mÃƒÂ¡ximo
- Extrair utilitÃƒÂ¡rios de mÃƒÂ³dulos grandes
- Organizar por recurso/domÃƒÂ­nio, nÃƒÂ£o por tipo

## Tratamento de Erros

SEMPRE trate erros de forma abrangente:
- Trate erros explicitamente em cada nÃƒÂ­vel
- ForneÃƒÂ§a mensagens de erro amigÃƒÂ¡veis no cÃƒÂ³digo voltado para UI
- Registre contexto detalhado de erro no lado do servidor
- Nunca engula erros silenciosamente

## ValidaÃƒÂ§ÃƒÂ£o de Entrada

SEMPRE valide nas fronteiras do sistema:
- Valide toda entrada do usuÃƒÂ¡rio antes de processar
- Use validaÃƒÂ§ÃƒÂ£o baseada em schema onde disponÃƒÂ­vel
- Falhe rapidamente com mensagens de erro claras
- Nunca confie em dados externos (respostas de API, entrada do usuÃƒÂ¡rio, conteÃƒÂºdo de arquivo)

## Checklist de Qualidade de CÃƒÂ³digo

Antes de marcar o trabalho como concluÃƒÂ­do:
- [ ] O cÃƒÂ³digo ÃƒÂ© legÃƒÂ­vel e bem nomeado
- [ ] FunÃƒÂ§ÃƒÂµes sÃƒÂ£o pequenas (< 50 linhas)
- [ ] Arquivos sÃƒÂ£o focados (< 800 linhas)
- [ ] Sem aninhamento profundo (> 4 nÃƒÂ­veis)
- [ ] Tratamento adequado de erros
- [ ] Sem valores hardcoded (use constantes ou config)
- [ ] Sem mutaÃƒÂ§ÃƒÂ£o (padrÃƒÂµes imutÃƒÂ¡veis usados)
