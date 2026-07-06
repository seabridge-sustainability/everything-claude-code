# Coding-Agent Plugin And Upstream Repository Audit

Date: 2026-07-06

Scope:

- `C:\Users\adelm\SeaBridgeAI\everything-claude-code`
- `C:\Users\adelm\SeaBridgeAI\_upstream`
- `C:\Users\adelm\SeaBridgeAI\autoresearch`
- Read-only inspection of Codex plugin cache metadata under
  `C:\Users\adelm\.codex\plugins\cache`

## Executive Summary

All discovered Git repositories in scope were fetched with `git fetch --all
--prune --recurse-submodules=no` successfully. No pulls, resets, branch changes,
plugin installs, dependency installs, commits, pushes, marketplace commands, or
secret reads were performed.

The top-level SeaBridgeAI repositories are not missing fetches:

- ECC is current with `origin/main` but has one local commit and a dirty
  worktree.
- `_upstream` root is current with `origin/master`.
- `autoresearch` is current with its active remote branch but has one dirty
  submodule/worktree entry.

Most nested upstream/reference/plugin clones are clean but behind their GitHub
default or configured upstream branch. Many are intentionally detached/pinned,
so updating them should be treated as a deliberate reference refresh rather than
a blind pull.

## Safety Boundaries Applied

- Did not read `.env`, ignored key files, auth stores, local DB state, or secret
  values.
- Did not install or update global/user plugins.
- Did not run marketplace/plugin commands.
- Did not pull, reset, checkout, branch, commit, push, or open PRs.
- Did not recurse submodules during fetch.
- Preserved dirty worktrees.

## Plugin Surfaces Found

ECC local plugin/reference surfaces:

- `plugins/CLI-Anything`
- `vendor/superpowers`

Codex plugin cache surfaces:

- `chatgpt-global/github`: `0.1.2`
- `chatgpt-global/gmail`: `0.1.2`
- `chatgpt-global/google-drive`: `0.1.6`
- `chatgpt-global/hugging-face`: `1.0.2`
- `chatgpt-global/openai-developers`: `1.2.2`
- `chatgpt-global/slack`: `0.1.2`
- `openai-bundled/browser`: `26.611.61049`
- `openai-curated/*`: `d6169bef` bundle snapshot
- `openai-curated-remote/github`: `0.1.5`
- `openai-curated-remote/gmail`: `0.1.3`
- `openai-curated-remote/google-drive`: `0.1.7`
- `openai-curated-remote/hugging-face`: `1.0.0`
- `openai-curated-remote/openai-developers`: `1.2.2`, `1.2.3`
- `openai-curated-remote/slack`: `0.1.2`
- `openai-primary-runtime/documents`: `26.614.11602`
- `openai-primary-runtime/pdf`: `26.614.11602`
- `openai-primary-runtime/presentations`: `26.614.11602`
- `openai-primary-runtime/spreadsheets`: `26.614.11602`

The Codex cache entries are installed runtime/plugin cache artifacts, not Git
clones, so this audit could verify local versions but not fast-forward them from
GitHub. Updating those requires the approved Codex/plugin lifecycle, not manual
Git operations.

## Local Plugin Git Status

| Path | Current | GitHub compare | Status |
|---|---:|---:|---|
| `plugins/CLI-Anything` | `79afbab` | `origin/main` | clean, behind 305 |
| `vendor/superpowers` | `80bb856` / version `5.1.0` | `origin/main` at `d884ae0`, release `6.1.1` | clean, diverged: ahead 1, behind 188 |

Notes:

- `plugins/CLI-Anything` can be refreshed only as a local plugin source update,
  not as a global install.
- `vendor/superpowers` is explicitly governed by ECC instructions: do not add,
  update, remove, or reinstall Superpowers globally or through a marketplace
  without explicit approval. Its local vendored source is also diverged, so it
  needs a deliberate merge/rebase/cherry-pick strategy rather than a blind
  fast-forward.

