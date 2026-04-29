import Card from '../components/Card'
import { pokemons } from '../data/pokemons'
import './Pokedex.css'

export default function Pokedex() {
  return (
    <section className="pokedex">
      <h1>Pokédex</h1>
      <p className="pokedex-intro">
        Lista de pokémons cadastrados na primeira geração.
      </p>

      <div className="pokedex-grid">
        {pokemons.map((p) => (
          <Card key={p.id} pokemon={p} />
        ))}
      </div>
    </section>
  )
}
