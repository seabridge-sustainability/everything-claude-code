---
description: Run comprehensive security review
agent: security-reviewer
subtask: true
---

# Security Review Command

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


Conduct a comprehensive security review: $ARGUMENTS

## Your Task

Analyze the specified code for security vulnerabilities following OWASP guidelines and security best practices.

## Security Checklist

### OWASP Top 10

1. **Injection** (SQL, NoSQL, OS command, LDAP)
   - Check for parameterized queries
   - Verify input sanitization
   - Review dynamic query construction

2. **Broken Authentication**
   - Password storage (bcrypt, argon2)
   - Session management
   - Multi-factor authentication
   - Password reset flows

3. **Sensitive Data Exposure**
   - Encryption at rest and in transit
   - Proper key management
   - PII handling

4. **XML External Entities (XXE)**
   - Disable DTD processing
   - Input validation for XML

5. **Broken Access Control**
   - Authorization checks on every endpoint
   - Role-based access control
   - Resource ownership validation

6. **Security Misconfiguration**
   - Default credentials removed
   - Error handling doesn't leak info
   - Security headers configured

7. **Cross-Site Scripting (XSS)**
   - Output encoding
   - Content Security Policy
   - Input sanitization

8. **Insecure Deserialization**
   - Validate serialized data
   - Implement integrity checks

9. **Using Components with Known Vulnerabilities**
   - Run `npm audit`
   - Check for outdated dependencies

10. **Insufficient Logging & Monitoring**
    - Security events logged
    - No sensitive data in logs
    - Alerting configured

### Additional Checks

- [ ] Secrets in code (API keys, passwords)
- [ ] Environment variable handling
- [ ] CORS configuration
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Secure cookie flags

## Report Format

### Critical Issues
[Issues that must be fixed immediately]

### High Priority
[Issues that should be fixed before release]

### Recommendations
[Security improvements to consider]

---

**IMPORTANT**: Security issues are blockers. Do not proceed until critical issues are resolved.
