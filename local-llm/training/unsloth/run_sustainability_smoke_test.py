"""
run_sustainability_smoke_test.py

Lightweight smoke test for Unsloth Studio sustainability inference.
No training required. Studio must be running on port 8888.

Usage:
    python run_sustainability_smoke_test.py
    python run_sustainability_smoke_test.py --base-url http://127.0.0.1:8888

Skips with a warning if LOCAL_LLM_ENABLED is not "true" in the environment.
"""
from __future__ import annotations

import argparse
import json
import os
import sys


SMOKE_PROMPTS = [
    {
        "question": "What GHG scope covers purchased electricity for office use?",
        "expected_keywords": ["scope 2", "indirect", "electricity"],
    },
    {
        "question": "What is Scope 3 Category 11?",
        "expected_keywords": ["use of sold products", "category 11", "use-phase"],
    },
    {
        "question": "What is the GWP100 of methane per IPCC AR6?",
        "expected_keywords": ["27.9", "ar6", "ch4"],
    },
]

MISSING_DATA_PROMPT = (
    "What is the exact Scope 1 emission factor for 'fictional_industrial_solvent_XY42' "
    "from the 2024 IPCC database?"
)
MISSING_DATA_EXPECTED = ["not available", "unknown", "insufficient", "cannot", "no data"]

SYSTEM_PROMPT = (
    "You are a sustainability domain expert. "
    "When source data is absent, say 'Source data not available.' "
    "Always cite the source standard for factual claims."
)


def _get_key() -> str:
    key = (
        os.environ.get("UNSLOTH_API_KEY")
        or os.environ.get("ANTHROPIC_AUTH_TOKEN")
        or ""
    )
    if not key:
        print("[WARN] UNSLOTH_API_KEY not set — requests will proceed without auth")
    return key


def _chat(base_url: str, key: str, user_msg: str, model: str) -> str:
    import urllib.request

    payload = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ],
        "max_tokens": 300,
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

    # Studio returns SSE lines even for stream=False
    content_parts: list[str] = []
    for line in raw.splitlines():
        if line.startswith("data:") and "[DONE]" not in line:
            try:
                chunk = json.loads(line[5:].strip())
                delta = chunk["choices"][0].get("delta", {}).get("content")
                if delta:
                    content_parts.append(delta)
            except (json.JSONDecodeError, KeyError, IndexError):
                continue
    return "".join(content_parts).strip()


def run_smoke_test(base_url: str, model: str) -> bool:
    key = _get_key()
    all_passed = True

    print(f"\n=== Sustainability LLM Smoke Test ===")
    print(f"Endpoint : {base_url}")
    print(f"Model    : {model}\n")

    for i, probe in enumerate(SMOKE_PROMPTS, 1):
        print(f"[{i}/{len(SMOKE_PROMPTS)}] Q: {probe['question'][:80]}")
        try:
            answer = _chat(base_url, key, probe["question"], model)
            answer_lower = answer.lower()
            hit = any(kw in answer_lower for kw in probe["expected_keywords"])
            status = "PASS" if hit else "FAIL"
            if not hit:
                all_passed = False
            print(f"  Status : {status}")
            print(f"  Answer : {answer[:200]}")
        except Exception as exc:
            print(f"  Status : ERROR — {exc}")
            all_passed = False

    # Missing-data refusal check
    print(f"\n[{len(SMOKE_PROMPTS)+1}/{len(SMOKE_PROMPTS)+1}] Missing-data refusal check")
    print(f"  Q: {MISSING_DATA_PROMPT[:80]}")
    try:
        answer = _chat(base_url, key, MISSING_DATA_PROMPT, model)
        answer_lower = answer.lower()
        refused = any(phrase in answer_lower for phrase in MISSING_DATA_EXPECTED)
        status = "PASS" if refused else "WARN"
        if not refused:
            print("  [WARN] Model did not refuse — check for potential hallucination")
        print(f"  Status : {status}")
        print(f"  Answer : {answer[:200]}")
    except Exception as exc:
        print(f"  Status : ERROR — {exc}")
        all_passed = False

    print(f"\n{'ALL SMOKE TESTS PASSED' if all_passed else 'SOME SMOKE TESTS FAILED'}")
    return all_passed


def main() -> None:
    local_llm_enabled = os.environ.get("LOCAL_LLM_ENABLED", "false").lower()
    if local_llm_enabled != "true":
        print("[SKIP] LOCAL_LLM_ENABLED is not 'true' — skipping smoke test")
        print("       Set LOCAL_LLM_ENABLED=true in .env or env to run.")
        sys.exit(0)

    parser = argparse.ArgumentParser(description="Sustainability LLM smoke test")
    parser.add_argument(
        "--base-url",
        default=os.environ.get("LOCAL_LLM_BASE_URL", "http://127.0.0.1:8888"),
    )
    parser.add_argument(
        "--model",
        default=os.environ.get("LOCAL_LLM_MODEL", "unsloth/Qwen3.5-4B-GGUF:Q4_K_M"),
    )
    args = parser.parse_args()

    passed = run_smoke_test(args.base_url, args.model)
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
