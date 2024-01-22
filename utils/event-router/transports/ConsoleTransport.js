const Transport = require('./Transport');

class ConsoleTransport extends Transport {
    constructor(
        { key, configValidationProperties = {}, configValidationRequired = [] } = {
            configValidationProperties: {},
            configValidationRequired: [],
        },
    ) {
        super({ key, configValidationProperties, configValidationRequired });
        if (this.constructor === ConsoleTransport) {
            throw new Error("Class is of abstract type and can't be instantiated");
        }
    }
}

module.exports = ConsoleTransport;
