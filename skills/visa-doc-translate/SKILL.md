---
name: visa-doc-translate
description: Translate visa application documents (images) to English and create a bilingual PDF with original and translation. Use when visa application document images must be translated to English as a bilingual PDF.
---

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->

You are helping translate visa application documents for visa applications.

## Instructions

When the user provides an image file path, AUTOMATICALLY execute the following steps WITHOUT asking for confirmation:

1. **Image Conversion**: If the file is HEIC, convert it to PNG using `sips -s format png <input> --out <output>`

2. **Image Rotation**:
   - Check EXIF orientation data
   - Automatically rotate the image based on EXIF data
   - If EXIF orientation is 6, rotate 90 degrees counterclockwise
   - Apply additional rotation as needed (test 180 degrees if document appears upside down)

3. **OCR Text Extraction**:
   - Try multiple OCR methods automatically:
     - macOS Vision framework (preferred for macOS)
     - EasyOCR (cross-platform, no tesseract required)
     - Tesseract OCR (if available)
   - Extract all text information from the document
   - Identify document type (deposit certificate, employment certificate, retirement certificate, etc.)

4. **Translation**:
   - Translate all text content to English professionally
   - Maintain the original document structure and format
   - Use professional terminology appropriate for visa applications
   - Keep proper names in original language with English in parentheses
   - For Chinese names, use pinyin format (e.g., WU Zhengye)
   - Preserve all numbers, dates, and amounts accurately

5. **PDF Generation**:
   - Create a Python script using PIL and reportlab libraries
   - Page 1: Display the rotated original image, centered and scaled to fit A4 page
   - Page 2: Display the English translation with proper formatting:
     - Title centered and bold
     - Content left-aligned with appropriate spacing
     - Professional layout suitable for official documents
   - Add a note at the bottom: "This is a certified English translation of the original document"
   - Execute the script to generate the PDF

6. **Output**: Create a PDF file named `<original_filename>_Translated.pdf` in the same directory

## Supported Documents

- Bank deposit certificates (Ã¥Â­ËœÃ¦Â¬Â¾Ã¨Â¯ÂÃ¦ËœÅ½)
- Income certificates (Ã¦â€Â¶Ã¥â€¦Â¥Ã¨Â¯ÂÃ¦ËœÅ½)
- Employment certificates (Ã¥Å“Â¨Ã¨ÂÅ’Ã¨Â¯ÂÃ¦ËœÅ½)
- Retirement certificates (Ã©â‚¬â‚¬Ã¤Â¼â€˜Ã¨Â¯ÂÃ¦ËœÅ½)
- Property certificates (Ã¦Ë†Â¿Ã¤ÂºÂ§Ã¨Â¯ÂÃ¦ËœÅ½)
- Business licenses (Ã¨ÂÂ¥Ã¤Â¸Å¡Ã¦â€°Â§Ã§â€¦Â§)
- ID cards and passports
- Other official documents

## Technical Implementation

### OCR Methods (tried in order)

1. **macOS Vision Framework** (macOS only):
   ```python
   import Vision
   from Foundation import NSURL
   ```

2. **EasyOCR** (cross-platform):
   ```bash
   pip install easyocr
   ```

3. **Tesseract OCR** (if available):
   ```bash
   brew install tesseract tesseract-lang
   pip install pytesseract
   ```

### Required Python Libraries

```bash
pip install pillow reportlab
```

For macOS Vision framework:
```bash
pip install pyobjc-framework-Vision pyobjc-framework-Quartz
```

## Important Guidelines

- DO NOT ask for user confirmation at each step
- Automatically determine the best rotation angle
- Try multiple OCR methods if one fails
- Ensure all numbers, dates, and amounts are accurately translated
- Use clean, professional formatting
- Complete the entire process and report the final PDF location

## Example Usage

```bash
/visa-doc-translate RetirementCertificate.PNG
/visa-doc-translate BankStatement.HEIC
/visa-doc-translate EmploymentLetter.jpg
```

## Output Example

The skill will:
1. Extract text using available OCR method
2. Translate to professional English
3. Generate `<filename>_Translated.pdf` with:
   - Page 1: Original document image
   - Page 2: Professional English translation

Perfect for visa applications to Australia, USA, Canada, UK, and other countries requiring translated documents.
