const express = require('express');
const { eventRouteController } = require('../controllers');
const { authGuard } = require('../../user');
const {eventRouteValidation} = require("../controllers/validations");

const router = express.Router();

router.post('/route-event', authGuard, eventRouteValidation, eventRouteController);

module.exports = router;
