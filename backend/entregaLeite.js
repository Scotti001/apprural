const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const entregasRoutes = require('./routes/entregas');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/meuBanco', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

app.use('/entregas', entregasRoutes);

const PORT = 3006;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
