---
name: karpathy-guidelines
description: Apply an explicit Karpathy-style simplicity and surgical-change review. Use only when the user asks for Karpathy guidance, a simplicity pass, or a surgical-change audit; ordinary implementation follows AGENTS.md without loading this skill.
---

# Karpathy-Style Review

This is an optional review lens, not a universal execution policy. The current
user request and the repository's `AGENTS.md` remain authoritative. In
particular, this skill does not override safety boundaries, required error
handling, repository verification rules, or permission gates.

## Review Lenses

### Surface assumptions

- Identify assumptions that could materially change the result.
- Ask only when a consequential choice cannot be resolved from repository
  evidence or a safe, reversible default.
- State the assumption when proceeding is safe; do not stop for cosmetic or
  easily reversible ambiguity.

### Prefer the simplest sufficient design

- Avoid speculative features, one-use abstractions, and configuration without
  a demonstrated need.
- Keep error handling that protects realistic failure boundaries; simplicity
  is not a reason to weaken security, reliability, or data integrity.
- Prefer established repository patterns over introducing a parallel system.

### Keep the change surgical

- Every changed line should support the requested outcome, its verification,
  or cleanup caused by the change.
- Preserve unrelated code and other sessions' work.
- Mention unrelated findings instead of expanding scope without authorization.

### Work toward observable success

- Define the result and the cheapest evidence that would prove it.
- Use focused checks first and broaden only when contracts, failures, or risk
  justify it.
- Report changed behavior, verification, skipped checks, and residual risk.

## Output

For a review, return only actionable simplifications:

1. location;
2. unnecessary complexity or scope;
3. smaller safe alternative;
4. evidence needed after the change.

Returning no findings is valid when the implementation is already focused.
