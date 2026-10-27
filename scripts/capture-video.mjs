import { chromium } from 'playwright';
import { mkdirSync,readFileSync,writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const root='video/public/textures';mkdirSync(root,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const layout={};
try {
 const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:2});
 await page.goto('http://127.0.0.1:5200/accord-escrow-evidence/',{waitUntil:'networkidle'});
 await page.getByRole('heading',{name:'Software handover',exact:true}).waitFor();
 assert.equal(await page.locator('.appbar').evaluate(e=>getComputedStyle(e).height),'60px');
 await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(600);
 async function capture(name) {
  const data={pageH:await page.evaluate(()=>document.documentElement.scrollHeight),elements:{}};
  for(const selector of ['.case-heading','.evidence-panel','.decision-panel','.import-banner']) {
   const el=page.locator(selector);if(await el.count()){const b=await el.boundingBox();const offset=await page.evaluate(()=>({x:scrollX,y:scrollY}));data.elements[selector]={x:b.x+offset.x,y:b.y+offset.y,w:b.width,h:b.height};await el.screenshot({path:`${root}/${name}-${selector.slice(1)}.png`});}
  }
  await page.screenshot({path:`${root}/${name}.png`,fullPage:true});layout[name]=data;
 }
 await capture('idle');
 for(const [scenario,label] of [['clean','Ready for human review'],['tampered','Hold for review'],['disputed','Hold for review']]) {
  await page.locator(`[data-scenario="${scenario}"]`).click();await page.getByRole('button',{name:'Verify evidence bundle'}).click();await page.locator('.decision-panel').getByText(label,{exact:true}).waitFor();await capture(scenario);
 }
 await page.locator('#bundle-file').setInputFiles('evidence/cre-tampered-bundle.json');await page.locator('.import-banner').waitFor();await capture('imported');
 const escape=t=>t.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 async function fileView(name,title,source,body){
  await page.setContent(`<html lang="en"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#f4f5f7;font-family:Segoe UI,Arial;color:#26313f;padding:54px 64px}h1{font-size:40px;margin:0 0 14px;color:#172d43}.meta{font-size:32px;color:#687585;margin-bottom:32px}pre{font:36px/1.35 Consolas,monospace;background:white;border:1px solid #e0e4e9;border-radius:6px;padding:30px;white-space:pre-wrap;overflow-wrap:anywhere;max-width:1792px}footer{font-size:32px;color:#687585;margin-top:24px}</style><h1>${escape(title)}</h1><div class="meta">${escape(source)}</div><pre>${escape(body)}</pre><footer>Saved source evidence · not a new execution</footer></html>`);
  await page.screenshot({path:`${root}/${name}.png`,fullPage:true});layout[name]={pageH:await page.evaluate(()=>document.documentElement.scrollHeight),elements:{}};
 }
 const code=readFileSync('workflow/main.ts','utf8').split('\n');
 // Exact source lines, with line numbers; no rewritten or invented integration code.
 const selected=code.map((l,i)=>({l,i:i+1})).filter(({l,i})=>i>4&&/consensusIdentical|sendRequest|headerByNumber|callContract|evaluate\(/.test(l));
 await fileView('workflow','Actual CRE workflow source','workflow/main.ts · selected exact lines',selected.map(({l,i})=>`${i.toString().padStart(2)}  ${l}`).join('\n'));
 for(const [name,file] of [['ready','success'],['hold','tampered']]) {
  const raw=readFileSync(`evidence/cre-simulation-${file}.txt`,'utf8');
  const start=raw.indexOf('Workflow Simulation Result:');const jsonStart=raw.indexOf('{',start);
  const first=raw.slice(jsonStart).split('\n').slice(1,name==='ready'?8:10).filter(l=>!/artifactHash|evaluatedAt|snapshot/.test(l)).join('\n');
  const status=JSON.parse(readFileSync(`evidence/cre-${name==='ready'?'ready':'tampered'}-result.json`,'utf8')).status;
  await fileView(`cli-${name}`,`Saved official CLI simulation: ${status}`,`evidence/cre-simulation-${file}.txt · Oct 24 MYT`,`${raw.slice(start,jsonStart).trim()}\n${first}\n  ...\n${raw.split('\n').filter(l=>/^  "status"/.test(l)).join('\n')}\n\n${raw.split('\n').filter(l=>/^exit_code=/.test(l)).join('\n')}\n\n[Excerpts; full original log is in the repository.]`);
 }
 writeFileSync(`${root}/layout.json`,JSON.stringify(layout,null,2));
 writeFileSync('video/src/layout.json',JSON.stringify(layout,null,2));
 console.log('Captured real UI states and exact saved-source excerpts.');
}finally{await browser.close();}
