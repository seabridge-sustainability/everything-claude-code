---
name: content-hash-cache-pattern
description: 使用SHA-256内容哈希缓存昂贵的文件处理结果——路径无关、自动失效、服务层分离。
origin: ECC
---

# 内容哈希文件缓存模式

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


使用 SHA-256 内容哈希作为缓存键，缓存昂贵的文件处理结果（PDF 解析、文本提取、图像分析）。与基于路径的缓存不同，此方法在文件移动/重命名后仍然有效，并在内容更改时自动失效。

## 何时激活

* 构建文件处理管道时（PDF、图像、文本提取）
* 处理成本高且同一文件被重复处理时
* 需要一个 `--cache/--no-cache` CLI 选项时
* 希望在不修改现有纯函数的情况下为其添加缓存时

## 核心模式

### 1. 基于内容哈希的缓存键

使用文件内容（而非路径）作为缓存键：

```python
import hashlib
from pathlib import Path

_HASH_CHUNK_SIZE = 65536  # 64KB chunks for large files

def compute_file_hash(path: Path) -> str:
    """SHA-256 of file contents (chunked for large files)."""
    if not path.is_file():
        raise FileNotFoundError(f"File not found: {path}")
    sha256 = hashlib.sha256()
    with open(path, "rb") as f:
        while True:
            chunk = f.read(_HASH_CHUNK_SIZE)
            if not chunk:
                break
            sha256.update(chunk)
    return sha256.hexdigest()
```

**为什么使用内容哈希？** 文件重命名/移动 = 缓存命中。内容更改 = 自动失效。无需索引文件。

### 2. 用于缓存条目的冻结数据类

```python
from dataclasses import dataclass

@dataclass(frozen=True, slots=True)
class CacheEntry:
    file_hash: str
    source_path: str
    document: ExtractedDocument  # The cached result
```

### 3. 基于文件的缓存存储

每个缓存条目都存储为 `{hash}.json` —— 通过哈希实现 O(1) 查找，无需索引文件。

```python
import json
from typing import Any

def write_cache(cache_dir: Path, entry: CacheEntry) -> None:
    cache_dir.mkdir(parents=True, exist_ok=True)
    cache_file = cache_dir / f"{entry.file_hash}.json"
    data = serialize_entry(entry)
    cache_file.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")

def read_cache(cache_dir: Path, file_hash: str) -> CacheEntry | None:
    cache_file = cache_dir / f"{file_hash}.json"
    if not cache_file.is_file():
        return None
    try:
        raw = cache_file.read_text(encoding="utf-8")
        data = json.loads(raw)
        return deserialize_entry(data)
    except (json.JSONDecodeError, ValueError, KeyError):
        return None  # Treat corruption as cache miss
```

### 4. 服务层包装器（单一职责原则）

保持处理函数的纯净性。将缓存作为一个单独的服务层添加。

```python
def extract_with_cache(
    file_path: Path,
    *,
    cache_enabled: bool = True,
    cache_dir: Path = Path(".cache"),
) -> ExtractedDocument:
    """Service layer: cache check -> extraction -> cache write."""
    if not cache_enabled:
        return extract_text(file_path)  # Pure function, no cache knowledge

    file_hash = compute_file_hash(file_path)

    # Check cache
    cached = read_cache(cache_dir, file_hash)
    if cached is not None:
        logger.info("Cache hit: %s (hash=%s)", file_path.name, file_hash[:12])
        return cached.document

    # Cache miss -> extract -> store
    logger.info("Cache miss: %s (hash=%s)", file_path.name, file_hash[:12])
    doc = extract_text(file_path)
    entry = CacheEntry(file_hash=file_hash, source_path=str(file_path), document=doc)
    write_cache(cache_dir, entry)
    return doc
```

## 关键设计决策

| 决策 | 理由 |
|----------|-----------|
| SHA-256 内容哈希 | 与路径无关，内容更改时自动失效 |
| `{hash}.json` 文件命名 | O(1) 查找，无需索引文件 |
| 服务层包装器 | 单一职责原则：提取功能保持纯净，缓存是独立的关注点 |
| 手动 JSON 序列化 | 完全控制冻结数据类的序列化 |
| 损坏时返回 `None` | 优雅降级，在下次运行时重新处理 |
| `cache_dir.mkdir(parents=True)` | 在首次写入时惰性创建目录 |

## 最佳实践

* **哈希内容，而非路径** —— 路径会变，内容标识不变
* 对大文件进行哈希时**分块处理** —— 避免将整个文件加载到内存中
* **保持处理函数的纯净性** —— 它们不应了解任何关于缓存的信息
* **记录缓存命中/未命中**，并使用截断的哈希值以便调试
* **优雅地处理损坏** —— 将无效的缓存条目视为未命中，永不崩溃

## 应避免的反模式

```python
# BAD: Path-based caching (breaks on file move/rename)
cache = {"/path/to/file.pdf": result}

# BAD: Adding cache logic inside the processing function (SRP violation)
def extract_text(path, *, cache_enabled=False, cache_dir=None):
    if cache_enabled:  # Now this function has two responsibilities
        ...

# BAD: Using dataclasses.asdict() with nested frozen dataclasses
# (can cause issues with complex nested types)
data = dataclasses.asdict(entry)  # Use manual serialization instead
```

## 适用场景

* 文件处理管道（PDF 解析、OCR、文本提取、图像分析）
* 受益于 `--cache/--no-cache` 选项的 CLI 工具
* 跨多次运行出现相同文件的批处理
* 在不修改现有纯函数的情况下为其添加缓存

## 不适用场景

* 必须始终保持最新的数据（实时数据流）
* 缓存条目可能极其庞大的情况（应考虑使用流式处理）
* 结果依赖于文件内容之外参数的情况（例如，不同的提取配置）
