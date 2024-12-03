const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sua_chave_secreta_aqui'; // Altere para uma chave secreta forte

// Middleware para verificar se o usuário está autenticado
function authenticate(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica o token e decodifica os dados do usuário
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Adiciona os dados do usuário na requisição
    next(); // Prossegue para a próxima função
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
}

// Middleware para verificar as permissões do usuário
function authorize(roles) {
  return (req, res, next) => {
    const user = req.user; // Usuário autenticado

    if (!roles.includes(user.perfil)) {
      return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
    }

    next(); // Permite o acesso
  };
}

module.exports = {
  authenticate,
  authorize,
};
