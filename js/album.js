/* ==========================================================================
   Jukeboxd — album.js  (album.html only)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const album = getAlbum(qs('id')) || DB.albums[0];
  const artist = getArtist(album.artistId);
  document.getElementById('page-title').textContent = `${album.title} — Jukeboxd`;

  const isFav = DB.favorites.includes(album.id);

  document.getElementById('detail-head').innerHTML = `
    <div class="detail-head__cover"><img src="${album.cover}" alt="Capa do álbum ${album.title}"></div>
    <div>
      <p class="detail-head__kind">Álbum · ${album.year}</p>
      <h1>${album.title}</h1>
      <p class="detail-head__artist">por <a href="search.html?q=${encodeURIComponent(album.artist)}">${album.artist}</a></p>
      <div class="detail-head__meta">
        <span class="pill pill--accent">${album.genre}</span>
        <span class="pill">${album.year}</span>
        <span class="pill">${Object.keys(DB.tracks[album.id] ? DB.tracks : {}).length ? (DB.tracks[album.id] || genericTracks(album.id)).length : genericTracks(album.id).length} faixas</span>
      </div>
      <div class="detail-head__stats">
        <div class="detail-head__stat"><strong>${album.rating.toFixed(1)}</strong>nota média</div>
        <div class="detail-head__stat"><strong>${album.ratingsCount.toLocaleString('pt-BR')}</strong>avaliações</div>
        <div class="detail-head__stat"><strong>${reviewsFor(album.id).length}</strong>resenhas</div>
      </div>
      <div class="detail-head__actions">
        <div class="rate-box">
          <span class="rate-box__label">Avaliar:</span>
          <span id="header-rating-input"></span>
        </div>
        <button class="btn" id="fav-btn" type="button"></button>
        <button class="btn btn--subtle" id="add-list-btn" type="button">+ Adicionar à lista</button>
      </div>
    </div>`;

  buildRatingInput(document.getElementById('header-rating-input'), 0);
  buildRatingInput(document.getElementById('review-rating-input'), 0);

  const favBtn = document.getElementById('fav-btn');
  toggleFavoriteButton(favBtn, album.id);

  document.getElementById('add-list-btn').addEventListener('click', () => showToast('Escolha uma lista na página "Listas" para adicionar este álbum.'));

  const tracks = DB.tracks[album.id] || genericTracks(album.id);
  document.getElementById('tracklist').innerHTML = tracks.map(t => `
    <li>
      <span class="n">${String(t.n).padStart(2, '0')}</span>
      <span>${t.title}</span>
      <span class="len">${t.len}</span>
      <span class="stars">${renderStars(Math.min(5, album.rating + (Math.random() * 0.6 - 0.3)))}</span>
    </li>`).join('');

  const reviewsListEl = document.getElementById('reviews-list');
  function paintReviews() {
    const list = reviewsFor(album.id);
    reviewsListEl.innerHTML = list.length
      ? list.map(reviewHTML).join('')
      : `<p style="color:var(--text-muted);padding:20px 0">Ainda não há resenhas para este álbum. Seja a primeira pessoa a escrever uma.</p>`;
  }
  paintReviews();

  let pendingRating = 0;
  const reviewRatingHost = document.getElementById('review-rating-input');
  buildRatingInput(reviewRatingHost, 0, (v) => { pendingRating = v; });

  document.getElementById('review-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const body = document.getElementById('review-body').value.trim();
    if (!body) { showToast('Escreva algo antes de publicar.'); return; }
    if (!pendingRating) { showToast('Dê uma nota de 1 a 5 estrelas.'); return; }
    DB.reviews.unshift({
      id: 'rtmp' + Date.now(),
      userId: DB.currentUser.id,
      albumId: album.id,
      rating: pendingRating,
      date: new Date().toISOString().slice(0, 10),
      body,
    });
    document.getElementById('review-body').value = '';
    paintReviews();
    showToast('Resenha publicada!');
  });

  document.getElementById('side-artist-name').textContent = album.artist;
  document.getElementById('more-from-artist').innerHTML = DB.albums
    .filter(a => a.artistId === album.artistId && a.id !== album.id)
    .slice(0, 3)
    .map(a => `<a href="album.html?id=${a.id}" class="cover" title="${a.title}"><img src="${a.cover}" alt="${a.title}"></a>`)
    .join('') || `<p style="color:var(--text-muted);font-size:.85rem">Sem outros álbuns cadastrados.</p>`;

  const also = DB.albums.filter(a => a.id !== album.id && a.genre === album.genre).slice(0, 4);
  document.getElementById('also-heard').innerHTML = also.map(a => `
    <li>
      <a class="cover" href="album.html?id=${a.id}" style="width:42px;height:42px"><img src="${a.cover}" alt=""></a>
      <div class="who">${a.title}<span>${a.artist}</span></div>
    </li>`).join('');

  function genericTracks(id) {
    const n = 8;
    return Array.from({ length: n }, (_, i) => ({
      n: i + 1,
      title: `Faixa ${i + 1}`,
      len: `${2 + (i % 3)}:${(15 + i * 7) % 60 < 10 ? '0' : ''}${(15 + i * 7) % 60}`,
    }));
  }
});
