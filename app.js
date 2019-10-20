const express = require('express');
const app = express();

const msgboardRoutes = require('./api/routes/msgboard');

app.use('/msgboard', msgboardRoutes);

module.exports = app;