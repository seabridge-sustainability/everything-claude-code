# Visa Document Translator

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


Automatically translate visa application documents from images to professional English PDFs.

## Features

- **Automatic OCR**: Tries multiple OCR methods (macOS Vision, EasyOCR, Tesseract)
- **Bilingual PDF**: Original image + professional English translation
- **Multi-language**: Supports Chinese, and other languages
- **Professional Format**: Suitable for official visa applications
- **Fully Automated**: No manual intervention required

## Supported Documents

- Bank deposit certificates (Ã¥Â­ËœÃ¦Â¬Â¾Ã¨Â¯ÂÃ¦ËœÅ½)
- Employment certificates (Ã¥Å“Â¨Ã¨ÂÅ’Ã¨Â¯ÂÃ¦ËœÅ½)
- Retirement certificates (Ã©â‚¬â‚¬Ã¤Â¼â€˜Ã¨Â¯ÂÃ¦ËœÅ½)
- Income certificates (Ã¦â€Â¶Ã¥â€¦Â¥Ã¨Â¯ÂÃ¦ËœÅ½)
- Property certificates (Ã¦Ë†Â¿Ã¤ÂºÂ§Ã¨Â¯ÂÃ¦ËœÅ½)
- Business licenses (Ã¨ÂÂ¥Ã¤Â¸Å¡Ã¦â€°Â§Ã§â€¦Â§)
- ID cards and passports

## Usage

```bash
/visa-doc-translate <image-file>
```

### Examples

```bash
/visa-doc-translate RetirementCertificate.PNG
/visa-doc-translate BankStatement.HEIC
/visa-doc-translate EmploymentLetter.jpg
```

## Output

Creates `<filename>_Translated.pdf` with:
- **Page 1**: Original document image (centered, A4 size)
- **Page 2**: Professional English translation

## Requirements

### Python Libraries
```bash
pip install pillow reportlab
```

### OCR (one of the following)

**macOS (recommended)**:
```bash
pip install pyobjc-framework-Vision pyobjc-framework-Quartz
```

**Cross-platform**:
```bash
pip install easyocr
```

**Tesseract**:
```bash
brew install tesseract tesseract-lang
pip install pytesseract
```

## How It Works

1. Converts HEIC to PNG if needed
2. Checks and applies EXIF rotation
3. Extracts text using available OCR method
4. Translates to professional English
5. Generates bilingual PDF

## Perfect For

- Australia visa applications
- USA visa applications
- Canada visa applications
- UK visa applications
- EU visa applications

## License

MIT
