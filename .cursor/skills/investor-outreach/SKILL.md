---
name: investor-outreach
description: Draft cold emails, warm intro blurbs, follow-ups, update emails, and investor communications for fundraising. Use when the user wants outreach to angels, VCs, strategic investors, or accelerators and needs concise, personalized, investor-facing messaging.
origin: ECC
---

# Investor Outreach

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


Write investor communication that is short, personalized, and easy to act on.

## When to Activate

- writing a cold email to an investor
- drafting a warm intro request
- sending follow-ups after a meeting or no response
- writing investor updates during a process
- tailoring outreach based on fund thesis or partner fit

## Core Rules

1. Personalize every outbound message.
2. Keep the ask low-friction.
3. Use proof, not adjectives.
4. Stay concise.
5. Never send generic copy that could go to any investor.

## Cold Email Structure

1. subject line: short and specific
2. opener: why this investor specifically
3. pitch: what the company does, why now, what proof matters
4. ask: one concrete next step
5. sign-off: name, role, one credibility anchor if needed

## Personalization Sources

Reference one or more of:
- relevant portfolio companies
- a public thesis, talk, post, or article
- a mutual connection
- a clear market or product fit with the investor's focus

If that context is missing, ask for it or state that the draft is a template awaiting personalization.

## Follow-Up Cadence

Default:
- day 0: initial outbound
- day 4-5: short follow-up with one new data point
- day 10-12: final follow-up with a clean close

Do not keep nudging after that unless the user wants a longer sequence.

## Warm Intro Requests

Make life easy for the connector:
- explain why the intro is a fit
- include a forwardable blurb
- keep the forwardable blurb under 100 words

## Post-Meeting Updates

Include:
- the specific thing discussed
- the answer or update promised
- one new proof point if available
- the next step

## Quality Gate

Before delivering:
- message is personalized
- the ask is explicit
- there is no fluff or begging language
- the proof point is concrete
- word count stays tight
