/* ==========================================================================
   Jukeboxd — data.js
   Mock/local data layer. In production this is replaced by calls to the
   Phoenix/Elixir API (see README). Kept as plain JS objects + a tiny
   localStorage-backed store so the front end is fully clickable on its own.
   ========================================================================== */

const PLACEHOLDER = (seed, w = 400, h = 400) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const DB = {
  currentUser: {
    id: 'u1',
    name: 'Marina Alves',
    handle: '@marina.a',
    avatar: PLACEHOLDER('marina-avatar', 200, 200),
    bio: 'Colecionadora de vinis antigos e caçadora de b-sides esquecidos. Sempre em busca do próximo álbum favorito.',
    joined: '2023',
    followers: 812,
    following: 194,
  },

  artists: [
    { id: 'ar1', name: 'Nebula Coast', image: PLACEHOLDER('artist-nebula', 300, 300) },
    { id: 'ar2', name: 'Rio Marrom', image: PLACEHOLDER('artist-rio', 300, 300) },
    { id: 'ar3', name: 'Vitrola Elétrica', image: PLACEHOLDER('artist-vitrola', 300, 300) },
    { id: 'ar4', name: 'Sombra Neon', image: PLACEHOLDER('artist-sombra', 300, 300) },
    { id: 'ar5', name: 'Marés Baixas', image: PLACEHOLDER('artist-mares', 300, 300) },
    { id: 'ar6', name: 'Cobre & Cia', image: PLACEHOLDER('artist-cobre', 300, 300) },
  ],

  albums: [
    { id: 'al1', title: 'Fita Cassete', artistId: 'ar1', artist: 'Nebula Coast', year: 2024, cover: PLACEHOLDER('album-fita', 500, 500), rating: 4.3, ratingsCount: 2140, genre: 'Indie Rock' },
    { id: 'al2', title: 'Sinais de Rádio', artistId: 'ar2', artist: 'Rio Marrom', year: 2023, cover: PLACEHOLDER('album-sinais', 500, 500), rating: 3.9, ratingsCount: 980, genre: 'MPB Experimental' },
    { id: 'al3', title: 'Disco de Vidro', artistId: 'ar3', artist: 'Vitrola Elétrica', year: 2022, cover: PLACEHOLDER('album-vidro', 500, 500), rating: 4.6, ratingsCount: 5310, genre: 'Synth-pop' },
    { id: 'al4', title: 'Luz de Néon', artistId: 'ar4', artist: 'Sombra Neon', year: 2024, cover: PLACEHOLDER('album-neon', 500, 500), rating: 4.1, ratingsCount: 1420, genre: 'Dream Pop' },
    { id: 'al5', title: 'Maré Vazia', artistId: 'ar5', artist: 'Marés Baixas', year: 2021, cover: PLACEHOLDER('album-mare', 500, 500), rating: 3.7, ratingsCount: 640, genre: 'Folk' },
    { id: 'al6', title: 'Latão', artistId: 'ar6', artist: 'Cobre & Cia', year: 2023, cover: PLACEHOLDER('album-latao', 500, 500), rating: 4.4, ratingsCount: 2890, genre: 'Jazz Fusion' },
    { id: 'al7', title: 'Poeira Estelar', artistId: 'ar1', artist: 'Nebula Coast', year: 2021, cover: PLACEHOLDER('album-poeira', 500, 500), rating: 4.0, ratingsCount: 1710, genre: 'Indie Rock' },
    { id: 'al8', title: 'Água Parada', artistId: 'ar5', artist: 'Marés Baixas', year: 2023, cover: PLACEHOLDER('album-agua', 500, 500), rating: 3.5, ratingsCount: 420, genre: 'Folk' },
    { id: 'al9', title: 'Circuito Aberto', artistId: 'ar4', artist: 'Sombra Neon', year: 2022, cover: PLACEHOLDER('album-circuito', 500, 500), rating: 4.2, ratingsCount: 1980, genre: 'Synth-pop' },
    { id: 'al10', title: 'Terra Firme', artistId: 'ar2', artist: 'Rio Marrom', year: 2024, cover: PLACEHOLDER('album-terra', 500, 500), rating: 4.5, ratingsCount: 3020, genre: 'MPB Experimental' },
    { id: 'al11', title: 'Metrônomo', artistId: 'ar3', artist: 'Vitrola Elétrica', year: 2020, cover: PLACEHOLDER('album-metro', 500, 500), rating: 3.8, ratingsCount: 890, genre: 'Synth-pop' },
    { id: 'al12', title: 'Bronze Fosco', artistId: 'ar6', artist: 'Cobre & Cia', year: 2021, cover: PLACEHOLDER('album-bronze', 500, 500), rating: 4.3, ratingsCount: 1560, genre: 'Jazz Fusion' },
  ],

  tracks: {
    al1: [
      { n: 1, title: 'Abertura', len: '3:12' },
      { n: 2, title: 'Fita Cassete', len: '4:01' },
      { n: 3, title: 'Rebobinar', len: '2:48' },
      { n: 4, title: 'Lado B', len: '3:55' },
      { n: 5, title: 'Estática', len: '3:20' },
      { n: 6, title: 'Encerramento', len: '4:44' },
    ],
  },

  users: [
    { id: 'u2', name: 'Théo Fontenele', handle: '@theo.f', avatar: PLACEHOLDER('user-theo', 160, 160) },
    { id: 'u3', name: 'Bia Nunes', handle: '@bia.n', avatar: PLACEHOLDER('user-bia', 160, 160) },
    { id: 'u4', name: 'Caê Ribeiro', handle: '@cae.r', avatar: PLACEHOLDER('user-cae', 160, 160) },
    { id: 'u5', name: 'Sol Amaral', handle: '@sol.a', avatar: PLACEHOLDER('user-sol', 160, 160) },
  ],

  reviews: [
    { id: 'r1', userId: 'u2', albumId: 'al1', rating: 5, date: '2026-09-02', body: 'Um dos discos mais coesos do ano. A faixa-título sozinha já vale o disco inteiro — a produção lembra fitas gravadas em casa, no melhor sentido possível.' },
    { id: 'r2', userId: 'u3', albumId: 'al1', rating: 4, date: '2026-08-21', body: 'Muito bom do início ao fim, ainda que a segunda metade perca um pouco de fôlego perto da terceira faixa.' },
    { id: 'r3', userId: 'u4', albumId: 'al1', rating: 4.5, date: '2026-07-30', body: 'Nebula Coast continua evoluindo sem perder a identidade. As camadas vocais em "Estática" são hipnotizantes.' },
    { id: 'r4', userId: 'u5', albumId: 'al3', rating: 5, date: '2026-09-10', body: 'Referência absoluta de synth-pop nos últimos anos. Escuto inteiro sem pular nenhuma faixa.' },
  ],

  activity: [
    { id: 'a1', userId: 'u2', type: 'review', albumId: 'al1', rating: 5, date: '2 h atrás', excerpt: 'Um dos discos mais coesos do ano...' },
    { id: 'a2', userId: 'u3', type: 'rating', albumId: 'al3', rating: 4.5, date: '5 h atrás' },
    { id: 'a3', userId: 'u4', type: 'list', listId: 'l1', date: '1 dia atrás' },
    { id: 'a4', userId: 'u5', type: 'review', albumId: 'al10', rating: 4, date: '1 dia atrás', excerpt: 'Terra Firme mostra um Rio Marrom mais confiante e experimental...' },
    { id: 'a5', userId: 'u2', type: 'favorite', albumId: 'al6', date: '2 dias atrás' },
  ],

  lists: [
    { id: 'l1', title: 'Discos para ouvir chovendo', author: 'u4', description: 'Uma seleção para dias cinzentos, café coado e janela embaçada.', albumIds: ['al5', 'al8', 'al2', 'al11'], likes: 132 },
    { id: 'l2', title: 'Melhores estreias de 2024', author: 'u1', description: 'Álbuns de estreia que mais me surpreenderam este ano.', albumIds: ['al1', 'al4', 'al9', 'al10', 'al7'], likes: 268 },
    { id: 'l3', title: 'Synth-pop essencial', author: 'u3', description: 'Do synth clássico ao contemporâneo — uma introdução ao gênero.', albumIds: ['al3', 'al9', 'al11', 'al4'], likes: 401 },
    { id: 'l4', title: 'Jazz para trabalhar', author: 'u1', description: 'Instrumentais e fusões leves para manter o foco.', albumIds: ['al6', 'al12'], likes: 89 },
    { id: 'l5', title: 'Favoritos da década', author: 'u5', description: 'Os discos que definiram os últimos dez anos, na minha visão.', albumIds: ['al1', 'al3', 'al6', 'al10', 'al2', 'al7'], likes: 512 },
    { id: 'l6', title: 'Para descobrir MPB nova', author: 'u2', description: 'Nomes atuais que estão reinventando a MPB.', albumIds: ['al2', 'al10'], likes: 154 },
  ],

  favorites: ['al3', 'al1', 'al6', 'al10'],

  diary: [
    { date: '21 set', albumId: 'al10', rating: 4.5 },
    { date: '18 set', albumId: 'al3', rating: 5 },
    { date: '14 set', albumId: 'al6', rating: 4 },
    { date: '09 set', albumId: 'al1', rating: 4.5 },
    { date: '02 set', albumId: 'al9', rating: 3.5 },
    { date: '27 ago', albumId: 'al4', rating: 4 },
  ],

  stats: {
    year: 2026,
    totalPlays: 1284,
    totalAlbums: 96,
    totalArtists: 58,
    avgRating: 3.9,
    months: [
      { label: 'Jan', value: 62 }, { label: 'Fev', value: 78 }, { label: 'Mar', value: 54 },
      { label: 'Abr', value: 91 }, { label: 'Mai', value: 118 }, { label: 'Jun', value: 96 },
      { label: 'Jul', value: 132 }, { label: 'Ago', value: 145 }, { label: 'Set', value: 108 },
      { label: 'Out', value: 0 }, { label: 'Nov', value: 0 }, { label: 'Dez', value: 0 },
    ],
    topGenres: [
      { name: 'Indie Rock', pct: 28 }, { name: 'Synth-pop', pct: 22 }, { name: 'MPB Experimental', pct: 18 },
      { name: 'Jazz Fusion', pct: 16 }, { name: 'Folk', pct: 10 }, { name: 'Outros', pct: 6 },
    ],
  },
};

/* helpers -------------------------------------------------------------- */
function getAlbum(id){ return DB.albums.find(a => a.id === id); }
function getArtist(id){ return DB.artists.find(a => a.id === id); }
function getUser(id){ return id === DB.currentUser.id ? DB.currentUser : DB.users.find(u => u.id === id); }
function getList(id){ return DB.lists.find(l => l.id === id); }
function reviewsFor(albumId){ return DB.reviews.filter(r => r.albumId === albumId); }
