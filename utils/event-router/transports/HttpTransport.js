const Transport = require('./Transport');

class HttpTransport extends Transport {
    constructor(
        { key, configValidationProperties = {}, configValidationRequired = [] } = {
            configValidationProperties: {},
            configValidationRequired: [],
        },
    ) {
        super({
            key,
            configValidationProperties: {
                url: { type: 'string' },
                ...configValidationProperties,
            },
            configValidationRequired: ['url', ...configValidationRequired],
        });
        if (this.constructor === HttpTransport) {
            throw new Error("Class is of abstract type and can't be instantiated");
        }
    }
}

module.exports = HttpTransport;
