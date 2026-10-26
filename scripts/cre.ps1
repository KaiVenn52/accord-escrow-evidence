param([Parameter(ValueFromRemainingArguments=$true)][string[]]$CreArguments)
$ErrorActionPreference='Stop'
$projectRoot=Split-Path -Parent $PSScriptRoot
$previousPath=$env:PATH
$creCommand=Get-Command cre -ErrorAction SilentlyContinue
$creBinary=if($creCommand){$creCommand.Source}else{$null}
$toolsLink=Get-Item -LiteralPath (Join-Path $projectRoot 'tools') -ErrorAction SilentlyContinue
if($toolsLink -and $toolsLink.LinkType -eq 'Junction'){
    $runtimeRoot=Split-Path -Parent ([string]$toolsLink.Target)
    $localCre=Join-Path $runtimeRoot 'cre-verified/cre_v1.38.0_windows_amd64.exe'
    if(Test-Path -LiteralPath $localCre){$creBinary=$localCre}
    $localBun=Join-Path $runtimeRoot 'bun/node_modules/bun/bin'
    if(Test-Path -LiteralPath (Join-Path $localBun 'bun.exe')){$env:PATH=$localBun+';'+$env:PATH}
}
if(-not $creBinary){$env:PATH=$previousPath;throw 'Install the official CRE CLI or restore this project-specific runtime. See README.md.'}
Push-Location $projectRoot
try { & $creBinary @CreArguments; $resultCode=$LASTEXITCODE }
finally { Pop-Location; $env:PATH=$previousPath }
exit $resultCode
