---
name: foundation-models-on-device
description: Ã¨â€¹Â¹Ã¦Å¾Å“FoundationModelsÃ¦Â¡â€ Ã¦Å¾Â¶Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â®Â¾Ã¥Â¤â€¡Ã¤Â¸Å Ã§Å¡â€žLLMÃ¢â‚¬â€Ã¢â‚¬â€Ã¦â€“â€¡Ã¦Å“Â¬Ã§â€Å¸Ã¦Ë†ÂÃ£â‚¬ÂÃ¤Â½Â¿Ã§â€Â¨@GenerableÃ¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¼â€¢Ã¥Â¯Â¼Ã§â€Å¸Ã¦Ë†ÂÃ£â‚¬ÂÃ¥Â·Â¥Ã¥â€¦Â·Ã¨Â°Æ’Ã§â€Â¨Ã¯Â¼Å’Ã¤Â»Â¥Ã¥ÂÅ Ã¥Å“Â¨iOS 26+Ã¤Â¸Â­Ã§Å¡â€žÃ¥Â¿Â«Ã§â€¦Â§Ã¦ÂµÂÃ£â‚¬â€š
---

# FoundationModelsÃ¯Â¼Å¡Ã¨Â®Â¾Ã¥Â¤â€¡Ã§Â«Â¯ LLMÃ¯Â¼Ë†iOS 26Ã¯Â¼â€°

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


Ã¤Â½Â¿Ã§â€Â¨ FoundationModels Ã¦Â¡â€ Ã¦Å¾Â¶Ã¥Â°â€ Ã¨â€¹Â¹Ã¦Å¾Å“Ã§Å¡â€žÃ¨Â®Â¾Ã¥Â¤â€¡Ã§Â«Â¯Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¦Â¨Â¡Ã¥Å¾â€¹Ã©â€ºâ€ Ã¦Ë†ÂÃ¥Ë†Â°Ã¥Âºâ€Ã§â€Â¨Ã¤Â¸Â­Ã§Å¡â€žÃ¦Â¨Â¡Ã¥Â¼ÂÃ£â‚¬â€šÃ¦Â¶ÂµÃ§â€ºâ€“Ã¦â€“â€¡Ã¦Å“Â¬Ã§â€Å¸Ã¦Ë†ÂÃ£â‚¬ÂÃ¤Â½Â¿Ã§â€Â¨ `@Generable` Ã§Å¡â€žÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¨Â¾â€œÃ¥â€¡ÂºÃ£â‚¬ÂÃ¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â°Æ’Ã§â€Â¨Ã¤Â»Â¥Ã¥ÂÅ Ã¥Â¿Â«Ã§â€¦Â§Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¢â‚¬â€Ã¢â‚¬â€Ã¥â€¦Â¨Ã©Æ’Â¨Ã¥Å“Â¨Ã¨Â®Â¾Ã¥Â¤â€¡Ã§Â«Â¯Ã¨Â¿ÂÃ¨Â¡Å’Ã¯Â¼Å’Ã¤Â»Â¥Ã¤Â¿ÂÃ¦Å Â¤Ã©Å¡ÂÃ§Â§ÂÃ¥Â¹Â¶Ã¦â€Â¯Ã¦Å’ÂÃ§Â¦Â»Ã§ÂºÂ¿Ã¤Â½Â¿Ã§â€Â¨Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¥ÂÂ¯Ã§â€Â¨

