---
name: sea-requirements-discovery
description: Resolve material ambiguity in a feature or design, or conduct an explicitly requested Grill Me interview, using existing source and acceptance criteria.
---

# Requirements discovery

Adapted from Matt Pocock's grilling and grill-with-docs. Current project instructions and the existing ECC goal govern this workflow.

1. Read the request, latest corrections, affected source and existing acceptance evidence. Find environment facts yourself. A clear task needs no interview.
2. Separate known facts, reasonable reversible assumptions and unresolved decisions. Ask only decisions that change scope, behavior, data integrity or acceptance. Batch related questions; explain the recommended answer. Continue independent work while awaiting an answer.
3. For an explicitly requested detailed Grill Me session, work through dependent decisions in bounded rounds. Stop when the requested scope and acceptance are understood; do not explore unrelated branches or repeat answered questions.
4. Capture goal, affected surfaces, protected behavior, acceptance scenarios and unresolved decisions in the existing task/goal record. Reuse the current plan. Plan approval, when required, is one concrete checkpoint; already-authorized steps need no repeated approval.
5. Use the installed domain-modeling discipline only when terminology or a consequential architectural trade-off changes. Reuse existing glossary/ADR locations. If none exists, keep resolved terms and decision rationale in the ECC task record; do not create new product ruling files automatically. Hypothetical edge cases are examples, never scientific data or admitted risk results.

Do not invoke another model, spawn workers or publish tickets as a side effect. A specifically authorized Pstack arena may compare competing designs under the same goal. Existing grill-me and sea-grill-me-codex are explicit alternatives, not additional mandatory workflows.

Output: a compact acceptance contract, material assumptions and any remaining decision. Verification: the next implementation step is identifiable and each required outcome has an observable check.

Pinned sources and adaptation identity: [manifest](../../../../engineering-skills/adaptation.json). Existing skill and tool priority: [ECC policy](../../../../../docs/tools/MODEL_PROMPTING_AND_SKILL_POLICY.md).
