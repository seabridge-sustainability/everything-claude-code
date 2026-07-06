# Ã¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ¤Â¸Å½Ã¦â€™Â­Ã¦â€Â¾

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


VideoDB Ã¦Å’â€°Ã©Å“â‚¬Ã§â€Å¸Ã¦Ë†ÂÃ¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ¯Â¼Å’Ã¨Â¿â€Ã¥â€ºÅ¾ HLS Ã¥â€¦Â¼Ã¥Â®Â¹Ã§Å¡â€ž URLÃ¯Â¼Å’Ã¥ÂÂ¯Ã¥Å“Â¨Ã¤Â»Â»Ã¤Â½â€¢Ã¦Â â€¡Ã¥â€¡â€ Ã¨Â§â€ Ã©Â¢â€˜Ã¦â€™Â­Ã¦â€Â¾Ã¥â„¢Â¨Ã¤Â¸Â­Ã¥ÂÂ³Ã¦â€”Â¶Ã¦â€™Â­Ã¦â€Â¾Ã£â‚¬â€šÃ¦â€”Â Ã©Å“â‚¬Ã¦Â¸Â²Ã¦Å¸â€œÃ¦â€”Â¶Ã©â€”Â´Ã¦Ë†â€“Ã¥Â¯Â¼Ã¥â€¡ÂºÃ§Â­â€°Ã¥Â¾â€¦Ã¢â‚¬â€Ã¢â‚¬â€Ã§Â¼â€“Ã¨Â¾â€˜Ã£â‚¬ÂÃ¦ÂÅ“Ã§Â´Â¢Ã¥â€™Å’Ã§Â»â€žÃ¥ÂË†Ã¥â€ â€¦Ã¥Â®Â¹Ã¥ÂÂ¯Ã§Â«â€¹Ã¥ÂÂ³Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ£â‚¬â€š

## Ã¥â€°ÂÃ¦ÂÂÃ¦ÂÂ¡Ã¤Â»Â¶

Ã¨Â§â€ Ã©Â¢â€˜**Ã¥Â¿â€¦Ã©Â¡Â»Ã¤Â¸Å Ã¤Â¼Â **Ã¥Ë†Â°Ã¦Å¸ÂÃ¤Â¸ÂªÃ©â€ºâ€ Ã¥ÂË†Ã¥ÂÅ½Ã¯Â¼Å’Ã¦â€°ÂÃ¨Æ’Â½Ã§â€Å¸Ã¦Ë†ÂÃ¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ£â‚¬â€šÃ¥Â¯Â¹Ã¤ÂºÅ½Ã¥Å¸ÂºÃ¤ÂºÅ½Ã¦ÂÅ“Ã§Â´Â¢Ã§Å¡â€žÃ¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ¯Â¼Å’Ã¨Â§â€ Ã©Â¢â€˜Ã¨Â¿ËœÃ¥Â¿â€¦Ã©Â¡Â»Ã¨Â¢Â«**Ã§Â´Â¢Ã¥Â¼â€¢**Ã¯Â¼Ë†Ã¥ÂÂ£Ã¨Â¯Â­Ã¥Ââ€¢Ã¨Â¯ÂÃ¥â€™Å’/Ã¦Ë†â€“Ã¥Å“ÂºÃ¦â„¢Â¯Ã¯Â¼â€°Ã£â‚¬â€šÃ¦Å“â€°Ã¥â€¦Â³Ã§Â´Â¢Ã¥Â¼â€¢Ã§Å¡â€žÃ¨Â¯Â¦Ã§Â»â€ Ã¤Â¿Â¡Ã¦ÂÂ¯Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦ [search.md](search.md)Ã£â‚¬â€š

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¦â€šÃ¥Â¿Âµ

### Ã¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ§â€Å¸Ã¦Ë†Â

