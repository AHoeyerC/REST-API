const express = require('express');
const app = express();
const morgan = require('morgan');

const msgboardRoutes = require('./api/routes/msgboard');
const studentlessonRoutes = require('./api/routes/studentlesson');

app.use(morgan('dev'));

// Routes which handels requests
app.use('/msgboard', msgboardRoutes);
app.use('/studentlesson', studentlessonRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;