const ageValidation = (req, res, next) => {
    const { age } = req.body;
    if (!age || age === '' || age === null) {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
          });
    } if (typeof age !== 'number' || age < 18 || !Number.isInteger(age)) {
        return res.status(400).json({
            message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
          });
    }
    next();
};

module.exports = {
    ageValidation,
};