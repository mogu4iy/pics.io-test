const express = require('express');
const { eventRouteController } = require('../controllers');
const { authGuard } = require('../../user');

const router = express.Router();

router.post('/route-event', authGuard, eventRouteController);

module.exports = router;
