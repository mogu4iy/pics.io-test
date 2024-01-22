const express = require('express')
const {loginController} = require("../controllers");
const {registerController} = require("../controllers");
const router = express.Router()

router.post('/auth/login', loginController)
router.post('/auth/register', registerController)

module.exports = router