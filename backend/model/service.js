const mongoose = require('mongoose');
const validator = require('validator');

// Define the Service schema
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Service name is required'],
        trim: true,
        minlength: [3, 'Service name must be at least 3 characters long']
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [1, 'Duration must be at least 1 hour']
    }
});

// Optional: Add a method to the schema (if needed for future purposes)
serviceSchema.methods.someMethod = function() {
    // Example method implementation (modify as needed)
    return `Service: ${this.name}, Price: ${this.price}`;
};

// Create and export the Service model
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
