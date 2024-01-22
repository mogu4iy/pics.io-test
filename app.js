const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const eventRouterModule = require("./modules/event-router")

const app = express();

app.use(
    cors({
      origin: "*",
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(eventRouterModule.router)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end(err.message)
});

module.exports = app;
