---
paths:
  - "**/*.swift"
  - "**/Package.swift"
---

# Swift Ã¥Â®â€°Ã¥â€¦Â¨

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


> Ã¦Â­Â¤Ã¦â€“â€¡Ã¤Â»Â¶Ã¦â€°Â©Ã¥Â±â€¢Ã¤Âºâ€  [common/security.md](../common/security.md)Ã¯Â¼Å’Ã¥Â¹Â¶Ã¥Å’â€¦Ã¥ÂÂ« Swift Ã§â€°Â¹Ã¥Â®Å¡Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹Ã£â‚¬â€š

## Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ 

* Ã¤Â½Â¿Ã§â€Â¨ **Keychain Services** Ã¥Â¤â€žÃ§Ââ€ Ã¦â€¢ÂÃ¦â€žÅ¸Ã¦â€¢Â°Ã¦ÂÂ®Ã¯Â¼Ë†Ã¤Â»Â¤Ã§â€°Å’Ã£â‚¬ÂÃ¥Â¯â€ Ã§Â ÂÃ£â‚¬ÂÃ¥Â¯â€ Ã©â€™Â¥Ã¯Â¼â€°Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â½Â¿Ã§â€Â¨ `UserDefaults`
* Ã¤Â½Â¿Ã§â€Â¨Ã§Å½Â¯Ã¥Â¢Æ’Ã¥ÂËœÃ©â€¡ÂÃ¦Ë†â€“ `.xcconfig` Ã¦â€“â€¡Ã¤Â»Â¶Ã¦ÂÂ¥Ã§Â®Â¡Ã§Ââ€ Ã¦Å¾â€žÃ¥Â»ÂºÃ¦â€”Â¶Ã§Å¡â€žÃ¥Â¯â€ Ã©â€™Â¥
* Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¥Å“Â¨Ã¦ÂºÂÃ¤Â»Â£Ã§Â ÂÃ¤Â¸Â­Ã§Â¡Â¬Ã§Â¼â€“Ã§Â ÂÃ¥Â¯â€ Ã©â€™Â¥ Ã¢â‚¬â€Ã¢â‚¬â€ Ã¥ÂÂÃ§Â¼â€“Ã¨Â¯â€˜Ã¥Â·Â¥Ã¥â€¦Â·Ã¥ÂÂ¯Ã¤Â»Â¥Ã¨Â½Â»Ã¦Ëœâ€œÃ¦ÂÂÃ¥Ââ€“Ã¥Â®Æ’Ã¤Â»Â¬

```swift
let apiKey = ProcessInfo.processInfo.environment["API_KEY"]
guard let apiKey, !apiKey.isEmpty else {
    fatalError("API_KEY not configured")
}
```

## Ã¤Â¼Â Ã¨Â¾â€œÃ¥Â®â€°Ã¥â€¦Â¨

* Ã©Â»ËœÃ¨Â®Â¤Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’ App Transport Security (ATS) Ã¢â‚¬â€Ã¢â‚¬â€ Ã¤Â¸ÂÃ¨Â¦ÂÃ§Â¦ÂÃ§â€Â¨Ã¥Â®Æ’
* Ã¥Â¯Â¹Ã¥â€¦Â³Ã©â€Â®Ã§Â«Â¯Ã§â€šÂ¹Ã¤Â½Â¿Ã§â€Â¨Ã¨Â¯ÂÃ¤Â¹Â¦Ã©â€ÂÃ¥Â®Å¡
* Ã©ÂªÅ’Ã¨Â¯ÂÃ¦â€°â‚¬Ã¦Å“â€°Ã¦Å“ÂÃ¥Å Â¡Ã¥â„¢Â¨Ã¨Â¯ÂÃ¤Â¹Â¦

## Ã¨Â¾â€œÃ¥â€¦Â¥Ã©ÂªÅ’Ã¨Â¯Â

* Ã¥Å“Â¨Ã¦ËœÂ¾Ã§Â¤ÂºÃ¤Â¹â€¹Ã¥â€°ÂÃ¦Â¸â€¦Ã§Ââ€ Ã¦â€°â‚¬Ã¦Å“â€°Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¯Â¼Å’Ã¤Â»Â¥Ã©ËœÂ²Ã¦Â­Â¢Ã¦Â³Â¨Ã¥â€¦Â¥Ã¦â€Â»Ã¥â€¡Â»
* Ã¤Â½Â¿Ã§â€Â¨Ã¥Â¸Â¦Ã©ÂªÅ’Ã¨Â¯ÂÃ§Å¡â€ž `URL(string:)`Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¨Â§Â£Ã¥Å’â€¦
* Ã¥Å“Â¨Ã¥Â¤â€žÃ§Ââ€ Ã¦ÂÂ¥Ã¨â€¡ÂªÃ¥Â¤â€“Ã©Æ’Â¨Ã¦ÂºÂÃ¯Â¼Ë†APIÃ£â‚¬ÂÃ¦Â·Â±Ã¥ÂºÂ¦Ã©â€œÂ¾Ã¦Å½Â¥Ã£â‚¬ÂÃ¥â€°ÂªÃ¨Â´Â´Ã¦ÂÂ¿Ã¯Â¼â€°Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã¥â€¦Ë†Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯Â
