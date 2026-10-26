import {z} from 'zod';
import {evaluate,type Terms,type Delivery,type Snapshot} from './policy';
const integer=z.number().int().nonnegative().max(253402300799);
const address=z.string().regex(/^0x[0-9a-fA-F]{40}$/);
const hash=z.string().regex(/^0x[0-9a-fA-F]{64}$/);
const id=z.string().regex(/^[A-Za-z0-9_-]{1,64}$/);
const amount=z.string().regex(/^[1-9][0-9]{0,77}$/);
const schema=z.object({
 schemaVersion:z.literal('accord-evidence/1'),
 terms:z.object({id,artifactHash:hash,payee:address,amountWei:amount,chainId:z.literal(11155111),contract:address,deadline:integer,challengeSeconds:integer,policyVersion:z.literal('1')}).strict(),
 delivery:z.object({id,body:z.string().max(32768),accepted:z.boolean(),acceptedAt:integer}).strict(),
 snapshot:z.object({id,chainId:z.literal(11155111),contract:address,artifactHash:hash,payee:address,amountWei:amount,disputed:z.boolean(),released:z.boolean(),blockNumber:z.string().regex(/^[0-9]{1,78}$/),blockHash:hash,observedAt:integer,finalized:z.boolean(),evidenceLevel:z.enum(['fixture','local-evm'])}).strict(),
 evaluatedAt:integer,receiptHash:hash
}).strict();
export type EvidenceBundle={schemaVersion:'accord-evidence/1';terms:Terms;delivery:Delivery;snapshot:Snapshot;evaluatedAt:number;receiptHash:string};
export const MAX_BUNDLE_BYTES=131072;
export function createBundle(terms:Terms,delivery:Delivery,snapshot:Snapshot,evaluatedAt:number):EvidenceBundle{
 return {schemaVersion:'accord-evidence/1',terms,delivery,snapshot,evaluatedAt,receiptHash:evaluate(terms,delivery,snapshot,evaluatedAt).receiptHash};
}
export function parseBundle(text:string):EvidenceBundle{
 if(new TextEncoder().encode(text).length>MAX_BUNDLE_BYTES)throw Error('Evidence file exceeds 128 KiB.');
 let value:unknown;try{value=JSON.parse(text);}catch{throw Error('Evidence file is not valid JSON.');}
 const parsed=schema.safeParse(value);if(!parsed.success)throw Error('Unsupported evidence bundle. Use an accord-evidence/1 file containing terms, delivery, snapshot and a receipt fingerprint.');
 const b=parsed.data as EvidenceBundle;
 if(new TextEncoder().encode(b.delivery.body).length>32768)throw Error('Delivery text exceeds 32 KiB.');
 if(evaluate(b.terms,b.delivery,b.snapshot,b.evaluatedAt).receiptHash.toLowerCase()!==b.receiptHash.toLowerCase())throw Error('Receipt fingerprint mismatch. The evidence or claimed fingerprint has changed.');
 return b;
}
