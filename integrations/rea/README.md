# REA integration for ECC coding agents

This directory installs [Reverse Engineer Anything](https://github.com/morluto/rea)
using the approved release in `active-upstream.json` when present. The current
local release is **6.7.0**, installed with locked dependencies under
`vendor/rea-6.7.0/node_modules/rea-agents`. Its MIT license remains in that package.
The legacy `upstream.json` and `vendor/rea` retain 6.4.0 for existing processes;
fresh bridge processes select the active release. ECC's bridge shares one local
CLI/MCP implementation across agent vendors. It does not add application runtime
dependencies to SeaBridge's frontend or backend.

## Setup and persistent project links

For an existing bridge, install only the pinned active release with:

```powershell
powershell -NoProfile -File integrations/rea/install-release.ps1
```

This uses the tracked `release/package.json` and lockfile, verifies the package
integrity/version and Windows helper, and does not replace an installed runtime
or edit agent settings. Dependency installation requires owner approval.

The complete Windows bootstrap is `powershell -File integrations/rea/install.ps1`
from ECC; it prepares the legacy bridge prerequisites and the active release. Requires
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

On a fresh Linux/macOS checkout (including an AWS agent host), install the
published runtime from the tracked lock without requiring PowerShell:

```bash
cd integrations/rea
# Refuse to reinstall over a possibly live or partial runtime.
test ! -e vendor/rea-6.7.0 || { echo 'Existing runtime: preserve and inspect it'; exit 1; }
mkdir -p vendor/rea-6.7.0
cp release/package.json release/package-lock.json vendor/rea-6.7.0/
(cd vendor/rea-6.7.0 && npm ci --ignore-scripts --no-audit --no-fund)
node vendor/rea-6.7.0/node_modules/rea-agents/scripts/rea.mjs --version
```

Use Node 22.19+, 24.11+ or 26+; SQLite specifically needs 24.15+ or 26+.
Then create `.venv`, install `requirements.txt`, install
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

Registration is not activation. Claude keeps existing project disable/rejection
choices and newly added specialists are opt-in; Codex registers specialists with
`enabled = false`. Use a fresh task-scoped invocation or explicitly approved
client activation. Do not clear disable lists or reload existing sessions to
make a registration test pass. The CLI works without changing MCP configuration.

The owner-approved local activation on 2026-10-19 enables only REA's three entries
in Claude's backend, frontend and ECC project choices, preserving all other
disabled servers. Codex uses the dedicated `rea` profile:

```powershell
codex -p rea
```

Its `~/.codex/rea.config.toml` enables only `rea`, `rea-reference` and `rea-native`,
inheriting their existing commands/timeouts. The ordinary profile keeps them
disabled: changing the global flags was observed to live-load approximately 15
copies into already-running chats and exhaust memory. No chat or app restart is
needed for the new profile. Do not force existing sessions to reload their tools.
This opt-in is deliberate; the ordinary Codex profile is not REA-enabled.

### Use from a current VS Code chat without restarting

Paste this into the existing Claude or Codex chat, replacing the reference:

> Use the REA workflow at
> `C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/rea/SKILL.md`
> to assess [URL or absolute file path]. Preserve this chat and running sessions.
> Use MCP if already connected; otherwise invoke the shared CLI. Declare scoped
> requirements, cite observed evidence and leave unknowns explicit.

Any current agent with local command access can invoke:

```powershell
node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/rea/cli.mjs doctor
node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/rea/cli.mjs analyze request.json
node C:/Users/adelm/SeaBridgeAI/everything-claude-code/integrations/rea/cli.mjs native --help
```

This needs no MCP reload or chat restart. Claude can inspect existing connections
with `/mcp` when its client exposes that command; CLI fallback works regardless.
`codex -p rea` starts a separate CLI chat in the VS Code terminal, not a profile
switch or MCP injection into an existing sidebar chat. Do not globally enable
every REA server to work around that boundary or reset chat/history storage.

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

### Scoped evidence coverage

At capture, declare `requirements: [{"id":"search","description":"Search behavior"}]`
in `reference_analyze` or `video_prepare`. Keep the same
requirements when selecting a CDP target. Blueprint coverage is bound to those
captured IDs, not a new list silently substituted at handoff.

Pass `coverage: [{"requirementId":"search","status":"covered","findings":[
{"section":"workflows","index":0}]}]`. Each reference must select an existing
observed finding whose evidence passes digest verification. Unavailable work uses
`{"requirementId":"search","status":"unknown","reason":"Failure state not observed"}`.
For final handoffs use `requireComplete: true`: missing rows, unknown coverage,
inference-only references and explicit unresolved unknowns are rejected. Without
that flag, drafts remain usable but report `coverage.complete: false`. Old bundles
with no declared requirements cannot claim completeness. These checks establish
accounting and provenance, not semantic truth or discovery of undeclared behavior.

`doctor` reports `ready`, `unavailable` and a nonzero exit when any advertised lane
is unavailable. This is readiness, not actual inference proof. Missing vision or
native tooling does not prevent supported static CLI analysis.

Run `node --test integrations/rea/test/*.test.mjs` from ECC after installation.
Tests exercise real REA static analysis, FFmpeg frames/audio, offline transcription,
MCP discovery/image content, evidence integrity and malformed inputs. Synthetic
fixtures validate transport, not application reconstruction quality. Use the actual
owner-supplied app/video to verify the final blueprint and implementation.

For the installed 6.7.0 package, use `install-release.ps1` with the tracked
`release/` manifest/lock. Package integrity and source tag are recorded in
`active-upstream.json`; installed vendor files remain ignored. Do not run a global
updater or overwrite the legacy checkout to update this bridge. Review the
intended release, verify its integrity and bridge tests, then select it for fresh
processes. Keep existing processes and their release files intact. The installer
refuses to overwrite a legacy checkout at a different revision. Preserve licenses.

Tool discovery is not universal readiness. In 6.7.0 call `binary_session` and
inspect `tool_availability` before selecting a workflow; missing providers,
unsupported hosts and a required unopened target are distinct states. SQLite
inspection specifically needs Node 24.15+ or 26+, not the older general minimum.
Android, firmware, packet/signal decoding, WASM and advanced source recovery need
their optional engines. Apple-specific runtime utilities need macOS. IDA, Hopper
and JEB are optional alternatives with their own vendor terms, not prerequisites
for the configured Ghidra path. Do not auto-approve target/device execution.

Free optional engines are configured only for the `rea-native`/`cli.mjs native`
WSL route, through `native.wsl.environment` in the ignored workspace file.
Only REA_* string overrides are accepted; arguments never enter a shell.
The approved isolated Node 24.22.0 runtimes on D: enable SQLite inspection on
both routes without replacing system Node/PATH. `nodeExecutable` selects Windows
upstream Node; `native.wsl.node` selects Linux Node. Their official archives were
SHA-256 checked against nodejs.org. Existing sessions retain their loaded runtime.
Native MCP translates the declared host paths for the newly configured providers,
including source/output arrays, without rewriting queries or Android device paths.

The installed free Linux toolset is TShark/capinfos 4.2.2, sigrok-cli 0.7.2,
ADB 34.0.4, Apktool 3.0.3, JADX MCP 0.7.1, WABT 1.0.42, Wakaru 1.14.0,
GDB 15.1, Rizin 0.9.1, pwntools 4.15.0 and Unblob 26.6.4. Release hashes,
Python lock inventory and offline producer results are retained under
`D:/SeaBridgeAI-data/tools/rea/`. The JADX JAR and Python environment use the
existing isolated Linux tool area to avoid mounted-drive archive/metadata issues.
Common Unblob extractors are installed; `unar`, `sasquatch` and
`sasquatch-v4be` remain unavailable. `unar` would trigger an unrelated package
upgrade, and the others require source builds. Unblob extraction works, but
Binwalk-specific `inspect_firmware_regions` is not enabled: no Binwalk 3.1
prebuilt release was available. Never substitute Binwalk 2 or fake its version.
Mac-only utilities, commercial JEB and target-dependent navigation remain explicit
limitations. ADB installation does not authorize connecting a device or installing
an APK. Packet tools have no added capture-group, setuid or capture capabilities.

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
WSL and Windows drive paths are local-PC adapters, not AWS configuration. On an
AWS Linux host, use native Linux engine paths and the regular `rea` MCP/CLI route;
do not copy `workspace.local.json` or user credentials from this PC. Run doctor and
target-specific readiness checks there before claiming AWS acceptance.
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
Generated Codex, Gemini and OpenCode settings include this timeout. Clients must
opt in to the registered specialists; a fresh session or task-scoped invocation
can load them without disturbing existing sessions. Historical client connection
checks do not prove present native Claude/Codex/Gemini/OpenCode activation. The active Codex
Desktop conversation cannot have its tool catalog replaced through this bridge;
the CLI works immediately from it without interrupting existing sessions.

Local visual inference uses the retained Ollama model selected in the workspace
configuration (currently `qwen3.8-opencode:32k`) at
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
