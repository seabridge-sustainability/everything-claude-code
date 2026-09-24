---
name: regex-vs-llm-structured-text
description: Ã©â‚¬â€°Ã¦â€¹Â©Ã¥Å“Â¨Ã¨Â§Â£Ã¦Å¾ÂÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€“â€¡Ã¦Å“Â¬Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¨Â¿ËœÃ¦ËœÂ¯Ã¥Â¤Â§Ã¥Å¾â€¹Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¦Â¨Â¡Ã¥Å¾â€¹Ã§Å¡â€žÃ¥â€ Â³Ã§Â­â€“Ã¦Â¡â€ Ã¦Å¾Â¶Ã¢â‚¬â€Ã¢â‚¬â€Ã¤Â»Å½Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¥Â¼â‚¬Ã¥Â§â€¹Ã¯Â¼Å’Ã¤Â»â€¦Ã¥Å“Â¨Ã¤Â½Å½Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã§Å¡â€žÃ¨Â¾Â¹Ã§Â¼ËœÃ¦Æ’â€¦Ã¥â€ ÂµÃ¤Â¸â€¹Ã¦Â·Â»Ã¥Å Â Ã¥Â¤Â§Ã¥Å¾â€¹Ã¨Â¯Â­Ã¨Â¨â‚¬Ã¦Â¨Â¡Ã¥Å¾â€¹Ã£â‚¬â€š
origin: ECC
---

# Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼Â vs LLM Ã§â€Â¨Ã¤ÂºÅ½Ã§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€“â€¡Ã¦Å“Â¬Ã¨Â§Â£Ã¦Å¾Â

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


Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ§â€Â¨Ã¤ÂºÅ½Ã¨Â§Â£Ã¦Å¾ÂÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€“â€¡Ã¦Å“Â¬Ã¯Â¼Ë†Ã¦Âµâ€¹Ã©ÂªÅ’Ã£â‚¬ÂÃ¨Â¡Â¨Ã¥Ââ€¢Ã£â‚¬ÂÃ¥Ââ€˜Ã§Â¥Â¨Ã£â‚¬ÂÃ¦â€“â€¡Ã¦Â¡Â£Ã¯Â¼â€°Ã§Å¡â€žÃ¥Â®Å¾Ã§â€Â¨Ã¥â€ Â³Ã§Â­â€“Ã¦Â¡â€ Ã¦Å¾Â¶Ã£â‚¬â€šÃ¦Â Â¸Ã¥Â¿Æ’Ã¨Â§ÂÃ¨Â§Â£Ã¦ËœÂ¯Ã¯Â¼Å¡Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¨Æ’Â½Ã¤Â»Â¥Ã¤Â½Å½Ã¦Ë†ÂÃ¦Å“Â¬Ã£â‚¬ÂÃ§Â¡Â®Ã¥Â®Å¡Ã¦â‚¬Â§Ã§Å¡â€žÃ¦â€“Â¹Ã¥Â¼ÂÃ¥Â¤â€žÃ§Ââ€  95-98% Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ£â‚¬â€šÃ¥Â°â€ Ã¦Ëœâ€šÃ¨Â´ÂµÃ§Å¡â€ž LLM Ã¨Â°Æ’Ã§â€Â¨Ã§â€¢â„¢Ã§Â»â„¢Ã¥â€°Â©Ã¤Â½â„¢Ã§Å¡â€žÃ¨Â¾Â¹Ã§Â¼ËœÃ¦Æ’â€¦Ã¥â€ ÂµÃ£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨

