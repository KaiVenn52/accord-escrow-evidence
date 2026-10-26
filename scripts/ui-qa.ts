import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {spawn, type ChildProcess} from 'node:child_process';
let server:ChildProcess|undefined;
assert.ok(existsSync('dist/index.html'),'Run npm run build before browser QA.');
try { const response=await fetch('http://127.0.0.1:5197',{signal:AbortSignal.timeout(1500)});if(!response.ok)throw Error('Server not ready'); }
catch {server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','5197','--strictPort'],{stdio:'ignore',windowsHide:true});}
let ready=false;
for(let i=0;i<60;i++){try{const r=await fetch('http://127.0.0.1:5197',{signal:AbortSignal.timeout(1000)});if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,1000));}
if(!ready){server?.kill();throw Error('Vite server did not become ready');}
const browser=await chromium.launch({channel:'msedge',headless:true});
const errors:string[]=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto('http://127.0.0.1:5197',{waitUntil:'domcontentloaded',timeout:60000});
 await page.getByRole('heading',{name:'Software handover',exact:true}).waitFor({timeout:60000});
 assert.equal(await page.title(),'Accord — Escrow Evidence Desk');
 assert.ok(await page.getByRole('heading',{name:'Software handover',exact:true}).isVisible());
 assert.ok(await page.getByRole('button',{name:'Download receipt JSON'}).isDisabled());
 await page.screenshot({path:'evidence/ui-idle.png',fullPage:true});
 await page.getByText('Inspect raw delivery',{exact:false}).click();
 assert.ok(await page.locator('pre').isVisible());
 await page.getByText('Inspect raw delivery',{exact:false}).click();
 await page.getByText('Full contract identifiers',{exact:false}).click();
 assert.ok(await page.getByText('Escrow contract',{exact:true}).isVisible());
 await page.getByText('Full contract identifiers',{exact:false}).click();
 await page.getByRole('button',{name:'Verify evidence bundle'}).click();
 await page.locator('.decision-panel').getByText('Ready for human review',{exact:true}).waitFor();
 assert.equal(await page.locator('.row-result.pass').count(),7);
 const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Download receipt JSON'}).click();const download=await pending;
 const file=await download.path();const receipt=JSON.parse(readFileSync(file!,'utf8'));
 assert.equal(receipt.status,'REVIEW_READY');assert.equal(receipt.authorization,'HUMAN_REQUIRED');assert.equal(receipt.evidenceLevel,'fixture');
 await page.screenshot({path:'evidence/ui-desktop.png',fullPage:true});
 for(const [scenario,reason] of [['tampered','Delivery commitment mismatch'],['disputed','Open dispute blocks release review'],['stale','Chain snapshot is stale or from the future'],['changed','Beneficiary or amount changed'],['pending','Challenge window has not elapsed']]){
  await page.locator(`[data-scenario="${scenario}"]`).click();assert.ok(await page.getByRole('button',{name:'Download receipt JSON'}).isDisabled());await page.getByRole('button',{name:'Verify evidence bundle'}).click();await page.locator('.decision-panel').getByText('Hold for review',{exact:true}).waitFor();assert.ok(await page.getByText(reason,{exact:true}).isVisible());assert.equal(await page.locator('.row-result.fail').count(),1);
 }
 await page.screenshot({path:'evidence/ui-hold.png',fullPage:true});
 await page.setViewportSize({width:1024,height:900});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
 await page.screenshot({path:'evidence/ui-tablet.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.locator('[data-scenario="clean"]').click();await page.getByRole('button',{name:'Verify evidence bundle'}).click();
 assert.ok(await page.locator('.decision-panel').getByText('Ready for human review',{exact:true}).isVisible());
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
 const mobileText=await page.locator('.evidence-table tbody td').first().evaluate(el=>Number.parseFloat(getComputedStyle(el).fontSize));
 assert.ok(mobileText>=11);
 await page.screenshot({path:'evidence/ui-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);
 assert.equal(await page.locator('.history-list li').count(),5);
 const bundle=JSON.parse(readFileSync('evidence/local-evm-bundle.json','utf8'));
 await page.setViewportSize({width:1440,height:1100});
 await page.locator('#bundle-file').setInputFiles('evidence/local-evm-bundle.json');
 await page.locator('.import-banner').waitFor();
 assert.ok((await page.locator('.import-banner').innerText()).includes('File origin is not authenticated'));
 assert.equal(await page.locator('.row-result.pass').count(),9);
 assert.ok((await page.locator('.receipt-reference code').innerText())===bundle.receiptHash);
 const importedDownload=page.waitForEvent('download');await page.getByRole('button',{name:'Download receipt JSON'}).click();const importedReceipt=JSON.parse(readFileSync((await (await importedDownload).path())!,'utf8'));assert.equal(importedReceipt.receiptHash,bundle.receiptHash);assert.equal(importedReceipt.evidenceLevel,'local-evm');
 await page.screenshot({path:'evidence/ui-import.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));await page.screenshot({path:'evidence/ui-import-mobile.png',fullPage:true});
 for(const [name,status] of [['ready','REVIEW_READY'],['tampered','HOLD']]){
  const path=`evidence/cre-${name}-bundle.json`;const cliBundle=JSON.parse(readFileSync(path,'utf8'));
  await page.setViewportSize({width:1440,height:1100});await page.locator('#bundle-file').setInputFiles(path);await page.locator('.import-banner').waitFor();
  assert.equal(await page.locator('.receipt-reference code').innerText(),cliBundle.receiptHash);
  await page.locator('.decision-panel').getByText(status==='HOLD'?'Hold for review':'Ready for human review',{exact:true}).waitFor();
  if(status==='HOLD'){assert.ok(await page.getByText('Delivery commitment mismatch',{exact:true}).isVisible());}
  await page.screenshot({path:`evidence/ui-cre-${name}.png`,fullPage:true});
 }
 const modified={...bundle,delivery:{...bundle.delivery,body:'substituted delivery'}};
 await page.locator('#bundle-file').setInputFiles({name:'changed.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(modified))});
 await page.getByRole('alert').waitFor();assert.ok((await page.getByRole('alert').innerText()).includes('fingerprint mismatch'));assert.ok(await page.getByRole('button',{name:'Download receipt JSON'}).isDisabled());
 await page.locator('#bundle-file').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{')});await page.getByRole('alert').waitFor();assert.ok((await page.getByRole('alert').innerText()).includes('not valid JSON'));
 await page.locator('[data-scenario="clean"]').click();assert.equal(await page.locator('.import-banner').count(),0);assert.ok(await page.getByRole('button',{name:'Download receipt JSON'}).isDisabled());
 const report={checkedAt:new Date().toISOString(),designVersion:'Operations desk v2.2 — portable evidence',browser:'Microsoft Edge via Playwright, headless',fallback:'Browser plugin not available',url:page.url(),viewports:['1440x1100','1024x900','390x844'],checks:{pageIdentity:true,nonblank:true,noFrameworkOverlay:true,consoleErrors:errors,allSixScenarios:true,downloadedReceipt:true,mobileNoHorizontalOverflow:true,tabletNoHorizontalOverflow:true,mobileComparisonReadable:true,rawDeliveryDisclosure:true,contractDisclosure:true,sevenReconciliationRows:true,blockedRowHighlights:true,scenarioResetDisablesExport:true,sessionHistory:true,localEvidenceImport:true,importedReceiptFingerprint:true,modifiedImportRejected:true,invalidJsonRejected:true,importReset:true,officialCliReadyReplay:true,officialCliHoldReplay:true},screenshots:['ui-idle.png','ui-desktop.png','ui-hold.png','ui-tablet.png','ui-mobile.png','ui-import.png','ui-import-mobile.png','ui-cre-ready.png','ui-cre-tampered.png']};
 writeFileSync('evidence/ui-qa.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();server?.kill();}
