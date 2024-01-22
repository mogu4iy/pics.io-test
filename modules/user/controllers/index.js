const loginController = require('./login.controller');
const registerController = require('./register.controller');
const loginValidation = require('./validations');

module.exports = {
    loginController,
    registerController,
    ...loginValidation,
};
