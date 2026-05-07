import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { pokemonIds } from '../data/pokemons'
import './Home.css'

export default function Home() {
  const [destaques, setDestaques] = useState([])

  useEffect(() => {
    Promise.all(
      pokemonIds.slice(0, 3).map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json())
      )
    ).then(setDestaques)
  }, [])

  return (
    <section className="home">
      <div className="hero">
        <h1>Bem-vindo à Pokédex</h1>
        <p>Explore informações sobre Pokémons da primeira geração.</p>
        <Link to="/pokedex" className="hero-btn">Ver Pokédex</Link>
      </div>

      <h2 className="home-section-title">Em destaque</h2>
      <div className="home-grid">
        {destaques.map((p) => (
          <Card key={p.id} pokemon={p} />
        ))}
      </div>
    </section>
  )
}
