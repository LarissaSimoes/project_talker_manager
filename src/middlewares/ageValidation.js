const isAgeEmpty = (age) => !age || age === '' || age === null;

const isAgeValid = (age) => typeof age === 'number' && age >= 18 && Number.isInteger(age);

const ageValidation = (req, res, next) => {
    const { age } = req.body;
  if (isAgeEmpty(age)) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (!isAgeValid(age)) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
    next();
};

module.exports = {
    ageValidation,
};