import { keccak256, stringToHex, encodeAbiParameters } from 'viem';
export const digest = (s: string) => keccak256(stringToHex(s));
export type Terms = { id: string; artifactHash: `0x${string}`; payee: `0x${string}`; amountWei: string; chainId: number; contract: `0x${string}`; deadline: number; challengeSeconds: number; policyVersion: '1' };
export type Delivery = { id: string; body: string; accepted: boolean; acceptedAt: number };
export type Snapshot = { chainId: number; contract: string; id: string; artifactHash: string; payee: string; amountWei: string; disputed: boolean; released: boolean; blockNumber: string; blockHash: string; observedAt: number; finalized: boolean; evidenceLevel: 'fixture'|'local-evm'|'public-rpc' };
export type Decision = { status: 'HOLD'|'REVIEW_READY'; reasons: string[]; receiptHash: string; artifactHash: string; authorization: 'HUMAN_REQUIRED'; evidenceLevel: Snapshot['evidenceLevel']; terms: Terms; snapshot: Snapshot; evaluatedAt: number };
const addr = /^0x[0-9a-fA-F]{40}$/;
const hash = /^0x[0-9a-fA-F]{64}$/;
export const canonical = (v: unknown): string => {
  if(Array.isArray(v)) return '['+v.map(canonical).join(',')+']';
  if(v!==null && typeof v==='object') return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical((v as Record<string,unknown>)[k])).join(',')+'}';
  return JSON.stringify(v);
};
export function evaluate(t: Terms, d: Delivery, s: Snapshot, now: number): Decision {
  if (!t || !d || !s || !addr.test(t.payee) || !addr.test(t.contract) || !hash.test(t.artifactHash) || !/^\d+$/.test(t.amountWei) || BigInt(t.amountWei) <= 0n || !Number.isSafeInteger(t.chainId) || t.chainId <= 0 || !Number.isSafeInteger(now) || !Number.isSafeInteger(t.deadline) || !Number.isSafeInteger(t.challengeSeconds) || t.challengeSeconds < 0 || t.policyVersion !== '1' || typeof d.body !== 'string' || typeof d.accepted !== 'boolean' || !Number.isSafeInteger(d.acceptedAt) || typeof s.disputed !== 'boolean' || typeof s.released !== 'boolean' || typeof s.finalized !== 'boolean' || !Number.isSafeInteger(s.observedAt) || !/^\d+$/.test(s.blockNumber) || !hash.test(s.blockHash) || !['fixture','local-evm','public-rpc'].includes(s.evidenceLevel)) throw new Error('Invalid evidence schema');
  const reasons: string[] = [];
  const artifactHash = digest(d.body);
  if (d.id !== t.id || s.id !== t.id) reasons.push('Milestone identifier mismatch');
  if (artifactHash.toLowerCase() !== t.artifactHash.toLowerCase() || s.artifactHash.toLowerCase() !== t.artifactHash.toLowerCase()) reasons.push('Delivery commitment mismatch');
  if (s.chainId !== t.chainId || s.contract.toLowerCase() !== t.contract.toLowerCase()) reasons.push('Wrong chain or escrow contract');
  if (s.payee.toLowerCase() !== t.payee.toLowerCase() || s.amountWei !== t.amountWei) reasons.push('Beneficiary or amount changed');
  if (s.disputed) reasons.push('Open dispute blocks release review');
  if (s.released) reasons.push('Milestone already released');
  if (!s.finalized) reasons.push('Chain snapshot is not finalized');
  if (s.observedAt > now || now - s.observedAt > 300) reasons.push('Chain snapshot is stale or from the future');
  if (!d.accepted || d.acceptedAt <= 0) reasons.push('Client acceptance missing');
  if (d.acceptedAt > t.deadline) reasons.push('Acceptance after contractual deadline');
  if (d.acceptedAt > now || now < d.acceptedAt + t.challengeSeconds) reasons.push('Challenge window has not elapsed');
  const status = reasons.length ? 'HOLD' : 'REVIEW_READY';
  // Fixed ABI encoding binds all terms, observations, source level and result; no object-key ambiguity.
  const receiptHash = keccak256(encodeAbiParameters([{type:'string'},{type:'string'},{type:'bytes32'},{type:'address'},{type:'uint256'},{type:'uint256'},{type:'address'},{type:'uint256'},{type:'uint256'},{type:'string'},{type:'string'},{type:'string'},{type:'uint256'}], ['ACCORD/1',canonical(t),artifactHash,t.payee,BigInt(t.amountWei),BigInt(t.chainId),t.contract,BigInt(t.deadline),BigInt(t.challengeSeconds),canonical(s),canonical(d),status,BigInt(now)]));
  return {status,reasons,receiptHash,artifactHash,authorization:'HUMAN_REQUIRED',evidenceLevel:s.evidenceLevel,terms:t,snapshot:s,evaluatedAt:now};
}
