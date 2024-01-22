const { validationHandler } = require('../../../../utils/handler');
const { body } = require('express-validator');

const payloadValidation = body('payload').isObject().exists();
const possibleDestinationsValidation = body('possibleDestinations')
    .isArray({ min: 1 })
    .custom(value => {
        if (!Array.isArray(value)) {
            throw new Error('possibleDestinations must be an array');
        }
        for (const obj of value) {
            if (typeof obj !== 'object' || obj === null) {
                throw new Error('Each element of possibleDestinations must be an object');
            }
            for (const key in obj) {
                const isValidKey = typeof key === 'string' && key.length > 0;
                const isValidValue = typeof obj[key] === 'boolean';

                if (!isValidKey || !isValidValue) {
                    throw new Error('Invalid structure for possibleDestinations');
                }
            }
        }
        return true;
    })
    .exists();
const strategyValidation = body('strategy').isString().exists();

const eventRouteValidation = [payloadValidation, possibleDestinationsValidation, strategyValidation];

module.exports = validationHandler(eventRouteValidation);
