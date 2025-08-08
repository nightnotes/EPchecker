
const MAX_DAYS = 45;

// Auth guard: if no user, go back to login (no auto-forward from login => no loop)
document.addEventListener('DOMContentLoaded',()=>{
  if(!localStorage.getItem('user')) location.href='../';
});

function loadStates(){try{return JSON.parse(localStorage.getItem('releaseStates')||'{}')}catch(e){return {}}}
function saveStates(s){localStorage.setItem('releaseStates',JSON.stringify(s))}
function setLastCompleted(id){localStorage.setItem('lastCompleted',id||'')}
function getLastCompleted(){return localStorage.getItem('lastCompleted')||''}

async function loadData(){
  try{
    const raw = await fetch('../data.json').then(r=>r.json());
    const st = loadStates();
    return raw.map(([date,name,who,dist])=>{
      const id=`${date}_${name}`;
      const s=st[id]||{};
      return {id,date,name,who,dist,splits:!!s.splits,buma:!!s.buma,done:!!s.done};
    });
  }catch(e){
    console.warn('data.json niet gevonden of ongeldig', e);
    return [];
  }
}

function renderCal(data){
  const body=document.getElementById('cal-body'); body.innerHTML='';
  const today=new Date();
  data.forEach(d=>{
    const [dd,mm,yy]=d.date.split('-'); const dt=new Date(`${yy}-${mm}-${dd}`);
    if(dt>=today && (dt-today)/86400000<MAX_DAYS){
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${d.date}</td><td>${d.name}</td><td>${d.who}</td><td>${d.dist}</td>
        <td><span class="status-dot ${d.done?'status-done':''}" data-id="${d.id}"></span></td>`;
      body.appendChild(tr);
    }
  });
  if(!body.children.length){body.innerHTML='<tr><td colspan="5">Geen releases in de komende periode.</td></tr>';}

  body.querySelectorAll('.status-dot').forEach(dot=>{
    let timer; const id=dot.dataset.id; const t=window._data.find(x=>x.id===id);
    const start=()=>{
      if(!t.done){ t.done=true; persistState(t,true); return;}
      timer=setTimeout(()=>{t.done=false; persistState(t,false);},3000);
    };
    const cancel=()=>clearTimeout(timer);
    dot.addEventListener('mousedown',start);
    dot.addEventListener('touchstart',start,{passive:true});
    ['mouseup','mouseleave','touchend','touchcancel'].forEach(ev=>dot.addEventListener(ev,cancel));
  });
}

function nextTask(data){
  const user=localStorage.getItem('user')||'';
  const pending=data.filter(d=>d.who===user && !d.done);
  const row=document.getElementById('task-row'); row.innerHTML='';
  if(!pending.length){row.innerHTML='<tr><td colspan="7">Geen openstaande taken 🎉</td></tr>'; renderLast(data); return;}
  const t=pending[0];
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${t.date}</td><td>${t.name}</td><td>${t.who}</td><td>${t.dist}</td>
    <td><input type="checkbox" id="c-splits" ${t.splits?'checked':''}></td>
    <td><input type="checkbox" id="c-buma"   ${t.buma?'checked':''}></td>
    <td><input type="checkbox" id="c-done"   ${t.done?'checked':''} ${(t.splits&&t.buma)?'':'disabled'}></td>`;
  row.appendChild(tr);

  function updateDone(){
    const doneBox=document.getElementById('c-done');
    doneBox.disabled=!(t.splits&&t.buma);
    if(doneBox.disabled){doneBox.checked=false; t.done=false;}
  } updateDone();

  ['splits','buma','done'].forEach(key=>{
    document.getElementById('c-'+key).onchange=e=>{
      t[key]=e.target.checked; if(key!=='done') updateDone();
      persistState(t,key==='done'&&t.done);
    };
  });
  renderLast(data);
}

function persistState(t,showConfetti){
  const st=loadStates(); st[t.id]={splits:t.splits,buma:t.buma,done:t.done}; saveStates(st);
  if(showConfetti && typeof confetti==='function'){confetti({particleCount:120,spread:70,origin:{y:0.75}}); setLastCompleted(t.id);} else {setLastCompleted('');}
  renderCal(window._data); nextTask(window._data);
}

function renderLast(data){
  const bar=document.getElementById('last-completed');
  const id=getLastCompleted(); const t=data.find(x=>x.id===id&&x.done);
  if(!t){bar.classList.add('hidden'); return;}
  bar.textContent=`Laatste afgerond: ${t.date} – ${t.name}`;
  bar.classList.remove('hidden');
  const btn=document.createElement('button'); btn.textContent='Herstel'; btn.className='nav-btn'; btn.onclick=()=>{t.done=false; persistState(t,false);}; bar.appendChild(btn);
}

function showSection(id){
  ['calendar','tasks'].forEach(s=>document.getElementById(s).classList.toggle('hidden',s!==id));
  document.querySelectorAll('nav .nav-btn').forEach(b=>b.classList.toggle('active',b.id==='view-'+id));
}

document.addEventListener('DOMContentLoaded',async()=>{
  document.getElementById('user').textContent=localStorage.getItem('user')||'';
  document.getElementById('logout-btn').onclick=()=>{localStorage.clear();location.href='../';};

  document.getElementById('view-cal').onclick   =()=>showSection('calendar');
  document.getElementById('view-tasks').onclick =()=>showSection('tasks');
  document.getElementById('view-artworks').onclick=()=>window.open('https://drive.google.com/drive/folders/1jZpWCyjCzOlqNfuVA7QrpDu_npU0A8_g','_blank');
  document.getElementById('view-ads').onclick  =()=>window.open('https://adsmanager.facebook.com/adsmanager/manage/campaigns?global_scope_id=1588689962026120','_blank');

  window._data = await loadData();
  renderCal(window._data); nextTask(window._data);
});
