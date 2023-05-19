const express = require('express');
const { getAllTalkers,
  getTalkerById,
  generateRandomToken } = require('./talkerManager');
  const { validateEmail, validadePassword } = require('./middlewares/loginValidation');

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

app.post('/login', validateEmail, validadePassword, (req, res) => {
  const token = generateRandomToken(16);
  return res.status(200).json({ token });
});
