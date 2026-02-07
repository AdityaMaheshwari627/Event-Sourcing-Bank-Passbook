const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Deposit", "Withdraw"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);