* Ã¤Â½Â¿Ã§â€Â¨ Apple Intelligence Ã¥Å“Â¨Ã¨Â®Â¾Ã¥Â¤â€¡Ã§Â«Â¯Ã¦Å¾â€žÃ¥Â»Âº AI Ã¥Å Å¸Ã¨Æ’Â½
* Ã¦â€”Â Ã©Å“â‚¬Ã¤Â¾ÂÃ¨Âµâ€“Ã¤Âºâ€˜Ã§Â«Â¯Ã¥ÂÂ³Ã¥ÂÂ¯Ã§â€Å¸Ã¦Ë†ÂÃ¦Ë†â€“Ã¦â‚¬Â»Ã§Â»â€œÃ¦â€“â€¡Ã¦Å“Â¬
* Ã¤Â»Å½Ã¨â€¡ÂªÃ§â€žÂ¶Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¨Â¾â€œÃ¥â€¦Â¥Ã¤Â¸Â­Ã¦ÂÂÃ¥Ââ€“Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€¢Â°Ã¦ÂÂ®
* Ã¤Â¸ÂºÃ§â€°Â¹Ã¥Â®Å¡Ã©Â¢â€ Ã¥Å¸Å¸Ã§Å¡â€ž AI Ã¦â€œÂÃ¤Â½Å“Ã¥Â®Å¾Ã§Å½Â°Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â°Æ’Ã§â€Â¨
* Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¥â€œÂÃ¥Âºâ€Ã¤Â»Â¥Ã¥Â®Å¾Ã§Å½Â°Ã¥Â®Å¾Ã¦â€”Â¶ UI Ã¦â€ºÂ´Ã¦â€“Â°
* Ã©Å“â‚¬Ã¨Â¦ÂÃ¤Â¿ÂÃ¦Å Â¤Ã©Å¡ÂÃ§Â§ÂÃ§Å¡â€ž AIÃ¯Â¼Ë†Ã¦â€¢Â°Ã¦ÂÂ®Ã¤Â¸ÂÃ§Â¦Â»Ã¥Â¼â‚¬Ã¨Â®Â¾Ã¥Â¤â€¡Ã¯Â¼â€°

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ Ã¥ÂÂ¯Ã§â€Â¨Ã¦â‚¬Â§Ã¦Â£â‚¬Ã¦Å¸Â¥

Ã¥Å“Â¨Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å’Ã¥Â§â€¹Ã§Â»Ë†Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥ÂÂ¯Ã§â€Â¨Ã¦â‚¬Â§Ã¯Â¼Å¡

```swift
struct GenerativeView: View {
    private var model = SystemLanguageModel.default

    var body: some View {
        switch model.availability {
        case .available:
            ContentView()
        case .unavailable(.deviceNotEligible):
            Text("Device not eligible for Apple Intelligence")
        case .unavailable(.appleIntelligenceNotEnabled):
            Text("Please enable Apple Intelligence in Settings")
        case .unavailable(.modelNotReady):
            Text("Model is downloading or not ready")
        case .unavailable(let other):
            Text("Model unavailable: \(other)")
        }
    }
}
```

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¤Â¼Å¡Ã¨Â¯Â

```swift
// Single-turn: create a new session each time
let session = LanguageModelSession()
let response = try await session.respond(to: "What's a good month to visit Paris?")
print(response.content)

// Multi-turn: reuse session for conversation context
let session = LanguageModelSession(instructions: """
    You are a cooking assistant.
    Provide recipe suggestions based on ingredients.
    Keep suggestions brief and practical.
    """)

let first = try await session.respond(to: "I have chicken and rice")
let followUp = try await session.respond(to: "What about a vegetarian option?")
```

Ã¦Å’â€¡Ã¤Â»Â¤Ã§Å¡â€žÃ¥â€¦Â³Ã©â€Â®Ã§â€šÂ¹Ã¯Â¼Å¡

* Ã¥Â®Å¡Ã¤Â¹â€°Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§Å¡â€žÃ¨Â§â€™Ã¨â€°Â²Ã¯Â¼Ë†"Ã¤Â½Â Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã¤Â½ÂÃ¥Â¯Â¼Ã¥Â¸Ë†"Ã¯Â¼â€°
* Ã¦Å’â€¡Ã¥Â®Å¡Ã¨Â¦ÂÃ¥ÂÅ¡Ã¤Â»â‚¬Ã¤Â¹Ë†Ã¯Â¼Ë†"Ã¥Â¸Â®Ã¥Å Â©Ã¦ÂÂÃ¥Ââ€“Ã¦â€”Â¥Ã¥Å½â€ Ã¤Âºâ€¹Ã¤Â»Â¶"Ã¯Â¼â€°
* Ã¨Â®Â¾Ã§Â½Â®Ã©Â£Å½Ã¦Â Â¼Ã¥ÂÂÃ¥Â¥Â½Ã¯Â¼Ë†"Ã¥Â°Â½Ã¥ÂÂ¯Ã¨Æ’Â½Ã§Â®â‚¬Ã§Å¸Â­Ã¥Å“Â°Ã¥â€ºÅ¾Ã§Â­â€"Ã¯Â¼â€°
* Ã¦Â·Â»Ã¥Å Â Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å½ÂªÃ¦â€“Â½Ã¯Â¼Ë†"Ã¥Â¯Â¹Ã¤ÂºÅ½Ã¥ÂÂ±Ã©â„¢Â©Ã¨Â¯Â·Ã¦Â±â€šÃ¯Â¼Å’Ã¥â€ºÅ¾Ã¥Â¤Â'Ã¦Ë†â€˜Ã¦â€”Â Ã¦Â³â€¢Ã¦ÂÂÃ¤Â¾â€ºÃ¥Â¸Â®Ã¥Å Â©'"Ã¯Â¼â€°

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ Ã¤Â½Â¿Ã§â€Â¨ @Generable Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¼â€¢Ã¥Â¯Â¼Ã¥Â¼ÂÃ§â€Å¸Ã¦Ë†Â

