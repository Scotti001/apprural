const mongoose = require('mongoose');

const MastiteSchema = new mongoose.Schema({
  vacaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaca', required: true },
  tipo: { type: String, enum: ['clinica', 'subclinica'], required: true },
  dataInicio: { type: Date, required: true },
  medicamentos: { type: [String], default: [] },
  homeopatico: { type: Boolean, default: false },
  antibiotico: { type: Boolean, default: false },
  intramamario: { type: Boolean, default: false },
  carencia: { type: String, default: '' },
  dosagem: { type: String, default: '' },
  liberada: { type: Boolean, default: false },
});

module.exports = mongoose.model('Mastite', MastiteSchema);
