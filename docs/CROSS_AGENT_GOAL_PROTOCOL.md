# Cross-Agent Goal Protocol

SeaBridgeAI treats `/goal` and auto-loop as the same operating mode across coding agents. `/goal` is the user-facing command; auto-loop is the autonomous persistent execution behavior.

## Equivalent Invocations

| Agent | Invocation | Required behavior |
|---|---|---|
| Claude Code | `/goal <task>` | Enter autonomous persistent execution mode. |
| Codex | `$goal <task>` or `goal-default` skill | Apply the same protocol even when slash commands are unavailable. |
| Gemini | `goal:` or `/goal` | Apply the same protocol and repo/ECC priority order. |
| OpenCode | `/goal` or equivalent command | Apply the same protocol and validation evidence rules. |
| Cursor | Implementation request or `goal:` | If slash commands are unsupported, inherit goal protocol by default. |
| Copilot CLI | Implementation request or `goal:` | If slash commands are unsupported, inherit goal protocol by default. |
| Windsurf | Implementation request or `goal:` | If slash commands are unsupported, inherit goal protocol by default. |
| Cline | Implementation request or `goal:` | If slash commands are unsupported, inherit goal protocol by default. |
| Hermes | Implementation request or `goal:` | If slash commands are unsupported, inherit goal protocol by default. |

## Load Order

1. Current user/developer instructions and safety constraints.
2. Repo-local `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `GEMINI.md`, `OPENCODE.md`, or equivalent.
3. `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`.
4. `goal-default` skill and relevant `sea-*`, GSD, Spec Kit, QA, review, or domain skills.
5. Repo workflows, checklists, and prior handoffs.

## Required Final Evidence

Every agent must report files changed, commands run, tests run, validation results, errors encountered, fixes applied, unverified items, remaining risks, and whether the Definition of Done is satisfied. The phrase "complete" is prohibited unless accompanied by validation evidence.

## Stuck Behavior

After 2 identical failures, agents must stop repeating the same action, inspect logs, change strategy, isolate the problem, reduce scope, try a different validation path, and document exact blockers if unresolved. Hung processes must be stopped safely and replaced with smaller checks or alternate routes.

## Safety

The goal protocol never authorizes commits, pushes, dependency installs, paid or live provider calls, migrations, production data changes, destructive actions, protected-branch work, global installs, or disabled-hook changes without explicit approval.
