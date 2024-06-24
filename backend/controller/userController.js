const Service = require('../model/service'); // Adjust the path based on your project structure
const User = require("../model/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    console.log(existingUser)
    if (existingUser) {
      return res.status(500).json({ error: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({
      error: err.message || "An error occurred during signup."
    });
    console.log(err);
  }
};

// loginController
 
exports.login = async (req, res) => {
  try {
      const { name,email, password } = req.body;
      console.log("Login attempt:", { email, password }); // Log the request data for debugging

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          console.log("User not found for email:", email);
          return res.status(404).json({ error: "User not found" });
      }

      // Validate password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
          console.log("Invalid password for user:", email);
          return res.status(401).json({ error: "Invalid password" });
      }

      // Generate token and include role in response
      const token = await user.generateToken();
      console.log("Generated token:", token); // Log the generated token

      // Return token and role in response
      res.status(200).json({ token, role: user.role });
  } catch (err) {
      console.error("Error during login process:", err);
      res.status(400).json({
          error: err.message || "An error occurred during login."
      });
  }
};


exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    if (!users || users.length === 0) {
      const error = new Error('No users found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      length: users.length,
      message: 'Success',
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);  // Log the error details
    next(error);  // Pass the error to the error-handling middleware
  }
};


