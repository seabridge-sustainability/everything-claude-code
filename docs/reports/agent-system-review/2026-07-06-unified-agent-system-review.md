# SeaBridgeAI Unified Agent-System Review

Date: 2026-07-06
Reviewer: Codex
Scope: `everything-claude-code`, `manageesg-backend`, and `manageesg-frontend`

## 1. Executive Summary

The SeaBridgeAI coding-agent system is broadly unified and effective: the core `/goal` loop, Ponytail-style minimalism, TDD, verification-before-completion, review/challenge routing, harness engineering, security review, platform diagnostics, approval gates, and cross-agent compatibility are already present.

The main risk is not missing governance. The main risk is instruction drift and context bloat: several adapters still carry older static catalogs, duplicated legacy plugin guidance, mojibake, and backend-specific "system-wide" references that can confuse agents about the true authority chain.

No canonical instruction files were changed by this review. This report records findings and recommended follow-up changes for approval.

## 2. Repositories Reviewed

- ECC: `C:\Users\adelm\SeaBridgeAI\everything-claude-code`
- Backend: `C:\Users\adelm\SeaBridgeAI\manageesg-backend`
- Frontend: `C:\Users\adelm\SeaBridgeAI\manageesg-frontend`

## 3. Git State

- ECC: `main...origin/main [ahead 1]`, with existing modified instruction/config files and untracked new skill/report/knowledge-vault artifacts.
- Backend: `seabridge_development...origin/seabridge_development`, dirty with many unrelated backend code, test, and report changes.
- Frontend: `development...origin/development`, dirty with unrelated frontend changes and a deleted `.env.local`.

No existing uncommitted changes were reverted, stashed, committed, pushed, or overwritten.

## 4. Files Reviewed

External source material checked:

- `https://github.com/DietrichGebert/ponytail`
- `https://www.youtube.com/watch?v=YC77Lb_cN6c` was attempted but online fetch was throttled.
- `https://www.youtube.com/shorts/eJnk0dTaDPA` was attempted but online fetch was throttled.
- `https://www.youtube.com/shorts/pTRnTYtjwTk` was attempted but online fetch was throttled.

ECC primary files:

- `AGENTS_SYSTEM.md`
- `AGENTS.md`
- `CLAUDE.md`
- `CODEX.md`
- `GEMINI.md`
- `OPENCODE.md`
- `SEABRIDGE_CODING_AGENT_SYSTEM.md`
- `AGENT_SKILLS.md`
- `.codex/AGENTS.md`
- `.codex/config.toml`
- `.opencode/opencode.json`
- `.claude/settings.json`
- `.gemini/settings.json`
- `protocols/GOAL_PROTOCOL.md`
- `protocols/GOAL_PROTOCOL_SHORT.md`
- `docs/GOAL_PROTOCOL_DEFAULT.md`
- `docs/GSD_GOAL_AUTO_LOOP_INTEGRATION.md`
- `docs/harness/HARNESS_ENGINEERING.md`
- `docs/agent-compatibility/codex.md`
- `docs/agent-compatibility/opencode.md`
- `docs/agent-compatibility/claude-code.md`
- `repo-integrations/manageesg-backend.md`
- `repo-integrations/manageesg-frontend.md`

Backend and frontend primary files:

- `AGENTS_SYSTEM.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.claude/settings.json`
- `.gemini/settings.json`
- `.opencode/opencode.json`
- `opencode.jsonc`
- relevant local agent-tooling and local-LLM docs where referenced

## 5. Skills Reviewed

Relevant ECC skills were present under both `.agents/skills` and `skills`:

- `sea-senior-dev-workflow`
- `sea-test-driven-development`
- `sea-verification-before-completion`
- `sea-security-reviewer`
- `sea-platform-diagnostics`
- `goal-default`
- `sea-gsd-controlled-execution`
- `sea-error-recovery-loop`
- `sea-skill-map`
- `sea-task-queue-execution`
- `sea-teach-loop`

The wrappers point to canonical `skills/<name>/SKILL.md` bodies and inherit `/goal`.

## 6. What Is Already Present

