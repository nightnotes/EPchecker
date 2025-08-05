// EP release data inclusief playlists en assignments
const epData = [
  // Chill & Calm playlist
  { date: '10-08-2025', name: 'Eleanor Moon', distributor: 'Distro A', assignedTo: 'Martijn', playlist: 'Chill & Calm', completed: false },
  { date: '12-08-2025', name: 'Luna Nights', distributor: 'Distro B', assignedTo: 'Nuno', playlist: 'Chill & Calm', completed: false },
  { date: '15-08-2025', name: 'Ava Willow', distributor: 'Distro A', assignedTo: 'Martijn', playlist: 'Chill & Calm', completed: false },
  // ADHD Sleep playlist weeks
  { date: '25-08-2025', name: 'Dreamflow', distributor: 'Amuse', assignedTo: 'Nuno', playlist: 'ADHD Sleep', completed: false },
  { date: '26-08-2025', name: 'Poluz', distributor: 'Amuse', assignedTo: 'Martijn', playlist: 'ADHD Sleep', completed: false },
  { date: '27-08-2025', name: 'Doris Lost', distributor: 'Amuse', assignedTo: 'Nuno', playlist: 'ADHD Sleep', completed: false },
  { date: '28-08-2025', name: 'Eternal', distributor: 'Amuse', assignedTo: 'Martijn', playlist: 'ADHD Sleep', completed: false },
  { date: '29-08-2025', name: 'Slaapmutsje', distributor: 'Amuse', assignedTo: 'Nuno', playlist: 'ADHD Sleep', completed: false },
  { date: '30-08-2025', name: 'ZizZa', distributor: 'Amuse', assignedTo: 'Martijn', playlist: 'ADHD Sleep', completed: false },
  { date: '31-08-2025', name: 'Sleepy Taes', distributor: 'Amuse', assignedTo: 'Nuno', playlist: 'ADHD Sleep', completed: false },
  { date: '08-09-2025', name: 'Dreamflow', distributor: 'Amuse', assignedTo: 'Nuno', playlist: 'ADHD Sleep', completed: false },
  { date: '09-09-2025', name: 'Poluz', distributor: 'Amuse', assignedTo: 'Martijn', playlist: 'ADHD Sleep', completed: false },
  { date: '10-09-2025', name: 'Doris Lost', distributor: 'Amuse', assignedTo: 'Nuno', playlist: 'ADHD Sleep', completed: false },
  { date: '11-09-2025', name: 'Eternal', distributor: 'Amuse', assignedTo: 'Martijn', playlist: 'ADHD Sleep', completed: false },
  { date: '12-09-2025', name: 'Slaapmutsje', distributor: 'Amuse', assignedTo: 'Nuno', playlist: 'ADHD Sleep', completed: false },
  { date: '13-09-2025', name: 'ZizZa', distributor: 'Amuse', assignedTo: 'Martijn', playlist: 'ADHD Sleep', completed: false },
  { date: '14-09-2025', name: 'Sleepy Taes', distributor: 'Amuse', assignedTo: 'Nuno', playlist: 'ADHD Sleep', completed: false }
];

// Render calendar
function renderCalendar() {
  const tbody = document.getElementById('calendar-body');
  tbody.innerHTML = '';
  epData.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = \`
      <td>\${item.date}</td>
      <td>\${item.name}</td>
      <td>\${item.distributor}</td>
      <td>\${item.playlist}</td>
      <td>\${item.assignedTo}</td>
      <td><input type="checkbox" class="calendar-checkbox" data-name="\${item.name}" \${item.completed ? 'checked' : ''}></td>
    \`;
    tbody.appendChild(tr);
  });
}

// Tasks logic
function showNextTask() {
  const user = localStorage.getItem('username');
  const pending = epData.filter(i => i.assignedTo.toLowerCase() === user.toLowerCase() && !i.completed);
  const label = document.getElementById('task-card').querySelector('label');
  const checkbox = document.getElementById('task-checkbox');
  if (!pending.length) {
    label.textContent = 'Geen openstaande taken.';
    checkbox.style.display = 'none';
  } else {
    const next = pending.sort((a,b) => a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join()))[0];
    document.getElementById('task-date').textContent = next.date;
    document.getElementById('task-name').textContent = next.name;
    document.getElementById('task-dist').textContent = next.distributor;
    document.getElementById('task-playlist').textContent = next.playlist;
    document.getElementById('task-owner').textContent = next.assignedTo;
    checkbox.checked = false;
    checkbox.style.display = '';
    checkbox.onchange = () => {
      if (checkbox.checked) {
        next.completed = true;
        document.querySelector(\`.calendar-checkbox[data-name="\${next.name}"]\`).checked = true;
        showNextTask();
      }
    };
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  showNextTask();
});
