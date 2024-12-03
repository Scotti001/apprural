const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mastiteRoutes = require('./routes/mastite'); // Importa as rotas de mastite

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose
  .connect('mongodb://localhost:27017/meuBanco', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rotas
app.use('/mastite', mastiteRoutes);

// Porta do servidor
const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
