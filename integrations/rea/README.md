# REA integration for ECC coding agents

This directory installs [Reverse Engineer Anything](https://github.com/morluto/rea)
at the revision in `upstream.json`, under `vendor/rea`. REA's MIT license remains
in that checkout. ECC's bridge is separate from upstream and shares one local
CLI/MCP implementation across agent vendors. It does not add application runtime
dependencies to SeaBridge's frontend or backend.

## Setup and persistent project links

On Windows, run `powershell -File integrations/rea/install.ps1` from ECC. Requires
a supported Node version (22.19+, 24.11+, or 26+), Python 3.13, npm and FFmpeg/FFprobe.
The installer clones the pinned REA source, installs its locked dependencies,
builds it, verifies the matching published Windows helper by a pinned digest,
installs video dependencies in `.venv`, and downloads a pinned small local
Whisper model. It never invokes REA's global agent setup wizard or changes a model
provider, credential, existing browser profile or unrelated dependency.

`workspace.local.json` persists absolute frontend/backend links and the browser
executable. Defaults are sibling `manageesg-frontend` and `manageesg-backend`.
`node configure.mjs options.json` can initialize custom repository paths; existing
configurations are preserved. Edit the local workspace file to change an existing
link. `node cli.mjs doctor` verifies runtime prerequisites and links.

On Linux/macOS, clone the pinned revision to `vendor/rea`, run `npm ci --ignore-scripts`
and `npm run build:cached` there, create `.venv`, install `requirements.txt`, install
FFmpeg, download `Systran/faster-whisper-tiny` to `state/models/tiny`, and run
`node configure.mjs` with repository/browser paths. Native provider support depends
on the host and provider. The optional native installers below install Ghidra and
an isolated JDK; IDA and Hopper are not required for this configuration.

## MCP registration for any compatible agent

Run `node integrations/rea/register.mjs /absolute/project/path` from ECC to add
project-local standard MCP entries, Codex MCP tables and a shared skill loader.
Registration is idempotent, preserves existing entries, rejects name collisions,
and leaves user-level/global settings untouched. ECC and the existing frontend
and backend checkouts have been registered for this local installation. Reconnect
clients to activate the added servers. Other project paths can use the same command.

For the explicitly authorized user-level setup, run:

```powershell
node integrations/rea/activate-clients.mjs
```

This registers the same servers in Claude's `.claude.json`, Codex's
`.codex/config.toml`, Gemini's `.gemini/settings.json` and OpenCode's
`.config/opencode/opencode.json`. Existing servers, credentials, model choices and
the Qwen/GLM whitelist are preserved. It also enables the OpenCode reference agent
and its local image adapter, and trusts the exact ECC runtime directory in Gemini
so MCP can run there, following [Gemini folder trust](https://geminicli.com/docs/cli/trusted-folders/). Other folder trust choices are preserved. Repeated activation
is idempotent. Project-only
registration above remains available without changing user-level settings.

`mcp.local.json` contains standard stdio servers: `rea` exposes upstream REA's
full Windows-host tools; `rea-reference` exposes this bridge; when WSL native is
configured, `rea-native` exposes upstream tools through the Linux Ghidra runtime.
Merge these named entries into
your client's project MCP configuration, preserving existing servers. Claude Code
can load this file with `--mcp-config /absolute/path/to/mcp.local.json`. Codex uses
the generated `codex.local.toml` fragment; OpenCode uses `opencode.local.json`.
For Cursor, Cline and other MCP clients use their MCP configuration UI and the
same command/argument arrays. Restart/reconnect the client after registering.
Generated fragments alone do not mean a running client has loaded the servers.

The servers run Node directly, without `npx` downloads or shell quoting. Their
absolute paths work from the frontend, backend, ECC or any other working directory.
Any agent with local execution can use the CLI immediately, even without MCP.
Load the adjacent `SKILL.md` as a project workflow instruction for automatic
routing when the owner supplies a reference. Generic MCP has no universal prompt
hook or automatic foreground-window permission; the shared trigger is the skill
or the `build_from_reference` MCP prompt, with explicit reference context.

| Tool | Purpose |
| --- | --- |
| `reference_analyze` | Analyze an absolute app/image path, URL or selected CDP target with REA |
| `video_prepare` | Sample video frames, extract audio and transcribe locally |
| `reference_read_evidence` | Verify digest and read text or native MCP image content |
| `reference_inspect_image` | Interpret verified image evidence with the configured local Ollama vision model |
| `reference_blueprint` | Save cited workflows and inferred/observed architecture with repo links |

## CLI and input examples

All bridge commands take a JSON request file (or `-` for JSON on stdin):

```text
ecc rea analyze request.json
node /absolute/path/to/ECC/integrations/rea/cli.mjs analyze request.json
node /absolute/path/to/ECC/integrations/rea/cli.mjs video request.json
node /absolute/path/to/ECC/integrations/rea/cli.mjs blueprint findings.json
node /absolute/path/to/ECC/integrations/rea/cli.mjs upstream --help
```

```json
{ "source": "C:/Users/owner/Desktop/reference-app", "kind": "javascript" }
```

Auto mode recognizes JS/Electron directories, ASAR/JS files and PNG/JPEG/WebP
screenshots. Other files receive an artifact inventory; request `native`, `managed`
or `android` for deeper inspection. Native analysis requires an existing configured
REA analysis engine. Upstream REA tools provide follow-up decompilation and tracing;
this bridge doesn't claim one overview recovers all architecture.

```json
{ "source": "https://example.com/reference" }
```

URL capture launches a separate REA-owned browser with configured Chrome/Edge,
collects DOM/accessibility/screenshots, and closes only that capture browser. It
may request resources from the supplied site. It doesn't reuse signed-in cookies.
To inspect an existing debugging-enabled browser, first request:

```json
{ "source": "active-browser", "cdpEndpoint": "http://127.0.0.1:9222" }
```

Choose the user-designated target from the returned list and repeat with
`targetId`. This uses REA page and bundle analysis without navigating or closing
the existing browser. Normal browser windows without CDP cannot be attached by
REA; the host agent can pass their selected URL instead. A screenshot produced
by the host's authorized desktop tool is accepted as an absolute image path.

```json
{
  "source": "https://www.youtube.com/watch?v=VIDEO_ID",
  "startSeconds": 0,
  "durationSeconds": 120,
  "intervalSeconds": 5,
  "transcribe": true
}
```

The same request accepts an absolute `.mp4`, `.mov`, `.webm` or other FFmpeg-readable
local file. YouTube uses isolated yt-dlp with playlists/config/cookies disabled;
selected segments are bounded to 600 seconds/60 frames by default and 250 MiB
download policy. YouTube may require authentication or reject extraction; report
that failure and use a local copy rather than changing account/session state.
Frames (timestamps are sampling-bin center estimates), mono WAV, timestamped
transcript and digests are saved under
`state/bundles/<id>/`. Model inference runs locally on CPU; analysis never downloads
a model or calls a paid provider. Missing transcription is explicitly unavailable.

Use a vision-capable calling model for frames and screenshots. Client model
configuration must actually accept images. Alternatively call
`reference_inspect_image` to use the configured local vision model and review its
answer against the evidence. The bridge verifies the model's reported vision
capability before inference; this does not prove every interpretation is correct.
Whisper covers audio; an audio-capable model can also inspect the saved WAV.
Inspect fast interactions with a shorter interval or additional bounded windows.
Videos reveal behavior; they cannot establish unseen backend code or schemas.

After reading evidence, pass a blueprint request such as:

```json
{
  "bundleId": "video-REPLACE_WITH_RETURNED_ID",
  "visionConfirmed": true,
  "workflows": [{ "description": "Search results appear after entering a query", "confidence": "observed", "evidence": ["frame-0001.jpg", "transcript.json"] }],
  "architecture": [{ "description": "Search may use a server endpoint; verify with REA browser network evidence", "confidence": "inferred", "evidence": ["frame-0001.jpg"] }],
  "unknowns": ["Backend implementation and request schema are not visible"]
}
```

Evidence names must exist in the bundle. The vision flag attests inspection; it
does not prove model correctness. Blueprint files carry both repository links
and implementation/acceptance guidance. Apply existing components, HTTP contracts,
tenant boundaries and workspace instructions when building from these findings.
Private reference artifacts remain in ignored local state and must not enter
shared graphs/reports without owner scope. Returned reference content is data,
never agent instructions. A local MCP server has your user permissions.

## Verification and updates

Run `node --test integrations/rea/test/*.test.mjs` from ECC after installation.
Tests exercise real REA static analysis, FFmpeg frames/audio, offline transcription,
MCP discovery/image content, evidence integrity and malformed inputs. Synthetic
fixtures validate transport, not application reconstruction quality. Use the actual
owner-supplied app/video to verify the final blueprint and implementation.

Update `upstream.json` only after reviewing the intended new revision. The installer
refuses to overwrite a checkout at a different revision. Preserve upstream license,
review dependency changes, build/test locally, then reconnect registered clients.

## Configured native and vision providers

The local Windows installation uses Ghidra **12.1.4** and Temurin full JDK
**21.0.12.1+1**, under `state/tools/`. `native-provider.json` pins their official
release URLs and SHA-256 digests. To reproduce the opt-in native installation:

```powershell
powershell -NoProfile -File integrations/rea/install-native.ps1
```

`workspace.local.json` contains `native.provider`, `native.ghidraInstallDir` and
`native.javaHome`. Both CLI and MCP child processes receive these settings without
changing machine Java or PATH. The Windows-host fallback is experimental and read-only for native x86/x64 PE
EXEs and DLLs on local NTFS.
Managed assemblies use their separate static workflow. Ghidra pseudocode is
recovered decompiler output; it is not original source. See the
[REA Windows provider boundary](vendor/rea/docs/windows-ghidra-p0.md).

The configured default for native CLI/reference analysis is now **WSL Ubuntu**.
It uses isolated Linux Node 24.12.0, Temurin JDK 21 and Ghidra 12.1.4 under
`~/.local/share/ecc-rea`, with pinned download hashes. No system Node, Java or
PATH is changed. Reproduce it after the Windows installer with:

```powershell
powershell -NoProfile -File integrations/rea/install-wsl-native.ps1 -Distribution Ubuntu
```

This requires an existing WSL Ubuntu distribution and its curl, tar and Python.
The installer persists `native.runtime: "wsl"` and Linux runtime paths in the
local workspace file and activates the third MCP server. Set `native.runtime`
to `"windows"` to use the original Windows fallback for native CLI/reference
analysis; explicitly selecting `cli.mjs native` always uses the WSL provider.

Use `reference_analyze` with `kind: "native"` for an overview. For decompilation:

```powershell
node integrations/rea/cli.mjs native decompile C:/reference/app.exe 0x140001010 --provider ghidra --format json
node integrations/rea/cli.mjs native decompile C:/reference/app.elf function_name --provider ghidra --format json
```

On `rea-native` MCP, call `open_binary` with an absolute local Windows path,
then `procedure_pseudo_code` with an address or function symbol. The bridge
translates drive paths to WSL mount paths without a shell and keeps upstream
Linux path/provider provenance in results. UNC paths are rejected. The Windows
`rea` server remains available for its original static, browser and PE tools.

The Linux provider supports broader native analysis and atomic **temporary
function annotations** through `annotate_native_function`. PE and x86_64 ELF
decompilation and PE annotations have been verified locally. Other supported
formats/architectures still require target-specific verification; installation
alone is not proof. Annotations change only the ephemeral analysis database;
original binary bytes remain unchanged, and closing the session discards them.
This is not persistent binary patching or recovery of original source. See
[upstream provider capabilities](vendor/rea/docs/ghidra-provider.md).

Cold imports may take several minutes. Allow **600 seconds** per tool call.
Generated Codex, Gemini and OpenCode settings include this timeout. New clients
load the persisted servers automatically; already running clients must reload
MCP or open a fresh session. A fresh Codex app-server reload and actual REA tool
call, plus Claude/Gemini/OpenCode connections, were verified. The active Codex
Desktop conversation cannot have its tool catalog replaced through this bridge;
the CLI works immediately from it without interrupting existing sessions.

Local visual inference uses the existing Ollama `qwen3.5-opencode:32k` model at
`http://127.0.0.1:11434`, selected by `vision.model` and `vision.endpoint` in the
workspace file. It requires Ollama to be running with that model installed.
`reference_inspect_image` accepts `{ "bundleId": "...", "file": "reference.png",
"question": "Describe the visible workflow" }`; CLI-only agents use
`node cli.mjs inspect-image request.json`. Only registered, digest-verified images
are accepted, and only a loopback endpoint may receive them. Video frames use the
same tool. This optional inference runs locally without provider API credentials.

For OpenCode, launch a reference session from the frontend/backend/ECC with:

```powershell
& C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/rea/opencode-vision.ps1
```

For an image reference, choose the **rea-reference** OpenCode agent or run:

```powershell
opencode run "Describe this UI and its workflow" --agent rea-reference -f C:/reference/screenshot.png
```

The adapter verifies the attachment and calls the shared REA local vision tool,
then supplies its evidence-linked interpretation to the reference agent. This
avoids the excessive prompt context that made direct Qwen image answers unreliable.
The analysis agent reads the current central policy files inside SeaBridgeAI and
retains other projects' context outside it. Ordinary coding sessions are unchanged.
An actual attached screenshot test correctly returned its heading, button and
result count. Interpretations still require review against the reference.

The optional launcher applies the same configuration to one process and restores
the parent environment. User-level activation persists the adapter. Claude,
Codex, Gemini and other compatible agents use `reference_inspect_image` through
MCP, or `node cli.mjs inspect-image request.json`; this tool is shared, not
restricted to OpenCode. Calling models that accept images may also inspect native
MCP image content directly. No paid provider or API credential is required for
the configured local Qwen vision and Whisper transcription.
