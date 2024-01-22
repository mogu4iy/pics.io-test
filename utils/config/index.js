const { HttpPutTransport, HttpPostTransport, ConsoleWarnTransport, ConsoleLogTransport } = require('../../transports');
const { ajv } = require('../../providers');

const configSchema = {
    type: 'object',
    required: ['routes', 'user'],
    properties: {
        user: {
            type: 'object',
            properties: {
                passwordSaltRounds: {
                    type: 'number',
                },
                jwtPrivateKey: {
                    type: 'string',
                },
                jwtPublicKey: {
                    type: 'string',
                },
                jwtAlgorithm: {
                    type: 'string',
                },
                jwtExpiresIn: {
                    type: 'number',
                },
            },
            required: ['passwordSaltRounds', 'jwtPrivateKey', 'jwtPublicKey', 'jwtAlgorithm', 'jwtExpiresIn'],
        },
        routes: {
            type: 'array',
            items: {
                type: 'object',
                anyOf: [
                    HttpPostTransport.configValidationSchema,
                    HttpPutTransport.configValidationSchema,
                    ConsoleWarnTransport.configValidationSchema,
                    ConsoleLogTransport.configValidationSchema,
                ],
            }
        },
    },
};

function validateConfig(data) {
    const validate = ajv.compile(configSchema);
    if (!validate(data)) {
        throw new Error(
            `Config is not validated:\n ${validate.errors.map(err => JSON.stringify(err, null, 2)).join('\n')}`,
        );
    }
}

module.exports = {
    validateConfig,
};
