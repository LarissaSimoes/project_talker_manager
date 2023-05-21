const talkValidation = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || typeof talk !== 'object') {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
      }
      next();
};

const watchedAtValidation = (req, res, next) => {
    const { watchedAt } = req.body.talk;
    if (!watchedAt || watchedAt.trim() === '') {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
      }
    const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!watchedAtRegex.test(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
      }
      next();
};

const isRateEmpty = (rate) => !rate && rate !== 0;

const isRateValid = (rate) => Number.isInteger(rate) && rate >= 1 && rate <= 5;

const rateValidation = (req, res, next) => {
    const { rate } = req.body.talk;
    if (isRateEmpty(rate)) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
      }
    if (!isRateValid(rate)) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
      }
      next(); 
};

module.exports = {
    talkValidation,
    watchedAtValidation,
    rateValidation,
};