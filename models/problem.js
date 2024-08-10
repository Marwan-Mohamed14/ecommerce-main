const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending',
    }
});

module.exports = mongoose.model('Problem', problemSchema);
