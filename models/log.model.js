const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    message: {
        type: String,
        required: [true, 'A log needs a message.']
    },
    userId: {
        type: String,
        required: [true, 'A log needs a user ID.']
    },
    userName: {
        type: String,
        required: [true, 'A log needs a username']
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

const Log = mongoose.model('log', LogSchema);

module.exports = Log;