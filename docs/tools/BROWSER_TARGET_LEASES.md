# Existing-browser target admission

`scripts/lib/workspace-queue.js` supports `browser-target` for independently owned,
background-only operations on existing CDP tabs. It uses the existing queue store,
machine index, RAM accounting, owner-bound token, final publication recheck and
cessation-dependent release. A queue receipt grants no browser or data authority.

The reviewed ROOT controller assigns one actual navigator chat/session to one
existing target and issues that operation's source, privacy, input, output,
deadline and custody contract. ROOT coordinates these permissions and integrates
results; eligible independent targets need not be executed by ROOT itself.
Neither this queue kind nor a worker count grants navigation, private reads or
capture permission. Consumed one-shot capture grants remain consumed.

## Entry and identity

Add the following fields to the normal queue entry; its other required fields
(`id`, `owner`, goal, timestamps, reason, dependencies and positive `peakRamGiB`)
are unchanged:

```js
{
  kind: 'browser-target',
  resource: exactExistingCdpTargetId, // 32 hexadecimal characters
  backgroundOnly: true,
  browser: {
    hostId: trustedCanonicalHostId,
    bootId: nativeLinuxBootUuid,
    pid: actualChromePid,
    startTicks: nativeChromeStartTicks, // canonical positive decimal strings
    profileDevice: nativeProfileDevice,
    profileInode: nativeProfileInode
  }
}
```

The key excludes worker identity and changing observation/deadline fields, so two
owners cannot acquire the same target by renaming a job. Case variants of the CDP
target ID share a slot. Distinct native browser epochs, profiles or targets have
distinct slots, subject to aggregate RAM and the existing authority gate. These
Linux native identities are not a portable browser-discovery API; unsupported or
unknown identities fail closed.

## Activation for a new operation

1. Preserve the existing Chrome process, CDP endpoint and profile singleton lock.
   Read the approved native binding and assign the exact target to the navigator.
   Publish the actual chat/session ID, operation/source pins, bounded output,
   nonce, expiry, return/cancellation and closure responsibility through the
   existing controller admission. A proposed handoff is not an issued assignment.
2. Prepare a **new** reviewed producer/controller. Its `checkGate` must bind the
   complete browser identity, target, actual assigned owner and background-only
   operation to that admission, and revalidate native epoch, target custody,
   human-input/focus/privacy/source guards and deadline. The queue validates
   identity shape; it cannot observe or authorize a browser. Never let a worker
   choose alternative identity fields or supply its own approving gate.
3. Use `browser-target` in that new controller's enqueue and exact gate checks;
   capture and pin the updated queue dependency in its authority manifest. Keep
   the same shared `createMachineQueueGuard` index across participating stores.
   Keep heavyweight checks and shared foreground/focus operations on the existing
   serialized `heavy-check` path. `browser-target` refuses `backgroundOnly:false`;
   it is not a route for focus activation, profile mutation or human-input bypass.
   Legacy/new operations touching the same target must share actual custody;
   the gate must reject conflicting legacy operations that lack a target claim.
4. Acquire and recheck immediately before the permitted operation. An expired
   claim continues to reserve its target and RAM. After bounded work, release
   only with the existing owner token, authority checks and verified complete
   producer/process closure. Missing closure never permits takeover.
5. Pilot on two independently assigned existing targets: overlapping claims and
   permitted background operations must succeed; a second owner requesting either
   held target must be refused. Recheck human-input/focus and native identity
   before/after. Record custody return and exact cessation. This live pilot needs
   its own existing-scope admission; local fixture tests do not authorize it.

The retained `genuine-private-capture-20261026-0210` controller is source-pinned,
ROOT-only and consumed. Do not edit, repin, replay or relax it. Its output-absence
guard also remains intact. No existing producer automatically adopts this change.

## Local verification without browser access

Run `node tests/lib/workspace-queue-browser-target.test.js` and the existing
`workspace-queue.test.js`, `workspace-queue-store.test.js` and
`workspace-queue-cross-process.test.js` suites. Fixture authority is explicitly
synthetic; these tests use no browser, private page, provider or shared service.
They exercise actual independent stores and the common machine ledger, including
same-target conflicts, simultaneous distinct claims, aggregate RAM, stale/unknown
telemetry, custody withdrawal at publication, expired live claims and release.
