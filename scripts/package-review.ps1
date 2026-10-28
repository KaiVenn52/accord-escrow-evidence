param([string]$Name = ('accord-review-' + (Get-Date -Format 'yyyyMMdd-HHmmss')))
$ErrorActionPreference = 'Stop'
if ($Name -notmatch '^[a-zA-Z0-9][a-zA-Z0-9-]{0,79}$') { throw 'Use a short alphanumeric archive name.' }
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$releaseRoot = Join-Path $projectRoot 'release'
[IO.Directory]::CreateDirectory($releaseRoot) | Out-Null
$archivePath = Join-Path $releaseRoot ($Name + '.zip')
if (Test-Path -LiteralPath $archivePath) { throw 'Archive already exists; choose a new name.' }
$paths = @('.gitignore','README.md','LICENSE','.github/workflows/pages.yml','index.html','package.json','package-lock.json','tsconfig.json','project.yaml')
foreach ($folder in @('src','contracts','workflow','scripts','tests','submission')) {
    $paths += Get-ChildItem -LiteralPath (Join-Path $projectRoot $folder) -File -Recurse |
        Where-Object { $_.Name -notlike '.*' -and $_.FullName -notlike (Join-Path $projectRoot 'submission/private/*') -and $_.Extension -in @('.ts','.css','.sol','.json','.yaml','.mjs','.ps1','.md','.txt') } |
        ForEach-Object { $_.FullName.Substring($projectRoot.Length + 1).Replace('\','/') }
}
# Deliberate evidence allowlist: never recursively package runtime or account files.
$evidenceNames = @(
    'build.txt','bundle-tests.txt','tests.txt','cre-version.txt','cre-sha256.txt','wasm-sha256.txt','workflow.wasm',
    'cre-simulation-success.txt','cre-simulation-tampered.txt',
    'cre-ready-result.json','cre-ready-bundle.json','cre-ready-capture.txt',
    'cre-tampered-result.json','cre-tampered-bundle.json','cre-tampered-capture.txt',
    'local-evm.json','local-evm-bundle.json','local-providers.json','local-providers-bundle.json',
    'ui-qa.json','ui-test.txt','ui-desktop.png','ui-mobile.png','ui-cre-ready.png','ui-cre-tampered.png',
    'official-overview-20261024.md','official-bounty-20261024.md',
    'registration-public-page.txt','registration-public-page.png','registration-public-links.json',
    'publication-run.json','public-qa.json','public-desktop.png','public-mobile.png',
    'video-media-probe.json','video-qa.json','video-player.png','video-player-mobile.png','official-detail-20261027.md','video-workbench-parity.json',
    'dorahacks-build-created-20261028.png','dorahacks-ready-before-submit-20261028.png'
)
$paths += $evidenceNames | ForEach-Object { 'evidence/' + $_ }
$paths += @('public/walkthrough.html','public/accord-demo.mp4','public/accord-demo.vtt','public/demo-poster.png','video/package.json','video/package-lock.json','video/DESIGN.md','video/README.md','video/REVIEW.md','video/narration.json','video/timeline.json','video/voice.json','video/synthesize.ps1','video/prepare-timeline.mjs','video/render.mjs','video/parity.mjs')
foreach($folder in @('video/src','video/public/audio','video/public/textures')) {
    $paths += Get-ChildItem -LiteralPath (Join-Path $projectRoot $folder) -File | ForEach-Object { $_.FullName.Substring($projectRoot.Length + 1).Replace('\','/') }
}
$paths = @($paths | Sort-Object -Unique)
$manifest = @()
foreach ($relative in $paths) {
    $absolute = [IO.Path]::GetFullPath((Join-Path $projectRoot $relative))
    if (-not $absolute.StartsWith($projectRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Path escaped project.' }
    if (-not (Test-Path -LiteralPath $absolute -PathType Leaf)) { throw "Missing required package file: $relative" }
    $manifest += (Get-FileHash -LiteralPath $absolute -Algorithm SHA256).Hash.ToLowerInvariant() + '  ' + $relative
}
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [IO.Compression.ZipFile]::Open($archivePath, [IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($relative in $paths) { [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, (Join-Path $projectRoot $relative), $relative) | Out-Null }
    $entry = $zip.CreateEntry('MANIFEST.sha256.txt')
    $writer = [IO.StreamWriter]::new($entry.Open(), [Text.UTF8Encoding]::new($false))
    try { $writer.Write(($manifest -join "`n") + "`n") } finally { $writer.Dispose() }
} finally { $zip.Dispose() }
# Verify the compressed bytes against the manifest, not just the source files.
$zip = [IO.Compression.ZipFile]::OpenRead($archivePath)
try {
    if ($zip.Entries.Count -ne ($paths.Count + 1)) { throw 'Unexpected archive entry count.' }
    foreach ($line in $manifest) {
        $expected, $relative = $line -split '  ', 2
        $entry = $zip.GetEntry($relative)
        if (-not $entry) { throw "Missing ZIP entry: $relative" }
        $stream = $entry.Open(); $sha = [Security.Cryptography.SHA256]::Create()
        try { $actual = [BitConverter]::ToString($sha.ComputeHash($stream)).Replace('-','').ToLowerInvariant() }
        finally { $stream.Dispose(); $sha.Dispose() }
        if ($actual -ne $expected) { throw "ZIP digest mismatch: $relative" }
    }
} finally { $zip.Dispose() }
$report = [ordered]@{ archive=$archivePath; sha256=(Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant(); files=$paths.Count; bytes=(Get-Item -LiteralPath $archivePath).Length; manifestVerified=$true; published=$false }
$report | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $releaseRoot ($Name + '.sha256.json')) -Encoding utf8
$report | ConvertTo-Json
