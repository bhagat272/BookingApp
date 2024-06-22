const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function(value) {
                return validator.isStrongPassword(value, {
                    minLength: 8,
                    minSymbols: 1,
                    minLowercase: 1,
                    minUppercase: 1
                });
            },
            message: "Password must contain 1 special character, 1 Uppercase, 1 Lowercase"
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

// Pre-save hook to hash password before saving user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to generate JWT
userSchema.methods.generateToken = function() {
    const token = jwt.sign(
        { id: this._id, email: this.email, role: this.role }, // payload
        process.env.JWT_SECRET, // secret key
        { expiresIn: '30d' } // options
    );
    return token;
};

module.exports = mongoose.model("User", userSchema);
