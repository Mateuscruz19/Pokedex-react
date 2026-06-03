# Pokédex

Catálogo digital dos pokémons da primeira geração (região de Kanto), consumindo a **PokéAPI** em tempo real. Além dos 151 originais, o usuário pode **cadastrar seus próprios pokémons** com foto, e eles passam a aparecer na Pokédex.

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
- **PokéAPI** — API REST pública consumida via `fetch`
- **localStorage** — persistência dos pokémons cadastrados pelo usuário
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
│   └── Card.jsx          renderiza pokémon da API OU cadastrado pelo usuário
├── pages/                páginas da aplicação (uma por rota)
│   ├── Home.jsx
│   ├── Pokedex.jsx       lista (API + cadastrados) consumindo a PokéAPI
│   ├── Sobre.jsx
│   ├── Contato.jsx
│   └── NovoPokemon.jsx   formulário + upload de imagem
├── services/             camada de serviços (separação de responsabilidades)
│   └── customPokemons.js leitura/escrita dos pokémons no localStorage
├── data/
│   └── pokemons.js       array de IDs (1 a 151) usados na busca da API
└── styles/
    └── global.css        reset, variáveis CSS e estilos globais
```

### Roteamento

O roteamento é feito com `react-router-dom`. O `App.jsx` define uma rota raiz `/` que renderiza o `MainLayout`, e dentro dela as rotas filhas:

| Rota           | Página       | Descrição                                    |
| -------------- | ------------ | -------------------------------------------- |
| `/`            | Home         | Boas-vindas e pokémons em destaque           |
| `/pokedex`     | Pokédex      | Lista da PokéAPI + pokémons cadastrados      |
| `/sobre`       | Sobre        | Informações sobre a Pokédex                  |
| `/contato`     | Contato      | Formulário de contato                        |
| `/novo`        | Novo Pokémon | Cadastro de pokémon com upload de imagem     |

O `MainLayout` usa `<Outlet />` do React Router para renderizar a página ativa entre o Navbar e o Footer, evitando repetir o layout em cada página.

## Integração com API

A página **Pokédex** (`src/pages/Pokedex.jsx`) consome a [PokéAPI](https://pokeapi.co/) via `fetch`:

1. No `useEffect` (ao montar a página), dispara uma requisição para cada um dos 151 IDs (`src/data/pokemons.js`).
2. `Promise.all` aguarda todas as respostas em paralelo e converte cada uma em JSON.
3. O resultado é juntado com os pokémons cadastrados pelo usuário (`[...meus, ...daApi]`) e guardado no estado com `useState`.
4. Cada item é renderizado pelo componente `Card`.

O `Card` recebe um pokémon via `props` e funciona para **dois formatos**: o objeto completo vindo da API e o objeto simplificado criado pelo usuário (identificado pela flag `pokemon.custom`).

## Funcionalidade: cadastro de Pokémon com upload de imagem

A página **Novo Pokémon** (`src/pages/NovoPokemon.jsx`) une um formulário a um upload de imagem com preview.

**Campos:** nome, tipo e foto. Cada campo é um **componente controlado** (valor guardado em `useState`).

**Fluxo do upload e do preview:**

1. **Seleção** — `<input type="file" accept="image/*">` restringe a escolha a imagens.
2. **Preview imediato** — `URL.createObjectURL(arquivo)` gera uma URL temporária na memória do navegador, exibida na hora (rápido, sem conversão).
3. **Persistência** — em paralelo, um `FileReader` lê o arquivo e o converte para **Base64** (texto). Isso é necessário porque a URL temporária do passo 2 **não sobrevive a um reload**; o Base64, por ser texto, pode ser salvo no `localStorage`.
4. **Salvar** — no submit, monta-se o objeto do pokémon (`id`, `name`, `imagem` em Base64, `tipo`, `custom: true`) e ele é gravado via `services/customPokemons.js`.
5. **Exibir** — o usuário é redirecionado para a Pokédex, onde o novo pokémon aparece junto com os da API e **permanece mesmo após recarregar a página**.

A lógica de leitura/escrita no `localStorage` fica isolada em `src/services/customPokemons.js`, mantendo a separação de responsabilidades (a página não conhece os detalhes de armazenamento).

## Componentes

- **Navbar** — cabeçalho fixo no topo. Usa `NavLink` para destacar a rota ativa.
- **Footer** — rodapé estático.
- **Card** — renderiza imagem, nome e tipo(s). Reutilizado para pokémons da API e cadastrados pelo usuário.

## Estilos

CSS puro, um arquivo por componente/página. Variáveis globais (`--primary`, `--surface`, etc.) ficam em `styles/global.css`. As cores dos tipos elementais são definidas em um objeto JavaScript dentro do `Card.jsx` (com apelidos em português para os tipos cadastrados pelo usuário).

## Créditos

Mateus Cruz e Luiz Santarosa.
