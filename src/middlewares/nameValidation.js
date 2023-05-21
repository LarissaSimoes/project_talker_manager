const isNameEmpty = (name) => !name || name === '' || name === null;

const isNameValid = (name) => name.length >= 3 && typeof name === 'string';

const nameValidation = (req, res, next) => {
    const { name } = req.body;
    if (isNameEmpty(name)) {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório',
          });
    } 
    if (!isNameValid(name)) {
        return res.status(400).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
          });
    }
    next();
};

module.exports = {
    nameValidation,
};