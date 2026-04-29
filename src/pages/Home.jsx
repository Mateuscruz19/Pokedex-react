import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { pokemons } from '../data/pokemons'
import './Home.css'

export default function Home() {
  const destaques = pokemons.slice(0, 3)

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
