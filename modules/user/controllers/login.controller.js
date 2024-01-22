const {authService} = require("../services");
const {httpHandler} = require("../../../utils/handler");

async function loginController(req) {
    return await authService.login({name: req.body.name, password: req.body.password})
}

module.exports = httpHandler(loginController)