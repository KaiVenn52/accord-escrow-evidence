$ErrorActionPreference='Stop'
$projectRoot=Split-Path -Parent $PSScriptRoot
$creWrapper=Join-Path $PSScriptRoot 'cre.ps1'
Push-Location $projectRoot
try {
    & $creWrapper whoami *> $null
    if($LASTEXITCODE -ne 0){throw 'CRE authentication is required. Complete scripts/cre.ps1 login first. No simulation was run.'}
    $config=Get-Content -LiteralPath 'workflow/config.local.json' -Raw | ConvertFrom-Json
    if($config.apiUrl -ne 'http://127.0.0.1:8755/delivery' -or $config.evidenceLevel -ne 'local-evm' -or $config.terms.chainId -ne 11155111){throw 'Expected the controlled local simulation configuration. Start npm run seed:cre.'}
    $projectConfig=Get-Content -LiteralPath 'project.yaml' -Raw
    if($projectConfig -notmatch '(?s)local-settings:\s+rpcs:\s+- chain-name: ethereum-testnet-sepolia\s+url: http://127\.0\.0\.1:8754(?:\s|$)'){throw 'Local RPC target changed. Review project.yaml before simulating.'}
    $delivery=Invoke-RestMethod -Uri $config.apiUrl -TimeoutSec 5
    if($delivery.id -ne $config.terms.id){throw 'Delivery provider returned a different milestone.'}
    $rpcBody=@{jsonrpc='2.0';id=1;method='eth_chainId';params=@()} | ConvertTo-Json -Compress
    $chain=Invoke-RestMethod -Uri 'http://127.0.0.1:8754' -Method Post -ContentType 'application/json' -Body $rpcBody -TimeoutSec 5
    if($chain.result -ne '0xaa36a7'){throw 'Unexpected private EVM chain ID.'}
    if(-not (Test-Path -LiteralPath 'evidence/workflow.wasm')){throw 'Compile the workflow first: npm run compile:workflow'}
    $wasmFile=(Resolve-Path -LiteralPath 'evidence/workflow.wasm').Path
    if($wasmFile -match '[^\x00-\x7F]'){
        $projectTools=Get-Item -LiteralPath 'tools'
        if($projectTools.LinkType -ne 'Junction'){throw 'The CLI requires an ASCII WASM path. Restore the project-specific tools junction.'}
        $stagedWasm=Join-Path ([string]$projectTools.Target) 'accord-workflow.wasm'
        if($stagedWasm -match '[^\x00-\x7F]'){throw 'The project runtime WASM staging path must be ASCII.'}
        Copy-Item -LiteralPath $wasmFile -Destination $stagedWasm
        if((Get-FileHash -LiteralPath $wasmFile).Hash -ne (Get-FileHash -LiteralPath $stagedWasm).Hash){throw 'Staged WASM checksum mismatch.'}
        # The CLI resolves relative --wasm paths from the workflow folder and caps the argument at 97 ASCII characters.
        $wasmFile='../tools/accord-workflow.wasm'
    }
    Get-Date -AsUTC -Format o | Set-Content -LiteralPath 'evidence/cre-attempt-time.txt'
    Write-Output 'Running official CRE CLI against the controlled local RPC and delivery API. Broadcasting disabled.'
    & $creWrapper workflow simulate workflow --target local-settings --wasm $wasmFile --trigger-index 0 --broadcast=false --non-interactive 2>&1 | Tee-Object -FilePath 'evidence/cre-simulation-attempt.txt'
    $simulationExit=$LASTEXITCODE
    "exit_code=$simulationExit" | Add-Content -LiteralPath 'evidence/cre-simulation-attempt.txt'
    if($simulationExit -ne 0){throw 'CRE simulation failed. See evidence/cre-simulation-attempt.txt; do not claim success.'}
    Write-Output 'CLI returned exit 0. Review its execution result before updating READINESS.md.'
} finally { Pop-Location }
