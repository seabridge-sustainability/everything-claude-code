---
paths:
  - "**/*.py"
  - "**/*.pyi"
---
# Python Kodlama Stili

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


> Bu dosya [common/coding-style.md](../common/coding-style.md) dosyasÃ„Â±nÃ„Â± Python'a ÃƒÂ¶zgÃƒÂ¼ iÃƒÂ§erikle geniÃ…Å¸letir.

## Standartlar

- **PEP 8** konvansiyonlarÃ„Â±nÃ„Â± takip et
- TÃƒÂ¼m fonksiyon imzalarÃ„Â±nda **type annotation'lar** kullan

## Immutability

Immutable veri yapÃ„Â±larÃ„Â±nÃ„Â± tercih et:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class User:
    name: str
    email: str

from typing import NamedTuple

class Point(NamedTuple):
    x: float
    y: float
```

## Formatlama

- Kod formatlama iÃƒÂ§in **black**
- Import sÃ„Â±ralama iÃƒÂ§in **isort**
- Linting iÃƒÂ§in **ruff**

## Referans

KapsamlÃ„Â± Python idiom'larÃ„Â± ve pattern'leri iÃƒÂ§in skill: `python-patterns` dosyasÃ„Â±na bakÃ„Â±n.
