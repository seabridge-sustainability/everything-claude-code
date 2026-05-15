# SeaBridgeAI Superpowers Integration Validation - 2026-05-06

## Scope

Local-only integration of Superpowers into the centralized SeaBridgeAI coding-agent system at:

C:\Users\adelm\SeaBridgeAI\everything-claude-code

No GitHub push, global install, marketplace install, paid call, live provider call, or destructive operation was performed.

## Superpowers Source Availability

Status: newly cloned locally.

Reference path:
C:\Users\adelm\SeaBridgeAI\everything-claude-code\vendor\superpowers

Upstream source:
https://github.com/obra/Superpowers

Checked version:
- Tag/describe: v5.1.0
- Commit: f2cbfbefebbfef77321e4c9abc9e949826bea9d7
- Commit summary: f2cbfbe 2026-05-04 15:05:01 -0700 Release v5.1.0 (#1468)

## Superpowers Skills Reviewed

Reviewed local skill library under vendor\superpowers\skills:

- brainstorming
- using-git-worktrees
- writing-plans
- executing-plans
- subagent-driven-development
- dispatching-parallel-agents
- test-driven-development
- systematic-debugging
- verification-before-completion
- requesting-code-review
- receiving-code-review
- finishing-a-development-branch
- writing-skills
- using-superpowers

## Adaptation Decision Matrix

Fully embedded into SeaBridgeAI skills:

- brainstorming -> sea-brainstorming-and-spec-refinement
- test-driven-development -> sea-test-driven-development
- systematic-debugging -> sea-systematic-debugging
- verification-before-completion -> sea-verification-before-completion
- requesting-code-review -> sea-code-review-response
- receiving-code-review -> sea-code-review-response
- finishing-a-development-branch -> sea-finishing-development-branch
- writing-skills -> sea-skill-creator-protocol
- using-superpowers -> sea-senior-dev-workflow and master system load rules

Partially adapted:

- using-git-worktrees -> sea-git-worktree-isolation, with explicit approval before creating worktrees and no cleanup/deletion without proof of no unique work.
- writing-plans -> sea-brainstorming-and-spec-refinement, sea-task-orchestration, and sea-senior-dev-workflow, with SeaBridgeAI-specific endpoint/source/auth/tenant/domain checks.
- executing-plans -> sea-task-orchestration and sea-finishing-development-branch, with human approval gates for commit/push/merge/global install.
- subagent-driven-development -> sea-task-orchestration and sea-parallel-agent-dispatch, constrained by Codex subagent rules and explicit user authorization.
- dispatching-parallel-agents -> sea-parallel-agent-dispatch, constrained to independent disjoint scopes only.

Reference only:

- Superpowers plugin/harness installation docs remain reference only. SeaBridgeAI embeds methodology locally through ECC skills and does not require marketplace install.

Excluded:

- Any workflow that assumes autonomous pushes, global installs, marketplace installs, unapproved branch cleanup, uncontrolled long-running autonomy, paid/live calls, or deletion/discard of work without approval.

## Existing SeaBridgeAI Skills Updated

Updated canonical skill bodies under skills\sea-* and matching wrappers under .agents\skills\sea-*:

- sea-senior-dev-workflow
- sea-task-orchestration
- sea-backend-api-verification
- sea-frontend-design
- sea-ai-data-integrity
- sea-sustainability-domain-review
- sea-context-hygiene
- sea-cross-repo-handoff
- sea-skill-creator-protocol
- sea-knowledge-vault

Each canonical skill now includes purpose, when to call, required inputs, expected outputs, mandatory verification, failure conditions, SeaBridgeAI sustainability/data-integrity requirements, cross-agent compatibility notes, and Superpowers adaptation notes.

## New SeaBridgeAI Skills Created

Created canonical skills and wrappers:

- sea-brainstorming-and-spec-refinement
- sea-test-driven-development
- sea-systematic-debugging
- sea-verification-before-completion
- sea-code-review-response
- sea-git-worktree-isolation
- sea-parallel-agent-dispatch
- sea-finishing-development-branch

All enforce local-only development unless approved, no GitHub push unless approved, no fabricated sustainability data, endpoint/database/source verification before frontend claims, auth and tenant-isolation checks, clear testing requirements, concise handoff summaries, security review gates, and sustainability-domain review gates.

## Wrappers Created Or Updated

Validation result: PASS.

Canonical SeaBridgeAI skills found: 18
Callable wrappers found: 18
Missing wrappers: none

Wrapper path pattern:
C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\sea-*\SKILL.md

Canonical path pattern:
C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\sea-*\SKILL.md

Wrappers preserve the same skill name and point to the canonical body.

## Master System Files Updated

Updated:

- SEABRIDGE_CODING_AGENT_SYSTEM.md
- AGENTS_SYSTEM.md
- AGENTS.md
- CLAUDE.md
- FOD.md

Confirmed they preserve:

- SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1
- Canonical path: C:\Users\adelm\SeaBridgeAI\everything-claude-code
- Embedded/adapted Superpowers methodology
- Full callable SeaBridgeAI skill catalog
- Mandatory skill triggers
- Claude Code, Codex, Gemini, OpenCode, Cursor, GitHub Copilot CLI, and future-agent compatibility
- Local-only/no-push/no-global-install/no-marketplace-install approval gates

Confirmed no reference to deprecated repo names in the updated central surfaces.

## Repo Instruction Files Checked

Checked these repos and files:

- C:\Users\adelm\SeaBridgeAI\manageesg-backend
  - AGENTS_SYSTEM.md
  - AGENTS.md
  - CLAUDE.md
- C:\Users\adelm\SeaBridgeAI\manageesg-frontend
  - AGENTS_SYSTEM.md
  - AGENTS.md
  - CLAUDE.md
- C:\Users\adelm\SeaBridgeAI\openseabri
  - AGENTS_SYSTEM.md
  - AGENTS.md
  - CLAUDE.md
- C:\Users\adelm\SeaBridgeAI\_upstream
  - AGENTS_SYSTEM.md
  - AGENTS.md
  - CLAUDE.md

Validation result: PASS.

Each checked file now references:

- SYSTEM_ID: SEABRIDGE_AGENT_SYSTEM_V1
- C:\Users\adelm\SeaBridgeAI\everything-claude-code
- Full callable SeaBridgeAI skill catalog including sea-verification-before-completion

Product repos remain consumers of the centralized system; central skill bodies were not copied into product repos.

## Conflict Check

Scans performed for:

- duplicate SeaBridgeAI skill names with different behavior
- missing wrappers
- stale copied wrapper bodies
- references to deprecated repo names
- active claude-mem references in central SeaBridgeAI surfaces
- Superpowers marketplace install instructions in central SeaBridgeAI surfaces
- instructions allowing pushes/global installs without approval
- uncontrolled autonomous execution

Results:

- Duplicate sea-* canonical/wrapper mismatch: PASS, wrappers are pointers to canonical bodies.
- Missing wrappers: PASS, 18 canonical and 18 wrappers.
- Deprecated repo name references: PASS, none found in updated central surfaces.
- Superpowers install commands: PASS, no Superpowers plugin/marketplace install command added.
- Push/global install gates: PASS, updated surfaces require explicit approval.
- Uncontrolled autonomy: PASS, explicitly disallowed.

Notes:

- Generic non-SeaBridgeAI skills elsewhere in ECC may still contain their own upstream examples. The central SeaBridgeAI policy now overrides those examples for SeaBridgeAI work and requires approval for pushes, commits, global installs, marketplace installs, and live/cost-incurring actions.

## Claude Mem Exclusion Confirmation

Validation result: PASS.

Confirmed:

- Claude Mem was not cloned under ECC vendor/external/references paths.
- C:\Users\adelm\.claude\skills\claude-mem does not exist.
- claude plugin list returned: No plugins installed.
- TCP check for 127.0.0.1:37777 returned TcpTestSucceeded=False.
- No SQLite/vector memory layer was added.

Allowed reference text retained:

Claude Mem was evaluated and intentionally excluded. SeaBridgeAI uses explicit markdown-based project memory through CLAUDE.md, AGENTS.md, AGENTS_SYSTEM.md, skills, workflows, checklists, audit logs, and handoff notes.

## Global Install And Push Confirmation

Global install performed: NO
Marketplace install performed: NO
GitHub push performed: NO
Commit performed: NO
Paid/live provider call performed: NO

## Remaining Manual Approval Items

Manual approval is still required for any future action to:

- install Superpowers or any plugin globally or through a marketplace;
- push, commit, merge, open a PR, or clean up branches/worktrees;
- run paid/live provider calls or GPU/cloud workloads;
- remove worktrees, repositories, data, vector indexes, databases, or infrastructure;
- activate any Claude Mem or SQLite/vector memory integration.

## Final Status

Validation status: PASS.

Superpowers is locally cloned, evaluated, and adapted into the centralized SeaBridgeAI coding-agent system through canonical SeaBridgeAI skills and wrappers. The checked repos point to the centralized system, Claude Mem remains excluded, and approval-gated operations were not performed.

## Direct Upstream Superpowers Skill Wiring - 2026-05-06 Follow-Up

Goal: make the upstream Superpowers skill names directly callable without installing the Superpowers plugin globally or through any marketplace.

Direct Superpowers skill names wired:

- brainstorming
- using-git-worktrees
- writing-plans
- executing-plans
- subagent-driven-development
- dispatching-parallel-agents
- test-driven-development
- systematic-debugging
- verification-before-completion
- requesting-code-review
- receiving-code-review
- finishing-a-development-branch
- writing-skills
- using-superpowers

Local wrapper locations now present:

- C:\Users\adelm\SeaBridgeAI\everything-claude-code\skills\<skill>\SKILL.md
- C:\Users\adelm\SeaBridgeAI\everything-claude-code\.agents\skills\<skill>\SKILL.md
- C:\Users\adelm\SeaBridgeAI\everything-claude-code\.claude\skills\<skill>\SKILL.md
- C:\Users\adelm\SeaBridgeAI\everything-claude-code\.cursor\skills\<skill>\SKILL.md
- C:\Users\adelm\.codex\skills\<skill>\SKILL.md
- C:\Users\adelm\.claude\skills\<skill>\SKILL.md

Each wrapper points to:

C:\Users\adelm\SeaBridgeAI\everything-claude-code\vendor\superpowers\skills\<skill>\SKILL.md

and preserves SeaBridgeAI gates for no unapproved push, commit, global install, marketplace install, paid/live call, destructive cleanup, Claude Mem/vector-memory activation, or fabricated sustainability data.

Gemini wiring:

- Added C:\Users\adelm\SeaBridgeAI\everything-claude-code\GEMINI.md.
- Added a user-level import in C:\Users\adelm\.gemini\GEMINI.md pointing to the ECC Gemini file.
- Fixed C:\Users\adelm\.gemini\settings.json so hooks.beforeTool is an array, not a string.
- Rewrote C:\Users\adelm\.gemini\settings.json as UTF-8 without BOM because Gemini rejected the BOM.
- Verification: gemini --version returned 0.36.0.

OpenCode wiring:

- Added local plugin file C:\Users\adelm\SeaBridgeAI\everything-claude-code\.opencode\plugins\superpowers.js from the vendored Superpowers reference.
- Updated C:\Users\adelm\SeaBridgeAI\everything-claude-code\.opencode\opencode.json plugin array to include ./plugins/superpowers.js.
- Verification: opencode --version returned 1.14.30.

Claude/Codex verification:

- claude plugin list still reports no plugins installed, confirming no marketplace/plugin install was performed.
- codex --version returned codex-cli 0.124.0.
- Direct wrapper coverage check passed for all 14 upstream Superpowers skill names in user-level Claude, user-level Codex, ECC root skills, ECC .agents, ECC .claude, and ECC .cursor skill folders.

Cursor verification:

- Local Cursor skill wrappers exist under C:\Users\adelm\SeaBridgeAI\everything-claude-code\.cursor\skills.
- cursor CLI is not on PATH in this shell, so runtime launch verification is not available from Codex.

Follow-up status: PASS with caveat that Cursor runtime itself was not launch-verified because the cursor CLI is unavailable on PATH.

Global/marketplace install performed: NO
GitHub push performed: NO
Commit performed: NO
Claude Mem activation performed: NO
