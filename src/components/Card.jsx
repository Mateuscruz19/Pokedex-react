import './Card.css'

const cores = {
  Grass: '#7AC74C',
  Fire: '#EE8130',
  Water: '#6390F0',
  Electric: '#D4A017',
  Normal: '#A8A77A',
  Poison: '#A33EA1',
  Flying: '#A98FF3',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Ice: '#56B5BC',
  Fighting: '#C22E28',
  Psychic: '#F95587',
}

export default function Card({ pokemon }) {
  return (
    <article className="card">
      <span className="card-number">{pokemon.numero}</span>
      <img src={pokemon.img} alt={pokemon.nome} className="card-img" />
      <h3 className="card-name">{pokemon.nome}</h3>
      <div className="card-types">
        {pokemon.tipo.map((t) => (
          <span
            key={t}
            className="card-type"
            style={{ backgroundColor: cores[t] }}
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}
