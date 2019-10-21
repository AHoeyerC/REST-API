const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const msgboardRoutes = require('./api/routes/msgboard');
const studentlessonRoutes = require('./api/routes/studentlesson');
const lessonRoutes = require('./api/routes/lesson');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database connection
mongoose.connect(
    'mongodb+srv://AHoeyerC:'
    + process.env.MONGO_ATLAS_PW +
    '@nodebasic-1ajhh.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
    //Skal ændres, så andre webpages ikke kan få fat i API'en
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-Headers',
        'Origin, X-Requsted-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    };
    next();
});

// Routes which handels requests
app.use('/msgboard', msgboardRoutes);
app.use('/studentlesson', studentlessonRoutes);
app.use('/lesson', lessonRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;