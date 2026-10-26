---
name: caveman-cloud-setup-inventory
description: >
  What a Caveman Cloud setup inventory holds: the item kinds, how names, paths
  and eval cases must look to verify, and which files never to cite. Read from
  caveman-cloud-setup step 2.
---

# The setup inventory

Read **caveman-cloud-setup** first: its rules bind every item here. Then build
the items for `cvm setup assert` (`cvm tools describe setup.assert` has the
exact schema).

Read the default branch's tracked files. Record one item per finding:

| kind | what | name | extra fields |
|---|---|---|---|
| workload | a place the app calls a model for one business job | slug: `support-agent` | path of its entrypoint |
| prompt | a system or task prompt file or string | short token | `workload` |
| tool | a tool or function schema the model can call | the tool's name exactly | `workload` |
| model | a model id the code sends | the id exactly, e.g. `claude-sonnet-4-6` | `workload` |
| eval_case | one case in a test fixture, golden file or documented example | short token | `workload`, `input`, `expected` |
| gateway_config | a LiteLLM proxy config (`model_list`) or a Kong decK file (`_format_version`) | short token | `vendor`: litellm or kong |
| telemetry | an OpenTelemetry exporter, Langfuse or Helicone in the code | short token | `vendor`: otel, langfuse or helicone |
| ci | a CI workflow that runs the app's tests | short token | |

- `path` is repository-relative; add `line` when one line carries the item.
- Names are single tokens of at least 3 characters without spaces. Workload
  names are lowercase slugs. A name verifies only as a whole identifier.
- Model and tool names shorter than 6 characters (`gpt-5`, `o3`, `fetch`)
  are never checked (`name_too_short`): leave them out; the workload may then
  stay unverified. At most 20 model and tool names per file.
- Copy each eval case's `input` and `expected` (each at least 8 characters)
  exactly as the fixture or documented example holds them: whole values of
  one record (one JSON object, or one block of lines where each value sits on
  one line, quoted or alone on its line; a value spread over several lines
  does not match). Never invent a case,
  never write an expected answer yourself, never use a model's output as one.
  At most 100 cases; prefer the ones that cover distinct behaviors.
- Skip vendored code, generated files and other people's examples.
- Never cite a file that holds secrets (keys, certificates, service-account
  files, token stores, Terraform state or variables, `.aws`, `.ssh`, `.kube`,
  `.docker`): the server refuses the whole assertion. Any path segment
  starting with `secret`, `credentials` or `.env` is refused, so
  `credentials_check.py` and `.envoy/` are too, as are env files by name
  (`env`, `env.local`, `env.production` and other stages, `env.json`,
  `env.yaml`, `env.sh`, `env.toml`, `env.ini`); code such as `env.ts` or
  `env.py` is fine. Cite another file.

Next: assert all items in one call, **caveman-cloud-setup** step 3.
