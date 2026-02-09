const express = require('express');
const router = express.Router();
const controller = require("../controllers/eventController");

router.post("/deposit", controller.deposit);
router.post("/withdraw", controller.withdraw);

module.exports = router;

router.get("/balance", controller.getBalance);
router.get("/passbook", controller.getPassbook);

router.post("/snapshot", controller.createSnapshot);