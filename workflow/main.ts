import { CronCapability, HTTPClient, EVMClient, handler, consensusIdenticalAggregation, Runner, type NodeRuntime, type Runtime, getNetwork, LAST_FINALIZED_BLOCK_NUMBER, encodeCallMsg, bytesToHex, blockNumber, protoBigIntToBigint } from '@chainlink/cre-sdk';
import { encodeFunctionData, decodeFunctionResult, zeroAddress } from 'viem';
import { evaluate, digest, type Terms, type Snapshot } from '../src/policy';
import { escrowAbi } from '../src/abi';
type Config = {schedule:string; apiUrl:string; chainName:string; evidenceLevel:'local-evm'|'public-rpc'; terms:Terms};
function fetchDelivery(runtime:NodeRuntime<Config>):string {
 const response=new HTTPClient().sendRequest(runtime,{url:runtime.config.apiUrl,method:'GET'}).result();
 if(response.statusCode!==200) throw Error(`Delivery API returned ${response.statusCode}`);
 if(response.body.length>32768) throw Error('Delivery payload exceeds 32 KiB');
 const d=JSON.parse(new TextDecoder().decode(response.body));
 if(typeof d.id!=='string'||typeof d.body!=='string') throw Error('Invalid delivery API response');
 return JSON.stringify({id:d.id,body:d.body});
}
const onCron = (runtime:Runtime<Config>) => {
 const cfg=runtime.config;
 // Text must agree exactly across nodes. A median cannot establish document integrity.
 const d=JSON.parse(runtime.runInNodeMode(fetchDelivery,consensusIdenticalAggregation<string>())().result());
 const network=getNetwork({chainFamily:'evm',chainSelectorName:cfg.chainName});
 if(!network || cfg.chainName!=='ethereum-testnet-sepolia'||cfg.terms.chainId!==11155111) throw Error('Only Sepolia terms supported in v1');
 const evm=new EVMClient(network.chainSelector.selector);
 const header=evm.headerByNumber(runtime,{blockNumber:LAST_FINALIZED_BLOCK_NUMBER}).result().header;
 if(!header?.blockNumber)throw Error('Finalized header unavailable');
 const height=protoBigIntToBigint(header.blockNumber);
 const call=evm.callContract(runtime,{call:encodeCallMsg({from:zeroAddress,to:cfg.terms.contract,data:encodeFunctionData({abi:escrowAbi,functionName:'evidence'})}),blockNumber:blockNumber(height)}).result();
 const s=decodeFunctionResult({abi:escrowAbi,functionName:'evidence',data:bytesToHex(call.data)});
 if(s[0]!==digest(cfg.terms.id)||Number(s[4])!==cfg.terms.deadline||Number(s[5])!==cfg.terms.challengeSeconds) throw Error('Onchain contractual terms mismatch');
 const now=Math.floor(runtime.now().getTime()/1000);
 const snapshot:Snapshot={chainId:cfg.terms.chainId,contract:cfg.terms.contract,id:cfg.terms.id,artifactHash:s[1],payee:s[2],amountWei:String(s[3]),disputed:s[7],released:s[8],blockNumber:String(height),blockHash:bytesToHex(header.hash),observedAt:now,finalized:true,evidenceLevel:cfg.evidenceLevel};
 const receipt=evaluate(cfg.terms,{...d,accepted:s[6]>0n,acceptedAt:Number(s[6])},snapshot,now);
 runtime.log(JSON.stringify(receipt));
 return receipt;
};
export async function main(){const runner=await Runner.newRunner<Config>();await runner.run((cfg)=>[handler(new CronCapability().trigger({schedule:cfg.schedule}),onCron)]);}
