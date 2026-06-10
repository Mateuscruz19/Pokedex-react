import { useState } from 'react'
import { validarNome, validarEmail, validarMensagem } from '../services/validacao'
import './Contato.css'

export default function Contato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erros, setErros] = useState({})
  const [enviada, setEnviada] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    const novosErros = {}
    novosErros.nome = validarNome(nome)
    novosErros.email = validarEmail(email)
    novosErros.mensagem = validarMensagem(mensagem)

    setErros(novosErros)
    if (novosErros.nome || novosErros.email || novosErros.mensagem) {
      return
    }

    setEnviada(true)
    setNome('')
    setEmail('')
    setMensagem('')
  }

  return (
    <section className="contato">
      <h1>Contato</h1>
      <p className="contato-intro">
        Sentiu falta de algum pokémon? Mande uma mensagem para a equipe.
      </p>

      <form className="contato-form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        {erros.nome && <p className="contato-erro">{erros.nome}</p>}
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {erros.email && <p className="contato-erro">{erros.email}</p>}
        <label>
          Mensagem
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows="4"
          />
        </label>
        {erros.mensagem && <p className="contato-erro">{erros.mensagem}</p>}
        <button type="submit">Enviar</button>
      </form>

      {enviada && (
        <p className="contato-sucesso">Mensagem enviada! Obrigado pelo contato.</p>
      )}
    </section>
  )
}
