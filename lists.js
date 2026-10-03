/* ==========================================================================
   Jukeboxd — lists.js  (lists.html only)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.getElementById('lists-grid');
  const tabs = document.querySelectorAll('.search-tabs button');
  let filter = 'all';

  function listCardHTML(list) {
    const covers = list.albumIds.slice(0, 4).map(id => getAlbum(id).cover);
    while (covers.length < 4) covers.push(covers[covers.length - 1] || '');
    return `
    <a class="card list-card" href="list-detail.html?id=${list.id}">
      <div class="list-card__covers">${covers.map(c => `<img src="${c}" alt="">`).join('')}</div>
      <div class="list-card__title">${list.title}</div>
      <div class="list-card__meta"><span>por ${getUser(list.author).name}</span><span>♥ ${list.likes}</span></div>
    </a>`;
  }

  function render() {
    let list = [...DB.lists];
    if (filter === 'mine') list = list.filter(l => l.author === DB.currentUser.id);
    if (filter === 'popular') list = list.sort((a, b) => b.likes - a.likes);
    gridEl.innerHTML = list.length
      ? list.map(listCardHTML).join('')
      : `<p style="color:var(--text-muted)">Você ainda não criou nenhuma lista. Clique em "Nova lista" para começar.</p>`;
  }

  tabs.forEach(btn => btn.addEventListener('click', () => {
    tabs.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true');
    filter = btn.dataset.filter;
    render();
  }));

  document.getElementById('new-list-btn').addEventListener('click', () => {
    const title = prompt('Nome da nova lista:');
    if (!title) return;
    const newList = {
      id: 'l' + Date.now(),
      title,
      author: DB.currentUser.id,
      description: '',
      albumIds: DB.albums.slice(0, 4).map(a => a.id),
      likes: 0,
    };
    DB.lists.unshift(newList);
    showToast('Lista criada!');
    render();
  });

  render();
});