Ã§â€Å¸Ã¦Ë†ÂÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã§Å¡â€ž Swift Ã§Â±Â»Ã¥Å¾â€¹Ã¯Â¼Å’Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯Ã¥Å½Å¸Ã¥Â§â€¹Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¯Â¼Å¡

### 1. Ã¥Â®Å¡Ã¤Â¹â€°Ã¥ÂÂ¯Ã§â€Å¸Ã¦Ë†ÂÃ§Â±Â»Ã¥Å¾â€¹

```swift
@Generable(description: "Basic profile information about a cat")
struct CatProfile {
    var name: String

    @Guide(description: "The age of the cat", .range(0...20))
    var age: Int

    @Guide(description: "A one sentence profile about the cat's personality")
    var profile: String
}
```

### 2. Ã¨Â¯Â·Ã¦Â±â€šÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¨Â¾â€œÃ¥â€¡Âº

```swift
let response = try await session.respond(
    to: "Generate a cute rescue cat",
    generating: CatProfile.self
)

// Access structured fields directly
print("Name: \(response.content.name)")
print("Age: \(response.content.age)")
print("Profile: \(response.content.profile)")
```

### Ã¦â€Â¯Ã¦Å’ÂÃ§Å¡â€ž @Guide Ã§ÂºÂ¦Ã¦ÂÅ¸

* `.range(0...20)` Ã¢â‚¬â€ Ã¦â€¢Â°Ã¥â‚¬Â¼Ã¨Å’Æ’Ã¥â€ºÂ´
* `.count(3)` Ã¢â‚¬â€ Ã¦â€¢Â°Ã§Â»â€žÃ¥â€¦Æ’Ã§Â´Â Ã¦â€¢Â°Ã©â€¡Â
* `description:` Ã¢â‚¬â€ Ã§â€Å¸Ã¦Ë†ÂÃ§Å¡â€žÃ¨Â¯Â­Ã¤Â¹â€°Ã¥Â¼â€¢Ã¥Â¯Â¼

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â°Æ’Ã§â€Â¨

Ã¨Â®Â©Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¨Â°Æ’Ã§â€Â¨Ã¨â€¡ÂªÃ¥Â®Å¡Ã¤Â¹â€°Ã¤Â»Â£Ã§Â ÂÃ¤Â»Â¥Ã¦â€°Â§Ã¨Â¡Å’Ã§â€°Â¹Ã¥Â®Å¡Ã©Â¢â€ Ã¥Å¸Å¸Ã§Å¡â€žÃ¤Â»Â»Ã¥Å Â¡Ã¯Â¼Å¡

### 1. Ã¥Â®Å¡Ã¤Â¹â€°Ã¥Â·Â¥Ã¥â€¦Â·

```swift
struct RecipeSearchTool: Tool {
    let name = "recipe_search"
    let description = "Search for recipes matching a given term and return a list of results."

    @Generable
    struct Arguments {
        var searchTerm: String
        var numberOfResults: Int
    }

    func call(arguments: Arguments) async throws -> ToolOutput {
        let recipes = await searchRecipes(
            term: arguments.searchTerm,
            limit: arguments.numberOfResults
        )
        return .string(recipes.map { "- \($0.name): \($0.description)" }.joined(separator: "\n"))
    }
}
```

### 2. Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â¸Â¦Ã¥Â·Â¥Ã¥â€¦Â·Ã§Å¡â€žÃ¤Â¼Å¡Ã¨Â¯Â

```swift
let session = LanguageModelSession(tools: [RecipeSearchTool()])
let response = try await session.respond(to: "Find me some pasta recipes")
```

