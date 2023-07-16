const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware function to verify the JWT token
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');

    // Find the user based on the decoded token's ID
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Attach the user object to the request for further use in the route handlers
    req.user = user;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { authenticateUser };
