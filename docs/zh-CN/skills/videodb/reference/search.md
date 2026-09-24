# Ã¦ÂÅ“Ã§Â´Â¢Ã¤Â¸Å½Ã§Â´Â¢Ã¥Â¼â€¢Ã¦Å’â€¡Ã¥Ââ€”

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


Ã¦ÂÅ“Ã§Â´Â¢Ã¥Å Å¸Ã¨Æ’Â½Ã¥â€¦ÂÃ¨Â®Â¸Ã¦â€šÂ¨Ã¤Â½Â¿Ã§â€Â¨Ã¨â€¡ÂªÃ§â€žÂ¶Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¦Å¸Â¥Ã¨Â¯Â¢Ã£â‚¬ÂÃ§Â²Â¾Ã§Â¡Â®Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ¦Ë†â€“Ã¨Â§â€ Ã¨Â§â€°Ã¥Å“ÂºÃ¦â„¢Â¯Ã¦ÂÂÃ¨Â¿Â°Ã¦ÂÂ¥Ã¦Å¸Â¥Ã¦â€°Â¾Ã¨Â§â€ Ã©Â¢â€˜Ã¤Â¸Â­Ã§Å¡â€žÃ§â€°Â¹Ã¥Â®Å¡Ã¦â€”Â¶Ã¥Ë†Â»Ã£â‚¬â€š

## Ã¥â€°ÂÃ¦ÂÂÃ¦ÂÂ¡Ã¤Â»Â¶

Ã¨Â§â€ Ã©Â¢â€˜**Ã¥Â¿â€¦Ã©Â¡Â»Ã¨Â¢Â«Ã§Â´Â¢Ã¥Â¼â€¢**Ã¥ÂÅ½Ã¦â€°ÂÃ¨Æ’Â½Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦ÂÅ“Ã§Â´Â¢Ã£â‚¬â€šÃ¦Â¯ÂÃ§Â§ÂÃ§Â´Â¢Ã¥Â¼â€¢Ã§Â±Â»Ã¥Å¾â€¹Ã¥Â¯Â¹Ã¦Â¯ÂÃ¤Â¸ÂªÃ¨Â§â€ Ã©Â¢â€˜Ã¥ÂÂªÃ©Å“â‚¬Ã¦â€°Â§Ã¨Â¡Å’Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã§Â´Â¢Ã¥Â¼â€¢Ã¦â€œÂÃ¤Â½Å“Ã£â‚¬â€š

## Ã§Â´Â¢Ã¥Â¼â€¢

### Ã¥ÂÂ£Ã¨Â¯Â­Ã¨Â¯ÂÃ§Â´Â¢Ã¥Â¼â€¢

Ã¤Â¸ÂºÃ¨Â§â€ Ã©Â¢â€˜Ã§Å¡â€žÃ¨Â½Â¬Ã¥Â½â€¢Ã¨Â¯Â­Ã©Å¸Â³Ã¥â€ â€¦Ã¥Â®Â¹Ã¥Â»ÂºÃ§Â«â€¹Ã§Â´Â¢Ã¥Â¼â€¢Ã¯Â¼Å’Ã¤Â»Â¥Ã¦â€Â¯Ã¦Å’ÂÃ¨Â¯Â­Ã¤Â¹â€°Ã¦ÂÅ“Ã§Â´Â¢Ã¥â€™Å’Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ¦ÂÅ“Ã§Â´Â¢Ã¯Â¼Å¡

```python
video = coll.get_video(video_id)

# force=True makes indexing idempotent Ã¢â‚¬â€ skips if already indexed
video.index_spoken_words(force=True)
```

Ã¦Â­Â¤Ã¦â€œÂÃ¤Â½Å“Ã¤Â¼Å¡Ã¨Â½Â¬Ã¥Â½â€¢Ã©Å¸Â³Ã¨Â½Â¨Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Å“Â¨Ã¥ÂÂ£Ã¨Â¯Â­Ã¥â€ â€¦Ã¥Â®Â¹Ã¤Â¸Å Ã¦Å¾â€žÃ¥Â»ÂºÃ¥ÂÂ¯Ã¦ÂÅ“Ã§Â´Â¢Ã§Å¡â€žÃ§Â´Â¢Ã¥Â¼â€¢Ã£â‚¬â€šÃ¨Â¿â„¢Ã¦ËœÂ¯Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â¯Â­Ã¤Â¹â€°Ã¦ÂÅ“Ã§Â´Â¢Ã¥â€™Å’Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ¦ÂÅ“Ã§Â´Â¢Ã¦â€°â‚¬Ã¥Â¿â€¦Ã©Å“â‚¬Ã§Å¡â€žÃ£â‚¬â€š

