const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    Image: {
        type: String,
        required: false // Optional field for image
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
