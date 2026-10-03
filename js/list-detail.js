/* ==========================================================================
   Jukeboxd — list-detail.js  (list-detail.html only)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const list = getList(qs('id')) || DB.lists[0];
  const author = getUser(list.author);
  document.getElementById('page-title').textContent = `${list.title} — Jukeboxd`;

  document.getElementById('list-head').innerHTML = `
    <p class="list-detail-head__eyebrow">Lista · ${list.albumIds.length} álbuns</p>
    <h1>${list.title}</h1>
    ${list.description ? `<p>${list.description}</p>` : ''}
    <div class="list-detail-head__by">
      <img src="${author.avatar}" alt="${author.name}">
      <span>por <a href="profile.html?id=${author.id}" style="color:var(--amber)">${author.name}</a></span>
      <span style="color:var(--text-faint)">·</span>
      <button class="btn btn--ghost btn--sm" id="like-btn" type="button">♥ <span id="like-count">${list.likes}</span></button>
    </div>
  `;

  let liked = false;
  document.getElementById('like-btn').addEventListener('click', () => {
    liked = !liked;
    list.likes += liked ? 1 : -1;
    document.getElementById('like-count').textContent = list.likes;
    showToast(liked ? 'Você curtiu esta lista' : 'Curtida removida');
  });

  document.getElementById('list-grid').innerHTML = list.albumIds.map((id, i) => {
    const album = getAlbum(id);
    return `
    <div class="list-grid__item">
      <span class="list-grid__rank">${i + 1}</span>
      ${albumTileHTML(album)}
    </div>`;
  }).join('');
});
