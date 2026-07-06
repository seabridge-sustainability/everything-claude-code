# Greptile Comment Triage

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


Shared reference for fetching, filtering, and classifying Greptile review comments on GitHub PRs. Both `/review` (Step 2.5) and `/ship` (Step 3.75) reference this document.

---

## Fetch

Run these commands to detect the PR and fetch comments. Both API calls run in parallel.

```bash
REPO=$(gh repo view --json nameWithOwner --jq '.nameWithOwner' 2>/dev/null)
PR_NUMBER=$(gh pr view --json number --jq '.number' 2>/dev/null)
```

**If either fails or is empty:** Skip Greptile triage silently. This integration is additive Ã¢â‚¬â€ the workflow works without it.

```bash
# Fetch line-level review comments AND top-level PR comments in parallel
gh api repos/$REPO/pulls/$PR_NUMBER/comments \
  --jq '.[] | select(.user.login == "greptile-apps[bot]") | select(.position != null) | {id: .id, path: .path, line: .line, body: .body, html_url: .html_url, source: "line-level"}' > /tmp/greptile_line.json &
gh api repos/$REPO/issues/$PR_NUMBER/comments \
  --jq '.[] | select(.user.login == "greptile-apps[bot]") | {id: .id, body: .body, html_url: .html_url, source: "top-level"}' > /tmp/greptile_top.json &
wait
```

**If API errors or zero Greptile comments across both endpoints:** Skip silently.

The `position != null` filter on line-level comments automatically skips outdated comments from force-pushed code.

---

## Suppressions Check

Derive the project-specific history path:
```bash
REMOTE_SLUG=$(browse/bin/remote-slug 2>/dev/null || ~/.claude/skills/gstack/browse/bin/remote-slug 2>/dev/null || basename "$(git rev-parse --show-toplevel 2>/dev/null || pwd)")
PROJECT_HISTORY="$HOME/.gstack/projects/$REMOTE_SLUG/greptile-history.md"
```

Read `$PROJECT_HISTORY` if it exists (per-project suppressions). Each line records a previous triage outcome:

```
<date> | <repo> | <type:fp|fix|already-fixed> | <file-pattern> | <category>
```

**Categories** (fixed set): `race-condition`, `null-check`, `error-handling`, `style`, `type-safety`, `security`, `performance`, `correctness`, `other`

Match each fetched comment against entries where:
- `type == fp` (only suppress known false positives, not previously fixed real issues)
- `repo` matches the current repo
- `file-pattern` matches the comment's file path
- `category` matches the issue type in the comment

Skip matched comments as **SUPPRESSED**.

If the history file doesn't exist or has unparseable lines, skip those lines and continue Ã¢â‚¬â€ never fail on a malformed history file.

---

## Classify

For each non-suppressed comment:

1. **Line-level comments:** Read the file at the indicated `path:line` and surrounding context (Ã‚Â±10 lines)
2. **Top-level comments:** Read the full comment body
3. Cross-reference the comment against the full diff (`git diff origin/main`) and the review checklist
4. Classify:
   - **VALID & ACTIONABLE** Ã¢â‚¬â€ a real bug, race condition, security issue, or correctness problem that exists in the current code
   - **VALID BUT ALREADY FIXED** Ã¢â‚¬â€ a real issue that was addressed in a subsequent commit on the branch. Identify the fixing commit SHA.
   - **FALSE POSITIVE** Ã¢â‚¬â€ the comment misunderstands the code, flags something handled elsewhere, or is stylistic noise
   - **SUPPRESSED** Ã¢â‚¬â€ already filtered in the suppressions check above

---

## Reply APIs

When replying to Greptile comments, use the correct endpoint based on comment source:

**Line-level comments** (from `pulls/$PR/comments`):
```bash
gh api repos/$REPO/pulls/$PR_NUMBER/comments/$COMMENT_ID/replies \
  -f body="<reply text>"
```

**Top-level comments** (from `issues/$PR/comments`):
```bash
gh api repos/$REPO/issues/$PR_NUMBER/comments \
  -f body="<reply text>"
```

**If a reply POST fails** (e.g., PR was closed, no write permission): warn and continue. Do not stop the workflow for a failed reply.

---

## Reply Templates

Use these templates for every Greptile reply. Always include concrete evidence Ã¢â‚¬â€ never post vague replies.

### Tier 1 (First response) Ã¢â‚¬â€ Friendly, evidence-included

**For FIXES (user chose to fix the issue):**