VideoDB Ã¤Â¸Â­Ã§Å¡â€žÃ¦Â¯ÂÃ¤Â¸ÂªÃ¨Â§â€ Ã©Â¢â€˜Ã£â‚¬ÂÃ¦ÂÅ“Ã§Â´Â¢Ã§Â»â€œÃ¦Å¾Å“Ã¥â€™Å’Ã¦â€”Â¶Ã©â€”Â´Ã§ÂºÂ¿Ã©Æ’Â½Ã¥ÂÂ¯Ã¤Â»Â¥Ã§â€Å¸Ã¦Ë†ÂÃ¤Â¸â‚¬Ã¤Â¸Âª**Ã¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œ URL**Ã£â‚¬â€šÃ¨Â¯Â¥ URL Ã¦Å’â€¡Ã¥Ââ€˜Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Å’â€°Ã©Å“â‚¬Ã§Â¼â€“Ã¨Â¯â€˜Ã§Å¡â€ž HLSÃ¯Â¼Ë†HTTP Ã¥Â®Å¾Ã¦â€”Â¶Ã¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ¯Â¼â€°Ã¦Â¸â€¦Ã¥Ââ€¢Ã£â‚¬â€š

```python
# From a video
stream_url = video.generate_stream()

# From a timeline
stream_url = timeline.generate_stream()

# From search results
stream_url = results.compile()
```

## Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¥Ââ€¢Ã¤Â¸ÂªÃ¨Â§â€ Ã©Â¢â€˜

### Ã¥Å¸ÂºÃ¦Å“Â¬Ã¦â€™Â­Ã¦â€Â¾

```python
import videodb

conn = videodb.connect()
coll = conn.get_collection()
video = coll.get_video("your-video-id")

# Generate stream URL
stream_url = video.generate_stream()
print(f"Stream: {stream_url}")

# Open in default browser
video.play()
```

### Ã¥Â¸Â¦Ã¥Â­â€”Ã¥Â¹â€¢

```python
# Index and add subtitles first
video.index_spoken_words(force=True)
stream_url = video.add_subtitle()

# Returned URL already includes subtitles
print(f"Subtitled stream: {stream_url}")
```

### Ã§â€°Â¹Ã¥Â®Å¡Ã§â€°â€¡Ã¦Â®Âµ

Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¤Â¼Â Ã©â‚¬â€™Ã¦â€”Â¶Ã©â€”Â´Ã¦Ë†Â³Ã¨Å’Æ’Ã¥â€ºÂ´Ã§Å¡â€žÃ¦â€”Â¶Ã©â€”Â´Ã§ÂºÂ¿Ã¯Â¼Å’Ã¤Â»â€¦Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¨Â§â€ Ã©Â¢â€˜Ã§Å¡â€žÃ¤Â¸â‚¬Ã©Æ’Â¨Ã¥Ë†â€ Ã¯Â¼Å¡

```python
# Stream seconds 10-30 and 60-90
stream_url = video.generate_stream(timeline=[(10, 30), (60, 90)])
print(f"Segment stream: {stream_url}")
```

## Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¦â€”Â¶Ã©â€”Â´Ã§ÂºÂ¿Ã§Â»â€žÃ¥ÂË†

Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤Å¡Ã¨Âµâ€žÃ¤ÂºÂ§Ã§Â»â€žÃ¥ÂË†Ã¥Â¹Â¶Ã¥Â®Å¾Ã¦â€”Â¶Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¯Â¼Å¡

```python
import videodb
from videodb.timeline import Timeline
from videodb.asset import VideoAsset, AudioAsset, ImageAsset, TextAsset, TextStyle

conn = videodb.connect()
coll = conn.get_collection()

video = coll.get_video(video_id)
music = coll.get_audio(music_id)

timeline = Timeline(conn)

# Main video content
timeline.add_inline(VideoAsset(asset_id=video.id))

# Background music overlay (starts at second 0)
timeline.add_overlay(0, AudioAsset(asset_id=music.id))

# Text overlay at the beginning
timeline.add_overlay(0, TextAsset(
    text="Live Demo",
    duration=3,
    style=TextStyle(fontsize=48, fontcolor="white", boxcolor="#000000"),
))

# Generate the composed stream
stream_url = timeline.generate_stream()
print(f"Composed stream: {stream_url}")
```

