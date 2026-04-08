---
description: Save verification state and progress checkpoint
agent: build
---

# Checkpoint Command

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Save current verification state and create progress checkpoint: $ARGUMENTS

## Your Task

Create a snapshot of current progress including:

1. **Tests status** - Which tests pass/fail
2. **Coverage** - Current coverage metrics
3. **Build status** - Build succeeds or errors
4. **Code changes** - Summary of modifications
5. **Next steps** - What remains to be done

## Checkpoint Format

### Checkpoint: [Timestamp]

**Tests**
- Total: X
- Passing: Y
- Failing: Z
- Coverage: XX%

**Build**
- Status: PASS: Passing / FAIL: Failing
- Errors: [if any]

**Changes Since Last Checkpoint**
```
git diff --stat [last-checkpoint-commit]
```

**Completed Tasks**
- [x] Task 1
- [x] Task 2
- [ ] Task 3 (in progress)

**Blocking Issues**
- [Issue description]

**Next Steps**
1. Step 1
2. Step 2

## Usage with Verification Loop

Checkpoints integrate with the verification loop:

```
/plan Ã¢â€ â€™ implement Ã¢â€ â€™ /checkpoint Ã¢â€ â€™ /verify Ã¢â€ â€™ /checkpoint Ã¢â€ â€™ implement Ã¢â€ â€™ ...
```

Use checkpoints to:
- Save state before risky changes
- Track progress through phases
- Enable rollback if needed
- Document verification points

---

**TIP**: Create checkpoints at natural breakpoints: after each phase, before major refactoring, after fixing critical bugs.
