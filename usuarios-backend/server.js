const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios'); // Importa as rotas de usuários

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/usuarios_db')

  .then(() => console.log('Conectado ao MongoDB - Banco de Usuários'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rotas de usuários
app.use('/usuarios', usuariosRoutes);

// Rota de teste
app.get('/teste', (req, res) => {
  res.send('Rota de teste funcionando!');
});

// Inicia o servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
