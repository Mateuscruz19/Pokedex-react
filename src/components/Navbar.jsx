import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo" />
        <span className="navbar-title">Pokédex</span>
      </div>
      <nav className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/pokedex">Pokédex</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
        <NavLink to="/contato">Contato</NavLink>
      </nav>
    </header>
  )
}
