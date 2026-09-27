---
description: "Risk-scoped security guidance; load for security-sensitive boundaries."
alwaysApply: false
---
# Security Guidelines

## Risk-Scoped Security Checks

Every change must avoid introducing secrets. Apply the remaining checks to the
boundaries actually touched:

- Validate untrusted input at system boundaries.
- Use parameterized database operations where queries changed.
- Review XSS and CSRF controls for affected browser-facing flows.
- Verify authentication, authorization, tenant isolation, and rate limiting
  for affected protected or abuse-sensitive endpoints.
- Keep errors and logs free of sensitive data.

## Secret Management

- NEVER hardcode secrets in source code
- ALWAYS use environment variables or a secret manager
- Validate that required secrets are present at startup
- If a secret may have been exposed, stop further propagation, report the
  affected scope without printing the value, and ask the credential owner to
  rotate it. Secret/auth configuration changes remain approval-gated.

## Security Response Protocol

If security issue found:
1. Stop the unsafe path and preserve evidence without exposing the secret
2. Use **security-reviewer** when the issue is material or cross-cutting
3. Fix critical issues within the authorized task
4. Escalate owner-only rotation or infrastructure actions
5. Search the relevant boundary for the same defect pattern
