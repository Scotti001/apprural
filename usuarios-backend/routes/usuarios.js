const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario'); // Importa o modelo de usuário
const router = express.Router();
const jwt = require('jsonwebtoken'); // Para criar tokens JWT
// Rota para cadastrar usuários
router.post('/cadastrar', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verificar se o email já está cadastrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Criar e salvar o novo usuário
    const novoUsuario = new Usuario({ nome, email, senha: senhaCriptografada });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);

    // Tratar erro de email duplicado
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

// Rota para listar usuários (opcional)
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});


// Rota para autenticação de usuários (login)
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Comparar a senha com o hash salvo no banco de dados
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Gerar um token JWT para autenticação
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, 'secreta', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});


module.exports = router;
