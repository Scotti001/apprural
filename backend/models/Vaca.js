const mongoose = require('mongoose');

const VacaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  brinco: { type: String, required: true },
  raca: { type: String },
  dataNascimento: { type: Date },
  propriedadeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Propriedade', required: true },
  vacinas: [
    {
      nome: { type: String, required: true },
      data: { type: Date, required: true },
      carencia: { type: String },
    },
  ],
  propriedadeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Propriedade', required: true }, // Histórico de vacinas
  mastite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mastite' }], // Relaciona ocorrências de mastite
  inseminada: { type: Boolean, default: false },
  dataInseminacao: { type: Date },
  dataPrevistaParto: { type: Date },
});

module.exports = mongoose.model('Vaca', VacaSchema);
