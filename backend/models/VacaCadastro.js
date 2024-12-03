const mongoose = require('mongoose');

const VacaCadastroSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  brinco: { type: String, required: true },
  mae: { type: String },
  pai: { type: String },
  propriedadeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Propriedade', required: true }, // Relaciona com a propriedade
  lote: { type: String },
  dataEntrada: { type: Date, default: Date.now },
  foto: { type: String },
});

module.exports = mongoose.model('VacaCadastro', VacaCadastroSchema, 'vacacadastros');
