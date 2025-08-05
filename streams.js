// streams.js - Voeg in streams.html via defer toe
const API_BASE = 'https://<jouw-backend-url>';
const artistIds = ['7sWJR3GtdK9Jr09w5Nh16B', '00qvWOgeQtQf4XcxJM6DzU', '4ByXb0waTbnoUu4EaPPD2W',
  '00yTD0tYQNrivASVQgBGes','1KJc2XcGCkzZypmNDhIMeR','5d8GtQxBbULssUMeaHpTJ4',
  '357zDmhgGTYSyYTyBTD65t','5P1RyLkpa2GMDium23Ptn6','2McwFGt12uHTCNmI7VhC2K',
  '3lQpO3wZJRN29Ijr8fpwaN','1lw523m68IbWJqOXAW1dp6','6kWh8CBUb92RPXrCMzJ2og',
  '5AzDNSnXecyb5n2SGEk210','6nCQ2Jjeut72ninwDgB6Yy','2Ar9N9Kr5qNvDq188I0DsC',
  '6IsY6SBSPEQFRDZYzsF2nS','0OXYrzdbgxer5KtxSTuUDy','79A1B10WsQEm7MiRCHC9Fa',
  '37rDPPf5ljzqE4MTvC1PyH','6CNN1uNMESxlBFkAlPLFGC','4d3WwgfETgTvddopuSfQ8i',
  '2tKuJrJLd6BARL1GVE3VVT','61Qha9Ylp3V6dDX8Jj5Z1z','7dcX4psw7M8J5l1c5jRmX3',
  '4cGEMRW0A7PAZcovV3S8KT'];

let selectedMonth = new Date();
const ctx = document.getElementById('streamsChart').getContext('2d');
let chart;

document.addEventListener('DOMContentLoaded', updateChart);
document.getElementById('prevMonth').addEventListener('click', () => {
  selectedMonth.setMonth(selectedMonth.getMonth() - 1);
  updateChart();
});
document.getElementById('nextMonth').addEventListener('click', () => {
  selectedMonth.setMonth(selectedMonth.getMonth() + 1);
  updateChart();
});

function formatMonth(date) {
  return date.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });
}

async function fetchData() {
  const all = {};
  for (const id of artistIds) {
    const res = await fetch(`${API_BASE}/api/streams/${id}`);
    all[id] = await res.json();
  }
  return all;
}

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}

async function updateChart() {
  document.getElementById('currentMonth').textContent = formatMonth(selectedMonth);
  const dataByArtist = await fetchData();
  const monthStr = selectedMonth.toISOString().slice(0,7);
  const labels = Array.from({length: daysInMonth(selectedMonth)}, (_, i) => `${monthStr}-${String(i+1).padStart(2,'0')}`);
  const datasets = artistIds.map((id, idx) => {
    const data = labels.map(lbl => {
      const entry = (dataByArtist[id]||[]).find(r => r.timestamp.startsWith(lbl));
      return entry ? entry.total_streams : 0;
    });
    return {
      label: id,
      data,
      backgroundColor: `rgba(${(idx*40)%255},150,200,0.5)`,
      borderColor: `rgba(${(idx*40)%255},150,200,1)`,
      borderWidth: 1
    };
  });
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets },
    options: { responsive: true }
  });
}
