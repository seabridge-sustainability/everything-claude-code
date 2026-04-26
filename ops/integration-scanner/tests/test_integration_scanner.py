from __future__ import annotations

import json
from datetime import date, datetime, timezone
from pathlib import Path

import pytest

import integration_scanner as scanner

_SCANNER_ROOT = Path(__file__).resolve().parent.parent


def _registry() -> list[dict[str, object]]:
    return [
        {
            "name": "A2A",
            "repo": "google/A2A",
            "type": "protocol",
            "license": "Apache-2.0",
            "status": "active_dev",
            "fit_score": 9.0,
            "use_case": "Agent collaboration protocol.",
            "blocker": "Acceptance tests not shipped",
            "seabridge_fit": "workflow_orchestration",
            "notes": "Blocking launch.",
        },
        {
            "name": "Old GPL Tool",
            "repo": "owner/old",
            "type": "library",
            "license": "GPL-3.0",
            "status": "evaluate",
            "fit_score": 7.5,
            "use_case": "Candidate tool wrapper.",
            "blocker": None,
            "seabridge_fit": "tool_registry",
            "notes": "Needs review.",
        },
        {
            "name": "Internal API",
            "repo": "internal",
            "type": "api",
            "license": "Commercial",
            "status": "production",
            "fit_score": 9.1,
            "use_case": "Commercial source.",
            "blocker": None,
            "seabridge_fit": "data_layer",
            "notes": "Manual verification.",
        },
    ]


class FakeGitHubClient:
    def fetch_repo_metadata(self, repo: str) -> scanner.GitHubMetadata:
        if repo == "google/A2A":
            return scanner.GitHubMetadata(
                stars=1200,
                pushed_at=datetime(2026, 4, 20, tzinfo=timezone.utc),
                license_spdx_id="Apache-2.0",
            )
        return scanner.GitHubMetadata(
            stars=50,
            pushed_at=datetime(2025, 12, 1, tzinfo=timezone.utc),
            license_spdx_id="GPL-3.0",
        )


class FakeBriefClient:
    def action_brief(self, item: dict[str, object]) -> str:
        return (
            "- Risk is concrete and sprint-relevant.\n"
            "- Ship the smallest useful validation now.\n"
            "- Run the exact scanner command today.\n"
            "- Compounds the A2A trust layer."
        )

    def executive_summary(self, scored_integrations: list[dict[str, object]]) -> str:
        return (
            "A2A needs action because certification blocks launch. Fix acceptance tests. "
            "Drop Old GPL Tool until license risk clears. Focus on A2A, FastMCP, evidence."
        )

    def score_discovery(
        self, discovery: scanner.DiscoveryResult, registry_names: list[str]
    ) -> scanner.ScoredDiscovery:
        score = 7.0 if "climate" in discovery.name.lower() else 5.0
        return scanner.ScoredDiscovery(
            discovery=discovery,
            relevance_score=score,
            fit_category="data_layer",
            rationale="Fake scoring for test.",
            recommended_action="evaluate" if score >= 6.0 else "watch",
        )


class FakeSlackClient:
    def __init__(self) -> None:
        self.calls: list[dict[str, object]] = []

    def post_markdown(
        self,
        channel: str,
        title: str,
        markdown: str,
        top_items: list[dict[str, object]],
        discoveries: dict[str, object] | None = None,
    ) -> None:
        self.calls.append(
            {
                "channel": channel,
                "title": title,
                "markdown": markdown,
                "top_items": top_items,
                "discoveries": discoveries,
            }
        )


def _run(registry: list[dict[str, object]] | None = None) -> dict[str, object]:
    return scanner.run_scan(
        registry=registry or _registry(),
        today=date(2026, 4, 25),
        github_client=FakeGitHubClient(),
        brief_client=FakeBriefClient(),
        slack_client=None,
        reports_dir=None,
    )


