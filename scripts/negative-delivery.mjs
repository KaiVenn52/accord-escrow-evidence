import {createServer} from 'node:http';
import {readFileSync,writeFileSync} from 'node:fs';
const config=JSON.parse(readFileSync('workflow/config.local.json','utf8'));
const original=await (await fetch(config.apiUrl)).json();
config.apiUrl='http://127.0.0.1:8756/delivery';
writeFileSync('workflow/config.tampered.local.json',JSON.stringify(config,null,2));
const server=createServer((req,res)=>{if(req.url!=='/delivery'){res.writeHead(404);res.end();return;}res.setHeader('Content-Type','application/json');res.end(JSON.stringify({...original,body:original.body+' Altered after commitment.'}));});
server.listen(8756,'127.0.0.1',()=>console.log('Controlled altered delivery API: http://127.0.0.1:8756/delivery; no public provider'));
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
