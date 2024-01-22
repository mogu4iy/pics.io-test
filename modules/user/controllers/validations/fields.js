const { body } = require('express-validator');

const nameValidation = body('name').isString().exists();
const passwordValidation = body('password').isString().isLength({ min: 6 }).exists();

module.exports = {
    nameValidation,
    passwordValidation,
};