### 3. Ã¥Â¤â€žÃ§Ââ€ Ã¥Â·Â¥Ã¥â€¦Â·Ã©â€â„¢Ã¨Â¯Â¯

```swift
do {
    let answer = try await session.respond(to: "Find a recipe for tomato soup.")
} catch let error as LanguageModelSession.ToolCallError {
    print(error.tool.name)
    if case .databaseIsEmpty = error.underlyingError as? RecipeSearchToolError {
        // Handle specific tool error
    }
}
```

## Ã¦Â Â¸Ã¥Â¿Æ’Ã¦Â¨Â¡Ã¥Â¼Â Ã¢â‚¬â€ Ã¥Â¿Â«Ã§â€¦Â§Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œ

Ã¤Â½Â¿Ã§â€Â¨ `PartiallyGenerated` Ã§Â±Â»Ã¥Å¾â€¹Ã¤Â¸ÂºÃ¥Â®Å¾Ã¦â€”Â¶ UI Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¥â€œÂÃ¥Âºâ€Ã¯Â¼Å¡

```swift
@Generable
struct TripIdeas {
    @Guide(description: "Ideas for upcoming trips")
    var ideas: [String]
}

let stream = session.streamResponse(
    to: "What are some exciting trip ideas?",
    generating: TripIdeas.self
)

for try await partial in stream {
    // partial: TripIdeas.PartiallyGenerated (all properties Optional)
    print(partial)
}
```

### SwiftUI Ã©â€ºâ€ Ã¦Ë†Â

```swift
@State private var partialResult: TripIdeas.PartiallyGenerated?
@State private var errorMessage: String?

var body: some View {
    List {
        ForEach(partialResult?.ideas ?? [], id: \.self) { idea in
            Text(idea)
        }
    }
    .overlay {
        if let errorMessage { Text(errorMessage).foregroundStyle(.red) }
    }
    .task {
        do {
            let stream = session.streamResponse(to: prompt, generating: TripIdeas.self)
            for try await partial in stream {
                partialResult = partial
            }
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}
```

## Ã¥â€¦Â³Ã©â€Â®Ã¨Â®Â¾Ã¨Â®Â¡Ã¥â€ Â³Ã§Â­â€“

