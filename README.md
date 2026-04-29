# Pokédex — TDE 2

SPA didática construída em React, demonstrando rotas, layout reutilizável e componentização. Tema escolhido para tornar a aula visualmente atrativa e fácil de entender.

## Como rodar

```bash
npm install
npm run dev
```

O servidor de desenvolvimento sobe em `http://localhost:5173`.

Para gerar a build de produção:

```bash
npm run build
npm run preview
```

## Stack

- **React 18** — biblioteca de UI
- **React Router 6** — roteamento client-side (SPA)
- **Vite** — bundler e dev server
- **CSS puro** — um arquivo `.css` por componente/página

## Arquitetura

```
src/
├── main.jsx              entrypoint, monta o React e o BrowserRouter
├── App.jsx               definição das rotas
├── layouts/
│   ├── MainLayout.jsx    layout principal (Navbar + Outlet + Footer)
│   └── MainLayout.css
├── components/           componentes reutilizáveis
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── Card.jsx
├── pages/                páginas da aplicação (uma por rota)
│   ├── Home.jsx
│   ├── Pokedex.jsx
│   ├── Sobre.jsx
│   └── Contato.jsx
├── data/
│   └── pokemons.js       dados estáticos (array local de pokémons)
└── styles/
    └── global.css        reset, variáveis CSS e estilos globais
```

### Roteamento

O roteamento é feito com `react-router-dom`. O `App.jsx` define uma rota raiz `/` que renderiza o `MainLayout`, e dentro dela quatro rotas filhas:

| Rota         | Página     | Descrição                                |
| ------------ | ---------- | ---------------------------------------- |
| `/`          | Home       | Hero de boas-vindas + 3 pokémons em destaque |
| `/pokedex`   | Pokédex    | Lista completa de pokémons               |
| `/sobre`     | Sobre      | Informações sobre o projeto              |
| `/contato`   | Contato    | Formulário de contato                    |

O `MainLayout` usa `<Outlet />` do React Router para renderizar a página ativa entre o Navbar e o Footer — assim o layout não é repetido em cada página.

### Componentes

- **Navbar** — cabeçalho fixo no topo. Usa `NavLink` para destacar a rota ativa.
- **Footer** — rodapé estático.
- **Card** — recebe um pokémon via `props` e renderiza imagem, nome, número e tipos. Reutilizado na Home (destaques) e na Pokédex (lista).

### Dados

Os pokémons vivem em `src/data/pokemons.js` como um array de objetos. As imagens vêm dos sprites públicos da PokéAPI (URLs estáticas no GitHub). Não há fetch nem API — o foco do TDE é roteamento e layout.

### Estilos

CSS puro, um arquivo por componente/página. Variáveis globais (`--primary`, `--surface`, etc.) ficam em `styles/global.css`. As cores de tipo dos pokémons usam as cores oficiais (Grass, Fire, Water, etc.).

## O que esta SPA exercita (em ordem didática)

1. **Componentes funcionais** — cada arquivo `.jsx` exporta uma função que retorna JSX.
2. **Props** — `Card` recebe `pokemon` do componente pai.
3. **Listas com `.map()`** — Home e Pokédex iteram sobre o array de pokémons.
4. **Layout reutilizável** — `MainLayout` + `<Outlet />`.
5. **Rotas** — `Routes`, `Route`, `Link` e `NavLink`.
# Pokedex-react
