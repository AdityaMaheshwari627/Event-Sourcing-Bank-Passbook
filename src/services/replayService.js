const Event = require('../models/eventModel');

exports.getbalance = async() => {
    const events = (await Event.find()).sort({ timestamp: 1});
    let balance = 0;

    for (const event of events) {
        if (event.type === 'Deposit') balance += event.amount;
        if (event.type === 'Withdrawal') balance -= event.amount;
    }

    return balance;
};

exports.getPassbook = async() => {
    return (await Event.find()).sort({timestamp: 1});
};