| Ã¥â€ Â³Ã§Â­â€“ | Ã§Ââ€ Ã§â€Â± |
|----------|-----------|
| Ã¨Â®Â¾Ã¥Â¤â€¡Ã§Â«Â¯Ã¦â€°Â§Ã¨Â¡Å’ | Ã©Å¡ÂÃ§Â§ÂÃ¦â‚¬Â§Ã¢â‚¬â€Ã¢â‚¬â€Ã¦â€¢Â°Ã¦ÂÂ®Ã¤Â¸ÂÃ§Â¦Â»Ã¥Â¼â‚¬Ã¨Â®Â¾Ã¥Â¤â€¡Ã¯Â¼â€ºÃ¦â€Â¯Ã¦Å’ÂÃ§Â¦Â»Ã§ÂºÂ¿Ã¥Â·Â¥Ã¤Â½Å“ |
| 4,096 Ã¤Â¸ÂªÃ¤Â»Â¤Ã§â€°Å’Ã©â„¢ÂÃ¥Ë†Â¶ | Ã¨Â®Â¾Ã¥Â¤â€¡Ã§Â«Â¯Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§ÂºÂ¦Ã¦ÂÅ¸Ã¯Â¼â€ºÃ¨Â·Â¨Ã¤Â¼Å¡Ã¨Â¯ÂÃ¥Ë†â€ Ã¥Ââ€”Ã¥Â¤â€žÃ§Ââ€ Ã¥Â¤Â§Ã¦â€¢Â°Ã¦ÂÂ® |
| Ã¥Â¿Â«Ã§â€¦Â§Ã¦ÂµÂÃ¥Â¼ÂÃ¤Â¼Â Ã¨Â¾â€œÃ¯Â¼Ë†Ã©ÂÅ¾Ã¥Â¢Å¾Ã©â€¡ÂÃ¯Â¼â€° | Ã¥Â¯Â¹Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¨Â¾â€œÃ¥â€¡ÂºÃ¥Ââ€¹Ã¥Â¥Â½Ã¯Â¼â€ºÃ¦Â¯ÂÃ¤Â¸ÂªÃ¥Â¿Â«Ã§â€¦Â§Ã©Æ’Â½Ã¦ËœÂ¯Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¥Â®Å’Ã¦â€¢Â´Ã§Å¡â€žÃ©Æ’Â¨Ã¥Ë†â€ Ã§Å Â¶Ã¦â‚¬Â |
| `@Generable` Ã¥Â®Â | Ã¤Â¸ÂºÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã§â€Å¸Ã¦Ë†ÂÃ¦ÂÂÃ¤Â¾â€ºÃ§Â¼â€“Ã¨Â¯â€˜Ã¦â€”Â¶Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â‚¬Â§Ã¯Â¼â€ºÃ¨â€¡ÂªÃ¥Å Â¨Ã§â€Å¸Ã¦Ë†Â `PartiallyGenerated` Ã§Â±Â»Ã¥Å¾â€¹ |
| Ã¦Â¯ÂÃ¤Â¸ÂªÃ¤Â¼Å¡Ã¨Â¯ÂÃ¥Ââ€¢Ã¦Â¬Â¡Ã¨Â¯Â·Ã¦Â±â€š | `isResponding` Ã©ËœÂ²Ã¦Â­Â¢Ã¥Â¹Â¶Ã¥Ââ€˜Ã¨Â¯Â·Ã¦Â±â€šÃ¯Â¼â€ºÃ¥Â¦â€šÃ¦Å“â€°Ã©Å“â‚¬Ã¨Â¦ÂÃ¯Â¼Å’Ã¥Ë†â€ºÃ¥Â»ÂºÃ¥Â¤Å¡Ã¤Â¸ÂªÃ¤Â¼Å¡Ã¨Â¯Â |
| `response.content`Ã¯Â¼Ë†Ã¨â‚¬Å’Ã©ÂÅ¾ `.output`Ã¯Â¼â€° | Ã¦Â­Â£Ã§Â¡Â®Ã§Å¡â€ž APIÃ¢â‚¬â€Ã¢â‚¬â€Ã¥Â§â€¹Ã§Â»Ë†Ã©â‚¬Å¡Ã¨Â¿â€¡ `.content` Ã¥Â±Å¾Ã¦â‚¬Â§Ã¨Â®Â¿Ã©â€”Â®Ã§Â»â€œÃ¦Å¾Å“ |

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

