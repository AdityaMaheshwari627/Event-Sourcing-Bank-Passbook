const Event = require("../models/eventModel");
const replayService = require("../services/replayService");
const snapshotService = require("../services/snapshotService");

// Deposit Event
exports.deposit = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

    const event = new Event({
      type: "DEPOSIT",
      amount
    });

    await event.save();
    res.status(201).json({
      message: "Deposit event stored",
      event 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Withdraw Event
exports.withdraw = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid Withdraw amount" });
    }

    // Check for sufficient balance
    const currentBalance = await replayService.getbalance();
    if (amount > currentBalance) {
      return res.status(400).json({error: "Insufficient balance" });
    }

    const event = new Event({
      type: "WITHDRAW",
      amount
    });

    await event.save();
    res.status(201).json({ message: "Withdraw event stored", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Current Balance
exports.getBalance = async (req, res) => {
  try {
    const balance = await replayService.getBalance();
    res.json({ balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get Passbook (All Events)
exports.getPassbook = async (req, res) => {
  try {
    const events = await replayService.getPassbook();
    res.json({ events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Create Snapshot
exports.createSnapshot = async (req, res) => {
  try {
    const snap = await snapshotService.createSnapshot();
    res.json({
      message: "Snapshot created successfully",
      snapshot: snap
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};