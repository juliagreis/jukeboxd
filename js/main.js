/* ==========================================================================
   Jukeboxd — main.js
   Shared behaviour + render helpers loaded on every page (after data.js).
   ========================================================================== */

/* ---- mobile nav toggle ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // fill avatar initial if a nav avatar placeholder exists
  document.querySelectorAll('[data-current-user-initial]').forEach(el => {
    el.textContent = DB.currentUser.name.charAt(0);
  });
  document.querySelectorAll('[data-current-user-name]').forEach(el => {
    el.textContent = DB.currentUser.name;
  });
});

/* ---- toast -------------------------------------------------------------
   showToast('Adicionado aos favoritos') */
let toastTimer = null;
function showToast(message) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2400);
}

/* ---- star icon svg ------------------------------------------------------ */
function starSVG(fillPct) {
  // fillPct: 0-100, used for the clip of a single star
  const id = 'sg' + Math.random().toString(36).slice(2, 9);
  return `<svg viewBox="0 0 20 20" aria-hidden="true">
    <defs><clipPath id="${id}"><rect x="0" y="0" width="${fillPct / 5}" height="20"/></clipPath></defs>
    <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L10 14.8l-5.3 2.8 1.1-5.9L1.5 7.6l5.9-.7z"
      fill="none" stroke="currentColor" stroke-width="1" opacity=".35"/>
    <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L10 14.8l-5.3 2.8 1.1-5.9L1.5 7.6l5.9-.7z"
      fill="currentColor" clip-path="url(#${id})"/>
  </svg>`;
}

/** renderStars(4.5) -> HTML markup of 5 stars, partially filled */
function renderStars(rating) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const pct = Math.max(0, Math.min(100, (rating - i) * 100));
    stars.push(starSVG(pct));
  }
  return `<span class="stars" aria-label="${rating.toFixed(1)} de 5 estrelas">${stars.join('')}</span>`;
}

/* ---- interactive rating input --------------------------------------------
   buildRatingInput(container, initial, onChange) */
function buildRatingInput(container, initial = 0, onChange = () => {}) {
  container.classList.add('rating-input');
  container.innerHTML = '';
  let current = initial;
  const buttons = [];
  for (let i = 1; i <= 5; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Avaliar com ${i} estrela${i > 1 ? 's' : ''}`);
    b.innerHTML = `<svg viewBox="0 0 20 20"><path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L10 14.8l-5.3 2.8 1.1-5.9L1.5 7.6l5.9-.7z" fill="currentColor"/></svg>`;
    b.addEventListener('click', () => {
      current = i;
      paint();
      onChange(current);
      showToast(`Você avaliou com ${i} estrela${i > 1 ? 's' : ''}`);
    });
    container.appendChild(b);
    buttons.push(b);
  }
  function paint() {
    buttons.forEach((b, idx) => b.classList.toggle('is-on', idx < current));
  }
  paint();
}

/* ---- card builders -------------------------------------------------- */
function albumTileHTML(album) {
  return `
  <a class="album-tile" href="album.html?id=${album.id}">
    <div class="cover"><img src="${album.cover}" alt="Capa do álbum ${album.title}" loading="lazy"></div>
    <div class="album-tile__title">${album.title}</div>
    <div class="album-tile__artist">${album.artist}</div>
  </a>`;
}

function feedItemHTML(item) {
  const user = getUser(item.userId);
  const album = item.albumId ? getAlbum(item.albumId) : null;
  let verb = '';
  let body = '';
  if (item.type === 'review') {
    verb = `avaliou <a href="album.html?id=${album.id}">${album.title}</a> com ${item.rating}★ e escreveu uma resenha`;
    body = `<div class="feed-item__body">“${item.excerpt}”</div>`;
  } else if (item.type === 'rating') {
    verb = `avaliou <a href="album.html?id=${album.id}">${album.title}</a> com ${item.rating}★`;
  } else if (item.type === 'favorite') {
    verb = `favoritou <a href="album.html?id=${album.id}">${album.title}</a>`;
  } else if (item.type === 'list') {
    const list = getList(item.listId);
    verb = `criou a lista <a href="list-detail.html?id=${list.id}">${list.title}</a>`;
  }
  const cover = album ? album.cover : getList(item.listId).albumIds.length ? getAlbum(getList(item.listId).albumIds[0]).cover : '';
  return `
  <li class="feed-item">
    <div class="feed-item__cover"><a href="profile.html?id=${user.id}"><img src="${user.avatar}" alt="${user.name}"></a></div>
    <div>
      <div class="feed-item__head"><strong>${user.name}</strong> ${verb}</div>
      ${body}
      <div class="feed-item__meta"><span>${item.date}</span><span>Curtir</span><span>Comentar</span></div>
    </div>
  </li>`;
}

function reviewHTML(review) {
  const user = getUser(review.userId);
  return `
  <article class="review">
    <div class="review__avatar"><img src="${user.avatar}" alt="${user.name}"></div>
    <div>
      <div class="review__head">
        <strong>${user.name}</strong>
        ${renderStars(review.rating)}
        <time>${new Date(review.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</time>
      </div>
      <p class="review__body">${review.body}</p>
      <div class="review__footer"><span>Curtir</span><span>Responder</span></div>
    </div>
  </article>`;
}

function toggleFavoriteButton(btn, albumId) {
  const isFav = DB.favorites.includes(albumId);
  paint();
  btn.addEventListener('click', () => {
    const idx = DB.favorites.indexOf(albumId);
    if (idx >= 0) { DB.favorites.splice(idx, 1); showToast('Removido dos favoritos'); }
    else { DB.favorites.push(albumId); showToast('Adicionado aos favoritos'); }
    paint();
  });
  function paint() {
    const on = DB.favorites.includes(albumId);
    btn.textContent = on ? '♥ Favoritado' : '♡ Favoritar';
    btn.classList.toggle('btn--primary', on);
    btn.classList.toggle('btn--ghost', !on);
  }
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}
