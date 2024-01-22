const express = require('express')
const {eventRouteController} = require("../controllers");
const router = express.Router()

router.post('/event-router', eventRouteController)

module.exports = router