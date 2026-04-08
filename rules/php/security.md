---
paths:
  - "**/*.php"
  - "**/composer.lock"
  - "**/composer.json"
---
# PHP Security

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> This file extends [common/security.md](../common/security.md) with PHP specific content.

## Input and Output

- Validate request input at the framework boundary (`FormRequest`, Symfony Validator, or explicit DTO validation).
- Escape output in templates by default; treat raw HTML rendering as an exception that must be justified.
- Never trust query params, cookies, headers, or uploaded file metadata without validation.

## Database Safety

- Use prepared statements (`PDO`, Doctrine, Eloquent query builder) for all dynamic queries.
- Avoid string-building SQL in controllers/views.
- Scope ORM mass-assignment carefully and whitelist writable fields.

## Secrets and Dependencies

- Load secrets from environment variables or a secret manager, never from committed config files.
- Run `composer audit` in CI and review new package maintainer trust before adding dependencies.
- Pin major versions deliberately and remove abandoned packages quickly.

## Auth and Session Safety

- Use `password_hash()` / `password_verify()` for password storage.
- Regenerate session identifiers after authentication and privilege changes.
- Enforce CSRF protection on state-changing web requests.

## Reference

See skill: `laravel-security` for Laravel-specific security guidance.
