const nameValidation = (req, res, next) => {
    const { name } = req.body;
    if (!name || name.trim() === '' || name === null) {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório'
          });
    } if (name.length < 3 || typeof name !== 'string') {
        return res.status(400).json({
            message: 'O "name" deve ter pelo menos 3 caracteres'
          });
    }
    next();
};

module.exports = {
    nameValidation,
}