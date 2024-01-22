const { HttpTransport } = require('../utils/event-router/transports');
const constants = require('../constants');
const axios = require('axios');
const { logger } = require('../providers');

class HttpPostTransport extends HttpTransport {
    async route(payload, meta) {
        axios
            .post(meta.url, payload)
            .then(data => {
                logger.info(`HttpPostTransport: ${data.statusText}`);
            })
            .catch(err => {
                logger.error(`HttpPostTransport: ${err.message}`);
            });
    }

    constructor() {
        super({ key: constants.transports.httpPut });
    }
}

module.exports = new HttpPostTransport();
