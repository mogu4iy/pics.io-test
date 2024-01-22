class Transport {
    _key;

    async route() {}

    _validateConfig;
    configValidationSchema = {
        type: 'object',
        properties: {
            name: {type: 'string'},
            transport: { type: 'string' },
        },
        required: ['transport', 'name'],
        additionalProperties: false,
    };

    constructor(
        { key, configValidationProperties = {}, configValidationRequired = [] } = {
            configValidationProperties: {},
            configValidationRequired: [],
        },
    ) {
        if (!key) {
            throw new Error('Transport key can not be nullable');
        }
        this._key = key;
        this.configValidationSchema.properties = {
            ...this.configValidationSchema.properties,
            ...configValidationProperties,
        };
        this.configValidationSchema.required = [...this.configValidationSchema.required, ...configValidationRequired];
    }
}

module.exports = Transport;
