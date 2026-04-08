# Reference Attribution and Licensing Notes

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


ECC v1.8.0 references research and workflow inspiration from:

- `plankton`
- `ralphinho`
- `infinite-agentic-loop`
- `continuous-claude`
- public profiles: [zarazhangrui](https://github.com/zarazhangrui), [humanplane](https://github.com/humanplane)

## Policy

1. No direct code copying from unlicensed or incompatible sources.
2. ECC implementations are re-authored for this repositoryÃ¢â‚¬â„¢s architecture and licensing model.
3. Referenced material is used for ideas, patterns, and conceptual framing only unless licensing explicitly permits reuse.
4. Any future direct reuse requires explicit license verification and source attribution in-file and in release notes.
