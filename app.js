const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require("dotenv").config({ path: "./.env"});

mongoose.Promise = global.Promise;

const logRoutes = require('./routes/log.routes');

mongoose.connect(process.env.MONGODB_URL);

const app = express();

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json());

logRoutes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
})

module.exports = app;