- Lean engineering: `AGENTS_SYSTEM.md` has a Ponytail-inspired minimalism guardrail and `AGENTS.md` / `CLAUDE.md` point to it.
- Bounded execution: `/goal`, `goal-default`, and `sea-gsd-controlled-execution` define persistent but bounded execution, DoD, validation, stuck-task handling, and approval gates.
- TDD: `sea-test-driven-development` covers red-green-refactor, focused failing tests, minimal implementation, refactor, and broader validation when risk warrants.
- Review/challenge: `sea-senior-dev-workflow`, `sea-security-reviewer`, harness reviewer personas, and compatibility docs require review for risky work.
- Deep audits: `AGENTS_SYSTEM.md` has Deep Audit Routing; harness docs route to `check-harness.ps1`; platform diagnostics and error-recovery skills exist.
- Approval boundaries: commits, pushes, dependency installs, global/plugin installs, paid/live calls, migrations, production data changes, destructive operations, yolo/autonomous dangerous modes, and long jobs require explicit approval.

## 7. Improvements Already Implemented Before This Review

Current uncommitted ECC changes already add or strengthen:

- Ponytail-inspired minimalism in `AGENTS_SYSTEM.md`.
- LLM Wiki / Knowledge Vault protocol and untracked `knowledge-vault/` trial files.
- Autonomous Senior Engineer Operating Model in `AGENTS_SYSTEM.md`.
- Deep Audit Routing in `AGENTS_SYSTEM.md`.
- Guardrail evidence from harness advisory reports under `docs/reports/harness/`.

These changes were not reverted. They should be reviewed as part of the current dirty ECC worktree before being accepted or revised.

## 8. Key Finding 1: Authority Chain Is Mostly Correct

The intended hierarchy is visible: active instructions, repo-local `AGENTS_SYSTEM.md`, repo-local `AGENTS.md` / `CLAUDE.md`, ECC canonical files, skills, workflows, and targeted docs. The product repos correctly point to ECC as shared canonical guidance while preserving repo-specific safety and branch rules.

Residual risk: ECC root `AGENTS.md` and `CLAUDE.md` still contain references that make `manageesg-backend/AGENTS_SYSTEM.md` sound like the system-wide authority for all repos. That is misleading inside ECC, where `everything-claude-code/AGENTS_SYSTEM.md` should be canonical for shared governance.

## 9. Key Finding 2: Adapter Drift And Duplicated Catalogs

`AGENTS.md`, `CLAUDE.md`, and `.codex/AGENTS.md` include older static catalogs, plugin snippets, long tool lists, and duplicated safety prose. This increases context cost and raises the chance that one agent follows stale guidance while another follows the newer dynamic skill policy.

The most visible issue is `.codex/AGENTS.md`, which still carries a static skill catalog and a team-shared authorization password rule that differs from the newer `AGENTS.md` guidance not to invent or rely on a separate authorization password unless Alejandro explicitly establishes one.

## 10. Key Finding 3: Cross-Agent Compatibility Is Good But Heavy

Compatibility docs exist for Codex, Claude Code, Gemini, OpenCode, Cursor, and Copilot CLI. `CODEX.md`, `GEMINI.md`, and `OPENCODE.md` are relatively thin and aligned with `/goal`, safety gates, and shared skills.

Residual risk: `CLAUDE.md` and `AGENTS.md` are still large enough that agents may spend attention on legacy examples instead of the concise canonical sections. Several files also show mojibake, which hurts readability and may degrade instruction following.

## 11. Key Finding 4: Runtime Configs Need Periodic Audit

ECC and backend OpenCode configs use environment placeholders such as `{env:NVIDIA_API_KEY}` and `{env:ZAI_API_KEY}`. Frontend and backend local `.opencode/nvidia-api-key.txt` files exist but are ignored and were not read. Frontend OpenCode uses a file-based key reference, which is workable but higher risk than env placeholders because accidental tracking or disclosure is easier.

ECC `.codex/config.toml` includes a named `profiles.yolo` profile with `approval_policy = "never"` and `sandbox_mode = "workspace-write"`. Canonical instructions forbid uncontrolled yolo/autonomous use without explicit approval, but the profile name itself is a footgun worth retiring or renaming if not needed.

## 12. Key Finding 5: Harness Findings Are Real Backlog

`check-harness.ps1 -Advisory` passed as an advisory run and generated reports. It found:

- 896 `frontend.button-accessibility-review`
- 119 `frontend.production-console`
- 24 `backend.external-call-timeout`
- 23 `frontend.raw-fetch-boundary`
- 14 `frontend.icon-button-missing-label`
- 13 `backend.subprocess-timeout`
- 9 `backend.retry-bounds`
- 6 `backend.route-auth-boundary`

These are not instruction-system failures, but they are the best next deep-audit target because they are evidence-backed and already categorized.

