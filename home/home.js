const data = [
  { date:'15-08-2025', name:'Luna Nights',  who:'Martijn', dist:'Distrokid', done:false },
  { date:'16-08-2025', name:'Ava Willow',   who:'Martijn', dist:'Distrokid', done:false },
  { date:'17-08-2025', name:'Sleepy Delrow',who:'Nuno',    dist:'Distrokid', done:false },
  { date:'18-08-2025', name:'Motionless',   who:'Martijn', dist:'Distrokid', done:false },
  { date:'19-08-2025', name:'Loomy',        who:'Nuno',    dist:'Distrokid', done:false },
  { date:'20-08-2025', name:'Lila Serene',  who:'Nuno',    dist:'Distrokid', done:false },
  { date:'21-08-2025', name:'Soft Dawn',    who:'Nuno',    dist:'Distrokid', done:false },
  { date:'22-08-2025', name:'Nunery Dream', who:'Nuno',    dist:'Distrokid', done:false },
  { date:'23-08-2025', name:'Celestine Viora',who:'Nuno', dist:'Distrokid', done:false },
  { date:'24-08-2025', name:'Ludo Legato',  who:'Martijn', dist:'Distrokid', done:false }
];

function renderCal() {
  const body= document.getElementById('cal-body'); body.innerHTML='';
  data.forEach(d=>{
    const tr=document.createElement('tr');
    tr.innerHTML=\`<td>\${d.date}</td><td>\${d.name}</td><td>\${d.who}</td><td>\${d.dist}</td><td><input type='checkbox' \${d.done?'checked':''}></td>\`;
    body.appendChild(tr);
  });
}

function nextTask() {
  const user = localStorage.getItem('user');
  const pending = data.filter(d=>d.who===user && !d.done);
  if (pending.length) {
    const t = pending[0];
    document.getElementById('t-date').textContent=t.date;
    document.getElementById('t-name').textContent=t.name;
    document.getElementById('t-who').textContent=t.who;
    document.getElementById('t-dist').textContent=t.dist;
    const cb=document.getElementById('t-check'); cb.checked=false;
    cb.onchange=()=>{t.done=true; nextTask();};
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('user').textContent=localStorage.getItem('user');
  renderCal(); nextTask();
  document.getElementById('view-cal').onclick=()=>{
    document.getElementById('calendar').classList.remove('hidden');
    document.getElementById('tasks').classList.add('hidden');
    document.getElementById('view-cal').classList.add('active');
    document.getElementById('view-tasks').classList.remove('active');
  };
  document.getElementById('view-tasks').onclick=()=>{
    document.getElementById('tasks').classList.remove('hidden');
    document.getElementById('calendar').classList.add('hidden');
    document.getElementById('view-tasks').classList.add('active');
    document.getElementById('view-cal').classList.remove('active');
  };
});