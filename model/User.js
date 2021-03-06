const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 6,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        min: 6,
        trim: true
    },
    email: {
        type: String,
        require: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        require: true,
        max: 1024,
        min: 6
    },
    Date: {
        type: Date,
        default: Date.now
    },
    isOwner: {
        type: Boolean,
        default: false
    }
}, {
    timsestamps: true
});

module.exports = mongoose.model('User', userSchema);