def test_scan_flags_stale_license_low_stars_and_skips_internal() -> None:
    result = _run()

    by_name = {item["name"]: item for item in result["integrations"]}

    assert result["total_tracked"] == 3
    assert result["blockers"] == 1
    assert result["stale_flags"] == 1
    assert result["license_flags"] == 2
    assert result["a2a_blocker"] == "Acceptance tests not shipped"

    assert by_name["A2A"]["license_ok"] is True
    assert by_name["Old GPL Tool"]["stale_risk"] is True
    assert by_name["Old GPL Tool"]["low_star_risk"] is True
    assert by_name["Old GPL Tool"]["license_ok"] is False
    assert by_name["Internal API"]["github_verified_manually"] is True
    assert by_name["Internal API"]["github_stars"] is None


def test_run_scan_writes_json_markdown_and_posts_slack(tmp_path: Path) -> None:
    slack = FakeSlackClient()

    result = scanner.run_scan(
        registry=_registry(),
        today=date(2026, 4, 25),
        github_client=FakeGitHubClient(),
        brief_client=FakeBriefClient(),
        slack_client=slack,
        reports_dir=tmp_path,
    )

    json_path = tmp_path / "integration_scan_20260425.json"
    markdown_path = tmp_path / "integration_scan_20260425.md"

    assert json_path.exists()
    assert markdown_path.exists()
    assert json.loads(json_path.read_text(encoding="utf-8"))["run_date"] == "2026-04-25"
    assert "Integration Scan - 2026-04-25" in markdown_path.read_text(encoding="utf-8")
    assert result["top_3_this_week"][0] == "A2A"
    assert slack.calls[0]["channel"] == "#integrations-radar"
    assert slack.calls[0]["top_items"]


def test_load_registry_validates_required_fields(tmp_path: Path) -> None:
    path = tmp_path / "integrations.json"
    path.write_text(json.dumps([{"name": "Incomplete"}]), encoding="utf-8")

    with pytest.raises(ValueError, match="missing required fields"):
        scanner.load_registry(path)


def test_load_registry_rejects_non_numeric_fit_score(tmp_path: Path) -> None:
    entry = {field: "x" for field in scanner.REQUIRED_FIELDS}
    entry["fit_score"] = "high"
    entry["status"] = "watch"
    path = tmp_path / "integrations.json"
    path.write_text(json.dumps([entry]), encoding="utf-8")

    with pytest.raises(ValueError, match="fit_score must be numeric"):
        scanner.load_registry(path)


def test_load_registry_rejects_out_of_range_fit_score(tmp_path: Path) -> None:
    entry = {field: "x" for field in scanner.REQUIRED_FIELDS}
    entry["fit_score"] = 15.0
    entry["status"] = "watch"
    path = tmp_path / "integrations.json"
    path.write_text(json.dumps([entry]), encoding="utf-8")

    with pytest.raises(ValueError, match="fit_score must be between 1 and 10"):
        scanner.load_registry(path)


def test_load_registry_rejects_unknown_status(tmp_path: Path) -> None:
    entry = {field: "x" for field in scanner.REQUIRED_FIELDS}
    entry["fit_score"] = 5.0
    entry["status"] = "unknown_status"
    path = tmp_path / "integrations.json"
    path.write_text(json.dumps([entry]), encoding="utf-8")

    with pytest.raises(ValueError, match="unknown status"):
        scanner.load_registry(path)


def test_load_registry_accepts_real_data() -> None:
    registry = scanner.load_registry(_SCANNER_ROOT / "data" / "integrations.json")
    assert len(registry) >= 1
    assert all(isinstance(item, dict) for item in registry)


def test_render_markdown_includes_all_sections() -> None:
    result = _run()
    markdown = scanner.render_markdown(result)

    assert "# Integration Scan - 2026-04-25" in markdown
    assert "## Executive Summary" in markdown
    assert "## Top 3 This Week" in markdown
    assert "## A2A Launch Blocker" in markdown
    assert "## Drop Recommendation" in markdown
    assert "## Flags" in markdown
    for name in result["top_3_this_week"]:
        assert f"### {name}" in markdown


