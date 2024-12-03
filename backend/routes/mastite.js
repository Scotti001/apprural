const express = require('express');
const Mastite = require('../models/Mastite');
const Vaca = require('../models/Vaca'); // Importa o modelo Vaca
const router = express.Router();

// Criar uma nova ocorrência de mastite
router.post('/', async (req, res) => {
  const {
    vacaId,
    tipo,
    dataInicio,
    medicamentos,
    homeopatico,
    antibiotico,
    intramamario,
    carencia,
    dosagem,
    liberada,
  } = req.body;

  if (!vacaId || !tipo || !dataInicio) {
    return res.status(400).json({ error: 'Campos obrigatórios estão faltando.' });
  }

  try {
    const novaOcorrencia = new Mastite({
      vacaId,
      tipo,
      dataInicio,
      medicamentos: medicamentos || [],
      homeopatico: homeopatico || false,
      antibiotico: antibiotico || false,
      intramamario: intramamario || false,
      carencia: carencia || '',
      dosagem: dosagem || '',
      liberada: liberada || false,
    });

    await novaOcorrencia.save();
    res.status(201).json({ message: 'Ocorrência registrada com sucesso!', mastite: novaOcorrencia });
  } catch (error) {
    console.error('Erro ao registrar ocorrência de mastite:', error);
    res.status(500).json({ error: 'Erro ao registrar ocorrência de mastite.' });
  }
});

// Obter todas as ocorrências de mastite
router.get('/', async (req, res) => {
  try {
    const ocorrencias = await Mastite.find().populate('vacaId', 'nome brinco');
    res.status(200).json(ocorrencias);
  } catch (error) {
    console.error('Erro ao buscar ocorrências de mastite:', error);
    res.status(500).json({ error: 'Erro ao buscar ocorrências de mastite.' });
  }
});

// Atualizar o status de liberação da vaca
router.put('/:id/liberar', async (req, res) => {
  const { id } = req.params;

  try {
    const ocorrenciaAtualizada = await Mastite.findByIdAndUpdate(
      id,
      { liberada: true },
      { new: true }
    );

    if (!ocorrenciaAtualizada) {
      return res.status(404).json({ error: 'Ocorrência não encontrada.' });
    }

    res.status(200).json({ message: 'Vaca liberada com sucesso!', ocorrencia: ocorrenciaAtualizada });
  } catch (error) {
    console.error('Erro ao atualizar status de liberação:', error);
    res.status(500).json({ error: 'Erro ao atualizar status de liberação.' });
  }
});

module.exports = router;
