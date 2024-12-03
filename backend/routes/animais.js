const express = require('express');
const Animal = require('../models/Animal');
const router = express.Router();

// Cadastrar animal
router.post('/cadastrar', async (req, res) => {
  const { nome, propriedadeId } = req.body;

  try {
    const novoAnimal = new Animal({ nome, propriedadeId });
    await novoAnimal.save();

    res.status(201).json({ message: 'Animal cadastrado com sucesso!', animal: novoAnimal });
  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Listar animais de uma propriedade
router.get('/propriedade/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const animais = await Animal.find({ propriedadeId: id });

    if (!animais || animais.length === 0) {
      return res.status(404).json({ error: 'Nenhum animal encontrado para esta propriedade.' });
    }

    res.status(200).json(animais);
  } catch (error) {
    console.error('Erro ao listar animais:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;