def test_blocked_integration_not_recommended_this_week() -> None:
    result = _run()
    by_name = {item["name"]: item for item in result["integrations"]}

    assert by_name["A2A"].get("blocker")
    assert by_name["A2A"]["recommended_this_week"] is False


def test_drop_recommendation_present() -> None:
    result = _run()
    drop = result["drop_recommendation"]
    assert drop is not None
    assert "Old GPL Tool" in drop


def test_drop_recommendation_none_when_all_production() -> None:
    registry = [
        {
            "name": "Prod Tool",
            "repo": "internal",
            "type": "api",
            "license": "MIT",
            "status": "production",
            "fit_score": 9.0,
            "use_case": "Core API.",
            "blocker": None,
            "seabridge_fit": "data_layer",
            "notes": "Stable.",
        },
    ]
    result = _run(registry)
    assert result["drop_recommendation"] is None


def test_create_brief_client_dry_run() -> None:
    client = scanner.create_brief_client("dry-run")
    assert isinstance(client, scanner.DryRunBriefClient)


def test_create_brief_client_auto_no_keys_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)

    with pytest.raises(RuntimeError, match="No LLM provider available"):
        scanner.create_brief_client("auto")


def test_create_brief_client_unknown_provider() -> None:
    with pytest.raises(ValueError, match="Unknown provider"):
        scanner.create_brief_client("nonexistent")


# ---------------------------------------------------------------------------
# Discovery engine tests
# ---------------------------------------------------------------------------


def _sample_discoveries() -> list[scanner.DiscoveryResult]:
    return [
        scanner.DiscoveryResult(
            name="climate-risk-tool",
            repo="org/climate-risk-tool",
            url="https://github.com/org/climate-risk-tool",
            description="Climate risk assessment framework for ESG reporting",
            source="github",
            stars=800,
            license_spdx_id="MIT",
            topics=("climate", "esg"),
        ),
        scanner.DiscoveryResult(
            name="carbon-tracker",
            repo="org/carbon-tracker",
            url="https://github.com/org/carbon-tracker",
            description="GHG emissions tracking tool",
            source="github",
            stars=300,
            license_spdx_id="Apache-2.0",
        ),
        scanner.DiscoveryResult(
            name="random-unrelated",
            repo="org/random-unrelated",
            url="https://github.com/org/random-unrelated",
            description="A chat widget library",
            source="tavily",
            stars=50,
        ),
    ]


class FakeGitHubSearchClient:
    def __init__(self, results: list[scanner.DiscoveryResult] | None = None) -> None:
        self._results = results or []
        self.call_count = 0

    def search_repositories(self, query: str) -> list[scanner.DiscoveryResult]:
        self.call_count += 1
        return self._results


class FakeTavilySearchClient:
    def __init__(self, results: list[scanner.DiscoveryResult] | None = None) -> None:
        self._results = results or []

    def search(self, query: str) -> list[scanner.DiscoveryResult]:
        return self._results


class FakeGoogleSearchClient:
    def __init__(self, results: list[scanner.DiscoveryResult] | None = None) -> None:
        self._results = results or []

    def search(self, query: str) -> list[scanner.DiscoveryResult]:
        return self._results


def test_deduplicate_removes_registry_matches() -> None:
    discoveries = [
        scanner.DiscoveryResult(
            name="LangGraph",
            repo="langchain-ai/langgraph",
            url="https://github.com/langchain-ai/langgraph",
            description="Agent framework",
            source="github",
        ),
        scanner.DiscoveryResult(
            name="new-tool",
            repo="org/new-tool",
            url="https://github.com/org/new-tool",
            description="New tool",
            source="github",
        ),
    ]
    registry = [{"name": "LangGraph", "repo": "langchain-ai/langgraph", "type": "framework"}]
    result = scanner._deduplicate_discoveries(discoveries, registry)
    assert len(result) == 1
    assert result[0].name == "new-tool"


