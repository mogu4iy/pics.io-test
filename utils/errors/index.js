class CustomError extends Error {
    constructor(message, status, data) {
        super(message)
        this.custom = true
        this.status = status
        this.data = data
    }
}

class ErrorBadRequest extends CustomError {
    constructor(message, data) {
        super(message, 400, data)
    }
}

class ErrorUnauthorized extends CustomError {
    constructor(message, data) {
        super(message, 401, data)
    }
}

class ErrorForbidden extends CustomError {
    constructor(message, data) {
        super(message, 403, data)
    }
}

class ErrorNotFound extends CustomError {
    constructor(message, data) {
        super(message, 404, data)
    }
}

class ErrorInternalServerError extends CustomError {
    constructor(message, data) {
        super(message, 500, data)
    }
}

module.exports = {
    ErrorBadRequest,
    ErrorUnauthorized,
    ErrorForbidden,
    ErrorNotFound,
    ErrorInternalServerError,
    CustomError
}