## Already Current

These fetched successfully and compare as up to date with their configured
branch or `origin/HEAD`:

| Path | Branch | Compare | Dirty |
|---|---|---|---:|
| `everything-claude-code/references/get-shit-done-temp` | `main` | `origin/main` | 0 |
| `_upstream` | `master` | `origin/master` | 0 |
| `_upstream/MiroFish` | `main` | `origin/main` | 0 |
| `autoresearch` | `security-strix-denylist-2026-06-07` | `origin/security-strix-denylist-2026-06-07` | 1 |
| `autoresearch/terrabit` | `main` | `origin/main` | 0 |

`autoresearch` is current with its branch, but it is not clean because
`graphify` is recorded as modified at the parent level.

## Clean Branches Behind Upstream

These are ordinary branch checkouts with clean worktrees. They are candidates
for explicit `git pull --ff-only` approval if the intent is to refresh local
reference mirrors to current GitHub state.

| Path | Branch | Behind |
|---|---|---:|
| `everything-claude-code/references/open-design` | `main` | 670 |
| `everything-claude-code/references/opencode` | `dev` | 1001 |
| `everything-claude-code/references/spec-kit-temp` | `main` | 226 |
| `_upstream/bess-performance-engineering` | `main` | 4 |
| `_upstream/CopilotKit` | `main` | 1851 |
| `_upstream/gbrain` | `master` | 31 |
| `_upstream/hermes-agent` | `main` | 4018 |
| `_upstream/openclaw` | `main` | 7201 |
| `_upstream/space-agent` | `main` | 1 |

Recommended next action: approve a separate bounded refresh pass for these
clean branch clones, then run `git pull --ff-only` per repo and record changed
SHAs. Do not combine with product-code work.

## Detached Or Pinned Clones Behind Upstream

These are clean but detached. Updating them to latest GitHub would require a
deliberate checkout/reset/re-pin decision, not a normal fast-forward.

| Path | Compare | Ahead | Behind |
|---|---|---:|---:|
| `everything-claude-code/external/get-shit-done` | `origin/main` | 0 | 221 |
| `everything-claude-code/external/local-deep-research` | `origin/main` | 0 | 722 |
| `everything-claude-code/external/mcp-toolbox` | `origin/main` | 0 | 202 |
| `everything-claude-code/external/unsloth` | `origin/main` | 0 | 820 |
| `everything-claude-code/plugins/CLI-Anything` | `origin/main` | 0 | 305 |
| `everything-claude-code/references/awesome-llm-apps` | `origin/main` | 0 | 1026 |
| `everything-claude-code/references/gbrain` | `origin/master` | 0 | 231 |
| `everything-claude-code/references/text-to-cad` | `origin/main` | 0 | 297 |
| `everything-claude-code/unsloth` | `origin/main` | 0 | 820 |
| `_upstream/awesome-deepseek-agent` | `origin/main` | 0 | 87 |
| `_upstream/docuseal` | `origin/master` | 0 | 157 |
| `_upstream/multica` | `origin/main` | 0 | 1080 |
| `_upstream/nanobot` | `origin/main` | 0 | 1055 |
| `_upstream/PageIndex` | `origin/main` | 0 | 20 |
| `_upstream/research/kepano-obsidian-skills` | `origin/main` | 0 | 9 |
| `_upstream/rowboat` | `origin/main` | 0 | 1699 |
| `_upstream/text-to-cad` | `origin/main` | 0 | 297 |
| `autoresearch/feynman` | `origin/main` | 0 | 120 |
| `autoresearch/unsloth` | `origin/main` | 0 | 1048 |

Recommended next action: for each clone, decide whether it is intentionally
pinned. If yes, record the pin in ECC docs/manifests. If no, refresh in a
separate approved pass by checking out the intended branch or updating the pin
SHA, then run any repo-specific smoke checks.

## Diverged Detached Or Vendored Clones

These need manual review before any update because local HEAD is not simply an
ancestor of the GitHub compare ref.