**Ã¥Ââ€šÃ¦â€¢Â°Ã¯Â¼Å¡**

| Ã¥Ââ€šÃ¦â€¢Â° | Ã§Â±Â»Ã¥Å¾â€¹ | Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼ | Ã¦ÂÂÃ¨Â¿Â° |
|-----------|------|---------|-------------|
| `language_code` | `str\|None` | `None` | Ã¨Â§â€ Ã©Â¢â€˜Ã§Å¡â€žÃ¨Â¯Â­Ã¨Â¨â‚¬Ã¤Â»Â£Ã§Â Â |
| `segmentation_type` | `SegmentationType` | `SegmentationType.sentence` | Ã¥Ë†â€ Ã¥â€°Â²Ã§Â±Â»Ã¥Å¾â€¹ (`sentence` Ã¦Ë†â€“ `llm`) |
| `force` | `bool` | `False` | Ã¨Â®Â¾Ã§Â½Â®Ã¤Â¸Âº `True` Ã¤Â»Â¥Ã¨Â·Â³Ã¨Â¿â€¡Ã¥Â·Â²Ã§Â´Â¢Ã¥Â¼â€¢Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Ã©ÂÂ¿Ã¥â€¦ÂÃ¢â‚¬Å“Ã¥Â·Â²Ã¥Â­ËœÃ¥Å“Â¨Ã¢â‚¬ÂÃ©â€â„¢Ã¨Â¯Â¯Ã¯Â¼â€° |
| `callback_url` | `str\|None` | `None` | Ã§â€Â¨Ã¤ÂºÅ½Ã¥Â¼â€šÃ¦Â­Â¥Ã©â‚¬Å¡Ã§Å¸Â¥Ã§Å¡â€ž Webhook URL |

### Ã¥Å“ÂºÃ¦â„¢Â¯Ã§Â´Â¢Ã¥Â¼â€¢

Ã©â‚¬Å¡Ã¨Â¿â€¡Ã§â€Å¸Ã¦Ë†ÂÃ¥Å“ÂºÃ¦â„¢Â¯Ã§Å¡â€ž AI Ã¦ÂÂÃ¨Â¿Â°Ã¦ÂÂ¥Ã§Â´Â¢Ã¥Â¼â€¢Ã¨Â§â€ Ã¨Â§â€°Ã¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€šÃ¤Â¸Å½Ã¥ÂÂ£Ã¨Â¯Â­Ã¨Â¯ÂÃ§Â´Â¢Ã¥Â¼â€¢Ã§Â±Â»Ã¤Â¼Â¼Ã¯Â¼Å’Ã¥Â¦â€šÃ¦Å¾Å“Ã¥Å“ÂºÃ¦â„¢Â¯Ã§Â´Â¢Ã¥Â¼â€¢Ã¥Â·Â²Ã¥Â­ËœÃ¥Å“Â¨Ã¯Â¼Å’Ã¦Â­Â¤Ã¦â€œÂÃ¤Â½Å“Ã¤Â¼Å¡Ã¥Â¼â€¢Ã¥Ââ€˜Ã©â€â„¢Ã¨Â¯Â¯Ã£â‚¬â€šÃ¤Â»Å½Ã©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¤Â¸Â­Ã¦ÂÂÃ¥Ââ€“Ã§Å½Â°Ã¦Å“â€°Ã§Å¡â€ž `scene_index_id`Ã£â‚¬â€š

```python
import re
from videodb import SceneExtractionType

try:
    scene_index_id = video.index_scenes(
        extraction_type=SceneExtractionType.shot_based,
        prompt="Describe the visual content, objects, actions, and setting in this scene.",
    )
except Exception as e:
    match = re.search(r"id\s+([a-f0-9]+)", str(e))
    if match:
        scene_index_id = match.group(1)
    else:
        raise
```

**Ã¦ÂÂÃ¥Ââ€“Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Å¡**

