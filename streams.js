// streams.js
const API_BASE = 'https://<jouw-backend-url>';
const artistIds = ['7sWJR3GtdK9Jr09w5Nh16B','00qvWOgeQtQf4XcxJM6DzU', /* ... */];

let selectedMonth = new Date();
let chart;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('prevMonth').addEventListener('click', () => {
    selectedMonth.setMonth(selectedMonth.getMonth()-1);
    updateChart();
  });
  document.getElementById('nextMonth').addEventListener('click', () => {
    selectedMonth.setMonth(selectedMonth.getMonth()+1);
    updateChart();
  });
  updateChart();
});

async function fetchData() {
  const all = {};
  for (const id of artistIds) {
    const res = await fetch(`${API_BASE}/api/streams/${id}`);
    all[id] = await res.json();
  }
  return all;
}

function daysInMonth(d) {
  return new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
}
function formatMonth(d) {
  return d.toLocaleDateString('nl-NL',{month:'long',year:'numeric'});
}

async function updateChart() {
  document.getElementById('currentMonth').textContent = formatMonth(selectedMonth);
  const dataByArtist = await fetchData();
  const monthStr = selectedMonth.toISOString().slice(0,7);
  const days = daysInMonth(selectedMonth);
  const labels = Array.from({length:days},(_,i)=>`${monthStr}-${String(i+1).padStart(2,'0')}`);
  const datasets = artistIds.map((id, idx) => ({
    label: id,
    data: labels.map(lbl => {
      const e = (dataByArtist[id]||[]).find(r=>r.timestamp.startsWith(lbl));
      return e ? e.total_streams : 0;
    }),
    backgroundColor:`rgba(${(idx*40)%255},150,200,0.5)`,
    borderColor:`rgba(${(idx*40)%255},150,200,1)`,
    borderWidth:1
  }));
  const ctx = document.getElementById('streamsChart').getContext('2d');
  if(chart) chart.destroy();
  chart = new Chart(ctx,{type:'bar',data:{labels,datasets},options:{responsive:true}});
}