// // models/user.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const validator = require('validator');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required']
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: [true, 'Email is required'],
//         validate: {
//             validator: validator.isEmail,
//             message: 'Please enter a valid email'
//         }
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         validate: {
//             validator: function(value) {
//                 return validator.isStrongPassword(value, {
//                     minLength: 8,
//                     minSymbols: 1,
//                     minLowercase: 1,
//                     minUppercase: 1
//                 });
//             },
//             message: 'Password must contain 1 special character, 1 uppercase, 1 lowercase'
//         }
//     },
//     role: {
//         type: String,
//         enum: ['admin', 'user'],
//         default: 'user'
//     },
//     profilePhoto: {
//         type: String,
//         default: 'uploads/default.jpg' // Default profile photo
//     }
// });

// // Pre-save hook to hash the password
// // userSchema.pre('save', async function(next) {
// //     if (!this.isModified('password')) {
// //         return next();
// //     }
// //     const salt = await bcrypt.genSalt(12);
// //     this.password = await bcrypt.hash(this.password, salt);
// //     next();
// // });

// // Method to generate JWT
// // userSchema.methods.generateToken = function() {
// //     return jwt.sign(
// //         { id: this._id, email: this.email, role: this.role },
// //         process.env.JWT_SECRET,
// //         { expiresIn: '30d' }
// //     );
// // };

// module.exports = mongoose.model('User', userSchema);
// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

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
            message: 'Please enter a valid email'
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
            message: 'Password must contain 1 special character, 1 uppercase, 1 lowercase'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profilePhoto: {
        type: String,
        default: 'uploads/default.jpg' // Default profile photo
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

module.exports = mongoose.model('User', userSchema);