* Ã¨Â§Â£Ã¦Å¾ÂÃ¥â€¦Â·Ã¦Å“â€°Ã©â€¡ÂÃ¥Â¤ÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ§Å¡â€žÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€“â€¡Ã¦Å“Â¬Ã¯Â¼Ë†Ã©â€”Â®Ã©Â¢ËœÃ£â‚¬ÂÃ¨Â¡Â¨Ã¥Ââ€¢Ã£â‚¬ÂÃ¨Â¡Â¨Ã¦Â Â¼Ã¯Â¼â€°
* Ã¥â€ Â³Ã¥Â®Å¡Ã¥Å“Â¨Ã¦â€“â€¡Ã¦Å“Â¬Ã¦ÂÂÃ¥Ââ€“Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¨Â¿ËœÃ¦ËœÂ¯ LLM
* Ã¦Å¾â€žÃ¥Â»ÂºÃ§Â»â€œÃ¥ÂË†Ã¤Â¸Â¤Ã§Â§ÂÃ¦â€“Â¹Ã¦Â³â€¢Ã§Å¡â€žÃ¦Â·Â·Ã¥ÂË†Ã§Â®Â¡Ã©Ââ€œ
* Ã¥Å“Â¨Ã¦â€“â€¡Ã¦Å“Â¬Ã¥Â¤â€žÃ§Ââ€ Ã¤Â¸Â­Ã¤Â¼ËœÃ¥Å’â€“Ã¦Ë†ÂÃ¦Å“Â¬/Ã¥â€¡â€ Ã§Â¡Â®Ã¦â‚¬Â§Ã¦ÂÆ’Ã¨Â¡Â¡

## Ã¥â€ Â³Ã§Â­â€“Ã¦Â¡â€ Ã¦Å¾Â¶

```
Ã¦â€“â€¡Ã¦Å“Â¬Ã¦Â Â¼Ã¥Â¼ÂÃ¦ËœÂ¯Ã¥ÂÂ¦Ã¤Â¸â‚¬Ã¨â€¡Â´Ã¤Â¸â€Ã©â€¡ÂÃ¥Â¤ÂÃ¯Â¼Å¸
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Ã¦ËœÂ¯ (>90% Ã©ÂÂµÃ¥Â¾ÂªÃ¦Å¸ÂÃ§Â§ÂÃ¦Â¨Â¡Ã¥Â¼Â) Ã¢â€ â€™ Ã¤Â»Å½Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¥Â¼â‚¬Ã¥Â§â€¹
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¥Â¤â€žÃ§Ââ€  95%+ Ã¢â€ â€™ Ã¥Â®Å’Ã¦Ë†ÂÃ¯Â¼Å’Ã¦â€”Â Ã©Å“â‚¬ LLM
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¥Â¤â€žÃ§Ââ€  <95% Ã¢â€ â€™ Ã¤Â»â€¦Ã¤Â¸ÂºÃ¨Â¾Â¹Ã§Â¼ËœÃ¦Æ’â€¦Ã¥â€ ÂµÃ¦Â·Â»Ã¥Å Â  LLM
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ Ã¥ÂÂ¦ (Ã¨â€¡ÂªÃ§â€Â±Ã¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Å’Ã©Â«ËœÃ¥ÂºÂ¦Ã¥ÂÂ¯Ã¥ÂËœ) Ã¢â€ â€™ Ã§â€ºÂ´Ã¦Å½Â¥Ã¤Â½Â¿Ã§â€Â¨ LLM
```

## Ã¦Å¾Â¶Ã¦Å¾â€žÃ¦Â¨Â¡Ã¥Â¼Â

