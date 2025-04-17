const Order = require("../models/order");
const Product = require("../models/product");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Skapa en ny order
const createOrder = async (req, res) => {
  try {
    // Extrahera token från Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Authentication required. Bearer token missing." });
    }
    
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required. Bearer token missing." });
    }
    
    // Verifiera token och extrahera användar-ID
    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Authenticated user:", user);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const { products, shippingAddress } = req.body;

    // Validera att produkter finns och är i rätt format
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products are required and must be an array" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // Validera varje produkt och beräkna totalpris
    let totalPrice = 0;
    const validatedProducts = [];

    for (const item of products) {
      // Kontrollera att produkten har rätt format
      if (!item.productId || !item.quantity || item.quantity < 1) {
        return res.status(400).json({ 
          message: "Each product must have a valid productId and quantity greater than 0" 
        });
      }

      // Validera att produkten finns i databasen
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ message: "Invalid product ID format" });
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      // Beräkna pris för denna produkt
      const itemPrice = product.price * item.quantity;
      totalPrice += itemPrice;

      validatedProducts.push({
        productId: item.productId,
        quantity: item.quantity
      });
    }

    // Skapa ordern med användar-ID från token
    const order = await Order.create({
      user: user.id, // Använd ID från den verifierade token
      products: validatedProducts,
      totalPrice,
      shippingAddress
    });

    res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

// Hämta alla ordrar för en användare
const getUserOrders = async (req, res) => {
  try {
    // Verifiera att användaren är inloggad - acceptera både cookies och Authorization header
    const authHeader = req.headers.authorization;
    let token = req.cookies.token;
    
    // Om token inte finns i cookies, försök hämta från Authorization header
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const orders = await Order.find({ user: user.id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'products.productId',
        model: 'Product',
        select: 'name price description category images' // Inkludera alla relevanta produktfält
      });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Hämta en specifik order med ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validera order ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID format" });
    }

    // Verifiera att användaren är inloggad - acceptera både cookies och Authorization header
    const authHeader = req.headers.authorization;
    let token = req.cookies.token;
    
    // Om token inte finns i cookies, försök hämta från Authorization header
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const order = await Order.findById(id)
      .populate('products.productId', 'name price images description');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Kontrollera att ordern tillhör användaren
    if (order.user.toString() !== user.id) {
      return res.status(403).json({ message: "Not authorized to access this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Error fetching order" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById
}; 