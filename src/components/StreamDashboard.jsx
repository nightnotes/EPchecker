import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { format } from 'date-fns';

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const artistIds = process.env.REACT_APP_ARTISTS.split(',');

export default function StreamDashboard() {
  const [dataByArtist, setDataByArtist] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    async function fetchAll() {
      const all = {};
      for (const id of artistIds) {
        const res = await fetch(`${API_BASE}/api/streams/${id}`);
        all[id] = await res.json();
      }
      setDataByArtist(all);
    }
    fetchAll();
  }, []);

  const monthStr = format(selectedMonth, 'yyyy-MM');
  const daysCount = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ).getDate();
  const labels = Array.from({ length: daysCount }, (_, i) => `${monthStr}-${String(i+1).padStart(2,'0')}`);

  const datasets = artistIds.map(id => ({
    label: id,
    data: labels.map(label => {
      const entry = (dataByArtist[id] || []).find(r => r.timestamp.startsWith(label));
      return entry ? entry.total_streams : 0;
    }),
    borderWidth: 1,
    type: 'bar'
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Streams per Dag</h1>
      <div className="flex justify-between mb-2">
        <button onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1))}>← Vorige</button>
        <span className="font-medium">{format(selectedMonth, 'LLLL yyyy')}</span>
        <button onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1))}>Volgende →</button>
      </div>
      <Bar data={{ labels, datasets }} />
    </div>
  );
}