```
[Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¨Â§Â£Ã¦Å¾ÂÃ¥â„¢Â¨] Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Ã¦ÂÂÃ¥Ââ€“Ã§Â»â€œÃ¦Å¾â€žÃ¯Â¼Ë†95-98% Ã¥â€¡â€ Ã§Â¡Â®Ã§Å½â€¡Ã¯Â¼â€°
    Ã¢â€â€š
    Ã¢â€“Â¼
[Ã¦â€“â€¡Ã¦Å“Â¬Ã¦Â¸â€¦Ã§Ââ€ Ã¥â„¢Â¨] Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Ã¥Å½Â»Ã©â„¢Â¤Ã¥â„¢ÂªÃ¥Â£Â°Ã¯Â¼Ë†Ã¦Â â€¡Ã¨Â®Â°Ã£â‚¬ÂÃ©Â¡ÂµÃ§Â ÂÃ£â‚¬ÂÃ¤Â¼ÂªÃ¥Â½Â±Ã¯Â¼â€°
    Ã¢â€â€š
    Ã¢â€“Â¼
[Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¨Â¯â€žÃ¥Ë†â€ Ã¥â„¢Â¨] Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Ã¦Â â€¡Ã¨Â®Â°Ã¤Â½Å½Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¦ÂÂÃ¥Ââ€“Ã©Â¡Â¹
    Ã¢â€â€š
    Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Ã©Â«ËœÃ§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¯Â¼Ë†Ã¢â€°Â¥0.95Ã¯Â¼â€°Ã¢â€ â€™ Ã§â€ºÂ´Ã¦Å½Â¥Ã¨Â¾â€œÃ¥â€¡Âº
    Ã¢â€â€š
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ Ã¤Â½Å½Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¯Â¼Ë†<0.95Ã¯Â¼â€°Ã¢â€ â€™ [LLM Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â„¢Â¨] Ã¢â€ â€™ Ã¨Â¾â€œÃ¥â€¡Âº
```

## Ã¥Â®Å¾Ã§Å½Â°

### 1. Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¨Â§Â£Ã¦Å¾ÂÃ¥â„¢Â¨Ã¯Â¼Ë†Ã¥Â¤â€žÃ§Ââ€ Ã¥Â¤Â§Ã¥Â¤Å¡Ã¦â€¢Â°Ã¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼â€°

```python
import re
from dataclasses import dataclass

@dataclass(frozen=True)
class ParsedItem:
    id: str
    text: str
    choices: tuple[str, ...]
    answer: str
    confidence: float = 1.0

def parse_structured_text(content: str) -> list[ParsedItem]:
    """Parse structured text using regex patterns."""
    pattern = re.compile(
        r"(?P<id>\d+)\.\s*(?P<text>.+?)\n"
        r"(?P<choices>(?:[A-D]\..+?\n)+)"
        r"Answer:\s*(?P<answer>[A-D])",
        re.MULTILINE | re.DOTALL,
    )
    items = []
    for match in pattern.finditer(content):
        choices = tuple(
            c.strip() for c in re.findall(r"[A-D]\.\s*(.+)", match.group("choices"))
        )
        items.append(ParsedItem(
            id=match.group("id"),
            text=match.group("text").strip(),
            choices=choices,
            answer=match.group("answer"),
        ))
    return items
```

### 2. Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¨Â¯â€žÃ¥Ë†â€ 

Ã¦Â â€¡Ã¨Â®Â°Ã¥ÂÂ¯Ã¨Æ’Â½Ã©Å“â‚¬Ã¨Â¦Â LLM Ã¥Â®Â¡Ã¦Â Â¸Ã§Å¡â€žÃ©Â¡Â¹Ã¯Â¼Å¡

```python
@dataclass(frozen=True)
class ConfidenceFlag:
    item_id: str
    score: float
    reasons: tuple[str, ...]

def score_confidence(item: ParsedItem) -> ConfidenceFlag:
    """Score extraction confidence and flag issues."""
    reasons = []
    score = 1.0

    if len(item.choices) < 3:
        reasons.append("few_choices")
        score -= 0.3

    if not item.answer:
        reasons.append("missing_answer")
        score -= 0.5

    if len(item.text) < 10:
        reasons.append("short_text")
        score -= 0.2

    return ConfidenceFlag(
        item_id=item.id,
        score=max(0.0, score),
        reasons=tuple(reasons),
    )

def identify_low_confidence(
    items: list[ParsedItem],
    threshold: float = 0.95,
) -> list[ConfidenceFlag]:
    """Return items below confidence threshold."""
    flags = [score_confidence(item) for item in items]
    return [f for f in flags if f.score < threshold]
```

### 3. LLM Ã©ÂªÅ’Ã¨Â¯ÂÃ¥â„¢Â¨Ã¯Â¼Ë†Ã¤Â»â€¦Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â¾Â¹Ã§Â¼ËœÃ¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼â€°

