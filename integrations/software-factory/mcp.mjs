import { factoryRequest } from './runtime.mjs';
export function registerFactoryTool(server,z,name) {
  server.tool(name,'Bounded verification and read-only feedback coordinator. status, contract, intake and queue inspect existing sources; verify/fuzz execute the prepared OS snapshot; claim/propose/release manage local intake only. prepare builds only the approved local verifier image. No model calls, application launch, remote writes or repository permission.',{
    operation:z.enum(['status','contract','intake','queue','claim','propose','release','prepare','verify','fuzz','journey','maintain','ui-features','ui-admit','ui-capture','ui-validate','ui-image']),
    base:z.string().regex(/^[a-f0-9]{40}$/).optional(),head:z.string().regex(/^[a-f0-9]{40}$/).optional(),
    id:z.string().regex(/^[a-f0-9]{64}$/).optional(),version:z.string().max(100).optional(),
    owner:z.string().min(1).max(100).optional(),token:z.string().uuid().optional(),
    reproduction:z.string().min(1).max(4000).optional(),acceptance:z.array(z.string().min(1).max(1000)).min(1).max(10).optional(),
    feature_ids:z.array(z.string().max(80)).min(1).max(5).optional(),contract:z.record(z.any()).optional(),admission:z.string().max(600).optional(),phase:z.enum(['before','after']).optional(),route:z.string().max(300).optional(),state:z.string().max(30).optional(),checks:z.array(z.record(z.any())).max(20).optional(),receipts:z.array(z.string().max(600)).max(16).optional(),file:z.string().max(600).optional()
  },async args=>{
    try{const result=await factoryRequest(args);return args.operation==='ui-image'?{content:[{type:'image',mimeType:result.mimeType,data:result.data}]}:{content:[{type:'text',text:JSON.stringify(result)}]};}
    catch(error){return {isError:true,content:[{type:'text',text:error.message}]};}
  });
}
