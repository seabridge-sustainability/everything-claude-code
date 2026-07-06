# gstack Ãƒâ€” SeaBridgeAI Backend

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


> **gstack core:** `~/.claude/skills/gstack/`
> **Backend project:** `C:\Users\adelm\SeaBridgeAI\manageesg-backend`
> **Runtime state (per-session):** `manageesg-backend/.gstack/browse.json` (auto-written by daemon, gitignored)

This document maps every gstack skill to its concrete use in the SeaBridgeAI backend.
Use it as the decision guide for _which_ skill to reach for at each stage of backend development.

---

## How gstack Connects to the Backend

gstack resolves its binary and skill root with this priority order (from `SKILL.md` preamble):

```
1. <repo-root>/.agents/skills/gstack/   Ã¢â€ Â project-local override (not used here)
2. ~/.codex/skills/gstack/              Ã¢â€ Â Codex install path
3. ~/.claude/skills/gstack/             Ã¢â€ Â Claude Code install path  Ã¢Å“â€¦ (active)
```

The backend project registers `.gstack/` as the daemon state directory.
When `/browse` or `/qa` runs, it writes `manageesg-backend/.gstack/browse.json`
(pid + port + auth token). That file is ephemeral Ã¢â‚¬â€ never commit it.

---

## Skill Map Ã¢â‚¬â€ Backend Development Lifecycle

### 1. Before You Write a Single Line

| Skill | Command | When |
|-------|---------|------|
| Office Hours | `/office-hours` | Starting a new ESG agent or AI Manager feature. 9-step Socratic drill that reframes the problem before any code. |
| CEO Review | `/plan-ceo-review` | After office hours Ã¢â‚¬â€ challenge scope, find the 10-star product in the request. |
| Eng Review | `/plan-eng-review` | Lock architecture, LangGraph data flow, edge cases, and test matrix for new agents. |

**Backend trigger:** Any new agent under `seabridge_ai/src/sustainability_ai/ai_agents/`,
new AI Manager tool, or new MCP integration.

---

### 2. Feature Planning

| Skill | Command | When |
|-------|---------|------|
| Autoplan | `/autoplan` | Auto-run full CEO + design + eng + DX review pipeline in one pass. Use before any major feature. |
| Plan DX Review | `/plan-devex-review` | Evaluate developer experience of new API shapes or agent interfaces. |

**Backend trigger:** Adding a new REST endpoint group, restructuring `seabridge_ai/` package layout.

---

### 3. Active Development

| Skill | Command | When |
|-------|---------|------|
| Checkpoint | `/checkpoint` | Save session state during long agent development cycles (LangGraph agents can take many context turns). Resume with `/resume-session`. |
| Careful | `/careful` | Warn before destructive commands Ã¢â‚¬â€ `db.drop_collection()`, `boto3 delete_*`, Redis `FLUSHALL`. |
| Guard | `/guard` | Activate both `/careful` + `/freeze` together. Use when editing live MongoDB models. |
| Freeze | `/freeze` | Lock edits to a single directory (e.g., only allow changes in `app/api/v1/endpoints/`). |

**Backend trigger:** Refactoring Beanie document models, modifying shared utils in `seabridge_ai/shared/`.

---

### 4. Code Review

| Skill | Command | When |
|-------|---------|------|
| Review | `/review` | **Run before every PR.** Catches SQL/NoSQL injection, hardcoded secrets, logic bugs, architectural drift. Mandatory for FastAPI endpoint changes. |
| CSO | `/cso` | Full security audit (OWASP + STRIDE + secrets archaeology). Use when touching: Cognito auth, JWT, any `app/core/security.py`, new API guards, or S3/SES integrations. |
| Python Review | `/python-review` | PEP 8, type hints, async patterns, Pydantic v2 idioms. Run after writing any new service or agent module. |

**Backend trigger:** Any commit touching `app/core/`, `seabridge_ai/ai_mcp/`, AWS integrations.

---

### 5. Testing & QA

