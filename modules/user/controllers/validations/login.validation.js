const { validationHandler } = require('../../../../utils/handler');
const { passwordValidation, nameValidation } = require('./fields');

const loginValidation = [nameValidation, passwordValidation];

module.exports = validationHandler(loginValidation);
