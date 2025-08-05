// EP release data inclusief playlists en assignments
const epData = [];
const chillCalm = [
  { name: 'Eleanor Moon', date: '10-08-2025', distributor: 'Distro A', assignedTo: 'Martijn', playlist: 'Chill & Calm' },
  { name: 'Luna Nights', date: '12-08-2025', distributor: 'Distro B', assignedTo: 'Nuno', playlist: 'Chill & Calm' },
  { name: 'Ava Willow', date: '15-08-2025', distributor: 'Distro A', assignedTo: 'Martijn', playlist: 'Chill & Calm' }
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
function generateRange(startDate, repeatWeeks) {
  const list = [];
  const start = new Date(startDate);
  for (let w = 0; w < repeatWeeks; w++) {
    adhdNames.forEach((item, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + w*7 + i);
      const dd = String(d.getDate()).padStart(2,'0');
      const mm = String(d.getMonth()+1).padStart(2,'0');
      const yyyy = d.getFullYear();
      list.push({ name: item.name, date: `${dd}-${mm}-${yyyy}`, distributor: 'Amuse', assignedTo: item.assignedTo, playlist: 'ADHD Sleep' });
    });
  }
  return list;
}
epData.push(...chillCalm);
epData.push(...generateRange('2025-08-25', 2));
// render logic...
