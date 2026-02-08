const Event = require("../models/eventModel");

// Deposit Event
exports.deposit = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount ||amount <= 0) {
            return res.status(400).json({ message: "Invalid deposit amount"});
        }
        const event = new Event({
            type: "Deposit",
            amount
        });

        await event.save();
        res.status(201).json({ message: "Deposit event stored", event});
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Withdraw Event
exports.withdraw = async (req, res) => {
    try {
        const { amount } = req.body;

        if(!amount || amount <=0) {
            return res.status(400).json({ message: "Invalid withdraw amount"});
        }

        const event = new Event({
            type: "Withdraw",
            amount
        });

        await event.save();
        res.status(201).json({ message: "Withdraw Event Stored", event});
    }   catch(err) {
        res.status(500).json({ error: err.message });
    }
};

const replayService =  require('../services/replayService');

// Get Current Balance
exports.getBalance = async (req, res) => {
    try {
        const balance = await replayService.getbalance();
        res.json({ balance});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// Get Passbook (All Events)
exports.getPassbook = async (req, res) => {
    try {
        const events = await replayService.getPassbook();
        res.json({ events});
    } catch (err) {
        res.status(500).json({error: err.message});
    };
};