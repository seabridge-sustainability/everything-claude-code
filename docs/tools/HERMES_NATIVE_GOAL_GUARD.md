# Hermes native pre-tool guard

`scripts/hooks/hermes-scope-guard.js` connects Hermes's supported
`pre_tool_call` shell hook to ECC's existing registered scope guard. It is not a
new coordinator or a claim that installed/running agents are protected.

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
