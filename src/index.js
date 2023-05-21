const express = require('express');
const fs = require('fs').promises;
const { getAllTalkers,
  getTalkerById,
  generateRandomToken } = require('./talkerManager');
  const { validateEmail, validadePassword } = require('./middlewares/loginValidation');
  const { tokenValidation } = require('./middlewares/tokenValidation');
const { nameValidation } = require('./middlewares/nameValidation');
const { ageValidation } = require('./middlewares/ageValidation');
const { talkValidation,
   watchedAtValidation,
   rateValidation } = require('./middlewares/talkValidation');

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

const FILENAME = 'src/talker.json';

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

app.post('/talker',
 nameValidation,
 tokenValidation,
 ageValidation,
 talkValidation,
 watchedAtValidation,
 rateValidation,
 async (req, res) => {
  const talkers = await getAllTalkers();
  const { name, age, talk } = req.body;
  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);
  await fs.writeFile(FILENAME, JSON.stringify(talkers));
  return res.status(201).json(newTalker);
 });

 app.put('/talker/:id',
 nameValidation,
 tokenValidation,
 ageValidation,
 talkValidation,
 watchedAtValidation,
 rateValidation,
 async (req, res) => {
  const { id } = req.params;
  const talkers = await getAllTalkers();
  const findTalker = talkers.find((talker) => talker.id === +id);
  if (!findTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const { name, age, talk } = req.body;
  const updatedTalker = {
    id: +id,
    name,
    age,
    talk,
  };
  const index = talkers.indexOf(findTalker);
  talkers[index] = updatedTalker;
  await fs.writeFile(FILENAME, JSON.stringify(talkers));
  return res.status(200).json(updatedTalker);
 });

 app.delete('/talker/:id',
  tokenValidation,
  async (req, res) => {
    const { id } = req.params;
    const talkers = await getAllTalkers();
    const index = talkers.findIndex((talker) => talker.id === +id);
    if (!index) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    talkers.splice(index, 1);
    await fs.writeFile(FILENAME, JSON.stringify(talkers));
      return res.status(204).end();
    });