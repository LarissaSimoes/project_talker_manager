const express = require('express');
const { getAllTalkers,
  getTalkerById,
  generateRandomToken,
  isEmailValid } = require('./talkerManager');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkers = await getAllTalkers();

  if (talkers.length !== 0) {
    return res.status(200).json(
      talkers,
    );
  } 
    return res.status(200).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getTalkerById(id);
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || email.trim() === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório'
    });
  }
  if (!isEmailValid(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"'
    });
  }
  if (!password || password.trim() === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório'
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres'
    });
  }
  const token = generateRandomToken(16);
  return res.status(200).json({
    token,
  });
});
