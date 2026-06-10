import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validarEmail, validarSenha } from '../services/validacao'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({})
  const [erro, setErro] = useState('')

  const emailRef = useRef(null)
  const { entrar } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    emailRef.current.focus()
  }, [])

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
      await entrar(email, senha)
      navigate('/novo')
    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <section className="login">
      <h1>Login</h1>
      <p className="login-intro">Entre para cadastrar novos pokémons.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            ref={emailRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@email.com"
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

        <button type="submit">Entrar</button>
      </form>

      <p className="login-link">
        Não tem conta? <Link to="/registro">Cadastre-se</Link>
      </p>
    </section>
  )
}
