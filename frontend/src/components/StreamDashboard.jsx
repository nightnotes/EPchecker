import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { format } from 'date-fns';

const API_BASE = process.env.REACT_APP_API_BASE_URL; // Zet in .env

export default function StreamDashboard() {
  const [dataByArtist, setDataByArtist] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const artistIds = process.env.REACT_APP_ARTISTS.split(',');

  useEffect(() => {
    async function fetchAll() {
      const all = {};
      for (let id of artistIds) {
        const res = await fetch(`${API_BASE}/api/streams/${id}`);
        const rows = await res.json();
        all[id] = rows;
      }
      setDataByArtist(all);
    }
    fetchAll();
  }, []);

  const monthStr = format(selectedMonth, 'yyyy-MM');
  const daysInMonth = Array.from(
    { length: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()+1, 0).getDate() },
    (_, i) => i + 1
  );
  const labels = daysInMonth.map(d => `${monthStr}-${String(d).padStart(2,'0')}`);

  const datasets = artistIds.map(id => {
    const data = labels.map(label => {
      const entry = (dataByArtist[id] || []).find(r => r.timestamp.startsWith(label));
      return entry ? entry.total_streams : null;
    });
    return {
      label: id,
      data,
      borderWidth: 1,
      type: 'bar'
    };
  });

  function prevMonth() {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()-1,1));
  }
  function nextMonth() {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()+1,1));
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Stream Dashboard</h2>
      <div className="flex justify-between mb-2">
        <button onClick={prevMonth}>← Vorige</button>
        <span>{format(selectedMonth,'LLLL yyyy')}</span>
        <button onClick={nextMonth}>Volgende →</button>
      </div>
      <Bar data={{ labels, datasets }} />
    </div>
  );
}
