param(
    [string]$Root = "C:\Users\adelm\SeaBridgeAI",
    [string]$Output = "C:\Users\adelm\SeaBridgeAI\everything-claude-code\reports\goal-protocol-diagnostics.md"
)

$ErrorActionPreference = "Stop"

$InstructionNames = @(
    "AGENT.md", "AGENTS.md", "CLAUDE.md", "CODEX.md", "GEMINI.md", "OPENCODE.md",
    ".cursorrules", ".clinerules", ".windsurfrules", "opencode.jsonc"
)

$TopLevelRepos = @(
    "everything-claude-code",
    "manageesg-backend",
    "manageesg-frontend",
    "openseabri",
    "seabridge-dev",
    "_upstream",
    "autoresearch",
    "climada-stack"
)

$SkipDirNames = @(
    ".git", "node_modules", ".next", "dist", "build", "coverage", ".venv", "venv",
    "venv312", "venv312_backup", "__pycache__", ".pytest_cache", ".mypy_cache",
    "graphify-out", ".falkordb-data", "vendor", "external"
)

$PatternSets = @{
    Goal = @("/goal", "goal")
    AutoLoop = @("auto-loop", "autoloop", "autonomous loop", "persistent execution", "continuous execution")
    GoalAutoUnified = @("/goal and Auto-Loop Are the Same Mode", "auto-loop is the execution behavior", "auto-loop is not a separate mode")
    DoD = @("Definition of Done", "DoD")
    Validation = @("validation", "validate", "verify", "verification", "tests run", "validation results")
    StuckRecovery = @("stuck", "retry", "fallback", "blocker", "self-correct", "alternate strategy", "change strategy")
    AntiFalseCompletion = @("No False Completion", "premature completion", "do not claim completion", "must not claim completion", "not claim completion")
    TimeoutStagnation = @("timeout", "stagnation", "hung process", "maximum same-action retry", "same failing action")
    CompletionEvidence = @("Completion Evidence Required", "files changed", "commands run", "tests run", "unverified items", "remaining risks")
}

function Test-TextHasAny {
    param(
        [string]$Text,
        [string[]]$Patterns
    )

    foreach ($pattern in $Patterns) {
        if ($Text.IndexOf($pattern, [System.StringComparison]::OrdinalIgnoreCase) -ge 0) {
            return $true
        }
    }
    return $false
}

function Get-RepoCandidates {
    param([string]$RootPath)

    $repos = New-Object System.Collections.Generic.List[string]
    foreach ($name in $TopLevelRepos) {
        $path = Join-Path $RootPath $name
        if (Test-Path -LiteralPath $path -PathType Container) {
            $repos.Add((Resolve-Path -LiteralPath $path).Path)
        }
    }

    Get-ChildItem -LiteralPath $RootPath -Directory -Force -ErrorAction SilentlyContinue |
        Where-Object {
            $_.Name -notin $SkipDirNames -and
            (Test-Path -LiteralPath (Join-Path $_.FullName ".git") -PathType Container)
        } |
        ForEach-Object {
            $resolved = (Resolve-Path -LiteralPath $_.FullName).Path
            if (-not $repos.Contains($resolved)) {
                $repos.Add($resolved)
            }
        }

    return $repos
}

function Get-RelevantFiles {
    param([string]$RepoPath)

    $files = New-Object System.Collections.Generic.List[System.IO.FileInfo]

    foreach ($name in $InstructionNames) {
        $path = Join-Path $RepoPath $name
        if (Test-Path -LiteralPath $path -PathType Leaf) {
            $files.Add((Get-Item -LiteralPath $path))
        }
    }

    foreach ($path in @(
        ".claude\settings.json",
        ".gemini\settings.json",
        ".codex\config.toml"
    )) {
        $full = Join-Path $RepoPath $path
        if (Test-Path -LiteralPath $full -PathType Leaf) {
            $files.Add((Get-Item -LiteralPath $full))
        }
    }

    $scanRoots = @(
        ".claude\skills", ".claude\commands", ".codex\skills", ".agents\skills",
        "skills", "commands", "commands\gsd", "commands\speckit", "workflows",
        "checklists", "protocols", "docs\agent-compatibility", "docs\skills"
    )

    foreach ($root in $scanRoots) {
        $fullRoot = Join-Path $RepoPath $root
        if (-not (Test-Path -LiteralPath $fullRoot -PathType Container)) {
            continue
        }
        Get-ChildItem -LiteralPath $fullRoot -File -Recurse -Force -ErrorAction SilentlyContinue |
            Where-Object {
                $_.Extension -in @(".md", ".mdx", ".txt", ".json", ".jsonc", ".toml", ".yaml", ".yml") -and
                ($_.FullName -split '[\\/]' | Where-Object { $_ -in $SkipDirNames }).Count -eq 0
            } |
            ForEach-Object {
                $candidate = $_
                if (-not ($files | Where-Object { $_.FullName -eq $candidate.FullName })) {
                    $files.Add($candidate)
                }
            }
    }

    return $files | Sort-Object FullName -Unique
}

