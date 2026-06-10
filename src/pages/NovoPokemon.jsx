import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCustomPokemon } from '../services/customPokemons'
import { validarNome, validarTipo } from '../services/validacao'
import { tipos } from '../data/tipos'
import './NovoPokemon.css'

export default function NovoPokemon() {
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')
  const [erros, setErros] = useState({})

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

    const novosErros = {}
    novosErros.nome = validarNome(nome)
    novosErros.tipo = validarTipo(tipo)
    novosErros.imagem = imagemBase64 ? '' : 'Escolha uma imagem para o pokémon.'

    setErros(novosErros)
    if (novosErros.nome || novosErros.tipo || novosErros.imagem) {
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
          />
        </label>
        {erros.nome && <p className="novo-erro">{erros.nome}</p>}

        <label>
          Tipo
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecione...</option>
            {tipos.map((t) => (
              <option key={t.nome} value={t.nome}>
                {t.nome}
              </option>
            ))}
          </select>
        </label>
        {erros.tipo && <p className="novo-erro">{erros.tipo}</p>}

        <label>
          Foto
          <input type="file" accept="image/*" onChange={handleImagem} />
        </label>
        {erros.imagem && <p className="novo-erro">{erros.imagem}</p>}

        {/* o preview só aparece depois de escolher a imagem */}
        {preview && (
          <img src={preview} alt="preview" className="novo-preview" />
        )}

        <button type="submit">Cadastrar na Pokédex</button>
      </form>
    </section>
  )
}
