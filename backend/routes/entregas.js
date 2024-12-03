const express = require('express');
const router = express.Router();
const Entrega = require('../models/Entrega');

// Obter todas as entregas
router.get('/', async (req, res) => {
  try {
    const entregas = await Entrega.find().sort({ data: 1 });
    res.status(200).json(entregas);
  } catch (error) {
    console.error('Erro ao buscar entregas:', error);
    res.status(500).json({ error: 'Erro ao buscar entregas.' });
  }
});

// Adicionar uma nova entrega
router.post('/', async (req, res) => {
  const { data, litros } = req.body;

  if (!data || !litros) {
    return res.status(400).json({ error: 'Data e litros são obrigatórios.' });
  }

  try {
    const novaEntrega = new Entrega({ data, litros });
    await novaEntrega.save();
    res.status(201).json(novaEntrega);
  } catch (error) {
    console.error('Erro ao salvar entrega:', error);
    res.status(500).json({ error: 'Erro ao salvar entrega.' });
  }
});

module.exports = router;
