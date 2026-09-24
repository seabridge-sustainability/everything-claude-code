---
paths:
  - "**/*.swift"
  - "**/Package.swift"
---

# Swift Ã§Â¼â€“Ã§Â ÂÃ©Â£Å½Ã¦Â Â¼

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


> Ã¦Å“Â¬Ã¦â€“â€¡Ã¤Â»Â¶Ã¥Å“Â¨ [common/coding-style.md](../common/coding-style.md) Ã§Å¡â€žÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¸Å Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  Swift Ã§â€ºÂ¸Ã¥â€¦Â³Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“

* **SwiftFormat** Ã§â€Â¨Ã¤ÂºÅ½Ã¨â€¡ÂªÃ¥Å Â¨Ã¦Â Â¼Ã¥Â¼ÂÃ¥Å’â€“Ã¯Â¼Å’**SwiftLint** Ã§â€Â¨Ã¤ÂºÅ½Ã©Â£Å½Ã¦Â Â¼Ã¦Â£â‚¬Ã¦Å¸Â¥
* `swift-format` Ã¥Â·Â²Ã¤Â½Å“Ã¤Â¸ÂºÃ¦â€ºÂ¿Ã¤Â»Â£Ã¦â€“Â¹Ã¦Â¡Ë†Ã¦Ââ€ Ã§Â»â€˜Ã¥Å“Â¨ Xcode 16+ Ã¤Â¸Â­

## Ã¤Â¸ÂÃ¥ÂËœÃ¦â‚¬Â§

* Ã¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨ `let` Ã¨â‚¬Å’Ã©ÂÅ¾ `var` Ã¢â‚¬â€ Ã¥Â°â€ Ã¦â€°â‚¬Ã¦Å“â€°Ã¥â€ â€¦Ã¥Â®Â¹Ã¥Â®Å¡Ã¤Â¹â€°Ã¤Â¸Âº `let`Ã¯Â¼Å’Ã¤Â»â€¦Ã¥Å“Â¨Ã§Â¼â€“Ã¨Â¯â€˜Ã¥â„¢Â¨Ã¨Â¦ÂÃ¦Â±â€šÃ¦â€”Â¶Ã¦â€°ÂÃ¦â€Â¹Ã¤Â¸Âº `var`
* Ã©Â»ËœÃ¨Â®Â¤Ã¤Â½Â¿Ã§â€Â¨Ã¥â€¦Â·Ã¦Å“â€°Ã¥â‚¬Â¼Ã¨Â¯Â­Ã¤Â¹â€°Ã§Å¡â€ž `struct`Ã¯Â¼â€ºÃ¤Â»â€¦Ã¥Å“Â¨Ã©Å“â‚¬Ã¨Â¦ÂÃ¦Â â€¡Ã¨Â¯â€ Ã¦Ë†â€“Ã¥Â¼â€¢Ã§â€Â¨Ã¨Â¯Â­Ã¤Â¹â€°Ã¦â€”Â¶Ã¦â€°ÂÃ¤Â½Â¿Ã§â€Â¨ `class`

## Ã¥â€˜Â½Ã¥ÂÂ

Ã©ÂÂµÃ¥Â¾Âª [Apple API Ã¨Â®Â¾Ã¨Â®Â¡Ã¦Å’â€¡Ã¥Ââ€”](https://www.swift.org/documentation/api-design-guidelines/)Ã¯Â¼Å¡

* Ã¥Å“Â¨Ã¤Â½Â¿Ã§â€Â¨Ã¦â€”Â¶Ã¤Â¿ÂÃ¦Å’ÂÃ¦Â¸â€¦Ã¦â„¢Â° Ã¢â‚¬â€ Ã§Å“ÂÃ§â€¢Â¥Ã¤Â¸ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ§Å¡â€žÃ¨Â¯ÂÃ¨Â¯Â­
* Ã¦Â Â¹Ã¦ÂÂ®Ã¦â€“Â¹Ã¦Â³â€¢Ã¥â€™Å’Ã¥Â±Å¾Ã¦â‚¬Â§Ã§Å¡â€žÃ¤Â½Å“Ã§â€Â¨Ã¨â‚¬Å’Ã©ÂÅ¾Ã§Â±Â»Ã¥Å¾â€¹Ã¦ÂÂ¥Ã¥â€˜Â½Ã¥ÂÂ
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥Â¸Â¸Ã©â€¡ÂÃ¯Â¼Å’Ã¤Â½Â¿Ã§â€Â¨ `static let` Ã¨â‚¬Å’Ã©ÂÅ¾Ã¥â€¦Â¨Ã¥Â±â‚¬Ã¥Â¸Â¸Ã©â€¡Â

## Ã©â€â„¢Ã¨Â¯Â¯Ã¥Â¤â€žÃ§Ââ€ 

Ã¤Â½Â¿Ã§â€Â¨Ã§Â±Â»Ã¥Å¾â€¹Ã¥Å’â€“ throws (Swift 6+) Ã¥â€™Å’Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Å’Â¹Ã©â€¦ÂÃ¯Â¼Å¡

```swift
func load(id: String) throws(LoadError) -> Item {
    guard let data = try? read(from: path) else {
        throw .fileNotFound(id)
    }
    return try decode(data)
}
```

## Ã¥Â¹Â¶Ã¥Ââ€˜

Ã¥ÂÂ¯Ã§â€Â¨ Swift 6 Ã¤Â¸Â¥Ã¦Â Â¼Ã¥Â¹Â¶Ã¥Ââ€˜Ã¦Â£â‚¬Ã¦Å¸Â¥Ã£â‚¬â€šÃ¤Â¼ËœÃ¥â€¦Ë†Ã¤Â½Â¿Ã§â€Â¨Ã¯Â¼Å¡

* `Sendable` Ã¥â‚¬Â¼Ã§Â±Â»Ã¥Å¾â€¹Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â·Â¨Ã¨Â¶Å Ã©Å¡â€Ã§Â¦Â»Ã¨Â¾Â¹Ã§â€¢Å’Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®
* Actors Ã§â€Â¨Ã¤ÂºÅ½Ã¥â€¦Â±Ã¤ÂºÂ«Ã¥ÂÂ¯Ã¥ÂËœÃ§Å Â¶Ã¦â‚¬Â
* Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¥Â¹Â¶Ã¥Ââ€˜ (`async let`, `TaskGroup`) Ã¨â‚¬Å’Ã©ÂÅ¾Ã©ÂÅ¾Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã§Å¡â€ž `Task {}`
