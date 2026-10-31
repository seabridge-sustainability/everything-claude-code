# Hermes native pre-tool guard

`scripts/hooks/hermes-scope-guard.js` connects Hermes's supported
`pre_tool_call` shell hook to ECC's existing registered scope guard. It is not a
new coordinator or a claim that installed/running agents are protected.

The installed Hermes 0.22.5 chat client executes its turns in the gateway
(`hermes_cli.main.cmd_chat`, `gateway_chat_startup` and `gateway_agent`). A fresh
client's ECC environment is not a binding of that execution process. Do not add
Hermes to protected fresh launches merely because the client inherits these
variables. First verify the exact execution gateway/profile, native session and
parent binding at the actual hook invocation. Preserve the existing healthy
gateway; client launch, hook consent and gateway activation are separate steps.

The parent must register a fresh owned session, bind the exact current goal and
observed **Hermes session ID**, choose a deadline within that lease and finite
tool/turn limits, and protect controller/configuration paths. Reuse the exported
`session-coordination.goalReference` and `execute('guard-bind', ...)` APIs with an
explicit `goalReference`. Do not let the model select these bindings or silently
bind the repository's default goal. The native Orca Dispatch/process incarnation
and engineering acceptance remain separately bound by `orca-acceptance`.

For a newly admitted Hermes process, the parent supplies these environment values:

- `ECC_SESSION_ID`: registered ECC session.
- `ECC_OWNED_WORKTREE`: exact admitted checkout.
- `ECC_HERMES_GOAL_FILE`: exact goal in the parent guard's `goalReference`.
- `ECC_HERMES_GUARD_SHA256`: reviewed SHA-256 of the adapter source.
- `NODE_PATH`, when needed: existing reviewed ECC dependencies; never reinstall.

Configure the intended profile through Hermes's supported `hooks:` mechanism:

```yaml
hooks:
  pre_tool_call:
    - command: 'node "<reviewed-ECC-root>/scripts/hooks/hermes-scope-guard.js" pre'
      matcher: '.*'
      timeout: 10
      fail_closed: true
```

The operator must review and consent to the exact native hook normally. Do not
write Hermes's consent allowlist, use `--accept-hooks`, auto-enable profiles, or
change a running gateway on the owner's behalf. An absent/unconsented hook does
not execute, so external launch admission must refuse to call that process
protected. This adapter does not add Hermes to `fresh-agent-session`'s supported
launches: that still needs verified profile/consent/startup wiring.

The native wire format is `{hook_event_name, tool_name, tool_input, session_id,
cwd, extra}`. Single-path `read_file`, `write_file` and `patch` replacement calls
are mapped to existing typed controller operations. All other tools/multi-file
patch modes are blocked, including terminal, code execution, MCP, network and
delegation. A successful `{}`/exit 0 contributes no veto; native
`{action: block, message: ...}`/exit 2 blocks the call. `fail_closed: true` also
blocks adapter crashes and timeouts at the native shell-hook boundary.

The existing controller verifies current identity, goal revision, lease, scope,
protected paths and cumulative attempted-tool budget. Reads follow its existing
read policy; this is not a general private-data read sandbox. Turn/provider/USD
metering, authenticated native dispatch, final acceptance and remote evidence are
separate requirements. A raw `guard-event final` is not goal completion, and
Hermes's bounded `pre_verify` nudge is not an unconditional final veto.

Activation acceptance must exercise actual allowed/blocked calls in a fresh
consented Hermes session, changed goal/identity/deadline negatives, owner stop and
restart without rebinding/replay, then the normal signed parent acceptance path.
Native shell-hook parsing/dispatch with synthetic input is integration evidence
for this boundary only; it is not live model or whole-goal completion proof.

For gateway execution, use the exact-session binding mode instead of assuming
client ECC environment reaches the hook. The parent creates the native session
without a prompt, records its returned ID, registers/binds the ECC guard, and
creates an immutable JSON file outside that worker's write scopes containing:
`version: 1`, `nativeSessionId`, `profileName`, `profileHome`, `cwd`, `sessionId`,
`goalFile`, `sourceSha256`, and `nodePath` (the existing reviewed `node_modules`
directory). Pin that file's SHA-256 in the normally reviewed/consented command:

```text
node "<reviewed-ECC-root>/scripts/hooks/hermes-scope-guard.js" pre --binding-file "<absolute-parent-binding.json>" --binding-sha256 <SHA256>
```

Keep `matcher: '.*'`, `timeout: 10`, `fail_closed: true`. For that exact native
session, the adapter checks the current profile/home, source/file pins, existing
dependencies, controller identity, goal, lease and budgets. It resolves tools
relative to the parent-bound workspace; native `cwd` is the gateway process cwd.
Other well-formed native sessions receive no veto from this hook and are
**unmanaged by it**, not protected or approved. A bad binding can veto calls for
the whole configured hook, so validate it before requesting profile activation.
Never silently remove an old binding or reuse its native identity to escape a
stop. New assignments need fresh reviewed bindings; existing instances do not
become protected merely because this source was committed.

`discover_gateway_endpoint(home)` is read-only. Pass its already-ready endpoint
explicitly to `connect_gateway(endpoint=...)`; the default can start a daemon.
`runtime.describe` advertises the supported create fields. A fresh
`session.create` without a title returns `stored_session_id` before
`prompt.submit`. Record unique request/input identities before submission and
reconcile uncertain receipts without replay. Profile-hook consent/registration,
exact native interception, final acceptance and trustworthy billing still need
separate live proof. Do not use `accept_hooks`, `safe_mode` or bypass flags.
