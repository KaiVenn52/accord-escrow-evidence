import {writeFileSync} from 'node:fs';
import {runLocalChain} from './local-chain';
const evidence=await runLocalChain(true);writeFileSync('evidence/local-evm.json',JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence,null,2));
