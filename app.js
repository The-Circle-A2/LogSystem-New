const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
mongoose.connect('mongodb+srv://marco123:marco123@cluster0.6wbc5.mongodb.net/hardwareinformer?retryWrites=true&w=majority');
}

const app = express();

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
})

module.exports = app;