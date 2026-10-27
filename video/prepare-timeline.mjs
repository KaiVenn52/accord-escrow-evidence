import {readFileSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const shots=JSON.parse(readFileSync('narration.json','utf8'));
let cursor=0;
const stamp=frames=>{const ms=Math.round(frames*1000/30);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`};
for(const shot of shots){const seconds=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',`public/audio/${shot.id}.wav`],{encoding:'utf8'}).trim());shot.from=cursor;shot.voiceFrames=Math.ceil(seconds*30);shot.duration=Math.max(210,shot.voiceFrames+42);cursor+=shot.duration;}
writeFileSync('timeline.json',JSON.stringify({fps:30,width:1920,height:1080,total:cursor,shots},null,2));
writeFileSync('out/accord-demo.srt',shots.map((s,i)=>`${i+1}\n${stamp(s.from)} --> ${stamp(s.from+s.duration)}\n${s.voice}\n`).join('\n'));
console.log(JSON.stringify({frames:cursor,seconds:cursor/30,shots:shots.length}));
