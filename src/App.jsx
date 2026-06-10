import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Pokedex from './pages/Pokedex'
import Contato from './pages/Contato'
import NovoPokemon from './pages/NovoPokemon'
import Login from './pages/Login'
import Registro from './pages/Registro'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="pokedex" element={<Pokedex />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="contato" element={<Contato />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route
          path="novo"
          element={
            <PrivateRoute>
              <NovoPokemon />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  )
}
