/* ==========================================================================
   Jukeboxd — profile.js  (profile.html only)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const id = qs('id');
  const user = id ? getUser(id) : DB.currentUser;
  const isMe = user.id === DB.currentUser.id;
  document.getElementById('page-title').textContent = `${user.name} — Jukeboxd`;

  document.getElementById('profile-head').innerHTML = `
    <div class="profile-head__avatar"><img src="${user.avatar}" alt="${user.name}"></div>
    <div>
      <h1>${user.name}</h1>
      <p class="profile-head__handle">${user.handle} · membro desde ${user.joined || '2024'}</p>
      ${user.bio ? `<p class="profile-head__bio">${user.bio}</p>` : ''}
      <div class="profile-head__stats">
        <div><strong>${diaryFor(user).length}</strong>escutas</div>
        <div><strong>${DB.lists.filter(l => l.author === user.id).length}</strong>listas</div>
        <div><strong>${user.followers ?? 240}</strong>seguidores</div>
        <div><strong>${user.following ?? 120}</strong>seguindo</div>
      </div>
    </div>
    <div>${isMe
      ? `<a class="btn btn--ghost" href="stats.html">Ver estatísticas</a>`
      : `<button class="btn btn--primary" id="follow-btn" type="button">Seguir</button>`}</div>
  `;

  if (!isMe) {
    const followBtn = document.getElementById('follow-btn');
    let following = false;
    followBtn.addEventListener('click', () => {
      following = !following;
      followBtn.textContent = following ? 'Seguindo' : 'Seguir';
      followBtn.classList.toggle('btn--primary', !following);
      followBtn.classList.toggle('btn--ghost', following);
      showToast(following ? `Você segue ${user.name}` : `Deixou de seguir ${user.name}`);
    });
  }

  function diaryFor() { return DB.diary; } // demo: same diary shown for any profile

  document.getElementById('diary-panel').innerHTML = DB.diary.map(d => {
    const album = getAlbum(d.albumId);
    return `
    <a class="diary-row" href="album.html?id=${album.id}">
      <time>${d.date}</time>
      <span class="cover"><img src="${album.cover}" alt=""></span>
      <span>${album.title} <span style="color:var(--text-muted)">— ${album.artist}</span></span>
      ${renderStars(d.rating)}
    </a>`;
  }).join('');

  const myReviews = DB.reviews.filter(r => r.userId === user.id).length
    ? DB.reviews.filter(r => r.userId === user.id)
    : DB.reviews.slice(0, 2); // demo fallback so panel isn't empty
  document.getElementById('reviews-panel').innerHTML = myReviews.map(reviewHTML).join('')
    || `<p style="color:var(--text-muted)">Nenhuma resenha publicada ainda.</p>`;

  document.getElementById('favorites-panel').innerHTML = DB.favorites.map(id => albumTileHTML(getAlbum(id))).join('')
    || `<p style="color:var(--text-muted)">Nenhum álbum favoritado ainda.</p>`;

  const myLists = DB.lists.filter(l => l.author === user.id);
  document.getElementById('lists-panel').innerHTML = myLists.length
    ? myLists.map(listCardHTML).join('')
    : `<p style="color:var(--text-muted)">Nenhuma lista criada ainda.</p>`;

  function listCardHTML(list) {
    const covers = list.albumIds.slice(0, 4).map(id => getAlbum(id).cover);
    return `
    <a class="card list-card" href="list-detail.html?id=${list.id}">
      <div class="list-card__covers">${covers.map(c => `<img src="${c}" alt="">`).join('')}</div>
      <div class="list-card__title">${list.title}</div>
      <div class="list-card__meta"><span>${list.albumIds.length} álbuns</span><span>♥ ${list.likes}</span></div>
    </a>`;
  }

  // tabs
  const tabs = document.querySelectorAll('.tabs button');
  tabs.forEach(btn => btn.addEventListener('click', () => {
    tabs.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('is-active'));
    document.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`).classList.add('is-active');
  }));
});