| Ã§Â±Â»Ã¥Å¾â€¹ | Ã¦ÂÂÃ¨Â¿Â° | Ã¦Å“â‚¬Ã¤Â½Â³Ã©â‚¬â€šÃ§â€Â¨Ã¥Å“ÂºÃ¦â„¢Â¯ |
|------|-------------|----------|
| `SceneExtractionType.shot_based` | Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¨Â§â€ Ã¨Â§â€°Ã©â€¢Å“Ã¥Â¤Â´Ã¨Â¾Â¹Ã§â€¢Å’Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ë†â€ Ã¥â€°Â² | Ã©â‚¬Å¡Ã§â€Â¨Ã§â€ºÂ®Ã§Å¡â€žÃ¯Â¼Å’Ã¥Å Â¨Ã¤Â½Å“Ã¥â€ â€¦Ã¥Â®Â¹ |
| `SceneExtractionType.time_based` | Ã¦Å’â€°Ã¥â€ºÂºÃ¥Â®Å¡Ã©â€”Â´Ã©Å¡â€Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Ë†â€ Ã¥â€°Â² | Ã¥Ââ€¡Ã¥Å’â‚¬Ã©â€¡â€¡Ã¦Â Â·Ã¯Â¼Å’Ã©â€¢Â¿Ã¦â€”Â¶Ã©â€”Â´Ã©Ââ„¢Ã¦â‚¬ÂÃ¥â€ â€¦Ã¥Â®Â¹ |
| `SceneExtractionType.transcript` | Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¨Â½Â¬Ã¥Â½â€¢Ã§â€°â€¡Ã¦Â®ÂµÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Ë†â€ Ã¥â€°Â² | Ã¨Â¯Â­Ã©Å¸Â³Ã©Â©Â±Ã¥Å Â¨Ã§Å¡â€žÃ¥Å“ÂºÃ¦â„¢Â¯Ã¨Â¾Â¹Ã§â€¢Å’ |

**`time_based` Ã§Å¡â€žÃ¥Ââ€šÃ¦â€¢Â°Ã¯Â¼Å¡**

```python
video.index_scenes(
    extraction_type=SceneExtractionType.time_based,
    extraction_config={"time": 5, "select_frames": ["first", "last"]},
    prompt="Describe what is happening in this scene.",
)
```

## Ã¦ÂÅ“Ã§Â´Â¢Ã§Â±Â»Ã¥Å¾â€¹

### Ã¨Â¯Â­Ã¤Â¹â€°Ã¦ÂÅ“Ã§Â´Â¢

Ã¤Â½Â¿Ã§â€Â¨Ã¨â€¡ÂªÃ§â€žÂ¶Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥Å’Â¹Ã©â€¦ÂÃ¥ÂÂ£Ã¨Â¯Â­Ã¥â€ â€¦Ã¥Â®Â¹Ã¯Â¼Å¡

```python
from videodb import SearchType

results = video.search(
    query="explaining the benefits of machine learning",
    search_type=SearchType.semantic,
)
```

Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥ÂÂ£Ã¨Â¯Â­Ã¥â€ â€¦Ã¥Â®Â¹Ã¥Å“Â¨Ã¨Â¯Â­Ã¤Â¹â€°Ã¤Â¸Å Ã¤Â¸Å½Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¥Å’Â¹Ã©â€¦ÂÃ§Å¡â€žÃ¦Å½â€™Ã¥ÂºÂÃ§â€°â€¡Ã¦Â®ÂµÃ£â‚¬â€š

### Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ¦ÂÅ“Ã§Â´Â¢

Ã¥Å“Â¨Ã¨Â½Â¬Ã¥Â½â€¢Ã¨Â¯Â­Ã©Å¸Â³Ã¤Â¸Â­Ã¨Â¿â€ºÃ¨Â¡Å’Ã§Â²Â¾Ã§Â¡Â®Ã¦Å“Â¯Ã¨Â¯Â­Ã¥Å’Â¹Ã©â€¦ÂÃ¯Â¼Å¡

```python
results = video.search(
    query="artificial intelligence",
    search_type=SearchType.keyword,
)
```

Ã¨Â¿â€Ã¥â€ºÅ¾Ã¥Å’â€¦Ã¥ÂÂ«Ã§Â²Â¾Ã§Â¡Â®Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ¦Ë†â€“Ã§Å¸Â­Ã¨Â¯Â­Ã§Å¡â€žÃ§â€°â€¡Ã¦Â®ÂµÃ£â‚¬â€š

