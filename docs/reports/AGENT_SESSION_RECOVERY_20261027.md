# Agent session recovery — 2026-10-27

Scope: owner-authorized local recovery and local commit. No push, model generation,
tenant ingestion, transcript modification, dependency installation, service reset,
or product-goal resumption. Gojiberry is excluded by the owner's latest instruction.

## Implemented and verified

- Added `scripts/agent-session-recovery.js`: read-only local readiness audit,
  hash-checked repair of the recognized retired memory-proxy path, and public
  Claude service-status checks. No credential values are printed or backed up.
  The repair preserves all configuration bytes except the single path argument.
  Its lock serializes this helper; a final hash rejects observed native-client
  edits. It cannot guarantee exclusion of uncooperative writers after that check.
- Replaced the missing worktree `gbrain_proxy.py` argument in user Claude config
  with the existing primary-backend implementation. Token reference and all other
  client fields were preserved. The non-secret rollback receipt is beside
  `.claude.json`, named `.claude.json.memory-path-recovery-7f3f0a7b9060.json`.
- Started the existing Relay controller. Native Claude successfully initialized
  its stdio MCP transport. No messages or task dispatches were sent.
- Started the existing Docker Desktop and existing WeKnora containers only.
  No images were pulled, containers recreated, volumes deleted, or bootstrap run.
  WeKnora API `/health` and UI returned HTTP 200. The authenticated local bridge's
  `tools/list` returned `grep_chunks`, `list_documents`, `list_knowledge_bases`,
  `read_document`, and `search_knowledge`. No retrieval/generation was requested.
- Removed only `weknora` from the backend project's disabled-server list after
  verifying its MCP contract. Prior disabled lists are saved in the owner-local
  `.omniroute/weknora-enable-recovery-20261027.json` rollback receipt.
- Refreshed only the existing Second Brain resume receipt using the supported
  `--refresh-metadata` operation and its unchanged next action. Validation passed.
  The active-goal document was byte-identical before/after; prior evidence/history
  remained. This is metadata repair, not Second Brain product activation.
- Created a separate task-owned goal under
  `artifacts/agent-runs/agent-recovery-20261027`; validation and controlled Codex
  admission passed without replacing any default/shared product goal.
- Restored public status monitoring independently of chat lifetime: Windows task
  `SeaBridgeAI-Claude-Sonnet-status-20m`, every 20 minutes for three days, interactive
  user context, hidden, two-minute execution limit. No model calls, credentials,
  auto-switch-back, or messages. Latest result is overwritten at
  `~/.omniroute/logs/claude-status-latest.json`. The first request succeeded.
  The public page reported operational; that does not prove classifier recovery.
- Removed only the stale `mireye-earth` needs-auth cache entry after verifying that
  a Mireye OAuth record exists. Credential contents were neither printed nor
  changed. Subsequent connection testing found a TLS failure rather than proof of
  an absent sign-in.

## Remaining dependencies — not reported as fixed

| Dependency | Observed evidence | Required next action |
|---|---|---|
| Climate goal receipt | Validation reports stale backend HEAD/tree. ECC rejected this recovery session's metadata reservation because `climate-model-claude-v8c-20261026` owns it. | The owning session must check its receipt paths and perform the same-goal metadata refresh, or explicitly hand off those paths through ECC. No takeover or goal replacement. |
| Memory gateway | Proxy path is repaired; its referenced gateway token file is missing and port 11544 is not listening. | Locate the retained credential/controller and reconcile its current source/data bindings. Do not generate a substitute token, weaken authentication, run archived cutover scripts, or reopen retired stores. |
| T3 | Existing desktop controller reached port 3773, then exited. Desktop trace records normal `windowAllClosed` lifecycle events. | Keep the owner's T3 desktop window open before retrying MCP. Do not install a new daemon, run `t3 serve/connect`, or loop automatic relaunches. |
| Mireye | Python TLS handshake fails with `WRONG_VERSION_NUMBER`; Windows curl reports `SEC_E_INVALID_TOKEN`; Node reports `ERR_SSL_PACKET_LENGTH_TOO_LONG`. | Resolve endpoint/network TLS readiness before retrying client login. Do not disable certificate validation, downgrade to HTTP, substitute REST API keys for MCP OAuth, or request billable data. |
| REA native | Native Claude reaches the configured WSL launcher but initialization exceeds 30 seconds. A basic Ubuntu startup probe also exceeds its diagnostic timeout. | Resolve the Ubuntu startup dependency without terminating/resetting shared WSL or increasing all MCP timeouts blindly. Existing Windows REA remains separate. |

## Commands and ownership

Run from the ECC primary checkout:

```powershell
node scripts/agent-session-recovery.js
node --test tests/scripts/agent-session-recovery.test.js
node scripts/agent-session-recovery.js --check-claude-status
```

The repair switch requires the hash from a fresh audit, not a historical hash:

```powershell
node scripts/agent-session-recovery.js --repair-memory-path --expect-sha256 <fresh-configSha256>
```

For the Climate receipt, only its owning session should run the following in the
backend checkout, with its actual current next action. Check ownership of
`.ecc/goal/resume-receipt.yaml` and `.ecc/goal/resume-history.jsonl` first:

```text
ecc session renew --session climate-model-claude-v8c-20261026
ecc session check-write --session climate-model-claude-v8c-20261026 --path .ecc/goal/resume-receipt.yaml --path .ecc/goal/resume-history.jsonl
ecc goal resume --dir .ecc/goal --refresh-metadata --next-action <unchanged-current-next-action-verbatim>
ecc goal validate --dir .ecc/goal
```

Implementation admission is a separate step in the actual authorized task:
`ecc goal-runtime admit --runtime claude --mode controlled --session <actual-id>`.
A new chat must register its own identity and use its actual task goal. Do not
reuse a stale owner ID or the default Climate goal to admit unrelated Nature work.
Metadata validation does not authorize paused implementation to resume.

## Rollback and limits

Restore only the changed memory argument or WeKnora disabled-list entry from the
field-level rollback receipts, after checking current configuration for concurrent
edits. Never restore an older entire credential-bearing config over new changes.
Stopping the named status task stops future public checks; it does not alter
Claude sessions. Service stops remain owner-coordinated to preserve other users.
The temporary Haiku classifier setting, permission checks, instruction files and
all other agents' source changes remain untouched.
