# Security Specialist Review Checklist

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Scope: When SCOPE_AUTH=true OR (SCOPE_BACKEND=true AND diff > 100 lines)
Output: JSON objects, one finding per line. Schema:
{"severity":"CRITICAL|INFORMATIONAL","confidence":N,"path":"file","line":N,"category":"security","summary":"...","fix":"...","fingerprint":"path:line:security","specialist":"security"}
If no findings: output `NO FINDINGS` and nothing else.

---

This checklist goes deeper than the main CRITICAL pass. The main agent already checks SQL injection, race conditions, LLM trust, and enum completeness. This specialist focuses on auth/authz patterns, cryptographic misuse, and attack surface expansion.

## Categories

### Input Validation at Trust Boundaries
- User input accepted without validation at controller/handler level
- Query parameters used directly in database queries or file paths
- Request body fields accepted without type checking or schema validation
- File uploads without type/size/content validation
- Webhook payloads processed without signature verification

### Auth & Authorization Bypass
- Endpoints missing authentication middleware (check route definitions)
- Authorization checks that default to "allow" instead of "deny"
- Role escalation paths (user can modify their own role/permissions)
- Direct object reference vulnerabilities (user A accesses user B's data by changing an ID)
- Session fixation or session hijacking opportunities
- Token/API key validation that doesn't check expiration

### Injection Vectors (beyond SQL)
- Command injection via subprocess calls with user-controlled arguments
- Template injection (Jinja2, ERB, Handlebars) with user input
- LDAP injection in directory queries
- SSRF via user-controlled URLs (fetch, redirect, webhook targets)
- Path traversal via user-controlled file paths (../../etc/passwd)
- Header injection via user-controlled values in HTTP headers

### Cryptographic Misuse
- Weak hashing algorithms (MD5, SHA1) for security-sensitive operations
- Predictable randomness (Math.random, rand()) for tokens or secrets
- Non-constant-time comparisons (==) on secrets, tokens, or digests
- Hardcoded encryption keys or IVs
- Missing salt in password hashing

### Secrets Exposure
- API keys, tokens, or passwords in source code (even in comments)
- Secrets logged in application logs or error messages
- Credentials in URLs (query parameters or basic auth in URL)
- Sensitive data in error responses returned to users
- PII stored in plaintext when encryption is expected

### XSS via Escape Hatches
- Rails: .html_safe, raw() on user-controlled data
- React: dangerouslySetInnerHTML with user content
- Vue: v-html with user content
- Django: |safe, mark_safe() on user input
- General: innerHTML assignment with unsanitized data

### Deserialization
- Deserializing untrusted data (pickle, Marshal, YAML.load, JSON.parse of executable types)
- Accepting serialized objects from user input or external APIs without schema validation
