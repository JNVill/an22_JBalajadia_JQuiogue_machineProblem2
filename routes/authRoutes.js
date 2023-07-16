const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddleware'); // Include the authentication middleware

// API endpoint for user registration
router.post('/register', authController.registerUser);

// API endpoint for user login
router.post('/login', authController.loginUser);

// Example of a protected route (requires authentication)
router.get('/profile', (req, res) => {
  // The authenticated user's information is available in req.user
  authenticateUser(req, res, () => {
  return res.status(200).json(req.user);
  }) 
  
});
  
module.exports = router;
