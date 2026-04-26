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
_GITHUB_URL_RE = re.compile(r"github\.com/([A-Za-z0-9_.\-]+/[A-Za-z0-9_.\-]+)")

# ---------------------------------------------------------------------------
# Discovery engine constants
# ---------------------------------------------------------------------------

DISCOVERY_QUERIES: dict[str, list[str]] = {
    "github": [
        "ESG sustainability framework python",
        "climate risk assessment tool",
        "TNFD disclosure nature risk",
        "carbon accounting API",
        "sustainability reporting CSRD",
        "biodiversity impact assessment",
        "water stress risk model",
        "green building certification API",
        "supply chain ESG scoring",
        "GHG emissions calculation",
        "sustainable finance taxonomy",
        "MCP server sustainability",
        "LangGraph agent ESG",
        "TCFD climate scenario analysis",
        "environmental compliance monitoring",
    ],
    "tavily": [
        "new ESG sustainability data API 2026",
        "open source climate risk modeling framework",
        "TNFD TCFD compliance automation tool",
        "sustainability AI agent tool release",
        "nature-based solutions assessment dataset",
    ],
    "google": [
        "ESG sustainability API launch 2026",
        "open source climate risk model new",
        "sustainability data platform release",
        "environmental monitoring AI tool",
        "green finance technology API 2026",
    ],
}
DISCOVERY_GITHUB_MIN_STARS = 50
DISCOVERY_RELEVANCE_THRESHOLD = 6.0
DISCOVERY_AUTO_WATCH_THRESHOLD = 7.5


@dataclass(frozen=True)
class GitHubMetadata:
    stars: int | None
    pushed_at: datetime | None
    license_spdx_id: str | None
    verified_manually: bool = False
    error: str | None = None


@dataclass(frozen=True)
class DiscoveryResult:
    name: str
    repo: str | None
    url: str
    description: str
    source: str  # "github", "tavily", "google"
    stars: int | None = None
    license_spdx_id: str | None = None
    topics: tuple[str, ...] = ()
    pushed_at: datetime | None = None


@dataclass(frozen=True)
class ScoredDiscovery:
    discovery: DiscoveryResult
    relevance_score: float
    fit_category: str
    rationale: str
    recommended_action: str  # "integrate", "evaluate", "watch", "skip"


class GitHubClientProtocol(Protocol):
    def fetch_repo_metadata(self, repo: str) -> GitHubMetadata: ...


class BriefClientProtocol(Protocol):
    def action_brief(self, item: dict[str, Any]) -> str: ...

    def executive_summary(self, scored_integrations: list[dict[str, Any]]) -> str: ...


class DiscoveryScorerProtocol(Protocol):
    def score_discovery(self, discovery: DiscoveryResult, registry_names: list[str]) -> ScoredDiscovery: ...


class GitHubSearchClientProtocol(Protocol):
    def search_repositories(self, query: str) -> list[DiscoveryResult]: ...


class TavilySearchClientProtocol(Protocol):
    def search(self, query: str) -> list[DiscoveryResult]: ...


class GoogleSearchClientProtocol(Protocol):
    def search(self, query: str) -> list[DiscoveryResult]: ...


