# Recurring Issue Harness Refinement

Use this when the same class of bug, slop, or review finding appears more than
once.

```text
Recurring issue detected
  -> classify failure type
  -> identify root cause
  -> choose docs/lint/test/reviewer/CI enforcement
  -> implement smallest guardrail
  -> validate against existing codebase
  -> document enforcement path
```

## Classification

| Failure type | Preferred harness response |
|---|---|
| Ambiguous requirement | `grill-me`, acceptance criteria template |
| Terminology drift | `ubiquitous-language`, glossary update |
| Repeated architecture coupling | `improve-codebase-architecture`, structural test |
| Missing auth/tenant check | backend security standard, route test |
| Missing timeout/retry | backend reliability standard, scanner |
| Frontend dead state | frontend UX standard, Playwright or component test |
| Unsupported AI claim | AI grounding standard, output schema test |
| Agent unsafe config | Agent Shield rule, agent runtime standard |

## Output

For each new guardrail, record:

- Pattern.
- Root cause.
- Chosen enforcement level.
- Files changed.
- Validation command.
- False-positive risk.
- Rollback plan.
