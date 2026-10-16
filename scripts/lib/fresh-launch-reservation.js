'use strict';

// Invocation-local lifecycle adapter over the existing machine queue. No new
// scheduler, native trust grant, global configuration or existing-process adoption.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const { createQueueStore, createMachineQueueGuard } = require('./workspace-queue-store');
const { resourceKey } = require('./workspace-queue');
const { withFileLock, canonicalJson } = require('./goal-store');
const { writeFileAtomic } = require('./atomic-write');
const coord = require('./session-coordination');
const digest = value => crypto.createHash('sha256').update(canonicalJson(value)).digest('hex');
function demand(value, message) { if (!value) throw Error(message); }
class NotStarted extends Error {}

// The foreground Node supervisor, native metadata process, client and all their
// descendants enter one Windows Job before the suspended root is resumed.
// Only this NEW job is terminated on foreground exit or supervisor loss. A
// positive receipt requires querying ActiveProcesses==0; PID absence is not used.
const JOB_SCRIPT = String.raw`
$ErrorActionPreference='Stop'
try {
  $spec=$env:ECC_NATIVE_JOB_REQUEST | ConvertFrom-Json
  [Environment]::SetEnvironmentVariable('ECC_NATIVE_JOB_REQUEST',$null,'Process')
  Add-Type -TypeDefinition @'
using System;
using System.Text;
using System.IO;
using System.Diagnostics;
using System.Runtime.InteropServices;
public static class EccOwnedNativeJob {
 [StructLayout(LayoutKind.Sequential,CharSet=CharSet.Unicode)] struct SI {public int cb;public string reserved,desktop,title;public int x,y,xsize,ysize,xchars,ychars,fill,flags;public short show,reserved2;public IntPtr reservedPtr,input,output,error;}
 [StructLayout(LayoutKind.Sequential)] struct PI {public IntPtr process,thread;public int pid,tid;}
 [StructLayout(LayoutKind.Sequential)] struct BasicLimit {public long processTime,jobTime;public uint flags;public UIntPtr minWS,maxWS;public uint active;public UIntPtr affinity;public uint priority,scheduling;}
 [StructLayout(LayoutKind.Sequential)] struct IO {public ulong ro,wo,oo,rb,wb,ob;}
 [StructLayout(LayoutKind.Sequential)] struct Limits {public BasicLimit basic;public IO io;public UIntPtr processMemory,jobMemory,peakProcess,peakJob;}
 [StructLayout(LayoutKind.Sequential)] struct Accounting {public long user,kernel,periodUser,periodKernel;public uint faults,total,active,terminated;}
 [DllImport("kernel32.dll",CharSet=CharSet.Unicode,SetLastError=true)] static extern IntPtr CreateJobObject(IntPtr a,string name);
 [DllImport("kernel32.dll",SetLastError=true)] static extern bool SetInformationJobObject(IntPtr j,int type,ref Limits data,uint size);
 [DllImport("kernel32.dll",SetLastError=true)] static extern bool QueryInformationJobObject(IntPtr j,int type,out Accounting data,uint size,IntPtr result);
 [DllImport("kernel32.dll",CharSet=CharSet.Unicode,SetLastError=true)] static extern bool CreateProcess(string exe,StringBuilder command,IntPtr pa,IntPtr ta,bool inherit,uint flags,IntPtr env,string cwd,ref SI si,out PI pi);
 [DllImport("kernel32.dll",SetLastError=true)] static extern bool AssignProcessToJobObject(IntPtr job,IntPtr process);
 [DllImport("kernel32.dll")] static extern uint ResumeThread(IntPtr t);
 [DllImport("kernel32.dll")] static extern uint WaitForSingleObject(IntPtr h,uint ms);
 [DllImport("kernel32.dll")] static extern bool GetExitCodeProcess(IntPtr h,out uint code);
 [DllImport("kernel32.dll")] static extern bool TerminateJobObject(IntPtr h,uint code);
 [DllImport("kernel32.dll")] static extern bool TerminateProcess(IntPtr h,uint code);
 [DllImport("kernel32.dll")] static extern bool CloseHandle(IntPtr h);
 [DllImport("kernel32.dll")] static extern IntPtr GetStdHandle(int n);
 static string Quote(string s) {var b=new StringBuilder("\"");int n=0;foreach(char c in s){if(c=='\\'){n++;continue;}b.Append('\\',c=='"'?2*n+1:n);b.Append(c);n=0;}b.Append('\\',2*n);return b.Append('"').ToString();}
 static void Write(string file,string value) {using(var f=new FileStream(file,FileMode.CreateNew,FileAccess.Write,FileShare.None))using(var w=new StreamWriter(f,new UTF8Encoding(false)))w.Write(value);}
 public static int Run(string exe,string[] args,string cwd,string startFile,string endFile,string nonce,string binding,int supervisor) {
  IntPtr job=IntPtr.Zero; PI pi=new PI();bool assigned=false;uint code=2;
  using(var parent=Process.GetProcessById(supervisor)) {
   long birth=parent.StartTime.ToUniversalTime().Ticks;
   try {
    job=CreateJobObject(IntPtr.Zero,null);if(job==IntPtr.Zero)throw new Exception();
    var limits=new Limits();limits.basic.flags=0x2000; // KILL_ON_JOB_CLOSE; no breakaway flag.
    if(!SetInformationJobObject(job,9,ref limits,(uint)Marshal.SizeOf(typeof(Limits))))throw new Exception();
    var si=new SI();si.cb=Marshal.SizeOf(typeof(SI));si.flags=0x100;si.input=GetStdHandle(-10);si.output=GetStdHandle(-11);si.error=GetStdHandle(-12);
    var command=new StringBuilder(Quote(exe));foreach(string arg in args)command.Append(' ').Append(Quote(arg));
    if(!CreateProcess(exe,command,IntPtr.Zero,IntPtr.Zero,true,0x404,IntPtr.Zero,cwd,ref si,out pi))throw new Exception(); // suspended + Unicode environment
    if(!AssignProcessToJobObject(job,pi.process))throw new Exception();assigned=true;
    string identity="\"nonce\":\""+nonce+"\",\"binding\":\""+binding+"\",\"rootPid\":"+pi.pid+",\"wrapperPid\":"+Process.GetCurrentProcess().Id+",\"supervisorPid\":"+supervisor;
    Write(startFile,"{"+identity+",\"assignedBeforeResume\":true}");
    if(ResumeThread(pi.thread)==0xffffffff)throw new Exception();
    for(;;){uint state=WaitForSingleObject(pi.process,100);if(state==0){if(!GetExitCodeProcess(pi.process,out code))throw new Exception();break;}if(state!=258)throw new Exception();if(parent.HasExited||parent.StartTime.ToUniversalTime().Ticks!=birth){code=130;break;}}
    if(!TerminateJobObject(job,code))throw new Exception();
    var until=Stopwatch.StartNew();Accounting accounting;
    for(;;){if(!QueryInformationJobObject(job,1,out accounting,(uint)Marshal.SizeOf(typeof(Accounting)),IntPtr.Zero))throw new Exception();if(accounting.active==0)break;if(until.ElapsedMilliseconds>5000)throw new Exception();System.Threading.Thread.Sleep(20);}
    Write(endFile,"{"+identity+",\"treeClosed\":true,\"activeProcesses\":0,\"exitCode\":"+code+"}");
    return unchecked((int)code);
   } finally {if(pi.process!=IntPtr.Zero){if(!assigned)TerminateProcess(pi.process,2);CloseHandle(pi.process);}if(pi.thread!=IntPtr.Zero)CloseHandle(pi.thread);if(job!=IntPtr.Zero)CloseHandle(job);}
  }
 }
}
'@
  $env:ECC_FRESH_JOB_BOOTSTRAP=$spec.bootstrap
  $env:ECC_FRESH_LAUNCH_PLAN=$spec.plan
  $result=[EccOwnedNativeJob]::Run($spec.exe,[string[]]$spec.args,$spec.cwd,$spec.start,$spec.end,$spec.nonce,$spec.binding,[int]$spec.supervisor)
  exit $result
} catch { [Console]::Error.WriteLine('Owned native job failed; retain its resource claim until cessation is verified'); exit 2 }
`;

