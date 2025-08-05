// home/home.js

// Raw data entries t/m 30-09-2025
const rawEntries = [
  ['15-08-2025','Luna Nights','Martijn','Distrokid'],
  // ... alle entries ...
  ['30-09-2025','Swooshy','Nuno','Distrokid']
];

// Transform entries
const data = rawEntries.map(([date,name,who,dist]) => ({ date, name, who, dist, done:false }));

function renderCal() {
  const today = new Date();
  const maxDays = 15;
  const filtered = data.filter(d => {
    const [dd,mm,yy] = d.date.split('-');
    const dt = new Date(`${yy}-${mm}-${dd}`);
    return dt >= today && (dt - today)/(1000*60*60*24) < maxDays;
  });
  const body = document.getElementById('cal-body');
  body.innerHTML = '';
  filtered.forEach(d => {
    const tr = document.createElement('tr');
    const statusClass = d.done ? 'status-done' : 'status-pending';
    tr.innerHTML = `
      <td>${d.date}</td>
      <td>${d.name}</td>
      <td>${d.who}</td>
      <td>${d.dist}</td>
      <td><span class="status-dot ${statusClass}"></span></td>
    `;
    body.appendChild(tr);
  });
}

function nextTask() {
  const user = localStorage.getItem('user');
  const pending = data.filter(d => d.who===user && !d.done);
  if (!pending.length) return;
  const t = pending[0];
  document.getElementById('t-date').textContent = t.date;
  document.getElementById('t-name').textContent = t.name;
  document.getElementById('t-who').textContent = t.who;
  document.getElementById('t-dist').textContent = t.dist;
  const cb = document.getElementById('t-check');
  cb.checked = false;
  cb.onchange = () => {
    t.done = true;
    renderCal();
    nextTask();
  };
}

// End of template