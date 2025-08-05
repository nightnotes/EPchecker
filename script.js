// script.js  – vult de tabel #releasesTable tot en met 31‑12‑2025

// helper: 'dd-mm-yyyy' ➜ Date
function strToDate(d) {
  const [dd, mm, yyyy] = d.split("-");
  return new Date(`${yyyy}-${mm}-${dd}`);
}

const cutoff = new Date("2025-12-31T23:59:59");

// filter en sorteer de releases
const releases = (window.releaseSchedule || [])
  .filter(row => strToDate(row[0]) <= cutoff)
  .sort((a, b) => strToDate(a[0]) - strToDate(b[0]));

// injecteer in de tabel
const tbody = document.querySelector("#releasesTable tbody");
releases.forEach(([date, title, artist, dist]) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${date}</td>
    <td>${title}</td>
    <td>${artist}</td>
    <td>${dist}</td>
  `;
  tbody.appendChild(tr);
});
