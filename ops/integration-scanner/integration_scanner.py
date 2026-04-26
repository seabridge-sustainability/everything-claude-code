from __future__ import annotations

import argparse
import json
import os
import re
import time
from dataclasses import dataclass
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any, Protocol

import httpx
from loguru import logger

SCRIPT_DIR = Path(__file__).resolve().parent

ALLOWED_LICENSES = {"MIT", "Apache-2.0", "CC-BY-4.0", "CC-BY", "ODbL"}
DEFAULT_CHANNEL = "#integrations-radar"
DEFAULT_MODELS: dict[str, str] = {
    "anthropic": "claude-sonnet-4-20250514",
    "openai": "gpt-4o",
    "litellm": "claude-sonnet-4-20250514",
}
GITHUB_API = "https://api.github.com"
REPORT_THRESHOLD = 6.5
STALE_DAYS = 90

WEIGHTS = {
    "architectural_alignment": 0.25,
    "code_quality_maturity": 0.20,
    "integration_complexity": 0.20,
    "time_to_value": 0.15,
    "strategic_moat": 0.20,
}

REQUIRED_FIELDS = {
    "name",
    "repo",
    "type",
    "license",
    "status",
    "fit_score",
    "use_case",
    "blocker",
    "seabridge_fit",
    "notes",
}

VALID_STATUSES = {"production", "integrated", "in_use", "active_dev", "evaluate", "watch"}
_REPO_RE = re.compile(r"^[A-Za-z0-9_.\-]+/[A-Za-z0-9_.\-]+$")


@dataclass(frozen=True)
class GitHubMetadata:
    stars: int | None
    pushed_at: datetime | None
    license_spdx_id: str | None
    verified_manually: bool = False
    error: str | None = None


class GitHubClientProtocol(Protocol):
    def fetch_repo_metadata(self, repo: str) -> GitHubMetadata: ...


class BriefClientProtocol(Protocol):
    def action_brief(self, item: dict[str, Any]) -> str: ...

    def executive_summary(self, scored_integrations: list[dict[str, Any]]) -> str: ...


class SlackClientProtocol(Protocol):
    def post_markdown(
        self,
        channel: str,
        title: str,
        markdown: str,
        top_items: list[dict[str, Any]],
    ) -> None: ...


# ---------------------------------------------------------------------------
# GitHub client
# ---------------------------------------------------------------------------


class GitHubClient:
    def __init__(self, token: str | None = None, timeout: float = 10.0) -> None:
        headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }
        if token:
            headers["Authorization"] = f"Bearer {token}"
        self._client = httpx.Client(headers=headers, timeout=timeout, follow_redirects=True)

    def fetch_repo_metadata(self, repo: str) -> GitHubMetadata:
        if _is_manual_repo(repo):
            return GitHubMetadata(None, None, None, verified_manually=True)
        if not _REPO_RE.fullmatch(repo):
            raise ValueError(f"Invalid repo format: {repo!r}")

        url = f"{GITHUB_API}/repos/{repo}"
        response: httpx.Response | None = None
        for attempt in range(4):
            response = self._client.get(url)
            if response.status_code not in {403, 429, 500, 502, 503, 504}:
                if response.status_code == 404:
                    logger.warning("GitHub repo not found for {}; continuing with registry metadata", repo)
                    return GitHubMetadata(
                        None,
                        None,
                        None,
                        verified_manually=False,
                        error="GitHub repository not found",
                    )
                response.raise_for_status()
                payload = response.json()
                return GitHubMetadata(
                    stars=payload.get("stargazers_count"),
                    pushed_at=_parse_github_datetime(payload.get("pushed_at")),
                    license_spdx_id=(payload.get("license") or {}).get("spdx_id"),
                )

            wait_seconds = _retry_after_seconds(response, attempt)
            logger.warning(
                "GitHub metadata fetch retrying for {} after HTTP {} in {}s",
                repo,
                response.status_code,
                wait_seconds,
            )
            time.sleep(wait_seconds)

        if response is not None:
            response.raise_for_status()
        raise RuntimeError(f"GitHub metadata fetch failed for {repo}")


# ---------------------------------------------------------------------------
# Shared prompt builders
# ---------------------------------------------------------------------------


