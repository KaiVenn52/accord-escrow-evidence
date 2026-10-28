import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const timeline=JSON.parse(readFileSync(new URL('timeline.json',import.meta.url),'utf8'));
const stamp=frames=>{const ms=Math.round(frames*1000/30);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(ms%1000).padStart(3,'0')}`;};
const cues=[];
const wrap=words=>{const lines=[''];for(const word of words){const i=lines.length-1;if((lines[i]+' '+word).trim().length>42)lines.push(word);else lines[i]=(lines[i]+' '+word).trim();}return lines;};
for(const shot of timeline.shots){
 const words=shot.voice.split(/\s+/);const phrases=[];let phrase=[];
 for(const word of words){
  if(wrap([...phrase,word]).length>2){phrases.push(phrase);phrase=[];}
  phrase.push(word);
  if(/[.!?]$/.test(word)){phrases.push(phrase);phrase=[];}
 }
 if(phrase.length)phrases.push(phrase);
 let consumed=0;
 for(const phraseWords of phrases){
  const start=shot.from+10+Math.round(shot.voiceFrames*consumed/words.length);
  consumed+=phraseWords.length;
  const end=shot.from+10+Math.round(shot.voiceFrames*consumed/words.length);
  const lines=wrap(phraseWords);
  assert.ok(lines.length<=2);assert.ok(end>start);
  cues.push({start,end,text:lines.join('\n')});
 }
}
assert.equal(cues.map(c=>c.text.replace(/\n/g,' ')).join(' '),timeline.shots.map(s=>s.voice).join(' '));
for(let i=1;i<cues.length;i++)assert.ok(cues[i].start>=cues[i-1].end);
writeFileSync(new URL('../public/accord-demo.vtt',import.meta.url),'WEBVTT\n\n'+cues.map(c=>`${stamp(c.start)} --> ${stamp(c.end)}\n${c.text}\n`).join('\n'));
console.log(JSON.stringify({cues:cues.length,maxLines:2,maxLineCharacters:42,allNarrationWordsPreserved:true,noOverlaps:true,timing:'Word-count interpolation within each measured narration clip; not forced word alignment.'},null,2));
