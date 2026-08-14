---
source_file: "unsloth\studio\backend\routes\inference.py"
type: "rationale"
community: "unsloth"
location: "L797"
tags:
  - graphify/rationale
  - graphify/INFERRED
  - community/unsloth
---

# Decode base64 audio (any format) → float32 numpy array at 16kHz

## Connections
- [[ChatCompletion]] - `uses` [INFERRED]
- [[ChatCompletionChunk]] - `uses` [INFERRED]
- [[ChatCompletionRequest]] - `uses` [INFERRED]
- [[ChoiceDelta]] - `uses` [INFERRED]
- [[ChunkChoice]] - `uses` [INFERRED]
- [[CompletionChoice]] - `uses` [INFERRED]
- [[CompletionMessage]] - `uses` [INFERRED]
- [[CompletionUsage]] - `uses` [INFERRED]
- [[GenerateRequest]] - `uses` [INFERRED]
- [[InferenceStatusResponse]] - `uses` [INFERRED]
- [[LlamaCppBackend]] - `uses` [INFERRED]
- [[LoadRequest]] - `uses` [INFERRED]
- [[LoadResponse]] - `uses` [INFERRED]
- [[UnloadRequest]] - `uses` [INFERRED]
- [[UnloadResponse]] - `uses` [INFERRED]
- [[ValidateModelRequest]] - `uses` [INFERRED]
- [[ValidateModelResponse]] - `uses` [INFERRED]
- [[decode_audio_base64()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/INFERRED #community/unsloth