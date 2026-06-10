const REGEX_NOME = /^[A-Za-zÀ-ÿ]{3,20}$/
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REGEX_SENHA = /^.{6,}$/
const REGEX_MENSAGEM = /^[\s\S]{10,}$/

export function validarNome(nome) {
  if (!REGEX_NOME.test(nome.trim())) {
    return 'O nome deve ter de 3 a 20 letras, sem números, espaços ou símbolos.'
  }
  return ''
}

export function validarEmail(email) {
  if (!REGEX_EMAIL.test(email.trim())) {
    return 'Digite um email válido (ex: nome@email.com).'
  }
  return ''
}

export function validarSenha(senha) {
  if (!REGEX_SENHA.test(senha)) {
    return 'A senha deve ter ao menos 6 caracteres.'
  }
  return ''
}

export function validarMensagem(mensagem) {
  if (!REGEX_MENSAGEM.test(mensagem.trim())) {
    return 'A mensagem deve ter ao menos 10 caracteres.'
  }
  return ''
}

export function validarTipo(tipo) {
  if (!tipo) {
    return 'Selecione um tipo.'
  }
  return ''
}
