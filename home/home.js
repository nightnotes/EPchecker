// home/home.js

const epData = [
  { date: '15-08-2025', name: 'Luna Nights',     assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '16-08-2025', name: 'Ava Willow',      assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '17-08-2025', name: 'Sleepy Delrow',   assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '18-08-2025', name: 'Motionless',      assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '19-08-2025', name: 'Loomy',           assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '20-08-2025', name: 'Lila Serene',     assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '21-08-2025', name: 'Soft Dawn',       assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '22-08-2025', name: 'Nunery Dream',    assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '23-08-2025', name: 'Celestine Viora', assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '24-08-2025', name: 'Ludo Legato',     assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '25-08-2025', name: 'Muted Mind',      assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '26-08-2025', name: 'Swooshy',         assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '27-08-2025', name: 'Evelyn Winter',   assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '28-08-2025', name: 'Krople',          assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '29-08-2025', name: 'Katty',           assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '30-08-2025', name: 'Sophia Vale',     assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '31-08-2025', name: 'Domindo Nuni',    assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '01-09-2025', name: 'Motionless',      assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '02-09-2025', name: 'Loomy',           assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '03-09-2025', name: 'Eleanor Moon',    assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '04-09-2025', name: 'Luna Nights',     assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '05-09-2025', name: 'Ava Willow',      assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '06-09-2025', name: 'Sleepy Delrow',   assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '07-09-2025', name: 'Lila Serene',     assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '08-09-2025', name: 'Muted Mind',      assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '09-09-2025', name: 'Swooshy',         assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '10-09-2025', name: 'Soft Dawn',       assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '11-09-2025', name: 'Nunery Dream',    assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '12-09-2025', name: 'Celestine Viora', assignedTo: 'Nuno',    distributor: 'Distrokid', completed: false },
  { date: '13-09-2025', name: 'Ludo Legato',     assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
  { date: '14-09-2025', name: 'Evelyn Winter',   assignedTo: 'Martijn', distributor: 'Distrokid', completed: false },
];

function renderCalendar() {
  const tbody = document.getElementById('calendar-body');
  tbody.innerHTML = '';
  epData.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.date}</td>
      <td>${item.name}</td>
      <td>${item.assignedTo}</td>
      <td>${item.distributor}</td>
      <td><input type="checkbox" class="calendar-checkbox" data-name="${item.name}" ${item.completed ? 'checked' : ''}></td>
    `;
    tbody.appendChild(tr);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  showNextTask();
});
