const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  propriedadeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Propriedade', required: true },
});

module.exports = mongoose.model('Animal', AnimalSchema);
