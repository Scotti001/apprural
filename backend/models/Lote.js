const mongoose = require('mongoose');

// Esquema do lote
const LoteSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true }, // Nome do lote deve ser único
  descricao: { type: String, required: true },         // Descrição do lote
});

// Exporta o modelo
module.exports = mongoose.model('Lote', LoteSchema);
