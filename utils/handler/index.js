const { CustomError, ErrorBadRequest } = require('../errors');
const { validationResult } = require('express-validator');

function configureMessage({ success = true, message, data }) {
    return { success, message, data };
}

function httpHandler(handler) {
    return async (req, res) => {
        return await handler(req, res)
            .then(data => {
                return res.status(200).json(configureMessage({ data }));
            })
            .catch(err => {
                return errorHandler(err, req, res);
            });
    };
}

function httpMiddleware(middleware) {
    return async (req, res, next) => {
        return await middleware(req, res, next).catch(err => {
            return errorHandler(err, req, res);
        });
    };
}

function errorHandler(err, req, res) {
    if (err instanceof CustomError) {
        return res.status(err.status).json(configureMessage({ success: false, message: err.message, data: err.data }));
    }
    return res
        .status(500)
        .json(configureMessage({ success: false, message: 'Internal Server Error', data: err.message }));
}

function validationHandler(validations) {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return errorHandler(new ErrorBadRequest('Validation Error', { errors: errors.array() }), req, res);
    };
}

module.exports = {
    httpHandler,
    httpMiddleware,
    errorHandler,
    validationHandler,
};