```python
def validate_with_llm(
    item: ParsedItem,
    original_text: str,
    client,
) -> ParsedItem:
    """Use LLM to fix low-confidence extractions."""
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # Cheapest model for validation
        max_tokens=500,
        messages=[{
            "role": "user",
            "content": (
                f"Extract the question, choices, and answer from this text.\n\n"
                f"Text: {original_text}\n\n"
                f"Current extraction: {item}\n\n"
                f"Return corrected JSON if needed, or 'CORRECT' if accurate."
            ),
        }],
    )
    # Parse LLM response and return corrected item...
    return corrected_item
```

### 4. Ã¦Â·Â·Ã¥ÂË†Ã§Â®Â¡Ã©Ââ€œ

```python
def process_document(
    content: str,
    *,
    llm_client=None,
    confidence_threshold: float = 0.95,
) -> list[ParsedItem]:
    """Full pipeline: regex -> confidence check -> LLM for edge cases."""
    # Step 1: Regex extraction (handles 95-98%)
    items = parse_structured_text(content)

    # Step 2: Confidence scoring
    low_confidence = identify_low_confidence(items, confidence_threshold)

    if not low_confidence or llm_client is None:
        return items

    # Step 3: LLM validation (only for flagged items)
    low_conf_ids = {f.item_id for f in low_confidence}
    result = []
    for item in items:
        if item.id in low_conf_ids:
            result.append(validate_with_llm(item, content, llm_client))
        else:
            result.append(item)

    return result
```

## Ã¥Â®Å¾Ã©â„¢â€¦Ã¦Å’â€¡Ã¦Â â€¡

Ã¦ÂÂ¥Ã¨â€¡ÂªÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ§â€Å¸Ã¤ÂºÂ§Ã¤Â¸Â­Ã§Å¡â€žÃ¦Âµâ€¹Ã©ÂªÅ’Ã¨Â§Â£Ã¦Å¾ÂÃ§Â®Â¡Ã©Ââ€œÃ¯Â¼Ë†410 Ã¤Â¸ÂªÃ©Â¡Â¹Ã§â€ºÂ®Ã¯Â¼â€°Ã¯Â¼Å¡

| Ã¦Å’â€¡Ã¦Â â€¡ | Ã¥â‚¬Â¼ |
|--------|-------|
| Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¦Ë†ÂÃ¥Å Å¸Ã§Å½â€¡ | 98.0% |
| Ã¤Â½Å½Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã©Â¡Â¹Ã§â€ºÂ® | 8 (2.0%) |
| Ã¦â€°â‚¬Ã©Å“â‚¬ LLM Ã¨Â°Æ’Ã§â€Â¨Ã¦Â¬Â¡Ã¦â€¢Â° | ~5 |
| Ã§â€ºÂ¸Ã¦Â¯â€Ã¥â€¦Â¨ LLM Ã§Å¡â€žÃ¦Ë†ÂÃ¦Å“Â¬Ã¨Å â€šÃ§Å“Â | ~95% |
| Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¦â€ Ã§â€ºâ€“Ã§Å½â€¡ | 93% |

## Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ

