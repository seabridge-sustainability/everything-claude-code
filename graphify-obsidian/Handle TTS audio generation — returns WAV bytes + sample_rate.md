---
source_file: "unsloth\studio\backend\core\inference\worker.py"
type: "rationale"
community: "unsloth"
location: "L476"
tags:
  - graphify/rationale
  - graphify/INFERRED
  - community/unsloth
---

# Handle TTS audio generation — returns WAV bytes + sample_rate

## Connections
- [[InferenceBackend]] - `uses` [INFERRED]
- [[LogConfig]] - `uses` [INFERRED]
- [[handle_generate_audio()]] - `rationale_for` [EXTRACTED]

#graphify/rationale #graphify/INFERRED #community/unsloth