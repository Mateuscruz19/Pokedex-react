import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registrar } from '../services/auth'
import { validarEmail, validarSenha } from '../services/validacao'
import './Login.css'

export default function Registro() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({})
  const [erro, setErro] = useState('')

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    const novosErros = {}
    novosErros.email = validarEmail(email)
    novosErros.senha = validarSenha(senha)

    setErros(novosErros)
    if (novosErros.email || novosErros.senha) {
      return
    }

    try {
      await registrar(email, senha)
      navigate('/login')
    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <section className="login">
      <h1>Cadastro</h1>
      <p className="login-intro">Crie sua conta para acessar o sistema.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </label>
        {erros.email && <p className="login-erro">{erros.email}</p>}

        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        {erros.senha && <p className="login-erro">{erros.senha}</p>}

        {erro && <p className="login-erro">{erro}</p>}

        <button type="submit">Cadastrar</button>
      </form>

      <p className="login-link">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </section>
  )
}
