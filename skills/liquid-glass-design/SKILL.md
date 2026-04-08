---
name: liquid-glass-design
description: iOS 26 Liquid Glass design system Ã¢â‚¬â€ dynamic glass material with blur, reflection, and interactive morphing for SwiftUI, UIKit, and WidgetKit.
---

# Liquid Glass Design System (iOS 26)

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Patterns for implementing Apple's Liquid Glass Ã¢â‚¬â€ a dynamic material that blurs content behind it, reflects color and light from surrounding content, and reacts to touch and pointer interactions. Covers SwiftUI, UIKit, and WidgetKit integration.

## When to Activate

- Building or updating apps for iOS 26+ with the new design language
- Implementing glass-style buttons, cards, toolbars, or containers
- Creating morphing transitions between glass elements
- Applying Liquid Glass effects to widgets
- Migrating existing blur/material effects to the new Liquid Glass API

## Core Pattern Ã¢â‚¬â€ SwiftUI

### Basic Glass Effect

The simplest way to add Liquid Glass to any view:

```swift
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect()  // Default: regular variant, capsule shape
```

### Customizing Shape and Tint

```swift
Text("Hello, World!")
    .font(.title)
    .padding()
    .glassEffect(.regular.tint(.orange).interactive(), in: .rect(cornerRadius: 16.0))
```

Key customization options:
- `.regular` Ã¢â‚¬â€ standard glass effect
- `.tint(Color)` Ã¢â‚¬â€ add color tint for prominence
- `.interactive()` Ã¢â‚¬â€ react to touch and pointer interactions
- Shape: `.capsule` (default), `.rect(cornerRadius:)`, `.circle`

### Glass Button Styles

```swift
Button("Click Me") { /* action */ }
    .buttonStyle(.glass)

Button("Important") { /* action */ }
    .buttonStyle(.glassProminent)
```

### GlassEffectContainer for Multiple Elements

Always wrap multiple glass views in a container for performance and morphing:

```swift
GlassEffectContainer(spacing: 40.0) {
    HStack(spacing: 40.0) {
        Image(systemName: "scribble.variable")
            .frame(width: 80.0, height: 80.0)
            .font(.system(size: 36))
            .glassEffect()

        Image(systemName: "eraser.fill")
            .frame(width: 80.0, height: 80.0)
            .font(.system(size: 36))
            .glassEffect()
    }
}
```

The `spacing` parameter controls merge distance Ã¢â‚¬â€ closer elements blend their glass shapes together.

### Uniting Glass Effects

Combine multiple views into a single glass shape with `glassEffectUnion`:

```swift
@Namespace private var namespace

GlassEffectContainer(spacing: 20.0) {
    HStack(spacing: 20.0) {
        ForEach(symbolSet.indices, id: \.self) { item in
            Image(systemName: symbolSet[item])
                .frame(width: 80.0, height: 80.0)
                .glassEffect()
                .glassEffectUnion(id: item < 2 ? "group1" : "group2", namespace: namespace)
        }
    }
}
```

### Morphing Transitions

Create smooth morphing when glass elements appear/disappear:

```swift
@State private var isExpanded = false
@Namespace private var namespace

GlassEffectContainer(spacing: 40.0) {
    HStack(spacing: 40.0) {
        Image(systemName: "scribble.variable")
            .frame(width: 80.0, height: 80.0)
            .glassEffect()
            .glassEffectID("pencil", in: namespace)

        if isExpanded {
            Image(systemName: "eraser.fill")
                .frame(width: 80.0, height: 80.0)
                .glassEffect()
                .glassEffectID("eraser", in: namespace)
        }
    }
}

Button("Toggle") {
    withAnimation { isExpanded.toggle() }
}
.buttonStyle(.glass)
```

### Extending Horizontal Scrolling Under Sidebar

To allow horizontal scroll content to extend under a sidebar or inspector, ensure the `ScrollView` content reaches the leading/trailing edges of the container. The system automatically handles the under-sidebar scrolling behavior when the layout extends to the edges Ã¢â‚¬â€ no additional modifier is needed.

## Core Pattern Ã¢â‚¬â€ UIKit

### Basic UIGlassEffect

