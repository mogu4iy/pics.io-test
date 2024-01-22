const {authService} = require("../services");
const {httpHandler} = require("../../../utils/handler");

async function registerController(req) {
    return await authService.register({name: req.body.name, password: req.body.password})
}

module.exports = httpHandler(registerController)