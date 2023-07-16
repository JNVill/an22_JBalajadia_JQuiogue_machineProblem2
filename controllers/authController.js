// authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Include jsonwebtoken
const User = require('../models/User'); // Assuming you have a User model

// Function to handle user registration
const registerUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Set isAdmin to false by default if not provided
    });

    // Save the user record to the database
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error while registering user.', error: error.message });
  }
};

// Function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve the user record based on the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the user-provided password with the stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // Password is correct, proceed with the login process
      // Generate a JWT token with the user's ID as the payload
      const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1d' });

      // Return the token as part of the response
      return res.status(200).json({ token: token });
    } else {
      // Password does not match
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error while logging in.', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
