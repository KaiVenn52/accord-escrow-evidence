import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import {resolve} from 'node:path';
import {mkdirSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const runtime=process.env.ACCORD_VIDEO_RUNTIME;if(!runtime)throw Error('Set project runtime path.');
const wb=resolve(runtime,'video-workbench');
const serveUrl=await bundle({entryPoint:resolve(wb,'src/remotion/index.ts'),outDir:resolve(runtime,'video-parity-bundle'),publicDir:resolve('public'),enableCaching:false,webpackOverride:c=>({...c,cache:false,resolve:{...c.resolve,symlinks:false,alias:{...c.resolve?.alias,'@proj':resolve(wb,'proj'),'@demos':resolve(wb,'demosrc')}}})});
const browserExecutable='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser=await openBrowser('chrome',{browserExecutable});mkdirSync('out/parity',{recursive:true});const results=[];
try{
 for(const frame of [90,2150,4614]){
  const outputs=[];
  for(const id of ['ProjOriginal','ProjImported']){const composition=await selectComposition({serveUrl,id,browserExecutable,puppeteerInstance:browser});const output=resolve(`out/parity/${id}-${frame}.png`);await renderStill({serveUrl,composition,frame,output,browserExecutable,puppeteerInstance:browser,logLevel:'error'});outputs.push(output);}
  const code='from PIL import Image,ImageChops; import sys,json; a=Image.open(sys.argv[1]).convert("RGB");b=Image.open(sys.argv[2]).convert("RGB"); assert a.size==b.size;d=ImageChops.difference(a,b);bad=sum(1 for p in d.getdata() if max(p)>2);print(json.dumps({"badPixels":bad,"totalPixels":a.width*a.height,"ratio":bad/(a.width*a.height)}))';
  const difference=JSON.parse(execFileSync('python',['-c',code,...outputs],{encoding:'utf8'}));const pass=difference.ratio<.001;results.push({frame,...difference,pass});console.log(JSON.stringify(results.at(-1)));
 }
 writeFileSync('out/parity/report.json',JSON.stringify({scope:'Three sampled visual frames; audio timing comes from the shared timeline, not this image comparison.',results,pass:results.every(r=>r.pass)},null,2));if(results.some(r=>!r.pass))throw Error('Workbench sampled parity failed.');
}finally{await browser.close({silent:true});}
