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


class FakeSlackClient:
    def __init__(self) -> None:
        self.calls: list[dict[str, object]] = []

    def post_markdown(self, channel: str, title: str, markdown: str, top_items: list[dict[str, object]]) -> None:
        self.calls.append(
            {
                "channel": channel,
                "title": title,
                "markdown": markdown,
                "top_items": top_items,
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
