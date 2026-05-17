param(
    [string]$WorkspaceRoot = "C:\Users\adelm\SeaBridgeAI"
)

$ErrorActionPreference = "Stop"

$checks = @(
    @{ Path = "everything-claude-code\protocols\GOAL_PROTOCOL.md"; Pattern = "/goal" },
    @{ Path = "everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md"; Pattern = "/goal" },
    @{ Path = "everything-claude-code\docs\GOAL_PROTOCOL_DEFAULT.md"; Pattern = "Canonical source" },
    @{ Path = "everything-claude-code\skills\goal-default\SKILL.md"; Pattern = "Definition of Done" },
    @{ Path = "everything-claude-code\.agents\skills\goal-default\SKILL.md"; Pattern = "canonical SeaBridgeAI skill" },
    @{ Path = "everything-claude-code\SEABRIDGE_CODING_AGENT_SYSTEM.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "everything-claude-code\AGENTS.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "everything-claude-code\CLAUDE.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "everything-claude-code\AGENT_SKILLS.md"; Pattern = "goal-default" },
    @{ Path = "everything-claude-code\docs\SPECKIT_GSD_INTEGRATION.md"; Pattern = "Goal Protocol" },
    @{ Path = "everything-claude-code\workflows\gsd-controlled-project.md"; Pattern = "Goal Protocol" },
    @{ Path = "manageesg-backend\AGENTS.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "manageesg-backend\CLAUDE.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "manageesg-frontend\AGENTS.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "manageesg-frontend\CLAUDE.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "openseabri\AGENTS.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "openseabri\CLAUDE.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "shared-agent-skills\README.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "shared-agent-skills\CLAUDE.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "climada-stack\AGENTS.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "climada-stack\CLAUDE.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "autoresearch\AGENTS.md"; Pattern = "Goal Protocol Default" },
    @{ Path = "autoresearch\CLAUDE.md"; Pattern = "Goal Protocol Default" }
)

$failures = @()

foreach ($check in $checks) {
    $fullPath = Join-Path $WorkspaceRoot $check.Path
    if (-not (Test-Path -LiteralPath $fullPath)) {
        $failures += "Missing file: $($check.Path)"
        continue
    }

    $match = Select-String -LiteralPath $fullPath -Pattern $check.Pattern -SimpleMatch -Quiet
    if (-not $match) {
        $failures += "Missing pattern '$($check.Pattern)' in $($check.Path)"
    }
}

if ($failures.Count -gt 0) {
    Write-Host "Goal Protocol validation failed:"
    foreach ($failure in $failures) {
        Write-Host " - $failure"
    }
    exit 1
}

Write-Host "Goal Protocol validation passed for $($checks.Count) files."
