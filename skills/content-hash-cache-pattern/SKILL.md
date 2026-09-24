---
name: content-hash-cache-pattern
description: Cache expensive file processing results using SHA-256 content hashes — path-independent, auto-invalidating, with service layer separation. Use when repeated file processing is slow and results should be cached and invalidated by content rather than path.
metadata:
  origin: ECC
---

# Content-Hash File Cache Pattern

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->

Cache expensive file processing results (PDF parsing, text extraction, image analysis) using SHA-256 content hashes as cache keys. Unlike path-based caching, this approach survives file moves/renames and auto-invalidates when content changes.

## When to Activate

- Building file processing pipelines (PDF, images, text extraction)
- Processing cost is high and same files are processed repeatedly
- Need a `--cache/--no-cache` CLI option
- Want to add caching to existing pure functions without modifying them

## Core Pattern

### 1. Content-Hash Based Cache Key

Use file content (not path) as the cache key:

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

**Why content hash?** File rename/move = cache hit. Content change = automatic invalidation. No index file needed.

### 2. Frozen Dataclass for Cache Entry

```python
from dataclasses import dataclass

@dataclass(frozen=True, slots=True)
class CacheEntry:
    file_hash: str
    source_path: str
    document: ExtractedDocument  # The cached result
```

### 3. File-Based Cache Storage

Each cache entry is stored as `{hash}.json` — O(1) lookup by hash, no index file required.

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

### 4. Service Layer Wrapper (SRP)

Keep the processing function pure. Add caching as a separate service layer.

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

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| SHA-256 content hash | Path-independent, auto-invalidates on content change |
| `{hash}.json` file naming | O(1) lookup, no index file needed |
| Service layer wrapper | SRP: extraction stays pure, cache is a separate concern |
| Manual JSON serialization | Full control over frozen dataclass serialization |
| Corruption returns `None` | Graceful degradation, re-processes on next run |
| `cache_dir.mkdir(parents=True)` | Lazy directory creation on first write |

## Best Practices

- **Hash content, not paths** — paths change, content identity doesn't
- **Chunk large files** when hashing — avoid loading entire files into memory
- **Keep processing functions pure** — they should know nothing about caching
- **Log cache hit/miss** with truncated hashes for debugging
- **Handle corruption gracefully** — treat invalid cache entries as misses, never crash

## Anti-Patterns to Avoid

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

## When to Use

- File processing pipelines (PDF parsing, OCR, text extraction, image analysis)
- CLI tools that benefit from `--cache/--no-cache` options
- Batch processing where the same files appear across runs
- Adding caching to existing pure functions without modifying them

## When NOT to Use

- Data that must always be fresh (real-time feeds)
- Cache entries that would be extremely large (consider streaming instead)
- Results that depend on parameters beyond file content (e.g., different extraction configs)
