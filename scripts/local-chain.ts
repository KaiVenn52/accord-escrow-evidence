import ganache from 'ganache';
import solc from 'solc';
import { readFileSync, writeFileSync } from 'node:fs';
import { createPublicClient, createWalletClient, custom, parseEther, keccak256, toHex } from 'viem';
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { terms, delivery, body } from '../src/fixtures';
import { evaluate, digest, type Terms, type Snapshot } from '../src/policy';
import assert from 'node:assert/strict';
import {createBundle} from '../src/bundle';
export async function runLocalChain(emitBundle=false) {
 const provider=ganache.provider({logging:{quiet:true},chain:{chainId:11155111,hardfork:'shanghai'},wallet:{deterministic:true}});
 try {
 const publicClient=createPublicClient({chain:sepolia,transport:custom(provider as any),cacheTime:0});
 const wallet=createWalletClient({chain:sepolia,transport:custom(provider as any)});
 const [payerAddress,payee,outsiderAddress]=await wallet.getAddresses();
 const initial=provider.getInitialAccounts();
 const payer=privateKeyToAccount(initial[payerAddress.toLowerCase()].secretKey as `0x${string}`);
 const outsider=privateKeyToAccount(initial[outsiderAddress.toLowerCase()].secretKey as `0x${string}`);
 const source=readFileSync('contracts/EvidenceEscrow.sol','utf8');
 const compiled=JSON.parse(solc.compile(JSON.stringify({language:'Solidity',sources:{'EvidenceEscrow.sol':{content:source}},settings:{evmVersion:'shanghai',outputSelection:{'*':{'*':['abi','evm.bytecode.object']}}}})));
 const errors=(compiled.errors??[]).filter((e:any)=>e.severity==='error'); if(errors.length)throw Error(JSON.stringify(errors));
 const artifact=compiled.contracts['EvidenceEscrow.sol'].EvidenceEscrow;
 const block=await publicClient.getBlock();
 const deadline=Number(block.timestamp)+86400;
 const hash=await wallet.deployContract({account:payer,abi:artifact.abi,bytecode:`0x${artifact.evm.bytecode.object}`,args:[payee,digest(terms.id),digest(body),BigInt(deadline),3600n],value:parseEther('0.015')});
 const deployment=await publicClient.waitForTransactionReceipt({hash});
 const address=deployment.contractAddress!;
 const t:Terms={...terms,payee,contract:address,deadline};
 const send=async(functionName:string,account=payer)=>{const h=await wallet.writeContract({account,address,abi:artifact.abi,functionName,gas:300000n});const receipt=await publicClient.waitForTransactionReceipt({hash:h});assert.equal(receipt.status,'success');return h;};
 const expectRevert=async(functionName:string,account=payer)=>{await assert.rejects(()=>publicClient.simulateContract({account,address,abi:artifact.abi,functionName}));};
 await expectRevert('accept',outsider); await expectRevert('release');
 await send('accept');
 await expectRevert('accept'); await expectRevert('release');
 await provider.request({method:'evm_increaseTime',params:[3601]});await provider.request({method:'evm_mine',params:[]});
 const b=await publicClient.getBlock();
 const state=await publicClient.readContract({address,abi:artifact.abi,functionName:'evidence',blockNumber:b.number}) as any[];
 const s:Snapshot={id:terms.id,chainId:11155111,contract:address,payee,amountWei:String(state[3]),artifactHash:state[1],disputed:state[7],released:state[8],blockNumber:String(b.number),blockHash:b.hash,observedAt:Number(b.timestamp),finalized:true,evidenceLevel:'local-evm'};
 const r=evaluate(t,{...delivery,acceptedAt:Number(state[6])},s,Number(b.timestamp)); assert.equal(r.status,'REVIEW_READY');
 const bundle=createBundle(t,{...delivery,acceptedAt:Number(state[6])},s,Number(b.timestamp));
 if(emitBundle)writeFileSync('evidence/local-evm-bundle.json',JSON.stringify(bundle,null,2));
 await expectRevert('release',outsider);
 const balance=await publicClient.getBalance({address:payee}); const releaseTx=await send('release');
 assert.equal(await publicClient.getBalance({address:payee}),balance+parseEther('0.015'));
 await expectRevert('release');
 const after=evaluate(t,{...delivery,acceptedAt:Number(state[6])},{...s,released:true},Number(b.timestamp)); assert.equal(after.status,'HOLD');
 const disputedDeploy=await wallet.deployContract({account:payer,abi:artifact.abi,bytecode:`0x${artifact.evm.bytecode.object}`,args:[payee,digest('DISPUTED'),digest(body),BigInt(deadline),0n],value:parseEther('0.001')});
 const disputedAddress=(await publicClient.waitForTransactionReceipt({hash:disputedDeploy})).contractAddress!;
 for (const fn of ['accept','openDispute']){const tx=await wallet.writeContract({account:payer,address:disputedAddress,abi:artifact.abi,functionName:fn,gas:300000n});assert.equal((await publicClient.waitForTransactionReceipt({hash:tx})).status,'success');}
 await assert.rejects(()=>publicClient.simulateContract({account:payer,address:disputedAddress,abi:artifact.abi,functionName:'release'}));
 return {kind:'local-evm-integration',network:'Ganache private chain, chainId 11155111; NOT public Sepolia',compiler:solc.version(),deploymentTx:hash,contract:address,receipt:r,releaseTx,checks:['Solidity compilation','Deployment and funded balance','Outsider cannot accept','Release without acceptance blocked','Repeated acceptance blocked','Challenge window enforced','Shared policy evaluates real contract read','Outsider cannot release','Payer releases exact amount after challenge','Double release blocked','Released state holds','Dispute blocks release'],publicDeployment:false,creSimulation:false};
 }finally{await provider.disconnect();}
}
