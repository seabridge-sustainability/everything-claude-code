---
description: Analyze a draft prompt and output an optimized, ECC-enriched version ready to paste and run. Does NOT execute the task — outputs advisory analysis only.
---

# /prompt-optimize

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


Analyze and optimize the following prompt for maximum ECC leverage.

## Your Task

Apply the **prompt-optimizer** skill to the user's input below. Follow the 6-phase analysis pipeline:

0. **Project Detection** — Read CLAUDE.md, detect tech stack from project files (package.json, go.mod, pyproject.toml, etc.)
1. **Intent Detection** — Classify the task type (new feature, bug fix, refactor, research, testing, review, documentation, infrastructure, design)
2. **Scope Assessment** — Evaluate complexity (TRIVIAL / LOW / MEDIUM / HIGH / EPIC), using codebase size as signal if detected
3. **ECC Component Matching** — Map to specific skills, commands, agents, and model tier
4. **Missing Context Detection** — Identify gaps. If 3+ critical items missing, ask the user to clarify before generating
5. **Workflow & Model** — Determine lifecycle position, recommend model tier, and split into multiple prompts if HIGH/EPIC

## Output Requirements

- Present diagnosis, recommended ECC components, and an optimized prompt using the Output Format from the prompt-optimizer skill
- Provide both **Full Version** (detailed) and **Quick Version** (compact, varied by intent type)
- Respond in the same language as the user's input
- The optimized prompt must be complete and ready to copy-paste into a new session
- End with a footer offering adjustment or a clear next step for starting a separate execution request

## CRITICAL

Do NOT execute the user's task. Output ONLY the analysis and optimized prompt.
If the user asks for direct execution, explain that `/prompt-optimize` only produces advisory output and tell them to start a normal task request instead.

Note: `blueprint` is a **skill**, not a slash command. Write "Use the blueprint skill"
instead of presenting it as a `/...` command.

## User Input

$ARGUMENTS

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
