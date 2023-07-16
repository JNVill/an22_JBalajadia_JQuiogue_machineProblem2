const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for association
    required: [true, "User ID is required."]
  },
  orderProducts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model for association
        required: [true, "Order Product ID is required."]
      },
      quantity: {
        type: Number,
        required: [true, "Order Product quantity is required."]
      },
      price: {
        type: Number,
        required: [true, "Order Product price is required."]
      },
    },
  ],
  purchasedOn: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
