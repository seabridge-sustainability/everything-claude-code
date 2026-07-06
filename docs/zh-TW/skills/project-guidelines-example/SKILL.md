# Ã¥Â°Ë†Ã¦Â¡Ë†Ã¦Å’â€¡Ã¥Ââ€”Ã¦Å â‚¬Ã¨Æ’Â½Ã¯Â¼Ë†Ã§Â¯â€žÃ¤Â¾â€¹Ã¯Â¼â€°

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


Ã©â‚¬â„¢Ã¦ËœÂ¯Ã¥Â°Ë†Ã¦Â¡Ë†Ã§â€°Â¹Ã¥Â®Å¡Ã¦Å â‚¬Ã¨Æ’Â½Ã§Å¡â€žÃ§Â¯â€žÃ¤Â¾â€¹Ã£â‚¬â€šÃ¤Â½Â¿Ã§â€Â¨Ã¦Â­Â¤Ã¤Â½Å“Ã§â€šÂºÃ¤Â½Â Ã¨â€¡ÂªÃ¥Â·Â±Ã¥Â°Ë†Ã¦Â¡Ë†Ã§Å¡â€žÃ§Â¯â€žÃ¦Å“Â¬Ã£â‚¬â€š

Ã¥Å¸ÂºÃ¦â€“Â¼Ã§Å“Å¸Ã¥Â¯Â¦Ã§â€Å¸Ã§â€Â¢Ã¦â€¡â€°Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ¯Â¼Å¡[Zenith](https://zenith.chat) - AI Ã©Â©â€¦Ã¥â€¹â€¢Ã§Å¡â€žÃ¥Â®Â¢Ã¦Ë†Â¶Ã¦Å½Â¢Ã§Â´Â¢Ã¥Â¹Â³Ã¥ÂÂ°Ã£â‚¬â€š

---

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¤Â½Â¿Ã§â€Â¨

Ã¥Å“Â¨Ã¨â„¢â€¢Ã§Ââ€ Ã¥Â°Ë†Ã¦Â¡Ë†Ã§â€°Â¹Ã¥Â®Å¡Ã¨Â¨Â­Ã¨Â¨Ë†Ã¦â„¢â€šÃ¥ÂÆ’Ã¨â‚¬Æ’Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬â€šÃ¥Â°Ë†Ã¦Â¡Ë†Ã¦Å â‚¬Ã¨Æ’Â½Ã¥Å’â€¦Ã¥ÂÂ«Ã¯Â¼Å¡
- Ã¦Å¾Â¶Ã¦Â§â€¹Ã¦Â¦â€šÃ¨Â¦Â½
- Ã¦Âªâ€Ã¦Â¡Ë†Ã§ÂµÂÃ¦Â§â€¹
- Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦Â¨Â¡Ã¥Â¼Â
- Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦ÂÃ¦Â±â€š
- Ã©Æ’Â¨Ã§Â½Â²Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

---

## Ã¦Å¾Â¶Ã¦Â§â€¹Ã¦Â¦â€šÃ¨Â¦Â½

**Ã¦Å â‚¬Ã¨Â¡â€œÃ¥Â â€ Ã§â€“Å Ã¯Â¼Å¡**
- **Ã¥â€°ÂÃ§Â«Â¯**Ã¯Â¼Å¡Next.js 15Ã¯Â¼Ë†App RouterÃ¯Â¼â€°Ã£â‚¬ÂTypeScriptÃ£â‚¬ÂReact
- **Ã¥Â¾Å’Ã§Â«Â¯**Ã¯Â¼Å¡FastAPIÃ¯Â¼Ë†PythonÃ¯Â¼â€°Ã£â‚¬ÂPydantic Ã¦Â¨Â¡Ã¥Å¾â€¹
- **Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«**Ã¯Â¼Å¡SupabaseÃ¯Â¼Ë†PostgreSQLÃ¯Â¼â€°
- **AI**Ã¯Â¼Å¡Claude API Ã¥Â¸Â¶Ã¥Â·Â¥Ã¥â€¦Â·Ã¥â€˜Â¼Ã¥ÂÂ«Ã¥â€™Å’Ã§ÂµÂÃ¦Â§â€¹Ã¥Å’â€“Ã¨Â¼Â¸Ã¥â€¡Âº
- **Ã©Æ’Â¨Ã§Â½Â²**Ã¯Â¼Å¡Google Cloud Run
- **Ã¦Â¸Â¬Ã¨Â©Â¦**Ã¯Â¼Å¡PlaywrightÃ¯Â¼Ë†E2EÃ¯Â¼â€°Ã£â‚¬ÂpytestÃ¯Â¼Ë†Ã¥Â¾Å’Ã§Â«Â¯Ã¯Â¼â€°Ã£â‚¬ÂReact Testing Library

**Ã¦Å“ÂÃ¥â€¹â„¢Ã¯Â¼Å¡**
```
Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
Ã¢â€â€š                         Ã¥â€°ÂÃ§Â«Â¯                                 Ã¢â€â€š
Ã¢â€â€š  Next.js 15 + TypeScript + TailwindCSS                     Ã¢â€â€š
Ã¢â€â€š  Ã©Æ’Â¨Ã§Â½Â²Ã¯Â¼Å¡Vercel / Cloud Run                                   Ã¢â€â€š
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ
                              Ã¢â€â€š
                              Ã¢â€“Â¼
Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
Ã¢â€â€š                         Ã¥Â¾Å’Ã§Â«Â¯                                 Ã¢â€â€š
Ã¢â€â€š  FastAPI + Python 3.11 + Pydantic                          Ã¢â€â€š
Ã¢â€â€š  Ã©Æ’Â¨Ã§Â½Â²Ã¯Â¼Å¡Cloud Run                                            Ã¢â€â€š
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ
                              Ã¢â€â€š
              Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¼Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
              Ã¢â€“Â¼               Ã¢â€“Â¼               Ã¢â€“Â¼
        Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â   Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â   Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
        Ã¢â€â€š Supabase Ã¢â€â€š   Ã¢â€â€š  Claude  Ã¢â€â€š   Ã¢â€â€š  Redis   Ã¢â€â€š
        Ã¢â€â€š Database Ã¢â€â€š   Ã¢â€â€š   API    Ã¢â€â€š   Ã¢â€â€š  Cache   Ã¢â€â€š
        Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ
```

---

## Ã¦Âªâ€Ã¦Â¡Ë†Ã§ÂµÂÃ¦Â§â€¹

```
project/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ frontend/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ src/
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ app/              # Next.js app router Ã©Â ÂÃ©ÂÂ¢
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api/          # API Ã¨Â·Â¯Ã§â€Â±
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ (auth)/       # Ã©Å“â‚¬Ã¨ÂªÂÃ¨Â­â€°Ã¨Â·Â¯Ã§â€Â±
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ workspace/    # Ã¤Â¸Â»Ã¦â€¡â€°Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ¥Â·Â¥Ã¤Â½Å“Ã¥Ââ‚¬
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/       # React Ã¥â€¦Æ’Ã¤Â»Â¶
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ui/           # Ã¥Å¸ÂºÃ§Â¤Å½ UI Ã¥â€¦Æ’Ã¤Â»Â¶
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ forms/        # Ã¨Â¡Â¨Ã¥â€“Â®Ã¥â€¦Æ’Ã¤Â»Â¶
Ã¢â€â€š       Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ layouts/      # Ã§â€°Ë†Ã©ÂÂ¢Ã©â€¦ÂÃ§Â½Â®Ã¥â€¦Æ’Ã¤Â»Â¶
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ hooks/            # Ã¨â€¡ÂªÃ¨Â¨â€š React hooks
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ lib/              # Ã¥Â·Â¥Ã¥â€¦Â·
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ types/            # TypeScript Ã¥Â®Å¡Ã§Â¾Â©
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ config/           # Ã¨Â¨Â­Ã¥Â®Å¡
Ã¢â€â€š
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ backend/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ routers/              # FastAPI Ã¨Â·Â¯Ã§â€Â±Ã¨â„¢â€¢Ã§Ââ€ Ã¥â„¢Â¨
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ models.py             # Pydantic Ã¦Â¨Â¡Ã¥Å¾â€¹
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ main.py               # FastAPI app Ã©â‚¬Â²Ã¥â€¦Â¥Ã©Â»Å¾
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ auth_system.py        # Ã¨ÂªÂÃ¨Â­â€°
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ database.py           # Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦â€œÂÃ¤Â½Å“
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ services/             # Ã¦Â¥Â­Ã¥â€¹â„¢Ã©â€šÂÃ¨Â¼Â¯
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ tests/                # pytest Ã¦Â¸Â¬Ã¨Â©Â¦
Ã¢â€â€š
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ deploy/                   # Ã©Æ’Â¨Ã§Â½Â²Ã¨Â¨Â­Ã¥Â®Å¡
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ docs/                     # Ã¦â€“â€¡Ã¤Â»Â¶
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ scripts/                  # Ã¥Â·Â¥Ã¥â€¦Â·Ã¨â€¦Â³Ã¦Å“Â¬
```

---

## Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦Â¨Â¡Ã¥Â¼Â

### API Ã¥â€ºÅ¾Ã¦â€¡â€°Ã¦Â Â¼Ã¥Â¼ÂÃ¯Â¼Ë†FastAPIÃ¯Â¼â€°

```python
from pydantic import BaseModel
from typing import Generic, TypeVar, Optional

T = TypeVar('T')

class ApiResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None

    @classmethod
    def ok(cls, data: T) -> "ApiResponse[T]":
        return cls(success=True, data=data)

    @classmethod
    def fail(cls, error: str) -> "ApiResponse[T]":
        return cls(success=False, error=error)
```

### Ã¥â€°ÂÃ§Â«Â¯ API Ã¥â€˜Â¼Ã¥ÂÂ«Ã¯Â¼Ë†TypeScriptÃ¯Â¼â€°

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` }
    }

    return await response.json()
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
```

### Claude AI Ã¦â€¢Â´Ã¥ÂË†Ã¯Â¼Ë†Ã§ÂµÂÃ¦Â§â€¹Ã¥Å’â€“Ã¨Â¼Â¸Ã¥â€¡ÂºÃ¯Â¼â€°

```python
from anthropic import Anthropic
from pydantic import BaseModel

class AnalysisResult(BaseModel):
    summary: str
    key_points: list[str]
    confidence: float

async def analyze_with_claude(content: str) -> AnalysisResult:
    client = Anthropic()

    response = client.messages.create(
        model="claude-sonnet-4-5-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": content}],
        tools=[{
            "name": "provide_analysis",
            "description": "Provide structured analysis",
            "input_schema": AnalysisResult.model_json_schema()
        }],
        tool_choice={"type": "tool", "name": "provide_analysis"}
    )

    # Ã¦ÂÂÃ¥Ââ€“Ã¥Â·Â¥Ã¥â€¦Â·Ã¤Â½Â¿Ã§â€Â¨Ã§ÂµÂÃ¦Å¾Å“
    tool_use = next(
        block for block in response.content
        if block.type == "tool_use"
    )

    return AnalysisResult(**tool_use.input)
```

### Ã¨â€¡ÂªÃ¨Â¨â€š HooksÃ¯Â¼Ë†ReactÃ¯Â¼â€°

```typescript
import { useState, useCallback } from 'react'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(
  fetchFn: () => Promise<ApiResponse<T>>
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    const result = await fetchFn()

    if (result.success) {
      setState({ data: result.data!, loading: false, error: null })
    } else {
      setState({ data: null, loading: false, error: result.error! })
    }
  }, [fetchFn])

  return { ...state, execute }
}
```

---

## Ã¦Â¸Â¬Ã¨Â©Â¦Ã¨Â¦ÂÃ¦Â±â€š

### Ã¥Â¾Å’Ã§Â«Â¯Ã¯Â¼Ë†pytestÃ¯Â¼â€°

```bash
# Ã¥Å¸Â·Ã¨Â¡Å’Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â¸Â¬Ã¨Â©Â¦
poetry run pytest tests/

# Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¸Â¶Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
poetry run pytest tests/ --cov=. --cov-report=html

# Ã¥Å¸Â·Ã¨Â¡Å’Ã§â€°Â¹Ã¥Â®Å¡Ã¦Â¸Â¬Ã¨Â©Â¦Ã¦Âªâ€Ã¦Â¡Ë†
poetry run pytest tests/test_auth.py -v
```

**Ã¦Â¸Â¬Ã¨Â©Â¦Ã§ÂµÂÃ¦Â§â€¹Ã¯Â¼Å¡**
```python
import pytest
from httpx import AsyncClient
from main import app

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
```

### Ã¥â€°ÂÃ§Â«Â¯Ã¯Â¼Ë†React Testing LibraryÃ¯Â¼â€°

```bash
# Ã¥Å¸Â·Ã¨Â¡Å’Ã¦Â¸Â¬Ã¨Â©Â¦
npm run test

# Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Â¸Â¶Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡Ã§Å¡â€žÃ¦Â¸Â¬Ã¨Â©Â¦
npm run test -- --coverage

# Ã¥Å¸Â·Ã¨Â¡Å’ E2E Ã¦Â¸Â¬Ã¨Â©Â¦
npm run test:e2e
```

**Ã¦Â¸Â¬Ã¨Â©Â¦Ã§ÂµÂÃ¦Â§â€¹Ã¯Â¼Å¡**
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { WorkspacePanel } from './WorkspacePanel'

describe('WorkspacePanel', () => {
  it('renders workspace correctly', () => {
    render(<WorkspacePanel />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('handles session creation', async () => {
    render(<WorkspacePanel />)
    fireEvent.click(screen.getByText('New Session'))
    expect(await screen.findByText('Session created')).toBeInTheDocument()
  })
})
```

---

## Ã©Æ’Â¨Ã§Â½Â²Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹

### Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ¦ÂªÂ¢Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥â€“Â®

- [ ] Ã¦Å“Â¬Ã¦Â©Å¸Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Â¸Â¬Ã¨Â©Â¦Ã©â‚¬Å¡Ã©ÂÅ½
- [ ] `npm run build` Ã¦Ë†ÂÃ¥Å Å¸Ã¯Â¼Ë†Ã¥â€°ÂÃ§Â«Â¯Ã¯Â¼â€°
- [ ] `poetry run pytest` Ã©â‚¬Å¡Ã©ÂÅ½Ã¯Â¼Ë†Ã¥Â¾Å’Ã§Â«Â¯Ã¯Â¼â€°
- [ ] Ã§â€žÂ¡Ã¥Â¯Â«Ã¦Â­Â»Ã¥Â¯â€ Ã©â€˜Â°
- [ ] Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸Ã¥Â·Â²Ã¨Â¨ËœÃ©Å’â€ž
- [ ] Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ« migrations Ã¦Âºâ€“Ã¥â€šâ„¢Ã¥Â°Â±Ã§Â·â€™

### Ã©Æ’Â¨Ã§Â½Â²Ã¦Å’â€¡Ã¤Â»Â¤

```bash
# Ã¥Â»ÂºÃ§Â½Â®Ã¥â€™Å’Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ§Â«Â¯
cd frontend && npm run build
gcloud run deploy frontend --source .

# Ã¥Â»ÂºÃ§Â½Â®Ã¥â€™Å’Ã©Æ’Â¨Ã§Â½Â²Ã¥Â¾Å’Ã§Â«Â¯
cd backend
gcloud run deploy backend --source .
```

### Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸

```bash
# Ã¥â€°ÂÃ§Â«Â¯Ã¯Â¼Ë†.env.localÃ¯Â¼â€°
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Ã¥Â¾Å’Ã§Â«Â¯Ã¯Â¼Ë†.envÃ¯Â¼â€°
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJ...
```

---

## Ã©â€”Å“Ã©ÂÂµÃ¨Â¦ÂÃ¥â€°â€¡

1. **Ã§â€žÂ¡Ã¨Â¡Â¨Ã¦Æ’â€¦Ã§Â¬Â¦Ã¨â„¢Å¸** Ã¥Å“Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã£â‚¬ÂÃ¨Â¨Â»Ã¨Â§Â£Ã¦Ë†â€“Ã¦â€“â€¡Ã¤Â»Â¶Ã¤Â¸Â­
2. **Ã¤Â¸ÂÃ¥ÂÂ¯Ã¨Â®Å Ã¦â‚¬Â§** - Ã¦Â°Â¸Ã©ÂÂ Ã¤Â¸ÂÃ¨Â¦ÂÃ§ÂªÂÃ¨Â®Å Ã§â€°Â©Ã¤Â»Â¶Ã¦Ë†â€“Ã©â„¢Â£Ã¥Ë†â€”
3. **TDD** - Ã¥Â¯Â¦Ã¤Â½Å“Ã¥â€°ÂÃ¥â€¦Ë†Ã¥Â¯Â«Ã¦Â¸Â¬Ã¨Â©Â¦
4. **80% Ã¨Â¦â€ Ã¨â€œâ€¹Ã§Å½â€¡** Ã¦Å“â‚¬Ã¤Â½Å½
5. **Ã¥Â¤Å¡Ã¥â‚¬â€¹Ã¥Â°ÂÃ¦Âªâ€Ã¦Â¡Ë†** - 200-400 Ã¨Â¡Å’Ã¥â€¦Â¸Ã¥Å¾â€¹Ã¯Â¼Å’Ã¦Å“â‚¬Ã¥Â¤Å¡ 800 Ã¨Â¡Å’
6. **Ã§â€žÂ¡ console.log** Ã¥Å“Â¨Ã§â€Å¸Ã§â€Â¢Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¤Â¸Â­
7. **Ã©ÂÂ©Ã§â€¢Â¶Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨â„¢â€¢Ã§Ââ€ ** Ã¤Â½Â¿Ã§â€Â¨ try/catch
8. **Ã¨Â¼Â¸Ã¥â€¦Â¥Ã©Â©â€”Ã¨Â­â€°** Ã¤Â½Â¿Ã§â€Â¨ Pydantic/Zod

---

## Ã§â€ºÂ¸Ã©â€”Å“Ã¦Å â‚¬Ã¨Æ’Â½

- `coding-standards.md` - Ã¤Â¸â‚¬Ã¨Ë†Â¬Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢
- `backend-patterns.md` - API Ã¥â€™Å’Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦Â¨Â¡Ã¥Â¼Â
- `frontend-patterns.md` - React Ã¥â€™Å’ Next.js Ã¦Â¨Â¡Ã¥Â¼Â
- `tdd-workflow/` - Ã¦Â¸Â¬Ã¨Â©Â¦Ã©Â©â€¦Ã¥â€¹â€¢Ã©â€“â€¹Ã§â„¢Â¼Ã¦â€“Â¹Ã¦Â³â€¢Ã¨Â«â€“