| Path | Compare | Ahead | Behind |
|---|---|---:|---:|
| `everything-claude-code/external/agentshield` | `origin/main` | 1 | 32 |
| `everything-claude-code/references/agent-skills` | `origin/main` | 1 | 113 |
| `everything-claude-code/vendor/superpowers` | `origin/main` | 1 | 188 |
| `_upstream/openwork` | `origin/dev` | 2569 | 3325 |
| `autoresearch/graphify` | `origin/v3` | 1 | 35 |

Recommended next action: inspect the local-only commits before refreshing.
Prefer cherry-pick or documented re-pin over reset. Do not overwrite these
without explicit signoff.

## Repositories Without GitHub Remote Comparison

These are Git repos with no `origin` remote configured, so this audit could not
compare them to GitHub:

- `_upstream/space-agent-customware/L1/_admin`
- `_upstream/space-agent-customware/L2/admin`

Recommended next action: decide whether these are local generated/admin repos,
then either document them as local-only or add the correct remote in a separate
approved maintenance task.

## Top-Level Dirty Worktrees

- `everything-claude-code`: ahead 1, dirty 44.
- `autoresearch`: dirty 1 because `graphify` is modified at the parent level.

No update action should overwrite or reset these. Preserve existing work.

## Commands Run

Discovery:

```powershell
Get-ChildItem -LiteralPath <root> -Force -Directory -Recurse -Filter .git
```

Fetch and comparison:

```powershell
git -C <repo> fetch --all --prune --recurse-submodules=no
git -C <repo> status -sb --porcelain=v1
git -C <repo> rev-parse --short HEAD
git -C <repo> rev-parse --abbrev-ref --symbolic-full-name @{u}
git -C <repo> symbolic-ref --quiet --short refs/remotes/origin/HEAD
git -C <repo> rev-list --left-right --count HEAD...<compare-ref>
git -C <repo> remote get-url origin
```

Plugin metadata:

```powershell
Get-ChildItem C:\Users\adelm\.codex\plugins\cache -Recurse -Depth 3
Get-Content C:\Users\adelm\.codex\plugins\cache\openai-curated-remote\*\ .codex-remote-plugin-install.json
Get-Content plugins\CLI-Anything\.claude-plugin\marketplace.json
Get-Content vendor\superpowers\.claude-plugin\marketplace.json
Get-Content vendor\superpowers\package.json
git -C plugins\CLI-Anything log -1 --oneline origin/main
git -C vendor\superpowers log -1 --oneline origin/main
```

Note: the command above is described logically; the actual metadata reads used
literal file paths without the space before `.codex-remote-plugin-install.json`.

## Skipped Actions

- No `git pull`, checkout, reset, merge, rebase, submodule update, or clone
  operation.
- No Codex, Claude, or marketplace plugin update/install command.
- No dependency install.
- No commits, branches, PRs, or pushes.
- No `.env` or secret file inspection.
- No validation test suites, because no repositories were updated.

## Recommended Order For A Future Update Pass

1. Approve fast-forward-only updates for the clean branch clones.
2. Separately review detached/pinned clones and decide which pins should move.
3. Separately review diverged clones and preserve any local-only commits before
   updating.
4. Treat Codex and Claude plugin caches as runtime-managed; update only through
   the approved plugin lifecycle.
5. Re-run ECC guardrails after any update:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-coding-agent-system.ps1
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-agent-runtime-guardrails.ps1
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-canonical-skills.ps1
powershell -ExecutionPolicy Bypass -File C:\Users\adelm\SeaBridgeAI\everything-claude-code\scripts\check-harness.ps1 -Advisory
```

## Final Verdict

The repositories are now freshly fetched and audited against their GitHub remote
refs. They are not all updated to latest working-tree content. Updating them is
possible, but should be done in bounded follow-up passes because many clones are
detached, pinned, diverged, or governed by plugin lifecycle approval gates.
