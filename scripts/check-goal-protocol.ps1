param([string]$WorkspaceRoot = "C:\Users\adelm\SeaBridgeAI")
$ErrorActionPreference = "Stop"
$core = Join-Path $WorkspaceRoot "manageesg-backend"
$checker = Join-Path $PSScriptRoot "check-instruction-stack.js"
@'
const l=require(process.argv[2]);const rows=l.checkRepo(process.argv[3],process.argv[4],32768);const errors=rows.flatMap(r=>r.failures);if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('Goal protocol: three central files and loading references verified');
'@ | node - $checker $core $WorkspaceRoot
if ($LASTEXITCODE -ne 0) { throw "Central goal policy validation failed" }
