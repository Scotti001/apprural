const mongoose = require('mongoose');

// Esquema do Usuário
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
}, { timestamps: true }); // Cria os campos createdAt e updatedAt automaticamente

module.exports = mongoose.model('Usuario', UsuarioSchema);
