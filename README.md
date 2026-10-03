# Jukeboxd — Front-end

Front-end estático (HTML5, CSS3, JavaScript puro — sem frameworks) para o
Jukeboxd, plataforma social de avaliação e descoberta de músicas e álbuns.
O back-end (Elixir + Phoenix + PostgreSQL/Ecto) é uma etapa futura; este
projeto entrega apenas a camada de apresentação, já navegável com dados
fictícios (`js/data.js`).

## Estrutura

```
jukeboxd/
├── html/
│   ├── index.html      Início — hero, feed de atividades, recomendações
│   ├── login.html      Login
│   ├── register.html   Cadastro
│   ├── search.html     Pesquisa de músicas, álbuns, artistas, usuários, listas
│   ├── album.html      Detalhe de álbum/música — faixas, avaliação, resenhas
│   ├── profile.html    Perfil — diário, resenhas, favoritos, listas
│   ├── lists.html      Listas da comunidade
│   ├── list-detail.html Detalhe de uma lista
│   └── stats.html      Estatísticas pessoais / retrospecto anual
├── css/
│   ├── main.css          Design tokens, reset, nav, botões, forms, cards
│   └── pages.css         Layout específico de cada página
└── js/
    ├── data.js           Dados fictícios (substituir por chamadas à API Phoenix)
    ├── main.js           Helpers compartilhados (nav, toast, estrelas, cards)
    ├── auth.js           login.html + register.html
    ├── home.js            index.html
    ├── search.js           search.html
    ├── album.js             album.html
    ├── profile.js             profile.html
    ├── lists.js                lists.html
    ├── list-detail.js            list-detail.html
    └── stats.js                   stats.html
```

## Identidade visual

- **Paleta**: fundo azul-tinta quase preto (`#10131a`), superfícies em
  `#1c212c`/`#232937`, texto em bege claro (`#f2ede1`) e um âmbar de "luz de
  jukebox" (`#f2a93b`) como acento principal, com coral (`#e5604d`) para
  ações secundárias.
- **Tipografia**: `Fraunces` (serifada, itálica em destaques) para títulos —
  clima de encarte de disco — e `Work Sans` para textos e interface.
- **Motivo visual**: o disco de vinil se repete como marca (logo, avatar,
  ilustração do hero e das telas de login/cadastro), reforçando o tema
  musical sem recorrer a ícones genéricos de streaming.

## Como visualizar

Não há build step. Basta servir a pasta com qualquer servidor estático, por
exemplo:

```bash
cd jukeboxd
python3 -m http.server 8000
# abrir http://localhost:8000/html/
```

## Conectando ao back-end (Phoenix/Elixir)

Toda a "API" hoje é o objeto `DB` em `js/data.js`. Para integrar com o
back-end real, o caminho recomendado é:

1. Substituir as leituras de `DB.*` por chamadas `fetch()` para os endpoints
   REST/JSON expostos pelo Phoenix (ex.: `GET /api/albums/:id`,
   `POST /api/reviews`, `POST /api/sessions` para login).
2. Manter as funções de `main.js` (`renderStars`, `buildRatingInput`,
   `albumTileHTML`, `feedItemHTML`, `reviewHTML`, etc.) — elas já recebem os
   mesmos formatos de objeto usados em `data.js`, então basta popular esses
   objetos com a resposta da API em vez dos dados fictícios.
3. Trocar a autenticação simulada em `auth.js` por chamadas reais e
   armazenamento de sessão/token (cookie de sessão do Phoenix ou JWT).
