param(
    [Parameter(Mandatory = $true)]
    [string]$TargetRepo,

    [switch]$DryRun,
    [switch]$Backup,
    [switch]$IncludeOptionalAgentFiles,
    [switch]$IncludeAutoLoop,
    [switch]$IncludeAntiStuckRules,
    [switch]$IncludeCompletionEvidence
)

$ErrorActionPreference = "Stop"

$MarkerStart = "<!-- SEABRIDGE_GOAL_PROTOCOL_START -->"
$MarkerEnd = "<!-- SEABRIDGE_GOAL_PROTOCOL_END -->"

function New-GoalBlock {
    $parts = New-Object System.Collections.Generic.List[string]
    $parts.Add($MarkerStart)
    $parts.Add("## /goal Default Operating Mode")
    $parts.Add("")
    $parts.Add("All SeaBridgeAI coding-agent tasks default to `/goal`.")
    $parts.Add("")
    $parts.Add("Before implementation, establish a persistent execution goal, Definition of Done, validation plan, affected systems, dependencies, risks, expected artifacts, and likely edge cases. Continue the execution loop until the DoD is validated or a hard blocker is documented.")
    $parts.Add("")

    if ($IncludeAutoLoop) {
        $parts.Add("### /goal and Auto-Loop Are the Same Mode")
        $parts.Add("")
        $parts.Add("/goal is the user-facing command; auto-loop is the autonomous persistent execution behavior. The agent must not return early after code generation, must not claim completion until validation passes, and must keep working until the Definition of Done is satisfied or a hard blocker is proven. If the task is multi-phase (touches more than 2 files, adds a dependency, requires a schema/migration change, or spans more than one repo), state the expected phases and validation steps before starting. If a non-trivial task finishes unusually quickly, include evidence explaining why it was genuinely small or already validated.")
        $parts.Add("")
    }

    $parts.Add("Canonical protocol: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md")
    $parts.Add("")
    $parts.Add("Compact form: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md")
    $parts.Add("")
    $parts.Add("Do not claim completion from code edits, generated files, or partial tests. Completion requires validated behavior, checked integrations, regression coverage proportional to risk, and documented skipped checks or blockers.")
    $parts.Add("")

    if ($IncludeCompletionEvidence) {
        $parts.Add("### Completion Evidence Required")
        $parts.Add("")
        $parts.Add("Every final report must include files changed, commands run, tests run, validation results, errors encountered, fixes applied, unverified items, remaining risks, and whether the Definition of Done is satisfied. If no tests were run, state why tests were not run, what validation was substituted, and what risk remains. The phrase `"complete`" is prohibited unless accompanied by validation evidence.")
        $parts.Add("")
    }

    if ($IncludeAntiStuckRules) {
        $parts.Add("### Anti-Stuck Loop Rule")
        $parts.Add("")
        $parts.Add("Timeout/stagnation rule: if a command or approach fails twice, do not repeat it blindly. Inspect logs, change strategy, isolate the problem, reduce scope, use a different validation path, and document the blocker if unresolved. If a process hangs or becomes a hung process, stop it safely, check logs, run a smaller command, verify the environment, and continue with an alternate route.")
        $parts.Add("")
    }

    $parts.Add($MarkerEnd)
    return ($parts -join "`r`n")
}

$GoalBlock = New-GoalBlock

<#
$MarkerStart
## /goal Default Operating Mode

All SeaBridgeAI coding-agent tasks default to `/goal`.

Before implementation, establish a persistent execution goal, Definition of Done, validation plan, affected systems, dependencies, risks, expected artifacts, and likely edge cases. Continue the execution loop until the DoD is validated or a hard blocker is documented.

Canonical protocol: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md`

Compact form: `C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL_SHORT.md`

Do not claim completion from code edits, generated files, or partial tests. Completion requires validated behavior, checked integrations, regression coverage proportional to risk, and documented skipped checks or blockers.
$MarkerEnd
"@
#>

function Test-AgentInstructionFile {
    param([string]$Path)
    $name = [System.IO.Path]::GetFileName($Path)
    return $name -in @("AGENTS.md", "CLAUDE.md", "CODEX.md", "GEMINI.md", "OPENCODE.md")
}

function Get-Heading {
    param([string]$FileName)
    switch ($FileName) {
        "AGENTS.md" { return "# SeaBridgeAI Coding Agent Instructions" }
        "CLAUDE.md" { return "# SeaBridgeAI Claude Code Instructions" }
        "CODEX.md" { return "# SeaBridgeAI Codex Instructions" }
        "GEMINI.md" { return "# SeaBridgeAI Gemini Instructions" }
        "OPENCODE.md" { return "# SeaBridgeAI OpenCode Instructions" }
        default { return "# SeaBridgeAI Agent Instructions" }
    }
}

function Update-Content {
    param(
        [string]$Existing,
        [string]$FileName
    )

    if ([string]::IsNullOrWhiteSpace($Existing)) {
        return "$(Get-Heading $FileName)`r`n`r`n$GoalBlock`r`n"
    }

    $startCount = ([regex]::Matches($Existing, [regex]::Escape($MarkerStart))).Count
    $endCount = ([regex]::Matches($Existing, [regex]::Escape($MarkerEnd))).Count
    if ($startCount -ne $endCount) {
        throw "Mismatched goal protocol markers in $FileName"
    }

    if ($Existing.Contains($MarkerStart) -and $Existing.Contains($MarkerEnd)) {
        $pattern = [regex]::Escape($MarkerStart) + ".*?" + [regex]::Escape($MarkerEnd)
        return [regex]::Replace($Existing, $pattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $GoalBlock }, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    }

    $normalized = $Existing -replace "`r`n", "`n"
    $lines = $normalized -split "`n", 2
    if ($lines.Count -gt 1 -and $lines[0] -match "^#\s+") {
        return "$($lines[0])`r`n`r`n$GoalBlock`r`n`r`n$($lines[1] -replace "`n", "`r`n")"
    }

    return "$GoalBlock`r`n`r`n$($Existing)"
}

if (-not (Test-Path -LiteralPath $TargetRepo -PathType Container)) {
    throw "Target repo does not exist: $TargetRepo"
}

$required = @("AGENTS.md", "CLAUDE.md")
$optional = @("CODEX.md", "GEMINI.md", "OPENCODE.md")
$files = @()
$files += $required
if ($IncludeOptionalAgentFiles) {
    $files += $optional
}

$report = @()

foreach ($file in $files) {
    $path = Join-Path $TargetRepo $file
    $exists = Test-Path -LiteralPath $path -PathType Leaf
    $old = ""
    if ($exists) {
        # Read as UTF-8 explicitly: PS 5.1's default ANSI read corrupts
        # multibyte characters in BOM-less UTF-8 files.
        $old = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    }

    $new = Update-Content -Existing $old -FileName $file
    $changed = (-not $exists) -or ($old -ne $new)

    $report += [pscustomobject]@{
        File = $path
        Exists = $exists
        Changed = $changed
        DryRun = [bool]$DryRun
    }

    if ($changed -and -not $DryRun) {
        if ($exists -and $Backup) {
            $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
            Copy-Item -LiteralPath $path -Destination "$path.goal-backup-$stamp" -Force
        }
        [System.IO.File]::WriteAllText($path, $new, (New-Object System.Text.UTF8Encoding($false)))
    }
}

$report | Format-Table -AutoSize | Out-String