**Ã©â€¡ÂÃ¨Â¦ÂÃ¨Â¯Â´Ã¦ËœÅ½Ã¯Â¼Å¡**`add_inline()` Ã¤Â»â€¦Ã¦Å½Â¥Ã¥Ââ€” `VideoAsset`Ã£â‚¬â€šÃ¥Â¯Â¹Ã¤ÂºÅ½ `AudioAsset`Ã£â‚¬Â`ImageAsset` Ã¥â€™Å’ `TextAsset`Ã¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨ `add_overlay()`Ã£â‚¬â€š

Ã¦Å“â€°Ã¥â€¦Â³Ã¨Â¯Â¦Ã§Â»â€ Ã§Å¡â€žÃ¦â€”Â¶Ã©â€”Â´Ã§ÂºÂ¿Ã§Â¼â€“Ã¨Â¾â€˜Ã¯Â¼Å’Ã¨Â¯Â·Ã¥Ââ€šÃ©Ëœâ€¦ [editor.md](editor.md)Ã£â‚¬â€š

## Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¦ÂÅ“Ã§Â´Â¢Ã§Â»â€œÃ¦Å¾Å“

Ã¥Â°â€ Ã¦ÂÅ“Ã§Â´Â¢Ã§Â»â€œÃ¦Å¾Å“Ã§Â¼â€“Ã¨Â¯â€˜Ã¤Â¸ÂºÃ¥Å’â€¦Ã¥ÂÂ«Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Å’Â¹Ã©â€¦ÂÃ§â€°â€¡Ã¦Â®ÂµÃ§Å¡â€žÃ¥Ââ€¢Ã¤Â¸â‚¬Ã¦ÂµÂÃ¯Â¼Å¡

```python
from videodb import SearchType
from videodb.exceptions import InvalidRequestError

video.index_spoken_words(force=True)
try:
    results = video.search("key announcement", search_type=SearchType.semantic)

    # Compile all matching shots into one stream
    stream_url = results.compile()
    print(f"Search results stream: {stream_url}")

    # Or play directly
    results.play()
except InvalidRequestError as exc:
    if "No results found" in str(exc):
        print("No matching announcement segments were found.")
    else:
        raise
```

### Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¥Ââ€¢Ã¤Â¸ÂªÃ¦ÂÅ“Ã§Â´Â¢Ã§Â»â€œÃ¦Å¾Å“

```python
from videodb.exceptions import InvalidRequestError

try:
    results = video.search("product demo", search_type=SearchType.semantic)
    for i, shot in enumerate(results.get_shots()):
        stream_url = shot.generate_stream()
        print(f"Hit {i+1} [{shot.start:.1f}s-{shot.end:.1f}s]: {stream_url}")
except InvalidRequestError as exc:
    if "No results found" in str(exc):
        print("No product demo segments matched the query.")
    else:
        raise
```

## Ã©Å¸Â³Ã©Â¢â€˜Ã¦â€™Â­Ã¦â€Â¾

Ã¨Å½Â·Ã¥Ââ€“Ã©Å¸Â³Ã©Â¢â€˜Ã¥â€ â€¦Ã¥Â®Â¹Ã§Å¡â€žÃ§Â­Â¾Ã¥ÂÂÃ¦â€™Â­Ã¦â€Â¾ URLÃ¯Â¼Å¡

```python
audio = coll.get_audio(audio_id)
playback_url = audio.generate_url()
print(f"Audio URL: {playback_url}")
```

## Ã¥Â®Å’Ã¦â€¢Â´Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã§Â¤ÂºÃ¤Â¾â€¹

### Ã¦ÂÅ“Ã§Â´Â¢Ã¥Ë†Â°Ã¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ§Â®Â¡Ã©Ââ€œ

Ã¥Å“Â¨Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹Ã¤Â¸Â­Ã§Â»â€œÃ¥ÂË†Ã¦ÂÅ“Ã§Â´Â¢Ã£â‚¬ÂÃ¦â€”Â¶Ã©â€”Â´Ã§ÂºÂ¿Ã§Â»â€žÃ¥ÂË†Ã¥â€™Å’Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¯Â¼Å¡

