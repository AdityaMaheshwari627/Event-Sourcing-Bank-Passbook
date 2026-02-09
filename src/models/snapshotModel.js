const mongoose = require('mongoose');
const snapshotSchema = new mongoose.Schema({
    balance: Number,
    lastEventTime: Date
});

module.exports = mongoose.model("Snapshot", snapshotSchema);