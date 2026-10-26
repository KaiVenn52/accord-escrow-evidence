import { digest, type Terms, type Delivery, type Snapshot } from './policy';
export const demoNow = 1792281600;
export const body = 'Milestone M-014: source archive, deployment guide and acceptance checklist delivered.';
export const terms: Terms = {id:'M-014',artifactHash:digest(body),payee:'0x1111111111111111111111111111111111111111',amountWei:'15000000000000000',chainId:11155111,contract:'0x2222222222222222222222222222222222222222',deadline:demoNow+86400,challengeSeconds:3600,policyVersion:'1'};
export const delivery: Delivery = {id:terms.id,body,accepted:true,acceptedAt:demoNow-7200};
export const snapshot: Snapshot = {chainId:terms.chainId,contract:terms.contract,id:terms.id,artifactHash:terms.artifactHash,payee:terms.payee,amountWei:terms.amountWei,disputed:false,released:false,blockNumber:'7149000',blockHash:digest('SYNTHETIC BLOCK'),observedAt:demoNow,finalized:true,evidenceLevel:'fixture'};
export const scenarios = {
  clean: {label:'Accepted delivery',description:'Matching commitment, acceptance recorded, challenge period elapsed.',delivery,snapshot},
  tampered: {label:'Altered artifact',description:'The delivered bytes changed after the commitment was agreed.',delivery:{...delivery,body:body+' Changed.'},snapshot},
  disputed: {label:'Open dispute',description:'Matching delivery does not override a client dispute.',delivery,snapshot:{...snapshot,disputed:true}},
  stale: {label:'Stale chain read',description:'An old observation cannot authorize a current decision.',delivery,snapshot:{...snapshot,observedAt:demoNow-600}},
  changed: {label:'Changed beneficiary',description:'A matching document cannot redirect the payout.',delivery,snapshot:{...snapshot,payee:'0x3333333333333333333333333333333333333333'}},
  pending: {label:'Challenge period',description:'Client acceptance starts a contractual waiting period.',delivery:{...delivery,acceptedAt:demoNow-60},snapshot}
};
