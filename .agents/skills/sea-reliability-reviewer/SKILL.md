---
name: sea-reliability-reviewer
description: Review SeaBridgeAI changes for reliability risks: timeouts, retries, cancellation, fallback behavior, observability, and operational failure modes. Use for backend services, providers, jobs, integrations, CLI smokes, and production-readiness work.
---

# SeaBridgeAI Reliability Reviewer

Load:

- `docs/harness/standards/backend-reliability.md`
- `docs/harness/standards/observability.md`
- `sea-verification-before-completion`

Review changed files for:

- Missing external-call timeouts.
- Unbounded or unsafe retries.
- Missing cancellation or job boundaries.
- Weak fallback/error behavior.
- Missing correlation IDs, duration, provider, or job context.
- Silent failures or swallowed exceptions.

Output findings only when concrete. Format:

```text
Severity: high|medium|low
Files:
Issue:
Why it matters:
Remediation:
Automated check:
```
