# Parallel agent and browser preflight

This is a read-only diagnostic over existing evidence, not a startup hook, new
authority store, browser controller or guarantee. It starts no client, model,
browser or provider job; changes no configuration; acquires/releases no lease;
and never archives, disconnects or restarts a chat.

Run from the ECC checkout:

```sh
node scripts/parallel-agent-preflight.js --help
node tests/scripts/parallel-agent-preflight.test.js
```

Supply existing absolute evidence paths and the actual original chat UUID:

```sh
node scripts/parallel-agent-preflight.js \
  --client-version 0.163.0 \
  --saved-config /absolute/path/to/config.toml \
  --root YOUR_ORIGINAL_CHAT_UUID \
  --proof /absolute/path/to/native-interval-proof.json \
  --min-children 25
```

The retained October 26 UI/UX receipt proved 25 overlapping workers; REA admitted
25 with a conservative peak of 24. The checker recomputes unique child-turn
overlap; admission alone does not become 25-way overlap. These historical
receipts are not bundled chat exports. See the [sanitized validation report](../reports/parallel-agents-browser-validation-20261026/README.md).
The default observation freshness window is300 seconds. Older evidence is
HISTORICAL. `--max-age-seconds N` can inspect a named older receipt within an
explicit diagnostic window, but cannot make its observation current or prove
that the same native runtime is still loaded.

Add `--refusal-proof ABS_PATH` for the retained
`FIRST_RECONNECT_ADMISSION_RESULT.json`. It identifies the historical three
children/next refused pattern, separately from later successful proofs. That
receipt names chats rather than UUIDs; the diagnostic does not manufacture an
exact root or current-cap binding from its label.

## Startup checklist

1. Read the central AGENTS and current owner goal. Identify the actual client,
   version, same original root UUID, assigned useful work and current resources.
   Reuse `workspace-queue status` for resource/owner facts; it grants no admission.
2. Inspect saved settings separately from loaded native state. For reviewed
   Codex0.163.0 the legacy `[agents]` leaf
   `max_concurrent_threads_per_session` and the separate V2
   `[features.multi_agent_v2]` leaf have different effects. Legacy1M does not
   establish the V2 ceiling. A V2 table cannot coexist with a boolean at that
   same TOML path. The checker reads only these numeric projections and supports
   the reviewed plain-table form; multiline strings and other unsupported forms remain UNVERIFIED.
3. Check existing actual native receipts for that root. Distinct admitted IDs,
   useful task bindings and overlapping actual turn intervals are separate facts.
   Saved settings and even a supported config/read response do not reveal a
   previously latched per-tree OnceLock value. This script cannot observe that
   current value, native interception or future capacity. Never launch cosmetic
   jobs to manufacture proof. Any genuinely needed native activation uses the
   supported owner-scoped procedure in
   [PARALLEL_CODING_AGENTS](../../../manageesg-backend/docs/ai-tools/PARALLEL_CODING_AGENTS.md);
   no shared-daemon/browser restart, automatic detach or new top-level chat.
4. For parallel browser work, inspect actual ROOT-issued navigator assignments,
   not proposed worker labels. Add `--assignment ABS_JSON` for each existing
   `rea.passive-target-assignment.v1` packet and `--queue ABS_JSON` for its
   canonical queue file (both repeatable, at most8 each). The diagnostic uses
   workspace-queue's actual `resourceKey`: host/boot/PID/start/profile device/inode
   plus target, independent of owner spelling. It reuses the passive adapter's
   retained producer/source verifier and checks source hashes, finite
   expiry, distinct navigator/owner identities and matching queue custody records;
   same-target aliases/conflicts fail. It does not create sample assignments.
5. An UNISSUED packet remains UNISSUED. Expired assignments/claims require
   reconciliation, never takeover. A matching running record is not process,
   target-custody or permission proof. Source hashes alone are not original
   source approval. Immediately before dispatch, the
   [canonical passive adapter](PASSIVE_BROWSER_PARALLEL_WORKPLAN.md) must perform
   its original executable/source review, current native-epoch/custody/privacy/
   input/focus/RAM/normal-admission checks and finite lease recheck. Keep foreground
   operations serialized and protected capture grants unchanged. No private
   page/session/content is read by this preflight. Issued packets use the existing
   adapter dependencies; on the approved AWS pilot, reuse its existing
   NODE_PATH=/home/ubuntu/SeaBridgeAI/previews/rea/manageesg-frontend/node_modules.
   Missing dependencies fail closed; do not install them as a preflight side effect.

Exit0 means only that the supplied saved V2 projection and sufficiently recent
native interval evidence satisfy the requested comparison, with any supplied
browser assignments matching their running queue records. It grants no authority.
Exit2 means unverified, inconsistent, unavailable or action-required evidence.
Output intentionally leaves effective loaded configuration, current native browser
identity and current target custody UNVERIFIED. It projects no credentials,
queue tokens, source bodies or private page values.

Codex proof does not establish Claude, Antigravity, Kimi, OpenCode or Gemini
capabilities. Use each installed client's supported controls and actual evidence;
absent clients remain UNVERIFIED. Native capacity and browser admission are
independent. This checklist supplements existing canonical runbooks, not policy.

## Delivery through acceptance

Use the existing goal and workplan to name one delivery owner for each journey,
from source integration through actual execution and settlement of its original
acceptance criterion. Record implementation, receiver integration and product
acceptance separately. Passing source checks or producing a handoff does not
establish that the running application loaded the candidate.

Before assigning a probe, identify the exact criterion and the evidence its
result can establish. A prerequisite observation may support the next step;
it must not receive credit for an unobserved dataset relationship, persistence
behavior or complete journey. Preparing a bounded discovery reader does not
require already knowing the relationship it is intended to discover. Declare
candidate predicates as exploratory, review their scope and retained outputs,
and leave unsupported relationships unknown. Source preparation grants no live
browser permission.

Delegate independent, admitted journeys on distinct targets to their navigation
owners. ROOT coordinates permissions and integration; it need not perform every
browser action. Preserve one controller per target, serialize shared focus and
keep special ROOT-only or single-use grants specific to their operation.

For each blocker, record the affected action, dependency owner, next concrete
attempt and known onset. An evidence publication date is not the blocker start;
leave an unknown onset unverified. Keep ready independent work moving, reconcile
new evidence before repeating a check, and retire superseded next actions rather
than rebuilding an already reviewed patch.

After reviewed source changes invalidate a resume snapshot, its normal owner
refreshes it at a safe checkpoint, preserving the complete recorded repository
set and revalidating changed inputs. Inherited acceptance stays unverified until
proved. Do not narrow fingerprints, overwrite another writer's goal or repeatedly
start tasks against an unchanged stale snapshot. A paused monitoring process and
separately authorized manual recovery are distinct; resuming either requires its
applicable owner instruction.

For release receipts, unavailable billing stays explicitly unknown. The
`unavailable` source applies only to that status; a zero incremental workflow
estimate does not establish account spending. Named owner approval, fresh
receipts, the 90 percent threshold and the hard spending stop still apply.
