// models/users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true // Ensure username is unique
    },
    Email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    Password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