def _action_brief_prompt(item: dict[str, Any]) -> tuple[str, str]:
    blocker = f"Blocker: {item['blocker']}" if item.get("blocker") else "No blockers."
    system = (
        "You are a principal engineer reviewing integrations for SeaBridgeAI "
        "(FastAPI + MongoDB + LangGraph + MCP). Terse, opinionated, "
        'technically exact. No generic advice. Frame all actions as "you" '
        "(Alejandro, CEO)."
    )
    user = (
        f"Integration: {item['name']} | Type: {item['type']} | "
        f"Status: {item['status']} | Fit: {item['fit_score']}/10\n"
        f"Use: {item['use_case']}\n"
        f"{blocker}\n\n"
        "4 bullets, <=18 words each:\n"
        "Integration risk for SeaBridgeAI this sprint\n"
        "Biggest quick win you can ship this week\n"
        "Exact next action (specific file/command/API call)\n"
        "Long-term strategic leverage for A2A network"
    )
    return system, user


def _executive_summary_prompt(scored_integrations: list[dict[str, Any]]) -> tuple[str, str]:
    system = (
        "You are a principal engineer at SeaBridgeAI writing a weekly executive "
        "summary for Alejandro (CEO, sole engineer-owner). Blunt, no fluff. "
        "Alejandro is the only decision-maker and executor."
    )
    user = (
        "Integration stack this week:\n"
        f"{json.dumps(scored_integrations, indent=2)}\n\n"
        "Generate a weekly executive summary (<=250 words):\n"
        "Top 3 integrations that need action THIS WEEK - with exact why and what to do\n"
        "Biggest single blocker threatening the A2A protocol launch right now\n"
        "One integration to deprioritize or drop, and why\n"
        "Alejandro's recommended personal focus for the next 7 days (3 items max)"
    )
    return system, user


# ---------------------------------------------------------------------------
# Brief clients — one per provider
# ---------------------------------------------------------------------------


class AnthropicBriefClient:
    def __init__(self, api_key: str | None = None, model: str | None = None) -> None:
        from anthropic import Anthropic

        resolved_key = api_key or os.environ.get("ANTHROPIC_API_KEY")
        if not resolved_key:
            raise RuntimeError("ANTHROPIC_API_KEY required for Anthropic provider.")
        self._client = Anthropic(api_key=resolved_key)
        self._model = model or DEFAULT_MODELS["anthropic"]

    def action_brief(self, item: dict[str, Any]) -> str:
        system, user = _action_brief_prompt(item)
        return self._message(system, user, 300)

    def executive_summary(self, scored_integrations: list[dict[str, Any]]) -> str:
        system, user = _executive_summary_prompt(scored_integrations)
        return self._message(system, user, 600)

    def _message(self, system: str, user: str, max_tokens: int) -> str:
        response = self._client.messages.create(
            model=self._model,
            max_tokens=max_tokens,
            system=system,
            messages=[{"role": "user", "content": user}],
        )
        return "".join(
            block.text for block in response.content if getattr(block, "type", None) == "text"
        ).strip()


class OpenAIBriefClient:
    def __init__(self, api_key: str | None = None, model: str | None = None) -> None:
        from openai import OpenAI

        resolved_key = api_key or os.environ.get("OPENAI_API_KEY")
        if not resolved_key:
            raise RuntimeError("OPENAI_API_KEY required for OpenAI provider.")
        self._client = OpenAI(api_key=resolved_key)
        self._model = model or DEFAULT_MODELS["openai"]

    def action_brief(self, item: dict[str, Any]) -> str:
        system, user = _action_brief_prompt(item)
        return self._message(system, user, 300)

    def executive_summary(self, scored_integrations: list[dict[str, Any]]) -> str:
        system, user = _executive_summary_prompt(scored_integrations)
        return self._message(system, user, 600)

    def _message(self, system: str, user: str, max_tokens: int) -> str:
        response = self._client.chat.completions.create(
            model=self._model,
            max_tokens=max_tokens,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
        )
        return (response.choices[0].message.content or "").strip()