### Ã¥Å“ÂºÃ¦â„¢Â¯Ã¦ÂÅ“Ã§Â´Â¢

Ã¨Â§â€ Ã¨Â§â€°Ã¥â€ â€¦Ã¥Â®Â¹Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¤Â¸Å½Ã¥Â·Â²Ã§Â´Â¢Ã¥Â¼â€¢Ã§Å¡â€žÃ¥Å“ÂºÃ¦â„¢Â¯Ã¦ÂÂÃ¨Â¿Â°Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Å’Â¹Ã©â€¦ÂÃ£â‚¬â€šÃ©Å“â‚¬Ã¨Â¦ÂÃ¤Âºâ€¹Ã¥â€¦Ë†Ã¨Â°Æ’Ã§â€Â¨ `index_scenes()`Ã£â‚¬â€š

`index_scenes()` Ã¨Â¿â€Ã¥â€ºÅ¾Ã¤Â¸â‚¬Ã¤Â¸Âª `scene_index_id`Ã£â‚¬â€šÃ¥Â°â€ Ã¥â€¦Â¶Ã¤Â¼Â Ã©â‚¬â€™Ã§Â»â„¢ `video.search()` Ã¤Â»Â¥Ã¥Â®Å¡Ã¤Â½ÂÃ§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥Å“ÂºÃ¦â„¢Â¯Ã§Â´Â¢Ã¥Â¼â€¢Ã¯Â¼Ë†Ã¥Â½â€œÃ¨Â§â€ Ã©Â¢â€˜Ã¦Å“â€°Ã¥Â¤Å¡Ã¤Â¸ÂªÃ¥Å“ÂºÃ¦â„¢Â¯Ã§Â´Â¢Ã¥Â¼â€¢Ã¦â€”Â¶Ã¥Â°Â¤Ã¥â€¦Â¶Ã©â€¡ÂÃ¨Â¦ÂÃ¯Â¼â€°Ã¯Â¼Å¡

```python
from videodb import SearchType, IndexType
from videodb.exceptions import InvalidRequestError

# Search using semantic search against the scene index.
# Use score_threshold to filter low-relevance noise (recommended: 0.3+).
try:
    results = video.search(
        query="person writing on a whiteboard",
        search_type=SearchType.semantic,
        index_type=IndexType.scene,
        scene_index_id=scene_index_id,
        score_threshold=0.3,
    )
    shots = results.get_shots()
except InvalidRequestError as e:
    if "No results found" in str(e):
        shots = []
    else:
        raise
```

**Ã©â€¡ÂÃ¨Â¦ÂÃ¨Â¯Â´Ã¦ËœÅ½Ã¯Â¼Å¡**

