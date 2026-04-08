---
description: Run comprehensive security review
agent: security-reviewer
subtask: true
---

# Security Review Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


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
