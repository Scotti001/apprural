const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const lotesRoutes = require('./routes/lotes'); // Importa as rotas de lotes

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/meuBanco', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rotas de lotes
app.use('/lotes', lotesRoutes); // Rotas com o prefixo /lotes

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