function createReservation({ repo, session, goalId, peakRamGiB, binding, authority }, capabilities = {}) {
  demand(Number.isFinite(peakRamGiB) && peakRamGiB > 0 && peakRamGiB <= 1024, 'declared positive incremental native peak required');
  demand(/^[a-f0-9]{64}$/.test(binding) && typeof authority === 'function', 'immutable native launch authority required');
  const clock = capabilities.clock || Date.now;
  const directory = capabilities.directory || coord.repository(path.resolve(__dirname, '../..')).directory;
  fs.mkdirSync(directory, { recursive: true });
  const normal = value => process.platform === 'win32' ? value.toLowerCase() : value;
  demand(normal(fs.realpathSync(directory)) === normal(path.resolve(directory)), 'linked machine directory refused');
  const id = 'native-' + digest({ repo, session, binding }).slice(0, 32);
  const file = path.join(directory, id + '.queue.json'), machineFile = path.join(directory, 'machine-queues.json');
  const paths = new Set([file, file + '.queue.lock', machineFile, machineFile + '.lock']);
  const assertWrite = targets => targets.every(target => paths.has(target));
  let closed = false;
  const machine = createMachineQueueGuard({ file: machineFile, withFileLock, atomicWrite: writeFileAtomic, assertWrite, clock });
  const store = createQueueStore({ file, withFileLock, atomicWrite: writeFileAtomic, assertWrite, machine, clock,
    readTelemetry: capabilities.readTelemetry || (() => require('./workspace-live-facts').collectMemoryWindow()),
    checkGate(entry) {
      demand(entry.id === id && entry.owner === session && entry.goalId === goalId && entry.kind === 'native-client'
        && entry.resource === repo && entry.peakRamGiB === peakRamGiB && entry.bindingSha256 === binding, 'native claim binding changed');
      if (entry.operation !== 'release') authority();
      return { allowed: true, owner: session, resource: resourceKey(entry) };
    }, confirmStopped: () => closed, });
  return { id, file, directory,
    acquire() {
      authority();
      if (fs.existsSync(file)) {
        const current = store.snapshot().entries;
        demand(current.length === 1 && current[0].id === id && current[0].owner === session && current[0].state === 'waiting'
          && !current[0].token, 'native session already running or completed; preserve its retained claim');
        // A capacity refusal launched nothing. The same waiting work may make
        // progress when resources change, without a new approval or assignment.
        const claim = store.acquire({ id, owner: session, leaseMilliseconds: 300000 });
        demand(claim.acquired, 'native startup waiting for machine capacity; no client started');
        return claim;
      }
      const now = clock();
      store.enqueue([{ id, owner: session, goalId, kind: 'native-client', resource: repo, peakRamGiB,
        bindingSha256: binding, state: 'waiting', enqueuedAt: new Date(now).toISOString(),
        nextCheckpointAt: new Date(now + 300000).toISOString(), dependsOn: [],
        reason: 'Fresh native client incremental envelope', independentAction: 'Continue bounded local work in existing sessions' }]);
      const claim = store.acquire({ id, owner: session, leaseMilliseconds: 300000 });
      demand(claim.acquired, 'native startup waiting for machine capacity; no client started');
      return claim;
    },
    recheck: claim => store.recheck(claim),
    release(claim, proof) {
      demand(proof?.treeClosed === true && proof.activeProcesses === 0 && proof.binding === binding, 'complete owned process-tree cessation required');
      closed = true;
      try { return store.release({ ...claim, outcome: proof.exitCode === 0 ? 'completed' : 'cancelled' }); }
      finally { closed = false; }
    },
    releaseUnstarted(claim, error) {
      demand(error instanceof NotStarted, 'trusted pre-spawn refusal required; preserve unknown process claim');
      closed = true;
      try { return store.release({ ...claim, outcome: 'cancelled' }); }
      finally { closed = false; }
    },
  };
}

