// orderController.js

const Order = require('../models/Order');

// Function to create a new order
const createOrder = async (req, res) => {
  
  try {
    // Create a new order record
    const newOrder = new Order({
      userId: req.body.userId, 
      orderProducts: req.body.products,
      totalAmount: req.body.totalAmount,
    });

    // Save the order record to the database
    await newOrder.save();

    return res.status(201).json({ message: 'Order created successfully.', order: newOrder });
  } catch (error) {
    return res.status(500).json({ message: 'Error while creating the order.', error: error.message });
  }
};

// Function to retrieve all orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (req.user.isAdmin) {
      // Retrieve all orders from the database
      const orders = await Order.find().populate('userId', 'username email'); // Populate userId field with user details

      return res.status(200).json({ orders });
    } else {
      return res.status(403).json({ message: 'You do not have permission to access this resource.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error while retrieving orders.', error: error.message });
  }
};


module.exports = {
  createOrder,
  getAllOrders,
};
