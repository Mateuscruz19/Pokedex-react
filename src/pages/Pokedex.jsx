import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { getAllPokemons } from '../services/pokeAPI'
import './Pokedex.css'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    // o service busca da API e já junta com os custom do localStorage
    getAllPokemons().then((lista) => setPokemons(lista))
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
