const express = require("express");
const User = require("../models/User"); // Import the User model
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authMiddleware");

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
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

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
userRoute.put("/update", authenticateToken, async (req, res) => {
  // Assuming you're using JWT and 'req.user' is available, you can access the authenticated user's information
  const userId = req.user.userId;

  // The user data you want to update should be in the request body
  const { username, email, newPassword } = req.body;

  // Find the user by their ID
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update the user's properties
  user.username = username || user.username;
  user.email = email || user.email;

  // If a new password is provided, hash and update the password
  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
  }

  // Save the updated user
  await user.save();

  // If the credentials are correct, create a JWT token
  const token = jwt.sign({ userId: user._id }, "your_secret_key", {
    expiresIn: "1h",
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token,
  });
});

// Delete user
userRoute.delete("/delete/:id", (req, res) => {
  res.send("delete");
});


// Fetch all users (protected route, requires authentication)
userRoute.get("/", authenticateToken, async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({}); // You can specify the fields you want to include

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(500);
      throw new Error("No users found at the moment");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server error fetching users");
  }
});


//Fetch a single user (the own user)
userRoute.get("/profile", authenticateToken, async (req, res) => {
  try {
    // Retrieve the user from the database
    const user = await User.findById(req.user.userId).populate("books");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server error fetching user");
  }
});
module.exports = userRoute;
