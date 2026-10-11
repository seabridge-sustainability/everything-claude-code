param(
 [Parameter(Mandatory = $true)][string]$TargetRepo,
 [switch]$DryRun, [switch]$Backup, [switch]$IncludeOptionalAgentFiles,
 [switch]$IncludeAutoLoop, [switch]$IncludeAntiStuckRules, [switch]$IncludeCompletionEvidence
)
$ErrorActionPreference = "Stop"
# Compatibility entrypoint: policy is read from the backend core, never stamped.
$checker = Join-Path $PSScriptRoot "check-instruction-stack.js"
@'
const l=require(process.argv[2]); const rows=l.checkRepo(process.argv[3],require('path').dirname(process.argv[3]),32768); const errors=rows.flatMap(r=>r.failures.map(f=>r.harness+': '+f)); if(errors.length){console.error(errors.join('\n'));process.exit(1)} console.log('Goal policy: central references verified; no instruction copies written');
'@ | node - $checker $TargetRepo
if ($LASTEXITCODE -ne 0) { throw "Instruction reference validation failed" }
