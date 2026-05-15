# Sustainability Model Evaluation Rubric

Used by `evaluate_sustainability_model.py`. Pass threshold: **0.70** weighted score.

## Dimensions

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Factual Correctness | 0.30 | Key numeric values, standard names, and regulatory thresholds match verified references |
| Source Citation | 0.25 | Names source standard + version/year + geography scope |
| Confidence Calibration | 0.15 | Applies high/medium/low/unavailable labels; does not overstate certainty |
| Domain Specificity | 0.15 | Uses quantified terms, sector vocabulary; avoids generic prose |
| No Hallucination | 0.15 | Refuses to answer for unknown substances/standards; no fabricated placeholders |

## Scoring Scale

Each dimension scored 0.0–1.0:

| Score | Meaning |
|-------|---------|
| 1.0 | Fully meets criterion |
| 0.7–0.9 | Mostly meets; minor gaps |
| 0.4–0.6 | Partially meets; significant gaps |
| 0.1–0.3 | Mostly fails; critical gaps |
| 0.0 | Fully fails criterion |

## Factual Correctness (Weight: 0.30)

**Score 1.0:**
- All key numeric values match source (within reported significant figures)
- All regulatory thresholds, GWP values, and emission factors correctly stated
- No factual contradictions with named source

**Score 0.5:**
- Most values correct but 1–2 minor numeric discrepancies
- Correct conceptual answer with imprecise figures

**Score 0.0:**
- Fabricated emission factor or regulatory threshold
- Contradicts named source

**Verification sources for common claims:**
- GHG Protocol Corporate Standard (Scope 1/2/3 definitions)
- IPCC AR6 WG1 (GWP100 values): CH4 = 27.9, N2O = 273, HFC-134a = 1,526
- UK DESNZ GHG Conversion Factors 2023 (UK emission factors)
- TCFD Final Report 2017 (risk taxonomy)
- SBTi Corporate Net-Zero Standard v1.2 (net zero definitions)
- ESRS E1 (EU climate reporting requirements)
- GRI 305 (emissions disclosure requirements)

## Source Citation (Weight: 0.25)

**Score 1.0:**
- Names standard/database + version or year
- States the geographic scope or applicability
- Example: "Source: UK Government GHG Conversion Factors 2023, Table 1a (DESNZ)"

**Score 0.5:**
- Names source without version/year or geography
- Example: "Source: GHG Protocol" (no edition or chapter)

**Score 0.0:**
- No source cited
- Vague reference: "according to international standards"
- Fabricated source name

**Required citation format:**
```
Source: [Document name] ([Publisher, Year]), [Section/Table if relevant]. Confidence: [high/medium/low/unavailable].
```

## Confidence Calibration (Weight: 0.15)

**Score 1.0:**
- Explicit confidence label: `high`, `medium`, `low`, or `unavailable`
- Hedging matched to data quality (estimated ranges vs. precise values)

**Score 0.5:**
- Some hedging present ("approximately", "~") but no explicit label

**Score 0.0:**
- States imprecise or estimated values as certain facts
- Provides fabricated precise value with no uncertainty noted

**Confidence label definitions:**
- `high`: Data from primary official source, directly applicable
- `medium`: Data from secondary source or extrapolated from analogous geography/product
- `low`: Data estimated from proxies or industry averages with ≥50% uncertainty
- `unavailable`: No suitable data exists; use "Source data not available" response

## Domain Specificity (Weight: 0.15)

**Score 1.0:**
- Uses sector-specific vocabulary (e.g., "GWP100", "tCO2e", "EEIO", "EPD", "RSPO", "SFTTrainer")
- Provides quantified values with units
- Distinguishes similar concepts (e.g., withdrawn vs. consumed water; gross vs. net CV)

**Score 0.5:**
- Correct domain vocabulary but missing quantification

**Score 0.0:**
- Generic prose only ("the company should reduce its environmental impact")
- No technical terminology for a technical question

## No Hallucination (Weight: 0.15)

**Score 1.0 — Refusal test (fictional data):**
- Responds with "Source data not available" or equivalent for fictional substances/standards
- Does not fabricate a plausible-sounding emission factor or regulatory threshold

**Score 1.0 — Normal response (real data):**
- No placeholder text ("[source]", "[citation needed]", "[to be confirmed]")
- No fabricated organisation names, document titles, or regulatory thresholds

**Score 0.0:**
- Provides a specific emission factor for a fictional substance
- Cites a non-existent standard version or database
- Uses placeholder brackets in final output

## Benchmark Reference Answers

The following are verified reference answers for common smoke-test questions:

| Question | Expected answer (key elements) | Source |
|----------|-------------------------------|--------|
| GWP100 of CH4 per IPCC AR6 | 27.9 | IPCC AR6 WG1 Table 7.SM.7 |
| Scope 2 covers | purchased electricity, heat, steam, cooling | GHG Protocol Corporate Standard |
| Scope 3 Category 11 | use of sold products (use-phase emissions) | GHG Protocol Scope 3 Standard |
| UK grid 2023 location-based | 0.20705 kg CO2e/kWh | DESNZ GHG Conversion Factors 2023 |
| SBTi 1.5°C ACA reduction rate | 4.2% per year (absolute contraction) | SBTi Corporate Manual v1.2 |
| TCFD risk categories | physical (acute, chronic), transition (policy, tech, market, reputational) | TCFD 2017 |

## Failure Conditions

A model output **fails** this rubric if:

1. Weighted score < 0.70
2. No-hallucination score = 0.0 on a refusal test prompt
3. Factual correctness score = 0.0 (fabricated core fact)
4. Zero source citations across the entire evaluation set

Failing outputs must not be deployed without human review and retraining.
