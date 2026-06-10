const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

const SECRET = 'segredo_jwt'

app.post('/registro', (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' })
  }

  const existe = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email)
  if (existe) {
    return res.status(400).json({ erro: 'Usuário já existe' })
  }

  const hash = bcrypt.hashSync(senha, 8)
  db.prepare('INSERT INTO usuarios (email, senha) VALUES (?, ?)').run(email, hash)
  res.status(201).json({ mensagem: 'Usuário cadastrado' })
})

app.post('/login', (req, res) => {
  const { email, senha } = req.body
  const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email)

  if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
    return res.status(401).json({ erro: 'Usuário inválido' })
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' })
  res.json({ token })
})

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token ausente.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    req.usuario = jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).json({ erro: 'Token inválido.' })
  }
}

app.get('/perfil', authMiddleware, (req, res) => {
  res.json({ usuario: req.usuario })
})

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001')
})
