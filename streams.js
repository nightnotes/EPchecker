// streams.js
const API_BASE = 'https://<jouw-backend-url>';
const artistIds = ['7sWJR3GtdK9Jr09w5Nh16B','00qvWOgeQtQf4XcxJM6DzU', /* voeg rest IDs toe */];

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
  const data = {};
  for (let id of artistIds) {
    const res = await fetch(`${API_BASE}/api/streams/${id}`);
    data[id] = await res.json();
  }
  return data;
}

function daysInMonth(d) {
  return new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
}
function formatMonth(d) {
  return d.toLocaleDateString('nl-NL',{month:'long',year:'numeric'});
}

async function updateChart() {
  document.getElementById('currentMonth').textContent = formatMonth(selectedMonth);
  const data = await fetchData();
  const monthStr = selectedMonth.toISOString().slice(0,7);
  const days = daysInMonth(selectedMonth);
  const labels = Array.from({length:days},(_,i)=>`${monthStr}-${String(i+1).padStart(2,'0')}`);
  const datasets = artistIds.map((id,idx)=>{
    const arr = labels.map(lbl=>{
      const e = (data[id]||[]).find(r=>r.timestamp.startsWith(lbl));
      return e?e.total_streams:0;
    });
    return {label:id,data:arr,borderWidth:1,type:'bar'};
  });
  const ctx = document.getElementById('streamsChart').getContext('2d');
  if(chart) chart.destroy();
  chart=new Chart(ctx,{data:{labels,datasets},options:{responsive:true}});
}