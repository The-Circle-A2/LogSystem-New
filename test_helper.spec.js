const mongoose = require('mongoose');

const Log = require('./models/log.model');

before(done => {
    mongoose.connect(env.MONGODB_URL);
    mongoose.connection
     .once('open', () => done())
     .on('error', err => {
         console.log('Warning', err);
     });
});

afterEach(async () => {
    await Promise.all([Log.deleteMany()])
});


