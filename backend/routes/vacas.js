const express = require('express');
const router = express.Router();
const Vaca = require('../models/Vaca'); // Certifique-se de importar o modelo

// Rota para listar todas as vacas
router.get('/', async (req, res) => {
  try {
    const vacas = await Vaca.find();  // Busca todas as vacas no banco de dados
    res.status(200).json(vacas);  // Retorna as vacas em formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vacas', error });
  }
});

// Rota para buscar uma vaca pelo ID
router.get('/:id', async (req, res) => {
  try {
    const vaca = await Vaca.findById(req.params.id);  // Busca a vaca pelo ID
    if (!vaca) {
      return res.status(404).json({ message: 'Vaca não encontrada' });
    }
    res.status(200).json(vaca);  // Retorna os dados da vaca
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vaca', error });
  }
});

// Rota para criar uma nova vaca
router.post('/', async (req, res) => {
  try {
    const novaVaca = new Vaca(req.body);  // Cria uma nova vaca com os dados do body
    await novaVaca.save();  // Salva a vaca no banco de dados
    res.status(201).json(novaVaca);  // Retorna a vaca criada
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar vaca', error });
  }
});

// Rota para atualizar os dados de uma vaca existente pelo ID
router.put('/:id', async (req, res) => {
  try {
    const vacaAtualizada = await Vaca.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vacaAtualizada) {
      return res.status(404).json({ message: 'Vaca não encontrada' });
    }
    res.status(200).json(vacaAtualizada);  // Retorna os dados atualizados da vaca
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar vaca', error });
  }
});

// Rota para deletar uma vaca pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const vacaDeletada = await Vaca.findByIdAndDelete(req.params.id);
    if (!vacaDeletada) {
      return res.status(404).json({ message: 'Vaca não encontrada' });
    }
    res.status(200).json({ message: 'Vaca deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar vaca', error });
  }
});
// routes/vacas.js



// Atualizar anotações da vaca

// Atualizar vaca por ID
router.put('/:id', async (req, res) => {
  try {
    const vacaId = req.params.id;
    const { litrosManha, litrosTarde } = req.body;

    const vaca = await Vaca.findById(vacaId);

    if (!vaca) {
      return res.status(404).json({ message: 'Vaca não encontrada' });
    }

    // Atualiza os dados da vaca
    vaca.litrosManha = litrosManha;
    vaca.litrosTarde = litrosTarde;

    await vaca.save();
    res.status(200).json({ message: 'Anotações salvas com sucesso', vaca });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar as anotações', error });
  }
});

const verificaRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
      return res.status(403).json({ error: 'Acesso negado.' });
  }
  next();
};

// Exemplo de rota limitada ao veterinário
router.get('/rebanho', verificaRole('veterinario'), (req, res) => {
  // Lógica de acesso ao rebanho
});







module.exports = router;
