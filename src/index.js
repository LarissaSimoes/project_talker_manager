const express = require('express');
const { getAllTalkers } = require('./talkerManager');

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