class LiteLLMBriefClient:
    def __init__(self, model: str | None = None) -> None:
        import litellm  # noqa: F401

        self._model = model or DEFAULT_MODELS["litellm"]

    def action_brief(self, item: dict[str, Any]) -> str:
        system, user = _action_brief_prompt(item)
        return self._message(system, user, 300)

    def executive_summary(self, scored_integrations: list[dict[str, Any]]) -> str:
        system, user = _executive_summary_prompt(scored_integrations)
        return self._message(system, user, 600)

    def _message(self, system: str, user: str, max_tokens: int) -> str:
        import litellm

        response = litellm.completion(
            model=self._model,
            max_tokens=max_tokens,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
        )
        return (response.choices[0].message.content or "").strip()


class DryRunBriefClient:
    def action_brief(self, item: dict[str, Any]) -> str:
        blocker = item.get("blocker") or "No blocker recorded"
        return (
            f"- {item['name']}: validate sprint risk against A2A and MCP constraints.\n"
            f"- Ship one concrete proof tied to {item['seabridge_fit']} this week.\n"
            "- Next: review registry notes, blocker, and repo metadata today.\n"
            f"- Leverage: {blocker}."
        )

    def executive_summary(self, scored_integrations: list[dict[str, Any]]) -> str:
        top = scored_integrations[:3]
        names = ", ".join(str(item["name"]) for item in top)
        blocker = next((item.get("blocker") for item in scored_integrations if item.get("blocker")), None)
        return (
            f"Top action this week: {names}. "
            f"Biggest A2A launch blocker: {blocker or 'none recorded'}. "
            "Drop the lowest-scoring watch/evaluate item until it clears technical or license risk. "
            "Focus on certification, FastMCP network boundaries, and EvidenceItem enforcement."
        )


def create_brief_client(
    provider: str = "auto",
    model: str | None = None,
) -> BriefClientProtocol:
    if provider == "dry-run":
        return DryRunBriefClient()
    if provider == "anthropic":
        return AnthropicBriefClient(model=model)
    if provider == "openai":
        return OpenAIBriefClient(model=model)
    if provider == "litellm":
        return LiteLLMBriefClient(model=model)
    if provider == "auto":
        if os.environ.get("ANTHROPIC_API_KEY"):
            logger.info("Auto-detected Anthropic provider")
            return AnthropicBriefClient(model=model)
        if os.environ.get("OPENAI_API_KEY"):
            logger.info("Auto-detected OpenAI provider")
            return OpenAIBriefClient(model=model)
        try:
            return LiteLLMBriefClient(model=model)
        except ImportError:
            pass
        raise RuntimeError(
            "No LLM provider available. Set ANTHROPIC_API_KEY, OPENAI_API_KEY, "
            "or install litellm. Use --dry-run for offline mode."
        )
    raise ValueError(f"Unknown provider: {provider}")


# ---------------------------------------------------------------------------
# Slack client
# ---------------------------------------------------------------------------


class SlackClient:
    def __init__(self, token: str | None = None, timeout: float = 10.0) -> None:
        self._token = (token or os.environ.get("SLACK_BOT_TOKEN", "")).strip()
        if not self._token:
            raise RuntimeError("SLACK_BOT_TOKEN is required unless --skip-slack is used.")
        self._client = httpx.Client(timeout=timeout)

    def post_markdown(
        self,
        channel: str,
        title: str,
        markdown: str,
        top_items: list[dict[str, Any]],
    ) -> None:
        response = self._client.post(
            "https://slack.com/api/chat.postMessage",
            headers={
                "Authorization": f"Bearer {self._token}",
                "Content-Type": "application/json; charset=utf-8",
            },
            json={
                "channel": channel,
                "text": f"*{title}*\n\n{markdown}",
                "blocks": _slack_blocks(title, markdown, top_items),
            },
        )
        response.raise_for_status()
        body = response.json()
        if not body.get("ok"):
            raise RuntimeError(f"Slack post failed: {body.get('error', 'unknown error')}")


# ---------------------------------------------------------------------------
# Registry loader
# ---------------------------------------------------------------------------


