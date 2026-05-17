---
name: grill-me
description: SeaBridgeAI wrapper for Matt Pocock's grill-me skill. Use to adversarially clarify ambiguous requirements, expose hidden assumptions, validate acceptance criteria, and identify production-readiness risks before implementation.
---

# Grill Me

Use this as a focused supplement to `sea-brainstorming-and-spec-refinement` and
`sea-senior-dev-workflow`.

ECC vendored reference:
`C:\Users\adelm\SeaBridgeAI\everything-claude-code\references\matt-pocock-skills\skills\productivity\grill-me\SKILL.md`

## SeaBridgeAI Adaptation

Before edits, challenge the request until the implementation target is safe and
testable. Prefer codebase inspection over asking the user when the answer is
discoverable locally.

Check:

- Ambiguous requirements and hidden assumptions.
- Conflicting repo or runtime instructions.
- Missing acceptance criteria and done signals.
- Security, tenant isolation, data privacy, billing, AI-output, and provider-call risk.
- Backward compatibility and rollback expectations.
- Testability, observability, and operational failure modes.
- Whether a smaller, safer implementation satisfies the goal.

Ask one question at a time only when local inspection cannot answer it. Include
your recommended answer with each question.

## Guardrails

- Do not block simple, clear, low-risk requests with unnecessary interrogation.
- Do not authorize destructive actions, global installs, commits, pushes, paid
  calls, production scans, or unsafe autonomous execution.
- Once constraints are clear, proceed through the normal SeaBridge verification
  loop.