* Ã¥Â°â€  `SearchType.semantic` Ã¤Â¸Å½ `index_type=IndexType.scene` Ã§Â»â€œÃ¥ÂË†Ã¤Â½Â¿Ã§â€Â¨Ã¢â‚¬â€Ã¢â‚¬â€Ã¨Â¿â„¢Ã¦ËœÂ¯Ã¦Å“â‚¬Ã¥ÂÂ¯Ã©ÂÂ Ã§Å¡â€žÃ§Â»â€žÃ¥ÂË†Ã¯Â¼Å’Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¥â€”Ã©Â¤ÂÃ£â‚¬â€š
* `SearchType.scene` Ã¥Â­ËœÃ¥Å“Â¨Ã¯Â¼Å’Ã¤Â½â€ Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥Â¹Â¶Ã©ÂÅ¾Ã¥Å“Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¥â€”Ã©Â¤ÂÃ¤Â¸Â­Ã©Æ’Â½Ã¥ÂÂ¯Ã§â€Â¨Ã¯Â¼Ë†Ã¤Â¾â€¹Ã¥Â¦â€šÃ¥â€¦ÂÃ¨Â´Â¹Ã¥Â¥â€”Ã©Â¤ÂÃ¯Â¼â€°Ã£â‚¬â€šÃ¥Â»ÂºÃ¨Â®Â®Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `SearchType.semantic` Ã¤Â¸Å½ `IndexType.scene`Ã£â‚¬â€š
* `scene_index_id` Ã¥Ââ€šÃ¦â€¢Â°Ã¦ËœÂ¯Ã¥ÂÂ¯Ã©â‚¬â€°Ã§Å¡â€žÃ£â‚¬â€šÃ¥Â¦â€šÃ¦Å¾Å“Ã§Å“ÂÃ§â€¢Â¥Ã¯Â¼Å’Ã¦ÂÅ“Ã§Â´Â¢Ã¥Â°â€ Ã©â€™Ë†Ã¥Â¯Â¹Ã¨Â§â€ Ã©Â¢â€˜Ã¤Â¸Å Ã§Å¡â€žÃ¦â€°â‚¬Ã¦Å“â€°Ã¥Å“ÂºÃ¦â„¢Â¯Ã§Â´Â¢Ã¥Â¼â€¢Ã¨Â¿ÂÃ¨Â¡Å’Ã£â‚¬â€šÃ¤Â¼Â Ã©â‚¬â€™Ã¦Â­Â¤Ã¥Ââ€šÃ¦â€¢Â°Ã¤Â»Â¥Ã¥Â®Å¡Ã¤Â½ÂÃ§â€°Â¹Ã¥Â®Å¡Ã§Â´Â¢Ã¥Â¼â€¢Ã£â‚¬â€š
* Ã¦â€šÂ¨Ã¥ÂÂ¯Ã¤Â»Â¥Ã¤Â¸ÂºÃ¦Â¯ÂÃ¤Â¸ÂªÃ¨Â§â€ Ã©Â¢â€˜Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â¤Å¡Ã¤Â¸ÂªÃ¥Å“ÂºÃ¦â„¢Â¯Ã§Â´Â¢Ã¥Â¼â€¢Ã¯Â¼Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¤Â¸ÂÃ¥ÂÅ’Ã§Å¡â€žÃ¦ÂÂÃ§Â¤ÂºÃ¦Ë†â€“Ã¦ÂÂÃ¥Ââ€“Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼â€°Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â½Â¿Ã§â€Â¨ `scene_index_id` Ã§â€¹Â¬Ã§Â«â€¹Ã¦ÂÅ“Ã§Â´Â¢Ã¥Â®Æ’Ã¤Â»Â¬Ã£â‚¬â€š

### Ã¥Â¸Â¦Ã¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â­â€ºÃ©â‚¬â€°Ã§Å¡â€žÃ¥Å“ÂºÃ¦â„¢Â¯Ã¦ÂÅ“Ã§Â´Â¢

Ã¤Â½Â¿Ã§â€Â¨Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â´Â¢Ã¥Â¼â€¢Ã¥Å“ÂºÃ¦â„¢Â¯Ã¦â€”Â¶Ã¯Â¼Å’Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥Â°â€ Ã¨Â¯Â­Ã¤Â¹â€°Ã¦ÂÅ“Ã§Â´Â¢Ã¤Â¸Å½Ã¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â­â€ºÃ©â‚¬â€°Ã¥â„¢Â¨Ã§Â»â€œÃ¥ÂË†Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡

```python
from videodb import SearchType, IndexType

results = video.search(
    query="a skillful chasing scene",
    search_type=SearchType.semantic,
    index_type=IndexType.scene,
    scene_index_id=scene_index_id,
    filter=[{"camera_view": "road_ahead"}, {"action_type": "chasing"}],
)
```

