# OtimizaÃƒÂ§ÃƒÂ£o de Desempenho

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


## EstratÃƒÂ©gia de SeleÃƒÂ§ÃƒÂ£o de Modelo

**Haiku 4.5** (90% da capacidade do Sonnet, 3x economia de custo):
- Agentes leves com invocaÃƒÂ§ÃƒÂ£o frequente
- ProgramaÃƒÂ§ÃƒÂ£o em par e geraÃƒÂ§ÃƒÂ£o de cÃƒÂ³digo
- Agentes worker em sistemas multi-agente

**Sonnet 4.6** (Melhor modelo para codificaÃƒÂ§ÃƒÂ£o):
- Trabalho principal de desenvolvimento
- Orquestrando fluxos de trabalho multi-agente
- Tarefas de codificaÃƒÂ§ÃƒÂ£o complexas

**Opus 4.5** (RaciocÃƒÂ­nio mais profundo):
- DecisÃƒÂµes arquiteturais complexas
- Requisitos mÃƒÂ¡ximos de raciocÃƒÂ­nio
- Pesquisa e anÃƒÂ¡lise

## Gerenciamento da Janela de Contexto

Evite os ÃƒÂºltimos 20% da janela de contexto para:
- RefatoraÃƒÂ§ÃƒÂ£o em grande escala
- ImplementaÃƒÂ§ÃƒÂ£o de recursos abrangendo mÃƒÂºltiplos arquivos
- DepuraÃƒÂ§ÃƒÂ£o de interaÃƒÂ§ÃƒÂµes complexas

Tarefas com menor sensibilidade ao contexto:
- EdiÃƒÂ§ÃƒÂµes de arquivo ÃƒÂºnico
- CriaÃƒÂ§ÃƒÂ£o de utilitÃƒÂ¡rios independentes
- AtualizaÃƒÂ§ÃƒÂµes de documentaÃƒÂ§ÃƒÂ£o
- CorreÃƒÂ§ÃƒÂµes de bugs simples

## Pensamento Estendido + Modo de Plano

O pensamento estendido estÃƒÂ¡ habilitado por padrÃƒÂ£o, reservando atÃƒÂ© 31.999 tokens para raciocÃƒÂ­nio interno.

Controle o pensamento estendido via:
- **Toggle**: Option+T (macOS) / Alt+T (Windows/Linux)
- **Config**: Defina `alwaysThinkingEnabled` em `~/.claude/settings.json`
- **Limite de orÃƒÂ§amento**: `export MAX_THINKING_TOKENS=10000`
- **Modo verbose**: Ctrl+O para ver a saÃƒÂ­da de pensamento

Para tarefas complexas que requerem raciocÃƒÂ­nio profundo:
1. Garantir que o pensamento estendido esteja habilitado (habilitado por padrÃƒÂ£o)
2. Habilitar **Modo de Plano** para abordagem estruturada
3. Usar mÃƒÂºltiplas rodadas de crÃƒÂ­tica para anÃƒÂ¡lise minuciosa
4. Usar subagentes com papÃƒÂ©is divididos para perspectivas diversas

## ResoluÃƒÂ§ÃƒÂ£o de Problemas de Build

Se o build falhar:
1. Use o agente **build-error-resolver**
2. Analise mensagens de erro
3. Corrija incrementalmente
4. Verifique apÃƒÂ³s cada correÃƒÂ§ÃƒÂ£o