* **Ã¤Â»Å½Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¥Â¼â‚¬Ã¥Â§â€¹** Ã¢â‚¬â€ Ã¥ÂÂ³Ã¤Â½Â¿Ã¤Â¸ÂÃ¥Â®Å’Ã§Â¾Å½Ã§Å¡â€žÃ¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¤Â¹Å¸Ã¨Æ’Â½Ã¦ÂÂÃ¤Â¾â€ºÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦â€Â¹Ã¨Â¿â€ºÃ§Å¡â€žÃ¥Å¸ÂºÃ§ÂºÂ¿
* **Ã¤Â½Â¿Ã§â€Â¨Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¨Â¯â€žÃ¥Ë†â€ ** Ã¦ÂÂ¥Ã¤Â»Â¥Ã§Â¼â€“Ã§Â¨â€¹Ã¦â€“Â¹Ã¥Â¼ÂÃ¨Â¯â€ Ã¥Ë†Â«Ã©Å“â‚¬Ã¨Â¦Â LLM Ã¥Â¸Â®Ã¥Å Â©Ã§Å¡â€žÃ¥â€ â€¦Ã¥Â®Â¹
* **Ã¤Â½Â¿Ã§â€Â¨Ã¦Å“â‚¬Ã¤Â¾Â¿Ã¥Â®Å“Ã§Å¡â€ž LLM** Ã¨Â¿â€ºÃ¨Â¡Å’Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Ë†Haiku Ã§Â±Â»Ã¦Â¨Â¡Ã¥Å¾â€¹Ã¥Â·Â²Ã¨Â¶Â³Ã¥Â¤Å¸Ã¯Â¼â€°
* **Ã¥Ë†â€¡Ã¥â€¹Â¿Ã¤Â¿Â®Ã¦â€Â¹** Ã¥Â·Â²Ã¨Â§Â£Ã¦Å¾ÂÃ§Å¡â€žÃ©Â¡Â¹ Ã¢â‚¬â€ Ã¤Â»Å½Ã¦Â¸â€¦Ã§Ââ€ /Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â­Â¥Ã©ÂªÂ¤Ã¨Â¿â€Ã¥â€ºÅ¾Ã¦â€“Â°Ã¥Â®Å¾Ã¤Â¾â€¹
* **TDD Ã¦â€¢Ë†Ã¦Å¾Å“Ã¥Â¾Ë†Ã¥Â¥Â½** Ã§â€Â¨Ã¤ÂºÅ½Ã¨Â§Â£Ã¦Å¾ÂÃ¥â„¢Â¨ Ã¢â‚¬â€ Ã©Â¦â€“Ã¥â€¦Ë†Ã¤Â¸ÂºÃ¥Â·Â²Ã§Å¸Â¥Ã¦Â¨Â¡Ã¥Â¼ÂÃ§Â¼â€“Ã¥â€ â„¢Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¯Â¼Å’Ã§â€žÂ¶Ã¥ÂÅ½Ã¦ËœÂ¯Ã¨Â¾Â¹Ã§Â¼ËœÃ¦Æ’â€¦Ã¥â€ Âµ
* **Ã¨Â®Â°Ã¥Â½â€¢Ã¦Å’â€¡Ã¦Â â€¡**Ã¯Â¼Ë†Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¦Ë†ÂÃ¥Å Å¸Ã§Å½â€¡Ã£â‚¬ÂLLM Ã¨Â°Æ’Ã§â€Â¨Ã¦Â¬Â¡Ã¦â€¢Â°Ã¯Â¼â€°Ã¤Â»Â¥Ã¨Â·Å¸Ã¨Â¸ÂªÃ§Â®Â¡Ã©Ââ€œÃ¥ÂÂ¥Ã¥ÂºÂ·Ã§Å Â¶Ã¥â€ Âµ

## Ã¥Âºâ€Ã©ÂÂ¿Ã¥â€¦ÂÃ§Å¡â€žÃ¥ÂÂÃ¦Â¨Â¡Ã¥Â¼Â

