import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';
import timeline from '../timeline.json';
import layout from './layout.json';
import {PageCam} from './PageCam';
export const SHOTS=timeline.shots;
export const TOTAL=timeline.total;
type Shot=typeof SHOTS[number];
const navy='#172d43',muted='#687585',paper='#f4f5f7';
export const Scene:React.FC<{shot:Shot,title?:string,caption?:string}>=({shot,title=shot.title,caption=shot.caption})=>{
 const f=useCurrentFrame();
 const opacity=interpolate(f,[0,18],[0,1],{extrapolateRight:'clamp'});
 const shift=interpolate(f,[0,21],[12,0],{easing:Easing.bezier(0,0,.2,1),extrapolateRight:'clamp'});
 const isCode=['workflow','cli-ready','cli-hold'].includes(shot.id);
 const page=layout[shot.texture.replace('.png','') as keyof typeof layout];
 const isClose=shot.id==='close';
 return <AbsoluteFill style={{background:paper,color:navy,fontFamily:'Segoe UI,Arial,sans-serif'}}>
  <div style={{position:'absolute',top:36,left:64,right:64,display:'flex',justifyContent:'space-between',fontSize:32,color:muted}}><span style={{color:navy,fontSize:36,fontWeight:600}}>accord <span style={{fontSize:32,fontWeight:400,marginLeft:18}}>Escrow Evidence Desk</span></span><span>{isCode?(shot.id==='workflow'?'Saved source evidence':'Saved execution evidence'):'Product walkthrough'} · {String(SHOTS.findIndex(item=>item.id===shot.id)+1).padStart(2,'0')} / 09</span></div>
  {isClose?<div style={{position:'absolute',left:128,right:128,top:275,opacity,transform:`translateY(${shift}px)`}}>
   <div style={{fontSize:72,fontWeight:600,letterSpacing:-2,marginBottom:32}}>{title}</div>
   <div style={{fontSize:36,color:muted,lineHeight:1.7}}>Reproducible delivery review with Chainlink CRE.<br/>Legal judgment and payment authorization remain human.</div>
   <div style={{marginTop:70,fontSize:40,lineHeight:1.9}}><div>Demo: kaivenn52.github.io/accord-escrow-evidence</div><div>Source: github.com/KaiVenn52/accord-escrow-evidence</div></div>
   <div style={{marginTop:30,fontSize:32,color:muted}}>MIT license · 31 source tests passing · Private-provider CLI simulations</div>
  </div>:<>
   <div style={{position:'absolute',top:97,left:64,fontSize:56,fontWeight:600,letterSpacing:-.7,opacity,transform:`translateY(${shift}px)`}}>{title}</div>
   <div style={{position:'absolute',left:64,top:168,width:1792,height:640,border:'1px solid #dbe2e8',borderRadius:6,overflow:'hidden',background:'white',opacity}}>
    <div style={{position:'absolute',width:1920,height:1080,left:-64,top:-178}}>
     <PageCam src={`textures/${shot.texture}`} pageH={page?.pageH??1080} keys={isCode?[{frame:0,cx:960,cy:475,zoom:.96},{frame:shot.duration-1,cx:960,cy:475,zoom:.96}]:[{frame:0,cx:1020,cy:500,zoom:1},{frame:60,cx:1090,cy:535,zoom:1.12},{frame:shot.duration-1,cx:1090,cy:535,zoom:1.12}]} />
    </div>
   </div>
  </>}
  <div style={{position:'absolute',left:64,right:64,top:845,fontSize:60,fontWeight:500,lineHeight:1.15,color:navy}}>{caption}</div>
  <div style={{position:'absolute',left:64,right:64,bottom:20,fontSize:32,color:muted,display:'flex',justifyContent:'space-between'}}><span>Human authorization · No live DON deployment</span><span>English synthetic voice</span></div>
 </AbsoluteFill>
};
export const AccordDemo:React.FC=()=> <AbsoluteFill>{SHOTS.map(s=><Sequence key={s.id} from={s.from} durationInFrames={s.duration}><Scene shot={s}/><Sequence from={10}><Audio src={staticFile(`audio/${s.id}.wav`)} volume={0.85} /></Sequence></Sequence>)}</AbsoluteFill>;
