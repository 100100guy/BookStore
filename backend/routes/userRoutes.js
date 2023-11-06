const express = require('express');
const User = require('../models/User'); // Import the User model

const userRoute = express.Router();

// Registration route
userRoute.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user instance
  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
userRoute.post('/login', (req, res) => {
  res.send('login');
});

// Update user
userRoute.put('/update', (req, res) => {
  res.send('update');
});

// Delete user
userRoute.delete('/delete/:id', (req, res) => {
  res.send('delete');
});

// Fetch users
userRoute.get('/', (req, res) => {
  res.send('fetch users');
});

module.exports = userRoute;
