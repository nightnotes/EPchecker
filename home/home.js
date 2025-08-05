// EP release data inclusief playlists en assignments
const epData = [];
const chillCalm = [
  { name: 'Eleanor Moon', date: '2025-08-10', distributor: 'Distro A', assignedTo: 'Martijn', playlist: 'Chill & Calm' },
  { name: 'Luna Nights', date: '2025-08-12', distributor: 'Distro B', assignedTo: 'Nuno', playlist: 'Chill & Calm' },
  { name: 'Ava Willow', date: '2025-08-15', distributor: 'Distro A', assignedTo: 'Martijn', playlist: 'Chill & Calm' }
];
const adhdNames = [
  { name: 'Dreamflow', assignedTo: 'Nuno' },
  { name: 'Poluz', assignedTo: 'Martijn' },
  { name: 'Doris Lost', assignedTo: 'Nuno' },
  { name: 'Eternal', assignedTo: 'Martijn' },
  { name: 'Slaapmutsje', assignedTo: 'Nuno' },
  { name: 'ZizZa', assignedTo: 'Martijn' },
  { name: 'Sleepy Taes', assignedTo: 'Nuno' }
];
function generateRange(startDate, countDays, repeatWeeks) {
  const list = [];
  const start = new Date(startDate);
  for (let w = 0; w < repeatWeeks; w++) {
    adhdNames.forEach((item, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + w * 7 + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      list.push({ name: item.name, date: `${yyyy}-${mm}-${dd}`, distributor: 'Amuse', assignedTo: item.assignedTo, playlist: 'ADHD Sleep' });
    });
  }
  return list;
}
epData.push(...chillCalm);
epData.push(...generateRange('2025-08-25', 7, 2));
document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('username');
  const tasksBtn = document.getElementById('tasks-btn');
  tasksBtn.textContent = `${user.charAt(0).toUpperCase() + user.slice(1)}'s Taken`;
  const releasesBtn = document.getElementById('releases-btn');
  const relSec = document.getElementById('releases-section');
  const tasksSec = document.getElementById('tasks-section');
  releasesBtn.addEventListener('click', () => {
    releasesBtn.classList.add('active'); tasksBtn.classList.remove('active');
    relSec.classList.remove('hidden'); tasksSec.classList.add('hidden');
  });
  tasksBtn.addEventListener('click', () => {
    tasksBtn.classList.add('active'); releasesBtn.classList.remove('active');
    tasksSec.classList.remove('hidden'); relSec.classList.add('hidden');
    showNextTask();
  });
  const calBody = document.getElementById('calendar-body');
  epData.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.name}</td><td>${item.date}</td><td>${item.distributor}</td><td>${item.playlist}</td><td><input type="checkbox" class="calendar-checkbox" data-name="${item.name}"></td>`;
    calBody.appendChild(tr);
  });
});
function showNextTask() {
  const user = localStorage.getItem('username');
  const completed = JSON.parse(localStorage.getItem('completed') || '[]');
  const pending = epData.filter(item => item.assignedTo.toLowerCase() === user.toLowerCase() && !completed.includes(item.name));
  const label = document.getElementById('task-label');
  const checkbox = document.getElementById('task-checkbox');
  if (!pending.length) {
    label.textContent = 'Geen openstaande taken.'; checkbox.style.display = 'none';
  } else {
    const next = pending.sort((a,b) => a.date.localeCompare(b.date))[0];
    label.textContent = `${next.name} - ${next.date} (${next.playlist})`; checkbox.checked = false; checkbox.style.display = 'inline-block';
    checkbox.onchange = () => { if(checkbox.checked) { completed.push(next.name); localStorage.setItem('completed', JSON.stringify(completed)); document.querySelector(`.calendar-checkbox[data-name="${next.name}"]`).checked = true; showNextTask(); }};
  }
}