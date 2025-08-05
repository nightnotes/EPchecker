
// home/home.js

// -------------------------------------------
// Configuratie
// -------------------------------------------
const maxDays = 45;          // hoe ver vooruit tonen in kalender
let lastCompleted = null;    // om laatste afgeronde taak te bewaren
let allData = [];            // globale referentie voor undo
// -------------------------------------------

// Laad data via data.json
async function loadData() {
  const rawEntries = await fetch('../data.json').then(r => r.json());
  return rawEntries.map(([date, name, who, dist]) => ({ date, name, who, dist, done: false }));
}

// Render kalender (Releases)
function renderCal(data) {
  const today = new Date();
  const body = document.getElementById('cal-body');
  body.innerHTML = '';

  data.forEach(d => {
    const [dd,mm,yyyy] = d.date.split('-').map(Number);
    const dt = new Date(yyyy, mm - 1, dd);

    if (dt - today < maxDays * 24*60*60*1000 && dt >= today) {
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
    }
  });
}

// Toon volgende open taak voor ingelogde gebruiker
function nextTask(data) {
  const user = localStorage.getItem('user');
  const pending = data.filter(d => d.who === user && !d.done);
  const row = document.getElementById('task-row');
  row.innerHTML = '';

  if (!pending.length) {
    row.innerHTML = '<tr><td colspan="7">Geen openstaande taken 🎉</td></tr>';
    return;
  }

  const t = pending[0];
  row.innerHTML = `
    <tr>
      <td>${t.date}</td>
      <td>${t.name}</td>
      <td>${t.who}</td>
      <td>${t.dist}</td>
      <td><input type="checkbox" id="t-splits"></td>
      <td><input type="checkbox" id="t-buma"></td>
      <td><input type="checkbox" id="t-check"></td>
    </tr>
  `;

  document.getElementById('t-check').onchange = () => {
    t.done = true;
    lastCompleted = t;
    renderCal(data);
    nextTask(data);
    showLastCompleted(t);
  };
}

// Toon / verberg de 'laatste afgerond' balk
function showLastCompleted(entry) {
  const box = document.getElementById('last-completed');
  if (!entry) {
    box.classList.add('hidden');
    return;
  }
  box.classList.remove('hidden');
  box.innerHTML = \`Laatste afgerond: <strong>\${entry.date} – \${entry.name}</strong> <button id="undo-last">Herstel</button>\`;
  document.getElementById('undo-last').onclick = () => {
    entry.done = false;
    renderCal(allData);
    nextTask(allData);
    showLastCompleted(null);
  };
}

// Tabs tonen/verbergen
function showSection(id) {
  ['calendar','tasks'].forEach(s => document.getElementById(s).classList.toggle('hidden', s!==id));
  document.querySelectorAll('nav button').forEach(btn => btn.classList.toggle('active', btn.id==='view-'+id));
}

// Initialisatie
document.addEventListener('DOMContentLoaded', async () => {
  allData = await loadData();
  renderCal(allData);
  nextTask(allData);

  // Tab-buttons
  document.getElementById('view-cal').onclick   = () => showSection('calendar');
  document.getElementById('view-tasks').onclick = () => showSection('tasks');
  document.getElementById('view-artworks').onclick = () => window.open('https://drive.google.com/drive/folders/1jZpWCyjCzOlqNfuVA7QrpDu_npU0A8_g?usp=sharing','_blank');

  // Welkom + logout
  document.getElementById('user').textContent = localStorage.getItem('user');
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.onclick = () => { localStorage.removeItem('user'); window.location.href = '../'; };
  }

  // Verberg undo-box bij start
  showLastCompleted(null);
});
