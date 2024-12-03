const express = require('express');
const cors = require('cors'); // Importa o cors
const connectDB = require('./config/database');
const usuariosRoutes = require('./routes/usuarios');
const propriedadesRoutes = require('./routes/propriedades');
const animaisRoutes = require('./routes/animais');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Configura o middleware CORS

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/propriedades', propriedadesRoutes);
app.use('/animais', animaisRoutes);

// Servidor
const PORT = 3004;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
