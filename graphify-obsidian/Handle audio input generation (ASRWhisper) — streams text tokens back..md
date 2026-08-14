---
source_file: "unsloth\studio\backend\core\inference\worker.py"
type: "rationale"
community: "unsloth"
location: "L524"
tags:
  - graphify/rationale
  - graphify/INFERRED
  - community/unsloth
---

# Handle audio input generation (ASR/Whisper) — streams text tokens back.

## Connections
- [[InferenceBackend]] - `uses` [INFERRED]
- [[LogConfig]] - `uses` [INFERRED]
- [[_handle_generate_audio_input()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/INFERRED #community/unsloth