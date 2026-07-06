---
description: OrientaÃƒÂ§ÃƒÂ£o de orquestraÃƒÂ§ÃƒÂ£o sequencial e tmux/worktree para fluxos multiagente.
---

# Comando Orchestrate

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
