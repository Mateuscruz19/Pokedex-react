import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { logado, sair } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    sair()
    navigate('/login')
  }

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
        <NavLink to="/novo">Novo Pokémon</NavLink>
        {logado ? (
          <button className="navbar-auth" onClick={handleLogout}>Sair</button>
        ) : (
          <NavLink to="/login">Entrar</NavLink>
        )}
      </nav>
    </header>
  )
}
