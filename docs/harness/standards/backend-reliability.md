# Backend Reliability Standard

## Rule: External Calls Must Be Bounded

Rationale: unbounded HTTP, SDK, OCR, RAG, AI, and webhook calls can hang workers
and hide provider failures.

Required behavior: use explicit timeouts, bounded retries, observable errors,
and safe fallbacks for external calls.

Prohibited behavior: naked `requests.get/post`, `httpx.get/post`,
`aiohttp.ClientSession`, provider SDK calls, or subprocess/network calls with no
timeout or cancellation boundary.

Affected files/modules: backend services, connectors, AI providers, webhooks,
report generation, OCR/RAG utilities, CLI smoke tools.

Automated enforcement: `scripts/check-backend-guardrails.ps1` scans owned Python
source for network-call patterns with missing timeout markers. It skips tests,
virtualenv/cache/build output, and vendored `mindsdb` content by default.

Fallback reviewer: `sea-reliability-reviewer`.

## Rule: Retry Policy Must Be Bounded

Required behavior: retries must have max attempts, backoff, and retryable error
classification.

Prohibited behavior: infinite retry loops, broad `except Exception: retry`, or
sleep loops without caps.

Automated enforcement: advisory scan for retry loops and broad retry patterns.

## Rule: Tenant/Auth Boundaries Must Be Explicit

Required behavior: protected routes must depend on auth context and must filter
data by tenant/user/workspace ownership where relevant.

Prohibited behavior: route handlers that expose records without auth dependency,
tenant filter, or documented public-route exemption.

Automated enforcement: structural route scans and reviewer checks.
