const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    message: {
        type: String,
        required: [true, 'A log needs a message.']
    },
    userName: {
        type: String,
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

const Log = mongoose.model('log', LogSchema);

module.exports = Log;