import { tipos } from '../data/tipos'
import './Card.css'

// cor de um tipo (serve pra API e pros cadastrados, pois usam os mesmos nomes)
function corDoTipo(nome) {
  const t = tipos.find((x) => x.nome === nome)
  return t ? t.cor : '#777'
}

export default function Card({ pokemon }) {
  // se for um pokémon criado por nós, ele tem um formato mais simples
  if (pokemon.custom) {
    return (
      <article className="card">
        <span className="card-number">NEW</span>
        <img src={pokemon.imagem} alt={pokemon.name} className="card-img" />
        <h3 className="card-name">{pokemon.name}</h3>
        <div className="card-types">
          <span
            className="card-type"
            style={{ backgroundColor: corDoTipo(pokemon.tipo) }}
          >
            {pokemon.tipo}
          </span>
        </div>
      </article>
    )
  }

  // pokémon que veio da API (formato original)
  const numero = '#' + String(pokemon.id).padStart(3, '0')
  const img = pokemon.sprites.other['official-artwork'].front_default

  return (
    <article className="card">
      <span className="card-number">{numero}</span>
      <img src={img} alt={pokemon.name} className="card-img" />
      <h3 className="card-name">{pokemon.name}</h3>
      <div className="card-types">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="card-type"
            style={{ backgroundColor: corDoTipo(t.type.name) }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </article>
  )
}
