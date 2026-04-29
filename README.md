# Pokédex

Catálogo digital dos pokémons da primeira geração (região de Kanto). Cada entrada apresenta número, nome, tipos elementais e ilustração oficial.

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

| Rota         | Página     | Descrição                                    |
| ------------ | ---------- | -------------------------------------------- |
| `/`          | Home       | Boas-vindas e pokémons em destaque           |
| `/pokedex`   | Pokédex    | Lista completa de pokémons cadastrados       |
| `/sobre`     | Sobre      | Informações sobre a Pokédex                  |
| `/contato`   | Contato    | Formulário de contato                        |

O `MainLayout` usa `<Outlet />` do React Router para renderizar a página ativa entre o Navbar e o Footer, evitando repetir o layout em cada página.

### Componentes

- **Navbar** — cabeçalho fixo no topo. Usa `NavLink` para destacar a rota ativa.
- **Footer** — rodapé estático.
- **Card** — recebe um pokémon via `props` e renderiza imagem, número, nome e tipos. Reutilizado na Home (destaques) e na Pokédex (lista).

### Dados

Os pokémons ficam em `src/data/pokemons.js` como um array de objetos. As imagens vêm dos sprites públicos da PokéAPI hospedados no GitHub.

### Estilos

CSS puro, um arquivo por componente/página. Variáveis globais (`--primary`, `--surface`, etc.) ficam em `styles/global.css`. As cores dos tipos elementais são definidas em um objeto JavaScript dentro do `Card.jsx`.

## Créditos

Mateus Cruz e Luiz Santarosa.
