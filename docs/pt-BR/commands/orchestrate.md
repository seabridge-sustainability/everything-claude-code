---
description: OrientaÃƒÂ§ÃƒÂ£o de orquestraÃƒÂ§ÃƒÂ£o sequencial e tmux/worktree para fluxos multiagente.
---

# Comando Orchestrate

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


Fluxo sequencial de agentes para tarefas complexas.

## Uso

`/orchestrate [workflow-type] [task-description]`

## Tipos de Workflow

### feature
Workflow completo de implementaÃƒÂ§ÃƒÂ£o de feature:
```
planner -> tdd-guide -> code-reviewer -> security-reviewer
```

### bugfix
Workflow de investigaÃƒÂ§ÃƒÂ£o e correÃƒÂ§ÃƒÂ£o de bug:
```
planner -> tdd-guide -> code-reviewer
```

### refactor
Workflow de refatoraÃƒÂ§ÃƒÂ£o segura:
```
architect -> code-reviewer -> tdd-guide
```

### security
RevisÃƒÂ£o focada em seguranÃƒÂ§a:
```
security-reviewer -> code-reviewer -> architect
```

## PadrÃƒÂ£o de ExecuÃƒÂ§ÃƒÂ£o

Para cada agente no workflow:

1. **Invoque o agente** com contexto do agente anterior
2. **Colete saÃƒÂ­da** como documento estruturado de handoff
3. **Passe para o prÃƒÂ³ximo agente** na cadeia
4. **Agregue resultados** em um relatÃƒÂ³rio final

## Formato do Documento de Handoff

Entre agentes, crie um documento de handoff:

```markdown
## HANDOFF: [previous-agent] -> [next-agent]

### Context
[Summary of what was done]

### Findings
[Key discoveries or decisions]

### Files Modified
[List of files touched]

### Open Questions
[Unresolved items for next agent]

### Recommendations
[Suggested next steps]
```

## Exemplo: Workflow de Feature

```
/orchestrate feature "Add user authentication"
```

Executa:

1. **Planner Agent**
   - Analisa requisitos
   - Cria plano de implementaÃƒÂ§ÃƒÂ£o
   - Identifica dependÃƒÂªncias
   - SaÃƒÂ­da: `HANDOFF: planner -> tdd-guide`

2. **TDD Guide Agent**
   - LÃƒÂª handoff do planner
   - Escreve testes primeiro
   - Implementa para passar testes
   - SaÃƒÂ­da: `HANDOFF: tdd-guide -> code-reviewer`

3. **Code Reviewer Agent**
   - Revisa implementaÃƒÂ§ÃƒÂ£o
   - Verifica problemas
   - Sugere melhorias
   - SaÃƒÂ­da: `HANDOFF: code-reviewer -> security-reviewer`

4. **Security Reviewer Agent**
   - Auditoria de seguranÃƒÂ§a
   - VerificaÃƒÂ§ÃƒÂ£o de vulnerabilidades
   - AprovaÃƒÂ§ÃƒÂ£o final
   - SaÃƒÂ­da: RelatÃƒÂ³rio Final

## Formato do RelatÃƒÂ³rio Final

```
ORCHESTRATION REPORT
====================
Workflow: feature
Task: Add user authentication
Agents: planner -> tdd-guide -> code-reviewer -> security-reviewer

SUMMARY
-------
[One paragraph summary]

AGENT OUTPUTS
-------------
Planner: [summary]
TDD Guide: [summary]
Code Reviewer: [summary]
Security Reviewer: [summary]

FILES CHANGED
-------------
[List all files modified]

TEST RESULTS
------------
[Test pass/fail summary]

SECURITY STATUS
---------------
[Security findings]

RECOMMENDATION
--------------
[SHIP / NEEDS WORK / BLOCKED]
```

## ExecuÃƒÂ§ÃƒÂ£o Paralela

Para verificaÃƒÂ§ÃƒÂµes independentes, rode agentes em paralelo:

```markdown
### Fase Paralela
Executar simultaneamente:
- code-reviewer (qualidade)
- security-reviewer (seguranÃƒÂ§a)
- architect (design)

### Mesclar Resultados
Combinar saÃƒÂ­das em um ÃƒÂºnico relatÃƒÂ³rio

Para workers externos em tmux panes com git worktrees separados, use `node scripts/orchestrate-worktrees.js plan.json --execute`. O padrÃƒÂ£o embutido de orquestraÃƒÂ§ÃƒÂ£o permanece no processo atual; o helper ÃƒÂ© para sessÃƒÂµes longas ou cross-harness.

Quando os workers precisarem enxergar arquivos locais sujos ou nÃƒÂ£o rastreados do checkout principal, adicione `seedPaths` ao arquivo de plano. O ECC faz overlay apenas desses caminhos selecionados em cada worktree do worker apÃƒÂ³s `git worktree add`, mantendo o branch isolado e ainda expondo scripts, planos ou docs em andamento.

```json
{
  "sessionName": "workflow-e2e",
  "seedPaths": [
    "scripts/orchestrate-worktrees.js",
    "scripts/lib/tmux-worktree-orchestrator.js",
    ".claude/plan/workflow-e2e-test.json"
  ],
  "workers": [
    { "name": "docs", "task": "Update orchestration docs." }
  ]
}
```

Para exportar um snapshot do control plane para uma sessÃƒÂ£o tmux/worktree ao vivo, rode:

```bash
node scripts/orchestration-status.js .claude/plan/workflow-visual-proof.json
```

O snapshot inclui atividade da sessÃƒÂ£o, metadados de pane do tmux, estado dos workers, objetivos, overlays semeados e resumos recentes de handoff em formato JSON.

## Handoff de Command Center do Operador

Quando o workflow atravessar mÃƒÂºltiplas sessÃƒÂµes, worktrees ou panes tmux, acrescente um bloco de control plane ao handoff final:

```markdown
CONTROL PLANE
-------------
Sessions:
- active session ID or alias
- branch + worktree path for each active worker
- tmux pane or detached session name when applicable

Diffs:
- git status summary
- git diff --stat for touched files
- merge/conflict risk notes

Approvals:
- pending user approvals
- blocked steps awaiting confirmation

Telemetry:
- last activity timestamp or idle signal
- estimated token or cost drift
- policy events raised by hooks or reviewers
```

Isso mantÃƒÂ©m planner, implementador, revisor e loop workers legÃƒÂ­veis pela superfÃƒÂ­cie de operaÃƒÂ§ÃƒÂ£o.

## Argumentos

$ARGUMENTS:
- `feature <description>` - Workflow completo de feature
- `bugfix <description>` - Workflow de correÃƒÂ§ÃƒÂ£o de bug
- `refactor <description>` - Workflow de refatoraÃƒÂ§ÃƒÂ£o
- `security <description>` - Workflow de revisÃƒÂ£o de seguranÃƒÂ§a
- `custom <agents> <description>` - SequÃƒÂªncia customizada de agentes

## Exemplo de Workflow Customizado

```
/orchestrate custom "architect,tdd-guide,code-reviewer" "Redesign caching layer"
```

## Dicas

1. **Comece com planner** para features complexas
2. **Sempre inclua code-reviewer** antes do merge
3. **Use security-reviewer** para auth/pagamento/PII
4. **Mantenha handoffs concisos** - foque no que o prÃƒÂ³ximo agente precisa
5. **Rode verificaÃƒÂ§ÃƒÂ£o** entre agentes quando necessÃƒÂ¡rio
