const Database = require('better-sqlite3')
const bcrypt = require('bcryptjs')

const db = new Database('pokedex.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  )
`)

const admin = db.prepare('SELECT id FROM usuarios WHERE email = ?').get('admin@email.com')
if (!admin) {
  db.prepare('INSERT INTO usuarios (email, senha) VALUES (?, ?)').run(
    'admin@email.com',
    bcrypt.hashSync('123456', 8)
  )
}

module.exports = db
