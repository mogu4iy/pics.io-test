const { validationHandler } = require('../../../../utils/handler');
const { nameValidation, passwordValidation } = require('./fields');

const registerValidation = [nameValidation, passwordValidation];

module.exports = validationHandler(registerValidation);
