# Skill Routing Reference

Date: 2026-05-09
SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1

---

## Purpose

Maps common SeaBridgeAI task types to the required skills, workflows, checklists,
target repos, and evidence requirements. Use this as a quick-lookup when routing
a task to the correct skill pipeline.

---

## Routing Matrix

### 1. Backend API Bug

| Field | Value |
|-------|-------|
| **Primary skill** | sea-systematic-debugging |
| **Supporting skills** | sea-backend-api-verification, sea-verification-before-completion |
| **Workflow** | workflows/bugfix.md |
| **Checklist** | checklists/backend-api.md |
| **Target repo(s)** | manageesg-backend |
| **Expected artifacts** | Fix commit, passing tests, curl/Swagger verification |
| **Evidence** | Test output, API response diff, root-cause note |
| **Wrong-routing indicator** | Using sea-brainstorming-and-spec-refinement or sea-frontend-design for a pure backend runtime bug |

### 2. Frontend Dashboard Issue

| Field | Value |
|-------|-------|
| **Primary skill** | sea-frontend-design |
| **Supporting skills** | sea-verification-before-completion |
| **Workflow** | workflows/frontend-dashboard-review.md |
| **Checklist** | checklists/frontend-uiux.md |
| **Target repo(s)** | manageesg-frontend |
| **Expected artifacts** | Component fix, browser verification, screenshot/test |
| **Evidence** | Visual diff, Playwright snapshot, dev-server test |
| **Wrong-routing indicator** | Using sea-backend-api-verification when the bug is purely presentational |

### 3. LCA Model Output Validation

| Field | Value |
|-------|-------|
| **Primary skill** | sea-ai-data-integrity |
| **Supporting skills** | sea-sustainability-domain-review, sea-verification-before-completion |
| **Workflow** | workflows/ai-output-verification.md |
| **Checklist** | checklists/sustainability-data-quality.md, checklists/ai-hallucination-prevention.md |
| **Target repo(s)** | manageesg-backend (seabridge_ai/) |
| **Expected artifacts** | Validation report, test cases for edge inputs, Berry audit trace |
| **Evidence** | Berry audit_trace_budget output, domain-expert review, test pass |
| **Wrong-routing indicator** | Skipping sea-sustainability-domain-review for ESG/LCA domain output |

### 4. Cross-Repo Feature (Backend + Frontend)

| Field | Value |
|-------|-------|
| **Primary skill** | sea-task-orchestration |
| **Supporting skills** | sea-cross-repo-handoff, sea-backend-api-verification, sea-frontend-design |
| **Workflow** | workflows/cross-repo-change.md |
| **Checklist** | checklists/backend-api.md, checklists/frontend-uiux.md, checklists/pre-merge.md |
| **Target repo(s)** | manageesg-backend, manageesg-frontend |
| **Expected artifacts** | Backend endpoint + frontend consumer, integration test, handoff doc |
| **Evidence** | API contract match, E2E test pass, handoff in docs/reports/handoffs/ |
| **Wrong-routing indicator** | Using sea-senior-dev-workflow without sea-task-orchestration for multi-repo scope |

### 5. Local Model Customization

| Field | Value |
|-------|-------|
| **Primary skill** | sea-local-llm-training |
| **Supporting skills** | sea-ai-data-integrity, sea-verification-before-completion |
| **Workflow** | N/A (skill self-contains loop) |
| **Checklist** | checklists/ai-hallucination-prevention.md |
| **Target repo(s)** | autoresearch (experiments/train.py) |
| **Expected artifacts** | val_bpb improvement, results.tsv entry, run.log |
| **Evidence** | val_bpb metric comparison, commit history |
| **Wrong-routing indicator** | Using sea-senior-dev-workflow for ML training loop work |

### 6. Systematic Debugging (Runtime Failure)

| Field | Value |
|-------|-------|
| **Primary skill** | sea-systematic-debugging |
| **Supporting skills** | sea-backend-api-verification (if API), sea-verification-before-completion |
| **Workflow** | workflows/bugfix.md |
| **Checklist** | checklists/pre-edit.md |
| **Target repo(s)** | Depends on failure location |
| **Expected artifacts** | Root-cause analysis, minimal fix, regression test |
| **Evidence** | Traceback, bisect/isolation result, green test suite |
| **Wrong-routing indicator** | Jumping to sea-brainstorming-and-spec-refinement instead of reproducing first |

### 7. New Reusable Skill Creation