def load_registry(path: Path) -> list[dict[str, Any]]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, list):
        raise ValueError("Integration registry must be a JSON array.")
    for index, item in enumerate(payload):
        if not isinstance(item, dict):
            raise ValueError(f"Integration registry item {index} must be an object.")
        missing = REQUIRED_FIELDS.difference(item)
        if missing:
            raise ValueError(
                f"Integration registry item {index} missing required fields: {sorted(missing)}"
            )
        try:
            score = float(item["fit_score"])
        except (TypeError, ValueError) as exc:
            raise ValueError(
                f"Integration '{item.get('name', index)}': fit_score must be numeric"
            ) from exc
        if not 1.0 <= score <= 10.0:
            raise ValueError(
                f"Integration '{item.get('name', index)}': fit_score must be between 1 and 10"
            )
        if item["status"] not in VALID_STATUSES:
            raise ValueError(
                f"Integration '{item.get('name', index)}': unknown status '{item['status']}'"
            )
    return payload


# ---------------------------------------------------------------------------
# Core scan logic
# ---------------------------------------------------------------------------


def run_scan(
    registry: list[dict[str, Any]],
    today: date,
    github_client: GitHubClientProtocol,
    brief_client: BriefClientProtocol,
    slack_client: SlackClientProtocol | None,
    reports_dir: Path | None,
    slack_channel: str = DEFAULT_CHANNEL,
) -> dict[str, Any]:
    scored_integrations = [
        _scan_integration(item, today, github_client, brief_client) for item in registry
    ]
    surfaced = [
        item for item in scored_integrations if item["final_score"] >= REPORT_THRESHOLD
    ]
    surfaced.sort(key=lambda item: item["action_priority"], reverse=True)
    top_3 = surfaced[:3]

    result = {
        "run_date": today.isoformat(),
        "total_tracked": len(scored_integrations),
        "in_production": sum(1 for item in scored_integrations if item["status"] == "production"),
        "active_dev": sum(1 for item in scored_integrations if item["status"] == "active_dev"),
        "blockers": sum(1 for item in scored_integrations if item.get("blocker")),
        "stale_flags": sum(1 for item in scored_integrations if item["stale_risk"]),
        "license_flags": sum(1 for item in scored_integrations if not item["license_ok"]),
        "executive_summary": brief_client.executive_summary(surfaced),
        "integrations": scored_integrations,
        "top_3_this_week": [str(item["name"]) for item in top_3],
        "a2a_blocker": _a2a_blocker(scored_integrations),
        "drop_recommendation": _drop_recommendation(scored_integrations),
    }

    markdown = render_markdown(result)
    if reports_dir is not None:
        _write_reports(result, markdown, reports_dir, today)
    if slack_client is not None:
        slack_client.post_markdown(
            channel=slack_channel,
            title=f"Integration Scan - {today.isoformat()}",
            markdown=markdown,
            top_items=top_3,
        )
    return result


