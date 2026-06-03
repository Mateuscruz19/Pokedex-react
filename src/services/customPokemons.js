const CHAVE = 'meus_pokemons'

// lê a lista salva
export function getCustomPokemons() {
  const dados = localStorage.getItem(CHAVE)
  return dados ? JSON.parse(dados) : []
}

// adiciona um pokémon novo na lista e salva dnv
export function addCustomPokemon(pokemon) {
  const lista = getCustomPokemons()
  lista.push(pokemon)
  localStorage.setItem(CHAVE, JSON.stringify(lista))
}
