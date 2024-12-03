const express = require('express');
const VacaCadastro = require('../models/VacaCadastro');
const Propriedade = require('../models/Propriedade');
const router = express.Router();

// Cadastrar um animal na propriedade
router.post('/cadastrar', async (req, res) => {
  const { nome, brinco, mae, pai, propriedadeId, lote, foto } = req.body;

  try {
    // Verifica se a propriedade existe
    const propriedade = await Propriedade.findById(propriedadeId);
    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada.' });
    }

    // Cria o novo animal
    const novoAnimal = new VacaCadastro({
      nome,
      brinco,
      mae,
      pai,
      propriedadeId,
      lote,
      foto,
    });

    await novoAnimal.save();

    // Adiciona o animal à lista de animais da propriedade
    propriedade.animais.push(novoAnimal._id);
    await propriedade.save();

    res.status(201).json({
      message: 'Animal cadastrado com sucesso!',
      animal: novoAnimal,
    });
  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Listar animais de uma propriedade
router.get('/propriedade/:propriedadeId', async (req, res) => {
  const { propriedadeId } = req.params;

  try {
    const animais = await VacaCadastro.find({ propriedadeId });
    res.status(200).json(animais);
  } catch (error) {
    console.error('Erro ao listar animais:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;
