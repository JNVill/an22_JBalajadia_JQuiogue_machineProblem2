// orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/authMiddleware'); // Include the authentication middleware

// API endpoint for creating a new order (requires authentication)
router.post('/', authenticateUser, orderController.createOrder);

// API endpoint for retrieving all orders (Admin only)
router.get('/', authenticateUser, orderController.getAllOrders);


module.exports = router;
