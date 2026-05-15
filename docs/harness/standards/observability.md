# Observability Standard

## Rule: Important Flows Need Correlation And Failure Context

Required behavior: backend jobs, provider calls, report generation, AI runs,
imports, exports, webhooks, and CLI smokes must log request/job identifiers,
safe status, duration, and redacted failure context.

Prohibited behavior: silent failure, raw secret logging, and unstructured
multi-line dumps in normal paths.

Automated enforcement: advisory scan and reviewer skill.

Fallback reviewer: `sea-reliability-reviewer` or
`sea-production-readiness-reviewer`.
