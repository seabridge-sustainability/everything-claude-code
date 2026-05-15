"""
evaluate_sustainability_model.py

Score a fine-tuned or base model on the 5 sustainability evaluation dimensions.
Requires Unsloth Studio environment or a loaded adapter.

Dimensions and weights:
  factual_correctness   0.30  — verified against known standards
  source_citation       0.25  — names standard + year + geography
  confidence_calibration 0.15 — high/medium/low/unavailable labels
  domain_specificity    0.15  — quantified, not generic
  no_hallucination      0.15  — refuses unknown, no fabrication

Usage:
    python evaluate_sustainability_model.py \
        --adapter ./output/qwen-sustainability-smoke \
        --dataset ../../datasets/sustainability/smoke-test-sustainability.jsonl

    # Evaluate against running Studio endpoint (no adapter needed):
    python evaluate_sustainability_model.py \
        --base-url http://127.0.0.1:8888 \
        --model unsloth/Qwen3.5-4B-GGUF:Q4_K_M \
        --dataset ../../datasets/sustainability/smoke-test-sustainability.jsonl
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable

# ---------------------------------------------------------------------------
# Scoring rubric
# ---------------------------------------------------------------------------

DIMENSION_WEIGHTS: dict[str, float] = {
    "factual_correctness": 0.30,
    "source_citation": 0.25,
    "confidence_calibration": 0.15,
    "domain_specificity": 0.15,
    "no_hallucination": 0.15,
}

PASS_THRESHOLD = 0.70


@dataclass
class EvalResult:
    example_index: int
    instruction: str
    expected_output: str
    actual_output: str
    scores: dict[str, float] = field(default_factory=dict)
    weighted_score: float = 0.0
    passed: bool = False
    notes: list[str] = field(default_factory=list)


# ---------------------------------------------------------------------------
# Scoring heuristics (lightweight, no LLM-as-judge for smoke eval)
# ---------------------------------------------------------------------------

def _score_factual_correctness(expected: str, actual: str) -> tuple[float, str]:
    """Check key numeric/term overlap between expected and actual."""
    import re
    exp_tokens = set(re.findall(r"[a-z0-9.]+", expected.lower()))
    act_tokens = set(re.findall(r"[a-z0-9.]+", actual.lower()))
    if not exp_tokens:
        return 1.0, "no expected tokens to verify"
    overlap = len(exp_tokens & act_tokens) / len(exp_tokens)
    note = f"token overlap {overlap:.0%} ({len(exp_tokens & act_tokens)}/{len(exp_tokens)} terms)"
    return min(overlap * 1.2, 1.0), note  # mild boost for partial matches


def _score_source_citation(actual: str) -> tuple[float, str]:
    """Detect presence of source identifiers: ISO, GHG Protocol, IPCC, GRI, TCFD, etc."""
    source_patterns = [
        "iso ", "ghg protocol", "ipcc", "gri ", "tcfd", "sbti", "ar5", "ar6",
        "unep", "iea", "eu taxonomy", "csrd", "scope 1", "scope 2", "scope 3",
        "category ", "annex ", "table ", "chapter ",
    ]
    actual_lower = actual.lower()
    hits = [p for p in source_patterns if p in actual_lower]
    score = min(len(hits) / 2, 1.0)  # 2+ hits = full score
    note = f"source patterns found: {hits[:3]}" if hits else "no source patterns detected"
    return score, note


def _score_confidence_calibration(actual: str) -> tuple[float, str]:
    """Check for confidence labels or appropriate hedging."""
    confidence_terms = [
        "high confidence", "medium confidence", "low confidence",
        "unavailable", "not available", "source data not available",
        "approximately", "estimate", "~", "±",
    ]
    actual_lower = actual.lower()
    found = [t for t in confidence_terms if t in actual_lower]
    score = 1.0 if found else 0.4
    note = f"confidence terms: {found[:2]}" if found else "no confidence calibration detected"
    return score, note


def _score_domain_specificity(actual: str) -> tuple[float, str]:
    """Check for quantified, specific claims vs. generic prose."""
    import re
    numbers = re.findall(r"\d+\.?\d*\s*(?:kg|t|mt|gwp|%|ppm|tco2|mwh|kwh|yr|year)", actual.lower())
    score = min(len(numbers) / 2, 1.0)  # 2+ quantified terms = full score
    note = f"quantified terms: {numbers[:3]}" if numbers else "no quantified terms found"
    return score, note


def _score_no_hallucination(actual: str, instruction: str) -> tuple[float, str]:
    """Check refusal behavior for unknown data and absence of fabricated placeholders."""
    fabrication_signals = [
        "2024 ipcc database", "fictional", "exact emission factor",
        "[source]", "[citation needed]", "as per the latest",
        "i don't have access to", "i cannot access",
    ]
    # Fictional substance in instruction triggers refusal check
    if "fictional" in instruction.lower() or "xy42" in instruction.lower():
        refusal_terms = ["not available", "unknown", "insufficient", "cannot", "no data", "unavailable"]
        refused = any(t in actual.lower() for t in refusal_terms)
        note = "refusal check: PASS" if refused else "refusal check: FAIL — no refusal for fictional data"
        return (1.0 if refused else 0.0), note

    hits = [s for s in fabrication_signals if s in actual.lower()]
    score = 0.0 if hits else 1.0
    note = f"fabrication signals: {hits}" if hits else "no fabrication signals"
    return score, note


SCORERS: dict[str, Callable] = {
    "factual_correctness": lambda exp, act, ins: _score_factual_correctness(exp, act),
    "source_citation": lambda exp, act, ins: _score_source_citation(act),
    "confidence_calibration": lambda exp, act, ins: _score_confidence_calibration(act),
    "domain_specificity": lambda exp, act, ins: _score_domain_specificity(act),
    "no_hallucination": lambda exp, act, ins: _score_no_hallucination(act, ins),
}


# ---------------------------------------------------------------------------
# Inference
# ---------------------------------------------------------------------------

def _infer_via_studio(base_url: str, model: str, instruction: str, inp: str) -> str:
    import urllib.request

    key = os.environ.get("UNSLOTH_API_KEY") or os.environ.get("ANTHROPIC_AUTH_TOKEN") or ""
    system = (
        "You are a sustainability domain expert. "
        "When source data is absent, say 'Source data not available.' "
        "Always cite the source standard for factual claims."
    )
    user_msg = f"{instruction}\n\nContext: {inp}" if inp.strip() else instruction
    payload = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user_msg},
        ],
        "max_tokens": 400,
        "stream": False,
    }).encode()

    req = urllib.request.Request(
        f"{base_url}/v1/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        raw = resp.read().decode()

    parts: list[str] = []
    for line in raw.splitlines():
        if line.startswith("data:") and "[DONE]" not in line:
            try:
                chunk = json.loads(line[5:].strip())
                delta = chunk["choices"][0].get("delta", {}).get("content")
                if delta:
                    parts.append(delta)
            except (json.JSONDecodeError, KeyError, IndexError):
                continue
    return "".join(parts).strip()


def _infer_via_adapter(adapter_path: str, instruction: str, inp: str) -> str:
    try:
        from unsloth import FastLanguageModel
    except ImportError:
        print("[ERROR] Unsloth not available. Use --base-url for Studio endpoint.")
        sys.exit(1)

    model, tokenizer = FastLanguageModel.from_pretrained(adapter_path, max_seq_length=512)
    FastLanguageModel.for_inference(model)
    user_msg = f"{instruction}\n\nContext: {inp}" if inp.strip() else instruction
    inputs = tokenizer(
        [f"### Instruction:\n{user_msg}\n\n### Response:\n"],
        return_tensors="pt",
    ).to("cuda")
    outputs = model.generate(**inputs, max_new_tokens=400, use_cache=True)
    return tokenizer.decode(outputs[0], skip_special_tokens=True).split("### Response:")[-1].strip()


# ---------------------------------------------------------------------------
# Evaluation loop
# ---------------------------------------------------------------------------

def evaluate(dataset_path: str, infer_fn) -> list[EvalResult]:
    results: list[EvalResult] = []
    with open(dataset_path) as f:
        examples = [json.loads(line) for line in f if line.strip()]

    for i, ex in enumerate(examples, 1):
        instruction = ex.get("instruction", ex.get("conversations", [{}])[0].get("value", ""))
        inp = ex.get("input", "")
        expected = ex.get("output", "")

        print(f"[{i}/{len(examples)}] {instruction[:70]}")
        try:
            actual = infer_fn(instruction, inp)
        except Exception as exc:
            print(f"  ERROR: {exc}")
            results.append(EvalResult(i, instruction, expected, f"ERROR: {exc}"))
            continue

        result = EvalResult(i, instruction, expected, actual)
        for dim, scorer in SCORERS.items():
            score, note = scorer(expected, actual, instruction)
            result.scores[dim] = score
            result.notes.append(f"{dim}: {score:.2f} — {note}")

        result.weighted_score = sum(
            result.scores[d] * w for d, w in DIMENSION_WEIGHTS.items()
        )
        result.passed = result.weighted_score >= PASS_THRESHOLD

        status = "PASS" if result.passed else "FAIL"
        print(f"  {status}  weighted={result.weighted_score:.2f}")
        results.append(result)

    return results


def print_summary(results: list[EvalResult]) -> None:
    passed = sum(1 for r in results if r.passed)
    total = len(results)
    avg = sum(r.weighted_score for r in results) / max(total, 1)

    print(f"\n{'='*50}")
    print(f"EVALUATION SUMMARY")
    print(f"{'='*50}")
    print(f"Passed : {passed}/{total}")
    print(f"Avg    : {avg:.3f}  (threshold: {PASS_THRESHOLD:.2f})")
    print()

    for dim in DIMENSION_WEIGHTS:
        dim_avg = sum(r.scores.get(dim, 0) for r in results) / max(total, 1)
        print(f"  {dim:<30} {dim_avg:.3f}")

    print()
    for r in results:
        status = "PASS" if r.passed else "FAIL"
        print(f"  [{status}] ex.{r.example_index}  score={r.weighted_score:.2f}")
        for note in r.notes:
            print(f"         {note}")

    overall = "ALL PASSED" if passed == total else f"{total - passed} FAILED"
    print(f"\n{overall}")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Sustainability model evaluation")
    parser.add_argument("--dataset", required=True, help="Path to evaluation JSONL")
    parser.add_argument("--adapter", default=None, help="Path to saved LoRA adapter directory")
    parser.add_argument("--base-url", default=os.environ.get("LOCAL_LLM_BASE_URL", "http://127.0.0.1:8888"))
    parser.add_argument("--model", default=os.environ.get("LOCAL_LLM_MODEL", "unsloth/Qwen3.5-4B-GGUF:Q4_K_M"))
    args = parser.parse_args()

    if not Path(args.dataset).exists():
        print(f"[ERROR] Dataset not found: {args.dataset}")
        sys.exit(1)

    if args.adapter:
        if not Path(args.adapter).exists():
            print(f"[ERROR] Adapter not found: {args.adapter}")
            sys.exit(1)
        print(f"Evaluating adapter: {args.adapter}")
        infer_fn = lambda ins, inp: _infer_via_adapter(args.adapter, ins, inp)
    else:
        print(f"Evaluating via Studio: {args.base_url}  model={args.model}")
        infer_fn = lambda ins, inp: _infer_via_studio(args.base_url, args.model, ins, inp)

    results = evaluate(args.dataset, infer_fn)
    print_summary(results)
    sys.exit(0 if all(r.passed for r in results) else 1)


if __name__ == "__main__":
    main()
