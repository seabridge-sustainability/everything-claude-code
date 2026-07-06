---
description: Update documentation for recent changes
agent: doc-updater
subtask: true
---

# Update Docs Command

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Update documentation to reflect recent changes: $ARGUMENTS

## Your Task

1. **Identify changed code** - `git diff --name-only`
2. **Find related docs** - README, API docs, guides
3. **Update documentation** - Keep in sync with code
4. **Verify accuracy** - Docs match implementation

## Documentation Types

### README.md
- Installation instructions
- Quick start guide
- Feature overview
- Configuration options

### API Documentation
- Endpoint descriptions
- Request/response formats
- Authentication details
- Error codes

### Code Comments
- JSDoc for public APIs
- Complex logic explanations
- TODO/FIXME cleanup

### Guides
- How-to tutorials
- Architecture decisions (ADRs)
- Troubleshooting guides

## Update Checklist

- [ ] README reflects current features
- [ ] API docs match endpoints
- [ ] JSDoc updated for changed functions
- [ ] Examples are working
- [ ] Links are valid
- [ ] Version numbers updated

## Documentation Quality

### Good Documentation
- Accurate and up-to-date
- Clear and concise
- Has working examples
- Covers edge cases

### Avoid
- Outdated information
- Missing parameters
- Broken examples
- Ambiguous language

---

**IMPORTANT**: Documentation should be updated alongside code changes, not as an afterthought.
