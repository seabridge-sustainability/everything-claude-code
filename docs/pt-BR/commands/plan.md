---
description: Reafirme requisitos, avalie riscos e crie plano de implementaÃƒÂ§ÃƒÂ£o passo a passo. ESPERE confirmaÃƒÂ§ÃƒÂ£o do usuÃƒÂ¡rio ANTES de tocar em qualquer cÃƒÂ³digo.
---

# Comando Plan

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
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
