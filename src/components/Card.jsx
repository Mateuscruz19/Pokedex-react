import './Card.css'

const cores = {
  grass: '#7AC74C',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#D4A017',
  normal: '#A8A77A',
  poison: '#A33EA1',
  flying: '#A98FF3',
  ghost: '#735797',
  dragon: '#6F35FC',
  ice: '#56B5BC',
  fighting: '#C22E28',
  psychic: '#F95587',
}

export default function Card({ pokemon }) {
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
            style={{ backgroundColor: cores[t.type.name] }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </article>
  )
}
