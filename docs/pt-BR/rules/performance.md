# Otimização de Desempenho

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