## 13. Key Finding 6: Wargame And Self-Improvement Loops Are Not Fully Canonical

Searches found self-improvement references in vendored or legacy skill material, and `sea-error-recovery-loop` provides a safer root-cause loop. I did not find a first-class, canonical "Wargame", "Improve-System", or "Ecosystem Monitoring" operating model in the main ECC instruction layer.

That absence is acceptable if intentional: the safer SeaBridge-native pattern is bounded error recovery, verification, harness refinement, and explicit user-invoked deep audits rather than surprise self-modifying loops.

## 14. Recommended Changes For Approval

1. Make ECC `AGENTS.md` and `CLAUDE.md` thinner adapters: keep `/goal`, canonical path, safety gates, Ponytail pointer, skill-routing pointer, and agent-specific notes; move or remove long legacy catalogs.
2. Replace backend-specific global authority wording in ECC and frontend adapters with the actual shared hierarchy: ECC canonical system plus repo-local stricter overrides.
3. Normalize the authorization-password language across ECC, backend, frontend, `.codex/AGENTS.md`, and frontend `AGENTS_SYSTEM.md`.
4. Add `sea-platform-diagnostics` to every static catalog that still exists, or remove those catalogs in favor of dynamic discovery.
5. Rename or disable the `.codex/config.toml` `profiles.yolo` profile unless it is deliberately retained for explicit, manually approved experiments.
6. Prefer env placeholders over file-based OpenCode API key references where practical, or document the ignored key-file pattern clearly.
7. Run a targeted text-encoding cleanup for mojibake in first-party instruction files only.

## 15. Commands Run

- `git status --short --branch` in ECC, backend, and frontend.
- `git fetch --prune` in ECC, backend, and frontend.
- Targeted `rg` inspections for `Ponytail`, `/goal`, `auto-loop`, `yolo`, `global install`, `paid/live`, `destructive`, `Autonomous Senior Engineer`, `Deep Audit`, and relevant skill names.
- `rg --hidden --files | Select-String -Pattern 'SKILL\.md$'`
- Runtime config inspections for `apiKey`, env/file references, permissions, approval, sandbox, write/edit/bash, and MCP settings.
- Web source check for Ponytail repo and the three requested YouTube URLs.
- `git diff --check -- AGENTS_SYSTEM.md AGENTS.md CLAUDE.md SEABRIDGE_CODING_AGENT_SYSTEM.md AGENT_SKILLS.md CODEX.md GEMINI.md OPENCODE.md .codex\AGENTS.md .codex\config.toml .opencode\opencode.json`
- `powershell -ExecutionPolicy Bypass -File scripts\check-coding-agent-system.ps1`
- `powershell -ExecutionPolicy Bypass -File scripts\check-agent-runtime-guardrails.ps1`
- `powershell -ExecutionPolicy Bypass -File scripts\check-canonical-skills.ps1`
- `powershell -ExecutionPolicy Bypass -File scripts\check-harness.ps1 -Advisory`
- `Test-Path scripts\check-cross-agent-skills.ps1`

## 16. Validation Results And Skipped Checks

Passed:

- `git diff --check` on targeted changed ECC instruction/config files returned exit 0, with only LF to CRLF warnings.
- `check-coding-agent-system.ps1` passed.
- `check-agent-runtime-guardrails.ps1` passed.
- `check-canonical-skills.ps1` passed.
- `check-harness.ps1 -Advisory` exited 0 and generated advisory reports.
- Ponytail GitHub source opened successfully. The requested YouTube URLs could not be fetched because the online fetcher returned throttling errors.

Skipped:

- `scripts/check-cross-agent-skills.ps1` was not run because the script is not present.
- No broad backend/frontend test suites were run because this was governance review only and no product code was changed.
- No plugin installs, global installs, marketplace commands, paid/live calls, commits, branches, PRs, pushes, or secret reads were performed.

## 17. Recommended First Deep Audit

Run a `/goal` against the harness backlog first:

`/goal triage the latest ECC harness advisory report, start with frontend.production-console and backend.external-call-timeout, classify true positives, propose the smallest safe fixes, and validate with targeted checks before editing`

This is the best first deep audit because the evidence already exists, the findings are concrete, and the work directly improves runtime reliability and production readiness without inventing a new governance layer.

## 18. Effectiveness Addendum: 2026-07-06 Recheck

