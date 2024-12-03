const express = require('express');
const cors = require('cors'); // Importa o middleware CORS
const app = express();

app.use(cors()); // Permite qualquer origem
app.use(express.json()); // Permite trabalhar com JSON

app.post('/alimento', (req, res) => {
  const { litrosLeite, pesoVaca } = req.body;

  if (!litrosLeite || !pesoVaca) {
    return res.status(400).json({ error: 'Informe litros de leite e peso da vaca.' });
  }

  const alimentoPorLitro = 0.5; // kg de alimento por litro de leite
  const alimentoPorPeso = pesoVaca * 0.02; // 2% do peso da vaca em kg
  const totalAlimento = litrosLeite * alimentoPorLitro + alimentoPorPeso;

  res.json({
    litrosLeite,
    pesoVaca,
    alimentoRecomendado: totalAlimento.toFixed(2),
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
