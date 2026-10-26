---
name: caveman-setup-recipes
description: >
  The exact Caveman Cloud wiring for each inference path: LiteLLM export,
  an existing OpenTelemetry exporter, and the gateway base URL and headers per
  SDK. Read from caveman-setup once the path is chosen.
---

# Wiring recipes

Read **caveman-setup** first: its rules bind every recipe here. Match the
recipe to the installed SDK version and protocol; when options differ, read the
installed SDK source. Never move an app to another protocol to fit an example.

## Existing LiteLLM

Keep app → LiteLLM → providers; never put another inference proxy in front of
LiteLLM's upstream calls. Export LiteLLM's traces to Caveman with the
console's LiteLLM OpenTelemetry setup, provider keys and models staying in
LiteLLM. Keep existing exporters; with a collector, add the Caveman exporter to
its traces pipeline. Use a project key with its default scopes (gateway and
trace ingestion): only such a key writes replayable request rows. Set
`OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=span_only` when the project
stores payloads with replay consent (both on by default); `no_content`, or the
exporter header `x-cave-capture-content: false`, keeps content out. Needs
LiteLLM 1.96.0 or later. A missing key scope is a reported prerequisite.

## Existing OpenTelemetry exporter

OpenInference, OpenLLMetry/Traceloop, the Vercel AI SDK, MLflow or OTel GenAI
instrumentation: add a Caveman OTLP exporter and keep the content setting.
When the project stores payloads, prompts and outputs are kept redacted and
encrypted. To send none from this exporter: header
`x-cave-capture-content: false`, or the library's switch
(`OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false`,
`TRACELOOP_TRACE_CONTENT=false`, `OPENINFERENCE_HIDE_INPUTS=true`,
`OPENINFERENCE_HIDE_OUTPUTS=true`). An export over 8 MB or 10,000 spans is
refused whole. Set the resource attribute `cave.agent` to the workload slug;
spans already carrying `gen_ai.agent.name` in slug form need nothing.

## Gateway: base URL plus one header

Base URL → `GATEWAY/w/<app>`, header `x-cave-api-key: CAVE_API_KEY`
(`Authorization: Bearer` also works). `byok` adds
`x-cave-upstream-key: <the app's provider key>`; `stored` drops that line.
Where an SDK requires an API-key parameter, stored mode passes `CAVE_API_KEY`.

**OpenAI SDK (TS; Chat Completions and Responses):**

```ts
const client = new OpenAI({
  baseURL: `${process.env.CAVE_GATEWAY_URL}/w/<app>/openai/v1`,
  apiKey: process.env.OPENAI_API_KEY, // stored: CAVE_API_KEY
  defaultHeaders: {
    "x-cave-api-key": process.env.CAVE_API_KEY!,
    "x-cave-upstream-key": process.env.OPENAI_API_KEY!, // byok only
  },
});
```

Python: `base_url=f"{gw}/w/<app>/openai/v1"`, same `default_headers`.

**Anthropic SDK** appends `/v1/messages`: `base_url=f"{gw}/w/<app>"`, and
`x-cave-api-key` in both modes (its `x-api-key` authenticates only when it
holds a Caveman key, so never a BYOK request):

```python
client = anthropic.Anthropic(
    base_url=f"{os.environ['CAVE_GATEWAY_URL']}/w/<app>",
    api_key=os.environ["ANTHROPIC_API_KEY"],  # stored: CAVE_API_KEY
    default_headers={"x-cave-api-key": os.environ["CAVE_API_KEY"],
                     "x-cave-upstream-key": os.environ["ANTHROPIC_API_KEY"]},  # byok only
)
```

**Vercel AI SDK:** keep the app's provider adapter; OpenAI-compatible base
`GATEWAY/w/<app>/openai/v1`, Anthropic base with `/v1`; headers through the
adapter's options. Keep Chat Completions versus Responses as it is.

**LangChain / LangGraph:** `ChatOpenAI(base_url=f"{gw}/w/<app>/openai/v1",
default_headers={...})`, `ChatAnthropic(base_url=f"{gw}/w/<app>", ...)`;
LangChain.js `configuration: { baseURL, defaultHeaders }`. LangGraph inherits
the model it is given.

**Bedrock (boto3, AWS SDK, `langchain_aws`):** `endpoint_url` (JS `endpoint`)
`GATEWAY/w/<app>/bedrock`, and `AWS_BEARER_TOKEN_BEDROCK=<CAVE_API_KEY>`
(boto3 1.39+). The gateway signs with the project's Bedrock connection: no
upstream-key header; a missing connection is a prerequisite. Keep the region.

**Azure OpenAI:** `azure_endpoint=f"{gw}/w/<app>/azure"`, same two headers
(the upstream key is the Azure key); keep the deployment and `api_version`.

**Frameworks** (LlamaIndex, Mastra, AutoGen, DSPy, CrewAI, Pydantic AI, OpenAI
Agents SDK): set base URL and headers on the client or model they are given.

**Raw HTTP:** swap the host, keep the path: `GATEWAY/w/<app>/v1/chat/completions`
or `GATEWAY/w/<app>/v1/messages`.

Example: slug `support-bot`, hosted gateway, OpenAI SDK base
`https://gateway.caveman.so/w/support-bot/openai/v1`.

Next: verify with **caveman-setup** step 3.
