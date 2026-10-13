# Colibri / OpenCode evaluation

Evaluated 2026-10-13, read-only, alongside ECC integration. Reference revision:
`bf2442915d6e3dd4cdfd2eb9c2a3d2aa44a25850` (public Git revision).
No model download/inference, new listener, installation, configuration change or
running-agent interruption was performed.

Recommendation: retain Colibri as an optional future OpenCode provider pilot,
not an immediate replacement. It could help local coding, diagnosis and bounded
review if it beats the existing provider on actual SeaBridge tasks. It does not
improve or validate the physical/scientific Open Access risk models by itself.

## Machine and storage fit

Observed Windows 11 Home, i9-14900HX, approximately 31.7 GiB RAM and RTX 4090 Laptop
16 GiB VRAM. Free physical memory varied from 2.7–4.6 GiB during the delegated
review to about 1.25 GiB on the lead's later check; this is a changing snapshot,
not idle capacity. E: is Samsung NVMe, approximately 953.9 GiB total / 220 GiB
free. D: is USB WD HDD, approximately 1,863 GiB total / 1,383 GiB free.

The plausible first candidate is Qwen3-Coder-30B-A3B int4. Upstream documents a
19 GB converted container and approximately 6.5 GB resident RAM at cache cap 32,
or 15.2 GB when all experts are cached. Those measurements are from different
hardware and do not predict this laptop's performance. Local conversion also
needs the original approximately 61 GB checkpoint, temporary space and conversion
dependencies. Download provenance and model license must be checked separately.
Current free memory is below even the reported smaller resident configuration.
[Pinned Qwen documentation](https://github.com/JustVugg/colibri/blob/bf2442915d6e3dd4cdfd2eb9c2a3d2aa44a25850/docs/qwen36.md)

E: has enough space for that smaller candidate and offers the useful NVMe latency,
but central policy reserves E: for Docker, C: for application/source/settings and
D: for bulk/model data. Native E: weights would require an explicit storage
exception. D: respects policy but HDD expert-cache misses can impair latency.
Large GLM model variants exceed the observed E: headroom. Do not clear storage,
stop agents or move existing models to make room as part of this evaluation.

## Windows and Docker paths

Upstream documents Windows CPU/GPU build and release paths; this machine's binary
compatibility, CUDA/Vulkan execution and inference were not tested.
[Windows guide](https://github.com/JustVugg/colibri/blob/bf2442915d6e3dd4cdfd2eb9c2a3d2aa44a25850/docs/windows.md)

The supplied slim image compiles only the CPU GLM engine and sets
`COLI_DOCKER_GLM_ONLY=1`. Its compose example defaults to a 24 GB RAM budget,
publishes port 5000 on all host interfaces and uses restart-unless-stopped. The
observed WSL memory cap is 12 GB. This is not a ready GPU/Qwen deployment on E:;
an appropriately reviewed image, memory plan and loopback-only binding would be
needed. Preserve the existing backend :8000, which the native API examples also
use; verify any proposed different port before launch.
[Pinned Dockerfile](https://github.com/JustVugg/colibri/blob/bf2442915d6e3dd4cdfd2eb9c2a3d2aa44a25850/docker/Dockerfile.slim),
[compose](https://github.com/JustVugg/colibri/blob/bf2442915d6e3dd4cdfd2eb9c2a3d2aa44a25850/docker/docker-compose.yml)

## OpenCode integration and acceptance

Use an opt-in OpenAI-compatible provider with `@ai-sdk/openai-compatible`, a
reviewed loopback `/v1` URL and the exact model ID returned by `/v1/models`.
Do not overwrite a current model or OpenAI/Anthropic environment configuration.
This is an inference-provider connection; ECC skill/MCP routing remains separate.
[OpenCode provider documentation](https://opencode.ai/docs/providers/),
[Colibri API](https://github.com/JustVugg/colibri/blob/bf2442915d6e3dd4cdfd2eb9c2a3d2aa44a25850/docs/api.md)

The read-only configuration review found home OpenCode selecting
`qwen3.5-opencode:32k` while the backend project override selects `z-ai/glm-5.2`.
An Ollama tray process was present without a port-11434 listener; a loaded local
Qwen model was not proved. Establish the effective provider baseline before
claiming Colibri is better. These findings describe that inspection, not every
running session's actual model.

After separate activation/model-evaluation authorization and sufficient resources:

1. Pin reviewed source/model provenance and choose a policy-compliant storage path.
2. Start only a task-owned, loopback-bound instance on an approved free port.
3. Prove model identity, chat streaming, valid tool-call JSON and a real OpenCode
   tool/result cycle under ECC scope and goal rules. Reject malformed calls.
4. Compare repeated bounded bug-fix, contract and refusal tasks against the same
   effective baseline: acceptance rate, interventions, latency, RAM/VRAM and cost.
5. Start with one inference slot. Extra KV slots consume memory and may disable
   acceleration/speculation paths; they are not free parallel-evaluator capacity.
6. Keep scientific calculations unchanged and select the provider explicitly only
   if the pilot meets the agreed checks. Roll back only the pilot-owned process
   and opt-in registration, preserving all existing services/configurations.

No quality, speed, savings or native tool reliability claim is established yet.
