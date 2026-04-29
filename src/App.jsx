import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Pokedex from './pages/Pokedex'
import Contato from './pages/Contato'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="pokedex" element={<Pokedex />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="contato" element={<Contato />} />
      </Route>
    </Routes>
  )
}
