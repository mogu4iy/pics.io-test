const router = require("./router")
const guards = require("./guards")

module.exports = {
    router,
    ...guards
}