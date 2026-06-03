import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCustomPokemon } from '../services/customPokemons'
import { tipos } from '../data/tipos'
import './NovoPokemon.css'

export default function NovoPokemon() {
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')

  // preview
  const [preview, setPreview] = useState(null)
  // imagemBase64
  const [imagemBase64, setImagemBase64] = useState(null)

  const navigate = useNavigate()

  function handleImagem(e) {
    const arquivo = e.target.files[0]
    if (!arquivo) return

    // preview na pagina, só mostra
    setPreview(URL.createObjectURL(arquivo))

    // base64 pra poder salvar, codigo da professora
    const reader = new FileReader()
    reader.onload = () => setImagemBase64(reader.result)
    reader.readAsDataURL(arquivo)
  }

  function handleSubmit(e) {
    e.preventDefault() // impede a página de recarregar

    if (!imagemBase64) {
      alert('Escolha uma imagem para o pokémon!')
      return
    }

    // monta o objeto do pokémon novo
    const novoPokemon = {
      id: Date.now(),
      name: nome,
      imagem: imagemBase64,
      tipo: tipo,
      custom: true,
    }

    addCustomPokemon(novoPokemon) // salva no localStorage
    navigate('/pokedex')
  }

  return (
    <section className="novo-pokemon">
      <h1>Cadastrar Pokémon</h1>
      <p className="novo-intro">
        Crie seu próprio pokémon e veja ele aparecer na Pokédex.
      </p>

      <form className="novo-form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Baianivs"
            required
          />
        </label>

        <label>
          Tipo
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {tipos.map((t) => (
              <option key={t.nome} value={t.nome}>
                {t.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Foto
          <input type="file" accept="image/*" onChange={handleImagem} />
        </label>

        {/* o preview só aparece depois de escolher a imagem */}
        {preview && (
          <img src={preview} alt="preview" className="novo-preview" />
        )}

        <button type="submit">Cadastrar na Pokédex</button>
      </form>
    </section>
  )
}
