# Coding-agent system efficiency review — 2026-09-27

## Outcome

This iteration reduced default context, made instruction and skill adapters testable,
and bounded GitHub Actions fan-out without weakening the canonical safety contract.

## Changes

- Default ECC MCPs: 10 to 2 (`chrome-devtools` and the explicitly retained
  GitHub integration), both version-pinned. The project change does not modify
  the requested Slack or Calendar user-level connectors; other project MCPs stay
  on demand instead of entering every session.
- Cursor startup rules: nine stale always-loaded copies (about 38.5K characters)
  to one generated 5.3K-character baseline. The remaining common rules are
  generated, opt-in adapters.
- Gemini: the ECC adapter now imports `AGENTS.md` instead of eagerly loading an
  approximately 84K-character duplicate stack and an optional missing vendor file.
  The same thin-adapter pattern was applied to autoresearch, OpenSeaBri,
  CLIMADA-stack, and `_upstream`.
- Codex skills: generated wrappers use checkout-relative canonical pointers and
  trigger-bearing descriptions. Stale universal-TDD, fixed-coverage, and timed
  verification copies were removed.
- Skill routing: load the minimum applicable set; explicit and mandatory risk
  triggers win. Small low-risk changes do not require a skill ceremony.
- Verification: review, security, performance, and test guidance is scoped to the
  touched risk boundary. Manual UI and runtime checks are required when behavior
  cannot be proven by static tests alone.
- Evals: instruction scenarios fail closed on failed or missing requirements;
  advisory mode is explicit. Canonical skill validation is strict while the
  localized documentation backlog remains warning-only.
- GitHub Actions: one full Node test lane replaces 33 full-suite matrix runs.
  Five runtime/package-manager lanes run one focused smoke test; Windows and
  macOS run compact platform-specific hook, installer, migration, and MCP checks.
  Tag-triggered duplicate CI and duplicate scheduled audits were removed; coverage
  runs only for pull requests; supply-chain watch runs daily with cancellation.
- Workflow security: third-party Actions are commit-SHA pinned. Harness workflows
  have path filters, least privilege, timeouts, and concurrency cancellation.
- Local secret scanning reports detector, file, and line only; it does not echo
  the secret-bearing source line.

## Verification

- Agent-system efficiency contract: 6/6.
- Instruction stack: 13/13.
- Plugin manifest: 68/68.
- Validators: 188/188.
- Codex skill surface: 4/4.
- Workflow security: 26/26 plus live validator pass.
- Packed release artifact: 24/24.
- Supply-chain IOC checks: 22/22; advisory-source checks: 10/10.
- Generated Cursor and Codex wrapper parity checks pass.
- Strict canonical skill validation passes. It still reports 120 pre-existing
  localized-document encoding warnings, deliberately outside this change.

The full Windows suite was also sampled once. Failures unrelated to this change
remain in platform-specific shell fixtures and stale translated catalog counts;
focused tests covering every modified contract passed.

## Operating policy

Use local focused verification before any push, batch related changes into one
verified commit, and mark documentation/agent-system-only commits `[skip actions]`.
Do not use speculative pushes to discover failures. A second push is justified
only for a reproduced CI-only issue after reassessing the complete failure set.
