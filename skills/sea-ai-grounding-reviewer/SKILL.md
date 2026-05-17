---
name: sea-ai-grounding-reviewer
description: Review SeaBridgeAI AI, report, RAG, LCA, emissions, risk, and due-diligence changes for grounding, citations, unsupported claims, confidence, units, provenance, safe fallback, and prompt-injection risk.
---

# SeaBridgeAI AI Grounding Reviewer

Load:

- `docs/harness/standards/ai-grounding.md`
- `sea-ai-data-integrity`
- `sea-sustainability-domain-review`

Review changed files for:

- Unsupported or uncited claims.
- Missing confidence, source, geography, timeframe, units, or scenario.
- Fabricated sustainability data or fake provider results.
- Prompt injection paths.
- Unsafe fallback behavior.
- User-facing chain-of-thought or prompt leakage.

Demand evidence objects or documented `NEEDS EVIDENCE` flags for uncertain
claims.

<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_START -->
## /goal Inheritance

This skill inherits the SeaBridgeAI `/goal` default protocol. Before implementation or review, establish the persistent goal, Definition of Done, validation plan, affected systems, dependencies, risks, and expected artifacts. Continue through validation and fixes until the DoD is satisfied or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_SKILL_INHERITANCE_END -->
