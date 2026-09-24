---
description: Load the most recent session file from ~/.claude/session-data/ and resume work with full context from where the last session ended.
---

# Resume Session Command

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


Load the last saved session state and orient fully before doing any work.
This command is the counterpart to `/save-session`.

## When to Use

- Starting a new session to continue work from a previous day
- After starting a fresh session due to context limits
- When handing off a session file from another source (just provide the file path)
- Any time you have a session file and want Claude to fully absorb it before proceeding

## Usage

```
/resume-session                                                      # loads most recent file in ~/.claude/session-data/
/resume-session 2024-01-15                                           # loads most recent session for that date
/resume-session ~/.claude/session-data/2024-01-15-abc123de-session.tmp  # loads a current short-id session file
/resume-session ~/.claude/sessions/2024-01-15-session.tmp               # loads a specific legacy-format file
```

## Process

### Step 1: Find the session file

If no argument provided:

1. Check `~/.claude/session-data/`
2. Pick the most recently modified `*-session.tmp` file
3. If the folder does not exist or has no matching files, tell the user:
   ```
   No session files found in ~/.claude/session-data/
   Run /save-session at the end of a session to create one.
   ```
   Then stop.

If an argument is provided:

- If it looks like a date (`YYYY-MM-DD`), search `~/.claude/session-data/` first, then the legacy
  `~/.claude/sessions/`, for files matching `YYYY-MM-DD-session.tmp` (legacy format) or
  `YYYY-MM-DD-<shortid>-session.tmp` (current format)
  and load the most recently modified variant for that date
- If it looks like a file path, read that file directly
- If not found, report clearly and stop

### Step 2: Read the entire session file

Read the complete file. Do not summarize yet.

### Step 3: Confirm understanding

Respond with a structured briefing in this exact format:

```
SESSION LOADED: [actual resolved path to the file]
════════════════════════════════════════════════

PROJECT: [project name / topic from file]

WHAT WE'RE BUILDING:
[2-3 sentence summary in your own words]

CURRENT STATE:
PASS: Working: [count] items confirmed
 In Progress: [list files that are in progress]
 Not Started: [list planned but untouched]

WHAT NOT TO RETRY:
[list every failed approach with its reason — this is critical]

OPEN QUESTIONS / BLOCKERS:
[list any blockers or unanswered questions]

NEXT STEP:
[exact next step if defined in the file]
[if not defined: "No next step defined — recommend reviewing 'What Has NOT Been Tried Yet' together before starting"]

════════════════════════════════════════════════
Ready to continue. What would you like to do?
```

### Step 4: Wait for the user

Do NOT start working automatically. Do NOT touch any files. Wait for the user to say what to do next.

If the next step is clearly defined in the session file and the user says "continue" or "yes" or similar — proceed with that exact next step.

If no next step is defined — ask the user where to start, and optionally suggest an approach from the "What Has NOT Been Tried Yet" section.

---

## Edge Cases

**Multiple sessions for the same date** (`2024-01-15-session.tmp`, `2024-01-15-abc123de-session.tmp`):
Load the most recently modified matching file for that date, regardless of whether it uses the legacy no-id format or the current short-id format.

**Session file references files that no longer exist:**
Note this during the briefing — "WARNING: `path/to/file.ts` referenced in session but not found on disk."

**Session file is from more than 7 days ago:**
Note the gap — "WARNING: This session is from N days ago (threshold: 7 days). Things may have changed." — then proceed normally.

**User provides a file path directly (e.g., forwarded from a teammate):**
Read it and follow the same briefing process — the format is the same regardless of source.

**Session file is empty or malformed:**
Report: "Session file found but appears empty or unreadable. You may need to create a new one with /save-session."

---

## Example Output

```
SESSION LOADED: /Users/you/.claude/session-data/2024-01-15-abc123de-session.tmp
════════════════════════════════════════════════

PROJECT: my-app — JWT Authentication

WHAT WE'RE BUILDING:
User authentication with JWT tokens stored in httpOnly cookies.
Register and login endpoints are partially done. Route protection
via middleware hasn't been started yet.

CURRENT STATE:
PASS: Working: 3 items (register endpoint, JWT generation, password hashing)
 In Progress: app/api/auth/login/route.ts (token works, cookie not set yet)
 Not Started: middleware.ts, app/login/page.tsx

WHAT NOT TO RETRY:
FAIL: Next-Auth — conflicts with custom Prisma adapter, threw adapter error on every request
FAIL: localStorage for JWT — causes SSR hydration mismatch, incompatible with Next.js

OPEN QUESTIONS / BLOCKERS:
- Does cookies().set() work inside a Route Handler or only Server Actions?

NEXT STEP:
In app/api/auth/login/route.ts — set the JWT as an httpOnly cookie using
cookies().set('token', jwt, { httpOnly: true, secure: true, sameSite: 'strict' })
then test with Postman for a Set-Cookie header in the response.

════════════════════════════════════════════════
Ready to continue. What would you like to do?
```

---

## Notes

- Never modify the session file when loading it — it's a read-only historical record
- The briefing format is fixed — do not skip sections even if they are empty
- "What Not To Retry" must always be shown, even if it just says "None" — it's too important to miss
- After resuming, the user may want to run `/save-session` again at the end of the new session to create a new dated file

<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_START -->
## /goal Default Contract

This command inherits the SeaBridgeAI `/goal` protocol. Establish the persistent goal, Definition of Done, validation plan, affected systems, risks, dependencies, artifacts, and blockers before execution. Continue until validation satisfies the DoD or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`
<!-- SEABRIDGE_GOAL_COMMAND_INHERITANCE_END -->
