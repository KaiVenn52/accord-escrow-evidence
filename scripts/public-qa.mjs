import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const url='https://kaivenn52.github.io/accord-escrow-evidence/';
const browser=await chromium.launch({channel:'msedge',headless:true});
const consoleErrors=[];
const failedResponses=[];
const failedRequests=[];
try {
 const page=await browser.newPage({viewport:{width:1440,height:1100}});
 page.on('pageerror',e=>consoleErrors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
 page.on('response',r=>{if(r.status()>=400)failedResponses.push({url:r.url(),status:r.status()});});
 page.on('requestfailed',r=>failedRequests.push({url:r.url(),error:r.failure()?.errorText}));
 const response=await page.goto(url,{waitUntil:'networkidle',timeout:60000});
 assert.equal(response.status(),200);
 assert.equal(await page.title(),'Accord — Escrow Evidence Desk');
 await page.getByRole('heading',{name:'Software handover',exact:true}).waitFor();
 const styles=await page.evaluate(()=>({sheets:document.styleSheets.length,background:getComputedStyle(document.body).backgroundColor,appbar:getComputedStyle(document.querySelector('.appbar')).height}));
 console.log(JSON.stringify({styles,consoleErrors,failedRequests,failedResponses}));
 assert.equal(styles.appbar,'60px','Published stylesheet must apply before interaction QA.');
 for(const [scenario,outcome] of [['clean','Ready for human review'],['tampered','Hold for review'],['disputed','Hold for review'],['stale','Hold for review'],['changed','Hold for review'],['pending','Hold for review']]) {
  await page.locator(`[data-scenario="${scenario}"]`).click();
  await page.getByRole('button',{name:'Verify evidence bundle'}).click();
  await page.locator('.decision-panel').getByText(outcome,{exact:true}).waitFor();
 }
 for(const name of ['ready','tampered']) {
  const file=`evidence/cre-${name}-bundle.json`;
  const expected=JSON.parse(readFileSync(file,'utf8'));
  await page.locator('#bundle-file').setInputFiles(file);
  await page.locator('.import-banner').waitFor();
  assert.equal(await page.locator('.receipt-reference code').innerText(),expected.receiptHash);
  await page.locator('.decision-panel').getByText(name==='ready'?'Ready for human review':'Hold for review',{exact:true}).waitFor();
 }
 const pending=page.waitForEvent('download');
 await page.getByRole('button',{name:'Download receipt JSON'}).click();
 const download=await pending;
 const receipt=JSON.parse(readFileSync(await download.path(),'utf8'));
 assert.equal(receipt.status,'HOLD');
 assert.equal(receipt.authorization,'HUMAN_REQUIRED');
 await page.screenshot({path:'evidence/public-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:'evidence/public-mobile.png',fullPage:true});
 assert.deepEqual(consoleErrors,[]);
 assert.deepEqual(failedResponses,[]);
 assert.deepEqual(failedRequests,[]);
 const report={checkedAt:new Date().toISOString(),url:page.url(),status:response.status(),browser:'Microsoft Edge via Playwright',fallback:'Browser plugin not available',viewports:['1440x1100','390x844'],checks:{pageIdentity:true,stylesheetApplied:true,sixScenarios:true,actualCliReadyReplay:true,actualCliHoldReplay:true,receiptDownload:true,mobileNoOverflow:true},consoleErrors,failedRequests,failedResponses};
 writeFileSync('evidence/public-qa.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));
} finally {await browser.close();}
