const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const user = mongoose.model('User', UserSchema);

module.exports = user;
