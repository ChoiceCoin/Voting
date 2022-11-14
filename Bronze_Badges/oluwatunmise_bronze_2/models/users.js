const mongoose = require("mongoose");

const User = mongoose.model('User', new mongoose.Schema({
    address: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
}));

module.exports = {User};