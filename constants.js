const {config} = require("./providers");

const transports = {
    httpPost: "http.post",
    httpPut: "http.put",
    consoleLog: "console.log",
    consoleWarn: "console.warn"
}

const strategy = {
    any: "ANY",
    all: "ALL"
}

const destinations = Object.keys(config.get("routes"))

module.exports = {
    transports,
    strategy,
    destinations
}