# Agent Runtime Safety Standard

## Rule: Agents Must Execute Inside Explicit Boundaries

Required behavior: agents must load SeaBridgeAI instructions, state active
skills, plan before edits, verify before completion, and respect approval gates.

Prohibited behavior: hidden autonomous loops, destructive tool execution,
global installs, commits, pushes, paid calls, migrations, or production scans
without explicit approval.

Automated enforcement: Agent Shield, `check-agent-governance.ps1`, and
`check-agent-runtime-guardrails.ps1`.

Fallback reviewer: `sea-security-reviewer`.

## Rule: Reasoning, Logs, And User-Facing Output Stay Separate

Required behavior: reports should include concise evidence and commands, not raw
private reasoning or prompt internals.

Prohibited behavior: leaking chain-of-thought, prompts, credentials, or raw
retrieved sensitive content into user-facing docs.
