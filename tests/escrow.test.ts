import test from 'node:test';
import assert from 'node:assert/strict';
import {runLocalChain} from '../scripts/local-chain';
test('funded Solidity escrow enforces payer, acceptance, challenge, dispute and single release',{timeout:60000},async()=>{const r=await runLocalChain();assert.equal(r.checks.length,12);assert.equal(r.receipt.status,'REVIEW_READY');});
