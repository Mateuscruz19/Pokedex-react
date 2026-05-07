import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { pokemonIds } from '../data/pokemons'
import './Pokedex.css'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    Promise.all(
      pokemonIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json())
      )
    ).then(setPokemons)
  }, [])

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
