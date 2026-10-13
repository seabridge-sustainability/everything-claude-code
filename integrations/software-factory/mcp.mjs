import { factoryRequest } from './runtime.mjs';
export function registerFactoryTool(server,z,name) {
  server.tool(name,'Bounded verification and read-only feedback coordinator. status, contract, intake and queue inspect existing sources; verify/fuzz execute the prepared OS snapshot; claim/propose/release manage local intake only. prepare builds only the approved local verifier image. No model calls, application launch, remote writes or repository permission.',{
    operation:z.enum(['status','contract','intake','queue','claim','propose','release','prepare','verify','fuzz','journey']),
    id:z.string().regex(/^[a-f0-9]{64}$/).optional(),version:z.string().max(100).optional(),
    owner:z.string().min(1).max(100).optional(),token:z.string().uuid().optional(),
    reproduction:z.string().min(1).max(4000).optional(),acceptance:z.array(z.string().min(1).max(1000)).min(1).max(10).optional()
  },async args=>{
    try{return {content:[{type:'text',text:JSON.stringify(await factoryRequest(args))}]};}
    catch(error){return {isError:true,content:[{type:'text',text:error.message}]};}
  });
}
