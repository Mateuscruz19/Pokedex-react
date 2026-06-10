# Guia rápido da autoria (RA3)

> Para cada pedido: **onde** mexer, **o código** pra colar, **como provar** e a **defesa** em 1 frase.

## Antes de tudo — como rodar
- **Terminal 1 (backend):** `cd backend` → `node server.js` (porta 3001)
- **Terminal 2 (front):** `npm run dev` → abre `http://localhost:5173`
- Login de teste: `admin@email.com` / `123456`

## ⚠️ 3 pegadinhas que valem ouro
1. **`setState` é assíncrono** — pra logar/usar o valor NOVO na hora, calcule numa variável antes:
   `const novo = !x; setX(novo); console.log(novo)` (usar `x` direto loga o valor ANTIGO).
2. **`.jsx`, não `.js`** — no Vite, arquivo com JSX **tem que** terminar em `.jsx`. Se criar `Saudacao.js` com JSX, **quebra**. Use `Saudacao.jsx`.
3. **StrictMode roda `useEffect` 2x no dev** — ver desafio 8.

---

## 1) Criar uma nova rota e mostrar no navegador

**Cria** `src/pages/Teste.jsx`:
```jsx
export default function Teste() {
  return <h1>Página de Teste</h1>
}
```
**Em `src/App.jsx`** — importa no topo e adiciona a rota dentro do `<Route path="/" ...>`:
```jsx
import Teste from './pages/Teste'
// ...
<Route path="teste" element={<Teste />} />
```
**Provar:** abrir `http://localhost:5173/teste`.
**Defesa:** *"Criei o componente, registrei a rota no react-router com `<Route path>`, e ela renderiza dentro do layout."*

---

## 2) Criar um componente simples e reutilizar

**Cria** `src/components/Badge.jsx`:
```jsx
export default function Badge({ texto }) {
  return <span className="badge">{texto}</span>
}
```
**Usa em qualquer página, 2x com props diferentes:**
```jsx
import Badge from '../components/Badge'
// ...
<Badge texto="Novo" />
<Badge texto="Popular" />
```
**Provar:** os dois badges aparecem na tela.
**Defesa:** *"Um componente, recebe `texto` por prop, reutilizado com valores diferentes. (O `Card` no meu projeto já faz isso na Pokédex e na Home.)"*

---

## 3) Adicionar um novo item/componente no menu do Layout

**Em `src/components/Navbar.jsx`** — adiciona um link no `<nav className="navbar-links">`:
```jsx
<NavLink to="/teste">Teste</NavLink>
```
> Ou inserir um componente direto no layout: em `src/layouts/MainLayout.jsx`, colocar `<Badge texto="Beta" />` antes do `<Outlet />`.
**Provar:** o item novo aparece no menu em todas as páginas.
**Defesa:** *"O menu fica na Navbar, que é renderizada pelo MainLayout, então o item aparece em todas as rotas."*

---

## 4) Criar um input e validá-lo com o service

> Você já tem `src/services/validacao.js` com `validarNome`. Use-o.

**Numa página/componente:**
```jsx
import { useState } from 'react'
import { validarNome } from '../services/validacao'

export default function TesteInput() {
  const [valor, setValor] = useState('')
  const [erro, setErro] = useState('')

  function handleChange(e) {
    setValor(e.target.value)
    setErro(validarNome(e.target.value))
  }

  return (
    <div>
      <input value={valor} onChange={handleChange} />
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  )
}
```
**Provar:** digitar `A1` ou números → aparece o erro; digitar `Pikachu` → erro some.
**Defesa:** *"A validação não está no componente — está num **service** (`validacao.js`) com regex. O componente só chama `validarNome` e exibe o erro."*

---

## 5) Botão "Alternar Tema" + console.log

```jsx
import { useState } from 'react'

export default function AlternarTema() {
  const [escuro, setEscuro] = useState(false)

  function alternar() {
    const novo = !escuro
    setEscuro(novo)
    console.log('O tema atual é:', novo ? 'Escuro' : 'Claro')
  }

  return <button onClick={alternar}>Alternar Tema</button>
}
```
**Provar:** clicar e mostrar o **console do navegador (F12 → Console)**.
**Defesa:** *"Inverto um booleano com `setEscuro(!escuro)`. Calculo `novo` antes de logar porque `setState` é assíncrono — usar `escuro` direto mostraria o valor anterior."*
> ⚠️ É a pegadinha nº 1. Não logue `escuro` direto.

---

## 6) Componente `Saudacao` com prop `nome` (aviso se faltar)