```
**Fixed** in `<commit-sha>`.

\`\`\`diff
- <old problematic line(s)>
+ <new fixed line(s)>
\`\`\`

**Why:** <1-sentence explanation of what was wrong and how the fix addresses it>
```

**For ALREADY FIXED (issue addressed in a prior commit on the branch):**

```
**Already fixed** in `<commit-sha>`.

**What was done:** <1-2 sentences describing how the existing commit addresses this issue>
```

**For FALSE POSITIVES (the comment is incorrect):**

```
**Not a bug.** <1 sentence directly stating why this is incorrect>

**Evidence:**
- <specific code reference showing the pattern is safe/correct>
- <e.g., "The nil check is handled by `ActiveRecord::FinderMethods#find` which raises RecordNotFound, not nil">

**Suggested re-rank:** This appears to be a `<style|noise|misread>` issue, not a `<what Greptile called it>`. Consider lowering severity.
```

### Tier 2 (Greptile re-flags after prior reply) Ã¢â‚¬â€ Firm, overwhelming evidence

Use Tier 2 when escalation detection (below) identifies a prior GStack reply on the same thread. Include maximum evidence to close the discussion.

```
**This has been reviewed and confirmed as [intentional/already-fixed/not-a-bug].**

\`\`\`diff
<full relevant diff showing the change or safe pattern>
\`\`\`

**Evidence chain:**
1. <file:line permalink showing the safe pattern or fix>
2. <commit SHA where it was addressed, if applicable>
3. <architecture rationale or design decision, if applicable>

**Suggested re-rank:** Please recalibrate Ã¢â‚¬â€ this is a `<actual category>` issue, not `<claimed category>`. [Link to specific file change permalink if helpful]
```

---

## Escalation Detection

Before composing a reply, check if a prior GStack reply already exists on this comment thread:

1. **For line-level comments:** Fetch replies via `gh api repos/$REPO/pulls/$PR_NUMBER/comments/$COMMENT_ID/replies`. Check if any reply body contains GStack markers: `**Fixed**`, `**Not a bug.**`, `**Already fixed**`.

2. **For top-level comments:** Scan the fetched issue comments for replies posted after the Greptile comment that contain GStack markers.

3. **If a prior GStack reply exists AND Greptile posted again on the same file+category:** Use Tier 2 (firm) templates.

4. **If no prior GStack reply exists:** Use Tier 1 (friendly) templates.

If escalation detection fails (API error, ambiguous thread): default to Tier 1. Never escalate on ambiguity.

---

## Severity Assessment & Re-ranking

When classifying comments, also assess whether Greptile's implied severity matches reality:

- If Greptile flags something as a **security/correctness/race-condition** issue but it's actually a **style/performance** nit: include `**Suggested re-rank:**` in the reply requesting the category be corrected.
- If Greptile flags a low-severity style issue as if it were critical: push back in the reply.
- Always be specific about why the re-ranking is warranted Ã¢â‚¬â€ cite code and line numbers, not opinions.

---

## History File Writes

Before writing, ensure both directories exist:
```bash
REMOTE_SLUG=$(browse/bin/remote-slug 2>/dev/null || ~/.claude/skills/gstack/browse/bin/remote-slug 2>/dev/null || basename "$(git rev-parse --show-toplevel 2>/dev/null || pwd)")
mkdir -p "$HOME/.gstack/projects/$REMOTE_SLUG"
mkdir -p ~/.gstack
```

Append one line per triage outcome to **both** files (per-project for suppressions, global for retro):
- `~/.gstack/projects/$REMOTE_SLUG/greptile-history.md` (per-project)
- `~/.gstack/greptile-history.md` (global aggregate)

Format:
```
<YYYY-MM-DD> | <owner/repo> | <type> | <file-pattern> | <category>
```

Example entries:
```
2026-03-13 | garrytan/myapp | fp | app/services/auth_service.rb | race-condition
2026-03-13 | garrytan/myapp | fix | app/models/user.rb | null-check
2026-03-13 | garrytan/myapp | already-fixed | lib/payments.rb | error-handling
```

---

## Output Format

Include a Greptile summary in the output header:
```
+ N Greptile comments (X valid, Y fixed, Z FP)
```

For each classified comment, show:
- Classification tag: `[VALID]`, `[FIXED]`, `[FALSE POSITIVE]`, `[SUPPRESSED]`
- File:line reference (for line-level) or `[top-level]` (for top-level)
- One-line body summary
- Permalink URL (the `html_url` field)
