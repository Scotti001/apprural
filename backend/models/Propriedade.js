const mongoose = require('mongoose');

const PropriedadeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  proprietarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  animais: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VacaCadastro' }]

});

module.exports = mongoose.model('Propriedade', PropriedadeSchema);
