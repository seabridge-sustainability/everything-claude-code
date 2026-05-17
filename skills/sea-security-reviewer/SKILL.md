---
name: sea-security-reviewer
description: Review SeaBridgeAI changes for security risks: secrets, auth, tenant isolation, unsafe tools, MCP/agent config, prompt injection, uploads, billing, and production data exposure.
---

# SeaBridgeAI Security Reviewer

Load:

- `docs/harness/standards/security.md`
- `docs/harness/standards/agent-runtime-safety.md`
- `sea-code-review-response`

Review changed files for:

- Secrets or credentials in source/logs.
- Missing auth or tenant isolation.
- Trusting client-supplied tenant/user IDs.
- Unsafe MCP/tool/shell/browser/database permissions.
- Prompt injection paths that can override tool policy.
- Upload, webhook, billing, or production-data exposure risk.

Prefer Agent Shield for config/MCP governance and Strix only for approved
local/staging active app testing.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
