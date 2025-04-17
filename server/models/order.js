const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1 
      }
    }
  ],
  totalPrice: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  status: { 
    type: String, 
    default: 'pending', 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] 
  },
  shippingAddress: {
    type: String,
    required: true
  }
}, { timestamps: true });

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel; 