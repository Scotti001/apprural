const express = require('express');
const router = express.Router();
const Lote = require('../models/Lote'); // Importa o modelo Lote

// Rota para cadastrar um novo lote
router.post('/', async (req, res) => {
  const { nome, descricao } = req.body;

  // Validação simples
  if (!nome || !descricao) {
    return res.status(400).json({ error: 'Nome e descrição são obrigatórios.' });
  }

  try {
    // Criação de um novo lote
    const novoLote = new Lote({ nome, descricao });
    await novoLote.save();

    res.status(201).json({ message: 'Lote cadastrado com sucesso!', lote: novoLote });
  } catch (error) {
    console.error('Erro ao cadastrar lote:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Nome do lote já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao cadastrar lote.' });
  }
});

// Exporta as rotas de lotes
module.exports = router;