```python
import videodb
from videodb import SearchType
from videodb.exceptions import InvalidRequestError
from videodb.timeline import Timeline
from videodb.asset import VideoAsset, TextAsset, TextStyle

conn = videodb.connect()
coll = conn.get_collection()
video = coll.get_video("your-video-id")

video.index_spoken_words(force=True)

# Search for key moments
queries = ["introduction", "main demo", "Q&A"]
timeline = Timeline(conn)
timeline_offset = 0.0

for query in queries:
    try:
        results = video.search(query, search_type=SearchType.semantic)
        shots = results.get_shots()
    except InvalidRequestError as exc:
        if "No results found" in str(exc):
            shots = []
        else:
            raise

    if not shots:
        continue

    # Add the section label where this batch starts in the compiled timeline
    timeline.add_overlay(timeline_offset, TextAsset(
        text=query.title(),
        duration=2,
        style=TextStyle(fontsize=36, fontcolor="white", boxcolor="#222222"),
    ))

    for shot in shots:
        timeline.add_inline(
            VideoAsset(asset_id=shot.video_id, start=shot.start, end=shot.end)
        )
        timeline_offset += shot.end - shot.start

stream_url = timeline.generate_stream()
print(f"Dynamic compilation: {stream_url}")
```

### Ã¥Â¤Å¡Ã¨Â§â€ Ã©Â¢â€˜Ã¦ÂµÂ

Ã¥Â°â€ Ã¦ÂÂ¥Ã¨â€¡ÂªÃ¤Â¸ÂÃ¥ÂÅ’Ã¨Â§â€ Ã©Â¢â€˜Ã§Å¡â€žÃ§â€°â€¡Ã¦Â®ÂµÃ§Â»â€žÃ¥ÂË†Ã¦Ë†ÂÃ¥Ââ€¢Ã¤Â¸â‚¬Ã¦ÂµÂÃ¯Â¼Å¡

```python
import videodb
from videodb.timeline import Timeline
from videodb.asset import VideoAsset

conn = videodb.connect()
coll = conn.get_collection()

video_clips = [
    {"id": "vid_001", "start": 0, "end": 15},
    {"id": "vid_002", "start": 10, "end": 30},
    {"id": "vid_003", "start": 5, "end": 25},
]

timeline = Timeline(conn)
for clip in video_clips:
    timeline.add_inline(
        VideoAsset(asset_id=clip["id"], start=clip["start"], end=clip["end"])
    )

stream_url = timeline.generate_stream()
print(f"Multi-video stream: {stream_url}")
```

### Ã¦ÂÂ¡Ã¤Â»Â¶Ã¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ§Â»â€žÃ¨Â£â€¦

Ã¦Â Â¹Ã¦ÂÂ®Ã¦ÂÅ“Ã§Â´Â¢Ã§Â»â€œÃ¦Å¾Å“Ã§Å¡â€žÃ¥ÂÂ¯Ã§â€Â¨Ã¦â‚¬Â§Ã¥Å Â¨Ã¦â‚¬ÂÃ¦Å¾â€žÃ¥Â»ÂºÃ¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ¯Â¼Å¡

```python
import videodb
from videodb import SearchType
from videodb.exceptions import InvalidRequestError
from videodb.timeline import Timeline
from videodb.asset import VideoAsset, TextAsset, TextStyle

conn = videodb.connect()
coll = conn.get_collection()
video = coll.get_video("your-video-id")

video.index_spoken_words(force=True)

timeline = Timeline(conn)

# Try to find specific content; fall back to full video
topics = ["opening remarks", "technical deep dive", "closing"]

found_any = False
timeline_offset = 0.0
for topic in topics:
    try:
        results = video.search(topic, search_type=SearchType.semantic)
        shots = results.get_shots()
    except InvalidRequestError as exc:
        if "No results found" in str(exc):
            shots = []
        else:
            raise

    if shots:
        found_any = True
        timeline.add_overlay(timeline_offset, TextAsset(
            text=topic.title(),
            duration=2,
            style=TextStyle(fontsize=32, fontcolor="white", boxcolor="#1a1a2e"),
        ))
        for shot in shots:
            timeline.add_inline(
                VideoAsset(asset_id=shot.video_id, start=shot.start, end=shot.end)
            )
            timeline_offset += shot.end - shot.start

if found_any:
    stream_url = timeline.generate_stream()
    print(f"Curated stream: {stream_url}")
else:
    # Fall back to full video stream
    stream_url = video.generate_stream()
    print(f"Full video stream: {stream_url}")
```

