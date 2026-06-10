import { createContext, useContext, useState } from 'react'
import { login as loginApi, logout as logoutApi, estaLogado } from '../services/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [logado, setLogado] = useState(estaLogado())

  async function entrar(email, senha) {
    await loginApi(email, senha)
    setLogado(true)
  }

  function sair() {
    logoutApi()
    setLogado(false)
  }

  return (
    <AuthContext.Provider value={{ logado, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
