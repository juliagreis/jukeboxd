/* ==========================================================================
   Jukeboxd — stats.js  (stats.html only)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const s = DB.stats;

  document.getElementById('stat-grid').innerHTML = `
    <div class="card stat-card"><div class="stat-card__value">${s.totalPlays.toLocaleString('pt-BR')}</div><div class="stat-card__label">músicas escutadas</div></div>
    <div class="card stat-card"><div class="stat-card__value">${s.totalAlbums}</div><div class="stat-card__label">álbuns diferentes</div></div>
    <div class="card stat-card"><div class="stat-card__value">${s.totalArtists}</div><div class="stat-card__label">artistas diferentes</div></div>
    <div class="card stat-card"><div class="stat-card__value">${s.avgRating.toFixed(1)}</div><div class="stat-card__label">nota média dada</div></div>
  `;

  const max = Math.max(...s.months.map(m => m.value), 1);
  document.getElementById('bars').innerHTML = s.months.map(m => `
    <div class="bar" style="height:${(m.value / max) * 100}%" title="${m.label}: ${m.value}">
      <span>${m.label}</span>
    </div>`).join('');

  document.getElementById('genre-bars').innerHTML = s.topGenres.map(g => `
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;font-size:.85rem;margin-bottom:6px">
        <span>${g.name}</span><span style="color:var(--text-muted)">${g.pct}%</span>
      </div>
      <div style="height:8px;border-radius:999px;background:var(--bg-alt);overflow:hidden">
        <div style="height:100%;width:${g.pct}%;background:linear-gradient(90deg,var(--amber-dim),var(--amber));border-radius:999px"></div>
      </div>
    </div>`).join('');

  const topAlbums = [...DB.albums].sort((a, b) => b.ratingsCount - a.ratingsCount).slice(0, 5);
  document.getElementById('top-albums').innerHTML = topAlbums.map((a, i) => `
    <a class="rank-row" href="album.html?id=${a.id}">
      <span class="rank">${i + 1}</span>
      <span class="cover"><img src="${a.cover}" alt=""></span>
      <span>${a.title}<br><span style="color:var(--text-muted);font-size:.78rem">${a.artist}</span></span>
    </a>`).join('');

  const topArtists = [...DB.artists].slice(0, 5);
  document.getElementById('top-artists').innerHTML = topArtists.map((ar, i) => `
    <a class="rank-row" href="search.html?q=${encodeURIComponent(ar.name)}">
      <span class="rank">${i + 1}</span>
      <span class="cover" style="border-radius:50%"><img src="${ar.image}" alt=""></span>
      <span>${ar.name}<br><span style="color:var(--text-muted);font-size:.78rem">${DB.albums.filter(a => a.artistId === ar.id).length} álbuns ouvidos</span></span>
    </a>`).join('');

  const topRated = [...DB.albums].sort((a, b) => b.rating - a.rating).slice(0, 5);
  document.getElementById('top-rated').innerHTML = topRated.map((a, i) => `
    <a class="rank-row" href="album.html?id=${a.id}">
      <span class="rank">${i + 1}</span>
      <span class="cover"><img src="${a.cover}" alt=""></span>
      <span>${a.title}<br>${renderStars(a.rating)}</span>
    </a>`).join('');

  document.querySelectorAll('#year-switch button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('#year-switch button').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    showToast(`Exibindo estatísticas de ${btn.dataset.year}`);
  }));

  document.getElementById('export-btn').addEventListener('click', () => {
    showToast('Gerando seu retrospecto anual…');
  });
});
