const express = require('express');
const router = express.Router();
const controller = require("../controllers/eventController");

router.post("/deposit", controller.deposit);
router.post("/withdraw", controller.withdraw);

router.get("/balance", controller.getBalance);
router.get("/passbook", controller.getPassbook);

router.post("/snapshot", controller.createSnapshot);

module.exports = router;