def test_deduplicate_removes_cross_source_dupes() -> None:
    d1 = scanner.DiscoveryResult(
        name="tool-a",
        repo="org/tool-a",
        url="https://github.com/org/tool-a",
        description="Tool A",
        source="github",
    )
    d2 = scanner.DiscoveryResult(
        name="Tool A page",
        repo="org/tool-a",
        url="https://example.com/tool-a",
        description="Tool A from web",
        source="tavily",
    )
    result = scanner._deduplicate_discoveries([d1, d2], [])
    assert len(result) == 1
    assert result[0].source == "github"


def test_deduplicate_removes_name_matches() -> None:
    discoveries = [
        scanner.DiscoveryResult(
            name="Cecil SDK (Wagner)",
            repo="some/new-repo",
            url="https://github.com/some/new-repo",
            description="Geo risk",
            source="github",
        ),
    ]
    registry = [{"name": "Cecil SDK (Wagner)", "repo": "internal", "type": "api"}]
    result = scanner._deduplicate_discoveries(discoveries, registry)
    assert len(result) == 0


def test_run_discovery_scores_and_filters() -> None:
    samples = _sample_discoveries()
    gh = FakeGitHubSearchClient(samples[:2])
    tavily = FakeTavilySearchClient([samples[2]])

    result = scanner.run_discovery(
        registry=_registry(),
        scorer=FakeBriefClient(),
        github_search=gh,
        tavily_search=tavily,
        sources=["github", "tavily"],
    )

    assert result["total_raw"] >= 2
    assert result["unique_after_dedup"] >= 2
    assert isinstance(result["top_discoveries"], list)
    assert result["auto_added"] == 0


def test_run_discovery_no_sources_returns_empty() -> None:
    result = scanner.run_discovery(
        registry=_registry(),
        scorer=FakeBriefClient(),
        sources=["github"],
    )
    assert result["total_raw"] == 0
    assert result["unique_after_dedup"] == 0
    assert result["above_threshold"] == 0
    assert result["top_discoveries"] == []


def test_auto_add_to_registry_writes_json(tmp_path: Path) -> None:
    registry_path = tmp_path / "integrations.json"
    registry: list[dict[str, object]] = []
    registry_path.write_text(json.dumps(registry), encoding="utf-8")

    scored = [
        scanner.ScoredDiscovery(
            discovery=scanner.DiscoveryResult(
                name="high-scorer",
                repo="org/high-scorer",
                url="https://github.com/org/high-scorer",
                description="Top ESG tool",
                source="github",
                stars=1000,
                license_spdx_id="MIT",
            ),
            relevance_score=8.5,
            fit_category="data_layer",
            rationale="Strong ESG fit.",
            recommended_action="integrate",
        ),
        scanner.ScoredDiscovery(
            discovery=scanner.DiscoveryResult(
                name="low-scorer",
                repo="org/low-scorer",
                url="https://github.com/org/low-scorer",
                description="Not relevant",
                source="github",
            ),
            relevance_score=4.0,
            fit_category="tool_registry",
            rationale="Low relevance.",
            recommended_action="skip",
        ),
    ]

    added = scanner._auto_add_to_registry(scored, registry_path, registry)
    assert len(added) == 1
    assert added[0]["name"] == "high-scorer"
    assert added[0]["status"] == "watch"

    persisted = json.loads(registry_path.read_text(encoding="utf-8"))
    assert any(e["name"] == "high-scorer" for e in persisted)
    assert not any(e["name"] == "low-scorer" for e in persisted)


