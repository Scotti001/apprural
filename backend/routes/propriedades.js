const express = require('express');
const Propriedade = require('../models/Propriedade');
const router = express.Router();

// Criar uma nova propriedade
router.post('/cadastrar', async (req, res) => {
  const { nome, proprietarioId } = req.body;

  try {
    const novaPropriedade = new Propriedade({ nome, proprietarioId });
    await novaPropriedade.save();

    res.status(201).json({ message: 'Propriedade cadastrada com sucesso!', propriedade: novaPropriedade });
  } catch (error) {
    console.error('Erro ao cadastrar propriedade:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Listar propriedades de um proprietário
router.get('/proprietario/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const propriedades = await Propriedade.find({ proprietarioId: id });

    if (!propriedades || propriedades.length === 0) {
      return res.status(404).json({ error: 'Nenhuma propriedade encontrada.' });
    }

    res.status(200).json(propriedades);
  } catch (error) {
    console.error('Erro ao listar propriedades:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});
router.get('/:propriedadeId/animais', async (req, res) => {
  const { propriedadeId } = req.params;

  try {
    const propriedade = await Propriedade.findById(propriedadeId).populate('animais');
    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada.' });
    }

    res.status(200).json({ animais: propriedade.animais });
  } catch (error) {
    console.error('Erro ao buscar animais:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});
router.get('/usuario/:usuarioId/propriedades', async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const propriedades = await Propriedade.find({ proprietarioId: usuarioId });
    if (!propriedades || propriedades.length === 0) {
      return res.status(404).json({ error: 'Nenhuma propriedade encontrada.' });
    }

    res.status(200).json({ propriedades });
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});




module.exports = router;