| Skill | Command | When |
|-------|---------|------|
| QA | `/qa` | Open a real browser against `http://localhost:8000`. Test Swagger UI, health endpoint, and API responses. |
| QA Only | `/qa-only` | Same as `/qa` but report-only Ã¢â‚¬â€ no fixes. Use when you want a bug list before deciding what to address. |
| Browse | `/browse` | General headless browsing Ã¢â‚¬â€ fetch external ESG data sources, verify third-party API docs, check Axion satellite imagery endpoints. |
| Health | `/health` | Code quality dashboard Ã¢â‚¬â€ runs `mypy`, `flake8`, `pytest --cov`. Use at the start of a session to establish baseline. |

**Backend trigger:** After `uvicorn app.main:app --reload` is running locally.

---

### 6. Debugging

| Skill | Command | When |
|-------|---------|------|
| Investigate | `/investigate` | Systematic root-cause debugging. No fixes without investigation first. Use for: async FastAPI issues, LangGraph agent failures, MongoDB Motor connection errors, Celery task failures. |

**Backend trigger:** Agent returns unexpected output, endpoint 500s intermittently, LangGraph graph hangs mid-execution.

---

### 7. Shipping

| Skill | Command | When |
|-------|---------|------|
| Ship | `/ship` | Full ship workflow: tests Ã¢â€ â€™ review Ã¢â€ â€™ version bump Ã¢â€ â€™ PR. One command to go from green tests to an open PR. |
| Land and Deploy | `/land-and-deploy` | Merge PR, wait for CI, verify production health endpoint at `/api/v1/health`. |
| Document Release | `/document-release` | Update AI agent docs after shipping a new agent. Targets `seabridge_ai/docs/`. |

**Backend trigger:** Feature branch is ready, all checks green.

---

### 8. Ongoing Maintenance

| Skill | Command | When |
|-------|---------|------|
| Retro | `/retro` | Weekly retrospective from git history across backend AI agent work. Shows per-person breakdowns and shipping streaks. |
| Learn | `/learn` | Extract reusable patterns from the session. Saves to `~/.claude/skills/learned/`. |
| gstack Upgrade | `/gstack-upgrade` | Update gstack to latest version. Run monthly or when a new skill is referenced that's not found locally. |

---

## Backend-Specific Cheat Sheet

```
New ESG agent          Ã¢â€ â€™  /office-hours  Ã¢â€ â€™  /plan-eng-review  Ã¢â€ â€™  /tdd  Ã¢â€ â€™  /review  Ã¢â€ â€™  /ship
New MCP tool           Ã¢â€ â€™  /plan-eng-review  Ã¢â€ â€™  /cso  Ã¢â€ â€™  /review  Ã¢â€ â€™  /ship
Debugging agent hang   Ã¢â€ â€™  /investigate
Before MongoDB writes  Ã¢â€ â€™  /careful  (or /guard for bulk ops)
Pre-PR always          Ã¢â€ â€™  /review
Security-sensitive PR  Ã¢â€ â€™  /cso
Weekly check-in        Ã¢â€ â€™  /health  Ã¢â€ â€™  /retro
Long agent dev session Ã¢â€ â€™  /checkpoint  (save)  Ã¢â€ â€™  /resume-session  (restore)
```

---

## `.gstack/` Directory in the Backend

`manageesg-backend/.gstack/` is the **runtime state directory** for the gstack browse daemon.

| File | Written by | Contents |
|------|-----------|----------|
| `browse.json` | gstack daemon | `{ pid, port, token, startedAt, binaryVersion }` |

- Written atomically (tmp Ã¢â€ â€™ rename, mode 0o600).
- Auto-deleted when the daemon shuts down (30 min idle timeout).
- **Never commit** Ã¢â‚¬â€ it is in `.gitignore` (or should be; verify with `git check-ignore .gstack/browse.json`).
- The directory must exist for gstack to write into; keep it as an empty tracked directory.

---

## Adding New Skills to This Map

When a new gstack skill is added to `~/.claude/skills/gstack/`:

1. Check `~/.claude/skills/gstack/AGENTS.md` for its description.
2. Identify which backend lifecycle stage it fits (Planning / Dev / Review / Ship / Maintenance).
3. Add a row to the relevant table above with the concrete backend trigger condition.
4. Update `MEMORY.md` if the skill changes a workflow that's already memorized.
