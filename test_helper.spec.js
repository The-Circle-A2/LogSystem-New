const mongoose = require('mongoose');

const Log = require('./models/log.model');
const user = process.env.DB_USER; 
const pass = process.env.DB_PASS;
const testdb = process.env.DB_TEST;

before(done => {
    mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.6wbc5.mongodb.net/${testdb}?retryWrites=true&w=majority`);
    mongoose.connection
     .once('open', () => done())
     .on('error', err => {
         console.log('Warning', err);
     });
});

afterEach(async () => {
    await Promise.all([Log.deleteMany()])
});


