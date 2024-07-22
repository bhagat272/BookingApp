const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/multerConfig'); // Multer config
const path = require('path');

// User signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ error: "Failed to create user" });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        console.log(user)
         if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id , role : user.role ,profile : user.profilePhoto ,name:user.name}, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token)
        res.status(200).json({ token, role: user.role , profile : user.profilePhoto });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Failed to login" });
    }
};

// Fetch user profile
exports.fetchUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming you extract user ID from JWT token middleware
         const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({error: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming you extract user ID from JWT token middleware
        const { name, email, password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        
        if (password) {
            user.password = await bcrypt.hash(password, 12);
        }

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error("Error updating user profile:", err);
        res.status(500).json({ error: "Failed to update user profile" });
    }
};

// Update user profile photo
exports.updateProfilePhoto = async (req, res) => {
    console.log(req.user.userId , req.url)
    try {
        const userId = req.user.userId; // Assuming you extract user ID from JWT token middleware

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.profilePhoto = req.file.path; // Assuming req.file.path contains the uploaded file path
        console.log(req.file.path)
        await user.save();

        res.status(200).json({ message: "Profile photo updated successfully", user });
    } catch (err) {
        console.error("Error updating profile photo:", err);
        res.status(500).json({ error: "Failed to update profile photo" });
    }
};

// Fetch all users (excluding admins)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } });
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.status(200).json({
            length: users.length,
            message: 'Success',
            users
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
