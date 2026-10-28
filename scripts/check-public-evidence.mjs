import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
for(const name of ['cre-ready-bundle.json','cre-tampered-bundle.json','cre-simulation-success.txt','cre-simulation-tampered.txt']){
 assert.ok(readFileSync(new URL('../evidence/'+name,import.meta.url)).equals(readFileSync(new URL('../public/evidence/'+name,import.meta.url))),`Published evidence differs from original: ${name}`);
}
console.log('Published CRE evidence: all four files match original bytes.');
