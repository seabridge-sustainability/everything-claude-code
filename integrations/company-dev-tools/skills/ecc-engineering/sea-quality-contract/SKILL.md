---
name: sea-quality-contract
description: Define or review task quality constraints, protected behavior and existing executable checks when acceptance or quality requirements are missing or disputed.
---

# Quality contract

Adapted from Addy Osmani's constraint-driven-development. Central policy controls permissions and required gates. This document is a workflow, not another policy authority.

1. Read existing requirements, scripts, CI gates and the active goal. Reuse the checks and budgets already owned by the project.
2. Record each applicable constraint with its reason, affected scope, existing checker/command, evidence prerequisite and execution stage. Distinguish an approved requirement, a measured baseline and an unverified proposal. Do not invent coverage, performance, scientific or financial thresholds.
3. Keep this information in the existing ECC goal/task record. If a structured artifact is useful, use ECC artifacts/agent-runs/pstack/quality/<task-id>/contract.json; a durable reviewed contract can live in ECC. Upstream CONSTRAINTS.md is reference material. Do not add CONSTRAINTS.md, constraints.mmd, GLOSSARY.md or extra instruction files to backend/frontend/other projects merely to run this workflow. Read an existing applicable contract when present.
4. Place cheap checks near relevant edits; run affected tests at feature verification and preserve mandatory release checks at publication. Select tests by behavior and risk. No universal TDD, coverage percentage, per-task commit, full-suite rerun or dependency installation.
5. Review the diff for weaker assertions, skips, removed checks, new suppressions, changed thresholds and concealed stubs. Assess context: intentional behavior changes can require test changes; record the evidence rather than treating every edit as evasion. Never loosen a required gate to obtain a pass.
6. Use sea-verify-seabridge and the existing harness for actual execution. Record PASS, FAIL or BLOCKED for each required check; missing infrastructure is not success. Readiness, authenticated behavior, durable persistence, science and deployment are separate evidence stages.

Risk guidance: a reversible presentation tweak needs a focused check; a feature needs affected contract and journey evidence; tenant/auth, irreversible or scientific changes need protected invariants and stronger independent evidence. Impact governs risk, not file count. Adversarial review supports a consequential change; it does not start a second goal.

Written guidance alone does not enforce a gate. Name the actual running checker before claiming enforcement. Output: the smallest useful quality contract and the results or prerequisites of its checks.

Pinned sources and adaptation identity: [manifest](../../../../engineering-skills/adaptation.json). Existing skill and tool priority: [ECC policy](../../../../../docs/tools/MODEL_PROMPTING_AND_SKILL_POLICY.md).
