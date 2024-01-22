const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('pino-http');

const { errorHandler } = require('./utils/handler');
const { ErrorNotFound } = require('./utils/errors');

const eventRouterModule = require('./modules/event-router');
const userModule = require('./modules/user');

const app = express();

app.use(
    cors({
        origin: '*',
    }),
);

app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(eventRouterModule.router);
app.use(userModule.router);

app.use(function (req, res) {
    return errorHandler(new ErrorNotFound('Not Found'), req, res);
});

module.exports = app;
