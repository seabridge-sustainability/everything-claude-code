"""Offline, timestamped transcription. No model download during an analysis run."""
import json
import sys
from faster_whisper import WhisperModel

model = WhisperModel(sys.argv[2], device="cpu", compute_type="int8", local_files_only=True)
segments, info = model.transcribe(sys.argv[1], beam_size=1, vad_filter=True)
result = {"language": info.language, "language_probability": info.language_probability,
          "segments": [{"start": s.start, "end": s.end, "text": s.text} for s in segments]}
print(json.dumps(result, ensure_ascii=False))