class SlackClientProtocol(Protocol):
    def post_markdown(
        self,
        channel: str,
        title: str,
        markdown: str,
        top_items: list[dict[str, Any]],
        discoveries: dict[str, Any] | None = None,
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


def _score_discovery_prompt(discovery: DiscoveryResult, registry_names: list[str]) -> tuple[str, str]:
    system = (
        "You are a principal engineer evaluating potential integrations for SeaBridgeAI "
        "(FastAPI + MongoDB + LangGraph + MCP, ESG/sustainability/climate risk platform). "
        "Score the discovery for relevance. Respond ONLY with valid JSON, no markdown."
    )
    user = (
        f"Evaluate this discovery for SeaBridgeAI integration:\n"
        f"Name: {discovery.name}\n"
        f"URL: {discovery.url}\n"
        f"Description: {discovery.description[:400]}\n"
        f"Source: {discovery.source}\n"
        f"Stars: {discovery.stars or 'N/A'}\n"
        f"License: {discovery.license_spdx_id or 'Unknown'}\n"
        f"Topics: {', '.join(discovery.topics) or 'None'}\n\n"
        f"Already tracked: {', '.join(registry_names)}\n\n"
        'Return JSON: {{"relevance_score": 1-10, "fit_category": '
        '"agent_framework"|"data_layer"|"tool_registry"|"workflow_orchestration", '
        '"rationale": "one sentence", "recommended_action": '
        '"integrate"|"evaluate"|"watch"|"skip"}}'
    )
    return system, user


def _parse_discovery_score(raw: str, discovery: DiscoveryResult) -> ScoredDiscovery:
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        match = re.search(r"\{[^}]+\}", raw, re.DOTALL)
        if match:
            parsed = json.loads(match.group())
        else:
            raise
    return ScoredDiscovery(
        discovery=discovery,
        relevance_score=_clamp(float(parsed.get("relevance_score", 5.0))),
        fit_category=parsed.get("fit_category", "data_layer"),
        rationale=parsed.get("rationale", ""),
        recommended_action=parsed.get("recommended_action", "evaluate"),
    )


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

    def score_discovery(self, discovery: DiscoveryResult, registry_names: list[str]) -> ScoredDiscovery:
        system, user = _score_discovery_prompt(discovery, registry_names)
        return _parse_discovery_score(self._message(system, user, 300), discovery)

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

    def score_discovery(self, discovery: DiscoveryResult, registry_names: list[str]) -> ScoredDiscovery:
        system, user = _score_discovery_prompt(discovery, registry_names)
        return _parse_discovery_score(self._message(system, user, 300), discovery)

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

    def score_discovery(self, discovery: DiscoveryResult, registry_names: list[str]) -> ScoredDiscovery:
        system, user = _score_discovery_prompt(discovery, registry_names)
        return _parse_discovery_score(self._message(system, user, 300), discovery)

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

    def score_discovery(self, discovery: DiscoveryResult, registry_names: list[str]) -> ScoredDiscovery:
        esg_keywords = {
            "esg", "sustainability", "climate", "carbon", "biodiversity", "nature",
            "risk", "tcfd", "tnfd", "ghg", "emission", "renewable", "taxonomy",
            "disclosure", "csrd", "water", "deforestation", "green", "environmental",
        }
        desc_lower = (discovery.description + " " + discovery.name).lower()
        keyword_hits = sum(1 for kw in esg_keywords if kw in desc_lower)
        base_score = min(10.0, 4.0 + keyword_hits * 0.6)
        if discovery.stars and discovery.stars > 500:
            base_score += 0.5
        if discovery.license_spdx_id in ALLOWED_LICENSES:
            base_score += 0.5
        action = "evaluate" if base_score >= DISCOVERY_RELEVANCE_THRESHOLD else "watch"
        if base_score >= DISCOVERY_AUTO_WATCH_THRESHOLD:
            action = "integrate"
        return ScoredDiscovery(
            discovery=discovery,
            relevance_score=round(_clamp(base_score), 1),
            fit_category="data_layer",
            rationale=f"Keyword match ({keyword_hits} hits). Dry-run scoring.",
            recommended_action=action,
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
        discoveries: dict[str, Any] | None = None,
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
                "blocks": _slack_blocks(title, markdown, top_items, discoveries),
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
    discoveries: dict[str, Any] | None = None,
) -> dict[str, Any]:
    scored_integrations = [
        _scan_integration(item, today, github_client, brief_client) for item in registry
    ]
    surfaced = [
        item for item in scored_integrations if item["final_score"] >= REPORT_THRESHOLD
    ]
    surfaced.sort(key=lambda item: item["action_priority"], reverse=True)
    top_3 = surfaced[:3]

    result: dict[str, Any] = {
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
    if discoveries is not None:
        result["discoveries"] = discoveries

    markdown = render_markdown(result)
    if reports_dir is not None:
        _write_reports(result, markdown, reports_dir, today)
    if slack_client is not None:
        slack_client.post_markdown(
            channel=slack_channel,
            title=f"Integration Scan - {today.isoformat()}",
            markdown=markdown,
            top_items=top_3,
            discoveries=discoveries,
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

    disc = result.get("discoveries")
    if disc and disc.get("top_discoveries"):
        lines.extend(["", "## Discoveries", ""])
        lines.append(
            f"Scanned {disc['total_raw']} raw results, "
            f"{disc['unique_after_dedup']} unique after dedup, "
            f"{disc['above_threshold']} above threshold."
        )
        if disc.get("auto_added", 0) > 0:
            lines.append(
                f"Auto-added to registry: {', '.join(disc['auto_added_names'])}."
            )
        lines.append("")
        for td in disc["top_discoveries"]:
            stars_str = f" ({td['stars']} stars)" if td.get("stars") else ""
            lines.append(
                f"- **{td['name']}**{stars_str} — "
                f"score {td['relevance_score']}, {td['recommended_action']}\n"
                f"  {td['rationale']}\n"
                f"  Source: {td['source']} | {td.get('url', '')}"
            )

    return "\n".join(lines).strip() + "\n"


# ---------------------------------------------------------------------------
# Discovery search clients
# ---------------------------------------------------------------------------


class GitHubSearchClient:
    def __init__(self, token: str | None = None, timeout: float = 15.0) -> None:
        headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }
        if token:
            headers["Authorization"] = f"Bearer {token}"
        self._client = httpx.Client(headers=headers, timeout=timeout, follow_redirects=True)
        self._has_token = bool(token)

    def search_repositories(self, query: str) -> list[DiscoveryResult]:
        url = f"{GITHUB_API}/search/repositories"
        params = {"q": query, "sort": "stars", "order": "desc", "per_page": 10}
        for attempt in range(3):
            response = self._client.get(url, params=params)
            if response.status_code in {403, 429}:
                wait = _retry_after_seconds(response, attempt)
                logger.warning("GitHub search rate-limited, retrying in {}s", wait)
                time.sleep(wait)
                continue
            response.raise_for_status()
            break
        else:
            logger.warning("GitHub search exhausted retries for query: {}", query)
            return []

        results: list[DiscoveryResult] = []
        for repo in response.json().get("items", []):
            stars = repo.get("stargazers_count", 0)
            if stars < DISCOVERY_GITHUB_MIN_STARS:
                continue
            pushed = _parse_github_datetime(repo.get("pushed_at"))
            license_info = repo.get("license") or {}
            results.append(
                DiscoveryResult(
                    name=repo.get("name", ""),
                    repo=repo.get("full_name", ""),
                    url=repo.get("html_url", ""),
                    description=repo.get("description") or "",
                    source="github",
                    stars=stars,
                    license_spdx_id=license_info.get("spdx_id"),
                    topics=tuple(repo.get("topics", [])),
                    pushed_at=pushed,
                )
            )
        return results


class TavilySearchClient:
    def __init__(self, api_key: str | None = None, timeout: float = 30.0) -> None:
        self._api_key = (api_key or os.environ.get("TAVILY_API_KEY", "")).strip()
        if not self._api_key:
            raise RuntimeError("TAVILY_API_KEY is required for Tavily discovery.")
        self._client = httpx.Client(timeout=timeout)

    def search(self, query: str) -> list[DiscoveryResult]:
        response = self._client.post(
            "https://api.tavily.com/search",
            json={
                "api_key": self._api_key,
                "query": query,
                "search_depth": "basic",
                "max_results": 10,
                "include_domains": [],
                "exclude_domains": [],
            },
        )
        response.raise_for_status()
        results: list[DiscoveryResult] = []
        for item in response.json().get("results", []):
            url = item.get("url", "")
            repo_match = _GITHUB_URL_RE.search(url)
            results.append(
                DiscoveryResult(
                    name=item.get("title", "")[:120],
                    repo=repo_match.group(1) if repo_match else None,
                    url=url,
                    description=item.get("content", "")[:500],
                    source="tavily",
                )
            )
        return results


class GoogleSearchClient:
    def __init__(
        self,
        api_key: str | None = None,
        cse_id: str | None = None,
        timeout: float = 15.0,
    ) -> None:
        self._api_key = (api_key or os.environ.get("GOOGLE_API_KEY", "")).strip()
        self._cse_id = (cse_id or os.environ.get("GOOGLE_CSE_ID", "")).strip()
        if not self._api_key or not self._cse_id:
            raise RuntimeError("GOOGLE_API_KEY and GOOGLE_CSE_ID required for Google discovery.")
        self._client = httpx.Client(timeout=timeout)

    def search(self, query: str) -> list[DiscoveryResult]:
        response = self._client.get(
            "https://www.googleapis.com/customsearch/v1",
            params={
                "key": self._api_key,
                "cx": self._cse_id,
                "q": query,
                "num": 10,
                "dateRestrict": "m3",
            },
        )
        response.raise_for_status()
        results: list[DiscoveryResult] = []
        for item in response.json().get("items", []):
            url = item.get("link", "")
            repo_match = _GITHUB_URL_RE.search(url)
            results.append(
                DiscoveryResult(
                    name=item.get("title", "")[:120],
                    repo=repo_match.group(1) if repo_match else None,
                    url=url,
                    description=item.get("snippet", "")[:500],
                    source="google",
                )
            )
        return results


# ---------------------------------------------------------------------------
# Discovery engine
# ---------------------------------------------------------------------------


def _deduplicate_discoveries(
    discoveries: list[DiscoveryResult],
    registry: list[dict[str, Any]],
) -> list[DiscoveryResult]:
    registry_repos = {
        str(item["repo"]).lower()
        for item in registry
        if item.get("repo") and not _is_manual_repo(str(item["repo"]))
    }
    registry_names = {str(item["name"]).lower() for item in registry}

    seen_repos: set[str] = set()
    seen_urls: set[str] = set()
    unique: list[DiscoveryResult] = []
    for d in discoveries:
        repo_key = d.repo.lower().rstrip("/") if d.repo else None
        if repo_key and repo_key in registry_repos:
            continue
        if d.name.lower() in registry_names:
            continue
        if repo_key:
            if repo_key in seen_repos:
                continue
            seen_repos.add(repo_key)
        url_key = d.url.lower().rstrip("/")
        if url_key in seen_urls:
            continue
        seen_urls.add(url_key)
        unique.append(d)
    return unique


def _auto_add_to_registry(
    scored: list[ScoredDiscovery],
    registry_path: Path,
    registry: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    added: list[dict[str, Any]] = []
    for sd in scored:
        if sd.relevance_score < DISCOVERY_AUTO_WATCH_THRESHOLD:
            continue
        if not sd.discovery.repo:
            continue
        entry = {
            "name": sd.discovery.name,
            "repo": sd.discovery.repo,
            "type": "library",
            "license": sd.discovery.license_spdx_id or "Unknown",
            "status": "watch",
            "fit_score": round(min(10.0, sd.relevance_score), 1),
            "use_case": sd.rationale[:200],
            "blocker": None,
            "seabridge_fit": sd.fit_category,
            "notes": f"Auto-discovered from {sd.discovery.source}. Needs manual review.",
        }
        registry.append(entry)
        added.append(entry)

    if added:
        registry_path.write_text(
            json.dumps(registry, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        logger.info("Auto-added {} discoveries to registry", len(added))
    return added


def run_discovery(
    registry: list[dict[str, Any]],
    scorer: DiscoveryScorerProtocol,
    github_search: GitHubSearchClientProtocol | None = None,
    tavily_search: TavilySearchClientProtocol | None = None,
    google_search: GoogleSearchClientProtocol | None = None,
    sources: list[str] | None = None,
    registry_path: Path | None = None,
    auto_watch: bool = False,
) -> dict[str, Any]:
    allowed = set(sources or ["github", "tavily", "google"])
    raw_discoveries: list[DiscoveryResult] = []

    if "github" in allowed and github_search is not None:
        for query in DISCOVERY_QUERIES["github"]:
            try:
                raw_discoveries.extend(github_search.search_repositories(query))
            except Exception:
                logger.warning("GitHub search failed for query: {}", query)
            time.sleep(2.5 if not getattr(github_search, "_has_token", False) else 1.0)

    if "tavily" in allowed and tavily_search is not None:
        for query in DISCOVERY_QUERIES["tavily"]:
            try:
                raw_discoveries.extend(tavily_search.search(query))
            except Exception:
                logger.warning("Tavily search failed for query: {}", query)

    if "google" in allowed and google_search is not None:
        for query in DISCOVERY_QUERIES["google"]:
            try:
                raw_discoveries.extend(google_search.search(query))
            except Exception:
                logger.warning("Google search failed for query: {}", query)

    unique = _deduplicate_discoveries(raw_discoveries, registry)
    registry_names = [str(item["name"]) for item in registry]
    scored: list[ScoredDiscovery] = []
    for d in unique:
        try:
            scored.append(scorer.score_discovery(d, registry_names))
        except Exception:
            logger.warning("Scoring failed for discovery: {}", d.name)

    scored.sort(key=lambda sd: sd.relevance_score, reverse=True)
    above_threshold = [sd for sd in scored if sd.relevance_score >= DISCOVERY_RELEVANCE_THRESHOLD]

    auto_added: list[dict[str, Any]] = []
    if auto_watch and registry_path is not None:
        auto_added = _auto_add_to_registry(above_threshold, registry_path, registry)

    return {
        "total_raw": len(raw_discoveries),
        "unique_after_dedup": len(unique),
        "scored": len(scored),
        "above_threshold": len(above_threshold),
        "auto_added": len(auto_added),
        "auto_added_names": [str(e["name"]) for e in auto_added],
        "top_discoveries": [
            {
                "name": sd.discovery.name,
                "repo": sd.discovery.repo,
                "url": sd.discovery.url,
                "source": sd.discovery.source,
                "stars": sd.discovery.stars,
                "relevance_score": sd.relevance_score,
                "fit_category": sd.fit_category,
                "rationale": sd.rationale,
                "recommended_action": sd.recommended_action,
            }
            for sd in above_threshold[:15]
        ],
    }


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
    parser.add_argument("--discover", action="store_true", help="Run discovery engine to find new integrations")
    parser.add_argument("--auto-watch", action="store_true", help="Auto-add high-scoring discoveries to registry")
    parser.add_argument(
        "--discover-sources",
        default="github,tavily,google",
        help="Comma-separated discovery sources (default: github,tavily,google)",
    )
    args = parser.parse_args()

    registry = load_registry(args.registry)
    github_token = os.environ.get("GITHUB_TOKEN")
    github_client = GitHubClient(token=github_token)
    brief_client: BriefClientProtocol = (
        DryRunBriefClient() if args.dry_run else create_brief_client(args.provider, args.model)
    )
    slack_client = None if args.skip_slack else SlackClient()

    discoveries = None
    if args.discover:
        sources = [s.strip() for s in args.discover_sources.split(",") if s.strip()]
        scorer: DiscoveryScorerProtocol = brief_client  # type: ignore[assignment]

        github_search: GitHubSearchClientProtocol | None = None
        tavily_search: TavilySearchClientProtocol | None = None
        google_search: GoogleSearchClientProtocol | None = None

        if "github" in sources:
            github_search = GitHubSearchClient(token=github_token)
        if "tavily" in sources:
            try:
                tavily_search = TavilySearchClient()
            except RuntimeError:
                logger.warning("TAVILY_API_KEY not set, skipping Tavily discovery")
        if "google" in sources:
            try:
                google_search = GoogleSearchClient()
            except RuntimeError:
                logger.warning("GOOGLE_API_KEY/GOOGLE_CSE_ID not set, skipping Google discovery")

        discoveries = run_discovery(
            registry=registry,
            scorer=scorer,
            github_search=github_search,
            tavily_search=tavily_search,
            google_search=google_search,
            sources=sources,
            registry_path=args.registry if args.auto_watch else None,
            auto_watch=args.auto_watch,
        )
        logger.info(
            "Discovery complete: {} raw, {} unique, {} above threshold, {} auto-added",
            discoveries["total_raw"],
            discoveries["unique_after_dedup"],
            discoveries["above_threshold"],
            discoveries["auto_added"],
        )

    result = run_scan(
        registry=registry,
        today=date.today(),
        github_client=github_client,
        brief_client=brief_client,
        slack_client=slack_client,
        reports_dir=args.reports_dir,
        slack_channel=args.slack_channel,
        discoveries=discoveries,
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
    discoveries: dict[str, Any] | None = None,
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
    if discoveries and discoveries.get("top_discoveries"):
        blocks.append({"type": "divider"})
        blocks.append(
            {
                "type": "header",
                "text": {"type": "plain_text", "text": "New Discoveries"},
            }
        )
        disc_lines = []
        for td in discoveries["top_discoveries"][:5]:
            stars = f" ({td['stars']}★)" if td.get("stars") else ""
            disc_lines.append(
                f"• *{td['name']}*{stars} — score {td['relevance_score']}, _{td['recommended_action']}_"
            )
        blocks.append(
            {
                "type": "section",
                "text": {"type": "mrkdwn", "text": "\n".join(disc_lines)},
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