```swift
let glassEffect = UIGlassEffect()
glassEffect.tintColor = UIColor.systemBlue.withAlphaComponent(0.3)
glassEffect.isInteractive = true

let visualEffectView = UIVisualEffectView(effect: glassEffect)
visualEffectView.translatesAutoresizingMaskIntoConstraints = false
visualEffectView.layer.cornerRadius = 20
visualEffectView.clipsToBounds = true

view.addSubview(visualEffectView)
NSLayoutConstraint.activate([
    visualEffectView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
    visualEffectView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
    visualEffectView.widthAnchor.constraint(equalToConstant: 200),
    visualEffectView.heightAnchor.constraint(equalToConstant: 120)
])

// Add content to contentView
let label = UILabel()
label.text = "Liquid Glass"
label.translatesAutoresizingMaskIntoConstraints = false
visualEffectView.contentView.addSubview(label)
NSLayoutConstraint.activate([
    label.centerXAnchor.constraint(equalTo: visualEffectView.contentView.centerXAnchor),
    label.centerYAnchor.constraint(equalTo: visualEffectView.contentView.centerYAnchor)
])
```

### UIGlassContainerEffect for Multiple Elements

```swift
let containerEffect = UIGlassContainerEffect()
containerEffect.spacing = 40.0

let containerView = UIVisualEffectView(effect: containerEffect)

let firstGlass = UIVisualEffectView(effect: UIGlassEffect())
let secondGlass = UIVisualEffectView(effect: UIGlassEffect())

containerView.contentView.addSubview(firstGlass)
containerView.contentView.addSubview(secondGlass)
```

### Scroll Edge Effects

```swift
scrollView.topEdgeEffect.style = .automatic
scrollView.bottomEdgeEffect.style = .hard
scrollView.leftEdgeEffect.isHidden = true
```

### Toolbar Glass Integration

```swift
let favoriteButton = UIBarButtonItem(image: UIImage(systemName: "heart"), style: .plain, target: self, action: #selector(favoriteAction))
favoriteButton.hidesSharedBackground = true  // Opt out of shared glass background
```

## Core Pattern Ã¢â‚¬â€ WidgetKit

### Rendering Mode Detection

```swift
struct MyWidgetView: View {
    @Environment(\.widgetRenderingMode) var renderingMode

    var body: some View {
        if renderingMode == .accented {
            // Tinted mode: white-tinted, themed glass background
        } else {
            // Full color mode: standard appearance
        }
    }
}
```

### Accent Groups for Visual Hierarchy

```swift
HStack {
    VStack(alignment: .leading) {
        Text("Title")
            .widgetAccentable()  // Accent group
        Text("Subtitle")
            // Primary group (default)
    }
    Image(systemName: "star.fill")
        .widgetAccentable()  // Accent group
}
```

### Image Rendering in Accented Mode

```swift
Image("myImage")
    .widgetAccentedRenderingMode(.monochrome)
```

### Container Background

```swift
VStack { /* content */ }
    .containerBackground(for: .widget) {
        Color.blue.opacity(0.2)
    }
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| GlassEffectContainer wrapping | Performance optimization, enables morphing between glass elements |
| `spacing` parameter | Controls merge distance Ã¢â‚¬â€ fine-tune how close elements must be to blend |
| `@Namespace` + `glassEffectID` | Enables smooth morphing transitions on view hierarchy changes |
| `interactive()` modifier | Explicit opt-in for touch/pointer reactions Ã¢â‚¬â€ not all glass should respond |
| UIGlassContainerEffect in UIKit | Same container pattern as SwiftUI for consistency |
| Accented rendering mode in widgets | System applies tinted glass when user selects tinted Home Screen |

## Best Practices

- **Always use GlassEffectContainer** when applying glass to multiple sibling views Ã¢â‚¬â€ it enables morphing and improves rendering performance
- **Apply `.glassEffect()` after** other appearance modifiers (frame, font, padding)
- **Use `.interactive()`** only on elements that respond to user interaction (buttons, toggleable items)
- **Choose spacing carefully** in containers to control when glass effects merge
- **Use `withAnimation`** when changing view hierarchies to enable smooth morphing transitions
- **Test across appearances** Ã¢â‚¬â€ light mode, dark mode, and accented/tinted modes
- **Ensure accessibility contrast** Ã¢â‚¬â€ text on glass must remain readable

## Anti-Patterns to Avoid

- Using multiple standalone `.glassEffect()` views without a GlassEffectContainer
- Nesting too many glass effects Ã¢â‚¬â€ degrades performance and visual clarity
- Applying glass to every view Ã¢â‚¬â€ reserve for interactive elements, toolbars, and cards
- Forgetting `clipsToBounds = true` in UIKit when using corner radii
- Ignoring accented rendering mode in widgets Ã¢â‚¬â€ breaks tinted Home Screen appearance
- Using opaque backgrounds behind glass Ã¢â‚¬â€ defeats the translucency effect

## When to Use

- Navigation bars, toolbars, and tab bars with the new iOS 26 design
- Floating action buttons and card-style containers
- Interactive controls that need visual depth and touch feedback
- Widgets that should integrate with the system's Liquid Glass appearance
- Morphing transitions between related UI states
