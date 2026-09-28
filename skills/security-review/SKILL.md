---
name: security-review
description: Review an explicit security change or a material auth, tenant-isolation, secrets, payment, upload, cryptography, or trust-boundary change. Do not load for ordinary code merely because it accepts typed input.
metadata:
  origin: ECC
---

# Security Review

Review the changed trust boundary and realistic abuse cases. Repository-specific
security instructions and `AGENTS.md` take precedence over generic examples.
Do not manufacture unrelated CSRF, XSS, rate-limit, database, or dependency work.

## 1. Establish the boundary

Identify:

- protected asset and actor;
- trusted and untrusted inputs;
- authentication and authorization decision points;
- tenant, account, or role boundary;
- storage, logs, external calls, and failure behavior;
- exact files and behavior changed.

If the change does not cross a material trust boundary, perform the normal
risk-scaled review instead of expanding into a security project.

## 2. Check applicable risks

| Boundary | Questions |
|---|---|
| Authentication | Are credentials validated by the intended authority? Are expiry, revocation, replay, and failure paths correct? |
| Authorization and tenancy | Is access checked on every object lookup and mutation? Can identifiers cross tenants or roles? |
| Untrusted input | Is parsing bounded and schema-validated? Can input reach queries, templates, shells, paths, URLs, or deserializers unsafely? |
| Secrets and privacy | Can credentials, tokens, personal data, or sensitive payloads enter source, logs, errors, analytics, or client responses? |
| Files and URLs | Are size, type, path traversal, archive expansion, redirects, and server-side request risks handled where applicable? |
| State-changing requests | Are origin, session, replay, idempotency, and concurrency protections appropriate to the actual client model? |
| External and expensive operations | Are timeouts, cancellation, quotas, rate limits, and fail-closed/fail-open choices explicit? |
| Dependencies and configuration | Are versions, defaults, permissions, and deployment settings supported and reproducible? |

Use the framework's established defenses. Do not prescribe one cookie policy,
ORM, validation library, database feature, or rate limit for every architecture.

## 3. Prove findings

A reportable finding needs:

1. exact location;
2. attacker-controlled input or violated trust assumption;
3. concrete path to impact;
4. existing mitigation considered;
5. severity proportional to reachability and impact;
6. smallest safe remediation and a verification method.

Prefer a negative test that fails without the protection and passes with it.
For tenant or authorization bugs, exercise both allowed and forbidden access.
For secrets, use detectors that report file and line without echoing the value.

## 4. Report

List findings by severity with file and line, exploit/failure path, fix, and
verification. Separate confirmed findings from hardening suggestions. Returning
zero findings is valid when no concrete vulnerability is demonstrated.

Live scans, dependency upgrades, credential rotation, cloud changes, and paid
provider calls keep their normal approval requirements.
