const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel; 