| Field | Value |
|-------|-------|
| **Primary skill** | sea-skill-creator-protocol |
| **Supporting skills** | sea-verification-before-completion |
| **Workflow** | N/A (skill self-contains protocol) |
| **Checklist** | checklists/pre-completion.md |
| **Target repo(s)** | everything-claude-code (skills/, .agents/skills/) |
| **Expected artifacts** | Canonical SKILL.md, wrapper SKILL.md, catalog entry, test scenario |
| **Evidence** | Wrapper points to canonical, catalog updated, skill loads in agent |
| **Wrong-routing indicator** | Creating skill without wrapper or without catalog registration |

### 8. Repo Cleanup and Handoff

| Field | Value |
|-------|-------|
| **Primary skill** | sea-cross-repo-handoff |
| **Supporting skills** | sea-context-hygiene |
| **Workflow** | workflows/cross-repo-change.md |
| **Checklist** | checklists/pre-merge.md |
| **Target repo(s)** | Source and destination repos |
| **Expected artifacts** | Handoff doc in docs/reports/handoffs/, clean root scan |
| **Evidence** | No clutter at repo root, reference integrity check |
| **Wrong-routing indicator** | Using sea-senior-dev-workflow for pure organizational work |

### 9. Security Review

| Field | Value |
|-------|-------|
| **Primary skill** | sea-verification-before-completion |
| **Supporting skills** | sea-backend-api-verification (for API surface) |
| **Workflow** | workflows/module-review.md |
| **Checklist** | checklists/security.md |
| **Target repo(s)** | Any repo with auth, user input, or API endpoints |
| **Expected artifacts** | Security scan results, remediation commits, audit note |
| **Evidence** | Checklist completion, no hardcoded secrets, OWASP coverage |
| **Wrong-routing indicator** | Skipping checklists/security.md for code touching auth or user data |

### 10. OpenSeaBri Skill Integration

| Field | Value |
|-------|-------|
| **Primary skill** | sea-cross-repo-handoff |
| **Supporting skills** | sea-backend-api-verification, sea-frontend-design |
| **Workflow** | workflows/cross-repo-change.md |
| **Checklist** | checklists/backend-api.md |
| **Target repo(s)** | openseabri, manageesg-backend |
| **Expected artifacts** | API contract validation, integration test, handoff doc |
| **Evidence** | OpenSeaBri consumes only /api/v1/openseabri/* endpoints, no direct DB access |
| **Wrong-routing indicator** | Modifying backend internals without sea-backend-api-verification |

---

## Quick Lookup: Skill by Task Category

| Task Category | Primary Skill |
|---------------|---------------|
| Bug in backend API | sea-systematic-debugging |
| Bug in frontend UI | sea-frontend-design |
| AI/ML output quality | sea-ai-data-integrity |
| ESG domain accuracy | sea-sustainability-domain-review |
| Multi-repo change | sea-task-orchestration |
| Local LLM training | sea-local-llm-training |
| New skill creation | sea-skill-creator-protocol |
| Repo organization | sea-cross-repo-handoff + sea-context-hygiene |
| Security review | sea-verification-before-completion + security checklist |
| Feature planning | sea-brainstorming-and-spec-refinement |
| GSD project | sea-gsd-controlled-execution |
| Knowledge capture | sea-knowledge-vault |
| Code review response | sea-code-review-response |
| Git worktree work | sea-git-worktree-isolation |
| Branch completion | sea-finishing-development-branch |
| Parallel dispatch | sea-parallel-agent-dispatch |

---

## Workflow and Checklist Inventory

### Workflows (10)

| File | When to Use |
|------|-------------|
| ai-output-verification.md | AI/ML output quality checks |
| backend-endpoint-review.md | New or modified API endpoints |
| bugfix.md | Any bug fix |
| cross-repo-change.md | Changes spanning multiple repos |
| frontend-dashboard-review.md | Dashboard/UI changes |
| full-feature-build.md | New feature from scratch |
| gsd-controlled-project.md | GSD-managed multi-phase projects |
| gsd-phase-planning.md | GSD phase planning step |
| gsd-verification.md | GSD verification step |
| module-review.md | Module-level code review |

### Checklists (11)

| File | When to Use |
|------|-------------|
| ai-hallucination-prevention.md | Any AI-generated output |
| backend-api.md | Backend API changes |
| frontend-uiux.md | Frontend UI changes |
| gsd-phase-verification.md | GSD phase completion |
| gsd-safe-execution.md | GSD execution safety |
| gsd-scope-control.md | GSD scope management |
| pre-completion.md | Before marking any task done |
| pre-edit.md | Before editing files |
| pre-merge.md | Before merging branches |
| security.md | Security-sensitive changes |
| sustainability-data-quality.md | ESG/sustainability data |
