const express = require('express');
const { loginController } = require('../controllers');
const { registerController } = require('../controllers');
const { loginValidation, registerValidation } = require('../controllers/validations');
const router = express.Router();

router.post('/auth/login', loginValidation, loginController);
router.post('/auth/register', registerValidation, registerController);

module.exports = router;
