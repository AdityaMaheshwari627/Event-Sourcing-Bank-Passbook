const Snapshot = require("../models/snapshotModel");
const Event = require("../models/eventModel");

// Snapshot Service
exports.createSnapshot = async () => {
    const events = await Event.find().sort({ timestamp: 1});
    let balance = 0;

    for(const event of events) {
        if(event.type === "Deposit") balance += event.amount;
        if(event.type === "Withdraw") balance -= event.amount;
    }

    const snapshot = new Snapshot({
        balance,
        lastEventTime: events[events.length - 1]?.timestamp || null
    });
    
    await snapshot.save();
    return snapshot;
};

exports.getLatestSnapshot = async () => {
    return await Snapshot.findOne().sort({ lastEventTime: -1});
};