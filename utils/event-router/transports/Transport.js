class Transport {
    _key

    async route() {}

    _validateConfig
    configValidationSchema = {
        type: "object",
        properties: {
            transport: {type: "string"}
        },
        required: ["transport"],
        additionalProperties: false,
    }


    constructor({key, configValidationProperties = {}, configValidationRequired = []} = {
        configValidationProperties: {},
        configValidationRequired: []
    }) {
        this._key = key
        this.configValidationSchema.properties = {
            ...this.configValidationSchema.properties,
            ...configValidationProperties
        }
        this.configValidationSchema.required = [
            ...this.configValidationSchema.required,
            ...configValidationRequired
        ]
    }
}

module.exports = Transport