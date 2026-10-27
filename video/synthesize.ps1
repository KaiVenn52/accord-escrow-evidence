$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Speech
$synth=[System.Speech.Synthesis.SpeechSynthesizer]::new()
try {
 $voice=$synth.GetInstalledVoices() | Where-Object {$_.Enabled -and $_.VoiceInfo.Culture.Name -eq 'en-US'} | Select-Object -First 1
 if(-not $voice){throw 'No local English desktop voice is installed.'}
 $synth.SelectVoice($voice.VoiceInfo.Name)
 $synth.Rate=0
 $shots=Get-Content -Raw (Join-Path $PSScriptRoot 'narration.json') | ConvertFrom-Json
 foreach($shot in $shots){$synth.SetOutputToWaveFile((Join-Path $PSScriptRoot ('public/audio/'+$shot.id+'.wav')));$synth.Speak($shot.voice);$synth.SetOutputToNull()}
 [ordered]@{engine='Windows System.Speech';voice=$voice.VoiceInfo.Name;language='en-US';rate=0;externalVoiceService=$false} | ConvertTo-Json | Set-Content -Encoding utf8 (Join-Path $PSScriptRoot 'voice.json')
} finally {$synth.Dispose()}
