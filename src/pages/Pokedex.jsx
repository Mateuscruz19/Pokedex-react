import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { pokemonIds } from '../data/pokemons'
import { getCustomPokemons } from '../services/customPokemons'
import './Pokedex.css'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    // pega os pokémons que a gente cadastrou (do localStorage)
    const meus = getCustomPokemons()

    // busca os 151 da API e junta tudo (os nossos primeiro)
    Promise.all(
      pokemonIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json())
      )
    ).then((daApi) => setPokemons([...meus, ...daApi]))
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
