const mongoose = require('mongoose');

const EntregaSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  litros: { type: Number, required: true },
});

module.exports = mongoose.model('Entrega', EntregaSchema);
