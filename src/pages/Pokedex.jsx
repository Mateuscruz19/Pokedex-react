import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { getCustomPokemons } from '../services/customPokemons'
import { getAllPokemons } from '../services/pokeAPI'
import './Pokedex.css'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState(() => getCustomPokemons())
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    getAllPokemons().then((lista) => {
      setPokemons(lista)
      setCarregando(false)
    })
  }, [])

  return (
    <section className="pokedex">
      <h1>Pokédex</h1>
      <p className="pokedex-intro">
        Lista de pokémons cadastrados na primeira geração.
      </p>

      {carregando && <p className="pokedex-carregando">Carregando pokémons...</p>}

      <div className="pokedex-grid">
        {pokemons.map((p) => (
          <Card key={p.id} pokemon={p} />
        ))}
      </div>
    </section>
  )
}
