/* ==========================================================================
   Jukeboxd — home.js  (index.html only)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const feedEl = document.getElementById('feed-list');
  feedEl.innerHTML = DB.activity.map(feedItemHTML).join('');

  const popularEl = document.getElementById('popular-list');
  const popular = [...DB.albums].sort((a, b) => b.ratingsCount - a.ratingsCount).slice(0, 4);
  popularEl.innerHTML = popular.map(a => `
    <li>
      <a class="cover" href="album.html?id=${a.id}" style="width:42px;height:42px"><img src="${a.cover}" alt=""></a>
      <div class="who">${a.title}<span>${a.artist}</span></div>
    </li>`).join('');

  const followEl = document.getElementById('follow-list');
  followEl.innerHTML = DB.users.map(u => `
    <li>
      <a class="cover" href="profile.html?id=${u.id}" style="width:42px;height:42px;border-radius:50%"><img src="${u.avatar}" alt=""></a>
      <div class="who">${u.name}<span>${u.handle}</span></div>
    </li>`).join('');

  document.getElementById('rec-grid').innerHTML =
    [...DB.albums].sort((a, b) => b.rating - a.rating).slice(0, 6).map(albumTileHTML).join('');

  document.getElementById('new-grid').innerHTML =
    [...DB.albums].sort((a, b) => b.year - a.year).slice(0, 6).map(albumTileHTML).join('');
});