**Cria** `src/components/Saudacao.jsx` (**.jsx**, não .js!):
```jsx
export default function Saudacao({ nome }) {
  if (!nome) {
    console.warn('A prop "nome" não foi enviada!')
    return null
  }
  return <p>Olá, {nome}!</p>
}
```
**Usa:**
```jsx
<Saudacao nome="Mateus" />   {/* mostra "Olá, Mateus!" */}
<Saudacao />                 {/* não envia prop → aviso no console */}
```
**Provar:** o segundo dispara o `console.warn` (F12 → Console).
**Defesa:** *"Recebo `nome` por prop. Se vier vazia, aviso no console com `console.warn` e não renderizo."*

---

## 7) Estado `estaLogado` + renderização condicional (operador)

```jsx
import { useState } from 'react'

export default function Bemvindo() {
  const [estaLogado, setEstaLogado] = useState(true) // troque p/ false e teste

  return (
    <div>
      {estaLogado ? (
        <p>Bem-vindo(a), Usuário(a)!</p>
      ) : (
        <p>Por favor, faça login</p>
      )}
    </div>
  )
}
```
**Provar:** trocar `true`/`false` na linha do `useState` e ver a mensagem mudar.
**Defesa:** *"Uso o operador ternário: se `estaLogado` é true mostro uma mensagem, senão a outra."*

---

## 8) `useEffect` com `[]` + console.log uma vez só

**No componente principal (ex: `src/App.jsx` ou uma página):**
```jsx
import { useEffect } from 'react'

useEffect(() => {
  console.log('O componente foi montado na tela!')
}, [])
```
**Provar:** recarregar e ver a mensagem **uma vez** no console.
> ⚠️ **PEGADINHA CRÍTICA:** no `src/main.jsx` tem `<StrictMode>`, que no **modo dev** roda o `useEffect` **2x** de propósito. Pra provar "uma vez só", **remova o `<StrictMode>`** temporariamente em `main.jsx` (deixe só `<BrowserRouter>...`), OU explique: *"o StrictMode duplica o efeito só em desenvolvimento, pra detectar bugs; em produção roda uma vez."*
**Defesa:** *"O array vazio `[]` faz o efeito rodar só na montagem. A duplicação que aparece é o StrictMode do React em dev, não um bug meu."*

---

## 9) Botão com texto dinâmico (Mostrar/Esconder)

```jsx
import { useState } from 'react'

export default function Toggle() {
  const [visivel, setVisivel] = useState(false)

  return (
    <div>
      <button onClick={() => setVisivel(!visivel)}>
        {visivel ? 'Esconder Conteúdo' : 'Mostrar Conteúdo'}
      </button>
      {visivel && <p>Conteúdo visível!</p>}
    </div>
  )
}
```
**Provar:** clicar — o texto do botão alterna e o conteúdo aparece/some.
**Defesa:** *"O texto do botão é definido pelo estado `visivel` via ternário; o mesmo estado controla o conteúdo com `visivel && ...`."*

---

## 10) `mostrarAjuda` + botão "Ajuda"

```jsx
import { useState } from 'react'

export default function Ajuda() {
  const [mostrarAjuda, setMostrarAjuda] = useState(false)

  return (
    <div>
      <button onClick={() => setMostrarAjuda(!mostrarAjuda)}>Ajuda</button>
      {mostrarAjuda && <p>Dica: preencha todos os campos corretamente!</p>}
    </div>
  )
}
```
**Provar:** clicar mostra/esconde o parágrafo.
**Defesa:** *"Inverto o booleano no clique; o parágrafo aparece com `mostrarAjuda && ...` quando é true."*

---

## Resumo dos padrões (quase tudo cai num destes)
- **Toggle booleano:** `const [x, setX] = useState(false)` + `onClick={() => setX(!x)}` → desafios 5, 9, 10
- **Render condicional:** `{x ? <A/> : <B/>}` ou `{x && <A/>}` → desafios 7, 9, 10
- **Props:** `function Comp({ nome }) {...}` + `<Comp nome="x" />` → desafios 2, 6
- **Service:** lógica num arquivo em `services/`, componente só chama → desafio 4
- **Rota:** componente + `<Route path>` no App.jsx → desafios 1, 3
- **useEffect `[]`:** roda uma vez na montagem → desafio 8

## Onde testar rápido
Cria uma página de rascunho `src/pages/Teste.jsx`, registra a rota `/teste` (desafio 1) e coloca os componentes lá pra testar sem bagunçar o resto.
