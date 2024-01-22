const {CustomError} = require("../errors");

function configureMessage({success = true, message, data}) {
    return {success, message, data}
}

function httpHandler(handler) {
    return async (req, res) => {
        return await handler(req, res)
            .then(data => {
                return res.status(200).send(configureMessage({data}))
            })
            .catch(err => {
                return errorHandler(err, req, res)
            })
    }
}

function httpMiddleware(middleware) {
    return async (req, res, next) => {
        return await middleware(req, res, next)
            .catch(err => {
                return errorHandler(err, req, res)
            })
    }
}

function errorHandler(err, req, res) {
    console.log(err)
    if (err instanceof CustomError){
        return res.status(err.status).send(configureMessage({message: err.message, data: err.data}))
    }
    return res.status(500).send(configureMessage({message: "Internal Server Error", data: err.message}))
}

module.exports = {
    httpHandler,
    httpMiddleware,
    errorHandler
}