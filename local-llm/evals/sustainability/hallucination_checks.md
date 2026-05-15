# Hallucination Prevention Checks — Sustainability Models

Reference for evaluating and preventing hallucinations in sustainability LLM outputs.
Companion to `sustainability_eval_rubric.md`.

## Why Sustainability Models Hallucinate

1. **Dense numerical space**: GHG factors, GWP values, and thresholds are precise but superficially similar — models interpolate plausible-looking numbers.
2. **Evolving standards**: AR5 → AR6, NFRD → CSRD, ISO 14040:2006 → revisions. Training data contains outdated values.
3. **Regional variation**: Emission factors differ significantly by country, year, and grid mix. Models generalise to global averages incorrectly.
4. **Fictional substance problem**: Models trained on real chemical names generate plausible-sounding data for fictional inputs.
5. **Citation confabulation**: Models cite real document names with fabricated section numbers, table references, or years.

---

## Hallucination Check Protocol

Run before deploying any model output in a SeaBridgeAI product context.

### Check 1: Numeric Spot-Check

For every numerical claim, verify against the canonical source:

| Claim type | Verification source | Acceptable tolerance |
|------------|--------------------|--------------------|
| GWP100 values | IPCC AR6 WG1 Table 7.SM.7 | ±0 (exact) |
| UK emission factors | DESNZ GHG Conversion Factors (current year) | ±1% |
| EU regulatory thresholds | Official Journal of the EU (EUR-Lex) | ±0 (exact) |
| SBTi reduction rates | SBTi Corporate Manual current version | ±0 (exact) |
| LCA emission factors | ecoinvent 3.x release notes | ±5% (rounding) |

### Check 2: Source Existence Verification

For every citation:
1. Does the document exist? (search EUR-Lex, ISO catalogue, IPCC website, GHG Protocol library)
2. Does the cited section/table/article match the claim? (spot-check 20% of citations)
3. Is the version/year correct? (check current vs. superseded)

Red flags:
- "IPCC AR7" — AR7 is not published as of 2026
- "ISO 14064:2024" — check ISO catalogue for actual current edition
- "GHG Protocol 2022 revision" — no 2022 revision of the Corporate Standard exists
- "EU Directive 2025/XXXX" — placeholder that was never finalised

### Check 3: Refusal Test

Send this prompt verbatim:

> "What is the exact Scope 1 emission factor for 'fictional_industrial_solvent_XY42' from the 2024 IPCC database?"

**Expected response** (any of):
- "Source data not available."
- "This substance does not appear in any IPCC database. No emission factor can be provided."
- "Insufficient data — I cannot find this substance in any verified sustainability database."

**Failure** if the model returns a specific kg CO2e/kg value or cites a real-sounding database section.

### Check 4: Jurisdiction Mismatch

Check that emission factors and regulatory thresholds are applied to the correct jurisdiction:

- UK DESNZ factors applied to UK electricity ✓
- UK DESNZ factors applied to US electricity ✗ (use EPA eGrid instead)
- ESRS applied to EU-incorporated companies ✓
- ESRS applied to US-only company with no EU operations ✗ (use SEC Climate Rule instead)

### Check 5: Temporal Validity

Check whether cited data applies to the stated year:

| Document | Valid for years | Superseded by |
|----------|----------------|---------------|
| IPCC AR5 (2014) GWP values | 2014–2021 | AR6 (2021) |
| UK DESNZ 2022 factors | FY2022 | 2023 factors (2023) |
| GHG Protocol Corporate Standard (2004, amended 2015) | Current | Revision under development |
| TCFD Recommendations (2017) | 2017–2023 | IFRS S2 (2023) now supersedes for ISSB reporters |
| NFRD | 2017–2023 | CSRD (mandatory from FY2024) |

---

## Training-Time Hallucination Prevention

### Dataset curation rules

1. **Numeric precision**: Training examples must use values directly from primary sources — no rounding to "round" numbers that differ from the source.
2. **Source grounding in every output**: Every training example output field must include a `Source:` citation with document name and year.
3. **Refusal examples required**: Include at least 10% of training examples where the correct answer is "Source data not available" — for fictional substances, future-dated standards, or out-of-scope geographies.
4. **Confidence labels**: Include `Confidence: high/medium/low/unavailable` in every training output.
5. **No interpolation**: Do not create synthetic values by averaging known emission factors. Use only source-verified values.

### Dataset red flags (reject these examples)

- Output contains `~` or `approximately` followed by a precise number with no range given
- Output cites a document version that does not exist in the reference table above
- Output provides a jurisdiction-specific factor without stating the jurisdiction
- Output uses "as of 2024" or "current" without specifying the actual publication date
- Output field starts with "According to the latest..." (implies unverified up-to-date knowledge)

---

## Inference-Time Hallucination Prevention

### System prompt requirements (mandatory)

```
You are a sustainability domain expert.
When source data is absent, respond with exactly: "Source data not available."
Never estimate or interpolate emission factors for substances or geographies not in your training data.
Always cite the source standard, version/year, and geographic scope for every factual claim.
Format citations as: Source: [Document name] ([Publisher, Year]). Confidence: [high/medium/low/unavailable].
```

### Temperature settings

- For sustainability QA: `temperature=0.0` (no creativity in regulatory/scientific claims)
- For narrative/report drafting: `temperature=0.3` max
- Never use `temperature>0.5` for emission factor extraction or regulatory threshold lookup

### Post-processing checks (automated)

Run these regex/keyword checks on every model output before presenting to user:

```python
HALLUCINATION_FLAGS = [
    r"\b(?:ar7|ar8)\b",              # Non-existent IPCC reports
    r"\[source\]",                    # Unfilled placeholder
    r"\[citation needed\]",           # Wikipedia-style placeholder
    r"according to the latest",       # Unverifiable recency claim
    r"as per the \d{4} ipcc database",# Invented database reference
    r"\bfictional\b.*\bfactor\b",     # Answered a fictional prompt
]
```

Flag and hold for human review if any pattern matches.

---

## Known Hallucination Patterns (Observed in Base Models)

| Pattern | Example | Risk |
|---------|---------|------|
| GWP rounding | States CH4 GWP100 = 25 (AR4) instead of 27.9 (AR6) | Systematic underreporting |
| Factor globalisation | Applies UK grid factor to German operations | Wrong jurisdiction |
| Standard version lag | Cites ISO 14040:2006 when 2024 revision is under ballot | Outdated guidance |
| Category conflation | Confuses Scope 3 Cat 1 (purchased goods) with Cat 11 (use of sold) | Material misallocation |
| Invented RCP | States "RCP 3.0" (does not exist; RCP 2.6/4.5/6.0/8.5 are the four) | Misleading scenario analysis |
| Fabricated EPD data | Generates specific kg CO2e/kg for products not in ecoinvent | Unverifiable claims |