* Ã¥Å“Â¨Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¹â€¹Ã¥â€°Â**Ã¥Â§â€¹Ã§Â»Ë†Ã¦Â£â‚¬Ã¦Å¸Â¥ `model.availability`**Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Â¤â€žÃ§Ââ€ Ã¦â€°â‚¬Ã¦Å“â€°Ã¤Â¸ÂÃ¥ÂÂ¯Ã§â€Â¨Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ Âµ
* **Ã¤Â½Â¿Ã§â€Â¨ `instructions`** Ã¦ÂÂ¥Ã¥Â¼â€¢Ã¥Â¯Â¼Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¨Â¡Å’Ã¤Â¸ÂºÃ¢â‚¬â€Ã¢â‚¬â€Ã¥Â®Æ’Ã¤Â»Â¬Ã§Å¡â€žÃ¤Â¼ËœÃ¥â€¦Ë†Ã§ÂºÂ§Ã©Â«ËœÃ¤ÂºÅ½Ã¦ÂÂÃ§Â¤ÂºÃ¨Â¯Â
* Ã¥Å“Â¨Ã¥Ââ€˜Ã©â‚¬ÂÃ¦â€“Â°Ã¨Â¯Â·Ã¦Â±â€šÃ¤Â¹â€¹Ã¥â€°Â**Ã¦Â£â‚¬Ã¦Å¸Â¥ `isResponding`**Ã¢â‚¬â€Ã¢â‚¬â€Ã¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸â‚¬Ã¦Â¬Â¡Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¨Â¯Â·Ã¦Â±â€š
* Ã©â‚¬Å¡Ã¨Â¿â€¡ `response.content` **Ã¨Â®Â¿Ã©â€”Â®Ã§Â»â€œÃ¦Å¾Å“**Ã¢â‚¬â€Ã¢â‚¬â€Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯ `.output`
* **Ã¥Â°â€ Ã¥Â¤Â§Ã¥Å¾â€¹Ã¨Â¾â€œÃ¥â€¦Â¥Ã¥Ë†â€ Ã¥Ââ€”Ã¥Â¤â€žÃ§Ââ€ **Ã¢â‚¬â€Ã¢â‚¬â€4,096 Ã¤Â¸ÂªÃ¤Â»Â¤Ã§â€°Å’Ã§Å¡â€žÃ©â„¢ÂÃ¥Ë†Â¶Ã©â‚¬â€šÃ§â€Â¨Ã¤ÂºÅ½Ã¦Å’â€¡Ã¤Â»Â¤Ã£â‚¬ÂÃ¦ÂÂÃ§Â¤ÂºÃ¨Â¯ÂÃ¥â€™Å’Ã¨Â¾â€œÃ¥â€¡ÂºÃ§Å¡â€žÃ¦â‚¬Â»Ã¥â€™Å’
* Ã¥Â¯Â¹Ã¤ÂºÅ½Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¨Â¾â€œÃ¥â€¡Âº**Ã¤Â½Â¿Ã§â€Â¨ `@Generable`**Ã¢â‚¬â€Ã¢â‚¬â€Ã¦Â¯â€Ã¨Â§Â£Ã¦Å¾ÂÃ¥Å½Å¸Ã¥Â§â€¹Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¦ÂÂÃ¤Â¾â€ºÃ¦â€ºÂ´Ã¥Â¼ÂºÃ§Å¡â€žÃ¤Â¿ÂÃ¨Â¯Â
* **Ã¤Â½Â¿Ã§â€Â¨ `GenerationOptions(temperature:)`** Ã¦ÂÂ¥Ã¨Â°Æ’Ã¦â€¢Â´Ã¥Ë†â€ºÃ©â‚¬Â Ã¥Å â€ºÃ¯Â¼Ë†Ã¥â‚¬Â¼Ã¨Â¶Å Ã©Â«ËœÃ¨Â¶Å Ã¦Å“â€°Ã¥Ë†â€ºÃ¦â€žÂÃ¯Â¼â€°
* **Ã¤Â½Â¿Ã§â€Â¨ Instruments Ã¨Â¿â€ºÃ¨Â¡Å’Ã§â€ºâ€˜Ã¦Å½Â§**Ã¢â‚¬â€Ã¢â‚¬â€Ã¤Â½Â¿Ã§â€Â¨ Xcode Instruments Ã¦ÂÂ¥Ã¥Ë†â€ Ã¦Å¾ÂÃ¨Â¯Â·Ã¦Â±â€šÃ¦â‚¬Â§Ã¨Æ’Â½

## Ã¥Âºâ€Ã©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â

