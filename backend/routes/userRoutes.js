const express = require("express");
const User = require("../models/User"); // Import the User model
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

// Registration route with express-async-handler
userRoute.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User exists");
      error.statusCode = 400;
      throw error;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user instance with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    // If the credentials are correct, create a JWT token
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
  
      // Return the token
      res.status(200).json({
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          password: savedUser.password,
          token: token,
       });
  } catch (error) {
    next(error); // Pass the error to the error middleware
  }
});

// Login route
userRoute.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by their email
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401);
      throw new Error("Invalid username");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Invalid password");
    }

    // If the credentials are correct, create a JWT token
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    // Return the token
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        token: token,
     });
  } catch (error) {
    next(error); // Pass the error to the error middleware
  }
});

// Update user
userRoute.put("/update", (req, res) => {
  res.send("update");
});

// Delete user
userRoute.delete("/delete/:id", (req, res) => {
  res.send("delete");
});

// Fetch users
userRoute.get("/", (req, res) => {
  res.send("fetch users");
});

module.exports = userRoute;
