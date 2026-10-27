import {bundle} from '@remotion/bundler';
import {renderMedia,renderStill,selectComposition,openBrowser} from '@remotion/renderer';
import {resolve} from 'node:path';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const runtime=process.env.ACCORD_VIDEO_RUNTIME;
if(!runtime)throw Error('Set ACCORD_VIDEO_RUNTIME to this project runtime directory on the disk with free space.');
const browserExecutable='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const timeline=JSON.parse(readFileSync('timeline.json','utf8'));
mkdirSync('out/qa-v2',{recursive:true});
const serveUrl=await bundle({entryPoint:resolve('src/index.ts'),outDir:resolve(runtime,'video-bundle'),enableCaching:false,webpackOverride:config=>({...config,cache:false})});
const browser=await openBrowser('chrome',{browserExecutable});
const composition=await selectComposition({serveUrl,id:'AccordDemo',browserExecutable,puppeteerInstance:browser});
const frames=timeline.shots.flatMap(s=>[s.from+25,s.from+Math.min(90,s.duration-1),s.from+s.duration-20]);
const chosenFrames=process.argv.includes('--final-pass')?timeline.shots.flatMap(s=>[s.from+25,s.from+90]):frames;
if(!process.argv.includes('--render-only'))for(const frame of chosenFrames){await renderStill({serveUrl,composition,output:resolve(`out/qa-v2/f${frame}.png`),frame,browserExecutable,puppeteerInstance:browser,logLevel:'error'});console.log(`FRAME ${frame}`);}
if(process.argv.includes('--stills-only')){await browser.close({silent:true});process.exit(0);}
if(process.argv.includes('--final-pass')){
 mkdirSync('out/segments',{recursive:true});
 for(const s of timeline.shots){
  const intro=resolve(`out/segments/${s.id}-intro.mp4`),complete=resolve(`out/segments/${s.id}.mp4`);
  await renderMedia({serveUrl,composition,codec:'h264',outputLocation:intro,frameRange:[s.from,s.from+60],muted:true,browserExecutable,puppeteerInstance:browser,concurrency:3,crf:18,logLevel:'error'});
  // After local frame 60, every visual property is constant. Freeze that exact
  // final rendered frame rather than rasterizing identical holds thousands of times.
  execFileSync('ffmpeg',['-y','-v','error','-i',intro,'-i',resolve(`public/audio/${s.id}.wav`),'-filter_complex',`[0:v]tpad=stop_mode=clone:stop_duration=${(s.duration-61)/30},trim=end_frame=${s.duration},setpts=PTS-STARTPTS[v];[1:a]adelay=333.333:all=1,volume=0.85,apad,atrim=duration=${s.duration/30}[a]`,'-map','[v]','-map','[a]','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','160k',complete],{stdio:'inherit'});
  console.log(`SEGMENT ${s.id} ${s.duration} frames`);
 }
 writeFileSync('out/segments/list.txt',timeline.shots.map(s=>`file '${s.id}.mp4'`).join('\n'));
 execFileSync('ffmpeg',['-y','-v','error','-f','concat','-safe','0','-i',resolve('out/segments/list.txt'),'-c','copy','-movflags','+faststart',resolve('out/accord-demo.mp4')],{stdio:'inherit'});
}else await renderMedia({serveUrl,composition,codec:'h264',outputLocation:resolve('out/accord-demo.mp4'),browserExecutable,puppeteerInstance:browser,concurrency:3,crf:20,logLevel:'warn',onProgress:p=>{if(p.renderedFrames%300===0)console.log(`RENDER ${p.renderedFrames}/${composition.durationInFrames}`);}});
writeFileSync('out/render.json',JSON.stringify({composition:composition.id,frames:composition.durationInFrames,fps:composition.fps,width:composition.width,height:composition.height,codec:'h264',narration:'Windows System.Speech Microsoft David Desktop',bgm:false},null,2));
console.log('RENDER COMPLETE');
await browser.close({silent:true});