def render_markdown(result: dict[str, Any]) -> str:
    integrations = {str(item["name"]): item for item in result["integrations"]}
    lines = [
        f"# Integration Scan - {result['run_date']}",
        "",
        "## Executive Summary",
        str(result["executive_summary"]),
        "",
        "## Top 3 This Week",
    ]
    for name in result["top_3_this_week"]:
        item = integrations[name]
        lines.extend(
            [
                f"### {name}",
                f"- Final score: {item['final_score']}",
                f"- Status: {item['status']}",
                f"- Action priority: {item['action_priority']}",
                f"- Blocker: {item.get('blocker') or 'None'}",
                f"- Brief:\n{item['action_brief']}",
            ]
        )
    lines.extend(
        [
            "",
            "## A2A Launch Blocker",
            str(result["a2a_blocker"] or "None"),
            "",
            "## Drop Recommendation",
            str(result["drop_recommendation"] or "None"),
            "",
            "## Flags",
            f"- Stale repos: {result['stale_flags']}",
            f"- License flags: {result['license_flags']}",
            f"- Blockers: {result['blockers']}",
        ]
    )
    return "\n".join(lines).strip() + "\n"


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the SeaBridgeAI integration scanner.")
    parser.add_argument("--registry", type=Path, default=SCRIPT_DIR / "data" / "integrations.json")
    parser.add_argument("--reports-dir", type=Path, default=SCRIPT_DIR / "reports")
    parser.add_argument("--skip-slack", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--slack-channel", default=DEFAULT_CHANNEL)
    parser.add_argument(
        "--provider",
        choices=["auto", "anthropic", "openai", "litellm"],
        default="auto",
        help="LLM provider for briefs (default: auto-detect from env vars)",
    )
    parser.add_argument("--model", default=None, help="Override the default model for the chosen provider")
    args = parser.parse_args()

    registry = load_registry(args.registry)
    github_client = GitHubClient(token=os.environ.get("GITHUB_TOKEN"))
    brief_client: BriefClientProtocol = (
        DryRunBriefClient() if args.dry_run else create_brief_client(args.provider, args.model)
    )
    slack_client = None if args.skip_slack else SlackClient()
    result = run_scan(
        registry=registry,
        today=date.today(),
        github_client=github_client,
        brief_client=brief_client,
        slack_client=slack_client,
        reports_dir=args.reports_dir,
        slack_channel=args.slack_channel,
    )
    logger.info(
        "Integration scan complete: {} tracked, top_3={}",
        result["total_tracked"],
        result["top_3_this_week"],
    )


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------


def _scan_integration(
    item: dict[str, Any],
    today: date,
    github_client: GitHubClientProtocol,
    brief_client: BriefClientProtocol,
) -> dict[str, Any]:
    metadata = (
        GitHubMetadata(None, None, None, verified_manually=True)
        if _is_manual_integration(item)
        else github_client.fetch_repo_metadata(str(item["repo"]))
    )
    days_ago = _days_since(metadata.pushed_at, today)
    license_id = metadata.license_spdx_id or item.get("license")
    license_ok = str(license_id) in ALLOWED_LICENSES
    stale_risk = days_ago is not None and days_ago > STALE_DAYS
    low_star_risk = metadata.stars is not None and metadata.stars < 100
    matrix = _score_matrix(item, metadata, stale_risk, low_star_risk, license_ok)
    final_score = round(sum(matrix[key] * weight for key, weight in WEIGHTS.items()), 2)
    action_priority = _action_priority(item, final_score, stale_risk, low_star_risk, license_ok)

    scanned = {
        **item,
        "github_stars": metadata.stars,
        "last_commit_days_ago": days_ago,
        "github_license": metadata.license_spdx_id,
        "github_verified_manually": metadata.verified_manually,
        "github_metadata_error": metadata.error,
        "license_ok": license_ok,
        "stale_risk": stale_risk,
        "low_star_risk": low_star_risk,
        "score_matrix": matrix,
        "final_score": final_score,
        "action_priority": action_priority,
    }
    scanned["action_brief"] = brief_client.action_brief(scanned)
    scanned["recommended_this_week"] = (
        final_score >= REPORT_THRESHOLD and action_priority >= 7.0 and not item.get("blocker")
    )
    return scanned


def _score_matrix(
    item: dict[str, Any],
    metadata: GitHubMetadata,
    stale_risk: bool,
    low_star_risk: bool,
    license_ok: bool,
) -> dict[str, float]:
    fit_score = float(item["fit_score"])
    status = str(item["status"])
    blocker = bool(item.get("blocker"))

    architectural = min(10.0, fit_score + _fit_bonus(str(item["seabridge_fit"])))
    maturity = {
        "production": 9.0,
        "integrated": 8.6,
        "in_use": 8.3,
        "active_dev": 7.4,
        "evaluate": 6.4,
        "watch": 4.8,
    }.get(status, 6.0)
    if metadata.stars is not None and metadata.stars >= 1000:
        maturity += 0.6
    if stale_risk:
        maturity -= 1.8
    if low_star_risk:
        maturity -= 0.8
    if metadata.verified_manually:
        maturity = max(maturity, 7.5)

    complexity = {
        "production": 8.8,
        "integrated": 8.5,
        "in_use": 8.0,
        "active_dev": 6.8,
        "evaluate": 6.0,
        "watch": 4.0,
    }.get(status, 6.0)
    if blocker:
        complexity -= 1.0

    time_to_value = {
        "production": 8.8,
        "integrated": 8.4,
        "in_use": 8.0,
        "active_dev": 7.0,
        "evaluate": 6.8,
        "watch": 4.5,
    }.get(status, 6.0)
    if blocker:
        time_to_value -= 1.2

    moat = min(10.0, fit_score + _moat_bonus(str(item["seabridge_fit"])))
    if not license_ok:
        moat -= 1.5

    return {
        "architectural_alignment": round(_clamp(architectural), 1),
        "code_quality_maturity": round(_clamp(maturity), 1),
        "integration_complexity": round(_clamp(complexity), 1),
        "time_to_value": round(_clamp(time_to_value), 1),
        "strategic_moat": round(_clamp(moat), 1),
    }


def _action_priority(
    item: dict[str, Any],
    final_score: float,
    stale_risk: bool,
    low_star_risk: bool,
    license_ok: bool,
) -> float:
    priority = final_score
    if item.get("blocker"):
        priority += 1.4
    if "a2a" in str(item.get("name", "")).lower():
        priority += 1.2
    if stale_risk or low_star_risk or not license_ok:
        priority += 0.6
    if item.get("status") == "watch":
        priority -= 1.0
    return round(_clamp(priority), 2)


def _a2a_blocker(items: list[dict[str, Any]]) -> str | None:
    for item in items:
        if "a2a" in str(item.get("name", "")).lower() and item.get("blocker"):
            return str(item["blocker"])
    blockers = [item for item in items if item.get("blocker")]
    blockers.sort(key=lambda item: item["action_priority"], reverse=True)
    return str(blockers[0]["blocker"]) if blockers else None


def _drop_recommendation(items: list[dict[str, Any]]) -> str | None:
    candidates = [
        item
        for item in items
        if item.get("status") in {"watch", "evaluate"}
        or item.get("stale_risk")
        or not item.get("license_ok", True)
    ]
    if not candidates:
        return None
    candidates.sort(key=lambda item: (item["final_score"], -int(not item["license_ok"])))
    item = candidates[0]
    reason = "license risk" if not item["license_ok"] else "low strategic priority"
    if item["stale_risk"]:
        reason = "stale maintenance"
    return f"{item['name']} - {reason}; revisit only after the blocker clears."


def _write_reports(result: dict[str, Any], markdown: str, reports_dir: Path, today: date) -> None:
    reports_dir.mkdir(parents=True, exist_ok=True)
    stem = f"integration_scan_{today.strftime('%Y%m%d')}"
    (reports_dir / f"{stem}.json").write_text(
        json.dumps(result, indent=2, default=str),
        encoding="utf-8",
    )
    (reports_dir / f"{stem}.md").write_text(markdown, encoding="utf-8")


def _parse_github_datetime(value: str | None) -> datetime | None:
    if not value:
        return None
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def _days_since(value: datetime | None, today: date) -> int | None:
    if value is None:
        return None
    return (today - value.astimezone(timezone.utc).date()).days


def _retry_after_seconds(response: httpx.Response, attempt: int) -> float:
    retry_after = response.headers.get("retry-after")
    if retry_after and retry_after.isdigit():
        return float(retry_after)
    return min(8.0, 2.0**attempt)


def _slack_blocks(
    title: str,
    markdown: str,
    top_items: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    blocks: list[dict[str, Any]] = [
        {"type": "header", "text": {"type": "plain_text", "text": title[:150]}},
        {"type": "section", "text": {"type": "mrkdwn", "text": _truncate(markdown, 2800)}},
    ]
    for item in top_items:
        blocks.append(
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": (
                        f"*{item['name']}* - score {item['final_score']}\n"
                        f"{_truncate(str(item['action_brief']), 650)}"
                    ),
                },
            }
        )
    return blocks[:50]


def _truncate(value: str, limit: int) -> str:
    return value if len(value) <= limit else value[: limit - 1] + "..."


def _is_manual_repo(repo: str) -> bool:
    return "/" not in repo


def _is_manual_integration(item: dict[str, Any]) -> bool:
    return _is_manual_repo(str(item["repo"])) or str(item.get("license")) == "Commercial"


def _fit_bonus(value: str) -> float:
    return {
        "workflow_orchestration": 0.8,
        "agent_framework": 0.6,
        "tool_registry": 0.5,
        "data_layer": 0.4,
    }.get(value, 0.0)


def _moat_bonus(value: str) -> float:
    return {
        "workflow_orchestration": 0.9,
        "data_layer": 0.7,
        "agent_framework": 0.6,
        "tool_registry": 0.5,
    }.get(value, 0.0)


def _clamp(value: float, lower: float = 1.0, upper: float = 10.0) -> float:
    return max(lower, min(upper, value))


if __name__ == "__main__":
    main()
