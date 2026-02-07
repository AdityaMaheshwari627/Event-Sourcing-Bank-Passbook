const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Event Sourcing Bank Passbook API Running");
});

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/event_sourcing_db")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
const eventRoutes = require("./routes/eventRoute");
app.use("/api/events", eventRoutes);

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});