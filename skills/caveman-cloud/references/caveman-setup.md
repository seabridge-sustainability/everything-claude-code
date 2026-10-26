---
name: caveman-setup
description: >
  Connect an application's LLM traffic to Caveman Cloud (gateway wiring, or an
  existing LiteLLM or OpenTelemetry path) and verify one real request, with no
  change in behavior. Use for the Caveman setup prompt, "set up caveman", or
  adding LLM spend observability to an app.
---

Connect application traffic to Caveman with a verified, measurement-only
integration. Inspect repository instructions, current changes and the existing
inference path first. Preserve models, prompts, tool behavior, streaming,
retries and unrelated edits. Configuration alone is not verification.

The prompt that sent you here gives four values:

- `GATEWAY`: the gateway base URL (e.g. `https://gateway.caveman.so`)
- `CAVE_API_KEY`: the gateway secret; env var only, never committed or printed
- `PROVIDER_KEYS`: `stored` (provider keys live in Caveman Cloud) or `byok`
  (the app sends its own provider key)
- `DASHBOARD`: the console base URL (e.g. `https://app.caveman.so`)

Use a supplied project ID to check `cvm context show`. Resolve missing values
from existing configuration. A masked key is not usable: ask the user to set
it through the repo's secret mechanism, never to paste it in chat. Do not guess
a URL, mint a key, or read the CLI credential store.

## Rules

1. **Coherent integration.** Wire every live LLM callsite through existing
   configuration and seams. No drive-by refactors or formatting sweeps.
2. **Secrets stay in env vars**, in the env file the repo already uses or its
   secret mechanism. The file must be untracked and not reach browser code;
   add an ignore rule if it is untracked but not ignored. Never print the key.
3. **Report only what you observed.** Status and usage only from the real
   request; missing fields are unavailable. Redact secrets everywhere.
4. **Record mode only.** Add measurement. Enable no optimization, claim no
   savings, keep live policy, payload capture and consent unchanged.
5. **Provider keys are not yours.** `stored`: you never see one. `byok`: the
   app's provider key stays exactly where it is.

## 1. Find every live LLM callsite

Read dependency files and lockfiles, then search the source for:

- SDKs: `openai` (`AzureOpenAI`), `@anthropic-ai/sdk`, `anthropic`, `ai` +
  `@ai-sdk/*`, `langchain*`, `@langchain/*`, `langgraph`, `litellm`,
  `google-genai`, `@google/genai`, `google.generativeai`,
  `@google/generative-ai`, `vertexai`,
  `crewai`, `pydantic_ai`, `openai-agents`, `@openai/agents`, `llama_index`,
  `llamaindex`, `@mastra/*`, `autogen*`, `dspy`, `claude_agent_sdk`, `groq`, `mistralai`,
  `together`
- Bedrock: `boto3`/`botocore` `bedrock-runtime` clients,
  `@aws-sdk/client-bedrock-runtime`, `langchain_aws`
- Raw HTTP to `api.openai.com`, `api.anthropic.com`,
  `generativelanguage.googleapis.com`, `*.openai.azure.com`,
  `bedrock-runtime.*.amazonaws.com`, `*-aiplatform.googleapis.com`
- Base-URL env vars: `OPENAI_BASE_URL`, `OPENAI_API_BASE`,
  `ANTHROPIC_BASE_URL`, `GEMINI_BASE_URL`, `GOOGLE_GEMINI_BASE_URL`,
  `AZURE_OPENAI_ENDPOINT`,
  `AWS_ENDPOINT_URL_BEDROCK_RUNTIME`

List them (file:line) before changing anything. None found: say so, and do
not invent an integration.

## 2. Pick the path, then wire it

- LiteLLM already owns inference: keep app → LiteLLM → providers and add the
  OpenTelemetry export.
- The app already exports GenAI spans: add the Caveman OTLP exporter.
- Otherwise: the gateway. Reuse the configured app slug, or derive one from
  the package name (`support-bot`): lowercase `[a-z0-9]` first, then
  `[a-z0-9._-]`, at most 64 characters. Spend groups under it.

The exact configuration for each path and SDK is **caveman-setup-recipes**. On
the console's origin each recipe is also `/docs/integrations/<id>`. Add to the
env file, referenced from code:

```
CAVE_GATEWAY_URL=<GATEWAY>
CAVE_API_KEY=<CAVE_API_KEY>
```

## 3. Verify the changed path

Run the relevant checks. The task allows one small real request through a safe
entrypoint using the configuration you changed, its existing model and a small
output limit; avoid customer actions and scheduled jobs. Read the status,
model, usage and request or trace ID. A bare gateway curl tests connectivity,
not the app. Then find the trace: `cvm traces search --from START --to END
--limit 5`. HTTP success is not ingestion; if it is pending, say so instead of
sending more paid requests.

## 4. Report

- **Configuration:** inference path, app slug, changed files, covered and
  uncovered callsites.
- **Checks** and **request:** commands, status, model, usage, trace ID, and
  which entrypoint ran; unverified when it did not succeed.
- **Telemetry:** whether the trace showed in the intended project;
  `<DASHBOARD>/traces`.
- **Deployment:** local changes versus deployed code.
- **Next:** blockers, then **caveman-discover** to label workflows.

No savings claim follows from setup.

## Failures

- No callsites: report what you searched. A repository that only runs a coding
  agent has no app traffic to wire.
- Gateway unreachable: the endpoint and the redacted error; wiring saved is not
  verified.
- 401 `cave_invalid_api_key`: the key was rejected; point to the console's key
  flow.
- 404 `cave_route_not_found`: check the slug and the SDK's protocol path.
- Provider errors: actual status, code and a redacted excerpt.
- Success with no trace yet: report the request and pending ingestion apart.
