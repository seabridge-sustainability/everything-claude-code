# Otimização de Desempenho

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->

## Estratégia de Seleção de Modelo

**Haiku 4.5** (90% da capacidade do Sonnet, 3x economia de custo):
- Agentes leves com invocação frequente
- Programação em par e geração de código
- Agentes worker em sistemas multi-agente

**Sonnet 5** (Melhor modelo para codificação):
- Trabalho principal de desenvolvimento
- Orquestrando fluxos de trabalho multi-agente
- Tarefas de codificação complexas

**Opus 5** (Raciocínio mais profundo):
- Decisões arquiteturais complexas
- Requisitos máximos de raciocínio
- Pesquisa e análise

## Gerenciamento da Janela de Contexto

Evite os últimos 20% da janela de contexto para:
- Refatoração em grande escala
- Implementação de recursos abrangendo múltiplos arquivos
- Depuração de interações complexas

Tarefas com menor sensibilidade ao contexto:
- Edições de arquivo único
- Criação de utilitários independentes
- Atualizações de documentação
- Correções de bugs simples

## Pensamento Estendido + Modo de Plano

O pensamento estendido está habilitado por padrão, reservando até 31.999 tokens para raciocínio interno.

Controle o pensamento estendido via:
- **Toggle**: Option+T (macOS) / Alt+T (Windows/Linux)
- **Config**: Defina `alwaysThinkingEnabled` em `~/.claude/settings.json`
- **Limite de orçamento**: `export MAX_THINKING_TOKENS=10000` (bash) ou `$env:MAX_THINKING_TOKENS = "10000"` (PowerShell)
- **Modo verbose**: Ctrl+O para ver a saída de pensamento

Para tarefas complexas que requerem raciocínio profundo:
1. Garantir que o pensamento estendido esteja habilitado (habilitado por padrão)
2. Habilitar **Modo de Plano** para abordagem estruturada
3. Usar múltiplas rodadas de crítica para análise minuciosa
4. Usar subagentes com papéis divididos para perspectivas diversas

## Resolução de Problemas de Build

Se o build falhar:
1. Use o agente **build-error-resolver**
2. Analise mensagens de erro
3. Corrija incrementalmente
4. Verifique após cada correção
