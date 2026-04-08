---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
---
# TypeScript/JavaScript Testing

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Bu dosya [common/testing.md](../common/testing.md) dosyasÃ„Â±nÃ„Â± TypeScript/JavaScript'e ÃƒÂ¶zgÃƒÂ¼ iÃƒÂ§erikle geniÃ…Å¸letir.

## E2E Testing

Kritik kullanÃ„Â±cÃ„Â± akÃ„Â±Ã…Å¸larÃ„Â± iÃƒÂ§in E2E test framework'ÃƒÂ¼ olarak **Playwright** kullan.

## Agent DesteÃ„Å¸i

- **e2e-runner** - Playwright E2E testing uzmanÃ„Â±
