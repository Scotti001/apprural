const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importando rotas
const usuariosRoutes = require('./routes/usuarios');
const vacasRoutes = require('./routes/vacascadastro');
const mastiteRoutes = require('./routes/mastite');
const propriedadesRoutes = require('./routes/propriedades');
const cadastrovacasRoutes = require('./routes/vacascadastro');

const app = express();

// Middleware geral
app.use(cors());
app.use(express.json()); // Utilizando express.json() para parsing do body (substitui o body-parser)

// Conexão com o banco de dados
mongoose
  .connect('mongodb://localhost:27017/sistemaAgro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/vacascadastro', vacasRoutes);
app.use('/mastite', mastiteRoutes);
app.use('/propriedades', propriedadesRoutes);
app.use('/vacascadastro', cadastrovacasRoutes);

// Porta do servidor
const PORT = 3004;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
