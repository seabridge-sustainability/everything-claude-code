# Use Cases

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


Common workflows and what VideoDB enables. For code details, see [api-reference.md](api-reference.md), [capture.md](capture.md), [editor.md](editor.md), and [search.md](search.md).

---

## Video Search & Highlights

### Create Highlight Reels
Upload a long video (conference talk, lecture, meeting recording), search for key moments by topic ("product announcement", "Q&A session", "demo"), and automatically compile matching segments into a shareable highlight reel.

### Build Searchable Video Libraries
Batch upload videos to a collection, index them for spoken word search, then query across the entire library. Find specific topics across hundreds of hours of content instantly.

### Extract Specific Clips
Search for moments matching a query ("budget discussion", "action items") and extract each matching segment as an individual clip with its own stream URL.

---

## Video Enhancement

### Add Professional Polish
Take raw footage and enhance it with:
- Auto-generated subtitles from speech
- Custom thumbnails at specific timestamps
- Background music overlays
- Intro/outro sequences with generated images

### AI-Enhanced Content
Combine existing video with generative AI:
- Generate text summaries from transcript
- Create background music matching video duration
- Generate title cards and overlay images
- Mix all elements into a polished final output

---

## Real-Time Capture (Desktop/Meeting)

### Screen + Audio Recording with AI
Capture screen, microphone, and system audio simultaneously. Get real-time:
- **Live transcription** - Speech to text as it happens
- **Audio summaries** - Periodic AI-generated summaries of discussions
- **Visual indexing** - AI descriptions of screen activity

### Meeting Capture with Summarization
Record meetings with live transcription of all participants. Get periodic summaries with key discussion points, decisions, and action items delivered in real-time.

### Screen Activity Tracking
Track what's happening on screen with AI-generated descriptions:
- "User is browsing a spreadsheet in Google Sheets"
- "User switched to a code editor with a Python file"
- "Video call with screen sharing enabled"

### Post-Session Processing
After capture ends, the recording is exported as a permanent video. Then:
- Generate searchable transcript
- Search for specific topics within the recording
- Extract clips of important moments
- Share via stream URL or player link

---

## Live Stream Intelligence (RTSP/RTMP)

### Connect External Streams
Ingest live video from RTSP/RTMP sources (security cameras, encoders, broadcasts). Process and index content in real-time.

### Real-Time Event Detection
Define events to detect in live streams:
- "Person entering restricted area"
- "Traffic violation at intersection"
- "Product visible on shelf"

Get alerts via WebSocket or webhook when events occur.

### Live Stream Search
Search across recorded live stream content. Find specific moments and generate clips from hours of continuous footage.

---

## Content Moderation & Safety

### Automated Content Review
Index video scenes with AI and search for problematic content. Flag videos containing violence, inappropriate content, or policy violations.

### Profanity Detection
Detect and locate profanity in audio. Optionally overlay beep sounds at detected timestamps.

---

## Platform Integration

### Social Media Formatting
Reframe videos for different platforms:
- Vertical (9:16) for TikTok, Reels, Shorts
- Square (1:1) for Instagram feed
- Landscape (16:9) for YouTube

### Transcode for Delivery
Change resolution, bitrate, or quality for different delivery targets. Output optimized streams for web, mobile, or broadcast.

### Generate Shareable Links
Every operation produces playable stream URLs. Embed in web players, share directly, or integrate with existing platforms.

---

## Workflow Summary

| Goal | VideoDB Approach |
|------|------------------|
| Find moments in video | Index spoken words/scenes Ã¢â€ â€™ Search Ã¢â€ â€™ Compile clips |
| Create highlights | Search multiple topics Ã¢â€ â€™ Build timeline Ã¢â€ â€™ Generate stream |
| Add subtitles | Index spoken words Ã¢â€ â€™ Add subtitle overlay |
| Record screen + AI | Start capture Ã¢â€ â€™ Run AI pipelines Ã¢â€ â€™ Export video |
| Monitor live streams | Connect RTSP Ã¢â€ â€™ Index scenes Ã¢â€ â€™ Create alerts |
| Reformat for social | Reframe to target aspect ratio |
| Combine clips | Build timeline with multiple assets Ã¢â€ â€™ Generate stream |
