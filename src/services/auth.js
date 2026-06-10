const API = 'http://localhost:3001'

export async function login(email, senha) {
  const resposta = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })

  const dados = await resposta.json()

  if (!resposta.ok) {
    throw new Error(dados.erro)
  }

  localStorage.setItem('token', dados.token)
  return dados.token
}

export async function registrar(email, senha) {
  const resposta = await fetch(`${API}/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })

  const dados = await resposta.json()

  if (!resposta.ok) {
    throw new Error(dados.erro)
  }

  return dados
}

export function logout() {
  localStorage.removeItem('token')
}

export function estaLogado() {
  const token = localStorage.getItem('token')
  return token !== null && token !== 'undefined'
}

export function getToken() {
  return localStorage.getItem('token')
}
