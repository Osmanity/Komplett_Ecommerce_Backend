const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders, getOrderById } = require("../controllers/orderController");

// Skapa en ny order
router.post("/orders", createOrder);

// Hämta alla ordrar för inloggad användare
router.get("/orders", getUserOrders);

// Hämta en specifik order med ID
router.get("/orders/:id", getOrderById);

module.exports = router;