### Ã§â€ºÂ´Ã¦â€™Â­Ã¤Âºâ€¹Ã¤Â»Â¶Ã¥â€ºÅ¾Ã©Â¡Â¾

Ã¥Â°â€ Ã¤Âºâ€¹Ã¤Â»Â¶Ã¥Â½â€¢Ã©Å¸Â³Ã¥Â¤â€žÃ§Ââ€ Ã¦Ë†ÂÃ¥Å’â€¦Ã¥ÂÂ«Ã¥Â¤Å¡Ã¤Â¸ÂªÃ©Æ’Â¨Ã¥Ë†â€ Ã§Å¡â€žÃ¥ÂÂ¯Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¥â€ºÅ¾Ã©Â¡Â¾Ã¯Â¼Å¡

```python
import videodb
from videodb import SearchType
from videodb.exceptions import InvalidRequestError
from videodb.timeline import Timeline
from videodb.asset import VideoAsset, AudioAsset, ImageAsset, TextAsset, TextStyle

conn = videodb.connect()
coll = conn.get_collection()

# Upload event recording
event = coll.upload(url="https://example.com/event-recording.mp4")
event.index_spoken_words(force=True)

# Generate background music
music = coll.generate_music(
    prompt="upbeat corporate background music",
    duration=120,
)

# Generate title image
title_img = coll.generate_image(
    prompt="modern event recap title card, dark background, professional",
    aspect_ratio="16:9",
)

# Build the recap timeline
timeline = Timeline(conn)
timeline_offset = 0.0

# Main video segments from search
try:
    keynote = event.search("keynote announcement", search_type=SearchType.semantic)
    keynote_shots = keynote.get_shots()[:5]
except InvalidRequestError as exc:
    if "No results found" in str(exc):
        keynote_shots = []
    else:
        raise
if keynote_shots:
    keynote_start = timeline_offset
    for shot in keynote_shots:
        timeline.add_inline(
            VideoAsset(asset_id=shot.video_id, start=shot.start, end=shot.end)
        )
        timeline_offset += shot.end - shot.start
else:
    keynote_start = None

try:
    demo = event.search("product demo", search_type=SearchType.semantic)
    demo_shots = demo.get_shots()[:5]
except InvalidRequestError as exc:
    if "No results found" in str(exc):
        demo_shots = []
    else:
        raise
if demo_shots:
    demo_start = timeline_offset
    for shot in demo_shots:
        timeline.add_inline(
            VideoAsset(asset_id=shot.video_id, start=shot.start, end=shot.end)
        )
        timeline_offset += shot.end - shot.start
else:
    demo_start = None

# Overlay title card image
timeline.add_overlay(0, ImageAsset(
    asset_id=title_img.id, width=100, height=100, x=80, y=20, duration=5
))

# Overlay section labels at the correct timeline offsets
if keynote_start is not None:
    timeline.add_overlay(max(5, keynote_start), TextAsset(
        text="Keynote Highlights",
        duration=3,
        style=TextStyle(fontsize=40, fontcolor="white", boxcolor="#0d1117"),
    ))
if demo_start is not None:
    timeline.add_overlay(max(5, demo_start), TextAsset(
        text="Demo Highlights",
        duration=3,
        style=TextStyle(fontsize=36, fontcolor="white", boxcolor="#0d1117"),
    ))

# Overlay background music
timeline.add_overlay(0, AudioAsset(
    asset_id=music.id, fade_in_duration=3
))

# Stream the final recap
stream_url = timeline.generate_stream()
print(f"Event recap: {stream_url}")
```

