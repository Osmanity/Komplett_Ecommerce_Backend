const express = require("express");
const router = express.Router();
const { validateMessage } = require("../controllers/messageController");

router.post("/messages", validateMessage);

module.exports = router; 