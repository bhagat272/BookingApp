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



// controllers/serviceController.js


// Create a new service
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (err) {
    res.status(400).json({ error: err.message || 'An error occurred while creating the service.' });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(400).json({ error: err.message || 'An error occurred while fetching the services.' });
  }
};

// Get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message || 'An error occurred while fetching the service.' });
  }
};

// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (err) {
    res.status(400).json({ error: err.message || 'An error occurred while updating the service.' });
  }
};

// Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message || 'An error occurred while deleting the service.' });
  }
};
