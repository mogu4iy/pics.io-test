const { config } = require('./providers');

const transports = {
    httpPost: 'http.post',
    httpPut: 'http.put',
    consoleLog: 'console.log',
    consoleWarn: 'console.warn',
};

const strategy = {
    any: 'ANY',
    all: 'ALL',
};

const destinations = Object.values(config.get('routes')).map(v => v["name"])
const destinationTransports = Object.fromEntries(Object.values(config.get('routes')).map(v => [v["name"], v]))

module.exports = {
    transports,
    strategy,
    destinations,
    destinationTransports
};
