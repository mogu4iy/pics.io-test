const {HttpPutTransport, HttpPostTransport, ConsoleWarnTransport, ConsoleLogTransport} = require("../../transports");
const {ajv} = require("../../providers");

const configSchema = {
    type: "object",
    required: ["routes"],
    properties: {
        routes: {
            type: "object",
            patternProperties: {
                "^.+$": {
                    type: "object",
                    anyOf: [
                        HttpPostTransport.configValidationSchema,
                        HttpPutTransport.configValidationSchema,
                        ConsoleWarnTransport.configValidationSchema,
                        ConsoleLogTransport.configValidationSchema
                    ]
                },
            }
        },
    }
}

function validateConfig(data) {
    const validate = ajv.compile(configSchema)
    if (!validate(data)){
        throw new Error(`Config is not validated:\n ${validate.errors.map(err => JSON.stringify(err, null, 2)).join("\n")}`)
    }
}

module.exports = {
    validateConfig
}