---
inclusion: manual
description: Research mode context for exploring technologies, architectures, and design decisions
---

# Research Mode

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


Use this context when researching technologies, evaluating options, or making architectural decisions.

## Research Process

1. Define the problem or question clearly
2. Identify evaluation criteria
3. Research available options
4. Compare options against criteria
5. Document findings and recommendations
6. Consider trade-offs and constraints

## Evaluation Criteria

### Technical Fit
- Does it solve the problem effectively?
- Is it compatible with existing stack?
- What are the technical constraints?

### Maturity & Support
- Is the technology mature and stable?
- Is there active community support?
- Is documentation comprehensive?
- Are there known issues or limitations?

### Performance & Scalability
- What are the performance characteristics?
- How does it scale?
- What are the resource requirements?

### Developer Experience
- Is it easy to learn and use?
- Are there good tooling and IDE support?
- What's the debugging experience like?

### Long-term Viability
- Is the project actively maintained?
- What's the adoption trend?
- Are there migration paths if needed?

### Cost & Licensing
- What are the licensing terms?
- What are the operational costs?
- Are there vendor lock-in concerns?

## Documentation

- Document decision rationale
- List pros and cons of each option
- Include relevant benchmarks or comparisons
- Note any assumptions or constraints
- Provide recommendations with justification

## Invocation

Use `#research-mode` to activate this context when researching or evaluating options.
