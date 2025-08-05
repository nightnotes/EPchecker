const sampleItems = [ 'Eleanor Moon', 'Luna Nights', 'Ava Willow', 'Sleepy Delrow', 'Lila Serene', 'Soft Dawn', 'Nunery Dream', 'Celestine Viora', 'Sophia Vale', 'Luna Nights', 'Ludo Legato', 'Evelyn Winter', 'Ava Willow', 'Domindo Nuni', 'Eleanor Moon', 'Katty', 'Sophia Vale', 'Sleepy Delrow' ];
function renderList(items) {
  const list = document.getElementById('item-list'); list.innerHTML = '';
  items.forEach(name => {
    const li = document.createElement('li'); const left = document.createElement('div'); left.style.display = 'flex'; left.style.alignItems = 'center';
    const circle = document.createElement('div'); circle.className = 'circle'; const text = document.createElement('span'); text.textContent = name;
    left.append(circle, text);
    const arrow = document.createElement('span'); arrow.textContent = '›';
    li.append(left, arrow);
    list.appendChild(li);
  });
}
renderList(sampleItems);
document.getElementById('search-input').addEventListener('input', function(e) {
  const filtered = sampleItems.filter(item => item.toLowerCase().includes(e.target.value.toLowerCase())); renderList(filtered);
});