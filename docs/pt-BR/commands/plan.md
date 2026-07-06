---
description: Reafirme requisitos, avalie riscos e crie plano de implementaÃƒÂ§ÃƒÂ£o passo a passo. ESPERE confirmaÃƒÂ§ÃƒÂ£o do usuÃƒÂ¡rio ANTES de tocar em qualquer cÃƒÂ³digo.
---

# Comando Plan

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


Este comando invoca o agente **planner** para criar um plano abrangente de implementaÃƒÂ§ÃƒÂ£o antes de escrever qualquer cÃƒÂ³digo.

## O Que Este Comando Faz

1. **Reafirmar Requisitos** - Esclarecer o que precisa ser construÃƒÂ­do
2. **Identificar Riscos** - Levantar problemas e bloqueios potenciais
3. **Criar Plano em Etapas** - Quebrar implementaÃƒÂ§ÃƒÂ£o em fases
4. **Aguardar ConfirmaÃƒÂ§ÃƒÂ£o** - DEVE receber aprovaÃƒÂ§ÃƒÂ£o do usuÃƒÂ¡rio antes de prosseguir

## Quando Usar

Use `/plan` quando:
- Estiver iniciando uma nova feature
- For fazer mudanÃƒÂ§as arquiteturais significativas
- Estiver trabalhando em refatoraÃƒÂ§ÃƒÂ£o complexa
- MÃƒÂºltiplos arquivos/componentes serÃƒÂ£o afetados
- Requisitos estiverem pouco claros ou ambÃƒÂ­guos

## Como Funciona

O agente planner vai:

1. **Analisar o pedido** e reafirmar os requisitos de forma clara
2. **Quebrar em fases** com etapas especÃƒÂ­ficas e acionÃƒÂ¡veis
3. **Identificar dependÃƒÂªncias** entre componentes
4. **Avaliar riscos** e possÃƒÂ­veis bloqueios
5. **Estimar complexidade** (High/Medium/Low)
6. **Apresentar o plano** e AGUARDAR sua confirmaÃƒÂ§ÃƒÂ£o explÃƒÂ­cita

## Exemplo de Uso

```
User: /plan I need to add real-time notifications when markets resolve

Agent (planner):
# Implementation Plan: Real-Time Market Resolution Notifications

## Requirements Restatement
- Send notifications to users when markets they're watching resolve
- Support multiple notification channels (in-app, email, webhook)
- Ensure notifications are delivered reliably
- Include market outcome and user's position result

## Implementation Phases

### Phase 1: Database Schema
- Add notifications table with columns: id, user_id, market_id, type, status, created_at
- Add user_notification_preferences table for channel preferences
- Create indexes on user_id and market_id for performance

### Phase 2: Notification Service
- Create notification service in lib/notifications.ts
- Implement notification queue using BullMQ/Redis
- Add retry logic for failed deliveries
- Create notification templates

### Phase 3: Integration Points
- Hook into market resolution logic (when status changes to "resolved")
- Query all users with positions in market
- Enqueue notifications for each user

### Phase 4: Frontend Components
- Create NotificationBell component in header
- Add NotificationList modal
- Implement real-time updates via Supabase subscriptions
- Add notification preferences page

## Dependencies
- Redis (for queue)
- Email service (SendGrid/Resend)
- Supabase real-time subscriptions

## Risks
- HIGH: Email deliverability (SPF/DKIM required)
- MEDIUM: Performance with 1000+ users per market
- MEDIUM: Notification spam if markets resolve frequently
- LOW: Real-time subscription overhead

## Estimated Complexity: MEDIUM
- Backend: 4-6 hours
- Frontend: 3-4 hours
- Testing: 2-3 hours
- Total: 9-13 hours

**WAITING FOR CONFIRMATION**: Proceed with this plan? (yes/no/modify)
```

## Notas Importantes

**CRITICAL**: O agente planner **NÃƒÆ’O** vai escrever cÃƒÂ³digo atÃƒÂ© vocÃƒÂª confirmar explicitamente o plano com "yes", "proceed" ou resposta afirmativa similar.

Se quiser mudanÃƒÂ§as, responda com:
- "modificar: [suas alteraÃƒÂ§ÃƒÂµes]"
- "abordagem diferente: [alternativa]"
- "pular fase 2 e fazer fase 3 primeiro"

ApÃƒÂ³s planejar:
- Use `/tdd` para implementar com test-driven development
- Use `/build-fix` se ocorrerem erros de build
- Use `/code-review` para revisar a implementaÃƒÂ§ÃƒÂ£o concluÃƒÂ­da

## Agentes Relacionados

Este comando invoca o agente `planner` fornecido pelo ECC.

Para instalaÃƒÂ§ÃƒÂµes manuais, o arquivo fonte fica em:
`agents/planner.md`