***

## Ã¦ÂÂÃ§Â¤Âº

* **HLS Ã¥â€¦Â¼Ã¥Â®Â¹Ã¦â‚¬Â§**Ã¯Â¼Å¡Ã¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œ URL Ã¨Â¿â€Ã¥â€ºÅ¾ HLS Ã¦Â¸â€¦Ã¥Ââ€¢Ã¯Â¼Ë†`.m3u8`Ã¯Â¼â€°Ã£â‚¬â€šÃ¥Â®Æ’Ã¤Â»Â¬Ã¥Å“Â¨ Safari Ã¤Â¸Â­Ã¥Å½Å¸Ã§â€Å¸Ã¥Â·Â¥Ã¤Â½Å“Ã¯Â¼Å’Ã¥Å“Â¨Ã¥â€¦Â¶Ã¤Â»â€“Ã¦ÂµÂÃ¨Â§Ë†Ã¥â„¢Â¨Ã¤Â¸Â­Ã©â‚¬Å¡Ã¨Â¿â€¡ hls.js Ã¦Ë†â€“Ã§Â±Â»Ã¤Â¼Â¼Ã¥Âºâ€œÃ¥Â·Â¥Ã¤Â½Å“Ã£â‚¬â€š
* **Ã¦Å’â€°Ã©Å“â‚¬Ã§Â¼â€“Ã¨Â¯â€˜**Ã¯Â¼Å¡Ã¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œÃ¥Å“Â¨Ã¨Â¯Â·Ã¦Â±â€šÃ¦â€”Â¶Ã¥Å“Â¨Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã§Â«Â¯Ã§Â¼â€“Ã¨Â¯â€˜Ã£â‚¬â€šÃ©Â¦â€“Ã¦Â¬Â¡Ã¦â€™Â­Ã¦â€Â¾Ã¥ÂÂ¯Ã¨Æ’Â½Ã¤Â¼Å¡Ã¦Å“â€°Ã§Å¸Â­Ã¦Å¡â€šÃ§Å¡â€žÃ§Â¼â€“Ã¨Â¯â€˜Ã¥Â»Â¶Ã¨Â¿Å¸Ã¯Â¼â€ºÃ¥ÂÅ’Ã¤Â¸â‚¬Ã§Â»â€žÃ¥ÂË†Ã§Å¡â€žÃ¥ÂÅ½Ã§Â»Â­Ã¦â€™Â­Ã¦â€Â¾Ã¤Â¼Å¡Ã¨Â¢Â«Ã§Â¼â€œÃ¥Â­ËœÃ£â‚¬â€š
* **Ã§Â¼â€œÃ¥Â­Ëœ**Ã¯Â¼Å¡Ã§Â¬Â¬Ã¤ÂºÅ’Ã¦Â¬Â¡Ã¨Â°Æ’Ã§â€Â¨ `video.generate_stream()`Ã¯Â¼Ë†Ã¤Â¸ÂÃ¥Â¸Â¦Ã¥Ââ€šÃ¦â€¢Â°Ã¯Â¼â€°Ã¥Â°â€ Ã¨Â¿â€Ã¥â€ºÅ¾Ã§Â¼â€œÃ¥Â­ËœÃ§Å¡â€žÃ¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œ URLÃ¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã©â€¡ÂÃ¦â€“Â°Ã§Â¼â€“Ã¨Â¯â€˜Ã£â‚¬â€š
* **Ã§â€°â€¡Ã¦Â®ÂµÃ¦ÂµÂ**Ã¯Â¼Å¡`video.generate_stream(timeline=[(start, end)])` Ã¦ËœÂ¯Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ§â€°Â¹Ã¥Â®Å¡Ã¥â€°ÂªÃ¨Â¾â€˜Ã§Å¡â€žÃ¦Å“â‚¬Ã¥Â¿Â«Ã¦â€“Â¹Ã¥Â¼ÂÃ¯Â¼Å’Ã¦â€”Â Ã©Å“â‚¬Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€ž `Timeline` Ã¥Â¯Â¹Ã¨Â±Â¡Ã£â‚¬â€š
* **Ã¥â€ â€¦Ã¨Ââ€Ã¤Â¸Å½Ã¥ÂÂ Ã¥Å Â **Ã¯Â¼Å¡`add_inline()` Ã¤Â»â€¦Ã¦Å½Â¥Ã¥Ââ€” `VideoAsset` Ã¥Â¹Â¶Ã¥Â°â€ Ã¨Âµâ€žÃ¤ÂºÂ§Ã¦Å’â€°Ã©Â¡ÂºÃ¥ÂºÂÃ¦â€Â¾Ã§Â½Â®Ã¥Å“Â¨Ã¤Â¸Â»Ã¨Â½Â¨Ã©Ââ€œÃ¤Â¸Å Ã£â‚¬â€š`add_overlay()` Ã¦Å½Â¥Ã¥Ââ€” `AudioAsset`Ã£â‚¬Â`ImageAsset` Ã¥â€™Å’ `TextAsset`Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Å“Â¨Ã§Â»â„¢Ã¥Â®Å¡Ã¥Â¼â‚¬Ã¥Â§â€¹Ã¦â€”Â¶Ã©â€”Â´Ã¥Â°â€ Ã¥Â®Æ’Ã¤Â»Â¬Ã¥ÂÂ Ã¥Å Â Ã¥Å“Â¨Ã©Â¡Â¶Ã©Æ’Â¨Ã£â‚¬â€š
* **TextStyle Ã©Â»ËœÃ¨Â®Â¤Ã¥â‚¬Â¼**Ã¯Â¼Å¡`TextStyle` Ã©Â»ËœÃ¨Â®Â¤Ã¤Â¸Âº `font='Sans'`Ã£â‚¬Â`fontcolor='black'`Ã£â‚¬â€šÃ¥Â¯Â¹Ã¤ÂºÅ½Ã¦â€“â€¡Ã¦Å“Â¬Ã¨Æ’Å’Ã¦â„¢Â¯Ã¨â€°Â²Ã¯Â¼Å’Ã¨Â¯Â·Ã¤Â½Â¿Ã§â€Â¨ `boxcolor`Ã¯Â¼Ë†Ã¨â‚¬Å’Ã©ÂÅ¾ `bgcolor`Ã¯Â¼â€°Ã£â‚¬â€š
* **Ã¤Â¸Å½Ã§â€Å¸Ã¦Ë†ÂÃ§Â»â€œÃ¥ÂË†**Ã¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨ `coll.generate_music(prompt, duration)` Ã¥â€™Å’ `coll.generate_image(prompt, aspect_ratio)` Ã¤Â¸ÂºÃ¦â€”Â¶Ã©â€”Â´Ã§ÂºÂ¿Ã§Â»â€žÃ¥ÂË†Ã¥Ë†â€ºÃ¥Â»ÂºÃ¨Âµâ€žÃ¤ÂºÂ§Ã£â‚¬â€š
* **Ã¦â€™Â­Ã¦â€Â¾**Ã¯Â¼Å¡`.play()` Ã¥Å“Â¨Ã©Â»ËœÃ¨Â®Â¤Ã§Â³Â»Ã§Â»Å¸Ã¦ÂµÂÃ¨Â§Ë†Ã¥â„¢Â¨Ã¤Â¸Â­Ã¦â€°â€œÃ¥Â¼â‚¬Ã¦ÂµÂÃ¥Âªâ€™Ã¤Â½â€œ URLÃ£â‚¬â€šÃ¥Â¯Â¹Ã¤ÂºÅ½Ã§Â¼â€“Ã§Â¨â€¹Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å’Ã¨Â¯Â·Ã§â€ºÂ´Ã¦Å½Â¥Ã¥Â¤â€žÃ§Ââ€  URL Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã£â‚¬â€š
