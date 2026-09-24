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
    # Revision 2026-09-24: one compact block replaces the /goal + auto-loop +
    # completion-evidence + anti-stuck sections. The -Include* switches are kept
    # for caller compatibility and no longer change the output; their content is
    # folded into the bullets below. Rationale:
    # docs/reports/agent-system-review/2026-09-24-agent-system-modernization.md
    $parts = New-Object System.Collections.Generic.List[string]
    $parts.Add($MarkerStart)
    $parts.Add("## Goal Protocol Default")
    $parts.Add("")
    $parts.Add("For non-trivial work, settle what done means and how you will prove it before editing, then keep going until it is proven or you reach a real blocker. ``/goal`` in a prompt asks for exactly this.")
    $parts.Add("")
    $parts.Add("- **Scope from evidence.** Build what the request needs, grounded in the current code, git history, tests, and the current plan. Do not invent product functionality or sustainability, emissions, climate, or financial data; preserve source, provenance, and units. Treat memory, handoffs, and old summaries as leads to verify, not facts.")
    $parts.Add("- **Done means** the requested behavior works, tests that would catch its failure pass, there are no unexplained regressions, and you know the state of the tree. Scale checks to risk: tenant isolation, auth, persistence, AI grounding, and cross-repo contracts warrant broader tests. Do not re-run checks nothing has changed since.")
    $parts.Add("- **When stuck,** change strategy after two failures of the same approach. Keep working on independent parts; stop only at an approval boundary or an external dependency, and name it.")
    $parts.Add("- **Report** what changed, how it was verified, what remains or is risky, and any check you skipped and why. Never call unverified work done.")
    $parts.Add("")
    $parts.Add("Full protocol, for long multi-phase work: C:\Users\adelm\SeaBridgeAI\everything-claude-code\protocols\GOAL_PROTOCOL.md")
    $parts.Add($MarkerEnd)
    return ($parts -join "`r`n")
}

$GoalBlock = New-GoalBlock

# A CLAUDE.md that imports AGENTS.md (a line that is exactly `@AGENTS.md`)
# already receives the block through the import; stamping it again would load
# it twice. Such files get any stale block removed instead.
function Test-ImportsAgents {
    param([string]$Text)
    return [regex]::IsMatch($Text, '(?m)^@AGENTS\.md\s*$')
}

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

    if ($file -eq "CLAUDE.md" -and (Test-ImportsAgents $old)) {
        $pattern = '(\r?\n)*' + [regex]::Escape($MarkerStart) + ".*?" + [regex]::Escape($MarkerEnd)
        $new = [regex]::Replace($old, $pattern, "", [System.Text.RegularExpressions.RegexOptions]::Singleline)
    }
    else {
        $new = Update-Content -Existing $old -FileName $file
    }
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
