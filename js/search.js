/* ==========================================================================
   Jukeboxd — search.js  (search.html only)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const resultsEl = document.getElementById('results');
  const input = document.getElementById('search-input');
  const form = document.getElementById('search-form');
  const tabs = document.querySelectorAll('.search-tabs button');
  const genreChipsEl = document.getElementById('genre-chips');
  const sortChips = document.querySelectorAll('.chip[data-sort]');

  let state = {
    tab: 'albums',
    query: qs('q') || '',
    genre: null,
    sort: 'relevance',
  };
  if (state.query) input.value = state.query;

  const genres = [...new Set(DB.albums.map(a => a.genre))];
  genreChipsEl.innerHTML = genres.map(g => `<button class="chip" data-genre="${g}">${g}</button>`).join('');

  tabs.forEach(btn => btn.addEventListener('click', () => {
    tabs.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true');
    state.tab = btn.dataset.tab;
    render();
  }));

  genreChipsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const same = state.genre === chip.dataset.genre;
    genreChipsEl.querySelectorAll('.chip').forEach(c => c.classList.remove('is-on'));
    state.genre = same ? null : chip.dataset.genre;
    if (!same) chip.classList.add('is-on');
    render();
  });

  sortChips.forEach(chip => chip.addEventListener('click', () => {
    sortChips.forEach(c => c.classList.remove('is-on'));
    chip.classList.add('is-on');
    state.sort = chip.dataset.sort;
    render();
  }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.query = input.value.trim();
    render();
  });

  function matchesQuery(text) {
    if (!state.query) return true;
    return text.toLowerCase().includes(state.query.toLowerCase());
  }

  function render() {
    let html = '';
    if (state.tab === 'albums') {
      let list = DB.albums.filter(a => matchesQuery(a.title + ' ' + a.artist) && (!state.genre || a.genre === state.genre));
      list = sortAlbums(list);
      html = list.map(a => `
        <a class="result-row is-album" href="album.html?id=${a.id}">
          <div class="cover"><img src="${a.cover}" alt=""></div>
          <div>
            <div class="result-row__title">${a.title}</div>
            <div class="result-row__meta">${a.artist} · ${a.year} · ${a.genre} · ${renderStars(a.rating)} <span style="margin-left:4px">${a.rating.toFixed(1)}</span></div>
          </div>
          <span class="pill">Álbum</span>
        </a>`).join('') || emptyState('álbuns');
    } else if (state.tab === 'songs') {
      const all = Object.entries(DB.tracks).flatMap(([albumId, tracks]) => tracks.map(t => ({ ...t, albumId })));
      let list = all.filter(t => matchesQuery(t.title));
      html = list.map(t => {
        const album = getAlbum(t.albumId);
        return `
        <a class="result-row is-song" href="album.html?id=${album.id}">
          <div class="cover"><img src="${album.cover}" alt=""></div>
          <div>
            <div class="result-row__title">${t.title}</div>
            <div class="result-row__meta">${album.artist} · ${album.title} · ${t.len}</div>
          </div>
          <span class="pill">Música</span>
        </a>`;
      }).join('') || emptyState('músicas');
    } else if (state.tab === 'artists') {
      let list = DB.artists.filter(a => matchesQuery(a.name));
      html = list.map(a => `
        <a class="result-row" href="search.html?q=${encodeURIComponent(a.name)}">
          <div class="cover" style="border-radius:50%"><img src="${a.image}" alt=""></div>
          <div>
            <div class="result-row__title">${a.name}</div>
            <div class="result-row__meta">${DB.albums.filter(al => al.artistId === a.id).length} álbum(ns) no catálogo</div>
          </div>
          <span class="pill">Artista</span>
        </a>`).join('') || emptyState('artistas');
    } else if (state.tab === 'users') {
      let list = DB.users.filter(u => matchesQuery(u.name + ' ' + u.handle));
      html = list.map(u => `
        <a class="result-row" href="profile.html?id=${u.id}">
          <div class="cover" style="border-radius:50%"><img src="${u.avatar}" alt=""></div>
          <div>
            <div class="result-row__title">${u.name}</div>
            <div class="result-row__meta">${u.handle}</div>
          </div>
          <span class="pill">Usuário</span>
        </a>`).join('') || emptyState('usuários');
    } else if (state.tab === 'lists') {
      let list = DB.lists.filter(l => matchesQuery(l.title + ' ' + l.description));
      html = list.map(l => {
        const cover = getAlbum(l.albumIds[0]).cover;
        return `
        <a class="result-row" href="list-detail.html?id=${l.id}">
          <div class="cover"><img src="${cover}" alt=""></div>
          <div>
            <div class="result-row__title">${l.title}</div>
            <div class="result-row__meta">por ${getUser(l.author).name} · ${l.albumIds.length} álbuns · ${l.likes} curtidas</div>
          </div>
          <span class="pill">Lista</span>
        </a>`;
      }).join('') || emptyState('listas');
    }
    resultsEl.innerHTML = html;
  }

  function sortAlbums(list) {
    const copy = [...list];
    if (state.sort === 'rating') copy.sort((a, b) => b.rating - a.rating);
    else if (state.sort === 'year') copy.sort((a, b) => b.year - a.year);
    return copy;
  }

  function emptyState(kind) {
    return `<div class="card" style="padding:40px;text-align:center;color:var(--text-muted)">Nenhum resultado em ${kind} para essa busca. Tente outro termo ou remova os filtros.</div>`;
  }

  render();
});
