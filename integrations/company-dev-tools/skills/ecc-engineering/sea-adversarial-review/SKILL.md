---
name: sea-adversarial-review
description: Challenge a consequential design or implementation claim against protected invariants and evidence; use for requested doubt-driven review or high-impact uncertain decisions.
---

# Adversarial review

Adapted from Addy Osmani's doubt-driven-development. Use one primary review workflow and the existing goal. Ordinary code review and explicit Pstack interrogate retain their own routing.

1. State the consequential claim and why a failure matters. Mechanical edits and obvious operations do not need this workflow.
2. Prepare the smallest relevant artifact, exact revision, requested behavior and protected invariants. Keep the author's hypothesis and rationale out of the reviewer packet to reduce agreement bias. Redact private data and secrets.
3. If the task authorizes independent delegation and the host supports it, give a fresh-context reviewer the artifact and contract. Ask for concrete counterexamples, boundary violations, unstated assumptions and missing evidence. Do not spawn nested review chains, change models or call providers without the required authorization. If independent review is unavailable, perform a bounded self-critique and label it degraded self-review; independence is unverified. That limitation blocks only acceptance which actually requires independent review, not unrelated work.
4. Reproduce or substantiate findings against source/runtime evidence. Separate confirmed defects, material unverified claims and optional improvements. Reconcile each consequential finding. Preserve scientific provenance, missing values, tenant boundaries and existing behavior.
5. Stop when consequential findings are resolved or explicitly blocked. At most two unchanged unsuccessful review attempts before changing tactics; no recursive review loop. Recheck only changed artifacts or newly demonstrated risks. Approval and release gates remain the normal ECC gates.

For an already-authorized multi-model review, use the existing Pstack packet/review tools or configured review tooling; do not add another orchestrator. Existing live-model deferrals remain in force. Preserve reviewer identity and actual execution evidence; persona labels or fixture outputs do not establish independence or model diversity.

Output: artifact/revision, evidence-backed findings, reviewer mode (independent or degraded self-review), unresolved blockers and the next acceptance check. A review is not implementation approval, authenticated product proof or scientific validation.

Pinned sources and adaptation identity: [manifest](../../../../engineering-skills/adaptation.json). Existing skill and tool priority: [ECC policy](../../../../../docs/tools/MODEL_PROMPTING_AND_SKILL_POLICY.md).
