# ECC Outcome Control

ECC outcome control prevents long-running agents from reporting activity as
delivery. It is deliberately small and portable: human-readable goal and resume
records, append-only JSONL outcome receipts, atomic local writers, and a claim
validator shared by every harness.

Use it automatically for multi-day, multi-agent, provider-dependent, or
inherited goals. Goal admission and every handoff must refresh the active goal,
resume evidence, and next checkpoint before implementation continues. Do not
require it for ordinary small fixes.

## Files

Default paths are under `.ecc/goal/`:

```text
active-goal.yaml       current objective, proofs, lanes and forecast
outcomes.jsonl         create-only demonstrated outcome receipts
resume-receipt.yaml    successor's current-state verification
```

Keep project-local records ignored unless the team intentionally reviews and
promotes them. Never store credentials, raw private conversations, tenant data,
or customer inputs in these files.

## Active goal

```yaml
schema: ecc.active-goal.v1
goal_id: example-feature
objective: A real user can export the new report from the browser.
current_priority: Complete one authentic API-to-browser-to-export slice.
non_goals:
  - Do not call fixture output production acceptance.
user_visible_proofs:
  - id: report-export
    description: Authentic report appears in the browser and exports consistently.
    lane_id: product
    required_stage: export_verified
    required_evidence_kinds: [browser, export]
    required: true
lanes:
  - id: product
    description: API, browser, and export integration
    status: active
    blocker: null
    next_action: Bind the authenticated report response to the export flow.
owner_corrections: []
forecast:
  state: on_track
  confidence: medium
  basis: One comparable vertical slice was completed in four hours.
  critical_path: [report-export]
  likely_hours: 4
  next_checkpoint_at: 2026-10-01T18:00:00Z
  checkpoint_started_at: 2026-10-01T14:00:00Z
  checkpoint_proof_id: report-export
  updated_at: 2026-10-01T14:00:00Z
status: active
updated_at: 2026-10-01T14:00:00Z
```

Owner corrections replace conflicting execution order. Keep old plans for
history, but do not make agents reconcile contradictory active instructions.
Proof stages are independent claim types, not a ladder: scientific validation
does not prove that an API, UI, export, or deployment worked. Create separate
proofs for each result the goal requires.

## Outcome receipt

Each line of `outcomes.jsonl` is one `ecc.outcome-receipt.v1` JSON object. A
receipt advances only its named acceptance proof. Tests, commits, plans, source
inventories, and reports are not user-visible receipts by themselves.

```json
{"schema":"ecc.outcome-receipt.v1","receipt_id":"report-export-001","goal_id":"example-feature","acceptance_id":"report-export","stage":"export_verified","observed_at":"2026-10-01T17:10:00Z","environment":"development","commit":"0123456789abcdef0123456789abcdef01234567","evidence":[{"kind":"browser","ref":"artifacts/agent-runs/report-export/browser.png","sha256":"1111111111111111111111111111111111111111111111111111111111111111"},{"kind":"export","ref":"artifacts/agent-runs/report-export/report.pdf","sha256":"2222222222222222222222222222222222222222222222222222222222222222"}],"limitations":["Development environment only."],"source_harness":"codex","status":"accepted","outcome":"pass","supersedes":[]}
```

Never overwrite a false or stale receipt. Append a `retracted` receipt whose
`supersedes` list names the invalid receipt and explains the limitation.
Append a later accepted receipt with `outcome: fail` when the same proof
regresses. The latest non-retracted observation controls; the validator never
prefers an older success merely because it once passed.

## Resume receipt

A successor verifies the current repository and material handoff claims before
continuing. It records the last demonstrated result, exact next action, blocked
lanes, safe independent work, and observed/approved spending or an explicit
unknown value. A handoff cannot authorize actions or
prove its own completion claim.

## Commands

```powershell
ecc goal init --from goal-seed.yaml
ecc goal checkpoint --proof report-export --at 2026-10-01T18:00:00Z `
  --started-at 2026-10-01T14:00:00Z --basis "First vertical slice" --hours 4
ecc goal record --acceptance report-export --stage export_verified `
  --environment development --evidence browser=browser.png --evidence export=report.pdf
ecc goal resume --repo . --next-action "Verify the export" --last-result "Report rendered"
ecc goal handoff --repo . --next-action "Continue the verified export lane"
ecc goal validate
ecc goal status --json
ecc goal claim on-track
ecc goal claim blocked --resume .ecc/goal/resume-receipt.yaml
ecc goal claim complete
```

The default resume path is loaded automatically when it exists. For an
`on-track` claim, the validator requires a current resume receipt, a non-null
last user-visible result, and a passing receipt for the promised checkpoint
inside its current time window. Each receipt must use the proof's required
evidence kinds, include content hashes, and bind the observation to a commit and
environment. Tests, CI, commits, and source inventories cannot satisfy that
gate. Complete and on-track claims also compare the relevant receipt commit to
the current HEAD recorded by the fresh resume receipt, so success from an older
revision cannot silently cover newer code.

The write commands use same-directory atomic replacement and exclusive lock
files. `init` is create-only unless the requested goal is byte-equivalent,
`record` appends an idempotent outcome receipt, and `resume`/`handoff` preserve
an append-only history while refreshing the current resume record. They never
invoke a model, provider, CI service, deployment, or cloud API.

For claim commands, exit code `0` means the requested claim is supported, `2`
means the documents are valid but the claim is not supported, and `1` means
input or schema validation failed.

The canonical schema is `schemas/goal-control.schema.json`. Runtime and browser
evidence remain authoritative; the ledger only makes their relationship to the
goal explicit.
