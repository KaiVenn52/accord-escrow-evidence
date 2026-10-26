import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate, digest } from '../src/policy';
import { terms, delivery, snapshot, demoNow, scenarios } from '../src/fixtures';
test('matching evidence produces a review receipt, never a payment authorization',()=>{
 const r=evaluate(terms,delivery,snapshot,demoNow); assert.equal(r.status,'REVIEW_READY'); assert.equal(r.authorization,'HUMAN_REQUIRED'); assert.equal(r.evidenceLevel,'fixture');
 assert.equal(r.receiptHash,evaluate(terms,delivery,snapshot,demoNow).receiptHash);
});
for(const [name,s] of Object.entries(scenarios).filter(([n])=>n!=='clean')) test(`${name} fails closed`,()=>assert.equal(evaluate(terms,s.delivery,s.snapshot,demoNow).status,'HOLD'));
const mutations = {
 'wrong chain':{chainId:1}, 'wrong contract':{contract:'0x4444444444444444444444444444444444444444'},
 'wrong milestone':{id:'M-999'}, 'changed amount':{amountWei:'1'}, 'already released':{released:true},
 'unfinalized':{finalized:false}, 'future snapshot':{observedAt:demoNow+1},'wrong onchain commitment':{artifactHash:digest('different')}
};
for(const [n,patch] of Object.entries(mutations))test(n,()=>assert.equal(evaluate(terms,delivery,{...snapshot,...patch},demoNow).status,'HOLD'));
test('missing acceptance',()=>assert.equal(evaluate(terms,{...delivery,accepted:false},snapshot,demoNow).status,'HOLD'));
test('late acceptance',()=>assert.equal(evaluate({...terms,deadline:demoNow-10000},delivery,snapshot,demoNow).status,'HOLD'));
test('zero acceptance timestamp is invalid acceptance',()=>assert.equal(evaluate(terms,{...delivery,acceptedAt:0},snapshot,demoNow).status,'HOLD'));
test('receipt changes with amount, source level, block or evaluation time',()=>{
 const r=evaluate(terms,delivery,snapshot,demoNow);
 for(const s of [{...snapshot,amountWei:'1'},{...snapshot,evidenceLevel:'local-evm' as const},{...snapshot,blockHash:digest('other block')}]) assert.notEqual(r.receiptHash,evaluate(terms,delivery,s,demoNow).receiptHash);
 assert.notEqual(r.receiptHash,evaluate(terms,delivery,snapshot,demoNow+1).receiptHash);
});
test('invalid schema is rejected',()=>{
 for(const patch of [{amountWei:'-1'},{amountWei:'0'},{payee:'invalid'},{challengeSeconds:-1},{deadline:NaN}]) assert.throws(()=>evaluate({...terms,...patch} as any,delivery,snapshot,demoNow));
 assert.throws(()=>evaluate(terms,delivery,{...snapshot,disputed:'false'} as any,demoNow));
});
test('challenge period exact boundary is reviewable',()=>assert.equal(evaluate(terms,{...delivery,acceptedAt:demoNow-3600},snapshot,demoNow).status,'REVIEW_READY'));
test('object key order cannot change the receipt',()=>{const reordered=Object.fromEntries(Object.entries(snapshot).reverse());assert.equal(evaluate(terms,delivery,snapshot,demoNow).receiptHash,evaluate(terms,delivery,reordered as any,demoNow).receiptHash);});
