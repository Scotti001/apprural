const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: { type: String, enum: ['proprietario', 'veterinario'], default: 'proprietario' }, // Campo role
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuario', UsuarioSchema);
