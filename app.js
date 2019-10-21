const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const msgboardRoutes = require('./api/routes/msgboard');
const studentlessonRoutes = require('./api/routes/studentlesson');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-Headers',
        'Origin, X-Requsted-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    };
});

// Routes which handels requests
app.use('./routes/msgboard', msgboardRoutes);
app.use('./routes/studentlesson', studentlessonRoutes);

// Error handling
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