* Ã¥Â½â€œÃ¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¨Æ’Â½Ã¥Â¤â€žÃ§Ââ€  95% Ã¤Â»Â¥Ã¤Â¸Å Ã§Å¡â€žÃ¦Æ’â€¦Ã¥â€ ÂµÃ¦â€”Â¶Ã¯Â¼Å’Ã¥Â°â€ Ã¦â€°â‚¬Ã¦Å“â€°Ã¦â€“â€¡Ã¦Å“Â¬Ã¥Ââ€˜Ã©â‚¬ÂÃ§Â»â„¢ LLMÃ¯Â¼Ë†Ã¦Ëœâ€šÃ¨Â´ÂµÃ¤Â¸â€Ã§Â¼â€œÃ¦â€¦Â¢Ã¯Â¼â€°
* Ã¥Â¯Â¹Ã¨â€¡ÂªÃ§â€Â±Ã¦Â Â¼Ã¥Â¼ÂÃ£â‚¬ÂÃ©Â«ËœÃ¥ÂºÂ¦Ã¥ÂÂ¯Ã¥ÂËœÃ§Å¡â€žÃ¦â€“â€¡Ã¦Å“Â¬Ã¤Â½Â¿Ã§â€Â¨Ã¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¯Â¼Ë†LLM Ã¥Å“Â¨Ã¦Â­Â¤Ã¥Â¤â€žÃ¦â€ºÂ´Ã¥ÂË†Ã©â‚¬â€šÃ¯Â¼â€°
* Ã¨Â·Â³Ã¨Â¿â€¡Ã§Â½Â®Ã¤Â¿Â¡Ã¥ÂºÂ¦Ã¨Â¯â€žÃ¥Ë†â€ Ã¯Â¼Å’Ã¥Â¸Å’Ã¦Å“â€ºÃ¦Â­Â£Ã¥Ë†â„¢Ã¨Â¡Â¨Ã¨Â¾Â¾Ã¥Â¼ÂÃ¢â‚¬Å“Ã¨Æ’Â½Ã¦Â­Â£Ã¥Â¸Â¸Ã¥Â·Â¥Ã¤Â½Å“Ã¢â‚¬Â
* Ã¥Å“Â¨Ã¦Â¸â€¦Ã§Ââ€ /Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â­Â¥Ã©ÂªÂ¤Ã¤Â¸Â­Ã¤Â¿Â®Ã¦â€Â¹Ã¥Â·Â²Ã¨Â§Â£Ã¦Å¾ÂÃ§Å¡â€žÃ¥Â¯Â¹Ã¨Â±Â¡
* Ã¤Â¸ÂÃ¦Âµâ€¹Ã¨Â¯â€¢Ã¨Â¾Â¹Ã§Â¼ËœÃ¦Æ’â€¦Ã¥â€ ÂµÃ¯Â¼Ë†Ã¦Â Â¼Ã¥Â¼ÂÃ©â€â„¢Ã¨Â¯Â¯Ã§Å¡â€žÃ¨Â¾â€œÃ¥â€¦Â¥Ã£â‚¬ÂÃ§Â¼ÂºÃ¥Â¤Â±Ã¥Â­â€”Ã¦Â®ÂµÃ£â‚¬ÂÃ§Â¼â€“Ã§Â ÂÃ©â€”Â®Ã©Â¢ËœÃ¯Â¼â€°

## Ã©â‚¬â€šÃ§â€Â¨Ã¥Å“ÂºÃ¦â„¢Â¯

* Ã¦Âµâ€¹Ã©ÂªÅ’/Ã¨â‚¬Æ’Ã¨Â¯â€¢Ã©Â¢ËœÃ§â€ºÂ®Ã¨Â§Â£Ã¦Å¾Â
* Ã¨Â¡Â¨Ã¥Ââ€¢Ã¦â€¢Â°Ã¦ÂÂ®Ã¦ÂÂÃ¥Ââ€“
* Ã¥Ââ€˜Ã§Â¥Â¨/Ã¦â€Â¶Ã¦ÂÂ®Ã¥Â¤â€žÃ§Ââ€ 
* Ã¦â€“â€¡Ã¦Â¡Â£Ã§Â»â€œÃ¦Å¾â€žÃ¨Â§Â£Ã¦Å¾ÂÃ¯Â¼Ë†Ã¦Â â€¡Ã©Â¢ËœÃ£â‚¬ÂÃ§Â«Â Ã¨Å â€šÃ£â‚¬ÂÃ¨Â¡Â¨Ã¦Â Â¼Ã¯Â¼â€°
* Ã¤Â»Â»Ã¤Â½â€¢Ã¥â€¦Â·Ã¦Å“â€°Ã©â€¡ÂÃ¥Â¤ÂÃ¦Â¨Â¡Ã¥Â¼ÂÃ¤Â¸â€Ã¦Ë†ÂÃ¦Å“Â¬Ã©â€¡ÂÃ¨Â¦ÂÃ§Å¡â€žÃ§Â»â€œÃ¦Å¾â€žÃ¥Å’â€“Ã¦â€“â€¡Ã¦Å“Â¬