Ã¦Å“â€°Ã¥â€¦Â³Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥â€¦Æ’Ã¦â€¢Â°Ã¦ÂÂ®Ã§Â´Â¢Ã¥Â¼â€¢Ã¥â€™Å’Ã§Â­â€ºÃ©â‚¬â€°Ã¦ÂÅ“Ã§Â´Â¢Ã§Å¡â€žÃ¥Â®Å’Ã¦â€¢Â´Ã§Â¤ÂºÃ¤Â¾â€¹Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦ [scene\_level\_metadata\_indexing Ã§Â¤ÂºÃ¤Â¾â€¹](https://github.com/video-db/videodb-cookbook/blob/main/quickstart/scene_level_metadata_indexing.ipynb)Ã£â‚¬â€š

## Ã¥Â¤â€žÃ§Ââ€ Ã§Â»â€œÃ¦Å¾Å“

### Ã¨Å½Â·Ã¥Ââ€“Ã§â€°â€¡Ã¦Â®Âµ

Ã¨Â®Â¿Ã©â€”Â®Ã¥Ââ€¢Ã¤Â¸ÂªÃ§Â»â€œÃ¦Å¾Å“Ã§â€°â€¡Ã¦Â®ÂµÃ¯Â¼Å¡

```python
results = video.search("your query")

for shot in results.get_shots():
    print(f"Video: {shot.video_id}")
    print(f"Start: {shot.start:.2f}s")
    print(f"End: {shot.end:.2f}s")
    print(f"Text: {shot.text}")
    print("---")
```

### Ã¦â€™Â­Ã¦â€Â¾Ã§Â¼â€“Ã¨Â¯â€˜Ã§Â»â€œÃ¦Å¾Å“

Ã¥Â°â€ Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Å’Â¹Ã©â€¦ÂÃ§â€°â€¡Ã¦Â®ÂµÃ¤Â½Å“Ã¤Â¸ÂºÃ¥Ââ€¢Ã¤Â¸ÂªÃ§Â¼â€“Ã¨Â¯â€˜Ã¨Â§â€ Ã©Â¢â€˜Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦ÂµÂÃ¥Â¼ÂÃ¦â€™Â­Ã¦â€Â¾Ã¯Â¼Å¡

```python
results = video.search("your query")
stream_url = results.compile()
results.play()  # opens compiled stream in browser
```

### Ã¦ÂÂÃ¥Ââ€“Ã¥â€°ÂªÃ¨Â¾â€˜

Ã¤Â¸â€¹Ã¨Â½Â½Ã¦Ë†â€“Ã¦ÂµÂÃ¥Â¼ÂÃ¦â€™Â­Ã¦â€Â¾Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ§Â»â€œÃ¦Å¾Å“Ã§â€°â€¡Ã¦Â®ÂµÃ¯Â¼Å¡

```python
for shot in results.get_shots():
    stream_url = shot.generate_stream()
    print(f"Clip: {stream_url}")
```

## Ã¨Â·Â¨Ã©â€ºâ€ Ã¥ÂË†Ã¦ÂÅ“Ã§Â´Â¢

Ã¨Â·Â¨Ã©â€ºâ€ Ã¥ÂË†Ã¤Â¸Â­Ã§Å¡â€žÃ¦â€°â‚¬Ã¦Å“â€°Ã¨Â§â€ Ã©Â¢â€˜Ã¨Â¿â€ºÃ¨Â¡Å’Ã¦ÂÅ“Ã§Â´Â¢Ã¯Â¼Å¡

```python
coll = conn.get_collection()

# Search across all videos in the collection
results = coll.search(
    query="product demo",
    search_type=SearchType.semantic,
)

for shot in results.get_shots():
    print(f"Video: {shot.video_id} [{shot.start:.1f}s - {shot.end:.1f}s]")
```

> **Ã¦Â³Â¨Ã¦â€žÂÃ¯Â¼Å¡** Ã©â€ºâ€ Ã¥ÂË†Ã§ÂºÂ§Ã¦ÂÅ“Ã§Â´Â¢Ã¤Â»â€¦Ã¦â€Â¯Ã¦Å’Â `SearchType.semantic`Ã£â‚¬â€šÃ¥Â°â€  `SearchType.keyword` Ã¦Ë†â€“ `SearchType.scene` Ã¤Â¸Å½ `coll.search()` Ã§Â»â€œÃ¥ÂË†Ã¤Â½Â¿Ã§â€Â¨Ã¥Â°â€ Ã¥Â¼â€¢Ã¥Ââ€˜ `NotImplementedError`Ã£â‚¬â€šÃ¨Â¦ÂÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ¦Ë†â€“Ã¥Å“ÂºÃ¦â„¢Â¯Ã¦ÂÅ“Ã§Â´Â¢Ã¯Â¼Å’Ã¨Â¯Â·Ã¦â€Â¹Ã¤Â¸ÂºÃ¥Â¯Â¹Ã¥Ââ€¢Ã¤Â¸ÂªÃ¨Â§â€ Ã©Â¢â€˜Ã¤Â½Â¿Ã§â€Â¨ `video.search()`Ã£â‚¬â€š

## Ã¦ÂÅ“Ã§Â´Â¢ + Ã§Â¼â€“Ã¨Â¯â€˜

Ã¥Â¯Â¹Ã¥Å’Â¹Ã©â€¦ÂÃ§â€°â€¡Ã¦Â®ÂµÃ¨Â¿â€ºÃ¨Â¡Å’Ã§Â´Â¢Ã¥Â¼â€¢Ã£â‚¬ÂÃ¦ÂÅ“Ã§Â´Â¢Ã¥Â¹Â¶Ã§Â¼â€“Ã¨Â¯â€˜Ã¦Ë†ÂÃ¥Ââ€¢Ã¤Â¸ÂªÃ¥ÂÂ¯Ã¦â€™Â­Ã¦â€Â¾Ã§Å¡â€žÃ¦ÂµÂÃ¯Â¼Å¡

```python
video.index_spoken_words(force=True)
results = video.search(query="your query", search_type=SearchType.semantic)
stream_url = results.compile()
print(stream_url)
```

## Ã¦ÂÂÃ§Â¤Âº

* **Ã¤Â¸â‚¬Ã¦Â¬Â¡Ã§Â´Â¢Ã¥Â¼â€¢Ã¯Â¼Å’Ã¥Â¤Å¡Ã¦Â¬Â¡Ã¦ÂÅ“Ã§Â´Â¢**Ã¯Â¼Å¡Ã§Â´Â¢Ã¥Â¼â€¢Ã¦ËœÂ¯Ã¦Ëœâ€šÃ¨Â´ÂµÃ§Å¡â€žÃ¦â€œÂÃ¤Â½Å“Ã£â‚¬â€šÃ¤Â¸â‚¬Ã¦â€”Â¦Ã§Â´Â¢Ã¥Â¼â€¢Ã¥Â®Å’Ã¦Ë†ÂÃ¯Â¼Å’Ã¦ÂÅ“Ã§Â´Â¢Ã¤Â¼Å¡Ã¥Â¾Ë†Ã¥Â¿Â«Ã£â‚¬â€š
* **Ã§Â»â€žÃ¥ÂË†Ã§Â´Â¢Ã¥Â¼â€¢Ã§Â±Â»Ã¥Å¾â€¹**Ã¯Â¼Å¡Ã¥ÂÅ’Ã¦â€”Â¶Ã§Â´Â¢Ã¥Â¼â€¢Ã¥ÂÂ£Ã¨Â¯Â­Ã¨Â¯ÂÃ¥â€™Å’Ã¥Å“ÂºÃ¦â„¢Â¯Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¾Â¿Ã¥Å“Â¨Ã¥ÂÅ’Ã¤Â¸â‚¬Ã¨Â§â€ Ã©Â¢â€˜Ã¤Â¸Å Ã¥ÂÂ¯Ã§â€Â¨Ã¦â€°â‚¬Ã¦Å“â€°Ã¦ÂÅ“Ã§Â´Â¢Ã§Â±Â»Ã¥Å¾â€¹Ã£â‚¬â€š
* **Ã¤Â¼ËœÃ¥Å’â€“Ã¦Å¸Â¥Ã¨Â¯Â¢**Ã¯Â¼Å¡Ã¨Â¯Â­Ã¤Â¹â€°Ã¦ÂÅ“Ã§Â´Â¢Ã¦Å“â‚¬Ã©â‚¬â€šÃ¥ÂË†Ã¦ÂÂÃ¨Â¿Â°Ã¦â‚¬Â§Ã§Å¡â€žÃ¨â€¡ÂªÃ§â€žÂ¶Ã¨Â¯Â­Ã¨Â¨â‚¬Ã§Å¸Â­Ã¨Â¯Â­Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥Ââ€¢Ã¤Â¸ÂªÃ¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ£â‚¬â€š
* **Ã¤Â½Â¿Ã§â€Â¨Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ¦ÂÅ“Ã§Â´Â¢Ã¦ÂÂÃ©Â«ËœÃ§Â²Â¾Ã¥ÂºÂ¦**Ã¯Â¼Å¡Ã¥Â½â€œÃ¦â€šÂ¨Ã©Å“â‚¬Ã¨Â¦ÂÃ§Â²Â¾Ã§Â¡Â®Ã§Å¡â€žÃ¦Å“Â¯Ã¨Â¯Â­Ã¥Å’Â¹Ã©â€¦ÂÃ¦â€”Â¶Ã¯Â¼Å’Ã¥â€¦Â³Ã©â€Â®Ã¨Â¯ÂÃ¦ÂÅ“Ã§Â´Â¢Ã¥ÂÂ¯Ã¤Â»Â¥Ã©ÂÂ¿Ã¥â€¦ÂÃ¨Â¯Â­Ã¤Â¹â€°Ã¦Â¼â€šÃ§Â§Â»Ã£â‚¬â€š
* **Ã¥Â¤â€žÃ§Ââ€ Ã¢â‚¬Å“Ã¦Å“ÂªÃ¦â€°Â¾Ã¥Ë†Â°Ã§Â»â€œÃ¦Å¾Å“Ã¢â‚¬Â**Ã¯Â¼Å¡Ã¥Â½â€œÃ¦Â²Â¡Ã¦Å“â€°Ã§Â»â€œÃ¦Å¾Å“Ã¥Å’Â¹Ã©â€¦ÂÃ¦â€”Â¶Ã¯Â¼Å’`video.search()` Ã¤Â¼Å¡Ã¥Â¼â€¢Ã¥Ââ€˜ `InvalidRequestError`Ã£â‚¬â€šÃ¥Â§â€¹Ã§Â»Ë†Ã¥Â°â€ Ã¦ÂÅ“Ã§Â´Â¢Ã¨Â°Æ’Ã§â€Â¨Ã¥Å’â€¦Ã¨Â£â€¦Ã¥Å“Â¨ try/except Ã¤Â¸Â­Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Â°â€  `"No results found"` Ã¨Â§â€ Ã¤Â¸ÂºÃ§Â©ÂºÃ§Â»â€œÃ¦Å¾Å“Ã©â€ºâ€ Ã£â‚¬â€š
* **Ã¨Â¿â€¡Ã¦Â»Â¤Ã¥Å“ÂºÃ¦â„¢Â¯Ã¦ÂÅ“Ã§Â´Â¢Ã¥â„¢ÂªÃ¥Â£Â°**Ã¯Â¼Å¡Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¦Â¨Â¡Ã§Â³Å Ã¦Å¸Â¥Ã¨Â¯Â¢Ã¯Â¼Å’Ã¨Â¯Â­Ã¤Â¹â€°Ã¥Å“ÂºÃ¦â„¢Â¯Ã¦ÂÅ“Ã§Â´Â¢Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¼Å¡Ã¨Â¿â€Ã¥â€ºÅ¾Ã¤Â½Å½Ã§â€ºÂ¸Ã¥â€¦Â³Ã¦â‚¬Â§Ã§Å¡â€žÃ§Â»â€œÃ¦Å¾Å“Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨ `score_threshold=0.3`Ã¯Â¼Ë†Ã¦Ë†â€“Ã¦â€ºÂ´Ã©Â«ËœÃ¥â‚¬Â¼Ã¯Â¼â€°Ã¦ÂÂ¥Ã¨Â¿â€¡Ã¦Â»Â¤Ã¥â„¢ÂªÃ¥Â£Â°Ã£â‚¬â€š
* **Ã¥Â¹â€šÃ§Â­â€°Ã§Â´Â¢Ã¥Â¼â€¢**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `index_spoken_words(force=True)` Ã¥ÂÂ¯Ã¤Â»Â¥Ã¥Â®â€°Ã¥â€¦Â¨Ã¥Å“Â°Ã©â€¡ÂÃ¦â€“Â°Ã§Â´Â¢Ã¥Â¼â€¢Ã£â‚¬â€š`index_scenes()` Ã¦Â²Â¡Ã¦Å“â€° `force` Ã¥Ââ€šÃ¦â€¢Â°Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Â°â€ Ã¥â€¦Â¶Ã¥Å’â€¦Ã¨Â£â€¦Ã¥Å“Â¨ try/except Ã¤Â¸Â­Ã¯Â¼Å’Ã¥Â¹Â¶Ã¤Â½Â¿Ã§â€Â¨ `re.search(r"id\s+([a-f0-9]+)", str(e))` Ã¤Â»Å½Ã©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¤Â¸Â­Ã¦ÂÂÃ¥Ââ€“Ã§Å½Â°Ã¦Å“â€°Ã§Å¡â€ž `scene_index_id`Ã£â‚¬â€š