This recheck confirms the unified coding-agent system is implemented effectively
enough to operate as the shared SeaBridgeAI governance layer. The main
architecture is coherent: ECC is the canonical shared system, product repos add
repo-specific overrides, `/goal` is the default non-trivial work loop, skills
route specialized behavior, and guardrail scripts enforce important parts of
the contract.

It is not fully clean yet. The remaining issues are drift and maintainability,
not a missing operating model: adapter files are still heavy, some static skill
catalogs are duplicated, a few references use backend-specific wording where
ECC-wide wording would be clearer, one expected cross-agent check script is not
present, and `.codex/config.toml` still contains a `profiles.yolo` profile that
should be retired, renamed, or documented as explicit-approval-only.

### Current System Map

- Canonical shared authority: ECC `AGENTS_SYSTEM.md`, with
  `SEABRIDGE_CODING_AGENT_SYSTEM.md` and `AGENT_SKILLS.md` as supporting system
  and skill-routing docs.
- Agent adapters: ECC `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `GEMINI.md`, and
  `OPENCODE.md` route Codex, Claude Code, Gemini, OpenCode, Cursor-style, and
  generic agents back to the canonical hierarchy.
- Product overrides: backend and frontend `AGENTS.md` files add stricter
  repo-specific ownership, safety, branch, and verification rules.
- Skill fabric: both `.agents/skills/` and `skills/` expose SeaBridge-native
  loops for `/goal`, GSD, TDD, verification, security review, platform
  diagnostics, skill routing, task queues, teaching, and error recovery.
- Guardrail layer: ECC scripts check instruction consistency, canonical skills,
  runtime guardrails, and advisory harness findings across backend, frontend,
  and OpenSeaBri surfaces.

### Requested Report Structure Coverage

- Executive summary: covered in sections 1 and 18.
- Current system map: added above.
- Files reviewed: covered in section 4 and revalidated by targeted searches.
- Skills/workflows/loops reviewed: covered in section 5 and targeted skill
  routing checks.
- Correct configuration: covered in sections 6, 8, 10, and this addendum.
- Conflicts/drift: covered in sections 9, 11, 13, 14, and this addendum.
- Broken/stale references: `scripts/check-cross-agent-skills.ps1` is missing;
  old harness counts in section 12 are superseded by the latest advisory run.
- Missing/weak coverage: Wargame, Improve-System, and Ecosystem Monitoring are
  not first-class canonical loops; the safer current equivalent is bounded
  error recovery plus explicit deep audits.
- Safety/auth risks: `.env` files and ignored key files were not read; yolo
  profile and authorization-password wording remain the main governance risks.
- Efficiency/token/context risks: heavy adapters, duplicated catalogs, and
  1,029 discoverable `SKILL.md` files can add context noise if agents do not
  use dynamic routing.
- Backend/frontend integration findings: backend and frontend repo-local
  instructions correctly point back to ECC while preserving local stricter
  rules; dirty worktrees were preserved.
- Recommended fixes: grouped below.
- First wargame candidate: see below.
- First Improve-System loop candidate: see below.
- Commands run/results: see sections 15, 16, and the recheck commands below.
- Skipped checks: see section 16 and the recheck skipped-check note below.
- Remaining risks: see section 18 remaining-risks note below.

### What Was Already Present

- Ponytail-style lean engineering is already represented through Think Before
  Coding, Simplicity First, Surgical Changes, Goal-Driven Execution, and the
  Autonomous Senior Engineer operating model.
- TDD and red-green-refactor guidance is present through
  `sea-test-driven-development`, `superpowers:test-driven-development`, and
  instruction-level verification requirements.
- Bounded autonomous execution is present through `/goal`,
  `sea-gsd-controlled-execution`, approval gates, stop conditions, and explicit
  prohibitions on uncontrolled yolo mode, auto-commit, auto-push, global
  installs, and paid/live calls.
- Review and challenge workflows are present through security review,
  architecture review, verification-before-completion, and relevant critique
  loops.
- Deep audit routing is present through `sea-security-reviewer`,
  `sea-platform-diagnostics`, harness scripts, `sea-error-recovery-loop`, and
  `sea-verification-before-completion`.
- GitHub and other connector-backed skills are available in the Codex runtime;
  no plugin installation was needed or performed.

### What Was Improved By Prior Work

- Canonical instruction docs now include a concise Ponytail-inspired operating
  model and bounded autonomous senior-engineer loop.
- Guardrail scripts were narrowed so generated/browser artifacts and comments
  do not drown out product risks.
- Backend timeout handling was strengthened in the sustainability research
  PowerShell runner and berry verification path.
- Harness evidence moved from broad noisy categories toward a smaller advisory
  backlog with concrete remaining risk classes.

### Recommended Fixes

Auto-approve candidates:

- Keep this report addendum as the direct mapping from the attached `/goal`
  review rubric to the implemented system.
- Update future reports to show the latest harness counts instead of copying
  stale advisory output.
- Add a small replacement for `scripts/check-cross-agent-skills.ps1` or remove
  it from verification examples if it is intentionally retired.

Needs signoff:

- Thin ECC `AGENTS.md` and `CLAUDE.md` into lightweight adapters.
- Normalize authorization-password wording across ECC, backend, frontend, and
  `.codex/AGENTS.md`.
- Replace backend-specific "system-wide" wording in ECC adapters with ECC-wide
  canonical wording.
- Rename, disable, or explicitly document `.codex/config.toml` `profiles.yolo`
  as approval-gated only.
- Clean mojibake in first-party instruction files.

More context needed:

- Decide whether Wargame, Improve-System, and Ecosystem Monitoring should become
  first-class SeaBridge loops or remain external inspiration handled by bounded
  error recovery and explicit deep audits.
- Decide whether token-retry and context-budget checks should become enforceable
  scripts or remain instruction-level guidance.

### Suggested First Wargame Candidate

Run a read-only `/goal` wargame against `backend.retry-bounds`: choose one
representative retry path, prove whether retries are bounded and observable,
then propose the smallest fix only if the finding is real.

### Suggested First Improve-System Loop Candidate

Improve the harness reliability loop itself: add or restore the missing
cross-agent skills check, then validate that ECC, backend, and frontend skill
surfaces agree without requiring agents to load large static catalogs.

### Recheck Commands And Results

- `powershell -ExecutionPolicy Bypass -File scripts\check-harness.ps1 -Advisory`
  completed successfully and generated
  `docs\reports\harness\harness_scan_20260705_222045.json`.
- Latest advisory counts: 484 `frontend.button-accessibility-review`, 14
  `frontend.raw-fetch-boundary`, 9 `backend.retry-bounds`, 7
  `frontend.icon-button-missing-label`, and 6 `backend.route-auth-boundary`.
- `git diff --check -- AGENTS_SYSTEM.md AGENTS.md CLAUDE.md
  SEABRIDGE_CODING_AGENT_SYSTEM.md AGENT_SKILLS.md CODEX.md GEMINI.md
  OPENCODE.md .codex\AGENTS.md .codex\config.toml
  scripts\check-backend-guardrails.ps1
  scripts\check-frontend-guardrails.ps1
  docs\reports\agent-system-review\2026-07-06-unified-agent-system-review.md
  docs\reports\harness\2026-07-06-harness-triage-console-timeout.md` returned
  exit 0 with only LF-to-CRLF warnings.
- `git diff --check -- app\services\sustainability_research.py
  seabridge_ai\src\berry\verify.py` returned exit 0.
- Targeted `rg` checks confirmed `/goal`, Ponytail, TDD, bounded execution,
  deep audit routing, and the relevant SeaBridge skills are discoverable.
- `rg --hidden --files . | Select-String -Pattern 'SKILL\.md$' | Measure-Object`
  found 1,029 skill files in ECC.
- `scripts\check-coding-agent-system.ps1`,
  `scripts\check-agent-runtime-guardrails.ps1`, and
  `scripts\check-canonical-skills.ps1` passed in the earlier pass.
- `scripts\check-cross-agent-skills.ps1` was not run because it is not present.

### Recheck Skipped Checks

- No `.env`, ignored key-file contents, provider credentials, or secret values
  were read.
- No broad backend/frontend product test suites were run because this recheck
  focused on agent-governance effectiveness and static guardrails.
- No plugin install, global install, dependency install, marketplace command,
  paid/live provider call, commit, branch, PR, or push was performed.
- The requested YouTube source material remains indirectly represented by the
  verified governance concepts; the previous web fetcher could not retrieve the
  YouTube pages due throttling.

### Remaining Risks

The system is unified and usable, but agents may still waste context or follow
stale wording until the heavy adapters, duplicated catalogs, missing cross-agent
check, yolo profile, and authorization-password conflict are cleaned up. The
best next governance task is a focused `/goal` to remove that drift without
changing product behavior.
