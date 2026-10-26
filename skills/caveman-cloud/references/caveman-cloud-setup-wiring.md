---
name: caveman-cloud-setup-wiring
description: >
  How to prepare each action a Caveman Cloud setup detection names: the held
  wiring change, each workload's slug in its traffic, and history imports the
  person uploads. Read from caveman-cloud-setup step 4.
---

# The action per detection

Read **caveman-cloud-setup** first: its rules bind every action here.

The answer's `detections` name one action each:

- `keep_litellm`, `keep_kong`, `add_otel_exporter`, or no gateway at all
  (`route_through_caveman`): prepare the wiring following **caveman-setup**
  and **caveman-setup-recipes**, plus caveman-cloud-setup's rules 3 and 4
  (record mode, one revert variable). Create the branch `caveman/setup`
  locally, commit the change there, and send the same edits with
  `cvm setup hold`: `purpose`, `branch`, `revert_variable` `CAVEMAN_SETUP` and
  `files` (a new file as `create`; an edit as exact
  `old` and `new` text with `before_sha256`, the SHA-256 of the file as the
  default branch holds it). The server refuses CI files, secrets, lockfiles,
  manifests, tests and agent instruction or config files; leave those to the
  person. Once published, the draft is a branch of their repository, so their
  CI runs on it; say so in the report.
- **Name each workload in its traffic.** Caveman files a finding under the
  agent its traffic names, and offers to fix it only for a workload the server
  registered from your inventory. So the wiring sends each workload's slug,
  exactly as you asserted it: direct wiring uses `GATEWAY/w/<workload>` as the
  base URL (caveman-setup's app slug is the workload slug here), or the
  header `x-cave-agent: <workload>` on each call where workloads share one
  client. A LiteLLM or Kong path sends `x-cave-agent: <workload>` on its
  export or forwarded requests only when one workload is behind it; when
  several are, leave it out and report that path's traffic as not yet tied
  to a workload.
- `import_langfuse_history`, `import_helicone_history`: tell the person to
  export their history and upload it with their gateway key to the gateway's
  `POST /v1/imports/history?format=langfuse` (or `helicone`). Imported
  history counts toward the proving budget as a catalog estimate; it is never
  measured spend, so it does not count as saved requests for Caveman's first
  test, which needs live traffic. LiteLLM history is an OpenTelemetry export
  for the gateway's `/v1/traces`. Uploading is the person's call.

Next: report, **caveman-cloud-setup** step 5.
