const express = require('express')
const {eventRouteController} = require("../controllers");
const {authGuard} = require("../../user");

const router = express.Router()

router.post('/event-router', authGuard, eventRouteController)

module.exports = router