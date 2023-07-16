const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateUser } = require('../middlewares/authMiddleware'); // Include the authentication middleware

// API endpoint for creating a new product (Admin only)
router.post('/', authenticateUser, productController.createProduct);

// API endpoint for retrieving all products
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

module.exports = router;
