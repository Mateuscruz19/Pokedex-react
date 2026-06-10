import { pokemonIds } from '../data/pokemons'
import { getCustomPokemons } from './customPokemons'

// PRIVADO: só busca da API REST (não exporta)
function fetchAPIPokemon() {
  return Promise.all(
    pokemonIds.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json())
    )
  )
}

// PÚBLICO: junta os custom (localStorage) com os da API
export function getAllPokemons() {
  const meus = getCustomPokemons()
  return fetchAPIPokemon()
    .then((daApi) => [...meus, ...daApi])
    .catch(() => meus)
}