* Ã¦Å“ÂªÃ¥â€¦Ë†Ã¦Â£â‚¬Ã¦Å¸Â¥ `model.availability` Ã¥Â°Â±Ã¥Ë†â€ºÃ¥Â»ÂºÃ¤Â¼Å¡Ã¨Â¯Â
* Ã¥Ââ€˜Ã©â‚¬ÂÃ¨Â¶â€¦Ã¨Â¿â€¡ 4,096 Ã¤Â¸ÂªÃ¤Â»Â¤Ã§â€°Å’Ã¤Â¸Å Ã¤Â¸â€¹Ã¦â€“â€¡Ã§Âªâ€”Ã¥ÂÂ£Ã§Å¡â€žÃ¨Â¾â€œÃ¥â€¦Â¥
* Ã¥Â°ÂÃ¨Â¯â€¢Ã¥Å“Â¨Ã¥Ââ€¢Ã¤Â¸ÂªÃ¤Â¼Å¡Ã¨Â¯ÂÃ¤Â¸Å Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¹Â¶Ã¥Ââ€˜Ã¨Â¯Â·Ã¦Â±â€š
* Ã¤Â½Â¿Ã§â€Â¨ `.output` Ã¨â‚¬Å’Ã¤Â¸ÂÃ¦ËœÂ¯ `.content` Ã¦ÂÂ¥Ã¨Â®Â¿Ã©â€”Â®Ã¥â€œÂÃ¥Âºâ€Ã¦â€¢Â°Ã¦ÂÂ®
* Ã¥Â½â€œ `@Generable` Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¨Â¾â€œÃ¥â€¡ÂºÃ¥ÂÂ¯Ã¨Â¡Å’Ã¦â€”Â¶Ã¯Â¼Å’Ã¥ÂÂ´Ã¥Å½Â»Ã¨Â§Â£Ã¦Å¾ÂÃ¥Å½Å¸Ã¥Â§â€¹Ã¥Â­â€”Ã§Â¬Â¦Ã¤Â¸Â²Ã¥â€œÂÃ¥Âºâ€
* Ã¥Å“Â¨Ã¥Ââ€¢Ã¤Â¸ÂªÃ¦ÂÂÃ§Â¤ÂºÃ¨Â¯ÂÃ¤Â¸Â­Ã¦Å¾â€žÃ¥Â»ÂºÃ¥Â¤ÂÃ¦Ââ€šÃ§Å¡â€žÃ¥Â¤Å¡Ã¦Â­Â¥Ã©â‚¬Â»Ã¨Â¾â€˜Ã¢â‚¬â€Ã¢â‚¬â€Ã¥Â°â€ Ã¥â€¦Â¶Ã¦â€¹â€ Ã¥Ë†â€ Ã¤Â¸ÂºÃ¥Â¤Å¡Ã¤Â¸ÂªÃ¨ÂÅ¡Ã§â€žÂ¦Ã§Å¡â€žÃ¦ÂÂÃ§Â¤ÂºÃ¨Â¯Â
* Ã¥Ââ€¡Ã¨Â®Â¾Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Â§â€¹Ã§Â»Ë†Ã¥ÂÂ¯Ã§â€Â¨Ã¢â‚¬â€Ã¢â‚¬â€Ã¨Â®Â¾Ã¥Â¤â€¡Ã§Å¡â€žÃ¨Âµâ€žÃ¦Â Â¼Ã¥â€™Å’Ã¨Â®Â¾Ã§Â½Â®Ã¥Ââ€žÃ¤Â¸ÂÃ§â€ºÂ¸Ã¥ÂÅ’

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* Ã¤Â¸ÂºÃ¦Â³Â¨Ã©â€¡ÂÃ©Å¡ÂÃ§Â§ÂÃ§Å¡â€žÃ¥Âºâ€Ã§â€Â¨Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â®Â¾Ã¥Â¤â€¡Ã§Â«Â¯Ã¦â€“â€¡Ã¦Å“Â¬Ã§â€Å¸Ã¦Ë†Â
* Ã¤Â»Å½Ã§â€Â¨Ã¦Ë†Â·Ã¨Â¾â€œÃ¥â€¦Â¥Ã¯Â¼Ë†Ã¨Â¡Â¨Ã¥Ââ€¢Ã£â‚¬ÂÃ¨â€¡ÂªÃ§â€žÂ¶Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¥â€˜Â½Ã¤Â»Â¤Ã¯Â¼â€°Ã¤Â¸Â­Ã¦ÂÂÃ¥Ââ€“Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€¢Â°Ã¦ÂÂ®
* Ã¥Â¿â€¦Ã©Â¡Â»Ã§Â¦Â»Ã§ÂºÂ¿Ã¥Â·Â¥Ã¤Â½Å“Ã§Å¡â€ž AI Ã¨Â¾â€¦Ã¥Å Â©Ã¥Å Å¸Ã¨Æ’Â½
* Ã©â‚¬ÂÃ¦Â­Â¥Ã¦ËœÂ¾Ã§Â¤ÂºÃ§â€Å¸Ã¦Ë†ÂÃ¥â€ â€¦Ã¥Â®Â¹Ã§Å¡â€žÃ¦ÂµÂÃ¥Â¼Â UI
* Ã©â‚¬Å¡Ã¨Â¿â€¡Ã¥Â·Â¥Ã¥â€¦Â·Ã¨Â°Æ’Ã§â€Â¨Ã¯Â¼Ë†Ã¦ÂÅ“Ã§Â´Â¢Ã£â‚¬ÂÃ¨Â®Â¡Ã§Â®â€”Ã£â‚¬ÂÃ¦Å¸Â¥Ã¦â€°Â¾Ã¯Â¼â€°Ã¦â€°Â§Ã¨Â¡Å’Ã§â€°Â¹Ã¥Â®Å¡Ã©Â¢â€ Ã¥Å¸Å¸Ã§Å¡â€ž AI Ã¦â€œÂÃ¤Â½Å“