def test_dry_run_score_discovery_keyword_matching() -> None:
    client = scanner.DryRunBriefClient()
    discovery = scanner.DiscoveryResult(
        name="ESG Climate Risk",
        repo="org/esg-climate",
        url="https://github.com/org/esg-climate",
        description="Climate risk assessment for ESG sustainability and TCFD disclosure",
        source="github",
        stars=600,
        license_spdx_id="MIT",
    )
    result = client.score_discovery(discovery, ["LangGraph"])
    assert result.relevance_score >= 6.0
    assert result.recommended_action in {"evaluate", "integrate"}
    assert "Keyword match" in result.rationale


def test_dry_run_score_discovery_low_relevance() -> None:
    client = scanner.DryRunBriefClient()
    discovery = scanner.DiscoveryResult(
        name="Generic Chat Widget",
        repo="org/chat-widget",
        url="https://github.com/org/chat-widget",
        description="A simple chat widget for websites",
        source="github",
        stars=30,
    )
    result = client.score_discovery(discovery, [])
    assert result.relevance_score < 6.0
    assert result.recommended_action == "watch"


def test_render_markdown_includes_discoveries() -> None:
    result = _run()
    result["discoveries"] = {
        "total_raw": 20,
        "unique_after_dedup": 12,
        "above_threshold": 3,
        "auto_added": 1,
        "auto_added_names": ["climate-tool"],
        "top_discoveries": [
            {
                "name": "climate-tool",
                "repo": "org/climate-tool",
                "url": "https://github.com/org/climate-tool",
                "source": "github",
                "stars": 500,
                "relevance_score": 8.2,
                "fit_category": "data_layer",
                "rationale": "Strong climate risk fit.",
                "recommended_action": "evaluate",
            },
        ],
    }
    markdown = scanner.render_markdown(result)
    assert "## Discoveries" in markdown
    assert "20 raw results" in markdown
    assert "12 unique after dedup" in markdown
    assert "climate-tool" in markdown
    assert "Auto-added to registry: climate-tool" in markdown


def test_render_markdown_no_discoveries_section_when_empty() -> None:
    result = _run()
    markdown = scanner.render_markdown(result)
    assert "## Discoveries" not in markdown


def test_slack_blocks_include_discoveries() -> None:
    discoveries = {
        "top_discoveries": [
            {
                "name": "esg-api",
                "stars": 1200,
                "relevance_score": 8.5,
                "recommended_action": "evaluate",
            },
        ],
    }
    blocks = scanner._slack_blocks(
        title="Test Scan",
        markdown="Summary text",
        top_items=[],
        discoveries=discoveries,
    )
    block_texts = [
        b.get("text", {}).get("text", "")
        for b in blocks
        if b.get("type") in {"section", "header"}
    ]
    assert any("New Discoveries" in t for t in block_texts)
    assert any("esg-api" in t for t in block_texts)


def test_slack_blocks_no_discoveries_section_when_none() -> None:
    blocks = scanner._slack_blocks(
        title="Test Scan",
        markdown="Summary text",
        top_items=[],
        discoveries=None,
    )
    block_texts = [
        b.get("text", {}).get("text", "")
        for b in blocks
        if b.get("type") == "header"
    ]
    assert not any("Discoveries" in t for t in block_texts)


def test_run_scan_passes_discoveries_to_slack(tmp_path: Path) -> None:
    slack = FakeSlackClient()
    disc = {
        "total_raw": 5,
        "unique_after_dedup": 3,
        "above_threshold": 1,
        "auto_added": 0,
        "auto_added_names": [],
        "top_discoveries": [
            {
                "name": "test-discovery",
                "relevance_score": 7.0,
                "recommended_action": "evaluate",
                "rationale": "Relevant to ESG data layer.",
                "source": "github",
                "url": "https://github.com/test/test-discovery",
                "stars": 120,
            },
        ],
    }
    result = scanner.run_scan(
        registry=_registry(),
        today=date(2026, 4, 25),
        github_client=FakeGitHubClient(),
        brief_client=FakeBriefClient(),
        slack_client=slack,
        reports_dir=tmp_path,
        discoveries=disc,
    )
    assert result["discoveries"] == disc
    assert slack.calls[0]["discoveries"] == disc