function readReceipt(file) {
  const before = fs.lstatSync(file);
  demand(before.isFile() && !before.isSymbolicLink() && before.nlink === 1 && before.size <= 4096, 'bounded regular job receipt required');
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  const after = fs.lstatSync(file);
  demand(after.ino === before.ino && after.dev === before.dev && after.mtimeMs === before.mtimeMs, 'job receipt changed');
  return value;
}
function spawnOwnedJob({ executable: target, args, cwd, id, binding, bootstrap = null, plan = null, directory, stdio = 'inherit' }) {
  if (process.platform !== 'win32') throw new NotStarted('verified Windows Job lifecycle required for fresh native launch');
  if (!(path.isAbsolute(target) && Array.isArray(args) && args.every(arg => typeof arg === 'string' && !arg.includes('\0'))
    && path.isAbsolute(cwd) && path.isAbsolute(directory) && /^[a-z0-9-]{1,80}$/.test(id) && /^[a-f0-9]{64}$/.test(binding))) throw new NotStarted('exact owned Job command required');
  const nonce = crypto.randomBytes(16).toString('hex');
  const start = path.join(directory, id + '.started.json'), end = path.join(directory, id + '.closed.json');
  const bound = bootstrap ? { ...bootstrap, nonce, start, end, binding } : null;
  const request = { exe: target, args, cwd,
    start, end, nonce, binding, supervisor: process.pid, bootstrap: bound ? JSON.stringify(bound) : null, plan: plan ? JSON.stringify(plan) : null };
  if (Buffer.byteLength(JSON.stringify(request)) > 24000) throw new NotStarted('bounded fresh launch envelope required');
  const executable = path.join(process.env.SystemRoot || 'C:/Windows', 'System32/WindowsPowerShell/v1.0/powershell.exe');
  const environment = { ...process.env, ECC_NATIVE_JOB_REQUEST: JSON.stringify(request) };
  const child = cp.spawn(executable, ['-NoLogo', '-NoProfile', '-NonInteractive', '-EncodedCommand', Buffer.from(JOB_SCRIPT, 'utf16le').toString('base64')],
    { cwd, env: environment, stdio, shell: false, windowsHide: true });
  const completion = new Promise((resolve, reject) => {
    child.once('error', () => reject(child.pid === undefined ? new NotStarted('Owned native wrapper did not start') : Error('Owned native job start uncertain')));
    child.once('close', () => {
      try {
        const proof = readReceipt(end), started = readReceipt(start);
        demand(proof.nonce === nonce && proof.binding === binding && proof.wrapperPid === child.pid
          && proof.supervisorPid === process.pid && proof.treeClosed === true && proof.activeProcesses === 0
          && proof.rootPid === started.rootPid && started.nonce === nonce && started.binding === binding
          && started.wrapperPid === child.pid && started.assignedBeforeResume === true,
        'native job cessation binding mismatch');
        resolve(proof);
      } catch { reject(Error('Native process-tree cessation unverified; resource claim retained')); }
    });
  });
  return { child, completion };
}
function startOwnedJob({ plan, bootstrap, directory, stdio }) {
  return spawnOwnedJob({ executable: process.execPath, args: [path.resolve(__dirname, '../fresh-agent-session.js'), 'contained'], cwd: plan.cwd,
    id: bootstrap.id, binding: digest(plan), bootstrap, plan, directory, stdio });
}
function containedBootstrap(plan) {
  const bootstrap = JSON.parse(process.env.ECC_FRESH_JOB_BOOTSTRAP || 'null');
  demand(bootstrap?.binding === digest(plan), 'owned native job bootstrap required');
  const expectedId = 'native-' + digest({ repo: plan.cwd, session: plan.session, binding: bootstrap.binding }).slice(0, 32);
  const directory = coord.repository(path.resolve(__dirname, '../..')).directory;
  demand(bootstrap.id === expectedId && bootstrap.owner === plan.session && bootstrap.file === path.join(directory, expectedId + '.queue.json')
    && bootstrap.start === path.join(directory, expectedId + '.started.json'), 'native bootstrap path mismatch');
  const started = readReceipt(bootstrap.start);
  demand(started.nonce === bootstrap.nonce && started.binding === bootstrap.binding
    && started.rootPid === process.pid && started.wrapperPid === process.ppid && started.assignedBeforeResume === true,
  'native root was not admitted inside its owned Job');
  delete process.env.ECC_FRESH_JOB_BOOTSTRAP;
  delete process.env.ECC_FRESH_LAUNCH_PLAN;
  return bootstrap;
}
module.exports = { createReservation, startOwnedJob, spawnOwnedJob, containedBootstrap, digest, JOB_SCRIPT };
