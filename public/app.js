const statuses=['New Lead','Dispatched','On The Way','On Site','Awaiting Payment','Completed'];
let jobs=[
 ['Sarah Johnson','Garage Door Repair','Plano, TX','New Lead','$250 - $350','Today 10:15 AM'],
 ['Michael Brown','Opener Installation','Frisco, TX','New Lead','$450 - $650','Today 11:30 AM'],
 ['John Smith','Opener Repair','Allen, TX','Dispatched','$180 - $250','Today 9:00 AM'],
 ['Lisa Taylor','Cable Replacement','Plano, TX','Dispatched','$160 - $220','Today 10:00 AM'],
 ['Mike Johnson','Spring Replacement','Carrollton, TX','On The Way','$220 - $420','ETA 9:25 AM'],
 ['Chris Williams','Garage Door Tune Up','Richardson, TX','On The Way','$120 - $180','ETA 10:10 AM'],
 ['Kevin Thompson','Broken Spring','Frisco, TX','On Site','$180 - $300','Started 9:05 AM'],
 ['Daniel Garcia','Opener Repair','McKinney, TX','On Site','$160 - $260','Started 10:00 AM'],
 ['Amanda White','Cable Replacement','Plano, TX','Awaiting Payment','$220','Invoice Sent'],
 ['Kevin Harris','Spring Replacement','Allen, TX','Awaiting Payment','$180','Invoice Sent'],
 ['Steven Clark','Garage Door Repair','Lewisville, TX','Completed','$160','Paid'],
 ['Ashley Martinez','Garage Door Repair','Richardson, TX','Completed','$200','Paid']
];
let techs=[['Prime Garage Door Pros','Mike Johnson','Philadelphia, PA','4.9','124 jobs','12 min','Emergency'],['Tri-State Overhead Network','Tom Williams','Cherry Hill, NJ','4.8','98 jobs','18 min','Subcontractor'],['Door Masters LLC','Jason Brown','Trenton, NJ','4.7','76 jobs','25 min','Installer'],['Fast Fix Garage Doors','Chris Davis','Wilmington, DE','4.6','88 jobs','30 min','Available']];
const $=s=>document.querySelector(s); const $$=s=>document.querySelectorAll(s);
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2400)}
function colorClass(st){return st==='Awaiting Payment'?'pending':st==='New Lead'?'due':''}
function renderKanban(){
 const mobile=window.innerWidth<900;
 if(mobile){
  $('#kanban').innerHTML=statuses.map(st=>{
   const items=jobs.filter(j=>j[3]===st);
   return `<details class="accordion" ${st==='New Lead'?'open':''}>
   <summary>${st}<span>${items.length}</span></summary>
   <div class="accBody">
   ${items.map(j=>`<div class="job"><b>${j[1]}</b><p>${j[0]}</p><small>${j[2]} · ${j[5]}</small><div><button onclick="showJob('${j[0]}')">View Details</button><button onclick="nextStatus('${j[0]}')">Next</button></div></div>`).join('')}
   </div></details>`;
  }).join('');
 } else {
  $('#kanban').innerHTML=statuses.map(st=>`<div class="col"><h3>${st}<span>${jobs.filter(j=>j[3]===st).length}</span></h3>${jobs.filter(j=>j[3]===st).map(j=>`<div class="job"><b>${j[1]}</b><p>${j[0]}</p><small>${j[2]} · ${j[5]}</small><div><button onclick="showJob('${j[0]}')">View</button><button onclick="nextStatus('${j[0]}')">Next</button></div></div>`).join('')}</div>`).join('');
 }
 renderTables(); renderLiveTechs(); renderActivity();
}
window.nextStatus=(name)=>{let j=jobs.find(x=>x[0]===name); let idx=statuses.indexOf(j[3]); if(idx<statuses.length-1){j[3]=statuses[idx+1]; renderKanban(); toast(`${name} moved to ${j[3]}`)}else toast('Job already completed')}
function renderTables(){
 $('#jobsTable').innerHTML='<tr><th>Customer</th><th>Job</th><th>Area</th><th>Status</th><th>Value</th><th>Time</th></tr>'+jobs.map(j=>`<tr><td><b>${j[0]}</b></td><td>${j[1]}</td><td>${j[2]}</td><td><span class="badge ${colorClass(j[3])}">${j[3]}</span></td><td><b>${j[4]}</b></td><td>${j[5]}</td></tr>`).join('');
 $('#payoutTable').innerHTML='<tr><th>Tech Name</th><th>Job Count</th><th>Total Revenue</th><th>Fee Due</th><th>Payment Status</th></tr>'+['Mike Johnson|7|$1,850|$740|Paid','Chris Williams|6|$1,650|$660|Pending','Kevin Thompson|5|$1,200|$480|Pending','Tom Davis|4|$900|$360|Paid','James Anderson|4|$950|$380|Due'].map(r=>'<tr>'+r.split('|').map((c,i)=>`<td>${i==4?`<span class="badge ${c==='Pending'?'pending':c==='Due'?'due':''}">${c}</span>`:c}</td>`).join('')+'</tr>').join('');
 $('#snapshotTable').innerHTML='<tr><th>Technician</th><th>Jobs</th><th>Payout</th><th>Status</th></tr>'+['Mike Johnson|7|$740|Paid','Chris Williams|6|$660|Pending','Kevin Thompson|5|$480|Pending'].map(r=>'<tr>'+r.split('|').map((c,i)=>`<td>${i==3?`<span class="badge ${c==='Pending'?'pending':''}">${c}</span>`:c}</td>`).join('')+'</tr>').join('');
}
function renderTechs(){ $('#techCards').innerHTML=techs.map(t=>`<div class="tech"><h3>${t[0]}</h3><p>${t[1]} • ${t[2]}</p><span>★ ${t[3]}</span><span>${t[4]}</span><span>${t[5]}</span><span>${t[6]}</span><p><b>Categories:</b> Garage Doors, Gates, Openers<br><b>ZIPs:</b> 19116, 19115, 19020, 19053</p><button onclick="toast('Partial lead sent to ${t[0]}')">Send Lead</button></div>`).join('')}
function renderOpps(){ $('#opportunities').innerHTML=['Garage Door Repair|Lewisville, TX 75067|Budget: $250–$350','Spring Replacement|Carrollton, TX 75007|Budget: $150–$250','Opener Installation|Plano, TX 75023|Budget: $400–$600'].map(x=>{let a=x.split('|');return `<div class="opp"><div><b>${a[0]}</b><small>${a[1]}<br>${a[2]}</small></div><button onclick="toast('Tech accepted. Waiting for dispatcher approval.')">Accept</button></div>`}).join('')}
function renderLiveTechs(){ $('#liveTechs').innerHTML=['Mike Johnson|On Site|Plano, TX|green','Chris Williams|On The Way|Richardson, TX|purple','Kevin Thompson|On Site|Frisco, TX|green','James Anderson|Available|Allen, TX|green','Tom Davis|Busy|Plano, TX|amber'].map(r=>{let a=r.split('|');return `<div class="liveItem"><span class="dot" style="background:${a[3]==='green'?'#16a34a':a[3]==='purple'?'#7c3aed':'#f59e0b'}"></span><div><p>${a[0]}</p><small>${a[2]}</small></div><small style="margin-left:auto">${a[1]}</small></div>`}).join('')}
function renderActivity(){ $('#activityFeed').innerHTML=['Invoice from Mike requires approval|2 min ago','New review received from Sarah Johnson|15 min ago','Chris started job in Richardson|23 min ago','New lead available in your area|1 hour ago'].map(x=>{let a=x.split('|');return `<div class="activityItem"><span class="dot"></span><div><p>${a[0]}</p><small>${a[1]}</small></div></div>`}).join('')}
function renderMarket(){ $('#marketCards').innerHTML=[['Company Hiring','Need 2 Garage Door Techs','Long Island, NY · Full time / 1099','Looking for experienced techs with truck and tools.'],['Tech Looking for Work','Senior Installer Available','Philadelphia, PA · Subcontractor','10 years experience, garage doors, gates, openers.'],['Subcontractor Needed','Weekend Emergency Coverage','Dallas, TX · Weekends','Need reliable tech for same-day calls and invoice uploads.'],['Partnership Post','Publisher Seeking Local Crew','New Jersey · Exclusive Area','Steady jobs available for verified local crews.']].map(m=>`<article class="marketCard"><span class="tag">${m[0]}</span><h3>${m[1]}</h3><p><b>${m[2]}</b></p><p>${m[3]}</p><button class="ghost" onclick="toast('Post saved')">View Details</button></article>`).join('')}
$$('.nav button').forEach(b=>b.onclick=()=>{$$('.nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.view').forEach(v=>v.classList.remove('active'));$('#'+b.dataset.view).classList.add('active');$('#pageTitle').textContent=b.textContent.replace(/[⌘▣◎◆▤$]/g,'').trim()});
function addJob(){jobs.unshift(['New Customer','Emergency Service','Dallas, TX','New Lead','$200 - $400','Just now']);renderKanban();toast('New lead added')}
$('#addLead').onclick=addJob; $('#newJobBtn').onclick=addJob; $('#addLeadTop').onclick=addJob;
$('#broadcastBtn').onclick=()=>{$$('.nav button')[2].click();toast('Open Tech Network to broadcast')};
$('#sendBroadcast').onclick=()=>{$('#broadcastResult').innerHTML='<div class="success">Lead sent to 5 matching technicians. 2 accepted. Approve one to reveal full customer info.</div>';toast('Broadcast sent securely')};
$('#newPostBtn').onclick=()=>toast('Marketplace post creator coming in V2');
renderKanban();renderTechs();renderOpps();renderMarket();

window.showJob=(name)=>{
 const j=jobs.find(x=>x[0]===name);
 alert(`Customer: ${j[0]}\nJob: ${j[1]}\nArea: ${j[2]}\nStatus: ${j[3]}\nValue: ${j[4]}\nTime: ${j[5]}`);
}
window.addEventListener('resize',()=>renderKanban());