function Get-RelativePath {
    param(
        [string]$Base,
        [string]$Path
    )
    $baseFull = [System.IO.Path]::GetFullPath($Base).TrimEnd('\', '/') + [System.IO.Path]::DirectorySeparatorChar
    $pathFull = [System.IO.Path]::GetFullPath($Path)
    $baseUri = New-Object System.Uri($baseFull)
    $pathUri = New-Object System.Uri($pathFull)
    $relativeUri = $baseUri.MakeRelativeUri($pathUri)
    return [System.Uri]::UnescapeDataString($relativeUri.ToString()).Replace('/', [System.IO.Path]::DirectorySeparatorChar)
}

if (-not (Test-Path -LiteralPath $Root -PathType Container)) {
    throw "Root does not exist: $Root"
}

$outputDir = Split-Path -Parent $Output
if (-not (Test-Path -LiteralPath $outputDir -PathType Container)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$repos = Get-RepoCandidates -RootPath $Root
$rows = New-Object System.Collections.Generic.List[object]
$fileRows = New-Object System.Collections.Generic.List[object]
$duplicateRows = New-Object System.Collections.Generic.List[object]
$emptyRows = New-Object System.Collections.Generic.List[object]

foreach ($repo in $repos) {
    $repoName = Split-Path -Leaf $repo
    $files = @(Get-RelevantFiles -RepoPath $repo)
    $combined = ""
    $fileSummaries = New-Object System.Collections.Generic.List[object]
    $duplicateBlocks = 0

    foreach ($file in $files) {
        try {
            $text = Get-Content -LiteralPath $file.FullName -Raw -ErrorAction Stop
        } catch {
            continue
        }

        if ([string]::IsNullOrWhiteSpace($text)) {
            $emptyRows.Add([pscustomobject]@{
                Repo = $repoName
                File = Get-RelativePath -Base $repo -Path $file.FullName
            })
        }

        $startCount = ([regex]::Matches($text, "<!--\s*SEABRIDGE_GOAL_PROTOCOL_START\s*-->", "IgnoreCase")).Count
        if ($startCount -gt 1) {
            $duplicateBlocks += $startCount
            $duplicateRows.Add([pscustomobject]@{
                Repo = $repoName
                File = Get-RelativePath -Base $repo -Path $file.FullName
                Blocks = $startCount
            })
        }

        $combined += "`n" + $text

        $fileSummaries.Add([pscustomobject]@{
            Repo = $repoName
            File = Get-RelativePath -Base $repo -Path $file.FullName
            Goal = Test-TextHasAny -Text $text -Patterns $PatternSets.Goal
            AutoLoop = Test-TextHasAny -Text $text -Patterns $PatternSets.AutoLoop
            DoD = Test-TextHasAny -Text $text -Patterns $PatternSets.DoD
            Validation = Test-TextHasAny -Text $text -Patterns $PatternSets.Validation
            StuckRecovery = Test-TextHasAny -Text $text -Patterns $PatternSets.StuckRecovery
            CompletionEvidence = Test-TextHasAny -Text $text -Patterns $PatternSets.CompletionEvidence
        })
    }

    foreach ($summary in $fileSummaries) {
        if ($summary.Goal -or $summary.AutoLoop -or $summary.DoD -or $summary.Validation -or $summary.StuckRecovery -or $summary.CompletionEvidence) {
            $fileRows.Add($summary)
        }
    }

    $missing = New-Object System.Collections.Generic.List[string]
    foreach ($key in @("Goal", "AutoLoop", "GoalAutoUnified", "DoD", "Validation", "StuckRecovery", "AntiFalseCompletion", "TimeoutStagnation", "CompletionEvidence")) {
        if (-not (Test-TextHasAny -Text $combined -Patterns $PatternSets[$key])) {
            $missing.Add($key)
        }
    }

    $conflicts = New-Object System.Collections.Generic.List[string]
    foreach ($conflictPattern in @("skip tests", "no validation required", "claim complete after implementation", "auto-push", "auto commit", "yolo", "dangerous execution")) {
        if ($combined.IndexOf($conflictPattern, [System.StringComparison]::OrdinalIgnoreCase) -ge 0) {
            $conflicts.Add($conflictPattern)
        }
    }

    $rows.Add([pscustomobject]@{
        Repo = $repoName
        Path = $repo
        FilesScanned = $files.Count
        Goal = Test-TextHasAny -Text $combined -Patterns $PatternSets.Goal
        AutoLoop = Test-TextHasAny -Text $combined -Patterns $PatternSets.AutoLoop
        Unified = Test-TextHasAny -Text $combined -Patterns $PatternSets.GoalAutoUnified
        DoD = Test-TextHasAny -Text $combined -Patterns $PatternSets.DoD
        Validation = Test-TextHasAny -Text $combined -Patterns $PatternSets.Validation
        StuckRecovery = Test-TextHasAny -Text $combined -Patterns $PatternSets.StuckRecovery
        AntiFalseCompletion = Test-TextHasAny -Text $combined -Patterns $PatternSets.AntiFalseCompletion
        TimeoutStagnation = Test-TextHasAny -Text $combined -Patterns $PatternSets.TimeoutStagnation
        CompletionEvidence = Test-TextHasAny -Text $combined -Patterns $PatternSets.CompletionEvidence
        DuplicateBlocks = $duplicateBlocks
        EmptyFiles = ($emptyRows | Where-Object { $_.Repo -eq $repoName }).Count
        MissingProtocol = ($missing -join ", ")
        PotentialConflicts = ($conflicts -join ", ")
    })
}

$generated = Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"
$md = New-Object System.Collections.Generic.List[string]
$md.Add("# Goal Protocol Diagnostics")
$md.Add("")
$md.Add("Generated: $generated")
$md.Add("")
$md.Add("Root: $Root")
$md.Add("")
$md.Add("## Repository Summary")
$md.Add("")
$md.Add("| Repo | Files scanned | /goal | auto-loop | unified | DoD | validation | stuck recovery | anti-false-completion | timeout/stagnation | completion evidence | duplicate blocks | empty files | missing protocol | potential conflicts |")
$md.Add("|---|---:|---|---|---|---|---|---|---|---|---|---:|---:|---|---|")
foreach ($row in $rows) {
    $md.Add("| $($row.Repo) | $($row.FilesScanned) | $($row.Goal) | $($row.AutoLoop) | $($row.Unified) | $($row.DoD) | $($row.Validation) | $($row.StuckRecovery) | $($row.AntiFalseCompletion) | $($row.TimeoutStagnation) | $($row.CompletionEvidence) | $($row.DuplicateBlocks) | $($row.EmptyFiles) | $($row.MissingProtocol) | $($row.PotentialConflicts) |")
}

$md.Add("")
$md.Add("## Protocol-Bearing Files")
$md.Add("")
$md.Add("| Repo | File | /goal | auto-loop | DoD | validation | stuck recovery | completion evidence |")
$md.Add("|---|---|---|---|---|---|---|---|")
foreach ($fileRow in $fileRows) {
    $md.Add("| $($fileRow.Repo) | $($fileRow.File) | $($fileRow.Goal) | $($fileRow.AutoLoop) | $($fileRow.DoD) | $($fileRow.Validation) | $($fileRow.StuckRecovery) | $($fileRow.CompletionEvidence) |")
}

$md.Add("")
$md.Add("## Duplicate Protocol Blocks")
$md.Add("")
if ($duplicateRows.Count -eq 0) {
    $md.Add("No duplicate SEABRIDGE_GOAL_PROTOCOL marker blocks detected.")
} else {
    $md.Add("| Repo | File | Blocks |")
    $md.Add("|---|---|---:|")
    foreach ($dup in $duplicateRows) {
        $md.Add("| $($dup.Repo) | $($dup.File) | $($dup.Blocks) |")
    }
}

$md.Add("")
$md.Add("## Empty Agent Files")
$md.Add("")
if ($emptyRows.Count -eq 0) {
    $md.Add("No empty scanned files detected.")
} else {
    $md.Add("| Repo | File |")
    $md.Add("|---|---|")
    foreach ($empty in $emptyRows) {
        $md.Add("| $($empty.Repo) | $($empty.File) |")
    }
}

$md.Add("")
$md.Add("## Notes")
$md.Add("")
$md.Add("- This scanner audits instruction and protocol coverage; it does not prove behavioral compliance by itself.")
$md.Add("- `vendor`, `external`, dependency, build, and runtime output folders are skipped to avoid treating imported references as active policy.")
$md.Add("- JSON/TOML files are read only; this script does not modify them.")

Set-Content -LiteralPath $Output -Value ($md -join "`r`n") -Encoding UTF8
Write-Output "Wrote diagnostics report: $Output"
