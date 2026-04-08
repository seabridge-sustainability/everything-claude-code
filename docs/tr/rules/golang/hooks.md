---
paths:
  - "**/*.go"
  - "**/go.mod"
  - "**/go.sum"
---
# Go Hooks

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


> Bu dosya [common/hooks.md](../common/hooks.md) dosyasÃ„Â±nÃ„Â± Go'ya ÃƒÂ¶zgÃƒÂ¼ iÃƒÂ§erikle geniÃ…Å¸letir.

## PostToolUse Hooks

`~/.claude/settings.json` iÃƒÂ§inde yapÃ„Â±landÃ„Â±r:

- **gofmt/goimports**: Edit'ten sonra `.go` dosyalarÃ„Â±nÃ„Â± otomatik formatla
- **go vet**: `.go` dosyalarÃ„Â±nÃ„Â± dÃƒÂ¼zenledikten sonra statik analiz ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
- **staticcheck**: DeÃ„Å¸iÃ…Å¸tirilen paketlerde geniÃ…Å¸letilmiÃ…Å¸ statik kontroller ÃƒÂ§alÃ„Â±Ã…Å¸tÃ„Â±r
