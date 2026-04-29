import './Contato.css'

export default function Contato() {
  return (
    <section className="contato">
      <h1>Contato</h1>
      <p className="contato-intro">
        Sentiu falta de algum pokémon? Mande uma mensagem para a equipe.
      </p>

      <form className="contato-form">
        <label>
          Nome
          <input type="text" name="nome" required />
        </label>
        <label>
          E-mail
          <input type="email" name="email" required />
        </label>
        <label>
          Mensagem
          <textarea name="mensagem" rows="4" required />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}
