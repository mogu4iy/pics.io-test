// const {CustomError} = require("../errors");
//
// function errorHandler(err, req, res) {
//     console.log(err)
//     console.log(err instanceof CustomError)
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.end(err.message)
// }
//
// module.exports = validationErrorHandler